import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';

export interface SpinReward {
  type: 'pct' | 'call';
  value?: number;
  code: string;
}

interface Props {
  items: { id: number; quantity: number }[];
  onWin: (reward: SpinReward) => void;
  onClose: () => void;
}

// Visual reward segments (all wins, 20 % removed). The server decides the
// outcome; the wheel just animates to a segment that matches. Every winnable
// value (10 / 15 / 5 / call) appears at least once; 10 % is repeated because it
// is by far the most common outcome.
const SEG = [
  { kind: 'pct',  value: 10, label: '10 %' },
  { kind: 'pct',  value: 15, label: '15 %' },
  { kind: 'pct',  value: 10, label: '10 %' },
  { kind: 'pct',  value: 5,  label: '5 %'  },
  { kind: 'pct',  value: 10, label: '10 %' },
  { kind: 'pct',  value: 15, label: '15 %' },
  { kind: 'pct',  value: 10, label: '10 %' },
  { kind: 'call', value: 0,  label: 'Call' },
] as const;
const N = SEG.length;
const SEGA = (2 * Math.PI) / N;

const ZODIAC = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export function CosmicWheel({ items, onWin, onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotRef = useRef(-SEGA * 0.5);
  const reduceRef = useRef(false);
  // Active spin easing, read by the ambient render loop.
  const spinAnim = useRef<{ t0: number; dur: number; from: number; delta: number; done: () => void } | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<SpinReward | null>(null);
  const [error, setError] = useState('');

  // Pulsing stars behind the wheel (generated once).
  const bgStars = useRef(
    Array.from({ length: 30 }, () => ({
      left: `${(Math.random() * 100).toFixed(2)}%`,
      top: `${(Math.random() * 100).toFixed(2)}%`,
      size: `${(Math.random() * 2 + 1).toFixed(1)}px`,
      base: 0.12 + Math.random() * 0.4,
      dur: (2 + Math.random() * 2.6).toFixed(2),
      delay: (Math.random() * 3).toFixed(2),
    })),
  ).current;

  // Twinkling astro sparkles in the zodiac band (generated once).
  const sparkles = useRef(
    Array.from({ length: 12 }, () => ({
      ang: Math.random() * Math.PI * 2,
      radFrac: 0.82 + Math.random() * 0.12,
      size: 1.1 + Math.random() * 1.8,
      phase: Math.random() * Math.PI * 2,
      speed: 1.4 + Math.random() * 2.2,
    })),
  ).current;

  const draw = (rot: number, t: number) => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    const S = cv.width, R = S / 2, cx = R, cy = R;
    const RW = R * 0.78;   // reward wheel radius
    const ZR = R * 0.905;  // zodiac glyph radius
    const RIM = R * 0.985; // outer rim
    const zRot = t * 0.06; // slow ambient rotation of the astro ring

    ctx.clearRect(0, 0, S, S);
    ctx.save();
    ctx.translate(cx, cy);

    // ── Zodiac band (subtle fill + boundary rings) ──
    ctx.beginPath();
    ctx.arc(0, 0, RIM, 0, Math.PI * 2);
    ctx.arc(0, 0, RW + 4, 0, Math.PI * 2, true);
    ctx.fillStyle = 'rgba(18,11,42,0.6)';
    ctx.fill('evenodd');
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(201,168,76,0.55)';
    ctx.beginPath(); ctx.arc(0, 0, RIM, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 0, RW + 4, 0, Math.PI * 2); ctx.stroke();

    // ── Reward segments ──
    for (let i = 0; i < N; i++) {
      const a0 = -Math.PI / 2 + i * SEGA + rot, a1 = a0 + SEGA, seg = SEG[i];
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, RW, a0, a1);
      ctx.closePath();
      if (seg.kind === 'call') {
        const g = ctx.createRadialGradient(0, 0, 18, 0, 0, RW);
        g.addColorStop(0, '#6a51b8'); g.addColorStop(1, '#3D2A8A');
        ctx.fillStyle = g;
      } else {
        ctx.fillStyle = i % 2 === 0 ? 'rgba(201,168,76,0.15)' : 'rgba(28,19,66,0.92)';
      }
      ctx.fill();
      ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(201,168,76,0.5)'; ctx.stroke();

      const mid = a0 + SEGA / 2;
      ctx.save();
      ctx.rotate(mid);
      ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
      if (seg.kind === 'call') {
        ctx.fillStyle = '#E7CE86';
        ctx.font = '26px "Cormorant Garamond", serif';
        ctx.fillText('★', RW - 78, 0);
        ctx.fillStyle = '#F0E6C8';
        ctx.font = '700 20px "Raleway", sans-serif';
        ctx.fillText('Call', RW - 26, 0);
      } else {
        ctx.fillStyle = '#F0E6C8';
        ctx.font = '700 27px "Raleway", sans-serif';
        ctx.fillText(seg.label, RW - 26, 0);
      }
      ctx.restore();
    }

    // ── Zodiac glyphs (upright, gently twinkling, slowly orbiting) ──
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (let k = 0; k < 12; k++) {
      const ang = -Math.PI / 2 + k * (Math.PI * 2 / 12) + zRot;
      const gx = Math.cos(ang) * ZR, gy = Math.sin(ang) * ZR;
      const tw = 0.5 + 0.5 * Math.sin(t * 1.3 + k);
      ctx.fillStyle = `rgba(231,206,134,${(0.45 + 0.45 * tw).toFixed(3)})`;
      ctx.font = '21px "Cormorant Garamond", serif';
      ctx.fillText(ZODIAC[k], gx, gy);
    }

    // ── Twinkling sparkles in the band ──
    for (const s of sparkles) {
      const ang = s.ang + zRot;
      const rr = R * s.radFrac;
      const sx = Math.cos(ang) * rr, sy = Math.sin(ang) * rr;
      const a = 0.2 + 0.6 * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
      ctx.fillStyle = `rgba(240,230,200,${a.toFixed(3)})`;
      ctx.beginPath(); ctx.arc(sx, sy, s.size, 0, Math.PI * 2); ctx.fill();
    }

    // ── Center hub with the moon ──
    const hg = ctx.createRadialGradient(0, -8, 3, 0, 0, 50);
    hg.addColorStop(0, '#2a1c58'); hg.addColorStop(1, '#140b30');
    ctx.beginPath(); ctx.arc(0, 0, 46, 0, Math.PI * 2); ctx.fillStyle = hg; ctx.fill();
    ctx.lineWidth = 3; ctx.strokeStyle = '#C9A84C'; ctx.stroke();
    ctx.fillStyle = '#E7CE86'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = '36px "Cormorant Garamond", serif'; ctx.fillText('☾', 0, 2);

    ctx.restore();
  };

  // Single ambient render loop: drives the astro ring / twinkle and the spin easing.
  useEffect(() => {
    reduceRef.current = typeof window !== 'undefined'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const sp = spinAnim.current;
      if (sp) {
        const p = Math.min((now - sp.t0) / sp.dur, 1);
        rotRef.current = sp.from + sp.delta * easeOut(p);
        if (p >= 1) { spinAnim.current = null; sp.done(); }
      }
      draw(rotRef.current, reduceRef.current ? 0 : (now - t0) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => draw(rotRef.current, 0));
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const spin = async () => {
    if (spinning || result) return;
    setSpinning(true);
    setError('');
    let reward: SpinReward;
    try {
      const res = await fetch('/api/spin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok || (data.type !== 'pct' && data.type !== 'call')) {
        setError(data.error ?? 'Das Rad dreht gerade nicht. Bitte später erneut versuchen.');
        setSpinning(false);
        return;
      }
      reward = data as SpinReward;
    } catch {
      setError('Verbindung fehlgeschlagen. Bitte erneut versuchen.');
      setSpinning(false);
      return;
    }
    const matches = SEG
      .map((s, i) => ({ s, i }))
      .filter(({ s }) => (reward.type === 'call' ? s.kind === 'call' : s.kind === 'pct' && s.value === reward.value))
      .map(({ i }) => i);
    const idx = matches.length ? matches[Math.floor(Math.random() * matches.length)] : 0;

    const reduce = reduceRef.current;
    const jitter = (Math.random() - 0.5) * SEGA * 0.6;
    const desired = -(idx * SEGA + SEGA / 2);
    let target = rotRef.current - (rotRef.current % (2 * Math.PI)) + desired;
    const turns = reduce ? 1 : 6;
    while (target <= rotRef.current + 2 * Math.PI * turns) target += 2 * Math.PI;
    target += jitter;
    spinAnim.current = {
      t0: performance.now(),
      dur: reduce ? 500 : 4400,
      from: rotRef.current,
      delta: target - rotRef.current,
      done: () => { setResult(reward); onWin(reward); },
    };
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-[#06031299]" onClick={onClose} />
        <motion.div
          className="relative w-full sm:w-[420px] sm:max-w-[92vw] overflow-hidden bg-gradient-to-b from-[#1E1442] to-[#160d36] border border-[#C9A84C]/30 rounded-t-3xl sm:rounded-3xl px-5 pt-4 pb-7 text-center shadow-2xl"
          initial={{ y: 60, opacity: 0.5 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
          transition={{ type: 'spring', damping: 26, stiffness: 260 }}
        >
          {/* Pulsing star background */}
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            {bgStars.map((s, i) => (
              <span
                key={i}
                className="absolute rounded-full bg-[#F0E6C8]"
                style={{
                  left: s.left, top: s.top, width: s.size, height: s.size, opacity: s.base,
                  animation: `cw-twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
                }}
              />
            ))}
          </div>
          <style>{`@keyframes cw-twinkle{0%,100%{opacity:.12;transform:scale(.7)}50%{opacity:.85;transform:scale(1.2)}}
            @media (prefers-reduced-motion: reduce){[style*="cw-twinkle"]{animation:none!important}}`}</style>

          <div className="relative">
            <div className="sm:hidden w-9 h-1 rounded-full bg-[#F0E6C8]/25 mx-auto mb-3" />
            <h3 className="text-2xl text-[#F0E6C8]" style={{ fontFamily: '"rl-limo-1","rl-limo-2","Cormorant Garamond",serif', fontWeight: 400 }}>
              Dreh am Schicksal
            </h3>
            <p className="text-[#F0E6C8]/55 text-xs mb-3">Ein Dreh pro Bestellung · jedes Feld gewinnt.</p>

            <div className="relative mx-auto" style={{ width: 'min(74vw, 272px)', aspectRatio: '1' }}>
              <div className="absolute rounded-full pointer-events-none" style={{ inset: '-10%', background: 'radial-gradient(circle, rgba(201,168,76,0.24), transparent 62%)' }} />
              <svg width="28" height="25" viewBox="0 0 34 30" aria-hidden="true"
                className="absolute left-1/2 -translate-x-1/2 z-10" style={{ top: -4, filter: 'drop-shadow(0 3px 4px rgba(0,0,0,0.5))' }}>
                <path d="M17 29 L4 6 Q17 13 30 6 Z" fill="#E7CE86" stroke="#1B1040" strokeWidth="1.5" />
              </svg>
              <canvas ref={canvasRef} width={680} height={680} className="relative z-[1] w-full h-full block" />
            </div>

            {error && <p className="text-red-300 text-sm mt-3">{error}</p>}

            {!result ? (
              <button
                onClick={spin}
                disabled={spinning}
                className="mt-4 font-bold text-[15px] text-[#1B1040] rounded-2xl px-10 py-3.5 disabled:grayscale disabled:brightness-75"
                style={{ background: 'linear-gradient(180deg,#E7CE86,#C9A84C)', boxShadow: '0 8px 22px rgba(201,168,76,0.3)' }}
              >
                {spinning ? 'Viel Glück…' : 'Rad drehen'}
              </button>
            ) : (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                {result.type === 'call' ? (
                  <>
                    <div className="text-3xl text-[#7B5FD4]" style={{ fontFamily: '"Cormorant Garamond",serif' }}>Jackpot ★</div>
                    <p className="text-[#F0E6C8]/60 text-sm mt-1 max-w-[30ch] mx-auto">20-Minuten-Call mit Robert — du bekommst nach dem Kauf deinen Terminlink per Mail.</p>
                  </>
                ) : (
                  <>
                    <div className="text-3xl text-[#E7CE86]" style={{ fontFamily: '"Cormorant Garamond",serif' }}>{result.value} % geschenkt</div>
                    <p className="text-[#F0E6C8]/60 text-sm mt-1">Dein kosmischer Bonus wartet im Warenkorb.</p>
                  </>
                )}
                <button onClick={onClose}
                  className="mt-4 font-bold text-[15px] text-[#1B1040] rounded-2xl px-10 py-3.5"
                  style={{ background: 'linear-gradient(180deg,#E7CE86,#C9A84C)' }}>
                  Weiter
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}
