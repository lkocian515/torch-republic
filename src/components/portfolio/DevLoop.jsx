import React from 'react';
import { SectionWrap, Eyebrow, SectionHeading, Lead } from './PortfolioPrimitives';
import { P, FONT_MONO, FONT_SANS } from './portfolioTheme';

const STEPS = [
  'Business Requirement',
  'Prompt / Instruction',
  'AI-Assisted Build',
  'Manual Review',
  'Defect Discovery',
  'Prompt / Implementation Revision',
  'Retest',
  'Deploy',
];

export default function DevLoop() {
  return (
    <SectionWrap id="dev-loop">
      <Eyebrow>AI-Assisted Development Loop</Eyebrow>
      <SectionHeading>AI-Assisted Development ≠ Unreviewed AI Output</SectionHeading>
      <Lead>The process depended on continuous human evaluation. Generated outputs were reviewed against business requirements, customer experience, visual consistency and functional behavior before being accepted or revised.</Lead>

      <div className="mt-9">
        <ul className="m-0 p-0 list-none flex flex-col gap-2.5 md:flex-row md:flex-wrap md:items-center md:justify-center">
          {STEPS.map((s, i) => (
            <li key={s} className="flex items-center gap-2.5 md:flex-col md:gap-1.5">
              <span
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: '0.66rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: P.ink,
                  background: P.surface,
                  border: `1px solid ${P.rule}`,
                  borderRadius: '999px',
                  padding: '0.45rem 0.8rem',
                  whiteSpace: 'nowrap',
                }}
              >
                {s}
              </span>
              {i < STEPS.length - 1 && (
                <>
                  <span className="md:hidden" style={{ color: P.accent }} aria-hidden="true">↓</span>
                  <span className="hidden md:inline" style={{ color: P.accent, fontSize: '0.85rem' }} aria-hidden="true">→</span>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </SectionWrap>
  );
}