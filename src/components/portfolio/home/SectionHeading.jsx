import React from 'react';
import { P, FONT_SERIF, FONT_SANS, FONT_MONO } from '../portfolioTheme';

// Shared section heading: rule-prefixed label + serif heading + optional intro.
export default function SectionHeading({ eyebrow, heading, intro, align = 'left' }) {
  const center = align === 'center';
  return (
    <div
      className={center ? undefined : 'text-center md:text-left'}
      style={{
        maxWidth: '660px',
        marginBottom: '2.5rem',
        ...(center ? { textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' } : null),
      }}
    >
      {eyebrow && (
        <p
          className={`pf-label${center ? ' justify-center' : ' justify-center md:justify-start'}`}
          style={{
            fontFamily: FONT_MONO,
            fontSize: '0.68rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            fontWeight: 600,
            color: P.accentInk,
            margin: '0 0 0.9rem',
          }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        style={{
          fontFamily: FONT_SERIF,
          fontWeight: 700,
          fontSize: 'clamp(1.6rem, 4.6vw, 2.3rem)',
          lineHeight: 1.15,
          color: P.ink,
          margin: 0,
          letterSpacing: '-0.015em',
        }}
      >
        {heading}
      </h2>
      {intro && (
        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: '0.975rem',
            lineHeight: 1.7,
            color: P.secondary,
            margin: '0.9rem 0 0',
          }}
        >
          {intro}
        </p>
      )}
    </div>
  );
}