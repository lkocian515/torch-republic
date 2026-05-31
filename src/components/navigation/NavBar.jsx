import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, User } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const NAV_LINKS = [
  { label: 'Shop', href: '/shop' },
  { label: 'The Blends', href: '/blends' },
  { label: 'Monthly Subscription', href: '/subscription' },
  { label: 'Bundle', href: '/bundle' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState('');
  const { totalItems, setDrawerOpen } = useCart();

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
          backgroundColor: '#000000',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(230,183,173,0.1)',
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
                src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/7acbb9e85_ChatGPTImageMay31202606_49_02AM.png"
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
                Shop Now
              </Link>
              <button style={{ color: 'rgba(255,255,255,0.38)', minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                className="hover:text-white transition-colors">
                <Search className="w-[15px] h-[15px]" />
              </button>
              <button onClick={() => setDrawerOpen(true)}
                style={{ color: 'rgba(255,255,255,0.38)', minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
                className="hover:text-white transition-colors">
                <ShoppingBag className="w-[15px] h-[15px]" />
                {totalItems > 0 && (
                  <span style={{ position: 'absolute', top: 8, right: 6, background: '#E6B7AD', color: '#080808', fontSize: '8px', fontWeight: 900, width: 14, height: 14, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)' }}>
                    {totalItems}
                  </span>
                )}
              </button>
              <Link to="/Profile"
                style={{ color: 'rgba(255,255,255,0.38)', minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                className="hover:text-white transition-colors">
                <User className="w-[15px] h-[15px]" />
              </Link>
            </div>
          </div>

          {/* Mobile right icons - cart and profile only (no menu) */}
          <div className="md:hidden flex items-center gap-1 ml-auto">
            <Link to="/cart"
              style={{ color: 'rgba(255,255,255,0.55)', minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <ShoppingBag className="w-[18px] h-[18px]" />
              {totalItems > 0 && (
                <span style={{ position: 'absolute', top: 8, right: 6, background: '#E6B7AD', color: '#080808', fontSize: '8px', fontWeight: 900, width: 14, height: 14, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)' }}>
                  {totalItems}
                </span>
              )}
            </Link>
            <Link to="/Profile"
              style={{ color: 'rgba(255,255,255,0.55)', minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User className="w-[18px] h-[18px]" />
            </Link>
          </div>
        </div>
      </nav>


    </>
  );
}