import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Lightbulb } from 'lucide-react';

export default function FirstTimeCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-12 p-6 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      style={{
        background: 'linear-gradient(135deg, rgba(196,163,90,0.12) 0%, rgba(201,162,74,0.06) 100%)',
        border: '1px solid rgba(201,162,74,0.2)',
      }}
    >
      <div className="flex items-start gap-4 flex-1">
        <Lightbulb className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: '#C9A24A' }} />
        <div>
          <h3 className="font-serif text-lg font-bold mb-1" style={{ color: '#FFFFFF' }}>
            First Time Here?
          </h3>
          <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.6 }}>
            Start with <strong>Washington Blend</strong> — our most balanced, accessible dark roast. Perfect for any brewing method.
          </p>
        </div>
      </div>
      <Link
        to="/WashingtonBlend"
        className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase transition-all hover:opacity-90 flex-shrink-0 whitespace-nowrap"
        style={{
          background: '#C9A24A',
          color: '#080808',
          padding: '12px 20px',
          fontWeight: 700,
        }}
      >
        Start Here <ArrowRight className="w-3 h-3" />
      </Link>
    </motion.div>
  );
}