import type { VercelRequest, VercelResponse } from '@vercel/node';
import { runHealthChecks } from '../../src/lib/health.js';
import { sendSystemAlert } from '../../src/lib/mailer.js';

// Internal watchdog, triggered by a Vercel Cron (see vercel.json). Runs the deep
// health checks and, if something is wrong, e-mails info@ + Robert. Protected by
// CRON_SECRET: Vercel sends it as a Bearer token on cron invocations, so public
// requests cannot trigger alert mails.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return res.status(500).json({ error: 'CRON_SECRET not configured' });
  if (req.headers.authorization !== `Bearer ${secret}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const r = await runHealthChecks();
  if (!r.ok) {
    try {
      await sendSystemAlert('⚠️ System-Warnung – astroversity.academy', r.failed);
    } catch (e) {
      console.error('watchdog: alert mail failed', e);
    }
  }
  return res.status(200).json({ ok: r.ok, failed: r.failed });
}
