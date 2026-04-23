import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import ProductBadge from '../../products/ProductBadge';

const POD_HANDLE = 'washington-blend-coffee-pods';
const SHOPIFY_URL = '/washington-pods';

async function fetchPodsProduct() {
  const res = await base44.functions.invoke('getSpotlightProduct', { handle: POD_HANDLE });
  return res.data;
}

export default function WashingtonPodsSpotlight() {
  const { data: product, isLoading } = useQuery({
    queryKey: ['spotlight-pods', POD_HANDLE],
    queryFn: fetchPodsProduct,
    staleTime: 0,
    gcTime: 0,
    retry: 1,
  });

  if (!isLoading && !product?.firstImage) return null;

  const price = product?.price ? `$${Number(product.price).toFixed(2)}` : '$15.00';
  const imageUrl = product?.firstImage;

  return (
    <section style={{ background: '#0A0A0A', borderBottom: '1px solid rgba(201,162,74,0.1)' }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-16 md:py-20">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-8">
          <div style={{ width: 28, height: 1, background: 'rgba(201,162,74,0.55)' }} />
          <p className="font-mono text-[9px] tracking-[0.6em] uppercase" style={{ color: 'rgba(201,162,74,0.55)' }}>
            Featured Product · First
          </p>
        </div>

        {/* Product Card */}
        <Link
          to={SHOPIFY_URL}
          style={{ textDecoration: 'none', maxWidth: '360px', display: 'block' }}
        >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="group flex flex-col overflow-hidden rounded-lg"
          style={{
            background: '#0B0B0B',
            border: '1px solid rgba(201,162,74,0.2)',
            transition: 'border-color 0.25s, box-shadow 0.25s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(201,162,74,0.75)';
            e.currentTarget.style.boxShadow = '0 0 32px 4px rgba(201,162,74,0.18)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(201,162,74,0.2)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {/* Image */}
          <div className="relative overflow-hidden" style={{ aspectRatio: '1/1' }}>
            {isLoading ? (
              <div className="animate-pulse w-full h-full" style={{ background: '#161616' }} />
            ) : imageUrl ? (
              <>
                <img
                  src={imageUrl}
                  alt="Washington Blend Pods — premium American coffee from Torch Republic"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ opacity: 0.95 }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
                {/* Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <ProductBadge type="Recommended First" />
                </div>
              </>
            ) : null}
          </div>

          {/* Product Info */}
          <div className="p-5 flex flex-col gap-2">
            <h3 className="font-serif font-bold" style={{ fontSize: '1.05rem', color: '#FFFFFF', lineHeight: 1.25 }}>
              Washington Blend Pods
            </h3>
            <p className="font-heading text-[13px]" style={{ color: 'rgba(240,235,225,0.6)', lineHeight: 1.5 }}>
              Dark roast pods. Precision roasted. Ready to brew.
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(i => (
                  <span key={i} style={{ color: '#C9A24A', fontSize: '10px' }}>
                    ★
                  </span>
                ))}
              </div>
              <span className="font-mono text-[9px] font-bold" style={{ color: '#C9A24A' }}>
                4.9
              </span>
              <span className="font-mono text-[9px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
                · Verified
              </span>
            </div>
            <span className="font-mono font-bold text-sm mt-1" style={{ color: '#C9A24A' }}>
              {price}
            </span>
          </div>
        </motion.div>
        </Link>
      </div>
    </section>
  );
}