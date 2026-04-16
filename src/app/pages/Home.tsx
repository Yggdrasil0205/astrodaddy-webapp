import React from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { StarField } from '../components/StarField';
import { products } from '../data/products';
import { Star, ArrowRight, CheckCircle, Moon, Sun, Sparkles, Quote } from 'lucide-react';

export default function Home() {
  const featured = products.filter(p => p.bestseller).slice(0, 3);

  const testimonials = [
    { name: 'Sandra M.', text: 'Roberts Deutung hat mir die Augen geöffnet. Ich verstehe jetzt, warum ich immer wieder in dieselben Muster gefallen bin – und wie ich rauskomme.', rating: 5 },
    { name: 'Kai T.', text: 'Die Astrologie-Ausbildung ist komplex und trotzdem so klar erklärt. Robert ist ein außergewöhnlicher Lehrer.', rating: 5 },
    { name: 'Lisa K.', text: 'Finde den Weg zu Dir selbst – das ist nicht nur ein Slogan. Das habe ich tatsächlich erlebt. Danke, Robert!', rating: 5 },
  ];

  const features = [
    { icon: Moon,     title: 'Geburtshoroskop',  desc: 'Entschlüssele deine Persönlichkeit, Potenziale und Lebensthemen.' },
    { icon: Star,     title: 'Astrologie lernen', desc: 'Von Grundlagen bis zur professionellen Deutung – Schritt für Schritt.' },
    { icon: Sun,      title: 'Tarot & Intuition', desc: 'Klarheit für deine wichtigsten Fragen durch Tarot-Legungen.' },
    { icon: Sparkles, title: 'Community',         desc: 'Lerne gemeinsam mit Gleichgesinnten in einer aktiven Community.' },
  ];

  return (
    <div className="min-h-screen bg-[#1B1040]">

      {/* ── Hero mit StarField ─────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <StarField className="z-0" />

        {/* Subtle radial glow behind text – not a gradient sweep */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-[#3D2A8A]/20 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9A84C]/30 text-[#C9A84C] text-xs tracking-widest uppercase mb-8"
              style={{ fontFamily: 'Cinzel, serif' }}>
              <Star className="w-3 h-3 fill-current" />
              Astrologie · Tarot · Ausbildung
            </div>

            <h1 className="text-6xl md:text-8xl text-[#F0E6C8] mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
              Entdecke Dein
            </h1>
            <h1 className="text-6xl md:text-8xl text-[#C9A84C] mb-8" style={{ fontFamily: 'Cinzel, serif' }}>
              Universum
            </h1>

            <p className="text-lg text-[#F0E6C8]/60 max-w-xl mx-auto mb-3">
              Finde den Weg zu Dir selbst. Die Sterne warten auf Dich.
            </p>
            <p className="text-sm text-[#F0E6C8]/40 max-w-lg mx-auto mb-12">
              Mit Robert Wagner (@astrodaddy.official) – Astrologe & spiritueller Lebensberater
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/angebote">
                <Button variant="gold" size="lg" className="px-8 rounded-lg">
                  Angebote entdecken
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/ausbildung">
                <Button variant="outline" size="lg" className="px-8 rounded-lg border-[#F0E6C8]/20 text-[#F0E6C8]/70 hover:text-[#F0E6C8] hover:border-[#F0E6C8]/40">
                  Zur Ausbildung
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 justify-center mt-10">
              {['5/5 Sterne auf Google', '100% Zufriedenheitsrate', 'TikTok & Instagram'].map(b => (
                <div key={b} className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 text-[#F0E6C8]/50 text-xs">
                  <CheckCircle className="w-3.5 h-3.5 text-[#C9A84C]" />
                  {b}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-4xl text-[#F0E6C8] mb-3">Was dich erwartet</h2>
            <p className="text-[#F0E6C8]/50">Es gibt viel zu entschlüsseln. Gemeinsam decken wir dein Potenzial auf.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <GlassCard className="rounded-xl p-6 h-full border-white/8">
                  <div className="w-10 h-10 rounded-lg bg-[#3D2A8A]/60 border border-[#7B5FD4]/20 flex items-center justify-center mb-4">
                    <f.icon className="w-5 h-5 text-[#C9A84C]" />
                  </div>
                  <h3 className="text-[#F0E6C8] mb-2 text-base font-semibold">{f.title}</h3>
                  <p className="text-[#F0E6C8]/50 text-sm leading-relaxed">{f.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Angebote ─────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-4xl text-[#F0E6C8] mb-3">Beliebteste Angebote</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featured.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <GlassCard className="rounded-xl overflow-hidden h-full flex flex-col border-white/8 hover:border-[#7B5FD4]/30 transition-colors">
                  <img src={p.image} alt={p.name} className="w-full h-44 object-cover opacity-80" />
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      {p.badge && <span className="px-2 py-0.5 rounded text-xs border border-[#C9A84C]/40 text-[#C9A84C]">{p.badge}</span>}
                      <span className="px-2 py-0.5 rounded text-xs border border-[#7B5FD4]/30 text-[#7B5FD4]/80">{p.category}</span>
                    </div>
                    <h3 className="text-[#F0E6C8] text-base font-semibold mb-2">{p.name}</h3>
                    <p className="text-[#F0E6C8]/50 text-sm mb-4 flex-1">{p.shortDescription}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xl font-bold text-[#C9A84C]">{p.priceFormatted}</span>
                      <Link to={`/angebote/${p.id}`}>
                        <Button variant="secondary" size="sm">Details <ArrowRight className="w-3.5 h-3.5" /></Button>
                      </Link>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/angebote">
              <Button variant="outline" size="lg" className="border-white/15 text-[#F0E6C8]/60 hover:text-[#F0E6C8] hover:border-white/30 px-8">
                Alle Angebote <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-4xl text-[#F0E6C8] mb-3">Was unsere Klienten sagen</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <GlassCard className="rounded-xl p-6 h-full border-white/8">
                  <Quote className="w-6 h-6 text-[#C9A84C]/40 mb-4" />
                  <p className="text-[#F0E6C8]/70 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#F0E6C8] text-sm font-medium">{t.name}</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#C9A84C] text-[#C9A84C]" />
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Sparkles className="w-8 h-8 text-[#C9A84C] mx-auto mb-6" />
            <h2 className="text-4xl text-[#F0E6C8] mb-4">Bereit für deine Reise?</h2>
            <p className="text-[#F0E6C8]/50 mb-8">
              Werde Teil der AstroDaddy-Community und entdecke, was die Sterne für dich bereithalten.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/community">
                <Button variant="gold" size="lg" className="px-8">Community beitreten</Button>
              </Link>
              <Link to="/login?tab=register">
                <Button variant="outline" size="lg" className="px-8 border-[#F0E6C8]/20 text-[#F0E6C8]/60 hover:text-[#F0E6C8] hover:border-[#F0E6C8]/40">
                  Kostenlos registrieren
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
