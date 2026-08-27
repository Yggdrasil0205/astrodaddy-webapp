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
    const prefersReduced = typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 0;
    let H = 0;

    const buildStars = () => {
      // Far fewer points on mobile → lighter to render and less "busy".
      const count = isTouch ? 90 : 280;
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
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      // Bail until the canvas is actually laid out — offset size can be 0 or partial
      // at mount (especially on mobile). Also skip redundant rebuilds when unchanged.
      if (w === 0 || h === 0) return;
      if (w === W && h === H && canvas.width) return;
      // Render at the device pixel ratio (capped) so it stays sharp on Retina/mobile,
      // but keep all drawing coordinates in CSS pixels via the transform.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = w;
      H = h;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStars();
    };
    resize();

    // Re-measure whenever the canvas is truly laid out or its size changes (initial
    // layout, mobile address-bar show/hide, font-load reflow, orientation change).
    // Fixes the "zoomed/blurry stars" bug from measuring a 0/partial size at mount.
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    if (!isTouch) window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', resize);

    // Tighter reach on mobile → fewer, shorter lines.
    const CONNECT_RADIUS = isTouch ? 150 : 240;
    const CONNECT_R2 = CONNECT_RADIUS * CONNECT_RADIUS;
    const STAR_CONNECT = 120;
    const STAR_CONNECT2 = STAR_CONNECT * STAR_CONNECT;
    // The star↔star web is the heaviest part (O(n²)) and the busiest visually —
    // drop it on mobile, keep only the cursor→star constellation.
    const drawStarWeb = !isTouch;
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

      // Wander toward random targets (touch, connect mode only) — faster & livelier.
      if (!noConnect && isTouch) {
        if (t >= retargetAt) {
          tx = Math.random() * W;
          ty = Math.random() * H;
          retargetAt = t + 100 + Math.random() * 140; // new target every ~1.6–4s
        }
        vx += (tx - vx) * 0.02; // quicker ease
        vy += (ty - vy) * 0.02;
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
        if (!prefersReduced) rafRef.current = requestAnimationFrame(draw);
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

      // Stars near cursor (squared-distance test → no sqrt for far stars)
      const nearStars: { s: Star; d: number }[] = [];
      if (hasMousePos) {
        for (const s of stars) {
          const dx = s.x - mx, dy = s.y - my;
          const d2 = dx * dx + dy * dy;
          if (d2 < CONNECT_R2) nearStars.push({ s, d: Math.sqrt(d2) });
        }
      }

      // Lines: cursor → nearby stars (gold)
      for (const n of nearStars) {
        const a = (1 - n.d / CONNECT_RADIUS) * 0.65;
        ctx.beginPath();
        ctx.moveTo(mx, my);
        ctx.lineTo(n.s.x, n.s.y);
        ctx.strokeStyle = `rgba(201,168,76,${a})`;
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }

      // Lines: star ↔ star within nearStars (pergament) — desktop only
      if (drawStarWeb) {
        for (let i = 0; i < nearStars.length; i++) {
          const a1 = nearStars[i].s;
          for (let j = i + 1; j < nearStars.length; j++) {
            const b1 = nearStars[j].s;
            const dx = a1.x - b1.x, dy = a1.y - b1.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < STAR_CONNECT2) {
              const a = (1 - Math.sqrt(d2) / STAR_CONNECT) * 0.28;
              ctx.beginPath();
              ctx.moveTo(a1.x, a1.y);
              ctx.lineTo(b1.x, b1.y);
              ctx.strokeStyle = `rgba(240,230,200,${a})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      // Draw stars (sqrt only for the ones actually near the cursor)
      for (const s of stars) {
        const twinkle = Math.sin(t * s.twinkleSpeed + s.twinkleOffset) * 0.35 + 0.65;
        let proximity = 0;
        if (hasMousePos) {
          const dx = s.x - mx, dy = s.y - my;
          const d2 = dx * dx + dy * dy;
          if (d2 < CONNECT_R2) proximity = 1 - Math.sqrt(d2) / CONNECT_RADIUS;
        }

        const opacity = s.baseOpacity * twinkle + proximity * 0.65;
        const radius = s.size * (1 + proximity * 1.2);
        const color = proximity > 0
          ? `rgba(201,168,76,${Math.min(1, opacity)})`
          : `rgba(240,230,200,${Math.min(1, opacity)})`;

        ctx.beginPath();
        ctx.arc(s.x, s.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }

      if (!prefersReduced) rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
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
