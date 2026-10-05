import React from 'react';
import {
  ShoppingBag, Sparkles, Star, BookOpen, CalendarDays, Heart, Gift,
  Link as LinkIcon, Instagram, Youtube, Twitch, Facebook, Mail, Globe,
} from 'lucide-react';

// Custom TikTok glyph (lucide has none).
export const TikTokIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
  </svg>
);

type IconComp = React.ComponentType<{ className?: string }>;

const MAP: Record<string, IconComp> = {
  // button icons
  sparkles: Sparkles, shop: ShoppingBag, star: Star, book: BookOpen,
  calendar: CalendarDays, heart: Heart, gift: Gift, link: LinkIcon,
  // social icons
  instagram: Instagram, tiktok: TikTokIcon, youtube: Youtube, twitch: Twitch,
  facebook: Facebook, mail: Mail, website: Globe,
};

// Icon keys offered in the admin editor (per kind).
export const BUTTON_ICON_KEYS = ['sparkles', 'shop', 'star', 'book', 'calendar', 'heart', 'gift', 'link'];
export const SOCIAL_ICON_KEYS = ['instagram', 'tiktok', 'youtube', 'twitch', 'facebook', 'mail', 'website'];

export function LinkIconByKey({ name, className }: { name?: string | null; className?: string }) {
  const Comp = (name && MAP[name]) || Sparkles;
  return <Comp className={className} />;
}
