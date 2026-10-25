import React from 'react';
import { SectionWrap, Eyebrow, SectionHeading, Lead } from './PortfolioPrimitives';
import { P, FONT_MONO, FONT_SANS } from './portfolioTheme';

const GROUPS = [
  {
    title: 'Commerce QA',
    items: ['Product and price validation', 'Cart-count accuracy', 'Quantity and removal behavior', 'Cart persistence', 'Checkout handoff', 'Shipping-state validation'],
  },
  {
    title: 'Interface QA',
    items: ['Mobile and desktop responsiveness', 'Navigation and dropdown behavior', 'Modal and popup control', 'Image loading', 'Layering and overflow', 'Focus and accessibility behavior'],
  },
  {
    title: 'Integration QA',
    items: ['Storefront API responses', 'Shopify product status', 'Product availability', 'Error and loading states', 'Analytics verification', 'Production-versus-preview behavior'],
  },
  {
    title: 'Content QA',
    items: ['Product-description accuracy', 'Offer consistency', 'Metadata validation', 'Encoding and formatting issues', 'Removal of outdated product references', 'Customer-facing compliance language'],
  },
];

export default function EngineeringQA() {
  return (
    <SectionWrap id="engineering-qa">
      <Eyebrow>Engineering &amp; QA</Eyebrow>
      <SectionHeading>Building, testing, and improving the system</SectionHeading>
      <Lead>
        Building the application required continuous validation beyond visual design. I tested
        complete customer journeys, investigated inconsistent application states, documented
        defects, traced integration problems, and translated findings into precise implementation
        requirements.
      </Lead>

      <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 gap-5">
        {GROUPS.map((g) => (
          <div key={g.title} style={{ background: P.surface, border: `1px solid ${P.rule}`, borderRadius: '8px', padding: '1.35rem' }}>
            <p style={{ fontFamily: FONT_MONO, fontSize: '0.64rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: P.accentInk, margin: '0 0 0.85rem', paddingBottom: '0.5rem', borderBottom: `1px solid ${P.rule}` }}>
              {g.title}
            </p>
            <ul className="m-0 p-0 list-none flex flex-col gap-2">
              {g.items.map((it) => (
                <li key={it} style={{ fontFamily: FONT_SANS, fontSize: '0.86rem', color: P.ink, display: 'flex', gap: '0.5rem', alignItems: 'baseline', lineHeight: 1.4 }}>
                  <span style={{ color: P.accentInk, fontSize: '0.7rem', flexShrink: 0 }} aria-hidden="true">&bull;</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', paddingLeft: '1.25rem', borderLeft: `2px solid ${P.accent}` }}>
        <p style={{ fontFamily: FONT_SANS, fontSize: '0.92rem', lineHeight: 1.7, color: P.ink, margin: 0, fontStyle: 'italic' }}>
          I used AI-assisted development as part of the build process, while remaining responsible
          for product decisions, prompt specifications, workflow design, output validation, defect
          identification, regression testing, and final quality.
        </p>
      </div>
    </SectionWrap>
  );
}