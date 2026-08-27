import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { cartBaseTotal, type CartLine } from '../src/lib/vouchers.js';

// ── "Kosmisches Rad" — server-authoritative spin ──────────────────────────────
// The reward is decided HERE (never by the client). For a percentage win we
// issue a single-use, same-day KOSMOS- code; the call jackpot returns a
// KOSMOS-CALL- code (0 %, redeemed as a flag at checkout). Redemption is gated
// on the cart still holding 2+ items (see applyVoucher).

const REWARDS = [
  { type: 'pct',  value: 10, w: 20 },
  { type: 'pct',  value: 5,  w: 12 },
  { type: 'pct',  value: 15, w: 14 },
  { type: 'pct',  value: 20, w: 8  },
  { type: 'call', value: 0,  w: 7  },
] as const;

function pickReward() {
  const total = REWARDS.reduce((s, r) => s + r.w, 0);
  let r = Math.random() * total;
  for (const rw of REWARDS) if ((r -= rw.w) < 0) return rw;
  return REWARDS[0];
}

function randCode(n = 5): string {
  const A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no ambiguous chars
  let s = '';
  for (let i = 0; i < n; i++) s += A[Math.floor(Math.random() * A.length)];
  return s;
}

// POST /api/spin  { items: [{ id, quantity }] }
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { items } = (req.body ?? {}) as { items?: CartLine[] };
  const list = Array.isArray(items) ? items : [];

  // Eligibility — real products + at least two items in the cart (checked against
  // the trusted catalog, never the client-supplied prices).
  try {
    cartBaseTotal(list);
  } catch {
    return res.status(400).json({ error: 'Warenkorb ungültig.' });
  }
  const count = list.reduce((s, it) => s + Math.max(1, Math.floor(Number(it.quantity) || 1)), 0);
  if (count < 2) {
    return res.status(400).json({ eligible: false, error: 'Füge ein weiteres Angebot hinzu, um zu drehen.' });
  }

  const url = process.env.SUPABASE_URL;
  const srv = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !srv) return res.status(500).json({ error: 'Aktion derzeit nicht verfügbar.' });
  const supabase = createClient(url, srv);

  const reward = pickReward();
  const today = new Date().toISOString().slice(0, 10);            // YYYY-MM-DD (expires end of today)
  const prefix = reward.type === 'call' ? 'KOSMOS-CALL-' : 'KOSMOS-';

  // Insert the code, retrying on the rare unique-collision.
  let code = '';
  for (let attempt = 0; attempt < 4; attempt++) {
    const candidate = prefix + randCode();
    const { error } = await supabase.from('discount_codes').insert({
      code: candidate,
      type: 'percent',
      value: reward.value,     // 0 for the call — no discount, just the bonus flag
      active: true,
      valid_until: today,      // single-use is the real guard (see applyVoucher)
    });
    if (!error) { code = candidate; break; }
    if (error.code !== '23505') { // 23505 = unique_violation → retry with a new code
      console.error('spin insert error:', error);
      return res.status(500).json({ error: 'Serverfehler.' });
    }
  }
  if (!code) return res.status(500).json({ error: 'Serverfehler.' });

  return res.status(200).json(
    reward.type === 'call'
      ? { type: 'call', code }
      : { type: 'pct', value: reward.value, code },
  );
}
