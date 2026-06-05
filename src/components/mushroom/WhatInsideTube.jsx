import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const STEPS = [
  {
    num: '01',
    title: 'Scoop',
    desc: 'Add instant mushroom coffee powder to your favorite mug.',
  },
  {
    num: '02',
    title: 'Mix',
    desc: 'Stir with hot water, milk, or your favorite creamer.',
  },
  {
    num: '03',
    title: 'Sip',
    desc: 'Enjoy your daily coffee ritual — supports focus, calm, and balanced energy.',
  },
];

const POWDER_IMAGE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/cff560d69_generated_image.png';

export default function WhatInsideTube() {
  return (
    <section
      style={{
        backgroundColor: '#0E0E0E',
        borderTop: '1px solid rgba(26,74,62,0.22)',
        borderBottom: '1px solid rgba(26,74,62,0.22)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-16 md:py-24">

        {/* Two-column layout: text left, image right */}
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">

          {/* ── LEFT: text column ── */}
          <motion.div
            className="flex-1 flex flex-col gap-6"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Label */}
            <p className="font-mono text-[9px] tracking-[0.45em] uppercase"
              style={{ color: '#C4A35A' }}>
              Product Education
            </p>

            {/* Title */}
            <h2 className="font-serif font-bold leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#F5EFE6' }}>
              What's Inside the Tube?
            </h2>

            {/* Subtitle */}
            <p className="font-heading font-light"
              style={{ fontSize: '1.05rem', color: 'rgba(245,239,230,0.62)', lineHeight: 1.7, maxWidth: '480px' }}>
              Instant mushroom coffee powder — no machine, no brewing, no complicated routine.
            </p>

            {/* Body */}
            <p className="font-heading"
              style={{ fontSize: '0.9rem', color: 'rgba(245,239,230,0.45)', lineHeight: 1.75, maxWidth: '460px' }}>
              Each Torch Republic blend is an instant coffee powder mix crafted with functional mushrooms and smooth coffee-forward flavor. Just scoop, mix with hot water or milk, and sip.
            </p>

            {/* Clarity callout */}
            <div
              className="flex gap-3 items-start py-3 px-4"
              style={{
                background: 'rgba(196,163,90,0.07)',
                border: '1px solid rgba(196,163,90,0.18)',
              }}
            >
              <span style={{ color: '#C4A35A', fontSize: '1rem', lineHeight: 1, marginTop: '2px' }}>✕</span>
              <p className="font-mono text-[10px] leading-relaxed tracking-wide"
                style={{ color: 'rgba(214,195,160,0.7)' }}>
                <span style={{ color: '#C4A35A', fontWeight: 700 }}>Not ground coffee.</span>{' '}
                Torch Republic is an instant mushroom coffee powder mix — no grinder, coffee maker, French press, or pods required.
              </p>
            </div>

            {/* WELCOME10 */}
            <p className="font-mono text-[8.5px] tracking-[0.28em] uppercase"
              style={{ color: 'rgba(196,163,90,0.5)' }}>
              Start your ritual with 10% off —{' '}
              <span style={{ color: '#C4A35A', fontWeight: 700 }}>WELCOME10</span>
            </p>
          </motion.div>

          {/* ── RIGHT: image ── */}
          <motion.div
            className="flex-1 w-full"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div
              className="w-full overflow-hidden"
              style={{
                aspectRatio: '4/3',
                border: '1px solid rgba(230,183,173,0.1)',
              }}
            >
              <img
                src={POWDER_IMAGE}
                alt="Torch Republic instant mushroom coffee powder in a black bowl with measuring spoon"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>

        {/* ── 3-step How to Make It ── */}
        <motion.div
          className="mt-14 md:mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
        >
          {/* Divider */}
          <div className="divider-gradient mb-10" />

          <p className="font-mono text-[9px] tracking-[0.45em] uppercase text-center mb-8"
            style={{ color: '#C4A35A' }}>
            How to Make It
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px"
            style={{ border: '1px solid rgba(230,183,173,0.08)', background: 'rgba(230,183,173,0.08)' }}>
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                className="flex flex-col gap-3 p-7"
                style={{ background: '#111111' }}
              >
                <span className="font-mono font-bold"
                  style={{ fontSize: '1.6rem', color: 'rgba(230,183,173,0.12)', lineHeight: 1 }}>
                  {step.num}
                </span>
                <h3 className="font-serif font-bold"
                  style={{ fontSize: '1.15rem', color: '#E6B7AD' }}>
                  {step.title}
                </h3>
                <p className="font-heading"
                  style={{ fontSize: '0.85rem', color: 'rgba(245,239,230,0.48)', lineHeight: 1.7 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA row */}
          <div className="flex justify-center mt-10">
            <Link
              to="/shop"
              className="font-mono text-[9px] tracking-[0.32em] uppercase transition-all hover:opacity-80"
              style={{
                background: '#E6B7AD',
                color: '#080808',
                fontWeight: 800,
                padding: '12px 28px',
              }}
            >
              Shop All Blends →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}