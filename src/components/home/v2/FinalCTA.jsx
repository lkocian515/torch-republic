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
        <p className="font-mono text-[10px] tracking-[0.6em] uppercase mb-6" style={{ color: '#C9A24A' }}>
          Begin the Ritual
        </p>

        <h2 className="font-serif leading-none mb-5" style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em' }}>
          Carry the<br />Flame Daily.
        </h2>

        <div className="h-px w-16 mx-auto mb-8" style={{ background: 'linear-gradient(90deg, transparent, #C9A24A, transparent)' }} />

        <p className="font-heading mb-12" style={{ fontSize: '1rem', color: 'rgba(240,235,225,0.75)', fontWeight: 400, lineHeight: 1.95 }}>
          Every morning is a choice. Make it count.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/CoffeeCollection"
            className="inline-flex items-center justify-center gap-3 font-mono text-[11px] tracking-[0.35em] uppercase transition-all hover:opacity-85 btn-glow"
            style={{ background: '#D4AE57', color: '#080808', fontWeight: 800, padding: '18px 52px' }}
          >
            Shop Now →
          </Link>
          <Link
            to="/TheTorchBox"
            className="inline-flex items-center justify-center font-mono text-[11px] tracking-[0.3em] uppercase transition-all hover:opacity-75"
            style={{ color: '#C9A24A', border: '1px solid rgba(201,162,74,0.4)', padding: '18px 36px' }}
          >
            Join the Torch Box
          </Link>
        </div>
      </motion.div>
    </section>
  );
}