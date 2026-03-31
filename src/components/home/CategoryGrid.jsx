import React from 'react';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  {
    label: 'T-Shirts',
    emoji: '👕',
    category: 't-shirts',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/aeca6b0ad_ffffd.png',
  },
  {
    label: 'Hoodies',
    emoji: '🧥',
    category: 'hoodies',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/242e7dcdb_Untitledfdsfdsf.png',
  },
  {
    label: 'Hats',
    emoji: '🧢',
    category: 'hats',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/7a14d80e7_ChatGPTImageMar19202604_32_30AM.png',
  },
  {
    label: 'Coffee',
    emoji: '☕',
    category: 'coffee',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/502eb0c7a_ChatGPTImageMar19202604_32_50AM.png',
  },
  {
    label: 'Tea',
    emoji: '🫖',
    category: 'tea',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/aeca6b0ad_ffffd.png',
  },
  {
    label: 'Stickers',
    emoji: '🏷️',
    category: 'stickers',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/242e7dcdb_Untitledfdsfdsf.png',
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

      <div className="grid grid-cols-3 md:grid-cols-6 gap-0.5">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.label}
            to={`/BestSellers?category=${cat.category}`}
            className="group relative block overflow-hidden"
            style={{ aspectRatio: '1/1' }}
          >
            <img
              src={cat.image}
              alt={cat.label}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-3">
              <span className="text-xl mb-1">{cat.emoji}</span>
              <span className="block font-heading font-black text-xs uppercase tracking-widest text-white">{cat.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}