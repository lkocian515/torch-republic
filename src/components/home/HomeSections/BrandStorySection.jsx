import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function BrandStorySection() {
  return (
    <section className="py-24 px-6 md:px-10" style={{ background: '#080808', borderTop: '1px solid rgba(230,183,173,0.06)' }}>
      <div className="max-w-[900px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.45)' }}>
              Our Story
            </p>
            <h2 className="font-serif font-bold text-white mb-6" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              Meet Torch Republic
            </h2>
            <div className="space-y-4">
              <p className="font-heading text-sm" style={{ color: 'rgba(247,241,232,0.5)', fontWeight: 300, lineHeight: 1.85 }}>
                Torch Republic started with a simple question: what if your morning coffee actually worked with you — not just wired you up and left you behind an hour later?
              </p>
              <p className="font-heading text-sm" style={{ color: 'rgba(247,241,232,0.5)', fontWeight: 300, lineHeight: 1.85 }}>
                We spent two years perfecting the blend — sourcing specialty-grade instant coffee, testing mushroom extract ratios, and refusing to ship anything that tasted earthy or medicinal. What you get is a coffee that's genuinely delicious first, functional second.
              </p>
              <p className="font-heading text-sm" style={{ color: 'rgba(247,241,232,0.5)', fontWeight: 300, lineHeight: 1.85 }}>
                Every blend is named for a state of mind — Ember Rise for mornings, Midnight Watch for late nights, Glowmind for focus days. Because ritual matters.
              </p>
            </div>
            <Link
              to="/mission"
              className="inline-block mt-8 font-mono text-[9px] tracking-[0.35em] uppercase transition-opacity hover:opacity-60"
              style={{ color: '#E6B7AD' }}
            >
              Read Our Full Story →
            </Link>
          </motion.div>

          {/* Right: values list */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            {[
              { label: 'Transparency First', body: "No proprietary blends. You know exactly what's in your cup — and how much." },
              { label: 'Ritual Over Routine', body: "We design blends for moments, not just mornings. Intention is the ingredient." },
              { label: 'No Compromises', body: "If it doesn't taste great, we don't ship it. Functional shouldn't mean flavorless." },
              { label: '30-Day Guarantee', body: "If you're not completely satisfied, we make it right. No questions asked." },
            ].map((v, i) => (
              <div
                key={v.label}
                className="p-4"
                style={{ background: '#111010', borderLeft: '2px solid rgba(230,183,173,0.3)' }}
              >
                <p className="font-mono text-[8.5px] tracking-[0.3em] uppercase font-bold mb-1.5" style={{ color: '#E6B7AD' }}>
                  {v.label}
                </p>
                <p className="font-heading text-xs" style={{ color: 'rgba(247,241,232,0.45)', fontWeight: 300, lineHeight: 1.7 }}>
                  {v.body}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}