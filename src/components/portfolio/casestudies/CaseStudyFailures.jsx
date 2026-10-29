import React from 'react';
import { P, FONT_SANS, FONT_MONO } from '../portfolioTheme';
import CaseStudySection from './CaseStudySection';

// Failure patterns grouped by category, each item anchored so other pages can
// deep-link straight to it (e.g. the QA focus areas on the portfolio home).
export default function CaseStudyFailures({ data }) {
  return (
    <CaseStudySection id="failures" number={data.number} heading={data.heading}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {data.categories.map((category) => (
          <div key={category.key}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.9rem' }}>
              <span
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: '0.62rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  color: P.accentInk,
                  border: `1px solid ${P.accent}`,
                  borderRadius: '4px',
                  padding: '0.28rem 0.55rem',
                  whiteSpace: 'nowrap',
                }}
              >
                {category.key}
              </span>
              <span style={{ flex: 1, height: 1, background: P.rule }} aria-hidden="true" />
            </div>

            <h3
              style={{
                fontFamily: FONT_SANS,
                fontSize: '0.95rem',
                fontWeight: 600,
                color: P.ink,
                margin: '0 0 0.9rem',
              }}
            >
              {category.title}
            </h3>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {category.items.map((item) => (
                <article
                  key={item.id}
                  id={item.id}
                  style={{
                    background: P.surface,
                    border: `1px solid ${P.rule}`,
                    borderLeft: `3px solid ${P.accent}`,
                    borderRadius: '6px',
                    padding: '1.1rem 1.15rem',
                    scrollMarginTop: 128,
                  }}
                >
                  <h4
                    style={{
                      fontFamily: FONT_SANS,
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      lineHeight: 1.4,
                      color: P.ink,
                      margin: '0 0 0.45rem',
                    }}
                  >
                    {item.title}
                  </h4>
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
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </CaseStudySection>
  );
}