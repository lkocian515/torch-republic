import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// Auto-derive experience tags from product handle or review body
function deriveTags(review) {
  const h = (review.product_handle || '').toLowerCase();
  const b = (review.body || '').toLowerCase();
  const tags = [];

  if (h.includes('founders') || h.includes('washington') || h.includes('jefferson') ||
      h.includes('lincoln') || h.includes('franklin') || h.includes('adams') || h.includes('roosevelt')) {
    tags.push({ icon: '🔥', label: 'Founders Series' });
  }
  if (h.includes('liberty') || h.includes('uncle-sam') || h.includes('eagle') || h.includes('rosie')) {
    tags.push({ icon: '🗽', label: 'Liberty Icons' });
  }
  if (h.includes('coffee') || review.product_handle?.includes('blend')) {
    if (b.includes('smooth') || b.includes('balance')) tags.push({ icon: '☕', label: 'Smooth' });
    else if (b.includes('bold') || b.includes('strong') || b.includes('intense')) tags.push({ icon: '☕', label: 'Bold' });
    else tags.push({ icon: '☕', label: 'Premium Roast' });
  }
  if (b.includes('patriot') || b.includes('america') || b.includes('flag') || b.includes('freedom')) {
    tags.push({ icon: '🇺🇸', label: 'Patriot Favorite' });
  }

  return tags.slice(0, 3);
}

// Auto-generate a short headline from the body
function deriveHeadline(body) {
  if (!body) return null;
  const sentences = body.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
  const first = sentences[0];
  if (first && first.length < 60) return first;
  if (first && first.length >= 60) return first.slice(0, 57) + '…';
  return null;
}

function GoldStars({ rating = 5, size = 'sm' }) {
  const sz = size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5';
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} className={sz} fill={i <= rating ? '#C9A24A' : 'none'} stroke={i <= rating ? '#C9A24A' : 'rgba(255,255,255,0.12)'} />
      ))}
    </div>
  );
}

export { GoldStars };

export default function ReviewCard({ review, featured = false, index = 0 }) {
  const headline = deriveHeadline(review.body);
  const tags = deriveTags(review);
  const date = review.review_date
    ? new Date(review.review_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.06, 0.4), duration: 0.5 }}
      className="flex flex-col gap-4 rounded-xl"
      style={{
        background: featured ? '#0F0F0F' : '#0B0B0B',
        border: featured ? '1px solid rgba(201,162,74,0.45)' : '1px solid rgba(201,162,74,0.1)',
        boxShadow: featured ? '0 0 32px rgba(201,162,74,0.08)' : '0 2px 16px rgba(0,0,0,0.4)',
        padding: featured ? '2rem' : '1.5rem',
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap">
          {featured && (
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase px-2.5 py-1 rounded-sm"
              style={{ background: 'rgba(201,162,74,0.12)', color: '#C9A24A', border: '1px solid rgba(201,162,74,0.25)' }}>
              ✦ Top Review
            </span>
          )}
          <GoldStars rating={review.rating} size={featured ? 'lg' : 'sm'} />
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle className="w-3 h-3 flex-shrink-0" style={{ color: 'rgba(201,162,74,0.5)' }} />
          <span className="font-mono text-[9px] tracking-wider uppercase" style={{ color: 'rgba(201,162,74,0.45)' }}>Verified Buyer</span>
        </div>
      </div>

      {/* Reviewer name */}
      <div>
        <p className="font-mono text-xs font-bold" style={{ color: '#EAEAEA' }}>{review.reviewer_name}</p>
        {review.location && (
          <p className="font-mono text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.22)' }}>{review.location}</p>
        )}
      </div>

      {/* Headline */}
      {headline && (
        <p className="font-serif font-semibold leading-snug"
          style={{ fontSize: featured ? '1.1rem' : '0.95rem', color: '#EAEAEA', lineHeight: 1.4 }}>
          "{headline}."
        </p>
      )}

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(201,162,74,0.08)' }} />

      {/* Body */}
      <p className="font-heading leading-relaxed flex-1"
        style={{ fontSize: featured ? '0.975rem' : '0.875rem', color: 'rgba(234,234,234,0.72)', lineHeight: 1.9, fontStyle: 'italic', fontWeight: 300 }}>
        {review.body}
      </p>

      {/* Tags + date */}
      <div className="flex items-center justify-between gap-3 flex-wrap pt-2" style={{ borderTop: '1px solid rgba(201,162,74,0.07)' }}>
        <div className="flex items-center gap-2 flex-wrap">
          {tags.map((t, i) => (
            <span key={i} className="font-mono text-[9px] px-2 py-1 rounded-sm"
              style={{ background: 'rgba(201,162,74,0.06)', color: 'rgba(201,162,74,0.55)', border: '1px solid rgba(201,162,74,0.1)' }}>
              {t.icon} {t.label}
            </span>
          ))}
        </div>
        {date && <span className="font-mono text-[9px]" style={{ color: 'rgba(255,255,255,0.18)' }}>{date}</span>}
      </div>
    </motion.div>
  );
}