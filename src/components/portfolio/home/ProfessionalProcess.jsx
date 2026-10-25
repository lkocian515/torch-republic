import React from 'react';
import { P, FONT_SERIF, FONT_SANS, FONT_MONO } from '../portfolioTheme';

const STEPS = ['Observe', 'Test', 'Identify', 'Iterate', 'Validate', 'Measure'];

export default function ProfessionalProcess() {
  return (
    <section
      id="process"
      style={{
        background: P.paper,
        paddingTop: 'clamp(3rem, 6vw, 5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        scrollMarginTop: 72,
      }}
    >
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <p
          className="pf-label"
          style={{
            fontFamily: FONT_MONO,
            fontSize: '0.68rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            fontWeight: 600,
            color: P.accentInk,
            margin: '0 0 1.35rem',
          }}
        >
          Professional process
        </p>
        <ol
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '0 0 1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '0.4rem 0.65rem',
          }}
        >
          {STEPS.map((step, i) => (
            <li key={step} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span
                style={{
                  fontFamily: FONT_SERIF,
                  fontWeight: 700,
                  fontSize: 'clamp(1.05rem, 3.6vw, 1.5rem)',
                  color: P.ink,
                  whiteSpace: 'nowrap',
                }}
              >
                {step}
              </span>
              {i < STEPS.length - 1 && (
                <span aria-hidden="true" style={{ color: P.accentInk, fontSize: '1.1rem', fontWeight: 600 }}>
                  &rarr;
                </span>
              )}
            </li>
          ))}
        </ol>
        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: '0.95rem',
            lineHeight: 1.7,
            color: P.secondary,
            margin: 0,
            maxWidth: '620px',
          }}
        >
          The same iterative loop applied to both AI-output evaluation and digital-commerce testing.
        </p>
      </div>
    </section>
  );
}