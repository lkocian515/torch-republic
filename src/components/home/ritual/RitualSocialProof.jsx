import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

// Compact social-proof line that pulls LIVE review data (never hard-coded).
// Displays as: "★ 4.8 from 105 customer reviews" — linked to /reviews.
export default function RitualSocialProof() {
  const { data: stats } = useQuery({
    queryKey: ['review-stats'],
    queryFn: async () => {
      const reviews = await base44.entities.Review.list('-review_date', 200);
      const count = reviews.length;
      const avg = count
        ? (reviews.reduce((s, r) => s + (Number(r.rating) || 0), 0) / count).toFixed(1)
        : null;
      return { avg, count };
    },
    staleTime: 1000 * 60 * 10,
  });

  if (!stats || !stats.avg || !stats.count) return null;

  return (
    <Link
      to="/reviews"
      className="inline-flex items-center gap-2 transition-opacity hover:opacity-75"
      aria-label={`Rated ${stats.avg} out of 5 from ${stats.count} customer reviews`}
    >
      <span className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            style={{
              fill: i < Math.round(Number(stats.avg)) ? '#E6AC45' : 'none',
              stroke: i < Math.round(Number(stats.avg)) ? '#E6AC45' : '#D8C9B6',
            }}
          />
        ))}
      </span>
      <span className="font-heading text-sm font-semibold" style={{ color: '#32190F' }}>
        {stats.avg}
      </span>
      <span className="font-heading text-sm" style={{ color: '#5E4639' }}>
        from {stats.count} customer reviews
      </span>
    </Link>
  );
}