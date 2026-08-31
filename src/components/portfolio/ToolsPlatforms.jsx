import React from 'react';
import { SectionWrap, Eyebrow, SectionHeading } from './PortfolioPrimitives';
import { P, FONT_MONO, FONT_SANS } from './portfolioTheme';

// Concise tools/platforms grid. Capability narratives live in the Experience
// snapshot above; this section lists concrete tools and methods only.
const GROUPS = [
  {
    heading: 'AI & Evaluation',
    items: ['LLM output evaluation', 'Prompt & instruction testing', 'Hallucination detection', 'Source-to-output validation', 'NLP-aware review'],
  },
  {
    heading: 'Engineering Stack',
    items: ['React / Redux / TypeScript', 'Node.js / Python', 'GraphQL & API QA', 'GCP / Kubernetes', 'MySQL / PostgreSQL'],
  },
  {
    heading: 'Commerce & Analytics',
    items: ['Shopify', 'Base44', 'Google Analytics', 'Search Console', 'Klaviyo'],
  },
  {
    heading: 'QA & Dev Practices',
    items: ['Defect documentation', 'Regression & revalidation', 'Privacy / PII review', 'GitHub version control', 'Jira / Agile'],
  },
];

export default function ToolsPlatforms() {
  return (
    <SectionWrap id="tools" alt>
      <Eyebrow>Tools &amp; Platforms</Eyebrow>
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
                  <span style={{ color: P.accent, fontSize: '0.7rem', flexShrink: 0 }} aria-hidden="true">•</span>
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