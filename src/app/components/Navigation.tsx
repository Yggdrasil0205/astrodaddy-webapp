import { Button } from './ui/button';
import React from 'react';
import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Home, Star, Users, LogOut, LogIn, User, BookOpen, Moon } from 'lucide-react';

export function Navigation() {
  const { isAuthenticated, user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/30 border-b border-white/20 ${isScrolled ? 'bg-white/50' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Moon className="w-8 h-8 text-[#5C3D8F]" />
            <span className="text-xl font-bold bg-gradient-to-r from-[#5C3D8F] to-[#C9A84C] bg-clip-text text-transparent">
              AstroDaddy
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            <Link to="/">
              <Button variant={isActive('/') ? 'default' : 'ghost'} size="sm"
                className={isActive('/') ? 'bg-[#5C3D8F] text-white hover:bg-[#5C3D8F]/90' : 'text-foreground hover:bg-white/50'}>
                <Home className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Start</span>
              </Button>
            </Link>

            <Link to="/angebote">
              <Button variant={isActive('/angebote') ? 'default' : 'ghost'} size="sm"
                className={isActive('/angebote') ? 'bg-[#5C3D8F] text-white hover:bg-[#5C3D8F]/90' : 'text-foreground hover:bg-white/50'}>
                <Star className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Angebote</span>
              </Button>
            </Link>

            <Link to="/ausbildung">
              <Button variant={isActive('/ausbildung') ? 'default' : 'ghost'} size="sm"
                className={isActive('/ausbildung') ? 'bg-[#5C3D8F] text-white hover:bg-[#5C3D8F]/90' : 'text-foreground hover:bg-white/50'}>
                <BookOpen className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Ausbildung</span>
              </Button>
            </Link>

            <Link to="/community">
              <Button variant={isActive('/community') ? 'default' : 'ghost'} size="sm"
                className={isActive('/community') ? 'bg-[#5C3D8F] text-white hover:bg-[#5C3D8F]/90' : 'text-foreground hover:bg-white/50'}>
                <Users className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Community</span>
              </Button>
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-2 ml-4">
                <Link to="/mitglieder">
                  <div className="hidden md:flex items-center px-3 py-2 rounded-full bg-white/40 backdrop-blur-sm cursor-pointer hover:bg-white/60 transition-colors">
                    <User className="w-4 h-4 mr-2 text-[#5C3D8F]" />
                    <span className="text-sm">{user?.user_metadata?.full_name ?? user?.email?.split('@')[0] ?? 'Mitglied'}</span>
                  </div>
                </Link>
                <Button variant="ghost" size="sm" onClick={logout} className="text-foreground hover:bg-white/50">
                  <LogOut className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant={isActive('/login') ? 'default' : 'ghost'} size="sm"
                  className={`ml-4 ${isActive('/login') ? 'bg-[#5C3D8F] text-white hover:bg-[#5C3D8F]/90' : 'text-foreground hover:bg-white/50'}`}>
                  <LogIn className="w-4 h-4 mr-2" />
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
