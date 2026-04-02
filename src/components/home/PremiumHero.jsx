import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { createPageUrl } from '@/utils';

export default function PremiumHero() {
  return (
    <section className="min-h-[90vh] flex items-center justify-center px-6 py-20 relative overflow-hidden" style={{ backgroundColor: '#0B0B0B' }}>
      {/* Subtle background grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(200,164,77,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,164,77,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Overline */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, transparent, #C8A44D)' }} />
          <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: '#C8A44D' }}>
            Torch Republic
          </span>
          <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, #C8A44D, transparent)' }} />
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-heading font-black uppercase tracking-tight leading-[1.1] mb-6 text-white">
          Wear What You Stand For
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
          Premium patriotic and faith-driven apparel for those who value conviction, craftsmanship, and American heritage.
        </p>

        {/* Trust text */}
        <div className="mb-12 p-4 border-t border-b" style={{ borderColor: 'rgba(200,164,77,0.2)' }}>
          <p className="font-mono text-xs tracking-widest uppercase text-gray-500">
            ✓ Fast U.S. shipping  •  ✓ Easy returns  •  ✓ Free shipping over $100
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={createPageUrl('BestSellers')}
            className="px-8 py-4 font-heading font-black text-sm tracking-widest uppercase transition-all duration-300 hover:gap-3 flex items-center gap-2"
            style={{ backgroundColor: '#C8A44D', color: '#000' }}
          >
            Shop Best Sellers <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to={createPageUrl('Mission')}
            className="px-8 py-4 font-heading font-black text-sm tracking-widest uppercase border transition-all duration-300 hover:gap-3"
            style={{ borderColor: '#C8A44D', color: '#C8A44D' }}
          >
            Explore the Mission
          </Link>
        </div>
      </div>
    </section>
  );
}