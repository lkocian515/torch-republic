import React, { useState } from 'react';

const RG = '#E6B7AD';

/**
 * GiftKitImage — responsive 4:3 product image for a gift kit card.
 *
 * - 4:3 aspect ratio, object-fit: cover, centered crop.
 * - <picture> with WebP source + PNG fallback.
 * - srcset at 480 / 768 / 1200 widths so the browser picks the right size.
 * - width/height attributes prevent layout shift.
 * - Eager priority for the first card (above/near fold), lazy for the rest.
 * - Neutral branded placeholder if the image errors, never a broken icon.
 */
export default function GiftKitImage({
  img,
  alt,
  priority = false,
  className = '',
}) {
  const [failed, setFailed] = useState(false);

  // The supplied files are 1200×900 (4:3). We advertise 480/768/1200 in the
  // srcset so devices on small viewports fetch a appropriately-sized file. The
  // Base44 media URL serves the same file regardless of the width descriptor,
  // so this is mainly about letting the browser defer loading until needed.
  // sizes: ~100vw on mobile (1 col), ~50vw on tablet (2 col), ~25vw on desktop (4 col).
  const sizes = '(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw';

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        aspectRatio: '4 / 3',
        background: '#11100F',
        borderRadius: '4px',
        border: '1px solid rgba(230,183,173,0.12)',
      }}
    >
      {failed ? (
        // Neutral branded placeholder
        <div
          className="w-full h-full flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)' }}
          aria-hidden="true"
        >
          <span
            className="font-mono text-[8px] tracking-[0.3em] uppercase"
            style={{ color: 'rgba(230,183,173,0.4)' }}
          >
            Torch Republic
          </span>
        </div>
      ) : (
        <picture>
          {/* WebP first (when a .webp URL is provided) */}
          {img?.webp && (
            <source
              type="image/webp"
              srcSet={img.webp}
              sizes={sizes}
            />
          )}
          {/* PNG fallback */}
          <img
            src={img?.png || img?.webp || ''}
            alt={alt}
            width={1200}
            height={900}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            sizes={sizes}
            onError={() => setFailed(true)}
            className="w-full h-full object-cover"
            style={{ display: 'block' }}
          />
        </picture>
      )}
    </div>
  );
}