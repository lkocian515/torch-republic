import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import FAQItem from '../components/mushroom/FAQItem';

const FAQ_DATA = [
  {
    question: 'What does Torch Republic Coffee Company sell?',
    answer: 'Torch Republic sells premium instant coffee, mushroom coffee blends, and matcha blends designed for simple daily rituals. All products are instant powders—no coffee maker needed.',
  },
  {
    question: 'Do all Torch Republic products contain mushrooms?',
    answer: 'No. Classic Coffee and Matcha products do not contain mushrooms. Only products in the Mushroom Coffee category contain Lion\'s Mane and Chaga mushrooms.',
  },
  {
    question: 'Which products are regular coffee?',
    answer: 'Torchbearer, Ember Reserve are Classic Instant Coffee products made from 100% premium Arabica coffee with no mushrooms.',
  },
  {
    question: 'Which products are mushroom coffee?',
    answer: 'GlowMind Clarity Blend, SunCap Rise, MoonCap Restore, DreamCap Blend, The Oracle Blend, and Mystic Bloom Blend are Mushroom Coffee products with Lion\'s Mane and Chaga.',
  },
  {
    question: 'Which products are matcha?',
    answer: 'The Monk, The Ascendant, and The Alchemist are Matcha products made from ceremonial grade matcha green tea.',
  },
  {
    question: 'Do I need a coffee maker?',
    answer: 'No. All Torch Republic products are instant. Just add hot or cold water, milk, or creamer, stir, and enjoy.',
  },
  {
    question: 'Can I drink them iced?',
    answer: 'Yes. All products can be prepared hot or iced. For iced drinks, mix with a small amount of warm water first, then add cold water, milk, or ice.',
  },
  {
    question: 'How many servings are in each tube?',
    answer: 'Most coffee products contain 27 servings. Matcha products contain 25 servings depending on the blend.',
  },
  {
    question: 'Are mushroom coffee products medical supplements?',
    answer: 'No. Torch Republic mushroom coffee blends are created for daily ritual and general wellness support. They are not intended to diagnose, treat, cure, or prevent any disease.',
  },
  {
    question: 'What shipping options do you offer?',
    answer: 'We offer free shipping on orders $45+. Standard shipping takes 3-5 business days within the continental U.S.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy. If you\'re not satisfied with your purchase, contact us within 30 days for a full refund.',
  },
];

export default function FAQ() {
  useSEO({
    title: 'FAQ | Mushroom Coffee, Instant Coffee & Matcha Questions Answered',
    description: "Everything you need to know about Torch Republic's mushroom coffee, instant coffee, and ceremonial matcha — ingredients, caffeine, how to prepare, subscriptions, shipping, and our 30-day guarantee.",
    url: '/faq',
    type: 'website',
    faq: FAQ_DATA.map(f => ({ question: f.question, answer: f.answer })),
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#111111' }}>
      {/* Hero */}
      <section style={{ background: '#080808', padding: 'clamp(60px,8vw,100px) 24px', borderBottom: '1px solid rgba(230,183,173,0.15)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="font-mono text-[9px] tracking-[0.45em] uppercase mb-4" style={{ color: '#E6B7AD' }}>
              Help & Information
            </p>
            <h1 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(2.2rem,4vw,3.2rem)', color: '#F5EFE6', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Frequently Asked Questions
            </h1>
            <p className="font-heading text-sm max-w-xl mx-auto" style={{ color: 'rgba(210,195,175,0.6)', fontWeight: 300, lineHeight: 1.8 }}>
              Everything you need to know about our products, preparation, and policies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Grid */}
      <section style={{ padding: 'clamp(60px,8vw,100px) 24px' }}>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {FAQ_DATA.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <FAQItem question={faq.question} answer={faq.answer} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section style={{ background: '#0A0A0A', padding: 'clamp(60px,8vw,100px) 24px', borderTop: '1px solid rgba(230,183,173,0.15)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.8rem,3vw,2.4rem)', color: '#F5EFE6' }}>
              Still Have Questions?
            </h2>
            <p className="font-heading text-sm mb-8" style={{ color: 'rgba(210,195,175,0.55)' }}>
              Our team is here to help you find the perfect ritual.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center font-mono text-[10px] tracking-[0.28em] uppercase font-bold transition-all hover:opacity-90"
              style={{ background: '#E6B7AD', color: '#050505', padding: '14px 36px', borderRadius: '999px' }}
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}