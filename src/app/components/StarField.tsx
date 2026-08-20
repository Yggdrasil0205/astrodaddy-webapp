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

    // Touch devices have no cursor → drive the connections with an autonomous,
    // slowly & randomly wandering virtual point instead.
    const isTouch = typeof window.matchMedia === 'function' && window.matchMedia('(hover: none)').matches;

    let W = 0;
    let H = 0;

    const buildStars = () => {
      const count = isTouch ? 160 : 280; // fewer on mobile → crisper & lighter
      starsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
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
      // Render at the device pixel ratio (capped) so it stays sharp on Retina/mobile,
      // but keep all drawing coordinates in CSS pixels via the transform.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStars();
    };
    resize();

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    if (!isTouch) window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', resize);

    const CONNECT_RADIUS = isTouch ? 190 : 240;
    const STAR_CONNECT = 120;
    let t = 0;

    // Autonomous "virtual cursor" for touch devices
    let vx = W * 0.5;
    let vy = H * 0.45;
    let tx = Math.random() * W;
    let ty = Math.random() * H;
    let retargetAt = 0;

    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, W, H);

      // Slowly wander toward random targets (touch, connect mode only)
      if (!noConnect && isTouch) {
        if (t >= retargetAt) {
          tx = Math.random() * W;
          ty = Math.random() * H;
          retargetAt = t + 180 + Math.random() * 240; // new target every ~3–7s
        }
        vx += (tx - vx) * 0.01; // slow ease
        vy += (ty - vy) * 0.01;
        mouseRef.current = { x: vx, y: vy };
      }

      const { x: mx, y: my } = mouseRef.current;
      const stars = starsRef.current;

      if (noConnect) {
        // Twinkling stars with colour-shift — no connections, no cursor
        for (const s of stars) {
          const twinkle = Math.sin(t * s.twinkleSpeed + s.twinkleOffset) * 0.55 + 0.45;
          const opacity  = Math.min(1, s.baseOpacity * twinkle);

          let color: string;
          if (s.isGold) {
            const mix = (Math.sin(t * s.colorSpeed + s.colorPhase) + 1) / 2; // 0–1
            const r = Math.round(240 - (240 - 201) * mix);
            const g = Math.round(230 - (230 - 168) * mix);
            const b = Math.round(200 - (200 -  76) * mix);
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
      if (!isTouch) window.removeEventListener('mousemove', onMouseMove);
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
