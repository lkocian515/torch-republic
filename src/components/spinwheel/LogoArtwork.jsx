import React from 'react';

/**
 * The Torch Republic brand artwork, as standalone transparent PNGs.
 *
 * Nothing is cropped, offset or masked: each file already carries clear space
 * on all four sides, so the cup, flame, lettering and divider rules always
 * appear in full at the artwork's own intrinsic aspect ratio.
 *
 *   lockup  the complete emblem — cup and flame over TORCH REPUBLIC / COFFEE COMPANY
 *   mark    the cup and flame alone, for the wheel hub and other tight spots
 */
const ART = {
  lockup: {
    src: '/torch-republic-lockup.png',
    width: 1014,
    height: 470,
    alt: 'Torch Republic Coffee Company',
  },
  mark: {
    src: '/torch-republic-mark-gold.png',
    width: 254,
    height: 274,
    alt: 'Torch Republic cup and flame',
  },
};

export default function LogoArtwork({ crop = 'lockup', className = '', style }) {
  const art = ART[crop];

  return (
    <img
      src={art.src}
      alt={art.alt}
      width={art.width}
      height={art.height}
      draggable={false}
      decoding="async"
      className={`block h-auto max-w-full object-contain ${className}`}
      style={style}
    />
  );
}