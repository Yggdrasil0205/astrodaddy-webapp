import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { requireAdmin } from '../src/lib/admin-auth.js';
import { analyticsConfigured, lastDays, syncAnalyticsDays } from '../src/lib/analytics-sync.js';

// ── Website statistics for the admin dashboard (/robertlogin) ─────────────────
// GET  /api/analytics?days=30         → summary from the Supabase archive (days=0 → all)
// POST /api/analytics?days=30         → pull the last N days from Vercel now (max 31)
// Protected by the x-admin-secret header (see src/lib/admin-auth.ts).
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!(await requireAdmin(req, res))) return;

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

  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const since = days > 0 ? lastDays(days)[days - 1] : null;
  const { data, error } = await supabase.rpc('analytics_summary', { p_since: since });
  if (error) {
    console.error('analytics_summary error:', error);
    return res.status(500).json({ error: 'Datenbankfehler' });
  }
  return res.status(200).json({ configured: analyticsConfigured(), ...data });
}
