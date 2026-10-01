import React from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { GlassCard } from '../components/GlassCard';

// Shown for unknown URLs and as the router's error page (instead of React
// Router's developer error screen).
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24 pb-16">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <GlassCard className="rounded-3xl p-8 md:p-10 text-center">
          <div className="text-[#C9A84C] text-5xl mb-4">✦</div>
          <h1 className="text-2xl text-[#F0E6C8] mb-3" style={{ fontFamily: '"rl-limo-1","rl-limo-2",sans-serif', fontWeight: 400 }}>
            Diese Seite gibt es nicht
          </h1>
          <p className="text-[#F0E6C8]/60 text-sm mb-6">
            Vielleicht hat sich ein Tippfehler eingeschlichen oder der Link ist veraltet.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/" className="px-5 py-2.5 rounded-xl bg-[#C9A84C] text-[#1B1040] text-sm font-semibold hover:bg-[#C9A84C]/90 transition-colors">
              Zur Startseite
            </Link>
            <Link to="/angebote" className="px-5 py-2.5 rounded-xl border border-white/15 text-[#F0E6C8]/80 text-sm hover:border-white/30 transition-colors">
              Zu den Angeboten
            </Link>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
