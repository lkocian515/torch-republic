import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import ProductGrid from '../products/ProductGrid';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function TopDesignsPipeline() {
  const [displayProducts, setDisplayProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ matched: 0, notFound: 0, fallback: false });

  useEffect(() => {
    const loadAndMatch = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // STEP 1 & 2: Fetch all products from Shopify
        console.log('[TopDesignsPipeline] Step 1-2: Fetching all products...');
        const fetchRes = await base44.functions.invoke('getFirstTopDesigns', {});
        const allProducts = fetchRes.data.products || [];
        const totalCount = fetchRes.data.total_count;

        console.log(`[TopDesignsPipeline] Step 2: Total products loaded: ${totalCount}`);

        if (totalCount === 0) {
          setError('No products found in Shopify');
          setIsLoading(false);
          return;
        }

        // STEP 3 & 4: Match top designs and log results
        console.log('[TopDesignsPipeline] Step 3-4: Matching top designs...');
        const matchRes = await base44.functions.invoke('matchTopDesigns', {
          products: allProducts
        });

        const matched = matchRes.data.matched || [];
        const notFound = matchRes.data.not_found || [];

        console.log(`[TopDesignsPipeline] Step 4 complete: ${matched.length} matched, ${notFound.length} not found`);

        // STEP 5: Render matched products or fallback
        let toDisplay = [];
        let usedFallback = false;

        if (matched.length > 0) {
          toDisplay = matched.map(m => m.product).filter(p => p.image_url);
          console.log(`[TopDesignsPipeline] Displaying ${toDisplay.length} matched products`);
        } else {
          // Fallback: first 12 products
          toDisplay = allProducts.slice(0, 12).filter(p => p.image_url);
          usedFallback = true;
          console.log(`[TopDesignsPipeline] No matches found. Using fallback: ${toDisplay.length} first products`);
        }

        setDisplayProducts(toDisplay);
        setStats({
          matched: matched.length,
          notFound: notFound.length,
          fallback: usedFallback
        });
        setIsLoading(false);
      } catch (err) {
        console.error('[TopDesignsPipeline] Error:', err.message);
        setError(err.message);
        setIsLoading(false);
      }
    };

    loadAndMatch();
  }, []);

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
              {stats.fallback ? 'Pipeline (Fallback)' : 'Top Designs'}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-serif font-black uppercase tracking-tight"
              style={{ color: '#E8DFAF' }}
            >
              {stats.fallback ? 'Featured Products' : 'Top Designs'}
            </motion.h2>
            {!isLoading && !error && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground font-mono text-sm mt-2"
              >
                {stats.fallback 
                  ? `Showing first ${displayProducts.length} products (${stats.matched} matched, ${stats.notFound} not found)`
                  : `${displayProducts.length} products matched`}
              </motion.p>
            )}
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

        {/* Error State */}
        {error && (
          <div className="mb-8 p-4 rounded-sm flex items-start gap-3" style={{ backgroundColor: '#CC5555', color: '#fff' }}>
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-mono text-sm font-bold">Error Loading Products</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <ProductGrid products={displayProducts} isLoading={isLoading} columns={4} />
      </div>
    </section>
  );
}