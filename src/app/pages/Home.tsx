import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useCart } from '../context/CartContext';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { StarField } from '../components/StarField';
import { products } from '../data/products';
import {
  Star, ArrowRight, CheckCircle, Moon, Sparkles, Quote,
  Instagram, Youtube, ChevronDown, BookOpen,
  Key, Brain, Zap, RotateCcw
} from 'lucide-react';
import { NewsletterSignup } from '../components/NewsletterSignup';

// ── Animated counter hook ─────────────────────────────────────────────
function useCountUp(target: number, duration = 1800) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          // ease-out cubic
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return { value, ref };
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace('.', ',') + ' Mio.';
  if (n >= 1_000)     return (n / 1_000).toFixed(n >= 10_000 ? 0 : 1).replace('.', ',') + ' Tsd.';
  return n.toString();
}

function CounterBadge({ target, duration }: { target: number; label: string; duration?: number }) {
  const { value, ref } = useCountUp(target, duration);
  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl font-bold text-[#1B1040]" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>
        {formatCount(value)}
      </div>
    </div>
  );
}

// ── Mount heavy iframes only once scrolled near the viewport ──────────
// Embed players (Loom/TikTok/YouTube/Instagram) are huge and, loaded eagerly,
// they block first paint for several seconds on mobile. Rendering them only
// when in view keeps them off the initial load entirely.
function InViewMount({ children, className, style }: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShow(true); io.disconnect(); }
    }, { rootMargin: '400px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={className} style={style}>{show ? children : null}</div>;
}

// ── Hero video: click-to-play facade ──────────────────────────────────
// The Loom player never loads (and so never blocks the hero from painting)
// until the visitor actually chooses to watch. The poster is a pure CSS
// gradient — zero extra bytes.
function LoomHero() {
  const [play, setPlay] = useState(false);
  if (play) {
    return (
      <iframe
        src="https://www.loom.com/embed/b2a5198326534e22b16238652d6c9509?hide_owner=true&hide_share=true&hideEmbedTopBar=true&autoplay=1"
        title="Robert Wagner Astrologie"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    );
  }
  return (
    <button
      type="button"
      onClick={() => setPlay(true)}
      aria-label="Video abspielen"
      className="group relative w-full h-full flex items-center justify-center overflow-hidden bg-[#1B1040]"
    >
      <img
        src="/loom-poster.jpg"
        alt=""
        aria-hidden
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-[#1B1040]/45 group-hover:bg-[#1B1040]/30 transition-colors" />
      <span className="relative z-10 flex flex-col items-center gap-3">
        <span className="w-16 h-16 rounded-full bg-[#C9A84C] flex items-center justify-center shadow-[0_0_34px_rgba(201,168,76,0.55)] group-hover:scale-110 transition-transform">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#1B1040] ml-1" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        </span>
        <span className="text-[#F0E6C8] text-sm tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">Video abspielen</span>
      </span>
    </button>
  );
}

// ── Social post embed cards ───────────────────────────────────────────
// Update these URLs whenever there's a new post to feature
const FEATURED_POSTS = {
  youtube:   'eVFkc8QfG3o',
  tiktok:    '7629336121683496225',
  instagram: 'DXjQGj-gRxI',
};

const TikTokIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
  </svg>
);

const faqData = [
  { q: 'Wie läuft eine astrologische Beratung ab?', a: 'Nach der Buchung erhältst du einen Terminlink. Robert analysiert vorab dein Geburtshoroskop und geht im Call tief auf deine Persönlichkeit, aktuellen Themen und Lebensaufgaben ein.' },
  { q: 'Welche Daten brauche ich für ein Horoskop?', a: 'Geburtsdatum, Geburtszeit (so genau wie möglich) und Geburtsort. Je genauer die Zeit, desto präziser das Horoskop.' },
  { q: 'Was wenn ich meine Geburtszeit nicht kenne?', a: 'Kein Problem. Robert arbeitet auch ohne exakte Geburtszeit und nutzt dann ein Solar-Chart oder Rektifikationstechniken.' },
  { q: 'Was ist die Astroversity Academy?', a: 'Die Astroversity Academy ist Roberts Online-Mitgliedschaftsplattform: monatlich neue Astrologie-Inhalte, Live-Sessions, Kurse und eine Community. Alles auf einer Plattform – für Einsteiger und Fortgeschrittene.' },
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

// ── Floating zodiac symbols (multi-layer parallax drift) ──────────────
const ZODIAK_LAYERS = [
  { s: '♈', sz: 60, op: 0.045, x: '7%',  y: '18%', d: 30, dy: 50, dx: 22 },
  { s: '♌', sz: 38, op: 0.06,  x: '74%', y: '12%', d: 22, dy: 35, dx: 16 },
  { s: '♏', sz: 80, op: 0.03,  x: '54%', y: '58%', d: 38, dy: 60, dx: 28 },
  { s: '♒', sz: 30, op: 0.07,  x: '18%', y: '72%', d: 19, dy: 28, dx: 13 },
  { s: '♓', sz: 52, op: 0.05,  x: '86%', y: '50%', d: 27, dy: 42, dx: 20 },
  { s: '♉', sz: 24, op: 0.08,  x: '38%', y: '82%', d: 21, dy: 22, dx: 11 },
  { s: '♊', sz: 44, op: 0.04,  x: '92%', y: '78%', d: 34, dy: 38, dx: 17 },
  { s: '♋', sz: 32, op: 0.055, x: '48%', y: '8%',  d: 24, dy: 30, dx: 14 },
];

function ZodiakDrift() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
      {ZODIAK_LAYERS.map((l, i) => (
        <motion.div key={i} className="absolute text-[#C9A84C]"
          style={{ left: l.x, top: l.y, opacity: l.op, fontSize: l.sz, fontFamily: 'serif', lineHeight: 1 }}
          animate={{ y: [0, -l.dy, 0], x: [0, l.dx, 0] }}
          transition={{ duration: l.d, repeat: Infinity, ease: 'easeInOut', delay: i * 2.5 }}
        >{l.s}</motion.div>
      ))}
    </div>
  );
}

// ── Animated ambient orbs ─────────────────────────────────────────────
const ORB_CONFIG = [
  { color: '#7B5FD4', w: 420, h: 420, x: '8%',  y: '25%', d: 22, op: 0.13, blur: 130 },
  { color: '#C9A84C', w: 260, h: 260, x: '78%', y: '15%', d: 30, op: 0.07, blur: 95  },
  { color: '#3D2A8A', w: 360, h: 360, x: '58%', y: '62%', d: 27, op: 0.16, blur: 115 },
  { color: '#C9A84C', w: 190, h: 190, x: '22%', y: '72%', d: 35, op: 0.06, blur: 85  },
];

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {ORB_CONFIG.map((o, i) => (
        <motion.div key={i} className="absolute rounded-full"
          style={{ width: o.w, height: o.h, left: o.x, top: o.y, background: o.color, opacity: o.op, filter: `blur(${o.blur}px)` }}
          animate={{ x: [0, 28, -18, 0], y: [0, -42, 20, 0], scale: [1, 1.14, 0.94, 1] }}
          transition={{ duration: o.d, repeat: Infinity, ease: 'easeInOut', delay: i * 4.5 }}
        />
      ))}
    </div>
  );
}

// ── 3D mouse-tilt card wrapper ────────────────────────────────────────
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * -7;
    const ry = ((e.clientX - r.left - r.width  / 2) / (r.width  / 2)) *  7;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.025)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)'; };
  return <div ref={ref} className={`transition-transform duration-200 ease-out ${className}`} onMouseMove={onMove} onMouseLeave={onLeave}>{children}</div>;
}

// ── SVG wave divider ──────────────────────────────────────────────────
function WaveDivider({ fromColor, toColor, flip = false }: { fromColor: string; toColor: string; flip?: boolean }) {
  return (
    <div className="relative h-12 overflow-hidden" style={{ background: fromColor, transform: flip ? 'scaleY(-1)' : undefined }}>
      <svg viewBox="0 0 1440 48" className="absolute bottom-0 w-full" preserveAspectRatio="none" style={{ display: 'block' }}>
        <path d="M0,24 C240,48 480,0 720,24 C960,48 1200,0 1440,24 L1440,48 L0,48 Z" fill={toColor} />
      </svg>
    </div>
  );
}

// ── Service card image with mouse parallax ────────────────────────────
function ParallaxImg({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 14;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * 14;
    const img = el.querySelector('img') as HTMLImageElement | null;
    if (img) img.style.transform = `scale(1.12) translate(${x}px, ${y}px)`;
  };
  const onLeave = () => {
    const img = ref.current?.querySelector('img') as HTMLImageElement | null;
    if (img) img.style.transform = 'scale(1) translate(0,0)';
  };
  return (
    <div ref={ref} className="overflow-hidden h-44" onMouseMove={onMove} onMouseLeave={onLeave}>
      <img src={src} alt={alt} loading="lazy" decoding="async" className="w-full h-full object-cover opacity-70 group-hover:opacity-90" style={{ transition: 'transform 0.35s ease, opacity 0.5s ease' }} />
    </div>
  );
}

// ── Testimonial infinite marquee ──────────────────────────────────────
function TestimonialMarquee({ items }: { items: { name: string; text: string; stars: number }[] }) {
  return (
    <div
      className="overflow-hidden"
      style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)' }}
    >
      <motion.div
        className="flex gap-5"
        animate={{ x: [0, -(items.length * 400)] }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
      >
        {[...items, ...items].map((t, i) => (
          <div key={i} className="flex-shrink-0 w-[380px]">
            <GlassCard className="rounded-xl p-8 border-white/8 h-full">
              <Quote className="w-6 h-6 text-[#C9A84C]/35 mb-5" />
              <p className="text-[#F0E6C8]/68 text-base leading-relaxed mb-6 italic">"{t.text}"</p>
              <div className="flex items-center justify-between">
                <span className="text-[#F0E6C8] font-medium">{t.name}</span>
                <div className="flex gap-0.5">{Array.from({ length: t.stars }).map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-[#C9A84C] text-[#C9A84C]" />)}</div>
              </div>
            </GlassCard>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function UeberRobertSection() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!parallaxRef.current || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      // clamp offset so image never clips out of its scaled bounds
      const maxOffset = sectionRef.current.offsetHeight * 0.17;
      const offset = Math.max(-maxOffset, Math.min(maxOffset, center * 0.12));
      parallaxRef.current.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Space parallax background */}
      <div ref={parallaxRef} style={{ position: 'absolute', top: '-22%', bottom: '-22%', left: 0, right: 0, willChange: 'transform' }}>
        <img
          src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1280&q=75"
          alt=""
          decoding="async"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      {/* Unified dark overlay — uniform enough so no hard split between columns */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#09061a]/88 via-[#09061a]/50 to-[#09061a]/25" />

      {/* Bottom wave only — top edge is straight (flush with hero) */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: 64, zIndex: 30 }}>
        <svg viewBox="0 0 1440 64" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '100%' }}>
          <path d="M0,32 C240,64 480,0 720,32 C960,64 1200,0 1440,32 L1440,64 L0,64 Z" fill="#1B1040" />
        </svg>
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[700px]" style={{ zIndex: 20 }}>
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="py-28 px-8 lg:px-16 flex flex-col justify-center"
        >
          <div className="self-start inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A84C]/40 text-[#C9A84C] text-xs tracking-widest uppercase mb-6" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>Über Robert</div>
          <h2 className="text-4xl text-[#F0E6C8] mb-5">Astrologe & spiritueller Lebensberater</h2>
          <p className="text-[#F0E6C8]/70 leading-relaxed mb-5">
            Ich bin Robert Wagner – bekannt auf <span className="text-[#C9A84C]">TikTok, Instagram und YouTube</span>. Seit Jahren helfe ich Menschen dabei, sich selbst durch die Sprache der Sterne besser zu verstehen.
          </p>
          <p className="text-[#F0E6C8]/70 leading-relaxed mb-8">
            Astrologie ist für mich kein Orakel – sie ist ein Werkzeug zur Selbsterkenntnis. Dein Horoskop zeigt, wer du wirklich bist. <span className="text-[#F0E6C8]">Es gibt viel zu entschlüsseln.</span>
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { icon: TikTokIcon, label: 'TikTok', href: 'https://www.tiktok.com/@astrodaddy.official' },
              { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/robert.wagner_astrologie/' },
              { icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/@robertwagnerastrologie' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-[#F0E6C8]/60 hover:text-[#F0E6C8] hover:border-white/40 transition-all text-sm">
                  <s.icon /> {s.label}
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right: Robert photo — no left-edge fade (that caused the dark inner shadow) */}
        <motion.div
          initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="relative h-[500px] lg:h-auto"
        >
          <img src="/robert.png" alt="Robert Wagner" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-contain object-bottom" />
          {/* Subtle gold light-leak only */}
          <div className="absolute inset-0 bg-gradient-to-bl from-[#C9A84C]/12 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}

// ── Leistungen sticky-scroll section ─────────────────────────────────
function LeistungenSection({ services }: { services: { title: string; desc: string; img: string; link: string }[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  // cards start below viewport, scroll to show all 4
  const cardsY = useTransform(scrollYProgress, [0, 1], ['60px', '-1500px']);

  return (
    <section ref={sectionRef} style={{ height: '400vh' }} className="relative">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden bg-[#1B1040] flex">

        {/* LEFT: Planets-12 with typography centered on the image */}
        <div className="relative flex-1 flex items-center justify-center overflow-hidden pl-4">
          {/* Image + overlaid text — shifted 200px to the left */}
          <div className="relative w-[90%] max-w-[680px]" style={{ marginLeft: '-200px' }}>
            <motion.img
              src="/astro-radix.jpg"
              alt=""
              loading="lazy"
              decoding="async"
              initial={{ x: -300, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="select-none pointer-events-none w-full"
              style={{
                filter: 'sepia(0.45) saturate(1.4) brightness(1.15) drop-shadow(0 16px 60px rgba(0,0,0,0.8))',
                mixBlendMode: 'screen',
                borderRadius: '50%',
                maskImage: 'radial-gradient(ellipse 72% 72% at 50% 50%, black 38%, transparent 72%)',
                WebkitMaskImage: 'radial-gradient(ellipse 72% 72% at 50% 50%, black 38%, transparent 72%)',
              }}
            />
            {/* Typography centered on the image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.9, delay: 0.7 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A84C]/30 text-[#C9A84C]/80 text-xs tracking-widest uppercase mb-3" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>
                Angebote
              </div>
              <h2 className="text-4xl lg:text-5xl text-[#F0E6C8] font-bold mb-3 leading-tight" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400, textShadow: '0 4px 32px rgba(0,0,0,0.9)' }}>
                Leistungen
              </h2>
              <p className="text-[#F0E6C8] text-base leading-relaxed max-w-[240px]" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.9)' }}>
                Alles was du brauchst, um dein volles Potenzial zu entfalten.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Dark gradient between columns */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#1B1040]/50 pointer-events-none" style={{ zIndex: 2 }} />

        {/* RIGHT: scroll-linked portrait cards — fixed width, outer margin from right edge */}
        <div className="relative w-[360px] flex-shrink-0 mr-28 lg:mr-36 overflow-hidden" style={{ zIndex: 3 }}>
          {/* Top/bottom fades */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#1B1040] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#1B1040] to-transparent z-10 pointer-events-none" />
          <motion.div className="flex flex-col gap-5 pl-2 pr-2" style={{ y: cardsY }}>
            {services.map((s, i) => (
              <Link key={i} to={s.link} className="block flex-shrink-0">
                <GlassCard hover className="rounded-xl overflow-hidden border-white/8 cursor-pointer group">
                  {/* Square image on top */}
                  <div className="aspect-square overflow-hidden">
                    <img src={s.img} alt={s.title} loading="lazy" decoding="async" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                  </div>
                  {/* Content below */}
                  <div className="p-5">
                    <h3 className="text-[#F0E6C8] font-semibold text-lg mb-2">{s.title}</h3>
                    <p className="text-[#F0E6C8]/45 text-xs leading-relaxed mb-4">{s.desc}</p>
                    <Button variant="gold" size="sm" className="w-full">
                      Mehr erfahren <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Sparkle positions kept inside card bounds so hover events fire reliably
const SPARKLE_POS = [
  { x: '5%',  y: '8%',  delay: 0,    sz: 16 },
  { x: '88%', y: '6%',  delay: 0.18, sz: 11 },
  { x: '90%', y: '80%', delay: 0.34, sz: 14 },
  { x: '4%',  y: '78%', delay: 0.10, sz: 12 },
  { x: '46%', y: '4%',  delay: 0.25, sz: 10 },
  { x: '52%', y: '90%', delay: 0.42, sz: 15 },
  { x: '22%', y: '6%',  delay: 0.08, sz: 11 },
  { x: '74%', y: '88%', delay: 0.30, sz: 13 },
];

export default function Home() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const bookProduct = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) { addToCart(product); navigate('/checkout'); }
  };
  const featured = products.filter(p => p.bestseller).slice(0, 3);

  const testimonials = [
    { name: 'Karin Preuss',       text: 'Robert ist extrem gut und trifft den Nagel auf den Kopf vor allem OHNE Vorinformation. Absolut beeindruckend.', stars: 5 },
    { name: 'Sylvia Kobilinski',  text: 'Mir wurde anhand meines Geburtshoroskopes bestätigt, was ich tatsächlich erlebt habe, und auch was ich selbst schon erahnt habe.', stars: 5 },
    { name: 'Himynameisnadine !', text: 'Robert hat alles sehr verständlich und sehr fachlich erklärt. Er hat eine super angenehme Art die Dinge zu erklären.', stars: 5 },
    { name: 'Lory Glory',         text: 'Bei Robert hatte ich eine astrologische Beratung in Bezug von mein Lebensaufgabe es wurde sehr toll und einfach erklärt.', stars: 5 },
    { name: 'Janine Schoppa',     text: 'Robert ist erstmal super sympathisch und erklärt grandios. Es wird wirklich alles super genau erklärt und man versteht es sofort.', stars: 5 },
  ];

  const potentials = [
    { icon: Key,        title: 'Dein Schlüssel',   desc: 'Verstehe die kosmische Blaupause, die bei deiner Geburt festgelegt wurde.' },
    { icon: Brain,      title: 'Selbsterkenntnis',  desc: 'Erkenne Muster, Stärken und blinde Flecken. Astrologie als ehrlicher Spiegel.' },
    { icon: Zap,        title: 'Alte Traumas',      desc: 'Der Mond und Chiron zeigen, wo alte Wunden sitzen – und wie du heilen kannst.' },
    { icon: RotateCcw,  title: 'Karma & Aufgaben',  desc: 'Mondknoten und Saturn enthüllen deine Lebensaufgabe und wohin du wachsen sollst.' },
  ];

  const services = [
    { title: 'Astrologische Beratung', desc: 'Persönliche Horoskop-Deutung – von 10 Min bis 90 Min Deep Dive.', img: 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?w=600&q=80', link: '/angebote' },
    { title: 'Praktische Workbooks',   desc: 'Lerne Astrologie in deinem Tempo mit durchdachten Lern-Materialien.', img: '/workbooks.png', link: '/angebote' },
    { title: 'Astroversity Academy',   desc: 'Kurse, Live-Sessions & Community – dein Weg in die Astrologie.', img: '/astroversity-leistungen.png', link: '/astroversity' },
  ];

  const pricing = [
    { title: 'Basis-Beratung', duration: '10 Minuten', price: '59,99 €', productId: 7, highlight: false, features: [
      'Detaillierte Horoskopdeutung',
      'Bequeme Video-Beratung',
      'Einsichten zu Lebensaufgaben',
      'Direkte Kommunikation über WhatsApp',
      'Individuelle Analyse in kurzer Zeit',
      'Vorab-Zusendung deines Geburtshoroskops',
    ]},
    { title: 'Transformation',  duration: '45 Minuten', price: '99,99 €', productId: 5, highlight: true,  features: [
      'Entdecke Stärken und Herausforderungen',
      'Beantwortung individueller Fragen',
      'Gemeinsame Reise der Selbsterkenntnis',
      'Einblick in persönliche Lebensbereiche',
      'Praktische Tipps für den Alltag',
      'Klärung aktueller Themen',
      'Aufzeichnung zur späteren Einsicht',
    ]},
    { title: 'Deep Work',       duration: '90 Minuten', price: '169,99 €', productId: 6, highlight: false, features: [
      'Aufdeckung innerer Blockaden',
      'Unterstützung beim Lösen von Ängsten',
      'Erkenne deine Stärken und Berufung',
      'Individuelle Anleitung und Feedback',
      'Analyse deiner Vergangenheit',
      'Praktische Übungen zur Vertiefung',
      'Persönliche Entwicklung im Fokus',
      'Aufzeichnung zur späteren Einsicht',
    ]},
  ];

  return (
    <div className="min-h-screen bg-[#1B1040]">

      {/* ── HERO ─ Kosmos ──────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#1B1040]">
        <StarField />
        <FloatingOrbs />
        <ZodiakDrift />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* Left: Headline */}
            <motion.div initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }}>
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9A84C]/30 text-[#C9A84C] text-xs tracking-widest uppercase mb-8" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>
                <Star className="w-3 h-3 fill-current" /> Astrologie · Academy
              </motion.div>
              <div className="overflow-hidden mb-3">
                <motion.h1
                  initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0% 0 0)' }}
                  transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[clamp(2.4rem,4.5vw,5rem)] leading-[1.1] text-[#F0E6C8]" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>Finde den Weg
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-8">
                <motion.h1
                  initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0% 0 0)' }}
                  transition={{ duration: 0.9, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[clamp(2.4rem,4.5vw,5rem)] leading-[1.1] text-[#C9A84C]" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>zu Dir selbst
                </motion.h1>
              </div>
              <p className="text-lg text-[#F0E6C8]/55 max-w-lg mb-10">
                Entdecke was die Planeten mit Dir zu tun haben. Mit Robert Wagner – Astrologe & spiritueller Lebensberater.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/astroversity"><Button variant="gold" size="lg" className="px-9">Zur Academy <ArrowRight className="w-4 h-4" /></Button></Link>
                <Link to="/angebote"><Button variant="outline" size="lg" className="px-9 border-white/40 text-[#F0E6C8]/85 hover:text-[#F0E6C8] hover:border-white/60">Beratung buchen</Button></Link>
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
                      <span className="text-[#C9A84C]/65 text-[10px] tracking-[0.22em] uppercase mx-3 select-none" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>
                        Robert Wagner Astrologie
                      </span>
                      <span className="text-[#C9A84C]/45 text-sm select-none">♏</span>
                      <span className="text-[#C9A84C]/45 text-sm select-none">♒</span>
                    </div>

                    {/* Video */}
                    <div className="aspect-video">
                      <LoomHero />
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

      {/* ── ÜBER ROBERT ────────────────────────────────────────── */}
      <UeberRobertSection />

      {/* ── LEISTUNGEN ─ Sticky scroll ─────────────────────────── */}
      <LeistungenSection services={services} />

      <WaveDivider fromColor="#1B1040" toColor="#3D2A8A" />

      {/* ── ASTROVERSITY ACADEMY ─ Nebel ───────────────────────── */}
      <section className="py-24 px-6 bg-[#3D2A8A]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="relative rounded-xl overflow-hidden border border-white/15 h-[400px]">
              <img src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80" alt="Astroversity Academy" loading="lazy" decoding="async" className="w-full h-full object-cover opacity-70" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="bg-[#1B1040]/85 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="text-[#C9A84C] text-xs tracking-widest uppercase mb-1" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>Astroversity Academy</div>
                  <div className="text-[#F0E6C8] font-semibold text-sm">Live-Sessions · Kurse · Community</div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/25 text-[#F0E6C8]/70 text-xs tracking-widest uppercase mb-6" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>
              <BookOpen className="w-3 h-3" /> Astroversity Academy
            </div>
            <h2 className="text-4xl text-[#F0E6C8] mb-5">Dein Zugang zur Astroversity Academy</h2>
            <p className="text-[#F0E6C8]/70 leading-relaxed mb-7">
              Monatliche Live-Sessions, neue Kurse und eine inspirierende Community – alles auf einer Plattform. Lerne Astrologie in deinem Tempo und tauche tief in die Welt der Sterne ein.
            </p>
            <div className="space-y-3 mb-8">
              {['Monatliche Live-Sessions mit Robert', 'Neue Kurse & Lernmaterialien jeden Monat', 'Exklusive Community Gleichgesinnter', 'Zertifikat nach Abschluss möglich'].map(f => (
                <div key={f} className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-[#C9A84C] shrink-0" />
                  <span className="text-[#F0E6C8]/75">{f}</span>
                </div>
              ))}
            </div>
            <Link to="/astroversity">
              <Button variant="gold" size="lg" className="px-8">Zur Astroversity Academy <ArrowRight className="w-4 h-4" /></Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <WaveDivider fromColor="#3D2A8A" toColor="#1B1040" />

      {/* ── POTENZIAL ─ Kosmos ─────────────────────────────────── */}
      <section className="relative py-24 px-6 overflow-hidden bg-[#1B1040]">
        {/* Animated nebula — looks like ambient space video, no hard image edges */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          {/* Primary nebula: slow color shift across the section */}
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
          {/* Secondary nebula: offset timing, drifts right */}
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
          {/* Gold accent glow — slowly pulses */}
          <motion.div
            className="absolute rounded-full"
            style={{ width: 480, height: 480, left: '58%', top: '10%', background: '#C9A84C', filter: 'blur(140px)' }}
            animate={{ opacity: [0.06, 0.13, 0.05, 0.06], scale: [1, 1.25, 0.85, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          />
          {/* Deep blue drift — bottom left */}
          <motion.div
            className="absolute rounded-full"
            style={{ width: 520, height: 380, left: '-5%', top: '45%', background: '#1a0a4a', filter: 'blur(100px)' }}
            animate={{ opacity: [0.7, 0.5, 0.8, 0.7], x: [0, 30, -10, 0], y: [0, -20, 15, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
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
                  <h3 className="text-[#F0E6C8] font-semibold text-lg mb-2">{p.title}</h3>
                  <p className="text-[#F0E6C8]/45 text-xs leading-relaxed">{p.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fromColor="#1B1040" toColor="#C9A84C" />

      {/* ── SOCIAL MEDIA ─ Gold ────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#C9A84C]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl text-[#1B1040] mb-4" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>Folge der Community</h2>
            <p className="text-[#1B1040]/65">Tägliche Astrologie-Insights, Live-Sessions und mehr – kostenlos auf Social Media.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* TikTok */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0 }}>
              <div className="bg-[#1B1040]/8 border border-[#1B1040]/12 rounded-2xl overflow-hidden flex flex-col h-full">
                {/* Header */}
                <a href="https://www.tiktok.com/@astrodaddy.official" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between px-5 py-4 hover:bg-[#1B1040]/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#1B1040]/15 flex items-center justify-center text-[#1B1040]"><TikTokIcon /></div>
                    <div>
                      <div className="text-[#1B1040] font-semibold text-sm leading-tight">TikTok</div>
                      <div className="text-[#1B1040]/50 text-xs">@astrodaddy.official</div>
                    </div>
                  </div>
                  <CounterBadge target={43000} label="Follower" duration={1600} />
                </a>
                {/* TikTok embed */}
                <div className="flex-1 mx-4 mb-4 rounded-xl overflow-hidden">
                  <InViewMount className="w-full rounded-xl overflow-hidden" style={{ minHeight: '560px' }}>
                    <iframe
                      src={`https://www.tiktok.com/embed/v2/${FEATURED_POSTS.tiktok}`}
                      title="Meistgesehenes TikTok Video"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full rounded-xl"
                      style={{ minHeight: '560px', border: 'none' }}
                    />
                  </InViewMount>
                </div>
              </div>
            </motion.div>

            {/* YouTube — real embed */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="bg-[#1B1040]/8 border border-[#1B1040]/12 rounded-2xl overflow-hidden flex flex-col h-full">
                <a href="https://www.youtube.com/@robertwagnerastrologie" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between px-5 py-4 hover:bg-[#1B1040]/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#1B1040]/15 flex items-center justify-center text-[#1B1040]"><Youtube className="w-5 h-5" /></div>
                    <div>
                      <div className="text-[#1B1040] font-semibold text-sm leading-tight">YouTube</div>
                      <div className="text-[#1B1040]/50 text-xs">@robertwagnerastrologie</div>
                    </div>
                  </div>
                  <CounterBadge target={2500} label="Abonnenten" duration={1800} />
                </a>
                <div className="flex-1 mx-4 mb-4 rounded-xl overflow-hidden">
                  <InViewMount className="w-full aspect-video rounded-xl overflow-hidden">
                    <iframe
                      src={`https://www.youtube.com/embed/${FEATURED_POSTS.youtube}?rel=0&modestbranding=1`}
                      title="Aktuelles YouTube Video"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-xl"
                    />
                  </InViewMount>
                </div>
              </div>
            </motion.div>

            {/* Instagram */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <div className="bg-[#1B1040]/8 border border-[#1B1040]/12 rounded-2xl overflow-hidden flex flex-col h-full">
                <a href="https://www.instagram.com/robert.wagner_astrologie/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between px-5 py-4 hover:bg-[#1B1040]/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#1B1040]/15 flex items-center justify-center text-[#1B1040]"><Instagram className="w-5 h-5" /></div>
                    <div>
                      <div className="text-[#1B1040] font-semibold text-sm leading-tight">Instagram</div>
                      <div className="text-[#1B1040]/50 text-xs">@robert.wagner_astrologie</div>
                    </div>
                  </div>
                  <CounterBadge target={20000} label="Follower" duration={1700} />
                </a>
                {/* Instagram embed */}
                <div className="flex-1 mx-4 mb-4 rounded-xl overflow-hidden">
                  <InViewMount className="w-full rounded-xl overflow-hidden" style={{ minHeight: '560px' }}>
                    <iframe
                      src={`https://www.instagram.com/reel/${FEATURED_POSTS.instagram}/embed/`}
                      title="Meistgesehenes Instagram Reel"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full rounded-xl"
                      style={{ minHeight: '560px', border: 'none' }}
                    />
                  </InViewMount>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      <WaveDivider fromColor="#C9A84C" toColor="#1B1040" />

      {/* ── TESTIMONIALS ─ Kosmos ──────────────────────────────── */}
      <section className="relative py-24 overflow-hidden bg-[#1B1040]">
        {/* Space video background — NASA public domain */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="hidden md:block absolute inset-0 w-full h-full object-cover opacity-30"
          >
            <source src="https://svs.gsfc.nasa.gov/vis/a010000/a014900/a014950/14950_Galaxies_FlyThrough_1080.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay to keep text readable */}
          <div className="absolute inset-0 bg-[#1B1040]/60" />
          {/* Top/bottom vignette to blend with wave dividers */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#1B1040] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#1B1040] to-transparent" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="flex items-center justify-center gap-1.5 mb-3">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-5 h-5 fill-[#C9A84C] text-[#C9A84C]" />)}
            </div>
            <h2 className="text-4xl text-[#F0E6C8] mb-2">5 von 5 Sternen auf Google</h2>
            <p className="text-[#F0E6C8]/40 text-sm">100% Zufriedenheitsrate</p>
          </motion.div>
          <TestimonialMarquee items={testimonials} />
        </div>
      </section>

      <WaveDivider fromColor="#1B1040" toColor="#3D2A8A" />

      {/* ── PREISE ─ Nebel ─────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#3D2A8A]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-4xl text-[#F0E6C8] mb-3">Beratung buchen</h2>
            <p className="text-[#F0E6C8]/55">Wähle das Paket, das zu deiner Reise passt.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {pricing.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`pricing-card relative${p.highlight ? ' pricing-card--highlight' : ''}`}
              >
                {/* Sparkles — driven by .pricing-card:hover CSS selector */}
                {SPARKLE_POS.map((sp, si) => (
                  <span
                    key={si}
                    className="sparkle-item absolute z-20 text-[#C9A84C] select-none"
                    style={{ left: sp.x, top: sp.y, fontSize: sp.sz, animationDelay: `${sp.delay}s` }}
                  >✦</span>
                ))}
                <TiltCard>
                <div className={`rounded-xl p-7 h-full flex flex-col relative border ${p.highlight ? 'bg-[#C9A84C] border-[#C9A84C]' : 'bg-white/8 border-white/15'}`}>
                  {p.highlight && <div className="absolute -top-3 left-5"><span className="px-3 py-1 rounded bg-[#1B1040] text-[#C9A84C] text-xs font-semibold">Empfohlen</span></div>}
                  <div className={`pt-2 mb-1 text-xs tracking-widest uppercase ${p.highlight ? 'text-[#1B1040]/60' : 'text-[#F0E6C8]/40'}`} style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>{p.duration}</div>
                  <h3 className={`text-xl font-semibold mb-2 ${p.highlight ? 'text-[#1B1040]' : 'text-[#F0E6C8]'}`}>{p.title}</h3>
                  <div className={`text-3xl font-bold mb-6 ${p.highlight ? 'text-[#1B1040]' : 'text-[#C9A84C]'}`}>{p.price}</div>
                  <ul className="space-y-2.5 mb-7 flex-1">
                    {p.features.map(f => (
                      <li key={f} className="flex items-center gap-2.5 text-sm">
                        <CheckCircle className={`w-3.5 h-3.5 shrink-0 ${p.highlight ? 'text-[#1B1040]' : 'text-[#7B5FD4]'}`} />
                        <span className={p.highlight ? 'text-[#1B1040]/75' : 'text-[#F0E6C8]/60'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => bookProduct(p.productId)}
                    className={`w-full py-2.5 rounded-lg text-sm font-medium border transition-all ${p.highlight ? 'bg-[#1B1040] text-[#C9A84C] border-[#1B1040] hover:bg-[#2a1d6b]' : 'bg-transparent text-[#F0E6C8]/70 border-white/20 hover:text-[#F0E6C8] hover:border-white/40'}`}>
                    {p.highlight ? 'Jetzt buchen' : 'Jetzt buchen'}
                  </button>
                </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fromColor="#3D2A8A" toColor="#1B1040" />

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

      {/* ── NEWSLETTER ────────────────────────────────────────── */}
      <NewsletterSignup
        headline="Kosmische Einblicke, direkt in dein Postfach."
        subline="Mondphasen, Astro-Impulse und exklusive Angebote – kostenlos, jederzeit abbestellbar."
        badge="Newsletter"
        bg="kosmos"
      />

      {/* ── FINAL CTA ─ Gold ───────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#C9A84C]">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Moon className="w-8 h-8 text-[#1B1040]/60 mx-auto mb-6" />
            <h2 className="text-4xl text-[#1B1040] mb-4" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>Die Sterne warten auf Dich</h2>
            <p className="text-[#1B1040]/60 mb-8">Starte deine Reise zur Selbsterkenntnis – kostenlos oder mit persönlicher Beratung.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/community">
                <button className="px-8 py-3 rounded-lg bg-[#1B1040] text-[#C9A84C] font-semibold text-sm hover:bg-[#2a1d6b] transition-colors">
                  Community beitreten
                </button>
              </Link>
              <Link to="/angebote">
                <button className="px-8 py-3 rounded-lg bg-transparent text-[#1B1040] font-semibold text-sm border border-[#1B1040]/30 hover:bg-[#1B1040]/10 transition-colors">
                  Mein Angebot
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
