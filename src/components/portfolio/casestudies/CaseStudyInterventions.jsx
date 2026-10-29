import React from 'react';
import { P, FONT_SANS, FONT_MONO } from '../portfolioTheme';
import CaseStudySection from './CaseStudySection';

export default function CaseStudyInterventions({ data }) {
  return (
    <CaseStudySection
      id="interventions"
      number={data.number}
      heading={data.heading}
      tone="surface"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {data.steps.map((step) => (
          <div
            key={step.title}
            style={{
              background: P.surface,
              border: `1px solid ${P.rule}`,
              borderRadius: '6px',
              padding: '1.25rem 1.25rem 1.35rem',
            }}
          >
            <h3
              style={{
                fontFamily: FONT_SANS,
                fontSize: '0.95rem',
                fontWeight: 700,
                lineHeight: 1.4,
                color: P.ink,
                margin: '0 0 0.9rem',
              }}
            >
              {step.title}
            </h3>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {step.items.map((item) => (
                <li key={item.title} style={{ display: 'flex', gap: '0.65rem' }}>
                  <span
                    aria-hidden="true"
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: '0.7rem',
                      lineHeight: '1.55',
                      color: P.accentInk,
                      flexShrink: 0,
                    }}
                  >
                    ▸
                  </span>
                  <div>
                    <p
                      style={{
                        fontFamily: FONT_SANS,
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        color: P.ink,
                        margin: '0 0 0.25rem',
                        lineHeight: 1.45,
                      }}
                    >
                      {item.title}
                    </p>
                    <p
                      style={{
                        fontFamily: FONT_SANS,
                        fontSize: '0.88rem',
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
          </div>
        ))}
      </div>
    </CaseStudySection>
  );
}