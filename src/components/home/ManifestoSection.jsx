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

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4 text-center max-w-2xl mx-auto"
        >
          <p className="text-2xl md:text-3xl font-serif font-bold leading-snug text-white">
            Torch Republic exists for those who refuse to live passively.
          </p>
          <p className="text-lg md:text-xl font-serif text-gray-300 leading-relaxed">
            This is not just apparel.<br />
            <span style={{ color: '#C9A24A' }}>This is identity.</span>
          </p>
          <p className="text-base font-serif italic text-gray-400">
            You don't wear the message.<br />
            You carry it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center mt-10"
        >
          <Link
            to={createPageUrl('BestSellers')}
            className="inline-flex items-center justify-center font-heading font-black text-sm tracking-widest uppercase px-10 py-4"
            style={{ background: 'linear-gradient(135deg, #0E2A2F 0%, #1B5060 50%, #C9A24A 100%)', color: '#fff', boxShadow: '0 4px 30px rgba(14,42,47,0.6), 0 0 0 1px rgba(201,162,74,0.3)' }}
          >
            Shop the Collection
          </Link>
        </motion.div>
      </div>
    </section>
  );
}