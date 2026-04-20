import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Lightbulb } from 'lucide-react';

export default function FirstTimeGuidance() {
  return (
    <motion.section
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="py-6 px-5 md:px-12"
      style={{
        background: 'linear-gradient(135deg, rgba(196,163,90,0.08) 0%, rgba(201,162,74,0.04) 100%)',
        borderBottom: '1px solid rgba(201,162,74,0.12)',
      }}
    >
      <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <Lightbulb className="w-4 h-4 flex-shrink-0" style={{ color: '#C9A24A' }} />
          <div>
            <p className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: '#C9A24A', fontWeight: 700 }}>
              New Here?
            </p>
            <p className="font-heading text-[13px]" style={{ color: 'rgba(240,235,225,0.7)' }}>
              Start with <strong>Washington Blend</strong> — our #1 recommended first coffee.
            </p>
          </div>
        </div>
        <a
          href="https://torch-republic.com/products/washington-blend"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase transition-all hover:opacity-90 flex-shrink-0"
          style={{
            background: 'rgba(201,162,74,0.25)',
            color: '#C9A24A',
            padding: '10px 20px',
            border: '1px solid rgba(201,162,74,0.35)',
            textDecoration: 'none',
          }}
        >
          Get Started <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </motion.section>
  );
}