import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    q: 'What is mushroom coffee?',
    a: 'Mushroom coffee is a blend of real coffee and functional mushroom extracts. Torch Republic uses premium instant coffee powder combined with Lion\'s Mane and Chaga — two of the most widely used functional mushrooms in traditional wellness. The result is smooth, great-tasting coffee with added daily wellness support.',
  },
  {
    q: 'Is Torch Republic instant or ground coffee?',
    a: 'It\'s 100% instant coffee powder — not ground coffee, not pods, not capsules. No coffee maker, grinder, or brewer needed. Just add hot water, stir for 10–15 seconds, and enjoy. It dissolves completely in under 30 seconds.',
  },
  {
    q: 'How do I make it?',
    a: 'Scoop one serving (approximately 2g) into your mug. Add 8–12 oz of hot water, oat milk, almond milk, or your preferred creamer. Stir for 10–15 seconds. Optionally add sweetener or ice. That\'s it — no equipment needed.',
  },
  {
    q: 'Does it taste like mushrooms?',
    a: 'No. Torch Republic blends are designed to taste like coffee first — smooth, clean, and roast-forward. The functional mushroom extracts complement the coffee flavor without tasting earthy or medicinal. Each blend has its own character: dark cocoa, light citrus, warm spice, or floral sweetness.',
  },
  {
    q: 'Does it contain caffeine?',
    a: 'Yes. Each serving contains approximately 50–80mg of caffeine depending on the blend — comparable to a half-to-full cup of regular coffee. The functional mushroom extracts themselves are caffeine-free.',
  },
  {
    q: 'Which blend should I start with?',
    a: 'GlowMind Clarity is best for focus and deep work. SunCap Rise is ideal for bright, energetic mornings. MoonCap Restore suits calm evenings and restoration. The Oracle supports creative and intuitive thinking. Mystic Bloom is crafted for daily balance and wellness. DreamCap is designed for rest and recovery. Not sure? The 6-Blend Bundle is the perfect way to try them all.',
  },
  {
    q: 'What mushrooms are used?',
    a: 'Every Torch Republic blend contains Lion\'s Mane (Hericium erinaceus) and Chaga (Inonotus obliquus). Lion\'s Mane has been used in traditional wellness practices for centuries and is widely associated with focus and cognitive clarity. Chaga is rich in antioxidants and supports daily immune and overall wellness.',
  },
  {
    q: 'Can I drink it every day?',
    a: 'Yes — Torch Republic is designed to be your everyday ritual. One serving per day is the standard serving. As always, consult a healthcare professional if you are pregnant, nursing, or managing a medical condition.',
  },
  {
    q: 'Is this a replacement for regular coffee?',
    a: 'It can be. Torch Republic blends are designed to stand on their own as a satisfying daily coffee — just with added functional mushroom support. Many customers replace their morning coffee entirely, while others enjoy it as a lighter afternoon option.',
  },
  {
    q: 'How many servings are in each tube?',
    a: 'Each tube contains 27 servings (1.9 oz / 54g). At one serving per day, each tube lasts approximately four weeks.',
  },
  {
    q: 'Do you offer a satisfaction guarantee?',
    a: 'Yes. We stand behind our blends with a 30-day satisfaction guarantee. If you\'re not happy with your order, reach out to us at admin@torchrepublic.com and we\'ll make it right. See the Return Policy in the footer for full details.',
  },
  {
    q: 'Are these products FDA approved?',
    a: 'Torch Republic products are instant mushroom coffee blends and are not intended to diagnose, treat, cure, or prevent any disease. Statements on this site have not been evaluated by the FDA. Consult a healthcare professional before use if you are pregnant, nursing, or managing a medical condition.',
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
            Mushroom Coffee FAQ
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