import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { User, Package, KeyRound, Trash2, LogOut, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';

interface Order {
  id: string | number;
  created_at: string;
  product_name: string;
  amount: number;
  status: string;
  mollie_payment_id: string;
}

const euro = (v: number) =>
  Number(v || 0).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });

function StatusBadge({ status }: { status: string }) {
  const s = (status || '').toLowerCase();
  const style =
    s === 'bezahlt'
      ? 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10'
      : s === 'offen'
        ? 'border-[#C9A84C]/30 text-[#C9A84C] bg-[#C9A84C]/10'
        : 'border-white/15 text-[#F0E6C8]/50 bg-white/5';
  return <span className={`px-2 py-0.5 rounded text-[11px] border ${style}`}>{status || 'unbekannt'}</span>;
}

export default function MemberDashboard() {
  const { user, session, logout } = useAuth();
  const navigate = useNavigate();
  const name = user?.user_metadata?.full_name ?? user?.email?.split('@')[0] ?? 'Mitglied';
  const isRealAccount = !!session?.access_token;

  // ── Orders ─────────────────────────────────────────────────────────────────
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.access_token) {
      setOrdersLoading(false);
      return;
    }
    setOrdersLoading(true);
    fetch('/api/my-orders', { headers: { Authorization: `Bearer ${session.access_token}` } })
      .then(async r => {
        const d = await r.json();
        if (!r.ok) throw new Error(d.error ?? 'Fehler');
        setOrders(d.orders ?? []);
      })
      .catch(() => setOrdersError('Bestellungen konnten nicht geladen werden.'))
      .finally(() => setOrdersLoading(false));
  }, [session]);

  // ── Passwort ändern ──────────────────────────────────────────────────────────
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMsg, setPwMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwMsg(null);
    if (!isRealAccount) {
      setPwMsg({ type: 'error', text: 'Für den Test-Account nicht verfügbar.' });
      return;
    }
    if (newPw.length < 8) {
      setPwMsg({ type: 'error', text: 'Das Passwort muss mindestens 8 Zeichen haben.' });
      return;
    }
    if (newPw !== confirmPw) {
      setPwMsg({ type: 'error', text: 'Die Passwörter stimmen nicht überein.' });
      return;
    }
    setPwSaving(true);
    const { error } = await supabase.auth.updateUser({ password: newPw });
    setPwSaving(false);
    if (error) {
      setPwMsg({ type: 'error', text: error.message });
      return;
    }
    setNewPw('');
    setConfirmPw('');
    setPwMsg({ type: 'success', text: 'Passwort erfolgreich geändert.' });
  };

  // ── Account löschen ───────────────────────────────────────────────────────────
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const deleteAccount = async () => {
    setDeleteError(null);
    if (!isRealAccount) {
      setDeleteError('Für den Test-Account nicht verfügbar.');
      return;
    }
    setDeleting(true);
    try {
      const r = await fetch('/api/delete-account', {
        method: 'POST',
        headers: { Authorization: `Bearer ${session!.access_token}` },
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error ?? 'Konto konnte nicht gelöscht werden.');
      await logout();
      navigate('/');
    } catch (err: any) {
      setDeleting(false);
      setDeleteError(err?.message ?? 'Konto konnte nicht gelöscht werden.');
    }
  };

  const inputClass =
    'w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[#F0E6C8] text-sm placeholder-[#F0E6C8]/30 focus:outline-none focus:border-[#C9A84C]/40';

  return (
    <div className="min-h-screen bg-[#1B1040] pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <GlassCard className="rounded-xl p-6 border-white/8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#3D2A8A] border border-[#7B5FD4]/30 flex items-center justify-center text-[#F0E6C8] font-bold text-lg">
                  {name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-[#F0E6C8] font-semibold">Mein Konto</div>
                  <div className="text-[#F0E6C8]/40 text-xs">{user?.email}</div>
                </div>
              </div>
              <button
                onClick={async () => { await logout(); navigate('/'); }}
                className="flex items-center gap-2 text-xs text-[#F0E6C8]/35 hover:text-[#F0E6C8]/70 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" /> Abmelden
              </button>
            </div>
          </GlassCard>
        </motion.div>

        <div className="space-y-6">

          {/* Kundendaten */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <GlassCard className="rounded-xl p-6 border-white/8">
              <h2 className="text-base text-[#F0E6C8] mb-5 flex items-center gap-2">
                <User className="w-4 h-4 text-[#C9A84C]" /> Kundendaten
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-[#F0E6C8]/40 mb-1">Name</label>
                  <div className="text-[#F0E6C8] text-sm">{name}</div>
                </div>
                <div>
                  <label className="block text-xs text-[#F0E6C8]/40 mb-1">E-Mail-Adresse</label>
                  <div className="text-[#F0E6C8] text-sm">{user?.email}</div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Bestellungen */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <GlassCard className="rounded-xl p-6 border-white/8">
              <h2 className="text-base text-[#F0E6C8] mb-5 flex items-center gap-2">
                <Package className="w-4 h-4 text-[#C9A84C]" /> Bestellungen
              </h2>

              {ordersLoading ? (
                <div className="flex items-center gap-2 text-[#F0E6C8]/40 text-sm py-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Wird geladen…
                </div>
              ) : ordersError ? (
                <p className="text-red-300/80 text-sm">{ordersError}</p>
              ) : orders.length === 0 ? (
                <p className="text-[#F0E6C8]/40 text-sm">Du hast noch keine Bestellungen.</p>
              ) : (
                <div className="divide-y divide-white/8">
                  {orders.map(o => (
                    <div key={o.id} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                      <div className="min-w-0">
                        <div className="text-[#F0E6C8] text-sm truncate">{o.product_name}</div>
                        <div className="text-[#F0E6C8]/40 text-xs mt-0.5">{formatDate(o.created_at)}</div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <StatusBadge status={o.status} />
                        <span className="text-[#F0E6C8] text-sm font-medium tabular-nums">{euro(o.amount)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>
          </motion.div>

          {/* Passwort ändern */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <GlassCard className="rounded-xl p-6 border-white/8">
              <h2 className="text-base text-[#F0E6C8] mb-5 flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-[#C9A84C]" /> Passwort ändern
              </h2>
              <form onSubmit={changePassword} className="space-y-4 max-w-sm">
                <div>
                  <label className="block text-xs text-[#F0E6C8]/40 mb-1">Neues Passwort</label>
                  <input
                    type="password"
                    value={newPw}
                    onChange={e => setNewPw(e.target.value)}
                    autoComplete="new-password"
                    className={inputClass}
                    placeholder="Mindestens 8 Zeichen"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#F0E6C8]/40 mb-1">Passwort bestätigen</label>
                  <input
                    type="password"
                    value={confirmPw}
                    onChange={e => setConfirmPw(e.target.value)}
                    autoComplete="new-password"
                    className={inputClass}
                    placeholder="Neues Passwort wiederholen"
                  />
                </div>
                {pwMsg && (
                  <div className={`flex items-center gap-2 text-xs ${pwMsg.type === 'success' ? 'text-emerald-300' : 'text-red-300'}`}>
                    {pwMsg.type === 'success' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                    {pwMsg.text}
                  </div>
                )}
                <Button type="submit" variant="gold" disabled={pwSaving} className="w-full sm:w-auto px-6">
                  {pwSaving ? 'Wird gespeichert…' : 'Passwort ändern'}
                </Button>
              </form>
            </GlassCard>
          </motion.div>

          {/* Account löschen */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <GlassCard className="rounded-xl p-6 border-red-500/20">
              <h2 className="text-base text-red-300 mb-2 flex items-center gap-2">
                <Trash2 className="w-4 h-4" /> Account löschen
              </h2>
              <p className="text-[#F0E6C8]/45 text-sm mb-5">
                Dein Login-Konto wird dauerhaft gelöscht. Bereits erstellte Rechnungen bleiben aus
                gesetzlichen Aufbewahrungsgründen gespeichert.
              </p>

              {!confirmDelete ? (
                <Button
                  onClick={() => { setConfirmDelete(true); setDeleteError(null); }}
                  className="bg-red-900/40 text-red-200 hover:bg-red-900/60 border border-red-500/30 px-6"
                >
                  Account löschen
                </Button>
              ) : (
                <div className="space-y-4">
                  <p className="text-[#F0E6C8] text-sm">Bist du sicher? Diese Aktion kann nicht rückgängig gemacht werden.</p>
                  {deleteError && (
                    <div className="flex items-center gap-2 text-xs text-red-300">
                      <AlertTriangle className="w-3.5 h-3.5" /> {deleteError}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={deleteAccount}
                      disabled={deleting}
                      className="bg-red-600 text-white hover:bg-red-500 border-none px-6"
                    >
                      {deleting ? 'Wird gelöscht…' : 'Ja, endgültig löschen'}
                    </Button>
                    <Button
                      onClick={() => setConfirmDelete(false)}
                      disabled={deleting}
                      variant="secondary"
                      className="px-6"
                    >
                      Abbrechen
                    </Button>
                  </div>
                </div>
              )}
            </GlassCard>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
