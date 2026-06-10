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

          {/* Two-column layout: photo + text */}
          <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start mb-8">

            {/* Founder photo placeholder */}
            <div
              className="flex-shrink-0 mx-auto md:mx-0"
              style={{
                width: '160px',
                height: '200px',
                background: 'linear-gradient(160deg, #1A1714 0%, #141210 100%)',
                border: `1px solid ${RG}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: `1px solid ${RG}30`, background: 'rgba(230,183,173,0.06)' }} />
              <p className="font-mono text-[6.5px] tracking-[0.2em] uppercase text-center" style={{ color: 'rgba(230,183,173,0.3)', padding: '0 12px' }}>
                Founder Photo
              </p>
            </div>

            {/* Message */}
            <div className="flex-1">
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
          </div>

          {/* Signature */}
          <div className="pt-8" style={{ borderTop: `1px solid ${RG}20` }}>
            <p className="font-serif font-bold text-white mb-1" style={{ fontSize: '1.2rem' }}>
              Lisa Marie Kocian
            </p>
            <p className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: RG }}>
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