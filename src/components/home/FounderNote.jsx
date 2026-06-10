import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const RG = '#E6B7AD';

const TRUST_DETAILS = [
  { label: 'U.S.-Based Small Business', sub: 'Corpus Christi, TX' },
  { label: 'Customer Support', sub: 'admin@torchrepublic.com' },
  { label: 'Secure Checkout', sub: '256-bit SSL · Shopify Payments' },
  { label: '30-Day Guarantee', sub: 'Not satisfied? We make it right.' },
];

export default function FounderNote() {
  return (
    <section className="px-6 md:px-10 py-20 relative" style={{ background: '#080808' }}>
      <div className="divider-gradient absolute top-0 left-0 right-0" />
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Section Label */}
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-10" style={{ color: RG }}>
            From the Founder
          </p>

          {/* Message */}
          <div className="mb-8">
            <p className="font-heading text-base leading-relaxed mb-5" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300, lineHeight: 1.9 }}>
              Torch Republic was created to make daily coffee feel more intentional, grounded, and supportive of the person you are becoming.
            </p>
            <p className="font-heading text-base leading-relaxed mb-5" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300, lineHeight: 1.9 }}>
              I wanted to build a brand that made everyday energy feel less rushed and more purposeful — a simple ritual you can return to each morning.
            </p>
            <p className="font-heading text-base leading-relaxed mb-5" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300, lineHeight: 1.9 }}>
              Torch Republic brings together premium instant coffee, mushroom coffee, and matcha so you can choose the blend that fits your day: clarity, focus, calm energy, or a steady morning reset.
            </p>
            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300, lineHeight: 1.9 }}>
              This is not about chasing trends. It is about creating a better daily ritual, one cup at a time.
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
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>
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
                <p className="font-heading text-[11px]" style={{ color: 'rgba(210,195,175,0.45)', fontWeight: 300, lineHeight: 1.6 }}>
                  {item.sub}
                </p>
              </div>
            ))}
          </div>

          {/* DBA statement */}
          <p className="font-mono text-[8px] tracking-[0.12em] mt-6" style={{ color: 'rgba(255,255,255,0.2)', lineHeight: 1.75 }}>
            Torch Republic Coffee Company is a DBA of LiberTees For All Apparel LLC. ·{' '}
            <Link to="/shipping-policy" style={{ color: 'rgba(230,183,173,0.4)', textDecoration: 'none' }}>Shipping</Link>{' '}
            ·{' '}
            <Link to="/return-policy" style={{ color: 'rgba(230,183,173,0.4)', textDecoration: 'none' }}>Returns</Link>
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
        </motion.div>
      </div>
    </section>
  );
}