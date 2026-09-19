import React from 'react';
import { SectionWrap, Eyebrow, SectionHeading, Lead } from './PortfolioPrimitives';
import { P, FONT_SANS } from './portfolioTheme';

const TAGS = [
  'AI-Assisted Product Development',
  'E-commerce Application Design',
  'API Integration',
  'Functional QA',
  'Content Evaluation',
  'Customer Journey Testing',
  'Prompt Iteration',
  'Technical Documentation',
  'Conversion-Focused UX',
  'Issue Investigation',
];

export default function ProjectOutcome() {
  return (
    <SectionWrap id="outcome">
      <Eyebrow>Outcome</Eyebrow>
      <SectionHeading>What this project demonstrates</SectionHeading>
      <Lead>
        Torch Republic demonstrates my ability to move from an ambiguous business concept to a
        functioning digital product. It combines product thinking, brand strategy, AI-assisted
        development, API-connected commerce, content quality, technical troubleshooting, and
        systematic QA in one live application.
      </Lead>

      <div className="mt-8 flex flex-wrap gap-2">
        {TAGS.map((t) => (
          <span key={t} style={{ fontFamily: FONT_SANS, fontSize: '0.8125rem', fontWeight: 500, color: P.ink, background: P.surface, border: `1px solid ${P.rule}`, borderRadius: '4px', padding: '0.4rem 0.85rem' }}>
            {t}
          </span>
        ))}
      </div>
    </SectionWrap>
  );
}