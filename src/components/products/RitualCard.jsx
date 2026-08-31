import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Repeat } from 'lucide-react';
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
        <div className="relative flex items-center justify-center overflow-hidden" style={{ aspectRatio: '1/1', background: '#FFFFFF' }}>
          <RitualProductImage
            product={product}
            className="h-full w-full p-6"
            imgClassName="h-full w-full transition-transform duration-700 group-hover:scale-105"
          />
          <span className="badge-torch absolute left-3 top-3" style={{ background: 'rgba(255,255,255,0.9)', color: c.deep, borderColor: `${c.accent}33` }}>
            {product.categoryLabel}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 px-5 pt-5 pb-5">
        <div>
          <Link to={product.path} style={{ textDecoration: 'none' }}>
            <h3 className="font-serif font-bold" style={{ fontSize: '1.4rem', color: '#292622', lineHeight: 1.15 }}>
              {product.name}
            </h3>
          </Link>

        </div>

        <p className="font-heading text-sm" style={{ color: '#5F574F', lineHeight: 1.6 }}>
          {product.positioning}
        </p>

        <div className="mt-1 flex items-center gap-3">
          <span className="font-serif font-bold" style={{ fontSize: '1.3rem', color: c.deep }}>
            ${product.price.toFixed(2)}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.15em]" style={{ color: '#8A8076' }}>
            {product.servings} servings
          </span>
        </div>

        <p className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.18em]" style={{ color: '#8A8076' }}>
          <Repeat size={11} style={{ color: c.accent }} /> Subscription available
        </p>

        <div className="flex-1" />

        <div className="flex gap-2 pt-3" style={{ borderTop: '1px solid #E4D8C9' }}>
          <button onClick={handleAdd} className="btn btn-secondary flex-1" style={{ borderColor: `${c.accent}40`, color: c.deep }}>
            <ShoppingBag className="h-4 w-4" /> Add
          </button>
          <Link to={product.path} className="btn flex-1" style={{ background: c.accent, borderColor: c.accent, color: '#FFFFFF' }}>
            {product.cta}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}