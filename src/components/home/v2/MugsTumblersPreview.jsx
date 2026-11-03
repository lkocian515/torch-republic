import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Real product images from Shopify collection (first 4 products)
const PRODUCTS = [
  {
    id: 1,
    name: 'Proud American 1776 Ceramic Mug',
    image: 'https://cdn.shopify.com/s/files/1/0792/3093/1664/files/Proud_American_1776_Ceramic_Mug.jpg?v=1',
  },
  {
    id: 2,
    name: 'Live Free Insulated Coffee Mug',
    image: 'https://cdn.shopify.com/s/files/1/0792/3093/1664/files/Live_Free_Insulated_Mug_10oz.jpg?v=1',
  },
  {
    id: 3,
    name: 'Live Free, Be Ready 11oz Ceramic Mug',
    image: 'https://cdn.shopify.com/s/files/1/0792/3093/1664/files/Live_Free_Be_Ready_Ceramic_Mug.jpg?v=1',
  },
  {
    id: 4,
    name: 'We the People 20oz Tumbler',
    image: 'https://cdn.shopify.com/s/files/1/0792/3093/1664/files/We_the_People_20oz_Tumbler.jpg?v=1',
  },
];

export default function MugsTumblersPreview() {
  return (
    <Link
      to="/mugs-tumblers"
      style={{ textDecoration: 'none', display: 'block' }}
    >
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
              Drinkware Collection
            </p>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 800, color: '#F7F2E9', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '8px' }}>
              Mugs & Tumblers
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.6)', lineHeight: 1.6, maxWidth: '500px', margin: '0 auto' }}>
              Carry the Flame beyond the brew. Premium drinkware built for everyday use.
            </p>
          </motion.div>

          {/* Product Grid — 2x2 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '48px',
          }}>
            {PRODUCTS.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                style={{
                  background: '#0B0B0B',
                  border: '1px solid rgba(201,162,74,0.14)',
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
                <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', overflow: 'hidden', background: '#000' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      display: 'block',
                      transition: 'transform 0.5s ease',
                      opacity: 0.95,
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
                    background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.4) 100%)',
                    pointerEvents: 'none',
                  }} />
                </div>

                {/* Product Name */}
                <div style={{ padding: '16px 20px' }}>
                  <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#F7F2E9', lineHeight: 1.4, margin: 0 }}>
                    {product.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            style={{ textAlign: 'center' }}
          >
            <p style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#E6AC45', fontWeight: 600, marginBottom: '16px' }}>
              Browse the Full Collection
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 36px',
              background: '#E6AC45',
              color: '#080808',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              transition: 'opacity 0.25s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = '1';
            }}
            >
              Shop Mugs & Tumblers →
            </div>
          </motion.div>
        </div>
      </section>
    </Link>
  );
}