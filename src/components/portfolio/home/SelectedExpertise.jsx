import React from 'react';
import { P, FONT_SERIF, FONT_SANS, FONT_MONO } from '../portfolioTheme';
import SectionHeading from './SectionHeading';

const CARDS = [
  {
    title: 'AI output evaluation',
    body: 'Reviewing generated content for factual accuracy, instruction adherence, internal consistency, unsupported claims, and user impact.',
    terms: 'Output review \u00b7 Guideline adherence \u00b7 Error identification',
  },
  {
    title: 'Content and document QA',
    body: 'Validating source material, terminology, metadata, formatting, and complex documents where accuracy and consistency matter.',
    terms: 'Source verification \u00b7 Content review \u00b7 Documentation',
  },
  {
    title: 'Product and workflow testing',
    body: 'Testing responsive interfaces, cart and checkout behavior, error states, integrations, and complete customer journeys.',
    terms: 'Functional QA \u00b7 Regression testing \u00b7 E-commerce workflows',
  },
];

export default function SelectedExpertise() {
  return (
    <section
      id="expertise"
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
          heading="Selected expertise"
          intro="Focused quality review across AI-generated content, complex documents, and customer-facing digital products."
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
                  lineHeight: 1.5,
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