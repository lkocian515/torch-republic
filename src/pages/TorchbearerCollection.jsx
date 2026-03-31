import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CATEGORIES = [
  {
    title: 'Core Apparel',
    description: 'T-shirts, hoodies, and tanks built to last.',
    category: 't-shirts',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/7a14d80e7_ChatGPTImageMar19202604_32_30AM.png',
  },
  {
    title: 'Candles',
    description: 'Set the atmosphere. Light what matters.',
    category: 'candles',
    image: 'https://images.unsplash.com/photo-1603905393637-a8779ab1c2b4?w=800&q=80',
  },
  {
    title: 'Hats & Headwear',
    description: 'Wear your conviction on your head.',
    category: 'hats',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/242e7dcdb_Untitledfdsfdsf.png',
  },
  {
    title: 'Magnets & Stickers',
    description: 'Make your statement everywhere you go.',
    category: 'magnets',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/aeca6b0ad_ffffd.png',
  },
  {
    title: 'Torchbearer Exclusives',
    description: 'Limited gear for those who carry the flame.',
    category: 'accessories',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/502eb0c7a_ChatGPTImageMar19202604_32_50AM.png',
  },
];

export default function TorchbearerCollection() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0B0B0B' }}>

      {/* Hero */}
      <div className="relative overflow-hidden flex items-center justify-center" style={{ height: 'clamp(340px, 50vh, 560px)' }}>
        <img
          src="https://images.unsplash.com/photo-1476611338391-6f395a0dd82e?w=1600&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.35) saturate(0.6)' }}
        />
        {/* Torch glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 50% 70% at 50% 60%, rgba(201,162,74,0.12) 0%, transparent 70%)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0B0B0B 0%, transparent 50%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 30%)' }} />

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-center px-6"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, #C9A24A)' }} />
            <span className="font-mono text-[10px] tracking-[0.55em] uppercase" style={{ color: '#C9A24A' }}>The Collection</span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, #C9A24A, transparent)' }} />
          </div>
          <h1 className="font-serif font-bold text-white leading-tight mb-4" style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}>
            Torchbearer Collection
          </h1>
          <p className="font-heading font-light text-base md:text-lg" style={{ color: 'rgba(255,255,255,0.45)' }}>
            For those who carry the flame.
          </p>
        </motion.div>
      </div>

      {/* Category Grid */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to={`/BestSellers?category=${cat.category}`}
                className="group block relative overflow-hidden"
                style={{ borderRadius: '2px' }}
              >
                {/* Image */}
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: '4/5' }}
                >
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover object-top transition-transform duration-[1.1s] ease-out group-hover:scale-105"
                    style={{ filter: 'brightness(0.6) saturate(0.75)' }}
                  />
                  {/* Dark overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)' }}
                  />
                  {/* Gold glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ boxShadow: 'inset 0 0 0 1px rgba(201,162,74,0.4)', background: 'radial-gradient(ellipse at center, rgba(201,162,74,0.06) 0%, transparent 70%)' }}
                  />
                </div>

                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <h3 className="font-serif font-bold text-white leading-tight mb-2 transition-colors duration-300 group-hover:text-primary" style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)' }}>
                    {cat.title}
                  </h3>
                  <p className="font-heading font-light text-xs md:text-sm mb-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {cat.description}
                  </p>
                  <span
                    className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.3em] uppercase transition-all duration-300 group-hover:gap-3"
                    style={{ color: '#C9A24A' }}
                  >
                    Shop <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}