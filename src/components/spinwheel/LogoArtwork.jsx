import React from 'react';

/**
 * The Torch Republic artwork, exactly as uploaded. Nothing is redrawn: the
 * source PNG is displayed and cropped to the region needed, so the flame, cup,
 * lettering and divider are the original pixels.
 */
const SOURCE =
  'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/52a74107b_file_00000000e190820daa67687642c6f16a.png';

const SRC = 1400; // the source file is 1400 x 1400

// Regions measured from the source file, in source pixels.
const CROPS = {
  // Cup and flame, "TORCH REPUBLIC", "COFFEE COMPANY" and the bean divider.
  lockup: {
    x: 425,
    y: 156,
    w: 560,
    h: 214,
    mask: {
      maskImage:
        'linear-gradient(to right, transparent 0%, #000 7%, #000 93%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 3%, #000 94%, transparent 100%)',
      WebkitMaskImage:
        'linear-gradient(to right, transparent 0%, #000 7%, #000 93%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 3%, #000 94%, transparent 100%)',
      maskComposite: 'intersect',
      WebkitMaskComposite: 'source-in',
    },
  },
  // Just the cup and flame.
  mark: {
    x: 622,
    y: 156,
    w: 141,
    h: 136,
    mask: {
      maskImage: 'radial-gradient(circle at 50% 50%, #000 58%, transparent 100%)',
      WebkitMaskImage: 'radial-gradient(circle at 50% 50%, #000 58%, transparent 100%)',
    },
  },
};

export default function LogoArtwork({ crop = 'lockup', className = '', style }) {
  const { x, y, w, h, mask } = CROPS[crop];

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: `${w} / ${h}`, ...style }}
    >
      <div className="absolute inset-0" style={mask}>
        <img
          src={SOURCE}
          alt={
            crop === 'mark'
              ? 'Torch Republic cup and flame'
              : 'Torch Republic Coffee Company'
          }
          draggable={false}
          className="absolute"
          style={{
            width: `${(SRC / w) * 100}%`,
            height: `${(SRC / h) * 100}%`,
            left: `${-(x / w) * 100}%`,
            top: `${-(y / h) * 100}%`,
            maxWidth: 'none',
          }}
        />
      </div>
    </div>
  );
}