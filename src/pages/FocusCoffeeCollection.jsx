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
import { SUBSCRIBE_SAVE_PERCENT, FREE_SHIPPING_THRESHOLD_DISPLAY } from '@/lib/siteConfig';

const ACCENT = '#B7653E';

const FOCUS_PRODUCTS = [
  { name: 'Instant Mushroom Coffee', path: '/products/instant-mushroom-coffee' },
  { name: 'Instant Classic Coffee', path: '/products/instant-classic-coffee' },
  { name: 'Torch Republic Coffee Duo', path: '/products/torch-republic-coffee-duo' },
];
const FOCUS_CARDS = ritualCards(FOCUS_PRODUCTS);

const FAQS = [
  { q: 'What is the best coffee for focus and concentration?', a: 'Instant Mushroom Coffee combines premium Arabica instant coffee with Lion’s Mane and Chaga, made for focused deep-work sessions. No machine required.' },
  { q: 'Is there a lower-caffeine option for focus?', a: 'Instant Mushroom Coffee is medium caffeine; Instant Classic Coffee is higher. Both are instant, so no brewing equipment is needed.' },
  { q: 'How many servings are in each pouch?', a: 'Each pouch contains 27 servings.' },
];

export default function FocusCoffeeCollection() {
  const [openFaq, setOpenFaq] = useState(null);

  useSEO({
    title: 'Best Coffee for Focus | Mushroom Coffee for Concentration | Torch Republic',
    description: "Best coffee for focus and concentration — Lion's Mane and Chaga mushroom coffee and premium instant coffee, designed for deep work and mental clarity.",
    url: '/shop/focus-coffee',
    type: 'website',
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Shop', url: '/shop' }, { name: 'Focus Coffee', url: '/shop/focus-coffee' }],
    faq: [
      { question: 'What is the best coffee for focus and concentration?', answer: "Instant Mushroom Coffee combines premium Arabica instant coffee with Lion's Mane and Chaga — designed for focused deep work sessions." },
      { question: "Is there a lower-caffeine option for focus?", answer: "Instant Mushroom Coffee is medium caffeine and Instant Classic Coffee is higher. Both are instant, so no brewing equipment is needed." },
    ],
  });

  return (
    <div className="min-h-screen" style={{ background: '#F7F1E7' }}>
      {/* Hero */}
      <section className="px-6 md:px-10 pt-16 pb-12 text-center" style={{ background: '#FBF8F1', borderBottom: `1px solid ${ACCENT}22` }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5" style={{ background: `${ACCENT}12`, border: `1px solid ${ACCENT}30` }}>
            <Brain size={12} style={{ color: ACCENT }} />
            <span className="eyebrow" style={{ color: ACCENT }}>Focus Coffee Collection</span>
          </div>
          <h1 className="h1 mb-5">Coffee Designed for Deep Focus</h1>
          <p className="body-lg mb-8">
            Not all coffee supports the same kind of work. Instant Mushroom Coffee pairs premium instant coffee with Lion’s Mane and Chaga for mornings built around attention and presence.
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
      <div className="px-6 py-4" style={{ background: '#FBF8F1', borderBottom: `1px solid ${ACCENT}18` }}>
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {['Lion’s Mane + Chaga', 'No machine needed', '27 servings per pouch', `Subscribe & save ${SUBSCRIBE_SAVE_PERCENT}%`].map((t, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckCircle size={12} style={{ color: ACCENT }} />
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: '#5F574F' }}>{t}</span>
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
              intro="Instant coffee made for attention. Instant Mushroom Coffee pairs Lion’s Mane and Chaga with premium Arabica; Instant Classic Coffee keeps it simple."
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
      <section className="px-6 md:px-10 py-14" style={{ background: '#FBF8F1' }}>
        <SelectionAid
          accent={ACCENT}
          items={[
            { if: 'you want focus for deep work', pick: 'Instant Mushroom Coffee', to: '/products/instant-mushroom-coffee' },
            { if: 'you want a straightforward classic cup', pick: 'Instant Classic Coffee', to: '/products/instant-classic-coffee' },
            { if: 'you want both in one order', pick: 'Torch Republic Coffee Duo', to: '/products/torch-republic-coffee-duo' },
          ]}
        />
        <div className="mt-8">
          <CollectionCrossLink to="/ingredients/lions-mane-mushroom-coffee" label="Read the Lion’s Mane ingredient guide" sub="What’s in our mushroom coffee, and how it’s sourced." accent={ACCENT} />
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-10 py-16" style={{ background: '#F7F1E7', borderTop: `1px solid ${ACCENT}18` }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="eyebrow mb-3" style={{ color: ACCENT }}>Questions</p>
            <h2 className="h2">Frequently Asked Questions</h2>
          </div>
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="card-torch p-5">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between text-left" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                  <span className="font-serif font-bold" style={{ fontSize: '1.05rem', color: '#292622' }}>{faq.q}</span>
                  <span className="font-mono text-lg" style={{ color: ACCENT }}>{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 pt-4" style={{ borderTop: `1px solid ${ACCENT}18` }}>
                    <p className="font-heading text-sm" style={{ color: '#5F574F', lineHeight: 1.8 }}>{faq.a}</p>
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
      <section className="px-6 md:px-10 py-16 text-center" style={{ background: '#FBF8F1', borderTop: `1px solid ${ACCENT}18` }}>
        <div className="max-w-xl mx-auto">
          <h2 className="h2 mb-4">Build a focus ritual.</h2>
          <p className="body-lg mb-8">Two instant coffees. Free shipping {FREE_SHIPPING_THRESHOLD_DISPLAY}. 30-day satisfaction guarantee.</p>
          <Link to="/build-your-ritual" className="btn btn-primary">
            Build My Focus Bundle <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}