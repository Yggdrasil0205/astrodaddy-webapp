import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../context/AuthContext';
import { LogIn, UserPlus, Moon, Star } from 'lucide-react';

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
      if (isLogin) {
        await login(email, password);
        navigate('/mitglieder');
      } else {
        await register(email, password, name);
        setRegisterSuccess(true);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten.';
      if (msg.includes('Invalid login credentials')) {
        setError('E-Mail oder Passwort ist falsch.');
      } else if (msg.includes('User already registered')) {
        setError('Diese E-Mail-Adresse ist bereits registriert.');
      } else if (msg.includes('Password should be at least')) {
        setError('Das Passwort muss mindestens 6 Zeichen lang sein.');
      } else {
        setError(msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#1a0d2e] via-[#2D1B4E] to-[#f5f0e8]" />
      <div className="fixed inset-0 -z-10">
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2], rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute top-10 right-10 w-96 h-96 rounded-full bg-gradient-to-br from-[#5C3D8F]/30 to-transparent blur-3xl" />
        <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-gradient-to-br from-[#C9A84C]/20 to-transparent blur-3xl" />
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative z-10">
        <GlassCard className="rounded-3xl p-8 bg-white/80 backdrop-blur-xl">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Moon className="w-8 h-8 text-[#5C3D8F]" />
              <span className="text-2xl font-bold bg-gradient-to-r from-[#5C3D8F] to-[#C9A84C] bg-clip-text text-transparent">AstroDaddy</span>
            </div>
            <p className="text-sm text-muted-foreground">Entdecke Dein Universum</p>
          </div>

          {/* Tab Switcher */}
          <div className="flex gap-2 mb-6 p-1 rounded-2xl bg-white/50 backdrop-blur-sm">
            <button onClick={() => { setIsLogin(true); setError(''); setRegisterSuccess(false); }}
              className={`flex-1 py-3 rounded-xl font-medium transition-all text-sm ${isLogin ? 'bg-[#5C3D8F] text-white shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}>
              <LogIn className="w-4 h-4 inline-block mr-2" />Login
            </button>
            <button onClick={() => { setIsLogin(false); setError(''); setRegisterSuccess(false); }}
              className={`flex-1 py-3 rounded-xl font-medium transition-all text-sm ${!isLogin ? 'bg-[#5C3D8F] text-white shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}>
              <UserPlus className="w-4 h-4 inline-block mr-2" />Registrieren
            </button>
          </div>

          {registerSuccess ? (
            <div className="text-center py-6">
              <Star className="w-12 h-12 text-[#C9A84C] mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Willkommen! 🌟</h3>
              <p className="text-muted-foreground text-sm">Bitte bestätige deine E-Mail-Adresse und melde dich dann an.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Dein Name" required className="mt-1" />
                </div>
              )}
              <div>
                <Label htmlFor="email">E-Mail</Label>
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="deine@email.de" required className="mt-1" />
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Passwort</Label>
                  {isLogin && (
                    <Link to="/forgot-password" className="text-xs text-[#5C3D8F] hover:underline">Vergessen?</Link>
                  )}
                </div>
                <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required className="mt-1" />
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>
              )}

              <Button type="submit" disabled={isLoading} className="w-full bg-[#5C3D8F] hover:bg-[#5C3D8F]/90 text-white rounded-2xl py-3">
                {isLoading ? 'Bitte warten...' : isLogin ? 'Anmelden' : 'Registrieren'}
              </Button>

              {isLogin && (
                <div className="mt-4 p-3 rounded-xl bg-[#5C3D8F]/5 border border-[#5C3D8F]/10 text-xs text-muted-foreground text-center">
                  <strong>Testbenutzer:</strong> test@astrodaddy.de / test1234
                </div>
              )}
            </form>
          )}
        </GlassCard>
      </motion.div>
    </div>
  );
}
