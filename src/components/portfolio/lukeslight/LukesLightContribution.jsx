import React from 'react';
import { P, FONT_SANS } from '../portfolioTheme';
import SectionHeading from '../home/SectionHeading';

const CONTRIBUTIONS = [
  'Defining the audience and product requirements.',
  'Writing and refining instructions for AI-assisted implementation.',
  'Reviewing generated language for clarity, relevance, and unsupported claims.',
  'Evaluating navigation, content organization, and mobile readability.',
  'Checking resource destinations and identifying content inconsistencies.',
  'Documenting revisions and reviewing their implementation.',
];

export default function LukesLightContribution() {
  return (
    <section
      id="contribution"
      style={{
        background: P.paper,
        paddingTop: 'clamp(3rem, 6vw, 4.5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 4.5rem)',
        scrollMarginTop: 70,
      }}
    >
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <SectionHeading
          eyebrow="Role"
          heading="My contribution"
          intro="Verified contributions in plain language. Completed work is distinguished from planned validation."
        />
        <div style={{ maxWidth: '680px' }}>
          <ul className="flex flex-col gap-3" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {CONTRIBUTIONS.map((c, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  fontFamily: FONT_SANS,
                  fontSize: '0.975rem',
                  lineHeight: 1.65,
                  color: P.ink,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: P.accent,
                    marginTop: 9,
                    flexShrink: 0,
                  }}
                />
                {c}
              </li>
            ))}
          </ul>
          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: '0.875rem',
              lineHeight: 1.6,
              color: P.muted,
              margin: '1.5rem 0 0',
              fontStyle: 'italic',
            }}
          >
            These contributions represent completed work. Systematic usability testing, reading-level
            verification, and professional content review are identified as future work below.
          </p>
        </div>
      </div>
    </section>
  );
}