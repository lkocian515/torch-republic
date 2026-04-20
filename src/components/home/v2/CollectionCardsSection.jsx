import React from 'react';
import { motion } from 'framer-motion';

const COLLECTIONS = [
  {
    id: 'mugs',
    title: 'Mugs & Tumblers',
    subtitle: 'Everyday pieces built with Torch Republic character.',
    image: 'https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=800&q=80',
    cta: 'Shop Mugs & Tumblers',
    url: '/collections/mugs-tumblers',
  },
  {
    id: 'apparel',
    title: 'Shirts',
    subtitle: 'Historically inspired designs built for everyday wear.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    cta: 'Shop Shirts',
    url: '/collections/apparel',
  },
];

export default function CollectionCardsSection() {
  return (
    <section style={{ backgroundColor: '#0A0A0A', padding: '80px 24px', borderTop: '1px solid rgba(201,162,74,0.1)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <p style={{ fontSize: '9px', letterSpacing: '0.5em', textTransform: 'uppercase', marginBottom: '16px', color: 'rgba(201,162,74,0.6)' }}>
            Extended Collection
          </p>
          <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 800, color: '#F0EBE1', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Complete Your Lifestyle
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', maxWidth: '900px', margin: '0 auto' }}>
          {COLLECTIONS.map((collection, idx) => (
            <motion.a
              key={collection.id}
              href={collection.url}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                background: '#0B0B0B',
                border: '1px solid rgba(201,162,74,0.14)',
                textDecoration: 'none',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(201,162,74,0.5)';
                e.currentTarget.style.boxShadow = '0 0 40px 4px rgba(201,162,74,0.12)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(201,162,74,0.14)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden', background: '#000' }}>
                <img
                  src={collection.image}
                  alt={collection.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.08)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
                {/* Overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.6) 100%)',
                  pointerEvents: 'none',
                }} />
              </div>

              {/* Content */}
              <div style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                <div>
                  <p style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '8px', color: '#C9A24A' }}>
                    Collection
                  </p>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#F0EBE1', marginBottom: '8px', lineHeight: 1.2 }}>
                    {collection.title}
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.6)', lineHeight: 1.6 }}>
                    {collection.subtitle}
                  </p>
                </div>

                {/* CTA */}
                <div style={{
                  marginTop: 'auto',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(201,162,74,0.1)',
                }}>
                  <p style={{
                    fontSize: '10px',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: '#C9A24A',
                    fontWeight: 600,
                    margin: 0,
                  }}>
                    {collection.cta} →
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}