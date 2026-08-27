import React from 'react';
import { Link, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Home, ShoppingBag, LogOut, LogIn, User, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { CartDropdown } from './CartDropdown';

export function Navigation() {
  const { isAuthenticated, user, logout } = useAuth();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const { pathname } = useLocation();
  const active = (p: string) =>
    p === '/' ? pathname === '/' : pathname === p || pathname.startsWith(p + '/');

  // On the Astroversity subpage the header carries the Astroversity logo instead.
  const onAstroversity = pathname.startsWith('/astroversity');
  const logo = onAstroversity
    ? { src: '/astroversity-logo.svg', alt: 'Astroversity Academy', mobileW: 'w-8' }
    : { src: '/robert-wagner-logo.svg', alt: 'Robert Wagner', mobileW: 'w-8' };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
      scrolled
        ? 'bg-[#1B1040]/95 border-white/10 backdrop-blur-xl'
        : 'bg-[#1B1040]/60 border-white/5 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-3">

          {/* Logo — full wordmark on desktop, emblem-only (clipped) on mobile.
              Swaps to the Astroversity logo on the Astroversity subpage. */}
          <Link to="/" className="flex items-center group shrink-0" aria-label="Startseite">
            <span className={`sm:hidden block h-6 ${logo.mobileW} overflow-hidden`}>
              <img src={logo.src} alt={logo.alt} className="h-6 w-auto max-w-none" />
            </span>
            <img src={logo.src} alt={logo.alt} className="hidden sm:block h-6 md:h-7 w-auto" />
          </Link>

          {/* Links */}
          <div className="flex items-center gap-1">
            {[
              { to: '/',                    label: 'Start',                 icon: Home },
              { to: '/angebote',            label: 'Shop',                  icon: ShoppingBag },
              { to: '/astroversity',        label: 'Astroversity Academy',  icon: BookOpen },
            ].map(({ to, label, icon: Icon }) => (
              <Link key={to} to={to}>
                <button className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  active(to)
                    ? 'text-[#C9A84C] bg-white/8'
                    : 'text-[#F0E6C8]/70 hover:text-[#F0E6C8] hover:bg-white/5'
                }`}>
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              </Link>
            ))}

            <div className="w-px h-5 bg-white/15 mx-2" />

            <CartDropdown />

            <div className="w-px h-5 bg-white/15 mx-1" />

            {isAuthenticated ? (
              <>
                <Link to="/mitglieder">
                  <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#F0E6C8]/70 hover:text-[#F0E6C8] hover:bg-white/5 transition-all">
                    <User className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">{user?.user_metadata?.full_name ?? user?.email?.split('@')[0]}</span>
                  </button>
                </Link>
                <button onClick={logout} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-[#F0E6C8]/50 hover:text-[#F0E6C8] hover:bg-white/5 transition-all">
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="gold" size="sm" className="ml-1 rounded-lg px-4">
                  <LogIn className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Login</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
