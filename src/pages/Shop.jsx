import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import ProductGrid from '../components/products/ProductGrid';
import { ArrowRight } from 'lucide-react';

const COLLECTIONS = [
  { title: 'Founders Series Apparel', key: 'founders-apparel', collection: 'founders-series' },
  { title: 'Liberty Icons Apparel', key: 'liberty-apparel', collection: 'liberty-icons' },
  { title: 'Commanders Series Apparel', key: 'commanders-apparel', collection: 'commanders-series' },
];

export default function Apparel() {
   const { data: allProducts = [], isLoading } = useQuery({
     queryKey: ['shop-products'],
     queryFn: () => base44.entities.Product.list('-updated_date', 500),
     initialData: [],
   });

   const getCollectionProducts = (key, collection) => {
     const apparelCategories = ['t-shirts', 'hoodies-sweatshirts', 'tanks', 'hats'];

       // Only show apparel that belongs to current collections
       if (collection) {
         return allProducts
           .filter(p => p.collection === collection && apparelCategories.includes(p.category) && p.image_url)
           .slice(0, 12);
       }
       return [];
   };

   // Filter out sections with no products
   const availableCollections = COLLECTIONS.filter(col => {
     const products = getCollectionProducts(col.key, col.collection);
     return products.length > 0;
   });

   return (
     <div className="min-h-screen" style={{ backgroundColor: '#000' }}>
       {/* Header */}
       <div className="pt-16 pb-8 px-6 text-center">
         <div className="max-w-4xl mx-auto">
           <p className="text-primary font-mono text-xs tracking-[0.4em] uppercase mb-3">
             Historical Collections
           </p>
           <h1 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tight text-white mb-3">
             Torch Republic Apparel
           </h1>
           <p className="text-muted-foreground font-mono text-sm">
             Historical apparel inspired by the Founders, Liberty Icons, and Commanders Series — extensions of our coffee collections
           </p>
         </div>
       </div>

      {/* Collections */}
      <div className="px-6 pb-24">
        <div className="max-w-7xl mx-auto space-y-24">
          {availableCollections.map((collection) => {
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