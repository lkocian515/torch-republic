import React from 'react';
import { P, FONT_SANS, FONT_MONO, SECTION } from './portfolioTheme';

export function SectionWrap({ id, alt = false, wide = false, children }) {
  return (
    <section
      id={id}
      style={{
        background: alt ? P.surface : 'transparent',
        borderTop: alt ? `1px solid ${P.rule}` : '1px solid transparent',
        scrollMarginTop: '72px',
      }}
    >
      <div
        className="mx-auto px-6 md:px-10"
        style={{
          maxWidth: wide ? 1140 : 880,
          paddingTop: SECTION.paddingTop,
          paddingBottom: SECTION.paddingBottom,
        }}
      >
        {children}
      </div>
    </section>
  );
}

export function Eyebrow({ children }) {
  return (
    <p
      className="text-center md:text-left"
      style={{
        fontFamily: FONT_MONO,
        fontSize: '0.6875rem',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        fontWeight: 600,
        color: P.accent,
        margin: 0,
      }}
    >
      {children}
    </p>
  );
}

export function SectionHeading({ children, as: Tag = 'h2', style, className }) {
  return (
    <Tag
      className={`text-center md:text-left ${className || ''}`}
      style={{
        fontFamily: FONT_SANS,
        fontWeight: 700,
        fontSize: 'clamp(1.6rem, 3vw, 2.25rem)',
        lineHeight: 1.15,
        letterSpacing: '-0.01em',
        color: P.ink,
        margin: '0.75rem 0 0',
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

export function Lead({ children, center = false, style }) {
  return (
    <p
      className="text-center md:text-left"
      style={{
        fontFamily: FONT_SANS,
        fontSize: '1.0625rem',
        lineHeight: 1.7,
        color: P.secondary,
        margin: '0.85rem 0 0',
        maxWidth: center ? '60ch' : '65ch',
        marginLeft: center ? 'auto' : 0,
        marginRight: center ? 'auto' : 0,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

export function Card({ children, pad = '1.5rem', style, className }) {
  return (
    <div
      className={className}
      style={{
        background: P.surface,
        border: `1px solid ${P.rule}`,
        borderRadius: '8px',
        padding: pad,
        height: '100%',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Pill({ children }) {
  return (
    <span
      style={{
        fontFamily: FONT_SANS,
        fontSize: '0.8125rem',
        fontWeight: 500,
        color: P.ink,
        background: P.surface,
        border: `1px solid ${P.rule}`,
        borderRadius: '4px',
        padding: '0.4rem 0.85rem',
      }}
    >
      {children}
    </span>
  );
}

// Mono uppercase label for sub-sections within a case study.
// Replaces duplicated inline styles across AiOutputValidation, QaEvidence, DefectCard.
export function SubLabel({ children }) {
  return (
    <h3
      style={{
        fontFamily: FONT_MONO,
        fontSize: '0.68rem',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        fontWeight: 700,
        color: P.accent,
        margin: 0,
      }}
    >
      {children}
    </h3>
  );
}

// Numbered sans heading for structured case study sections (e.g. "1. The Challenge").
export function SubHeading({ children }) {
  return (
    <h3
      className="text-center md:text-left"
      style={{
        fontFamily: FONT_SANS,
        fontWeight: 700,
        fontSize: '1.1rem',
        color: P.ink,
        margin: 0,
        letterSpacing: '-0.005em',
      }}
    >
      {children}
    </h3>
  );
}

// Standard body paragraph for case study sections — consistent size, leading,
// and measure across all sections.
export function BodyText({ children, style, className }) {
  return (
    <p
      className={`text-center md:text-left ${className || ''}`}
      style={{
        fontFamily: FONT_SANS,
        fontSize: '0.95rem',
        lineHeight: 1.7,
        color: P.secondary,
        margin: '0.6rem 0 0',
        maxWidth: '66ch',
        ...style,
      }}
    >
      {children}
    </p>
  );
}