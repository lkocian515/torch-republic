/**
 * DUOS — the permanent Originals Duo plus the 2027 seasonal pairing schedule.
 *
 * Nothing here invents a bundle price or a bundle SKU. The Originals Duo is a
 * real Shopify product (verified live at $45.00 against $22.99 + $25.99
 * component prices), and a seasonal pairing only counts as available when both
 * of its coffees are individually purchasable in the same grind.
 */

import { SEASONAL_WINDOWS, seasonalEntry, todayInChicago, CALENDAR_YEAR } from './seasonalCalendar';
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
    { slug: 'instant-mushroom-coffee', name: 'Instant Coffee with Mushrooms', shopifyHandle: 'instant-coffee-with-mushroom', qty: 1 },
  ],
};

/** Slowest-first order: January through December 2027. */
export const DUO_SCHEDULE = [
  { month: 0, components: ['cinnamon-hearth', 'cinnamon-hearth'], twoPack: true },
  { month: 1, components: ['velvet-heart', 'cinnamon-hearth'] },
  { month: 2, components: ['lucky-clover', 'bunny-trail'], endOverride: '2027-03-17' },
  { month: 3, components: ['bluebonnet-bloom', 'bluebonnet-bloom'], twoPack: true },
  { month: 4, components: ['coastal-caramel', 'bluebonnet-bloom'] },
  { month: 5, components: ['gulf-coast-turtle', 'coastal-caramel'] },
  { month: 6, components: ['stars-stripes-spice', 'gulf-coast-turtle'] },
  { month: 7, components: ['harvest-moon-pecan', 'gulf-coast-turtle'] },
  { month: 8, components: ['pumpkin-spice', 'harvest-moon-pecan'] },
  { month: 9, components: ['midnight-hex', 'pumpkin-spice'] },
  { month: 10, components: ['fireside-smores', 'harvest-moon-pecan'] },
  { month: 11, components: ['peppermint-parade', 'fireside-smores'] },
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
  const start = windows.map((w) => w.start).sort().pop();
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
    label: pairingLabel(pairing),
    monthLabel: MONTHS[pairing.month],
  }));
}

export { SEASONAL_WINDOWS };