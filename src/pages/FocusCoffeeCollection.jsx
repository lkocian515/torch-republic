/**
 * Focus Coffee Collection Page
 * Route: /shop/focus-coffee
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSEO } from '@/hooks/useSEO';
import { ArrowRight, CheckCircle, Brain } from 'lucide-react';
import MushroomProductCard from '@/components/mushroom/ProductCard';
import CollectionIntro from '@/components/collection/CollectionIntro';
import SelectionAid from '@/components/collection/SelectionAid';
import CollectionCrossLink from '@/components/collection/CollectionCrossLink';
import { ritualCards } from '@/lib/collectionRitualProducts';

const ACCENT = '#9B4E2F';

const FOCUS_PRODUCTS = [
  { name: 'GlowMind Clarity', path: '/products/glowmind-clarity-instant-mushroom-coffee' },
  { name: 'The Monk', path: '/products/the-monk-matcha-blend' },
  { name: 'SunCap Rise', path: '/products/suncap-rise-instant-mushroom-coffee' },
];
const FOCUS_CARDS = ritualCards(FOCUS_PRODUCTS);

const FAQS = [
  { q: 'What is the best coffee for focus and concentration?', a: 'GlowMind Clarity combines premium Arabica instant coffee with Lion’s Mane, Cordyceps and Reishi, made for focused deep-work sessions. No machine required.' },
  { q: 'Is there a caffeine-free option for focus?', a: 'The Monk is a ceremonial matcha with naturally occurring caffeine and L-theanine for a calmer, steadier kind of focus than coffee.' },
  { q: 'How many servings are in each tube?', a: 'Coffee blends contain 27 servings per tube; matcha contains 25 servings per tin.' },
];

export default function FocusCoffeeCollection() {
  const [openFaq, setOpenFaq] = useState(null);

  useSEO({
    title: 'Best Coffee for Focus | Mushroom Coffee for Concentration | Torch Republic',
    description: "Best coffee for focus and concentration,  Lion's Mane mushroom coffee, ceremonial matcha with L-theanine, and premium instant coffee blends designed for deep work and mental clarity.",
    url: '/shop/focus-coffee',
    type: 'website',
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Shop', url: '/shop' }, { name: 'Focus Coffee', url: '/shop/focus-coffee' }],
    faq: [
      { question: 'What is the best coffee for focus and concentration?', answer: "GlowMind Clarity combines premium Arabica instant coffee with Lion's Mane, Cordyceps and Reishi,  designed for focused deep work sessions." },
      { question: "Is there a lower-caffeine option for focus?", answer: "The Monk is a ceremonial matcha with naturally occurring caffeine and L-theanine, traditionally associated with a calmer, more focused energy." },
    ],
  });

  return (
    <div className="min-h-screen" style={{ background: '#F7F2E9' }}>
      {/* Hero */}
      <section className="px-6 md:px-10 pt-16 pb-12 text-center" style={{ background: '#F7F2E9', borderBottom: `1px solid ${ACCENT}22` }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5" style={{ background: `${ACCENT}12`, border: `1px solid ${ACCENT}30` }}>
            <Brain size={12} style={{ color: ACCENT }} />
            <span className="eyebrow" style={{ color: ACCENT }}>Focus Coffee Collection</span>
          </div>
          <h1 className="h1 mb-5">Coffee Designed for Deep Focus</h1>
          <p className="body-lg mb-8">
            Not all coffee supports the same kind of work. These blends pair premium instant coffee and ceremonial matcha with Lion’s Mane, Cordyceps and Reishi for mornings built around attention and presence.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/build-your-ritual" className="btn btn-primary">
              Build Focus Bundle <ArrowRight size={14} />
            </Link>
            <Link to="/quiz" className="btn btn-ghost">
              Find My Blend
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Trust Strip */}
      <div className="px-6 py-4" style={{ background: '#F7F2E9', borderBottom: `1px solid ${ACCENT}18` }}>
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {['Lion’s Mane + Cordyceps + Reishi', 'No machine needed', '27 servings per tube', 'Subscribe & save 20%'].map((t, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckCircle size={12} style={{ color: ACCENT }} />
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: '#5E4639' }}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <section className="px-6 md:px-10 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <CollectionIntro
              eyebrow="The Collection"
              title="Focus Blends"
              intro="Mushroom coffee and ceremonial matcha made for attention. Coffee blends include Lion’s Mane, Cordyceps and Reishi; The Monk offers ceremonial matcha with naturally occurring L-theanine."
              accent={ACCENT}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FOCUS_CARDS.map((product, i) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <MushroomProductCard product={product} index={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Selection aid + cross-link */}
      <section className="px-6 md:px-10 py-14" style={{ background: '#F7F2E9' }}>
        <SelectionAid
          accent={ACCENT}
          items={[
            { if: 'you want focus for deep work', pick: 'GlowMind Clarity', to: '/products/glowmind-clarity-instant-mushroom-coffee' },
            { if: 'you want calm, present focus', pick: 'The Monk', to: '/products/the-monk-matcha-blend' },
            { if: 'you want focus with morning energy', pick: 'SunCap Rise', to: '/products/suncap-rise-instant-mushroom-coffee' },
          ]}
        />
        <div className="mt-8">
          <CollectionCrossLink to="/ingredients/lions-mane-mushroom-coffee" label="Read the Lion’s Mane ingredient guide" sub="What’s in our mushroom coffee, and how it’s sourced." accent={ACCENT} />
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-10 py-16" style={{ background: '#F7F2E9', borderTop: `1px solid ${ACCENT}18` }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="eyebrow mb-3" style={{ color: ACCENT }}>Questions</p>
            <h2 className="h2">Frequently Asked Questions</h2>
          </div>
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="card-torch p-5">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between text-left" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                  <span className="font-serif font-bold" style={{ fontSize: '1.05rem', color: '#32190F' }}>{faq.q}</span>
                  <span className="font-mono text-lg" style={{ color: ACCENT }}>{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 pt-4" style={{ borderTop: `1px solid ${ACCENT}18` }}>
                    <p className="font-heading text-sm" style={{ color: '#5E4639', lineHeight: 1.8 }}>{faq.a}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
          <p className="font-mono text-[8px] tracking-[0.15em] text-center mt-6" style={{ color: '#8A7D72' }}>
            These statements have not been evaluated by the FDA. Products are not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 md:px-10 py-16 text-center" style={{ background: '#F7F2E9', borderTop: `1px solid ${ACCENT}18` }}>
        <div className="max-w-xl mx-auto">
          <h2 className="h2 mb-4">Build a focus ritual.</h2>
          <p className="body-lg mb-8">Any 3 blends for $49.99. Free shipping $45+. 30-day satisfaction guarantee.</p>
          <Link to="/build-your-ritual" className="btn btn-primary">
            Build My Focus Bundle <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}