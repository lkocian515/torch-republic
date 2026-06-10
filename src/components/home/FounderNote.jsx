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
            A Note From the Founder
          </p>

          {/* Founder Message */}
          <div className="mb-8">
            <p className="font-heading text-base leading-relaxed mb-5" style={{
              color: 'rgba(240,235,225,0.65)',
              fontWeight: 300,
              lineHeight: 1.9
            }}>
              Torch Republic began with a simple belief: your daily coffee should help you feel clearer, more grounded, and more connected to the life you are building.
            </p>
            <p className="font-heading text-base leading-relaxed mb-5" style={{
              color: 'rgba(240,235,225,0.65)',
              fontWeight: 300,
              lineHeight: 1.9
            }}>
              I wanted to create something more intentional than another rushed cup of caffeine. Something simple, beautiful, and practical enough to become part of real life.
            </p>
            <p className="font-heading text-base leading-relaxed mb-5" style={{
              color: 'rgba(240,235,225,0.65)',
              fontWeight: 300,
              lineHeight: 1.9
            }}>
              Torch Republic Coffee Co. is for people who care about how they start their day — people who want energy without chaos, focus without force, and a small ritual that brings them back to themselves.
            </p>
            <p className="font-heading text-base leading-relaxed" style={{
              color: 'rgba(240,235,225,0.65)',
              fontWeight: 300,
              lineHeight: 1.9
            }}>
              This is coffee for the ritual-minded.
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