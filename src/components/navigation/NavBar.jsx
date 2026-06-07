import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, User } from 'lucide-react';
import { SHOPIFY_CART_URL } from '@/lib/shopifyCheckout';

const NAV_LINKS = [
  { label: 'Shop', href: '/shop' },
  { label: 'The Blends', href: '/blends' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Bundle', href: '/bundle' },
  { label: 'Journal', href: '/journal' },
  { label: 'Reviews', href: '/Reviews' },
  { label: 'FAQ', href: '/faq' },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          height: '48px',
          backgroundColor: '#0E0E0E',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(230,183,173,0.1)',
          borderTop: '1px solid rgba(26,74,62,0.2)',
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
                style={{ fontSize: '10.5px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
                  {item.label}
                </Link>
                ))}
                </div>

                {/* Center logo */}
          <div className="flex-shrink-0 md:mx-6">
            <Link to="/" className="flex items-center justify-center">
              <img
                src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/4b6dc9e8d_ChatGPTImageMay31202606_49_02AM.png"
                alt="Torch Republic Coffee Company"
                style={{ height: '42px', width: 'auto' }}
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
            <div className="flex items-center gap-3 ml-3 pl-4" style={{ borderLeft: '1px solid rgba(230,183,173,0.12)' }}>
              <Link
                to="/shop"
                className="hidden lg:inline-flex items-center font-mono text-[9px] tracking-[0.28em] uppercase transition-all hover:opacity-90 btn-glow"
                style={{ background: '#E6B7AD', color: '#050505', fontWeight: 800, padding: '7px 14px', whiteSpace: 'nowrap' }}
              >
                Shop Coffee
              </Link>
              <button style={{ color: 'rgba(255,255,255,0.38)', minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                className="hover:text-white transition-colors">
                <Search className="w-[15px] h-[15px]" />
              </button>
              <a href={SHOPIFY_CART_URL}
                style={{ color: 'rgba(255,255,255,0.38)', minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', textDecoration: 'none' }}
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

          {/* Mobile - hidden, handled by MobileHeader */}
          <div className="md:hidden" />
        </div>
      </nav>


    </>
  );
}