import React from 'react';
import { P, FONT_SERIF, FONT_SANS } from '../portfolioTheme';
import SectionHeading from '../home/SectionHeading';
import { portfolioHomeUrl } from '../portfolioTheme';

export default function CaseStudyOutcome() {
  return (
    <section
      id="outcome"
      style={{
        background: P.paper,
        paddingTop: 'clamp(3rem, 6vw, 5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        scrollMarginTop: 70,
      }}
    >
      <div className="mx-auto max-w-[820px] px-6 md:px-10">
        <SectionHeading eyebrow="Outcome" heading="What the project demonstrates" />
        <p style={{ fontFamily: FONT_SERIF, fontWeight: 600, fontSize: 'clamp(1.2rem, 2.2vw, 1.5rem)', lineHeight: 1.4, color: P.ink, margin: '0 0 1.5rem', letterSpacing: '-0.01em' }}>
          Torch Republic demonstrates the ability to move from an ambiguous business concept to a
          live commerce application while maintaining responsibility for requirements, output review,
          customer experience, defect identification, and final quality.
        </p>
        <p style={{ fontFamily: FONT_SANS, fontSize: '0.975rem', lineHeight: 1.7, color: P.secondary, margin: '0 0 2rem' }}>
          The project connects AI-assisted implementation with the human judgment required to determine
          whether the result is accurate, coherent, usable, and ready for customers.
        </p>
        <a
          href={portfolioHomeUrl()}
          style={{
            fontFamily: FONT_SANS,
            fontWeight: 600,
            fontSize: '0.875rem',
            color: P.accentInk,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          &larr; Back to portfolio
        </a>
      </div>
    </section>
  );
}