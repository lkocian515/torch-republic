import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { ChevronRight } from 'lucide-react';
import CollectionPageTemplate from '../components/collections/CollectionPageTemplate';

const AC = '#D4A0C0';
const PLACEHOLDER = 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80';

const STATIC_LIVE = [
  {
    name: 'Abigail Adams Blend',
    code: 'WR-001',
    roast: 'Light Roast · Floral & Bright',
    price: '$19.99',
    route: '/AbigailAdamsBlend',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/29.png?v=1776037980',
  },
  {
    name: 'Harriet Tubman Blend',
    code: 'WR-002',
    roast: 'Dark Roast · Bold & Unyielding',
    price: '$19.99',
    route: '/HarrietTubmanBlend',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/28.png?v=1776038440',
  },
];

const COMING_SOON = [
  { name: 'Eleanor Roosevelt Blend', roast: 'Medium Roast · Smooth & Bold' },
  { name: 'Sacagawea Blend', roast: 'Medium-Dark · Earthy & Adventurous' },
  { name: 'Susan B. Anthony Blend', roast: 'Dark Roast · Rich & Resolute' },
];

function ProductCard({ product, route, image, roast, code }) {
  const imgSrc = product?.image_url || image || PLACEHOLDER;
  const title = product?.title || product?.name;
  const priceStr = product?.price ? `$${parseFloat(product.price).toFixed(2)}` : '$19.99';
  const handle = product?.shopify_handle;
  const href = handle ? `https://torch-republic.com/products/${handle}` : null;

  const inner = (
    <div className="group flex flex-col"
      style={{ background: '#0D0D0D', border: `1px solid rgba(212,160,192,0.15)`, transition: 'border-color 0.25s' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(212,160,192,0.5)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(212,160,192,0.15)'}>
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3', background: '#111' }}>
        <img src={imgSrc} alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ opacity: 0.85 }}
          onError={e => { e.currentTarget.src = PLACEHOLDER; }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)' }} />
        {code && (
          <div className="absolute top-3 left-3">
            <span className="font-mono text-[8px] tracking-widest uppercase px-2 py-1"
              style={{ background: `rgba(212,160,192,0.12)`, border: `1px solid rgba(212,160,192,0.3)`, color: AC }}>{code}</span>
          </div>
        )}
        <div className="absolute bottom-3 right-3">
          <span className="font-mono text-[8px] uppercase tracking-wider px-2.5 py-1"
            style={{ background: 'rgba(212,160,192,0.15)', border: `1px solid rgba(212,160,192,0.35)`, color: AC }}>Available Now</span>
        </div>
      </div>
      <div className="p-5 flex items-center justify-between gap-3">
        <div>
          <p className="font-serif font-bold text-white mb-1" style={{ fontSize: '1rem' }}>{title}</p>
          {roast && <p className="font-mono text-[9px] tracking-widest uppercase" style={{ color: `rgba(212,160,192,0.5)` }}>{roast}</p>}
        </div>
        <div className="text-right flex-shrink-0">
          <p className="font-mono font-black" style={{ color: AC }}>{priceStr}</p>
          <p className="font-mono text-[9px] flex items-center gap-1 mt-1" style={{ color: `rgba(212,160,192,0.5)` }}>
            Shop Now <ChevronRight className="w-3 h-3" />
          </p>
        </div>
      </div>
    </div>
  );

  if (href) return <a href={href} target="_blank" rel="noopener noreferrer">{inner}</a>;
  if (route) return <Link to={route}>{inner}</Link>;
  return inner;
}

export default function WomenOfTheRepublic() {
  const { data: dbProducts = [], isLoading } = useQuery({
    queryKey: ['women-republic-page'],
    queryFn: () => base44.entities.Product.filter({ collection: 'women-of-the-republic' }, '', 20),
  });

  const liveProducts = dbProducts.length > 0 ? dbProducts : null;

  return (
    <CollectionPageTemplate
      bannerImage="https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=1600&q=85"
      eyebrow="Torch Republic"
      title="Women of the Republic"
      subtitle="Strength, influence, and legacy — honoring the women who shaped history."
      description="Behind every great movement, there were women who refused to be quiet. Who organized, who marched, who built institutions, raised leaders, and changed the course of history without always receiving credit. This collection is for them — and for you."
      quote="Well-behaved women seldom make history."
      quoteAttrib="Laurel Thatcher Ulrich"
      accentColor="#D4A0C0"
    >
      <div className="mb-4">
        {/* Live products */}
        <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-6" style={{ color: `rgba(212,160,192,0.5)` }}>
          Available Now
        </p>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
            {[0,1].map(i => <div key={i} className="animate-pulse" style={{ background: '#161616', aspectRatio: '4/3' }} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
            {liveProducts
              ? liveProducts.map((p, i) => (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <ProductCard product={p} />
                  </motion.div>
                ))
              : STATIC_LIVE.map((s, i) => (
                  <motion.div key={s.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <ProductCard product={{ title: s.name, image_url: s.image }} route={s.route} image={s.image} roast={s.roast} code={s.code} />
                  </motion.div>
                ))
            }
          </div>
        )}

        {/* Coming soon */}
        <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-6" style={{ color: 'rgba(201,162,74,0.35)' }}>
          Coming Next
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" style={{ opacity: 0.45 }}>
          {COMING_SOON.map(item => (
            <div key={item.name} className="p-5" style={{ background: '#0A0A0A', border: '1px solid rgba(201,162,74,0.08)' }}>
              <p className="font-serif font-bold text-white mb-1" style={{ fontSize: '0.9rem' }}>{item.name}</p>
              <p className="font-mono text-[9px] tracking-widest uppercase" style={{ color: 'rgba(201,162,74,0.35)' }}>{item.roast}</p>
              <p className="font-mono text-[8px] uppercase tracking-wider mt-3" style={{ color: 'rgba(201,162,74,0.3)' }}>Coming Soon</p>
            </div>
          ))}
        </div>
      </div>
    </CollectionPageTemplate>
  );
}