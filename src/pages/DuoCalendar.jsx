import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import useDuoCatalog from '@/hooks/useDuoCatalog';
import { SEASON_ENTRIES, HOLIDAY_ENTRIES } from '@/lib/duos';
import DuoEntryCard from '@/components/duos/DuoEntryCard';
import DuoMonthTable from '@/components/duos/DuoMonthTable';
import PreparationLegend from '@/components/seasonal/PreparationLegend';

export default function DuoCalendar() {
  useSEO({
    title: '2027 Duo Calendar | Torch Republic Coffee Company',
    description: 'Every 2027 seasonal and holiday coffee duo: the two coffees, checkout window and status.',
    url: '/duo-calendar/2027',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Duos', url: '/duos' },
      { name: '2027 Duo Calendar', url: '/duo-calendar/2027' },
    ],
  });
  const { catalog, bySlug } = useDuoCatalog();

  return (
    <div className="section-torch">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <header className="max-w-[760px]">
          <p className="eyebrow">2027</p>
          <h1 className="h1 mt-3">Duo Calendar</h1>
          <p className="body-lg mt-4">
            Every seasonal and holiday duo for 2027. Only one duo is featured at a time; the rest are previews until their
            checkout window opens. Windows are not delivery or arrival guarantees.
          </p>
        </header>
        <div className="mt-6"><PreparationLegend /></div>

        <section className="mt-12" aria-labelledby="cal-seasons">
          <h2 id="cal-seasons" className="h2">Four seasons</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SEASON_ENTRIES.map((entry) => (
              <DuoEntryCard key={entry.key} entry={entry} bySlug={bySlug} catalog={catalog} />
            ))}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="cal-holidays">
          <h2 id="cal-holidays" className="h2">Holidays and gifting moments</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {HOLIDAY_ENTRIES.map((entry) => (
              <DuoEntryCard key={entry.key} entry={entry} bySlug={bySlug} catalog={catalog} />
            ))}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="cal-months">
          <h2 id="cal-months" className="h2">Month by month</h2>
          <div className="mt-6"><DuoMonthTable catalog={catalog} /></div>
        </section>
      </div>
    </div>
  );
}