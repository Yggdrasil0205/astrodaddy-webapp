import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createLexofficeInvoice, sendLexofficeInvoiceByEmail } from '../../src/lib/lexoffice.js';
import { sendInvoiceConfirmationEmail, sendOrderConfirmationToCustomer } from '../../src/lib/mailer.js';

const MOLLIE_KEY = process.env.Mollie_API_Test ?? process.env.MOLLIE_API_KEY ?? '';

// ── POST /api/webhooks/mollie ─────────────────────────────────────────────────
// Mollie calls this URL after every payment status change.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { id: paymentId } = req.body as { id: string };
  if (!paymentId) return res.status(400).json({ error: 'Missing payment id' });

  // ── Fetch current payment status from Mollie ──────────────────────────────
  const mollieRes = await fetch(`https://api.mollie.com/v2/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${MOLLIE_KEY}` },
  });

  const payment = await mollieRes.json() as any;
  if (!mollieRes.ok) {
    console.error('Mollie fetch error:', payment);
    return res.status(500).end();
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
  let order: any = null;
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
      const { data, error } = await supabase
        .from('orders')
        .update({ status: ourStatus, mollie_status: status, paid_at: status === 'paid' ? new Date().toISOString() : null })
        .eq('mollie_payment_id', paymentId)
        .select()
        .single();
      if (error) console.error('Supabase update error:', error);
      else order = data;
    } catch (dbErr) {
      console.error('Supabase error:', dbErr);
    }
  }

  // ── On successful payment: create invoice + send emails ───────────────────
  if (status === 'paid') {
    const customerName  = meta.customerName  ?? order?.customer_name  ?? '';
    const customerEmail = meta.customerEmail ?? order?.customer_email ?? '';
    const productName   = meta.productName   ?? order?.product_name   ?? '';
    const amount        = parseFloat(payment.amount.value);

    // Parse birth data from Mollie metadata (stored as JSON string)
    let birthDataItems: any[] | undefined;
    try {
      if (meta.birthData) birthDataItems = JSON.parse(meta.birthData);
    } catch { /* ignore parse errors */ }

    // ── Skool membership: invite the customer to the group ────────────────────
    if (meta.skoolMembership === 'true' && customerEmail) {
      try {
        const { inviteToSkool } = await import('../../src/lib/skool.js');
        await inviteToSkool(customerEmail);
      } catch (skoolErr) {
        console.error('Skool invite error:', skoolErr);
      }
    }

    let invoiceNumber = '';

    // 1. Create invoice in Lexoffice (if configured)
    if (process.env.API_Lexware) {
      try {
        const { invoiceId, invoiceNumber: invNum } = await createLexofficeInvoice({
          customerName, customerEmail, productName, amount, orderId: order?.id ?? paymentId,
        });
        invoiceNumber = invNum;

        // Update order with Lexoffice reference
        if (order && process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
          const { createClient } = await import('@supabase/supabase-js');
          const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
          await supabase
            .from('orders')
            .update({ lexoffice_invoice_id: invoiceId, invoice_number: invoiceNumber })
            .eq('id', order.id);
        }

        // Lexoffice sends the invoice PDF directly to the customer
        await sendLexofficeInvoiceByEmail(invoiceId, customerEmail);
      } catch (err) {
        console.error('Lexoffice error:', err);
      }
    }

    // 2. Customer order confirmation + admin notification via IONOS SMTP.
    //    The official invoice PDF is issued and emailed by lexoffice (above),
    //    so we deliberately do NOT attach our own PDF here (no second invoice).
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const invNum = invoiceNumber || paymentId;
      const orderDate = new Date().toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });

      const emailInput = {
        customerName, customerEmail, productName, amount,
        invoiceNumber: invNum,
        birthDataItems,
        orderDate,
      };
      try {
        await sendOrderConfirmationToCustomer(emailInput); // confirmation only, no PDF
        await sendInvoiceConfirmationEmail(emailInput);    // admin notification to Robert
      } catch (err) {
        console.error('Email error:', err);
      }
    }
  }

  // Mollie expects 200 OK to confirm receipt
  return res.status(200).end();
}
