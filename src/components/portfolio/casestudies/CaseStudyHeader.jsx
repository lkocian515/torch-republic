import React from 'react';
import { P, FONT_SERIF, FONT_SANS, FONT_MONO } from '../portfolioTheme';

// Title, subtitle, role/scope metadata, and the headline impact metrics.
export default function CaseStudyHeader({ data }) {
  return (
    <header
      style={{
        background: P.paper,
        paddingTop: 'clamp(2.25rem, 5vw, 3.5rem)',
        paddingBottom: 'clamp(2.25rem, 5vw, 3.25rem)',
      }}
    >
      <div className="mx-auto max-w-[900px] px-5 sm:px-6 md:px-10">
        <p
          style={{
            fontFamily: FONT_MONO,
            fontSize: '0.66rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            fontWeight: 600,
            color: P.accentInk,
            margin: '0 0 0.8rem',
          }}
        >
          Case study
        </p>

        <h1
          style={{
            fontFamily: FONT_SERIF,
            fontWeight: 700,
            fontSize: 'clamp(2rem, 7vw, 3rem)',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: P.ink,
            margin: 0,
          }}
        >
          {data.title}
        </h1>

        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: 'clamp(0.95rem, 2.6vw, 1.1rem)',
            lineHeight: 1.6,
            color: P.secondary,
            margin: '0.9rem 0 0',
            maxWidth: '60ch',
          }}
        >
          {data.subtitle}
        </p>

        {/* Role, domain, timeline, tools */}
        <dl
          className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2"
          style={{
            margin: '2.25rem 0 0',
            paddingTop: '1.75rem',
            borderTop: `1px solid ${P.rule}`,
          }}
        >
          {data.meta.map((item) => (
            <div key={item.label}>
              <dt
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: '0.62rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: P.muted,
                  margin: '0 0 0.35rem',
                }}
              >
                {item.label}
              </dt>
              <dd
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: '0.9rem',
                  lineHeight: 1.55,
                  color: P.ink,
                  margin: 0,
                }}
              >
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Key impact metrics */}
        <div style={{ marginTop: '2rem' }}>
          <p
            style={{
              fontFamily: FONT_MONO,
              fontSize: '0.62rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: P.accentInk,
              margin: '0 0 0.85rem',
            }}
          >
            Key impact
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {data.impact.map((metric) => (
              <div
                key={metric.label}
                style={{
                  background: P.surface,
                  border: `1px solid ${P.rule}`,
                  borderTop: `2px solid ${P.accent}`,
                  borderRadius: '6px',
                  padding: '1.15rem 1.2rem',
                }}
              >
                <p
                  style={{
                    fontFamily: FONT_SERIF,
                    fontWeight: 700,
                    fontSize: 'clamp(1.6rem, 5vw, 2rem)',
                    lineHeight: 1,
                    color: P.ink,
                    margin: '0 0 0.5rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {metric.value}
                </p>
                <p
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    lineHeight: 1.4,
                    color: P.ink,
                    margin: '0 0 0.4rem',
                  }}
                >
                  {metric.label}
                </p>
                <p
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: '0.8rem',
                    lineHeight: 1.55,
                    color: P.muted,
                    margin: 0,
                  }}
                >
                  {metric.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}