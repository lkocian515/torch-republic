import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MAIN_NAV = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/CoffeeCollection' },
  { label: 'Best Sellers', href: '/BestSellers' },
  { label: 'Our Story', href: '/Mission' },
  { label: 'Journal', href: '/Journal' },
  { label: 'Contact', href: '/Contact' },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const close = () => setIsOpen(false);

  return (
    <nav className="w-full transition-all duration-500" style={{
      backgroundColor: scrolled ? 'rgba(10,14,26,0.97)' : 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(12px)',
      borderBottom: scrolled ? '1px solid rgba(196,163,90,0.2)' : '1px solid transparent',
    }}>
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="relative flex items-center justify-between h-14 md:h-16">

          {/* Hamburger mobile */}
          <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-9">
            {MAIN_NAV.map((item) => (
              <Link key={item.label} to={item.href}
                className="nav-link font-mono uppercase tracking-[0.15em] transition-colors hover:text-white"
                style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Spacer */}
          <div className="md:hidden w-5" />
        </div>

        {/* Center: Logo */}
        <div className="flex justify-center py-3">
          <Link to="/" className="flex items-center">
            <img
              src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/a6bbf1327_Untitleddesign9.png"
              alt="Torch Republic"
              className="h-16 md:h-20 w-auto"
            />
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(8,8,8,0.99)', borderTop: '1px solid rgba(201,162,74,0.08)' }}
          >
            <div className="px-6 py-8 space-y-1">
              {MAIN_NAV.map((item) => (
                <Link key={item.label} to={item.href} onClick={close}
                  className="block py-3.5 font-mono text-sm tracking-[0.2em] uppercase transition-colors hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.55)', borderBottom: '1px solid rgba(201,162,74,0.06)' }}
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