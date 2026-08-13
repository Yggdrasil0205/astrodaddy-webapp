import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, LogOut, Download, TrendingUp, ShoppingBag, Euro, Users, Eye, EyeOff, CheckCircle, Clock, XCircle, CalendarDays, PackageOpen } from 'lucide-react';

// ── Auth ─────────────────────────────────────────────────────────────────────
const PASSWORD_HASH = 'AstroDaddy2026!'; // Change this password
const SESSION_KEY = 'rw_admin_auth';

function checkAuth() { return sessionStorage.getItem(SESSION_KEY) === 'true'; }
function setAuth(v: boolean) { v ? sessionStorage.setItem(SESSION_KEY, 'true') : sessionStorage.removeItem(SESSION_KEY); }

// ── Mock data ─────────────────────────────────────────────────────────────────
const MOCK_INVOICES = [
  { id: 'RW-2026-0041', date: '2026-04-28', customer: 'Anna Müller', email: 'anna@example.de', product: 'Astrologische Jahresvorschau 2026', amount: 69.99, status: 'bezahlt' },
  { id: 'RW-2026-0040', date: '2026-04-27', customer: 'Lukas Braun', email: 'lukas@example.de', product: 'Astrologische Beratung 90 Min', amount: 169.99, status: 'bezahlt' },
  { id: 'RW-2026-0039', date: '2026-04-26', customer: 'Sarah Klein', email: 'sarah@example.de', product: 'Astrologische Partnerschaftsanalyse', amount: 79.99, status: 'bezahlt' },
  { id: 'RW-2026-0038', date: '2026-04-25', customer: 'Tobias Weiß', email: 'tobias@example.de', product: 'Astrologische Beratung 45 Min', amount: 99.99, status: 'bezahlt' },
  { id: 'RW-2026-0037', date: '2026-04-24', customer: 'Marie Fischer', email: 'marie@example.de', product: 'Astrokartographie', amount: 59.99, status: 'bezahlt' },
  { id: 'RW-2026-0036', date: '2026-04-23', customer: 'Jonas Schulz', email: 'jonas@example.de', product: 'Astrologische Persönlichkeitsanalyse', amount: 49.99, status: 'offen' },
  { id: 'RW-2026-0035', date: '2026-04-22', customer: 'Lena Hoffmann', email: 'lena@example.de', product: 'Astrologische Beratung per Video', amount: 59.99, status: 'bezahlt' },
  { id: 'RW-2026-0034', date: '2026-04-21', customer: 'Felix Bauer', email: 'felix@example.de', product: 'Astrologische Jahresvorschau 2026', amount: 69.99, status: 'bezahlt' },
  { id: 'RW-2026-0033', date: '2026-04-20', customer: 'Julia Krause', email: 'julia@example.de', product: 'Astrologische Beratung 90 Min', amount: 169.99, status: 'storniert' },
  { id: 'RW-2026-0032', date: '2026-04-19', customer: 'Max Wagner', email: 'max@example.de', product: 'Astrologische Partnerschaftsanalyse', amount: 79.99, status: 'bezahlt' },
];

const MONTHLY_REVENUE = [
  { month: 'Nov', val: 1240 },
  { month: 'Dez', val: 2180 },
  { month: 'Jan', val: 1870 },
  { month: 'Feb', val: 2640 },
  { month: 'Mär', val: 3120 },
  { month: 'Apr', val: 2890 },
];

// ── Invoice PDF generator ─────────────────────────────────────────────────────
function downloadInvoice(inv: typeof MOCK_INVOICES[0]) {
  const html = `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<title>Rechnung ${inv.id}</title>
<style>
  body { font-family: Arial, sans-serif; max-width: 700px; margin: 40px auto; color: #1a1a2e; font-size: 14px; }
  .header { display: flex; justify-content: space-between; margin-bottom: 40px; }
  .logo { font-size: 22px; font-weight: bold; color: #1B1040; letter-spacing: 2px; }
  .sub { color: #7B5FD4; font-size: 12px; margin-top: 4px; }
  h2 { color: #1B1040; border-bottom: 2px solid #C9A84C; padding-bottom: 8px; }
  table { width: 100%; border-collapse: collapse; margin: 20px 0; }
  th { background: #1B1040; color: #F0E6C8; padding: 10px 12px; text-align: left; font-size: 12px; }
  td { padding: 10px 12px; border-bottom: 1px solid #eee; }
  .total { font-weight: bold; font-size: 16px; color: #C9A84C; }
  .footer { margin-top: 50px; font-size: 11px; color: #888; border-top: 1px solid #eee; padding-top: 16px; }
  .badge { display: inline-block; background: #d4edda; color: #155724; padding: 3px 10px; border-radius: 20px; font-size: 11px; }
  @media print { body { margin: 20px; } }
</style>
</head>
<body>
<div class="header">
  <div>
    <div class="logo">ROBERT WAGNER</div>
    <div class="sub">Astrologie · Spiritualität · Tarot</div>
    <div style="margin-top:12px;font-size:12px;color:#555;">
      adastra.lights@gmail.com<br>
      astrodaddy.de
    </div>
  </div>
  <div style="text-align:right;">
    <div style="font-size:24px;font-weight:bold;color:#1B1040;">RECHNUNG</div>
    <div style="color:#C9A84C;font-size:16px;margin-top:4px;">${inv.id}</div>
    <div style="color:#888;margin-top:8px;font-size:12px;">Datum: ${new Date(inv.date).toLocaleDateString('de-DE')}</div>
  </div>
</div>

<h2>Rechnungsempfänger</h2>
<p><strong>${inv.customer}</strong><br>${inv.email}</p>

<h2>Leistungen</h2>
<table>
  <tr><th>Beschreibung</th><th style="text-align:right;">Betrag</th></tr>
  <tr>
    <td>${inv.product}</td>
    <td style="text-align:right;">${inv.amount.toFixed(2).replace('.', ',')} €</td>
  </tr>
  <tr>
    <td style="color:#888;font-size:12px;">inkl. 19% MwSt.</td>
    <td style="text-align:right;color:#888;font-size:12px;">${(inv.amount * 0.19 / 1.19).toFixed(2).replace('.', ',')} €</td>
  </tr>
</table>

<div style="text-align:right;margin-top:8px;">
  <span class="total">Gesamtbetrag: ${inv.amount.toFixed(2).replace('.', ',')} €</span>
</div>

<div style="margin-top:16px;">
  Status: <span class="badge">✓ ${inv.status}</span>
</div>

<div class="footer">
  Robert Wagner · Astrologie & Coaching · adastra.lights@gmail.com · astrodaddy.de<br>
  Kleinunternehmer gemäß § 19 UStG · Keine Umsatzsteuer wird ausgewiesen.
</div>
</body>
</html>`;

  const w = window.open('', '_blank');
  if (w) { w.document.write(html); w.document.close(); w.print(); }
}

// ── Bundle PDF generator ──────────────────────────────────────────────────────
function downloadBundle(invoices: typeof MOCK_INVOICES, label: string) {
  if (invoices.length === 0) return;
  const invoicePages = invoices.map((inv, idx) => `
    <div class="page" ${idx < invoices.length - 1 ? 'style="page-break-after:always"' : ''}>
      <div class="header">
        <div>
          <div class="logo">ROBERT WAGNER</div>
          <div class="sub">Astrologie · Spiritualität · Tarot</div>
          <div style="margin-top:12px;font-size:12px;color:#555;">adastra.lights@gmail.com<br>astrodaddy.de</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:24px;font-weight:bold;color:#1B1040;">RECHNUNG</div>
          <div style="color:#C9A84C;font-size:16px;margin-top:4px;">${inv.id}</div>
          <div style="color:#888;margin-top:8px;font-size:12px;">Datum: ${new Date(inv.date).toLocaleDateString('de-DE')}</div>
        </div>
      </div>
      <h2>Rechnungsempfänger</h2>
      <p><strong>${inv.customer}</strong><br>${inv.email}</p>
      <h2>Leistungen</h2>
      <table>
        <tr><th>Beschreibung</th><th style="text-align:right;">Betrag</th></tr>
        <tr>
          <td>${inv.product}</td>
          <td style="text-align:right;">${inv.amount.toFixed(2).replace('.', ',')} €</td>
        </tr>
        <tr>
          <td style="color:#888;font-size:12px;">Kleinunternehmer gemäß § 19 UStG – keine MwSt.</td>
          <td></td>
        </tr>
      </table>
      <div style="text-align:right;margin-top:8px;">
        <span class="total">Gesamtbetrag: ${inv.amount.toFixed(2).replace('.', ',')} €</span>
      </div>
      <div style="margin-top:16px;">Status: <span class="badge">✓ ${inv.status}</span></div>
      <div class="footer">
        Robert Wagner · Astrologie & Coaching · adastra.lights@gmail.com · astrodaddy.de<br>
        Kleinunternehmer gemäß § 19 UStG · Keine Umsatzsteuer wird ausgewiesen.
      </div>
    </div>
  `).join('');

  const total = invoices.filter(i => i.status === 'bezahlt').reduce((s, i) => s + i.amount, 0);

  const html = `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<title>Rechnungsexport ${label}</title>
<style>
  body { font-family: Arial, sans-serif; color: #1a1a2e; font-size: 14px; margin: 0; padding: 0; }
  .cover { max-width: 700px; margin: 60px auto; padding: 40px; border: 2px solid #C9A84C; border-radius: 8px; page-break-after: always; }
  .cover h1 { font-size: 28px; color: #1B1040; margin: 0 0 8px; }
  .cover .period { font-size: 16px; color: #C9A84C; margin-bottom: 24px; }
  .cover table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .cover td { padding: 6px 0; border-bottom: 1px solid #eee; }
  .cover .sum { font-size: 18px; font-weight: bold; color: #C9A84C; }
  .page { max-width: 700px; margin: 40px auto; padding: 40px; }
  .header { display: flex; justify-content: space-between; margin-bottom: 40px; }
  .logo { font-size: 22px; font-weight: bold; color: #1B1040; letter-spacing: 2px; }
  .sub { color: #7B5FD4; font-size: 12px; margin-top: 4px; }
  h2 { color: #1B1040; border-bottom: 2px solid #C9A84C; padding-bottom: 8px; }
  table { width: 100%; border-collapse: collapse; margin: 20px 0; }
  th { background: #1B1040; color: #F0E6C8; padding: 10px 12px; text-align: left; font-size: 12px; }
  td { padding: 10px 12px; border-bottom: 1px solid #eee; }
  .total { font-weight: bold; font-size: 16px; color: #C9A84C; }
  .footer { margin-top: 50px; font-size: 11px; color: #888; border-top: 1px solid #eee; padding-top: 16px; }
  .badge { display: inline-block; background: #d4edda; color: #155724; padding: 3px 10px; border-radius: 20px; font-size: 11px; }
  @media print { body { margin: 0; } .page, .cover { margin: 0; } }
</style>
</head>
<body>
<div class="cover">
  <div style="font-size:22px;font-weight:bold;color:#1B1040;letter-spacing:2px;">ROBERT WAGNER</div>
  <div style="color:#7B5FD4;font-size:12px;margin-bottom:32px;">Astrologie · Spiritualität · Tarot</div>
  <h1>Rechnungsexport</h1>
  <div class="period">${label}</div>
  <table>
    <tr><td>Anzahl Rechnungen</td><td style="text-align:right;font-weight:bold;">${invoices.length}</td></tr>
    <tr><td>Bezahlt</td><td style="text-align:right;">${invoices.filter(i => i.status === 'bezahlt').length}</td></tr>
    <tr><td>Offen</td><td style="text-align:right;">${invoices.filter(i => i.status === 'offen').length}</td></tr>
    <tr><td>Storniert</td><td style="text-align:right;">${invoices.filter(i => i.status === 'storniert').length}</td></tr>
    <tr style="border-top:2px solid #C9A84C;"><td style="padding-top:12px;"><strong>Gesamtumsatz (bezahlt)</strong></td><td style="text-align:right;padding-top:12px;" class="sum">${total.toFixed(2).replace('.', ',')} €</td></tr>
  </table>
  <div style="margin-top:32px;font-size:11px;color:#888;">Exportiert am ${new Date().toLocaleDateString('de-DE')} · astrodaddy.de</div>
</div>
${invoicePages}
</body>
</html>`;

  const w = window.open('', '_blank');
  if (w) { w.document.write(html); w.document.close(); w.print(); }
}

// ── Revenue bar chart ─────────────────────────────────────────────────────────
function RevenueChart() {
  const max = Math.max(...MONTHLY_REVENUE.map(m => m.val));
  return (
    <div className="flex items-end gap-2 h-32 mt-4">
      {MONTHLY_REVENUE.map((m, i) => (
        <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(m.val / max) * 100}%` }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: 'easeOut' }}
            className="w-full rounded-t-lg"
            style={{ background: i === MONTHLY_REVENUE.length - 1 ? '#C9A84C' : 'rgba(123,95,212,0.5)', minHeight: 4 }}
          />
          <span className="text-[#F0E6C8]/40 text-[10px]">{m.month}</span>
        </div>
      ))}
    </div>
  );
}

// ── Status badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { cls: string; icon: React.ElementType }> = {
    bezahlt:   { cls: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/8', icon: CheckCircle },
    offen:     { cls: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/8',   icon: Clock },
    storniert: { cls: 'text-red-400 border-red-400/30 bg-red-400/8',           icon: XCircle },
  };
  const { cls, icon: Icon } = map[status] ?? map.offen;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-medium ${cls}`}>
      <Icon className="w-3 h-3" /> {status}
    </span>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function RobertLogin() {
  // noindex
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots'; meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => document.head.removeChild(meta);
  }, []);

  const [authed, setAuthed] = useState(checkAuth);
  const [pw, setPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('alle');
  const [exportFrom, setExportFrom] = useState('');
  const [exportTo, setExportTo] = useState('');
  const [exportMonth, setExportMonth] = useState('');

  const login = () => {
    if (pw === PASSWORD_HASH) { setAuth(true); setAuthed(true); setError(''); }
    else { setError('Falsches Passwort'); }
  };

  const logout = () => { setAuth(false); setAuthed(false); setPw(''); };

  const totalRevenue = MOCK_INVOICES.filter(i => i.status === 'bezahlt').reduce((s, i) => s + i.amount, 0);
  const paidCount = MOCK_INVOICES.filter(i => i.status === 'bezahlt').length;
  const filtered = filter === 'alle' ? MOCK_INVOICES : MOCK_INVOICES.filter(i => i.status === filter);

  // Bundle export helpers
  const MONTHS = [
    { label: 'Januar', value: '2026-01' }, { label: 'Februar', value: '2026-02' },
    { label: 'März', value: '2026-03' }, { label: 'April', value: '2026-04' },
    { label: 'Mai', value: '2026-05' }, { label: 'Juni', value: '2026-06' },
    { label: 'Juli', value: '2026-07' }, { label: 'August', value: '2026-08' },
    { label: 'September', value: '2026-09' }, { label: 'Oktober', value: '2026-10' },
    { label: 'November', value: '2026-11' }, { label: 'Dezember', value: '2026-12' },
  ];

  const handleMonthExport = (monthVal: string) => {
    const label = MONTHS.find(m => m.value === monthVal)?.label ?? monthVal;
    const result = MOCK_INVOICES.filter(i => i.date.startsWith(monthVal));
    downloadBundle(result, label + ' 2026');
  };

  const handleRangeExport = () => {
    if (!exportFrom || !exportTo) return;
    const result = MOCK_INVOICES.filter(i => i.date >= exportFrom && i.date <= exportTo);
    const label = `${new Date(exportFrom).toLocaleDateString('de-DE')} – ${new Date(exportTo).toLocaleDateString('de-DE')}`;
    downloadBundle(result, label);
  };

  // ── Login screen ──
  if (!authed) return (
    <div className="min-h-screen bg-[#1B1040] flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm">
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
              placeholder="••••••••••••"
              autoFocus
            />
            <button onClick={() => setShowPw(s => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F0E6C8]/30 hover:text-[#F0E6C8]/60 transition-colors">
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {error && <p className="text-red-400/80 text-xs mb-3">{error}</p>}
          <button onClick={login}
            className="w-full py-3 rounded-xl bg-[#C9A84C] text-[#1B1040] font-semibold text-sm hover:bg-[#C9A84C]/90 transition-colors">
            Anmelden
          </button>
        </div>
      </motion.div>
    </div>
  );

  // ── Dashboard ──
  return (
    <div className="min-h-screen bg-[#1B1040] px-4 py-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl text-[#F0E6C8]" style={{ fontFamily: '"rl-limo-1","rl-limo-2",sans-serif', fontWeight: 400 }}>
              Admin Dashboard
            </h1>
            <p className="text-[#F0E6C8]/40 text-sm mt-0.5">Robert Wagner Astrologie</p>
          </div>
          <button onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[#F0E6C8]/50 hover:text-[#F0E6C8] hover:border-white/20 transition-all text-sm">
            <LogOut className="w-4 h-4" /> Abmelden
          </button>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Umsatz (April)', value: `${totalRevenue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} €`, icon: Euro, color: '#C9A84C', sub: '+12% vs. März' },
            { label: 'Bestellungen', value: MOCK_INVOICES.length.toString(), icon: ShoppingBag, color: '#7B5FD4', sub: `${paidCount} bezahlt` },
            { label: 'Ø Bestellwert', value: `${(totalRevenue / paidCount).toFixed(0)} €`, icon: TrendingUp, color: '#C9A84C', sub: 'pro Bestellung' },
            { label: 'Besucher (Mo.)', value: '2.840', icon: Users, color: '#7B5FD4', sub: '3,2% Konversion' },
          ].map((k, i) => (
            <motion.div key={k.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="bg-white/4 border border-white/8 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[#F0E6C8]/50 text-xs">{k.label}</span>
                <k.icon className="w-4 h-4" style={{ color: k.color }} />
              </div>
              <div className="text-2xl font-bold text-[#F0E6C8] mb-1">{k.value}</div>
              <div className="text-[#F0E6C8]/30 text-xs">{k.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Chart + top products */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2 bg-white/4 border border-white/8 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-[#F0E6C8] font-semibold text-sm">Monatsumsatz</h2>
              <span className="text-[#C9A84C] text-xs">letzten 6 Monate</span>
            </div>
            <RevenueChart />
          </div>
          <div className="bg-white/4 border border-white/8 rounded-2xl p-5">
            <h2 className="text-[#F0E6C8] font-semibold text-sm mb-4">Top Produkte</h2>
            <div className="space-y-3">
              {[
                { name: 'Beratung 90 Min', pct: 82, rev: '679,96 €' },
                { name: 'Jahresvorschau', pct: 67, rev: '349,95 €' },
                { name: 'Partneranalyse', pct: 55, rev: '239,97 €' },
                { name: 'Beratung 45 Min', pct: 38, rev: '199,98 €' },
              ].map(p => (
                <div key={p.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[#F0E6C8]/70 text-xs">{p.name}</span>
                    <span className="text-[#C9A84C] text-xs font-semibold">{p.rev}</span>
                  </div>
                  <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${p.pct}%` }} transition={{ duration: 0.7, ease: 'easeOut' }}
                      className="h-full rounded-full bg-[#7B5FD4]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bundle Export */}
        <div className="bg-white/4 border border-white/8 rounded-2xl p-5 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <PackageOpen className="w-4 h-4 text-[#C9A84C]" />
            <h2 className="text-[#F0E6C8] font-semibold text-sm">Rechnungsexport</h2>
          </div>

          {/* Month quick-select */}
          <p className="text-[#F0E6C8]/40 text-xs mb-2">Schnellauswahl nach Monat</p>
          <div className="flex flex-wrap gap-1.5 mb-5">
            {MONTHS.map(m => {
              const count = MOCK_INVOICES.filter(i => i.date.startsWith(m.value)).length;
              return (
                <button key={m.value} onClick={() => handleMonthExport(m.value)}
                  disabled={count === 0}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    count > 0
                      ? 'bg-[#C9A84C]/10 border-[#C9A84C]/25 text-[#C9A84C] hover:bg-[#C9A84C]/20'
                      : 'border-white/5 text-[#F0E6C8]/20 cursor-not-allowed'
                  }`}>
                  {m.label} {count > 0 && <span className="ml-1 opacity-60">({count})</span>}
                </button>
              );
            })}
          </div>

          {/* Custom date range */}
          <p className="text-[#F0E6C8]/40 text-xs mb-2">Oder Zeitraum wählen</p>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-3.5 h-3.5 text-[#F0E6C8]/30" />
              <input type="date" value={exportFrom} onChange={e => setExportFrom(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-[#F0E6C8] text-xs focus:outline-none focus:border-[#C9A84C]/40 [color-scheme:dark]" />
            </div>
            <span className="text-[#F0E6C8]/30 text-xs">bis</span>
            <div className="flex items-center gap-2">
              <CalendarDays className="w-3.5 h-3.5 text-[#F0E6C8]/30" />
              <input type="date" value={exportTo} onChange={e => setExportTo(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-[#F0E6C8] text-xs focus:outline-none focus:border-[#C9A84C]/40 [color-scheme:dark]" />
            </div>
            <button onClick={handleRangeExport}
              disabled={!exportFrom || !exportTo}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#C9A84C] text-[#1B1040] text-xs font-semibold hover:bg-[#C9A84C]/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
              <Download className="w-3.5 h-3.5" /> Bundle herunterladen
            </button>
          </div>
        </div>

        {/* Invoices */}
        <div className="bg-white/4 border border-white/8 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#F0E6C8] font-semibold text-sm">Rechnungen</h2>
            <div className="flex gap-1.5">
              {['alle', 'bezahlt', 'offen', 'storniert'].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all capitalize ${
                    filter === f ? 'bg-[#7B5FD4]/30 text-[#F0E6C8] border border-[#7B5FD4]/40' : 'text-[#F0E6C8]/40 hover:text-[#F0E6C8]/70'
                  }`}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8">
                  {['Rechnungs-Nr.', 'Datum', 'Kunde', 'Produkt', 'Betrag', 'Status', ''].map(h => (
                    <th key={h} className="text-left text-[#F0E6C8]/40 text-xs font-medium pb-3 pr-4 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {filtered.map((inv, i) => (
                    <motion.tr key={inv.id}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-white/5 hover:bg-white/3 transition-colors">
                      <td className="py-3 pr-4 text-[#C9A84C] font-mono text-xs whitespace-nowrap">{inv.id}</td>
                      <td className="py-3 pr-4 text-[#F0E6C8]/50 text-xs whitespace-nowrap">
                        {new Date(inv.date).toLocaleDateString('de-DE')}
                      </td>
                      <td className="py-3 pr-4">
                        <div className="text-[#F0E6C8] text-xs font-medium">{inv.customer}</div>
                        <div className="text-[#F0E6C8]/35 text-[11px]">{inv.email}</div>
                      </td>
                      <td className="py-3 pr-4 text-[#F0E6C8]/60 text-xs max-w-[180px] truncate">{inv.product}</td>
                      <td className="py-3 pr-4 text-[#F0E6C8] font-semibold text-xs whitespace-nowrap">
                        {inv.amount.toFixed(2).replace('.', ',')} €
                      </td>
                      <td className="py-3 pr-4"><StatusBadge status={inv.status} /></td>
                      <td className="py-3">
                        <button onClick={() => downloadInvoice(inv)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[#C9A84C] text-xs hover:bg-[#C9A84C]/20 transition-colors whitespace-nowrap">
                          <Download className="w-3 h-3" /> PDF
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          <div className="mt-4 pt-4 border-t border-white/8 flex items-center justify-between">
            <span className="text-[#F0E6C8]/30 text-xs">{filtered.length} Einträge</span>
            <span className="text-[#F0E6C8]/50 text-xs">
              Gesamt bezahlt: <span className="text-[#C9A84C] font-semibold">{totalRevenue.toFixed(2).replace('.', ',')} €</span>
            </span>
          </div>
        </div>

        <p className="text-center text-[#F0E6C8]/15 text-xs mt-8">
          Nicht indexierter Admin-Bereich · Robert Wagner Astrologie
        </p>
      </div>
    </div>
  );
}
