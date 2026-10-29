import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import useDuoCatalog from '@/hooks/useDuoCatalog';
import { HOLIDAY_ENTRIES } from '@/lib/duos';
import DuoEntryCard from '@/components/duos/DuoEntryCard';

export default function DuoHolidays() {
  useSEO({
    title: 'Holiday Coffee Duos | Torch Republic Coffee Company',
    description: 'Torch Republic coffee duos for the major 2027 holidays, in date order.',
    url: '/duos/holidays',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Duos', url: '/duos' },
      { name: 'Holiday Duos', url: '/duos/holidays' },
    ],
  });
  const { catalog, bySlug } = useDuoCatalog();

  return (
    <div className="section-torch">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <header className="max-w-[760px]">
          <p className="eyebrow">2027</p>
          <h1 className="h1 mt-3">Holiday Duos</h1>
          <p className="body-lg mt-4">
            Holiday pairings in date order. When a holiday shares a pair with a season, it links to the same duo page.
            Checkout windows are not delivery or arrival dates.
          </p>
        </header>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HOLIDAY_ENTRIES.map((entry) => (
            <DuoEntryCard key={entry.key} entry={entry} bySlug={bySlug} catalog={catalog} />
          ))}
        </div>
        <p className="mt-8 flex flex-wrap gap-4">
          <Link to="/duos/seasonal" className="body" style={{ color: 'hsl(var(--primary))' }}>Seasonal duos</Link>
          <Link to="/duo-calendar/2027" className="body" style={{ color: 'hsl(var(--primary))' }}>2027 duo calendar</Link>
        </p>
      </div>
    </div>
  );
}