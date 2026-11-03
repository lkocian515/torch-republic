/**
 * DUOS — the permanent Originals Duo plus the 2027 seasonal and holiday duos.
 *
 * One canonical record per unique two-bag pairing. Seasons and holidays are
 * only labels that point at a canonical record (see SEASON_ENTRIES and
 * HOLIDAY_ENTRIES), so a repeated pair never creates a second page, listing or
 * cart. Nothing here invents a price, SKU, discount or delivery promise: a duo
 * is only orderable when both coffees are individually purchasable.
 */

import { SEASONAL_WINDOWS, seasonalEntry, seasonalArtwork, todayInChicago, CALENDAR_YEAR, MONTH_NAMES } from './seasonalCalendar';
import { optionState } from './specialEditions';

export const ORIGINALS_DUO = {
  slug: 'originals-duo',
  name: 'The Originals Duo',
  path: '/products/torch-republic-coffee-duo',
  // The live Storefront handle. The cart is built from the verified variant ID
  // server-side, so the handle is only used for price and stock lookups.
  shopifyHandle: 'torch-republic-coffee-duo-copy',
  prep: 'Instant — just add water.',
  contents: [
    { slug: 'instant-classic-coffee', name: 'Instant Classic Coffee', shopifyHandle: 'instant-coffee-1', qty: 1 },
    { slug: 'instant-mushroom-coffee', name: 'Instant Mushroom Coffee', shopifyHandle: 'instant-coffee-with-mushroom', qty: 1 },
  ],
};

/**
 * The eleven unique two-bag offers. `month` is the 0-based month the offer
 * opens in. Windows are the overlap of the two coffees' own windows, trimmed
 * by any pairing-specific start/end.
 */
const ALL_DUOS = [
  {
    slug: 'velvet-hearts',
    name: 'Velvet Hearts Duo',
    monthlyName: 'Winter Hearts Duo',
    month: 1,
    components: ['velvet-heart', 'cinnamon-hearth'],
    intro: 'Velvet Heart and Cinnamon Hearth, paired for the sweetest stretch of winter.',
  },
  {
    slug: 'lucky-bunny',
    name: 'Lucky Bunny Duo',
    month: 2,
    components: ['lucky-clover', 'bunny-trail'],
    endOverride: '2027-03-17',
    extension: {
      end: '2027-03-28',
      note: 'Checkout is not extended past March 17 unless Lucky Clover stock is confirmed through March 28.',
    },
    intro: 'Lucky Clover and Bunny Trail, the two March releases in one pairing.',
  },
  {
    slug: 'bluebonnet-refill',
    name: 'Bluebonnet Bloom Refill Pair',
    month: 3,
    components: ['bluebonnet-bloom', 'bluebonnet-bloom'],
    twoPack: true,
    startOverride: '2027-04-01',
    endOverride: '2027-04-30',
    intro: 'Two bags of Bluebonnet Bloom, for the household that does not want to run out.',
  },
  {
    slug: 'bluebonnet-caramel',
    name: 'Bluebonnet & Caramel Duo',
    month: 4,
    components: ['bluebonnet-bloom', 'coastal-caramel'],
    endOverride: '2027-05-31',
    intro: 'Bluebonnet Bloom beside Coastal Caramel, a spring pairing worth sharing.',
  },
  {
    slug: 'spring-bluebonnet-bunny',
    name: 'Easter Coffee Duo',
    month: 3,
    components: ['bluebonnet-bloom', 'bunny-trail'],
    scheduleNeedsConfirmation: true,
    intro: 'Bluebonnet Bloom + Bunny Trail Cinnamon Roll. Availability and release timing must be confirmed before this duo can be ordered.'
    heroArt: {
      src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/2df743515_03-15447.png',
      alt: 'Torch Republic Easter Coffee Duo featuring Bluebonnet Bloom and Bunny Trail Cinnamon Roll.',
    },
  },
  {
    slug: 'coastal-summer',
    name: 'Summer Coffee Duo',
    month: 5,
    components: ['gulf-coast-turtle', 'coastal-caramel'],
    endOverride: '2027-06-30',
    intro: 'Gulf Coast Turtle and Coastal Caramel.',
    heroArt: {
      src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/c4e94d4c3_04-15448.png',
      alt: 'Torch Republic Summer Coffee Duo featuring Gulf Coast Turtle and Coastal Caramel.',
    },
  },
  {
    slug: 'stars-stripes-summer',
    name: 'Stars & Stripes Summer Duo',
    month: 6,
    components: ['stars-stripes-spice', 'gulf-coast-turtle'],
    intro: 'Stars, Stripes & Spice with Gulf Coast Turtle, a pairing for summer gatherings.',
  },
  {
    slug: 'summer-to-harvest',
    name: 'Summer to Harvest Duo',
    month: 7,
    components: ['harvest-moon-pecan', 'gulf-coast-turtle'],
    intro: 'Harvest Moon Pecan with Gulf Coast Turtle, a late-summer bridge into fall.',
  },
  {
    slug: 'autumn-coffee-duo',
    name: 'Thanksgiving Coffee Duo',
    month: 10,
    components: ['harvest-moon-pecan', 'cinnamon-hearth'],
    scheduleNeedsConfirmation: true,
    intro: 'Harvest Moon Pecan and Cinnamon Hearth.',
    heroArt: {
      src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/b8e1fec7c_01-15443.png',
      alt: 'Torch Republic Thanksgiving Coffee Duo featuring Harvest Moon Pecan and Cinnamon Hearth.',
    },
  },
  {
    slug: 'autumn-pecan',
    name: 'Autumn Pecan Duo',
    month: 8,
    components: ['pumpkin-spice', 'harvest-moon-pecan'],
    intro: 'Pumpkin Spice and Harvest Moon Pecan, the two coffees of the fall season side by side.',
  },
  {
    slug: 'midnight-treats',
    name: 'Halloween Coffee Duo',
    month: 9,
    components: ['pumpkin-spice', 'midnight-hex'],
    scheduleNeedsConfirmation: true,
    intro: 'Pumpkin Spice + Midnight Hex (Mexican chocolate). Availability and release timing must be confirmed before this duo can be ordered.',
    heroArt: {
      src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/4d184ce0b_TorchRepublicHalloweencoffeeduo.png',
      alt: 'Torch Republic Halloween Coffee Duo featuring Pumpkin Spice and Midnight Hex Mexican chocolate.',
    },
  },
  {
    slug: 'harvest-fireside',
    name: 'Thanksgiving Fireside Duo',
    monthlyName: 'Thanksgiving Duo',
    month: 10,
    components: ['harvest-moon-pecan', 'fireside-smores'],
    intro: 'Harvest Moon Pecan and Fireside S\u2019mores, the Thanksgiving Duo: one for the table after the plates are cleared, and one for the quiet hours that follow.',
    // A late-autumn Thanksgiving scene used only as a backdrop. The bags in
    // front of it are the real package images pulled from each coffee's record.
    scene: {
      src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/2d87efb73_file_000000002bb081f697b675868e830273.png',
      alt: 'A weathered wooden harvest table at sunset with two mugs of coffee, a pecan pie and scattered autumn leaves, with a lit stone fireplace and lanterns behind.',
    },
  },
  {
    slug: 'peppermint-fireside',
    name: 'Christmas Coffee Duo',
    month: 11,
    components: ['peppermint-parade', 'fireside-smores'],
    scheduleNeedsConfirmation: true,
    intro: 'Peppermint Parade + Fireside S’mores. Availability and release timing must be confirmed before this duo can be ordered.',
    heroArt: {
      src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/db1441767_02-15444.png',
      alt: 'Torch Republic Christmas Coffee Duo featuring Peppermint Parade and Fireside S’mores.',
    },
  },
];

// Only the four fixed holiday pairings are marketed as holiday duos. Legacy
// combinations remain available to their old routes, but not to current lists.
const FIXED_HOLIDAY_SLUGS = new Set(['midnight-treats', 'peppermint-fireside', 'spring-bluebonnet-bunny', 'autumn-coffee-duo']);
export const DUOS = ALL_DUOS.filter((pairing) => FIXED_HOLIDAY_SLUGS.has(pairing.slug));
export const DUO_SCHEDULE = DUOS;

/** Old duo URLs keep working and land on the canonical page. */
export const DUO_ALIASES = {
  'winter-hearts': 'velvet-hearts',
  'lucky-clover-bunny-trail': 'lucky-bunny',
  'bluebonnet-bloom-two-pack': 'bluebonnet-refill',
  'coastal-caramel-bluebonnet-bloom': 'bluebonnet-caramel',
  'gulf-coast-turtle-coastal-caramel': 'coastal-summer',
  'stars-stripes-spice-gulf-coast-turtle': 'stars-stripes-summer',
  'harvest-moon-pecan-gulf-coast-turtle': 'summer-to-harvest',
  'pumpkin-spice-harvest-moon-pecan': 'autumn-pecan',
  halloween: 'midnight-treats',
  'fireside-smores-harvest-moon-pecan': 'autumn-coffee-duo',
  'harvest-fireside': 'autumn-coffee-duo',
  christmas: 'peppermint-fireside',
  'winter-duo': 'peppermint-fireside',
};

export function resolveDuoSlug(slug) {
  return DUO_ALIASES[slug] || slug;
}

/** The four seasonal collections, in calendar order. */
export const SEASON_ENTRIES = [
  { key: 'winter', kicker: 'Winter', start: '2027-12-01', end: '2027-12-31', duoSlug: 'peppermint-fireside', note: 'The Christmas and New Year\u2019s campaigns link to this same pair.' },
  { key: 'spring', kicker: 'Spring', start: '2027-04-01', end: '2027-05-31', duoSlug: 'spring-bluebonnet-bunny', scheduleNeedsConfirmation: true, note: 'Release timing for this pairing needs confirmation.' },
  { key: 'summer', kicker: 'Summer', start: '2027-06-01', end: '2027-06-30', duoSlug: 'coastal-summer', note: 'Father\u2019s Day links to this same pair.' },
  { key: 'fall', kicker: 'Fall', start: '2027-09-01', end: '2027-10-31', duoSlug: 'autumn-coffee-duo', scheduleNeedsConfirmation: true, note: 'Release timing for this pairing needs confirmation.' },
];

/** Holiday moments, chronological. Dates refer to 2027. */
const ALL_HOLIDAY_ENTRIES = [
  { key: 'valentines', kicker: 'Valentine\u2019s Day \u00b7 Feb 14', start: '2027-02-01', end: '2027-02-14', duoSlug: 'velvet-hearts', campaign: 'Velvet Hearts Duo' },
  { key: 'st-patricks', kicker: 'St. Patrick\u2019s Day \u00b7 Mar 17', start: '2027-03-01', end: '2027-03-17', duoSlug: 'lucky-bunny', campaign: 'Lucky Bunny Duo' },
  {
    key: 'easter',
    kicker: 'Easter \u00b7 Mar 28',
    start: '2027-03-18',
    end: '2027-03-28',
    duoSlug: 'spring-bluebonnet-bunny',
    campaign: 'Easter Coffee Duo',
    gated: true,
    note: 'Availability and selling dates require confirmation.',
    scheduleNeedsConfirmation: true,
  },
  { key: 'mothers-day', kicker: 'Mother\u2019s Day \u00b7 May 9', start: '2027-05-01', end: '2027-05-09', duoSlug: 'bluebonnet-caramel', campaign: 'Bluebonnet & Caramel Duo' },
  { key: 'memorial-day', kicker: 'Memorial Day \u00b7 May 31', start: '2027-05-21', end: '2027-05-31', duoSlug: 'bluebonnet-caramel', campaign: 'Bluebonnet & Caramel Duo' },
  { key: 'fathers-day', kicker: 'Father\u2019s Day \u00b7 Jun 20', start: '2027-06-01', end: '2027-06-20', duoSlug: 'coastal-summer', campaign: 'Coastal Father\u2019s Day Duo' },
  { key: 'independence-day', kicker: 'Independence Day \u00b7 Jul 4', start: '2027-07-01', end: '2027-07-04', duoSlug: 'stars-stripes-summer', campaign: 'Stars & Stripes Summer Duo', note: 'Dates are checkout windows, not arrival dates.' },
  { key: 'labor-day', kicker: 'Labor Day \u00b7 Sep 6', start: '2027-09-01', end: '2027-09-06', duoSlug: 'autumn-pecan', campaign: 'Autumn Pecan Duo' },
  { key: 'halloween', kicker: 'Halloween \u00b7 Oct 31', start: '2027-10-01', end: '2027-10-31', duoSlug: 'midnight-treats', campaign: 'Halloween Coffee Duo', note: 'Availability and selling dates require confirmation.', scheduleNeedsConfirmation: true },
  { key: 'thanksgiving', kicker: 'Thanksgiving \u00b7 Nov 25', start: '2027-11-01', end: '2027-11-25', duoSlug: 'autumn-coffee-duo', campaign: 'Thanksgiving Coffee Duo', note: 'Availability and selling dates require confirmation.', scheduleNeedsConfirmation: true },
  { key: 'christmas', kicker: 'Christmas \u00b7 Dec 25', start: '2027-12-01', end: '2027-12-25', duoSlug: 'peppermint-fireside', campaign: 'Christmas Coffee Duo', note: 'Availability and selling dates require confirmation.', scheduleNeedsConfirmation: true },
  { key: 'new-years-eve', kicker: 'New Year\u2019s Eve \u00b7 Dec 31', start: '2027-12-26', end: '2027-12-31', duoSlug: 'peppermint-fireside', campaign: 'Christmas Coffee Duo', note: 'Open only while both coffees remain available.' },
];

export const HOLIDAY_ENTRIES = ALL_HOLIDAY_ENTRIES.filter((entry) => ['easter', 'halloween', 'thanksgiving', 'christmas'].includes(entry.key));

const MONTHS = MONTH_NAMES;

/**
 * The window a pairing can actually be sold in is the overlap of its coffees'
 * windows, trimmed by any pairing-specific cutoff.
 */
export function pairWindow(pairing) {
  if (!pairing) return null;
  if (pairing.legacy || !FIXED_HOLIDAY_SLUGS.has(pairing.slug)) return null;
  const holiday = HOLIDAY_ENTRIES.find((entry) => entry.duoSlug === pairing.slug);
  if (holiday) return { start: holiday.start, end: holiday.end };
  const windows = pairing.components.map((slug) => seasonalEntry(slug)).filter(Boolean);
  if (windows.length === 0) return null;
  const start = [pairing.startOverride, ...windows.map((w) => w.start)].filter(Boolean).sort().pop();
  const end = [pairing.endOverride, ...windows.map((w) => w.end)].filter(Boolean).sort()[0];
  if (!start || !end || start > end) return null;
  return { start, end };
}

export function pairingLabel(pairing) {
  if (!pairing) return '';
  const names = pairing.components.map((slug) => seasonalEntry(slug)?.name || '');
  if (pairing.twoPack) return `${names[0]} two-pack`;
  return `${names[0]} + ${names[1]}`;
}

export function duoName(pairing) {
  return pairing?.name || pairingLabel(pairing);
}

export function duoPath(pairing) {
  return `/duos/${pairing?.slug || ''}`;
}

export function duoBySlug(slug) {
  const resolved = resolveDuoSlug(slug);
  return ALL_DUOS.find((pairing) => pairing.slug === resolved) || null;
}

/** Distinct coffees in a duo, with the number of bags of each. */
export function duoContents(pairing) {
  if (!pairing) return [];
  const seen = new Set();
  return pairing.components
    .filter((slug) => {
      if (seen.has(slug)) return false;
      seen.add(slug);
      return true;
    })
    .map((slug) => ({
      slug,
      name: seasonalEntry(slug)?.name || slug,
      flavor: seasonalEntry(slug)?.flavor || null,
      qty: pairing.components.filter((s) => s === slug).length,
    }));
}

export function duoFlavorLine(pairing) {
  return duoContents(pairing)
    .map((item) => item.flavor)
    .filter(Boolean)
    .join(' + ');
}

export function duoPairingNote(pairing) {
  const items = duoContents(pairing);
  const month = monthLabelFor(pairing);
  if (items.length === 0) return '';
  if (pairing?.twoPack) {
    return `Two bags of ${items[0].name}${items[0].flavor ? `, a ${items[0].flavor} coffee,` : ''} for ${month}.`;
  }
  const [first, second] = items;
  const flavorPart = first.flavor && second.flavor
    ? `a ${first.flavor} coffee with a ${second.flavor} coffee`
    : 'two seasonal reserve coffees';
  return `Paired for ${month}: ${flavorPart}.`;
}

/**
 * The approved shot for one coffee: its own edition photo first, then an
 * approved option photo, then the supplier label artwork. Null when none exists.
 */
export function duoArtworkFor(slug, edition) {
  const entry = seasonalEntry(slug);
  const name = edition?.name || entry?.name || slug;
  const optionImage = (edition?.options || []).find((option) => option.image_url)?.image_url || null;
  const src = edition?.image_url || optionImage;
  if (src) {
    return { src, alt: `Torch Republic ${name} coffee bag` };
  }
  const art = seasonalArtwork(slug);
  return art ? { src: art.src, alt: `Torch Republic ${name} coffee bag` } : null;
}

/** The coffees of a duo with their edition record and approved image. */
export function duoBags(pairing, bySlug = new Map()) {
  return duoContents(pairing).map((item) => {
    const edition = bySlug.get(item.slug) || null;
    return { ...item, name: edition?.name || item.name, edition, art: duoArtworkFor(item.slug, edition) };
  });
}

/** Seasons and holidays that point at one canonical duo. */
export function occasionsFor(pairing) {
  if (!pairing) return { seasons: [], holidays: [] };
  return {
    seasons: SEASON_ENTRIES.filter((e) => e.duoSlug === pairing.slug),
    holidays: HOLIDAY_ENTRIES.filter((e) => e.duoSlug === pairing.slug),
  };
}

export function duoSeasonLabel(pairing) {
  const { seasons, holidays } = occasionsFor(pairing);
  const names = [
    ...seasons.map((e) => e.kicker),
    ...holidays.filter((e) => !e.gated).map((e) => e.kicker.split(' \u00b7 ')[0]),
  ];
  const month = pairing.scheduleNeedsConfirmation ? '' : monthLabelFor(pairing);
  return [month, ...names].filter(Boolean).join(' \u00b7 ');
}

export function monthLabelFor(pairing) {
  return pairing ? MONTHS[pairing.month] : '';
}

function afterCalendarYear(today) {
  return String(today).slice(0, 10) > `${CALENDAR_YEAR}-12-31`;
}

/**
 * A pairing is only orderable when both coffees are purchasable in the same
 * grind, so a missing half can never be sold as a bundle.
 */
export function pairAvailability(pairing, editions = [], today = todayInChicago()) {
  if (!pairing) return { state: 'none' };
  const window = pairing.window || pairWindow(pairing);
  if (!window) return { state: pairing.legacy || !FIXED_HOLIDAY_SLUGS.has(pairing.slug) ? 'past' : 'none' };
  if (pairing.scheduleNeedsConfirmation) return { state: 'upcoming', window, parts: [] };

  const bySlug = new Map((editions || []).map((e) => [e.slug, e]));
  const parts = pairing.components.map((slug) => {
    const edition = bySlug.get(slug) || null;
    const buyable = (edition?.options || []).find((option) => optionState(option).purchasable) || null;
    return { slug, edition, option: buyable };
  });

  const yearApplies = String(today).slice(0, 4) === String(CALENDAR_YEAR);
  let planned = 'upcoming';
  if (afterCalendarYear(today)) planned = 'past';
  else if (yearApplies) planned = today < window.start ? 'upcoming' : today > window.end ? 'past' : 'open';

  if (planned === 'past') return { state: 'past', window, parts };
  if (planned === 'upcoming') return { state: 'upcoming', window, parts };
  if (parts.some((part) => !part.option)) return { state: 'coming_soon', window, parts };

  return { state: 'available', window, parts };
}

/** Customer-facing state: available | upcoming | closed. */
export function duoStatus(pairing, editions = [], today = todayInChicago()) {
  const { state } = pairAvailability(pairing, editions, today);
  if (state === 'available') return 'available';
  if (state === 'past') return 'closed';
  return 'upcoming';
}

/** Status of a season or holiday entry, against its own dates and the duo's stock. */
export function entryStatus(entry, pairing, editions = [], today = todayInChicago()) {
  const day = String(today).slice(0, 10);
  if (day > `${CALENDAR_YEAR}-12-31`) return 'closed';
  if (day < `${CALENDAR_YEAR}-01-01`) return 'upcoming';
  if (entry.scheduleNeedsConfirmation) return 'upcoming';
  if (day < entry.start) return 'upcoming';
  if (day > entry.end) return 'closed';
  if (entry.gated) return 'closed';
  return duoStatus(pairing, editions, today) === 'available' ? 'available' : 'upcoming';
}

export const STATUS_LABEL = {
  available: 'Available now',
  upcoming: 'Availability being confirmed',
  closed: 'Closed',
};

/**
 * One duo is featured at a time: the open one (the most recently opened if two
 * overlap), otherwise the next one ahead. Null once the year is behind us.
 */
export function featuredPairing(today = todayInChicago()) {
  const withWindows = DUOS.map((pairing) => ({ ...pairing, window: pairWindow(pairing) })).filter((p) => p.window);
  const yearApplies = String(today).slice(0, 4) === String(CALENDAR_YEAR);

  if (yearApplies) {
    const open = withWindows
      .filter((p) => today >= p.window.start && today <= p.window.end)
      .sort((a, b) => b.window.start.localeCompare(a.window.start));
    if (open.length) return open[0];
  }
  const upcoming = [...withWindows]
    .filter((p) => p.window.start > today)
    .sort((a, b) => a.window.start.localeCompare(b.window.start));

  // Before the 2027 calendar year begins, surface the owner-prioritized
  // Fireside release first and Peppermint Parade second. Once that calendar
  // year starts, the live/chronological schedule above remains authoritative.
  if (!yearApplies) {
    const releasePriority = ['midnight-treats', 'autumn-coffee-duo', 'peppermint-fireside', 'spring-bluebonnet-bunny'];
    const prioritized = releasePriority
      .map((slug) => upcoming.find((p) => p.slug === slug))
      .find(Boolean);
    if (prioritized) return prioritized;
  }

  return upcoming[0] || null;
}

/** All duos with their windows, in opening order. */
export function duoCalendar() {
  return DUOS.map((pairing) => ({
    ...pairing,
    window: pairWindow(pairing),
    label: duoName(pairing),
    flavors: duoFlavorLine(pairing),
    contents: duoContents(pairing),
    monthLabel: MONTHS[pairing.month],
    seasonLabel: duoSeasonLabel(pairing),
  }));
}

/** The duo that opens after this one, for the archived state. */
export function nextDuoAfter(pairing) {
  const ordered = duoCalendar().filter((p) => p.window).sort((a, b) => a.window.start.localeCompare(b.window.start));
  const index = ordered.findIndex((p) => p.slug === pairing?.slug);
  return index >= 0 ? ordered[index + 1] || null : null;
}

export { SEASONAL_WINDOWS };