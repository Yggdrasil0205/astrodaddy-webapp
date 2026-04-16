import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { Users, CheckCircle, Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router';

export default function Community() {
  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 'Kostenlos',
      priceNote: 'für immer',
      features: [
        'Zugang zur Community',
        'Monatlicher Newsletter',
        'Gratis Astrologie-Basics',
        'Austausch mit Gleichgesinnten',
      ],
      highlighted: false,
      badge: null,
    },
    {
      id: 'monthly',
      name: 'Mitglied',
      price: '19 €',
      priceNote: 'pro Monat',
      features: [
        'Alles aus Free',
        'Monatliche Live-Session mit Robert',
        'Exklusive Lern-Inhalte',
        'Fragen direkt an Robert stellen',
        'Zugang zu Kurs-Archiv',
        'Rabatt auf Beratungen',
      ],
      highlighted: true,
      badge: 'Beliebt',
    },
    {
      id: 'yearly',
      name: 'Jahres-Mitglied',
      price: '149 €',
      priceNote: 'pro Jahr · 2 Monate gratis',
      features: [
        'Alles aus Mitglied',
        '1:1 Einzel-Call mit Robert',
        'Priorität bei Live-Sessions',
        'Workbooks & Materialien',
        'Frühzugang zu neuen Kursen',
      ],
      highlighted: false,
      badge: 'Bestes Angebot',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute top-20 right-10 w-96 h-96 rounded-full bg-gradient-to-br from-[#5C3D8F]/20 to-transparent blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#5C3D8F]/10 mb-6">
            <Users className="w-4 h-4 mr-2 text-[#5C3D8F]" />
            <span className="text-sm text-[#5C3D8F] font-medium">Werde Teil der Gemeinschaft</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#1a0d2e] via-[#5C3D8F] to-[#C9A84C] bg-clip-text text-transparent">
              Community & Mitgliedschaft
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Lerne, wachse und verbinde dich mit Gleichgesinnten auf dem astrologischen Weg.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan, i) => (
            <motion.div key={plan.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <GlassCard className={`rounded-2xl p-8 h-full flex flex-col relative ${plan.highlighted ? 'ring-2 ring-[#5C3D8F] shadow-xl' : ''}`}>
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className={`px-4 py-1 rounded-full text-sm font-semibold ${plan.highlighted ? 'bg-[#5C3D8F] text-white' : 'bg-[#C9A84C] text-white'}`}>
                      {plan.badge}
                    </span>
                  </div>
                )}
                <div className="mb-6 pt-2">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-[#5C3D8F]">{plan.price}</div>
                  <div className="text-sm text-muted-foreground">{plan.priceNote}</div>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <CheckCircle className="w-4 h-4 text-[#5C3D8F] mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/login?tab=register">
                  <Button className={`w-full rounded-xl ${plan.highlighted ? 'bg-[#5C3D8F] hover:bg-[#5C3D8F]/90 text-white' : 'bg-white/80 text-[#5C3D8F] border border-[#5C3D8F]/30 hover:bg-[#5C3D8F]/10'}`}>
                    {plan.price === 'Kostenlos' ? 'Kostenlos starten' : 'Jetzt beitreten'}
                  </Button>
                </Link>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* What's inside */}
        <GlassCard className="rounded-2xl p-8">
          <div className="text-center mb-8">
            <Sparkles className="w-10 h-10 text-[#C9A84C] mx-auto mb-4" />
            <h2 className="text-2xl font-bold">Was dich in der Community erwartet</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Regelmäßige Live-Sessions mit Robert Wagner',
              'Tiefgehende Astrologie-Lernmodule',
              'Direkter Austausch in der Community',
              'Monatliche Horoskop-Gruppenanalysen',
              'Exklusive Workbooks & Lernmaterialien',
              'Rabatte auf persönliche Beratungen',
            ].map(item => (
              <div key={item} className="flex items-center gap-3">
                <Star className="w-4 h-4 fill-[#C9A84C] text-[#C9A84C] shrink-0" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
