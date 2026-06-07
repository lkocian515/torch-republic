import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const RG = '#E6B7AD';

export default function FounderNote() {
  return (
    <section className="px-6 md:px-10 py-20" style={{ background: '#080808' }}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Section Label */}
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-6" style={{ color: RG }}>
            Why Torch Republic Exists
          </p>

          {/* Founder Message */}
          <div className="mb-8">
            <p className="font-heading text-base leading-relaxed mb-5" style={{
              color: 'rgba(240,235,225,0.65)',
              fontWeight: 300,
              lineHeight: 1.9
            }}>
              Torch Republic was created from a simple belief: The most important transformations in life rarely happen all at once.
            </p>
            <p className="font-heading text-base leading-relaxed mb-5" style={{
              color: 'rgba(240,235,225,0.65)',
              fontWeight: 300,
              lineHeight: 1.9
            }}>
              They happen through small decisions repeated consistently over time. A morning walk. A difficult conversation. A promise kept. A new beginning. A quiet moment before the world demands your attention.
            </p>
            <p className="font-heading text-base leading-relaxed mb-5" style={{
              color: 'rgba(240,235,225,0.65)',
              fontWeight: 300,
              lineHeight: 1.9
            }}>
              We believe coffee can be more than a source of energy. It can become a daily ritual that reconnects you with your intentions, your values, and the person you are working to become.
            </p>
            <p className="font-heading text-base leading-relaxed mb-5" style={{
              color: 'rgba(240,235,225,0.65)',
              fontWeight: 300,
              lineHeight: 1.9
            }}>
              Every Torch Republic blend is inspired by a different quality of human growth—from discipline and resilience to creativity, restoration, wisdom, and purpose. Because transformation isn't built in a single moment. It's built one day at a time.
            </p>
          </div>

          {/* Signature */}
          <div className="pt-8" style={{ borderTop: `1px solid ${RG}25` }}>
            <p className="font-serif font-bold text-white mb-1" style={{ fontSize: '1.2rem' }}>
              Lisa Marie Kocian
            </p>
            <p className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{
              color: RG
            }}>
              Founder, Torch Republic Coffee Company
            </p>
          </div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <Link
              to="/about"
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