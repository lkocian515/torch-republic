import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const RG = '#E6B7AD';
const DIM = 'rgba(240,232,220,0.55)';

const FACTS = [
  "Lion's Mane (Hericium erinaceus) is a white, shaggy mushroom native to North America, Europe, and Asia",
  "Contains hericenones and erinacines — two compounds shown to stimulate Nerve Growth Factor (NGF) synthesis",
  "Traditionally used in Japanese and Chinese medicine to support cognitive health and mental vitality",
  "Each Torch Republic blend contains 500mg of organic dual-extracted Lion's Mane per serving",
  "Dual extraction (hot water + alcohol) is required to access both water-soluble beta-glucans and alcohol-soluble terpenoids",
  "Best taken consistently — most users notice clearer thinking and reduced mental fatigue within 2–4 weeks",
];

const PRODUCTS = [
  { name: 'GlowMind Clarity Blend', tagline: 'Lion\'s Mane forward — your morning focus ritual', slug: 'glowmind-clarity' },
  { name: 'Steady State Focus', tagline: 'Sustained attention without the spike', slug: 'steady-state-focus' },
];

export default function LionsManeCoffee() {
  useSEO({
    title: "Lion's Mane Mushroom Coffee | Torch Republic Coffee Co.",
    description: "Instant mushroom coffee with Lion's Mane for focus, mental clarity, and calm energy. Coffee-forward taste, no machines needed. Shop Torch Republic mushroom coffee blends.",
    url: '/lions-mane-coffee',
  });

  return (
    <div style={{ background: '#100F0D', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ padding: 'clamp(64px, 8vw, 120px) 24px 48px', textAlign: 'center', maxWidth: '740px', margin: '0 auto' }}>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.48em', textTransform: 'uppercase', color: 'rgba(230,183,173,0.45)', marginBottom: '16px' }}
        >
          Torch Republic · Lion's Mane Coffee
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.06 }}
          className="font-serif font-bold"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', color: '#F5EFE6', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '20px' }}
        >
          Lion's Mane Coffee<br />
          <span style={{ color: RG }}>for Focus & Mental Clarity</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.14 }}
          className="font-heading"
          style={{ fontSize: '1rem', color: DIM, fontWeight: 300, lineHeight: 1.8, marginBottom: '36px' }}
        >
          Premium instant coffee blended with 500mg of organic, dual-extracted Lion's Mane mushroom. Designed for the kind of focus that lasts — clean, calm, and grounded. No coffee maker needed.
        </motion.p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/shop" style={{ display: 'inline-block', background: RG, color: '#040404', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.24em', textTransform: 'uppercase', fontWeight: 700, padding: '14px 32px', textDecoration: 'none' }}>
            Shop Lion's Mane Blends
          </Link>
          <Link to="/mushroom-coffee-benefits" style={{ display: 'inline-block', border: '1px solid rgba(230,183,173,0.3)', color: RG, fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.24em', textTransform: 'uppercase', fontWeight: 600, padding: '14px 32px', textDecoration: 'none' }}>
            All Mushroom Benefits
          </Link>
        </div>
      </section>

      {/* What is Lion's Mane */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '24px 24px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', alignItems: 'start' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(230,183,173,0.45)', marginBottom: '12px' }}>The Mushroom</p>
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#F5EFE6', lineHeight: 1.2, marginBottom: '16px' }}>
              What Makes Lion's Mane Different
            </h2>
            <p className="font-heading" style={{ fontSize: '0.9rem', color: DIM, fontWeight: 300, lineHeight: 1.8 }}>
              Most functional mushrooms are valued for immune support. Lion's Mane is the rare exception — its active compounds (hericenones and erinacines) are studied specifically for their potential to support brain health, nerve function, and cognitive clarity. It's one of the most researched nootropic mushrooms in modern science.
            </p>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(230,183,173,0.45)', marginBottom: '12px' }}>Key Facts</p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {FACTS.map(fact => (
                <li key={fact} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <CheckCircle size={14} style={{ color: RG, flexShrink: 0, marginTop: '3px' }} />
                  <span className="font-heading" style={{ fontSize: '0.85rem', color: DIM, fontWeight: 300, lineHeight: 1.65 }}>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ background: 'rgba(230,183,173,0.03)', borderTop: '1px solid rgba(230,183,173,0.07)', padding: 'clamp(48px, 6vw, 80px) 24px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(230,183,173,0.45)', marginBottom: '12px' }}>Our Blends</p>
          <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#F5EFE6', marginBottom: '36px' }}>
            Find Your Lion's Mane Ritual
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
            {PRODUCTS.map(p => (
              <Link key={p.slug} to={`/blends/${p.slug}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '20px 24px', background: '#100F0D', border: '1px solid rgba(230,183,173,0.12)', transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(230,183,173,0.35)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(230,183,173,0.12)'}
              >
                <div>
                  <p className="font-serif font-bold" style={{ color: '#F5EFE6', fontSize: '1rem', margin: '0 0 4px' }}>{p.name}</p>
                  <p className="font-heading" style={{ color: DIM, fontSize: '0.85rem', fontWeight: 300, margin: 0 }}>{p.tagline}</p>
                </div>
                <span style={{ color: RG, fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>View →</span>
              </Link>
            ))}
          </div>
          <Link to="/shop" style={{ display: 'inline-block', marginTop: '24px', color: RG, fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', textDecoration: 'none' }}>
            See All Blends →
          </Link>
        </div>
      </section>
    </div>
  );
}