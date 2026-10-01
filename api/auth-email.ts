import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendAuthEmail } from '../src/lib/mailer.js';
import { verifyHookSignature, safeRedirect, verifyLink, type HookPayload } from '../src/lib/auth-email-hook.js';

// ── POST /api/auth-email — Supabase "Send Email Hook" ─────────────────────────
// Supabase calls this instead of sending account e-mails itself (sign-up
// confirmation, password reset, …), so they go out via our IONOS SMTP like all
// other mails. Configure in Supabase: Authentication → Hooks → Send Email →
// HTTPS → https://astroversity.academy/api/auth-email, and put the generated
// secret into the Vercel env var SEND_EMAIL_HOOK_SECRET.

async function readRawBody(req: VercelRequest): Promise<string> {
  const chunks: Uint8Array[] = [];
  for await (const chunk of req) chunks.push(new Uint8Array(typeof chunk === 'string' ? Buffer.from(chunk) : chunk));
  return Buffer.concat(chunks).toString('utf8');
}

const fail = (res: VercelResponse, code: number, message: string) =>
  res.status(code).json({ error: { http_code: code, message } });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return fail(res, 405, 'Method not allowed');

  const secret = process.env.SEND_EMAIL_HOOK_SECRET;
  if (!secret) return fail(res, 500, 'SEND_EMAIL_HOOK_SECRET not configured');

  const raw = await readRawBody(req);
  if (!verifyHookSignature(raw, req.headers, secret)) return fail(res, 401, 'Invalid signature');

  let payload: HookPayload;
  try { payload = JSON.parse(raw); } catch { return fail(res, 400, 'Invalid JSON'); }

  const { user, email_data: d } = payload;
  const type = d?.email_action_type;

  try {
    switch (type) {
      case 'signup':
        await sendAuthEmail({
          to: user.email,
          subject: 'Bitte bestätige deine E-Mail-Adresse',
          title: 'Bitte bestätige deine E-Mail-Adresse',
          body: 'Schön, dass du da bist! Bitte bestätige mit einem Klick deine E-Mail-Adresse, damit dein Kundenkonto aktiv wird und du deine Bestellungen sehen kannst.',
          button: { label: 'E-Mail-Adresse bestätigen', url: verifyLink(d.token_hash, 'signup', safeRedirect(d.redirect_to, '/mitglieder')) },
          note: 'Du hast dich nicht registriert? Dann kannst du diese E-Mail einfach ignorieren.',
        });
        break;

      case 'recovery':
        await sendAuthEmail({
          to: user.email,
          subject: 'Dein neues Passwort für Astroversity Academy',
          title: 'Neues Passwort festlegen',
          body: 'Du hast angefordert, dein Passwort zurückzusetzen. Klicke auf den Button, um ein neues Passwort festzulegen. Der Link ist aus Sicherheitsgründen nur begrenzt gültig.',
          button: { label: 'Neues Passwort festlegen', url: verifyLink(d.token_hash, 'recovery', safeRedirect(d.redirect_to, '/reset-password')) },
          note: 'Du hast das nicht angefordert? Dann ignoriere diese E-Mail – dein Passwort bleibt unverändert.',
        });
        break;

      case 'magiclink':
      case 'invite':
        await sendAuthEmail({
          to: user.email,
          subject: type === 'invite' ? 'Deine Einladung zur Astroversity Academy' : 'Dein Anmeldelink für Astroversity Academy',
          title: type === 'invite' ? 'Du wurdest eingeladen' : 'Dein Anmeldelink',
          body: type === 'invite'
            ? 'Du wurdest eingeladen, ein Kundenkonto bei der Astroversity Academy anzulegen. Klicke auf den Button, um die Einladung anzunehmen.'
            : 'Klicke auf den Button, um dich ohne Passwort anzumelden.',
          button: { label: type === 'invite' ? 'Einladung annehmen' : 'Jetzt anmelden', url: verifyLink(d.token_hash, type, safeRedirect(d.redirect_to, '/mitglieder')) },
          note: 'Du hast das nicht angefordert? Dann ignoriere diese E-Mail.',
        });
        break;

      case 'email_change': {
        // Secure email change: Supabase pairs token_hash_new with the CURRENT
        // address and token_hash with the NEW one (naming is inverted, see docs).
        const redirect = safeRedirect(d.redirect_to, '/mitglieder');
        const targets: [string | undefined, string | undefined][] = [
          [user.email, d.token_hash_new],
          [user.new_email, d.token_hash],
        ];
        for (const [to, hash] of targets) {
          if (!to || !hash) continue;
          await sendAuthEmail({
            to,
            subject: 'Bitte bestätige die Änderung deiner E-Mail-Adresse',
            title: 'E-Mail-Adresse ändern',
            body: `Bitte bestätige die Änderung der E-Mail-Adresse deines Kundenkontos auf <strong>${user.new_email ?? ''}</strong>.`,
            button: { label: 'Änderung bestätigen', url: verifyLink(hash, 'email_change', redirect) },
            note: 'Du hast das nicht angefordert? Dann ignoriere diese E-Mail und schreib uns an info@astroversity.academy.',
          });
        }
        break;
      }

      case 'reauthentication':
        await sendAuthEmail({
          to: user.email,
          subject: 'Dein Bestätigungscode',
          title: 'Dein Bestätigungscode',
          body: 'Bitte gib diesen Code ein, um die Aktion zu bestätigen:',
          code: d.token,
          note: 'Du hast das nicht angefordert? Dann ignoriere diese E-Mail.',
        });
        break;

      default:
        console.warn('auth-email: unhandled email_action_type', type);
        return fail(res, 400, `Unsupported email_action_type: ${type}`);
    }
  } catch (e: any) {
    console.error('auth-email: send failed', e);
    return fail(res, 500, 'E-Mail konnte nicht gesendet werden.');
  }

  return res.status(200).json({});
}
