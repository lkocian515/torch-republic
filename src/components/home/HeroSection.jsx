import React from 'react';
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
      {/* Hero Banner Image — LCP critical: eager, high priority, explicit aspect ratio to prevent CLS */}
      <div style={{ aspectRatio: '16/9', width: '100%', background: '#080808', overflow: 'hidden' }}>
        <img
          src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/fce811268_ChatGPTImageJun15202608_56_36AM.png"
          alt="Torch Republic — Torchbearer, The Monk Matcha, and SunCap Rise mushroom coffee canisters on a forest stump"
          width="1200"
          height="675"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          fetchPriority="high"
          loading="eager"
          decoding="sync"
        />
      </div>

      {/* Above-fold CTA section */}
      <section
        className="px-5 md:px-10 pt-8 pb-10 md:py-16 text-center"
        style={{ background: 'linear-gradient(180deg, #0A0807 0%, #080808 100%)' }}
      >
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.8)' }}>
          Torch Republic Coffee Company
        </p>
        <h1
          className="font-serif font-bold mb-3 mx-auto"
          style={{
            fontSize: 'clamp(1.75rem, 5vw, 3rem)',
            color: '#F5EFE6',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            maxWidth: '680px',
          }}
        >
          Premium Instant Coffee, Mushroom Coffee &amp; Matcha —{' '}
          <span style={{ color: RG }}>No Pods. No Machine.</span>
        </h1>
        <p
          className="font-heading mx-auto mb-7"
          style={{
            fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)',
            color: 'rgba(245,239,230,0.9)',
            fontWeight: 400,
            lineHeight: 1.75,
            maxWidth: '460px',
          }}
        >
          Smooth daily rituals made with instant blends for focus, energy, and calm.
        </p>

        {/* Primary + Secondary CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6">
          <Link
            to="/shop"
            className="font-mono text-[11px] tracking-[0.25em] uppercase font-bold transition-all hover:opacity-90 w-full sm:w-auto"
            style={{ background: RG, color: '#080808', padding: '15px 40px', display: 'inline-block', textAlign: 'center' }}
          >
            Shop All Blends →
          </Link>
          <Link
            to="/quiz"
            className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold transition-all hover:opacity-75 w-full sm:w-auto"
            style={{ border: '1px solid rgba(230,183,173,0.35)', color: RG, padding: '15px 32px', display: 'inline-block', textAlign: 'center' }}
          >
            Find Your Ritual
          </Link>
        </div>

        <p className="font-mono text-[11px] tracking-[0.15em] uppercase mb-10" style={{ color: 'rgba(230,183,173,0.75)' }}>
          Use <span style={{ color: RG, fontWeight: 700 }}>WELCOME15</span> for 15% off &nbsp;·&nbsp; Free shipping $75+ &nbsp;·&nbsp; 30-day guarantee
        </p>

        {/* Trust icon row */}
        <div className="flex flex-wrap justify-center gap-5 md:gap-10 pt-7"
          style={{ borderTop: '1px solid rgba(230,183,173,0.08)' }}
        >
          {TRUST_ICONS.map((item, i) => (
            <div key={i} className="text-center">
              <p className="font-mono text-[11px] tracking-[0.15em] uppercase font-semibold" style={{ color: RG }}>
                {item.label}
              </p>
              <p className="font-heading text-sm mt-0.5" style={{ color: 'rgba(210,195,175,0.8)', fontWeight: 400 }}>
                {item.sub}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}