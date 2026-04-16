import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { Users, CheckCircle, Star } from 'lucide-react';
import { Link } from 'react-router';

export default function Community() {
  const plans = [
    {
      id: 'free', name: 'Free', price: 'Kostenlos', priceNote: 'für immer', highlighted: false, badge: null,
      features: ['Zugang zur Community', 'Monatlicher Newsletter', 'Gratis Astrologie-Basics', 'Austausch mit Gleichgesinnten'],
    },
    {
      id: 'monthly', name: 'Mitglied', price: '19 €', priceNote: 'pro Monat', highlighted: true, badge: 'Beliebt',
      features: ['Alles aus Free', 'Monatliche Live-Session mit Robert', 'Exklusive Lern-Inhalte', 'Fragen direkt an Robert', 'Kurs-Archiv', 'Rabatt auf Beratungen'],
    },
    {
      id: 'yearly', name: 'Jahres-Mitglied', price: '149 €', priceNote: 'pro Jahr · 2 Monate gratis', highlighted: false, badge: 'Bestes Angebot',
      features: ['Alles aus Mitglied', '1:1 Einzel-Call mit Robert', 'Priorität bei Live-Sessions', 'Workbooks & Materialien', 'Frühzugang zu Kursen'],
    },
  ];

  return (
    <div className="min-h-screen bg-[#1B1040] pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#7B5FD4]/30 text-[#7B5FD4] text-xs tracking-widest uppercase mb-6"
            style={{ fontFamily: 'Cinzel, serif' }}>
            <Users className="w-3 h-3" /> Community
          </div>
          <h1 className="text-5xl text-[#F0E6C8] mb-3" style={{ fontFamily: 'Cinzel, serif' }}>Mitgliedschaft</h1>
          <p className="text-[#F0E6C8]/50 max-w-xl">Lerne, wachse und verbinde dich mit Gleichgesinnten auf dem astrologischen Weg.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {plans.map((plan, i) => (
            <motion.div key={plan.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <GlassCard className={`rounded-xl p-7 h-full flex flex-col relative border-white/8 ${plan.highlighted ? 'border-[#7B5FD4]/50' : ''}`}>
                {plan.badge && (
                  <div className="absolute -top-3 left-6">
                    <span className={`px-3 py-1 rounded text-xs font-medium ${plan.highlighted ? 'bg-[#7B5FD4] text-[#F0E6C8]' : 'bg-[#C9A84C] text-[#1B1040]'}`}>
                      {plan.badge}
                    </span>
                  </div>
                )}
                <div className="pt-2 mb-6">
                  <h3 className="text-[#F0E6C8] font-semibold mb-1">{plan.name}</h3>
                  <div className="text-3xl font-bold text-[#C9A84C]">{plan.price}</div>
                  <div className="text-xs text-[#F0E6C8]/40 mt-0.5">{plan.priceNote}</div>
                </div>
                <ul className="space-y-2.5 mb-7 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle className="w-4 h-4 text-[#7B5FD4] mt-0.5 shrink-0" />
                      <span className="text-[#F0E6C8]/70">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/login?tab=register">
                  <Button variant={plan.highlighted ? 'gold' : 'outline'} className="w-full border-white/15 text-[#F0E6C8]/60 hover:text-[#F0E6C8]">
                    {plan.price === 'Kostenlos' ? 'Kostenlos starten' : 'Jetzt beitreten'}
                  </Button>
                </Link>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <GlassCard className="rounded-xl p-7 border-white/8">
          <h2 className="text-xl text-[#F0E6C8] mb-5">Was dich in der Community erwartet</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'Regelmäßige Live-Sessions mit Robert Wagner',
              'Tiefgehende Astrologie-Lernmodule',
              'Direkter Austausch in der Community',
              'Monatliche Horoskop-Gruppenanalysen',
              'Exklusive Workbooks & Lernmaterialien',
              'Rabatte auf persönliche Beratungen',
            ].map(item => (
              <div key={item} className="flex items-center gap-3 text-sm">
                <Star className="w-3.5 h-3.5 fill-[#C9A84C] text-[#C9A84C] shrink-0" />
                <span className="text-[#F0E6C8]/60">{item}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
