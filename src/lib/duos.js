/**
 * DUOS — the permanent Originals Duo plus the 2027 seasonal pairing schedule.
 *
 * Nothing here invents a bundle price or a bundle SKU. The Originals Duo is a
 * real Shopify product (verified live at $45.00 against $22.99 + $25.99
 * component prices), and a seasonal pairing only counts as available when both
 * of its coffees are individually purchasable in the same grind.
 */

import { SEASONAL_WINDOWS, seasonalEntry, seasonalArtwork, todayInChicago, CALENDAR_YEAR } from './seasonalCalendar';
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

/** Slowest-first order: January through December 2027. */
export const DUO_SCHEDULE = [
  // January has no duo by design: Cinnamon Hearth is featured on its own.
  // Only pairings the owner has confirmed appear here — nothing is inferred.
  {
    slug: 'winter-hearts',
    name: 'Winter Hearts Duo',
    month: 1,
    holiday: 'Valentine\u2019s',
    components: ['velvet-heart', 'cinnamon-hearth'],
  },
  { slug: 'lucky-clover-bunny-trail', month: 2, components: ['lucky-clover', 'bunny-trail'], endOverride: '2027-03-17' },
  { slug: 'bluebonnet-bloom-two-pack', month: 3, components: ['bluebonnet-bloom', 'bluebonnet-bloom'], twoPack: true },
  { slug: 'coastal-caramel-bluebonnet-bloom', month: 4, components: ['coastal-caramel', 'bluebonnet-bloom'] },
  { slug: 'gulf-coast-turtle-coastal-caramel', month: 5, components: ['gulf-coast-turtle', 'coastal-caramel'] },
  { slug: 'stars-stripes-spice-gulf-coast-turtle', month: 6, components: ['stars-stripes-spice', 'gulf-coast-turtle'] },
  { slug: 'harvest-moon-pecan-gulf-coast-turtle', month: 7, components: ['harvest-moon-pecan', 'gulf-coast-turtle'] },
  { slug: 'pumpkin-spice-harvest-moon-pecan', month: 8, components: ['pumpkin-spice', 'harvest-moon-pecan'] },
  {
    slug: 'halloween',
    name: 'Halloween Duo',
    month: 9,
    holiday: 'Halloween',
    components: ['pumpkin-spice', 'midnight-hex'],
  },
  { slug: 'fireside-smores-harvest-moon-pecan', month: 10, components: ['fireside-smores', 'harvest-moon-pecan'] },
  {
    slug: 'christmas',
    name: 'Christmas Duo',
    month: 11,
    holiday: 'Christmas',
    components: ['peppermint-parade', 'fireside-smores'],
  },
];

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * The window a pairing can actually be sold in is the overlap of its coffees'
 * windows, trimmed by any pairing-specific cutoff (March runs 1–17 only).
 */
export function pairWindow(pairing) {
  if (!pairing) return null;
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

/** A confirmed duo keeps its own name; everything else is named by its coffees. */
export function duoName(pairing) {
  return pairing?.name || pairingLabel(pairing);
}

export function duoPath(pairing) {
  return `/duos/${pairing?.slug || ''}`;
}

export function duoBySlug(slug) {
  return DUO_SCHEDULE.find((pairing) => pairing.slug === slug) || null;
}

/** Two coffees only: the flags each card and detail page needs. */
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

/** The confirmed flavor descriptors, in the order the pair is presented. */
export function duoFlavorLine(pairing) {
  return duoContents(pairing)
    .map((item) => item.flavor)
    .filter(Boolean)
    .join(' + ');
}

/** One factual line: the two confirmed flavors and the month they are paired for. */
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
 * The approved shot for one coffee in a duo: its own edition photo first, then
 * an approved option photo (the live Halloween coffees carry theirs there), then
 * the supplier label artwork. Returns null when no approved image exists.
 */
export function duoArtworkFor(slug, edition) {
  const entry = seasonalEntry(slug);
  const name = edition?.name || entry?.name || slug;
  const optionImage = (edition?.options || []).find((option) => option.image_url)?.image_url || null;
  const src = edition?.image_url || optionImage;
  if (src) {
    return { src, alt: `Torch Republic ${name}${entry?.flavor ? ` ${entry.flavor}` : ''} coffee bag` };
  }
  const art = seasonalArtwork(slug);
  return art ? { src: art.src, alt: art.alt } : null;
}

/** Month plus the holiday it is paired for, when the owner has named one. */
export function duoSeasonLabel(pairing) {
  const month = monthLabelFor(pairing);
  return pairing?.holiday ? `${month} \u00b7 ${pairing.holiday}` : month;
}

/**
 * The pairing of the day: open one wins, otherwise the next one ahead.
 * Returns null once every 2027 pairing is behind us.
 */
export function featuredPairing(today = new Date().toISOString().slice(0, 10)) {
  const yearApplies = String(today).slice(0, 4) === String(CALENDAR_YEAR);
  const withWindows = DUO_SCHEDULE.map((pairing) => ({ ...pairing, window: pairWindow(pairing) }));

  if (yearApplies) {
    const open = withWindows.find((p) => p.window && today >= p.window.start && today <= p.window.end);
    if (open) return open;
  }
  return withWindows.find((p) => p.window && p.window.start > today) || null;
}

/**
 * A seasonal pairing is only orderable when both coffees are purchasable in
 * the same grind, so a missing half can never be sold as a bundle.
 */
export function pairAvailability(pairing, editions = [], today = new Date().toISOString().slice(0, 10)) {
  if (!pairing) return { state: 'none' };
  const window = pairing.window || pairWindow(pairing);
  if (!window) return { state: 'none' };

  const bySlug = new Map((editions || []).map((e) => [e.slug, e]));
  const parts = pairing.components.map((slug) => {
    const edition = bySlug.get(slug) || null;
    const buyable = (edition?.options || []).find((option) => optionState(option).purchasable) || null;
    return { slug, edition, option: buyable };
  });

  const yearApplies = String(today).slice(0, 4) === String(CALENDAR_YEAR);
  const planned = yearApplies
    ? (today < window.start ? 'upcoming' : today > window.end ? 'past' : 'open')
    : 'upcoming';

  if (planned === 'past') return { state: 'past', window, parts };
  if (planned === 'upcoming') return { state: 'upcoming', window, parts };
  if (parts.some((part) => !part.option)) return { state: 'coming_soon', window, parts };

  // Same grind for both bags until combined fulfillment is tested otherwise.
  const grinds = parts.map((part) => part.option.key);
  if (new Set(grinds).size > 1) return { state: 'coming_soon', window, parts, reason: 'grind' };

  return { state: 'available', window, parts };
}

export function monthLabelFor(pairing) {
  return pairing ? MONTHS[pairing.month] : '';
}

/** The whole 2027 pairing calendar, for the Duos page. */
export function duoCalendar() {
  return DUO_SCHEDULE.map((pairing) => ({
    ...pairing,
    window: pairWindow(pairing),
    label: duoName(pairing),
    flavors: duoFlavorLine(pairing),
    contents: duoContents(pairing),
    monthLabel: MONTHS[pairing.month],
    seasonLabel: duoSeasonLabel(pairing),
  }));
}

export { SEASONAL_WINDOWS };