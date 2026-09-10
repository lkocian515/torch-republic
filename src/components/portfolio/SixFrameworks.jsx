import React, { useState } from 'react';
import { SectionWrap, Eyebrow, SectionHeading, Lead } from './PortfolioPrimitives';
import { P, FONT_MONO, FONT_SANS } from './portfolioTheme';
import { usePortfolioMotion, isMobile } from './usePortfolioMotion';

const FRAMEWORKS = [
  {
    n: '01',
    title: 'AI Output Quality & Evaluation',
    points: ['Evaluating outputs', 'Accuracy review', 'Consistency', 'Guideline adherence', 'Identifying errors', 'Hallucination awareness', 'Edge-case thinking', 'Human review', 'User-impact evaluation'],
    principle: 'AI output is only valuable when someone validates whether it is accurate, useful and appropriate for the user.',
  },
  {
    n: '02',
    title: 'Prompt Iteration & Model Behavior',
    points: ['Prompt refinement', 'Comparison testing', 'Instruction clarity', 'Output evaluation', 'Identifying failure patterns', 'Systematic iteration', 'Feedback loops'],
    principle: 'Prompting is not simply asking better questions. It is testing how changes in instruction affect behavior and output quality.',
  },
  {
    n: '03',
    title: 'E-Commerce UX & Conversion QA',
    points: ['Product discovery', 'Customer journey', 'Navigation', 'Mobile usability', 'Product presentation', 'Cart behavior', 'Checkout friction', 'Conversion thinking', 'Visual QA', 'Information architecture'],
    principle: 'Quality includes whether the customer can understand, trust and successfully use the experience.',
  },
  {
    n: '04',
    title: 'AI Workflow Implementation',
    points: ['Identifying repetitive work', 'AI-assisted workflows', 'Automation opportunities', 'Content workflows', 'Research workflows', 'Operational efficiency', 'Human-in-the-loop review', 'Implementation testing'],
    principle: 'The goal is not to use AI everywhere. The goal is to use it where it meaningfully improves the workflow.',
  },
  {
    n: '05',
    title: 'Systems & Integration Thinking',
    points: ['Storefront systems', 'Customer data', 'Analytics', 'AI tools', 'Marketing workflows', 'Product information', 'User experience', 'Third-party platforms', 'Interconnected business processes'],
    principle: 'A digital experience is a system, not a collection of isolated pages.',
  },
  {
    n: '06',
    title: 'Documentation & Continuous Improvement',
    points: ['Defect identification', 'Reproducible observations', 'QA documentation', 'Testing notes', 'Before/after comparison', 'Prioritization', 'Troubleshooting', 'Iteration', 'Communicating recommended fixes'],
    principle: 'Good QA does more than identify a problem. It makes the problem understandable and actionable.',
  },
];

export default function SixFrameworks() {
  const [active, setActive] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(0);
  const mobile = typeof window !== 'undefined' ? isMobile() : false;

  const scope = usePortfolioMotion((gsap) => {
    if (isMobile()) {
      gsap.from('.fw-accordion-item', {
        opacity: 0, y: 16, duration: 0.4, stagger: 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: '.fw-accordion', start: 'top 80%' },
      });
      return;
    }
    gsap.from('.fw-nav-item', {
      opacity: 0, x: -12, duration: 0.35, stagger: 0.05, ease: 'power3.out',
      scrollTrigger: { trigger: '.fw-navigator', start: 'top 80%' },
    });
    gsap.from('.fw-detail-reveal', {
      opacity: 0, y: 14, duration: 0.4, stagger: 0.06, ease: 'power3.out',
      scrollTrigger: { trigger: '.fw-detail', start: 'top 75%' },
    });
  });

  if (mobile) {
    return (
      <SectionWrap id="expertise">
        <div ref={scope}>
          <Eyebrow>Core Capability Frameworks</Eyebrow>
          <SectionHeading>Where AI Quality Meets Commerce</SectionHeading>
          <Lead>My work combines human judgment, structured testing, business context and iterative implementation across six connected areas.</Lead>

          <div className="fw-accordion mt-8 flex flex-col gap-3">
            {FRAMEWORKS.map((f, i) => (
              <div key={f.n} className="fw-accordion-item" style={{ border: `1px solid ${P.rule}`, borderRadius: '8px', overflow: 'hidden', background: P.surface }}>
                <button
                  onClick={() => setMobileOpen(mobileOpen === i ? -1 : i)}
                  aria-expanded={mobileOpen === i}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '1rem 1.25rem', background: 'none', border: 'none', cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ fontFamily: FONT_MONO, fontSize: '0.72rem', fontWeight: 700, color: P.accent }}>{f.n}</span>
                  <span style={{ fontFamily: FONT_SANS, fontWeight: 700, fontSize: '1rem', color: P.ink, flex: 1 }}>{f.title}</span>
                  <span style={{ color: P.muted, fontSize: '1.1rem' }} aria-hidden="true">{mobileOpen === i ? '\u2212' : '+'}</span>
                </button>
                {mobileOpen === i && (
                  <div style={{ padding: '0 1.25rem 1.25rem' }}>
                    <ul className="m-0 p-0 list-none flex flex-col gap-1.5">
                      {f.points.map((pt) => (
                        <li key={pt} style={{ fontFamily: FONT_SANS, fontSize: '0.875rem', lineHeight: 1.55, color: P.secondary, display: 'flex', gap: '0.5rem' }}>
                          <span style={{ color: P.accent, flexShrink: 0 }} aria-hidden="true">&bull;</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                    <p style={{ marginTop: '0.85rem', paddingTop: '0.85rem', borderTop: `1px solid ${P.rule}`, fontFamily: FONT_SANS, fontSize: '0.83rem', lineHeight: 1.6, color: P.ink, fontStyle: 'italic', margin: '0.85rem 0 0' }}>
                      {f.principle}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </SectionWrap>
    );
  }

  return (
    <SectionWrap id="expertise">
      <div ref={scope}>
        <Eyebrow>Core Capability Frameworks</Eyebrow>
        <SectionHeading>Where AI Quality Meets Commerce</SectionHeading>
        <Lead>My work combines human judgment, structured testing, business context and iterative implementation across six connected areas.</Lead>

        <div className="fw-navigator mt-9 grid grid-cols-[260px_1fr] gap-8">
          {/* LEFT — index */}
          <div className="flex flex-col gap-1">
            {FRAMEWORKS.map((f, i) => (
              <button
                key={f.n}
                className="fw-nav-item group"
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.75rem 0.85rem', borderRadius: '6px',
                  background: active === i ? P.accentSoft : 'transparent',
                  border: '1px solid', borderColor: active === i ? `${P.accent}40` : 'transparent',
                  cursor: 'pointer', textAlign: 'left', transition: 'background .2s, border-color .2s',
                }}
              >
                <span style={{ fontFamily: FONT_MONO, fontSize: '0.72rem', fontWeight: 700, color: active === i ? P.accent : P.muted, transition: 'color .2s' }}>{f.n}</span>
                <span style={{ fontFamily: FONT_SANS, fontSize: '0.85rem', fontWeight: active === i ? 600 : 500, color: active === i ? P.ink : P.secondary, transition: 'color .2s, font-weight .2s', lineHeight: 1.3 }}>{f.title}</span>
              </button>
            ))}
          </div>

          {/* RIGHT — active detail (all text in DOM for SEO) */}
          <div className="fw-detail" style={{ minHeight: 320 }}>
            {FRAMEWORKS.map((f, i) => (
              <div key={f.n} style={{ display: active === i ? 'block' : 'none' }}>
                <div className="fw-detail-reveal flex items-baseline gap-3">
                  <span style={{ fontFamily: FONT_MONO, fontSize: '0.78rem', fontWeight: 700, color: P.accent }}>{f.n}</span>
                  <h3 style={{ fontFamily: FONT_SANS, fontWeight: 700, fontSize: '1.3rem', color: P.ink, margin: 0, lineHeight: 1.3 }}>{f.title}</h3>
                </div>
                <ul className="fw-detail-reveal mt-4 m-0 p-0 list-none flex flex-col gap-1.5">
                  {f.points.map((pt) => (
                    <li key={pt} style={{ fontFamily: FONT_SANS, fontSize: '0.9rem', lineHeight: 1.55, color: P.secondary, display: 'flex', gap: '0.5rem' }}>
                      <span style={{ color: P.accent, flexShrink: 0 }} aria-hidden="true">&bull;</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <p className="fw-detail-reveal" style={{ marginTop: '1rem', paddingTop: '0.85rem', borderTop: `1px solid ${P.rule}`, fontFamily: FONT_SANS, fontSize: '0.85rem', lineHeight: 1.6, color: P.ink, fontStyle: 'italic', margin: '1rem 0 0' }}>
                  {f.principle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrap>
  );
}