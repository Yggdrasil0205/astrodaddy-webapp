// Shared health checks for /api/health (external monitor) and the cron watchdog.
// Verifies the pieces the site actually needs: critical config + a live DB probe.

export interface HealthResult {
  ok: boolean;
  checks: Record<string, boolean>;
  failed: string[];
}

export async function runHealthChecks(): Promise<HealthResult> {
  const checks: Record<string, boolean> = {};

  // Critical configuration present?
  checks.env_supabase = !!(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
  checks.env_mollie = !!(process.env.Mollie_API_Test || process.env.MOLLIE_API_KEY);
  checks.env_smtp = !!(process.env.SMTP_USER && process.env.SMTP_PASS);

  // Live database probe (reachable + a known table is queryable).
  checks.database = false;
  if (checks.env_supabase) {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
      const { error } = await supabase.from('orders').select('*', { count: 'exact', head: true });
      checks.database = !error;
    } catch {
      checks.database = false;
    }
  }

  const failed = Object.entries(checks).filter(([, v]) => !v).map(([k]) => k);
  return { ok: failed.length === 0, checks, failed };
}
