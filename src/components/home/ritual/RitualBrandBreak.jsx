import React from 'react';
import { motion } from 'framer-motion';
import { Coffee } from 'lucide-react';

// Dark forest-olive contrast break — the single darker section in the
// middle of the homepage. Gives the eye a rest from the warm cream
// sections and adds editorial weight without introducing more orange.
export default function RitualBrandBreak() {
  return (
    <section style={{ background: '#2A3128' }}>
      <div className="mx-auto max-w-[900px] px-6 py-20 text-center md:px-10 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full" style={{ background: 'rgba(158,173,149,0.15)' }}>
            <Coffee size={22} style={{ color: '#9EAD95' }} />
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: '#9EAD95' }}>
            Two products. One promise.
          </p>
          <h2
            className="mx-auto mt-5 max-w-2xl font-serif font-semibold"
            style={{ fontSize: 'clamp(1.6rem,3.5vw,2.3rem)', color: '#F5EFE6', lineHeight: 1.25, textWrap: 'balance' }}
          >
            Premium coffee, made simple &mdash; so your morning stays yours.
          </h2>
          <p className="mx-auto mt-5 max-w-lg font-heading" style={{ color: 'rgba(245,239,230,0.72)', lineHeight: 1.7 }}>
            Single-origin beans, functional mushrooms, and nothing you don&rsquo;t need.
            No machine required, no clutter on the counter &mdash; just a better cup, every time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}