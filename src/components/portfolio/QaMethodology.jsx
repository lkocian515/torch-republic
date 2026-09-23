import React, { useState } from 'react';
import { SectionWrap, Eyebrow, SectionHeading } from './PortfolioPrimitives';
import { P, FONT_SANS, FONT_MONO, FONT_SERIF } from './portfolioTheme';
import { usePortfolioMotion, isMobile } from './usePortfolioMotion';

const PILLARS = [
  {
    n: '01',
    title: 'Accuracy',
    question: 'Does it actually work and contain correct information?',
    body: 'Whether reviewing AI-generated text, a product page, a metadata tag, or a checkout flow \u2014 the first question is always: is this factually correct, functionally working, and free of unsupported claims.',
  },
  {
    n: '02',
    title: 'Consistency',
    question: 'Does it hold up across every surface and state?',
    body: 'Terminology, pricing, product names, metadata, visual layout, instruction adherence \u2014 inconsistency across pages, devices, or AI outputs is a quality defect even when no single instance is individually wrong.',
  },
  {
    n: '03',
    title: 'Testing',
    question: 'Has the behavior been verified, not assumed?',
    body: 'Testing means actually performing the action: clicking the button, reading the output, checking the route, running the query. Assumptions about how something works are the most common source of shipping defects.',
  },
];

export default function QaMethodology() {
  const [active, setActive] = useState(0);
  const mobile = typeof window !== 'undefined' ? isMobile() : false;

  const scope = usePortfolioMotion((gsap, ScrollTrigger) => {
    if (isMobile()) {
      gsap.utils.toArray('.pillar-card').forEach((card) => {
        gsap.from(card.querySelectorAll('.pillar-reveal'), {
          opacity: 0, y: 20, duration: 0.5, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 78%' },
        });
      });
      return;
    }

    // Desktop: scroll-driven active pillar
    PILLARS.forEach((_, i) => {
      ScrollTrigger.create({
        trigger: `.pillar-section-${i}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActive(i),
        onEnterBack: () => setActive(i),
      });
    });

    gsap.utils.toArray('.pillar-section').forEach((section) => {
      gsap.from(section.querySelectorAll('.pillar-reveal'), {
        opacity: 0, y: 24, duration: 0.5, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%' },
      });
    });

    // Animate the active number transitions
    gsap.utils.toArray('.pillar-number').forEach((numEl) => {
      gsap.fromTo(numEl, { opacity: 0.15 }, {
        opacity: 1, duration: 0.4, ease: 'power2.out',
        scrollTrigger: { trigger: numEl, start: 'top 80%' },
      });
    });
  });

  if (mobile) {
    return (
      <SectionWrap id="methodology" alt>
        <Eyebrow>QA Methodology</Eyebrow>
        <SectionHeading>How I evaluate quality</SectionHeading>
        <div ref={scope} className="mt-9 flex flex-col gap-5">
          {PILLARS.map((p) => (
            <div key={p.n} className="pillar-card text-center" style={{ background: P.surface, border: `1px solid ${P.rule}`, borderRadius: '8px', padding: '1.75rem 1.5rem' }}>
              <div className="pillar-reveal flex items-baseline justify-center gap-3">
                <span style={{ fontFamily: FONT_MONO, fontSize: '0.78rem', fontWeight: 700, color: P.accent }}>{p.n}</span>
                <h3 style={{ fontFamily: FONT_SANS, fontWeight: 700, fontSize: '1.2rem', color: P.ink, margin: 0 }}>{p.title}</h3>
              </div>
              <p className="pillar-reveal" style={{ fontFamily: FONT_SANS, fontWeight: 600, fontSize: '0.9rem', color: P.accentInk, margin: '0.85rem 0 0.65rem', lineHeight: 1.4 }}>{p.question}</p>
              <p className="pillar-reveal" style={{ fontFamily: FONT_SANS, fontSize: '0.9rem', lineHeight: 1.65, color: P.secondary, margin: 0 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </SectionWrap>
    );
  }

  return (
    <SectionWrap id="methodology" alt>
      <Eyebrow>QA Methodology</Eyebrow>
      <SectionHeading>How I evaluate quality</SectionHeading>
      <div ref={scope} className="mt-9 grid grid-cols-[2fr_3fr] gap-10">
        {/* LEFT — sticky active pillar */}
        <div style={{ position: 'sticky', top: '88px', height: 'fit-content' }}>
          {PILLARS.map((p, i) => (
            <div key={p.n} style={{ display: i === active ? 'block' : 'none' }}>
              <div className="pillar-number" style={{ fontFamily: FONT_SERIF, fontWeight: 700, fontSize: 'clamp(3.5rem, 6vw, 5rem)', lineHeight: 1, color: i === active ? P.accent : P.muted, letterSpacing: '-0.02em', transition: 'color .3s' }}>
                {p.n}
              </div>
              <h3 style={{ fontFamily: FONT_SANS, fontWeight: 700, fontSize: 'clamp(1.4rem, 2vw, 1.8rem)', color: P.ink, margin: '0.5rem 0 0', letterSpacing: '-0.01em' }}>{p.title}</h3>
              <div style={{ width: '40px', height: '2px', background: P.accent, marginTop: '1rem', borderRadius: '2px' }} />
            </div>
          ))}
          {/* Muted list of all pillars */}
          <div className="mt-8 flex flex-col gap-2">
            {PILLARS.map((p, i) => (
              <button
                key={p.n}
                onClick={() => {
                  const el = document.querySelector(`.pillar-section-${i}`);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  background: 'none', border: 'none', cursor: 'pointer', padding: '0.3rem 0',
                  opacity: i === active ? 1 : 0.4, transition: 'opacity .3s',
                }}
              >
                <span style={{ fontFamily: FONT_MONO, fontSize: '0.7rem', fontWeight: 700, color: i === active ? P.accent : P.muted }}>{p.n}</span>
                <span style={{ fontFamily: FONT_SANS, fontSize: '0.85rem', fontWeight: 600, color: i === active ? P.ink : P.muted }}>{p.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT — scrollable sections */}
        <div className="flex flex-col gap-8">
          {PILLARS.map((p, i) => (
            <div key={p.n} className={`pillar-section pillar-section-${i}`} style={{ minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p className="pillar-reveal" style={{ fontFamily: FONT_SANS, fontWeight: 600, fontSize: 'clamp(1.1rem, 1.6vw, 1.3rem)', color: P.accentInk, margin: '0 0 0.75rem', lineHeight: 1.4 }}>{p.question}</p>
              <p className="pillar-reveal" style={{ fontFamily: FONT_SANS, fontSize: '1rem', lineHeight: 1.7, color: P.secondary, margin: 0, maxWidth: '52ch' }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrap>
  );
}