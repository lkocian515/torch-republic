import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import CollectionPageTemplate from '../components/collections/CollectionPageTemplate';

const AC = '#D4A0C0';
const AC_RGB = '212,160,192';
const PLACEHOLDER = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80';

const INTERNAL_ROUTES = {
  'remember-the-ladies': '/AbigailAdamsBlend',
  'midnight-railway': '/HarrietTubmanBlend',
};

const COMING_SOON = [
  { name: 'Eleanor Roosevelt Blend', roast: 'Medium Roast · Smooth & Bold' },
  { name: 'Sacagawea Blend', roast: 'Medium-Dark · Earthy & Adventurous' },
  { name: 'Susan B. Anthony Blend', roast: 'Dark Roast · Rich & Resolute' },
];

function ProductCard({ product, index }) {
  const handle = product.shopify_handle || product.handle;
  const route = INTERNAL_ROUTES[handle];
  const title = product.title.replace(/[-–]\s*(Women of the Republic|Coffee)\s*/gi, '').trim();
  // Always use this product's own image — no fallback to another product's image
  const imgSrc = product.image_url || PLACEHOLDER;

  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group flex flex-col"
      style={{ background: '#0D0D0D', border: `1px solid rgba(${AC_RGB},0.15)`, transition: 'border-color 0.25s' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = `rgba(${AC_RGB},0.5)`}
      onMouseLeave={e => e.currentTarget.style.borderColor = `rgba(${AC_RGB},0.15)`}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3', background: '#111' }}>
        <img src={imgSrc} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ opacity: 0.85 }} onError={e => { e.currentTarget.src = PLACEHOLDER; }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)' }} />
        <div className="absolute bottom-3 right-3">
          <span className="font-mono text-[8px] uppercase tracking-wider px-2.5 py-1"
            style={{ background: `rgba(${AC_RGB},0.15)`, border: `1px solid rgba(${AC_RGB},0.35)`, color: AC }}>Available Now</span>
        </div>
      </div>
      <div className="p-5 flex items-center justify-between gap-3">
        <div>
          <p className="font-serif font-bold text-white mb-1" style={{ fontSize: '1rem' }}>{title}</p>
          <p className="font-mono text-[9px] tracking-widest uppercase" style={{ color: `rgba(${AC_RGB},0.5)` }}>
            ${product.price?.toFixed(2)}
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="font-mono text-[9px] flex items-center gap-1 mt-1" style={{ color: `rgba(${AC_RGB},0.5)` }}>
            Shop Now <ChevronRight className="w-3 h-3" />
          </p>
        </div>
      </div>
    </motion.div>
  );

  if (route) return <Link key={product.id} to={route} style={{ textDecoration: 'none' }}>{inner}</Link>;
  return <a key={product.id} href={`https://torch-republic.com/products/${handle}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>{inner}</a>;
}

export default function WomenOfTheRepublic() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['women-of-the-republic-products'],
    queryFn: () => base44.entities.Product.filter({ collection: 'women-of-the-republic' }, '', 20),
    staleTime: 0,
  });

  return (
    <CollectionPageTemplate
      bannerImage="https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=1600&q=85"
      eyebrow="Torch Republic"
      title="Women of the Republic"
      subtitle="Strength, influence, and legacy — honoring the women who shaped history."
      description="Behind every great movement, there were women who refused to be quiet. Who organized, who marched, who built institutions, raised leaders, and changed the course of history without always receiving credit. This collection is for them — and for you."
      quote="Well-behaved women seldom make history."
      quoteAttrib="Laurel Thatcher Ulrich"
      accentColor={AC}
    >
      <div className="mb-4">
        <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-6" style={{ color: `rgba(${AC_RGB},0.5)` }}>
          {products.length > 0 ? 'Available Now' : 'Coming Soon'}
        </p>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
            {[1, 2].map(i => <div key={i} className="animate-pulse" style={{ background: '#161616', aspectRatio: '4/3' }} />)}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
            {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        ) : (
          <div className="text-center py-16 mb-12" style={{ border: `1px solid rgba(${AC_RGB},0.1)`, background: `rgba(${AC_RGB},0.03)` }}>
            <p className="font-mono text-[10px] tracking-[0.5em] uppercase mb-3" style={{ color: `rgba(${AC_RGB},0.4)` }}>Coming Soon</p>
            <p className="font-serif text-lg" style={{ color: 'rgba(240,235,225,0.4)' }}>First blends arriving soon.</p>
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