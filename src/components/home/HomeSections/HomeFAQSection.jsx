import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    q: 'Does it actually taste like coffee?',
    a: "Yes — and that was non-negotiable for us. Torch Republic blends are premium instant coffee first. The mushroom extracts are flavorless in the dose we use, so you get bold, smooth coffee with zero earthy or medicinal aftertaste.",
  },
  {
    q: 'How much caffeine is in each serving?',
    a: "Each serving contains approximately 70–90mg of caffeine — roughly the equivalent of one strong cup of coffee. The combination with Lion's Mane and Chaga tends to produce a smoother, more sustained energy response than regular coffee alone.",
  },
  {
    q: 'How do I make it?',
    a: "Add one scoop (approx. 2g) to 8–12 oz of hot water, milk, or your preferred creamer and stir until dissolved. For iced drinks, dissolve in 2–3 oz of hot water first, then pour over ice. No brewer, no equipment needed.",
  },
  {
    q: 'Are the mushrooms real extracts — or just powder?',
    a: "Real dual-extracted mushroom extracts. We use hot-water and alcohol extraction to ensure both the water-soluble beta-glucans and fat-soluble triterpenes are bioavailable in your cup.",
  },
  {
    q: 'Can I take it every day?',
    a: "Absolutely — that's the intention. Both Lion's Mane and Chaga show the most pronounced benefits with consistent daily use over time. Each tube gives you 27 servings, so about a month of daily ritual.",
  },
  {
    q: "What's your return policy?",
    a: "We stand behind every tube with a 30-day satisfaction guarantee. If you're not happy, contact us and we'll make it right — no questions, no hassle.",
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-5 text-left transition-colors"
        style={{ background: 'none', border: 'none', color: open ? '#F7F1E8' : 'rgba(247,241,232,0.6)' }}
      >
        <span className="font-heading font-medium text-sm pr-6" style={{ lineHeight: 1.5 }}>{q}</span>
        <span className="font-mono text-xl flex-shrink-0" style={{ color: '#E6B7AD' }}>{open ? '−' : '+'}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            key="answer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="pb-5 overflow-hidden"
          >
            <p className="font-heading text-sm" style={{ color: 'rgba(247,241,232,0.45)', fontWeight: 300, lineHeight: 1.8 }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HomeFAQSection() {
  return (
    <section className="py-24 px-6 md:px-10" style={{ background: '#080808', borderTop: '1px solid rgba(230,183,173,0.06)' }}>
      <div className="max-w-[760px] mx-auto">
        <div className="text-center mb-14">
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.45)' }}>
            FAQ
          </p>
          <h2 className="font-serif font-bold text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>
            Questions, Answered
          </h2>
        </div>

        <div>
          {FAQS.map(faq => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}
        </div>
      </div>
    </section>
  );
}