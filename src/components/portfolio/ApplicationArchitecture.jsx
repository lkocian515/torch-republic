import React from 'react';
import { SectionWrap, Eyebrow, SectionHeading, Lead } from './PortfolioPrimitives';
import { P, FONT_MONO, FONT_SANS } from './portfolioTheme';
import { usePortfolioMotion } from './usePortfolioMotion';

const LAYERS = [
  { label: 'Customer Interface', note: 'Mobile and desktop browsing experience' },
  { label: 'Base44 / React Application', note: 'Custom storefront, cart state, content, analytics' },
  { label: 'Shopify Storefront API', note: 'Live product data, pricing, availability' },
  { label: 'Shopify Cart and Secure Checkout', note: 'Payment processing handled by Shopify' },
];

export default function ApplicationArchitecture() {
  const scope = usePortfolioMotion((gsap) => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: '.arch-diagram', start: 'top 78%' },
    });
    LAYERS.forEach((_, i) => {
      tl.fromTo(`.arch-node-${i}`, { opacity: 0.3 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, i * 0.15);
      if (i < LAYERS.length - 1) {
        tl.fromTo(`.arch-connector-${i}`, { scaleY: 0 }, { scaleY: 1, duration: 0.2, ease: 'power2.out' }, i * 0.15 + 0.15);
      }
    });
  });

  return (
    <SectionWrap id="architecture">
      <div ref={scope}>
        <Eyebrow>Application Architecture</Eyebrow>
        <SectionHeading>How the systems connect</SectionHeading>
        <Lead>
          The custom application controls the branded browsing and shopping experience. Shopify
          provides the underlying commerce services and secure checkout. The integration allows
          the two systems to operate as one customer journey.
        </Lead>

        <div className="arch-diagram mt-9 flex flex-col gap-0">
          {LAYERS.map((l, i) => (
            <div key={l.label}>
              <div
                className={`arch-node-${i}`}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
                  background: P.surface, border: `1px solid ${P.rule}`, borderRadius: '8px', padding: '0.85rem 1.1rem',
                }}
              >
                <div className="flex items-center gap-3" style={{ minWidth: 0 }}>
                  <span style={{ fontFamily: FONT_MONO, fontSize: '0.68rem', fontWeight: 700, color: P.muted, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <span style={{ fontFamily: FONT_SANS, fontWeight: 600, fontSize: '0.95rem', color: P.ink, display: 'block' }}>{l.label}</span>
                    <span style={{ fontFamily: FONT_SANS, fontSize: '0.8rem', color: P.secondary }}>{l.note}</span>
                  </div>
                </div>
              </div>
              {i < LAYERS.length - 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', height: 24, alignItems: 'center' }} aria-hidden="true">
                  <div className={`arch-connector-${i}`} style={{ width: 2, height: '100%', background: P.accent, transformOrigin: 'top center', opacity: 0.5 }} />
                </div>
              )}
            </div>
          ))}
        </div>

        <p style={{ marginTop: '1.5rem', fontFamily: FONT_SANS, fontSize: '0.9rem', lineHeight: 1.65, color: P.secondary, maxWidth: '65ch' }}>
          The custom application does not collect or store payment-card information. Shopify
          processes all payments through its secure checkout infrastructure.
        </p>
      </div>
    </SectionWrap>
  );
}