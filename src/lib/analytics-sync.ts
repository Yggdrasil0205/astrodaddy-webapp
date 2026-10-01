import { createClient } from '@supabase/supabase-js';

// ── Vercel Web Analytics → Supabase archive ───────────────────────────────────
// Vercel keeps Web Analytics for 30 days on the free plan. We copy one snapshot
// per (UTC) day into public.analytics_daily so /robertlogin can show the full
// history. Uses the public Web Analytics API:
//   GET https://api.vercel.com/v1/query/web-analytics/visits/count
//   GET https://api.vercel.com/v1/query/web-analytics/visits/aggregate?by=<dim>
//
// Env:
//   VERCEL_ANALYTICS_TOKEN   – Vercel access token (Account → Tokens)
//   VERCEL_TEAM_ID           – team id or slug the project belongs to
//   VERCEL_ANALYTICS_PROJECT – project id or name (default: VERCEL_PROJECT_ID, then "webapp")

const API = 'https://api.vercel.com/v1/query/web-analytics/visits';

// Our dimension name → Vercel "by" dimension
const DIMENSIONS: Record<string, string> = {
  path: 'requestPath',
  referrer: 'referrerHostname',
  country: 'country',
  device: 'deviceType',
  browser: 'browserName',
  os: 'osName',
};

interface Row { day: string; dimension: string; key: string; pageviews: number; visitors: number }

export function analyticsConfigured(): boolean {
  return !!process.env.VERCEL_ANALYTICS_TOKEN;
}

function baseParams(day: string): URLSearchParams {
  const p = new URLSearchParams({
    projectId: process.env.VERCEL_ANALYTICS_PROJECT || process.env.VERCEL_PROJECT_ID || 'webapp',
    since: `${day}T00:00:00.000Z`,
    until: `${day}T23:59:59.999Z`,
  });
  if (process.env.VERCEL_TEAM_ID) p.set('teamId', process.env.VERCEL_TEAM_ID);
  return p;
}

async function vercelGet(path: string, params: URLSearchParams): Promise<any> {
  const res = await fetch(`${API}/${path}?${params}`, {
    headers: { Authorization: `Bearer ${process.env.VERCEL_ANALYTICS_TOKEN}`, Accept: 'application/json' },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = body?.error?.message ?? body?.message ?? JSON.stringify(body).slice(0, 200);
    throw new Error(`Vercel API ${res.status}: ${msg}`);
  }
  return body;
}

const num = (v: unknown) => (Number.isFinite(Number(v)) ? Math.round(Number(v)) : 0);

async function fetchDay(day: string): Promise<Row[]> {
  const total = vercelGet('count', baseParams(day)).then(b => [{
    day, dimension: 'total', key: '',
    pageviews: num(b?.data?.pageviews), visitors: num(b?.data?.visitors),
  }]);

  const dims = Object.entries(DIMENSIONS).map(async ([dimension, by]) => {
    const p = baseParams(day);
    p.set('by', by);
    p.set('limit', '50');
    const b = await vercelGet('aggregate', p);
    const rows: any[] = Array.isArray(b?.data) ? b.data : [];
    return rows.map(r => ({
      day, dimension,
      key: String(r?.[by] ?? '') || '(direkt / unbekannt)',
      pageviews: num(r?.pageviews), visitors: num(r?.visitors),
    }));
  });

  const all = (await Promise.all([total, ...dims])).flat();
  // Merge duplicate keys (e.g. several empty values mapped to the same label).
  const merged = new Map<string, Row>();
  for (const r of all) {
    const k = `${r.dimension}\u0000${r.key}`;
    const prev = merged.get(k);
    if (prev) { prev.pageviews += r.pageviews; prev.visitors += r.visitors; }
    else merged.set(k, { ...r });
  }
  return [...merged.values()];
}

/** UTC dates (YYYY-MM-DD) for the `count` completed days before today. */
export function lastDays(count: number): string[] {
  const out: string[] = [];
  const today = new Date();
  for (let i = 1; i <= count; i++) {
    const d = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - i));
    out.push(d.toISOString().slice(0, 10));
  }
  return out;
}

/**
 * Fetches the given days from Vercel and replaces their rows in Supabase.
 * Idempotent – re-syncing a day overwrites it. Days are processed one by one.
 */
export async function syncAnalyticsDays(days: string[]): Promise<{ synced: string[]; failed: { day: string; error: string }[] }> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!analyticsConfigured()) throw new Error('VERCEL_ANALYTICS_TOKEN ist nicht gesetzt.');
  if (!url || !key) throw new Error('Supabase ist nicht konfiguriert.');
  const supabase = createClient(url, key);

  const synced: string[] = [];
  const failed: { day: string; error: string }[] = [];
  for (const day of days) {
    try {
      const rows = await fetchDay(day);
      const del = await supabase.from('analytics_daily').delete().eq('day', day);
      if (del.error) throw new Error(del.error.message);
      const ins = await supabase.from('analytics_daily').insert(rows.map(r => ({ ...r, synced_at: new Date().toISOString() })));
      if (ins.error) throw new Error(ins.error.message);
      synced.push(day);
    } catch (e: any) {
      console.error(`analytics sync ${day} failed:`, e);
      failed.push({ day, error: e?.message ?? String(e) });
      // An auth/config error will fail every day the same way – stop early.
      if (/Vercel API (401|403|404)/.test(e?.message ?? '')) break;
    }
  }
  return { synced, failed };
}
