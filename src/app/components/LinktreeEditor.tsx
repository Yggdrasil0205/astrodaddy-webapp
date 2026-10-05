import React, { useCallback, useEffect, useState } from 'react';
import { Plus, Trash2, ChevronUp, ChevronDown, Check, Loader2, ExternalLink } from 'lucide-react';
import { LinkIconByKey, BUTTON_ICON_KEYS, SOCIAL_ICON_KEYS } from './linkIcons';

interface LinkRow {
  id: string;
  kind: 'button' | 'social';
  label: string;
  sublabel: string | null;
  url: string;
  icon: string | null;
  badge: string | null;
  highlight: boolean;
  sort_order: number;
  active: boolean;
}

type Fetcher = (path: string, opts?: RequestInit) => Promise<Response>;

const fieldCls =
  'w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[#F0E6C8] text-sm placeholder-[#F0E6C8]/25 focus:outline-none focus:border-[#C9A84C]/50 transition-all';

export function LinktreeEditor({ adminFetch }: { adminFetch: Fetcher }) {
  const [rows, setRows] = useState<LinkRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const res = await adminFetch('/api/admin?r=links&all=1');
      if (res.ok) setRows((await res.json()).links ?? []);
      else setError('Konnte Links nicht laden.');
    } catch { setError('Konnte Links nicht laden.'); }
    finally { setLoading(false); }
  }, [adminFetch]);

  useEffect(() => { load(); }, [load]);

  const setField = (id: string, field: keyof LinkRow, value: unknown) =>
    setRows(rs => rs.map(r => (r.id === id ? { ...r, [field]: value } as LinkRow : r)));

  const save = async (row: LinkRow) => {
    if (!row.label.trim() || !row.url.trim()) { setError('Label und URL dürfen nicht leer sein.'); return; }
    setBusyId(row.id); setError('');
    try {
      const res = await adminFetch(`/api/admin?r=links&id=${encodeURIComponent(row.id)}`, {
        method: 'PATCH',
        body: JSON.stringify({
          label: row.label, sublabel: row.sublabel, url: row.url, icon: row.icon,
          badge: row.badge, highlight: row.highlight, active: row.active,
        }),
      });
      if (!res.ok) setError((await res.json().catch(() => ({})))?.error ?? 'Speichern fehlgeschlagen.');
      else await load();
    } finally { setBusyId(null); }
  };

  const remove = async (id: string) => {
    setBusyId(id);
    try { await adminFetch(`/api/admin?r=links&id=${encodeURIComponent(id)}`, { method: 'DELETE' }); await load(); }
    finally { setBusyId(null); }
  };

  const add = async (kind: 'button' | 'social') => {
    const sort = rows.filter(r => r.kind === kind).reduce((m, r) => Math.max(m, r.sort_order), 0) + 1;
    setError('');
    await adminFetch('/api/admin?r=links', {
      method: 'POST',
      body: JSON.stringify(kind === 'social'
        ? { kind, label: 'Neu', url: 'https://', icon: 'website', sort_order: sort, active: true }
        : { kind, label: 'Neuer Link', sublabel: '', url: '/angebote', icon: 'sparkles', sort_order: sort, active: true }),
    });
    await load();
  };

  const move = async (row: LinkRow, dir: -1 | 1) => {
    const same = rows.filter(r => r.kind === row.kind).sort((a, b) => a.sort_order - b.sort_order);
    const idx = same.findIndex(r => r.id === row.id);
    const other = same[idx + dir];
    if (!other) return;
    setBusyId(row.id);
    try {
      await adminFetch(`/api/admin?r=links&id=${encodeURIComponent(row.id)}`, { method: 'PATCH', body: JSON.stringify({ sort_order: other.sort_order }) });
      await adminFetch(`/api/admin?r=links&id=${encodeURIComponent(other.id)}`, { method: 'PATCH', body: JSON.stringify({ sort_order: row.sort_order }) });
      await load();
    } finally { setBusyId(null); }
  };

  const buttons = rows.filter(r => r.kind === 'button').sort((a, b) => a.sort_order - b.sort_order);
  const socials = rows.filter(r => r.kind === 'social').sort((a, b) => a.sort_order - b.sort_order);

  const RowCard = ({ row, index, count }: { row: LinkRow; index: number; count: number }) => (
    <div className={`rounded-xl border p-3 ${row.active ? 'bg-white/[0.03] border-white/10' : 'bg-white/[0.01] border-white/5 opacity-60'}`}>
      <div className="flex items-start gap-3">
        <div className="flex flex-col gap-1 pt-1">
          <button onClick={() => move(row, -1)} disabled={index === 0 || busyId === row.id} className="text-[#F0E6C8]/40 hover:text-[#C9A84C] disabled:opacity-20"><ChevronUp className="w-4 h-4" /></button>
          <button onClick={() => move(row, 1)} disabled={index === count - 1 || busyId === row.id} className="text-[#F0E6C8]/40 hover:text-[#C9A84C] disabled:opacity-20"><ChevronDown className="w-4 h-4" /></button>
        </div>
        <div className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center shrink-0 text-[#C9A84C]">
          <LinkIconByKey name={row.icon} className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex gap-2">
            <input className={fieldCls} value={row.label} onChange={e => setField(row.id, 'label', e.target.value)} placeholder="Titel" />
            <select className={`${fieldCls} w-32`} value={row.icon ?? ''} onChange={e => setField(row.id, 'icon', e.target.value)}>
              {(row.kind === 'social' ? SOCIAL_ICON_KEYS : BUTTON_ICON_KEYS).map(k => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
          {row.kind === 'button' && (
            <input className={fieldCls} value={row.sublabel ?? ''} onChange={e => setField(row.id, 'sublabel', e.target.value)} placeholder="Untertitel (optional)" />
          )}
          <input className={fieldCls} value={row.url} onChange={e => setField(row.id, 'url', e.target.value)} placeholder={row.kind === 'social' ? 'https://… oder mailto:' : '/angebote oder https://…'} />
          {row.kind === 'button' && (
            <div className="flex items-center gap-4 flex-wrap">
              <input className={`${fieldCls} w-28`} value={row.badge ?? ''} onChange={e => setField(row.id, 'badge', e.target.value)} placeholder="Badge" />
              <label className="flex items-center gap-1.5 text-[#F0E6C8]/60 text-xs cursor-pointer">
                <input type="checkbox" checked={row.highlight} onChange={e => setField(row.id, 'highlight', e.target.checked)} /> Hervorheben
              </label>
            </div>
          )}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-1.5 text-[#F0E6C8]/60 text-xs cursor-pointer">
              <input type="checkbox" checked={row.active} onChange={e => setField(row.id, 'active', e.target.checked)} /> Sichtbar
            </label>
            <div className="flex items-center gap-2">
              {row.url && (
                <a href={row.url} target="_blank" rel="noopener noreferrer" className="text-[#F0E6C8]/30 hover:text-[#C9A84C] p-1.5" aria-label="öffnen"><ExternalLink className="w-4 h-4" /></a>
              )}
              <button onClick={() => remove(row.id)} disabled={busyId === row.id} className="text-red-400/70 hover:text-red-400 p-1.5" aria-label="löschen"><Trash2 className="w-4 h-4" /></button>
              <button onClick={() => save(row)} disabled={busyId === row.id}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C9A84C]/15 border border-[#C9A84C]/30 text-[#C9A84C] text-xs font-medium hover:bg-[#C9A84C]/25 transition-colors disabled:opacity-50">
                {busyId === row.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />} Speichern
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="rounded-2xl p-5 bg-[#120d2e] border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[#F0E6C8] font-semibold text-sm">Linktree (/links)</h2>
        {loading && <Loader2 className="w-4 h-4 text-[#F0E6C8]/40 animate-spin" />}
      </div>
      {error && <p className="text-red-400/80 text-xs mb-3">{error}</p>}

      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[#F0E6C8]/70 text-xs uppercase tracking-wide">Link-Buttons</h3>
        <button onClick={() => add('button')} className="flex items-center gap-1 text-[#C9A84C] text-xs hover:underline"><Plus className="w-3.5 h-3.5" /> Button</button>
      </div>
      <div className="space-y-2 mb-6">
        {buttons.map((row, i) => <RowCard key={row.id} row={row} index={i} count={buttons.length} />)}
        {buttons.length === 0 && !loading && <p className="text-[#F0E6C8]/30 text-xs py-2">Noch keine Buttons.</p>}
      </div>

      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[#F0E6C8]/70 text-xs uppercase tracking-wide">Social-Icons</h3>
        <button onClick={() => add('social')} className="flex items-center gap-1 text-[#C9A84C] text-xs hover:underline"><Plus className="w-3.5 h-3.5" /> Social</button>
      </div>
      <div className="space-y-2">
        {socials.map((row, i) => <RowCard key={row.id} row={row} index={i} count={socials.length} />)}
        {socials.length === 0 && !loading && <p className="text-[#F0E6C8]/30 text-xs py-2">Noch keine Social-Icons.</p>}
      </div>

      <p className="text-[#F0E6C8]/30 text-[11px] mt-4">
        Tipp: Ziel als <code className="text-[#F0E6C8]/50">/angebote</code> = interne Seite, sonst volle URL (<code className="text-[#F0E6C8]/50">https://…</code>) oder <code className="text-[#F0E6C8]/50">mailto:</code>. Änderungen sind in ~30 Sek. auf der Seite sichtbar.
      </p>
    </div>
  );
}
