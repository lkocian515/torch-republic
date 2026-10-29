import React from 'react';
import { P, FONT_SANS, FONT_MONO } from '../portfolioTheme';
import CaseStudySection from './CaseStudySection';

// Testing pipeline as a wrapping flow, then the primary evaluation metrics.
export default function CaseStudyMethod({ data }) {
  return (
    <CaseStudySection
      id="method"
      number={data.number}
      heading={data.heading}
      tone="surface"
    >
      <p
        style={{
          fontFamily: FONT_MONO,
          fontSize: '0.62rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fontWeight: 600,
          color: P.muted,
          margin: '0 0 0.75rem',
        }}
      >
        {data.pipelineLabel}
      </p>

      <ol
        style={{
          listStyle: 'none',
          padding: 0,
          margin: '0 0 2.25rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '0.45rem',
        }}
      >
        {data.pipeline.map((step, i) => (
          <li key={step} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <span
              style={{
                fontFamily: FONT_SANS,
                fontSize: '0.8rem',
                fontWeight: 600,
                color: P.ink,
                background: P.surface,
                border: `1px solid ${P.rule}`,
                borderRadius: '4px',
                padding: '0.4rem 0.7rem',
                whiteSpace: 'nowrap',
              }}
            >
              {step}
            </span>
            {i < data.pipeline.length - 1 && (
              <span aria-hidden="true" style={{ color: P.accentInk, fontSize: '0.8rem' }}>
                →
              </span>
            )}
          </li>
        ))}
      </ol>

      <p
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
        {data.metricsLabel}
      </p>

      <dl style={{ margin: 0 }}>
        {data.metrics.map((metric) => (
          <div
            key={metric.name}
            style={{
              padding: '1.05rem 0',
              borderBottom: `1px solid ${P.rule}`,
            }}
          >
            <dt
              style={{
                fontFamily: FONT_SANS,
                fontSize: '0.92rem',
                fontWeight: 600,
                color: P.ink,
                margin: '0 0 0.3rem',
                lineHeight: 1.4,
              }}
            >
              {metric.name}
            </dt>
            <dd
              style={{
                fontFamily: FONT_SANS,
                fontSize: '0.9rem',
                lineHeight: 1.65,
                color: P.secondary,
                margin: 0,
                maxWidth: '72ch',
              }}
            >
              {metric.definition}
            </dd>
          </div>
        ))}
      </dl>
    </CaseStudySection>
  );
}