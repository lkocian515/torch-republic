import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RG = '#E6AC45';
const GOLD = '#E6AC45';

export default function FounderStorySection() {
  return (
    <section
      style={{
        background: '#0a0808',
        borderTop: '1px solid rgba(230,183,173,0.07)',
        borderBottom: '1px solid rgba(230,183,173,0.07)',
        padding: 'clamp(56px, 7vw, 96px) 24px',
      }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Label */}
          <div
            className="inline-flex items-center gap-3 px-4 py-2 mb-8"
            style={{ background: `${GOLD}0C`, border: `1px solid ${GOLD}28`, borderRadius: '2px' }}
          >
            <div style={{ width: '16px', height: '1px', background: `${GOLD}50` }} />
            <span className="font-mono text-[8px] tracking-[0.45em] uppercase" style={{ color: `${GOLD}BB` }}>
              Why Torch Republic Exists
            </span>
            <div style={{ width: '16px', height: '1px', background: `${GOLD}50` }} />
          </div>

          <h2
            className="font-serif font-bold mb-8"
            style={{
              fontSize: 'clamp(1.9rem, 3.5vw, 2.9rem)',
              color: '#F7F2E9',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            Coffee Should Feel Like<br className="hidden sm:block" /> More Than Caffeine.
          </h2>

          <div
            className="mb-8 mx-auto"
            style={{ height: '1px', width: '60px', background: `linear-gradient(90deg, transparent, ${RG}60, transparent)` }}
          />

          <p
            className="font-heading mb-6"
            style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)', color: 'rgba(240,230,210,0.65)', lineHeight: 1.95, fontWeight: 300 }}
          >
            Torch Republic was created for people who want coffee to feel like more than a habit. Each blend is designed as a small daily ritual — something convenient, grounding, and functional enough to fit into real life.
          </p>
          <p
            className="font-heading mb-10"
            style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1rem)', color: 'rgba(240,230,210,0.45)', lineHeight: 1.95, fontWeight: 300 }}
          >
            Whether you reach for focus in the morning, calm in the evening, or simply a smooth cup with no equipment and no fuss — Torch Republic is built around the idea that your coffee can help you begin again, every single day.
          </p>

          {/* Trust signals row */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-10">
            {[
              'Instant mushroom coffee',
              'No coffee maker needed',
              'Lion\'s Mane + Cordyceps + Reishi',
              'Small-batch wellness brand',
              '27 servings per tube',
            ].map(t => (
              <span key={t} className="font-mono text-[7.5px] tracking-[0.22em] uppercase" style={{ color: 'rgba(230,183,173,0.38)' }}>
                ✦ {t}
              </span>
            ))}
          </div>

          <Link
            to="/about"
            className="inline-block font-mono text-[9px] tracking-[0.32em] uppercase px-8 py-3.5 transition-opacity hover:opacity-80"
            style={{ border: `1px solid ${RG}40`, color: RG }}
          >
            Our Story →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}