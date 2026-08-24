import React from 'react';
import { SectionWrap, Eyebrow, SectionHeading, Lead } from './PortfolioPrimitives';
import { P, FONT_MONO, FONT_SANS } from './portfolioTheme';

const FACTS = ['BA, Psychology', 'Business Administration', 'Remote professional', 'E-commerce', 'AI quality & evaluation'];

export default function AboutLisa() {
  return (
    <SectionWrap id="about">
      <Eyebrow>About</Eyebrow>
      <SectionHeading>About Lisa</SectionHeading>
      <Lead>
        I’m a remote professional with a BA in Psychology and a Business Administration background, and experience
        across business operations and e-commerce. I work on AI quality and output evaluation — bringing strong
        written communication, analytical thinking, troubleshooting and a customer perspective to digital work.
      </Lead>
      <p style={{ fontFamily: FONT_SANS, fontSize: '0.95rem', lineHeight: 1.7, color: P.secondary, marginTop: '0.85rem', maxWidth: '64ch' }}>
        A psychology background informs how I think about user behavior, qualitative evaluation, language nuance and
        human-centered technology — it is not formal UX research or clinical training. I pair that lens with
        business judgment and hands-on implementation to make AI-assisted products more reliable.
      </p>
      <div className="mt-6 flex flex-wrap gap-2.5">
        {FACTS.map((f) => (
          <span key={f} style={{ fontFamily: FONT_MONO, fontSize: '0.66rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: P.ink, background: P.surface, border: `1px solid ${P.rule}`, borderRadius: '999px', padding: '0.4rem 0.8rem' }}>
            {f}
          </span>
        ))}
      </div>
    </SectionWrap>
  );
}