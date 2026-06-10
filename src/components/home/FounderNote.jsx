import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const RG = '#E6B7AD';

export default function FounderNote() {
  return (
    <section className="px-6 md:px-10 py-20 relative" style={{ background: '#080808' }}>
      <div className="divider-gradient absolute top-0 left-0 right-0" />
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Section Label */}
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-10" style={{ color: RG }}>
            From the Founder
          </p>

          {/* Message */}
          <div className="mb-8">
            <p className="font-heading text-base leading-relaxed mb-5" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300, lineHeight: 1.9 }}>
              Torch Republic began with a simple belief: your morning ritual should help you feel more clear, present, and ready for the day ahead.
            </p>
            <p className="font-heading text-base leading-relaxed mb-5" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300, lineHeight: 1.9 }}>
              I wanted to create a coffee brand that felt more intentional than the usual caffeine fix — something that supported focus, calm energy, and the small daily choices that help us become who we are meant to be.
            </p>
            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300, lineHeight: 1.9 }}>
              Torch Republic is for the people rebuilding, rising, creating, working, healing, leading, and choosing to begin again — one ritual at a time.
            </p>
          </div>

          {/* Signature */}
          <div className="pt-8" style={{ borderTop: `1px solid ${RG}20` }}>
            <p
              style={{
                fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
                fontSize: '1.6rem',
                color: RG,
                opacity: 0.75,
                letterSpacing: '0.01em',
                fontWeight: 600,
                lineHeight: 1.2,
                transform: 'rotate(-1.5deg)',
                display: 'inline-block',
                marginBottom: '4px',
              }}
            >
              Lisa Marie Kocian
            </p>
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>
              Founder, Torch Republic Coffee Company
            </p>
          </div>

          {/* CTA */}
          <div className="mt-10">
            <Link
              to="/mission"
              className="inline-block font-mono text-[9px] tracking-[0.3em] uppercase transition-all hover:opacity-70"
              style={{ color: RG, borderBottom: `1px solid ${RG}` }}
            >
              Read Our Story →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}