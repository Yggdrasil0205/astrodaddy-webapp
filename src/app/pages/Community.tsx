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
    <div className="min-h-screen bg-[#1B1040]">

      {/* Hero – Kosmos */}
      <section className="bg-[#1B1040] pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#7B5FD4]/30 text-[#7B5FD4] text-xs tracking-widest uppercase mb-6"
              style={{ fontFamily: 'Cinzel, serif' }}>
              <Users className="w-3 h-3" /> Community
            </div>
            <h1 className="text-5xl text-[#F0E6C8] mb-3" style={{ fontFamily: 'Cinzel, serif' }}>Mitgliedschaft</h1>
            <p className="text-[#F0E6C8]/50 max-w-xl">Lerne, wachse und verbinde dich mit Gleichgesinnten auf dem astrologischen Weg.</p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards – Nebel */}
      <section className="bg-[#3D2A8A] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {plans.map((plan, i) => (
              <motion.div key={plan.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <GlassCard className={`rounded-xl p-7 h-full flex flex-col relative border-white/10 ${plan.highlighted ? 'border-[#C9A84C]/40' : ''}`}>
                  {plan.badge && (
                    <div className="absolute -top-3 left-6">
                      <span className={`px-3 py-1 rounded text-xs font-medium ${plan.highlighted ? 'bg-[#C9A84C] text-[#1B1040]' : 'bg-[#7B5FD4] text-[#F0E6C8]'}`}>
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
                        <CheckCircle className="w-4 h-4 text-[#C9A84C] mt-0.5 shrink-0" />
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
        </div>
      </section>

      {/* Features – Kosmos */}
      <section className="bg-[#1B1040] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl text-[#F0E6C8] mb-8 text-center" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Was dich in der Community erwartet
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Regelmäßige Live-Sessions mit Robert Wagner',
              'Tiefgehende Astrologie-Lernmodule',
              'Direkter Austausch in der Community',
              'Monatliche Horoskop-Gruppenanalysen',
              'Exklusive Workbooks & Lernmaterialien',
              'Rabatte auf persönliche Beratungen',
            ].map(item => (
              <GlassCard key={item} className="rounded-xl p-4 border-white/8 flex items-center gap-3">
                <Star className="w-4 h-4 fill-[#C9A84C] text-[#C9A84C] shrink-0" />
                <span className="text-[#F0E6C8]/70 text-sm">{item}</span>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA – Gold */}
      <section className="bg-[#C9A84C] py-14 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Users className="w-8 h-8 text-[#1B1040] mx-auto mb-4 opacity-60" />
          <h2 className="text-2xl font-bold text-[#1B1040] mb-3" style={{ fontFamily: 'Cinzel, serif' }}>
            Werde Teil der AstroDaddy-Community
          </h2>
          <p className="text-[#1B1040]/70 mb-7">Kostenlos starten – jederzeit upgraden.</p>
          <Link to="/login?tab=register">
            <Button className="bg-[#1B1040] text-[#F0E6C8] hover:bg-[#2a1a50] border-none px-8 py-3 text-base font-semibold">
              Jetzt kostenlos registrieren
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
