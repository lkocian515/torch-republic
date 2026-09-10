import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { D, SERIF, SANS, MONO, fadeUp } from './driftTheme';
import { CORE_PRODUCTS, getProductByRitual } from '@/lib/coreProducts';
import { formatPrice } from '@/lib/pricingConfig';
import { useCart } from '@/contexts/CartContext';

const TABS = [
  { key: 'classic', label: 'Classic' },
  { key: 'mushroom', label: 'Mushroom' },
];

export default function DriftProductDiscovery() {
  const [activeKey, setActiveKey] = useState('classic');
  const { addItem, isAdding } = useCart();
  const product = getProductByRitual(activeKey);
  const ritual = product.ritual;

  return (
    <section style={{ background: D.paper }}>
      <div className="mx-auto max-w-[1100px] px-6 py-16 md:py-20">
        <motion.div {...fadeUp} className="text-center mb-10">
          <p style={{ fontFamily: MONO, fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 600, color: D.terracotta, margin: '0 0 1rem' }}>
            Find Your Morning
          </p>
          <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, color: D.ink, margin: 0, textWrap: 'balance' }}>
            Two ways to make morning easier.
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-1 mb-12">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveKey(tab.key)}
              style={{
                fontFamily: SANS,
                fontWeight: 600,
                fontSize: '0.8125rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '0.6rem 1.75rem',
                borderRadius: '6px',
                border: `1px solid ${activeKey === tab.key ? D.espresso : D.rule}`,
                background: activeKey === tab.key ? D.espresso : 'transparent',
                color: activeKey === tab.key ? D.cream : D.ink,
                cursor: 'pointer',
                transition: 'all .2s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeKey}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid md:grid-cols-[1fr_1fr] gap-8 md:gap-12 items-center"
          >
            {/* Image */}
            <div
              className="flex items-center justify-center rounded-lg overflow-hidden"
              style={{ background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${ritual.soft}40 0%, ${D.cream} 70%)`, minHeight: '340px', padding: '2rem' }}
            >
              <img src={product.image} alt={product.alt} style={{ mixBlendMode: 'multiply', objectFit: 'contain' }} className="w-[75%] max-w-[320px]" />
            </div>
            {/* Info */}
            <div>
              <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: D.ink, margin: '0 0 0.5rem' }}>
                {product.name}
              </h3>
              <p style={{ fontFamily: SANS, fontWeight: 600, fontSize: '0.9375rem', color: D.terracotta, margin: '0 0 1.25rem', letterSpacing: '0.01em' }}>
                {product.flavorLabel}
              </p>
              <p style={{ fontFamily: SANS, fontSize: '1rem', lineHeight: 1.7, color: D.secondary, margin: '0 0 1.5rem', maxWidth: '44ch' }}>
                {product.description}
              </p>
              {/* Feature tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {product.flavorNotes.map((tag) => (
                  <span key={tag} style={{ fontFamily: MONO, fontSize: '0.625rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, padding: '0.3rem 0.65rem', borderRadius: '4px', background: D.surface, color: D.ink, border: `1px solid ${D.rule}` }}>
                    {tag}
                  </span>
                ))}
              </div>
              {/* Price + servings */}
              <div className="flex items-baseline gap-3 mb-1">
                <span style={{ fontFamily: SERIF, fontWeight: 700, fontSize: '1.75rem', color: D.ink }}>{formatPrice(product.price)}</span>
                <span style={{ fontFamily: SANS, fontSize: '0.875rem', color: D.secondary }}>{product.servings} servings</span>
              </div>
              <p style={{ fontFamily: SANS, fontSize: '0.8125rem', color: D.secondary, margin: '0 0 1.5rem' }}>
                Subscription available &middot; Save 10%
              </p>
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <button
                  onClick={() => addItem(product)}
                  disabled={isAdding}
                  className="inline-flex items-center justify-center gap-2 transition-opacity"
                  style={{ minHeight: 48, padding: '0 1.75rem', borderRadius: '6px', background: D.espresso, color: D.cream, fontFamily: SANS, fontWeight: 600, fontSize: '0.875rem', border: 'none', cursor: isAdding ? 'not-allowed' : 'pointer', opacity: isAdding ? 0.6 : 1 }}
                >
                  Add to Cart
                </button>
                <Link
                  to={product.path}
                  style={{ fontFamily: SANS, fontWeight: 600, fontSize: '0.875rem', color: D.espresso, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  View Details <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}