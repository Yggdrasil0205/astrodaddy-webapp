import React from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { StarField } from '../components/StarField';
import { Instagram, Youtube, Mail, Twitch, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';

const TikTokIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
  </svg>
);

const links = [
  {
    label: 'Shop',
    sub: 'Alle Angebote & Analysen',
    to: '/angebote',
    external: false,
    badge: null,
    icon: ShoppingBag,
    highlight: false,
  },
  {
    label: 'Schriftliche Partnerschaftsanalyse',
    sub: 'Synastrie-Analyse für euch als Paar',
    to: '/angebote/2',
    external: false,
    badge: '»NEU«',
    icon: Sparkles,
    highlight: true,
  },
  {
    label: 'Astrologische Tiefenanalyse',
    sub: 'Entdecke deine astrologische DNA',
    to: '/angebote/4',
    external: false,
    badge: null,
    icon: Sparkles,
    highlight: false,
  },
  {
    label: 'Astrologische Beratung 90 Min',
    sub: 'Tiefgreifende Transformation mit Robert',
    to: '/angebote/6',
    external: false,
    badge: 'Premium',
    icon: Sparkles,
    highlight: false,
  },
];

const socials = [
  { icon: Instagram, href: 'https://www.instagram.com/robert.wagner_astrologie/', label: 'Instagram' },
  { icon: TikTokIcon, href: 'https://www.tiktok.com/@astrodaddy.official', label: 'TikTok' },
  { icon: Youtube, href: 'https://www.youtube.com/@robertwagnerastrologie', label: 'YouTube' },
  { icon: Twitch, href: 'https://www.twitch.tv/astrodaddyofficial', label: 'Twitch' },
  { icon: Mail, href: 'mailto:adastra.lights@gmail.com', label: 'E-Mail' },
];

export default function Links() {
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          className="flex items-center justify-center gap-4 mb-8">
          {socials.map(s => {
            const Icon = s.icon;
            return (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/6 border border-white/10 flex items-center justify-center text-[#F0E6C8]/50 hover:text-[#C9A84C] hover:border-[#C9A84C]/40 hover:bg-[#C9A84C]/8 transition-all">
                <Icon />
              </a>
            );
          })}
        </motion.div>

        {/* Link buttons */}
        <div className="flex flex-col gap-3 mb-8">
          {links.map((link, i) => {
            const Icon = link.icon;
            const inner = (
              <motion.div
                key={link.to}
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
                  <Icon className={`w-4 h-4 ${link.highlight ? 'text-[#C9A84C]' : 'text-[#F0E6C8]/60'}`} />
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
                  <p className="text-[#F0E6C8]/40 text-xs mt-0.5">{link.sub}</p>
                </div>
                <ArrowRight className={`w-4 h-4 shrink-0 ${link.highlight ? 'text-[#C9A84C]' : 'text-[#F0E6C8]/30'}`} />
              </motion.div>
            );

            return link.external
              ? <a key={link.to} href={link.to} target="_blank" rel="noopener noreferrer">{inner}</a>
              : <Link key={link.to} to={link.to}>{inner}</Link>;
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
