import React, { useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { StarField } from '../components/StarField';
import { products } from '../data/products';
import {
  Star, ArrowRight, CheckCircle, Moon, Sparkles, Quote,
  Instagram, Youtube, ChevronDown, BookOpen,
  Key, Brain, Zap, RotateCcw
} from 'lucide-react';

const TikTokIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
  </svg>
);

const faqData = [
  { q: 'Wie läuft eine astrologische Beratung ab?', a: 'Nach der Buchung erhältst du einen Terminlink. Robert analysiert vorab dein Geburtshoroskop und geht im Call tief auf deine Persönlichkeit, aktuellen Themen und Lebensaufgaben ein.' },
  { q: 'Welche Daten brauche ich für ein Horoskop?', a: 'Geburtsdatum, Geburtszeit (so genau wie möglich) und Geburtsort. Je genauer die Zeit, desto präziser das Horoskop.' },
  { q: 'Was wenn ich meine Geburtszeit nicht kenne?', a: 'Kein Problem. Robert arbeitet auch ohne exakte Geburtszeit und nutzt dann ein Solar-Chart oder Rektifikationstechniken.' },
  { q: 'Gibt es Ratenzahlung für die Ausbildung?', a: 'Ja! Für die 6-monatige Astrologie-Ausbildung ist Ratenzahlung über Klarna möglich.' },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/8">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left text-[#F0E6C8] hover:text-[#C9A84C] transition-colors">
        <span className="text-sm font-medium pr-4">{q}</span>
        <ChevronDown className={`w-4 h-4 shrink-0 text-[#7B5FD4] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
            <p className="text-[#F0E6C8]/55 text-sm pb-5 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  const featured = products.filter(p => p.bestseller).slice(0, 3);

  const testimonials = [
    { name: 'Sandra M.', text: 'Roberts Deutung hat mir die Augen geöffnet. Ich verstehe jetzt, warum ich immer wieder in dieselben Muster gefallen bin – und wie ich herauskomme.', stars: 5 },
    { name: 'Kai T.', text: 'Die Ausbildung ist tiefgründig und klar erklärt. Robert ist ein außergewöhnlicher Lehrer – kompetent und einfühlsam.', stars: 5 },
    { name: 'Lisa K.', text: 'Finde den Weg zu Dir selbst – das habe ich tatsächlich erlebt. Die 45-Minuten-Session hat mein Selbstbild verändert.', stars: 5 },
    { name: 'Marc H.', text: 'So präzise, so klar. Robert trifft Dinge auf den Punkt, die ich nie ausgesprochen hätte. Absolute Empfehlung!', stars: 5 },
    { name: 'Julia S.', text: 'Der angenehmste Call, den ich je hatte. Keine Schubladen – sondern echtes Verstehen. Ich bin so dankbar.', stars: 5 },
  ];

  const potentials = [
    { icon: Key,        title: 'Dein Schlüssel',   desc: 'Verstehe die kosmische Blaupause, die bei deiner Geburt festgelegt wurde.' },
    { icon: Brain,      title: 'Selbsterkenntnis',  desc: 'Erkenne Muster, Stärken und blinde Flecken. Astrologie als ehrlicher Spiegel.' },
    { icon: Zap,        title: 'Alte Traumas',      desc: 'Der Mond und Chiron zeigen, wo alte Wunden sitzen – und wie du heilen kannst.' },
    { icon: RotateCcw,  title: 'Karma & Aufgaben',  desc: 'Mondknoten und Saturn enthüllen deine Lebensaufgabe und wohin du wachsen sollst.' },
  ];

  const services = [
    { title: 'Astrologische Beratung', desc: 'Persönliche Horoskop-Deutung – von 10 Min bis 90 Min Deep Dive.', img: 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?w=600&q=80', link: '/angebote' },
    { title: 'Praktische Workbooks',   desc: 'Lerne Astrologie in deinem Tempo mit durchdachten Lern-Materialien.', img: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=600&q=80', link: '/angebote' },
    { title: 'Astrologie-Ausbildung',  desc: '6 Monate zum professionellen Astrologen – inkl. Zertifikat & Klarna.', img: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&q=80', link: '/ausbildung' },
    { title: 'Tarot-Legungen',         desc: 'Klarheit für Liebe, Beruf & Entscheidungen durch einfühlsame Tarot-Deutung.', img: 'https://images.unsplash.com/photo-1601049541708-182b022a8a25?w=600&q=80', link: '/angebote' },
  ];

  const pricing = [
    { title: 'Basis-Beratung', duration: '10 Minuten', price: '55 €',  highlight: false, features: ['Eine konkrete Frage', 'Astrologische Antwort', 'Sofortige Terminvergabe', 'Ideal als Einstieg'] },
    { title: 'Transformation',  duration: '45 Minuten', price: '199 €', highlight: true,  features: ['Komplette Horoskop-Analyse', 'Stärken & Herausforderungen', 'Aktuelle Transiten', 'Aufzeichnung inklusive'] },
    { title: 'Deep Work',       duration: '90 Minuten', price: '349 €', highlight: false, features: ['Geburtshoroskop + Transiten', 'Solar-Return optional', 'Progressionen auf Wunsch', 'Nachbetreuung per E-Mail'] },
  ];

  return (
    <div className="min-h-screen bg-[#1B1040]">

      {/* ── HERO ─ Kosmos ──────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#1B1040]">
        <StarField />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#3D2A8A]/18 blur-[140px]" />
          <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[#C9A84C]/6 blur-[100px]" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* Left: Headline */}
            <motion.div initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9A84C]/30 text-[#C9A84C] text-xs tracking-widest uppercase mb-8" style={{ fontFamily: 'Cinzel, serif' }}>
                <Star className="w-3 h-3 fill-current" /> Astrologie · Tarot · Ausbildung
              </div>
              <h1 className="text-[clamp(2.4rem,4.5vw,5rem)] leading-[1.1] text-[#F0E6C8] mb-3" style={{ fontFamily: 'Cinzel, serif' }}>Finde den Weg</h1>
              <h1 className="text-[clamp(2.4rem,4.5vw,5rem)] leading-[1.1] text-[#C9A84C] mb-8" style={{ fontFamily: 'Cinzel, serif' }}>zu Dir selbst</h1>
              <p className="text-lg text-[#F0E6C8]/55 max-w-lg mb-10">
                Entdecke was die Planeten mit Dir zu tun haben. Mit Robert Wagner – Astrologe & spiritueller Lebensberater.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/angebote"><Button variant="gold" size="lg" className="px-9">Beratung buchen <ArrowRight className="w-4 h-4" /></Button></Link>
                <Link to="/ausbildung"><Button variant="outline" size="lg" className="px-9 border-white/15 text-[#F0E6C8]/60 hover:text-[#F0E6C8] hover:border-white/30">Zur Ausbildung</Button></Link>
              </div>
            </motion.div>

            {/* Right: Video in Astro-Frame */}
            <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35, duration: 0.9 }}>
              <div className="relative">
                {/* Ambient glows */}
                <div className="absolute -inset-8 rounded-3xl bg-[#7B5FD4]/12 blur-2xl pointer-events-none" />
                <div className="absolute -inset-3 rounded-2xl bg-[#C9A84C]/6 blur-lg pointer-events-none" />

                {/* Outer decorative ring */}
                <div className="absolute -inset-4 rounded-2xl border border-[#C9A84C]/12 pointer-events-none" />
                <div className="absolute -inset-2 rounded-xl border border-[#7B5FD4]/18 pointer-events-none" />

                {/* Gradient-border frame */}
                <div className="relative rounded-xl overflow-hidden shadow-[0_0_50px_rgba(123,95,212,0.35)]"
                     style={{ padding: '1.5px', background: 'linear-gradient(135deg, #C9A84C 0%, #7B5FD4 45%, #C9A84C 100%)' }}>
                  <div className="rounded-xl overflow-hidden bg-[#1B1040]">

                    {/* Top bar */}
                    <div className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#1B1040] via-[#3D2A8A]/50 to-[#1B1040] border-b border-[#C9A84C]/18">
                      <span className="text-[#C9A84C]/45 text-sm select-none">♈</span>
                      <span className="text-[#C9A84C]/45 text-sm select-none">♌</span>
                      <span className="text-[#C9A84C]/65 text-[10px] tracking-[0.22em] uppercase mx-3 select-none" style={{ fontFamily: 'Cinzel, serif' }}>
                        Robert Wagner Astrologie
                      </span>
                      <span className="text-[#C9A84C]/45 text-sm select-none">♏</span>
                      <span className="text-[#C9A84C]/45 text-sm select-none">♒</span>
                    </div>

                    {/* Video */}
                    <div className="aspect-video">
                      <iframe src="https://www.youtube.com/embed/eVFkc8QfG3o?rel=0&modestbranding=1" title="Robert Wagner Astrologie" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" />
                    </div>

                    {/* Bottom bar */}
                    <div className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1B1040]/95 border-t border-[#C9A84C]/18">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-[#C9A84C] text-[#C9A84C]" />)}
                      </div>
                      <span className="text-[#F0E6C8]/45 text-xs mx-1.5">5/5 Sterne · 100% Zufriedenheitsrate</span>
                      <Sparkles className="w-3 h-3 text-[#C9A84C]/55" />
                    </div>
                  </div>
                </div>

                {/* Corner ornaments */}
                {([
                  'absolute -top-1 -left-1',
                  'absolute -top-1 -right-1 rotate-90',
                  'absolute -bottom-1 -right-1 rotate-180',
                  'absolute -bottom-1 -left-1 -rotate-90',
                ] as const).map((cls, i) => (
                  <div key={i} className={`${cls} w-7 h-7 pointer-events-none`}>
                    <svg viewBox="0 0 28 28" fill="none">
                      <circle cx="3" cy="3" r="2.2" fill="#C9A84C" opacity="0.85" />
                      <line x1="5.2" y1="3" x2="26" y2="3" stroke="#C9A84C" strokeWidth="0.8" opacity="0.45" />
                      <line x1="3" y1="5.2" x2="3" y2="26" stroke="#C9A84C" strokeWidth="0.8" opacity="0.45" />
                    </svg>
                  </div>
                ))}

                {/* Floating zodiac symbols top/bottom */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[#C9A84C]/22 text-xs tracking-[0.45em] select-none pointer-events-none" style={{ fontFamily: 'serif' }}>
                  ♈ ♉ ♊ ♋ ♌ ♍
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[#7B5FD4]/22 text-xs tracking-[0.45em] select-none pointer-events-none" style={{ fontFamily: 'serif' }}>
                  ♎ ♏ ♐ ♑ ♒ ♓
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── ÜBER ROBERT ─ Nebel ────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#3D2A8A]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A84C]/40 text-[#C9A84C] text-xs tracking-widest uppercase mb-6" style={{ fontFamily: 'Cinzel, serif' }}>Über Robert</div>
            <h2 className="text-4xl text-[#F0E6C8] mb-5">Astrologe & spiritueller Lebensberater</h2>
            <p className="text-[#F0E6C8]/70 leading-relaxed mb-5">
              Ich bin Robert Wagner – bekannt als <span className="text-[#C9A84C]">@astrodaddy.official</span> auf TikTok, Instagram und YouTube. Seit Jahren helfe ich Menschen dabei, sich selbst durch die Sprache der Sterne besser zu verstehen.
            </p>
            <p className="text-[#F0E6C8]/70 leading-relaxed mb-8">
              Astrologie ist für mich kein Orakel – sie ist ein Werkzeug zur Selbsterkenntnis. Dein Horoskop zeigt, wer du wirklich bist. <span className="text-[#F0E6C8]">Es gibt viel zu entschlüsseln.</span>
            </p>
            <div className="flex flex-wrap gap-3">
              {[{ icon: TikTokIcon, label: 'TikTok' }, { icon: Instagram, label: 'Instagram' }, { icon: Youtube, label: 'YouTube' }].map(s => (
                <a key={s.label} href="https://www.instagram.com/astrodaddy.official" target="_blank" rel="noopener noreferrer">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-[#F0E6C8]/60 hover:text-[#F0E6C8] hover:border-white/40 transition-all text-sm">
                    <s.icon /> {s.label}
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <img src="/robert.png" alt="Robert Wagner" className="rounded-xl w-full object-cover object-bottom h-[460px] border border-white/15" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-[#1B1040]/80 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[#C9A84C] text-[#C9A84C]" />)}</div>
                  <span className="text-[#F0E6C8]/70 text-xs">5/5 Sterne · 100% Zufriedenheitsrate</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── LEISTUNGEN ─ Kosmos ────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#1B1040]">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-4xl text-[#F0E6C8] mb-3">Leistungen</h2>
            <p className="text-[#F0E6C8]/45">Alles was du brauchst, um dein volles Potenzial zu entfalten.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Link to={s.link}>
                  <GlassCard hover className="rounded-xl overflow-hidden border-white/8 cursor-pointer group">
                    <div className="overflow-hidden h-44">
                      <img src={s.img} alt={s.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" />
                    </div>
                    <div className="p-5">
                      <h3 className="text-[#F0E6C8] font-semibold text-sm mb-2">{s.title}</h3>
                      <p className="text-[#F0E6C8]/45 text-xs leading-relaxed">{s.desc}</p>
                      <div className="flex items-center gap-1.5 mt-4 text-[#C9A84C] text-xs font-medium">Mehr erfahren <ArrowRight className="w-3 h-3" /></div>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUSBILDUNG ─ Nebel ─────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#3D2A8A]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="relative rounded-xl overflow-hidden border border-white/15 h-[400px]">
              <img src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80" alt="Astrologie Ausbildung" className="w-full h-full object-cover opacity-70" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="bg-[#1B1040]/85 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="text-[#C9A84C] text-xs tracking-widest uppercase mb-1" style={{ fontFamily: 'Cinzel, serif' }}>Astrologie-Ausbildung</div>
                  <div className="text-[#F0E6C8] font-semibold text-sm">6 Monate · Placidus-System · Zertifikat</div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/25 text-[#F0E6C8]/70 text-xs tracking-widest uppercase mb-6" style={{ fontFamily: 'Cinzel, serif' }}>
              <BookOpen className="w-3 h-3" /> Ausbildung
            </div>
            <h2 className="text-4xl text-[#F0E6C8] mb-5">In 6 Monaten zum Astrologen</h2>
            <p className="text-[#F0E6C8]/70 leading-relaxed mb-7">
              Roberts Ausbildung führt dich durch alle Grundlagen des Placidus-Systems – von Planeten und Zeichen bis zur vollständigen Horoskop-Deutung. Mit Zertifikat und optionaler Klarna-Ratenzahlung.
            </p>
            <div className="space-y-3 mb-8">
              {['Planeten, Zeichen & Häuser vollständig verstehen', 'Geburtshoroskop professionell deuten', 'Transiten & aktuelle Lebensthemen analysieren', 'Optional: Astrologie-Business aufbauen'].map(f => (
                <div key={f} className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-[#C9A84C] shrink-0" />
                  <span className="text-[#F0E6C8]/75">{f}</span>
                </div>
              ))}
            </div>
            <Link to="/ausbildung">
              <Button variant="gold" size="lg" className="px-8">Zur Ausbildung – 3.600 € <ArrowRight className="w-4 h-4" /></Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── POTENZIAL ─ Kosmos ─────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#1B1040]">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-4xl text-[#F0E6C8] mb-3">Dein Potenzial entschlüsseln</h2>
            <p className="text-[#F0E6C8]/45 max-w-xl mx-auto">Gemeinsam decken wir auf, was die Sterne über dich wissen – und was du noch nicht weißt.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {potentials.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <GlassCard className="rounded-xl p-6 h-full border-white/8 hover:border-[#7B5FD4]/30 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-[#3D2A8A]/50 border border-[#7B5FD4]/20 flex items-center justify-center mb-5">
                    <p.icon className="w-5 h-5 text-[#C9A84C]" />
                  </div>
                  <h3 className="text-[#F0E6C8] font-semibold text-sm mb-2">{p.title}</h3>
                  <p className="text-[#F0E6C8]/45 text-xs leading-relaxed">{p.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL MEDIA ─ Gold ────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#C9A84C]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl text-[#1B1040] mb-4" style={{ fontFamily: 'Cinzel, serif' }}>Folge der Community</h2>
            <p className="text-[#1B1040]/65 mb-10">Tägliche Astrologie-Insights, Live-Sessions und mehr – kostenlos auf Social Media.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'TikTok',     icon: TikTokIcon, desc: 'Kurze Astrologie-Snippets & Deutungen',    href: 'https://www.tiktok.com/@astrodaddy.official' },
                { label: 'Instagram',  icon: Instagram,  desc: 'Stories, Reels & persönliche Einblicke',   href: 'https://www.instagram.com/astrodaddy.official' },
                { label: 'YouTube',    icon: Youtube,    desc: 'Längere Videos & Ausbildungs-Content',      href: 'https://www.youtube.com/@astrodaddy.official' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                  <div className="bg-[#1B1040]/10 hover:bg-[#1B1040]/20 border border-[#1B1040]/15 hover:border-[#1B1040]/30 rounded-xl p-6 text-left transition-all">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-[#1B1040]/15 flex items-center justify-center text-[#1B1040]">
                        <s.icon />
                      </div>
                      <div className="text-[#1B1040] font-semibold text-sm">{s.label}</div>
                    </div>
                    <p className="text-[#1B1040]/60 text-xs">{s.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─ Kosmos ──────────────────────────────── */}
      <section className="py-24 px-6 bg-[#1B1040]">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="flex items-center justify-center gap-1.5 mb-3">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-5 h-5 fill-[#C9A84C] text-[#C9A84C]" />)}
            </div>
            <h2 className="text-4xl text-[#F0E6C8] mb-2">5 von 5 Sternen auf Google</h2>
            <p className="text-[#F0E6C8]/40 text-sm">100% Zufriedenheitsrate</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
            {testimonials.slice(0, 3).map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <GlassCard className="rounded-xl p-6 h-full border-white/8">
                  <Quote className="w-5 h-5 text-[#C9A84C]/35 mb-4" />
                  <p className="text-[#F0E6C8]/65 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#F0E6C8] text-sm font-medium">{t.name}</span>
                    <div className="flex gap-0.5">{Array.from({ length: t.stars }).map((_, i) => <Star key={i} className="w-3 h-3 fill-[#C9A84C] text-[#C9A84C]" />)}</div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {testimonials.slice(3).map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <GlassCard className="rounded-xl p-5 border-white/8">
                  <p className="text-[#F0E6C8]/55 text-sm italic mb-3">"{t.text}"</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#F0E6C8]/70 text-sm">{t.name}</span>
                    <div className="flex gap-0.5">{Array.from({ length: t.stars }).map((_, i) => <Star key={i} className="w-3 h-3 fill-[#C9A84C] text-[#C9A84C]" />)}</div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREISE ─ Nebel ─────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#3D2A8A]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-4xl text-[#F0E6C8] mb-3">Beratung buchen</h2>
            <p className="text-[#F0E6C8]/55">Wähle das Paket, das zu deiner Reise passt.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {pricing.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className={`rounded-xl p-7 h-full flex flex-col relative border ${p.highlight ? 'bg-[#C9A84C] border-[#C9A84C]' : 'bg-white/8 border-white/15'}`}>
                  {p.highlight && <div className="absolute -top-3 left-5"><span className="px-3 py-1 rounded bg-[#1B1040] text-[#C9A84C] text-xs font-semibold">Empfohlen</span></div>}
                  <div className={`pt-2 mb-1 text-xs tracking-widest uppercase ${p.highlight ? 'text-[#1B1040]/60' : 'text-[#F0E6C8]/40'}`} style={{ fontFamily: 'Cinzel, serif' }}>{p.duration}</div>
                  <h3 className={`text-lg font-semibold mb-2 ${p.highlight ? 'text-[#1B1040]' : 'text-[#F0E6C8]'}`}>{p.title}</h3>
                  <div className={`text-3xl font-bold mb-6 ${p.highlight ? 'text-[#1B1040]' : 'text-[#C9A84C]'}`}>{p.price}</div>
                  <ul className="space-y-2.5 mb-7 flex-1">
                    {p.features.map(f => (
                      <li key={f} className="flex items-center gap-2.5 text-sm">
                        <CheckCircle className={`w-3.5 h-3.5 shrink-0 ${p.highlight ? 'text-[#1B1040]' : 'text-[#7B5FD4]'}`} />
                        <span className={p.highlight ? 'text-[#1B1040]/75' : 'text-[#F0E6C8]/60'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="https://www.astrodaddy.de" target="_blank" rel="noopener noreferrer">
                    <button className={`w-full py-2.5 rounded-lg text-sm font-medium border transition-all ${p.highlight ? 'bg-[#1B1040] text-[#C9A84C] border-[#1B1040] hover:bg-[#2a1d6b]' : 'bg-transparent text-[#F0E6C8]/70 border-white/20 hover:text-[#F0E6C8] hover:border-white/40'}`}>
                      {p.highlight ? 'Beliebteste Option' : 'Jetzt buchen'}
                    </button>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─ Kosmos ───────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#1B1040]">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl text-[#F0E6C8] mb-3">Häufige Fragen</h2>
          </motion.div>
          <GlassCard className="rounded-xl px-7 border-white/8">
            {faqData.map(item => <FaqItem key={item.q} {...item} />)}
          </GlassCard>
        </div>
      </section>

      {/* ── FINAL CTA ─ Gold ───────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#C9A84C]">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Moon className="w-8 h-8 text-[#1B1040]/60 mx-auto mb-6" />
            <h2 className="text-4xl text-[#1B1040] mb-4" style={{ fontFamily: 'Cinzel, serif' }}>Die Sterne warten auf Dich</h2>
            <p className="text-[#1B1040]/60 mb-8">Starte deine Reise zur Selbsterkenntnis – kostenlos oder mit persönlicher Beratung.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/community">
                <button className="px-8 py-3 rounded-lg bg-[#1B1040] text-[#C9A84C] font-semibold text-sm hover:bg-[#2a1d6b] transition-colors">
                  Community beitreten
                </button>
              </Link>
              <Link to="/login?tab=register">
                <button className="px-8 py-3 rounded-lg bg-transparent text-[#1B1040] font-semibold text-sm border border-[#1B1040]/30 hover:bg-[#1B1040]/10 transition-colors">
                  Kostenlos registrieren
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
