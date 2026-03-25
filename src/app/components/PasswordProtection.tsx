import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { DEV_CONFIG } from '../../config/dev.config';

interface PasswordProtectionProps {
  children: React.ReactNode;
}

export function PasswordProtection({ children }: PasswordProtectionProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Check if password protection is enabled
  useEffect(() => {
    if (!DEV_CONFIG.PASSWORD_PROTECTION) {
      setIsAuthenticated(true);
      setIsLoading(false);
      return;
    }

    // Check if user is already authenticated
    const authData = localStorage.getItem('dev_auth');
    if (authData) {
      try {
        const { timestamp } = JSON.parse(authData);
        const expirationTime = DEV_CONFIG.SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000;
        
        if (Date.now() - timestamp < expirationTime) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('dev_auth');
        }
      } catch (e) {
        localStorage.removeItem('dev_auth');
      }
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password === DEV_CONFIG.PASSWORD) {
      // Store authentication with timestamp
      localStorage.setItem('dev_auth', JSON.stringify({
        timestamp: Date.now()
      }));
      setIsAuthenticated(true);
    } else {
      setError('Falsches Passwort. Bitte versuche es erneut.');
      setPassword('');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#BFADD5]/20 via-white to-[#F9C4B5]/20 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-[#8268AB] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#BFADD5]/20 via-white to-[#F9C4B5]/20 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="relative rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/40 shadow-2xl p-8 overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#8268AB]/5 via-transparent to-[#F9C4B5]/5 pointer-events-none" />
            
            <div className="relative">
              {/* Icon */}
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#8268AB] to-[#BFADD5] flex items-center justify-center">
                <Lock className="w-10 h-10 text-white" />
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold text-center mb-2 text-[#1b2a23]" style={{ fontFamily: 'henriette, serif' }}>
                Entwicklungsbereich
              </h1>
              <p className="text-center text-[#1b2a23]/70 mb-8">
                Diese Website befindet sich noch in der Entwicklung.<br />
                Bitte gib das Passwort ein, um fortzufahren.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Passwort eingeben"
                    className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-xl border border-white/40 focus:outline-none focus:ring-2 focus:ring-[#8268AB] text-[#1b2a23] placeholder:text-[#1b2a23]/50"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1b2a23]/50 hover:text-[#1b2a23] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-[#8268AB] hover:bg-[#8268AB]/90 text-white py-3 text-lg backdrop-blur-xl"
                >
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Zugang freischalten
                </Button>
              </form>

              {/* Info Badge */}
              <div className="mt-6 p-3 rounded-xl bg-[#F9C4B5]/20 backdrop-blur-xl border border-[#F9C4B5]/30">
                <p className="text-xs text-[#1b2a23]/70 text-center">
                  🔒 Session-Dauer: {DEV_CONFIG.SESSION_DURATION_DAYS} Tage
                </p>
              </div>
            </div>
          </div>

          {/* Developer Info */}
          <div className="mt-4 text-center">
            <p className="text-xs text-[#1b2a23]/50">
              💡 Zum Deaktivieren: <code className="px-2 py-1 rounded bg-[#1b2a23]/10 text-[#8268AB] font-mono">/src/config/dev.config.ts</code>
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}
