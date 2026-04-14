import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TIERS = [
  {
    name: 'Ember',
    price: '$39/mo',
    description: 'One curated blend. The ritual begins.',
    items: ['1 Founders Series bag', 'Tasting notes card', 'Early access to new drops'],
  },
  {
    name: 'Beacon',
    price: '$69/mo',
    description: 'Two blends. The full experience.',
    items: ['2 curated blends', 'Tasting notes + brew guide', 'Priority access to limited editions', 'Members-only discount'],
    featured: true,
  },
  {
    name: 'Blaze',
    price: '$119/mo',
    description: 'The complete Torch Republic ritual.',
    items: ['4 blends + exclusive drops', 'Full tasting kit', 'First access to retirements', 'Torchbearer community access', 'Signed archive card'],
  },
];

export default function TorchBoxFeature() {
  return (
    <section
      className="py-28 px-6 md:px-12"
      style={{ backgroundColor: '#080808', borderTop: '1px solid rgba(196,163,90,0.07)' }}
    >
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-18"
          style={{ marginBottom: '5rem' }}
        >
          <p className="font-mono text-[10px] tracking-[0.55em] uppercase mb-5" style={{ color: 'rgba(201,162,74,0.5)' }}>
            Subscription
          </p>
          <h2 className="font-serif leading-none mb-5" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 700, color: '#F0EBE1', letterSpacing: '-0.02em' }}>
            The Torch Box
          </h2>
          <div className="h-px w-16 mx-auto mb-5" style={{ background: 'linear-gradient(90deg, transparent, #C9A24A60, transparent)' }} />
          <p className="font-heading" style={{ fontSize: '1.05rem', color: 'rgba(240,235,225,0.38)', fontWeight: 300, maxWidth: '440px', margin: '0 auto', lineHeight: 1.9 }}>
            A monthly ritual for those who carry the flame.<br />Not a subscription — a movement.
          </p>
        </motion.div>

        {/* Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex flex-col p-8 relative"
              style={{
                background: tier.featured ? 'rgba(201,162,74,0.05)' : '#0F0F0F',
                border: tier.featured ? '1px solid rgba(201,162,74,0.35)' : '1px solid rgba(196,163,90,0.1)',
              }}
            >
              {tier.featured && (
                <div className="absolute -top-px left-0 right-0 h-px" style={{ background: '#C9A24A' }} />
              )}
              {tier.featured && (
                <div className="absolute top-5 right-5">
                  <span className="font-mono text-[9px] tracking-[0.25em] uppercase px-2.5 py-1"
                    style={{ background: 'rgba(201,162,74,0.12)', color: '#C9A24A', border: '1px solid rgba(201,162,74,0.3)' }}>
                    Most Popular
                  </span>
                </div>
              )}

              <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: 'rgba(201,162,74,0.55)' }}>
                {tier.name}
              </p>
              <p className="font-serif mb-2" style={{ fontSize: '2rem', fontWeight: 700, color: '#F0EBE1' }}>
                {tier.price}
              </p>
              <p className="font-heading text-sm mb-7" style={{ color: 'rgba(240,235,225,0.38)', fontWeight: 300, lineHeight: 1.7 }}>
                {tier.description}
              </p>

              <div className="flex-1 space-y-3 mb-8">
                {tier.items.map((item, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <span style={{ color: '#C9A24A', flexShrink: 0, fontSize: '0.7rem', marginTop: '3px' }}>✦</span>
                    <span className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 300, lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/TheTorchBox"
                className="flex items-center justify-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase py-4 transition-all hover:opacity-80"
                style={tier.featured
                  ? { background: '#C9A24A', color: '#0B0B0B', fontWeight: 700 }
                  : { border: '1px solid rgba(201,162,74,0.25)', color: 'rgba(201,162,74,0.6)' }
                }
              >
                Choose {tier.name} →
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link
            to="/TheTorchBox"
            className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.35em] uppercase transition-all hover:opacity-80 btn-glow"
            style={{ background: '#C9A24A', color: '#0B0B0B', fontWeight: 700, padding: '18px 48px' }}
          >
            Join the Torchbearers →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}