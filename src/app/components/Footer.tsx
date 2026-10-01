import React from 'react';
import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className="bg-black text-[#F0E6C8]/70 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        <span>© Robert Wagner 2026</span>
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Link to="/agb" className="hover:text-[#C9A84C] transition-colors">AGB</Link>
          <Link to="/widerruf" className="hover:text-[#C9A84C] transition-colors">Widerruf</Link>
          <Link to="/datenschutz" className="hover:text-[#C9A84C] transition-colors">Datenschutz</Link>
          <Link to="/impressum" className="hover:text-[#C9A84C] transition-colors">Impressum</Link>
        </nav>
      </div>
    </footer>
  );
}
