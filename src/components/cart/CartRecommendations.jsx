import React, { useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { ALL_PRODUCTS } from '@/lib/mushroomProducts';
import { trackAddToCart, buildItem, trackUpsellViewed, trackUpsellClicked } from '@/lib/analytics';

const RG = '#E6B7AD';

// Recommendation rules — what to suggest based on what's in the cart
const RULES = {
  'classic-coffee': ['matcha', 'mushroom-coffee'],
  'mushroom-coffee': ['classic-coffee', 'matcha'],
  'matcha': ['mushroom-coffee'],
};

// Pick one representative product per recommended category
function getRecommendations(cartItems) {
  const cartCategories = new Set(cartItems.map(i => i.category));
  const cartHandles = new Set(cartItems.map(i => i.shopifyHandle || i.id));

  // Collect recommended categories from all items in cart
  const recommendedCategories = new Set();
  cartCategories.forEach(cat => {
    (RULES[cat] || []).forEach(recCat => {
      if (!cartCategories.has(recCat)) {
        recommendedCategories.add(recCat);
      }
    });
  });

  // Pick first available product from each recommended category
  const picks = [];
  recommendedCategories.forEach(cat => {
    const product = ALL_PRODUCTS.find(p => p.category === cat && !cartHandles.has(p.shopifyHandle));
    if (product) picks.push(product);
  });

  return picks.slice(0, 2);
}

export default function CartRecommendations({ cartItems }) {
  const { addItem } = useCart();

  const recommendations = useMemo(() => getRecommendations(cartItems), [cartItems]);

  useEffect(() => {
    if (recommendations.length > 0) {
      trackUpsellViewed('complete_your_ritual', recommendations.map(p => p.name));
    }
  }, [recommendations]);

  if (recommendations.length === 0) return null;

  const handleAdd = (product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      shopifyHandle: product.shopifyHandle,
      servings: product.servings,
    }, 1);

    trackAddToCart(buildItem({
      id: product.shopifyHandle,
      name: product.name,
      category: product.category,
      price: product.price,
    }));
    trackUpsellClicked(product.name, 'complete_your_ritual');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="mt-6"
    >
      <div className="mb-4">
        <h3 className="font-serif font-bold text-lg mb-1" style={{ color: '#F5EFE6' }}>
          Complete Your Ritual
        </h3>
        <p className="font-mono text-[9px] tracking-[0.15em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>
          Customers often pair this with
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {recommendations.map(product => (
          <div
            key={product.id}
            className="flex items-center gap-3 p-3 transition-all hover:border-opacity-30"
            style={{ background: '#0F0E0E', border: '1px solid rgba(230,183,173,0.12)' }}
          >
            <div className="w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden" style={{ background: '#141414' }}>
              <img src={product.image} alt={product.name} className="w-full h-full object-contain p-1" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-serif font-bold text-sm truncate" style={{ color: '#F5EFE6' }}>{product.name}</p>
              <div className="flex items-center gap-1 mb-1">
                <Star className="w-3 h-3 fill-current" style={{ color: RG }} />
                <span className="font-mono text-[8px] tracking-[0.1em]" style={{ color: 'rgba(230,183,173,0.6)' }}>4.9</span>
                <span className="font-mono text-[8px]" style={{ color: 'rgba(245,239,230,0.3)' }}>· {product.servings} servings</span>
              </div>
              <p className="font-mono font-bold text-xs" style={{ color: RG }}>${product.price.toFixed(2)}</p>
            </div>
            <button
              onClick={() => handleAdd(product)}
              className="flex-shrink-0 w-9 h-9 flex items-center justify-center transition-all hover:opacity-80"
              style={{ background: 'rgba(230,183,173,0.1)', border: '1px solid rgba(230,183,173,0.25)' }}
              aria-label={`Add ${product.name} to cart`}
            >
              <Plus className="w-4 h-4" style={{ color: RG }} />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}