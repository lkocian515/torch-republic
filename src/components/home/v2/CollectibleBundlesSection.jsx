import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';

const BUNDLES = [
  {
    id: 'lady-liberty',
    name: 'Lady Liberty Bundle',
    accent: '#B38B4D',
    coffeeImage: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/29.png?v=1776037980',
    bobbleheadImage: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/statue-of-liberty-bobblehead-2687882.jpg?v=1771884543',
    coffeeName: 'Lady Liberty Blend',
    bobbleheadName: 'Statue of Liberty Bobblehead',
    price: 34.99,
    originalPrice: 44.99,
  },
  {
    id: 'uncle-sam',
    name: 'Uncle Sam Bundle',
    accent: '#9B7B4D',
    coffeeImage: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/27.png?v=1776038585',
    bobbleheadImage: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/uncle-sam-bobblehead-9372592.jpg?v=1771884549',
    coffeeName: "Uncle Sam's Bold Brew",
    bobbleheadName: 'Uncle Sam Bobblehead',
    price: 34.99,
    originalPrice: 44.99,
  },
  {
    id: 'rosies-grind',
    name: "Rosie's Grind Bundle",
    accent: '#A8893A',
    coffeeImage: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/28.png?v=1776038440',
    bobbleheadImage: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/rosie-the-riveter-bobblehead-9779749.jpg?v=1771884520',
    coffeeName: "Rosie's Grind",
    bobbleheadName: 'Rosie the Riveter Bobblehead',
    price: 34.99,
    originalPrice: 44.99,
  },
];

export default function CollectibleBundlesSection() {
  return (
    <section style={{ backgroundColor: '#070707', padding: '80px 24px', borderTop: '1px solid rgba(201,162,74,0.1)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          style={{ marginBottom: '52px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: 32, height: 1, background: '#C9A24A' }} />
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(201,162,74,0.55)' }}>
              Limited Edition
            </p>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-serif)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '10px' }}>
            Collectible Bundles
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'rgba(240,235,225,0.5)', lineHeight: 1.65, maxWidth: '400px' }}>
            Drink it. Display it. Collect it.
          </p>
        </motion.div>

        {/* Bundle cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '44px' }}>
          {BUNDLES.map((bundle, idx) => {
            const { accent } = bundle;
            return (
              <motion.div
                key={bundle.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                style={{
                  background: '#0B0B0B',
                  border: `1px solid ${accent}20`,
                  overflow: 'hidden',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${accent}50`;
                  e.currentTarget.style.boxShadow = `0 0 32px 2px ${accent}0D`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = `${accent}20`;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Product images side-by-side */}
                <div style={{
                  background: `radial-gradient(ellipse 80% 70% at 50% 50%, ${accent}10 0%, #050505 100%)`,
                  padding: '24px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  minHeight: '200px',
                  borderBottom: `1px solid ${accent}14`,
                }}>
                  <img
                    src={bundle.coffeeImage}
                    alt={`${bundle.coffeeName} premium coffee from Torch Republic`}
                    style={{ maxHeight: '140px', flex: 1, objectFit: 'contain', filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.7))' }}
                  />
                  <span style={{ color: `${accent}50`, fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 700, flexShrink: 0 }}>+</span>
                  <img
                    src={bundle.bobbleheadImage}
                    alt={`${bundle.bobbleheadName} collectible from Torch Republic`}
                    style={{ maxHeight: '140px', flex: 1, objectFit: 'contain', filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.7))' }}
                  />
                </div>

                {/* Card info */}
                <div style={{ padding: '20px 18px' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', letterSpacing: '0.4em', textTransform: 'uppercase', color: `${accent}60`, marginBottom: '6px' }}>
                    Coffee + Collectible
                  </p>
                  <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F0EBE1', fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>
                    {bundle.name}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Package style={{ width: 10, height: 10, color: accent }} />
                      <span style={{ fontSize: '0.75rem', color: 'rgba(240,235,225,0.45)' }}>{bundle.coffeeName}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Package style={{ width: 10, height: 10, color: accent }} />
                      <span style={{ fontSize: '0.75rem', color: 'rgba(240,235,225,0.45)' }}>{bundle.bobbleheadName}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', fontWeight: 900, color: accent }}>${bundle.price.toFixed(2)}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.2)', textDecoration: 'line-through' }}>${bundle.originalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{ textAlign: 'center' }}
        >
          <Link
            to="/collections/coffee-bundles"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '15px 38px',
              background: '#C9A24A',
              color: '#080808',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'opacity 0.25s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Shop All Bundles →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}