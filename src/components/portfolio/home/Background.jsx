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
];

export default function Background() {
  return (
    <section
      id="experience"
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
          eyebrow="Experience"
          heading="Relevant experience and tools"
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
            Member of the Alignerr network for AI content evaluation, covering output review, instruction
            adherence, error identification, and structured feedback. Network membership is not an
            employment relationship and does not confirm specific assignments or completed client work.
          </p>
        </div>

        {/* Tools — one compact section */}
        <div style={{ marginBottom: '1.5rem' }}>
          <p
            style={{
              fontFamily: FONT_MONO,
              fontSize: '0.62rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: P.muted,
              margin: '0 0 0.4rem',
            }}
          >
            Tools
          </p>
          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: '0.9rem',
              color: P.secondary,
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Base44 &middot; Shopify &middot; React &middot; GA4 &middot; Google Search Console
          </p>
        </div>

        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: '0.85rem',
            color: P.muted,
            margin: 0,
            lineHeight: 1.6,
            fontStyle: 'italic',
          }}
        >
          Development technologies reflect practical working knowledge gained through hands-on product
          implementation, not advanced software engineering or automated testing certifications.
          Current professional development includes AWS AI Practitioner exam preparation (exam
          preparation, not a completed certification).
        </p>
      </div>
    </section>
  );
}