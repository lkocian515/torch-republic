import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Multi-image product gallery: main image + thumbnail strip.
// Index 0 is the bag (white-bg product shot → object-contain so it shows fully);
// scene / "what's inside" shots use object-cover to fill the frame.
export default function RitualProductGallery({ images, alts, accent = '#9B4E2F' }) {
  const [active, setActive] = useState(0);
  const isBag = active === 0;

  return (
    <div>
      <motion.div
        key={active}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative mx-auto w-full max-w-[260px] sm:max-w-none flex items-center justify-center overflow-hidden"
        style={{ aspectRatio: '1/1', background: '#FFFCF7', border: `1px solid ${accent}22`, borderRadius: 12 }}
      >
        <img
          src={images[active]}
          alt={alts?.[active] || ''}
          loading={active === 0 ? 'eager' : 'lazy'}
          decoding="async"
          className="h-full w-full"
          style={{ objectFit: isBag ? 'contain' : 'cover', padding: isBag ? '24px' : 0 }}
        />
      </motion.div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {images.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            className="h-12 w-12 md:h-[72px] md:w-[72px] flex-shrink-0 overflow-hidden"
            style={{ borderRadius: 10, border: `2px solid ${i === active ? accent : '#B89A6D'}`, background: '#FFFCF7', cursor: 'pointer', padding: 0, transition: 'border-color .2s ease' }}
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full"
              style={{ objectFit: i === 0 ? 'contain' : 'cover', padding: i === 0 ? 6 : 0 }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}