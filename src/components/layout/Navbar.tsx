
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  ShoppingCart, 
  Menu, 
  X,
  User,
  Home,
  ShoppingBag,
  BarChart,
  MessageSquare,
  Code,
  LogIn,
  Store
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCart } from '@/contexts/CartContext';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const { getCartItemCount } = useCart();
  const cartItemCount = getCartItemCount();
  
  const navLinks = [
    { path: '/', label: 'Beranda', icon: Home },
    { path: '/marketplace', label: 'Pasar', icon: ShoppingBag },
    { path: '/dashboard', label: 'Dasbor IoT', icon: BarChart },
    { path: '/forum', label: 'Forum Komunitas', icon: MessageSquare },
    { path: '/projects', label: 'Sumber Terbuka', icon: Code },
    { path: '/seller', label: 'Dasbor Penjual', icon: Store },
  ];
  
  const isActivePath = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          )}
          
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-eco-500 to-eco-600 flex items-center justify-center">
              <span className="text-white text-sm font-bold">AG</span>
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">AgriTech Hub</span>
          </Link>
        </div>
        
        {!isMobile && (
          <nav className="mx-4 flex items-center space-x-1 lg:space-x-2 overflow-x-auto scrollbar-hide">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "nav-link flex items-center gap-1.5 text-sm whitespace-nowrap",
                  isActivePath(link.path) && "nav-link-active"
                )}
              >
                <link.icon className="h-4 w-4" />
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
        )}
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Cari">
            <Search className="h-5 w-5" />
          </Button>
          
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative" aria-label="Keranjang">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-eco-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </Link>
          
          <Link to="/login">
            <Button variant="ghost" size="sm" className="gap-1">
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline-block">Masuk</span>
            </Button>
          </Link>
        </div>
      </div>
      
      {isMobile && isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-background border-b shadow-lg animate-fade-in z-50">
          <nav className="container py-4 flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "nav-link flex items-center gap-2 p-2 rounded-md",
                  isActivePath(link.path) && "nav-link-active bg-secondary"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                <link.icon className="h-5 w-5" />
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
