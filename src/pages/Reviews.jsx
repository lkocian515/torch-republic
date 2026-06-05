import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

export default function Reviews() {
  useSEO({
    title: 'Customer Reviews | Torch Republic Mushroom Coffee',
    description: 'Read customer reviews and experiences with Torch Republic premium instant mushroom coffee blends for focus, clarity, energy, balance, and daily ritual.',
  });
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000' }}>

      {/* Hero */}
      <section className="py-32 px-6 md:px-12 text-center" style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl mx-auto"
        >
          <p className="font-mono text-[10px] tracking-[0.55em] uppercase mb-6"
            style={{ color: 'rgba(230,183,173,0.5)' }}>
            Customer Reviews
          </p>
          <h1 className="font-serif text-white mb-6"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            Reviews Coming Soon
          </h1>
          <div className="flex items-center justify-center gap-1.5 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" style={{ color: '#E6B7AD' }} />
            ))}
          </div>
          <p className="font-heading mb-8"
            style={{ fontSize: '1rem', color: 'rgba(240,235,225,0.45)', lineHeight: 1.85, fontWeight: 300 }}>
            Be one of the first to experience the new Torch Republic Coffee Company collection —
            six premium instant mushroom coffee blends crafted for focus, flow, and daily ritual.
          </p>
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase"
            style={{ color: 'rgba(230,183,173,0.35)' }}>
            Reviews will appear here as our community grows.
          </p>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center" style={{ background: '#070707' }}>
        <div className="max-w-lg mx-auto">
          <p className="font-mono text-[10px] tracking-[0.5em] uppercase mb-4"
            style={{ color: 'rgba(230,183,173,0.4)' }}>
            Try the Blends
          </p>
          <h2 className="font-serif text-white font-bold mb-6"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', letterSpacing: '-0.02em' }}>
            Start your ritual today.
          </h2>
          <div className="h-px w-12 mx-auto mb-8"
            style={{ background: 'linear-gradient(90deg, transparent, #E6B7AD, transparent)' }} />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/shop"
              className="inline-flex items-center justify-center font-mono text-[11px] tracking-[0.35em] uppercase transition-opacity hover:opacity-80"
              style={{ background: '#E6B7AD', color: '#080808', fontWeight: 800, padding: '16px 40px' }}>
              Shop All Blends →
            </Link>
            <Link to="/bundle"
              className="inline-flex items-center justify-center font-mono text-[11px] tracking-[0.35em] uppercase transition-opacity hover:opacity-80"
              style={{ border: '1px solid rgba(230,183,173,0.35)', color: 'rgba(230,183,173,0.7)', padding: '16px 40px' }}>
              Try the Bundle
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}