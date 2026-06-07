import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import HowToUse from '../components/mushroom/HowToUse';
import WhyInstant from '../components/mushroom/WhyInstant';

export default function HowItWorks() {
  useSEO({
    title: 'How It Works | Torch Republic Coffee Company',
    description: 'Learn how to prepare Torch Republic instant coffee, mushroom coffee, and matcha. Scoop, mix with hot or cold water, and enjoy your daily ritual in seconds.',
  });
  return (
    <div style={{ backgroundColor: '#080808', color: '#F0EBE1', minHeight: '100vh' }}>
      <section className="px-6 py-24 text-center" style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto">
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>
            How It Works
          </p>
          <h1 className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Simple. Instant. Intentional.
          </h1>
          <p className="font-heading" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.5)', lineHeight: 1.85, fontWeight: 300 }}>
            Premium instant coffee, mushroom coffee, and matcha designed for people who want an elevated ritual without the complexity of brewing.
          </p>
        </motion.div>
      </section>
      <HowToUse />
      <WhyInstant />
      <section className="px-6 py-20 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.08)' }}>
        <Link to="/shop"
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90"
          style={{ background: '#E6B7AD', color: '#080808', padding: '14px 32px' }}>
          Shop the Blends →
        </Link>
      </section>
    </div>
  );
}