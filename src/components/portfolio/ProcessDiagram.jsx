import React from 'react';
import { SectionWrap, Eyebrow, SectionHeading, Lead } from './PortfolioPrimitives';
import { P, FONT_MONO, FONT_SANS } from './portfolioTheme';

const STEPS = ['Observe', 'Test', 'Identify', 'Iterate', 'Validate', 'Measure'];

export default function ProcessDiagram() {
  return (
    <SectionWrap id="process" alt>
      <Eyebrow>Professional Process</Eyebrow>
      <SectionHeading>How I work through AI and digital products</SectionHeading>
      <Lead>I approach AI and digital products as iterative systems: understand the intended outcome, test the experience, identify failure points, implement improvements, validate the result and continue measuring.</Lead>

      {/* Desktop: horizontal; Mobile: vertical */}
      <div className="mt-9">
        <ul className="m-0 p-0 list-none flex flex-col gap-3 md:flex-row md:items-stretch md:justify-between">
          {STEPS.map((s, i) => (
            <li key={s} className="flex items-center gap-3 md:flex-col md:gap-2 md:flex-1">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 52,
                  minWidth: 52,
                  borderRadius: '10px',
                  background: P.surface,
                  border: `1px solid ${P.rule}`,
                  fontFamily: FONT_MONO,
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: P.accentInk,
                  flexShrink: 0,
                }}
              >
                {s}
              </div>
              {i < STEPS.length - 1 && (
                <>
                  <span className="md:hidden" style={{ color: P.accent, fontSize: '1rem' }} aria-hidden="true">↓</span>
                  <span className="hidden md:block" style={{ color: P.accent, fontSize: '1rem', padding: '0 0.25rem' }} aria-hidden="true">→</span>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      <p style={{ marginTop: '1.75rem', fontFamily: FONT_SANS, fontSize: '0.95rem', lineHeight: 1.7, color: P.secondary, maxWidth: '62ch' }}>
        This process connects the AI QA side of my work with the e-commerce implementation side — the same loop
        applies whether I am evaluating a model output or a checkout flow.
      </p>
    </SectionWrap>
  );
}