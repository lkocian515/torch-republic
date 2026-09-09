import React from 'react';
import { SectionWrap, Eyebrow, SectionHeading } from './PortfolioPrimitives';
import { P, FONT_SANS, FONT_MONO } from './portfolioTheme';

// Three pillars of the QA methodology. Deliberately compact and practical —
// not a motivational framework, but the actual lens applied to every output.
const PILLARS = [
  {
    n: '01',
    title: 'Accuracy',
    question: 'Does it actually work and contain correct information?',
    body: 'Whether reviewing AI-generated text, a product page, a metadata tag, or a checkout flow — the first question is always: is this factually correct, functionally working, and free of unsupported claims.',
  },
  {
    n: '02',
    title: 'Consistency',
    question: 'Does it hold up across every surface and state?',
    body: 'Terminology, pricing, product names, metadata, visual layout, instruction adherence — inconsistency across pages, devices, or AI outputs is a quality defect even when no single instance is individually wrong.',
  },
  {
    n: '03',
    title: 'Testing',
    question: 'Has the behavior been verified, not assumed?',
    body: 'Testing means actually performing the action: clicking the button, reading the output, checking the route, running the query. Assumptions about how something works are the most common source of shipping defects.',
  },
];

export default function QaMethodology() {
  return (
    <SectionWrap id="methodology" alt>
      <Eyebrow>QA Methodology</Eyebrow>
      <SectionHeading>How I evaluate quality</SectionHeading>

      <div className="mt-9 grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
        {PILLARS.map((p) => (
          <div
            key={p.n}
            style={{
              background: P.surface,
              border: `1px solid ${P.rule}`,
              borderRadius: '12px',
              padding: '1.75rem 1.5rem',
            }}
          >
            <div className="flex items-baseline gap-3">
              <span style={{ fontFamily: FONT_MONO, fontSize: '0.78rem', fontWeight: 700, color: P.accent }}>{p.n}</span>
              <h3 style={{ fontFamily: FONT_SANS, fontWeight: 700, fontSize: '1.25rem', color: P.ink, margin: 0 }}>{p.title}</h3>
            </div>
            <p style={{ fontFamily: FONT_SANS, fontWeight: 600, fontSize: '0.92rem', color: P.accentInk, margin: '0.85rem 0 0.65rem', lineHeight: 1.4 }}>
              {p.question}
            </p>
            <p style={{ fontFamily: FONT_SANS, fontSize: '0.9rem', lineHeight: 1.65, color: P.secondary, margin: 0 }}>
              {p.body}
            </p>
          </div>
        ))}
      </div>
    </SectionWrap>
  );
}