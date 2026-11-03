import React from 'react';
import { motion } from 'framer-motion';

export default function CoffeeLifestyleBanner() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: '480px' }}>
      {/* Dark parchment/study editorial bg */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0a0600 0%, #150d02 40%, #0a0a0a 100%)',
        }}
      />

      {/* Decorative gold lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #E6AC4544, transparent)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #E6AC4544, transparent)' }} />
        <div className="absolute top-12 left-12 w-24 h-24 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #E6AC45, transparent)' }} />
        <div className="absolute bottom-8 right-16 w-32 h-32 rounded-full opacity-8" style={{ background: 'radial-gradient(circle, #E6AC45, transparent)' }} />
      </div>

      {/* Parchment texture pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #E6AC45 0px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #E6AC45 0px, transparent 1px, transparent 40px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[480px] px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, #E6AC45)' }} />
            <span className="font-mono text-[10px] tracking-[0.5em] uppercase" style={{ color: '#E6AC45' }}>The Torch Republic Way</span>
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, #E6AC45, transparent)' }} />
          </div>

          <h2
            className="font-serif text-white leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', fontWeight: 700 }}
          >
            Built for mornings<br />
            <span style={{ color: '#E6AC45' }}>with purpose.</span>
          </h2>

          <p className="text-gray-500 font-mono text-sm leading-relaxed max-w-md mx-auto mb-10">
            Every cup is an act of intention. Slow down, think clearly, hold the line.
            The republic was built by people who started their mornings with conviction.
          </p>

          <a
            href="/shop/instant-coffee"
            className="inline-flex items-center gap-2 px-8 py-4 font-heading font-black text-sm tracking-[0.2em] uppercase"
            style={{ background: 'linear-gradient(135deg, #09243A 0%, #09243A 50%, #E6AC45 100%)', color: '#fff' }}
          >
            Start Your Morning Right
          </a>
        </motion.div>
      </div>
    </section>
  );
}