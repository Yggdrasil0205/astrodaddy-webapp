import type { VercelRequest, VercelResponse } from '@vercel/node';

// TEMPORARY diagnostic — read-only lexoffice connection check via GET /v1/profile.
// Creates NOTHING in lexoffice. Remove after debugging.
export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const key = process.env.API_Lexware?.trim();
  if (!key) {
    return res.status(200).json({ hasKey: false, note: 'API_Lexware ist in Vercel NICHT gesetzt → lexoffice ist inaktiv' });
  }

  try {
    const r = await fetch('https://api.lexoffice.io/v1/profile', {
      headers: { Authorization: `Bearer ${key}`, Accept: 'application/json' },
    });
    const data: any = await r.json().catch(() => ({}));
    return res.status(200).json({
      hasKey: true,
      httpStatus: r.status,
      connected: r.ok,
      profile: r.ok
        ? { companyName: data.companyName, organizationId: data.organizationId, taxType: data.taxType, smallBusiness: data.smallBusiness }
        : data,
    });
  } catch (e: any) {
    return res.status(200).json({ hasKey: true, error: e?.message ?? String(e) });
  }
}
