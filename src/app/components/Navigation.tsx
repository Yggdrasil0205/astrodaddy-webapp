import React from 'react';
import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Home, Star, Users, LogOut, LogIn, User, BookOpen, Moon } from 'lucide-react';
import { Button } from './ui/button';

export function Navigation() {
  const { isAuthenticated, user, logout } = useAuth();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const active = (p: string) => location.pathname === p;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
      scrolled
        ? 'bg-[#1B1040]/95 border-white/10 backdrop-blur-xl'
        : 'bg-[#1B1040]/60 border-white/5 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-3">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <Moon className="w-6 h-6 text-[#C9A84C]" />
            <span className="text-lg font-semibold tracking-widest text-[#F0E6C8]"
              style={{ fontFamily: 'Cinzel, serif' }}>
              ASTRODADDY
            </span>
          </Link>

          {/* Links */}
          <div className="flex items-center gap-1">
            {[
              { to: '/',           label: 'Start',      icon: Home },
              { to: '/angebote',   label: 'Angebote',   icon: Star },
              { to: '/ausbildung', label: 'Ausbildung', icon: BookOpen },
              { to: '/community',  label: 'Community',  icon: Users },
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
