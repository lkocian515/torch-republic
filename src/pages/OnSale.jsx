import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import ProductGrid from '../components/products/ProductGrid';
import { Tag } from 'lucide-react';

export default function OnSale() {
  const currentCollections = ['founders-series', 'liberty-icons', 'commanders-series', 'women-of-the-republic'];
  const validCategories = ['coffee', 't-shirts', 'hoodies-sweatshirts', 'tanks', 'hats'];

  const { data: products, isLoading } = useQuery({
    queryKey: ['on-sale'],
    queryFn: () => base44.entities.Product.list('', 250),
    initialData: [],
    select: (data) =>
      data
        .filter(p => p.on_sale && validCategories.includes(p.category) && (currentCollections.includes(p.collection) || p.category === 'coffee'))
        .sort((a, b) => (a.price || 0) - (b.price || 0)),
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="pt-12 pb-4 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <Tag className="w-5 h-5" style={{ color: '#C8A44D' }} />
            <p className="text-primary font-mono text-xs tracking-[0.4em] uppercase">
              Limited Deals
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tight">
            🔥 On Sale
          </h1>
          <p className="text-muted-foreground font-mono text-sm mt-2">
            {isLoading ? '...' : `${products.length} deals · Grab them before they're gone`}
          </p>
        </div>
      </div>

      {/* Banner */}
      <div className="mx-6 mb-8 max-w-7xl xl:mx-auto">
        <div
          className="py-4 px-6 flex items-center justify-center gap-3 text-center font-mono text-sm tracking-wider"
          style={{ backgroundColor: '#C8A44D', color: '#000' }}
        >
          <span className="font-black">⚡ IMPULSE BUY ALERT:</span>
          <span>Stock up while it lasts</span>
        </div>
      </div>

      {/* Grid */}
      <div className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <ProductGrid products={products} isLoading={isLoading} />
          {!isLoading && products.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground font-mono text-sm">
                No sale products right now — check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}