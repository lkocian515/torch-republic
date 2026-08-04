import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MUSHROOM_PRODUCTS, MATCHA_PRODUCTS, CLASSIC_COFFEE_PRODUCTS } from '../lib/mushroomProducts';
import { useSEO } from '@/hooks/useSEO';
import BrandStoryCard from '../components/blends/BrandStoryCard';
import BlendCompare from '../components/mushroom/BlendCompare';

const ALL_PRODUCTS = [...MUSHROOM_PRODUCTS, ...MATCHA_PRODUCTS, ...CLASSIC_COFFEE_PRODUCTS];

export default function BlendsCollection() {
  useSEO({
    title: 'All Blends | Mushroom Coffee, Matcha & Classic Coffee',
    description: "Explore all 12 Torch Republic blends: mushroom coffee with Lion's Mane + Chaga, ceremonial grade matcha, and classic instant coffee. 27 servings per tube. No machine needed.",
    url: '/blends',
  });
  return (
    <div style={{ backgroundColor: '#080808', color: '#F0EBE1', minHeight: '100vh' }}>
      <section className="px-6 md:px-10 pt-20 pb-14 text-center"
        style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h1 className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Fuel the Person You're Becoming
          </h1>
          <p className="font-heading max-w-3xl mx-auto mb-8"
            style={{ fontSize: '1rem', color: 'rgba(240,235,225,0.6)', lineHeight: 1.85, fontWeight: 300 }}>
            Torch Republic creates premium coffee, mushroom coffee, and matcha blends inspired by the qualities that shape a meaningful life.
          </p>
          <p className="font-heading max-w-2xl mx-auto mb-6"
            style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.5)', lineHeight: 1.85, fontWeight: 300 }}>
            Not just energy.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['Clarity', 'Discipline', 'Resilience', 'Wisdom', 'Growth'].map((quality, i) => (
              <span key={i} className="font-mono text-[8px] tracking-[0.35em] uppercase px-3 py-1.5"
                style={{ 
                  background: 'rgba(230,183,173,0.08)', 
                  color: '#E6B7AD', 
                  border: '1px solid rgba(230,183,173,0.15)',
                  borderRadius: '2px'
                }}>
                {quality}
              </span>
            ))}
          </div>
          <p className="font-heading max-w-2xl mx-auto mb-8"
            style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.5)', lineHeight: 1.85, fontWeight: 300 }}>
            Because transformation is built through the rituals we practice every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop"
              className="inline-flex items-center justify-center gap-2 font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90"
              style={{ background: '#E6B7AD', color: '#080808', padding: '14px 32px' }}>
              Shop the Collection →
            </Link>
            <Link to="/quiz"
              className="inline-flex items-center justify-center gap-2 font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90"
              style={{ background: 'transparent', color: '#E6B7AD', padding: '14px 32px', border: '1px solid rgba(230,183,173,0.3)' }}>
              Discover Your Archetype
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Classic Coffee */}
      <section className="px-6 md:px-10 py-16">
        <div className="max-w-[1280px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: '#C4A35A' }}>
              Classic Instant Coffee
            </p>
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#FFFFFF' }}>
              Coffee for the Rising
            </h2>
            <p className="font-heading mt-3" style={{ fontSize: '0.9rem', color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.8, maxWidth: '600px' }}>
              Three blends inspired by resilience, leadership, and renewal. Crafted for those building something meaningful.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLASSIC_COFFEE_PRODUCTS.map((product, i) => (
              <BrandStoryCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Mushroom Coffee */}
      <section className="px-6 md:px-10 py-16" style={{ borderTop: '1px solid rgba(230,183,173,0.08)' }}>
        <div className="max-w-[1280px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: '#E6B7AD' }}>
              Mushroom Coffee
            </p>
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#FFFFFF' }}>
              Functional Wellness for the Modern Ritual
            </h2>
            <p className="font-heading mt-3" style={{ fontSize: '0.9rem', color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.8, maxWidth: '600px' }}>
              Inspired by vitality, restoration, clarity, wisdom, and transformation. Six blends for six qualities of a meaningful life.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MUSHROOM_PRODUCTS.map((product, i) => (
              <BrandStoryCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Matcha */}
      <section className="px-6 md:px-10 py-16" style={{ borderTop: '1px solid rgba(230,183,173,0.08)' }}>
        <div className="max-w-[1280px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: '#10B981' }}>
              Ceremonial Matcha
            </p>
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#FFFFFF' }}>
              Matcha for Mastery
            </h2>
            <p className="font-heading mt-3" style={{ fontSize: '0.9rem', color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.8, maxWidth: '600px' }}>
              Three ceremonial matcha blends inspired by discipline, transformation, and creation. For those who choose mastery over mindlessness.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MATCHA_PRODUCTS.map((product, i) => (
              <BrandStoryCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      <BlendCompare />

      <section className="px-6 py-16 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.08)' }}>
        <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.5)' }}>
          Can't choose just one?
        </p>
        <h2 className="font-serif font-bold mb-6 text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.4rem)' }}>
          Shop the Complete Collection
        </h2>
        <Link to="/build-your-ritual"
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90"
          style={{ background: '#E6B7AD', color: '#080808', padding: '14px 32px' }}>
          Shop All Blends →
        </Link>
      </section>
    </div>
  );
}