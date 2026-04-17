import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ShoppingCart, Star } from 'lucide-react';

const BUNDLES = [
  {
    id: 'starter',
    tag: 'Start Here',
    name: 'Start Your Daily Ritual',
    desc: 'Two iconic Founders blends — the perfect entry point.',
    blends: ['Washington Blend', 'Franklin Blend'],
    handles: ['washington-blend', 'franklin-blend'],
    retailPrice: 37.98,
    bundlePrice: 34.99,
    badge: null,
  },
  {
    id: 'trio',
    tag: 'Most Popular',
    name: 'Build Your Founders Collection',
    desc: 'Three small-batch roasts. One legendary set.',
    blends: ['Washington Blend', 'Jefferson Blend', 'Lincoln Blend'],
    handles: ['washington-blend', 'jefferson-blend', 'lincoln-blend'],
    retailPrice: 56.97,
    bundlePrice: 49.99,
    badge: 'Best Value',
  },
  {
    id: 'full',
    tag: 'Complete Set',
    name: 'Collect All 6 Founders',
    desc: 'Every blend. Every legacy. The full Founders Series.',
    blends: ['Washington', 'Franklin', 'Jefferson', 'Lincoln', 'Roosevelt', 'Adams'],
    handles: ['washington-blend', 'franklin-blend', 'jefferson-blend', 'lincoln-blend', 'roosevelt-blend', 'adams-blend'],
    retailPrice: 113.94,
    bundlePrice: 94.99,
    badge: 'Best Value',
  },
];

const SHOPIFY_COLLECTION_URL = 'https://torch-republic.com/collections/founders-series';

export default function BundleSection({ accent = '#C9A24A' }) {
  const [selected, setSelected] = useState('trio');
  const bundle = BUNDLES.find(b => b.id === selected);
  const savings = (bundle.retailPrice - bundle.bundlePrice).toFixed(2);
  const savingsPct = Math.round(((bundle.retailPrice - bundle.bundlePrice) / bundle.retailPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className="mt-10"
      style={{ border: `1px solid ${accent}20`, background: '#0A0A0A' }}
    >
      {/* Header */}
      <div className="px-6 pt-6 pb-4" style={{ borderBottom: `1px solid ${accent}10` }}>
        <div className="flex items-center gap-2 mb-1">
          <Star className="w-3 h-3 fill-current" style={{ color: accent }} />
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase" style={{ color: accent }}>
            Save when you bundle
          </p>
        </div>
        <h3 className="font-serif font-bold text-white" style={{ fontSize: '1.1rem' }}>Bundle &amp; Save</h3>
      </div>

      {/* Bundle selector tabs */}
      <div className="grid grid-cols-3 gap-0" style={{ borderBottom: `1px solid ${accent}10` }}>
        {BUNDLES.map(b => (
          <button
            key={b.id}
            onClick={() => setSelected(b.id)}
            className="flex flex-col items-center gap-1 py-3 px-2 transition-all text-center"
            style={{
              background: selected === b.id ? `${accent}0D` : 'transparent',
              borderBottom: selected === b.id ? `2px solid ${accent}` : '2px solid transparent',
            }}
          >
            <span className="font-mono text-[8px] tracking-widest uppercase" style={{ color: selected === b.id ? accent : 'rgba(255,255,255,0.3)' }}>
              {b.tag}
            </span>
            <span className="font-mono text-[9px] font-bold" style={{ color: selected === b.id ? '#fff' : 'rgba(255,255,255,0.4)' }}>
              {b.blends.length} blends
            </span>
          </button>
        ))}
      </div>

      {/* Selected bundle detail */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            {bundle.badge && (
              <span className="font-mono text-[8px] tracking-[0.35em] uppercase px-2 py-0.5 mb-2 inline-block"
                style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}30` }}>
                ★ {bundle.badge}
              </span>
            )}
            <p className="font-serif font-bold text-white" style={{ fontSize: '1rem' }}>{bundle.name}</p>
            <p className="font-mono text-[10px] mt-1" style={{ color: 'rgba(255,255,255,0.38)', lineHeight: 1.6 }}>{bundle.desc}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-mono font-black" style={{ fontSize: '1.4rem', color: accent }}>${bundle.bundlePrice}</p>
            <p className="font-mono text-[10px] line-through" style={{ color: 'rgba(255,255,255,0.25)' }}>${bundle.retailPrice.toFixed(2)}</p>
            <p className="font-mono text-[9px] font-bold" style={{ color: accent }}>Save {savingsPct}%</p>
          </div>
        </div>

        {/* Blend list */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {bundle.blends.map(blend => (
            <span key={blend} className="flex items-center gap-1 font-mono text-[9px] px-2.5 py-1"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(240,235,225,0.55)' }}>
              <Check className="w-2.5 h-2.5 flex-shrink-0" style={{ color: accent }} />
              {blend}
            </span>
          ))}
        </div>

        <a
          href={SHOPIFY_COLLECTION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 w-full font-mono text-[10px] tracking-[0.3em] uppercase transition-opacity hover:opacity-80"
          style={{ background: accent, color: '#0A0A0A', fontWeight: 900, padding: '13px 24px' }}
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          Shop This Bundle — Save ${savings}
        </a>
      </div>
    </motion.div>
  );
}