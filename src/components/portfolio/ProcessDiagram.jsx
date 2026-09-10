import React from 'react';
import { SectionWrap, Eyebrow, SectionHeading, Lead } from './PortfolioPrimitives';
import { P, FONT_MONO, FONT_SANS } from './portfolioTheme';
import { usePortfolioMotion, isMobile } from './usePortfolioMotion';

const STEPS = ['Observe', 'Test', 'Identify', 'Iterate', 'Validate', 'Measure'];

export default function ProcessDiagram() {
  const scope = usePortfolioMotion((gsap) => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: '.process-diagram', start: 'top 78%' },
    });

    STEPS.forEach((_, i) => {
      tl.to(`.process-node-${i}`, { borderColor: P.accent, color: P.accent, duration: 0.3, ease: 'power2.out' }, i * 0.13)
        .fromTo(`.process-connector-${i}`, { scaleX: 0 }, { scaleX: 1, duration: 0.2, ease: 'power2.out' }, i * 0.13 + 0.15);
    });

    // Hover/focus emphasis
    gsap.utils.toArray('.process-node').forEach((node) => {
      node.addEventListener('mouseenter', () => gsap.to(node, { scale: 1.04, duration: 0.3, ease: 'power2.out' }));
      node.addEventListener('mouseleave', () => gsap.to(node, { scale: 1, duration: 0.3, ease: 'power2.out' }));
    });
  });

  return (
    <SectionWrap id="process" alt>
      <div ref={scope}>
        <Eyebrow>Professional Process</Eyebrow>
        <SectionHeading>How I work through AI and digital products</SectionHeading>
        <Lead>I approach AI and digital products as iterative systems: understand the intended outcome, test the experience, identify failure points, implement improvements, validate the result and continue measuring.</Lead>

        <div className="process-diagram mt-9">
          <ul className="m-0 p-0 list-none flex flex-col gap-3 md:flex-row md:items-stretch md:justify-between">
            {STEPS.map((s, i) => (
              <li key={s} className="flex items-center gap-3 md:flex-col md:gap-2 md:flex-1">
                <div
                  className={`process-node process-node-${i}`}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    minHeight: 52, minWidth: 52, borderRadius: '10px',
                    background: P.surface, border: `1px solid ${P.rule}`,
                    fontFamily: FONT_MONO, fontSize: '0.7rem', fontWeight: 700,
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: P.secondary, flexShrink: 0, willChange: 'transform, border-color, color',
                    transition: 'border-color .3s, color .3s',
                  }}
                >
                  {s}
                </div>
                {i < STEPS.length - 1 && (
                  <>
                    <span className="md:hidden" style={{ color: P.accent, fontSize: '1rem' }} aria-hidden="true">&darr;</span>
                    <div className={`process-connector-${i} hidden md:block`} style={{ height: 2, background: P.accent, flex: 1, margin: '0 0.25rem', transformOrigin: 'left center', opacity: 0.5 }} aria-hidden="true" />
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>

        <p style={{ marginTop: '1.75rem', fontFamily: FONT_SANS, fontSize: '0.95rem', lineHeight: 1.7, color: P.secondary, maxWidth: '62ch' }}>
          This process connects the AI QA side of my work with the e-commerce implementation side &mdash; the same loop
          applies whether I am evaluating a model output or a checkout flow.
        </p>
      </div>
    </SectionWrap>
  );
}