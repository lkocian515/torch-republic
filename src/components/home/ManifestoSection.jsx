import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function ManifestoSection() {
  return (
    <section className="relative overflow-hidden py-32 px-6" style={{ backgroundColor: '#080808' }}>
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,162,74,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Eyebrow divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-5 mb-12"
        >
          <div className="h-px flex-1 max-w-20" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,162,74,0.4))' }} />
          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#C9A24A' }} />
          <div className="h-px flex-1 max-w-20" style={{ background: 'linear-gradient(90deg, rgba(201,162,74,0.4), transparent)' }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif font-bold text-white leading-tight mb-8"
          style={{ fontSize: 'clamp(2.2rem, 6vw, 5rem)' }}
        >
          Your gear should<br />
          <span style={{ color: '#C9A24A' }}>mean something.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-heading font-light text-base md:text-lg leading-relaxed mb-12 max-w-xl mx-auto"
          style={{ color: 'rgba(255,255,255,0.42)' }}
        >
          Every thread, every design, every collection carries a conviction. 
          We build for those who stand for something — not for the crowd.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link
            to={createPageUrl('BestSellers')}
            className="font-mono text-xs tracking-[0.3em] uppercase px-10 py-4 transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: '#C9A24A', color: '#0B0B0B', fontWeight: 700 }}
          >
            Shop the Collection
          </Link>
          <Link
            to={createPageUrl('Mission')}
            className="font-mono text-xs tracking-[0.35em] uppercase transition-all duration-300 hover:opacity-100"
            style={{ color: 'rgba(201,162,74,0.55)' }}
          >
            Read Our Story →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}