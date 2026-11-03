import React from 'react';

const TONE = {
  available: { background: '#1F4D33', color: '#EAF6EE', border: '#2F6B48' },
  soldout: { background: '#3A2A22', color: '#F2DED0', border: '#5B4436' },
  error: { background: '#3A2A22', color: '#F2DED0', border: '#5B4436' },
  pending: { background: '#3D2817', color: '#F7F2E9', border: '#7A5636' },
};

/** Availability label for an option or an edition. Always readable on dark artwork. */
export default function EditionStatusChip({ state = 'pending', label, className = '' }) {
  // No label means there is no status worth showing, so the chip stays out of the way.
  if (!label) return null;
  const tone = TONE[state] || TONE.pending;
  return (
    <span
      className={`inline-flex items-center font-mono uppercase ${className}`}
      style={{
        background: tone.background,
        color: tone.color,
        border: `1px solid ${tone.border}`,
        borderRadius: '999px',
        fontSize: '10px',
        letterSpacing: '0.16em',
        fontWeight: 700,
        padding: '4px 10px',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
}