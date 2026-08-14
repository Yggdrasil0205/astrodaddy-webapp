import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendOrderConfirmationToCustomer, sendInvoiceConfirmationEmail } from '../src/lib/mailer.js';
import { generateInvoicePdf } from '../src/lib/invoice-pdf.js';

// TEMPORARY diagnostic — mirrors the webhook's "paid" email path. Sends to the
// configured mailbox itself. Remove after debugging.
export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const steps: Record<string, unknown> = {};
  const to = (process.env.SMTP_USER ?? 'info@astroversity.academy').trim();
  const orderDate = new Date().toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });

  const base = {
    customerName: 'Test Kunde',
    customerEmail: to,
    productName: 'Diagnose-Testprodukt',
    amount: 1.0,
    invoiceNumber: 'TEST-0001',
    orderDate,
  };

  // 1. PDF generation (pdfkit)
  let invoicePdfBuffer: Buffer | undefined;
  try {
    invoicePdfBuffer = await generateInvoicePdf({
      invoiceNumber: base.invoiceNumber,
      invoiceDate: orderDate,
      orderNumber: base.invoiceNumber,
      orderDate,
      customerName: base.customerName,
      customerEmail: base.customerEmail,
      productName: base.productName,
      productPrice: base.amount,
    });
    steps.pdf = { ok: true, bytes: invoicePdfBuffer?.length ?? 0 };
  } catch (e: any) {
    steps.pdf = { ok: false, error: e?.message ?? String(e), stack: (e?.stack ?? '').split('\n').slice(0, 4) };
  }

  const emailInput = { ...base, invoicePdfBuffer };

  // 2. order confirmation email
  try {
    await sendOrderConfirmationToCustomer(emailInput);
    steps.orderMail = { ok: true };
  } catch (e: any) {
    steps.orderMail = { ok: false, error: e?.message ?? String(e) };
  }

  // 3. invoice confirmation email
  try {
    await sendInvoiceConfirmationEmail(emailInput);
    steps.invoiceMail = { ok: true };
  } catch (e: any) {
    steps.invoiceMail = { ok: false, error: e?.message ?? String(e) };
  }

  return res.status(200).json({ to, steps });
}
