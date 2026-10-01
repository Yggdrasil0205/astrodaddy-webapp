import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendNewsletterWelcome } from '../src/lib/mailer.js';
import { rateLimit, clientIp } from '../src/lib/ratelimit.js';

// ── POST /api/newsletter ──────────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!rateLimit(`newsletter:${clientIp(req)}`, 5, 60_000)) {
    return res.status(429).json({ error: 'Zu viele Anfragen. Bitte versuch es gleich noch einmal.' });
  }

  const { email } = req.body as { email?: string };
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Ungültige E-Mail-Adresse.' });
  }

  const normalizedEmail = email.trim().toLowerCase();

  // ── Save to Supabase (optional – skip if not configured) ─────────────────
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
      const { error: upsertErr } = await supabase
        .from('newsletter_subscribers')
        .upsert({ email: normalizedEmail, subscribed_at: new Date().toISOString() }, { onConflict: 'email' });
      if (upsertErr) console.error('Supabase newsletter error:', upsertErr);
    } catch (dbErr) {
      console.error('Supabase newsletter error:', dbErr);
    }
  }

  // ── Send welcome email via IONOS SMTP ─────────────────────────────────────
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    await sendNewsletterWelcome(normalizedEmail).catch(err =>
      console.error('Welcome email error:', err),
    );
  }

  return res.status(200).json({ ok: true });
}
