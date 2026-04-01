import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight } from 'lucide-react';

export default function ManifestoSection() {
  return (
    <section className="py-20 px-6 relative overflow-hidden" style={{ backgroundColor: '#050505' }}>
      {/* Gold glow center */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[500px] h-[300px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(200,164,77,0.07) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px flex-1 max-w-16" style={{ background: 'linear-gradient(90deg, transparent, #1B5060)' }} />
          <span className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: '#C8A44D' }}>Our Mission</span>
          <div className="h-px flex-1 max-w-16" style={{ background: 'linear-gradient(90deg, #C8A44D, transparent)' }} />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-heading font-black uppercase leading-tight tracking-tight text-white mb-6"
        >
          Faith. Freedom. <span style={{ color: '#D4AF5A' }}>Truth.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10"
        >
          <Link
            to={createPageUrl('BestSellers')}
            className="inline-flex items-center justify-center font-heading font-black text-sm tracking-widest uppercase px-10 py-4"
            style={{ background: 'linear-gradient(135deg, #0E2A2F 0%, #1B5060 50%, #C8A44D 100%)', color: '#fff', boxShadow: '0 4px 30px rgba(14,42,47,0.6), 0 0 0 1px rgba(200,164,77,0.3)' }}
          >
            Shop the Collection
          </Link>
          <Link
            to={createPageUrl('Mission')}
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase"
            style={{ color: 'rgba(200,164,77,0.7)' }}
          >
            Read Our Story <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}