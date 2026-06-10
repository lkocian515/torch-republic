import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    q: 'Is Torch Republic instant coffee?',
    a: 'Yes. Our blends are designed to be simple daily rituals — just add hot water or milk, stir, and enjoy. No brewer, grinder, pods, or machines needed.',
  },
  {
    q: 'Do all Torch Republic products contain mushrooms?',
    a: 'No. Torch Republic includes classic instant coffee, mushroom coffee, and matcha. Each product page clearly explains what is inside. Only the mushroom coffee blends contain functional mushrooms.',
  },
  {
    q: 'How many servings are in each tube?',
    a: 'Most blends contain approximately 25–27 servings depending on the product. Classic coffee and mushroom coffee tubes contain 27 servings. Matcha tubes contain 25 servings.',
  },
  {
    q: 'Do I need a coffee machine?',
    a: 'No. Torch Republic products are instant and do not require a coffee maker, pod machine, or grinder. Simply add one scoop to hot water, stir for 10–15 seconds, and your ritual is ready.',
  },
  {
    q: 'What should I start with?',
    a: 'If you are new to Torch Republic, we recommend starting with a ritual bundle so you can experience different blends for different parts of your day — morning energy, afternoon focus, or an evening wind-down.',
  },
  {
    q: 'What does mushroom coffee taste like?',
    a: 'Our mushroom coffee is designed to be coffee-forward, smooth, and familiar. The mushroom extracts support function without drastically changing the flavor. It tastes like a good, smooth cup of coffee.',
  },
  {
    q: 'What mushrooms are used in the mushroom coffee blends?',
    a: "Every mushroom coffee blend contains Lion's Mane (Hericium erinaceus) and Chaga (Inonotus obliquus) — two widely used functional mushrooms crafted to support focus, clarity, and daily energy.",
  },
  {
    q: 'How much caffeine is in each serving?',
    a: 'Mushroom coffee blends contain approximately 50–80mg per serving. Classic instant coffee contains approximately 80–100mg. Matcha blends contain approximately 25–40mg for calm, sustained energy.',
  },
  {
    q: 'Do you offer subscriptions?',
    a: 'Yes. Choose Subscribe & Save at checkout to receive your favorite blends regularly and save 20% on every order. You can cancel, pause, or change your blends anytime.',
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
        <span className="font-heading font-medium" style={{ fontSize: '1rem', color: 'rgba(250,245,235,0.95)' }}>
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
            <p className="pb-5 font-heading text-sm leading-relaxed" style={{ color: 'rgba(250,245,235,0.8)', fontWeight: 400 }}>
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
    <section className="px-5 md:px-10 py-14 md:py-20 relative" style={{ background: '#151515' }}>
      <div className="divider-gradient absolute top-0 left-0 right-0" />
      <div className="max-w-[720px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.5)' }}>FAQ</p>
          <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.6rem)', color: '#F5EFE6', letterSpacing: '-0.02em' }}>
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