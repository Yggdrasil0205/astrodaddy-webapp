import type { VercelRequest, VercelResponse } from '@vercel/node';
import { runHealthChecks } from '../src/lib/health.js';

// GET /api/health — public health endpoint for an external uptime monitor
// (UptimeRobot, Better Stack, …). Returns 200 only when everything is healthy,
// 503 otherwise, so the monitor alerts on real problems, not just "page loads".
export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const r = await runHealthChecks();
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  return res.status(r.ok ? 200 : 503).json({
    status: r.ok ? 'ok' : 'error',
    checks: r.checks,
    time: new Date().toISOString(),
  });
}
