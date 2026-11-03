import React from 'react';

/**
 * The two approved bag images of a duo, side by side. Each bag keeps its own
 * square frame so both labels stay whole, and a bag with no approved image is
 * shown as a plain named placeholder, never a substitute picture.
 *
 * When the duo has a seasonal `scene`, it sits behind the two bags as a
 * backdrop, so a card shows the pair in its own setting without redrawing
 * either package.
 */
export default function DuoPairImage({ bags = [], scene = null }) {
  const slots = bags.flatMap((bag) =>
    Array.from({ length: bag.qty || 1 }, (_, i) => ({ ...bag, key: `${bag.slug}-${i}` })),
  );

  const backdrop = scene
    ? {
        backgroundImage: `url(${scene.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderColor: 'rgba(228,216,201,0.9)',
      }
    : { background: '#F7F2E9' };

  return (
    <div
      className="grid grid-cols-2 gap-2 p-2"
      style={{ borderRadius: 6, border: '1px solid transparent', ...backdrop }}
    >
      {slots.map((slot) => (
        <div
          key={slot.key}
          style={{
            aspectRatio: '1 / 1',
            background: scene ? 'rgba(251,248,242,0.94)' : 'transparent',
            borderRadius: 6,
            overflow: 'hidden',
          }}
          className="relative"
        >
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