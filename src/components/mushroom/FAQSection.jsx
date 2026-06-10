import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    q: 'What is Torch Republic Coffee Co.?',
    a: 'Torch Republic Coffee Co. is a conscious instant coffee brand offering premium instant coffee, mushroom coffee, and matcha for clarity, calm energy, and intentional daily rituals.',
  },
  {
    q: 'Is this coffee instant?',
    a: 'Yes. Our coffee products are designed for instant preparation. Just add hot water, stir for 10–15 seconds, and enjoy. No brewer, grinder, pods, or machines needed.',
  },
  {
    q: 'Do I need a coffee maker?',
    a: 'No. Torch Republic products are made for simple preparation without machines or pods. Add hot water, stir, and begin — that\'s the entire process.',
  },
  {
    q: 'Does every blend contain mushrooms?',
    a: 'No. We offer three categories: classic instant coffee, mushroom coffee, and matcha. Only the mushroom coffee blends contain functional mushrooms. Classic and matcha blends are mushroom-free.',
  },
  {
    q: 'What does mushroom coffee taste like?',
    a: 'Our mushroom coffee is designed to be coffee-forward, smooth, and easy to drink. The goal is a familiar coffee experience with added functional ingredients — not an earthy or medicinal taste.',
  },
  {
    q: 'What mushrooms are used?',
    a: "Every mushroom coffee blend contains Lion's Mane (Hericium erinaceus) and Chaga (Inonotus obliquus). These are two of the most widely used functional mushrooms in traditional wellness, crafted to support focus, clarity, and daily energy.",
  },
  {
    q: 'How much caffeine is in each serving?',
    a: "Mushroom coffee blends contain approximately 50–80mg of caffeine per serving. Classic instant coffee blends contain approximately 80–100mg. Matcha blends contain approximately 25–40mg — offering calm, sustained energy without a sharp spike.",
  },
  {
    q: 'How many servings are in each tube?',
    a: 'Mushroom coffee and classic coffee tubes contain 27 servings. Matcha tubes contain 25 servings. At one serving per day, each tube lasts approximately four weeks.',
  },
  {
    q: 'Do you offer subscriptions?',
    a: 'Yes. Customers can use Subscribe & Save to receive their favorite blends regularly and save 20% on every order. You can cancel, pause, or change your blends anytime.',
  },
  {
    q: 'What is your satisfaction guarantee?',
    a: "We stand behind every blend with a 30-day satisfaction guarantee. If you're not happy with your order, contact us at admin@torchrepublic.com and we'll make it right.",
  },
  {
    q: 'Are these products FDA approved?',
    a: 'These statements have not been evaluated by the FDA. Torch Republic products are not intended to diagnose, treat, cure, or prevent any disease. Consult a healthcare professional before use if you are pregnant, nursing, or managing a medical condition.',
  },
];

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div style={{ borderBottom: '1px solid rgba(230,183,173,0.1)' }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left transition-colors hover:opacity-80"
      >
        <span className="font-heading font-medium" style={{ fontSize: '0.95rem', color: 'rgba(250,245,235,0.95)' }}>
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
              style={{ color: 'rgba(250,245,235,0.75)', fontWeight: 300 }}>
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
    <section className="px-5 md:px-10 py-14 md:py-20" style={{ background: '#151515', position: 'relative' }}>
      <div className="divider-gradient absolute top-0 left-0 right-0" />
      <div className="max-w-[720px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="font-mono text-[8px] tracking-[0.6em] uppercase mb-3"
            style={{ color: 'rgba(230,183,173,0.5)' }}>FAQ</p>
          <h2 className="font-serif font-bold"
            style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.6rem)', color: '#F5EFE6', letterSpacing: '-0.02em' }}>
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