import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { StarField } from '../components/StarField';
import { ArrowRight } from 'lucide-react';
import { LinkIconByKey } from '../components/linkIcons';

interface LinkRow {
  id?: string;
  kind: string;                 // 'button' | 'social'
  label: string;
  sublabel?: string | null;
  url: string;
  icon?: string | null;
  badge?: string | null;
  highlight?: boolean;
}

// Shown until the DB answers, and as a fallback if the request fails – so the
// page is never blank.
const FALLBACK: LinkRow[] = [
  { kind: 'button', label: 'Shop', sublabel: 'Alle Angebote & Analysen', url: '/angebote', icon: 'shop' },
  { kind: 'button', label: 'Schriftliche Partnerschaftsanalyse', sublabel: 'Synastrie-Analyse für euch als Paar', url: '/angebote/2', icon: 'sparkles', badge: '»NEU«', highlight: true },
  { kind: 'button', label: 'Astrologische Tiefenanalyse', sublabel: 'Entdecke deine astrologische DNA', url: '/angebote/4', icon: 'sparkles' },
  { kind: 'button', label: 'Astrologische Beratung 90 Min', sublabel: 'Tiefgreifende Transformation mit Robert', url: '/angebote/6', icon: 'sparkles', badge: 'Premium' },
  { kind: 'social', label: 'Instagram', url: 'https://www.instagram.com/robert.wagner_astrologie/', icon: 'instagram' },
  { kind: 'social', label: 'TikTok', url: 'https://www.tiktok.com/@astrodaddy.official', icon: 'tiktok' },
  { kind: 'social', label: 'YouTube', url: 'https://www.youtube.com/@robertwagnerastrologie', icon: 'youtube' },
  { kind: 'social', label: 'Twitch', url: 'https://www.twitch.tv/astrodaddyofficial', icon: 'twitch' },
  { kind: 'social', label: 'E-Mail', url: 'mailto:info@astroversity.academy', icon: 'mail' },
];

const isInternal = (u: string) => u.startsWith('/');

export default function Links() {
  const [rows, setRows] = useState<LinkRow[]>(FALLBACK);

  useEffect(() => {
    let alive = true;
    fetch('/api/admin?r=links')
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(d => { if (alive && Array.isArray(d.links) && d.links.length) setRows(d.links); })
      .catch(() => { /* keep fallback */ });
    return () => { alive = false; };
  }, []);

  const buttons = rows.filter(r => r.kind === 'button');
  const socials = rows.filter(r => r.kind === 'social');

  return (
    <div className="min-h-screen bg-[#1B1040] relative flex flex-col items-center justify-start py-16 px-4">
      <StarField noConnect />

      <div className="relative z-10 w-full max-w-md mx-auto">

        {/* Profile */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#C9A84C]/40 mb-4 shadow-lg shadow-black/40">
            <img src="/robert-links.jpg" alt="Robert Wagner" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-xl text-[#F0E6C8] tracking-widest mb-1" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>
            Robert Wagner
          </h1>
          <p className="text-[#F0E6C8]/50 text-sm text-center">Astrologie · Spiritualität</p>
        </motion.div>

        {/* Social icons */}
        {socials.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
            className="flex items-center justify-center gap-4 mb-8 flex-wrap">
            {socials.map((s, i) => (
              <a key={s.id ?? `${s.label}-${i}`} href={s.url} target="_blank" rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 rounded-full bg-white/6 border border-white/10 flex items-center justify-center text-[#F0E6C8]/50 hover:text-[#C9A84C] hover:border-[#C9A84C]/40 hover:bg-[#C9A84C]/8 transition-all">
                <LinkIconByKey name={s.icon} className="w-5 h-5" />
              </a>
            ))}
          </motion.div>
        )}

        {/* Link buttons */}
        <div className="flex flex-col gap-3 mb-8">
          {buttons.map((link, i) => {
            const inner = (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all cursor-pointer ${
                  link.highlight
                    ? 'bg-[#C9A84C]/10 border-[#C9A84C]/40 hover:bg-[#C9A84C]/18 hover:border-[#C9A84C]/60'
                    : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  link.highlight ? 'bg-[#C9A84C]/20' : 'bg-white/8'
                }`}>
                  <LinkIconByKey name={link.icon} className={`w-4 h-4 ${link.highlight ? 'text-[#C9A84C]' : 'text-[#F0E6C8]/60'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-sm font-semibold ${link.highlight ? 'text-[#C9A84C]' : 'text-[#F0E6C8]'}`}>
                      {link.label}
                    </span>
                    {link.badge && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] border border-[#C9A84C]/40 text-[#C9A84C]">{link.badge}</span>
                    )}
                  </div>
                  {link.sublabel && <p className="text-[#F0E6C8]/40 text-xs mt-0.5">{link.sublabel}</p>}
                </div>
                <ArrowRight className={`w-4 h-4 shrink-0 ${link.highlight ? 'text-[#C9A84C]' : 'text-[#F0E6C8]/30'}`} />
              </motion.div>
            );

            const key = link.id ?? `${link.url}-${i}`;
            return isInternal(link.url)
              ? <Link key={key} to={link.url}>{inner}</Link>
              : <a key={key} href={link.url} target="_blank" rel="noopener noreferrer">{inner}</a>;
          })}
        </div>

        {/* Footer */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="text-center text-[#F0E6C8]/20 text-xs mt-8">
          © Robert Wagner Astrologie
        </motion.p>

      </div>
    </div>
  );
}
