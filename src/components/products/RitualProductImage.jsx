import React from 'react';
import { getProductImage, getProductAltText } from '@/lib/productImageHelpers';

const FALLBACK = '/torch-republic-logo-transparent.png';

/**
 * Flexible product media container.
 * Uses object-contain with auto dimensions so it works equally well for the
 * current portrait TUBE packaging and the future BAG packaging — no layout
 * changes needed when imagery is swapped later.
 */
export default function RitualProductImage({
  product,
  src,
  alt,
  eager = false,
  className = '',
  imgClassName = '',
  style = {},
}) {
  const finalSrc = src || (product && getProductImage(product)) || FALLBACK;
  const finalAlt = alt || (product && getProductAltText(product, 'Torch Republic product')) || 'Torch Republic product';

  return (
    <div className={`flex items-center justify-center ${className}`} style={{ width: '100%', ...style }}>
      <img
        src={finalSrc}
        alt={finalAlt}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        decoding="async"
        className={imgClassName}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          width: 'auto',
          height: 'auto',
          objectFit: 'contain',
          display: 'block',
        }}
        onError={(e) => {
          e.currentTarget.src = FALLBACK;
        }}
      />
    </div>
  );
}