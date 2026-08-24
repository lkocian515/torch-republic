import React from 'react';
import { SectionWrap, Eyebrow, SectionHeading } from './PortfolioPrimitives';
import { P, FONT_MONO, FONT_SANS } from './portfolioTheme';

// Understated tooling — only platforms with legitimate project experience.
const GROUPS = [
  {
    heading: 'AI & Evaluation',
    items: ['Generative AI tools', 'Prompt iteration', 'AI-assisted development', 'Output evaluation'],
  },
  {
    heading: 'Commerce',
    items: ['Shopify', 'Base44', 'E-commerce systems'],
  },
  {
    heading: 'Marketing / Experience',
    items: ['Klaviyo', 'Google Search Console', 'Google Analytics', 'SEO tooling'],
  },
  {
    heading: 'Quality',
    items: ['Manual QA', 'Responsive testing', 'Content validation', 'Workflow testing', 'Defect documentation'],
  },
];

export default function ToolsPlatforms() {
  return (
    <SectionWrap id="tools">
      <Eyebrow>Tools &amp; Platforms</Eyebrow>
      <SectionHeading>What I worked with</SectionHeading>

      <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {GROUPS.map((g) => (
          <div key={g.heading}>
            <p style={{ fontFamily: FONT_MONO, fontSize: '0.66rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: P.accent, margin: '0 0 0.85rem', paddingBottom: '0.5rem', borderBottom: `1px solid ${P.rule}` }}>
              {g.heading}
            </p>
            <ul className="m-0 p-0 list-none flex flex-col gap-2">
              {g.items.map((it) => (
                <li key={it} style={{ fontFamily: FONT_SANS, fontSize: '0.88rem', color: P.ink, display: 'flex', gap: '0.5rem', alignItems: 'baseline' }}>
                  <span style={{ color: P.accent, fontSize: '0.7rem' }} aria-hidden="true">•</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionWrap>
  );
}