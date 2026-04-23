import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { StarField } from '../components/StarField';
import {
  Star, CheckCircle, ArrowRight, Moon, Sparkles,
  Users, BookOpen, Zap, MessageCircle, RotateCcw, Brain, Heart,
} from 'lucide-react';

// ── shared helpers ────────────────────────────────────────────

function WaveDivider({ fromColor, toColor, flip = false }: { fromColor: string; toColor: string; flip?: boolean }) {
  return (
    <div className="relative h-12 overflow-hidden" style={{ background: fromColor, transform: flip ? 'scaleY(-1)' : undefined }}>
      <svg viewBox="0 0 1440 48" className="absolute bottom-0 w-full" preserveAspectRatio="none" style={{ display: 'block' }}>
        <path d="M0,24 C240,48 480,0 720,24 C960,48 1200,0 1440,24 L1440,48 L0,48 Z" fill={toColor} />
      </svg>
    </div>
  );
}

const ORB_CFG = [
  { color: '#7B5FD4', w: 420, h: 420, x: '8%',  y: '20%', d: 22, op: 0.13, blur: 130 },
  { color: '#C9A84C', w: 260, h: 260, x: '76%', y: '12%', d: 30, op: 0.07, blur: 95  },
  { color: '#3D2A8A', w: 360, h: 360, x: '55%', y: '60%', d: 27, op: 0.16, blur: 115 },
];
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {ORB_CFG.map((o, i) => (
        <motion.div key={i} className="absolute rounded-full"
          style={{ width: o.w, height: o.h, left: o.x, top: o.y, background: o.color, opacity: o.op, filter: `blur(${o.blur}px)` }}
          animate={{ x: [0, 28, -18, 0], y: [0, -42, 20, 0], scale: [1, 1.14, 0.94, 1] }}
          transition={{ duration: o.d, repeat: Infinity, ease: 'easeInOut', delay: i * 4.5 }}
        />
      ))}
    </div>
  );
}

// ── page ──────────────────────────────────────────────────────

const features = [
  { icon: Zap,           title: 'Monatliche Inhalte & Impulse',  desc: 'Tiefgehende Video-Sessions (90–120 Min.) zu psychologischer Astrologie – abgestimmt auf die aktuellen kosmischen Energien.' },
  { icon: BookOpen,      title: 'Tiefgehende E-Books',            desc: 'Ausführliche Selbsterkenntnis-Workbooks, die du in deinem eigenen Tempo durcharbeitest.' },
  { icon: MessageCircle, title: 'Monatliches Live Q&A',           desc: 'Direkter Zugang zu Robert – deine Fragen, sein Wissen, in Echtzeit.' },
  { icon: Moon,          title: 'Vollmond- & Neumond-Sessions',   desc: 'Regelmäßige Live-Rituale, die dir helfen, kosmische Energie bewusst zu nutzen.' },
  { icon: Users,         title: 'Community & Austausch',          desc: 'Eine sichere, fokussierte Gruppe Gleichgesinnter – kein Social-Media-Rauschen.' },
  { icon: Brain,         title: 'Horoskop-Impulse',               desc: 'Persönliche astrologische Einblicke, die auf deinen Chart zugeschnitten sind.' },
];

const problems = [
  { icon: RotateCcw, text: 'Du hast dich schon mit Persönlichkeitsentwicklung beschäftigt – aber irgendetwas fehlt.' },
  { icon: Brain,     text: 'Du verstehst Theorien – aber nicht dich selbst.' },
  { icon: Zap,       text: 'Du merkst, dass sich Muster wiederholen: in Beziehungen, Emotionen, Entscheidungen.' },
  { icon: Moon,      text: 'Egal wie viel du liest oder hörst – es bleibt oberflächlich.' },
];

const methodSteps = [
  { nr: '01', title: 'Horoskop-Analyse',          desc: 'Dein Geburtshoroskop als psychologisches Werkzeug – kein Schicksal, sondern Potenzial sichtbar machen.' },
  { nr: '02', title: 'Muster erkennen',            desc: 'Unbewusste Dynamiken sichtbar machen, die deine Beziehungen und Entscheidungen steuern.' },
  { nr: '03', title: 'Tieferes Wahrnehmen',        desc: 'Emotionen und Konflikte präziser verstehen – durch die Sprache der Planeten.' },
  { nr: '04', title: 'Wachstum in deinem Tempo',  desc: 'Kein Leistungsdruck, kein festes Curriculum. Du lernst so, wie es zu dir passt.' },
];

export default function Ausbildung() {
  return (
    <div className="min-h-screen bg-[#1B1040]">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#1B1040]">
        <StarField />
        <FloatingOrbs />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-28 pb-20 text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9A84C]/30 text-[#C9A84C] text-xs tracking-widest uppercase mb-8" style={{ fontFamily: 'Cinzel, serif' }}>
              <Star className="w-3 h-3 fill-current" /> Astroversity Academy
            </div>
          </motion.div>

          <div className="overflow-hidden mb-3">
            <motion.h1
              initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2rem,3.8vw,4rem)] leading-[1.15] text-[#F0E6C8]"
              style={{ fontFamily: 'Cinzel, serif' }}>
              Die erste Astro-Community, die dich nicht belehrt –
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2rem,3.8vw,4rem)] leading-[1.15] text-[#C9A84C]"
              style={{ fontFamily: 'Cinzel, serif' }}>
              sondern dich selbst verstehen lässt.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }}
            className="text-lg text-[#F0E6C8]/55 max-w-2xl mx-auto mb-10 leading-relaxed">
            In der Astroversity Academy nutzt du psychologische Astrologie als Werkzeug für echte Selbsterkenntnis – ohne starre Ausbildung, ohne Druck, in deinem eigenen Tempo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button variant="gold" size="lg" className="px-10">
              Jetzt Zugang sichern <ArrowRight className="w-4 h-4" />
            </Button>
            <span className="text-[#F0E6C8]/35 text-sm">Starte jetzt ab 50 € · limitierte Plätze</span>
          </motion.div>
        </div>
      </section>

      <WaveDivider fromColor="#1B1040" toColor="#3D2A8A" />

      {/* ── PROBLEM ──────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#3D2A8A]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 text-[#F0E6C8]/60 text-xs tracking-widest uppercase mb-6" style={{ fontFamily: 'Cinzel, serif' }}>
              Kommt dir das bekannt vor?
            </div>
            <h2 className="text-4xl text-[#F0E6C8]" style={{ fontFamily: 'Cinzel, serif' }}>Du weißt, dass mehr in dir steckt.</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {problems.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <GlassCard className="rounded-xl p-6 border-white/10 h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-[#C9A84C]/12 border border-[#C9A84C]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <p.icon className="w-4 h-4 text-[#C9A84C]" />
                    </div>
                    <p className="text-[#F0E6C8]/75 leading-relaxed text-sm pt-1.5">{p.text}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fromColor="#3D2A8A" toColor="#1B1040" />

      {/* ── MECHANISMUS ──────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#1B1040]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A84C]/40 text-[#C9A84C] text-xs tracking-widest uppercase mb-6" style={{ fontFamily: 'Cinzel, serif' }}>
              Der Unterschied
            </div>
            <h2 className="text-4xl text-[#F0E6C8] mb-5">Dein Horoskop ist der präziseste Spiegel, den es gibt.</h2>
            <p className="text-[#F0E6C8]/65 leading-relaxed mb-5">
              Psychologische Astrologie ist kein Blick ins Schicksal – sie ist ein System, das dir zeigt, wo dein Potenzial blockiert ist, was dich antreibt und wie du wirklich funktionierst.
            </p>
            <p className="text-[#F0E6C8]/65 leading-relaxed mb-8">
              Basierend auf über 1.000 individuellen Beratungen hat Robert Wagner eine Methode entwickelt, die Horoskop-Analyse mit psychologischer Tiefe verbindet – damit du dich endlich wirklich verstehst.
            </p>
            <Button variant="gold" size="lg" className="px-8">
              Zugang sichern <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="relative rounded-xl overflow-hidden border border-white/15 h-[380px]">
              <img src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80" alt="Kosmische Astrologie" className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B1040]/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <GlassCard className="rounded-lg p-4 border-white/10">
                  <div className="text-[#C9A84C] text-xs tracking-widest uppercase mb-1" style={{ fontFamily: 'Cinzel, serif' }}>Roberts Methode</div>
                  <div className="text-[#F0E6C8] font-medium text-sm">Psychologische Astrologie · 1.000+ Beratungen</div>
                </GlassCard>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <WaveDivider fromColor="#1B1040" toColor="#3D2A8A" />

      {/* ── WAS IST DIE ACADEMY ──────────────────────────────── */}
      <section className="py-24 px-6 bg-[#3D2A8A]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-4xl text-[#F0E6C8] mb-4" style={{ fontFamily: 'Cinzel, serif' }}>Was ist die Astroversity Academy?</h2>
            <p className="text-[#F0E6C8]/55 max-w-2xl mx-auto leading-relaxed">
              Eine digitale Mitgliedschaftsplattform für tiefere Selbsterkenntnis. Kein festes Curriculum, kein Leistungsdruck. Stattdessen: Reflexion, Wachstum und echte Verbindung.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: Sparkles, title: 'Kein Druck',     desc: 'Kein festes Curriculum, keine Prüfungen. Du lernst in deinem Tempo, mit deinen Themen – so wie du bist.' },
              { icon: Brain,    title: 'Tiefe statt Breite', desc: 'Lieber ein Thema wirklich durchdringen als vieles oberflächlich streifen. Echte Selbsterkenntnis braucht Raum.' },
              { icon: Users,    title: 'Gemeinschaft',   desc: 'Eine Community, die dich versteht – gleichgesinnte Menschen auf demselben Weg zu sich selbst.' },
            ].map((c, i) => (
              <motion.div key={c.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <GlassCard className="rounded-xl p-7 border-white/10 h-full text-center">
                  <div className="w-11 h-11 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/25 flex items-center justify-center mx-auto mb-5">
                    <c.icon className="w-5 h-5 text-[#C9A84C]" />
                  </div>
                  <h3 className="text-[#F0E6C8] font-semibold text-lg mb-3">{c.title}</h3>
                  <p className="text-[#F0E6C8]/50 text-sm leading-relaxed">{c.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fromColor="#3D2A8A" toColor="#1B1040" />

      {/* ── WAS DU BEKOMMST ──────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#1B1040]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-4xl text-[#F0E6C8] mb-3">Was du bekommst</h2>
            <p className="text-[#F0E6C8]/45">Alles, was du für echte Selbsterkenntnis brauchst.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="h-full">
                <GlassCard className="rounded-xl p-6 border-white/8 h-full flex flex-col hover:border-[#7B5FD4]/30 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-[#3D2A8A]/50 border border-[#7B5FD4]/20 flex items-center justify-center mb-5">
                    <f.icon className="w-5 h-5 text-[#C9A84C]" />
                  </div>
                  <h3 className="text-[#F0E6C8] font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-[#F0E6C8]/45 text-xs leading-relaxed flex-1">{f.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fromColor="#1B1040" toColor="#3D2A8A" />

      {/* ── METHODE / WARUM KLASSISCH NICHT FUNKTIONIERT ─────── */}
      <section className="py-24 px-6 bg-[#3D2A8A]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 text-[#F0E6C8]/60 text-xs tracking-widest uppercase mb-6" style={{ fontFamily: 'Cinzel, serif' }}>
              Deine Methode
            </div>
            <h2 className="text-4xl text-[#F0E6C8] mb-4" style={{ fontFamily: 'Cinzel, serif' }}>Warum klassische Ausbildungen nicht funktionieren</h2>
            <p className="text-[#F0E6C8]/55 max-w-2xl mx-auto leading-relaxed">
              Klassische Lernmodelle sind auf Wissenstransfer ausgerichtet – nicht auf Transformation. Die Astroversity Academy funktioniert umgekehrt: zuerst du, dann das Wissen.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {methodSteps.map((m, i) => (
              <motion.div key={m.nr} initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <GlassCard className="rounded-xl p-5 flex gap-4 border-white/10">
                  <div className="text-2xl font-bold text-[#C9A84C]/40 shrink-0 w-10 leading-none pt-0.5" style={{ fontFamily: 'Cinzel, serif' }}>{m.nr}</div>
                  <div>
                    <h3 className="text-[#F0E6C8] font-semibold mb-1 text-lg">{m.title}</h3>
                    <p className="text-[#F0E6C8]/50 text-xs leading-relaxed">{m.desc}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fromColor="#3D2A8A" toColor="#1B1040" />

      {/* ── COMMUNITY & LIVE ELEMENTE ─────────────────────────── */}
      <section className="py-24 px-6 bg-[#1B1040]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A84C]/40 text-[#C9A84C] text-xs tracking-widest uppercase mb-6" style={{ fontFamily: 'Cinzel, serif' }}>
              Community & Live
            </div>
            <h2 className="text-4xl text-[#F0E6C8] mb-5">Gemeinschaft ist kein Bonus – sie ist der Kern.</h2>
            <p className="text-[#F0E6C8]/65 leading-relaxed mb-5">
              Die Community ist zentraler Bestandteil der Astroversity Academy. Wachstum passiert im Austausch – mit Menschen, die denselben Weg gehen.
            </p>
            <p className="text-[#F0E6C8]/65 leading-relaxed mb-8">
              Regelmäßige Live-Sessions, Vollmond- und Neumond-Rituale sowie monatliche Q&As mit Robert machen aus Einzelkämpfern eine echte Gemeinschaft.
            </p>
            <div className="space-y-3">
              {[
                'Monatliche Live Q&A-Session mit Robert',
                'Vollmond- & Neumond-Gruppenrituale',
                'Fokussierte Community ohne Social-Media-Rauschen',
                'Langfristiger Begleiter auf deinem Weg',
              ].map(f => (
                <div key={f} className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-[#C9A84C] shrink-0" />
                  <span className="text-[#F0E6C8]/70">{f}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="space-y-4">
              {[
                { icon: Users,    label: 'Community Dynamik',   desc: 'Zentraler Bestandteil – Wachstum im Miteinander' },
                { icon: Moon,     label: 'Live-Elemente',        desc: 'Regelmäßige Sessions, Vollmond- & Neumond-Rituale' },
                { icon: Star,     label: 'Langfristigkeit',      desc: 'Echte Veränderung braucht Zeit – wir begleiten dich' },
                { icon: Sparkles, label: 'Dein Vorteil',         desc: 'Tiefer, persönlicher, lebendiger als jeder Online-Kurs' },
              ].map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <GlassCard className="rounded-xl p-5 border-white/10 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#C9A84C]/12 border border-[#C9A84C]/22 flex items-center justify-center shrink-0">
                      <s.icon className="w-5 h-5 text-[#C9A84C]" />
                    </div>
                    <div>
                      <div className="text-[#F0E6C8] font-semibold text-sm">{s.label}</div>
                      <div className="text-[#F0E6C8]/45 text-xs mt-0.5">{s.desc}</div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SENSITIVER HINWEIS ───────────────────────────────── */}
      <section className="py-16 px-6 bg-[#1B1040]">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <GlassCard className="rounded-xl p-8 border-[#7B5FD4]/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#7B5FD4]/15 border border-[#7B5FD4]/25 flex items-center justify-center shrink-0 mt-0.5">
                  <Heart className="w-5 h-5 text-[#7B5FD4]" />
                </div>
                <div>
                  <h3 className="text-[#F0E6C8] font-semibold mb-3">Ein wichtiger Hinweis</h3>
                  <p className="text-[#F0E6C8]/60 text-sm leading-relaxed">
                    Die Inhalte der Astroversity Academy sind für persönliche Reflexion und Selbsterkenntnis gedacht. Sie können dabei helfen, eigene Muster, Emotionen und Potenziale besser zu verstehen – ersetzen jedoch keine professionelle therapeutische oder psychologische Begleitung. Bei schwerwiegenden psychischen Belastungen oder Traumata wende dich bitte an eine Fachkraft. Du trägst die Verantwortung für dein eigenes Wohlbefinden.
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      <WaveDivider fromColor="#1B1040" toColor="#C9A84C" />

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#C9A84C]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Star className="w-10 h-10 text-[#1B1040] mx-auto mb-6 fill-current opacity-45" />
            <h2 className="text-4xl font-bold text-[#1B1040] mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
              Bereit, dich wirklich zu verstehen?
            </h2>
            <p className="text-[#1B1040]/65 mb-8 max-w-xl mx-auto leading-relaxed">
              Limitierte Plätze. Tritt jetzt bei und beginne deine Reise zur echten Selbsterkenntnis – mit psychologischer Astrologie als deinem Werkzeug.
            </p>
            <Button className="bg-[#1B1040] text-[#F0E6C8] hover:bg-[#2a1a50] border-none px-10 py-3 text-base font-semibold">
              Jetzt Zugang sichern – ab 50 € <ArrowRight className="w-4 h-4 inline ml-1" />
            </Button>
            <p className="text-[#1B1040]/40 text-xs mt-4">Monatlich kündbar · Keine versteckten Kosten</p>
          </motion.div>
        </div>
      </section>

      <WaveDivider fromColor="#C9A84C" toColor="#1B1040" />

      {/* ── RECHTLICHES ──────────────────────────────────────── */}
      <section className="py-12 px-6 bg-[#1B1040]">
        <div className="max-w-3xl mx-auto">
          <div className="border-t border-white/8 pt-10">
            <p className="text-[#F0E6C8]/22 text-xs leading-relaxed text-center">
              Die Astroversity Academy ist kein staatlich anerkannter Bildungsabschluss und verleiht kein offiziell anerkanntes Zertifikat. Die vermittelten Inhalte dienen ausschließlich der persönlichen Weiterentwicklung und Selbstreflexion. Es findet keine formale Lernerfolgskontrolle im Sinne des Fernunterrichtsschutzgesetzes statt. Alle Inhalte werden als digitales Weiterbildungsformat ohne Prüfungsordnung angeboten.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
