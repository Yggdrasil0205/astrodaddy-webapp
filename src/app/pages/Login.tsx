import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../context/AuthContext';
import { StarField } from '../components/StarField';
import { LogIn, UserPlus, Moon } from 'lucide-react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('tab') === 'register') setIsLogin(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      if (isLogin) { await login(email, password); navigate('/mitglieder'); }
      else { await register(email, password, name); setRegisterSuccess(true); }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten.';
      if (msg.includes('Invalid login credentials')) setError('E-Mail oder Passwort ist falsch.');
      else if (msg.includes('User already registered')) setError('Diese E-Mail ist bereits registriert.');
      else if (msg.includes('Password should be at least')) setError('Passwort muss mind. 6 Zeichen haben.');
      else setError(msg);
    } finally { setIsLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#1B1040] flex items-center justify-center px-6 pt-20 relative overflow-hidden">
      <StarField className="z-0 opacity-60" />

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative z-10">
        <GlassCard className="rounded-xl p-8 border-white/10">

          <div className="text-center mb-7">
            <Moon className="w-7 h-7 text-[#C9A84C] mx-auto mb-3" />
            <div className="text-xl text-[#F0E6C8] tracking-widest" style={{ fontFamily: 'Cinzel, serif' }}>ROBERT WAGNER</div>
            <p className="text-xs text-[#F0E6C8]/35 mt-1">Entdecke Dein Universum</p>
          </div>

          <div className="flex gap-1 mb-6 p-1 rounded-lg bg-white/5 border border-white/8">
            {[{ v: true, label: 'Login', icon: LogIn }, { v: false, label: 'Registrieren', icon: UserPlus }].map(tab => (
              <button key={String(tab.v)} onClick={() => { setIsLogin(tab.v); setError(''); setRegisterSuccess(false); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm transition-all ${
                  isLogin === tab.v ? 'bg-[#3D2A8A] text-[#F0E6C8]' : 'text-[#F0E6C8]/40 hover:text-[#F0E6C8]/70'
                }`}>
                <tab.icon className="w-3.5 h-3.5" />{tab.label}
              </button>
            ))}
          </div>

          {registerSuccess ? (
            <div className="text-center py-6">
              <p className="text-[#F0E6C8]/60 text-sm">Bitte bestätige deine E-Mail und melde dich dann an.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <Label className="text-[#F0E6C8]/60 text-xs mb-1.5">Name</Label>
                  <Input value={name} onChange={e => setName(e.target.value)} placeholder="Dein Name" required
                    className="bg-white/5 border-white/10 text-[#F0E6C8] placeholder:text-[#F0E6C8]/25 focus:border-[#7B5FD4]/50" />
                </div>
              )}
              <div>
                <Label className="text-[#F0E6C8]/60 text-xs mb-1.5">E-Mail</Label>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="deine@email.de" required
                  className="bg-white/5 border-white/10 text-[#F0E6C8] placeholder:text-[#F0E6C8]/25 focus:border-[#7B5FD4]/50" />
              </div>
              <div>
                <div className="flex justify-between mb-1.5">
                  <Label className="text-[#F0E6C8]/60 text-xs">Passwort</Label>
                  {isLogin && <Link to="/forgot-password" className="text-xs text-[#7B5FD4]/70 hover:text-[#7B5FD4]">Vergessen?</Link>}
                </div>
                <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required
                  className="bg-white/5 border-white/10 text-[#F0E6C8] placeholder:text-[#F0E6C8]/25 focus:border-[#7B5FD4]/50" />
              </div>

              {error && <div className="p-3 rounded-lg bg-red-900/30 border border-red-500/20 text-red-300 text-xs">{error}</div>}

              <Button type="submit" variant="gold" disabled={isLoading} className="w-full mt-2">
                {isLoading ? 'Bitte warten…' : isLogin ? 'Anmelden' : 'Registrieren'}
              </Button>

              {isLogin && (
                <div className="pt-2 text-center text-xs text-[#F0E6C8]/25">
                  Testlogin: test@astrodaddy.de · test1234
                </div>
              )}
            </form>
          )}
        </GlassCard>
      </motion.div>
    </div>
  );
}
