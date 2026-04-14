import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function StoryStrip() {
  return (
    <section style={{ backgroundColor: '#050505', borderTop: '1px solid rgba(196,163,90,0.07)' }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-16 items-center">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden"
            style={{ aspectRatio: '4/3' }}
          >
            <img
              src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1000&q=85"
              alt="Our story"
              className="w-full h-full object-cover"
              style={{ opacity: 0.75 }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, #050505 100%)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #050505 0%, transparent 25%)' }} />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col gap-7 py-8 lg:py-0"
          >
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase" style={{ color: 'rgba(196,163,90,0.45)' }}>Our Story</p>

            <blockquote
              className="font-serif leading-relaxed"
              style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#F0EBE1', fontWeight: 600, lineHeight: 1.55 }}
            >
              "We believe every great movement begins over a cup of coffee."
            </blockquote>

            <div className="space-y-4">
              <p className="font-heading text-sm leading-relaxed" style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 300, lineHeight: 1.9 }}>
                The founding generation didn't build this country from comfort. They built it from conviction — morning by morning, decision by decision.
              </p>
              <p className="font-heading text-sm leading-relaxed" style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 300, lineHeight: 1.9 }}>
                Torch Republic exists to remind you of that. Every blend carries a legacy. Every cup is a declaration.
              </p>
            </div>

            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, #C4A35A, transparent)' }} />

            <Link
              to="/CoffeeCollection"
              className="font-mono text-[10px] tracking-[0.3em] uppercase transition-opacity hover:opacity-55 w-fit pb-0.5"
              style={{ color: 'rgba(196,163,90,0.7)', borderBottom: '1px solid rgba(196,163,90,0.3)' }}
            >
              Explore the Collection →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}