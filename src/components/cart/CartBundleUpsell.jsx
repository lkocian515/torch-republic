import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { BUNDLE_PRICE_3, PRICES } from '@/lib/pricingConfig';

const RG = '#E6B7AD';

export default function CartBundleUpsell({ cartItems, subtotal }) {
  // Show if cart has fewer than 3 items OR subtotal is below bundle price
  const itemCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const shouldShow = itemCount < 3 || subtotal < BUNDLE_PRICE_3;

  if (!shouldShow) return null;

  // Calculate what 3 average products would cost vs bundle
  const avgPrice = Object.values(PRICES).reduce((a, b) => a + b, 0) / Object.keys(PRICES).length;
  const retailTotal = avgPrice * 3;
  const savings = (retailTotal - BUNDLE_PRICE_3).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="mb-4 p-4"
      style={{
        background: 'linear-gradient(135deg, rgba(230,183,173,0.06) 0%, rgba(214,178,122,0.04) 100%)',
        border: '1px solid rgba(230,183,173,0.18)',
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-3.5 h-3.5" style={{ color: RG }} />
        <p className="font-mono text-[9px] tracking-[0.2em] uppercase font-bold" style={{ color: RG }}>
          Create Your Ritual Bundle & Save
        </p>
      </div>
      <p className="font-serif text-sm mb-1" style={{ color: '#F5EFE6' }}>
        Any 3 products for <span className="font-bold" style={{ color: RG }}>${BUNDLE_PRICE_3.toFixed(2)}</span>
      </p>
      <p className="font-mono text-[8px] tracking-[0.1em] mb-3" style={{ color: 'rgba(245,239,230,0.5)' }}>
        Save up to ${savings} vs individual pricing
      </p>
      <Link
        to="/build-your-ritual"
        className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] uppercase font-bold py-2.5 px-5 transition-all hover:opacity-80"
        style={{ border: '1px solid rgba(230,183,173,0.3)', color: RG }}
      >
        Upgrade & Save <ArrowRight className="w-3 h-3" />
      </Link>
    </motion.div>
  );
}