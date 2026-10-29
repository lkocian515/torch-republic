import React from 'react';
import { P, FONT_SANS } from '../portfolioTheme';
import SectionHeading from '../home/SectionHeading';

const APPROACH = [
  'Responsive testing across desktop, tablet, and mobile breakpoints',
  'Customer-journey testing from product discovery through cart, checkout handoff, and order confirmation',
  'Functional QA of cart operations: add, update quantity, remove, and checkout redirect',
  'Content QA of product data, pricing, metadata, imagery, and structured data',
  'Regression testing after each iterative change',
  'Cross-browser verification',
  'Accessibility review of focus states, semantic structure, keyboard navigation, and screen-reader behavior',
];

export default function TestingApproach() {
  return (
    <section
      id="testing"
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
        <SectionHeading eyebrow="Testing approach" heading="How quality was verified throughout development" />
        <p style={{ fontFamily: FONT_SANS, fontSize: '0.95rem', lineHeight: 1.7, color: P.secondary, margin: '0 0 1.5rem' }}>
          Testing was continuous and integrated into every iterative change rather than treated as a
          final phase. Each release was evaluated against the customer journey before being considered
          complete.
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {APPROACH.map((a) => (
            <li key={a} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: P.accent, marginTop: '0.6rem', flexShrink: 0 }} aria-hidden="true" />
              <span style={{ fontFamily: FONT_SANS, fontSize: '0.925rem', lineHeight: 1.6, color: P.secondary }}>{a}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}