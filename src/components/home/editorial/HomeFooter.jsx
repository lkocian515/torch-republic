import React from 'react';
import { Link } from 'react-router-dom';
import { colors } from './theme';

const groups = [
  {
    title: 'Shop',
    links: [['All Coffee', '/shop'], ['Mushroom Coffee', '/shop/instant-mushroom-coffee'], ['Classic Coffee', '/shop/instant-coffee'], ['Matcha', '/shop/matcha'], ['Build Your Ritual', '/build-your-ritual']],
  },
  {
    title: 'Learn',
    links: [['Journal', '/journal'], ['Ingredients', '/ingredients'], ['Reviews', '/reviews'], ['FAQ', '/faq']],
  },
  {
    title: 'Help',
    links: [['Contact', '/contact'], ['Shipping Policy', '/shipping-policy'], ['Return Policy', '/return-policy'], ['Torchbearer Rewards', '/torchbearers-rewards']],
  },
  {
    title: 'Legal',
    links: [['Privacy Policy', '/privacy-policy'], ['Terms of Service', '/terms-of-service']],
  },
];

export default function HomeFooter() {
  return (
    <footer className="md:hidden px-5 py-10" style={{ background: colors.page, borderTop: `1px solid ${colors.border}` }}>
      <div className="mx-auto max-w-[1280px]">
        <p className="font-serif text-lg font-semibold" style={{ color: colors.espresso }}>Torch Republic Coffee Company</p>
        <p className="mt-1 text-sm leading-6" style={{ color: colors.secondary }}>Thoughtfully made instant coffee, mushroom blends, and matcha for intentional daily rituals.</p>
        <div className="mt-8 grid grid-cols-2 gap-6">
          {groups.map(({ title, links }) => (
            <div key={title}>
              <p className="font-heading text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: colors.gold }}>{title}</p>
              <ul className="mt-3 space-y-2">
                {links.map(([label, href]) => (
                  <li key={href}>
                    <Link to={href} className="inline-flex min-h-[32px] items-center font-heading text-sm hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ color: colors.secondary, borderRadius: '4px' }}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs" style={{ color: colors.secondary }}>© {new Date().getFullYear()} Torch Republic Coffee Company. All rights reserved.</p>
      </div>
    </footer>
  );
}