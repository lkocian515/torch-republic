import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, ShoppingBag, User } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const NAV_LEFT = [
  { label: 'Shop Coffee', href: '/CoffeeCollection' },
  { label: 'About', href: '/Mission' },
];

const NAV_RIGHT = [
  { label: 'Journal', href: '/Journal' },
  { label: 'Contact', href: '/Contact' },
];

const NAV_GROUPS = [
  {
    category: 'Shop Coffee',
    items: [
      { label: 'All Collections', href: '/CoffeeCollection' },
      { label: 'Founders Series', href: '/CoffeeCollection' },
      { label: 'Liberty Icons', href: '/LibertyIcons' },
      { label: 'Commanders Series', href: '/CommandersSeries' },
      { label: '🔥 Torch Box Subscription', href: '/TheTorchBox' },
    ],
  },
  {
    category: 'Brand',
    items: [
      { label: 'Home', href: '/' },
      { label: 'Our Story', href: '/Mission' },
      { label: 'Journal', href: '/Journal' },
      { label: 'Popular Blends', href: '/BestSellers' },
      { label: 'Reviews', href: '/Reviews' },
      { label: 'Contact', href: '/Contact' },
    ],
  },
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

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <nav
        style={{
          height: '42px',
          backgroundColor: scrolled ? 'rgba(3,3,5,0.98)' : 'rgba(0,0,0,0.52)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: scrolled ? '1px solid rgba(196,163,90,0.12)' : '1px solid rgba(196,163,90,0.04)',
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
          position: 'relative',
          zIndex: 50,
        }}
      >
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 h-full flex items-center justify-between">

          {/* Left nav — desktop only */}
          <div className="hidden md:flex items-center gap-7 flex-1">
            {NAV_LEFT.map((item) => (
              <Link key={item.label} to={item.href}
                className="nav-link whitespace-nowrap transition-colors hover:text-white"
                style={{ fontSize: '10.5px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.46)', fontWeight: 500 }}>
                {item.label}
              </Link>
            ))}
            <Link to="/TheTorchBox"
              className="nav-link whitespace-nowrap transition-colors"
              style={{ fontSize: '10.5px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C9A24A', fontWeight: 700 }}>
              Torch Box
            </Link>
          </div>

          {/* Center logo */}
          <div className="flex-shrink-0 md:mx-6">
            <Link to="/" className="flex items-center justify-center">
              <img
                src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/1382de9ae_LighttheTorchWeartheTruth2000x1000px1920x1080px.png"
                alt="Torch Republic"
                style={{ height: '34px', width: 'auto' }}
              />
            </Link>
          </div>

          {/* Right nav — desktop only */}
          <div className="hidden md:flex items-center flex-1 justify-end gap-7">
            {NAV_RIGHT.map((item) => (
              <Link key={item.label} to={item.href}
                className="nav-link whitespace-nowrap transition-colors hover:text-white"
                style={{ fontSize: '10.5px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.46)', fontWeight: 500 }}>
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 ml-3 pl-4" style={{ borderLeft: '1px solid rgba(196,163,90,0.12)' }}>
              <Link
                to="/TheTorchBox"
                className="hidden lg:inline-flex items-center font-mono text-[9px] tracking-[0.28em] uppercase transition-all hover:opacity-90 btn-glow"
                style={{ background: '#C9A24A', color: '#080808', fontWeight: 800, padding: '7px 14px', whiteSpace: 'nowrap' }}
              >
                Join Torch Box
              </Link>
              <button style={{ color: 'rgba(255,255,255,0.38)', minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                className="hover:text-white transition-colors">
                <Search className="w-[15px] h-[15px]" />
              </button>
              <a href="https://torch-republic.myshopify.com/cart"
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
            <a href="https://torch-republic.myshopify.com/cart"
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

      {/* Full-screen mobile overlay */}
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
            {/* Overlay header */}
            <div className="flex items-center justify-between px-5 flex-shrink-0" style={{ height: '46px', borderBottom: '1px solid rgba(196,163,90,0.1)' }}>
              <Link to="/" onClick={() => setOpen(false)}>
                <img src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/1382de9ae_LighttheTorchWeartheTruth2000x1000px1920x1080px.png"
                  alt="Torch Republic" style={{ height: '30px', width: 'auto' }} />
              </Link>
              <button
                onClick={() => setOpen(false)}
                style={{ color: 'rgba(255,255,255,0.6)', minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search bar */}
            <div className="px-5 py-4 flex-shrink-0" style={{ borderBottom: '1px solid rgba(196,163,90,0.07)' }}>
              <div className="flex items-center gap-3 px-4 py-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(196,163,90,0.12)' }}>
                <Search className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(196,163,90,0.45)' }} />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search Founders Series blends…"
                  className="flex-1 bg-transparent outline-none"
                  style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-heading)' }}
                />
              </div>
            </div>

            {/* Shop All CTA */}
            <div className="px-5 py-4 flex-shrink-0">
              <Link to="/CoffeeCollection" onClick={() => setOpen(false)}
                className="flex items-center justify-center w-full py-3.5 font-mono uppercase tracking-[0.25em] transition-opacity hover:opacity-80"
                style={{ fontSize: '11px', background: '#C4A35A', color: '#000', fontWeight: 700 }}>
                Shop All Collections
              </Link>
            </div>

            {/* Nav items — grouped by category */}
            <div className="flex-1 overflow-y-auto px-5 pb-4">
              {NAV_GROUPS.map((group) => (
                <div key={group.category} className="mb-2">
                  <p
                    className="font-mono uppercase"
                    style={{
                      fontSize: '8px',
                      letterSpacing: '0.5em',
                      color: 'rgba(196,163,90,0.28)',
                      padding: '18px 0 8px',
                      borderTop: '1px solid rgba(196,163,90,0.05)',
                    }}
                  >
                    {group.category}
                  </p>
                  {group.items.map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 + i * 0.035, duration: 0.22 }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between group"
                        style={{
                          padding: '13px 0',
                          borderBottom: '1px solid rgba(196,163,90,0.05)',
                          fontSize: '17px',
                          color: 'rgba(255,255,255,0.58)',
                          fontFamily: 'var(--font-heading)',
                          fontWeight: 400,
                          letterSpacing: '0.005em',
                          transition: 'color 0.2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = '#C4A35A'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.58)'}
                      >
                        <span>{item.label}</span>
                        <span style={{ color: 'rgba(196,163,90,0.25)', fontSize: '13px', transition: 'color 0.2s' }}>→</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="px-5 py-6 flex-shrink-0" style={{ borderTop: '1px solid rgba(196,163,90,0.07)' }}>
              <Link to="/TheTorchBox" onClick={() => setOpen(false)}
                className="flex items-center justify-center w-full py-4 font-mono uppercase tracking-[0.28em] transition-opacity hover:opacity-80"
                style={{ fontSize: '10px', border: '1px solid rgba(196,163,90,0.35)', color: 'rgba(196,163,90,0.8)' }}>
                Become a Torchbearer →
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