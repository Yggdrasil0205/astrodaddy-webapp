import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BarChart3, RefreshCw, Eye, Users, CalendarDays, Info } from 'lucide-react';

// ── Website statistics (Vercel Web Analytics archive) for /robertlogin ────────
// Data comes from public.analytics_daily via /api/admin?r=analytics, synced daily by the
// cron and on demand via the "Von Vercel holen" button.

type AdminFetch = (path: string, opts?: RequestInit) => Promise<Response>;

interface DayPoint { day: string; pageviews: number; visitors: number }
interface TopItem { key: string; pageviews: number; visitors: number }
interface Summary {
  configured: boolean;
  daily: DayPoint[];
  top: Record<string, TopItem[]>;
  first_day: string | null;
  last_day: string | null;
  last_sync: string | null;
}

const RANGES = [
  { label: '7 Tage', days: 7 },
  { label: '30 Tage', days: 30 },
  { label: '90 Tage', days: 90 },
  { label: '12 Monate', days: 365 },
  { label: 'Alles', days: 0 },
];

const TOP_SECTIONS: { dim: string; title: string }[] = [
  { dim: 'path', title: 'Seiten' },
  { dim: 'referrer', title: 'Herkunft' },
  { dim: 'country', title: 'Länder' },
  { dim: 'device', title: 'Geräte' },
  { dim: 'browser', title: 'Browser' },
  { dim: 'os', title: 'Betriebssysteme' },
];

const nf = new Intl.NumberFormat('de-DE');
const fmtDay = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: '2-digit', timeZone: 'UTC' });
const fmtMonth = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('de-DE', { month: 'short', year: 'numeric', timeZone: 'UTC' });

let regionNames: Intl.DisplayNames | null = null;
try { regionNames = new Intl.DisplayNames(['de'], { type: 'region' }); } catch { /* old browser */ }
const deviceNames: Record<string, string> = { desktop: 'Desktop', mobile: 'Smartphone', tablet: 'Tablet' };

function label(dim: string, key: string): string {
  if (dim === 'country' && /^[A-Z]{2}$/.test(key)) return regionNames?.of(key) ?? key;
  if (dim === 'device') return deviceNames[key] ?? key;
  return key;
}

// Long ranges are bucketed by month so the bars stay readable.
function bucket(daily: DayPoint[]): { label: string; title: string; pageviews: number; visitors: number }[] {
  if (daily.length <= 120) {
    return daily.map(d => ({ label: fmtDay(d.day), title: fmtDay(d.day), pageviews: d.pageviews, visitors: d.visitors }));
  }
  const byMonth = new Map<string, { label: string; title: string; pageviews: number; visitors: number }>();
  for (const d of daily) {
    const m = d.day.slice(0, 7);
    const b = byMonth.get(m) ?? { label: fmtMonth(`${m}-01`), title: fmtMonth(`${m}-01`), pageviews: 0, visitors: 0 };
    b.pageviews += d.pageviews; b.visitors += d.visitors;
    byMonth.set(m, b);
  }
  return [...byMonth.values()];
}

export function AdminAnalytics({ adminFetch }: { adminFetch: AdminFetch }) {
  const [days, setDays] = useState(30);
  const [data, setData] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState('');
  const [hover, setHover] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const res = await adminFetch(`/api/admin?r=analytics&days=${days}`);
      const d = await res.json();
      if (!res.ok) throw new Error(d.error ?? 'Fehler');
      setData(d);
    } catch (e: any) {
      setError(e?.message ?? 'Statistik konnte nicht geladen werden.');
    } finally { setLoading(false); }
  }, [adminFetch, days]);

  useEffect(() => { load(); }, [load]);

  const sync = async () => {
    setSyncing(true); setSyncMsg('');
    try {
      const res = await adminFetch('/api/admin?r=analytics&days=31', { method: 'POST' });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error ?? 'Fehler');
      setSyncMsg(d.failed?.length
        ? `${d.synced.length} Tage übernommen, ${d.failed.length} fehlgeschlagen: ${d.failed[0].error}`
        : `${d.synced.length} Tage von Vercel übernommen.`);
      await load();
    } catch (e: any) {
      setSyncMsg(e?.message ?? 'Synchronisierung fehlgeschlagen.');
    } finally { setSyncing(false); }
  };

  const bars = useMemo(() => bucket(data?.daily ?? []), [data]);
  const totals = useMemo(() => (data?.daily ?? []).reduce(
    (s, d) => ({ pageviews: s.pageviews + d.pageviews, visitors: s.visitors + d.visitors }),
    { pageviews: 0, visitors: 0 },
  ), [data]);
  const max = Math.max(1, ...bars.map(b => b.pageviews));
  const avg = data?.daily.length ? totals.pageviews / data.daily.length : 0;

  return (
    <div className="bg-white/4 border border-white/8 rounded-2xl p-5 mb-6">
      {/* Header + filters (one row) */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[#C9A84C]" />
          <h2 className="text-[#F0E6C8] font-semibold text-sm">Website-Statistik</h2>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {RANGES.map(r => (
            <button key={r.label} onClick={() => setDays(r.days)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                days === r.days ? 'bg-[#7B5FD4]/30 text-[#F0E6C8] border border-[#7B5FD4]/40' : 'text-[#F0E6C8]/40 hover:text-[#F0E6C8]/70'
              }`}>{r.label}</button>
          ))}
          <button onClick={sync} disabled={syncing || !data?.configured}
            title="Holt die letzten 31 Tage von Vercel und speichert sie dauerhaft"
            className="ml-1 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[#F0E6C8]/60 hover:text-[#F0E6C8] text-xs disabled:opacity-40">
            <RefreshCw className={`w-3 h-3 ${syncing ? 'animate-spin' : ''}`} /> Von Vercel holen
          </button>
        </div>
      </div>

      {syncMsg && <p className="text-[#F0E6C8]/60 text-xs mb-4">{syncMsg}</p>}
      {error && <p className="text-red-400/80 text-xs mb-4">{error}</p>}

      {data && !data.configured && (
        <div className="flex gap-2 rounded-xl border border-[#C9A84C]/30 bg-[#C9A84C]/8 p-4 mb-5 text-xs text-[#F0E6C8]/70">
          <Info className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" />
          <span>Die Verbindung zu Vercel ist noch nicht eingerichtet (<code>VERCEL_ANALYTICS_TOKEN</code> fehlt). Bereits gespeicherte Werte werden trotzdem angezeigt.</span>
        </div>
      )}

      {/* KPI tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Seitenaufrufe', value: nf.format(totals.pageviews), icon: Eye },
          { label: 'Besucher (Summe Tageswerte)', value: nf.format(totals.visitors), icon: Users },
          { label: 'Ø Aufrufe pro Tag', value: nf.format(Math.round(avg)), icon: BarChart3 },
          { label: 'Daten seit', value: data?.first_day ? fmtDay(data.first_day) : '–', icon: CalendarDays },
        ].map(k => (
          <div key={k.label} className="rounded-xl bg-white/3 border border-white/6 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#F0E6C8]/45 text-[11px]">{k.label}</span>
              <k.icon className="w-3.5 h-3.5 text-[#F0E6C8]/30" />
            </div>
            <div className="text-xl font-bold text-[#F0E6C8]">{k.value}</div>
          </div>
        ))}
      </div>

      {/* Page views over time */}
      <div className="mb-6">
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-[#F0E6C8]/60 text-xs">Seitenaufrufe {bars.length > 0 && data && data.daily.length > 120 ? 'pro Monat' : 'pro Tag'}</span>
          <span className="text-[#F0E6C8]/70 text-xs h-4">
            {hover !== null && bars[hover] && <>{bars[hover].title}: <b className="text-[#F0E6C8]">{nf.format(bars[hover].pageviews)}</b> Aufrufe · {nf.format(bars[hover].visitors)} Besucher</>}
          </span>
        </div>
        {bars.length === 0 ? (
          <p className="text-[#F0E6C8]/30 text-xs py-10 text-center">{loading ? 'Lade…' : 'Für diesen Zeitraum sind noch keine Daten gespeichert.'}</p>
        ) : (
          <div className="relative h-40 border-b border-white/10" onMouseLeave={() => setHover(null)}>
            <div className="absolute inset-x-0 top-0 border-t border-dashed border-white/5" />
            <span className="absolute -top-0.5 right-0 text-[10px] text-[#F0E6C8]/30">{nf.format(max)}</span>
            <div className="absolute inset-0 flex items-end gap-[2px]" role="img" aria-label="Seitenaufrufe im Zeitverlauf">
              {bars.map((b, i) => (
                <div key={i} className="flex-1 h-full flex items-end cursor-default" onMouseEnter={() => setHover(i)} title={`${b.title}: ${nf.format(b.pageviews)} Aufrufe`}>
                  <div className="w-full rounded-t-[4px] transition-opacity"
                    style={{ height: `${Math.max(b.pageviews > 0 ? 2 : 0, (b.pageviews / max) * 100)}%`, background: '#C9A84C', opacity: hover === null || hover === i ? 1 : 0.45 }} />
                </div>
              ))}
            </div>
          </div>
        )}
        {bars.length > 0 && (
          <div className="flex justify-between mt-1 text-[10px] text-[#F0E6C8]/30">
            <span>{bars[0].label}</span><span>{bars[bars.length - 1].label}</span>
          </div>
        )}
      </div>

      {/* Top lists */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TOP_SECTIONS.map(({ dim, title }) => {
          const items = data?.top?.[dim] ?? [];
          const top = Math.max(1, ...items.map(i => i.pageviews));
          return (
            <div key={dim} className="rounded-xl bg-white/3 border border-white/6 p-4">
              <div className="flex justify-between text-[11px] text-[#F0E6C8]/45 mb-2">
                <span>{title}</span><span>Aufrufe</span>
              </div>
              {items.length === 0 ? <p className="text-[#F0E6C8]/25 text-xs py-2">Keine Daten</p> : (
                <ul className="space-y-1.5">
                  {items.slice(0, 8).map(it => (
                    <li key={it.key} className="relative text-xs">
                      <div className="absolute inset-y-0 left-0 rounded bg-[#7B5FD4]/20" style={{ width: `${(it.pageviews / top) * 100}%` }} />
                      <div className="relative flex justify-between gap-2 px-2 py-1">
                        <span className="truncate text-[#F0E6C8]/80" title={it.key}>{label(dim, it.key)}</span>
                        <span className="text-[#F0E6C8] font-medium tabular-nums">{nf.format(it.pageviews)}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-[#F0E6C8]/30 text-[11px] mt-4">
        Quelle: Vercel Web Analytics, täglich um ca. 07:00 UTC dauerhaft gespeichert (Tage in UTC).
        „Besucher" ist die Summe der Tagesbesucher – wer an zwei Tagen kommt, zählt doppelt.
        {data?.last_sync && <> Letzte Übernahme: {new Date(data.last_sync).toLocaleString('de-DE')}.</>}
      </p>
    </div>
  );
}
