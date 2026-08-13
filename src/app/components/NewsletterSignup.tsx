import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Sparkles, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';

interface Props {
  headline?: string;
  subline?: string;
  badge?: string;
  bg?: 'kosmos' | 'nebel';
}

export function NewsletterSignup({
  headline = 'Kosmische Einblicke, direkt in dein Postfach.',
  subline = 'Mondphasen, Astro-Impulse und Exklusiv-Angebote – kostenlos, abbestellbar jederzeit.',
  badge = 'Newsletter',
  bg = 'kosmos',
}: Props) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const bgClass = bg === 'nebel' ? 'bg-[#3D2A8A]' : 'bg-[#1B1040]';
  const cardBorder = bg === 'nebel' ? 'border-white/15' : 'border-[#7B5FD4]/20';

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Bitte gib eine gültige E-Mail-Adresse ein.');
      return;
    }
    setState('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setState('success');
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error ?? 'Ein Fehler ist aufgetreten. Bitte versuch es nochmal.');
        setState('error');
      }
    } catch {
      setErrorMsg('Verbindungsfehler. Bitte versuch es nochmal.');
      setState('error');
    }
  };

  return (
    <section className={`py-20 px-6 ${bgClass}`}>
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Card */}
          <div className={`relative rounded-2xl border ${cardBorder} overflow-hidden`}
            style={{ background: 'rgba(255,255,255,0.03)' }}>

            {/* Ambient glow */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: '#C9A84C', opacity: 0.06, filter: 'blur(60px)' }} />

            <div className="relative z-10 px-8 py-10 text-center">

              {/* Icon + Badge */}
              <div className="flex items-center justify-center gap-2 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/12 border border-[#C9A84C]/25 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#C9A84C]" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#C9A84C]/30 text-[#C9A84C]/80 text-xs tracking-widest uppercase"
                  style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>
                  <Sparkles className="w-3 h-3" /> {badge}
                </span>
              </div>

              {/* Headline */}
              <h2 className="text-3xl text-[#F0E6C8] mb-3 leading-tight"
                style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>
                {headline}
              </h2>
              <p className="text-[#F0E6C8]/45 text-sm leading-relaxed mb-8 max-w-md mx-auto">
                {subline}
              </p>

              {/* Form / Success */}
              <AnimatePresence mode="wait">
                {state === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-emerald-400" />
                    </div>
                    <p className="text-[#F0E6C8] font-medium">Du bist dabei! ✨</p>
                    <p className="text-[#F0E6C8]/45 text-sm">Schau in deinen Posteingang – eine Bestätigungsmail ist unterwegs.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={submit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setErrorMsg(''); setState('idle'); }}
                      placeholder="deine@email.de"
                      className="flex-1 px-4 py-3 rounded-xl bg-white/6 border border-white/12 text-[#F0E6C8] text-sm placeholder:text-[#F0E6C8]/30 focus:outline-none focus:border-[#C9A84C]/50 transition-all"
                    />
                    <button
                      type="submit"
                      disabled={state === 'loading'}
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#C9A84C] text-[#1B1040] text-sm font-semibold hover:bg-[#C9A84C]/90 transition-colors disabled:opacity-60 whitespace-nowrap"
                    >
                      {state === 'loading'
                        ? <Loader2 className="w-4 h-4 animate-spin" />
                        : <><span>Anmelden</span><ArrowRight className="w-4 h-4" /></>
                      }
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              {errorMsg && (
                <p className="text-red-400/80 text-xs mt-3">{errorMsg}</p>
              )}

              {/* DSGVO note */}
              {state !== 'success' && (
                <p className="text-[#F0E6C8]/20 text-[11px] mt-4">
                  Kein Spam · Jederzeit abbestellbar · Datenschutz gemäß DSGVO
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
