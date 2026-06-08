import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function FinalCTASection() {
  return (
    <section
      className="py-28 px-6 md:px-10 text-center relative overflow-hidden"
      style={{ background: '#0d0b0a', borderTop: '1px solid rgba(230,183,173,0.07)' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(230,183,173,0.07) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4"
          style={{ color: 'rgba(230,183,173,0.45)' }}
        >
          Start Your Ritual
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif font-bold text-white mb-6"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
        >
          Your Morning Ritual<br />
          <span style={{ color: '#E6B7AD' }}>Starts Here</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="font-heading mb-10"
          style={{ color: 'rgba(247,241,232,0.45)', fontWeight: 300, lineHeight: 1.8 }}
        >
          27 servings per tube. Free shipping on orders $75+. 30-day satisfaction guarantee. First order? Use <span style={{ color: '#C4A35A', fontWeight: 600 }}>WELCOME15</span> for 15% off.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/shop"
            className="font-mono text-[10px] tracking-[0.4em] uppercase font-bold px-10 py-4 transition-all hover:opacity-90 btn-glow"
            style={{ background: '#E6B7AD', color: '#080808', minWidth: 240, textAlign: 'center' }}
          >
            Shop Mushroom Coffee
          </Link>
          <Link
            to="/quiz"
            className="font-mono text-[10px] tracking-[0.35em] uppercase font-bold px-8 py-4 transition-all hover:opacity-80"
            style={{ border: '1px solid rgba(230,183,173,0.3)', color: 'rgba(230,183,173,0.75)', minWidth: 200, textAlign: 'center' }}
          >
            Find My Blend →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}