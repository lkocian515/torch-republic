import React from 'react';
import { Star } from 'lucide-react';

/**
 * ReviewSummaryBar — compact social proof block to place above Add to Cart.
 * Shows star rating, review count, and a short testimonial snippet.
 */
export default function ReviewSummaryBar({ rating = 4.9, count = 127, snippet, accent = '#E6B7AD' }) {
  return (
    <div className="p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(230,183,173,0.1)' }}>
      <div className="flex items-center gap-3 mb-2">
        {/* Stars */}
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        {/* Rating + count */}
        <span className="font-mono text-[10px] font-bold" style={{ color: '#F7F1E8' }}>{rating}</span>
        <span className="font-mono text-[8px] tracking-[0.1em]" style={{ color: 'rgba(247,241,232,0.4)' }}>
          ({count.toLocaleString()} verified reviews)
        </span>
      </div>
      {snippet && (
        <p className="font-heading text-sm italic" style={{ color: '#F5EFE6', fontWeight: 300, lineHeight: 1.65 }}>
          "{snippet}"
        </p>
      )}
    </div>
  );
}