import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import ProductGrid from '../components/products/ProductGrid';
import { ArrowRight } from 'lucide-react';

const COLLECTIONS = [
  { title: 'Top Designs', key: 'top-designs', description: 'Our most coveted pieces' },
  { title: 'New Drops', key: 'new-drops', description: 'Just released' },
  { title: 'American Heroes', key: 'american-heroes', collection: 'american-heroes' },
  { title: 'Freedom Collection', key: 'freedom', collection: 'freedom-isnt-free' },
];

export default function Shop() {
  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['shop-products'],
    queryFn: () => base44.entities.Product.list('-updated_date', 500),
    initialData: [],
  });

  const getCollectionProducts = (key, collection) => {
    if (key === 'top-designs') {
      return allProducts
        .filter(p => p.featured && p.image_url)
        .sort((a, b) => (a.best_seller_rank || 999) - (b.best_seller_rank || 999))
        .slice(0, 12);
    }
    if (key === 'new-drops') {
      return allProducts
        .filter(p => p.image_url)
        .slice(0, 12);
    }
    if (collection) {
      return allProducts
        .filter(p => p.collection === collection && p.image_url)
        .slice(0, 12);
    }
    return [];
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000' }}>
      {/* Header */}
      <div className="pt-16 pb-8 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-primary font-mono text-xs tracking-[0.4em] uppercase mb-3">
            Curated Collections
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tight text-white mb-3">
            Shop Torch Republic
          </h1>
          <p className="text-muted-foreground font-mono text-sm">
            Premium apparel for those who refuse to live passively
          </p>
        </div>
      </div>

      {/* Collections */}
      <div className="px-6 pb-24">
        <div className="max-w-7xl mx-auto space-y-24">
          {COLLECTIONS.map((collection) => {
            const products = getCollectionProducts(collection.key, collection.collection);
            
            return (
              <section key={collection.key}>
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-heading font-black uppercase tracking-tight text-white mb-2">
                    {collection.title}
                  </h2>
                  <p className="text-muted-foreground font-mono text-sm">{collection.description}</p>
                </div>
                
                <ProductGrid products={products} isLoading={isLoading} />
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}