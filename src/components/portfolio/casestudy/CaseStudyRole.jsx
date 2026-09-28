import React from 'react';
import { P, FONT_SERIF, FONT_SANS, FONT_MONO } from '../portfolioTheme';
import SectionHeading from '../home/SectionHeading';

const RESPONSIBILITIES = [
  'Product requirements and brand direction',
  'Prompt specifications and AI-assisted implementation review',
  'Application configuration and Shopify integration decisions',
  'Customer-journey testing and content QA',
  'Responsive review across desktop, tablet, and mobile',
  'Defect documentation, troubleshooting, and regression testing',
];

export default function CaseStudyRole() {
  return (
    <section
      id="role"
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
        <SectionHeading eyebrow="My role" heading="Founder, product builder, and e-commerce QA" />
        <p style={{ fontFamily: FONT_SANS, fontSize: '0.95rem', color: P.accentInk, fontWeight: 600, margin: '0 0 1.5rem' }}>
          Founder &middot; Product builder &middot; E-commerce QA
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {RESPONSIBILITIES.map((r) => (
            <li key={r} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: P.accent, marginTop: '0.6rem', flexShrink: 0 }} aria-hidden="true" />
              <span style={{ fontFamily: FONT_SANS, fontSize: '0.925rem', lineHeight: 1.6, color: P.secondary }}>{r}</span>
            </li>
          ))}
        </ul>
        <p style={{ fontFamily: FONT_SANS, fontSize: '0.85rem', color: P.muted, margin: '1.5rem 0 0', fontStyle: 'italic', lineHeight: 1.6 }}>
          AI-assisted tools produced portions of the implementation. My responsibility was reviewing,
          testing, and validating the output rather than writing every line of code manually.
        </p>
      </div>
    </section>
  );
}