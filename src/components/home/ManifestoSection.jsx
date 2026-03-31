import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function ManifestoSection() {
  return (
    <section
      className="relative py-36 px-6 overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: '#070707' }}
    >
      {/* Very subtle gold bloom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,162,74,0.05) 0%, transparent 100%)' }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-5 mb-12"
        >
          <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,162,74,0.5))' }} />
          <span className="font-mono text-[10px] tracking-[0.6em] uppercase" style={{ color: 'rgba(201,162,74,0.7)' }}>
            The Mission
          </span>
          <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, rgba(201,162,74,0.5), transparent)' }} />
        </motion.div>

        {/* Main statement — big serif */}
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif font-bold text-white leading-[1.1] mb-8"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
        >
          Faith gives life{' '}
          <em style={{ color: '#C9A24A', fontStyle: 'italic' }}>meaning.</em>
          <br />
          Freedom is worth{' '}
          <em style={{ color: '#C9A24A', fontStyle: 'italic' }}>defending.</em>
          <br />
          Truth is worth{' '}
          <em style={{ color: '#C9A24A', fontStyle: 'italic' }}>wearing.</em>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-heading font-light text-base leading-relaxed mb-14 max-w-xl mx-auto"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          We don't make merch. We make statements.
          Every piece starts with a conviction.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to={createPageUrl('BestSellers')}
            className="group inline-flex items-center gap-2 font-mono text-sm tracking-[0.25em] uppercase px-10 py-5 transition-all duration-300"
            style={{ backgroundColor: '#C9A24A', color: '#0B0B0B', fontWeight: 700 }}
          >
            Shop the Collection
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
          <Link
            to={createPageUrl('Mission')}
            className="font-mono text-xs tracking-[0.35em] uppercase transition-colors duration-300"
            style={{ color: 'rgba(201,162,74,0.6)' }}
          >
            Read Our Story →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}