import React from 'react';
import { SectionWrap, Eyebrow, SectionHeading } from './PortfolioPrimitives';
import { P, FONT_MONO, FONT_SANS } from './portfolioTheme';

// Honest skills inventory. Technologies listed reflect practical working
// knowledge gained through the Torch Republic build — not expert engineering
// experience in every tool. Distinguishes hands-on QA/evaluation work from
// working knowledge of development tools.
const GROUPS = [
  {
    heading: 'AI Quality',
    items: ['Prompt testing', 'Output validation', 'Instruction adherence', 'Hallucination detection', 'Content evaluation', 'Consistency QA', 'Research verification'],
  },
  {
    heading: 'Product & E-Commerce',
    items: ['Customer journey testing', 'Conversion QA', 'E-commerce prototyping', 'SEO', 'Analytics', 'Accessibility', 'Checkout-flow testing', 'Content systems'],
  },
  {
    heading: 'Development / Technical',
    items: ['React', 'JavaScript', 'APIs', 'Base44', 'Shopify', 'GA4', 'Google Search Console'],
  },
  {
    heading: 'QA & Documentation',
    items: ['Defect documentation', 'Regression testing', 'Reproducible observations', 'Before/after comparison', 'Prioritization', 'Troubleshooting'],
  },
];

export default function ToolsPlatforms() {
  return (
    <SectionWrap id="tools" alt>
      <Eyebrow>Skills &amp; Tools</Eyebrow>
      <SectionHeading>What I work with</SectionHeading>

      <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {GROUPS.map((g) => (
          <div key={g.heading}>
            <p style={{ fontFamily: FONT_MONO, fontSize: '0.64rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: P.accent, margin: '0 0 0.85rem', paddingBottom: '0.5rem', borderBottom: `1px solid ${P.rule}` }}>
              {g.heading}
            </p>
            <ul className="m-0 p-0 list-none flex flex-col gap-2">
              {g.items.map((it) => (
                <li key={it} style={{ fontFamily: FONT_SANS, fontSize: '0.86rem', color: P.ink, display: 'flex', gap: '0.5rem', alignItems: 'baseline', lineHeight: 1.4 }}>
                  <span style={{ color: P.accent, fontSize: '0.7rem', flexShrink: 0 }} aria-hidden="true">&bull;</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p style={{ marginTop: '1.75rem', fontFamily: FONT_SANS, fontSize: '0.82rem', lineHeight: 1.6, color: P.muted, maxWidth: '65ch' }}>
        Technologies listed reflect practical working knowledge gained through hands-on project work.
        I distinguish between QA and evaluation expertise (where I am strongest) and working knowledge
        of development tools (which I use effectively for testing and implementation, not as a senior engineer).
      </p>
    </SectionWrap>
  );
}