import React from 'react';
import { SectionWrap, Eyebrow, SectionHeading, Lead } from './PortfolioPrimitives';
import { P, FONT_MONO, FONT_SANS } from './portfolioTheme';

const PATH = ['AI Quality', 'AI Implementation', 'Intelligent Commerce', 'AI Commerce Architecture'];

export default function CareerDirection() {
  return (
    <SectionWrap id="direction">
      <Eyebrow>Professional Development</Eyebrow>
      <SectionHeading>Building Deeper Into AI Commerce</SectionHeading>

      <div className="mt-8">
        <ul className="m-0 p-0 list-none flex flex-col gap-2.5 md:flex-row md:flex-wrap md:items-center md:justify-center">
          {PATH.map((s, i) => (
            <li key={s} className="flex items-center gap-2.5 md:flex-col md:gap-1.5">
              <span
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: i === PATH.length - 1 ? P.accentInk : P.ink,
                  background: i === PATH.length - 1 ? P.accentSoft : P.surface,
                  border: `1px solid ${i === PATH.length - 1 ? `${P.accent}40` : P.rule}`,
                  borderRadius: '999px',
                  padding: '0.45rem 0.85rem',
                  whiteSpace: 'nowrap',
                }}
              >
                {s}
              </span>
              {i < PATH.length - 1 && (
                <>
                  <span className="md:hidden" style={{ color: P.accent }} aria-hidden="true">↓</span>
                  <span className="hidden md:inline" style={{ color: P.accent, fontSize: '0.85rem' }} aria-hidden="true">→</span>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      <p style={{ marginTop: '1.5rem', fontFamily: FONT_SANS, fontSize: '0.92rem', lineHeight: 1.7, color: P.secondary, maxWidth: '62ch' }}>
        Currently deepening technical skills in AI systems, APIs, automation, data and commerce architecture while
        continuing hands-on quality and implementation work.
      </p>
    </SectionWrap>
  );
}