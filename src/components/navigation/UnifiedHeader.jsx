import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, ShoppingBag, Search, User, Gift, ArrowLeft } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import SearchModal from '@/components/search/SearchModal';
import NavDropdown from './NavDropdown';
import MobileMenu from './MobileMenu';
import { COFFEE_FORMATS } from '@/lib/coffeeFormats';
import { BRAND } from '@/lib/brandAssets';

// Every value reads from the theme instead of a hardcoded hex. The header sits
// on the brand plate (the approved light surface for the wordmark), which the
// token layer keeps light in both themes; fills and accents use the live
// --primary so they still adapt.
const colors = {
  page: 'hsl(var(--brand-plate))',
  card: 'hsl(var(--brand-plate-solid))',
  text: 'hsl(var(--brand-ink))',
  secondary: 'hsl(var(--brand-ink-muted))',
  border: 'hsl(var(--brand-rule))',
  coffee: 'hsl(var(--primary))',
  coffeeText: 'hsl(var(--primary-foreground))',
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
      ['Journal', '/journal'],
      ['Coffee Recipes', '/recipes'],
      ['FAQ', '/faq'],
    ],
  },
  { label: 'Seasonal Calendar', to: '/seasonal-calendar' },
  {
    label: 'Duos',
    to: '/duos',
    items: [
      ['All Duos', '/duos'],
      ['Seasonal Duos', '/duos/seasonal'],
      ['Holiday Duos', '/duos/holidays'],
      ['Duo Calendar', '/duo-calendar/2027'],
    ],
  },
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
      <div className="px-4 py-2.5" style={{ background: '#382B24', color: '#F7EEDD', borderBottom: '1px solid rgba(201,162,74,0.65)' }}>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
          <p className="font-heading text-xs sm:text-sm leading-snug" style={{ margin: 0, fontWeight: 600 }}>
            Fireside S&rsquo;mores has entered the Republic.
          </p>
          <span aria-hidden="true" className="hidden sm:block" style={{ width: 1, height: 14, background: 'rgba(201,162,74,0.7)' }} />
          <p className="font-heading text-xs sm:text-sm leading-snug" style={{ margin: 0, color: '#EAC796', fontWeight: 500 }}>
            Free shipping on orders $45+
          </p>
        </div>
      </div>
      <header className="sticky top-0 z-40" style={{
        background: scrolled ? 'hsl(var(--brand-plate) / 0.95)' : 'hsl(var(--brand-plate) / 0.85)',
        borderBottom: `1px solid ${scrolled ? colors.border : 'hsl(var(--brand-rule) / 0.6)'}`,
        backdropFilter: 'blur(16px) saturate(1.1)',
        WebkitBackdropFilter: 'blur(16px) saturate(1.1)',
        boxShadow: scrolled ? '0 2px 12px hsl(var(--brand-ink) / 0.04)' : 'none',
        transition: 'background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        color: colors.text,
      }}>
        {/* Three columns on mobile (leading controls / wordmark / actions) so the
            logo stays centred and the row can never overflow a narrow screen. */}
        <div className="mx-auto grid max-w-[1280px] grid-cols-[1fr_auto_1fr] items-center gap-1 px-3 py-1.5 sm:gap-2 sm:px-4 md:flex md:justify-between md:px-8 md:py-3">
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
          {/* The horizontal lockup once the row can carry it (md+); the full
              stacked lockup on phones, where the icon alone left the wordmark
              unread. Its width follows the viewport so the mark can never run
              into the menu button on the left or the search and cart buttons
              on the right. <picture> means only one file is ever downloaded. */}
          <Link to="/" className="flex min-w-0 shrink-0 items-center justify-center" aria-label="Torch Republic home">
            <picture>
              <source media="(min-width: 768px)" srcSet={BRAND.horizontalLight} width="2092" height="752" />
              <img
                src={BRAND.stackedMobile}
                alt="Torch Republic Coffee Company"
                width="1214"
                height="1295"
                className="block h-auto w-[calc(100vw-228px)] min-w-[74px] max-w-[104px] shrink-0 object-contain md:h-[63px] md:w-[175px] lg:h-[70px] lg:w-[195px] xl:h-[76px] xl:w-[212px]"
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
            <Link to="/torchbearers-rewards" className="hidden min-h-[44px] items-center gap-1.5 px-2 font-heading text-sm font-semibold transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 lg:flex" style={{ color: colors.secondary, borderRadius: '4px' }} aria-label="Republic Rewards">
              <Gift className="h-4 w-4" aria-hidden="true" /> Republic Rewards
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