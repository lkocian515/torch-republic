import React from 'react';
import RitualCard from '@/components/products/RitualCard';
import { CORE_PRODUCTS } from '@/lib/coreProducts';

export default function ChooseYourRitual() {
  return (
    <section id="choose-ritual" style={{ background: '#FBF8F1' }}>
      <div className="mx-auto max-w-[1240px] px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em]" style={{ color: '#A97B32' }}>
            The Lineup
          </p>
          <h2
            className="mt-4 font-serif font-semibold"
            style={{ fontSize: 'clamp(2rem,4vw,2.8rem)', color: '#292622', textWrap: 'balance' }}
          >
            Choose your ritual.
          </h2>
          <p className="mt-4 font-heading" style={{ color: '#5F574F', lineHeight: 1.7 }}>
            Two intentional choices. No catalog to get lost in &mdash; just the morning you want.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {CORE_PRODUCTS.map((p, i) => (
            <RitualCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}