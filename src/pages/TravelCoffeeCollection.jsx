/**
 * Travel Coffee Collection Page
 * Route: /shop/travel-coffee
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSEO } from '@/hooks/useSEO';
import { ArrowRight, CheckCircle, Plane } from 'lucide-react';
import MushroomProductCard from '@/components/mushroom/ProductCard';
import CollectionIntro from '@/components/collection/CollectionIntro';
import SelectionAid from '@/components/collection/SelectionAid';
import CollectionCrossLink from '@/components/collection/CollectionCrossLink';
import { ritualCards } from '@/lib/collectionRitualProducts';

const ACCENT = '#B7653E';

const TRAVEL_PRODUCTS = [
  { name: 'Ember Reserve', path: '/products/ember-rise-instant-coffee' },
  { name: 'Torchbearer', path: '/products/torchbearer-instant-coffee' },
  { name: 'GlowMind Clarity', path: '/products/glowmind-clarity-instant-mushroom-coffee' },
];
const TRAVEL_CARDS = ritualCards(TRAVEL_PRODUCTS);

const TRAVEL_SCENARIOS = [
  { icon: '✈️', title: 'Air Travel', tip: 'Powder format — no liquids. One tube fits in a carry-on pocket.' },
  { icon: '🏕️', title: 'Camping & Outdoors', tip: 'Works with any hot water source — camp stove, jetboil, or thermos. Zero cleanup.' },
  { icon: '🏨', title: 'Hotels', tip: 'Skip the in-room pod machine. Your tube delivers 27 cups for about $0.85 each.' },
  { icon: '🚗', title: 'Road Trips', tip: 'Gas station hot water, your travel mug, your own ritual anywhere on the road.' },
  { icon: '💼', title: 'Office & Work', tip: 'Desk drawer and kitchen hot water — better than the office pod machine, no extra gear.' },
  { icon: '🎒', title: 'Backpacking', tip: 'Weighs grams, takes no space. The only coffee format that makes sense in a pack.' },
];

const FAQS = [
  { q: 'What is the best coffee to travel with?', a: 'Premium instant coffee is ideal for travel — no machine, TSA-friendly powder format, lightweight, and works with any hot water. Torch Republic tubes hold 27 servings at about $0.85 per cup.' },
  { q: 'Can you take instant coffee through airport security?', a: 'Yes. Instant coffee powder is a dry solid and is not subject to TSA liquid restrictions. A tube can go in your carry-on.' },
  { q: 'How many cups are in a tube?', a: 'Each tube contains 27 servings of instant coffee (25 for matcha).' },
];

export default function TravelCoffeeCollection() {
  const [openFaq, setOpenFaq] = useState(null);

  useSEO({
    title: 'Best Travel Coffee | No-Machine Instant Coffee for Trips | Torch Republic',
    description: 'The best coffee for travel — premium instant coffee that works in hotels, camping, airports, and road trips. No machine, no pods, no cleanup. 27 servings per tube.',
    url: '/shop/travel-coffee',
    type: 'website',
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Shop', url: '/shop' }, { name: 'Travel Coffee', url: '/shop/travel-coffee' }],
    faq: [
      { question: 'What is the best coffee to travel with?', answer: 'Premium instant coffee is the ideal travel coffee — no machine required, TSA-friendly powder format, lightweight, and works with any hot water source. Torch Republic tubes deliver 27 servings at about $0.85/cup.' },
      { question: 'Can you take instant coffee through airport security?', answer: 'Yes. Instant coffee powder is a solid/dry material and is not subject to TSA liquid restrictions. A tube of Torch Republic instant coffee can go in your carry-on.' },
    ],
  });

  return (
    <div className="min-h-screen" style={{ background: '#F7F1E7' }}>
      {/* Hero */}
      <section className="px-6 md:px-10 pt-16 pb-12 text-center" style={{ background: '#FBF8F1', borderBottom: `1px solid ${ACCENT}22` }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5" style={{ background: `${ACCENT}12`, border: `1px solid ${ACCENT}30` }}>
            <Plane size={12} style={{ color: ACCENT }} />
            <span className="eyebrow" style={{ color: ACCENT }}>Travel Coffee Collection</span>
          </div>
          <h1 className="h1 mb-5">Your Ritual Doesn’t Stop When You Travel</h1>
          <p className="body-lg mb-8">
            Instant powder. No machine. No pods. Works in any hotel room, campsite, car, or airport with nothing but hot water. TSA-friendly. 27 cups per tube.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/shop" className="btn btn-primary">
              Shop All Blends <ArrowRight size={14} />
            </Link>
            <Link to="/build-your-ritual" className="btn btn-ghost">
              Build Travel Bundle
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Travel Scenarios */}
      <section className="px-6 md:px-10 py-14" style={{ background: '#F7F1E7' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="eyebrow mb-3" style={{ color: ACCENT }}>Wherever You Are</p>
            <h2 className="h2">Coffee That Goes Where You Go</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {TRAVEL_SCENARIOS.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="card-torch p-5">
                <p className="text-xl mb-3">{s.icon}</p>
                <p className="font-serif font-bold mb-2" style={{ color: '#292622', fontSize: '0.95rem' }}>{s.title}</p>
                <p className="font-heading text-xs" style={{ color: '#5F574F', lineHeight: 1.75 }}>{s.tip}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="px-6 md:px-10 py-16" style={{ background: '#FBF8F1', borderTop: `1px solid ${ACCENT}18` }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <CollectionIntro
              eyebrow="The Collection"
              title="Best Travel Blends"
              intro="Premium instant coffee that dissolves in any hot water. Pick the profile that fits how you move — smooth and versatile, bold, or focused."
              accent={ACCENT}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRAVEL_CARDS.map((product, i) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <MushroomProductCard product={product} index={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Selection aid + cross-link */}
      <section className="px-6 md:px-10 py-14" style={{ background: '#F7F1E7' }}>
        <SelectionAid
          accent={ACCENT}
          items={[
            { if: 'you want a versatile all-purpose cup', pick: 'Ember Reserve', to: '/products/ember-rise-instant-coffee' },
            { if: 'you want bold coffee anywhere', pick: 'Torchbearer', to: '/products/torchbearer-instant-coffee' },
            { if: 'you want focus on travel days', pick: 'GlowMind Clarity', to: '/products/glowmind-clarity-instant-mushroom-coffee' },
          ]}
        />
        <div className="mt-8">
          <CollectionCrossLink to="/build-your-ritual" label="Build Your Travel Bundle" sub="Any 3 blends for $49.99 — one for mornings, one for travel, one for evenings." accent={ACCENT} />
        </div>
      </section>

      {/* Why instant for travel */}
      <section className="px-6 md:px-10 py-14" style={{ background: '#FBF8F1', borderTop: `1px solid ${ACCENT}18` }}>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card-torch p-6">
            <p className="eyebrow mb-3" style={{ color: ACCENT }}>TSA Compliant</p>
            <p className="font-heading text-sm" style={{ color: '#5F574F', lineHeight: 1.75 }}>
              Instant coffee powder is a solid — not subject to the 3-1-1 liquids rule. Your tube travels in carry-on with no restrictions.
            </p>
          </div>
          <div className="card-torch p-6">
            <p className="eyebrow mb-3" style={{ color: ACCENT }}>Zero Cleanup</p>
            <p className="font-heading text-sm" style={{ color: '#5F574F', lineHeight: 1.75 }}>
              No grounds, no filter, no machine. Add water to powder, stir, and you’re done — in a tent, a conference room, or a plane seat.
            </p>
          </div>
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
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 md:px-10 py-16 text-center" style={{ background: '#FBF8F1', borderTop: `1px solid ${ACCENT}18` }}>
        <div className="max-w-xl mx-auto">
          <h2 className="h2 mb-4">Pack your ritual.</h2>
          <p className="body-lg mb-8">Any 3 blends for $49.99. Tube fits anywhere. Ships free over $50.</p>
          <Link to="/build-your-ritual" className="btn btn-primary">
            Build My Travel Bundle <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}