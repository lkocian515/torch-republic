import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    q: 'Is this instant coffee or ground coffee?',
    a: 'It\'s 100% instant coffee powder — not ground coffee, not pods. No coffee maker, grinder, French press, or brewer required. Simply scoop one serving into hot water or milk, stir for 10–15 seconds, and enjoy. It dissolves completely in under 30 seconds.',
  },
  {
    q: 'How do I make it?',
    a: 'Scoop one serving (approximately 2g) into your mug. Add 8–12 oz of hot water, oat milk, almond milk, or your preferred creamer. Stir for 10–15 seconds. Optionally add sweetener or ice. That\'s it — no equipment needed.',
  },
  {
    q: 'What does it taste like?',
    a: 'These blends are designed to taste like coffee first — smooth, clean, and roast-forward. The mushroom extracts complement the coffee flavor without tasting earthy or medicinal. Each blend has distinct notes: dark cocoa, light citrus, warm spice, or floral sweetness depending on the roast and blend.',
  },
  {
    q: 'Does it contain caffeine?',
    a: 'Yes. Each serving contains approximately 50–80mg of caffeine depending on the blend and roast level — comparable to a half-to-full cup of regular coffee. The functional mushroom extracts are caffeine-free.',
  },
  {
    q: 'Which blend should I choose?',
    a: 'GlowMind Clarity is best for focus and deep work. SunCap Rise is ideal for bright, energetic mornings. MoonCap Restore suits calm evenings and restoration. The Oracle supports creative and intuitive thinking. Mystic Bloom is made for gentle balance and daily wellness. DreamCap helps with calm, immersive focus and deep rest.',
  },
  {
    q: 'Where do I enter WELCOME10?',
    a: 'Enter code WELCOME10 in the discount field at the Shopify checkout page after you click "Add to Cart." It applies 10% off your first order.',
  },
  {
    q: 'How long does shipping take?',
    a: 'We ship from the USA. Standard shipping typically takes 3–7 business days. Orders over $75 ship free. For full details on shipping times, carriers, and return eligibility, visit the Shipping Policy linked in the footer.',
  },
  {
    q: 'What mushrooms are included?',
    a: 'Each blend contains Lion\'s Mane (Hericium erinaceus) and Chaga (Inonotus obliquus). Lion\'s Mane is associated with supporting focus and cognitive clarity. Chaga is rich in antioxidants and supports daily wellness. Both are dual-extracted for full-spectrum bioavailability.',
  },
  {
    q: 'How many servings are in each tube?',
    a: 'Each tube contains 27 servings (1.9 oz / 54g). At one serving per day, each tube lasts about four weeks.',
  },
  {
    q: 'Is there a monthly subscription?',
    a: 'Yes. Our Monthly Mushroom Coffee Subscription lets you choose 1–6 tubes per month and select the blends you want. You can adjust or cancel at any time through your Shopify account.',
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