import type { VercelRequest, VercelResponse } from '@vercel/node';
import { runHealthChecks } from '../../src/lib/health.js';
import { sendSystemAlert } from '../../src/lib/mailer.js';
import { analyticsConfigured, lastDays, syncAnalyticsDays } from '../../src/lib/analytics-sync.js';

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
  // Daily housekeeping (Hobby allows one daily cron, so it runs here).
  // 1) Archive Vercel Web Analytics – the last 3 days, so a missed run heals itself.
  let analytics: unknown = 'not configured';
  if (analyticsConfigured()) {
    try {
      analytics = await syncAnalyticsDays(lastDays(3));
    } catch (e: any) {
      console.error('watchdog: analytics sync failed', e);
      analytics = { error: e?.message ?? String(e) };
    }
  }
  // 2) Prune old admin login failures (only the last 15 min matter).
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
      const { error } = await supabase.from('admin_login_failures')
        .delete().lt('created_at', new Date(Date.now() - 86_400_000).toISOString());
      if (error) console.error('watchdog: prune admin_login_failures failed', error);

      // 3) Remove expired one-day Glücksrad codes (KOSMOS-*) so they don't pile
      //    up in discount_codes (they are valid only on the day they were won).
      const today = new Date().toISOString().slice(0, 10);
      const { error: spinErr } = await supabase.from('discount_codes')
        .delete().like('code', 'KOSMOS-%').lt('valid_until', today);
      if (spinErr) console.error('watchdog: prune spin codes failed', spinErr);
    } catch (e) {
      console.error('watchdog: prune failed', e);
    }
  }

  return res.status(200).json({ ok: r.ok, failed: r.failed, analytics });
}
