import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, ShoppingBag, User } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Shop', href: '/shop' },
  { label: 'The Blends', href: '/blends' },
  { label: 'Bundle', href: '/bundle' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Reviews', href: '/Reviews' },
  { label: 'FAQ', href: '/faq' },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <nav
        style={{
          height: '48px',
          backgroundColor: scrolled ? 'rgba(3,3,5,0.98)' : 'rgba(0,0,0,0.52)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: scrolled ? '1px solid rgba(201,162,74,0.14)' : '1px solid rgba(201,162,74,0.05)',
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
          position: 'relative',
          zIndex: 50,
        }}
      >
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 h-full flex items-center justify-between">

          {/* Left nav — desktop */}
          <div className="hidden md:flex items-center gap-7 flex-1">
            {NAV_LINKS.slice(0, 3).map(item => (
              <Link key={item.label} to={item.href}
                className="nav-link whitespace-nowrap transition-colors hover:text-white"
                style={{ fontSize: '10.5px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.46)', fontWeight: 500 }}>
                {item.label}
              </Link>
            ))}
          </div>

          {/* Center logo */}
          <div className="flex-shrink-0 md:mx-6">
            <Link to="/" className="flex items-center justify-center">
              <img
                src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/1382de9ae_LighttheTorchWeartheTruth2000x1000px1920x1080px.png"
                alt="Torch Republic Coffee Company"
                style={{ height: '34px', width: 'auto' }}
              />
            </Link>
          </div>

          {/* Right nav — desktop */}
          <div className="hidden md:flex items-center flex-1 justify-end gap-7">
            {NAV_LINKS.slice(3).map(item => (
              <Link key={item.label} to={item.href}
                className="nav-link whitespace-nowrap transition-colors hover:text-white"
                style={{ fontSize: '10.5px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.46)', fontWeight: 500 }}>
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 ml-3 pl-4" style={{ borderLeft: '1px solid rgba(201,162,74,0.12)' }}>
              <Link
                to="/shop"
                className="hidden lg:inline-flex items-center font-mono text-[9px] tracking-[0.28em] uppercase transition-all hover:opacity-90 btn-glow"
                style={{ background: '#C9A24A', color: '#080808', fontWeight: 800, padding: '7px 14px', whiteSpace: 'nowrap' }}
              >
                Shop Now
              </Link>
              <button style={{ color: 'rgba(255,255,255,0.38)', minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                className="hover:text-white transition-colors">
                <Search className="w-[15px] h-[15px]" />
              </button>
              <a href="https://torch-republic.com/cart"
                style={{ color: 'rgba(255,255,255,0.38)', minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                className="hover:text-white transition-colors">
                <ShoppingBag className="w-[15px] h-[15px]" />
              </a>
              <Link to="/Profile"
                style={{ color: 'rgba(255,255,255,0.38)', minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                className="hover:text-white transition-colors">
                <User className="w-[15px] h-[15px]" />
              </Link>
            </div>
          </div>

          {/* Mobile right icons */}
          <div className="md:hidden flex items-center gap-1 ml-auto">
            <a href="https://torch-republic.com/cart"
              style={{ color: 'rgba(255,255,255,0.55)', minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShoppingBag className="w-[18px] h-[18px]" />
            </a>
            <button
              onClick={() => setOpen(true)}
              style={{ color: 'rgba(255,255,255,0.75)', minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Menu className="w-[20px] h-[20px]" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 md:hidden flex flex-col"
            style={{ zIndex: 200, background: '#040407' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 flex-shrink-0"
              style={{ height: '48px', borderBottom: '1px solid rgba(201,162,74,0.1)' }}>
              <Link to="/" onClick={() => setOpen(false)}>
                <img src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/1382de9ae_LighttheTorchWeartheTruth2000x1000px1920x1080px.png"
                  alt="Torch Republic" style={{ height: '30px', width: 'auto' }} />
              </Link>
              <button onClick={() => setOpen(false)}
                style={{ color: 'rgba(255,255,255,0.6)', minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Shop CTA */}
            <div className="px-5 py-4 flex-shrink-0">
              <Link to="/shop" onClick={() => setOpen(false)}
                className="flex items-center justify-center w-full py-3.5 font-mono uppercase tracking-[0.25em] transition-opacity hover:opacity-80"
                style={{ fontSize: '11px', background: '#C9A24A', color: '#000', fontWeight: 700 }}>
                Shop All Blends
              </Link>
            </div>

            {/* Nav links */}
            <div className="flex-1 overflow-y-auto px-5 pb-4">
              <div className="mb-2">
                <p className="font-mono uppercase"
                  style={{ fontSize: '8px', letterSpacing: '0.5em', color: 'rgba(201,162,74,0.28)', padding: '18px 0 8px', borderTop: '1px solid rgba(201,162,74,0.05)' }}>
                  Navigation
                </p>
                {NAV_LINKS.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + i * 0.04, duration: 0.22 }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between"
                      style={{
                        padding: '14px 0',
                        borderBottom: '1px solid rgba(201,162,74,0.05)',
                        fontSize: '18px',
                        color: 'rgba(255,255,255,0.6)',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 400,
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = '#C9A24A'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                    >
                      <span>{item.label}</span>
                      <span style={{ color: 'rgba(201,162,74,0.3)', fontSize: '14px' }}>→</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom */}
            <div className="px-5 py-6 flex-shrink-0" style={{ borderTop: '1px solid rgba(201,162,74,0.07)' }}>
              <Link to="/bundle" onClick={() => setOpen(false)}
                className="flex items-center justify-center w-full py-4 font-mono uppercase tracking-[0.28em] transition-opacity hover:opacity-80"
                style={{ fontSize: '10px', border: '1px solid rgba(201,162,74,0.35)', color: 'rgba(201,162,74,0.8)' }}>
                Shop the 6-Tube Bundle →
              </Link>
              <div className="flex items-center justify-center gap-5 mt-5">
                <Link to="/Profile" onClick={() => setOpen(false)}
                  className="flex items-center gap-2"
                  style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', fontFamily: 'var(--font-heading)' }}>
                  <User className="w-3.5 h-3.5" /> Account
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}