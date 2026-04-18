import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import CollectionPageTemplate from '../components/collections/CollectionPageTemplate';

const AC = '#D4A0C0';

const LIVE = [
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

export default function WomenOfTheRepublic() {
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
      {/* Live products */}
      <div className="mb-4">
        <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-6" style={{ color: `rgba(212,160,192,0.5)` }}>
          Available Now
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
          {LIVE.map((product, i) => (
            <motion.div key={product.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Link to={product.route} className="group flex flex-col"
                style={{ background: '#0D0D0D', border: `1px solid rgba(212,160,192,0.15)`, transition: 'border-color 0.25s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(212,160,192,0.5)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(212,160,192,0.15)'}>
                <div className="relative overflow-hidden" style={{ aspectRatio: '4/3', background: '#111' }}>
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ opacity: 0.85 }} onError={e => { e.currentTarget.style.display = 'none'; }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)' }} />
                  <div className="absolute top-3 left-3">
                    <span className="font-mono text-[8px] tracking-widest uppercase px-2 py-1"
                      style={{ background: `rgba(212,160,192,0.12)`, border: `1px solid rgba(212,160,192,0.3)`, color: AC }}>{product.code}</span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="font-mono text-[8px] uppercase tracking-wider px-2.5 py-1"
                      style={{ background: 'rgba(212,160,192,0.15)', border: `1px solid rgba(212,160,192,0.35)`, color: AC }}>Available Now</span>
                  </div>
                </div>
                <div className="p-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-serif font-bold text-white mb-1" style={{ fontSize: '1rem' }}>{product.name}</p>
                    <p className="font-mono text-[9px] tracking-widest uppercase" style={{ color: `rgba(212,160,192,0.5)` }}>{product.roast}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-mono font-black" style={{ color: AC }}>{product.price}</p>
                    <p className="font-mono text-[9px] flex items-center gap-1 mt-1" style={{ color: `rgba(212,160,192,0.5)` }}>
                      Shop Now <ChevronRight className="w-3 h-3" />
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

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