import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lock, LogOut, TrendingUp, ShoppingBag, Euro, Eye, EyeOff, CheckCircle, Clock, XCircle,
  Ticket, Plus, Trash2, RefreshCw,
} from 'lucide-react';

// ── Admin auth: the entered secret IS the credential (ADMIN_SECRET). ───────────
// It is verified server-side and kept only in sessionStorage — never in the bundle.
const SECRET_KEY = 'rw_admin_secret';
const getSecret = () => sessionStorage.getItem(SECRET_KEY) ?? '';

function adminFetch(path: string, opts: RequestInit = {}) {
  return fetch(path, {
    ...opts,
    headers: { 'Content-Type': 'application/json', 'x-admin-secret': getSecret(), ...(opts.headers ?? {}) },
  });
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface Order {
  id: string; created_at: string; paid_at: string | null; status: string;
  product_name: string; amount: number; original_amount: number | null; discount_code: string | null;
  customer_name: string; customer_email: string; invoice_number: string | null;
}
interface Voucher {
  id: string; code: string; type: 'percent' | 'fixed'; value: number;
  active: boolean; valid_until: string | null; times_used: number;
}

const eur = (n: number) => `${Number(n).toFixed(2).replace('.', ',')} €`;

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { cls: string; icon: React.ElementType }> = {
    bezahlt:   { cls: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/8', icon: CheckCircle },
    offen:     { cls: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/8',   icon: Clock },
    storniert: { cls: 'text-red-400 border-red-400/30 bg-red-400/8',           icon: XCircle },
  };
  const { cls, icon: Icon } = map[status] ?? { cls: 'text-[#F0E6C8]/50 border-white/15 bg-white/5', icon: Clock };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-medium ${cls}`}>
      <Icon className="w-3 h-3" /> {status}
    </span>
  );
}

export default function RobertLogin() {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots'; meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, []);

  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const login = async () => {
    if (!pw || loggingIn) return;
    setLoggingIn(true); setError('');
    try {
      const res = await fetch('/api/invoices', { headers: { 'x-admin-secret': pw } });
      if (res.ok) { sessionStorage.setItem(SECRET_KEY, pw); setAuthed(true); }
      else if (res.status === 401) setError('Falsches Passwort.');
      else setError('Anmeldung fehlgeschlagen.');
    } catch { setError('Verbindungsfehler.'); }
    finally { setLoggingIn(false); }
  };
  const logout = () => { sessionStorage.removeItem(SECRET_KEY); setAuthed(false); setPw(''); };

  // ── Data ──
  const [orders, setOrders] = useState<Order[]>([]);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('alle');

  const loadOrders = useCallback(async () => {
    const res = await adminFetch('/api/invoices');
    if (res.ok) setOrders((await res.json()).orders ?? []);
  }, []);
  const loadVouchers = useCallback(async () => {
    const res = await adminFetch('/api/vouchers');
    if (res.ok) setVouchers((await res.json()).codes ?? []);
  }, []);
  const reload = useCallback(async () => {
    setLoading(true);
    await Promise.all([loadOrders(), loadVouchers()]);
    setLoading(false);
  }, [loadOrders, loadVouchers]);

  useEffect(() => { if (authed) reload(); }, [authed, reload]);

  // ── Voucher create/delete ──
  const [vCode, setVCode] = useState('');
  const [vType, setVType] = useState<'percent' | 'fixed'>('percent');
  const [vValue, setVValue] = useState('');
  const [vUntil, setVUntil] = useState('');
  const [vError, setVError] = useState('');
  const [vBusy, setVBusy] = useState(false);

  const createVoucher = async () => {
    if (vBusy) return;
    setVError(''); setVBusy(true);
    try {
      const res = await adminFetch('/api/vouchers', {
        method: 'POST',
        body: JSON.stringify({ code: vCode, type: vType, value: Number(vValue), validUntil: vUntil || null }),
      });
      const d = await res.json();
      if (res.ok) { setVCode(''); setVValue(''); setVUntil(''); await loadVouchers(); }
      else setVError(d.error ?? 'Fehler beim Anlegen.');
    } catch { setVError('Verbindungsfehler.'); }
    finally { setVBusy(false); }
  };
  const deleteVoucher = async (id: string) => {
    await adminFetch(`/api/vouchers?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    await loadVouchers();
  };

  // ── KPIs ──
  const paid = orders.filter(o => o.status === 'bezahlt');
  const totalRevenue = paid.reduce((s, o) => s + Number(o.amount), 0);
  const avgOrder = paid.length ? totalRevenue / paid.length : 0;
  const filtered = filter === 'alle' ? orders : orders.filter(o => o.status === filter);

  // ── Login screen ──
  if (!authed) return (
    <div className="min-h-screen bg-[#1B1040] flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#C9A84C]/10 border border-[#C9A84C]/30 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-[#C9A84C]" />
          </div>
          <h1 className="text-2xl text-[#F0E6C8] mb-1" style={{ fontFamily: '"rl-limo-1","rl-limo-2",sans-serif', fontWeight: 400 }}>Admin</h1>
          <p className="text-[#F0E6C8]/40 text-sm">Robert Wagner · Interner Bereich</p>
        </div>
        <div className="bg-white/4 border border-white/8 rounded-2xl p-6">
          <label className="block text-[#F0E6C8]/50 text-xs mb-1.5">Passwort</label>
          <div className="relative mb-4">
            <input
              type={showPw ? 'text' : 'password'}
              value={pw}
              onChange={e => { setPw(e.target.value); setError(''); }}
              onKeyDown={e => e.key === 'Enter' && login()}
              className="w-full px-4 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F0E6C8] text-sm focus:outline-none focus:border-[#C9A84C]/50 transition-all"
              placeholder="••••••••••••" autoFocus
            />
            <button onClick={() => setShowPw(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F0E6C8]/30 hover:text-[#F0E6C8]/60 transition-colors">
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {error && <p className="text-red-400/80 text-xs mb-3">{error}</p>}
          <button onClick={login} disabled={loggingIn}
            className="w-full py-3 rounded-xl bg-[#C9A84C] text-[#1B1040] font-semibold text-sm hover:bg-[#C9A84C]/90 transition-colors disabled:opacity-50">
            {loggingIn ? 'Prüfe…' : 'Anmelden'}
          </button>
        </div>
      </motion.div>
    </div>
  );

  // ── Dashboard ──
  return (
    <div className="min-h-screen bg-[#1B1040] px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl text-[#F0E6C8]" style={{ fontFamily: '"rl-limo-1","rl-limo-2",sans-serif', fontWeight: 400 }}>Admin Dashboard</h1>
            <p className="text-[#F0E6C8]/40 text-sm mt-0.5">Robert Wagner Astrologie</p>
          </div>
          <div className="flex gap-2">
            <button onClick={reload} disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[#F0E6C8]/50 hover:text-[#F0E6C8] hover:border-white/20 transition-all text-sm disabled:opacity-50">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Aktualisieren
            </button>
            <button onClick={logout} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[#F0E6C8]/50 hover:text-[#F0E6C8] hover:border-white/20 transition-all text-sm">
              <LogOut className="w-4 h-4" /> Abmelden
            </button>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Umsatz (bezahlt)', value: eur(totalRevenue), icon: Euro, color: '#C9A84C' },
            { label: 'Bestellungen', value: String(orders.length), icon: ShoppingBag, color: '#7B5FD4' },
            { label: 'Bezahlt', value: String(paid.length), icon: CheckCircle, color: '#34d399' },
            { label: 'Ø Bestellwert', value: eur(avgOrder), icon: TrendingUp, color: '#C9A84C' },
          ].map((k, i) => (
            <motion.div key={k.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="bg-white/4 border border-white/8 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[#F0E6C8]/50 text-xs">{k.label}</span>
                <k.icon className="w-4 h-4" style={{ color: k.color }} />
              </div>
              <div className="text-2xl font-bold text-[#F0E6C8]">{k.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Voucher management */}
        <div className="bg-white/4 border border-white/8 rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Ticket className="w-4 h-4 text-[#C9A84C]" />
            <h2 className="text-[#F0E6C8] font-semibold text-sm">Gutscheincodes</h2>
          </div>

          {/* Create form */}
          <div className="flex flex-wrap items-end gap-2 mb-5">
            <div>
              <label className="block text-[#F0E6C8]/40 text-[11px] mb-1">Code</label>
              <input value={vCode} onChange={e => { setVCode(e.target.value.toUpperCase()); setVError(''); }}
                placeholder="SOMMER20"
                className="w-36 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[#F0E6C8] text-sm uppercase placeholder-[#F0E6C8]/25 focus:outline-none focus:border-[#C9A84C]/40" />
            </div>
            <div>
              <label className="block text-[#F0E6C8]/40 text-[11px] mb-1">Art</label>
              <select value={vType} onChange={e => setVType(e.target.value as 'percent' | 'fixed')}
                className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[#F0E6C8] text-sm focus:outline-none focus:border-[#C9A84C]/40 [color-scheme:dark]">
                <option value="percent">Prozent %</option>
                <option value="fixed">Betrag €</option>
              </select>
            </div>
            <div>
              <label className="block text-[#F0E6C8]/40 text-[11px] mb-1">Wert</label>
              <input value={vValue} onChange={e => { setVValue(e.target.value); setVError(''); }}
                type="number" min="0" step="0.01" placeholder={vType === 'percent' ? '20' : '10'}
                className="w-24 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[#F0E6C8] text-sm placeholder-[#F0E6C8]/25 focus:outline-none focus:border-[#C9A84C]/40" />
            </div>
            <div>
              <label className="block text-[#F0E6C8]/40 text-[11px] mb-1">Gültig bis (optional)</label>
              <input value={vUntil} onChange={e => setVUntil(e.target.value)} type="date"
                className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[#F0E6C8] text-sm focus:outline-none focus:border-[#C9A84C]/40 [color-scheme:dark]" />
            </div>
            <button onClick={createVoucher} disabled={vBusy || !vCode || !vValue}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#C9A84C] text-[#1B1040] text-sm font-semibold hover:bg-[#C9A84C]/90 transition-colors disabled:opacity-40">
              <Plus className="w-4 h-4" /> Anlegen
            </button>
          </div>
          {vError && <p className="text-red-400/80 text-xs mb-3">{vError}</p>}

          {/* List */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8">
                  {['Code', 'Rabatt', 'Gültig bis', 'Verwendet', ''].map(h => (
                    <th key={h} className="text-left text-[#F0E6C8]/40 text-xs font-medium pb-3 pr-4 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {vouchers.map(v => (
                    <motion.tr key={v.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="border-b border-white/5">
                      <td className="py-3 pr-4 text-[#C9A84C] font-mono text-xs font-semibold">{v.code}</td>
                      <td className="py-3 pr-4 text-[#F0E6C8]/80 text-xs">{v.type === 'percent' ? `${v.value} %` : eur(v.value)}</td>
                      <td className="py-3 pr-4 text-[#F0E6C8]/50 text-xs">{v.valid_until ? new Date(v.valid_until).toLocaleDateString('de-DE') : '–'}</td>
                      <td className="py-3 pr-4 text-[#F0E6C8]/50 text-xs">{v.times_used}×</td>
                      <td className="py-3">
                        <button onClick={() => deleteVoucher(v.id)}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-400/10 border border-red-400/20 text-red-400 text-xs hover:bg-red-400/20 transition-colors">
                          <Trash2 className="w-3 h-3" /> Löschen
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
            {vouchers.length === 0 && <p className="text-[#F0E6C8]/30 text-xs py-4 text-center">Noch keine Gutscheincodes.</p>}
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white/4 border border-white/8 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#F0E6C8] font-semibold text-sm">Bestellungen</h2>
            <div className="flex gap-1.5">
              {['alle', 'bezahlt', 'offen', 'storniert'].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all capitalize ${
                    filter === f ? 'bg-[#7B5FD4]/30 text-[#F0E6C8] border border-[#7B5FD4]/40' : 'text-[#F0E6C8]/40 hover:text-[#F0E6C8]/70'
                  }`}>{f}</button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8">
                  {['Datum', 'Kunde', 'Produkt', 'Rabatt', 'Betrag', 'Rechnung', 'Status'].map(h => (
                    <th key={h} className="text-left text-[#F0E6C8]/40 text-xs font-medium pb-3 pr-4 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(o => (
                  <tr key={o.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                    <td className="py-3 pr-4 text-[#F0E6C8]/50 text-xs whitespace-nowrap">{new Date(o.created_at).toLocaleDateString('de-DE')}</td>
                    <td className="py-3 pr-4">
                      <div className="text-[#F0E6C8] text-xs font-medium">{o.customer_name}</div>
                      <div className="text-[#F0E6C8]/35 text-[11px]">{o.customer_email}</div>
                    </td>
                    <td className="py-3 pr-4 text-[#F0E6C8]/60 text-xs max-w-[200px] truncate">{o.product_name}</td>
                    <td className="py-3 pr-4 text-[#F0E6C8]/50 text-xs whitespace-nowrap">{o.discount_code ?? '–'}</td>
                    <td className="py-3 pr-4 text-[#F0E6C8] font-semibold text-xs whitespace-nowrap">{eur(o.amount)}</td>
                    <td className="py-3 pr-4 text-[#F0E6C8]/50 font-mono text-[11px] whitespace-nowrap">{o.invoice_number ?? '–'}</td>
                    <td className="py-3 pr-4"><StatusBadge status={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <p className="text-[#F0E6C8]/30 text-xs py-6 text-center">{loading ? 'Lade…' : 'Keine Bestellungen.'}</p>}
          </div>

          <div className="mt-4 pt-4 border-t border-white/8 flex items-center justify-between">
            <span className="text-[#F0E6C8]/30 text-xs">{filtered.length} Einträge</span>
            <span className="text-[#F0E6C8]/50 text-xs">Umsatz (bezahlt): <span className="text-[#C9A84C] font-semibold">{eur(totalRevenue)}</span></span>
          </div>
        </div>

        <p className="text-center text-[#F0E6C8]/15 text-xs mt-8">Nicht indexierter Admin-Bereich · Robert Wagner Astrologie</p>
      </div>
    </div>
  );
}
