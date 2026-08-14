import type { VercelRequest, VercelResponse } from '@vercel/node';

// TEMPORARY diagnostic — read-only lexoffice connection check via GET /v1/profile.
// Creates NOTHING in lexoffice. Remove after debugging.
export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const key = process.env.API_Lexware?.trim();
  if (!key) {
    return res.status(200).json({ hasKey: false, note: 'API_Lexware ist in Vercel NICHT gesetzt → lexoffice ist inaktiv' });
  }

  try {
    const auth = { Authorization: `Bearer ${key}`, Accept: 'application/json' };

    const r = await fetch('https://api.lexoffice.io/v1/profile', { headers: auth });
    const data: any = await r.json().catch(() => ({}));

    // Read-only: list the most recent invoices to see if test purchases landed
    const listUrl = 'https://api.lexoffice.io/v1/voucherlist?voucherType=invoice'
      + '&voucherStatus=draft,open,paid,voided,transferred,overdue'
      + '&sort=voucherDate,DESC&page=0&size=8';
    const lr = await fetch(listUrl, { headers: auth });
    const list: any = await lr.json().catch(() => ({}));
    const recent = Array.isArray(list?.content)
      ? list.content.map((v: any) => ({ number: v.voucherNumber, date: v.voucherDate, name: v.contactName, total: v.totalAmount, status: v.voucherStatus }))
      : list;

    return res.status(200).json({
      hasKey: true,
      httpStatus: r.status,
      connected: r.ok,
      profile: r.ok
        ? { companyName: data.companyName, organizationId: data.organizationId, taxType: data.taxType, smallBusiness: data.smallBusiness }
        : data,
      invoiceCount: list?.totalElements,
      recentInvoices: recent,
    });
  } catch (e: any) {
    return res.status(200).json({ hasKey: true, error: e?.message ?? String(e) });
  }
}
