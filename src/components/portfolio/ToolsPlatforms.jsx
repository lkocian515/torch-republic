import React from 'react';
import { SectionWrap, Eyebrow, SectionHeading } from './PortfolioPrimitives';
import { P, FONT_MONO, FONT_SANS } from './portfolioTheme';

const GROUPS = [
  {
    heading: 'AI & Evaluation',
    items: ['LLM output evaluation', 'Prompt & instruction testing', 'AI performance QA', 'NLP-aware review', 'Hallucination detection'],
  },
  {
    heading: 'Engineering Stack',
    items: ['React / Redux / TypeScript', 'Node.js / Python', 'GraphQL & API QA', 'GCP / Kubernetes', 'MySQL / PostgreSQL'],
  },
  {
    heading: 'Commerce & Analytics',
    items: ['Shopify', 'Base44', 'Google Analytics', 'Google Search Console', 'Klaviyo'],
  },
  {
    heading: 'QA Methods',
    items: ['Defect reproduction & docs', 'Regression & revalidation', 'Direct-route testing', 'Access-control review', 'Privacy / PII review'],
  },
  {
    heading: 'Dev Practices',
    items: ['GitHub version control', 'Agile workflows', 'Jira (Fundamentals Badge)', 'UiPath Automation'],
  },
  {
    heading: 'Certifications',
    items: ['Jira Fundamentals · Atlassian 2026', 'UiPath Automation Diploma · 2026', 'Google Analytics Cert · 2026', 'ML (Kaggle) · In Progress'],
  },
];

export default function ToolsPlatforms() {
  return (
    <SectionWrap id="tools">
      <Eyebrow>Tools &amp; Platforms</Eyebrow>
      <SectionHeading>What I worked with</SectionHeading>

      <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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