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
            From the Founder
          </p>

          {/* Founder Message */}
          <div className="mb-8">
            <p className="font-heading text-base leading-relaxed mb-5" style={{
              color: 'rgba(240,235,225,0.65)',
              fontWeight: 300,
              lineHeight: 1.9
            }}>
              Torch Republic began with a simple belief: your daily rituals shape the person you become.
            </p>
            <p className="font-heading text-base leading-relaxed mb-5" style={{
              color: 'rgba(240,235,225,0.65)',
              fontWeight: 300,
              lineHeight: 1.9
            }}>
              I did not want to create another coffee brand built around rushing, crashing, or running on empty. I wanted to create something more intentional — a coffee company for people who are rebuilding their focus, protecting their energy, and choosing to begin again with purpose.
            </p>
            <p className="font-heading text-base leading-relaxed mb-5" style={{
              color: 'rgba(240,235,225,0.65)',
              fontWeight: 300,
              lineHeight: 1.9
            }}>
              The torch represents the part of us that does not go out. Even in difficult seasons, even when life feels uncertain, there is still a light we can return to.
            </p>
            <p className="font-heading text-base leading-relaxed" style={{
              color: 'rgba(240,235,225,0.65)',
              fontWeight: 300,
              lineHeight: 1.9
            }}>
              Torch Republic is built for that moment: the morning reset, the first decision, the cup that says, "I'm still here. I'm still rising."
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