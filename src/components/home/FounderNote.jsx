import React from 'react';
import { Link } from 'react-router-dom';

const RG = '#E6B7AD';

const TRUST_DETAILS = [
  { label: 'U.S.-Based Small Business', sub: 'Corpus Christi, TX' },
  { label: 'Customer Support', sub: 'support@torchrepublic.com' },
  { label: 'Secure Checkout', sub: '256-bit SSL · Shopify Payments' },
  { label: '30-Day Guarantee', sub: 'Not satisfied? We make it right.' },
];

export default function FounderNote() {
  return (
    <section className="px-6 md:px-10 py-20 relative" style={{ background: '#080808' }}>
      <div className="divider-gradient absolute top-0 left-0 right-0" />
      <div className="max-w-3xl mx-auto">
        <div>
          {/* Section Label */}
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-10" style={{ color: RG }}>
            From the Founder
          </p>

          {/* Message */}
          <div className="mb-8">
            <p className="font-heading text-base leading-relaxed mb-5" style={{ color: 'rgba(240,235,225,0.92)', fontWeight: 400, lineHeight: 1.9 }}>
              I created Torch Republic because I wanted coffee to feel better — simpler, cleaner, and more intentional.
            </p>
            <p className="font-heading text-base leading-relaxed mb-5" style={{ color: 'rgba(240,235,225,0.92)', fontWeight: 400, lineHeight: 1.9 }}>
              I used to love the convenience of pod coffee, but the more I learned, the more I wanted another option. Torch Republic was born from that search: instant coffee, mushroom coffee, and matcha made for people who want their daily cup to support the life they are building.
            </p>
            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.92)', fontWeight: 400, lineHeight: 1.9 }}>
              This is not about chasing trends. It is about creating a better daily ritual — one intentional cup at a time.
            </p>
          </div>

          {/* Signature */}
          <div className="pt-8" style={{ borderTop: `1px solid ${RG}20` }}>
            <p
              style={{
                fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
                fontSize: '1.1rem',
                color: RG,
                opacity: 0.75,
                letterSpacing: '0.01em',
                fontWeight: 600,
                lineHeight: 1.2,
                transform: 'rotate(-1.5deg)',
                display: 'inline-block',
                marginBottom: '4px',
              }}
            >
              Lisa Marie Kocian
            </p>
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: 'rgba(230,183,173,0.85)' }}>
              Founder, Torch Republic Coffee Company
            </p>
          </div>

          {/* Trust details grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8" style={{ borderTop: `1px solid rgba(230,183,173,0.08)` }}>
            {TRUST_DETAILS.map((item, i) => (
              <div key={i}>
                <p className="font-mono text-[9px] tracking-[0.2em] uppercase font-semibold mb-1" style={{ color: RG }}>
                  {item.label}
                </p>
                <p className="font-heading text-xs" style={{ color: 'rgba(210,195,175,0.95)', fontWeight: 400, lineHeight: 1.6 }}>
                  {item.sub}
                </p>
              </div>
            ))}
          </div>

          {/* DBA statement */}
          <p className="font-mono text-[10px] tracking-[0.08em] mt-6" style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.75 }}>
            Torch Republic Coffee Company is a DBA of LiberTees For All Apparel LLC.
          </p>

          {/* CTA */}
          <div className="mt-8">
            <Link
              to="/mission"
              className="inline-block font-mono text-[9px] tracking-[0.3em] uppercase transition-all hover:opacity-70"
              style={{ color: RG, borderBottom: `1px solid ${RG}` }}
            >
              Read Our Story →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}