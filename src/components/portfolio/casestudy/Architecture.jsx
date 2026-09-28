import React from 'react';
import { ChevronDown } from 'lucide-react';
import { P, FONT_SERIF, FONT_SANS, FONT_MONO } from '../portfolioTheme';
import SectionHeading from '../home/SectionHeading';

const PATTERNS = [
  'Product and collection presentation',
  'Cart creation and state management',
  'Quantity and removal controls',
  'Shopify checkout handoff',
  'Loading, empty, success, and error states',
  'Responsive navigation and interface behavior',
  'Promotional content components',
  'Analytics event patterns',
  'Metadata and structured content',
  'Configurable brand and product content',
];

const LAYERS = [
  {
    label: 'Configurable brand and catalog layer',
    detail: 'Product data, pricing, brand content, and page content',
  },
  {
    label: 'Reusable Base44/React commerce components',
    detail: 'Product display, cart, navigation, content, and analytics patterns',
  },
  {
    label: 'Shopify product, cart, and checkout services',
    detail: 'Live product data, cart operations, and secure payment processing',
  },
];

export default function Architecture() {
  return (
    <section
      id="architecture"
      style={{
        background: P.paper,
        paddingTop: 'clamp(3rem, 6vw, 5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        scrollMarginTop: 70,
      }}
    >
      <div className="mx-auto max-w-[820px] px-6 md:px-10">
        <SectionHeading
          eyebrow="Architecture"
          heading="Designed for reuse and adaptation"
        />

        <p style={{ fontFamily: FONT_SANS, fontSize: '0.975rem', lineHeight: 1.7, color: P.secondary, margin: '0 0 1.5rem' }}>
          Torch Republic was structured as a configurable commerce framework rather than a storefront
          permanently tied to one product catalog. Product displays, cart behavior, content sections,
          analytics events, and Shopify integration logic were organized as reusable patterns that
          can be revised for additional products or adapted to other direct-to-consumer brands.
        </p>
        <p style={{ fontFamily: FONT_SANS, fontSize: '0.975rem', lineHeight: 1.7, color: P.secondary, margin: '0 0 2rem' }}>
          The custom customer interface is separated from Shopify&rsquo;s underlying product, cart, and
          checkout services. This separation allows branding, content, catalog structure, and
          customer-facing experiences to change while preserving the core commerce workflow.
        </p>

        {/* Simple 3-layer architecture diagram */}
        <div className="flex flex-col items-center gap-0 mb-10">
          {LAYERS.map((layer, i) => (
            <React.Fragment key={layer.label}>
              <div
                style={{
                  width: '100%',
                  maxWidth: '560px',
                  padding: '1.1rem 1.5rem',
                  border: `1px solid ${P.rule}`,
                  borderRadius: '6px',
                  background: i === 1 ? P.accentSoft : P.surface,
                  textAlign: 'center',
                }}
              >
                <p style={{ fontFamily: FONT_SERIF, fontWeight: 700, fontSize: '0.95rem', color: i === 1 ? P.accentInk : P.ink, margin: '0 0 0.3rem', lineHeight: 1.3 }}>
                  {layer.label}
                </p>
                <p style={{ fontFamily: FONT_SANS, fontSize: '0.82rem', color: P.muted, margin: 0, lineHeight: 1.5 }}>
                  {layer.detail}
                </p>
              </div>
              {i < LAYERS.length - 1 && (
                <ChevronDown size={18} color={P.muted} strokeWidth={1.5} style={{ margin: '0.35rem 0' }} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Reusable patterns list */}
        <p style={{ fontFamily: FONT_MONO, fontSize: '0.64rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: P.muted, margin: '0 0 1rem' }}>
          Reusable implementation patterns
        </p>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 mb-6">
          {PATTERNS.map((pattern) => (
            <li
              key={pattern}
              style={{
                fontFamily: FONT_SANS,
                fontSize: '0.875rem',
                lineHeight: 1.5,
                color: P.secondary,
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
              }}
            >
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: P.accent, marginTop: 8, flexShrink: 0 }} />
              {pattern}
            </li>
          ))}
        </ul>

        <p style={{ fontFamily: FONT_SANS, fontSize: '0.9rem', lineHeight: 1.65, color: P.secondary, margin: '0 0 1rem' }}>
          This structure makes the project useful not only as a functioning storefront, but also as a
          foundation for future commerce implementations.
        </p>
        <p style={{ fontFamily: FONT_SANS, fontSize: '0.9rem', lineHeight: 1.65, color: P.secondary, margin: 0, fontStyle: 'italic' }}>
          The codebase is maintained in version control, allowing tested components and system patterns
          to be restored, revised, and reused in future commerce projects.
        </p>
      </div>
    </section>
  );
}