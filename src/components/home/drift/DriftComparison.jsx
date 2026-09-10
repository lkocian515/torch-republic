import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { D, SERIF, SANS, MONO, fadeUp } from './driftTheme';
import { CORE_PRODUCTS } from '@/lib/coreProducts';

const GRANULE_IMAGES = {
  'instant-classic-coffee': 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/656b178ad_generated_image.png',
  'instant-mushroom-coffee': 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/b3cc8b16c_generated_image.png',
};

const ROWS = [
  { label: 'Best For', classic: 'Classic coffee and everyday ritual', mushroom: 'Focused thinking and daily clarity' },
  { label: 'Flavor', classic: 'Bold, smooth, premium Arabica', mushroom: 'Smooth coffee, cocoa, balanced finish' },
  { label: 'Energy', classic: 'Higher caffeine', mushroom: 'Medium caffeine' },
  { label: 'Functional Ingredients', classic: 'Single-origin Arabica', mushroom: "Lion's Mane + Cordyceps + Reishi" },
  { label: 'Preparation', classic: 'Hot or iced', mushroom: 'Hot or iced' },
];

export default function DriftComparison() {
  const [classic, mushroom] = CORE_PRODUCTS;
  return (
    <section id="comparison" style={{ background: D.cream, scrollMarginTop: '80px' }}>
      <div className="mx-auto max-w-[1000px] px-6 py-16 md:py-20">
        <motion.div {...fadeUp} className="text-center mb-12">
          <p style={{ fontFamily: MONO, fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 600, color: D.terracotta, margin: '0 0 1rem' }}>
            Which One&rsquo;s Your Morning?
          </p>
          <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, color: D.ink, margin: 0, textWrap: 'balance' }}>
            Same simplicity. Different ritual.
          </h2>
        </motion.div>

        {/* Product headers */}
        <div className="grid grid-cols-[auto_1fr_1fr] gap-4 md:gap-8 mb-8 items-end">
          <div />
          {[
            { p: classic },
            { p: mushroom },
          ].map(({ p }) => (
            <div key={p.id} className="text-center">
              <div className="flex justify-center mb-3 overflow-hidden rounded-lg" style={{ aspectRatio: '1 / 1' }}>
                <img src={GRANULE_IMAGES[p.id]} alt={`Macro photography of ${p.name} granules`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="w-24 md:w-28" />
              </div>
              <p style={{ fontFamily: SERIF, fontWeight: 700, fontSize: '1.15rem', color: D.ink, margin: 0 }}>{p.name}</p>
            </div>
          ))}
        </div>

        {/* Comparison rows */}
        <div className="flex flex-col">
          {ROWS.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[auto_1fr_1fr] gap-4 md:gap-8 py-4 md:py-5"
              style={{ borderTop: `1px solid ${D.rule}` }}
            >
              <p style={{ fontFamily: MONO, fontSize: '0.625rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: D.secondary, margin: 0, alignSelf: 'center', minWidth: '7rem' }}>
                {row.label}
              </p>
              <p style={{ fontFamily: SANS, fontSize: '0.9375rem', color: D.ink, margin: 0, alignSelf: 'center', lineHeight: 1.5 }}>{row.classic}</p>
              <p style={{ fontFamily: SANS, fontSize: '0.9375rem', color: D.ink, margin: 0, alignSelf: 'center', lineHeight: 1.5 }}>{row.mushroom}</p>
            </div>
          ))}
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-4 md:gap-8 mt-8">
          {[
            { p: classic },
            { p: mushroom },
          ].map(({ p }) => (
            <div key={p.id} className="text-center">
              <Link to={p.path} style={{ fontFamily: SANS, fontWeight: 600, fontSize: '0.875rem', color: D.espresso, textDecoration: 'none' }}>
                View {p.name} &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}