import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, ChevronLeft } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { SHOPIFY_CART_URL } from '@/lib/shopifyCheckout';

const RG = '#E6B7AD';
const RG_DEEP = '#C98F86';

const NAV_LINKS = [
  { label: 'Shop', href: '/shop' },
  { label: 'Blends', href: '/blends' },
  { label: 'Bundle', href: '/build-your-ritual' },
  { label: 'Journal', href: '/journal' },
  { label: 'Recipes', href: '/recipes' },
  { label: 'About', href: '/about' },
  { label: 'Reviews', href: '/Reviews' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export default function MobileHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isRoot = location.pathname === '/';

  return (
    <>
      {/* Mobile announcement bar */}
      <div
        className="md:hidden w-full flex items-center justify-center px-4"
        style={{ height: '28px', background: 'linear-gradient(90deg, #0B2D2A 0%, #08101A 55%, #1A1208 100%)', borderBottom: '1px solid rgba(230,183,173,0.15)' }}
      >
        <p className="font-mono text-center whitespace-nowrap overflow-hidden text-ellipsis"
          style={{ fontSize: '8px', letterSpacing: '0.4em', color: 'rgba(230,183,173,0.8)', textTransform: 'uppercase' }}>
          Use code{' '}
          <span style={{ color: RG, fontWeight: 700 }}>WELCOME10</span>
          {' '}for 10% off &middot; Free Shipping $50+
        </p>
      </div>

      {/* Mobile header bar */}
      <div
        className="md:hidden sticky top-0 z-50"
        style={{
          height: '52px',
          backgroundColor: '#0E0E0E',
          borderBottom: `1px solid ${RG_DEEP}29`,
          top: 'env(safe-area-inset-top)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="h-full flex items-center justify-between px-5">
          {/* Left — native back button on child pages, logo on root */}
          {isRoot ? (
            <Link to="/">
              <img
                src="/torch-republic-logo-transparent.png"
                alt="Torch Republic Coffee Company"
                style={{ height: '42px', width: 'auto', display: 'block' }}
              />
            </Link>
          ) : (
            <button
              onClick={() => navigate(-1)}
              aria-label="Go back"
              style={{ display: 'flex', alignItems: 'center', gap: '2px', color: RG, background: 'transparent', border: 'none', cursor: 'pointer', minHeight: '44px', padding: '0 4px' }}
            >
              <ChevronLeft className="w-6 h-6" strokeWidth={2} />
              <span className="font-heading" style={{ fontSize: '15px', fontWeight: 500 }}>Back</span>
            </button>
          )}
          {/* Right icons */}
          <div className="flex items-center gap-1">
            <a href={SHOPIFY_CART_URL}
              style={{ color: `${RG}8C`, minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', textDecoration: 'none' }}>
              <ShoppingBag className="w-[19px] h-[19px]" strokeWidth={1.8} />
            </a>
            <Link to="/Profile"
              style={{ color: `${RG}8C`, minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User className="w-[19px] h-[19px]" strokeWidth={1.8} />
            </Link>
            <button
              onClick={() => setOpen(true)}
              style={{ color: '#F5EFE6', minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer' }}>
              <Menu className="w-[24px] h-[24px]" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 md:hidden flex flex-col"
            style={{
              zIndex: 200,
              background: 'linear-gradient(180deg, #0E0E0E 0%, #111111 100%)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-end px-5 flex-shrink-0"
              style={{ height: '52px', borderBottom: `1px solid ${RG_DEEP}29` }}>
              <button
                onClick={() => setOpen(false)}
                style={{ color: `${RG}99`, minWidth: '48px', minHeight: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X className="w-6 h-6" strokeWidth={1.8} />
              </button>
            </div>

            {/* Shop CTA */}
            <div className="px-5 py-4 flex-shrink-0">
              <Link to="/shop" onClick={() => setOpen(false)}
                className="group relative flex items-center justify-center w-full py-4 font-mono uppercase tracking-[0.3em] transition-all hover:opacity-90"
                style={{
                  fontSize: '11px',
                  background: `linear-gradient(135deg, ${RG} 0%, ${RG_DEEP} 100%)`,
                  color: '#050505',
                  fontWeight: 800,
                  borderRadius: '2px',
                  boxShadow: `0 4px 16px ${RG}40`,
                }}
              >
                Shop Mushroom Coffee
              </Link>
            </div>

            {/* Nav links */}
            <div className="flex-1 overflow-y-auto px-5 pb-4">
              <div className="mb-2">
                <p className="font-mono uppercase"
                  style={{
                    fontSize: '7px',
                    letterSpacing: '0.6em',
                    color: `${RG}59`,
                    padding: '16px 0 10px',
                    borderTop: `1px solid ${RG_DEEP}1F`,
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                  }}>
                  Navigation
                </p>
                {NAV_LINKS.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.25 }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between"
                      style={{
                        padding: '14px 0',
                        borderBottom: `1px solid ${RG_DEEP}14`,
                        fontSize: '18px',
                        color: 'rgba(255,255,255,0.7)',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 400,
                        letterSpacing: '0.02em',
                        transition: 'all 0.25s ease',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = RG;
                        e.currentTarget.querySelector('span:last-child').style.color = RG;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                        e.currentTarget.querySelector('span:last-child').style.color = `${RG}66`;
                      }}
                    >
                      <span style={{ transition: 'transform 0.25s ease' }}>{item.label}</span>
                      <span style={{ color: `${RG}66`, fontSize: '14px', transition: 'all 0.25s ease' }}>&rarr;</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom */}
            <div className="px-5 py-5 flex-shrink-0" style={{ borderTop: `1px solid ${RG_DEEP}1F` }}>
              <Link to="/build-your-ritual" onClick={() => setOpen(false)}
                className="flex items-center justify-center w-full py-4 font-mono uppercase tracking-[0.3em] transition-all hover:opacity-90"
                style={{
                  fontSize: '10px',
                  border: `1px solid ${RG}59`,
                  color: RG,
                  borderRadius: '2px',
                  background: `${RG}08`,
                }}>
                Build Your Ritual &rarr;
              </Link>
              <div className="flex items-center justify-center gap-6 mt-5">
                <Link to="/Profile" onClick={() => setOpen(false)}
                  className="group flex items-center gap-2.5"
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: `${RG}4D`,
                    fontFamily: 'var(--font-heading)',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = RG}
                  onMouseLeave={e => e.currentTarget.style.color = `${RG}4D`}
                >
                  <User className="w-4 h-4" strokeWidth={1.8} />
                  <span>Account</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}