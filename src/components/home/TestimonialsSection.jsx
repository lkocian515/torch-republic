import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Marcus T.',
    location: 'Dallas, TX',
    rating: 5,
    text: 'The Washington Blend is genuinely the best dark roast I\'ve had. Bold, smooth, and the packaging is something I\'d display on a shelf. This isn\'t just coffee — it\'s a statement.',
    product: 'Washington Blend · Dark Roast',
    verified: true,
  },
  {
    name: 'Sarah K.',
    location: 'Nashville, TN',
    rating: 5,
    text: 'I bought the full Founders Series as a gift for my father-in-law and he hasn\'t stopped talking about it. The quality is exceptional and the storytelling behind each blend is remarkable.',
    product: 'Founders Series · Full Set',
    verified: true,
  },
  {
    name: 'James R.',
    location: 'Denver, CO',
    rating: 5,
    text: 'Finally, a patriotic brand that doesn\'t scream at you. The Franklin Blend is sophisticated and the brand feels like it actually stands for something beyond a slogan.',
    product: 'Franklin Blend · Light Roast',
    verified: true,
  },
  {
    name: 'Catherine M.',
    location: 'Charleston, SC',
    rating: 5,
    text: 'I subscribed to the Torch Box and every month feels like receiving a piece of history. The attention to detail in the packaging and the story cards is unmatched.',
    product: 'Torch Box · Monthly',
    verified: true,
  },
];

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#C9A24A', fontSize: '0.75rem' }}>★</span>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + REVIEWS.length) % REVIEWS.length);
  const next = () => setActive((a) => (a + 1) % REVIEWS.length);
  const r = REVIEWS[active];

  return (
    <section style={{ background: '#0A0A0A', borderTop: '1px solid rgba(201,162,74,0.07)' }}>
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 py-32 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-[9px] tracking-[0.55em] uppercase mb-16"
          style={{ color: 'rgba(201,162,74,0.5)' }}
        >
          Customer Voices
        </motion.p>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-8"
          >
            <Stars count={r.rating} />
            <blockquote className="font-serif" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.65rem)', color: 'rgba(240,235,225,0.85)', lineHeight: 1.65, fontStyle: 'italic', fontWeight: 500, maxWidth: '720px' }}>
              "{r.text}"
            </blockquote>
            <div className="flex flex-col items-center gap-1">
              <p className="font-mono text-xs font-bold" style={{ color: '#C9A24A' }}>{r.name}</p>
              <p className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.25)' }}>{r.location} · {r.product}</p>
              {r.verified && (
                <span className="font-mono text-[9px] tracking-widest uppercase mt-1 px-3 py-1" style={{ color: '#7AC87A', background: 'rgba(122,200,122,0.08)', border: '1px solid rgba(122,200,122,0.2)' }}>
                  ✓ Verified Purchase
                </span>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-6 mt-14">
          <button onClick={prev} className="w-10 h-10 flex items-center justify-center transition-opacity hover:opacity-60" style={{ border: '1px solid rgba(201,162,74,0.2)', color: 'rgba(201,162,74,0.6)' }}>
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-2">
            {REVIEWS.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} className="w-1.5 h-1.5 rounded-full transition-all" style={{ background: i === active ? '#C9A24A' : 'rgba(201,162,74,0.2)' }} />
            ))}
          </div>
          <button onClick={next} className="w-10 h-10 flex items-center justify-center transition-opacity hover:opacity-60" style={{ border: '1px solid rgba(201,162,74,0.2)', color: 'rgba(201,162,74,0.6)' }}>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <p className="font-mono text-[10px] mt-10" style={{ color: 'rgba(255,255,255,0.2)' }}>
          4.9 stars · 2,400+ verified reviews
        </p>
      </div>
    </section>
  );
}