import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createLexofficeInvoice } from '../src/lib/lexoffice.js';

// TEMPORARY diagnostic — creates a DRAFT invoice (finalize=false, deletable) to
// verify the 19% VAT body is accepted and computed correctly. Remove afterwards.
export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const key = process.env.API_Lexware?.trim();
  if (!key) return res.status(200).json({ error: 'API_Lexware nicht gesetzt' });

  try {
    const { invoiceId } = await createLexofficeInvoice(
      {
        customerName: 'Test Kunde',
        customerEmail: 'info@astroversity.academy',
        productName: 'Diagnose-Testprodukt (Entwurf, bitte löschen)',
        amount: 99,
        orderId: 'DIAG-TEST',
      },
      false, // finalize=false => DRAFT
    );

    const inv: any = await fetch(`https://api.lexoffice.io/v1/invoices/${invoiceId}`, {
      headers: { Authorization: `Bearer ${key}`, Accept: 'application/json' },
    }).then((x) => x.json());

    return res.status(200).json({
      ok: true,
      invoiceId,
      voucherStatus: inv.voucherStatus,
      taxType: inv.taxConditions?.taxType,
      totalPrice: inv.totalPrice, // netto / USt / brutto von lexoffice berechnet
      note: 'ENTWURF erstellt (finalize=false) — bitte in lexoffice löschen',
    });
  } catch (e: any) {
    return res.status(200).json({ ok: false, error: e?.message ?? String(e) });
  }
}
