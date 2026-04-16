import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { Star, Play, CheckCircle, Moon } from 'lucide-react';
import { Link } from 'react-router';

export default function Ausbildung() {
  const module = [
    { nr: '01', title: 'Grundlagen der Astrologie', desc: 'Planeten, Tierkreiszeichen, Häuser und ihre Bedeutungen. Das Fundament für jede Deutung.' },
    { nr: '02', title: 'Das Placidus-Häusersystem', desc: 'Das Herzstück der klassischen westlichen Astrologie – detailliert erklärt und angewendet.' },
    { nr: '03', title: 'Aspekte & Aspektmuster', desc: 'Konjunktionen, Quadrate, Trigone & Co. – wie Planeten miteinander kommunizieren.' },
    { nr: '04', title: 'Geburtshoroskop deuten', desc: 'Schritt für Schritt zur vollständigen und kohärenten Horoskop-Deutung.' },
    { nr: '05', title: 'Transiten & Progressionen', desc: 'Aktuelle kosmische Einflüsse verstehen und für dich nutzen.' },
    { nr: '06', title: 'Professionelle Praxis', desc: 'Beratungsgespräche führen, eigene Nische finden, Klienten gewinnen.' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1], rotate: [0, 180, 360] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-[#5C3D8F]/15 to-transparent blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#5C3D8F]/20 to-[#C9A84C]/20 mb-6">
            <Moon className="w-4 h-4 mr-2 text-[#5C3D8F]" />
            <span className="text-sm text-[#5C3D8F] font-medium">6-monatige Ausbildung · Placidus-System</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#1a0d2e] via-[#5C3D8F] to-[#C9A84C] bg-clip-text text-transparent">
              Astrologie-Ausbildung
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            In 6 Monaten zum fundierten Astrologen. Robert Wagner begleitet dich Schritt für Schritt durch alle Grundlagen und Techniken – vom absoluten Anfänger bis zur professionellen Deutung.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/angebote/1">
              <Button size="lg" className="bg-[#5C3D8F] hover:bg-[#5C3D8F]/90 text-white px-8 rounded-2xl">
                Jetzt anmelden – 3.600 €
              </Button>
            </Link>
            <Link to="/login?tab=register">
              <Button size="lg" variant="outline" className="border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C]/10 px-8 rounded-2xl">
                Kostenlos testen
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { val: '6 Monate', label: 'Ausbildungsdauer' },
            { val: 'Live-Sessions', label: 'mit Robert Wagner' },
            { val: 'Zertifikat', label: 'nach Abschluss' },
            { val: '100%', label: 'Zufriedenheitsrate' },
          ].map(h => (
            <GlassCard key={h.label} className="rounded-2xl p-6 text-center">
              <div className="text-2xl font-bold text-[#5C3D8F] mb-1">{h.val}</div>
              <div className="text-sm text-muted-foreground">{h.label}</div>
            </GlassCard>
          ))}
        </div>

        {/* Module */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">
            <span className="bg-gradient-to-r from-[#5C3D8F] to-[#C9A84C] bg-clip-text text-transparent">Kurs-Module</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {module.map((m, i) => (
              <motion.div key={m.nr} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <GlassCard className="rounded-2xl p-6 flex gap-4">
                  <div className="text-3xl font-bold text-[#5C3D8F]/20 shrink-0 w-12">{m.nr}</div>
                  <div>
                    <h3 className="font-semibold mb-1">{m.title}</h3>
                    <p className="text-muted-foreground text-sm">{m.desc}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Included */}
        <GlassCard className="rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6">Was ist enthalten?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Komplette Horoskop-Deutung von Grund auf',
              'Placidus-Häusersystem im Detail',
              'Planeten, Zeichen & Aspekte verstehen',
              'Live-Sessions mit Robert Wagner',
              'Zertifikat nach Abschluss',
              '6 Monate Begleitung & Support',
              'Zugang zur Community',
              'Lernmaterialien & Workbooks',
            ].map(item => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-[#5C3D8F] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* CTA */}
        <div className="text-center">
          <GlassCard className="rounded-3xl p-10">
            <Star className="w-10 h-10 text-[#C9A84C] mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-3">
              <span className="bg-gradient-to-r from-[#5C3D8F] to-[#C9A84C] bg-clip-text text-transparent">
                Starte deine Reise
              </span>
            </h2>
            <p className="text-muted-foreground mb-6">Finde den Weg zu Dir selbst. Die Sterne warten auf Dich.</p>
            <Link to="/angebote/1">
              <Button size="lg" className="bg-[#5C3D8F] hover:bg-[#5C3D8F]/90 text-white px-10 rounded-2xl">
                Jetzt zur Ausbildung – 3.600 €
              </Button>
            </Link>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
