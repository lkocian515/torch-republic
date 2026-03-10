import React from 'react';
import ProductCard from './ProductCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductGrid({ products, isLoading, columns = 4 }) {
  const colClass = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  }[columns] || 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4';

  if (isLoading) {
    return (
      <div className={`grid ${colClass} gap-4 md:gap-6`}>
        {Array(8).fill(0).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-square w-full bg-card" />
            <Skeleton className="h-4 w-3/4 bg-card" />
            <Skeleton className="h-4 w-1/2 bg-card" />
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground font-mono text-sm">No products found.</p>
      </div>
    );
  }

  return (
    <div className={`grid ${colClass} gap-4 md:gap-6`}>
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}