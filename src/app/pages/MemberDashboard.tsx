import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import { Moon, Star, BookOpen, Users, Lock, LogOut, Sparkles } from 'lucide-react';
import { Link } from 'react-router';

export default function MemberDashboard() {
  const { user, logout } = useAuth();
  const name = user?.user_metadata?.full_name ?? user?.email?.split('@')[0] ?? 'Mitglied';

  const freeContent = [
    { title: 'Astrologie-Grundlagen – Teil 1', desc: 'Was sind Planetenzeichen?' },
    { title: 'Dein Aszendent', desc: 'Die Maske, die wir der Welt zeigen.' },
    { title: 'Die 12 Häuser im Überblick', desc: 'Welche Lebensbereiche regieren sie?' },
  ];

  const premiumContent = [
    { title: 'Placidus-Häusersystem', desc: 'Das Herzstück der westlichen Astrologie.' },
    { title: 'Aspekte & Aspektmuster', desc: 'Wie Planeten miteinander kommunizieren.' },
    { title: 'Live-Session: Horoskop-Deutung', desc: 'Monatlicher Call mit Robert.' },
    { title: 'Transiten verstehen', desc: 'Aktuelle kosmische Einflüsse nutzen.' },
  ];

  return (
    <div className="min-h-screen bg-[#1B1040]">

      {/* Profile Header – Kosmos */}
      <section className="bg-[#1B1040] pt-28 pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <GlassCard className="rounded-xl p-6 border-white/8">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#3D2A8A] border border-[#7B5FD4]/30 flex items-center justify-center text-[#F0E6C8] font-bold text-lg">
                    {name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-[#F0E6C8] font-semibold">Willkommen, {name}</div>
                    <div className="text-[#F0E6C8]/40 text-xs">{user?.email}</div>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-xs border border-[#7B5FD4]/30 text-[#7B5FD4]/80">Free Mitglied</span>
                  </div>
                </div>
                <button onClick={logout} className="flex items-center gap-2 text-xs text-[#F0E6C8]/35 hover:text-[#F0E6C8]/70 transition-colors">
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </button>
              </div>
            </GlassCard>
          </motion.div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { icon: BookOpen, val: '3', label: 'Kurse verfügbar' },
              { icon: Star, val: 'Free', label: 'Mitgliedschaft' },
              { icon: Users, val: 'Aktiv', label: 'Community' },
            ].map(c => (
              <GlassCard key={c.label} className="rounded-xl p-5 text-center border-white/8">
                <c.icon className="w-5 h-5 text-[#C9A84C] mx-auto mb-2" />
                <div className="text-[#F0E6C8] font-bold text-sm">{c.val}</div>
                <div className="text-[#F0E6C8]/35 text-xs">{c.label}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Free Content – Nebel */}
      <section className="bg-[#3D2A8A] py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-base text-[#F0E6C8] mb-5 flex items-center gap-2">
            <Moon className="w-4 h-4 text-[#C9A84C]" /> Kostenlose Inhalte
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {freeContent.map(c => (
              <GlassCard key={c.title} className="rounded-xl p-5 border-white/10 hover:border-[#C9A84C]/25 transition-colors">
                <div className="text-[#F0E6C8] text-sm font-medium mb-1">{c.title}</div>
                <p className="text-[#F0E6C8]/50 text-xs mb-4">{c.desc}</p>
                <Button variant="secondary" size="sm" className="w-full">Starten</Button>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Content – Kosmos */}
      <section className="bg-[#1B1040] py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-base text-[#F0E6C8] mb-5 flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#C9A84C]" /> Premium
            <span className="text-xs text-[#F0E6C8]/30 font-normal">(Mitgliedschaft erforderlich)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {premiumContent.map(c => (
              <GlassCard key={c.title} className="rounded-xl p-5 border-white/5 opacity-60">
                <div className="flex justify-between items-start">
                  <div className="text-[#F0E6C8] text-sm font-medium">{c.title}</div>
                  <Lock className="w-3.5 h-3.5 text-[#C9A84C]/50 shrink-0 ml-2" />
                </div>
                <p className="text-[#F0E6C8]/35 text-xs mt-1">{c.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Upgrade CTA – Gold */}
      <section className="bg-[#C9A84C] py-14 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Sparkles className="w-8 h-8 text-[#1B1040] mx-auto mb-4 opacity-70" />
          <h2 className="text-2xl font-bold text-[#1B1040] mb-3" style={{ fontFamily: 'Cinzel, serif' }}>
            Schalte alle Inhalte frei
          </h2>
          <p className="text-[#1B1040]/70 mb-7">Upgrade auf Mitglied und erhalte Zugang zu Live-Sessions, exklusiven Kursen & mehr.</p>
          <Link to="/community">
            <Button className="bg-[#1B1040] text-[#F0E6C8] hover:bg-[#2a1a50] border-none px-8 py-3 text-base font-semibold">
              Jetzt upgraden
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
