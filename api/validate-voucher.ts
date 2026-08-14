import type { VercelRequest, VercelResponse } from '@vercel/node';
import { cartBaseTotal, applyVoucher, type CartLine } from '../src/lib/vouchers.js';

// POST /api/validate-voucher  { code, items:[{id,quantity}] }
// Public — lets the checkout UI show the discount. The authoritative price is
// still recomputed at /api/checkout, so this can't be abused to change a price.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { code, items } = (req.body ?? {}) as { code?: string; items?: CartLine[] };
    const base = cartBaseTotal(items ?? []);
    const result = await applyVoucher(code, base);

    if (!result.valid) return res.status(200).json({ valid: false, error: result.error });

    return res.status(200).json({
      valid: true,
      code: result.code,
      type: result.type,
      value: result.value,
      baseAmount: base,
      discountAmount: result.discountAmount,
      finalAmount: result.finalAmount,
    });
  } catch (e: any) {
    return res.status(400).json({ valid: false, error: e?.message ?? 'Fehler.' });
  }
}
