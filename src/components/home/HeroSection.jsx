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
      <div className="flex justify-center max-w-[85vw] md:max-w-[70vw] mx-auto">
        <img
           src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/c012b6467_NKLMKPMPL.png"
           alt="Torch Republic Coffee Company — Torchbearer premium instant coffee, GlowMind Clarity mushroom coffee, and The Monk ceremonial matcha. Fuel your ritual, elevate your life."
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
            Better Mornings in 30 Seconds.<br />
            <span style={{ color: RG }}>No Machine Required.</span>
          </h1>
          <p
            className="font-heading mx-auto mb-6"
            style={{
              fontSize: 'clamp(1.05rem, 1.7vw, 1.15rem)',
              color: 'rgba(245,239,230,0.85)',
              fontWeight: 400,
              lineHeight: 1.85,
              maxWidth: '540px',
            }}
          >
            Instant coffee, functional mushroom coffee with Lion's Mane &amp; Chaga, and ceremonial matcha — just add hot water.
          </p>
          {/* Subscribe nudge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8"
            style={{ background: 'rgba(230,183,173,0.08)', border: '1px solid rgba(230,183,173,0.2)', borderRadius: '2px' }}>
            <span className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: RG }}>Subscribe &amp; Save 20%</span>
            <span className="font-mono text-[8px]" style={{ color: 'rgba(230,183,173,0.5)' }}>· Cancel anytime</span>
          </div>
        </div>

        {/* Primary + Secondary CTAs — no animations for better LCP */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
          <Link
            to="/quiz"
            className="font-mono text-[11px] tracking-[0.25em] uppercase font-bold transition-all hover:opacity-90"
            style={{ background: RG, color: '#080808', padding: '16px 44px', display: 'inline-block', minWidth: '240px', textAlign: 'center' }}
          >
            Find Your Blend →
          </Link>
          <Link
            to="/subscription"
            className="font-mono text-[11px] tracking-[0.25em] uppercase font-bold transition-all hover:opacity-75"
            style={{ border: '1px solid rgba(230,183,173,0.4)', color: RG, padding: '16px 32px', display: 'inline-block', minWidth: '220px', textAlign: 'center' }}
          >
            Subscribe &amp; Save 20%
          </Link>
        </div>

        {/* Reassurance line */}
        <div className="mb-6">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.6)' }}>
            U.S.-based small business &nbsp;·&nbsp; Secure checkout &nbsp;·&nbsp; Instant preparation
          </p>
        </div>

        {/* Discount nudge */}
        <div className="mb-6">
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase" style={{ color: 'rgba(230,183,173,0.75)' }}>
            First order? Use <span style={{ color: RG, fontWeight: 700 }}>WELCOME15</span> for 15% off
          </p>
        </div>

        {/* Quiz CTA Button */}
        <div className="mb-10">
          <p className="font-heading text-sm mb-3" style={{ color: 'rgba(245,239,230,0.75)', fontWeight: 400 }}>
            Not sure where to start?
          </p>
          <Link
            to="/quiz"
            className="inline-block font-mono text-[10px] tracking-[0.2em] uppercase font-bold transition-all hover:opacity-90"
            style={{
              background: 'rgba(230,183,173,0.15)',
              color: RG,
              border: `1px solid ${RG}40`,
              padding: '12px 28px',
              textDecoration: 'none',
              borderRadius: '2px',
            }}
          >
            ✨ Take the Blend Quiz
          </Link>
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