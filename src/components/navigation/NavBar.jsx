import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Menu, X, ShoppingCart, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'Shop', page: 'Collections' },
  { label: 'Best Sellers', page: 'BestSellers' },
  { label: 'Our Mission', page: 'Mission' },
  { label: 'Contact', page: 'Contact' },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-background/95 backdrop-blur-md border-b border-border' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative flex items-center justify-center h-16 md:h-20">
          {/* Left: Hamburger (mobile) + Nav (desktop) */}
          <div className="absolute left-0 flex items-center gap-6">
            <button 
              className="md:hidden text-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  to={createPageUrl(item.page)}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-mono tracking-wider uppercase"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Center: Logo */}
          <Link to={createPageUrl('Home')} className="flex items-center">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69afc77e4c80e5e88ca6e3ec/5dab8a01f_file_0000000013ac71f5b6204ade785a0d15.png"
              alt="Torch Republic"
              className="h-10 md:h-14 w-auto"
            />
          </Link>

          {/* Right icons */}
          <div className="absolute right-0 flex items-center gap-4">
            <button className="text-muted-foreground hover:text-primary transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-muted-foreground hover:text-primary transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/98 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  to={createPageUrl(item.page)}
                  onClick={() => setIsOpen(false)}
                  className="block text-foreground hover:text-primary transition-colors text-lg font-heading font-semibold tracking-wider uppercase"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}