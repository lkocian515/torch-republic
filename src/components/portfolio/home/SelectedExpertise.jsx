import React from 'react';
import { P, FONT_SERIF, FONT_SANS, FONT_MONO } from '../portfolioTheme';
import SectionHeading from './SectionHeading';

const FRAMEWORKS = [
  {
    num: '01',
    title: 'AI Output Quality & Evaluation',
    body: 'Output evaluation, accuracy review, consistency, guideline adherence, error identification, hallucination awareness, edge-case thinking, human review, user-impact evaluation.',
  },
  {
    num: '02',
    title: 'Prompt Iteration & Model Behavior',
    body: 'Prompt refinement, comparison testing, instruction clarity, output evaluation, failure-pattern identification, systematic iteration, feedback loops.',
  },
  {
    num: '03',
    title: 'E-Commerce UX & Conversion QA',
    body: 'Product discovery, customer journey, navigation, mobile usability, product presentation, cart behavior, checkout friction, conversion thinking, visual QA, information architecture.',
  },
  {
    num: '04',
    title: 'AI Workflow Implementation',
    body: 'Identifying repetitive work, AI-assisted workflows, automation opportunities, content/research workflows, operational efficiency, human-in-the-loop review, implementation testing.',
  },
  {
    num: '05',
    title: 'Systems & Integration Thinking',
    body: 'Storefront systems, customer data, analytics, AI tools, marketing workflows, product information, user experience, third-party platforms, interconnected processes.',
  },
  {
    num: '06',
    title: 'Documentation & Continuous Improvement',
    body: 'Defect identification, reproducible observations, QA documentation, testing notes, before/after comparison, prioritization, troubleshooting, iteration, actionable recommended fixes.',
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
          heading="Six capability frameworks"
          intro="The same iterative evaluation loop applied to both AI-output review and digital-commerce testing."
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