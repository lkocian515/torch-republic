import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flame } from 'lucide-react';
import { CORE_PRODUCTS } from '@/lib/coreProducts';

// Cross-sell now reflects the three core 3oz black-bag products only.
const CROSS_SELL_BLENDS = CORE_PRODUCTS.map((p) => ({
  name: p.name,
  roast: p.blendName,
  price: p.price,
  route: p.path,
  shopifyHandle: p.shopifyHandle,
  image: p.image,
  tag: p.categoryLabel,
}));

const GOLD = '#C9A24A';

export default function CartCrossSell({ existingHandles = [] }) {
  const suggestions = CROSS_SELL_BLENDS.filter(
    (b) => !existingHandles.includes(b.shopifyHandle)
  ).slice(0, 2);
  if (suggestions.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="mt-2"
      style={{ background: 'rgba(201,162,74,0.03)', border: '1px solid rgba(201,162,74,0.12)' }}
    >
      <div className="flex items-center gap-2 px-5 pt-5 pb-3">
        <Flame className="w-3.5 h-3.5 flex-shrink-0" style={{ color: `${GOLD}60` }} />
        <p className="font-mono text-[9px] tracking-[0.4em] uppercase" style={{ color: `${GOLD}70` }}>
          Complete Your Ritual
        </p>
      </div>
      <p className="font-mono text-[10px] px-5 pb-4" style={{ color: 'rgba(255,255,255,0.28)' }}>
        Add another blend and build your ritual
      </p>
      <div className="flex flex-col gap-0" style={{ borderTop: '1px solid rgba(201,162,74,0.07)' }}>
        {suggestions.map((blend, i) => (
          <Link
            key={blend.shopifyHandle}
            to={blend.route}
            className="flex items-center gap-4 px-5 py-4 transition-all hover:bg-white/[0.02]"
            style={{ borderBottom: i < suggestions.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', textDecoration: 'none' }}
          >
            <div className="flex-shrink-0 overflow-hidden flex items-center justify-center" style={{ width: 56, height: 64, background: '#FFFFFF' }}>
              <img src={blend.image} alt={blend.name} className="w-full h-full object-contain p-1" style={{ opacity: 0.95 }} />
            </div>
            <div className="flex-1 min-w-0">
              {blend.tag && (
                <span className="font-mono text-[8px] tracking-[0.3em] uppercase mb-1 inline-block" style={{ color: GOLD }}>
                  ★ {blend.tag}
                </span>
              )}
              <p className="font-serif font-bold text-white" style={{ fontSize: '0.9rem' }}>{blend.name}</p>
              <p className="font-mono text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{blend.roast} · 3oz bag</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="font-mono font-bold text-sm" style={{ color: GOLD }}>${blend.price.toFixed(2)}</p>
              <p className="font-mono text-[9px] mt-0.5" style={{ color: 'rgba(255,255,255,0.25)' }}>+ Add →</p>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}