import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// ── Admin voucher management ──────────────────────────────────────────────────
// GET    /api/vouchers            → list all codes
// POST   /api/vouchers            → create { code, type, value, validUntil? }
// DELETE /api/vouchers?id=…       → delete by id (or ?code=…)
// Protected by the x-admin-secret header (ADMIN_SECRET).

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.headers['x-admin-secret'] !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // ── List ────────────────────────────────────────────────────────────────
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('discount_codes')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return res.status(200).json({ codes: data });
    }

    // ── Create ──────────────────────────────────────────────────────────────
    if (req.method === 'POST') {
      const { code, type, value, validUntil } = (req.body ?? {}) as {
        code?: string; type?: string; value?: number | string; validUntil?: string;
      };
      const normCode = String(code ?? '').trim().toUpperCase();
      const t = type === 'fixed' ? 'fixed' : 'percent';
      const v = Number(value);

      if (!normCode) return res.status(400).json({ error: 'Code fehlt.' });
      if (!Number.isFinite(v) || v <= 0) return res.status(400).json({ error: 'Wert muss größer als 0 sein.' });
      if (t === 'percent' && v > 100) return res.status(400).json({ error: 'Prozent darf höchstens 100 sein.' });

      const { data, error } = await supabase
        .from('discount_codes')
        .insert({ code: normCode, type: t, value: v, valid_until: validUntil || null, active: true })
        .select()
        .single();

      if (error) {
        if (error.code === '23505') return res.status(409).json({ error: 'Dieser Code existiert bereits.' });
        throw error;
      }
      return res.status(200).json({ code: data });
    }

    // ── Delete ──────────────────────────────────────────────────────────────
    if (req.method === 'DELETE') {
      const id = (req.query.id as string) ?? '';
      const code = (req.query.code as string) ?? '';
      if (!id && !code) return res.status(400).json({ error: 'id oder code erforderlich.' });

      const del = supabase.from('discount_codes').delete();
      const { error } = await (id ? del.eq('id', id) : del.eq('code', code.trim().toUpperCase()));
      if (error) throw error;
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e: any) {
    console.error('vouchers error:', e);
    return res.status(500).json({ error: e?.message ?? 'Serverfehler' });
  }
}
