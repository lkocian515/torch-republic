import React from 'react';
import { SectionWrap, Eyebrow, SectionHeading, Lead } from './PortfolioPrimitives';
import { P, FONT_MONO } from './portfolioTheme';
import { usePortfolioMotion } from './usePortfolioMotion';

const STEPS = [
  'Business Requirement', 'Prompt / Instruction', 'AI-Assisted Build', 'Manual Review',
  'Defect Discovery', 'Prompt / Implementation Revision', 'Retest', 'Deploy',
];

export default function DevLoop() {
  const scope = usePortfolioMotion((gsap) => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: '.dl-diagram', start: 'top 78%' },
    });

    STEPS.forEach((_, i) => {
      tl.fromTo(`.dl-node-${i}`, { opacity: 0.3 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, i * 0.12);
      if (i < STEPS.length - 1) {
        tl.fromTo(`.dl-connector-${i}`, { scaleX: 0 }, { scaleX: 1, duration: 0.15, ease: 'power2.out' }, i * 0.12 + 0.15);
      }
    });
  });

  return (
    <SectionWrap id="dev-loop">
      <div ref={scope}>
        <Eyebrow>AI-Assisted Development Loop</Eyebrow>
        <SectionHeading>AI-Assisted Development &ne; Unreviewed AI Output</SectionHeading>
        <Lead>The process depended on continuous human evaluation. Generated outputs were reviewed against business requirements, customer experience, visual consistency and functional behavior before being accepted or revised.</Lead>

        <div className="dl-diagram mt-9">
          <ul className="m-0 p-0 list-none flex flex-col gap-2.5 md:flex-row md:flex-wrap md:items-center md:justify-center">
            {STEPS.map((s, i) => (
              <li key={s} className="flex items-center gap-2.5 md:flex-col md:gap-1.5">
                <span
                  className={`dl-node-${i}`}
                  style={{
                    fontFamily: FONT_MONO, fontSize: '0.66rem', fontWeight: 700,
                    letterSpacing: '0.06em', textTransform: 'uppercase', color: P.ink,
                    background: P.surface, border: `1px solid ${P.rule}`,
                    borderRadius: '4px', padding: '0.45rem 0.8rem', whiteSpace: 'nowrap',
                  }}
                >
                  {s}
                </span>
                {i < STEPS.length - 1 && (
                  <>
                    <span className="md:hidden" style={{ color: P.accentInk }} aria-hidden="true">&darr;</span>
                    <div className={`dl-connector-${i} hidden md:block`} style={{ width: 20, height: 2, background: P.accent, transformOrigin: 'left center', opacity: 0.5 }} aria-hidden="true" />
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionWrap>
  );
}