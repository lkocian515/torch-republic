import React from 'react';
import { seasonalArtwork } from '@/lib/seasonalCalendar';

/**
 * The label shot for a seasonal reserve, sized by the caller.
 * Renders nothing at all for a coffee that has no approved photo, so a reflow
 * or an empty frame is never left behind. Size comes from literal Tailwind
 * classes (`h-16 w-16`), keeping the image crisp on every surface.
 */
export default function SeasonalArtwork({ slug, className = 'h-16 w-16', alt }) {
  const art = seasonalArtwork(slug);
  if (!art) return null;

  return (
    <img
      src={art.src}
      alt={alt || art.alt}
      loading="lazy"
      decoding="async"
      className={`shrink-0 object-contain ${className}`}
      style={{ background: '#F5F0E8', borderRadius: 4 }}
    />
  );
}