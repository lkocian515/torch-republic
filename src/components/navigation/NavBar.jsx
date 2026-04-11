import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MAIN_NAV = [
  { label: 'Shop', href: '/Shop' },
  { label: 'Coffee', href: '/CoffeeCollection' },
  { label: 'Best Sellers', href: '/BestSellers' },
  { label: 'Torch Box', href: '/TheTorchBox', highlight: true },
  { label: 'Our Story', href: '/Mission' },
  { label: 'Journal', href: '/Journal' },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsOpen(false);
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const close = () => { setIsOpen(false); setOpenDropdown(null); };

  return (
    <nav ref={navRef} className="w-full transition-all duration-500" style={{
      backgroundColor: scrolled ? 'rgba(10,14,26,0.95)' : 'rgba(0,0,0,0.6)',
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
          <div className="hidden md:flex items-center gap-8">
            {MAIN_NAV.map((item) => (
              <Link key={item.label} to={item.href}
                className="nav-link font-mono uppercase tracking-[0.15em] transition-colors hover:text-white"
                style={{ fontSize: '11px', color: item.highlight ? '#C9A24A' : 'rgba(255,255,255,0.5)', fontWeight: item.highlight ? 700 : 400 }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Spacer to balance mobile */}
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
              {MAIN_NAV.map((item) =>
                item.children ? (
                  <div key={item.label}>
                    <p className="font-mono text-[9px] tracking-[0.4em] uppercase pt-5 pb-3" style={{ color: 'rgba(201,162,74,0.45)' }}>{item.label}</p>
                    {item.children.map(child => (
                      <Link key={child.label} to={child.href} onClick={close}
                        className="block py-2.5 font-mono text-xs tracking-[0.15em] uppercase transition-colors hover:text-white"
                        style={{ color: 'rgba(255,255,255,0.5)', paddingLeft: '12px' }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link key={item.label} to={item.href} onClick={close}
                    className="block py-3 font-mono text-sm tracking-[0.2em] uppercase font-bold"
                    style={{ color: item.highlight ? '#C9A24A' : 'rgba(255,255,255,0.7)', borderTop: '1px solid rgba(201,162,74,0.06)', marginTop: '16px', paddingTop: '16px' }}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}