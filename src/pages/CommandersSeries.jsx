import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import CollectionPageTemplate from '../components/collections/CollectionPageTemplate';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80';

function ProductCard({ product, index }) {
  const title = product.title.replace(/[-–]\s*(Commanders Series Coffee|Commanders Series|Coffee)\s*/gi, '').trim();
  const imgSrc = product.image_url || PLACEHOLDER;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
    >
      <a href={`https://torch-republic.com/products/${product.shopify_handle}`} target="_blank" rel="noopener noreferrer"
        className="group flex flex-col"
        style={{ background: '#0D0D0D', border: '1px solid rgba(168,137,58,0.15)', textDecoration: 'none', transition: 'border-color 0.25s' }}
        onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(168,137,58,0.5)'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(168,137,58,0.15)'}
      >
        <div className="relative overflow-hidden" style={{ aspectRatio: '4/3', background: '#111' }}>
          <img src={imgSrc} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ opacity: 0.85 }} onError={e => { e.currentTarget.src = PLACEHOLDER; }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)' }} />
        </div>
        <div className="p-5">
          <p className="font-serif font-bold text-white mb-1" style={{ fontSize: '1rem' }}>{title}</p>
          <p className="font-mono font-black text-sm" style={{ color: '#A8893A' }}>${product.price?.toFixed(2)}</p>
        </div>
      </a>
    </motion.div>
  );
}

export default function CommandersSeries() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['commanders-series-products'],
    queryFn: () => base44.entities.Product.filter({ collection: 'commanders-series' }, '', 20),
  });

  return (
    <CollectionPageTemplate
      bannerImage="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&q=85"
      eyebrow="Torch Republic · Collection 03"
      title="Commanders Series"
      subtitle="Leadership under pressure. Built for those who take command."
      description="The Commanders Series honors the men and women who led with conviction — not comfort. Those who studied history, prepared relentlessly, and acted when others hesitated."
      quote="Leadership is not a rank. It's a decision made daily."
      accentColor="#C9A24A"
    >
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {[1,2,3].map(i => <div key={i} className="animate-pulse" style={{ background: '#161616', aspectRatio: '4/3' }} />)}
        </div>
      ) : products.length > 0 ? (
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${products.length >= 3 ? 'md:grid-cols-3' : ''} gap-5`}>
          {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center py-20 px-6"
          style={{ border: '1px solid rgba(168,137,58,0.1)', background: 'rgba(168,137,58,0.03)' }}>
          <div className="flex items-center justify-center w-14 h-14 mx-auto mb-6"
            style={{ border: '1px solid rgba(168,137,58,0.2)', background: 'rgba(168,137,58,0.06)' }}>
            <Shield className="w-6 h-6" style={{ color: 'rgba(168,137,58,0.5)' }} />
          </div>
          <p className="font-mono text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(168,137,58,0.45)' }}>Coming Soon</p>
          <p className="font-serif text-xl mb-2" style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 700 }}>This series is being crafted.</p>
          <p className="font-heading max-w-md mx-auto" style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.3)', lineHeight: 1.85, fontWeight: 300 }}>
            Each blend will honor the men and women who led with conviction under fire. Bold roasts for those who take command.
          </p>
        </motion.div>
      )}
    </CollectionPageTemplate>
  );
}