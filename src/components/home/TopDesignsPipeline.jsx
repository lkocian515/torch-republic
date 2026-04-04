import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import ProductGrid from '../products/ProductGrid';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function TopDesignsPipeline() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['topDesignsPipeline'],
    queryFn: async () => {
      const response = await base44.functions.invoke('getFirstTopDesigns', {});
      return response.data.products || [];
    },
    initialData: [],
  });

  const HIDDEN_CATEGORIES = new Set(['jewelry', 'tea', 'candles', 'home-decor', 'bobbleheads', 'accessories']);
  
  const filteredProducts = products.filter(p => p.image_url);

  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-mono text-xs tracking-[0.4em] uppercase mb-3"
              style={{ color: '#C8A44D' }}
            >
              Pipeline Test
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-serif font-black uppercase tracking-tight"
              style={{ color: '#E8DFAF' }}
            >
              Top Designs (First 12)
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground font-mono text-sm mt-2"
            >
              {filteredProducts.length} products loaded from Shopify
            </motion.p>
          </div>
          <Link
            to="/BestSellers"
            className="flex items-center gap-2 px-6 py-3 rounded-sm font-mono text-xs tracking-widest uppercase"
            style={{
              backgroundColor: '#C8A44D',
              color: '#000000',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E4C46A'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#C8A44D'}
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Grid */}
        <ProductGrid products={filteredProducts} isLoading={isLoading} columns={4} />
      </div>
    </section>
  );
}