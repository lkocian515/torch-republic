import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Explicit product array with exact image URLs
const MUGS_PRODUCTS = [
  {
    id: 1,
    name: 'Ceramic Mug — Proud American 1776',
    imageUrl: 'https://www.torchrepublic.com/10165213082785054444_2048',
  },
  {
    id: 2,
    name: 'Insulated Coffee Mug — Live Free',
    imageUrl: 'https://www.torchrepublic.com/15087694528115492524_2048',
  },
  {
    id: 3,
    name: 'Ceramic Mug — Live Free, Be Ready',
    imageUrl: 'https://www.torchrepublic.com/7135904884323381504_2048',
  },
  {
    id: 4,
    name: 'We the People 20oz Tumbler',
    imageUrl: 'https://www.torchrepublic.com/constitution-we-the-people-20oz-tumbler-patriotic-stainless-travel-cup-4783947',
  },
];

export default function MugsTumblersSection() {
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
            Mugs & Tumblers
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.65)', lineHeight: 1.6, maxWidth: '520px', margin: '0 auto' }}>
            Everyday pieces built with Torch Republic character.
          </p>
        </motion.div>

        {/* 2x2 Product Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '56px',
        }}>
          {MUGS_PRODUCTS.map((product, idx) => (
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
            to="/mugs-tumblers"
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
            Shop Mugs & Tumblers →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}