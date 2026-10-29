import React from 'react';
import { colors } from './theme';

const items = [
  'Single-Origin Arabica',
  'Free Shipping $45+',
  'Ships Fast from Texas',
  '30-Day Guarantee',
];

export default function TrustStrip() {
  return (
    <section className="px-5 py-6 md:px-10" style={{ background: colors.page, borderTop: `1px solid ${colors.border}` }}>
      <ul className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-8 gap-y-3 md:justify-between">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2.5 font-heading text-sm" style={{ color: colors.secondary }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: colors.gold }} aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}