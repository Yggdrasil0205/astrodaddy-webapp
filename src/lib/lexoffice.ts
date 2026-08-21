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
    Authorization: `Bearer ${process.env.API_Lexware?.trim()}`,
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
export async function createLexofficeInvoice(input: InvoiceInput, finalize = true): Promise<InvoiceResult> {
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
      countryCode: 'DE',
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
          grossAmount: amount,      // Bruttopreis inkl. USt (Shop-Preise sind brutto)
          taxRatePercentage: 19,    // Regelsteuersatz
        },
        discountPercentage: 0,
      },
    ],
    totalPrice: { currency: 'EUR' },   // lexoffice berechnet netto / USt / brutto
    taxConditions: { taxType: 'gross' },
    shippingConditions: {
      shippingDate: new Date().toISOString(),
      shippingType: 'service',         // Leistungsdatum (Dienstleistung)
    },
    paymentConditions: {
      paymentTermLabel: 'Sofortzahlung',
      paymentTermDuration: 0,
    },
    introduction: 'Vielen Dank für Ihre Bestellung bei Robert Wagner Astrologie.',
    remark: 'Bei Fragen erreichen Sie mich unter info@astroversity.academy',
  };

  const res = await fetch(`${BASE_URL}/invoices?finalize=${finalize}`, {
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
    emailBody: `Vielen Dank für Ihre Bestellung!\n\nIm Anhang finden Sie Ihre Rechnung als PDF.\n\nBei Fragen stehe ich Ihnen gerne zur Verfügung.\n\nHerzliche Grüße\nRobert Wagner\ninfo@astroversity.academy`,
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

// ── Download the finalized invoice PDF as a Buffer ────────────────────────────
export async function getLexofficeInvoicePdf(invoiceId: string): Promise<Buffer> {
  const docRes = await fetch(`${BASE_URL}/invoices/${invoiceId}/document`, { headers: headers() });
  if (!docRes.ok) {
    const err = await docRes.json().catch(() => ({}));
    throw new Error(`Lexoffice document render failed: ${JSON.stringify(err)}`);
  }
  const { documentFileId } = await docRes.json() as { documentFileId: string };
  const fileRes = await fetch(`${BASE_URL}/files/${documentFileId}`, {
    headers: { Authorization: `Bearer ${process.env.API_Lexware?.trim()}`, Accept: 'application/pdf' },
  });
  if (!fileRes.ok) throw new Error(`Lexoffice file download failed: ${fileRes.status}`);
  return Buffer.from(await fileRes.arrayBuffer());
}

// ── Fetch all invoices from Lexoffice (for admin dashboard fallback) ───────────
export async function fetchLexofficeInvoices(page = 0, size = 25) {
  const res = await fetch(
    `${BASE_URL}/invoices?page=${page}&size=${size}&sort=voucherDate,DESC`,
    { headers: headers() },
  );
  return res.json();
}
