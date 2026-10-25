import React from 'react';
import { P, FONT_SERIF, FONT_SANS, FONT_MONO } from '../portfolioTheme';
import SectionHeading from './SectionHeading';

const FRAMEWORKS = [
  {
    num: '01',
    title: 'AI Output Quality & Evaluation',
    body: 'Reading AI output the way a user would. Is it accurate, is it consistent, does it follow the brief, and does it hold up at the edges? I flag hallucinations, unsupported claims, and anything that could mislead someone.',
  },
  {
    num: '02',
    title: 'Prompt Iteration & Model Behavior',
    body: 'Rewriting prompts to remove ambiguity, comparing outputs across versions, and tracing a failure back to the instruction that caused it.',
  },
  {
    num: '03',
    title: 'E-Commerce UX & Conversion QA',
    body: 'Testing product discovery, navigation, cart, and checkout on real devices, then reporting the friction points that cost a sale.',
  },
  {
    num: '04',
    title: 'AI Workflow Implementation',
    body: 'Finding the repetitive parts of a workflow, deciding which ones AI should handle and which ones a person should, and checking the result either way.',
  },
  {
    num: '05',
    title: 'Systems & Integration Thinking',
    body: 'Looking at how the storefront, product data, analytics, and third-party tools connect, because most defects live in the seams between them.',
  },
  {
    num: '06',
    title: 'Documentation & Continuous Improvement',
    body: 'Writing up a defect so someone else can reproduce it, with the steps, the expected result, the actual result, and a recommended fix.',
  },
];

export default function SelectedExpertise() {
  return (
    <section
      id="skills"
      style={{
        background: P.surfaceAlt,
        borderTop: `1px solid ${P.rule}`,
        borderBottom: `1px solid ${P.rule}`,
        paddingTop: 'clamp(3rem, 6vw, 5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        scrollMarginTop: 72,
      }}
    >
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <SectionHeading
          eyebrow="Skills"
          heading="Six areas I work in"
          intro="The same review loop, run the same way, whether the output is a model response or a checkout flow."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {FRAMEWORKS.map((f) => (
            <div
              key={f.num}
              style={{
                background: P.surface,
                border: `1px solid ${P.rule}`,
                borderRadius: '8px',
                padding: 'clamp(1.25rem, 3vw, 1.6rem)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.8rem', marginBottom: '0.6rem' }}>
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: P.accentInk,
                    letterSpacing: '0.08em',
                  }}
                >
                  {f.num}
                </span>
                <h3
                  style={{
                    fontFamily: FONT_SERIF,
                    fontWeight: 700,
                    fontSize: 'clamp(1.1rem, 2.6vw, 1.25rem)',
                    color: P.ink,
                    margin: 0,
                    lineHeight: 1.3,
                  }}
                >
                  {f.title}
                </h3>
              </div>
              <p style={{ fontFamily: FONT_SANS, fontSize: '0.9rem', lineHeight: 1.65, color: P.secondary, margin: 0 }}>
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}