import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, ShoppingBag, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MAIN_NAV = [
  { label: 'The Founders Series', href: '/CoffeeCollection' },
  { label: 'Apparel', href: '/Shop' },
  { label: 'The Torch Box', href: '/TheTorchBox' },
  { label: 'Our Legacy', href: '/Mission' },
  { label: 'Journal', href: '/Journal' },
  { label: 'Contact', href: '/Contact' },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const close = () => setIsOpen(false);

  return (
    <nav
      className="w-full transition-all duration-500"
      style={{
        backgroundColor: scrolled ? 'rgba(5,5,8,0.98)' : 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(196,163,90,0.18)' : '1px solid rgba(196,163,90,0.06)',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Main row */}
        <div className="flex items-center justify-between h-14">

          {/* Left nav — desktop */}
          <div className="hidden md:flex items-center gap-7 flex-1">
            {MAIN_NAV.slice(0, 3).map((item) => (
              <Link key={item.label} to={item.href}
                className="nav-link font-mono uppercase tracking-[0.14em] whitespace-nowrap transition-colors hover:text-white"
                style={{ fontSize: '10px', color: 'rgba(255,255,255,0.48)' }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Center logo */}
          <div className="flex-shrink-0 mx-4 md:mx-8">
            <Link to="/" className="flex items-center justify-center">
              <img
                src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/a6bbf1327_Untitleddesign9.png"
                alt="Torch Republic"
                className="h-10 md:h-11 w-auto"
                style={{ filter: 'brightness(1.05)' }}
              />
            </Link>
          </div>

          {/* Right nav — desktop */}
          <div className="hidden md:flex items-center gap-7 flex-1 justify-end">
            {MAIN_NAV.slice(3).map((item) => (
              <Link key={item.label} to={item.href}
                className="nav-link font-mono uppercase tracking-[0.14em] whitespace-nowrap transition-colors hover:text-white"
                style={{ fontSize: '10px', color: 'rgba(255,255,255,0.48)' }}
              >
                {item.label}
              </Link>
            ))}
            {/* Icons */}
            <div className="flex items-center gap-4 ml-4 pl-4" style={{ borderLeft: '1px solid rgba(196,163,90,0.15)' }}>
              <button className="transition-opacity hover:opacity-70" style={{ color: 'rgba(255,255,255,0.45)' }}>
                <Search className="w-4 h-4" />
              </button>
              <a href="https://torch-republic.myshopify.com/cart" className="relative transition-opacity hover:opacity-70" style={{ color: 'rgba(255,255,255,0.45)' }}>
                <ShoppingBag className="w-4 h-4" />
              </a>
              <Link to="/Profile" className="transition-opacity hover:opacity-70" style={{ color: 'rgba(255,255,255,0.45)' }}>
                <User className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Mobile: hamburger + icons */}
          <div className="md:hidden flex items-center gap-4">
            <a href="https://torch-republic.myshopify.com/cart" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <ShoppingBag className="w-4 h-4" />
            </a>
            <button onClick={() => setIsOpen(!isOpen)} style={{ color: 'rgba(255,255,255,0.5)' }}>
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(5,5,8,0.99)', borderTop: '1px solid rgba(196,163,90,0.08)' }}
          >
            <div className="px-6 py-6 space-y-0">
              {MAIN_NAV.map((item, i) => (
                <Link key={item.label} to={item.href} onClick={close}
                  className="flex items-center justify-between py-4 font-mono text-sm tracking-[0.18em] uppercase transition-colors hover:text-white"
                  style={{
                    color: 'rgba(255,255,255,0.5)',
                    borderBottom: i < MAIN_NAV.length - 1 ? '1px solid rgba(196,163,90,0.07)' : 'none',
                  }}
                >
                  <span>{item.label}</span>
                  <span style={{ color: 'rgba(196,163,90,0.4)', fontSize: '10px' }}>→</span>
                </Link>
              ))}
              <div className="pt-6">
                <Link to="/Profile" onClick={close}
                  className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase"
                  style={{ color: 'rgba(196,163,90,0.5)' }}
                >
                  <User className="w-3.5 h-3.5" />
                  Account
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}