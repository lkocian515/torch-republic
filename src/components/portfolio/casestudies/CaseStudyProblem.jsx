import React from 'react';
import { P, FONT_SANS, FONT_MONO } from '../portfolioTheme';
import CaseStudySection from './CaseStudySection';

export default function CaseStudyProblem({ data }) {
  return (
    <CaseStudySection id="problem" number={data.number} heading={data.heading} intro={data.intro}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {data.items.map((item, i) => (
          <li
            key={item.title}
            style={{
              display: 'flex',
              gap: '0.9rem',
              background: P.surface,
              border: `1px solid ${P.rule}`,
              borderRadius: '6px',
              padding: '1.1rem 1.15rem',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                fontFamily: FONT_MONO,
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: P.accentInk,
                paddingTop: '0.2rem',
                flexShrink: 0,
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <p
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  color: P.ink,
                  margin: '0 0 0.35rem',
                  lineHeight: 1.4,
                }}
              >
                {item.title}
              </p>
              <p
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: '0.9rem',
                  lineHeight: 1.65,
                  color: P.secondary,
                  margin: 0,
                }}
              >
                {item.detail}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </CaseStudySection>
  );
}