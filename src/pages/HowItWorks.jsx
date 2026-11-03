import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import HowToUse from '../components/mushroom/HowToUse';
import WhyInstant from '../components/mushroom/WhyInstant';
import GettingStartedGuide from '../components/mushroom/GettingStartedGuide';
import DriftRitualBuilder from '../components/home/drift/DriftRitualBuilder';

const PAGE = '#F7F2E9';
const TEXT = '#32190F';
const BODY = '#5E4639';
const RG = '#E6AC45';
const CLAY = '#9B4E2F';

export default function HowItWorks() {
  useSEO({
    title: 'How It Works | Torch Republic Coffee Company',
    description: 'Learn how to prepare Torch Republic instant coffee and mushroom coffee. Scoop, mix with hot or cold water, stir, and enjoy your daily ritual in seconds. No machine needed.',
  });
  return (
    <div style={{ backgroundColor: PAGE, color: TEXT, minHeight: '100vh' }}>
      <section className="px-6 py-24 text-center" style={{ borderBottom: '1px solid rgba(230,183,173,0.22)' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto">
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: RG }}>
            How It Works
          </p>
          <h1 className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: TEXT, letterSpacing: '-0.02em' }}>
            Simple. Instant. Intentional.
          </h1>
          <p className="font-heading" style={{ fontSize: '0.95rem', color: BODY, lineHeight: 1.85, fontWeight: 300 }}>
            Premium instant coffee and mushroom coffee designed for people who want an elevated ritual without the complexity of brewing.
          </p>
        </motion.div>
      </section>
      <HowToUse />
      <WhyInstant />
      <GettingStartedGuide />
      <DriftRitualBuilder />
      <section className="px-6 py-20 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.22)' }}>
        <Link to="/shop"
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90"
          style={{ background: CLAY, color: '#F7F2E9', padding: '14px 32px', borderRadius: '4px' }}>
          Shop the Blends →
        </Link>
      </section>
    </div>
  );
}