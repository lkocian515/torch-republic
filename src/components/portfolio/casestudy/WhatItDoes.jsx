import React from 'react';
import { P, FONT_SANS, FONT_MONO } from '../portfolioTheme';
import SectionHeading from '../home/SectionHeading';

const FEATURES = [
  { label: 'Core products', value: 'Two instant coffee products with dedicated detail pages, pricing, and preparation instructions' },
  { label: 'Shopping flow', value: 'Shop page, product detail pages, cart, and Shopify-hosted checkout' },
  { label: 'Content', value: 'Brand story, product comparison, brewing guide, and customer feedback sections' },
  { label: 'Responsive', value: 'Mobile and desktop layouts with adaptive navigation and touch-friendly controls' },
];

export default function WhatItDoes() {
  return (
    <section
      id="what-it-does"
      style={{
        background: P.surface,
        borderTop: `1px solid ${P.rule}`,
        borderBottom: `1px solid ${P.rule}`,
        paddingTop: 'clamp(3rem, 6vw, 5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        scrollMarginTop: 70,
      }}
    >
      <div className="mx-auto max-w-[820px] px-6 md:px-10">
        <SectionHeading eyebrow="What it does" heading="The live storefront today" />
        <p style={{ fontFamily: FONT_SANS, fontSize: '0.975rem', lineHeight: 1.7, color: P.secondary, margin: '0 0 1.5rem' }}>
          The application at torchrepublic.com presents a focused product line, supports online
          purchasing through Shopify, and provides content that helps customers understand and compare
          the products.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {FEATURES.map((f) => (
            <div key={f.label} style={{ display: 'flex', gap: '1rem', alignItems: 'baseline' }}>
              <p style={{
                fontFamily: FONT_MONO, fontSize: '0.62rem', letterSpacing: '0.1em',
                textTransform: 'uppercase', fontWeight: 600, color: P.muted,
                margin: 0, minWidth: '120px', flexShrink: 0,
              }}>
                {f.label}
              </p>
              <p style={{ fontFamily: FONT_SANS, fontSize: '0.9rem', lineHeight: 1.6, color: P.secondary, margin: 0 }}>
                {f.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}