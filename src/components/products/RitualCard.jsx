import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { RITUAL_COLORS } from '@/lib/coreProducts';
import RitualProductImage from '@/components/products/RitualProductImage';
import { useCart } from '@/contexts/CartContext';

export default function RitualCard({ product, index = 0 }) {
  const { addItem } = useCart();
  const c = product.ritual || RITUAL_COLORS[product.ritualKey];

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      servings: product.servings,
      shopifyHandle: product.shopifyHandle,
    });
    try {
      if (window.gtag) {
        window.gtag('event', 'add_to_cart', {
          currency: 'USD',
          value: product.price,
          items: [{ item_id: product.shopifyHandle, item_name: product.name, price: product.price, quantity: 1 }],
        });
      }
    } catch (_) {}
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.55 }}
      className="card-torch flex h-full flex-col overflow-hidden"
    >
      <Link to={product.path} className="group block" style={{ textDecoration: 'none' }}>
        <div className="relative flex items-center justify-center overflow-hidden" style={{ aspectRatio: '1/1', background: '#FFFCF7' }}>
          <RitualProductImage
            product={product}
            alt={product.alt}
            className="h-full w-full p-6"
            imgClassName="h-full w-full transition-transform duration-700 group-hover:scale-105"
          />
          <span className="badge-torch absolute left-3 top-3" style={{ background: 'rgba(255,255,255,0.9)', color: c.deep, borderColor: `${c.accent}33` }}>
            {product.categoryLabel}
          </span>
          {product.seasonal && (
            <span
              className="absolute right-3 top-3 font-mono text-[8px] font-bold uppercase tracking-[0.2em]"
              style={{ background: c.deep, color: c.soft, padding: '4px 10px', borderRadius: '4px' }}
            >
              Seasonal
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 px-5 pt-5 pb-5">
        <div>
          <Link to={product.path} style={{ textDecoration: 'none' }}>
            <h3 className="font-serif font-bold" style={{ fontSize: '1.4rem', color: '#32190F', lineHeight: 1.15 }}>
              {product.name}
            </h3>
          </Link>

        </div>

        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.15em]" style={{ color: c.deep }}>
          {product.seasonal ? 'Ground or Whole Bean · brewed, not instant' : 'Instant coffee · just add water'}
        </p>

        <p className="font-heading text-sm" style={{ color: '#5E4639', lineHeight: 1.6 }}>
          {product.positioning}
        </p>

        <div className="mt-1 flex items-center gap-3">
          <span className="font-serif font-bold" style={{ fontSize: '1.3rem', color: c.deep }}>
            ${product.price.toFixed(2)}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.15em]" style={{ color: '#5E4639' }}>
            {product.seasonal ? product.weight : `${product.servings} servings`}
          </span>
        </div>

        <div className="flex-1" />

        <div className="pt-3" style={{ borderTop: '1px solid #B89A6D' }}>
          <button onClick={handleAdd} aria-label={`Add ${product.name} to cart`} className="btn btn-primary w-full" style={{ background: c.accent, borderColor: c.accent }}>
            <ShoppingBag className="h-4 w-4" /> Add to Cart
          </button>
          <Link to={product.path} className="block pt-2 text-center font-heading text-sm transition-opacity hover:opacity-70" style={{ color: c.deep }}>
            View details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}