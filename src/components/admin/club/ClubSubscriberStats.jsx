import React from 'react';

const TILES = [
  { key: 'total', label: 'Subscribers' },
  { key: 'active', label: 'Active' },
  { key: 'paused', label: 'Paused' },
  { key: 'cancelled', label: 'Cancelled' },
  { key: 'waitlist', label: 'Waitlist' },
];

export default function ClubSubscriberStats({ counts }) {
  return (
    <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {TILES.map((tile) => (
        <div key={tile.key} className="rounded-lg border border-border bg-card px-4 py-3">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground">{tile.label}</p>
          <p className="font-heading text-2xl font-bold text-foreground">
            {counts[tile.key] ?? '—'}
          </p>
        </div>
      ))}
    </div>
  );
}