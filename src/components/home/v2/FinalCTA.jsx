import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function FinalCTA() {
  return (
    <section
      className="relative py-36 px-6 overflow-hidden text-center"
      style={{ backgroundColor: '#000', borderTop: '1px solid rgba(196,163,90,0.1)' }}
    >
      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/5b60912f0_generated_image.png"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.12, filter: 'brightness(0.8) grayscale(30%)' }}
        />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(196,163,90,0.07) 0%, transparent 60%)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85 }}
        className="relative z-10 max-w-[600px] mx-auto"
      >
        <h2 className="font-serif leading-none mb-4" style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)', fontWeight: 800, color: '#FFFCF7', letterSpacing: '-0.03em' }}>
          Built for Those Who Carry the Flame.
        </h2>

        <p className="font-heading mb-8" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.72)', fontWeight: 400, lineHeight: 1.6, maxWidth: '480px', margin: '0 auto' }}>
          Torch Republic Coffee Company delivers premium small-batch blends roasted with intention. Choose a single blend or join a Torchbearer membership and build your legacy.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/CoffeeCollection"
            className="inline-flex items-center justify-center font-mono text-[11px] tracking-[0.35em] uppercase transition-all hover:opacity-90 btn-glow"
            style={{ background: '#E6AC45', color: '#080808', fontWeight: 800, padding: '16px 36px' }}
          >
            Explore the Collection
          </Link>
          <Link
            to="/TheTorchBox"
            className="inline-flex items-center justify-center font-mono text-[11px] tracking-[0.3em] uppercase transition-all hover:opacity-75"
            style={{ color: '#E6AC45', border: '1px solid rgba(201,162,74,0.4)', padding: '16px 28px' }}
          >
            Become a Torchbearer
          </Link>
        </div>
      </motion.div>
    </section>
  );
}