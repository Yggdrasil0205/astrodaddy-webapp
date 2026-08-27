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

// Visual segments (all wins). The server decides the outcome; the wheel just
// animates to a matching segment.
const SEG = [
  { kind: 'pct',  value: 10, label: '10 %', glyph: '♈' },
  { kind: 'pct',  value: 5,  label: '5 %',  glyph: '♉' },
  { kind: 'pct',  value: 15, label: '15 %', glyph: '♊' },
  { kind: 'pct',  value: 10, label: '10 %', glyph: '♋' },
  { kind: 'pct',  value: 20, label: '20 %', glyph: '♌' },
  { kind: 'pct',  value: 10, label: '10 %', glyph: '♍' },
  { kind: 'pct',  value: 15, label: '15 %', glyph: '♎' },
  { kind: 'call', value: 0,  label: 'Call', glyph: '★' },
] as const;
const N = SEG.length;
const SEGA = (2 * Math.PI) / N;

export function CosmicWheel({ items, onWin, onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotRef = useRef(-SEGA * 0.5);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<SpinReward | null>(null);
  const [error, setError] = useState('');
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const draw = (rot: number) => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    const S = cv.width, R = S / 2, cx = R, cy = R;
    ctx.clearRect(0, 0, S, S);
    ctx.save();
    ctx.translate(cx, cy);
    for (let i = 0; i < N; i++) {
      const a0 = -Math.PI / 2 + i * SEGA + rot, a1 = a0 + SEGA, seg = SEG[i];
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, R - 12, a0, a1);
      ctx.closePath();
      if (seg.kind === 'call') {
        const g = ctx.createRadialGradient(0, 0, 18, 0, 0, R);
        g.addColorStop(0, '#6a51b8'); g.addColorStop(1, '#3D2A8A');
        ctx.fillStyle = g;
      } else {
        ctx.fillStyle = i % 2 === 0 ? 'rgba(201,168,76,0.16)' : 'rgba(30,20,70,0.92)';
      }
      ctx.fill();
      ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(201,168,76,0.55)'; ctx.stroke();
      const mid = a0 + SEGA / 2;
      ctx.save();
      ctx.rotate(mid);
      ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
      ctx.fillStyle = seg.kind === 'call' ? '#E7CE86' : 'rgba(240,230,200,0.5)';
      ctx.font = `${seg.kind === 'call' ? 30 : 23}px "Cormorant Garamond", serif`;
      ctx.fillText(seg.glyph, R - 100, 0);
      ctx.fillStyle = '#F0E6C8';
      ctx.font = `700 ${seg.kind === 'call' ? 21 : 28}px "Raleway", sans-serif`;
      ctx.fillText(seg.kind === 'call' ? 'Call' : seg.label, R - 32, 0);
      ctx.restore();
    }
    ctx.restore();
    ctx.beginPath(); ctx.arc(cx, cy, R - 12, 0, 7); ctx.lineWidth = 7; ctx.strokeStyle = '#C9A84C'; ctx.stroke();
    const hg = ctx.createRadialGradient(cx, cy - 8, 3, cx, cy, 52);
    hg.addColorStop(0, '#2a1c58'); hg.addColorStop(1, '#140b30');
    ctx.beginPath(); ctx.arc(cx, cy, 48, 0, 7); ctx.fillStyle = hg; ctx.fill();
    ctx.lineWidth = 3; ctx.strokeStyle = '#C9A84C'; ctx.stroke();
    ctx.fillStyle = '#E7CE86'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = '38px "Cormorant Garamond", serif'; ctx.fillText('☾', cx, cy + 2);
  };

  useEffect(() => {
    draw(rotRef.current);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => draw(rotRef.current));
  }, []);

  const animateTo = (idx: number, done: () => void) => {
    const jitter = (Math.random() - 0.5) * SEGA * 0.6;
    const desired = -(idx * SEGA + SEGA / 2);
    let target = rotRef.current - (rotRef.current % (2 * Math.PI)) + desired;
    const turns = reduce ? 1 : 6;
    while (target <= rotRef.current + 2 * Math.PI * turns) target += 2 * Math.PI;
    target += jitter;
    const start = rotRef.current, delta = target - start, dur = reduce ? 500 : 4400, t0 = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const frame = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      rotRef.current = start + delta * ease(p);
      draw(rotRef.current);
      if (p < 1) requestAnimationFrame(frame);
      else done();
    };
    requestAnimationFrame(frame);
  };

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
    animateTo(idx, () => {
      setResult(reward);
      onWin(reward);
    });
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
          className="relative w-full sm:w-[420px] sm:max-w-[92vw] bg-gradient-to-b from-[#1E1442] to-[#160d36] border border-[#C9A84C]/30 rounded-t-3xl sm:rounded-3xl px-5 pt-4 pb-7 text-center shadow-2xl"
          initial={{ y: 60, opacity: 0.5 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
          transition={{ type: 'spring', damping: 26, stiffness: 260 }}
        >
          <div className="sm:hidden w-9 h-1 rounded-full bg-[#F0E6C8]/25 mx-auto mb-3" />
          <h3 className="text-2xl text-[#F0E6C8]" style={{ fontFamily: '"rl-limo-1","rl-limo-2","Cormorant Garamond",serif', fontWeight: 400 }}>
            Dreh am Schicksal
          </h3>
          <p className="text-[#F0E6C8]/55 text-xs mb-3">Ein Dreh pro Bestellung · jedes Feld gewinnt.</p>

          <div className="relative mx-auto" style={{ width: 'min(72vw, 264px)', aspectRatio: '1' }}>
            <div className="absolute rounded-full pointer-events-none" style={{ inset: '-8%', background: 'radial-gradient(circle, rgba(201,168,76,0.22), transparent 62%)' }} />
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
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}
