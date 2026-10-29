/**
 * SEASONAL CALENDAR — 2027 planning windows.
 *
 * These dates are planning settings for the 2027 season only. They are NOT
 * proof that a release exists, is approved by the supplier, or is purchasable.
 * A release only becomes buyable when its own Shopify-backed edition record
 * carries a verified, available variant — see `releaseState()`.
 *
 * All windows are evaluated in America/Chicago and end dates are inclusive:
 * a window ending 2027-03-17 is open for the whole of March 17 in Central Time.
 */

import { optionState } from './specialEditions';

export const CALENDAR_TIMEZONE = 'America/Chicago';
export const CALENDAR_YEAR = 2027;

/** Today's date in the store's own timezone, as YYYY-MM-DD. */
export function todayInChicago() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: CALENDAR_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/**
 * `flavorPending` marks a descriptor that has not been approved by the
 * supplier yet, so the storefront never prints an unverified flavor claim.
 */
export const SEASONAL_WINDOWS = [
  { slug: 'cinnamon-hearth', name: 'Cinnamon Hearth', flavor: 'Cinnamon Hazelnut', start: '2027-01-01', end: '2027-02-28' },
  { slug: 'velvet-heart', name: 'Velvet Heart', flavor: 'Mocha', start: '2027-02-01', end: '2027-02-28' },
  { slug: 'lucky-clover', name: 'Lucky Clover', flavor: 'Mint', start: '2027-03-01', end: '2027-03-17' },
  { slug: 'bunny-trail', name: 'Bunny Trail', flavor: 'Cinnamon roll', flavorPending: true, start: '2027-03-01', end: '2027-03-28' },
  { slug: 'bluebonnet-bloom', name: 'Bluebonnet Bloom', flavor: 'French Vanilla', start: '2027-04-01', end: '2027-06-30' },
  { slug: 'coastal-caramel', name: 'Coastal Caramel', flavor: 'Caramel', start: '2027-05-01', end: '2027-07-31' },
  { slug: 'gulf-coast-turtle', name: 'Gulf Coast Turtle', flavor: 'Turtle', flavorPending: true, start: '2027-06-01', end: '2027-08-31' },
  { slug: 'stars-stripes-spice', name: 'Stars, Stripes & Spice', flavor: 'Cinnamon Hazelnut', start: '2027-07-01', end: '2027-07-31' },
  { slug: 'harvest-moon-pecan', name: 'Harvest Moon Pecan', flavor: 'Pecan Pie', start: '2027-08-01', end: '2027-11-30' },
  {
    slug: 'pumpkin-spice',
    name: 'Pumpkin Spice',
    flavor: 'Pumpkin Spice',
    start: '2027-09-01',
    end: '2027-10-31',
    sensory: 'Cinnamon, nutmeg and clove over a soft, gently sweet pumpkin finish.',
  },
  {
    slug: 'midnight-hex',
    name: 'Midnight Hex',
    flavor: 'Mexican Chocolate',
    start: '2027-10-01',
    end: '2027-10-31',
    sensory: 'Deep cocoa with warm cinnamon, finishing smooth and a little bittersweet.',
  },
  { slug: 'fireside-smores', name: 'Fireside S\u2019mores', flavor: 'S\u2019mores', start: '2027-11-01', end: '2027-12-31' },
  { slug: 'peppermint-parade', name: 'Peppermint Parade', flavor: 'Candy Cane', start: '2027-12-01', end: '2027-12-31' },
];

/**
 * Supplier label artwork for the two reserves that have an approved shot.
 * Only slugs listed here get a picture; every other release renders exactly as
 * it did before, so nothing is invented for a coffee we have no artwork for.
 */
export const SEASONAL_ARTWORK = {
  'cinnamon-hearth': {
    src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/ef232185f_file_000000005d44820c936035b3a56729c4.png',
    alt: 'Cinnamon Hearth seasonal reserve: a black coffee pouch with a cream label showing a mug of coffee beside cinnamon sticks and hazelnuts',
  },
  'velvet-heart': {
    src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/37afd7991_file_00000000996c820d81a8c84217726535.png',
    alt: 'Velvet Heart Mocha seasonal reserve: a black coffee pouch with a cream label showing a mug of mocha topped with whipped cream, chocolate pieces and red rose petals',
  },
  'lucky-clover': {
    src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/ce10b87f8_file_00000000446c81f5b526f3030ca0fedb.png',
    alt: 'Lucky Clover Mint seasonal reserve: a black coffee pouch with a cream label showing a green clover mug on a wooden table surrounded by white clover flowers, mint leaves and coffee beans',
  },
  'bluebonnet-bloom': {
    src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/b175650ec_file_0000000090f8820daafe2753d123de09.png',
    alt: 'Bluebonnet Bloom French Vanilla seasonal reserve: a black coffee pouch with a cream label showing a steaming mug beside vanilla beans and flowers in a bluebonnet field at sunset',
  },
  'coastal-caramel': {
    src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/7d25ee690_file_000000003838822f8593d9e067977ac3.png',
    alt: 'Coastal Caramel seasonal reserve: a black coffee pouch with a cream label showing a steaming mug with salted caramels on driftwood against a coastal sunset',
  },
  'gulf-coast-turtle': {
    src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/2bf0172f6_file_00000000bfec81fdb72b14b71fa8a0d2.png',
    alt: 'Gulf Coast Turtle seasonal reserve: a black coffee pouch with a cream label showing a steaming mug with chocolate-covered pecans beside a sea turtle in turquoise water',
  },
  'stars-stripes-spice': {
    src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/f1ffc794e_file_00000000b740820e9411b25a7e2f6c73.png',
    alt: 'Stars, Stripes & Spice Cinnamon Hazelnut seasonal reserve: a black coffee pouch with a cream label showing a steaming mug with hazelnuts and cinnamon sticks under fireworks and a draped American flag',
  },
};

/** The label shot for a release, or null when it has none. */
export function seasonalArtwork(slug) {
  return SEASONAL_ARTWORK[slug] || null;
}

export const SEASONAL_PREP_LABEL = 'Seasonal Reserve — ground or whole bean; brewing required.';
export const INSTANT_PREP_LABEL = 'Instant Originals — just add water.';

export function seasonalEntry(slug) {
  return SEASONAL_WINDOWS.find((entry) => entry.slug === slug) || null;
}

/** One short tasting line for a release, when the calendar has one written. */
export function sensoryNote(slug) {
  return seasonalEntry(slug)?.sensory || null;
}

/** Only the calendar's own year is planned; other years are never implied. */
function appliesToYear(entry, today) {
  return String(today).slice(0, 4) === String(CALENDAR_YEAR);
}

/**
 * Where a planned release sits against the clock, independent of commerce.
 * 'upcoming' | 'open' | 'past' — the 2027 schedule never applies to 2026.
 */
export function windowState(entry, today = todayInChicago()) {
  if (!entry) return 'upcoming';
  if (!appliesToYear(entry, today)) return 'upcoming';
  if (today < entry.start) return 'upcoming';
  if (today > entry.end) return 'past';
  return 'open';
}

/**
 * The customer-facing state, which also requires a verified, available
 * Shopify variant. A date arriving alone never makes a release purchasable.
 */
export function releaseState(entry, editions = [], today = todayInChicago()) {
  const planned = windowState(entry, today);
  if (planned === 'past') return { state: 'past', label: 'Past release', edition: null };

  const edition = (editions || []).find((e) => e.slug === entry.slug) || null;
  const buyableOption = (edition?.options || []).find((option) => optionState(option).purchasable);

  if (planned === 'open' && buyableOption) {
    return { state: 'available', label: 'Available now', edition, option: buyableOption };
  }
  return {
    state: 'coming_soon',
    label: edition ? 'Coming soon' : 'Coming soon',
    edition,
    reason: planned === 'open' && !buyableOption
      ? 'Not yet verified for purchase'
      : undefined,
  };
}

/** Window formatted for customers, reading end dates as inclusive. */
export function windowLabel(entry) {
  if (!entry) return '';
  const startDate = new Date(`${entry.start}T12:00:00Z`);
  const endDate = new Date(`${entry.end}T12:00:00Z`);
  const startMonth = MONTH_NAMES[startDate.getUTCMonth()];
  const endMonth = MONTH_NAMES[endDate.getUTCMonth()];
  if (startMonth === endMonth) {
    return `${startMonth} ${startDate.getUTCDate()}–${endDate.getUTCDate()}`;
  }
  return `${startMonth} ${startDate.getUTCDate()} – ${endMonth} ${endDate.getUTCDate()}`;
}

/** Entries whose selling window overlaps a given month index (0-11). */
export function entriesForMonth(monthIndex) {
  const monthStart = Date.UTC(CALENDAR_YEAR, monthIndex, 1);
  const monthEnd = Date.UTC(CALENDAR_YEAR, monthIndex + 1, 0);
  return SEASONAL_WINDOWS.filter((entry) => {
    const start = Date.parse(`${entry.start}T00:00:00Z`);
    const end = Date.parse(`${entry.end}T00:00:00Z`);
    return start <= monthEnd && end >= monthStart;
  });
}

/**
 * The next releases still ahead of the clock, in calendar order. Used by the
 * homepage preview (two months) and by the calendar's short view.
 */
export function nextReleases(editions = [], count = 2, today = todayInChicago()) {
  const upcoming = SEASONAL_WINDOWS.filter((entry) => windowState(entry, today) !== 'past').sort(
    (a, b) => a.start.localeCompare(b.start),
  );
  return upcoming.slice(0, count).map((entry) => ({
    entry,
    ...releaseState(entry, editions, today),
  }));
}

/** Months that still have a release on or after today, for the short view. */
export function upcomingMonthIndexes(count = 3, today = todayInChicago()) {
  const indexes = [];
  for (let i = 0; i < 12; i += 1) {
    const entries = entriesForMonth(i);
    if (entries.some((entry) => windowState(entry, today) !== 'past')) indexes.push(i);
  }
  return indexes.slice(0, count);
}

export const CALENDAR_NOTE =
  'Dates are the planned 2027 selling windows in Central Time, and each end date is inclusive. A window opening does not make a release purchasable: every coffee is verified against Shopify and the supplier first.';