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
        scrollMarginTop: 70,
      }}
    >
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <p style={{ fontFamily: FONT_MONO, fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, color: P.accent, margin: '0 0 1rem' }}>
          Professional process
        </p>
        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4">
          {STEPS.map((step, i) => (
            <React.Fragment key={step}>
              <span style={{
                fontFamily: FONT_SERIF,
                fontWeight: 700,
                fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                color: P.ink,
              }}>
                {step}
              </span>
              {i < STEPS.length - 1 && (
                <span style={{
                  fontFamily: FONT_SANS,
                  color: P.accent,
                  fontSize: '1.2rem',
                  fontWeight: 600,
                }}>
                  &rarr;
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
        <p style={{ fontFamily: FONT_SANS, fontSize: '0.95rem', lineHeight: 1.65, color: P.secondary, margin: 0, maxWidth: '620px' }}>
          The same iterative loop applied to both AI-output evaluation and digital-commerce testing.
        </p>
      </div>
    </section>
  );
}