import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { MUSHROOM_PRODUCTS, MATCHA_PRODUCTS, CLASSIC_COFFEE_PRODUCTS } from '../lib/mushroomProducts';
import { useSEO } from '@/hooks/useSEO';
import MushroomProductCard from '@/components/mushroom/ProductCard';
import CollectionIntro from '@/components/collection/CollectionIntro';
import SelectionAid from '@/components/collection/SelectionAid';
import CollectionCrossLink from '@/components/collection/CollectionCrossLink';
import BlendCompare from '../components/mushroom/BlendCompare';

const ACCENT = '#B7653E';

const SECTIONS = [
  {
    eyebrow: 'Mushroom Coffee',
    title: 'Coffee with Lion’s Mane + Chaga',
    intro: 'Instant coffee blended with Lion’s Mane and Chaga for a daily cup built around focus, reset, and fresh starts. 27 servings per tube.',
    products: MUSHROOM_PRODUCTS,
    color: '#B7653E',
  },
  {
    eyebrow: 'Classic Instant Coffee',
    title: 'Single-Origin Coffee, No Machine',
    intro: 'Pure 100% Arabica instant coffee — no mushrooms, no pods. Single-origin and freeze-dried to keep the origin character. 27 servings per tube.',
    products: CLASSIC_COFFEE_PRODUCTS,
    color: '#B86543',
  },
  {
    eyebrow: 'Ceremonial Matcha',
    title: 'Matcha for Calm, Focused Rituals',
    intro: 'Ceremonial grade matcha that dissolves instantly — hot or iced, no whisk needed. 25 servings per tin.',
    products: MATCHA_PRODUCTS,
    color: '#566047',
  },
];

export default function BlendsCollection() {
  useSEO({
    title: 'All Blends | Mushroom Coffee, Matcha & Classic Coffee',
    description: "Explore all Torch Republic blends: mushroom coffee with Lion's Mane + Chaga, ceremonial grade matcha, and classic instant coffee. 27 servings per tube. No machine needed.",
    url: '/blends',
  });

  return (
    <div style={{ backgroundColor: '#F7F1E7', color: '#292622', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="px-6 md:px-10 pt-16 pb-12 text-center" style={{ background: '#FBF8F1', borderBottom: `1px solid ${ACCENT}22` }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl mx-auto">
          <p className="eyebrow mb-4" style={{ color: ACCENT }}>All Blends</p>
          <h1 className="h1 mb-5">Fuel the Person You’re Becoming</h1>
          <p className="body-lg mb-8">
            Torch Republic makes premium instant coffee, mushroom coffee, and ceremonial matcha for daily rituals. No machine, no pods — just add hot water.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/shop" className="btn btn-primary">
              Shop the Collection <ArrowRight size={14} />
            </Link>
            <Link to="/quiz" className="btn btn-ghost">
              Find Your Blend
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Selection aid */}
      <section className="px-6 md:px-10 py-14" style={{ background: '#F7F1E7' }}>
        <SelectionAid
          accent={ACCENT}
          items={[
            { if: 'you want coffee with Lion’s Mane + Chaga', pick: 'SunCap Rise', to: '/products/suncap-rise' },
            { if: 'you want a bold single-origin cup', pick: 'Torchbearer', to: '/products/torchbearer' },
            { if: 'you want a calm matcha ritual', pick: 'The Monk', to: '/products/the-monk-matcha-blend' },
          ]}
        />
      </section>

      {/* Category sections */}
      {SECTIONS.map((section, si) => (
        <section key={si} className="px-6 md:px-10 py-14" style={{ background: si % 2 === 0 ? '#FBF8F1' : '#F7F1E7', borderTop: `1px solid ${ACCENT}18` }}>
          <div className="max-w-[1280px] mx-auto">
            <div className="mb-8">
              <CollectionIntro
                eyebrow={section.eyebrow}
                title={section.title}
                intro={section.intro}
                accent={section.color}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.products.map((product, i) => (
                <motion.div key={product.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <MushroomProductCard product={product} index={i} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Cross-link */}
      <section className="px-6 md:px-10 py-12" style={{ background: '#FBF8F1', borderTop: `1px solid ${ACCENT}18` }}>
        <CollectionCrossLink to="/build-your-ritual" label="Can’t choose just one? Build Your Ritual" sub="Any 3 blends for $49.99 — mix mushroom coffee, classic coffee, and matcha." accent={ACCENT} />
      </section>

      {/* Comparison */}
      <BlendCompare />

      {/* Final CTA */}
      <section className="px-6 py-16 text-center" style={{ background: '#F7F1E7', borderTop: `1px solid ${ACCENT}18` }}>
        <h2 className="h2 mb-4">Shop the Complete Collection</h2>
        <Link to="/build-your-ritual" className="btn btn-primary">
          Shop All Blends <ArrowRight size={14} />
        </Link>
      </section>
    </div>
  );
}