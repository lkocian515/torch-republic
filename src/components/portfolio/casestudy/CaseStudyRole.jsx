import React from 'react';
import { P, FONT_SERIF, FONT_SANS, FONT_MONO } from '../portfolioTheme';
import SectionHeading from '../home/SectionHeading';

const CATEGORIES = [
  {
    label: 'Strategy & architecture',
    items: [
      'Strategy, requirements, and architecture decisions',
      'Product taxonomy and content architecture',
      'Conversion optimization and iterative redesign',
    ],
  },
  {
    label: 'Product decisions',
    items: [
      'Product line definition and pricing structure',
      'Brand direction and customer-facing content',
      'Page structure and customer journey design',
    ],
  },
  {
    label: 'AI-assisted implementation',
    items: [
      'Prompt specifications for component and page generation',
      'Review and validation of AI-generated output',
      'Correcting defects introduced during implementation',
    ],
  },
  {
    label: 'Configuration',
    items: [
      'Shopify integration settings and product data mapping',
      'Centralized pricing, content, and site configuration files',
      'Metadata, structured data, and analytics event setup',
    ],
  },
  {
    label: 'Hands-on QA',
    items: [
      'Customer-journey testing from discovery through checkout',
      'Responsive review across desktop, tablet, and mobile',
      'Defect documentation, troubleshooting, and regression testing',
    ],
  },
];

export default function CaseStudyRole() {
  return (
    <section
      id="responsibilities"
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
        <SectionHeading eyebrow="My responsibilities" heading="Where I contributed" />
        <div className="grid gap-4 md:grid-cols-2">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.label}
              style={{
                padding: '1.25rem 1.5rem',
                border: `1px solid ${P.rule}`,
                borderRadius: '6px',
                background: P.paper,
              }}
            >
              <h3 style={{
                fontFamily: FONT_MONO, fontSize: '0.64rem', letterSpacing: '0.1em',
                textTransform: 'uppercase', fontWeight: 600, color: P.accent,
                margin: '0 0 0.75rem',
              }}>
                {cat.label}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {cat.items.map((item) => (
                  <li key={item} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: P.accent, marginTop: '0.55rem', flexShrink: 0 }} aria-hidden="true" />
                    <span style={{ fontFamily: FONT_SANS, fontSize: '0.875rem', lineHeight: 1.55, color: P.secondary }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: FONT_SANS, fontSize: '0.85rem', color: P.muted, margin: '1.5rem 0 0', fontStyle: 'italic', lineHeight: 1.6 }}>
          AI-assisted tools produced portions of the implementation. My responsibility was reviewing,
          testing, and validating the output rather than writing every line of code manually.
        </p>
      </div>
    </section>
  );
}