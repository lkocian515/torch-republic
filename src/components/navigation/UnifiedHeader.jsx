import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ShoppingBag, Search, User, Gift } from 'lucide-react';
import BackButton from './BackButton';
import { useCart } from '@/contexts/CartContext';
import SearchModal from '@/components/search/SearchModal';
import NavDropdown from './NavDropdown';
import MobileMenu from './MobileMenu';
import { COFFEE_FORMATS } from '@/lib/coffeeFormats';

// Pinned to the warm light storefront theme so the brown logo wordmark and
// dark icons stay readable regardless of OS dark-mode (the storefront is
// always light; only the standalone portfolio uses a dark surface).
const colors = {
  page: '#FBF8F2',
  card: '#FFFFFF',
  text: '#2D2824',
  secondary: '#5C544C',
  border: '#E4D8C9',
  coffee: '#B86543',
  coffeeText: '#FBF8F1',
};

const SECTIONS = [
  {
    label: 'Shop',
    items: [
      ['Shop All', '/shop'],
      ...COFFEE_FORMATS.map(({ label, path }) => [label, path]),
      ['Instant Classic Coffee', '/products/instant-classic-coffee'],
      ['Instant Mushroom Coffee', '/products/instant-mushroom-coffee'],
      ['Special Editions', '/special-editions'],
      ['Halloween Duo', '/special-editions/collections/halloween'],
    ],
  },
  {
    label: 'Subscriptions',
    to: '/subscription',
    items: [
      ['Choose Your Coffee', '/subscription#coffee-options'],
      ['How Subscriptions Work', '/subscription'],
    ],
  },
  {
    label: 'Learn',
    items: [
      ['Find Your Ritual', '/quiz'],
      ['Journal', '/journal'],
      ['Coffee Recipes', '/recipes'],
      ['Ingredients', '/ingredients'],
      ['FAQ', '/faq'],
    ],
  },
  {
    label: 'Our Story',
    to: '/our-story',
    items: [
      ['Our Story', '/our-story'],
      ['Founder Story', '/founder-story'],
      ['Our Team', '/about/torch-republic-team'],
      ['Customer Spotlight', '/customer-spotlight'],
      ['Contact', '/contact'],
    ],
  },
];

export default function UnifiedHeader() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  const isActive = (to) => !!to && (location.pathname === to || (to !== '/' && location.pathname.startsWith(to)));

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="px-4 py-2 text-center" style={{ background: colors.coffee, color: colors.coffeeText }}>
        <p className="font-heading text-[0.8125rem] sm:text-sm leading-snug" style={{ maxWidth: '100%', wordBreak: 'break-word' }}>&#x1F383; Pumpkin Spice has entered the Republic &mdash; limited seasonal release &middot; Free shipping $50+</p>
      </div>
      <header className="sticky top-0 z-40" style={{
        background: scrolled ? 'rgba(251, 248, 242, 0.95)' : 'rgba(251, 248, 242, 0.85)',
        borderBottom: `1px solid ${scrolled ? colors.border : 'rgba(228, 216, 201, 0.6)'}`,
        backdropFilter: 'blur(16px) saturate(1.1)',
        WebkitBackdropFilter: 'blur(16px) saturate(1.1)',
        boxShadow: scrolled ? '0 2px 12px rgba(36,26,22,0.04)' : 'none',
        transition: 'background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        color: colors.text,
      }}>
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3 md:px-8">
          <BackButton className="md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ color: colors.text }} />
          <button onClick={() => setOpen(true)} className="flex min-h-[44px] min-w-[44px] items-center justify-center md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" aria-label="Open navigation menu" aria-expanded={open} style={{ borderRadius: '4px' }}>
            <Menu className="h-6 w-6" />
          </button>
          <Link to="/" className="flex items-center" aria-label="Torch Republic home">
            <img src="/torch-republic-logo-transparent.png" alt="Torch Republic Coffee Company" width="220" height="72" className="h-10 w-auto max-w-[125px] sm:max-w-none sm:h-12 object-contain lg:h-14" />
          </Link>
          <nav className="hidden items-center gap-5 md:ml-6 lg:ml-10 lg:gap-7 md:flex" aria-label="Primary navigation">
            {SECTIONS.map(({ label, items, to }) => (
              <NavDropdown key={label} label={label} items={items} to={to} active={isActive(to)} colors={colors} />
            ))}
          </nav>
          <div className="flex items-center gap-1 md:gap-2">
            <button type="button" onClick={() => setSearchOpen(true)} className="flex min-h-[44px] min-w-[44px] items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" aria-label="Search site" style={{ borderRadius: '4px' }}>
              <Search className="h-5 w-5" style={{ color: colors.text }} />
            </button>
            <Link to="/torchbearers-rewards" className="hidden min-h-[44px] items-center gap-1.5 px-2 font-heading text-sm font-semibold transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 lg:flex" style={{ color: colors.secondary, borderRadius: '4px' }} aria-label="Torchbearer Rewards">
              <Gift className="h-4 w-4" aria-hidden="true" /> Torchbearer Rewards
            </Link>
            <Link to="/profile" className="hidden min-h-[44px] min-w-[44px] items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 md:flex" aria-label="Account" style={{ borderRadius: '4px' }}>
              <User className="h-5 w-5" style={{ color: colors.text }} />
            </Link>
            <Link to="/cart" className="relative flex min-h-[44px] min-w-[44px] items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" aria-label={`Cart with ${totalItems} items`} style={{ borderRadius: '4px' }}>
              <ShoppingBag className="h-5 w-5" style={{ color: colors.text }} />
              {totalItems > 0 && (
                <span className="absolute right-0 top-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px]" style={{ background: colors.coffee, color: colors.card }}>{totalItems}</span>
              )}
            </Link>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}