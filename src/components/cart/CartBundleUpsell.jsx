import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { BUNDLE_PRICE_3, PRICES } from '@/lib/pricingConfig';

const ACCENT = '#B86543';
const INK = '#2D2824';
const MUTED = '#6A5A4A';
const BORDER = '#E4D8C9';

export default function CartBundleUpsell({ cartItems, subtotal }) {
  // Show if cart has fewer than 3 items OR subtotal is below bundle price
  const itemCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const shouldShow = itemCount < 3 || subtotal < BUNDLE_PRICE_3;

  if (!shouldShow) return null;

  // Calculate what 3 average products would cost vs bundle
  const prices = Object.values(PRICES);
  const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
  const retailTotal = avgPrice * 3;
  const savings = (retailTotal - BUNDLE_PRICE_3).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="mb-4 p-4"
      style={{
        background: 'linear-gradient(135deg, rgba(184,101,67,0.06) 0%, rgba(214,178,122,0.05) 100%)',
        border: `1px solid ${BORDER}`,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-3.5 h-3.5" style={{ color: ACCENT }} />
        <p className="font-mono text-[9px] tracking-[0.2em] uppercase font-bold" style={{ color: ACCENT }}>
          Create Your Ritual Bundle & Save
        </p>
      </div>
      <p className="font-serif text-sm mb-1" style={{ color: INK }}>
        Any 3 products for <span className="font-bold" style={{ color: ACCENT }}>${BUNDLE_PRICE_3.toFixed(2)}</span>
      </p>
      <p className="font-mono text-[8px] tracking-[0.1em] mb-3" style={{ color: MUTED }}>
        Save up to ${savings} vs individual pricing
      </p>
      <Link
        to="/build-your-ritual"
        className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] uppercase font-bold py-2.5 px-5 transition-all hover:opacity-80"
        style={{ border: `1px solid ${BORDER}`, color: ACCENT }}
      >
        Upgrade & Save <ArrowRight className="w-3 h-3" />
      </Link>
    </motion.div>
  );
}