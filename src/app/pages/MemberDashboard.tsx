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
    { title: 'Astrologie-Grundlagen – Teil 1', desc: 'Was sind Planetenzeichen? Eine Einführung.', available: true },
    { title: 'Dein Aszendent – was er bedeutet', desc: 'Die Maske, die wir der Welt zeigen.', available: true },
    { title: 'Die 12 Häuser im Überblick', desc: 'Welche Lebensbereiche regieren die Häuser?', available: true },
  ];

  const premiumContent = [
    { title: 'Placidus-Häusersystem im Detail', desc: 'Das Herzstück der westlichen Astrologie.', available: false },
    { title: 'Aspekte & Aspektmuster', desc: 'Wie Planeten miteinander kommunizieren.', available: false },
    { title: 'Live-Session: Horoskop-Deutung', desc: 'Monats-Call mit Robert Wagner.', available: false },
    { title: 'Transiten verstehen', desc: 'Aktuelle kosmische Einflüsse nutzen.', available: false },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <GlassCard className="rounded-2xl p-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#5C3D8F] to-[#C9A84C] flex items-center justify-center text-white text-2xl font-bold">
                  {name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Willkommen, {name}!</h1>
                  <p className="text-muted-foreground text-sm">{user?.email}</p>
                  <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-[#5C3D8F]/10 text-[#5C3D8F] text-xs font-medium">Free Mitglied</span>
                </div>
              </div>
              <Button variant="ghost" onClick={logout} className="text-muted-foreground hover:text-foreground">
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </Button>
            </div>
          </GlassCard>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {[
            { icon: BookOpen, title: '3', label: 'Kurse verfügbar', color: 'text-[#5C3D8F]' },
            { icon: Star, title: 'Free', label: 'Mitgliedschaft', color: 'text-[#C9A84C]' },
            { icon: Users, title: 'Community', label: 'Zugang aktiv', color: 'text-[#8B6EC5]' },
          ].map(card => (
            <GlassCard key={card.label} className="rounded-2xl p-6 text-center">
              <card.icon className={`w-8 h-8 mx-auto mb-3 ${card.color}`} />
              <div className="text-2xl font-bold">{card.title}</div>
              <div className="text-sm text-muted-foreground">{card.label}</div>
            </GlassCard>
          ))}
        </div>

        {/* Free Content */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Moon className="w-5 h-5 text-[#5C3D8F]" /> Deine kostenlosen Inhalte
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {freeContent.map(c => (
              <GlassCard key={c.title} className="rounded-2xl p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <h3 className="font-semibold mb-2 text-sm">{c.title}</h3>
                <p className="text-muted-foreground text-xs mb-4">{c.desc}</p>
                <Button size="sm" className="w-full bg-[#5C3D8F] hover:bg-[#5C3D8F]/90 text-white rounded-xl text-xs">
                  Starten
                </Button>
              </GlassCard>
            ))}
          </div>
        </motion.div>

        {/* Premium Content (locked) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#C9A84C]" /> Premium-Inhalte
            <span className="text-sm font-normal text-muted-foreground">(Mitgliedschaft erforderlich)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {premiumContent.map(c => (
              <GlassCard key={c.title} className="rounded-2xl p-6 opacity-75">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-sm">{c.title}</h3>
                  <Lock className="w-4 h-4 text-[#C9A84C] shrink-0 ml-2" />
                </div>
                <p className="text-muted-foreground text-xs">{c.desc}</p>
              </GlassCard>
            ))}
          </div>
          <div className="mt-6 text-center">
            <GlassCard className="rounded-2xl p-6 inline-block">
              <Sparkles className="w-8 h-8 text-[#C9A84C] mx-auto mb-3" />
              <p className="text-sm mb-4">Upgrade auf Mitglied und schalte alle Inhalte frei</p>
              <Link to="/community">
                <Button className="bg-[#5C3D8F] hover:bg-[#5C3D8F]/90 text-white rounded-xl">
                  Jetzt upgraden
                </Button>
              </Link>
            </GlassCard>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
