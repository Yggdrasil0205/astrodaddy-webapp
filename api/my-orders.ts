import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// ── Supabase admin client ─────────────────────────────────────────────────────
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// ── GET /api/my-orders ────────────────────────────────────────────────────────
// Returns the orders that belong to the currently logged-in customer.
// Authenticated via the customer's Supabase access token (Bearer header) —
// the email is taken from the verified token, never from the request body,
// so a customer can only ever see their own orders.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Nicht angemeldet' });

  const { data: userData, error: userErr } = await supabase.auth.getUser(token);
  if (userErr || !userData?.user?.email) {
    return res.status(401).json({ error: 'Sitzung ungültig' });
  }

  const { data, error } = await supabase
    .from('orders')
    .select('id, created_at, product_name, amount, status, mollie_payment_id')
    .eq('customer_email', userData.user.email)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('my-orders query error:', error);
    return res.status(500).json({ error: 'Datenbankfehler' });
  }

  return res.status(200).json({ orders: data ?? [] });
}
