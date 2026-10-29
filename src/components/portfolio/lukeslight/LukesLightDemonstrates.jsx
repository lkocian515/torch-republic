import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { P, FONT_SANS, FONT_MONO, portfolioHomeUrl, caseStudyUrl } from '../portfolioTheme';
import { Link } from 'react-router-dom';
import SectionHeading from '../home/SectionHeading';

const SKILLS = [
  {
    label: 'AI output evaluation',
    description: 'Reviewing AI-generated content for clarity, relevance, and unsupported claims before publication.',
  },
  {
    label: 'Instruction adherence',
    description: 'Writing and refining prompts that produce content meeting specific audience and safety requirements.',
  },
  {
    label: 'Content judgment',
    description: 'Assessing whether language is appropriate for vulnerable users and whether it makes honest, supportable claims.',
  },
  {
    label: 'Product usability',
    description: 'Evaluating navigation, content organization, and mobile readability from the perspective of a distressed user.',
  },
  {
    label: 'Clear defect documentation',
    description: 'Documenting content inconsistencies and revision needs in a way that supports implementation and tracking.',
  },
  {
    label: 'Responsible communication',
    description: 'Communicating platform limitations honestly so users can make informed, safe decisions about next steps.',
  },
];

export default function LukesLightDemonstrates() {
  return (
    <section
      id="demonstrates"
      style={{
        background: P.paper,
        paddingTop: 'clamp(3rem, 6vw, 4.5rem)',
        paddingBottom: 'clamp(3.5rem, 7vw, 5rem)',
        borderTop: `1px solid ${P.rule}`,
        scrollMarginTop: 70,
      }}
    >
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <SectionHeading
          eyebrow="Outcomes"
          heading="What the project demonstrates"
          intro="Demonstrated professional skills, not unmeasured social outcomes."
        />
        <div className="grid gap-4 sm:grid-cols-2" style={{ maxWidth: '760px' }}>
          {SKILLS.map((s, i) => (
            <div
              key={i}
              style={{
                background: P.surface,
                border: `1px solid ${P.rule}`,
                borderRadius: '6px',
                padding: '1.25rem 1.5rem',
              }}
            >
              <p
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: '0.64rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: P.accentInk,
                  margin: '0 0 0.5rem',
                }}
              >
                {s.label}
              </p>
              <p
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: '0.875rem',
                  lineHeight: 1.65,
                  color: P.secondary,
                  margin: 0,
                }}
              >
                {s.description}
              </p>
            </div>
          ))}
        </div>
        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: '0.85rem',
            lineHeight: 1.6,
            color: P.muted,
            margin: '1.5rem 0 2.5rem',
            fontStyle: 'italic',
            maxWidth: '640px',
          }}
        >
          This case study describes demonstrated professional skills. It does not claim that the platform
          prevents violence, saves lives, or guarantees safety.
        </p>

        <div
          style={{
            paddingTop: '2rem',
            borderTop: `1px solid ${P.rule}`,
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
          className="md:flex-row md:items-center md:justify-between"
        >
          <Link
            to={portfolioHomeUrl()}
            style={{
              fontFamily: FONT_SANS,
              fontWeight: 600,
              fontSize: '0.875rem',
              color: P.ink,
              border: `1px solid ${P.rule}`,
              padding: '0.6rem 1.25rem',
              borderRadius: '4px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <ArrowLeft size={14} /> Back to portfolio
          </Link>
          <Link
            to={caseStudyUrl()}
            style={{
              fontFamily: FONT_SANS,
              fontWeight: 600,
              fontSize: '0.875rem',
              color: P.onAccent,
              background: P.accent,
              padding: '0.6rem 1.25rem',
              borderRadius: '4px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            View Torch Republic case study <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}