import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GuaranteeBar() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16 md:py-20 px-5 md:px-12"
      style={{ background: '#080808', borderTop: '1px solid rgba(201,162,74,0.1)', borderBottom: '1px solid rgba(201,162,74,0.1)' }}
    >
      <div className="max-w-[720px] mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px flex-1 max-w-16" style={{ background: 'rgba(201,162,74,0.2)' }} />
          <ShieldCheck className="w-6 h-6" style={{ color: '#E6AC45' }} />
          <div className="h-px flex-1 max-w-16" style={{ background: 'rgba(201,162,74,0.2)' }} />
        </div>

        <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(201,162,74,0.5)' }}>
          Our Promise
        </p>

        <h2 className="font-serif font-bold text-white mb-4" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', letterSpacing: '-0.01em' }}>
          Shop with Confidence
        </h2>

        <p className="font-heading text-base mb-2" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.8 }}>
          If it's not the best coffee you've had, we'll make it right.
        </p>

        <p className="font-mono text-[10px] mb-6" style={{ color: 'rgba(255,255,255,0.3)' }}>
          No hassle. No stress. Just great coffee.
        </p>

        <Link to="/Contact"
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase transition-opacity hover:opacity-60 pb-0.5"
          style={{ color: 'rgba(201,162,74,0.6)', borderBottom: '1px solid rgba(201,162,74,0.2)' }}>
          <Flame className="w-3 h-3" /> Contact Us
        </Link>
      </div>
    </motion.section>
  );
}