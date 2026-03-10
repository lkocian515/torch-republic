import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';


export default function HeroSection() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[100vh] flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Spotlight gradient */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, hsl(49 100% 50% / 0.06), transparent 60%)`,
        }}
      />

      {/* Hero background image */}
      <div className="absolute inset-0">
        <img
          src="https://www.torchrepublic.com/cdn/shop/files/6_2d2f5f5e-881f-4c5b-98f3-2149aa49027c.png?v=1768744720&width=3840"
          alt="Torch Republic Hero"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>

      {/* Light beam line */}
      <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-black uppercase leading-tight tracking-tight"
            style={{ color: '#E8DFAF' }}
          >
            Wear What You Stand For
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/80 mt-6 text-lg md:text-xl max-w-lg leading-relaxed font-normal"
          >
            Premium apparel for those who live by faith, value freedom, and refuse to blend in.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col gap-3 mt-10 max-w-sm"
          >
            <Link
              to={createPageUrl('BestSellers')}
              className="flex items-center justify-center border-2 border-primary text-white px-8 py-4 rounded-lg font-heading font-bold text-sm tracking-widest uppercase hover:bg-primary/10 transition-all duration-300"
            >
              Shop Bestsellers
            </Link>
            <Link
              to={createPageUrl('Collections')}
              className="flex items-center justify-center border-2 border-primary text-white px-8 py-4 rounded-lg font-heading font-bold text-sm tracking-widest uppercase hover:bg-primary/10 transition-all duration-300"
            >
              Shop Collections
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}