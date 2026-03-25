import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Mail, ArrowLeft, CheckCircle, Sparkles } from 'lucide-react';
import { HappyAgerLogo } from '../components/HappyAgerLogo';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock API call - in production, this would call your backend
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -right-40 w-[32rem] h-[32rem] rounded-full bg-gradient-to-br from-[#1b2a23]/20 to-transparent blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.3, 0.15],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-[28rem] h-[28rem] rounded-full bg-gradient-to-br from-[#8B7B9E]/20 to-transparent blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-[#F4A89D]/15 to-transparent blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <GlassCard className="rounded-3xl p-8 md:p-10">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <Link to="/login">
              <HappyAgerLogo 
                className="h-20 w-auto mx-auto mb-4"
              />
            </Link>
            
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-[#8268AB]/20 to-[#BFADD5]/20 backdrop-blur-sm mb-3">
              <Sparkles className="w-4 h-4 mr-2 text-[#8268AB]" />
              <span className="text-sm text-[#8268AB] font-medium">Passwort zurücksetzen</span>
            </div>
            
            {!isSubmitted ? (
              <>
                <h1 className="text-2xl font-bold mb-2">
                  Passwort vergessen?
                </h1>
                <p className="text-muted-foreground text-sm">
                  Kein Problem! Gib deine E-Mail-Adresse ein und wir senden dir einen Link zum Zurücksetzen.
                </p>
              </>
            ) : (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#1b2a23] to-[#8268AB] flex items-center justify-center"
                >
                  <CheckCircle className="w-8 h-8 text-white" />
                </motion.div>
                <h1 className="text-2xl font-bold mb-2">
                  E-Mail versendet!
                </h1>
                <p className="text-muted-foreground text-sm">
                  Wir haben dir eine E-Mail an <strong>{email}</strong> gesendet. 
                  Bitte überprüfe dein Postfach und folge den Anweisungen.
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

              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="w-full bg-[#1b2a23] hover:bg-[#1b2a23]/90 text-white"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Wird gesendet...
                  </span>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Zurücksetzen-Link senden
                  </>
                )}
              </Button>

              <div className="text-center">
                <Link 
                  to="/login" 
                  className="inline-flex items-center text-sm text-[#1b2a23] hover:underline"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Zurück zum Login
                </Link>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="bg-[#F9C4B5]/10 border border-[#F9C4B5]/30 rounded-xl p-4 text-sm">
                <p className="text-muted-foreground">
                  <strong>Hinweis:</strong> Die E-Mail kann ein paar Minuten dauern. 
                  Überprüfe auch deinen Spam-Ordner, falls du nichts erhältst.
                </p>
              </div>

              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                size="lg"
                className="w-full border-white/30 hover:bg-white/50"
              >
                Erneut senden
              </Button>

              <div className="text-center">
                <Link 
                  to="/login" 
                  className="inline-flex items-center text-sm text-[#1b2a23] hover:underline"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Zurück zum Login
                </Link>
              </div>
            </div>
          )}

          {/* Help Section */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex items-start space-x-3 text-sm text-muted-foreground">
              <Sparkles className="w-5 h-5 text-[#F4A89D] flex-shrink-0 mt-0.5" />
              <p>
                Brauchst du Hilfe? Kontaktiere uns unter{' '}
                <a href="mailto:support@happyager.de" className="text-[#1b2a23] hover:underline">
                  support@happyager.de
                </a>
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}