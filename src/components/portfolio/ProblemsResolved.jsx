import React from 'react';
import { SectionWrap, Eyebrow, SectionHeading, Lead } from './PortfolioPrimitives';
import { P, FONT_SANS } from './portfolioTheme';

const PROBLEMS = [
  'Diagnosed cart-count discrepancies where one customer action could produce an incorrect item total',
  'Corrected inconsistent pricing between product displays and cart states',
  'Investigated product availability and Shopify draft-versus-active status',
  'Improved modal dismissal and prevented promotional overlays from blocking shopping',
  'Found responsive image and logo problems that appeared differently on desktop and mobile',
  'Identified corrupted text characters and separated source-content issues from cached production behavior',
  'Audited exposed utility or administrative routes and documented production-access risks',
  'Simplified the catalog as the product strategy evolved from multiple concepts to two core coffee products',
];

export default function ProblemsResolved() {
  return (
    <SectionWrap id="problems" alt>
      <Eyebrow>Case-Study Challenges</Eyebrow>
      <SectionHeading>Problems I identified and resolved</SectionHeading>
      <Lead>
        These are concise examples from the build. Some were implemented with AI-assisted
        development tools; in every case I was responsible for identifying, testing, documenting,
        and validating the outcome.
      </Lead>

      <ul className="mt-8 m-0 p-0 list-none flex flex-col gap-3">
        {PROBLEMS.map((p, i) => (
          <li key={i} style={{ display: 'flex', gap: '0.85rem', alignItems: 'baseline' }}>
            <span style={{ fontFamily: FONT_SANS, fontSize: '0.8rem', fontWeight: 700, color: P.accentInk, flexShrink: 0, minWidth: '1.5rem' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span style={{ fontFamily: FONT_SANS, fontSize: '0.92rem', lineHeight: 1.65, color: P.ink }}>
              {p}
            </span>
          </li>
        ))}
      </ul>
    </SectionWrap>
  );
}