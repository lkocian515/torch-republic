import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { MATCHA_PRODUCTS } from '@/lib/mushroomProducts';
import MushroomProductCard from '../components/mushroom/ProductCard';

const MATCHA_GREEN = '#10B981';

export default function MatchaCollection() {
  useSEO({
    title: 'Instant Matcha Blends | Torch Republic Coffee Company',
    description: 'Shop instant matcha blends for calm energy, focus, presence, and daily ritual. Discover The Monk, The Ascendant, and The Alchemist.',
    url: '/matcha',
    type: 'website',
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#111111' }}>
      {/* Hero */}
      <section style={{ background: '#080808', padding: 'clamp(60px,8vw,100px) 24px', borderBottom: `1px solid ${MATCHA_GREEN}25` }}>
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="font-mono text-[9px] tracking-[0.45em] uppercase mb-4" style={{ color: MATCHA_GREEN }}>
              Ceremonial Grade · Calm Energy · No Whisk
            </p>
            <h1 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(2.2rem,4vw,3.2rem)', color: '#F5EFE6', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Instant Matcha Blends
            </h1>
            <p className="font-heading text-sm max-w-2xl mx-auto mb-8" style={{ color: 'rgba(210,195,175,0.6)', fontWeight: 300, lineHeight: 1.8 }}>
              Smooth instant matcha blends for calm energy, focus, presence, and intentional daily rituals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ background: '#0A0A0A', padding: '20px 24px', borderBottom: `1px solid ${MATCHA_GREEN}15` }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[{ label: 'Instant Matcha', icon: Sparkles }, { label: 'Calm Energy', icon: Sparkles }, { label: 'No Whisk', icon: Sparkles }, { label: '25 Servings', icon: Sparkles }].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-2">
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${MATCHA_GREEN}15`, border: `1px solid ${MATCHA_GREEN}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <item.icon size={16} style={{ color: MATCHA_GREEN }} />
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
            {MATCHA_PRODUCTS.map((product, i) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <MushroomProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(60px,8vw,100px) 24px' }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.8rem,3vw,2.4rem)', color: '#F5EFE6' }}>Begin Your Matcha Ritual</h2>
            <p className="font-heading text-sm mb-8" style={{ color: 'rgba(210,195,175,0.55)' }}>Discover calm energy and focused presence.</p>
            <Link to="/shop" className="inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.28em] uppercase font-bold transition-all hover:opacity-90" style={{ background: MATCHA_GREEN, color: '#050505', padding: '14px 36px', borderRadius: '999px' }}>
              Shop All Matcha <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}