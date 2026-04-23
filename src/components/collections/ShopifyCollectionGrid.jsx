import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80';

function CoffeeProductCard({ product, index, accentColor = '#C9A24A', internalRoute }) {
  const ac = accentColor;
  const title = product.title
    .replace(/[-–]\s*(Founders Series|Liberty Icons Series|Commanders Series|Women of the Republic|Coffee)\s*/gi, '')
    .trim();

  const imgSrc = product.image_url || PLACEHOLDER;

  const CardInner = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group flex flex-col h-full"
      style={{ background: '#0B0B0B', border: `1px solid rgba(${hexToRgb(ac)},0.15)`, transition: 'border-color 0.25s, box-shadow 0.25s' }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `rgba(${hexToRgb(ac)},0.6)`;
        e.currentTarget.style.boxShadow = `0 0 28px rgba(${hexToRgb(ac)},0.1)`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = `rgba(${hexToRgb(ac)},0.15)`;
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '1/1', background: '#111' }}>
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ opacity: 0.9 }}
          onError={e => { e.currentTarget.src = PLACEHOLDER; }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)' }} />
        {!product.available && (
          <div className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-wider px-2 py-1"
            style={{ background: 'rgba(0,0,0,0.7)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
            Sold Out
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col gap-2 flex-1">
        <h3 className="font-serif font-bold" style={{ fontSize: '1rem', color: '#FFFFFF', lineHeight: 1.25 }}>{title}</h3>
        <div className="mt-auto pt-3 flex items-center justify-between" style={{ borderTop: `1px solid rgba(${hexToRgb(ac)},0.08)` }}>
          <span className="font-mono font-black text-sm" style={{ color: ac }}>
            ${product.price?.toFixed(2)}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: `rgba(${hexToRgb(ac)},0.55)` }}>
            Shop Now →
          </span>
        </div>
      </div>
    </motion.div>
  );

  if (internalRoute) {
    return (
      <Link to={internalRoute} style={{ textDecoration: 'none' }}>
        <CardInner />
      </Link>
    );
  }

  return (
    <a href={`https://libertees-for-all.myshopify.com/products/${product.handle}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
      <CardInner />
    </a>
  );
}

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `${r},${g},${b}`;
}

// Map of shopify handles to internal app routes
const INTERNAL_ROUTES = {
  'washington-blend': '/WashingtonBlend',
  'jefferson-blend': '/JeffersonBlend',
  'franklin-blend': '/FranklinBlend',
  'adams-blend': '/AdamsBlend',
  'lincoln-blend': '/LincolnBlend',
  'lincoln-blend-founders-series-coffee': '/LincolnBlend',
  'roosevelt-blend': '/RooseveltBlend',
  'liberty-torch-blend': '/LibertyTorchBlend',
  'lady-liberty-blend': '/LadyLibertyBlend',
  'eagles-flight-blend': '/EaglesFlightBlend',
  'uncle-sams-bold-brew': '/UncleSamsBoldBrew',
  'rosies-grind': '/RosiesGrind',
  'old-glory-house-blend': '/OldGloryHouseBlend',
  'abigail-adams-blend': '/AbigailAdamsBlend',
  'harriet-tubman-blend': '/HarrietTubmanBlend',
};

export default function ShopifyCollectionGrid({
  collectionHandle,
  accentColor = '#C9A24A',
  maxItems,
  emptyMessage = 'Products loading…',
  useInternalRoutes = true,
}) {
  const { data, isLoading } = useQuery({
    queryKey: ['shopify-collection', collectionHandle],
    queryFn: async () => {
      const res = await base44.functions.invoke('fetchShopifyCollection', { handle: collectionHandle });
      return res.data?.products || [];
    },
    staleTime: 5 * 60 * 1000,
  });

  const products = maxItems ? (data || []).slice(0, maxItems) : (data || []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        {[...Array(maxItems || 4)].map((_, i) => (
          <div key={i} className="animate-pulse" style={{ background: '#161616', aspectRatio: '1/1' }} />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <p className="font-mono text-sm text-center py-12" style={{ color: 'rgba(255,255,255,0.25)' }}>
        {emptyMessage}
      </p>
    );
  }

  const cols = products.length <= 2 ? 'grid-cols-1 sm:grid-cols-2' :
               products.length === 3 ? 'grid-cols-2 md:grid-cols-3' :
               'grid-cols-2 md:grid-cols-4';

  return (
    <div className={`grid ${cols} gap-3 md:gap-5`}>
      {products.map((p, i) => (
        <CoffeeProductCard
          key={p.handle}
          product={p}
          index={i}
          accentColor={accentColor}
          internalRoute={useInternalRoutes ? INTERNAL_ROUTES[p.handle] : null}
        />
      ))}
    </div>
  );
}