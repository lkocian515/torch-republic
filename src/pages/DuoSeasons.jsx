import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import useDuoCatalog from '@/hooks/useDuoCatalog';
import { SEASON_ENTRIES } from '@/lib/duos';
import DuoEntryCard from '@/components/duos/DuoEntryCard';

export default function DuoSeasons() {
  useSEO({
    title: 'Seasonal Coffee Duos | Torch Republic Coffee Company',
    description: 'The four 2027 seasonal coffee duos: Winter, Spring, Summer and Fall.',
    url: '/duos/seasonal',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Duos', url: '/duos' },
      { name: 'Seasonal Duos', url: '/duos/seasonal' },
    ],
  });
  const { catalog, bySlug } = useDuoCatalog();

  return (
    <div className="section-torch">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <header className="max-w-[760px]">
          <p className="eyebrow">2027</p>
          <h1 className="h1 mt-3">Seasonal Duos</h1>
          <p className="body-lg mt-4">Four seasonal pairings, in calendar order. Each is one bag of each named coffee.</p>
        </header>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {SEASON_ENTRIES.map((entry) => (
            <DuoEntryCard key={entry.key} entry={entry} bySlug={bySlug} catalog={catalog} />
          ))}
        </div>
        <p className="mt-8 flex flex-wrap gap-4">
          <Link to="/duos/holidays" className="body" style={{ color: 'hsl(var(--primary))' }}>Holiday duos</Link>
          <Link to="/duo-calendar/2027" className="body" style={{ color: 'hsl(var(--primary))' }}>2027 duo calendar</Link>
        </p>
      </div>
    </div>
  );
}