import React from 'react';
import { P, FONT_SANS, FONT_MONO } from '../portfolioTheme';
import CaseStudySection from './CaseStudySection';

// Desktop: comparative table. Mobile: one card per row, so the before/after
// pairing survives a narrow screen instead of scrolling sideways.
export default function CaseStudyResults({ data }) {
  return (
    <CaseStudySection id="results" number={data.number} heading={data.heading}>
      {/* Table — tablet and up */}
      <div className="hidden sm:block" style={{ overflowX: 'auto', border: `1px solid ${P.rule}`, borderRadius: '6px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 620 }}>
          <thead>
            <tr>
              {data.columns.map((col) => (
                <th
                  key={col}
                  scope="col"
                  style={{
                    textAlign: 'left',
                    fontFamily: FONT_MONO,
                    fontSize: '0.6rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    color: P.muted,
                    background: P.surfaceAlt,
                    borderBottom: `1px solid ${P.rule}`,
                    padding: '0.8rem 0.9rem',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row) => (
              <tr key={row.metric}>
                <th
                  scope="row"
                  style={{
                    textAlign: 'left',
                    fontFamily: FONT_SANS,
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: P.ink,
                    borderBottom: `1px solid ${P.rule}`,
                    padding: '0.9rem',
                    verticalAlign: 'top',
                  }}
                >
                  {row.metric}
                </th>
                <td
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: '0.85rem',
                    lineHeight: 1.55,
                    color: P.muted,
                    borderBottom: `1px solid ${P.rule}`,
                    padding: '0.9rem',
                    verticalAlign: 'top',
                  }}
                >
                  {row.before}
                </td>
                <td
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: '0.85rem',
                    lineHeight: 1.55,
                    color: P.ink,
                    borderBottom: `1px solid ${P.rule}`,
                    padding: '0.9rem',
                    verticalAlign: 'top',
                  }}
                >
                  {row.after}
                </td>
                <td
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: '0.85rem',
                    lineHeight: 1.55,
                    color: P.accentInk,
                    fontWeight: 600,
                    borderBottom: `1px solid ${P.rule}`,
                    padding: '0.9rem',
                    verticalAlign: 'top',
                  }}
                >
                  {row.impact}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards — phones */}
      <div className="flex flex-col gap-3 sm:hidden">
        {data.rows.map((row) => (
          <div
            key={row.metric}
            style={{
              background: P.surface,
              border: `1px solid ${P.rule}`,
              borderRadius: '6px',
              padding: '1rem 1.05rem',
            }}
          >
            <p
              style={{
                fontFamily: FONT_SANS,
                fontSize: '0.88rem',
                fontWeight: 700,
                color: P.ink,
                margin: '0 0 0.7rem',
              }}
            >
              {row.metric}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              <div>
                <p style={{ fontFamily: FONT_MONO, fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, color: P.muted, margin: '0 0 0.15rem' }}>
                  Before
                </p>
                <p style={{ fontFamily: FONT_SANS, fontSize: '0.85rem', lineHeight: 1.5, color: P.muted, margin: 0 }}>
                  {row.before}
                </p>
              </div>
              <div>
                <p style={{ fontFamily: FONT_MONO, fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, color: P.muted, margin: '0 0 0.15rem' }}>
                  After
                </p>
                <p style={{ fontFamily: FONT_SANS, fontSize: '0.85rem', lineHeight: 1.5, color: P.ink, margin: 0 }}>
                  {row.after}
                </p>
              </div>
              <div style={{ paddingTop: '0.55rem', borderTop: `1px solid ${P.rule}` }}>
                <p style={{ fontFamily: FONT_SANS, fontSize: '0.83rem', lineHeight: 1.55, fontWeight: 600, color: P.accentInk, margin: 0 }}>
                  {row.impact}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Key takeaway */}
      <div
        style={{
          marginTop: '1.75rem',
          padding: '1.25rem 1.3rem',
          background: P.accentSoft,
          border: `1px solid ${P.accent}`,
          borderLeftWidth: 3,
          borderRadius: '6px',
        }}
      >
        <p
          style={{
            fontFamily: FONT_MONO,
            fontSize: '0.6rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 700,
            color: P.accentInk,
            margin: '0 0 0.5rem',
          }}
        >
          Key takeaway
        </p>
        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: '0.92rem',
            lineHeight: 1.7,
            color: P.ink,
            margin: 0,
          }}
        >
          {data.takeaway}
        </p>
      </div>
    </CaseStudySection>
  );
}