import React from 'react';
import { Link, useSearchParams } from 'react-router';
import { motion } from 'motion/react';
import { CheckCircle, Mail, ArrowRight, Star, Users, MousePointerClick } from 'lucide-react';
import { StarField } from '../components/StarField';

export default function CheckoutSuccess() {
  const [params] = useSearchParams();
  const isSkool = params.get('type') === 'skool';

  return (
    <div className="min-h-screen bg-[#1B1040] flex items-center justify-center px-6 py-24">
      <StarField noConnect />

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center max-w-md w-full"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 180 }}
          className="w-24 h-24 rounded-full bg-[#C9A84C]/12 border border-[#C9A84C]/30 flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle className="w-12 h-12 text-[#C9A84C]" />
        </motion.div>

        {/* Stars */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="flex justify-center gap-1 mb-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-[#C9A84C] text-[#C9A84C]" />
          ))}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-3xl text-[#F0E6C8] mb-3"
          style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}
        >
          Zahlung erfolgreich!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="text-[#F0E6C8]/55 mb-8 leading-relaxed"
        >
          {isSkool
            ? 'Willkommen in der Astroversity Academy! Nur noch ein letzter Schritt, dann bist du drin.'
            : 'Vielen Dank für deine Bestellung. Du erhältst in Kürze eine Bestätigung und deine Rechnung per E-Mail.'}
        </motion.p>

        {isSkool ? (
          /* ── Skool join instructions ── */
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="bg-white/4 border border-white/8 rounded-2xl p-6 mb-8 text-left"
          >
            <div className="flex items-center gap-2 mb-5">
              <Users className="w-4 h-4 text-[#C9A84C]" />
              <p className="text-[#F0E6C8] text-sm font-semibold">So trittst du der Academy bei</p>
            </div>

            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 text-[#C9A84C] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                <div>
                  <p className="text-[#F0E6C8]/80 text-sm leading-relaxed">
                    Öffne dein E-Mail-Postfach. Du hast eine Mail erhalten mit dem Betreff:
                  </p>
                  <p className="text-[#F0E6C8] text-sm font-medium mt-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                    „Robert Wagner invited you to join Astroversity Academy"
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 text-[#C9A84C] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                <p className="text-[#F0E6C8]/80 text-sm leading-relaxed pt-0.5">
                  Klicke in der Mail auf den gelben Button{' '}
                  <span className="inline-flex items-center gap-1 font-semibold text-[#C9A84C]">
                    <MousePointerClick className="w-3.5 h-3.5" /> JOIN NOW
                  </span>{' '}
                  – und du bist sofort drin.
                </p>
              </li>
            </ol>

            <div className="mt-5 pt-4 border-t border-white/8 flex items-start gap-2.5">
              <Mail className="w-3.5 h-3.5 text-[#F0E6C8]/40 shrink-0 mt-0.5" />
              <p className="text-[#F0E6C8]/45 text-xs leading-relaxed">
                Keine Mail erhalten? Schau bitte in deinen Spam-Ordner. Die Einladung kann ein paar Minuten dauern.
              </p>
            </div>
          </motion.div>
        ) : (
          /* ── Standard order hint ── */
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="bg-white/4 border border-white/8 rounded-2xl p-5 mb-8 flex items-start gap-4 text-left"
          >
            <div className="w-9 h-9 rounded-lg bg-[#C9A84C]/12 border border-[#C9A84C]/20 flex items-center justify-center shrink-0 mt-0.5">
              <Mail className="w-4 h-4 text-[#C9A84C]" />
            </div>
            <div>
              <p className="text-[#F0E6C8] text-sm font-medium mb-1">E-Mail unterwegs</p>
              <p className="text-[#F0E6C8]/45 text-xs leading-relaxed">
                Deine Rechnung und alle weiteren Informationen werden dir per E-Mail zugeschickt. Bitte schau auch in deinen Spam-Ordner.
              </p>
            </div>
          </motion.div>
        )}

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link to="/">
            <button className="px-8 py-3 rounded-xl bg-[#C9A84C] text-[#1B1040] font-semibold text-sm hover:bg-[#C9A84C]/90 transition-colors flex items-center gap-2">
              Zur Startseite <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <Link to="/angebote">
            <button className="px-8 py-3 rounded-xl bg-white/5 border border-white/12 text-[#F0E6C8]/70 font-semibold text-sm hover:text-[#F0E6C8] hover:border-white/25 transition-colors">
              Weitere Angebote
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
