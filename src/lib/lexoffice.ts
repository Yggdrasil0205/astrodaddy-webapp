// ── Lexoffice API client ──────────────────────────────────────────────────────
// Docs: https://developers.lexoffice.io/docs/
//
// Required env var: API_Lexware
//
// Lexoffice handles:
//   - Rechnung erstellen (mit korrekten deutschen Pflichtangaben)
//   - Rechnung per E-Mail an Kunden senden
//   - Archivierung + DATEV-Export für Steuerberater

const BASE_URL = 'https://api.lexoffice.io/v1';

function headers() {
  return {
    Authorization: `Bearer ${process.env.API_Lexware}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
}

// ── Types ─────────────────────────────────────────────────────────────────────
export interface InvoiceInput {
  customerName: string;
  customerEmail: string;
  productName: string;
  amount: number;     // Bruttobetrag in EUR
  orderId: string;    // our internal order ID (used as reference)
}

export interface InvoiceResult {
  invoiceId: string;
  invoiceNumber: string;
}

// ── Create invoice in Lexoffice ───────────────────────────────────────────────
// Creates a finalized invoice. Kleinunternehmer: no VAT displayed.
export async function createLexofficeInvoice(input: InvoiceInput): Promise<InvoiceResult> {
  const { customerName, customerEmail, productName, amount, orderId } = input;

  // Split name into first/last (best-effort)
  const nameParts = customerName.trim().split(' ');
  const firstName = nameParts.slice(0, -1).join(' ') || customerName;
  const lastName = nameParts.at(-1) ?? '';

  const body = {
    archived: false,
    voucherDate: new Date().toISOString(),
    address: {
      name: customerName,
      contactPerson: { firstName, lastName, emailAddress: customerEmail },
    },
    lineItems: [
      {
        type: 'custom',
        name: productName,
        description: `Bestellreferenz: ${orderId}`,
        quantity: 1,
        unitName: 'Stück',
        unitPrice: {
          currency: 'EUR',
          netAmount: amount,    // Kleinunternehmer: net = gross (no VAT)
          grossAmount: amount,
          taxRatePercentage: 0, // § 19 UStG
        },
        discountPercentage: 0,
        lineItemAmount: amount,
      },
    ],
    totalPrice: {
      currency: 'EUR',
      totalNetAmount: amount,
      totalGrossAmount: amount,
      totalTaxAmount: 0,
    },
    taxConditions: {
      taxType: 'vatfree',               // Kleinunternehmerregelung
      taxTypeNote: 'Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.',
    },
    paymentConditions: {
      paymentTermLabel: 'Sofortzahlung',
      paymentTermDuration: 0,
    },
    introduction: 'Vielen Dank für Ihre Bestellung bei Robert Wagner Astrologie.',
    remark: 'Bei Fragen erreichen Sie mich unter adastra.lights@gmail.com',
  };

  const res = await fetch(`${BASE_URL}/invoices?finalize=true`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(body),
  });

  const data = await res.json() as any;
  if (!res.ok) throw new Error(`Lexoffice invoice creation failed: ${JSON.stringify(data)}`);

  // Fetch invoice number (not returned on creation)
  const invoiceRes = await fetch(`${BASE_URL}/invoices/${data.id}`, { headers: headers() });
  const invoice = await invoiceRes.json() as any;

  return {
    invoiceId: data.id,
    invoiceNumber: invoice.voucherNumber ?? data.id,
  };
}

// ── Send invoice PDF to customer via Lexoffice ────────────────────────────────
export async function sendLexofficeInvoiceByEmail(
  invoiceId: string,
  recipientEmail: string,
): Promise<void> {
  const body = {
    emailAddress: recipientEmail,
    emailSubject: 'Ihre Rechnung von Robert Wagner Astrologie',
    emailBody: `Vielen Dank für Ihre Bestellung!\n\nIm Anhang finden Sie Ihre Rechnung als PDF.\n\nBei Fragen stehe ich Ihnen gerne zur Verfügung.\n\nHerzliche Grüße\nRobert Wagner\nadastra.lights@gmail.com`,
  };

  const res = await fetch(`${BASE_URL}/invoices/${invoiceId}/document/email`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Lexoffice email send failed: ${JSON.stringify(err)}`);
  }
}

// ── Fetch all invoices from Lexoffice (for admin dashboard fallback) ───────────
export async function fetchLexofficeInvoices(page = 0, size = 25) {
  const res = await fetch(
    `${BASE_URL}/invoices?page=${page}&size=${size}&sort=voucherDate,DESC`,
    { headers: headers() },
  );
  return res.json();
}
