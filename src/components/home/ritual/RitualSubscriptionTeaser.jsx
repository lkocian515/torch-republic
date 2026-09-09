import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';

export default function RitualSubscriptionTeaser() {
  return (
    <section style={{ background: '#F3ECE2' }}>
      <div className="mx-auto max-w-[1100px] px-6 py-16 text-center md:px-10 md:py-20">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: '#7A5C23' }}>
            Make it a routine
          </p>
          <h2
            className="mt-4 font-serif font-semibold"
            style={{ fontSize: 'clamp(1.9rem,3.5vw,2.6rem)', color: '#292622', textWrap: 'balance' }}
          >
            Subscribe to the product you actually drink.
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-heading" style={{ color: '#5F574F', lineHeight: 1.7 }}>
            Choose your coffee and have it delivered every four weeks. Save 10%, pause when needed, or cancel anytime.
            Start with one. Add another whenever your routine changes.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link to="/build-your-ritual" className="btn btn-primary" style={{ minWidth: '200px' }}>
              Build Your Ritual
            </Link>
            <Link to="/subscription" className="btn btn-ghost" style={{ minWidth: '200px' }}>
              How subscriptions work
            </Link>
          </div>
          <p className="mt-5 flex items-center justify-center gap-2 font-mono text-[8px] uppercase tracking-[0.2em]" style={{ color: '#8A8076' }}>
            <Gift size={12} style={{ color: '#B7653E' }} /> Subscribers still earn Torch Republic rewards
          </p>
        </motion.div>
      </div>
    </section>
  );
}