import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

const RG = '#E6B7AD';

const SNIPPETS = [
  { text: 'No crash. Just clean focus.', author: 'Sarah M.' },
  { text: 'Tastes like real coffee.', author: 'Michael R.' },
  { text: 'My new morning ritual.', author: 'Jennifer L.' },
  { text: 'Finally a mushroom coffee that tastes good.', author: 'David K.' },
  { text: 'Smooth, no bitterness at all.', author: 'Amanda T.' },
  { text: 'Replaced my espresso machine.', author: 'James P.' },
  { text: 'Perfect for my morning meditation.', author: 'Lisa C.' },
  { text: 'Game-changer for my workdays.', author: 'Robert S.' },
];

export default function CartReviewSnippets() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SNIPPETS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const snippet = SNIPPETS[index];

  return (
    <div className="p-4 mb-4" style={{ background: 'rgba(230,183,173,0.03)', border: '1px solid rgba(230,183,173,0.1)' }}>
      <div className="flex items-center gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3 h-3 fill-current" style={{ color: RG }} />
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.4 }}
        >
          <p className="font-serif text-sm italic mb-1" style={{ color: 'rgba(245,239,230,0.85)' }}>
            "{snippet.text}"
          </p>
          <p className="font-mono text-[8px] tracking-[0.15em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>
            — {snippet.author}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}