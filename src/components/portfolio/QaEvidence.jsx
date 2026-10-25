import React, { useState, useRef } from 'react';
import { SectionWrap, Eyebrow, SectionHeading, Lead } from './PortfolioPrimitives';
import { P, FONT_MONO, FONT_SANS } from './portfolioTheme';
import { usePortfolioMotion, isMobile } from './usePortfolioMotion';


const EXAMPLES = [
  {
    title: 'Broken product imagery across the store',
    short: 'Broken Imagery',
    problem: 'Product image components pointed at hardcoded Shopify placeholder URLs that no longer resolved.',
    evidence: 'Image onError handlers fired on live pages, leaving broken-image icons where product photos should be.',
    hypothesis: 'The hardcoded URLs were stale and never validated against the live image source.',
    change: 'Removed the hardcoded URLs and standardized image handling on a verified, reachable fallback plus valid image sources.',
    validation: 'Re-checked affected product, collection and gallery views across pages.',
    outcome: 'Consistent product imagery sitewide with no broken-image states.',
  },
  {
    title: 'Legacy product names at checkout',
    short: 'Legacy Names',
    problem: 'The cart showed retired product names from an earlier catalog version instead of the current two-product lineup.',
    evidence: 'Adding items from collection pages passed legacy catalog data into the cart.',
    hypothesis: 'The collection grids still fed the retired catalog into the cart instead of the current two-product catalog.',
    change: 'Simplified collection grids to the two core products and redirected legacy product links to the current product pages.',
    validation: 'Re-added items from collection pages and confirmed the cart names matched the public catalog.',
    outcome: 'Cart and checkout naming aligned with the storefront\u2019s current product model.',
  },
  {
    title: 'Discontinued category routes',
    short: 'Discontinued Routes',
    problem: 'Legacy apparel and category URLs led to dead or stale pages.',
    evidence: 'Those routes returned 404s or outdated content instead of a clean destination.',
    hypothesis: 'Categories had been retired without redirect handling, leaving orphaned routes.',
    change: 'Added 301 redirects to the closest relevant pages and 410 \u201Cgone\u201D responses for truly discontinued categories.',
    validation: 'Re-tested the legacy URLs to confirm each resolves to a correct, intentional destination.',
    outcome: 'Clean handling for both users and search engines on retired routes.',
  },
];

const ROWS = [
  { label: 'Problem', key: 'problem' },
  { label: 'Evidence', key: 'evidence' },
  { label: 'Hypothesis', key: 'hypothesis' },
  { label: 'Change', key: 'change' },
  { label: 'Validation', key: 'validation' },
  { label: 'Outcome', key: 'outcome' },
];

export default function QaEvidence() {
  const [activeCase, setActiveCase] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(0);
  const contentRef = useRef(null);
  const mobile = typeof window !== 'undefined' ? isMobile() : false;

  const scope = usePortfolioMotion((gsap) => {
    if (isMobile()) {
      gsap.from('.qa-ev-accordion-item', {
        opacity: 0, y: 16, duration: 0.4, stagger: 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: '.qa-ev-mobile', start: 'top 80%' },
      });
      return;
    }
    gsap.from('.qa-ev-nav-item', {
      opacity: 0, x: -12, duration: 0.35, stagger: 0.06, ease: 'power3.out',
      scrollTrigger: { trigger: '.qa-ev-navigator', start: 'top 80%' },
    });
    // Progress line markers
    gsap.utils.toArray('.qa-ev-marker').forEach((marker, i) => {
      gsap.fromTo(marker, { background: P.rule }, {
        background: P.accent, duration: 0.3, ease: 'power2.out',
        scrollTrigger: { trigger: `.qa-ev-row-${i}`, start: 'top 75%' },
      });
    });
    gsap.from('.qa-ev-row', {
      opacity: 0, y: 12, duration: 0.35, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: '.qa-ev-detail', start: 'top 75%' },
    });
  });

  const activeExample = EXAMPLES[activeCase];

  if (mobile) {
    return (
      <SectionWrap id="evidence" alt>
        <div ref={scope}>
          <Eyebrow>QA Evidence</Eyebrow>
          <SectionHeading>From Observation to Improvement</SectionHeading>
          <Lead>Real examples from the project, walked through the way I actually work &mdash; observe, hypothesize, change, validate. No invented metrics; outcomes are described qualitatively.</Lead>

          <div className="qa-ev-mobile mt-8 flex flex-col gap-3">
            {EXAMPLES.map((ex, i) => (
              <div key={i} className="qa-ev-accordion-item" style={{ border: `1px solid ${P.rule}`, borderRadius: '8px', overflow: 'hidden', background: P.surface }}>
                <button
                  onClick={() => setMobileOpen(mobileOpen === i ? -1 : i)}
                  aria-expanded={mobileOpen === i}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                  <span style={{ fontFamily: FONT_SANS, fontWeight: 700, fontSize: '1rem', color: P.ink }}>{ex.short}</span>
                  <span style={{ color: P.muted, fontSize: '1.1rem' }} aria-hidden="true">{mobileOpen === i ? '\u2212' : '+'}</span>
                </button>
                {mobileOpen === i && (
                  <div style={{ padding: '0 1.25rem 1.25rem' }}>
                    <dl className="m-0 flex flex-col gap-2.5">
                      {ROWS.map(({ label, key }) => (
                        <div key={label} style={{ display: 'flex', gap: '0.85rem' }}>
                          <dt style={{ fontFamily: FONT_MONO, fontSize: '0.64rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, color: P.accentInk, flexShrink: 0, width: '5rem', paddingTop: '0.1rem' }}>{label}</dt>
                          <dd style={{ margin: 0, fontFamily: FONT_SANS, fontSize: '0.875rem', lineHeight: 1.55, color: P.secondary }}>{ex[key]}</dd>
                        </div>
                      ))}
                    </dl>
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
    <SectionWrap id="evidence" alt>
      <div ref={scope}>
        <Eyebrow>QA Evidence</Eyebrow>
        <SectionHeading>From Observation to Improvement</SectionHeading>
        <Lead>Real examples from the project, walked through the way I actually work &mdash; observe, hypothesize, change, validate. No invented metrics; outcomes are described qualitatively.</Lead>

        <div className="qa-ev-navigator mt-9 grid grid-cols-[240px_1fr] gap-8">
          {/* LEFT — case navigation */}
          <div className="flex flex-col gap-2">
            {EXAMPLES.map((ex, i) => (
              <button
                key={i}
                className="qa-ev-nav-item"
                onClick={() => setActiveCase(i)}
                aria-pressed={activeCase === i}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.85rem 1rem', borderRadius: '6px',
                  background: activeCase === i ? P.accentSoft : P.surface,
                  border: '1px solid', borderColor: activeCase === i ? `${P.accent}40` : P.rule,
                  cursor: 'pointer', textAlign: 'left', transition: 'background .2s, border-color .2s',
                }}
              >
                <span style={{ fontFamily: FONT_MONO, fontSize: '0.66rem', fontWeight: 700, color: activeCase === i ? P.accent : P.muted }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ fontFamily: FONT_SANS, fontSize: '0.875rem', fontWeight: activeCase === i ? 600 : 500, color: activeCase === i ? P.ink : P.secondary }}>{ex.short}</span>
              </button>
            ))}
          </div>

          {/* RIGHT — case detail with progress line */}
          <div className="qa-ev-detail" style={{ position: 'relative' }}>
            {/* Vertical progress line */}
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: P.rule }} aria-hidden="true" />

            <div
              ref={contentRef}
              key={activeCase}
              className="qa-ev-content"
              style={{
                paddingLeft: '2rem',
                animation: 'qaEvFadeIn 0.35s ease-out',
              }}
            >
              <h3 style={{ fontFamily: FONT_SANS, fontWeight: 700, fontSize: '1.15rem', color: P.ink, margin: '0 0 1.25rem', lineHeight: 1.3 }}>{activeExample.title}</h3>

              <dl className="m-0 flex flex-col gap-0">
                {ROWS.map((row, i) => (
                  <div key={row.label} className={`qa-ev-row qa-ev-row-${i}`} style={{ display: 'flex', gap: '1rem', padding: '0.85rem 0', borderTop: i > 0 ? `1px solid ${P.rule}` : 'none', position: 'relative' }}>
                    {/* Marker */}
                    <span className="qa-ev-marker" style={{
                      position: 'absolute', left: '-2rem', top: '1.1rem',
                      width: 10, height: 10, borderRadius: '50%',
                      background: P.rule, border: `2px solid ${P.surface}`, flexShrink: 0, zIndex: 1,
                      transition: 'background .3s',
                    }} aria-hidden="true" />
                    <dt style={{ fontFamily: FONT_MONO, fontSize: '0.64rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, color: P.accentInk, flexShrink: 0, width: '5.5rem', paddingTop: '0.1rem' }}>
                      {row.label}
                    </dt>
                    <dd style={{ margin: 0, fontFamily: FONT_SANS, fontSize: '0.9rem', lineHeight: 1.6, color: P.secondary, flex: 1 }}>
                      {activeExample[row.key]}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes qaEvFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .qa-ev-content { animation: none !important; }
        }
      `}</style>
    </SectionWrap>
  );
}