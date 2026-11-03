import React from 'react';
import { duoBySlug, duoBags, duoName, entryStatus } from '@/lib/duos';
import { windowLabel } from '@/lib/seasonalCalendar';
import DuoCard from './DuoCard';

/** A season or holiday entry, rendered from its canonical duo record. */
export default function DuoEntryCard({ entry, bySlug, catalog }) {
  const pairing = duoBySlug(entry.duoSlug);
  if (!pairing) return null;
  return (
    <DuoCard
      pairing={pairing}
      bags={duoBags(pairing, bySlug)}
      title={entry.campaign || duoName(pairing)}
      kicker={entry.kicker}
      windowText={entry.scheduleNeedsConfirmation ? undefined : `Planned checkout window: ${windowLabel(entry)}, 2027`}
      status={entryStatus(entry, pairing, catalog)}
      note={entry.note}
    />
  );
}