import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight } from 'lucide-react';

const CATEGORIES = [
  {
    label: 'T-SHIRTS',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/7a14d80e7_ChatGPTImageMar19202604_32_30AM.png',
    category: 't-shirts',
  },
  {
    label: 'HOODIES',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80',
    category: 'hoodies',
  },
  {
    label: 'HATS',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/242e7dcdb_Untitledfdsfdsf.png',
    category: 'hats',
  },
  {
    label: 'COFFEE',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80',
    category: 'coffee',
  },
  {
    label: 'TEA',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=80',
    category: 'tea',
  },
  {
    label: 'STICKERS',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/aeca6b0ad_ffffd.png',
    category: 'stickers',
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-0 px-0 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-2">
        <h2 className="text-xl sm:text-2xl font-heading font-black uppercase tracking-widest mb-6 text-center whitespace-nowrap" style={{ color: '#C8A44D' }}>
          WEAR WHAT YOU STAND FOR
        </h2>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-0.5">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.label}
            to={`/BestSellers?category=${cat.category}`}
            className="group relative block overflow-hidden"
            style={{ aspectRatio: '2/3' }}
          >
            <img
              src={cat.image}
              alt={cat.label}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)' }} />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <span className="block font-heading font-black text-xs uppercase tracking-widest text-white mb-1">{cat.label}</span>
              <span className="flex items-center gap-1 font-mono text-[10px] tracking-wider" style={{ color: '#C8A44D' }}>
                Shop <ArrowRight className="w-2.5 h-2.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
      </section>
      );
}