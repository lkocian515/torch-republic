import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Explicit apparel product array with exact Shopify CDN image URLs
const APPAREL_PRODUCTS = [
  {
    id: 1,
    name: 'Second Amendment T-Shirt — 1791 Rifle Graphic Tee',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/20260414094618-1f137e6c-983e-608e-9772-b6fb0fd48d2b.png?v=1776160048',
  },
  {
    id: 2,
    name: 'Continental Army 1776 — Born Free Patriotic Tee',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/20260413012811-1f136d80-90c3-672a-8cb0-e2845966f77f.png?v=1776168068',
  },
  {
    id: 3,
    name: 'Remember the Alamo T-Shirt — Texas Forever Historical Tee',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/20260414065736-1f137cf3-8369-67e6-a911-0af5099c7f23.png?v=1776159566',
  },
  {
    id: 4,
    name: 'No Taxation Without Caffeination — Vintage Coffee & Liberty Tee',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/20260413011901-1f136d6c-130a-670c-961f-0e0634670595.png?v=1776168685',
  },
];

export default function ApparelSection() {
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
            Featured Collection
          </p>
          <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 800, color: '#F0EBE1', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '12px' }}>
            Wear the Republic
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.65)', lineHeight: 1.6, maxWidth: '520px', margin: '0 auto' }}>
            Historically inspired designs built for everyday wear.
          </p>
        </motion.div>

        {/* 2x2 Product Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '56px',
        }}>
          {APPAREL_PRODUCTS.map((product, idx) => (
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
              {/* Image Container */}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', overflow: 'hidden', background: '#000' }}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block',
                    opacity: 0.95,
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.08)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  loading="lazy"
                />
                {/* Subtle overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.3) 100%)',
                  pointerEvents: 'none',
                }} />
              </div>

              {/* Product Name */}
              <div style={{ padding: '20px 18px' }}>
                <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#F0EBE1', lineHeight: 1.4, margin: 0 }}>
                  {product.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          style={{ textAlign: 'center' }}
        >
          <Link
            to="/Apparel"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '16px 40px',
              background: '#C9A24A',
              color: '#080808',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'opacity 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            Shop Shirts →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}