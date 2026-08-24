import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const OPTIONS = [
  {
    label: '01',
    title: 'Bestselling Blend',
    benefit: 'The one everyone starts with. Bold, smooth, unforgettable.',
    cta: 'Shop Coffee',
    to: '/LibertyTorchBlend',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/4262eaf1c_tcr_coffee_blank_final_latest3r.jpeg',
    tag: 'Most Popular',
    tagColor: '#C9A24A',
  },
  {
    label: '02',
    title: 'Founders Series',
    benefit: 'Six small-batch blends. Six presidents. Collect them all.',
    cta: 'Explore the Series',
    to: '/CoffeeCollection',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/576e1d934_hero.jpg',
    tag: 'Limited Drops',
    tagColor: '#C9A24A',
  },
  {
    label: '03',
    title: 'The Torch Box',
    benefit: 'A monthly ritual. New blends, curated drops, delivered to your door.',
    cta: 'Join the Movement',
    to: '/TheTorchBox',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80',
    tag: 'Best Value',
    tagColor: '#C9A24A',
  },
];

export default function StartHere() {
  return (
    <section
      className="py-28 px-6 md:px-12"
      style={{ backgroundColor: '#111111', borderTop: '1px solid rgba(196,163,90,0.1)' }}
    >
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-[10px] tracking-[0.55em] uppercase mb-4" style={{ color: '#C9A24A' }}>
            New Here?
          </p>
          <h2 className="font-serif leading-tight mb-4" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Start Here.
          </h2>
          <p className="font-heading" style={{ fontSize: '1rem', color: 'rgba(240,235,225,0.82)', fontWeight: 400, maxWidth: '360px', margin: '0 auto', lineHeight: 1.85 }}>
            For first-time Torchbearers. Pick one. You can't go wrong.
          </p>
        </motion.div>

        {/* 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {OPTIONS.map((opt, i) => (
            <motion.div
              key={opt.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative flex flex-col overflow-hidden"
              style={{ background: '#131313', border: '1px solid rgba(196,163,90,0.15)' }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <img
                  src={opt.image}
                  alt={opt.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ opacity: 0.72, filter: 'brightness(1.08) contrast(1.05)' }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0F0F0F 0%, transparent 60%)' }} />
                {/* Tag */}
                <div className="absolute top-4 left-4">
                  <span className="font-mono text-[9px] tracking-[0.25em] uppercase px-2.5 py-1"
                    style={{ background: 'rgba(201,162,74,0.15)', color: opt.tagColor, border: `1px solid ${opt.tagColor}40` }}>
                    {opt.tag}
                  </span>
                </div>
                {/* Number */}
                <div className="absolute top-4 right-4">
                  <span className="font-mono text-[10px] tracking-widest" style={{ color: 'rgba(201,162,74,0.3)' }}>{opt.label}</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-7 gap-3">
                <h3 className="font-serif leading-tight" style={{ fontSize: '1.4rem', fontWeight: 700, color: '#F0EBE1' }}>
                  {opt.title}
                </h3>
                <p className="font-heading text-sm leading-relaxed flex-1" style={{ color: 'rgba(240,235,225,0.85)', fontWeight: 400, lineHeight: 1.9 }}>
                  {opt.benefit}
                </p>
                <Link
                  to={opt.to}
                  className="mt-3 flex items-center justify-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase py-4 transition-all hover:opacity-80"
                  style={{ background: '#D4AE57', color: '#080808', fontWeight: 800 }}
                >
                  {opt.cta} →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}