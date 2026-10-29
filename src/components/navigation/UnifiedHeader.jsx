import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, ShoppingBag, Search, User, Gift, ArrowLeft } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import SearchModal from '@/components/search/SearchModal';
import NavDropdown from './NavDropdown';
import MobileMenu from './MobileMenu';
import { COFFEE_FORMATS } from '@/lib/coffeeFormats';
import { BRAND } from '@/lib/brandAssets';

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

// Five primary destinations. Account, cart and rewards stay in the action
// group on the right so the shop never hides them behind a menu.
const SECTIONS = [
  {
    label: 'Shop',
    items: [
      ['Shop All', '/shop'],
      ...COFFEE_FORMATS.map(({ label, path }) => [label, path]),
      ['Instant Classic Coffee', '/products/instant-classic-coffee'],
      ['Instant Mushroom Coffee', '/products/instant-mushroom-coffee'],
      ['Special Editions', '/special-editions'],
      ['Winter Duo', '/winter-duo'],
      ['Journal', '/journal'],
      ['Coffee Recipes', '/recipes'],
      ['FAQ', '/faq'],
    ],
  },
  { label: 'Seasonal Calendar', to: '/seasonal-calendar' },
  { label: 'Duos', to: '/duos' },
  { label: 'Torchbearer Club', to: '/torchbearer-club' },
  {
    label: 'Our Story',
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
  const navigate = useNavigate();
  const isRoot = location.pathname === '/';

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
        <p className="font-heading text-[0.8125rem] sm:text-sm leading-snug" style={{ maxWidth: '100%', wordBreak: 'break-word' }}>&#x1F383; Pumpkin Spice has entered the Republic. Limited seasonal release &middot; Free shipping $50+</p>
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
        {/* Three columns on mobile (leading controls / wordmark / actions) so the
            logo stays centred and the row can never overflow a narrow screen. */}
        <div className="mx-auto grid max-w-[1280px] grid-cols-[1fr_auto_1fr] items-center gap-1 px-3 py-3 sm:gap-2 sm:px-4 md:flex md:justify-between md:px-8">
          {/* Mobile leading controls — grouped so they count as a single item */}
          <div className="flex min-w-0 items-center md:hidden">
            {!isRoot && (
              <button onClick={() => navigate(-1)} className="flex min-h-[44px] min-w-[44px] items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" aria-label="Go back" style={{ borderRadius: '4px' }}>
                <ArrowLeft className="h-6 w-6" style={{ color: colors.text }} />
              </button>
            )}
            <button onClick={() => setOpen(true)} className="flex min-h-[44px] min-w-[44px] items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" aria-label="Open navigation menu" aria-expanded={open} style={{ borderRadius: '4px' }}>
              <Menu className="h-6 w-6" />
            </button>
          </div>
          {/* The full lockup once the row can carry it (md+); the cup-and-flame
              mark on phones, where the wordmark would shrink past readability.
              <picture> means only one file is ever downloaded. */}
          <Link to="/" className="flex min-w-0 shrink-0 items-center justify-center" aria-label="Torch Republic home">
            <picture>
              <source media="(min-width: 768px)" srcSet={BRAND.horizontalLight} width="2092" height="752" />
              <img
                src={BRAND.mark}
                alt="Torch Republic Coffee Company"
                width="1194"
                height="1317"
                className="h-11 w-11 object-contain md:h-[63px] md:w-[175px] lg:h-[70px] lg:w-[195px] xl:h-[76px] xl:w-[212px]"
              />
            </picture>
            <span className="sr-only">Torch Republic Coffee Company</span>
          </Link>
          <nav className="hidden items-center gap-5 md:ml-6 lg:ml-10 lg:gap-7 md:flex" aria-label="Primary navigation">
            {SECTIONS.map(({ label, items, to }) =>
              items ? (
                <NavDropdown key={label} label={label} items={items} to={to} active={isActive(to)} colors={colors} />
              ) : (
                <Link
                  key={label}
                  to={to}
                  className="inline-flex min-h-[44px] items-center font-heading text-sm transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{ color: isActive(to) ? colors.text : colors.secondary, borderRadius: '4px' }}
                  aria-current={isActive(to) ? 'page' : undefined}
                >
                  {label}
                </Link>
              ),
            )}
          </nav>
          <div className="flex min-w-0 items-center justify-end gap-1 md:gap-2">
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