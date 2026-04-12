import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../context/AuthContext';
import { LogIn, UserPlus, Sparkles } from 'lucide-react';

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
    if (searchParams.get('tab') === 'register') {
      setIsLogin(false);
    }
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
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 relative overflow-hidden">
      {/* Video Background */}
      <div className="fixed inset-0 -z-10">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/login-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <GlassCard className="rounded-3xl p-6 md:p-8">
          <div className="text-center mb-5">
            <img src="/logo.png" alt="HappyAger" className="h-14 w-auto mx-auto mb-3" />
          </div>

          {/* Tab Switcher */}
          <div className="flex gap-2 mb-5 p-1 rounded-2xl bg-white/30 backdrop-blur-sm">
            <button
              onClick={() => { setIsLogin(true); setError(''); setRegisterSuccess(false); }}
              className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                isLogin ? 'bg-[#1b2a23] text-white shadow-lg' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <LogIn className="w-4 h-4 inline-block mr-2" />
              Login
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(''); setRegisterSuccess(false); }}
              className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                !isLogin ? 'bg-[#1b2a23] text-white shadow-lg' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <UserPlus className="w-4 h-4 inline-block mr-2" />
              Registrieren
            </button>
          </div>

          {registerSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1b2a23] to-[#8268AB] flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1b2a23] mb-2">Fast geschafft!</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Wir haben dir eine Bestätigungs-E-Mail geschickt.<br />
                Bitte klicke auf den Link darin, um deinen Account zu aktivieren.
              </p>
              <button
                onClick={() => { setIsLogin(true); setRegisterSuccess(false); }}
                className="mt-6 text-sm text-[#8268AB] hover:underline"
              >
                Zum Login
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              {!isLogin && (
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Dein Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 bg-white/50 backdrop-blur-sm border-white/30"
                    required={!isLogin}
                  />
                </div>
              )}

              <div>
                <Label htmlFor="email">E-Mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="deine@email.de"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 bg-white/50 backdrop-blur-sm border-white/30"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Passwort</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 bg-white/50 backdrop-blur-sm border-white/30"
                  required
                />
              </div>

              {isLogin && (
                <div className="flex justify-end text-sm">
                  <Link to="/forgot-password" className="text-[#8268AB] hover:underline">
                    Passwort vergessen?
                  </Link>
                </div>
              )}

              {error && (
                <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">{error}</p>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="w-full bg-[#1b2a23] hover:bg-[#1b2a23]/90 text-white"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    {isLogin ? 'Anmelden…' : 'Registrieren…'}
                  </span>
                ) : isLogin ? (
                  <><LogIn className="w-4 h-4 mr-2" />Anmelden</>
                ) : (
                  <><UserPlus className="w-4 h-4 mr-2" />Account erstellen</>
                )}
              </Button>
            </form>
          )}

          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-start space-x-3 text-sm text-muted-foreground">
              <Sparkles className="w-5 h-5 text-[#F9C4B5] flex-shrink-0 mt-0.5" />
              <p>Als Mitglied erhältst du Zugang zu exklusiven Longevity-Inhalten und der HappyAger Community.</p>
            </div>
          </div>
        </GlassCard>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-3 text-sm text-muted-foreground"
        >
          Mit der Anmeldung akzeptierst du unsere{' '}
          <Link to="/datenschutz" className="text-[#1b2a23] hover:underline">Datenschutzerklärung</Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
