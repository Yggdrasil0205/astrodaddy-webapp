import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { KeyRound, CheckCircle, AlertTriangle } from 'lucide-react';

// Landing page of the password-reset e-mail (redirectTo in AuthContext.resetPassword).
// supabase-js picks up the recovery token from the URL and opens a session;
// the customer then sets a new password via updateUser().
export default function ResetPassword() {
  const { session, isLoading } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  // Give supabase-js a moment to exchange the token from the URL.
  const [waited, setWaited] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setWaited(true), 2500);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 8) { setError('Das Passwort muss mindestens 8 Zeichen haben.'); return; }
    if (password !== confirm) { setError('Die Passwörter stimmen nicht überein.'); return; }
    setSaving(true);
    const { error: err } = await supabase.auth.updateUser({ password });
    setSaving(false);
    if (err) {
      setError(err.message.includes('different from the old')
        ? 'Das neue Passwort muss sich vom alten unterscheiden.'
        : 'Passwort konnte nicht gespeichert werden. Bitte fordere einen neuen Link an.');
      return;
    }
    setDone(true);
    setTimeout(() => navigate('/mitglieder'), 1500);
  };

  const hasSession = !!session?.access_token;
  const linkInvalid = !isLoading && !hasSession && waited;

  const inputClass = 'bg-white/5 border-white/10 text-[#F0E6C8] placeholder:text-[#F0E6C8]/25 focus:border-[#7B5FD4]/50';

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <GlassCard className="rounded-3xl p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-[#7B5FD4]/15 border border-[#7B5FD4]/30 flex items-center justify-center mx-auto mb-4">
              <KeyRound className="w-5 h-5 text-[#C9A84C]" />
            </div>
            <h1 className="text-2xl text-[#F0E6C8] mb-1">Neues Passwort setzen</h1>
          </div>

          {done ? (
            <div className="text-center py-4">
              <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
              <p className="text-[#F0E6C8]/70 text-sm">Passwort gespeichert. Du wirst weitergeleitet …</p>
            </div>
          ) : linkInvalid ? (
            <div className="text-center py-4">
              <AlertTriangle className="w-10 h-10 text-[#C9A84C] mx-auto mb-3" />
              <p className="text-[#F0E6C8]/70 text-sm mb-5">Dieser Link ist ungültig oder abgelaufen.</p>
              <Link to="/forgot-password" className="text-[#C9A84C] text-sm hover:underline">Neuen Link anfordern</Link>
            </div>
          ) : !hasSession ? (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-2 border-[#7B5FD4] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-[#F0E6C8]/60 text-xs mb-1.5">Neues Passwort</Label>
                <Input type="password" value={password} onChange={e => setPassword(e.target.value)}
                  autoComplete="new-password" required minLength={8} className={inputClass} />
              </div>
              <div>
                <Label className="text-[#F0E6C8]/60 text-xs mb-1.5">Passwort wiederholen</Label>
                <Input type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
                  autoComplete="new-password" required minLength={8} className={inputClass} />
              </div>
              {error && <div className="p-3 rounded-lg bg-red-900/30 border border-red-500/20 text-red-300 text-xs">{error}</div>}
              <Button type="submit" disabled={saving} className="w-full">
                {saving ? 'Speichere …' : 'Passwort speichern'}
              </Button>
            </form>
          )}
        </GlassCard>
      </motion.div>
    </div>
  );
}
