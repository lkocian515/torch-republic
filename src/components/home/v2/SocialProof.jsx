import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const REVIEWS = [
  { name: 'Marcus T.', location: 'Nashville, TN', text: 'The most heritage-forward coffee I\'ve ever had. Rich, complex, and worthy of the name it carries.' },
  { name: 'Sarah K.', location: 'Charleston, SC', text: 'Every morning feels like a deliberate act of legacy. I don\'t start my day without it.' },
  { name: 'James R.', location: 'Austin, TX', text: 'I bought the Founders Series for myself and three friends. Everyone ordered again within a week.' },
  { name: 'David M.', location: 'Bozeman, MT', text: 'It\'s not just coffee. It\'s a mindset. Torch Republic gets it.' },
  { name: 'Rachel B.', location: 'Knoxville, TN', text: 'The Torch Box is the best subscription I\'ve ever signed up for. Every month feels like a reveal.' },
];

function Stars() {
  return (
    <div className="flex gap-0.5 mb-3">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-3 h-3 fill-current" style={{ color: '#C9A24A' }} />
      ))}
    </div>
  );
}

export default function SocialProof() {
  return (
    <section
      className="py-20 overflow-hidden"
      style={{ backgroundColor: '#0F0F0F', borderTop: '1px solid rgba(196,163,90,0.1)' }}
    >
      {/* Header */}
      <div className="px-6 md:px-12 mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[10px] tracking-[0.5em] uppercase mb-3" style={{ color: '#C9A24A' }}>
            Verified Reviews
          </p>
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" style={{ color: '#C9A24A' }} />)}
            </div>
            <span className="font-serif font-bold text-white" style={{ fontSize: '1.3rem' }}>5.0</span>
          </div>
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Trusted by Torchbearers Nationwide
          </p>
        </motion.div>
      </div>

      {/* Scrolling reviews */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="p-6 flex flex-col"
              style={{ background: '#141414', border: '1px solid rgba(196,163,90,0.12)' }}
            >
              <Stars />
              <p className="font-heading text-sm flex-1 leading-relaxed mb-5" style={{ color: 'rgba(240,235,225,0.82)', fontWeight: 300, lineHeight: 1.8, fontStyle: 'italic' }}>
                "{r.text}"
              </p>
              <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(196,163,90,0.07)' }}>
                <span className="font-mono text-[10px] font-bold" style={{ color: 'rgba(255,255,255,0.75)' }}>{r.name}</span>
                <span className="font-mono text-[9px]" style={{ color: 'rgba(255,255,255,0.45)' }}>{r.location}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}