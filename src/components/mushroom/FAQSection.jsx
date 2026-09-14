import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    q: 'What is instant mushroom coffee?',
    a: "Instant mushroom coffee combines premium instant coffee with functional mushroom extracts — such as Lion's Mane and Chaga — into a single convenient powder. You simply stir one scoop into hot water and your ritual is ready. No machine, no pods, no complicated prep.",
  },
  {
    q: 'Does Torch Republic use coffee pods?',
    a: 'No. Torch Republic was specifically designed as a pod-free alternative. All blends come in reusable tubes as instant powder — just add hot water and stir. No machine required, no single-use plastic capsules.',
  },
  {
    q: 'How do I prepare it?',
    a: 'Add one scoop (included) to 8–10oz of hot water or your preferred milk. Stir for 10–15 seconds. Enjoy. That is it. You can also prepare it with cold water over ice.',
  },
  {
    q: 'How many servings are in each tube?',
    a: 'Classic coffee and mushroom coffee tubes contain approximately 27 servings. Matcha tubes contain approximately 25 servings.',
  },
  {
    q: 'When should I drink mushroom coffee?',
    a: "Mushroom coffee is a great morning ritual for focus and clarity — or a midday pick-up without the late-afternoon crash. Our lighter blends like SunCap Rise work well in the morning; restoration blends like MoonCap Restore suit calmer evening moments. Choose based on your intention for the day.",
  },
  {
    q: 'What is the difference between classic coffee, mushroom coffee, and matcha?',
    a: "Classic instant coffee is bold, clean, and caffeine-forward — no mushrooms, no additives. Mushroom coffee combines instant coffee with Lion's Mane and Chaga to support focus and daily wellness alongside the caffeine. Matcha is a separate category entirely — ceremonial grade matcha with calm, sustained energy and no coffee whatsoever.",
  },
  {
    q: 'Are the blends sweetened?',
    a: 'No. Torch Republic blends are unsweetened. You can sweeten to your preference with honey, sugar, or a milk of your choice. This keeps the ingredient list clean and the ritual personal.',
  },
  {
    q: 'Do these replace regular coffee?',
    a: 'For many Torchbearers, yes — they switch from pod coffee or drip machines entirely. Our instant blends are designed to deliver a satisfying, premium coffee experience without the equipment. Whether you replace or complement your existing ritual is up to you.',
  },
  {
    q: 'Is this a subscription?',
    a: 'Subscriptions are optional. You can purchase once or choose Subscribe & Save at checkout for 20% off every order. Subscriptions are flexible — cancel, pause, or change blends anytime.',
  },
  {
    q: 'How long does shipping take?',
    a: 'Most orders are processed within 1–3 business days and arrive within 3–7 business days depending on your location. You will receive a tracking confirmation by email.',
  },
  {
    q: 'What mushrooms are in the mushroom coffee blends?',
    a: "Every mushroom coffee blend contains Lion's Mane (Hericium erinaceus) and Chaga (Inonotus obliquus). These are two widely used functional mushrooms included to support focus, clarity, and daily wellness as part of your ritual.",
  },
  {
    q: 'Do I need a coffee machine?',
    a: 'No. Torch Republic products are instant and do not require a coffee maker, pod machine, espresso machine, or grinder. Just hot water and a scoop.',
  },
  {
    q: 'What is your satisfaction guarantee?',
    a: "We want your first Torch Republic ritual to feel easy, enjoyable, and worth coming back to. If something is not right with your order, contact us at info@torchrepublic.com and we will make it right.",
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