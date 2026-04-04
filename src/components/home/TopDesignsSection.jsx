import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight, Flame } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import ProductGrid from '../products/ProductGrid';

const LOW_PRIORITY_CATEGORIES = new Set(['jewelry', 'tea', 'candles', 'bobbleheads']);

export default function TopDesignsSection() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['top-designs-home'],
    queryFn: async () => {
      const topDesigns = await base44.entities.Product.filter({ is_top_design: true }, '-created_date', 20);
      return topDesigns.filter(p => !LOW_PRIORITY_CATEGORIES.has(p.category) && p.image_url);
    },
    initialData: [],
  });

  return (
    <section className="py-24 px-6" style={{ backgroundColor: 'linear-gradient(135deg, #000000 0%, #0A0A0A 100%)' }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Flame className="w-5 h-5" style={{ color: '#C8A44D' }} />
              <span className="font-mono text-xs tracking-[0.35em] uppercase" style={{ color: '#C8A44D' }}>Curated Collection</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tight text-white mb-2">
              Top 20 Core Designs
            </h2>
            <p className="text-gray-400 text-sm mt-1 font-mono">Handpicked premium designs · Bold visual impact · Brand-aligned aesthetic</p>
          </div>
          <Link
            to={createPageUrl('BestSellers')}
            className="hidden md:flex items-center gap-2 font-mono text-sm tracking-wider hover:gap-3 transition-all"
            style={{ color: '#C8A44D' }}
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <ProductGrid products={products} isLoading={isLoading} columns={4} />

        <Link
          to={createPageUrl('BestSellers')}
          className="md:hidden flex items-center justify-center gap-2 font-mono text-sm tracking-wider mt-10 hover:gap-3 transition-all"
          style={{ color: '#C8A44D' }}
        >
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}