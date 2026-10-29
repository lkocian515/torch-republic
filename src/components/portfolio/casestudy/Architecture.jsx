import React from 'react';
import { P, FONT_SANS } from '../portfolioTheme';
import SectionHeading from '../home/SectionHeading';

const PATTERNS = [
  'Product and collection presentation',
  'Cart creation and state management',
  'Shopify checkout handoff',
  'Loading, empty, success, and error states',
  'Analytics event patterns',
  'Configurable brand and product content',
];

export default function Architecture() {
  return (
    <section
      id="reusable"
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
        <SectionHeading
          eyebrow="Reusable components"
          heading="Patterns that can be adapted for other storefronts"
        />
        <p style={{ fontFamily: FONT_SANS, fontSize: '0.95rem', lineHeight: 1.7, color: P.secondary, margin: '0 0 1.25rem' }}>
          The custom customer interface is separated from Shopify&rsquo;s underlying product, cart, and
          checkout services. Product displays, cart behavior, content sections, analytics events, and
          Shopify integration logic are organized as reusable patterns that can be revised for
          additional products or adapted to other direct-to-consumer brands.
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {PATTERNS.map((p) => (
            <li key={p} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: P.accent, marginTop: '0.55rem', flexShrink: 0 }} aria-hidden="true" />
              <span style={{ fontFamily: FONT_SANS, fontSize: '0.875rem', lineHeight: 1.55, color: P.secondary }}>{p}</span>
            </li>
          ))}
        </ul>
        <p style={{ fontFamily: FONT_SANS, fontSize: '0.85rem', color: P.muted, margin: 0, fontStyle: 'italic', lineHeight: 1.6 }}>
          The codebase is maintained in version control, allowing tested components and system patterns
          to be restored, revised, and reused in future commerce projects.
        </p>
      </div>
    </section>
  );
}