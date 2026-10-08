import React from 'react';
import { P, FONT_SERIF, FONT_SANS, FONT_MONO } from '../portfolioTheme';
import SectionHeading from '../home/SectionHeading';

const PRIORITIES = [
  {
    title: 'Mobile readability of support pathways',
    description: 'Verify that all four homepage entry points are reachable without horizontal scrolling on small screens, that tap targets meet minimum size guidelines, and that critical disclaimers remain visible above the fold on mobile devices.',
  },
  {
    title: 'Content accuracy and freshness of external resources',
    description: 'Confirm that all linked support services remain reachable and that their hours, phone numbers, and described services match current offerings. The site notes "Contacts verified October 7, 2026" \u2014 this should be re-verified on a regular schedule.',
  },
  {
    title: 'Reading-level consistency across pages',
    description: 'Assess whether language complexity is consistent across pages and appropriate for young readers, using readability scoring tools alongside manual review.',
  },
  {
    title: 'Consistency of safety disclaimers',
    description: 'Verify that the "does not dispatch help" disclaimer and browsing history notice appear consistently on all pages where a user might take an action.',
  },
];

export default function LukesLightReview() {
  return (
    <section
      id="review"
      style={{
        background: P.surface,
        paddingTop: 'clamp(3rem, 6vw, 4.5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 4.5rem)',
        borderTop: `1px solid ${P.rule}`,
        borderBottom: `1px solid ${P.rule}`,
        scrollMarginTop: 70,
      }}
    >
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <SectionHeading
          eyebrow="Quality review"
          heading="Review priorities"
          intro="Proposed checks for further validation. These describe planned work, not completed fixes."
        />
        <div className="flex flex-col gap-4" style={{ maxWidth: '680px' }}>
          {PRIORITIES.map((p, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '1rem',
                padding: '1.25rem 1.5rem',
                background: P.paper,
                border: `1px solid ${P.rule}`,
                borderLeft: `3px solid ${P.accent}`,
                borderRadius: '4px',
              }}
            >
              <p
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: P.accent,
                  margin: 0,
                  flexShrink: 0,
                  minWidth: '1.5rem',
                }}
              >
                0{i + 1}
              </p>
              <div>
                <h3
                  style={{
                    fontFamily: FONT_SERIF,
                    fontWeight: 600,
                    fontSize: '1.05rem',
                    color: P.ink,
                    margin: '0 0 0.5rem',
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: '0.9rem',
                    lineHeight: 1.65,
                    color: P.secondary,
                    margin: 0,
                  }}
                >
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: '0.85rem',
            lineHeight: 1.6,
            color: P.muted,
            margin: '1.5rem 0 0',
            fontStyle: 'italic',
            maxWidth: '640px',
          }}
        >
          These review priorities describe proposed checks, not documented findings. They reflect the
          kinds of issues the project would benefit from systematic evaluation to confirm.
        </p>
      </div>
    </section>
  );
}