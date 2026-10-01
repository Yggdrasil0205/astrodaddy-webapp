import { createHmac, timingSafeEqual } from 'node:crypto';

// ── Supabase "Send Email Hook" helpers ────────────────────────────────────────
// Supabase signs hook requests with Standard Webhooks (https://www.standardwebhooks.com):
//   signed content = `${webhook-id}.${webhook-timestamp}.${raw body}`
//   signature      = base64(HMAC-SHA256(secret, content)), sent as "v1,<sig>" (space-separated list)
// The secret is shown in Supabase as "v1,whsec_<base64>".

const TOLERANCE_S = 5 * 60;

export function verifyHookSignature(
  rawBody: string,
  headers: Record<string, string | string[] | undefined>,
  secret: string,
): boolean {
  const h = (k: string) => {
    const v = headers[k];
    return Array.isArray(v) ? v[0] : v;
  };
  const id = h('webhook-id');
  const ts = h('webhook-timestamp');
  const sigHeader = h('webhook-signature');
  if (!id || !ts || !sigHeader) return false;

  const now = Math.floor(Date.now() / 1000);
  if (!/^\d+$/.test(ts) || Math.abs(now - Number(ts)) > TOLERANCE_S) return false;

  const key = new Uint8Array(Buffer.from(secret.replace(/^v1,/, '').replace(/^whsec_/, ''), 'base64'));
  const expected = createHmac('sha256', key).update(`${id}.${ts}.${rawBody}`).digest();

  return sigHeader.split(' ').some(part => {
    const [version, sig] = part.split(',');
    if (version !== 'v1' || !sig) return false;
    const given = Buffer.from(sig, 'base64');
    return given.length === expected.length && timingSafeEqual(new Uint8Array(given), new Uint8Array(expected));
  });
}

export interface HookPayload {
  user: { email: string; new_email?: string };
  email_data: {
    token: string;
    token_hash: string;
    redirect_to: string;
    email_action_type: string;
    site_url: string;
    token_new?: string;
    token_hash_new?: string;
  };
}

const SITE_URL = (process.env.PUBLIC_SITE_URL ?? 'https://astroversity.academy').replace(/\/$/, '');

/** Never let a link point to a dev URL (e.g. a leftover localhost Site URL in Supabase). */
export function safeRedirect(url: string | undefined, fallbackPath: string): string {
  try {
    const u = new URL(url || '');
    if (u.hostname === 'localhost' || u.hostname === '127.0.0.1') return `${SITE_URL}${u.pathname === '/' ? fallbackPath : u.pathname}`;
    return u.toString();
  } catch {
    return `${SITE_URL}${fallbackPath}`;
  }
}

export function verifyLink(tokenHash: string, type: string, redirectTo: string): string {
  const base = (process.env.SUPABASE_URL ?? '').replace(/\/$/, '');
  const q = new URLSearchParams({ token: tokenHash, type, redirect_to: redirectTo });
  return `${base}/auth/v1/verify?${q}`;
}
