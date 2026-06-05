import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    q: 'What is mushroom coffee?',
    a: 'Mushroom coffee is instant coffee blended with functional mushroom extracts. Torch Republic blends use Lion\'s Mane + Chaga — two well-known functional mushrooms — worked into a premium instant coffee base. You get the taste and ritual of real coffee with the added benefit of functional mushrooms.',
  },
  {
    q: 'Is this instant coffee or ground coffee?',
    a: 'It\'s 100% instant coffee powder. No coffee maker, grinder, or brewer required. Simply scoop one serving into hot water or milk, stir for 10–15 seconds, and enjoy. It dissolves completely in about 30 seconds.',
  },
  {
    q: 'What does it taste like?',
    a: 'These blends are designed to taste like coffee first — smooth, clean, and roast-forward. The mushroom extracts complement the coffee flavor without tasting earthy or medicinal. Each blend has distinct notes: dark cocoa, light citrus, warm spice, or floral sweetness depending on the roast.',
  },
  {
    q: 'What mushrooms are included?',
    a: 'Each blend contains Lion\'s Mane (Hericium erinaceus) and Chaga (Inonotus obliquus). Lion\'s Mane is known for supporting focus and cognitive clarity. Chaga is rich in antioxidants and supports daily wellness. Both are dual-extracted for full-spectrum bioavailability.',
  },
  {
    q: 'How do I use it?',
    a: 'Scoop one serving (approximately 2g) into your mug. Add 8–12 oz of hot water, oat milk, almond milk, or your preferred creamer. Stir for 10–15 seconds. Optionally add sweetener or ice. That\'s it — no equipment needed.',
  },
  {
    q: 'Which blend is right for me?',
    a: 'GlowMind is best for focus and deep work. SunCap Rise is ideal for bright, energetic mornings. MoonCap Restore suits calm evenings and restoration. The Oracle supports creative and intuitive thinking. Mystic Bloom is made for gentle self-care mornings. DreamCap helps with calm, immersive focus sessions.',
  },
  {
    q: 'How many servings are in each tube?',
    a: 'Each tube contains 27 servings (1.9 oz / 54g). At one serving per day, each tube lasts about four weeks.',
  },
  {
    q: 'Does it contain caffeine?',
    a: 'Yes. Each serving contains approximately 50–80mg of caffeine depending on the blend and roast level — comparable to a half-to-full cup of regular coffee. The mushroom extracts are caffeine-free.',
  },
  {
    q: 'Do you offer a monthly subscription?',
    a: 'Yes. The Monthly Mushroom Coffee Subscription lets you choose 1–6 tubes per month and select the blends you want. You can adjust or cancel at any time through your Shopify account.',
  },
  {
    q: 'Is there a first-order discount?',
    a: 'Yes — new customers can use code WELCOME10 at checkout for 10% off their first order. Enter the code at the Shopify checkout page.',
  },
  {
    q: 'What is your shipping and return policy?',
    a: 'We ship from the USA. Orders over $75 ship free. For detailed shipping times, return eligibility, and refund information, visit our Shipping and Return Policy pages linked in the footer.',
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
    <section className="px-5 md:px-10 py-14 md:py-20" style={{ background: '#151515', borderTop: '1px solid rgba(230,183,173,0.06)' }}>
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
            style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.6rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
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