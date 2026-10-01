import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { requireAdmin } from '../src/lib/admin-auth.js';
import { analyticsConfigured, lastDays, syncAnalyticsDays } from '../src/lib/analytics-sync.js';

// ── Admin API for /robertlogin (one function – the Hobby plan caps the count) ──
// GET    /api/admin?r=orders[&from=YYYY-MM-DD&to=YYYY-MM-DD&status=bezahlt]
// GET    /api/admin?r=vouchers
// POST   /api/admin?r=vouchers            { code, type, value, validUntil? }
// DELETE /api/admin?r=vouchers&id=…       (or &code=…)
// GET    /api/admin?r=analytics&days=30   (days=0 → all)
// POST   /api/admin?r=analytics&days=31   pull the last N days from Vercel now
// Protected by the x-admin-secret header (see src/lib/admin-auth.ts).

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!(await requireAdmin(req, res))) return;

  try {
    switch (req.query.r) {
      case 'orders':    return await orders(req, res);
      case 'vouchers':  return await vouchers(req, res);
      case 'analytics': return await analytics(req, res);
      default:          return res.status(404).json({ error: 'Unbekannte Ressource' });
    }
  } catch (e) {
    console.error('admin api error:', e);
    return res.status(500).json({ error: 'Serverfehler' });
  }
}

// ── Orders ────────────────────────────────────────────────────────────────────
async function orders(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const { from, to, status } = req.query as Record<string, string>;

  let query = supabase.from('orders').select('*').order('created_at', { ascending: false });
  if (from) query = query.gte('created_at', from);
  if (to)   query = query.lte('created_at', to + 'T23:59:59');
  if (status && status !== 'alle') query = query.eq('status', status);

  const { data, error } = await query;
  if (error) {
    console.error('Supabase query error:', error);
    return res.status(500).json({ error: 'Datenbankfehler' });
  }
  return res.status(200).json({ orders: data });
}

// ── Vouchers ──────────────────────────────────────────────────────────────────
async function vouchers(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('discount_codes')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return res.status(200).json({ codes: data });
  }

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
}

// ── Website statistics (Vercel Web Analytics archive) ─────────────────────────
async function analytics(req: VercelRequest, res: VercelResponse) {
  const days = Math.max(0, Math.min(3650, Math.floor(Number(req.query.days ?? 30)) || 0));

  if (req.method === 'POST') {
    if (!analyticsConfigured()) return res.status(400).json({ error: 'VERCEL_ANALYTICS_TOKEN ist in Vercel nicht gesetzt.' });
    try {
      const result = await syncAnalyticsDays(lastDays(Math.min(Math.max(days, 1), 31)));
      return res.status(200).json(result);
    } catch (e: any) {
      return res.status(500).json({ error: e?.message ?? 'Synchronisierung fehlgeschlagen.' });
    }
  }

  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const since = days > 0 ? lastDays(days)[days - 1] : null;
  const { data, error } = await supabase.rpc('analytics_summary', { p_since: since });
  if (error) {
    console.error('analytics_summary error:', error);
    return res.status(500).json({ error: 'Datenbankfehler' });
  }
  return res.status(200).json({ configured: analyticsConfigured(), ...data });
}
