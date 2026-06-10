import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Coffee, Zap, Sparkles } from 'lucide-react';
import { CLASSIC_COFFEE_PRODUCTS } from '@/lib/mushroomProducts';
import MushroomProductCard from '../components/mushroom/ProductCard';
import CollectionReviewCarousel from '../components/mushroom/CollectionReviewCarousel';

const GOLD = '#C4A35A';

export default function ClassicCoffeeCollection() {
  useSEO({
    title: 'Premium Instant Coffee | Torch Republic Reserve Collection',
    description: 'Shop smooth premium instant coffee blends from Torch Republic\'s Reserve Collection. No machine needed. Rich flavor. 27 servings per tube.',
    url: '/classic-coffee',
    type: 'website',
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#111111' }}>
      {/* Hero */}
      <section style={{ background: '#080808', padding: 'clamp(60px,8vw,100px) 24px', borderBottom: `1px solid ${GOLD}25` }}>
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="font-mono text-[9px] tracking-[0.45em] uppercase mb-4" style={{ color: GOLD }}>
              Torch Republic Coffee Co. — Classic Instant Coffee
            </p>
            <h1 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(2.2rem,4vw,3.2rem)', color: '#F5EFE6', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Premium Instant Coffee
            </h1>
            <p className="font-heading text-sm max-w-2xl mx-auto mb-6" style={{ color: 'rgba(210,195,175,0.6)', fontWeight: 300, lineHeight: 1.8 }}>
              Three premium coffee-forward instant blends for smooth energy, rich flavor, and everyday convenience. No machines, no pods — just hot water and a great cup.
            </p>
            <div style={{ background: 'rgba(196,163,90,0.08)', border: '1px solid rgba(196,163,90,0.15)', borderRadius: '6px', padding: '16px' }}>
              <p className="font-heading text-xs" style={{ color: 'rgba(245,239,230,0.55)', lineHeight: 1.7 }}>
                <strong>Note:</strong> These are pure classic coffee blends. They do not contain mushrooms.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ background: '#0A0A0A', padding: '20px 24px', borderBottom: `1px solid ${GOLD}15` }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[{ label: '100% Arabica', icon: Coffee }, { label: 'No Coffee Maker', icon: Zap }, { label: '27 Servings', icon: Sparkles }, { label: 'No Mushrooms', icon: Coffee }].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-2">
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${GOLD}15`, border: `1px solid ${GOLD}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <item.icon size={16} style={{ color: GOLD }} />
                </div>
                <p className="font-heading text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(245,239,230,0.6)' }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section style={{ padding: 'clamp(60px,8vw,100px) 24px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CLASSIC_COFFEE_PRODUCTS.map((product, i) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <MushroomProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <CollectionReviewCarousel category="classic-coffee" />

      {/* CTA */}
      <section style={{ padding: 'clamp(60px,8vw,100px) 24px' }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.8rem,3vw,2.4rem)', color: '#F5EFE6' }}>Simple. Premium. Instant.</h2>
            <p className="font-heading text-sm mb-8" style={{ color: 'rgba(210,195,175,0.55)' }}>Premium instant coffee crafted for smooth energy, rich flavor, and a daily ritual that fits real life. No machine required — just add water and begin.</p>
            <Link to="/shop" className="inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.28em] uppercase font-bold transition-all hover:opacity-90" style={{ background: GOLD, color: '#050505', padding: '14px 36px', borderRadius: '999px' }}>
              Shop All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}