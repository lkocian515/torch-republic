import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Washington Blend Pods product image — Founders Series
const PRODUCT_IMAGE = 'https://images.unsplash.com/photo-1614170153058-fed1b3c80e07?w=800&q=85';

// Flag texture overlay — very faint, not distracting
const FLAG_OVERLAY = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Ctext x="50%25" y="50%25" font-size="220" text-anchor="middle" dominant-baseline="middle" opacity="0.025"%3E🇺🇸%3C/text%3E%3C/svg%3E';

export default function HeroSection() {
  return (
    <>
      <section
        className="relative w-full overflow-hidden"
        style={{
          minHeight: 'clamp(600px, 88vh, 960px)',
          background: 'linear-gradient(135deg, #0B0B0B 0%, #111111 60%, #0D0D0D 100%)',
        }}
      >
        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            opacity: 0.04,
            mixBlendMode: 'overlay',
          }}
        />

        {/* Faint flag texture — right side, behind product */}
        <div
          className="absolute right-0 top-0 bottom-0 pointer-events-none hidden md:block"
          style={{
            width: '55%',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Ctext x='50%25' y='50%25' font-size='320' text-anchor='middle' dominant-baseline='middle' fill='%23C9A24A' opacity='0.03'%3E🇺🇸%3C/text%3E%3C/svg%3E")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Subtle gold radial behind product */}
        <div
          className="absolute pointer-events-none hidden md:block"
          style={{
            right: '8%',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '520px',
            height: '520px',
            background: 'radial-gradient(ellipse at center, rgba(201,162,74,0.08) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Main content grid */}
        <div
          className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-8"
          style={{ minHeight: 'clamp(600px, 88vh, 960px)' }}
        >
          {/* ── LEFT: Text + CTAs ── */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-[50%] pt-16 md:pt-0">

            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="font-mono text-[10px] tracking-[0.55em] uppercase mb-5"
              style={{ color: 'rgba(201,162,74,0.65)' }}
            >
              Torch Republic · Founders Series
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif leading-none mb-4"
              style={{
                fontSize: 'clamp(2.6rem, 6.5vw, 5.4rem)',
                fontWeight: 800,
                color: '#C9A24A',
                letterSpacing: '-0.025em',
              }}
            >
              WASHINGTON<br />
              <span style={{ color: '#FFFFFF' }}>BLEND PODS</span>
            </motion.h1>

            {/* Subheadline — flavor notes */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="font-mono text-[11px] tracking-[0.35em] uppercase mb-6"
              style={{ color: 'rgba(201,162,74,0.6)' }}
            >
              Dark Roast · Cocoa · Smoke · Bold Spice
            </motion.p>

            {/* Gold rule */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.55, delay: 0.3, ease: 'easeOut' }}
              className="origin-left mb-6 self-start hidden md:block"
              style={{ height: '1px', width: '48px', background: 'rgba(201,162,74,0.5)' }}
            />

            {/* Body copy */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="font-heading mb-9"
              style={{
                fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
                color: 'rgba(240,235,225,0.72)',
                fontWeight: 400,
                lineHeight: 1.9,
                maxWidth: '420px',
              }}
            >
              Strength without noise. Built for discipline, not comfort.<br />
              A bold, full-bodied dark roast inspired by the man who set the standard.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
            >
              <Link
                to="/WashingtonBlend"
                className="inline-flex items-center justify-center font-mono text-[11px] tracking-[0.35em] uppercase transition-all"
                style={{
                  background: '#C9A24A',
                  color: '#080808',
                  fontWeight: 800,
                  padding: '17px 38px',
                  minWidth: '160px',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#DDB95E'}
                onMouseLeave={e => e.currentTarget.style.background = '#C9A24A'}
              >
                SHOP PODS
              </Link>
              <Link
                to="/CoffeeCollection"
                className="inline-flex items-center justify-center font-mono text-[11px] tracking-[0.28em] uppercase transition-all"
                style={{
                  color: '#C9A24A',
                  border: '1px solid rgba(201,162,74,0.55)',
                  padding: '17px 28px',
                  minWidth: '160px',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#C9A24A';
                  e.currentTarget.style.background = 'rgba(201,162,74,0.07)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(201,162,74,0.55)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                EXPLORE THE FOUNDERS SERIES
              </Link>
            </motion.div>

          </div>

          {/* ── RIGHT: Product Image ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center w-full md:w-[46%] pb-8 md:pb-0"
            style={{ maxWidth: '520px' }}
          >
            {/* FOUNDERS SERIES badge */}
            <div
              className="absolute top-4 right-4 z-20 font-mono text-[8px] tracking-[0.4em] uppercase px-3 py-1.5"
              style={{
                background: '#C9A24A',
                color: '#080808',
                fontWeight: 800,
                letterSpacing: '0.3em',
              }}
            >
              FOUNDERS SERIES
            </div>

            {/* Glow halo behind product */}
            <div
              className="absolute"
              style={{
                inset: '10%',
                background: 'radial-gradient(ellipse at center, rgba(201,162,74,0.12) 0%, transparent 68%)',
                filter: 'blur(32px)',
                borderRadius: '50%',
                zIndex: 0,
              }}
            />

            {/* Product image */}
            <div
              className="relative z-10 w-full"
              style={{
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow: '0 32px 80px rgba(0,0,0,0.75), 0 0 60px rgba(201,162,74,0.06)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=900&q=90"
                alt="Washington Blend Pods — Founders Series"
                className="w-full h-full object-cover"
                style={{
                  aspectRatio: '4/5',
                  objectPosition: 'center',
                  display: 'block',
                }}
              />
              {/* Bottom fade to black */}
              <div
                className="absolute bottom-0 left-0 right-0 pointer-events-none"
                style={{ height: '35%', background: 'linear-gradient(to top, #0B0B0B, transparent)' }}
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom section fade */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{ height: '120px', background: 'linear-gradient(to top, #0B0B0B, transparent)' }}
        />
      </section>
    </>
  );
}