import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const FALLBACK = 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80';

export default function ProductImageCarousel({ product }) {
  const images = [product.image_url, product.image_url_2].filter(Boolean);
  if (images.length === 0) images.push(FALLBACK);

  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [zoomed, setZoomed] = useState(false);

  const go = (idx) => {
    setDirection(idx > active ? 1 : -1);
    setActive(idx);
  };

  const prev = () => go((active - 1 + images.length) % images.length);
  const next = () => go((active + 1) % images.length);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-3 md:gap-4">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex flex-row md:flex-col gap-2 md:w-20">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`relative overflow-hidden flex-shrink-0 transition-all duration-300 ${
                i === active
                  ? 'ring-1 ring-primary ring-offset-1 ring-offset-background opacity-100'
                  : 'opacity-40 hover:opacity-70'
              }`}
              style={{ width: '4rem', height: '4rem' }}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div className="relative flex-1 overflow-hidden group" style={{ aspectRatio: '4/5', background: 'linear-gradient(160deg, #1a0e00 0%, #2a1a0a 30%, #0d0d0d 60%, #000000 100%)' }}> style={{ aspectRatio: '4/5' }}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={active}
            src={images[active]}
            alt={product.title}
            custom={direction}
            initial={{ x: direction * 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction * -60, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => { e.target.src = FALLBACK; }}
          />
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

        {/* Zoom hint */}
        <button
          onClick={() => setZoomed(true)}
          className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/80"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/80"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className={`h-0.5 transition-all duration-300 ${
                  i === active ? 'w-6 bg-primary' : 'w-2 bg-white/40'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomed(false)}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center cursor-zoom-out p-6"
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={images[active]}
              alt={product.title}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setZoomed(false)}
              className="absolute top-6 right-6 text-white/60 hover:text-white font-mono text-xs tracking-widest"
            >
              CLOSE ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}