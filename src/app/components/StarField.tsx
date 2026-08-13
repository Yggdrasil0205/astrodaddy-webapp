import React, { useRef, useEffect } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  isGold: boolean;       // colour-shifting stars
  colorPhase: number;    // random phase for color oscillation
  colorSpeed: number;    // how fast it shifts
}

export function StarField({ className = '', noConnect = false }: { className?: string; noConnect?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const starsRef = useRef<Star[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const buildStars = () => {
      starsRef.current = Array.from({ length: 280 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.8 + 0.4,
        baseOpacity: Math.random() * 0.55 + 0.15,
        twinkleSpeed: Math.random() * 0.022 + 0.006,
        twinkleOffset: Math.random() * Math.PI * 2,
        isGold: Math.random() < 0.18,            // ~18% are colour-shifting
        colorPhase: Math.random() * Math.PI * 2,
        colorSpeed: Math.random() * 0.008 + 0.003,
      }));
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      buildStars();
    };
    resize();

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', resize);

    const CONNECT_RADIUS = 240;
    const STAR_CONNECT = 120;
    let t = 0;

    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: mx, y: my } = mouseRef.current;
      const stars = starsRef.current;

      if (noConnect) {
        // Twinkling stars with colour-shift — no connections, no cursor
        for (const s of stars) {
          // stronger twinkle: amplitude 0.55 so opacity swings widely
          const twinkle = Math.sin(t * s.twinkleSpeed + s.twinkleOffset) * 0.55 + 0.45;
          const opacity  = Math.min(1, s.baseOpacity * twinkle);

          let color: string;
          if (s.isGold) {
            // smoothly oscillate between pergament (#F0E6C8) and gold (#C9A84C)
            const mix = (Math.sin(t * s.colorSpeed + s.colorPhase) + 1) / 2; // 0–1
            const r = Math.round(240 - (240 - 201) * mix); // 240→201
            const g = Math.round(230 - (230 - 168) * mix); // 230→168
            const b = Math.round(200 - (200 -  76) * mix); // 200→76
            color = `rgba(${r},${g},${b},${opacity})`;
          } else {
            color = `rgba(240,230,200,${opacity})`;
          }

          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        }
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const hasMousePos = mx > -9000;

      // Cursor glow
      if (hasMousePos) {
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 90);
        grad.addColorStop(0, 'rgba(201,168,76,0.10)');
        grad.addColorStop(0.5, 'rgba(123,95,212,0.04)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(mx, my, 90, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // subtle dot at cursor center
        ctx.beginPath();
        ctx.arc(mx, my, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(201,168,76,0.50)';
        ctx.fill();
      }

      // Stars near cursor
      const nearStars = stars.filter(s => {
        const d = Math.hypot(s.x - mx, s.y - my);
        return d < CONNECT_RADIUS;
      });

      // Lines: cursor → nearby stars (gold)
      for (const s of nearStars) {
        const d = Math.hypot(s.x - mx, s.y - my);
        const a = (1 - d / CONNECT_RADIUS) * 0.65;
        ctx.beginPath();
        ctx.moveTo(mx, my);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = `rgba(201,168,76,${a})`;
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }

      // Lines: star ↔ star within nearStars (pergament)
      for (let i = 0; i < nearStars.length; i++) {
        for (let j = i + 1; j < nearStars.length; j++) {
          const d = Math.hypot(nearStars[i].x - nearStars[j].x, nearStars[i].y - nearStars[j].y);
          if (d < STAR_CONNECT) {
            const a = (1 - d / STAR_CONNECT) * 0.28;
            ctx.beginPath();
            ctx.moveTo(nearStars[i].x, nearStars[i].y);
            ctx.lineTo(nearStars[j].x, nearStars[j].y);
            ctx.strokeStyle = `rgba(240,230,200,${a})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw stars
      for (const s of stars) {
        const twinkle = Math.sin(t * s.twinkleSpeed + s.twinkleOffset) * 0.35 + 0.65;
        const d = Math.hypot(s.x - mx, s.y - my);
        const isNear = d < CONNECT_RADIUS;
        const proximity = isNear ? (1 - d / CONNECT_RADIUS) : 0;

        const opacity = s.baseOpacity * twinkle + proximity * 0.65;
        const radius = s.size * (1 + proximity * 1.2);
        const color = isNear
          ? `rgba(201,168,76,${Math.min(1, opacity)})`
          : `rgba(240,230,200,${Math.min(1, opacity)})`;

        ctx.beginPath();
        ctx.arc(s.x, s.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ display: 'block' }}
    />
  );
}
