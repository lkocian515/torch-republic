import React from 'react';
import { getProductImage } from '@/lib/productImageHelpers';
import { colors } from './theme';

export default function EditorialProductImage({ product, alt, eager = false }) {
  return (
    <div className="flex items-center justify-center" style={{ background: '#F3EEE5', border: `1px solid ${colors.border}` }}>
      <img
        src={getProductImage(product)}
        alt={alt}
        width="520"
        height="520"
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        decoding={eager ? 'sync' : 'async'}
        className="h-full w-full object-contain"
        style={{ aspectRatio: '1 / 1', padding: '18px' }}
      />
    </div>
  );
}