import React from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';
import {
  Star, ArrowRight, CheckCircle, Sparkles, BookOpen,
} from 'lucide-react';

// ── SVG wave divider (inline, same as Home) ──────────────────────────
function WaveDivider({ fromColor, toColor, flip = false }: { fromColor: string; toColor: string; flip?: boolean }) {
  return (
    <div className="relative h-12 overflow-hidden" style={{ background: fromColor, transform: flip ? 'scaleY(-1)' : undefined }}>
      <svg viewBox="0 0 1440 48" className="absolute bottom-0 w-full" preserveAspectRatio="none" style={{ display: 'block' }}>
        <path d="M0,24 C240,48 480,0 720,24 C960,48 1200,0 1440,24 L1440,48 L0,48 Z" fill={toColor} />
      </svg>
    </div>
  );
}

// ── Pricing card tilt wrapper ─────────────────────────────────────────
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * -7;
    const ry = ((e.clientX - r.left - r.width  / 2) / (r.width  / 2)) *  7;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.025)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)'; };
  return (
    <div ref={ref} className={`transition-transform duration-200 ease-out ${className}`} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────
const pricing = [
  {
    title: 'Kurzberatung',
    duration: '10 Minuten',
    price: '55 €',
    highlight: false,
    features: ['Eine konkrete Frage', 'Astrologische Antwort', 'Schnelle Terminvergabe', 'Ideal als Einstieg'],
  },
  {
    title: 'Geburtshoroskop-Deutung',
    duration: '45 Minuten',
    price: '199 €',
    highlight: true,
    features: ['Komplette Horoskop-Analyse', 'Stärken & Herausforderungen', 'Aktuelle Transiten', 'Aufzeichnung inklusive'],
  },
  {
    title: 'Premium-Beratung',
    duration: '90 Minuten',
    price: '349 €',
    highlight: false,
    features: ['Geburtshoroskop + Transiten', 'Solar-Return optional', 'Progressionen auf Wunsch', 'Nachbetreuung per E-Mail'],
  },
];

const workbooks = [
  {
    title: 'Grundlagen der Astrologie',
    desc: 'Planeten, Zeichen und Häuser verständlich erklärt. Dein Einstieg in die Astrologie.',
  },
  {
    title: 'Horoskop selbst deuten',
    desc: 'Schritt-für-Schritt-Anleitung zur Horoskop-Deutung im Placidus-System.',
  },
  {
    title: 'Transiten & Prognosen',
    desc: 'Lerne, aktuelle Planetenbewegungen zu deuten und Lebenszyklen zu verstehen.',
  },
];

const tarotFeatures = [
  '45 Minuten Tarot-Legung',
  'Für alle Lebensbereiche',
  'Ehrliche & einfühlsame Deutung',
  'Handlungsempfehlungen',
  'Aufzeichnung auf Wunsch',
];

export default function ReadingsWorkbooks() {
  return (
    <div className="min-h-screen bg-[#1B1040]">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#1B1040] pt-20">
        {/* Animated nebula background */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <motion.div
            className="absolute inset-0"
            animate={{ background: [
              'radial-gradient(ellipse 110% 70% at 25% 55%, rgba(61,42,138,0.55) 0%, transparent 60%)',
              'radial-gradient(ellipse 130% 90% at 45% 35%, rgba(77,42,154,0.50) 0%, transparent 58%)',
              'radial-gradient(ellipse 100% 75% at 15% 65%, rgba(93,50,170,0.52) 0%, transparent 62%)',
              'radial-gradient(ellipse 110% 70% at 25% 55%, rgba(61,42,138,0.55) 0%, transparent 60%)',
            ]}}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute inset-0"
            animate={{ background: [
              'radial-gradient(ellipse 80% 60% at 72% 58%, rgba(123,95,212,0.30) 0%, transparent 52%)',
              'radial-gradient(ellipse 95% 75% at 82% 38%, rgba(107,47,196,0.28) 0%, transparent 50%)',
              'radial-gradient(ellipse 85% 65% at 65% 68%, rgba(139,79,228,0.32) 0%, transparent 54%)',
              'radial-gradient(ellipse 80% 60% at 72% 58%, rgba(123,95,212,0.30) 0%, transparent 52%)',
            ]}}
            transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 7 }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{ width: 480, height: 480, left: '58%', top: '10%', background: '#C9A84C', filter: 'blur(140px)' }}
            animate={{ opacity: [0.06, 0.13, 0.05, 0.06], scale: [1, 1.25, 0.85, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{ width: 520, height: 380, left: '-5%', top: '45%', background: '#1a0a4a', filter: 'blur(100px)' }}
            animate={{ opacity: [0.7, 0.5, 0.8, 0.7], x: [0, 30, -10, 0], y: [0, -20, 15, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9A84C]/30 text-[#C9A84C] text-xs tracking-widest uppercase mb-8"
            style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}
          >
            <Star className="w-3 h-3 fill-current" /> Astrologische Angebote
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}
            className="text-[clamp(2.6rem,5vw,5.5rem)] leading-[1.1] text-[#F0E6C8] mb-4"
            style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}
          >
            Readings &amp; Workbooks
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg text-[#F0E6C8]/55 max-w-xl mx-auto mb-10"
          >
            Klare Antworten aus den Sternen und den Karten – präzise, einfühlsam, transformativ.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link to="/angebote">
              <Button variant="gold" size="lg" className="px-9">
                Beratung buchen <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <button
              onClick={() => document.getElementById('readings-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-9 py-3 rounded-lg border border-white/15 text-[#F0E6C8]/60 hover:text-[#F0E6C8] hover:border-white/30 transition-all text-sm font-medium"
            >
              Mehr erfahren
            </button>
          </motion.div>
        </div>
      </section>

      <WaveDivider fromColor="#1B1040" toColor="#1B1040" />

      {/* ── SECTION 2 — ASTROLOGISCHE READINGS ───────────────────── */}
      <section id="readings-section" className="py-24 px-6 bg-[#1B1040]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A84C]/40 text-[#C9A84C] text-xs tracking-widest uppercase mb-6"
              style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}
            >
              Readings
            </div>
            <h2 className="text-4xl text-[#F0E6C8] mb-3" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>
              Persönliche Horoskop-Beratung
            </h2>
            <p className="text-[#F0E6C8]/55 max-w-xl mx-auto">
              Von der kurzen Antwort bis zur tiefen Lebensanalyse – wähle das Format, das zu dir passt.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {pricing.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <TiltCard>
                  <div className={`rounded-xl p-7 h-full flex flex-col relative border ${p.highlight ? 'bg-[#C9A84C] border-[#C9A84C]' : 'bg-white/8 border-white/15'}`}>
                    {p.highlight && (
                      <div className="absolute -top-3 left-5">
                        <span className="px-3 py-1 rounded bg-[#1B1040] text-[#C9A84C] text-xs font-semibold">Empfohlen</span>
                      </div>
                    )}
                    <div
                      className={`pt-2 mb-1 text-xs tracking-widest uppercase ${p.highlight ? 'text-[#1B1040]/60' : 'text-[#F0E6C8]/40'}`}
                      style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}
                    >
                      {p.duration}
                    </div>
                    <h3 className={`text-xl font-semibold mb-2 ${p.highlight ? 'text-[#1B1040]' : 'text-[#F0E6C8]'}`}>
                      {p.title}
                    </h3>
                    <div className={`text-3xl font-bold mb-6 ${p.highlight ? 'text-[#1B1040]' : 'text-[#C9A84C]'}`}>
                      {p.price}
                    </div>
                    <ul className="space-y-2.5 mb-7 flex-1">
                      {p.features.map(f => (
                        <li key={f} className="flex items-center gap-2.5 text-sm">
                          <CheckCircle className={`w-3.5 h-3.5 shrink-0 ${p.highlight ? 'text-[#1B1040]' : 'text-[#7B5FD4]'}`} />
                          <span className={p.highlight ? 'text-[#1B1040]/75' : 'text-[#F0E6C8]/60'}>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <a href="https://www.astrodaddy.de" target="_blank" rel="noopener noreferrer">
                      <button
                        className={`w-full py-2.5 rounded-lg text-sm font-medium border transition-all ${p.highlight ? 'bg-[#1B1040] text-[#C9A84C] border-[#1B1040] hover:bg-[#2a1d6b]' : 'bg-transparent text-[#F0E6C8]/70 border-white/20 hover:text-[#F0E6C8] hover:border-white/40'}`}
                      >
                        Jetzt buchen
                      </button>
                    </a>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mt-10"
          >
            <a href="https://www.astrodaddy.de" target="_blank" rel="noopener noreferrer">
              <Button variant="gold" size="lg" className="px-9">
                Jetzt buchen <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      <WaveDivider fromColor="#1B1040" toColor="#3D2A8A" />

      {/* ── SECTION 3 — TAROT ─────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#3D2A8A]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          >
            <div className="relative rounded-xl overflow-hidden border border-white/15 h-[420px]">
              <img
                src="https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800&q=80"
                alt="Tarot Legung"
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="bg-[#1B1040]/85 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="text-[#C9A84C] text-xs tracking-widest uppercase mb-1" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>Tarot-Legung</div>
                  <div className="text-[#F0E6C8] font-semibold text-sm">45 Minuten · Ehrlich & einfühlsam</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/25 text-[#F0E6C8]/70 text-xs tracking-widest uppercase mb-6"
              style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}
            >
              <Sparkles className="w-3 h-3" /> Tarot
            </div>
            <h2 className="text-4xl text-[#F0E6C8] mb-5" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>
              Tarot-Legungen
            </h2>
            <p className="text-[#F0E6C8]/70 leading-relaxed mb-6">
              Robert legt für dich die Karten und deutet, was Tarot für deine aktuelle Lebenssituation, Beziehungen oder Entscheidungen zeigt. Tiefgehend, ehrlich und einfühlsam.
            </p>
            <div className="text-4xl font-bold text-[#C9A84C] mb-6">199 €</div>
            <div className="space-y-3 mb-8">
              {tarotFeatures.map(f => (
                <div key={f} className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-[#C9A84C] shrink-0" />
                  <span className="text-[#F0E6C8]/75">{f}</span>
                </div>
              ))}
            </div>
            <a href="https://www.astrodaddy.de" target="_blank" rel="noopener noreferrer">
              <Button variant="gold" size="lg" className="px-8">
                Tarot-Legung buchen <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      <WaveDivider fromColor="#3D2A8A" toColor="#1B1040" />

      {/* ── SECTION 4 — WORKBOOKS ────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#1B1040]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A84C]/40 text-[#C9A84C] text-xs tracking-widest uppercase mb-6"
              style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}
            >
              <BookOpen className="w-3 h-3" /> Workbooks
            </div>
            <h2 className="text-4xl text-[#F0E6C8] mb-3" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>
              Lerne Astrologie in deinem Tempo
            </h2>
            <p className="text-[#F0E6C8]/55 max-w-xl mx-auto">
              Durchdachte Lernmaterialien, die dich Schritt für Schritt durch die Welt der Astrologie führen.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {workbooks.map((wb, i) => (
              <motion.div
                key={wb.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <GlassCard className="rounded-xl p-6 h-full border-white/8 hover:border-[#7B5FD4]/30 transition-colors opacity-80">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-10 h-10 rounded-lg bg-[#3D2A8A]/50 border border-[#7B5FD4]/20 flex items-center justify-center">
                      <Star className="w-5 h-5 text-[#C9A84C]" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 text-[#C9A84C] text-[10px] tracking-widest uppercase font-semibold">
                      Demnächst
                    </span>
                  </div>
                  <h3 className="text-[#F0E6C8] font-semibold text-lg mb-2">{wb.title}</h3>
                  <p className="text-[#F0E6C8]/45 text-xs leading-relaxed">{wb.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center"
          >
            <Link to="/community">
              <button className="px-9 py-3 rounded-lg border border-white/20 text-[#F0E6C8]/70 hover:text-[#F0E6C8] hover:border-white/40 transition-all text-sm font-medium">
                Trag dich auf die Warteliste ein
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <WaveDivider fromColor="#1B1040" toColor="#09061a" />

      {/* ── SECTION 5 — CTA ──────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#09061a]">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            {/* Warm gradient overlay */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden>
              <div className="w-full h-full bg-gradient-to-br from-[#C9A84C]/20 via-[#F0E6C8]/10 to-[#C9A84C]/20" />
            </div>

            <motion.div
              className="relative w-12 h-12 mx-auto mb-6 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 flex items-center justify-center"
              animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles className="w-6 h-6 text-[#C9A84C]" />
            </motion.div>

            <h2 className="text-4xl text-[#F0E6C8] mb-4" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>
              Bereit für deine astrologische Reise?
            </h2>
            <p className="text-[#F0E6C8]/55 mb-8">
              Buche noch heute dein Reading oder entdecke unsere Lernmaterialien.
            </p>
            <Link to="/angebote">
              <Button variant="gold" size="lg" className="px-9">
                Jetzt buchen <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
