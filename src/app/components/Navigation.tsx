import { Button } from './ui/button';
import { CartDropdown } from './CartDropdown';
import React from 'react';
import { Link } from 'react-router';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Home, ShoppingBag, Users, LogOut, LogIn, User, Video } from 'lucide-react';

export function Navigation() {
  const { getTotalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/30 border-b border-white/20 ${isScrolled ? 'bg-white/50' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src="/logo.png" 
              alt="HappyAger - mit Markus Miersbe" 
              className="h-16 w-auto transition-transform group-hover:scale-105"
            />
          </Link>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            <Link to="/">
              <Button
                variant={isActive('/') ? 'default' : 'ghost'}
                size="sm"
                className={`${
                  isActive('/') 
                    ? 'bg-[#8268AB] text-white hover:bg-[#8268AB]/90' 
                    : 'text-foreground hover:bg-white/50'
                }`}
              >
                <Home className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Start</span>
              </Button>
            </Link>
            
            <Link to="/shop">
              <Button
                variant={isActive('/shop') ? 'default' : 'ghost'}
                size="sm"
                className={`${
                  isActive('/shop') 
                    ? 'bg-[#8268AB] text-white hover:bg-[#8268AB]/90' 
                    : 'text-foreground hover:bg-white/50'
                }`}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Shop</span>
              </Button>
            </Link>
            
            <Link to="/community">
              <Button
                variant={isActive('/community') ? 'default' : 'ghost'}
                size="sm"
                className={`${
                  isActive('/community')
                    ? 'bg-[#8268AB] text-white hover:bg-[#8268AB]/90'
                    : 'text-foreground hover:bg-white/50'
                }`}
              >
                <Users className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Community</span>
              </Button>
            </Link>

            <Link to="/webinar">
              <Button
                variant={isActive('/webinar') ? 'default' : 'ghost'}
                size="sm"
                className={`${
                  isActive('/webinar')
                    ? 'bg-[#8268AB] text-white hover:bg-[#8268AB]/90'
                    : 'text-foreground hover:bg-white/50'
                }`}
              >
                <Video className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Free Webinar</span>
              </Button>
            </Link>

            {/* Cart Dropdown – temporarily hidden */}
            {/* <CartDropdown /> */}
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-2 ml-4">
                <div className="hidden md:flex items-center px-3 py-2 rounded-full bg-white/40 backdrop-blur-sm">
                  <User className="w-4 h-4 mr-2 text-[#8268AB]" />
                  <span className="text-sm">{user?.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-foreground hover:bg-white/50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button
                  variant={isActive('/login') ? 'default' : 'ghost'}
                  size="sm"
                  className={`ml-4 ${
                    isActive('/login') 
                      ? 'bg-[#8268AB] text-white hover:bg-[#8268AB]/90' 
                      : 'text-foreground hover:bg-white/50'
                  }`}
                >
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