import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, Flame, ArrowLeft } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { SHOPIFY_CART_URL } from '@/lib/shopifyCheckout';

const PROMO_MESSAGES = [
  'Instant coffee, mushroom coffee & matcha for modern ritual',
  'First order 10% off — use code WELCOME10',
  'Free shipping on orders over $75',
];

const RG = '#E6B7AD';
const RG_DEEP = '#C98F86';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Shop All', href: '/shop' },
  { label: 'Classic Coffee', href: '/classic-coffee' },
  { label: 'Mushroom Coffee', href: '/mushroom-coffee' },
  { label: 'Matcha', href: '/matcha' },
  { label: 'Bundles', href: '/bundle' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Find Your Blend', href: '/quiz' },
  { label: 'Recipes', href: '/recipes' },
  { label: 'Reviews', href: '/Reviews' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
];

export default function UnifiedHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPromoIndex((prev) => (prev + 1) % PROMO_MESSAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const TOP_LEVEL = ['/', '/shop', '/classic-coffee', '/mushroom-coffee', '/matcha', '/bundle', '/how-it-works', '/quiz', '/recipes', '/Reviews', '/faq', '/contact', '/about', '/journal'];
  const isChildRoute = !TOP_LEVEL.includes(location.pathname) && !TOP_LEVEL.some(p => p !== '/' && location.pathname.startsWith(p + '/'));

  const handleBack = () => navigate(-1);

  return (
    <>
      {/* Announcement Bar */}
      <div
        className="w-full flex items-center justify-center px-4 py-2.5"
        style={{ background: '#050505', borderBottom: `1px solid ${RG}20`, willChange: 'transform' }}
      >
        <div className="flex items-center gap-2 max-w-4xl">
          <Flame className="w-3.5 h-3.5 flex-shrink-0" style={{ color: RG }} />
          <AnimatePresence mode="wait">
            <motion.p
              key={currentPromoIndex}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
              className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] text-center"
              style={{ color: 'rgba(240,235,225,0.8)', textTransform: 'uppercase', lineHeight: 1.4 }}
            >
              {PROMO_MESSAGES[currentPromoIndex].split(' — ').map((part, i, arr) => (
                <React.Fragment key={i}>
                  {i > 0 && ' — '}
                  {part.includes('code') || part.includes('Code') || part.includes('FREE') ? (
                    <span style={{ color: RG, fontWeight: 700 }}>{part}</span>
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
        style={{
          background: '#0A0A0A',
          borderBottom: `1px solid ${RG_DEEP}20`,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Back button (mobile) / Hamburger (mobile home) */}
            <div className="w-10">
              {isChildRoute ? (
                <button onClick={handleBack} className="md:hidden flex items-center justify-center" style={{ color: RG, minWidth: '44px', minHeight: '44px' }}>
                  <ArrowLeft className="w-5 h-5" strokeWidth={2} />
                </button>
              ) : (
                <button onClick={() => setMobileMenuOpen(true)} className="md:hidden flex items-center justify-center" style={{ color: '#F5EFE6', minWidth: '44px', minHeight: '44px' }}>
                  <Menu className="w-6 h-6" strokeWidth={1.5} />
                </button>
              )}
            </div>

            {/* Center: Logo */}
            <Link to="/" className={`flex-1 md:flex-none flex items-center justify-center ${isChildRoute ? 'hidden md:flex' : ''}`}>
              <img src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/4b6dc9e8d_ChatGPTImageMay31202606_49_02AM.png" alt="Torch Republic Coffee Company" style={{ height: '40px', width: 'auto' }} />
            </Link>

            {/* Right: Cart + Desktop Nav */}
            <div className="w-10 md:w-auto flex items-center justify-end gap-4">
              <nav className="hidden md:flex items-center gap-6">
                {NAV_LINKS.map((link) => (
                  <Link key={link.href} to={link.href} className="font-heading text-sm transition-colors hover:opacity-70" style={{ color: 'rgba(240,235,225,0.7)' }}>
                    {link.label}
                  </Link>
                ))}
              </nav>
              <a href={SHOPIFY_CART_URL} style={{ color: RG, minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                <ShoppingBag className="w-5 h-5" strokeWidth={1.8} />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, x: -300 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -300 }} transition={{ duration: 0.25 }} className="fixed inset-0 z-50 md:hidden" style={{ background: 'rgba(0,0,0,0.95)' }}>
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${RG}20` }}>
                <span className="font-serif text-lg" style={{ color: RG }}>Menu</span>
                <button onClick={() => setMobileMenuOpen(false)} style={{ color: RG, minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X className="w-6 h-6" strokeWidth={1.8} />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-5 py-6">
                <div className="space-y-3">
                  {NAV_LINKS.map((link, i) => (
                    <motion.div key={link.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                      <Link to={link.href} onClick={() => setMobileMenuOpen(false)} className="block py-3 font-heading text-lg transition-colors hover:opacity-70" style={{ color: 'rgba(240,235,225,0.8)' }}>
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>
              <div className="px-5 py-6" style={{ borderTop: `1px solid ${RG}20` }}>
                <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="block text-center py-3 font-mono text-xs tracking-[0.3em] uppercase font-bold transition-all hover:opacity-90" style={{ background: RG, color: '#0A0A0A', borderRadius: '2px' }}>
                  Shop Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}