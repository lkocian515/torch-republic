import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { createPageUrl } from '@/utils';

export default function FinalCTA() {
  return (
    <section 
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0E2A2F 0%, #1B5060 50%, #000 100%)' }}
    >
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-5xl md:text-6xl font-heading font-black uppercase tracking-tight leading-[1.2] text-white mb-8">
          Carry the Torch
        </h2>
        <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Join thousands who've chosen to wear what they stand for. Every purchase is a statement. Every piece has a story.
        </p>

        <Link
          to={createPageUrl('BestSellers')}
          className="inline-flex items-center gap-3 px-10 py-5 font-heading font-black text-sm tracking-widest uppercase transition-all duration-300 hover:gap-4"
          style={{ backgroundColor: '#C8A44D', color: '#000' }}
        >
          Shop the Collection <ArrowRight className="w-5 h-5" />
        </Link>

        <p className="text-gray-500 font-mono text-xs tracking-widest uppercase mt-8">
          Free shipping on orders over $100 | 30-day returns | Made in the USA
        </p>
      </div>
    </section>
  );
}