import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { StarField } from '../components/StarField';
import {
  Star, CheckCircle, XCircle, ArrowRight, Moon, Sparkles,
  Users, BookOpen, Zap, MessageCircle, ChevronDown, Percent,
  Brain, Heart, Sun, Home, Share2, Infinity as InfinityIcon,
  Orbit, Quote, CircleDot,
} from 'lucide-react';
import { NewsletterSignup } from '../components/NewsletterSignup';

// ── Helpers ───────────────────────────────────────────────────────────────────

function WaveDivider({ fromColor, toColor }: { fromColor: string; toColor: string }) {
  return (
    <div className="relative h-12 overflow-hidden" style={{ background: fromColor }}>
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

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/8">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left text-[#F0E6C8] hover:text-[#C9A84C] transition-colors">
        <span className="text-sm font-medium pr-4">{q}</span>
        <ChevronDown className={`w-4 h-4 shrink-0 text-[#7B5FD4] transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
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

// ── Data ──────────────────────────────────────────────────────────────────────

// SEKTION 3 — Was du als Mitglied bekommst
const features = [
  { icon: Zap,           title: 'Wöchentliche Inspirations-Impulse', desc: 'Jede Woche ein neuer Video-Impuls (ca. 90–120 Min.) zu einem astrologischen Thema. In voller Tiefe, in ruhigem Tempo. Jederzeit in der wachsenden Bibliothek abrufbar — du kannst jederzeit einsteigen.' },
  { icon: BookOpen,      title: 'Die wachsende E-Book-Bibliothek',   desc: 'Vertiefende E-Books zu zentralen Themen der psychologischen Astrologie — Chiron, Mondknoten, die Häuser, die Planeten als psychische Kräfte. Ständig wachsend.' },
  { icon: Moon,          title: 'Live-Treffen zu Voll- & Neumond',   desc: 'Zweimal im Monat treffen wir uns live im virtuellen Raum. Keine Vorlesungen — gemeinsame Reflexionsräume rund um die aktuellen Himmels-Bewegungen.' },
  { icon: MessageCircle, title: 'Monatliche offene Community-Runden', desc: 'Einmal im Monat ein offener Treffpunkt für Fragen, Austausch, Begegnung. Hier wird gelacht, geschwiegen, gestaunt, geteilt.' },
  { icon: Users,         title: 'Der Community-Bereich',             desc: 'Ein geschützter Raum nur für Mitglieder. Stelle Fragen, teile Erfahrungen, triff Menschen auf deiner Wellenlänge. Es gibt keine dummen Fragen.' },
  { icon: Percent,       title: '35 % Rabatt auf alle Angebote',     desc: 'Auf alles, was Robert darüber hinaus anbietet — Tiefenanalysen, Jahreshoroskope, Partneranalysen — bekommst du als Mitglied dauerhaft 35 % Rabatt.' },
];

// SEKTION 4 — Die Themen, die du entdecken wirst
const topics = [
  { icon: Sparkles,     title: 'Die zwölf Tierkreiszeichen',  desc: 'Als archetypische Energien — nicht als Schubladen.' },
  { icon: Home,         title: 'Die zwölf Häuser',            desc: 'Die Bühnen deines Lebens im Geburtshoroskop.' },
  { icon: Orbit,        title: 'Die Planeten',                desc: 'Als psychische Kräfte in dir — von Sonne und Mond bis zu den Generationsplaneten.' },
  { icon: Share2,       title: 'Aspekte & Konstellationen',   desc: 'Wie deine inneren Energien miteinander reden — oder streiten.' },
  { icon: Moon,         title: 'Chiron, Lilith & Co.',        desc: 'Die feineren Energien und ihre tiefenpsychologische Bedeutung.' },
  { icon: CircleDot,    title: 'Transit-Impulse',             desc: 'Die aktuellen Himmelsbewegungen als Anlass zur Selbstreflexion.' },
  { icon: Sun,          title: 'Solar-Impulse',               desc: 'Reflexionsräume über deine persönlichen Jahresphasen.' },
  { icon: InfinityIcon, title: 'Karmische Perspektiven',      desc: 'Die Mondknoten-Achse als Sprache wiederkehrender Lebensthemen.' },
  { icon: Heart,        title: 'Synastrie-Impulse',           desc: 'Astrologie als Sprache zwischenmenschlicher Reflexion.' },
];

// SEKTION 5 — So fliesst das Universum
const rhythm = [
  { when: 'Jede Woche',       text: 'Ein neuer Themen-Impuls. Du entscheidest, ob und wann du ihn anschaust.' },
  { when: 'Bei Vollmond',     text: 'Ein gemeinsames Live-Treffen. Was geht gerade auf? Was wird sichtbar?' },
  { when: 'Bei Neumond',      text: 'Ein gemeinsames Live-Treffen. Was darf neu beginnen? Welche Saat legst du?' },
  { when: 'Einmal im Monat',  text: 'Die offene Community-Runde. Locker. Ungezwungen. Begegnung.' },
  { when: 'Jederzeit',        text: 'Die Bibliothek, der Community-Bereich und die Verbindung zu Menschen, die dich verstehen.' },
];

// SEKTION 6 — Für wen
const forYou = [
  'Du Astrologie nicht oberflächlich, sondern in der Tiefe entdecken möchtest',
  'Du dich mit psychologischer Astrologie nach C.G. Jung verbinden willst — Archetypen, Schatten, Individuation',
  'Du nach Gleichgesinnten suchst, die das Thema genauso ernst nehmen wie du',
  'Du dich selbst besser verstehen und reflektieren willst',
  'Du in deinem eigenen Tempo arbeiten möchtest — ohne Prüfungsdruck',
  'Du Wert auf deutschsprachige Tiefe legst statt englischer Oberflächlichkeit',
  'Du bereit bist, dich auf eine wachsende Reise einzulassen — nicht auf einen Schnellkurs',
];
const notForYou = [
  'Du eine staatlich anerkannte Berufsausbildung als Astrolog:in suchst',
  'Du Wahrsagerei, Voraussagen oder „Schicksalslesungen" erwartest',
  'Du eine Therapie ersetzt haben willst (das kann und darf Astrologie nicht)',
  'Du eine Erleuchtungs-Maschine oder Heilversprechen suchst',
  'Du nicht bereit bist, dich selbst zu hinterfragen',
  'Du eine schnelle Antwort auf eine konkrete Lebensfrage erwartest',
];

// SEKTION 9 — Was du erwarten kannst. Und was nicht.
const youGet = [
  'Tiefes, hochwertiges Inspirationsmaterial zur psychologischen Astrologie',
  'Einen Reflexionsraum für deine eigene Selbsterkundung',
  'Eine deutschsprachige Community mit Niveau und Tiefe',
  'Regelmäßige Impulse, die dich Wochen und Monate begleiten',
  'Live-Begegnungen mit Menschen, die das Thema ernst nehmen',
  'Roberts persönlichen Einsatz für einen wachsenden, lebendigen Raum',
];
const youDontGet = [
  'Erleuchtung, Heilung oder garantierte Lebensveränderung',
  'Beruflichen Erfolg, finanzielle Versprechen, Wunder',
  'Diagnosen jeglicher Art (medizinisch, psychisch, beziehungsbezogen)',
  'Ein staatlich anerkanntes Zertifikat oder eine Berufsqualifikation',
  'Den Ersatz für Therapie, Arzt oder professionelle Beratung',
  '„Geheimwissen", das dir endlich alle deine Probleme löst',
];

// SEKTION 10 — FAQ
const faqData = [
  { q: 'Was ist die Astroversity Academy genau?', a: 'Eine deutschsprachige Online-Community auf der Plattform Skool zur persönlichen Freizeitgestaltung und Selbsterkundung im Bereich der psychologischen Astrologie nach C.G. Jung. Sie ist als Hobby-Lehrgang bei der Zentralstelle für Fernunterricht (ZFU) registriert.' },
  { q: 'Ist die Astroversity Academy eine Astrologie-Schule?', a: 'Ja — im Sinne einer wachsenden Lern- und Erfahrungsgemeinschaft, einer lebendigen Tradition der psychologischen Astrologie. Nein — wenn du damit eine staatlich anerkannte Bildungseinrichtung mit Diplomabschluss meinst. Sie ist ein Raum für deine persönliche Selbsterkenntnis-Reise, nicht für deine Berufsausbildung.' },
  { q: 'Brauche ich astrologische Vorkenntnisse?', a: 'Nein. Die Academy ist offen für absolute Einsteiger genauso wie für Fortgeschrittene. Die Inhalte sind so aufgebaut, dass du sie ohne Vorkenntnisse verstehst, aber auch in der Tiefe nutzen kannst, wenn du schon weiter bist.' },
  { q: 'Wie viel Zeit muss ich investieren?', a: 'So viel oder so wenig du willst. Die wöchentlichen Impulse sind 90–120 Minuten lang. Du kannst sie schauen oder liegen lassen. Die Live-Treffen sind freiwillig. Es gibt keine Pflichten, keine Aufgaben, keine Tests.' },
  { q: 'Wann starten die Inhalte?', a: 'Sobald du beigetreten bist, hast du sofortigen Zugang zur bestehenden Bibliothek. Jede Woche kommt ein neuer Impuls dazu. Die Live-Treffen finden zu jedem Vollmond und Neumond statt.' },
  { q: 'Bekomme ich am Ende ein Zertifikat?', a: 'Nein. Die Astroversity Academy ist bewusst keine Ausbildung und keine Zertifizierungsstelle. Sie ist ein Raum zur persönlichen Bereicherung — nicht zur beruflichen Qualifikation.' },
  { q: 'Kann ich auch als Profi-Astrolog:in Mitglied werden?', a: 'Selbstverständlich. Allerdings ist die Mitgliedschaft auf persönliche Selbsterkundung und Freizeitgestaltung ausgelegt, nicht auf berufliche Weiterbildung. Fachlichen Austausch findest du im Community-Bereich — aber das ist kein zertifizierter Austausch.' },
  { q: 'Kann ich jederzeit kündigen?', a: 'Ja. Die Mitgliedschaft ist monatlich kündbar — du kannst zum Ende des laufenden Abrechnungsmonats raus. Außerdem gilt das gesetzliche 14-tägige Widerrufsrecht ab Vertragsschluss.' },
  { q: 'Was, wenn die Academy nicht das ist, was ich dachte?', a: 'Dann kündigst du innerhalb der ersten 14 Tage über das Widerrufsrecht und bekommst alles zurück. Oder du nutzt die monatliche Kündigung. Kein Risiko, kein Vertrag, der dich hält.' },
  { q: 'Wie viele Mitglieder werden in der Community sein?', a: 'Das wächst Schritt für Schritt. Es soll bewusst eine überschaubare, vertrauensvolle Community werden — kein anonymes Massengebilde mit 10.000 Mitgliedern. Qualität geht vor Quantität.' },
  { q: 'Ersetzt die Mitgliedschaft eine Therapie?', a: 'Nein. Ausdrücklich nicht. Die Academy ist eine Inspirations-Community zur persönlichen Selbsterkundung. Sie ersetzt keine ärztliche, psychotherapeutische, heilpraktische, juristische oder finanzielle Beratung. Bei seelischen oder gesundheitlichen Anliegen wende dich bitte an entsprechend qualifizierte Fachpersonen.' },
  { q: 'Wie kann ich bezahlen?', a: 'Die Abrechnung läuft direkt über die Plattform Skool — sicher per Kreditkarte oder PayPal, im monatlichen Einzug. Du kannst jederzeit kündigen.' },
];

// ── Sticky scroll "Was du als Mitglied bekommst" ──────────────────────────────

function WasBekommstSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const cardsY = useTransform(scrollYProgress, [0, 1], ['60px', '-1060px']);

  return (
    <section ref={sectionRef} style={{ height: '340vh' }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#1B1040] flex">
        {/* LEFT */}
        <div className="relative flex-1 flex items-center justify-center overflow-hidden pl-4">
          <div className="relative w-[90%] max-w-[680px]" style={{ marginLeft: '-200px' }}>
            <img
              src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&q=80"
              alt=""
              className="w-full select-none pointer-events-none rounded-full"
              style={{ filter: 'saturate(1.2) brightness(0.7) drop-shadow(0 16px 60px rgba(0,0,0,0.8))', mixBlendMode: 'screen' }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.9, delay: 0.4 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A84C]/30 text-[#C9A84C]/80 text-xs tracking-widest uppercase mb-3"
                style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>
                Dein Zugang zum Universum
              </div>
              <h2 className="text-4xl lg:text-5xl text-[#F0E6C8] leading-tight"
                style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400, textShadow: '0 4px 32px rgba(0,0,0,0.9)' }}>
                Was du als<br />Mitglied bekommst
              </h2>
              <p className="text-white text-base leading-relaxed max-w-[240px] mt-3"
                style={{ textShadow: '0 2px 16px rgba(0,0,0,0.9)' }}>
                Alles in deinem Tempo, nach deinen Regeln.
              </p>
            </motion.div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative w-[360px] flex-shrink-0 mr-28 lg:mr-36 overflow-hidden" style={{ zIndex: 3 }}>
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#1B1040] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#1B1040] to-transparent z-10 pointer-events-none" />
          <motion.div className="flex flex-col gap-5 pl-2 pr-2" style={{ y: cardsY }}>
            {features.map((f, i) => (
              <div key={i} className="flex-shrink-0">
                <GlassCard className="rounded-xl overflow-hidden border-white/8">
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-[#3D2A8A]/60 border border-[#7B5FD4]/25 flex items-center justify-center mb-4">
                      <f.icon className="w-6 h-6 text-[#C9A84C]" />
                    </div>
                    <h3 className="text-[#F0E6C8] font-semibold text-lg mb-2">{f.title}</h3>
                    <p className="text-[#F0E6C8]/50 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </GlassCard>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Reusable section heading ───────────────────────────────────────────────────

function SectionBadge({ children, tone = 'gold' }: { children: React.ReactNode; tone?: 'gold' | 'light' }) {
  const cls = tone === 'gold'
    ? 'border-[#C9A84C]/30 text-[#C9A84C]/80'
    : 'border-white/20 text-[#F0E6C8]/60';
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${cls} text-xs tracking-widest uppercase mb-6`}
      style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>
      {children}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Astroversity() {
  return (
    <div className="min-h-screen bg-[#1B1040]">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#1B1040]">
        <StarField />
        <FloatingOrbs />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-28 pb-20 text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9A84C]/30 text-[#C9A84C] text-xs tracking-widest uppercase mb-8"
              style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>
              <Star className="w-3 h-3 fill-current" /> Founding-Member-Eröffnung
            </div>
          </motion.div>

          <div className="mb-4">
            <motion.h1
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center">
              <img src="/astroversity-logo.svg" alt="Astroversity Academy"
                className="w-full max-w-[320px] sm:max-w-[440px] h-auto" />
            </motion.h1>
          </div>

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.6 }}
            className="text-xl sm:text-2xl text-[#C9A84C] mb-7 leading-snug"
            style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>
            Deine Lernplattform für psychologische<br className="hidden sm:block" /> Astrologie nach C.G. Jung.
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }}
            className="text-base sm:text-lg text-[#F0E6C8]/55 max-w-2xl mx-auto mb-10 leading-relaxed">
            Eine deutschsprachige Online-Community für alle, die Astrologie als Reise der reinen Selbsterkenntnis entdecken möchten — nicht als Ausbildung, nicht als Berufsqualifikation. Im eigenen Tempo. Im eigenen Rhythmus. Ohne Druck, ohne Prüfung, ohne Lernkontrolle.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.6 }}
            className="flex flex-col items-center gap-3">
            <a href="https://www.skool.com/astroversity-academy" target="_blank" rel="noopener noreferrer">
              <Button variant="gold" size="lg" className="px-10">
                Jetzt Founding Member werden — 50 €/Monat <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            <div className="text-[#F0E6C8]/40 text-xs">
              Nur die ersten 50 Plätze · Dauerhafter Preis · Monatlich kündbar
            </div>
          </motion.div>
        </div>
      </section>

      <WaveDivider fromColor="#1B1040" toColor="#3D2A8A" />

      {/* ── SEKTION 1 — DAS PROBLEM ───────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#3D2A8A]">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12">
            <SectionBadge tone="light">Vielleicht kennst du das</SectionBadge>
            <h2 className="text-4xl text-[#F0E6C8]" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>
              Du wolltest tiefer.<br className="hidden sm:block" /> Aber wo?
            </h2>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="space-y-5 text-[#F0E6C8]/75 leading-relaxed">
            <p>
              Du hast irgendwann mit Astrologie angefangen. Vielleicht über eine App. Vielleicht durch ein Buch — Liz Greene, Hajo Banzhaf, Peter Orban. Vielleicht durch dein eigenes Geburtshoroskop, das dich auf einmal nicht mehr losließ.
            </p>
            <p className="text-[#F0E6C8]">
              Und dann hast du gemerkt: <span className="text-[#C9A84C] font-medium">Da ist mehr.</span>
            </p>
            <p>
              Mehr als „Wassermann steht heute auf Erfolg." Mehr als die immer gleichen Tageshoroskope. Mehr als das, was in Frauenzeitschriften unter „Sterne" zu finden ist.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
            {[
              'Bücher sind langsam und stehen nach dem Lesen im Regal.',
              'YouTube-Kanäle springen von einem Thema zum nächsten, ohne Tiefe.',
              'Klassische Astrologie-Ausbildungen kosten oft vierstellig und dauern Jahre — und am Ende stehst du wieder allein mit deinen Fragen.',
              'Esoterik-Gruppen bei Facebook? Selten das Niveau, das du dir wünschst.',
            ].map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <GlassCard className="rounded-xl p-5 border-white/8 h-full">
                  <p className="text-[#F0E6C8]/65 text-sm leading-relaxed">{t}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-center">
            <p className="text-2xl text-[#F0E6C8] mb-3" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>
              Was dir wirklich fehlt, ist ein Raum.
            </p>
            <p className="text-[#F0E6C8]/55 max-w-xl mx-auto leading-relaxed text-sm">
              Ein Raum, in dem Astrologie ernst genommen wird. In dem du nicht erklären musst, warum dich das überhaupt interessiert. In dem du Woche für Woche tiefer gehst — gemeinsam mit Menschen, die genauso brennen wie du.
            </p>
          </motion.div>
        </div>
      </section>

      <WaveDivider fromColor="#3D2A8A" toColor="#1B1040" />

      {/* ── SEKTION 2 — DIE LÖSUNG / VISION ───────────────────────────────── */}
      <section className="py-24 px-6 bg-[#1B1040] relative overflow-hidden">
        <FloatingOrbs />
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12">
            <SectionBadge>Die Lösung</SectionBadge>
            <h2 className="text-4xl text-[#F0E6C8]" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>
              Sie ist keine Schule.<br className="hidden sm:block" /> Sie ist ein <span className="text-[#C9A84C]">Universum.</span>
            </h2>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="space-y-5 text-[#F0E6C8]/75 leading-relaxed">
            <p>
              Die Astroversity Academy ist Roberts Online-Schule für psychologische Astrologie — verstanden als wachsende Lern- und Erfahrungsgemeinschaft, als lebendige Tradition der Selbsterkenntnis. Sie ist ausdrücklich <span className="text-[#F0E6C8]">keine staatliche Bildungseinrichtung</span>, keine berufsqualifizierende Ausbildung und kein Lehrgang mit Lernerfolgskontrolle. Keine Prüfungen. Keine Zertifizierung. Kein Kurs mit Anfang und Ende.
            </p>
            <p>
              Stattdessen: ein wachsendes Inspirations-Material — Videos, E-Books, Live-Reflexionsräume — kombiniert mit einer lebendigen deutschsprachigen Community, die Astrologie als das versteht, was sie eigentlich ist: <span className="text-[#C9A84C]">eine Sprache.</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-10">
            {[
              'Eine Sprache der Selbstreflexion',
              'Ein Werkzeug der Selbsterkundung',
              'Ein Spiegel deiner Seele',
            ].map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <GlassCard className="rounded-xl p-5 border-[#7B5FD4]/20 h-full text-center">
                  <p className="text-[#F0E6C8]/70 text-sm leading-relaxed">{t}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-center">
            <p className="text-2xl text-[#F0E6C8] leading-snug" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>
              Du trittst nicht in eine Schule ein.<br />
              <span className="text-[#C9A84C]">Du trittst in einen Raum ein.</span>
            </p>
            <p className="text-[#F0E6C8]/50 max-w-xl mx-auto leading-relaxed text-sm mt-4">
              Einen Raum, in dem du wachsen darfst — ohne Lerndruck, ohne Prüfung, ohne den Zwang, „etwas zu werden". Einfach, weil dich das Thema bewegt. Weil du dich selbst tiefer verstehen willst.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SEKTION 3 — WAS DU ALS MITGLIED BEKOMMST (sticky scroll) ──────── */}
      <WasBekommstSection />

      <WaveDivider fromColor="#1B1040" toColor="#3D2A8A" />

      {/* ── SEKTION 4 — DIE THEMEN ────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#3D2A8A]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14">
            <SectionBadge tone="light">Deine Themenwelt</SectionBadge>
            <h2 className="text-4xl text-[#F0E6C8] mb-4" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>
              Ein Universum heißt nicht<br className="hidden sm:block" /> umsonst Universum.
            </h2>
            <p className="text-[#F0E6C8]/55 max-w-2xl mx-auto leading-relaxed text-sm">
              Die Inhalte sind als Inspirationsmaterial konzipiert. Keine vorgegebene Reihenfolge. Du pickst dir heraus, was dich gerade ruft. Manche Themen wirst du dreimal durcharbeiten. Andere lässt du liegen. Das ist okay.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topics.map((t, i) => (
              <motion.div key={t.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <GlassCard className="rounded-xl p-6 border-white/10 h-full group hover:border-[#C9A84C]/25 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-[#C9A84C]/12 border border-[#C9A84C]/20 flex items-center justify-center mb-4">
                    <t.icon className="w-5 h-5 text-[#C9A84C]" />
                  </div>
                  <h3 className="text-[#F0E6C8] font-semibold mb-1.5">{t.title}</h3>
                  <p className="text-[#F0E6C8]/50 text-sm leading-relaxed">{t.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.4 }} className="text-center text-[#F0E6C8]/45 text-sm mt-10 italic max-w-xl mx-auto">
            Das ist es, was ein Universum tut: Es zeigt sich dir, Stück für Stück.
          </motion.p>
        </div>
      </section>

      <WaveDivider fromColor="#3D2A8A" toColor="#1B1040" />

      {/* ── SEKTION 5 — SO FLIESST DAS UNIVERSUM ──────────────────────────── */}
      <section className="py-24 px-6 bg-[#1B1040]">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14">
            <SectionBadge>Der Rhythmus</SectionBadge>
            <h2 className="text-4xl text-[#F0E6C8] mb-4" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>
              So fließt das Universum.
            </h2>
            <p className="text-[#F0E6C8]/55 max-w-xl mx-auto leading-relaxed text-sm">
              Die Academy ist kein „Kurs", den du abarbeitest. Sie hat einen Atem — einen Rhythmus, der den Bewegungen am Himmel folgt.
            </p>
          </motion.div>

          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-[#C9A84C]/40 via-[#7B5FD4]/30 to-transparent" />
            <div className="space-y-6">
              {rhythm.map((r, i) => (
                <motion.div key={r.when} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="relative pl-9">
                  <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full bg-[#1B1040] border-2 border-[#C9A84C]" />
                  <div className="text-[#C9A84C] text-sm font-semibold mb-0.5">{r.when}</div>
                  <p className="text-[#F0E6C8]/65 text-sm leading-relaxed">{r.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-center text-[#F0E6C8]/45 text-sm mt-12 max-w-xl mx-auto leading-relaxed">
            Und das alles ohne Druck. Ohne Anwesenheitspflicht. Ohne „Hausaufgaben". Wenn du sechs Wochen nicht da bist, sind die Inhalte trotzdem da, wenn du zurückkommst.
          </motion.p>
        </div>
      </section>

      <WaveDivider fromColor="#1B1040" toColor="#3D2A8A" />

      {/* ── SEKTION 6 — FÜR WEN ───────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#3D2A8A]">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14">
            <SectionBadge tone="light">Für wen das gedacht ist</SectionBadge>
            <h2 className="text-4xl text-[#F0E6C8]" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>
              Ist das hier dein Ort?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Für dich */}
            <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <GlassCard className="rounded-2xl p-7 border-[#6BBF8A]/25 h-full" style={{ background: 'rgba(107,191,138,0.06)' }}>
                <div className="flex items-center gap-2 mb-5">
                  <CheckCircle className="w-5 h-5 text-[#6BBF8A]" />
                  <h3 className="text-[#F0E6C8] font-semibold">Für dich, wenn …</h3>
                </div>
                <ul className="space-y-3">
                  {forYou.map(t => (
                    <li key={t} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle className="w-4 h-4 shrink-0 text-[#6BBF8A] mt-0.5" />
                      <span className="text-[#F0E6C8]/70 leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>

            {/* Nicht für dich */}
            <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <GlassCard className="rounded-2xl p-7 border-[#D4796B]/25 h-full" style={{ background: 'rgba(212,121,107,0.06)' }}>
                <div className="flex items-center gap-2 mb-5">
                  <XCircle className="w-5 h-5 text-[#D4796B]" />
                  <h3 className="text-[#F0E6C8] font-semibold">Nicht für dich, wenn …</h3>
                </div>
                <ul className="space-y-3">
                  {notForYou.map(t => (
                    <li key={t} className="flex items-start gap-2.5 text-sm">
                      <XCircle className="w-4 h-4 shrink-0 text-[#D4796B] mt-0.5" />
                      <span className="text-[#F0E6C8]/60 leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          </div>

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-center text-[#C9A84C] text-sm mt-8" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>
            Wenn du in der ersten Liste mehrmals genickt hast — willkommen.
          </motion.p>
        </div>
      </section>

      <WaveDivider fromColor="#3D2A8A" toColor="#1B1040" />

      {/* ── SEKTION 7 — WER ICH BIN ───────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#1B1040]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14">
            <SectionBadge>Wer ich bin</SectionBadge>
            <h2 className="text-4xl text-[#F0E6C8]" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>
              Hallo, ich bin Robert.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="relative rounded-2xl overflow-hidden border border-white/15 aspect-[4/5] max-w-sm mx-auto">
                <img src="/robert-links.png" alt="Robert Wagner" className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B1040]/80 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <GlassCard className="rounded-lg p-4 border-white/15">
                    <div className="text-[#C9A84C] text-xs tracking-widest uppercase mb-0.5"
                      style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>
                      Robert Wagner
                    </div>
                    <div className="text-[#F0E6C8] text-sm font-medium">Astrologe & spiritueller Lebensberater</div>
                  </GlassCard>
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="space-y-5">
              <p className="text-[#F0E6C8]/75 leading-relaxed">
                Ich bin Robert Wagner. Seit über fünf Jahren beschäftige ich mich intensiv mit psychologischer Astrologie in der Tradition von C.G. Jung, Liz Greene und der Tiefenpsychologie. Über <span className="text-[#C9A84C]">1.000 Horoskop-Gespräche</span> habe ich in dieser Zeit geführt — privat, im Coaching, in der Beratung.
              </p>
              <p className="text-[#F0E6C8]/75 leading-relaxed">
                Astrologie ist für mich kein Aberglaube und keine Wahrsagerei. Sie ist eine alte, präzise Symbolsprache — eine Sprache, die uns hilft, uns selbst zu verstehen. Unsere inneren Konflikte. Unsere Stärken. Unsere blinden Flecken. Unsere wiederkehrenden Muster.
              </p>
              <p className="text-[#F0E6C8]/75 leading-relaxed">
                Die Astroversity Academy ist mein Versuch, das, was ich seit Jahren in Einzelgesprächen weitergebe, in einen größeren Raum zu öffnen — zu einem Preis, der Astrologie der Tiefe für viele bezahlbar macht. Ohne esoterischen Kitsch. Ohne Erleuchtungsversprechen. Mit dem Respekt davor, dass du der Experte deines eigenen Lebens bist.
              </p>

              {/* Quote */}
              <div className="border-l-2 border-[#C9A84C]/50 pl-5 py-1">
                <p className="text-[#C9A84C] leading-relaxed" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400, fontSize: '1.15rem' }}>
                  „Ich bin nicht dein Guru. Ich bin dein Begleiter."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <WaveDivider fromColor="#1B1040" toColor="#C9A84C" />

      {/* ── SEKTION 8 — FOUNDING-MEMBER-ANGEBOT ──────────────────────────── */}
      <section className="py-24 px-6 bg-[#C9A84C]">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B1040] text-[#C9A84C] text-xs tracking-widest uppercase mb-6"
              style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>
              🔥 Nur 50 Plätze
            </div>
            <h2 className="text-4xl text-[#1B1040] mb-4" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>
              Die ersten 50 Mitglieder.
            </h2>
            <p className="text-[#1B1040]/70 max-w-2xl mx-auto leading-relaxed">
              Ein Angebot, das es so nie wieder geben wird. Werde einer der 50 Founding Member — der Menschen, die diesen Raum von Anfang an mit prägen.
            </p>
          </motion.div>

          {/* Price card */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-[#1B1040] rounded-2xl p-8 sm:p-10 mb-8">
            <div className="text-center mb-8">
              <div className="text-[#F0E6C8]/50 text-xs tracking-widest uppercase mb-2"
                style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>Founding-Member-Preis</div>
              <div className="text-[#C9A84C] text-6xl font-bold mb-1" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>
                50 €<span className="text-2xl font-normal text-[#F0E6C8]/50">/Monat</span>
              </div>
              <p className="text-[#F0E6C8]/55 text-sm max-w-md mx-auto leading-relaxed mt-3">
                Dauerhaft. Nicht „für die ersten drei Monate". Solange du Mitglied bleibst, bleibt dein Preis bei 50 € — auch wenn die Academy später auf 69 €, 89 € oder 99 € steigt.
              </p>
              <p className="text-[#F0E6C8]/35 text-xs mt-3">
                Ab Mitglied Nr. 51 zahlt jedes neue Mitglied regulär 69 € / Monat.
              </p>
            </div>

            {/* Price comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              {[
                { label: 'Private Einzelberatung', price: '150–250 €' },
                { label: 'Einzelner Workshop', price: '80–150 €' },
                { label: 'Klassische Ausbildung', price: 'mehrere 1.000 €' },
              ].map(c => (
                <div key={c.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-[#F0E6C8]/45 text-xs mb-1">{c.label}</div>
                  <div className="text-[#F0E6C8]/80 text-sm line-through decoration-[#D4796B]/60">{c.price}</div>
                </div>
              ))}
            </div>
            <p className="text-center text-[#F0E6C8]/55 text-sm mb-8 leading-relaxed">
              Mit der Mitgliedschaft bekommst du jede Woche einen tiefen Themen-Impuls, zwei Live-Treffen pro Monat, eine wachsende Bibliothek und 35 % Rabatt auf alle weiteren Angebote — <span className="text-[#C9A84C]">für weniger, als eine einzige Einzelberatung kostet.</span>
            </p>

            {/* Founding extras */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {[
                'Den dauerhaften Preis von 50 € (statt 69 €)',
                'Direkte Mitgestaltung — deine Themenwünsche zählen extra',
                'Den Founding-Member-Status sichtbar in der Community',
                'Die Gewissheit, von Anfang an dabei zu sein',
              ].map(t => (
                <div key={t} className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 shrink-0 text-[#C9A84C] mt-0.5" />
                  <span className="text-[#F0E6C8]/75 text-sm leading-relaxed">{t}</span>
                </div>
              ))}
            </div>

            <a href="https://www.skool.com/astroversity-academy" target="_blank" rel="noopener noreferrer"
              className="block w-full py-4 rounded-xl bg-[#C9A84C] text-[#1B1040] font-semibold text-center hover:bg-[#d4b455] transition-colors">
              Jetzt Founding Member werden — 50 €/Monat →
            </a>
            <p className="text-[#F0E6C8]/40 text-xs text-center mt-4">
              Monatlich kündbar · 14 Tage Widerrufsrecht · Kein Risiko, kein Vertrag, der dich bindet
            </p>
          </motion.div>
        </div>
      </section>

      <WaveDivider fromColor="#C9A84C" toColor="#1B1040" />

      {/* ── SEKTION 9 — WAS DU ERWARTEN KANNST. UND WAS NICHT. ────────────── */}
      <section className="py-24 px-6 bg-[#1B1040]">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14">
            <SectionBadge>Klartext</SectionBadge>
            <h2 className="text-4xl text-[#F0E6C8] mb-4" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>
              Was du erwarten kannst.<br className="hidden sm:block" /> Und was nicht.
            </h2>
            <p className="text-[#F0E6C8]/45 max-w-lg mx-auto text-sm">
              Damit du klar siehst, worauf du dich einlässt.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <GlassCard className="rounded-2xl p-7 border-[#6BBF8A]/25 h-full" style={{ background: 'rgba(107,191,138,0.06)' }}>
                <div className="flex items-center gap-2 mb-5">
                  <CheckCircle className="w-5 h-5 text-[#6BBF8A]" />
                  <h3 className="text-[#F0E6C8] font-semibold">Was du bekommst</h3>
                </div>
                <ul className="space-y-3">
                  {youGet.map(t => (
                    <li key={t} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle className="w-4 h-4 shrink-0 text-[#6BBF8A] mt-0.5" />
                      <span className="text-[#F0E6C8]/70 leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <GlassCard className="rounded-2xl p-7 border-[#D4796B]/25 h-full" style={{ background: 'rgba(212,121,107,0.06)' }}>
                <div className="flex items-center gap-2 mb-5">
                  <XCircle className="w-5 h-5 text-[#D4796B]" />
                  <h3 className="text-[#F0E6C8] font-semibold">Was du nicht bekommst</h3>
                </div>
                <ul className="space-y-3">
                  {youDontGet.map(t => (
                    <li key={t} className="flex items-start gap-2.5 text-sm">
                      <XCircle className="w-4 h-4 shrink-0 text-[#D4796B] mt-0.5" />
                      <span className="text-[#F0E6C8]/60 leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-8">
            <GlassCard className="rounded-xl p-6 border-[#7B5FD4]/20 text-center max-w-2xl mx-auto">
              <Quote className="w-5 h-5 text-[#C9A84C]/50 mx-auto mb-3" />
              <p className="text-[#F0E6C8]/70 text-sm leading-relaxed">
                Astrologie ist kein Heilmittel. Sie ist eine Sprache. Eine sehr alte, sehr präzise Sprache. <span className="text-[#C9A84C]">Was du daraus machst, ist deine Reise.</span>
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      <WaveDivider fromColor="#1B1040" toColor="#3D2A8A" />

      {/* ── SEKTION 10 — FAQ ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#3D2A8A]">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12">
            <SectionBadge tone="light">Häufige Fragen</SectionBadge>
            <h2 className="text-4xl text-[#F0E6C8]" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>
              Was du wissen willst.
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <GlassCard className="rounded-xl px-7 border-white/8">
              {faqData.map(item => <FaqItem key={item.q} {...item} />)}
            </GlassCard>
          </motion.div>
        </div>
      </section>

      <WaveDivider fromColor="#3D2A8A" toColor="#1B1040" />

      {/* ── NEWSLETTER ───────────────────────────────────────────────────── */}
      <NewsletterSignup
        headline="Noch unentschlossen? Bleib im kosmischen Fluss."
        subline="Erhalte kostenlose Astro-Impulse, Mondphasen-Updates und einen Einblick in die Academy – ohne Verpflichtung."
        badge="Astroversity Impulse"
        bg="kosmos"
      />

      <WaveDivider fromColor="#1B1040" toColor="#C9A84C" />

      {/* ── SEKTION 11 — FINALER CALL-TO-ACTION ──────────────────────────── */}
      <section className="py-24 px-6 bg-[#C9A84C]">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Star className="w-10 h-10 text-[#1B1040] mx-auto mb-6 fill-current opacity-45" />
            <h2 className="text-4xl text-[#1B1040] mb-5" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>
              Bereit, einzutreten?
            </h2>
            <p className="text-[#1B1040]/70 mb-4 leading-relaxed">
              Vielleicht hast du bis hierher gelesen. Vielleicht hast du an mehreren Stellen genickt. Vielleicht hast du den Satz „endlich ein Ort für Menschen wie mich" still in dir gehört.
            </p>
            <p className="text-[#1B1040]/70 mb-8 leading-relaxed">
              Die Astroversity Academy ist nicht für alle. Sie ist für die, die wissen wollen. Die in die Tiefe gehen wollen. Die ihre Sterne ernst nehmen — als Spiegel ihrer Seele, nicht als Horoskop-Kolumne. Wenn du dazugehörst, dann <span className="font-semibold">gehörst du ins Universum.</span>
            </p>
            <a href="https://www.skool.com/astroversity-academy" target="_blank" rel="noopener noreferrer"
              className="inline-block bg-[#1B1040] text-[#F0E6C8] hover:bg-[#2a1a50] transition-colors px-10 py-4 rounded-xl text-base font-semibold">
              Jetzt Founding Member werden <ArrowRight className="w-4 h-4 inline ml-1" />
            </a>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-4">
              {['50 Founding-Member-Plätze', 'Dauerhafter Preis', 'Monatlich kündbar'].map(t => (
                <span key={t} className="text-[#1B1040]/45 text-xs">{t}</span>
              ))}
            </div>
            <p className="text-[#1B1040]/70 italic mt-8" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>
              Wir sehen uns drinnen. — Robert
            </p>
          </motion.div>
        </div>
      </section>

      <WaveDivider fromColor="#C9A84C" toColor="#1B1040" />

      {/* ── PFLICHT-DISCLAIMER ───────────────────────────────────────────── */}
      <section className="py-14 px-6 bg-[#1B1040]">
        <div className="max-w-3xl mx-auto">
          <div className="border-t border-white/8 pt-10 space-y-5">
            <div>
              <p className="text-[#F0E6C8]/30 text-xs font-semibold mb-1.5 uppercase tracking-wider">Charakter des Angebots</p>
              <p className="text-[#F0E6C8]/20 text-xs leading-relaxed">
                Die Astroversity Academy ist ein Angebot zur persönlichen Freizeitgestaltung und Selbsterkundung im Bereich der westlichen und psychologischen Astrologie. Sie stellt keine Berufsausbildung, keinen berufsqualifizierenden Lehrgang und keine zertifizierte Bildungsmaßnahme dar. Es findet keine Lernerfolgskontrolle statt. Es werden keine Zertifikate, Diplome oder beruflichen Qualifikationen vergeben. Eine Mitgliedschaft begründet keinerlei berufliche oder qualifikatorische Ansprüche. Registriert als Hobby-Lehrgang nach § 12 Abs. 1 S. 4 FernUSG bei der Zentralstelle für Fernunterricht (ZFU).
              </p>
            </div>
            <div>
              <p className="text-[#F0E6C8]/30 text-xs font-semibold mb-1.5 uppercase tracking-wider">Astrologie und Gesundheit</p>
              <p className="text-[#F0E6C8]/20 text-xs leading-relaxed">
                Astrologie ist keine wissenschaftlich anerkannte Methode. Sie versteht sich in der Astroversity Academy ausschließlich als symbolische Selbstreflexionssprache zur persönlichen Bereicherung. Die Inhalte ersetzen keine ärztliche, psychotherapeutische oder heilpraktische Behandlung. Es werden keine Diagnosen gestellt und es wird keine Heilung versprochen. Bei gesundheitlichen oder seelischen Anliegen wende dich bitte an entsprechend qualifizierte Fachpersonen (Arzt, Psychotherapeut, Heilpraktiker).
              </p>
            </div>
            <div>
              <p className="text-[#F0E6C8]/30 text-xs font-semibold mb-1.5 uppercase tracking-wider">Eigenverantwortung</p>
              <p className="text-[#F0E6C8]/20 text-xs leading-relaxed">
                Die Mitgliedschaft richtet sich an Erwachsene ab 18 Jahren, die sich aus persönlichem Interesse mit Astrologie als Werkzeug der Selbstreflexion beschäftigen möchten. Eigenverantwortung ist Voraussetzung für die Teilnahme. Entscheidungen, die auf Grundlage der Inhalte getroffen werden, liegen in der alleinigen Verantwortung des Mitglieds.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
