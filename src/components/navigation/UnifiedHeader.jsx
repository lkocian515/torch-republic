import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, Flame, ArrowLeft, Search } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '@/lib/AuthContext';
import { useOverlayHistory } from '@/hooks/useOverlayHistory';
import SearchModal from '@/components/search/SearchModal';


const PROMO_MESSAGES = [
  'Instant Coffee, Mushroom Coffee & Matcha',
  'First order 15% off — use code WELCOME15 at checkout',
  'Free shipping on orders over $75',
];

const RG = '#E6B7AD';
const RG_DEEP = '#C98F86';

// Desktop nav — Shop dropdown + Learn dropdown + About
const SHOP_LINKS = [
  { label: 'Instant Coffee', href: '/shop/instant-coffee', sub: 'Premium single-serve' },
  { label: 'Mushroom Coffee', href: '/shop/instant-mushroom-coffee', sub: "Lion's Mane + Chaga" },
  { label: 'Matcha', href: '/shop/matcha', sub: 'Ceremonial grade' },
  { label: 'Bundles', href: '/build-your-ritual', sub: 'Mix & save 15%' },
  { label: 'Gifts', href: '/gifts', sub: 'For coffee lovers' },
];

const LEARN_LINKS = [
  { label: 'Why Mushroom Coffee', href: '/why-mushroom-coffee' },
  { label: 'Why Matcha', href: '/why-matcha' },
  { label: 'Research Hub', href: '/research' },
  { label: 'Journal', href: '/journal' },
];

const ABOUT_LINKS = [
  { label: 'Our Mission', href: '/mission' },
  { label: 'Our Ingredients', href: '/ingredients' },
  { label: 'Torchbearers Rewards', href: '/torchbearers-rewards' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Customer Spotlight', href: '/spotlight' },
];

// Mobile full menu — simplified, shop-first
const MOBILE_NAV_SECTIONS = [
  {
    heading: 'Shop',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Shop All', href: '/shop' },
      { label: 'Mushroom Coffee', href: '/shop/instant-mushroom-coffee' },
      { label: 'Instant Coffee', href: '/shop/instant-coffee' },
      { label: 'Matcha', href: '/shop/matcha' },
      { label: 'Bundles', href: '/build-your-ritual' },
    ],
  },
  {
    heading: 'About',
    links: [
      { label: 'Our Mission', href: '/mission' },
      { label: 'Reviews', href: '/reviews' },
      { label: 'Customer Spotlight', href: '/spotlight' },
      { label: 'Journal', href: '/journal' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export default function UnifiedHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  // Register the mobile menu in browser history so the back gesture closes it
  useOverlayHistory(mobileMenuOpen, () => setMobileMenuOpen(false));
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  // Admin panel link hidden from public navigation - accessible only via direct URL for security

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPromoIndex((prev) => (prev + 1) % PROMO_MESSAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const TOP_LEVEL = ['/', '/shop', '/classic-coffee', '/mushroom-coffee', '/matcha', '/bundle', '/how-it-works', '/quiz', '/recipes', '/reviews', '/spotlight', '/faq', '/contact', '/about', '/journal'];
  const isChildRoute = !TOP_LEVEL.includes(location.pathname) && location.pathname.split('/').filter(Boolean).length > 1;

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <>
      {/* Announcement Bar */}
      <div
        className="w-full flex items-center justify-center px-4 py-2.5"
        style={{ background: '#3E3A24', borderBottom: '1px solid #DED8CF', willChange: 'transform' }}
      >
        <div className="flex items-center gap-2 max-w-4xl">
          <Flame className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#8A6F3E' }} />
          <AnimatePresence mode="wait">
            <motion.p
              key={currentPromoIndex}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
              className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] text-center"
              style={{ color: 'rgba(248,245,239,0.88)', textTransform: 'uppercase', lineHeight: 1.4 }}
            >
              {PROMO_MESSAGES[currentPromoIndex].split(' — ').map((part, i, arr) => (
                <React.Fragment key={i}>
                  {i > 0 && ' — '}
                  {part.includes('code') || part.includes('Code') || part.includes('FREE') ? (
                    <span style={{ color: '#F8F5EF', fontWeight: 700 }}>{part}</span>
                  ) : (
                    part
                  )}
                </React.Fragment>
              ))}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Main Header */}
      <header
        className="sticky top-0 z-40 w-full"
        role="banner"
        style={{
          background: 'rgba(248,245,239,0.94)',
          borderBottom: '1px solid #DED8CF',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Back button (mobile) / Hamburger (mobile home) */}
            <div className="w-10">
              {isChildRoute ? (
                <button onClick={handleBack} className="md:hidden flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-gold" style={{ color: RG, minWidth: '44px', minHeight: '44px', borderRadius: '4px' }} aria-label="Go back to previous page">
                  <ArrowLeft className="w-5 h-5" strokeWidth={2} />
                </button>
              ) : (
                <button onClick={() => setMobileMenuOpen(true)} className="md:hidden flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-gold" style={{ color: '#26231F', minWidth: '44px', minHeight: '44px', borderRadius: '4px' }} aria-label="Open navigation menu" aria-expanded={mobileMenuOpen} aria-controls="mobile-nav-menu">
                  <Menu className="w-6 h-6" strokeWidth={1.5} />
                </button>
              )}
            </div>

            {/* Center: Logo */}
            <Link to="/" className={`flex-1 md:flex-none flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-gold ${isChildRoute ? 'hidden md:flex' : ''}`} style={{ borderRadius: '4px' }} aria-label="Torch Republic home">
              <img src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/ea7e0190c_torch_republic_primary_refined_gradient_4000px.png" alt="Torch Republic Coffee Company" width="180" height="48" loading="eager" decoding="async" className="sm:h-16" style={{ height: '48px', width: 'auto' }} />
            </Link>

            {/* Right: Cart + Desktop Nav */}
            <div className="w-10 md:w-auto flex items-center justify-end gap-4">
              <nav className="hidden md:flex items-center gap-6" aria-label="Primary navigation">
                {/* Home */}
                <Link to="/" className="font-heading text-sm transition-colors hover:opacity-70" style={{ color: '#26231F', fontWeight: 500 }} aria-label="Home" aria-current={location.pathname === '/' ? 'page' : undefined}>
                  Home
                </Link>

                {/* Shop dropdown */}
                <div className="relative group">
                  <button className="font-heading text-sm transition-colors hover:opacity-70 flex items-center gap-1.5" style={{ color: '#F5EFE6', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
                    Shop
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ opacity: 0.5 }}><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </button>
                  <div className="absolute top-full left-0 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-150 z-50">
                    <div style={{ height: '8px' }} />
                    <div className="py-2 min-w-[220px]" style={{ background: '#FFFDFC', border: '1px solid #DED8CF', borderRadius: '4px', boxShadow: '0 18px 45px rgba(38,35,31,0.12)' }}>
                      {SHOP_LINKS.map(link => (
                        <Link key={link.href} to={link.href} className="flex flex-col px-4 py-3 transition-all hover:opacity-70" style={{ textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                          <span className="font-heading text-sm" style={{ color: '#26231F' }}>{link.label}</span>
                          <span className="font-mono text-[9px] tracking-[0.15em] mt-0.5" style={{ color: '#8A6F3E' }}>{link.sub}</span>
                        </Link>
                      ))}
                      <div className="px-4 pt-3 pb-2">
                        <Link to="/subscription" className="block text-center py-2 font-mono text-[9px] tracking-[0.25em] uppercase font-bold" style={{ background: '#B48A4A', color: '#211A12' }}>
                          Subscribe &amp; Save 20% →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Learn dropdown */}
                <div className="relative group">
                  <button className="font-heading text-sm transition-colors hover:opacity-70 flex items-center gap-1.5" style={{ color: '#655E56', background: 'none', border: 'none', cursor: 'pointer' }}>
                    Learn
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ opacity: 0.5 }}><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </button>
                  <div className="absolute top-full left-0 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-150 z-50">
                    <div style={{ height: '8px' }} />
                    <div className="py-2 min-w-[200px]" style={{ background: '#FFFDFC', border: '1px solid #DED8CF', borderRadius: '4px', boxShadow: '0 18px 45px rgba(38,35,31,0.12)' }}>
                      {LEARN_LINKS.map(link => (
                        <Link key={link.href} to={link.href} className="block px-4 py-2.5 font-heading text-sm transition-colors hover:opacity-70" style={{ color: '#655E56', textDecoration: 'none' }}>
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Subscribe & Save — standalone nav link */}
                <Link to="/subscription" className="font-heading text-sm font-semibold transition-colors hover:opacity-70" style={{ color: '#8A6F3E' }}>
                  Subscribe &amp; Save 20%
                </Link>

                {/* About dropdown */}
                <div className="relative group">
                  <button className="font-heading text-sm transition-colors hover:opacity-70 flex items-center gap-1.5" style={{ color: '#655E56', background: 'none', border: 'none', cursor: 'pointer' }}>
                    About
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ opacity: 0.5 }}><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </button>
                  <div className="absolute top-full right-0 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-150 z-50">
                    <div style={{ height: '8px' }} />
                    <div className="py-2 min-w-[200px]" style={{ background: '#FFFDFC', border: '1px solid #DED8CF', borderRadius: '4px', boxShadow: '0 18px 45px rgba(38,35,31,0.12)' }}>
                      {ABOUT_LINKS.map(link => (
                        <Link key={link.href} to={link.href} className="block px-4 py-2.5 font-heading text-sm transition-colors hover:opacity-70" style={{ color: '#655E56', textDecoration: 'none' }}>
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </nav>
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center justify-center transition-colors hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-gold"
                style={{ color: '#26231F', minWidth: '44px', minHeight: '44px', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
                aria-label="Search Torch Republic products and content"
              >
                <Search className="w-5 h-5" strokeWidth={1.8} />
              </button>
              {/* Admin panel removed from public header navigation for security */}
              <Link to="/cart" className="flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-gold" style={{ color: '#26231F', minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', borderRadius: '4px' }} aria-label="View cart" aria-current={location.pathname === '/cart' ? 'page' : undefined}>
                <ShoppingBag className="w-5 h-5" strokeWidth={1.8} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, x: -300 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -300 }} transition={{ duration: 0.25 }} className="fixed inset-0 z-50 md:hidden" style={{ background: 'rgba(0,0,0,0.95)' }} role="dialog" aria-modal="true" aria-label="Navigation menu">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${RG}20` }}>
                <span className="font-serif text-lg" style={{ color: '#8A6F3E' }}>Menu</span>
                <button onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-gold" style={{ color: RG, minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }} aria-label="Close navigation menu">
                  <X className="w-6 h-6" strokeWidth={1.8} />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-5 py-6" id="mobile-nav-menu" aria-label="Mobile navigation">
                {MOBILE_NAV_SECTIONS.map((section, si) => (
                  <div key={section.heading} className="mb-6">
                    <p className="font-mono text-[9px] tracking-[0.35em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.7)' }}>{section.heading}</p>
                    <div className="space-y-1">
                      {section.links.map((link, i) => {
                        const isCurrent = location.pathname === link.href;
                        return (
                        <motion.div key={link.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: (si * 4 + i) * 0.04 }}>
                          <Link to={link.href} onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 py-3 font-heading text-base transition-colors hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-gold"
                            style={{ color: 'rgba(240,235,225,0.95)', borderBottom: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px' }}
                            aria-current={isCurrent ? 'page' : undefined}>
                            <span aria-hidden="true" style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(230,183,173,0.7)', flexShrink: 0, display: 'inline-block' }} />
                            {link.label}
                          </Link>
                        </motion.div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </nav>
              <div className="px-5 py-6 space-y-3" style={{ borderTop: `1px solid ${RG}20` }}>
                <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="block text-center py-3 font-mono text-xs tracking-[0.3em] uppercase font-bold transition-all hover:opacity-90" style={{ background: RG, color: '#0A0A0A', borderRadius: '2px' }}>
                  Shop Coffee →
                </Link>
                <Link to="/subscription" onClick={() => setMobileMenuOpen(false)} className="block text-center py-2.5 font-mono text-xs tracking-[0.25em] uppercase font-bold transition-all hover:opacity-80" style={{ border: `1px solid ${RG}40`, color: RG, borderRadius: '2px' }}>
                  Subscribe &amp; Save 20%
                </Link>
                <Link to="/quiz" onClick={() => setMobileMenuOpen(false)} className="block text-center py-2.5 font-mono text-[10px] tracking-[0.2em] uppercase transition-all hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-gold" style={{ color: 'rgba(240,235,225,0.85)', borderRadius: '4px' }}>
                  ✨ Take the Blend Quiz
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}