import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Clock, Coffee, CheckCircle } from 'lucide-react';
import { CLASSIC_COFFEE_PRODUCTS } from '@/lib/mushroomProducts';

const RG = '#E6B7AD';
const DIM = 'rgba(240,232,220,0.55)';

const VS = [
  { label: 'Regular Instant Coffee', items: ['Energy spike → hard crash', 'Anxiety and jitters', 'No functional support', 'Artificial flavors common'] },
  { label: 'Torch Republic Instant', items: ['Clean energy with smooth taper', 'Zero jitters — mushrooms buffer caffeine', 'Cordyceps + Lion\'s Mane for sustained focus', 'Organic, transparent ingredients'] },
];

const STEPS = [
  { icon: Coffee, step: '01', title: 'Open your tube', body: 'Each compact tube holds 27 servings — ready for home, travel, or the office.' },
  { icon: Zap, step: '02', title: 'Add to hot water', body: 'One scoop into 8–10oz of hot water (or milk). Stir for 20 seconds.' },
  { icon: Clock, step: '03', title: 'Ready in 30 seconds', body: 'No machine. No pods. No waiting. Your ritual, simplified.' },
];

export default function InstantCoffeeForEnergy() {
  useSEO({
    title: 'Instant Coffee for Clean Energy | No Crash | Torch Republic Coffee Co.',
    description: 'Premium instant coffee and mushroom coffee blends for clean, sustained energy without the crash. No machines, no pods. Just add hot water and begin. Shop Torch Republic Coffee Co.',
    url: '/instant-coffee-for-energy',
  });

  return (
    <div style={{ background: '#100F0D', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ padding: 'clamp(64px, 8vw, 120px) 24px 48px', textAlign: 'center', maxWidth: '740px', margin: '0 auto' }}>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.48em', textTransform: 'uppercase', color: 'rgba(230,183,173,0.45)', marginBottom: '16px' }}
        >
          Torch Republic · Energy
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.06 }}
          className="font-serif font-bold"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', color: '#F5EFE6', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '20px' }}
        >
          Instant Coffee for Energy<br />
          <span style={{ color: RG }}>That Lasts All Day</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.14 }}
          className="font-heading"
          style={{ fontSize: '1rem', color: DIM, fontWeight: 300, lineHeight: 1.8, marginBottom: '36px' }}
        >
          Not all instant coffee is created equal. Torch Republic blends specialty-grade coffee with Cordyceps and Lion's Mane for energy that rises smoothly, peaks with focus, and tapers without a crash.
        </motion.p>
        
        {/* Product showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-4 justify-center mb-8 flex-wrap"
        >
          {CLASSIC_COFFEE_PRODUCTS.slice(0, 3).map((product) => (
            <div key={product.id} className="relative" style={{ width: '140px', height: '140px' }}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
                style={{ filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.5))' }}
              />
            </div>
          ))}
        </motion.div>
        
        <Link to="/shop" style={{ display: 'inline-block', background: RG, color: '#040404', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.24em', textTransform: 'uppercase', fontWeight: 700, padding: '14px 36px', textDecoration: 'none' }}>
          Shop Energy Blends
        </Link>
      </section>

      {/* Comparison */}
      <section style={{ maxWidth: '860px', margin: '0 auto', padding: '0 24px 72px' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(230,183,173,0.45)', marginBottom: '24px', textAlign: 'center' }}>The Difference</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'rgba(230,183,173,0.08)', border: '1px solid rgba(230,183,173,0.08)' }}>
          {VS.map((col, ci) => (
            <div key={col.label} style={{ background: '#100F0D', padding: '32px 28px' }}>
              <p className="font-serif font-bold" style={{ color: ci === 1 ? RG : 'rgba(240,232,220,0.4)', fontSize: '1rem', marginBottom: '20px' }}>{col.label}</p>
              {col.items.map(item => (
                <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <CheckCircle size={13} style={{ color: ci === 1 ? RG : 'rgba(255,255,255,0.18)', flexShrink: 0, marginTop: '3px' }} />
                  <span className="font-heading" style={{ fontSize: '0.87rem', color: ci === 1 ? DIM : 'rgba(240,232,220,0.28)', fontWeight: 300, lineHeight: 1.65 }}>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* How simple it is */}
      <section style={{ background: 'rgba(230,183,173,0.03)', borderTop: '1px solid rgba(230,183,173,0.07)', padding: 'clamp(48px, 6vw, 80px) 24px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(230,183,173,0.45)', marginBottom: '12px', textAlign: 'center' }}>Ready in 30 Seconds</p>
          <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#F5EFE6', marginBottom: '40px', textAlign: 'center' }}>No Machine. No Pods. No Waste.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {STEPS.map(s => (
              <div key={s.step} style={{ padding: '24px', border: '1px solid rgba(230,183,173,0.1)', position: 'relative' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.3em', color: 'rgba(230,183,173,0.3)', marginBottom: '12px' }}>{s.step}</p>
                <s.icon size={20} style={{ color: RG, marginBottom: '12px' }} />
                <h3 className="font-serif font-bold" style={{ color: '#F5EFE6', fontSize: '1rem', marginBottom: '8px' }}>{s.title}</h3>
                <p className="font-heading" style={{ color: DIM, fontSize: '0.87rem', fontWeight: 300, lineHeight: 1.7, margin: 0 }}>{s.body}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/shop" style={{ display: 'inline-block', background: RG, color: '#040404', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.24em', textTransform: 'uppercase', fontWeight: 700, padding: '14px 36px', textDecoration: 'none' }}>
              Start Your Ritual — 30-Day Guarantee
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}