import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    q: 'Is Torch Republic Coffee Company still an apparel brand?',
    a: 'No. Torch Republic Coffee Company has been rebuilt as a premium instant mushroom coffee brand focused on Lion\'s Mane + Chaga coffee blends. We no longer sell apparel, bobbleheads, collectibles, or patriotic merchandise.',
  },
  {
    q: 'Is this ground coffee or instant coffee?',
    a: 'These are instant mushroom coffee blends. No coffee maker, grinder, or brewer is required. Simply add one serving to hot water or milk, stir, and enjoy.',
  },
  {
    q: 'What mushrooms are included?',
    a: 'The blends feature Lion\'s Mane + Chaga, incorporated into each instant coffee formula to support focus, flow, and a smooth daily ritual.',
  },
  {
    q: 'How many servings are in each tube?',
    a: 'Each tube contains 27 servings (1.9 oz / 54g).',
  },
  {
    q: 'Does it taste like mushrooms?',
    a: 'These blends are designed to taste like coffee first. The mushroom blend is worked into the formula to complement the coffee flavor, not overpower it.',
  },
  {
    q: 'Can I subscribe monthly?',
    a: 'Yes. The Monthly Mushroom Coffee Subscription lets you choose 1–6 tubes per month and select the blends you want delivered each month.',
  },
  {
    q: 'Can I drink it daily?',
    a: 'Use as directed on the package. If you are pregnant, nursing, sensitive to caffeine, taking medication, or managing a medical condition, please consult a qualified healthcare professional before use.',
  },
  {
    q: 'Is this a supplement?',
    a: 'Torch Republic products are instant mushroom coffee blends — they are not intended as a medical treatment, supplement, or cure for any condition. Statements have not been evaluated by the FDA.',
  },
  {
    q: 'Where can I contact support?',
    a: 'Email us at admin@torchrepublic.com or use the Contact page on this site. We\'re happy to help with orders, subscriptions, and product questions.',
  },
];

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div style={{ borderBottom: '1px solid rgba(230,183,173,0.1)' }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left transition-colors hover:opacity-80"
      >
        <span className="font-heading font-medium" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.85)' }}>
          {item.q}
        </span>
        <span className="flex-shrink-0" style={{ color: '#E6B7AD' }}>
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-5 font-heading text-sm leading-relaxed"
              style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 300 }}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section className="px-6 md:px-10 py-24" style={{ background: '#070707', borderTop: '1px solid rgba(201,162,74,0.08)' }}>
      <div className="max-w-[760px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4"
            style={{ color: 'rgba(230,183,173,0.65)' }}>FAQ</p>
          <h2 className="font-serif font-bold"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Common Questions
          </h2>
        </motion.div>

        <div>
          {FAQS.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}