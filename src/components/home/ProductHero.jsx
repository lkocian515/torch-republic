import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RG = '#E6B7AD';

export default function ProductHero() {
  const trustSignals = [
    { icon: '☕', label: '100% Instant Coffee' },
    { icon: '🍄', label: 'Lion\'s Mane + Chaga' },
    { icon: '📊', label: '27 Servings' },
    { icon: '✨', label: 'No Coffee Maker Needed' },
  ];

  return (
    <section className="px-6 md:px-10 py-16 md:py-24" style={{ backgroundColor: '#0A0908', borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
      <div className="max-w-[1280px] mx-auto">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative mb-12 md:mb-16"
        >
          <img
            src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/4262eaf1c_tcr_coffee_blank_final_latest3r.jpeg"
            alt="Torch Republic Coffee Products - Torchbearer, Glowmind, The Monk"
            className="w-full h-auto object-cover rounded-sm"
            style={{ maxHeight: '500px', aspectRatio: 'auto' }}
          />
          
          {/* Overlay Gradient */}
          <div
            className="absolute inset-0 pointer-events-none rounded-sm"
            style={{
              background: 'linear-gradient(135deg, rgba(230,183,173,0.15) 0%, transparent 50%, rgba(16,185,129,0.1) 100%)',
            }}
          />
        </motion.div>

        {/* Brand Statement */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl mx-auto text-center mb-10"
        >
          <p className="font-heading text-sm md:text-base" style={{
            color: 'rgba(240,235,225,0.65)',
            fontWeight: 300,
            lineHeight: 1.9
          }}>
            Premium coffee, mushroom coffee, and matcha blends inspired by the qualities that shape a meaningful life. Every cup is a ritual. Every ritual is a choice. Every choice shapes who you become.
          </p>
        </motion.div>

        {/* Trust Signals Bar */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
        >
          {trustSignals.map((signal, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl md:text-4xl mb-2">{signal.icon}</p>
              <p
                className="font-mono text-[8px] md:text-[9px] tracking-[0.25em] md:tracking-[0.3em] uppercase leading-tight"
                style={{ color: 'rgba(230,183,173,0.6)' }}
              >
                {signal.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* CTA Below Image */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 md:mt-0 text-center md:absolute md:bottom-8 md:right-10"
        >
          <Link
            to="/shop"
            className="inline-flex items-center font-mono text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-bold transition-all hover:opacity-90"
            style={{
              background: RG,
              color: '#080808',
              padding: '14px 32px',
              borderRadius: '4px',
              boxShadow: '0 8px 24px rgba(230,183,173,0.2)',
            }}
          >
            Explore the Collection →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}