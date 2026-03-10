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
    queryFn: () => base44.entities.Product.filter({ featured: true }, '-created_date', 8),
    initialData: [],
  });

  return (
    <section className="py-24 px-6 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-primary font-mono text-xs tracking-[0.4em] uppercase mb-3">
              Top Picks
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black uppercase tracking-tight">
              Best Sellers
            </h2>
          </div>
          <Link
            to={createPageUrl('BestSellers')}
            className="hidden md:flex items-center gap-2 text-primary font-mono text-sm tracking-wider hover:gap-3 transition-all"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <ProductGrid products={products} isLoading={isLoading} />

        <Link
          to={createPageUrl('BestSellers')}
          className="md:hidden flex items-center justify-center gap-2 text-primary font-mono text-sm tracking-wider mt-8 hover:gap-3 transition-all"
        >
          View All Best Sellers <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}