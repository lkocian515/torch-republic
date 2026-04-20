import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Flame, Zap, Shield, Package } from 'lucide-react';

const TIERS = [
  {
    name: 'Patriot',
    price: '$29',
    color: '#C87050',
    savings: 'Save ~$8/mo',
    items: ['1 Founders Series Blend', 'Monthly Collectible Insert', 'Member Badge'],
    handle: 'torch-box-ember',
    featured: false,
  },
  {
    name: 'Founder',
    price: '$54',
    color: '#C9A24A',
    savings: 'Save ~$22/mo',
    items: ['2 Founders Series Blends', 'Exclusive Collectible + Insert', 'Exclusive Coffee Access', 'Early Access'],
    handle: 'torch-box-beacon',
    featured: true,
  },
  {
    name: 'Legacy',
    price: '$89',
    color: '#E8D08A',
    savings: 'Save ~$40/mo + Free Ship',
    items: ['Full 3-Blend Rotation', 'Premium Collectible Object', 'Exclusive Torch Bonus', 'Inner Circle Access'],
    handle: 'torch-box-blaze',
    featured: false,
  },
];

export default function TorchBoxSection() {
  return (
    <section className="py-20 md:py-28 px-5 md:px-12" style={{ backgroundColor: '#080808', borderTop: '1px solid rgba(201,162,74,0.1)' }}>
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-5">
            <div style={{ width: 36, height: 1, background: '#C9A24A' }} />
            <p className="font-mono text-[10px] tracking-[0.55em] uppercase" style={{ color: '#C9A24A' }}>Monthly Subscription</p>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-serif leading-none mb-3" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em' }}>
                Start Your Collection
              </h2>
              <p className="font-heading" style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.65)', fontWeight: 400, lineHeight: 1.8, maxWidth: 460 }}>
                Monthly delivery. Exclusive blends. Historic stories. Save up to $42/mo versus buying individually.
              </p>
            </div>
            <Link
              to="/TheTorchBox"
              className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.35em] uppercase transition-all hover:opacity-80 btn-glow flex-shrink-0"
              style={{ background: '#C9A24A', color: '#080808', fontWeight: 800, padding: '15px 36px' }}
            >
              Join the Torch Box →
            </Link>
          </div>
        </motion.div>

        {/* Gold rule */}
        <div className="mb-10" style={{ height: '1px', background: 'linear-gradient(90deg, #C9A24A 0%, rgba(201,162,74,0.12) 55%, transparent 100%)' }} />

        {/* Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative flex flex-col"
              style={{
                background: tier.featured ? 'linear-gradient(160deg, #0F0D02 0%, #0A0A0A 100%)' : '#0C0C0C',
                border: tier.featured ? `1px solid ${tier.color}55` : '1px solid rgba(201,162,74,0.1)',
                boxShadow: tier.featured ? `0 0 40px ${tier.color}10` : 'none',
              }}
            >
              <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${tier.color}90, transparent)` }} />

              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="font-mono text-[9px] font-black tracking-[0.35em] uppercase px-4 py-1" style={{ background: tier.color, color: '#0B0B0B' }}>
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-6 flex flex-col gap-5 flex-1">
                <div>
                  <h3 className="font-serif mb-0.5" style={{ fontSize: '1.6rem', color: '#F0EBE1', fontWeight: 700 }}>{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="font-mono font-black text-2xl" style={{ color: tier.color }}>{tier.price}</span>
                    <span className="font-mono text-xs" style={{ color: 'rgba(240,235,225,0.3)' }}>/mo</span>
                  </div>
                  <p className="font-mono text-[9px] tracking-wide mt-1" style={{ color: 'rgba(201,162,74,0.55)' }}>{tier.savings}</p>
                </div>

                <div className="h-px" style={{ background: 'rgba(201,162,74,0.07)' }} />

                <div className="flex flex-col gap-2 flex-1">
                  {tier.items.map(item => (
                    <div key={item} className="flex items-start gap-2.5">
                      <Check className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: tier.color }} />
                      <span style={{ color: 'rgba(240,235,225,0.55)', fontSize: '0.82rem', lineHeight: 1.65, fontWeight: 300 }}>{item}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={`https://torch-republic.com/products/${tier.handle}`}
                  className="py-3.5 text-center font-mono font-black text-[10px] tracking-[0.2em] uppercase transition-all hover:opacity-90"
                  style={tier.featured
                    ? { background: tier.color, color: '#0B0B0B' }
                    : { border: `1px solid ${tier.color}40`, color: tier.color }
                  }
                >
                  Join the Torch Box →
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6"
          style={{ borderTop: '1px solid rgba(201,162,74,0.08)' }}>
          <p className="font-mono text-[9px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
            Cancel or pause anytime · No contracts
          </p>
          <Link
            to="/TheTorchBox"
            className="font-mono text-[9px] tracking-[0.3em] uppercase transition-opacity hover:opacity-60 pb-px"
            style={{ color: 'rgba(201,162,74,0.55)', borderBottom: '1px solid rgba(201,162,74,0.2)' }}
          >
            See all subscription details →
          </Link>
        </div>
      </div>
    </section>
  );
}