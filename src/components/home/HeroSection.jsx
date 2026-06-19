import React from 'react';
import { Link } from 'react-router-dom';
import { trackHeroCTAClick, trackViewPromotion } from '@/lib/analytics';

const RG = '#E6B7AD';

// Compact trust bar items — shown immediately below hero
const TRUST_PILLS = [
  'No Pods',
  'No Machine',
  '25–27 Servings Per Tube',
  'Subscribe & Save 20%',
  'Free Shipping $75+',
  '30-Day Guarantee',
];

export default function HeroSection() {
  return (
    <div style={{ background: '#080808' }}>
      {/* Hero Banner Image — LCP critical: eager, high priority, explicit aspect ratio to prevent CLS */}
      <div style={{ aspectRatio: '1024/596', width: '100%', background: '#080808', overflow: 'hidden' }}>
        <img
          src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/c36248a54_ChatGPTImageJun19202605_44_33AM.png"
          alt="Torch Republic — Torchbearer, The Monk Matcha, and SunCap Rise canisters — Powered by Nature"
          width="1024"
          height="596"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          fetchPriority="high"
          loading="eager"
          decoding="sync"
        />
      </div>

      {/* Above-fold CTA section */}
      <section
        className="px-5 md:px-10 pt-8 pb-10 md:py-14 text-center"
        style={{ background: 'linear-gradient(180deg, #0A0807 0%, #080808 100%)' }}
      >
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase mb-3" style={{ color: RG }}>
          Torch Republic Coffee Company
        </p>

        {/* H1 — immediately tells Google and visitors exactly what's sold */}
        <h1
          className="font-serif font-bold mb-4 mx-auto"
          style={{
            fontSize: 'clamp(1.75rem, 5vw, 3rem)',
            color: '#F5EFE6',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            maxWidth: '700px',
          }}
        >
          Premium Instant Coffee,{' '}
          <span style={{ color: RG }}>Mushroom Coffee &amp; Matcha</span>
          <br />
          <span style={{ fontSize: '0.7em', fontWeight: 400, color: 'rgba(245,239,230,0.75)', letterSpacing: '0' }}>
            Just Add Hot Water. No Pods. No Machine.
          </span>
        </h1>

        <p
          className="font-heading mx-auto mb-8"
          style={{
            fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)',
            color: 'rgba(245,239,230,0.9)',
            fontWeight: 400,
            lineHeight: 1.75,
            maxWidth: '460px',
          }}
        >
          Single-serve instant blends for focus, calm energy, and smoother mornings — shipped in compact tubes, 25–27 servings each.
        </p>

        {/* Single strong primary CTA */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-5">
          <Link
            to="/shop"
            onClick={() => trackHeroCTAClick('Shop Coffee & Matcha')}
            className="font-mono text-[12px] tracking-[0.25em] uppercase font-bold transition-all hover:opacity-90 w-full sm:w-auto"
            style={{ background: RG, color: '#080808', padding: '16px 48px', display: 'inline-block', textAlign: 'center' }}
          >
            Shop Coffee &amp; Matcha →
          </Link>
          <Link
            to="/quiz"
            onClick={() => { trackHeroCTAClick('Find My Ritual'); }}
            className="font-mono text-[11px] tracking-[0.2em] uppercase font-bold transition-all hover:opacity-75 w-full sm:w-auto"
            style={{ border: '1px solid rgba(230,183,173,0.35)', color: RG, padding: '16px 32px', display: 'inline-block', textAlign: 'center' }}
          >
            Find My Ritual
          </Link>
        </div>

        <p className="font-mono text-[11px] tracking-[0.15em] uppercase mb-0" style={{ color: 'rgba(230,183,173,0.85)' }}>
          Use <span style={{ color: RG, fontWeight: 700 }}>WELCOME15</span> for 15% off your first order
        </p>
      </section>

      {/* ── Compact Trust Row — immediately below hero ── */}
      <div
        className="px-5 py-3"
        style={{
          background: '#0D0C0B',
          borderTop: '1px solid rgba(230,183,173,0.12)',
          borderBottom: '1px solid rgba(230,183,173,0.12)',
        }}
      >
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 max-w-[1280px] mx-auto">
          {TRUST_PILLS.map((pill, i) => (
            <React.Fragment key={i}>
              <span
                className="font-mono text-[11px] tracking-[0.1em] uppercase whitespace-nowrap"
                style={{ color: 'rgba(230,183,173,0.95)' }}
              >
                {pill}
              </span>
              {i < TRUST_PILLS.length - 1 && (
                <span style={{ color: 'rgba(230,183,173,0.3)', fontSize: '0.6rem' }}>·</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}