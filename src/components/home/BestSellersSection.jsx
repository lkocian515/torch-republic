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
        base44.entities.Product.filter({ featured: true }, 'best_seller_rank', 8),
        base44.entities.Product.list('-created_date', 4),
      ]);
      // Sort featured by rank, then fill with latest non-featured
      const sorted = [...featured].sort((a, b) => (a.best_seller_rank || 999) - (b.best_seller_rank || 999));
      const featuredIds = new Set(sorted.map(p => p.id));
      const extras = latest.filter(p => !featuredIds.has(p.id)).slice(0, 2);
      return [...sorted, ...extras].slice(0, 8);
    },
    initialData: [],
  });

  return (
    <section className="py-28 px-6" style={{ backgroundColor: '#0B0B0B' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-14">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-10" style={{ background: 'linear-gradient(90deg, transparent, #C9A24A)' }} />
              <span className="font-mono text-[11px] tracking-[0.45em] uppercase" style={{ color: '#C9A24A' }}>Best Sellers</span>
            </div>
            <h2 className="font-serif font-bold text-white leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              The Collection
            </h2>
            <p className="font-heading font-light mt-3 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Most loved · Highest rated · Just dropped</p>
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