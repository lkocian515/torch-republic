import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronDown, User, Gift, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { COFFEE_FORMATS } from '@/lib/coffeeFormats';
import { BRAND } from '@/lib/brandAssets';

const colors = {
  page: 'hsl(var(--background))',
  card: 'hsl(var(--card))',
  text: 'hsl(var(--foreground))',
  secondary: 'hsl(var(--muted-foreground))',
  border: 'hsl(var(--border))',
  coffee: 'hsl(var(--primary))',
};

// Same five primary destinations as the desktop header. A section with `items`
// expands in place; a section with only `to` is a single link.
const SECTIONS = [
  {
    label: 'Shop Coffee',
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
  { label: 'Monthly Edition', to: '/seasonal-calendar' }
  {
    label: 'Holiday Duos',
    to: '/duos/holidays',
    items: [
      ['All Holiday Duos', '/duos/holidays'],
      ['Halloween Duo', '/duos/midnight-treats'],
      ['Christmas Duo', '/duos/peppermint-fireside'],
      ['Easter Duo', '/duos/spring-bluebonnet-bunny'],
      ['Thanksgiving Duo', '/duos/autumn-coffee-duo'],
    ],
  },
  { label: 'Subscriptions', to: '/subscription' }
  {
    label: 'Our Story',
    items: [
      ['Our Story', '/our-story'],
      ['Founder Story', '/founder-story'],
      ['Our Team', '/about/torch-republic-team'],
      ['Customer Spotlight', '/customer-spotlight'],
      ['Contact', '/contact'],
      ['Shipping Policy', '/shipping-policy'],
      ['Return Policy', '/return-policy'],
    ],
  },
];

export default function MobileMenu({ open, onClose }) {
  const [openSection, setOpenSection] = useState(null);
  const { totalItems } = useCart();

  useEffect(() => {
    if (open) setOpenSection(null);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation" style={{ background: colors.page, overflowY: 'auto' }}>
      <div className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor: colors.border }}>
        <Link to="/" onClick={onClose} aria-label="Torch Republic home" className="inline-flex min-h-[44px] items-center pr-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ borderRadius: '4px' }}>
          <img
            src={BRAND.horizontalLight}
            alt="Torch Republic Coffee Company"
            width="2092"
            height="752"
            className="h-auto w-[220px] max-w-[calc(100vw_-_116px)] object-contain"
          />
        </Link>
        <button onClick={onClose} className="flex min-h-[44px] min-w-[44px] items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" aria-label="Close navigation menu" style={{ borderRadius: '4px' }}>
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="flex gap-3 px-5 py-4" style={{ borderBottom: `1px solid ${colors.border}` }}>
        <Link to="/torchbearers-rewards" onClick={onClose} className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-md px-4 font-heading text-sm font-semibold transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ background: colors.card, border: `1px solid ${colors.border}`, color: colors.text }}>
          <Gift className="h-4 w-4" aria-hidden="true" /> Republic Rewards
        </Link>
        <Link to="/profile" onClick={onClose} className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-md px-4 font-heading text-sm font-semibold transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ background: colors.card, border: `1px solid ${colors.border}`, color: colors.text }}>
          <User className="h-4 w-4" aria-hidden="true" /> Account
        </Link>
      </div>

      <nav className="px-5 py-2" aria-label="Mobile navigation sections">
        {SECTIONS.map(({ label, items, to }) => {
          if (!items) {
            return (
              <div key={label} style={{ borderBottom: `1px solid ${colors.border}` }}>
                <Link
                  to={to}
                  onClick={onClose}
                  className="flex min-h-[52px] w-full items-center font-heading text-base font-semibold transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{ color: colors.text, borderRadius: '4px' }}
                >
                  {label}
                </Link>
              </div>
            );
          }
          const isOpen = openSection === label;
          return (
            <div key={label} style={{ borderBottom: `1px solid ${colors.border}` }}>
              <button
                onClick={() => setOpenSection((s) => (s === label ? null : label))}
                className="flex w-full min-h-[52px] items-center justify-between font-heading text-base font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{ color: colors.text, borderRadius: '4px' }}
                aria-expanded={isOpen}
              >
                {label}
                <ChevronDown className="h-4 w-4 transition-transform" style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }} aria-hidden="true" />
              </button>
              {isOpen && (
                <div className="pb-2">
                  {items.map(([itemLabel, href]) => (
                    <Link
                      key={href}
                      to={href}
                      onClick={onClose}
                      className="block min-h-[48px] py-3 pl-4 font-heading text-base transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      style={{ color: colors.secondary, borderRadius: '4px' }}
                    >
                      {itemLabel}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="px-5 py-4">
        <Link to="/cart" onClick={onClose} className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-md font-heading text-sm font-semibold transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ background: colors.coffee, color: 'hsl(var(--primary-foreground))' }}>
          <ShoppingBag className="h-4 w-4" aria-hidden="true" /> Cart{totalItems > 0 ? ` (${totalItems})` : ''}
        </Link>
      </div>
    </div>
  );
}