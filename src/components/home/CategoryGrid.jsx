import React from 'react';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  {
    label: 'Patriot Pride Collection',
    category: 'patriotic-pride',
    isCollection: true,
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/ccdcf8aef_IMG_20260331_144530.png',
  },
  {
    label: 'Freedom Collection',
    category: 'freedom-isnt-free',
    isCollection: true,
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/19be7dac7_IMG_20260331_144558.png',
  },
  {
    label: 'God, Family, Country',
    category: 'god-family-country',
    isCollection: true,
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/d8518c6be_IMG_20260331_144706.png',
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-0 px-0 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-3">
        <h2 className="text-xl sm:text-2xl font-heading font-black uppercase tracking-widest mb-1 text-center" style={{ color: '#C8A44D' }}>
          Quick Shop
        </h2>
        <p className="text-center font-mono text-xs text-muted-foreground tracking-widest mb-6">Browse by category</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.label}
            to={cat.isCollection ? `/BestSellers?collection=${cat.category}` : `/BestSellers?category=${cat.category}`}
            className="group relative block overflow-hidden"
            style={{ aspectRatio: '1/1' }}
          >
            <img
              src={cat.image}
              alt={cat.label}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              style={{ objectPosition: '50% 30%' }}
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-5">
              <span className="block font-serif font-bold text-base md:text-lg uppercase tracking-widest text-white text-center px-4" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}>{cat.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}