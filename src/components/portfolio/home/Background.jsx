import React from 'react';
import { P, FONT_SERIF, FONT_SANS, FONT_MONO } from '../portfolioTheme';
import SectionHeading from './SectionHeading';

const ENTRIES = [
  {
    title: 'AI quality review and content evaluation',
    body: 'Experience reviewing AI-generated material for instruction adherence, factual support, clarity, consistency, and user impact. Work includes structured evaluation, error identification, output comparison, and corrective feedback.',
  },
  {
    title: 'Applied product and e-commerce QA',
    body: 'Built and tested a custom Base44/React storefront integrated with Shopify. Practical work includes customer-journey testing, responsive QA, metadata review, analytics configuration, troubleshooting, and commerce-flow validation.',
  },
  {
    title: 'Document quality and legal support',
    body: 'Former remote freelance paralegal with experience in legal research, document review, source verification, structured documentation, and detail-sensitive work.',
  },
  {
    title: 'Published authorship',
    body: `Author of "You Can't Fix Them, So Stop Trying." Experience includes long-form research, developmental editing, structural consistency, publishing workflows, and translating complex subjects into accessible language.`,
  },
];

const TOOLS = [
  { label: 'AI evaluation', items: 'Output review \u00b7 Prompt testing \u00b7 Instruction adherence \u00b7 Content evaluation' },
  { label: 'QA', items: 'Defect documentation \u00b7 Regression testing \u00b7 Source verification \u00b7 Responsive testing' },
  { label: 'Platforms', items: 'Base44 \u00b7 Shopify \u00b7 React \u00b7 GA4 \u00b7 Google Search Console' },
];

export default function Background() {
  return (
    <section
      id="background"
      style={{
        background: P.surface,
        borderTop: `1px solid ${P.rule}`,
        borderBottom: `1px solid ${P.rule}`,
        paddingTop: 'clamp(3rem, 6vw, 5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        scrollMarginTop: 70,
      }}
    >
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <SectionHeading
          eyebrow="Professional background"
          heading="Experience built around accuracy, judgment, and clear communication"
        />

        <div className="grid gap-4 md:grid-cols-2 mb-6">
          {ENTRIES.map((e) => (
            <div
              key={e.title}
              style={{
                padding: '1.25rem 1.5rem',
                border: `1px solid ${P.rule}`,
                borderRadius: '6px',
                background: P.paper,
              }}
            >
              <h3
                style={{
                  fontFamily: FONT_SERIF,
                  fontWeight: 700,
                  fontSize: '1.08rem',
                  color: P.ink,
                  margin: '0 0 0.5rem',
                  lineHeight: 1.3,
                }}
              >
                {e.title}
              </h3>
              <p
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: '0.9rem',
                  lineHeight: 1.65,
                  color: P.secondary,
                  margin: 0,
                }}
              >
                {e.body}
              </p>
            </div>
          ))}
        </div>

        {/* Alignerr credential */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            border: `1px solid ${P.rule}`,
            borderRadius: '6px',
            background: P.paper,
            marginBottom: '2rem',
          }}
        >
          <h3
            style={{
              fontFamily: FONT_SERIF,
              fontWeight: 700,
              fontSize: '1.08rem',
              color: P.ink,
              margin: '0 0 0.5rem',
              lineHeight: 1.3,
            }}
          >
            Alignerr Network by Labelbox
          </h3>
          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: '0.9rem',
              lineHeight: 1.65,
              color: P.secondary,
              margin: 0,
            }}
          >
            Member of the Alignerr network for AI content evaluation, including output review,
            instruction adherence, error identification, and structured feedback.
          </p>
        </div>

        {/* Tools */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', marginBottom: '1.5rem' }}>
          {TOOLS.map((t) => (
            <div key={t.label}>
              <p
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: '0.62rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: P.muted,
                  margin: '0 0 0.35rem',
                }}
              >
                {t.label}
              </p>
              <p
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: '0.85rem',
                  color: P.secondary,
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {t.items}
              </p>
            </div>
          ))}
        </div>

        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: '0.82rem',
            color: P.muted,
            margin: '0 0 1.5rem',
            fontStyle: 'italic',
            maxWidth: '600px',
          }}
        >
          QA and evaluation are my primary strengths. Development technologies reflect practical working
          knowledge gained through hands-on product implementation.
        </p>

        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: '0.85rem',
            color: P.secondary,
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          Current professional development includes AWS AI Practitioner exam preparation.
        </p>
      </div>
    </section>
  );
}