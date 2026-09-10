import React from 'react';
import { SectionWrap, Eyebrow, SectionHeading, Lead } from './PortfolioPrimitives';
import { P, FONT_MONO, FONT_SANS } from './portfolioTheme';

// Compact defect-thinking card — authentic issue from the project.
const DEFECT = {
  issue: 'Mobile product presentation created visual hierarchy problems.',
  impact: 'Customers could have difficulty identifying the primary action or product information.',
  priority: 'UX / Conversion',
  action: 'Adjusted hierarchy, spacing and responsive behavior.',
  validation: 'Retested across mobile and desktop breakpoints.',
};

const ROWS = ['issue', 'impact', 'priority', 'action', 'validation'];

export default function DefectCard() {
  return (
    <SectionWrap id="defect-thinking">
      <Eyebrow>Defect Thinking</Eyebrow>
      <SectionHeading>How a single issue gets framed</SectionHeading>
      <Lead>QA is more than &ldquo;something looks off.&rdquo; It is defining the issue, the impact, the priority, the action and how the fix is verified.</Lead>

      <div className="mt-8" style={{ background: P.surface, border: `1px solid ${P.rule}`, borderRadius: '8px', padding: '1.75rem', maxWidth: 720 }}>
        <dl className="m-0 flex flex-col gap-3">
          {ROWS.map((key) => (
            <div key={key} style={{ display: 'flex', gap: '1rem' }}>
              <dt style={{ fontFamily: FONT_MONO, fontSize: '0.64rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: P.accent, flexShrink: 0, width: '5.5rem', paddingTop: '0.12rem' }}>
                {key}
              </dt>
              <dd style={{ margin: 0, fontFamily: FONT_SANS, fontSize: '0.925rem', lineHeight: 1.6, color: key === 'priority' ? P.accentInk : P.ink, fontWeight: key === 'priority' ? 600 : 400 }}>
                {DEFECT[key]}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </SectionWrap>
  );
}