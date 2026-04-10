import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const TIERS = [
  {
    name: 'INITIATE',
    price: '$39',
    period: '/mo',
    contents: ['1 bag + collector card'],
    perks: ['Welcome kit', 'Early access to new blends'],
    cta: 'START HERE →',
    featured: false,
    accent: 'rgba(196,163,90,0.5)',
  },
  {
    name: 'CARRIER',
    price: '$59',
    period: '/mo',
    tag: 'MOST POPULAR',
    contents: ['2 bags + collector card'],
    perks: ['10% off store', 'Bonus QR historical content', 'Priority shipping'],
    cta: 'JOIN NOW →',
    featured: true,
    accent: '#C4A35A',
  },
  {
    name: 'KEEPER',
    price: '$89',
    period: '/mo',
    contents: ['3 bags + full box set'],
    perks: ['Exclusive blends', 'Collector badge', 'Merch credit'],
    cta: 'GO ALL IN →',
    featured: false,
    accent: 'rgba(196,163,90,0.5)',
  },
];

export default function TorchBoxTiers() {
  return (
    <section className="py-28 px-6 md:px-10" style={{ backgroundColor: '#030303', borderTop: '1px solid rgba(196,163,90,0.08)' }}>
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px flex-1 max-w-20" style={{ background: 'linear-gradient(90deg, transparent, #C4A35A)' }} />
            <span className="font-mono text-[10px] tracking-[0.5em] uppercase" style={{ color: '#C4A35A' }}>Monthly Drops</span>
            <div className="h-px flex-1 max-w-20" style={{ background: 'linear-gradient(90deg, #C4A35A, transparent)' }} />
          </div>
          <h2 className="font-serif text-white mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700 }}>
            Become a Torchbearer.
          </h2>
          <p className="font-mono text-sm" style={{ color: 'rgba(196,163,90,0.6)' }}>
            History delivered. Monthly. No repeats. Ever.
          </p>
        </div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative flex flex-col"
              style={{
                background: tier.featured ? 'linear-gradient(160deg, #0E0A02 0%, #050505 100%)' : '#050505',
                border: tier.featured ? '1px solid rgba(196,163,90,0.5)' : '1px solid rgba(196,163,90,0.12)',
                boxShadow: tier.featured ? '0 0 40px rgba(196,163,90,0.12)' : 'none',
              }}
            >
              <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${tier.accent}, transparent)` }} />

              {tier.tag && (
                <div className="px-6 pt-5">
                  <span className="font-mono text-[9px] font-bold tracking-[0.4em] uppercase px-2.5 py-1"
                    style={{ color: '#C4A35A', border: '1px solid rgba(196,163,90,0.35)', background: 'rgba(196,163,90,0.1)' }}>
                    {tier.tag}
                  </span>
                </div>
              )}

              <div className="p-7 flex flex-col gap-5 flex-1">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: tier.accent }}>{tier.name}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-white" style={{ fontSize: '2.5rem', fontWeight: 700 }}>{tier.price}</span>
                    <span className="font-mono text-sm text-gray-500">{tier.period}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {tier.contents.map(c => (
                    <div key={c} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full shrink-0" style={{ background: tier.accent }} />
                      <span className="font-mono text-[10px] text-gray-400">{c}</span>
                    </div>
                  ))}
                  {tier.perks.map(p => (
                    <div key={p} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full shrink-0 opacity-50" style={{ background: tier.accent }} />
                      <span className="font-mono text-[10px] text-gray-600">{p}</span>
                    </div>
                  ))}
                </div>

                <Link to="/TheTorchBox" className="mt-auto py-3.5 text-center font-mono text-[10px] tracking-[0.3em] uppercase transition-all"
                  style={tier.featured
                    ? { background: 'linear-gradient(135deg, #0E2A2F 0%, #1B5060 50%, #C4A35A 100%)', color: '#fff' }
                    : { border: '1px solid rgba(196,163,90,0.35)', color: tier.accent }
                  }>
                  {tier.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center font-mono text-[10px] text-gray-700 tracking-wider uppercase">
          Every box tells a story. Every month, a new chapter.
        </p>
      </div>
    </section>
  );
}