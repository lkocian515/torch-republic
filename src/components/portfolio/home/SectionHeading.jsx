import React from 'react';
import { P, FONT_SERIF, FONT_SANS, FONT_MONO } from '../portfolioTheme';

// Shared section heading: eyebrow + sentence-case heading + optional intro.
export default function SectionHeading({ eyebrow, heading, intro, align = 'left' }) {
  const center = align === 'center';
  return (
    <div
      className="mx-auto text-center md:mx-0 md:text-left"
      style={{
        maxWidth: '640px',
        marginBottom: '2.5rem',
        ...(center ? { textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' } : null),
      }}
    >
      {eyebrow && (
        <p
          style={{
            fontFamily: FONT_MONO,
            fontSize: '0.68rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            fontWeight: 600,
            color: P.accent,
            margin: '0 0 0.85rem',
          }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        style={{
          fontFamily: FONT_SERIF,
          fontWeight: 700,
          fontSize: 'clamp(1.6rem, 3vw, 2.1rem)',
          lineHeight: 1.2,
          color: P.ink,
          margin: 0,
          letterSpacing: '-0.01em',
        }}
      >
        {heading}
      </h2>
      {intro && (
        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: '0.975rem',
            lineHeight: 1.65,
            color: P.secondary,
            margin: '0.85rem 0 0',
          }}
        >
          {intro}
        </p>
      )}
    </div>
  );
}