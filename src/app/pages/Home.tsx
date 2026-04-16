import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { products } from '../data/products';
import {
  Star, ArrowRight, CheckCircle, Sparkles, Moon, Sun, Quote
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router';

export default function Home() {
  const featuredProducts = products.filter(p => p.bestseller).slice(0, 3);

  const testimonials = [
    {
      name: 'Sandra M.',
      text: 'Roberts Deutung hat mir die Augen geöffnet. Ich verstehe jetzt, warum ich immer wieder in dieselben Muster gefallen bin – und wie ich rauskomme.',
      rating: 5,
    },
    {
      name: 'Kai T.',
      text: 'Die Astrologie-Ausbildung ist absolut komplex und trotzdem so klar erklärt. Robert ist ein außergewöhnlicher Lehrer.',
      rating: 5,
    },
    {
      name: 'Lisa K.',
      text: 'Finde den Weg zu Dir selbst – das ist nicht nur ein Slogan, das ist was ich tatsächlich erlebt habe. Danke, Robert!',
      rating: 5,
    },
  ];

  const features = [
    { icon: Moon, title: 'Geburtshoroskop', desc: 'Entschlüssele deine Persönlichkeit, Potenziale und Lebensthemen.' },
    { icon: Star, title: 'Astrologie lernen', desc: 'Von Grundlagen bis zur professionellen Deutung – Schritt für Schritt.' },
    { icon: Sun, title: 'Tarot & Intuition', desc: 'Klarheit für deine wichtigsten Fragen durch Tarot-Legungen.' },
    { icon: Sparkles, title: 'Community', desc: 'Lerne gemeinsam mit Gleichgesinnten in einer aktiven Community.' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Cosmic Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1B1040] via-[#3D2A8A] to-[#F0E6C8] opacity-10" />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.35, 0.15], rotate: [0, 180, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute top-10 right-10 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#7B5FD4]/20 to-transparent blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-20 left-10 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#C9A84C]/15 to-transparent blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#7B5FD4]/20 to-[#C9A84C]/20 backdrop-blur-sm mb-6">
              <Star className="w-4 h-4 mr-2 text-[#C9A84C]" />
              <span className="text-sm text-[#7B5FD4] font-medium">Astrologie · Tarot · Ausbildung</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{fontFamily:'Cinzel,serif'}}>
              <span className="bg-gradient-to-r from-[#1B1040] via-[#7B5FD4] to-[#C9A84C] bg-clip-text text-transparent">
                Entdecke Dein
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#C9A84C] via-[#7B5FD4] to-[#1B1040] bg-clip-text text-transparent">
                Universum
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-4">
              Finde den Weg zu Dir selbst. Die Sterne warten auf Dich.
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              Mit Robert Wagner (@astrodaddy.official) – Astrologe, spiritueller Lebensberater und dein Guide durch die Weisheit der Sterne.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/angebote">
                <Button size="lg" className="bg-[#7B5FD4] hover:bg-[#7B5FD4]/90 text-white px-8 py-4 text-lg rounded-2xl">
                  <Star className="w-5 h-5 mr-2" />
                  Angebote entdecken
                </Button>
              </Link>
              <Link to="/ausbildung">
                <Button size="lg" variant="outline" className="border-[#7B5FD4] text-[#7B5FD4] hover:bg-[#7B5FD4]/10 px-8 py-4 text-lg rounded-2xl">
                  Zur Ausbildung
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-4 justify-center mt-10">
              {['5/5 Sterne auf Google', '100% Zufriedenheitsrate', 'TikTok & Instagram'].map(b => (
                <div key={b} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/40">
                  <CheckCircle className="w-4 h-4 text-[#7B5FD4]" />
                  <span className="text-sm font-medium">{b}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-white/30">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#1B1040] via-[#7B5FD4] to-[#C9A84C] bg-clip-text text-transparent">
                Was dich erwartet
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">Es gibt viel zu entschlüsseln. Gemeinsam decken wir dein Potenzial auf.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <GlassCard className="rounded-2xl p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7B5FD4]/20 to-[#C9A84C]/20 flex items-center justify-center mb-4">
                    <f.icon className="w-6 h-6 text-[#7B5FD4]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                  <p className="text-muted-foreground text-sm">{f.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Angebote */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#1B1040] via-[#7B5FD4] to-[#C9A84C] bg-clip-text text-transparent">
                Beliebteste Angebote
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <GlassCard className="rounded-2xl overflow-hidden h-full hover:shadow-xl transition-shadow">
                  <img src={p.image} alt={p.name} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    {p.badge && (
                      <span className="inline-block px-3 py-1 rounded-full bg-[#C9A84C]/20 text-[#C9A84C] text-xs font-semibold mb-3">{p.badge}</span>
                    )}
                    <h3 className="text-lg font-semibold mb-2">{p.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{p.shortDescription}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-[#7B5FD4]">{p.priceFormatted}</span>
                      <Link to={`/angebote/${p.id}`}>
                        <Button size="sm" className="bg-[#7B5FD4] hover:bg-[#7B5FD4]/90 text-white rounded-xl">
                          Details <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/angebote">
              <Button size="lg" variant="outline" className="border-[#7B5FD4] text-[#7B5FD4] hover:bg-[#7B5FD4]/10 rounded-2xl px-8">
                Alle Angebote ansehen <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-[#7B5FD4]/5">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#1B1040] via-[#7B5FD4] to-[#C9A84C] bg-clip-text text-transparent">
                Was unsere Klienten sagen
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <GlassCard className="rounded-2xl p-6 h-full">
                  <Quote className="w-8 h-8 text-[#C9A84C]/50 mb-4" />
                  <p className="text-foreground mb-4 italic">"{t.text}"</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{t.name}</span>
                    <div className="flex gap-1">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#C9A84C] text-[#C9A84C]" />
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <GlassCard className="rounded-3xl p-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Sparkles className="w-12 h-12 text-[#C9A84C] mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-[#7B5FD4] to-[#C9A84C] bg-clip-text text-transparent">
                  Bereit für deine Reise?
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Werde Teil der AstroDaddy-Community und entdecke, was die Sterne für dich bereithalten.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/community">
                  <Button size="lg" className="bg-[#7B5FD4] hover:bg-[#7B5FD4]/90 text-white px-8 rounded-2xl">
                    Community beitreten
                  </Button>
                </Link>
                <Link to="/login?tab=register">
                  <Button size="lg" variant="outline" className="border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C]/10 px-8 rounded-2xl">
                    Kostenlos registrieren
                  </Button>
                </Link>
              </div>
            </motion.div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
