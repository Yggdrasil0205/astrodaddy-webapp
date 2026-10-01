import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHash, timingSafeEqual } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';
import { clientIp } from './ratelimit.js';

// ── Admin auth for /robertlogin endpoints ─────────────────────────────────────
// The x-admin-secret header must match ADMIN_SECRET (compared in constant time).
// Brute-force guard: after MAX_FAILURES wrong secrets from one IP within
// WINDOW_MS, that IP is locked out until the window has passed. Failures are
// stored in Supabase (admin_login_failures) so the limit holds across all
// serverless instances; if the DB is unreachable we fall back to memory.

const MAX_FAILURES = 5;
const WINDOW_MS = 15 * 60_000;
const memFailures = new Map<string, number[]>();

function sameSecret(given: string, expected: string): boolean {
  const a = createHash('sha256').update(given).digest();
  const b = createHash('sha256').update(expected).digest();
  return timingSafeEqual(new Uint8Array(a), new Uint8Array(b));
}

function db() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? createClient(url, key) : null;
}

async function recentFailures(ip: string): Promise<number> {
  const since = Date.now() - WINDOW_MS;
  const supabase = db();
  if (supabase) {
    const { count, error } = await supabase
      .from('admin_login_failures')
      .select('id', { count: 'exact', head: true })
      .eq('ip', ip)
      .gte('created_at', new Date(since).toISOString());
    if (!error) return count ?? 0;
    console.error('admin-auth: failure count error', error);
  }
  return (memFailures.get(ip) ?? []).filter(t => t >= since).length;
}

async function recordFailure(ip: string): Promise<void> {
  const now = Date.now();
  memFailures.set(ip, [...(memFailures.get(ip) ?? []).filter(t => now - t < WINDOW_MS), now]);
  const supabase = db();
  if (!supabase) return;
  const { error } = await supabase.from('admin_login_failures').insert({ ip });
  if (error) console.error('admin-auth: failure insert error', error);
}

/** Returns true if the request is authorised; otherwise sends 401/429 and returns false. */
export async function requireAdmin(req: VercelRequest, res: VercelResponse): Promise<boolean> {
  const expected = process.env.ADMIN_SECRET;
  if (!expected) {
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }

  const ip = clientIp(req);
  if (await recentFailures(ip) >= MAX_FAILURES) {
    res.status(429).json({ error: 'Zu viele Fehlversuche. Bitte in 15 Minuten erneut versuchen.' });
    return false;
  }

  const given = req.headers['x-admin-secret'];
  if (typeof given !== 'string' || !sameSecret(given, expected)) {
    await recordFailure(ip);
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }
  return true;
}
