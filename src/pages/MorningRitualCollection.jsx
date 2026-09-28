/**
 * Morning Ritual Coffee Collection Page
 * Route: /shop/morning-ritual
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSEO } from '@/hooks/useSEO';
import { ArrowRight, CheckCircle, Sun } from 'lucide-react';
import MushroomProductCard from '@/components/mushroom/ProductCard';
import CollectionIntro from '@/components/collection/CollectionIntro';
import SelectionAid from '@/components/collection/SelectionAid';
import CollectionCrossLink from '@/components/collection/CollectionCrossLink';
import { ritualCards } from '@/lib/collectionRitualProducts';

const ACCENT = '#B7653E';

const MORNING_PRODUCTS = [
  { name: 'SunCap Rise', path: '/products/suncap-rise-instant-mushroom-coffee' },
  { name: 'GlowMind Clarity', path: '/products/glowmind-clarity-instant-mushroom-coffee' },
  { name: 'Torchbearer', path: '/products/torchbearer-instant-coffee' },
  { name: 'Ember Reserve', path: '/products/ember-rise-instant-coffee' },
];
const MORNING_CARDS = ritualCards(MORNING_PRODUCTS);

const RITUAL_STEPS = [
  { step: '01', title: 'Heat your water', body: 'Bring water to 85–90°C — just off boiling. Overheating dulls the coffee aromatics.' },
  { step: '02', title: 'Measure your blend', body: 'Add one serving to your cup. Take a moment to breathe in the dry aroma — this is part of the ritual.' },
  { step: '03', title: 'Stir with intention', body: 'Pour the water and stir for about 30 seconds. Watch the powder dissolve. This short pause is where the ritual begins.' },
  { step: '04', title: 'Set your intention', body: 'Before the first sip, decide on one thing you want to accomplish today. The cup in your hands is a signal: this is your time.' },
];

const FAQS = [
  { q: 'What is the best coffee for morning focus?', a: 'GlowMind Clarity combines premium Arabica instant coffee with Lion\u2019s Mane and Chaga mushroom extracts for a focused morning ritual. No machine or pods required.' },
  { q: 'Can I make ritual morning coffee without a machine?', a: 'Yes. Torch Republic instant coffee dissolves in hot water in under a minute — no machine, no pods, no cleanup.' },
  { q: 'How many servings are in each tube?', a: 'Each tube contains 27 servings (25 for matcha) — nearly a month of daily rituals.' },
];

export default function MorningRitualCollection() {
  const [openFaq, setOpenFaq] = useState(null);

  useSEO({
    title: 'Morning Ritual Coffee | Best Coffee for Morning Focus | Torch Republic',
    description: 'The best instant coffee for morning rituals — mushroom coffee for focus, classic Arabica for bold starts. No machine needed. Premium instant, 27 servings per tube.',
    url: '/shop/morning-ritual',
    type: 'website',
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Shop', url: '/shop' }, { name: 'Morning Ritual', url: '/shop/morning-ritual' }],
    faq: [
      { question: 'What is the best coffee for morning focus?', answer: 'GlowMind Clarity combines premium Arabica instant coffee with Lion\u2019s Mane and Chaga — designed for focused morning rituals without jitters.' },
      { question: 'Can I make ritual morning coffee without a machine?', answer: 'Yes. Torch Republic instant coffee dissolves in hot water in under 60 seconds — no machine, no pods, no cleanup required.' },
    ],
  });

  return (
    <div className="min-h-screen" style={{ background: '#F7F1E7' }}>
      {/* Hero */}
      <section className="px-6 md:px-10 pt-16 pb-12 text-center" style={{ background: '#FBF8F1', borderBottom: `1px solid ${ACCENT}22` }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5" style={{ background: `${ACCENT}12`, border: `1px solid ${ACCENT}30` }}>
            <Sun size={12} style={{ color: ACCENT }} />
            <span className="eyebrow" style={{ color: ACCENT }}>Morning Ritual Collection</span>
          </div>
          <h1 className="h1 mb-5">Coffee Built for Morning Rituals</h1>
          <p className="body-lg mb-8">
            The best mornings start with intention — one cup, made simply. Premium instant coffee and mushroom coffee blends that meet you where you are. No pods. No cleanup. Just add hot water.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/build-your-ritual" className="btn btn-primary">
              Build Your Morning Bundle <ArrowRight size={14} />
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
          {['No machine needed', '27 servings per tube', 'Ships free over $50', '30-day guarantee'].map((t, i) => (
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
              title="Morning Ritual Blends"
              intro="Instant coffee and mushroom coffee made for the first cup of the day. Add hot water, stir, and begin — no machine, no pods. 27 servings per tube."
              accent={ACCENT}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MORNING_CARDS.map((product, i) => (
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
            { if: 'you want bright morning energy', pick: 'SunCap Rise', to: '/products/suncap-rise-instant-mushroom-coffee' },
            { if: 'you want focus for deep work', pick: 'GlowMind Clarity', to: '/products/glowmind-clarity-instant-mushroom-coffee' },
            { if: 'you want a bold, no-frills coffee cup', pick: 'Torchbearer', to: '/products/torchbearer-instant-coffee' },
            { if: 'you want a smooth, easy-drinking cup', pick: 'Ember Reserve', to: '/products/ember-rise-instant-coffee' },
          ]}
        />
        <div className="mt-8">
          <CollectionCrossLink to="/build-your-ritual" label="Build Your Morning Bundle" sub="Any 3 blends for your morning ritual." accent={ACCENT} />
        </div>
      </section>

      {/* Ritual Steps */}
      <section className="px-6 md:px-10 py-16" style={{ background: '#F7F1E7', borderTop: `1px solid ${ACCENT}18` }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="eyebrow mb-3" style={{ color: ACCENT }}>The Method</p>
            <h2 className="h2">Four Steps to a Better Morning</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RITUAL_STEPS.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="card-torch flex items-start gap-5 p-5">
                <span className="font-mono font-bold text-xs flex-shrink-0 mt-0.5" style={{ color: `${ACCENT}99` }}>{step.step}</span>
                <div>
                  <p className="font-serif font-bold mb-2" style={{ color: '#292622', fontSize: '1rem' }}>{step.title}</p>
                  <p className="font-heading text-sm" style={{ color: '#5F574F', lineHeight: 1.75 }}>{step.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-10 py-16" style={{ background: '#FBF8F1', borderTop: `1px solid ${ACCENT}18` }}>
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
      <section className="px-6 md:px-10 py-16 text-center" style={{ background: '#F7F1E7', borderTop: `1px solid ${ACCENT}18` }}>
        <div className="max-w-xl mx-auto">
          <h2 className="h2 mb-4">Your morning ritual, upgraded.</h2>
          <p className="body-lg mb-8">Any 3 blends for $49.99. Free shipping $50+. 30-day satisfaction guarantee.</p>
          <Link to="/build-your-ritual" className="btn btn-primary">
            Build My Morning Bundle <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}