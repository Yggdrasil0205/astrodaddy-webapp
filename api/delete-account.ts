import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// ── Supabase admin client ─────────────────────────────────────────────────────
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// ── POST /api/delete-account ──────────────────────────────────────────────────
// Lets a logged-in customer permanently delete their own login account.
// Authenticated via the customer's Supabase access token (Bearer header):
// the user id comes from the verified token, so a customer can only ever
// delete their own account.
//
// NOTE: only the auth account (the login) is removed. Past orders / invoices
// stay in the `orders` table because invoices are subject to a legal retention
// period — they are bookkeeping records, not account data.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Nicht angemeldet' });

  const { data: userData, error: userErr } = await supabase.auth.getUser(token);
  if (userErr || !userData?.user?.id) {
    return res.status(401).json({ error: 'Sitzung ungültig' });
  }

  const { error } = await supabase.auth.admin.deleteUser(userData.user.id);
  if (error) {
    console.error('delete-account error:', error);
    return res.status(500).json({ error: 'Konto konnte nicht gelöscht werden.' });
  }

  return res.status(200).json({ ok: true });
}
