import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { Star, CheckCircle, Moon } from 'lucide-react';
import { Link } from 'react-router';

export default function Ausbildung() {
  const module = [
    { nr: '01', title: 'Grundlagen der Astrologie', desc: 'Planeten, Tierkreiszeichen, Häuser und ihre Bedeutungen.' },
    { nr: '02', title: 'Das Placidus-Häusersystem', desc: 'Das Herzstück der klassischen westlichen Astrologie.' },
    { nr: '03', title: 'Aspekte & Aspektmuster', desc: 'Wie Planeten miteinander kommunizieren.' },
    { nr: '04', title: 'Geburtshoroskop deuten', desc: 'Schritt für Schritt zur vollständigen Deutung.' },
    { nr: '05', title: 'Transiten & Progressionen', desc: 'Aktuelle kosmische Einflüsse verstehen und nutzen.' },
    { nr: '06', title: 'Professionelle Praxis', desc: 'Beratungsgespräche führen, Klienten gewinnen.' },
  ];

  return (
    <div className="min-h-screen bg-[#1B1040] pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A84C]/30 text-[#C9A84C] text-xs tracking-widest uppercase mb-6"
            style={{ fontFamily: 'Cinzel, serif' }}>
            <Moon className="w-3 h-3" /> 6-monatige Ausbildung
          </div>
          <h1 className="text-5xl text-[#F0E6C8] mb-4" style={{ fontFamily: 'Cinzel, serif' }}>Astrologie-Ausbildung</h1>
          <p className="text-[#F0E6C8]/50 max-w-2xl leading-relaxed mb-8">
            In 6 Monaten zum fundierten Astrologen. Robert Wagner begleitet dich durch alle Grundlagen und Techniken des Placidus-Systems.
          </p>
          <div className="flex gap-3">
            <Link to="/angebote/1">
              <Button variant="gold" size="lg" className="px-8">Jetzt anmelden – 3.600 €</Button>
            </Link>
            <Link to="/login?tab=register">
              <Button variant="outline" size="lg" className="border-white/15 text-[#F0E6C8]/60 hover:text-[#F0E6C8]">Kostenlos testen</Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {[
            { val: '6 Monate', label: 'Dauer' },
            { val: 'Live-Sessions', label: 'mit Robert' },
            { val: 'Zertifikat', label: 'nach Abschluss' },
            { val: '100%', label: 'Zufriedenheit' },
          ].map(h => (
            <GlassCard key={h.label} className="rounded-xl p-5 text-center border-white/8">
              <div className="text-lg font-bold text-[#C9A84C] mb-1">{h.val}</div>
              <div className="text-xs text-[#F0E6C8]/40">{h.label}</div>
            </GlassCard>
          ))}
        </div>

        {/* Module */}
        <h2 className="text-2xl text-[#F0E6C8] mb-6">Kurs-Module</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-14">
          {module.map((m, i) => (
            <motion.div key={m.nr} initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <GlassCard className="rounded-xl p-5 flex gap-4 border-white/8">
                <div className="text-2xl font-bold text-[#3D2A8A] shrink-0 w-10 leading-none pt-0.5">{m.nr}</div>
                <div>
                  <h3 className="text-[#F0E6C8] font-medium mb-1 text-sm">{m.title}</h3>
                  <p className="text-[#F0E6C8]/45 text-xs leading-relaxed">{m.desc}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Included */}
        <GlassCard className="rounded-xl p-7 mb-10 border-white/8">
          <h2 className="text-xl text-[#F0E6C8] mb-5">Was ist enthalten?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'Komplette Horoskop-Deutung von Grund auf',
              'Placidus-Häusersystem im Detail',
              'Planeten, Zeichen & Aspekte',
              'Live-Sessions mit Robert Wagner',
              'Zertifikat nach Abschluss',
              '6 Monate Begleitung & Support',
              'Zugang zur Community',
              'Lernmaterialien & Workbooks',
            ].map(item => (
              <div key={item} className="flex items-center gap-2.5 text-sm">
                <CheckCircle className="w-4 h-4 text-[#7B5FD4] shrink-0" />
                <span className="text-[#F0E6C8]/65">{item}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="text-center">
          <Star className="w-8 h-8 text-[#C9A84C] mx-auto mb-4" />
          <p className="text-[#F0E6C8]/50 mb-5">Finde den Weg zu Dir selbst. Die Sterne warten auf Dich.</p>
          <Link to="/angebote/1">
            <Button variant="gold" size="lg" className="px-10">Jetzt zur Ausbildung – 3.600 €</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
