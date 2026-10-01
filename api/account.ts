import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { sendAuthEmail } from '../src/lib/mailer.js';
import { rateLimit, clientIp } from '../src/lib/ratelimit.js';

// ── Customer account e-mails without Supabase's mailer ────────────────────────
// POST /api/account?action=register  { email, password, name }
// POST /api/account?action=reset     { email }
//
// Supabase only *creates* the one-time link (admin.generateLink, which sends
// nothing); we e-mail it ourselves through the same IONOS account as all shop
// mails. The link points to our own /auth/confirm page, which redeems it with
// verifyOtp() – so neither Supabase's SMTP settings nor its Site URL /
// redirect allowlist are involved.

const SITE_URL = (process.env.PUBLIC_SITE_URL ?? 'https://astroversity.academy').replace(/\/$/, '');

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const confirmUrl = (tokenHash: string, type: string) =>
  `${SITE_URL}/auth/confirm?${new URLSearchParams({ token_hash: tokenHash, type })}`;

const isEmail = (v: unknown): v is string => typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length <= 254;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const action = req.query.action;
  if (!rateLimit(`account:${action}:${clientIp(req)}`, 5, 10 * 60_000)) {
    return res.status(429).json({ error: 'Zu viele Versuche. Bitte warte ein paar Minuten und versuche es erneut.' });
  }

  try {
    if (action === 'register') return await register(req, res);
    if (action === 'reset') return await reset(req, res);
    return res.status(404).json({ error: 'Unbekannte Aktion' });
  } catch (e) {
    console.error(`account ${action} error:`, e);
    return res.status(500).json({ error: 'Die E-Mail konnte gerade nicht versendet werden. Bitte versuche es später erneut oder schreib uns an info@astroversity.academy.' });
  }
}

// ── Registration ──────────────────────────────────────────────────────────────
async function register(req: VercelRequest, res: VercelResponse) {
  const { email: rawEmail, password, name } = (req.body ?? {}) as { email?: string; password?: string; name?: string };
  const email = String(rawEmail ?? '').trim().toLowerCase();
  const fullName = String(name ?? '').trim().slice(0, 120);

  if (!isEmail(email)) return res.status(400).json({ error: 'Bitte gib eine gültige E-Mail-Adresse ein.' });
  if (typeof password !== 'string' || password.length < 8) {
    return res.status(400).json({ error: 'Das Passwort muss mindestens 8 Zeichen haben.' });
  }

  let tokenHash: string;
  let type: 'signup' | 'magiclink' = 'signup';

  const { data, error } = await supabase.auth.admin.generateLink({
    type: 'signup', email, password, options: { data: { full_name: fullName } },
  });

  if (!error) {
    tokenHash = data.properties.hashed_token;
  } else if ((error as any).code === 'email_exists' || /already been registered|already registered/i.test(error.message)) {
    // Existing account. Confirmed → tell the visitor to log in. Unconfirmed
    // (e.g. an earlier sign-up whose mail never arrived) → update the password
    // and send a fresh confirmation link; only the inbox owner can use it.
    const ml = await supabase.auth.admin.generateLink({ type: 'magiclink', email });
    if (ml.error) throw ml.error;
    if (ml.data.user?.email_confirmed_at) {
      return res.status(409).json({ error: 'Diese E-Mail ist bereits registriert. Bitte melde dich an oder nutze „Passwort vergessen".' });
    }
    const upd = await supabase.auth.admin.updateUserById(ml.data.user.id, {
      password, user_metadata: { ...(ml.data.user.user_metadata ?? {}), full_name: fullName },
    });
    if (upd.error) throw upd.error;
    tokenHash = ml.data.properties.hashed_token;
    type = 'magiclink';
  } else if (/password/i.test(error.message)) {
    return res.status(400).json({ error: 'Dieses Passwort ist nicht sicher genug. Bitte wähle ein anderes.' });
  } else {
    throw error;
  }

  await sendAuthEmail({
    to: email,
    subject: 'Bitte bestätige deine E-Mail-Adresse',
    title: 'Bitte bestätige deine E-Mail-Adresse',
    body: `${fullName ? `Hallo ${escapeHtml(fullName)}, s` : 'S'}chön, dass du da bist! Bitte bestätige mit einem Klick deine E-Mail-Adresse, damit dein Kundenkonto aktiv wird und du deine Bestellungen sehen kannst.`,
    button: { label: 'E-Mail-Adresse bestätigen', url: confirmUrl(tokenHash, type) },
    note: 'Du hast dich nicht registriert? Dann kannst du diese E-Mail einfach ignorieren.',
  });
  return res.status(200).json({ ok: true });
}

// ── Password reset ────────────────────────────────────────────────────────────
async function reset(req: VercelRequest, res: VercelResponse) {
  const email = String((req.body ?? {}).email ?? '').trim().toLowerCase();
  if (!isEmail(email)) return res.status(400).json({ error: 'Bitte gib eine gültige E-Mail-Adresse ein.' });

  const { data, error } = await supabase.auth.admin.generateLink({ type: 'recovery', email });
  if (error) {
    // Unknown address: answer exactly like a success so the form cannot be
    // used to find out who has an account.
    if ((error as any).status === 404 || /not found|user.*not.*exist/i.test(error.message)) {
      return res.status(200).json({ ok: true });
    }
    throw error;
  }

  await sendAuthEmail({
    to: email,
    subject: 'Dein neues Passwort für Astroversity Academy',
    title: 'Neues Passwort festlegen',
    body: 'Du hast angefordert, dein Passwort zurückzusetzen. Klicke auf den Button, um ein neues Passwort festzulegen. Der Link ist aus Sicherheitsgründen nur begrenzt gültig.',
    button: { label: 'Neues Passwort festlegen', url: confirmUrl(data.properties.hashed_token, 'recovery') },
    note: 'Du hast das nicht angefordert? Dann ignoriere diese E-Mail – dein Passwort bleibt unverändert.',
  });
  return res.status(200).json({ ok: true });
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}
