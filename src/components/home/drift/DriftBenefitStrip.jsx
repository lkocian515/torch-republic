import React from 'react';
import { D, MONO } from './driftTheme';
import { useDriftMotion } from './useDriftMotion';

const ITEMS = [
  'Single-Origin Coffee',
  'Ready in Seconds',
  'No Pods',
  'No Machine',
  'Made for Real Mornings',
];

function MarqueeSet() {
  return (
    <div className="flex items-center flex-shrink-0" aria-hidden="true">
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center">
          <span style={{ fontFamily: MONO, fontSize: '0.7rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600, color: D.ink, whiteSpace: 'nowrap', padding: '0 1.5rem' }}>
            {item}
          </span>
          <span style={{ color: D.terracotta, fontSize: '0.7rem' }}>&bull;</span>
        </span>
      ))}
    </div>
  );
}

export default function DriftBenefitStrip() {
  const scope = useDriftMotion((gsap) => {
    gsap.to('.marquee-track', {
      xPercent: -50,
      duration: 32,
      ease: 'none',
      repeat: -1,
    });
  });

  return (
    <section ref={scope} style={{ background: D.cream, overflow: 'hidden', borderTop: `1px solid ${D.rule}`, borderBottom: `1px solid ${D.rule}` }}>
      <div className="marquee-track flex items-center py-3.5" style={{ width: 'max-content' }}>
        <MarqueeSet />
        <MarqueeSet />
      </div>
    </section>
  );
}