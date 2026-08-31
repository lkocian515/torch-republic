import React from 'react';
import { Link } from 'react-router-dom';

const colors = { card: 'hsl(var(--card))', text: 'hsl(var(--foreground))', secondary: 'hsl(var(--muted-foreground))', border: 'hsl(var(--border))' };

const groups = [
  ['Shop', [
    ['All Products', '/shop'],
    ['Instant Classic Coffee', '/products/instant-classic-coffee'],
    ['Instant Mushroom Coffee', '/products/instant-mushroom-coffee'],
    ['Ceremonial Matcha', '/products/ceremonial-matcha'],
    ['The Blends', '/blends'],
    ['Gifts', '/gifts'],
    ['Morning Ritual', '/shop/morning-ritual'],
    ['Focus Coffee', '/shop/focus-coffee'],
    ['Travel Coffee', '/shop/travel-coffee'],
  ]],
  ['Build Your Ritual', [
    ['Build Your Ritual', '/build-your-ritual'],
    ['Find Your Blend Quiz', '/quiz'],
    ['Subscription', '/subscription'],
    ['How It Works', '/how-it-works'],
  ]],
  ['Learn', [
    ['Journal', '/journal'],
    ['Coffee Recipes', '/recipes'],
    ['Ingredients', '/ingredients'],
    ['FAQ', '/faq'],
    ['Research Hub', '/research'],
    ['Reviews', '/reviews'],
  ]],
  ['Our Story', [
    ['Our Mission', '/our-story'],
    ['Founder Story', '/founder-story'],
    ['Our Team', '/about/torch-republic-team'],
    ['Customer Spotlight', '/customer-spotlight'],
    ['Contact', '/contact'],
  ]],
  ['Account & Help', [
    ['Torchbearers Rewards', '/torchbearers-rewards'],
    ['My Account', '/profile'],
    ['Cart', '/cart'],
    ['Shipping Policy', '/shipping-policy'],
    ['Return Policy', '/return-policy'],
    ['Privacy Policy', '/privacy-policy'],
    ['Terms of Service', '/terms-of-service'],
  ]],
];

const socials = [['Instagram', 'https://instagram.com/torchrepublic'], ['TikTok', 'https://tiktok.com/@torchrepublic'], ['Facebook', 'https://facebook.com/torchrepublic'], ['Pinterest', 'https://pinterest.com/torchrepublic']];

export default function Footer() {
  return (
    <footer style={{ background: colors.card, borderTop: `1px solid ${colors.border}` }}>
      <div className="mx-auto max-w-[1280px] px-5 py-12 md:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2.2fr] lg:gap-14">
          <div className="lg:max-w-xs">
            <img src="/torch-republic-logo-transparent.png" alt="Torch Republic Coffee Company" width="190" height="52" className="h-14 w-auto" />
            <p className="mt-4 max-w-sm text-base leading-7" style={{ color: colors.secondary }}>Thoughtfully crafted light-roast instant coffee, functional mushroom coffee, and ceremonial matcha for clearer, more intentional daily rituals.</p>
            <p className="mt-3 font-heading text-sm" style={{ color: colors.text }}>Torch Republic Coffee Company</p>
            <p className="mt-2 max-w-sm font-heading text-xs leading-6" style={{ color: colors.secondary }}>Torch Republic Coffee Company is a DBA of LiberTees For All Apparel LLC.</p>
          </div>
          <div className="grid grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-2 sm:gap-x-8 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-6">
            {groups.map(([heading, links]) => (
              <div key={heading} className="min-w-0">
                <h2 className="font-heading text-sm font-semibold" style={{ color: colors.text }}>{heading}</h2>
                <ul className="mt-3 space-y-2.5">
                  {links.map(([label, href]) => (
                    <li key={href} className="leading-6">
                      <Link to={href} className="inline-block font-heading text-sm transition-opacity duration-200 hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ color: colors.secondary, borderRadius: '4px' }}>{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t pt-6 md:flex-row md:items-center md:justify-between" style={{ borderColor: colors.border }}>
          <div className="flex flex-wrap gap-4">
            {socials.map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="font-heading text-sm transition-opacity duration-200 hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ color: colors.secondary, borderRadius: '4px' }}>{label}</a>
            ))}
          </div>
          <p className="font-heading text-sm" style={{ color: colors.secondary }}>© {new Date().getFullYear()} Torch Republic Coffee Company</p>
        </div>
      </div>
    </footer>
  );
}