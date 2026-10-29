import React from 'react';
import { Link } from 'react-router-dom';
import { editionPath } from '@/lib/specialEditions';

/**
 * Large, stacked bag images for the top of a duo page. Each bag links to that
 * coffee's own product page; nothing is hidden in a carousel.
 */
export default function DuoBagGallery({ bags = [], scene = null }) {
  const slots = bags.flatMap((bag) =>
    Array.from({ length: bag.qty || 1 }, (_, i) => ({ ...bag, key: `${bag.slug}-${i}` })),
  );

  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      style={
        scene
          ? {
              backgroundImage: `url(${scene.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: 12,
              padding: '1rem',
            }
          : undefined
      }
      role={scene ? 'group' : undefined}
      aria-label={scene ? scene.alt : undefined}
    >
      {slots.map((slot) => {
        const picture = slot.art ? (
          <img
            src={slot.art.src}
            alt={slot.art.alt}
            width="800"
            height="800"
            loading="eager"
            decoding="async"
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-4 text-center font-heading">
            {slot.name}
            {import.meta.env.DEV ? (
              <span className="block text-xs" style={{ color: 'hsl(var(--destructive))' }}>
                Preview note: approved image missing for {slot.name}
              </span>
            ) : null}
          </div>
        );
        const frame = {
          aspectRatio: '1 / 1',
          background: scene ? 'rgba(251,248,242,0.95)' : '#F5F0E8',
          borderRadius: 8,
          overflow: 'hidden',
          boxShadow: scene ? '0 8px 22px rgba(36,26,22,0.22)' : undefined,
        };
        return (
          <figure key={slot.key} style={{ margin: 0 }}>
            {slot.edition ? (
              <Link
                to={editionPath(slot.edition)}
                aria-label={`${slot.name} coffee bag: view product page`}
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={frame}
              >
                {picture}
              </Link>
            ) : (
              <div style={frame}>{picture}</div>
            )}
            <figcaption className="font-heading mt-2 text-center" style={{ fontSize: '0.9375rem' }}>{slot.name}</figcaption>
          </figure>
        );
      })}
    </div>
  );
}