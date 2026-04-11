import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, ShoppingBag, User } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const NAV_LEFT = [
  { label: 'Founders Series', href: '/CoffeeCollection' },
  { label: 'Apparel', href: '/Shop' },
  { label: 'Torch Box', href: '/TheTorchBox' },
];

const NAV_RIGHT = [
  { label: 'Our Legacy', href: '/Mission' },
  { label: 'Journal', href: '/Journal' },
  { label: 'Contact', href: '/Contact' },
];

const ALL_NAV = [...NAV_LEFT, ...NAV_RIGHT];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      style={{
        height: '52px',
        backgroundColor: scrolled ? 'rgba(4,4,6,0.97)' : 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(196,163,90,0.14)' : '1px solid rgba(196,163,90,0.05)',
        transition: 'background-color 0.25s ease, border-color 0.25s ease',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-full flex items-center justify-between">

        {/* Left nav — desktop */}
        <div className="hidden md:flex items-center gap-8 flex-1">
          {NAV_LEFT.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="nav-link whitespace-nowrap transition-colors hover:text-white"
              style={{ fontSize: '10.5px', fontFamily: 'var(--font-heading)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.46)', fontWeight: 500 }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Center logo */}
        <div className="flex-shrink-0 mx-6">
          <Link to="/" className="flex items-center justify-center">
            <img
              src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/a6bbf1327_Untitleddesign9.png"
              alt="Torch Republic"
              style={{ height: '36px', width: 'auto', filter: 'brightness(1.05)' }}
            />
          </Link>
        </div>

        {/* Right nav — desktop */}
        <div className="hidden md:flex items-center flex-1 justify-end gap-8">
          {NAV_RIGHT.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="nav-link whitespace-nowrap transition-colors hover:text-white"
              style={{ fontSize: '10.5px', fontFamily: 'var(--font-heading)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.46)', fontWeight: 500 }}
            >
              {item.label}
            </Link>
          ))}

          {/* Icons */}
          <div className="flex items-center gap-4 ml-4 pl-4" style={{ borderLeft: '1px solid rgba(196,163,90,0.12)' }}>
            <button style={{ color: 'rgba(255,255,255,0.38)' }} className="hover:text-white transition-colors">
              <Search className="w-[15px] h-[15px]" />
            </button>
            <a href="https://torch-republic.myshopify.com/cart" style={{ color: 'rgba(255,255,255,0.38)' }} className="hover:text-white transition-colors relative">
              <ShoppingBag className="w-[15px] h-[15px]" />
            </a>
            <Link to="/Profile" style={{ color: 'rgba(255,255,255,0.38)' }} className="hover:text-white transition-colors">
              <User className="w-[15px] h-[15px]" />
            </Link>
          </div>
        </div>

        {/* Mobile right */}
        <div className="md:hidden flex items-center gap-4">
          <a href="https://torch-republic.myshopify.com/cart" style={{ color: 'rgba(255,255,255,0.45)' }}>
            <ShoppingBag className="w-4 h-4" />
          </a>
          <button onClick={() => setOpen(!open)} style={{ color: 'rgba(255,255,255,0.45)' }}>
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(4,4,6,0.99)', borderTop: '1px solid rgba(196,163,90,0.07)' }}
          >
            <div className="px-6 py-5 space-y-0">
              {ALL_NAV.map((item, i) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-3.5 transition-colors hover:text-white"
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.48)',
                    borderBottom: i < ALL_NAV.length - 1 ? '1px solid rgba(196,163,90,0.06)' : 'none',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 500,
                  }}
                >
                  <span>{item.label}</span>
                  <span style={{ color: 'rgba(196,163,90,0.35)', fontSize: '10px' }}>→</span>
                </Link>
              ))}
              <div className="pt-5">
                <Link to="/Profile" onClick={() => setOpen(false)}
                  className="flex items-center gap-2"
                  style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(196,163,90,0.45)', fontFamily: 'var(--font-heading)' }}
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