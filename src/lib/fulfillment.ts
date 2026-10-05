import { createLexofficeInvoice, sendLexofficeInvoiceByEmail, getLexofficeInvoicePdf } from './lexoffice.js';
import { sendInvoiceConfirmationEmail, sendOrderConfirmationToCustomer, sendCallJackpotNotification } from './mailer.js';
import { redeemVoucher, type RedeemResult } from './vouchers.js';
import type { BillingAddress } from './billing.js';

const MOLLIE_KEY = process.env.Mollie_API_Test ?? process.env.MOLLIE_API_KEY ?? '';

export interface FulfillResult {
  status: string;     // Mollie status: open | pending | paid | failed | canceled | expired
  processed: boolean;  // did the paid branch (invoice + e-mails) run on this call?
}

// ── Payment fulfillment ───────────────────────────────────────────────────────
// The single source of truth for "a payment reached its final state". Called from
// three places, all idempotent against each other:
//   1. api/webhooks/mollie      – Mollie's server-to-server webhook (often blocked
//                                 by Vercel's edge bot-challenge, so not reliable).
//   2. api/checkout (GET)       – the success page polls this from the customer's
//                                 browser, which passes the challenge → fast path.
//   3. api/cron/watchdog        – reconciles stuck "offen" orders internally (Vercel
//                                 cron is not edge-challenged) → guaranteed safety net.
// Invoice + e-mails go out exactly once: the DB status transition is the lock.
export async function fulfillPayment(paymentId: string): Promise<FulfillResult> {
  // ── Fetch current payment status from Mollie ──────────────────────────────
  const mollieRes = await fetch(`https://api.mollie.com/v2/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${MOLLIE_KEY}` },
  });

  const payment = await mollieRes.json() as any;
  if (!mollieRes.ok) {
    console.error('Mollie fetch error:', payment);
    throw new Error(`Mollie fetch failed for ${paymentId}`);
  }

  const status: string = payment.status; // open | pending | paid | failed | canceled | expired
  const meta = payment.metadata ?? {};

  // ── Map Mollie status to our status ───────────────────────────────────────
  const statusMap: Record<string, string> = {
    paid: 'bezahlt',
    failed: 'fehlgeschlagen',
    canceled: 'storniert',
    expired: 'abgelaufen',
  };
  const ourStatus = statusMap[status] ?? 'offen';

  // ── Update order in Supabase (optional) ───────────────────────────────────
  // This webhook/poll can fire again for the same payment while the status stays
  // "paid". Only the call that actually moves the order to its new status may run
  // the paid branch below — otherwise invoice + e-mails would go out twice.
  let order: any = null;
  let firstPaid = status === 'paid'; // fail open if the DB is unavailable
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
      const { data: rows, error } = await supabase
        .from('orders')
        .update({ status: ourStatus, mollie_status: status, paid_at: status === 'paid' ? new Date().toISOString() : null })
        .eq('mollie_payment_id', paymentId)
        .neq('status', ourStatus)
        .select();
      if (error) {
        console.error('Supabase update error:', error);
      } else if (rows && rows.length > 0) {
        order = rows[0];
      } else {
        // Nothing changed: already in this status (re-delivery), or the payment
        // id was never written to the order (then find it via metadata.orderId).
        let { data: existing } = await supabase
          .from('orders')
          .select('*')
          .eq('mollie_payment_id', paymentId)
          .maybeSingle();
        if (!existing && typeof meta.orderId === 'string' && meta.orderId) {
          const { data: byId } = await supabase
            .from('orders')
            .update({ mollie_payment_id: paymentId, status: ourStatus, mollie_status: status, paid_at: status === 'paid' ? new Date().toISOString() : null })
            .eq('id', meta.orderId)
            .is('mollie_payment_id', null)
            .select();
          if (byId && byId.length > 0) { order = byId[0]; existing = null; }
          else {
            ({ data: existing } = await supabase.from('orders').select('*').eq('id', meta.orderId).maybeSingle());
          }
        }
        if (existing) order = existing;
        if (existing && status === 'paid') {
          firstPaid = false;
          console.log(`Payment ${paymentId} already processed as paid – skipping invoice/e-mails.`);
        }
      }
    } catch (dbErr) {
      console.error('Supabase error:', dbErr);
    }
  }

  // ── On successful payment: create invoice + send emails (once) ────────────
  if (firstPaid) {
    const customerName  = meta.customerName  ?? order?.customer_name  ?? '';
    const customerEmail = meta.customerEmail ?? order?.customer_email ?? '';
    const customerPhone = meta.customerPhone ?? order?.customer_phone ?? '';
    const productName   = meta.productName   ?? order?.product_name   ?? '';
    const amount        = parseFloat(payment.amount.value);

    // Count the voucher now that the payment is actually paid (abandoned
    // payments no longer burn a code; parallel payments can't both claim a
    // single-use KOSMOS- code).
    const discountCode: string = meta.discountCode ?? order?.discount_code ?? '';
    let redeem: RedeemResult | null = null;
    if (discountCode) {
      redeem = await redeemVoucher(paymentId, discountCode);
      if (redeem === 'exhausted') console.warn(`Voucher ${discountCode} already used by another payment (${paymentId}).`);
    }

    // Birth data + billing address come from the order row; Mollie metadata
    // only carries them as a fallback (JSON strings) when the DB insert failed.
    let birthDataItems: any[] | undefined = Array.isArray(order?.birth_data) ? order.birth_data : undefined;
    let billingAddress: BillingAddress | null = order?.billing_address ?? null;
    try {
      if (!birthDataItems && meta.birthData) birthDataItems = JSON.parse(meta.birthData);
      if (!billingAddress && meta.billingAddress) billingAddress = JSON.parse(meta.billingAddress);
    } catch { /* ignore parse errors */ }

    // ── Skool membership: invite the customer to the group ────────────────────
    if (meta.skoolMembership === 'true' && customerEmail) {
      try {
        const { inviteToSkool } = await import('./skool.js');
        await inviteToSkool(customerEmail);
      } catch (skoolErr) {
        console.error('Skool invite error:', skoolErr);
      }
    }

    let invoiceNumber = '';
    let invoicePdfBuffer: Buffer | undefined;

    // 1. Create invoice in Lexoffice (if configured)
    if (process.env.API_Lexware) {
      try {
        const { invoiceId, invoiceNumber: invNum } = await createLexofficeInvoice({
          customerName, customerEmail, productName, amount, orderId: order?.id ?? paymentId, billingAddress,
        });
        invoiceNumber = invNum;

        // Update order with Lexoffice reference
        if (order && process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
          const { createClient } = await import('@supabase/supabase-js');
          const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
          const { error: invErr } = await supabase
            .from('orders')
            .update({ lexoffice_invoice_id: invoiceId, invoice_number: invoiceNumber })
            .eq('id', order.id);
          if (invErr) console.error('Supabase invoice update error:', invErr);
        }

        // Fetch the finalized invoice PDF and attach it to our own confirmation
        // email. If that fails, fall back to letting lexoffice email it separately.
        try {
          invoicePdfBuffer = await getLexofficeInvoicePdf(invoiceId);
        } catch (pdfErr) {
          console.error('Lexoffice PDF fetch failed, using lexoffice email fallback:', pdfErr);
          try { await sendLexofficeInvoiceByEmail(invoiceId, customerEmail); } catch (e) { console.error(e); }
        }
      } catch (err) {
        console.error('Lexoffice error:', err);
      }
    }

    // 2. Customer order confirmation (with the lexoffice invoice PDF attached)
    //    + admin notification via IONOS SMTP.
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const invNum = invoiceNumber || paymentId;
      const orderDate = new Date().toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });

      const emailInput = {
        customerName, customerEmail, customerPhone, productName, amount,
        invoiceNumber: invNum,
        birthDataItems,
        orderDate,
        invoicePdfBuffer,
      };
      try {
        await sendOrderConfirmationToCustomer(emailInput); // confirmation incl. invoice PDF
        await sendInvoiceConfirmationEmail(emailInput);    // admin notification to Robert
      } catch (err) {
        console.error('Email error:', err);
      }

      // Cosmic-wheel jackpot: the customer won a 20-min call with Robert.
      // Only on the first successful redemption (not on re-deliveries).
      // If the DB check failed (null), notify anyway — better a duplicate than a lost call.
      if (discountCode.startsWith('KOSMOS-CALL-') && (redeem === 'redeemed' || redeem === null)) {
        try {
          await sendCallJackpotNotification({
            customerName, customerEmail, customerPhone, productName,
            code: discountCode, orderDate,
          });
        } catch (err) {
          console.error('Jackpot notification error:', err);
        }
      }
    }
  }

  return { status, processed: firstPaid };
}
