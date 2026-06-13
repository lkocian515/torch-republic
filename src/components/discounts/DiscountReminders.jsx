import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Gift, Truck, Percent } from 'lucide-react';

const RG = '#E6B7AD';

const DISCOUNTS = [
  {
    id: 'welcome',
    icon: Percent,
    title: 'First Order Discount',
    code: 'WELCOME15',
    description: '15% off your first one-time order',
    color: '#E6B7AD',
    bgColor: 'rgba(230,183,173,0.08)',
    borderColor: 'rgba(230,183,173,0.3)',
  },
  {
    id: 'subscribe',
    icon: Gift,
    title: 'Subscribe & Save',
    code: null,
    description: '20% off every recurring subscription order',
    color: '#6EBD8E',
    bgColor: 'rgba(110,189,142,0.08)',
    borderColor: 'rgba(110,189,142,0.3)',
  },
  {
    id: 'shipping',
    icon: Truck,
    title: 'Free Shipping',
    code: null,
    description: 'On orders over $75',
    threshold: 75,
    color: '#D6B27A',
    bgColor: 'rgba(214,178,122,0.08)',
    borderColor: 'rgba(214,178,122,0.3)',
  },
];

export default function DiscountReminders({ cartSubtotal = 0, showAll = false, compact = false }) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate through discounts every 5 seconds
  useEffect(() => {
    if (showAll) return; // Don't rotate if showing all
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % DISCOUNTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [showAll]);

  // Calculate if free shipping is achieved
  const freeShippingProgress = Math.min((cartSubtotal / 75) * 100, 100);
  const freeShippingUnlocked = cartSubtotal >= 75;

  if (compact) {
    // Compact rotating banner version
    const discount = DISCOUNTS[activeIndex];
    return (
      <div
        className="w-full py-2 px-4"
        style={{
          background: discount.bgColor,
          border: `1px solid ${discount.borderColor}`,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center gap-2"
          >
            <discount.icon className="w-3 h-3" style={{ color: discount.color }} />
            <span className="font-mono text-[8px] tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {discount.description}
              {discount.code && (
                <>
                  {' '}— Code <span style={{ color: discount.color, fontWeight: 700 }}>{discount.code}</span>
                </>
              )}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  if (showAll) {
    return (
      <div className="space-y-3">
        {DISCOUNTS.map((discount) => (
          <div
            key={discount.id}
            className="p-4"
            style={{
              background: discount.bgColor,
              border: `1px solid ${discount.borderColor}`,
              borderRadius: '2px',
            }}
          >
            <div className="flex items-start gap-3">
              <discount.icon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: discount.color }} />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[8px] tracking-[0.2em] uppercase font-bold" style={{ color: discount.color }}>
                    {discount.title}
                  </span>
                  {discount.code && (
                    <span className="font-mono text-[9px] font-bold px-2 py-0.5" style={{ background: discount.color, color: '#080808', borderRadius: '1px' }}>
                      {discount.code}
                    </span>
                  )}
                </div>
                <p className="font-heading text-xs" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 300 }}>
                  {discount.description}
                </p>
                {discount.id === 'shipping' && (
                  <>
                    <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${freeShippingProgress}%`,
                          background: freeShippingUnlocked ? '#6EBD8E' : discount.color,
                        }}
                      />
                    </div>
                    <p className="font-mono text-[7px] mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      {freeShippingUnlocked ? '✓ Free shipping unlocked!' : `Add $${(75 - cartSubtotal).toFixed(2)} more to unlock`}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default: single rotating card
  const discount = DISCOUNTS[activeIndex];

  return (
    <div
      className="p-4"
      style={{
        background: discount.bgColor,
        border: `1px solid ${discount.borderColor}`,
        borderRadius: '2px',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="flex items-start gap-3"
        >
          <discount.icon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: discount.color }} />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[8px] tracking-[0.2em] uppercase font-bold" style={{ color: discount.color }}>
                {discount.title}
              </span>
              {discount.code && (
                <span className="font-mono text-[9px] font-bold px-2 py-0.5" style={{ background: discount.color, color: '#080808', borderRadius: '1px' }}>
                  {discount.code}
                </span>
              )}
            </div>
            <p className="font-heading text-xs" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 300 }}>
              {discount.description}
            </p>
            {discount.id === 'shipping' && (
              <>
                <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${freeShippingProgress}%`,
                      background: freeShippingUnlocked ? '#6EBD8E' : discount.color,
                    }}
                  />
                </div>
                <p className="font-mono text-[7px] mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  {freeShippingUnlocked ? '✓ Free shipping unlocked!' : `Add $${(75 - cartSubtotal).toFixed(2)} more to unlock`}
                </p>
              </>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}