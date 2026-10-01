import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import type { EmailOtpType } from '@supabase/supabase-js';
import { GlassCard } from '../components/GlassCard';
import { supabase } from '../../lib/supabase';
import { AlertTriangle } from 'lucide-react';

// Target of the links in our account e-mails (see api/account.ts):
//   /auth/confirm?token_hash=…&type=signup|magiclink|recovery
// Redeems the one-time token, which opens a session, then forwards the
// customer: recovery → set a new password, otherwise → their account.
const ALLOWED: EmailOtpType[] = ['signup', 'magiclink', 'recovery', 'email'];

export default function AuthConfirm() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return; // StrictMode runs effects twice; a token is single-use
    ran.current = true;

    const tokenHash = params.get('token_hash') ?? '';
    const type = params.get('type') as EmailOtpType;
    if (!tokenHash || !ALLOWED.includes(type)) {
      setError('Dieser Link ist unvollständig.');
      return;
    }
    supabase.auth.verifyOtp({ token_hash: tokenHash, type }).then(({ error: err }) => {
      if (err) {
        setError('Dieser Link ist ungültig oder abgelaufen.');
        return;
      }
      navigate(type === 'recovery' ? '/reset-password' : '/mitglieder', { replace: true });
    });
  }, [params, navigate]);

  const isRecovery = params.get('type') === 'recovery';

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <GlassCard className="rounded-3xl p-8 md:p-10 text-center">
          {error ? (
            <>
              <AlertTriangle className="w-10 h-10 text-[#C9A84C] mx-auto mb-3" />
              <p className="text-[#F0E6C8]/70 text-sm mb-5">{error}</p>
              <Link to={isRecovery ? '/forgot-password' : '/login?tab=register'} className="text-[#C9A84C] text-sm hover:underline">
                {isRecovery ? 'Neuen Link anfordern' : 'Erneut registrieren'}
              </Link>
            </>
          ) : (
            <>
              <div className="w-8 h-8 border-2 border-[#7B5FD4] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#F0E6C8]/60 text-sm">Einen Moment, dein Link wird geprüft …</p>
            </>
          )}
        </GlassCard>
      </motion.div>
    </div>
  );
}
