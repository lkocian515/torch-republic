import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import ProductGrid from '../products/ProductGrid';

export default function BestSellersSection() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['best-sellers-home'],
    queryFn: async () => {
      const items = await base44.entities.Product.filter({ featured: true }, '-rating', 8);
      return items.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    },
    initialData: [],
  });

  return (
    <section className="py-20 px-6" style={{ backgroundColor: '#000' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, #0E2A2F, #C8A44D)' }} />
              <span className="font-mono text-xs tracking-[0.35em] uppercase" style={{ color: '#C8A44D' }}>Bestsellers</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-white">
              Best Sellers
            </h2>
            <p className="text-gray-400 text-sm mt-1 font-mono">Highest rated · Most loved · Ships fast</p>
          </div>
          <Link
            to={createPageUrl('BestSellers')}
            className="hidden md:flex items-center gap-2 font-mono text-sm tracking-wider hover:gap-3 transition-all"
            style={{ color: '#C8A44D' }}
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <ProductGrid products={products} isLoading={isLoading} />

        <Link
          to={createPageUrl('BestSellers')}
          className="md:hidden flex items-center justify-center gap-2 font-mono text-sm tracking-wider mt-8 hover:gap-3 transition-all"
          style={{ color: '#C8A44D' }}
        >
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}