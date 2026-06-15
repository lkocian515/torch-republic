import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RG = '#E6B7AD';

const TRUST_ICONS = [
  { label: 'Instant Rituals', sub: 'Coffee + Mushroom Coffee + Matcha' },
  { label: '25–27 Servings', sub: 'Per Tube' },
  { label: 'No Machine Needed', sub: 'Just Add Hot Water' },
  { label: '30-Day Guarantee', sub: 'If Not Right, We Make It Right' },
];

export default function HeroSection() {
  return (
    <div style={{ background: '#080808' }}>
      {/* Hero Banner Image — optimized for LCP (under 250KB, WebP, preloaded) */}
      <div className="flex justify-center w-full md:max-w-[75vw] mx-auto">
        <img
           src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/cc8b4d715_ChatGPTImageJun14202606_04_21AM.png"
           alt="Torch Republic Coffee Company — Powered by Nature. Premium instant coffee, mushroom coffee & matcha for clarity, focus & calm energy. Torchbearer, The Monk, SunCap Rise."
          style={{ width: '100%', height: 'auto', display: 'block' }}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          onError={(e) => {
            e.target.src = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/9e6cba4d4_ChatGPTImageJun10202607_49_52AM.png';
          }}
        />
      </div>

      {/* Headline + CTAs below image — no animations for better LCP */}
      <section
        className="px-6 md:px-10 py-12 md:py-16 text-center"
        style={{ background: 'linear-gradient(180deg, #0A0807 0%, #080808 100%)' }}
      >
        <div>
          <p className="font-mono text-[11px] tracking-[0.35em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.45)' }}>
            Torch Republic Coffee Company
          </p>
          <h1
            className="font-serif font-bold mb-4 mx-auto"
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
              color: '#F5EFE6',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              maxWidth: '720px',
            }}
          >
            Instant &amp; Mushroom Coffee<br />
            <span style={{ color: RG }}>for Intentional Mornings.</span>
          </h1>
          <p
            className="font-heading mx-auto mb-8"
            style={{
              fontSize: 'clamp(1.05rem, 1.7vw, 1.15rem)',
              color: 'rgba(245,239,230,0.75)',
              fontWeight: 400,
              lineHeight: 1.85,
              maxWidth: '500px',
            }}
          >
            Focus, calm energy, and daily ritual — in 30 seconds. No machine, no pods. Just add hot water.
          </p>
        </div>

        {/* Primary + Secondary CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-5">
          <Link
            to="/shop"
            className="font-mono text-[11px] tracking-[0.25em] uppercase font-bold transition-all hover:opacity-90"
            style={{ background: RG, color: '#080808', padding: '16px 44px', display: 'inline-block', minWidth: '200px', textAlign: 'center' }}
          >
            Shop Coffee →
          </Link>
          <Link
            to="/quiz"
            className="font-mono text-[11px] tracking-[0.25em] uppercase font-bold transition-all hover:opacity-75"
            style={{ border: '1px solid rgba(230,183,173,0.4)', color: RG, padding: '16px 32px', display: 'inline-block', minWidth: '200px', textAlign: 'center' }}
          >
            Take the Ritual Quiz
          </Link>
        </div>

        {/* Reassurance + discount nudge */}
        <div className="mb-10 space-y-2">
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase" style={{ color: 'rgba(230,183,173,0.75)' }}>
            First order? Use <span style={{ color: RG, fontWeight: 700 }}>WELCOME15</span> for 15% off
          </p>
          <p className="font-mono text-[9px] tracking-[0.18em] uppercase" style={{ color: 'rgba(230,183,173,0.4)' }}>
            Free shipping $75+ &nbsp;·&nbsp; 30-day guarantee &nbsp;·&nbsp; Secure checkout
          </p>
        </div>

        {/* Trust icon row */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 pt-8"
          style={{ borderTop: '1px solid rgba(230,183,173,0.08)' }}
        >
          {TRUST_ICONS.map((item, i) => (
            <div key={i} className="text-center">
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase font-semibold" style={{ color: RG }}>
                {item.label}
              </p>
              <p className="font-heading text-xs mt-0.5" style={{ color: 'rgba(210,195,175,0.5)', fontWeight: 400 }}>
                {item.sub}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}