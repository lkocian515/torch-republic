import React from 'react';

/**
 * The two approved bag images of a duo, side by side. Each bag keeps its own
 * square frame so both labels stay whole, and a bag with no approved image is
 * shown as a plain named placeholder, never a substitute picture.
 */
export default function DuoPairImage({ bags = [] }) {
  const slots = bags.flatMap((bag) =>
    Array.from({ length: bag.qty || 1 }, (_, i) => ({ ...bag, key: `${bag.slug}-${i}` })),
  );

  return (
    <div className="grid grid-cols-2 gap-2 p-2" style={{ background: '#F5F0E8', borderRadius: 6 }}>
      {slots.map((slot) => (
        <div key={slot.key} style={{ aspectRatio: '1 / 1' }} className="relative">
          {slot.art ? (
            <img
              src={slot.art.src}
              alt={slot.art.alt}
              width="600"
              height="600"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center p-2 text-center font-heading text-sm">
              {slot.name}
              {import.meta.env.DEV ? (
                <span className="block text-xs" style={{ color: 'hsl(var(--destructive))' }}>
                  Preview note: approved image missing
                </span>
              ) : null}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}