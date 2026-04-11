import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { Video, Clock, Users, Check, Calendar, Sparkles, ChevronRight } from 'lucide-react';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function Webinar() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/send-webinar-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? 'Unbekannter Fehler');
      }

      setFormState('success');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Etwas ist schiefgelaufen.');
      setFormState('error');
    }
  };

  const highlights = [
    'Die 4 wichtigsten Longevity-Hebel, die du sofort umsetzen kannst',
    'Warum Inflammaging dein größter Feind ist – und wie du ihn stoppst',
    'Kraft & Bewegung: Der effektivste Hebel in jedem Alter',
    'Mentale Bestform: Wie du dein Gehirn bis ins hohe Alter fit hältst',
    'Live Q&A mit Markus Miersbe',
  ];

  const facts = [
    { icon: Clock, label: 'Dauer', value: '60 Minuten' },
    { icon: Video, label: 'Format', value: 'Online · Live' },
    { icon: Users, label: 'Plätze', value: 'Begrenzt' },
    { icon: Calendar, label: 'Kosten', value: 'Kostenlos' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-[#8268AB]/20 to-transparent blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/3 -left-40 w-[32rem] h-[32rem] rounded-full bg-gradient-to-br from-[#1b2a23]/20 to-transparent blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.45, 0.25], rotate: [0, -180, -360] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-40 right-1/4 w-[28rem] h-[28rem] rounded-full bg-gradient-to-br from-[#F9C4B5]/20 to-transparent blur-3xl"
        />
      </div>

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left: Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#8268AB]/20 to-[#BFADD5]/20 backdrop-blur-sm mb-6">
                <Sparkles className="w-4 h-4 mr-2 text-[#8268AB]" />
                <span className="text-sm font-medium text-[#8268AB]">Kostenloses Live-Webinar</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#1b2a23] via-[#8268AB] to-[#F9C4B5] bg-clip-text text-transparent">
                  Länger gesund
                </span>
                <br />
                <span className="text-[#1b2a23]">leben –</span>
                <br />
                <span className="bg-gradient-to-r from-[#8268AB] to-[#F9C4B5] bg-clip-text text-transparent">
                  die 4 Säulen
                </span>
                <br />
                <span className="text-[#1b2a23]">der Longevity</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Markus Miersbe zeigt dir live und kostenlos, mit welchen konkreten Maßnahmen
                du dein biologisches Alter senken und deine Gesundheit dauerhaft stärken kannst.
              </p>

              {/* Fact Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {facts.map(({ icon: Icon, label, value }) => (
                  <GlassCard key={label} className="rounded-2xl p-4 text-center">
                    <Icon className="w-5 h-5 text-[#8268AB] mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">{label}</p>
                    <p className="text-sm font-bold text-[#1b2a23]">{value}</p>
                  </GlassCard>
                ))}
              </div>

              {/* Highlights */}
              <ul className="space-y-3">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#8268AB]/20 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-[#8268AB]" />
                    </span>
                    <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right: Registration Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              id="anmeldung"
            >
              <GlassCard className="rounded-3xl p-8 md:p-10">
                {formState === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#8268AB] to-[#1b2a23] flex items-center justify-center mx-auto mb-6">
                      <Check className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#1b2a23] mb-3">Du bist dabei!</h2>
                    <p className="text-muted-foreground leading-relaxed mb-2">
                      Wir haben dir eine Bestätigungsmail mit dem Webinar-Link geschickt.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Bitte prüfe auch deinen Spam-Ordner, falls du keine E-Mail erhältst.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-[#1b2a23] mb-2">
                        Jetzt kostenlos anmelden
                      </h2>
                      <p className="text-muted-foreground text-sm">
                        Sichere dir deinen Platz – die Teilnehmerzahl ist begrenzt.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label htmlFor="webinar-name" className="block text-sm font-medium text-[#1b2a23] mb-2">
                          Dein Name
                        </label>
                        <input
                          id="webinar-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Vorname Nachname"
                          className="w-full px-4 py-3 rounded-xl border border-[#8268AB]/20 bg-white/60 backdrop-blur-sm text-[#1b2a23] placeholder-[#6b6b6b] focus:outline-none focus:ring-2 focus:ring-[#8268AB]/40 transition"
                        />
                      </div>

                      <div>
                        <label htmlFor="webinar-email" className="block text-sm font-medium text-[#1b2a23] mb-2">
                          Deine E-Mail-Adresse
                        </label>
                        <input
                          id="webinar-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="deine@email.de"
                          className="w-full px-4 py-3 rounded-xl border border-[#8268AB]/20 bg-white/60 backdrop-blur-sm text-[#1b2a23] placeholder-[#6b6b6b] focus:outline-none focus:ring-2 focus:ring-[#8268AB]/40 transition"
                        />
                      </div>

                      {formState === 'error' && (
                        <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">
                          {errorMessage}
                        </p>
                      )}

                      <Button
                        type="submit"
                        size="lg"
                        disabled={formState === 'loading'}
                        className="w-full bg-gradient-to-r from-[#8268AB] to-[#1b2a23] hover:opacity-90 text-white font-semibold py-4 rounded-xl transition-all"
                      >
                        {formState === 'loading' ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            Wird angemeldet…
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            Kostenlos anmelden
                            <ChevronRight className="w-5 h-5" />
                          </span>
                        )}
                      </Button>

                      <p className="text-xs text-center text-muted-foreground leading-relaxed">
                        Mit der Anmeldung stimmst du zu, dass wir dir die Webinar-Zugangsdaten per E-Mail schicken.
                        Kein Spam, keine Weitergabe deiner Daten.
                      </p>
                    </form>
                  </>
                )}
              </GlassCard>

              {/* Speaker Teaser */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-4"
              >
                <GlassCard className="rounded-2xl p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8268AB] to-[#1b2a23] flex-shrink-0 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">M</span>
                  </div>
                  <div>
                    <p className="font-bold text-[#1b2a23] text-sm">Markus Miersbe</p>
                    <p className="text-xs text-muted-foreground">Longevity-Experte · 15+ Jahre Erfahrung</p>
                  </div>
                </GlassCard>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
