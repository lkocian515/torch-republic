import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const RG = '#E6B7AD';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Blends', to: '/blends' },
  { label: 'Bundle', to: '/bundle' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Journal', to: '/Journal' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function NavBar() {
  const location = useLocation();
  const { totalItems, setDrawerOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Desktop Nav */}
      <nav className="hidden md:block sticky top-0 z-50" style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(230,183,173,0.1)' }}>
        <div className="flex items-center justify-between px-8" style={{ height: '64px' }}>
          {/* Logo */}
          <Link to="/">
            <img
              src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/7acbb9e85_ChatGPTImageMay31202606_49_02AM.png"
              alt="Torch Republic"
              style={{ height: '42px', width: 'auto' }}
            />
          </Link>

          {/* Center Nav Links */}
          <div className="flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-mono uppercase tracking-[0.22em] text-xs font-bold transition-colors nav-link ${
                  isActive(link.to) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
                style={{ color: isActive(link.to) ? RG : 'rgba(230,183,173,0.65)' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button style={{ color: 'rgba(255,255,255,0.55)', minWidth: '40px', minHeight: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Search className="w-[18px] h-[18px]" />
            </button>
            <Link to="/Profile" style={{ color: 'rgba(255,255,255,0.55)', minWidth: '40px', minHeight: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User className="w-[18px] h-[18px]" />
            </Link>
            <button onClick={() => setDrawerOpen(true)}
              style={{ color: 'rgba(255,255,255,0.55)', minWidth: '40px', minHeight: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <ShoppingBag className="w-[18px] h-[18px]" />
              {totalItems > 0 && (
                <span style={{ position: 'absolute', top: 6, right: 4, background: RG, color: '#080808', fontSize: '8px', fontWeight: 900, width: 14, height: 14, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)' }}>
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4"
        style={{ height: '52px', background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(230,183,173,0.1)' }}>
        <Link to="/">
          <img
            src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/7acbb9e85_ChatGPTImageMay31202606_49_02AM.png"
            alt="Torch Republic"
            style={{ height: '36px', width: 'auto' }}
          />
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/shop"
            className="font-mono uppercase tracking-[0.22em] text-xs font-bold px-3 py-1.5 rounded-full"
            style={{ background: RG, color: '#050505' }}>
            Shop
          </Link>
          <button onClick={() => setMobileMenuOpen(true)}
            style={{ color: 'rgba(255,255,255,0.55)', minWidth: '40px', minHeight: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Menu className="w-[20px] h-[20px]" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 md:hidden"
              style={{ background: 'rgba(0,0,0,0.7)' }}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 z-50 md:hidden"
              style={{ width: '85%', maxWidth: '320px', background: '#0a0a0a', borderLeft: '1px solid rgba(230,183,173,0.1)' }}
            >
              <div className="flex items-center justify-between px-6" style={{ height: '52px', borderBottom: '1px solid rgba(230,183,173,0.1)' }}>
                <span className="font-mono uppercase tracking-[0.28em] text-xs" style={{ color: RG }}>Menu</span>
                <button onClick={() => setMobileMenuOpen(false)} style={{ color: 'rgba(255,255,255,0.55)' }}>
                  <X className="w-[20px] h-[20px]" />
                </button>
              </div>
              <div className="flex flex-col px-6 py-8 gap-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-mono uppercase tracking-[0.22em] text-sm font-bold py-2 ${
                      isActive(link.to) ? 'text-primary' : 'text-muted-foreground'
                    }`}
                    style={{ color: isActive(link.to) ? RG : 'rgba(230,183,173,0.65)' }}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-6 border-t border-border-rose/20">
                  <Link to="/Profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-mono uppercase tracking-[0.22em] text-sm font-bold py-2"
                    style={{ color: 'rgba(230,183,173,0.65)' }}>
                    Account
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}