import React from 'react';
import { motion } from 'framer-motion';
import FAQSection from '../components/mushroom/FAQSection';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';

export default function MushroomFAQ() {
  useSEO({
    title: 'FAQ | Torch Republic Coffee Company | Instant Coffee, Mushroom Coffee & Matcha',
    description: 'Answers about Torch Republic instant coffee, mushroom coffee, and matcha. Learn about taste, caffeine, preparation, ingredients, shipping, and choosing your blend.',
  });
  return (
    <div style={{ backgroundColor: '#111111', color: '#F0EBE1', minHeight: '100vh' }}>
      <section className="px-6 py-24 text-center" style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>
            FAQ
          </p>
          <h1 className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Frequently Asked Questions
          </h1>
          <p className="font-heading max-w-lg mx-auto"
            style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.5)', lineHeight: 1.85, fontWeight: 300 }}>
            Everything you need to know about Torch Republic instant coffee, mushroom coffee, and matcha.
          </p>
        </motion.div>
      </section>
      <FAQSection />
      <section className="px-6 py-16 text-center">
        <Link to="/shop"
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90"
          style={{ background: '#E6B7AD', color: '#080808', padding: '14px 32px' }}>
          Shop the Blends →
        </Link>
      </section>
    </div>
  );
}