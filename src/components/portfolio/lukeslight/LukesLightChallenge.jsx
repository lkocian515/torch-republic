import React from 'react';
import { P, FONT_SANS } from '../portfolioTheme';
import SectionHeading from '../home/SectionHeading';

export default function LukesLightChallenge() {
  return (
    <section
      id="challenge"
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
          eyebrow="Context"
          heading="The challenge"
          intro="Making educational guidance understandable and support pathways easy to find for someone who may be distressed."
        />
        <div style={{ maxWidth: '680px' }}>
          <p style={{ fontFamily: FONT_SANS, fontSize: '0.975rem', lineHeight: 1.75, color: P.secondary, margin: '0 0 1.25rem' }}>
            A person seeking help may be distressed, unsure how to describe their situation, or
            overwhelmed by the volume of information available. They may not know which resource
            applies to them, what will happen if they reach out, or whether asking for help will
            make things worse.
          </p>
          <p style={{ fontFamily: FONT_SANS, fontSize: '0.975rem', lineHeight: 1.75, color: P.secondary, margin: 0 }}>
            The design goal was to make educational guidance understandable and support pathways
            easy to find &mdash; without overstating what the platform can do. The site is an
            educational resource, not an emergency service, and every content decision needed to
            reflect that distinction honestly.
          </p>
        </div>
      </div>
    </section>
  );
}