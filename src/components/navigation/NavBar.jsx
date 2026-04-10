import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Menu, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MAIN_NAV = [
  { label: 'Coffee', href: '/CoffeeCollection' },
  { label: 'Founders Series', href: '/CoffeeCollection' },
  { label: 'Torch Box', href: '/TheTorchBox' },
  { label: 'Journal', href: '/Journal' },
  { label: 'Shop', href: '/Shop' },
  { label: 'About', href: '/Mission' },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const close = () => setIsOpen(false);

  return (
    <nav ref={navRef} className="w-full transition-all duration-500" style={{
      backgroundColor: scrolled ? 'rgba(10,14,26,0.95)' : 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(12px)',
      borderBottom: scrolled ? '1px solid rgba(196,163,90,0.2)' : '1px solid transparent',
    }}>
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="relative flex items-center justify-between h-14 md:h-16">

          {/* Left: hamburger (mobile) + nav links (desktop) */}
          <div className="flex items-center gap-6">
            <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {MAIN_NAV.map((item) => (
                item.href.startsWith('http') ? (
                  <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                    className="nav-link font-mono uppercase tracking-[0.15em] transition-colors hover:text-primary"
                    style={{ fontSize: '11px', color: item.label === 'Coffee' ? '#C4A35A' : 'rgba(255,255,255,0.5)' }}>
                    {item.label}
                  </a>
                ) : (
                  <Link key={item.label} to={item.href}
                    className="nav-link font-mono uppercase tracking-[0.15em] transition-colors hover:text-primary"
                    style={{ fontSize: '11px', color: item.label === 'Torch Box' ? '#C4A35A' : 'rgba(255,255,255,0.5)' }}>
                    {item.label}
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            <a href="https://torch-republic.com/cart" className="text-muted-foreground hover:text-primary transition-colors">
              <Search className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Center: Logo */}
        <div className="flex justify-center py-3">
          <Link to="/" className="flex items-center">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69afc77e4c80e5e88ca6e3ec/c53d23798_IMG_20260213_173838.png"
              alt="Torch Republic"
              className="h-16 md:h-20 w-auto"
            />
          </Link>
        </div>
      </div>

      {/* Mobile Menu - simplified */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/98 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="px-6 py-8 space-y-5">
              {MAIN_NAV.map((item) =>
                item.external ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={close}
                    className="block text-sm font-mono tracking-[0.15em] transition-colors hover:text-primary"
                    style={{ color: item.label === 'Coffee' ? '#C8A44D' : 'rgba(255,255,255,0.6)' }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={close}
                    className="block text-sm font-mono tracking-[0.15em] transition-colors hover:text-primary"
                    style={{ color: 'rgba(255,255,255,0.6)' }}
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