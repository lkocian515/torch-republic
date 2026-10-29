import React from 'react';
import { P, FONT_SERIF, FONT_SANS, FONT_MONO } from '../portfolioTheme';

// Reusable section shell for every case study block: numbered eyebrow,
// serif heading, optional intro, then the section body.
export default function CaseStudySection({ id, number, heading, intro, children, tone = 'paper' }) {
  const intros = Array.isArray(intro) ? intro : intro ? [intro] : [];
  const isSurface = tone === 'surface';

  return (
    <section
      id={id}
      style={{
        background: isSurface ? P.surfaceAlt : P.paper,
        borderTop: `1px solid ${P.rule}`,
        paddingTop: 'clamp(2.5rem, 6vw, 4rem)',
        paddingBottom: 'clamp(2.5rem, 6vw, 4rem)',
        scrollMarginTop: 118,
      }}
    >
      <div className="mx-auto max-w-[900px] px-5 sm:px-6 md:px-10">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.9rem' }}>
          {number && (
            <span
              style={{
                fontFamily: FONT_MONO,
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                color: P.accentInk,
              }}
            >
              {number}
            </span>
          )}
          <span style={{ flex: 1, height: 1, background: P.rule }} aria-hidden="true" />
        </div>

        <h2
          style={{
            fontFamily: FONT_SERIF,
            fontWeight: 700,
            fontSize: 'clamp(1.5rem, 4.6vw, 2.1rem)',
            lineHeight: 1.15,
            letterSpacing: '-0.015em',
            color: P.ink,
            margin: 0,
          }}
        >
          {heading}
        </h2>

        {intros.map((text) => (
          <p
            key={text.slice(0, 32)}
            style={{
              fontFamily: FONT_SANS,
              fontSize: '0.975rem',
              lineHeight: 1.75,
              color: P.secondary,
              margin: '1rem 0 0',
              maxWidth: '68ch',
            }}
          >
            {text}
          </p>
        ))}

        {children && <div style={{ marginTop: '1.9rem' }}>{children}</div>}
      </div>
    </section>
  );
}