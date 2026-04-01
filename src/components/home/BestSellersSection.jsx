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
      const [featured, latest] = await Promise.all([
        base44.entities.Product.filter({ featured: true }, 'best_seller_rank', 6),
        base44.entities.Product.list('-created_date', 4),
      ]);
      const sorted = [...featured].sort((a, b) => (a.best_seller_rank || 999) - (b.best_seller_rank || 999));
      const featuredIds = new Set(sorted.map(p => p.id));
      const extras = latest.filter(p => !featuredIds.has(p.id)).slice(0, 2);
      return [...sorted, ...extras].slice(0, 6);
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
              Best Sellers & New Arrivals
            </h2>
            <p className="text-gray-400 text-sm mt-1 font-mono">Highest rated · Most loved · Just dropped</p>
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