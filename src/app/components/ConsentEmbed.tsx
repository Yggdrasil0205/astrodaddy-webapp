import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { useCookies } from '../context/CookieContext';

// ── Third-party embed behind consent (DSGVO) ──────────────────────────────────
// YouTube/TikTok/Instagram iframes transfer the visitor's IP and set cookies as
// soon as they load. They are only mounted after the visitor either clicks
// "Beitrag laden" or has accepted "Funktionale Cookies" in the cookie banner –
// and even then only once scrolled near the viewport (performance).

export function ConsentEmbed({ provider, children, className, style }: {
  provider: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { preferences, openSettings } = useCookies();
  const [clicked, setClicked] = useState(false);
  const allowed = clicked || !!preferences?.functional;

  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, { rootMargin: '400px' });
    io.observe(el);
    return () => io.disconnect();
  }, [inView]);

  return (
    <div ref={ref} className={className} style={style}>
      {allowed ? (inView ? children : null) : (
        <div className="w-full h-full min-h-[inherit] flex flex-col items-center justify-center gap-3 p-6 text-center bg-[#1B1040]/10 rounded-xl">
          <p className="text-[#1B1040]/70 text-xs leading-relaxed max-w-[260px]">
            Beim Laden dieses Beitrags werden Daten (z. B. deine IP-Adresse) an {provider} übertragen und ggf.
            Cookies gesetzt. Mehr in der <Link to="/datenschutz" className="underline">Datenschutzerklärung</Link>.
          </p>
          <button
            type="button"
            onClick={() => setClicked(true)}
            className="px-4 py-2 rounded-lg bg-[#1B1040] text-[#F0E6C8] text-xs font-semibold hover:bg-[#1B1040]/85 transition-colors"
          >
            {provider}-Beitrag laden
          </button>
          <button type="button" onClick={openSettings} className="text-[#1B1040]/50 text-[11px] underline">
            Immer laden (Cookie-Einstellungen)
          </button>
        </div>
      )}
    </div>
  );
}
