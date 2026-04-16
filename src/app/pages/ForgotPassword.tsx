import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../context/AuthContext';
import { Mail, ArrowLeft, CheckCircle, Sparkles } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await resetPassword(email);
      setIsSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2], rotate: [0, 180, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 -right-40 w-[32rem] h-[32rem] rounded-full bg-gradient-to-br from-[#1a0d2e]/20 to-transparent blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.3, 0.15], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-40 -left-40 w-[28rem] h-[28rem] rounded-full bg-gradient-to-br from-[#5C3D8F]/20 to-transparent blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <GlassCard className="rounded-3xl p-8 md:p-10">
          <div className="text-center mb-8">
            <Link to="/login">
              <img src="/logo.png" alt="AstroDaddy" className="h-20 w-auto mx-auto mb-4" />
            </Link>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-[#5C3D8F]/20 to-[#8B6EC5]/20 backdrop-blur-sm mb-3">
              <Sparkles className="w-4 h-4 mr-2 text-[#5C3D8F]" />
              <span className="text-sm text-[#5C3D8F] font-medium">Passwort zurücksetzen</span>
            </div>

            {!isSubmitted ? (
              <>
                <h1 className="text-2xl font-bold mb-2">Passwort vergessen?</h1>
                <p className="text-muted-foreground text-sm">
                  Gib deine E-Mail-Adresse ein und wir senden dir einen Reset-Link.
                </p>
              </>
            ) : (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#1a0d2e] to-[#5C3D8F] flex items-center justify-center"
                >
                  <CheckCircle className="w-8 h-8 text-white" />
                </motion.div>
                <h1 className="text-2xl font-bold mb-2">E-Mail versendet!</h1>
                <p className="text-muted-foreground text-sm">
                  Wir haben einen Reset-Link an <strong>{email}</strong> geschickt.
                  Bitte prüfe auch deinen Spam-Ordner.
                </p>
              </>
            )}
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">E-Mail-Adresse</Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="deine@email.de"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white/50 backdrop-blur-sm border-white/30"
                    required
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">{error}</p>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="w-full bg-[#1a0d2e] hover:bg-[#1a0d2e]/90 text-white"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Wird gesendet…
                  </span>
                ) : (
                  <><Mail className="w-4 h-4 mr-2" />Reset-Link senden</>
                )}
              </Button>

              <div className="text-center">
                <Link to="/login" className="inline-flex items-center text-sm text-[#5C3D8F] hover:underline">
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Zurück zum Login
                </Link>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                size="lg"
                className="w-full border-white/30 hover:bg-white/50"
              >
                Erneut senden
              </Button>
              <div className="text-center">
                <Link to="/login" className="inline-flex items-center text-sm text-[#5C3D8F] hover:underline">
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Zurück zum Login
                </Link>
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex items-start space-x-3 text-sm text-muted-foreground">
              <Sparkles className="w-5 h-5 text-[#F9C4B5] flex-shrink-0 mt-0.5" />
              <p>
                Brauchst du Hilfe? Schreib uns:{' '}
                <a href="mailto:hallo@happyager.com" className="text-[#1a0d2e] hover:underline">
                  hallo@happyager.com
                </a>
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
