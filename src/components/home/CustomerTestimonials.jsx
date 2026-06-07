import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const RG = '#E6B7AD';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah M.',
    location: 'Chicago, IL',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/8815056a9_8.png',
    testimonial: '"MoonCap Restore has become my evening ritual. The flavor is smooth and it genuinely helps me wind down."',
    blend: 'MoonCap Restore',
    rating: 5,
  },
  {
    id: 2,
    name: 'Marcus T.',
    location: 'Austin, TX',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/1cde802f2_9.png',
    testimonial: '"Perfect for my morning work sessions. GlowMind Clarity helps me stay focused without the jitters."',
    blend: 'GlowMind Clarity',
    rating: 5,
  },
  {
    id: 3,
    name: 'James R.',
    location: 'Denver, CO',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/55f9e1350_10.png',
    testimonial: '"SunCap Rise is my go-to for early mornings. Clean energy, no crash. Highly recommend."',
    blend: 'SunCap Rise',
    rating: 5,
  },
  {
    id: 4,
    name: 'Emma L.',
    location: 'Portland, OR',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/0a615b4db_11.png',
    testimonial: '"Mystic Bloom is my favorite. The ritual feels intentional and the blend tastes amazing."',
    blend: 'Mystic Bloom',
    rating: 5,
  },
  {
    id: 5,
    name: 'David K.',
    location: 'Brooklyn, NY',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/2bcbd60ef_12.png',
    testimonial: '"DreamCap before bed has genuinely improved my sleep quality. Not overstimulating."',
    blend: 'DreamCap Blend',
    rating: 5,
  },
  {
    id: 6,
    name: 'Jessica H.',
    location: 'San Francisco, CA',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/9d0e4d06a_13.png',
    testimonial: '"The Oracle Blend paired with my morning reflection time is the perfect start to my day."',
    blend: 'The Oracle',
    rating: 5,
  },
];

export default function CustomerTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const visibleTestimonials = [
    TESTIMONIALS[currentIndex],
    TESTIMONIALS[(currentIndex + 1) % TESTIMONIALS.length],
    TESTIMONIALS[(currentIndex + 2) % TESTIMONIALS.length],
  ];

  return (
    <section className="px-6 md:px-10 py-20" style={{ background: '#080808', borderTop: `1px solid ${RG}15`, borderBottom: `1px solid ${RG}15` }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: `${RG}70` }}>
            Real Members, Real Rituals
          </p>
          <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#F5EFE6' }}>
            See How Our Members Are Using Torch Republic
          </h2>
          <p className="font-heading max-w-2xl mx-auto" style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.8 }}>
            Join thousands making their morning ritual more intentional
          </p>
        </motion.div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {visibleTestimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col h-full"
              style={{
                background: 'rgba(230,183,173,0.04)',
                border: `1px solid ${RG}15`,
                borderRadius: '6px',
                overflow: 'hidden',
              }}
            >
              {/* Image */}
              <div className="h-64 overflow-hidden" style={{ background: '#0F0E0D' }}>
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array(testimonial.rating).fill(null).map((_, i) => (
                    <Star key={i} size={14} style={{ fill: RG, stroke: RG }} />
                  ))}
                </div>

                {/* Testimonial */}
                <p className="font-heading text-sm mb-4 flex-1" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300, lineHeight: 1.7 }}>
                  {testimonial.testimonial}
                </p>

                {/* Divider */}
                <div style={{ height: '1px', background: `${RG}15`, margin: '16px 0' }} />

                {/* User Info */}
                <div>
                  <p className="font-serif font-bold text-sm" style={{ color: '#F5EFE6' }}>
                    {testimonial.name}
                  </p>
                  <p className="font-mono text-[8px] tracking-[0.25em] uppercase mb-2" style={{ color: RG }}>
                    {testimonial.blend}
                  </p>
                  <p className="font-heading text-[9px]" style={{ color: 'rgba(240,235,225,0.4)' }}>
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={goToPrevious}
            className="p-2.5 rounded-full transition-all hover:opacity-70"
            style={{
              background: `${RG}10`,
              border: `1px solid ${RG}25`,
              color: RG,
              cursor: 'pointer',
            }}
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className="transition-all"
                style={{
                  width: currentIndex === idx ? 28 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: currentIndex === idx ? RG : `${RG}30`,
                  border: 'none',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="p-2.5 rounded-full transition-all hover:opacity-70"
            style={{
              background: `${RG}10`,
              border: `1px solid ${RG}25`,
              color: RG,
              cursor: 'pointer',
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}