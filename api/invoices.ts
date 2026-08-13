import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// ── Supabase admin client ─────────────────────────────────────────────────────
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// ── GET /api/invoices ─────────────────────────────────────────────────────────
// Returns all orders for the admin dashboard (/robertlogin).
// Protected by a simple admin secret header.
//
// Query params:
//   ?from=2026-04-01&to=2026-04-30   (optional date filter)
//   ?status=bezahlt                   (optional status filter)
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  // ── Simple admin auth ─────────────────────────────────────────────────────
  const adminSecret = req.headers['x-admin-secret'];
  if (adminSecret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { from, to, status } = req.query as Record<string, string>;

  // ── Build query ───────────────────────────────────────────────────────────
  let query = supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

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
