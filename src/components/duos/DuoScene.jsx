import React from 'react';

/**
 * A seasonal scene with the duo's two approved bag images placed in front of it.
 *
 * The scene is only ever a backdrop: it carries no product names and no copy, so
 * the labels the shopper reads are always the real package artwork. Bags with no
 * approved image are skipped rather than replaced with a stand-in picture.
 */
export default function DuoScene({ scene, bags = [], ratio = '3 / 2', className = '', style }) {
  const framed = bags.filter((bag) => bag?.art?.src);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: ratio, borderRadius: 12, background: '#F7F2E9', ...style }}
    >
      <img
        src={scene.src}
        alt={scene.alt}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
      {framed.length > 0 ? (
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-2 p-3 sm:gap-4 sm:p-5">
          {framed.map((bag) => (
            <div
              key={bag.slug}
              style={{
                width: 'clamp(104px, 33%, 220px)',
                background: 'rgba(251,248,242,0.95)',
                border: '1px solid rgba(228,216,201,0.9)',
                borderRadius: 10,
                padding: 5,
                boxShadow: '0 8px 22px rgba(36,26,22,0.28)',
              }}
            >
              <img
                src={bag.art.src}
                alt={bag.art.alt}
                className="block h-auto w-full"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}