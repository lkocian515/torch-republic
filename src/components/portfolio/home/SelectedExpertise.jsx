import React from 'react';
import { P, FONT_SERIF, FONT_SANS, FONT_MONO } from '../portfolioTheme';
import SectionHeading from './SectionHeading';

const CARDS = [
  {
    title: 'AI output evaluation',
    body: 'Reviewing generated content for instruction adherence, factual support, internal consistency, and comparative quality across outputs.',
    terms: 'Instruction adherence \u00b7 Factual support \u00b7 Consistency \u00b7 Comparative review',
  },
  {
    title: 'Content quality',
    body: 'Validating source material, clarity, terminology, and unsupported claims where accuracy and consistency matter.',
    terms: 'Source verification \u00b7 Clarity \u00b7 Terminology \u00b7 Unsupported claims',
  },
  {
    title: 'Product QA',
    body: 'Testing customer journeys, responsive interfaces, cart behavior, error states, and documenting defects with clear evidence.',
    terms: 'Customer journeys \u00b7 Responsive interfaces \u00b7 Cart behavior \u00b7 Error states \u00b7 Defect documentation',
  },
];

export default function SelectedExpertise() {
  return (
    <section
      id="capabilities"
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
          eyebrow="Core capabilities"
          heading="What I review and test"
          intro="Focused quality review across AI-generated content, written material, and customer-facing digital products."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {CARDS.map((c) => (
            <div
              key={c.title}
              style={{
                background: P.paper,
                border: `1px solid ${P.rule}`,
                borderRadius: '6px',
                padding: '1.5rem',
              }}
            >
              <h3
                style={{
                  fontFamily: FONT_SERIF,
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  color: P.ink,
                  margin: '0 0 0.75rem',
                  lineHeight: 1.3,
                }}
              >
                {c.title}
              </h3>
              <p
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: '0.925rem',
                  lineHeight: 1.65,
                  color: P.secondary,
                  margin: '0 0 1rem',
                }}
              >
                {c.body}
              </p>
              <p
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: '0.64rem',
                  letterSpacing: '0.06em',
                  color: P.muted,
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {c.terms}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}