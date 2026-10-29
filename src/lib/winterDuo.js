/**
 * WINTER DUO — single source of truth for the seasonal pairing of
 * Fireside S'mores and Harvest Moon Pecan.
 *
 * The homepage feature, the homepage reminder, the Shop card and the landing
 * page all read this config, so the copy, the artwork and the destination can
 * never drift apart between placements.
 *
 * Deliberately absent: price, format, size, grind, shipping and availability.
 * Those belong to each coffee's own edition record and come from Shopify, so
 * they can never be hard-coded into marketing copy here.
 */

import { seasonalArtwork, seasonalEntry } from './seasonalCalendar';

export const WINTER_DUO = {
  slug: 'winter-duo',
  path: '/duos/harvest-fireside',

  eyebrow: 'Thanksgiving',
  name: 'The Thanksgiving Duo',
  flavorLine: 'Harvest Moon Pecan + Fireside S\u2019mores',
  supporting: 'Two coffees for a late-autumn table: one for the hosting hours, one for the quiet ones after the plates are cleared.',
  ctaLabel: 'Explore the Duo',

  teaserHeading: 'For the Thanksgiving table',
  teaserText: 'Harvest Moon Pecan and Fireside S\u2019mores, poured from afternoon into the evening.',
  teaserLinkLabel: 'See the Thanksgiving Duo',

  // A late-autumn scene, used only as a backdrop. The two package images are
  // placed in front of it separately, so no label is ever redrawn.
  scene: {
    src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/2d87efb73_file_000000002bb081f697b675868e830273.png',
    alt: 'A weathered wooden harvest table at sunset with two mugs of coffee, a pecan pie and scattered autumn leaves, with a lit stone fireplace and lanterns behind.',
  },
  image:
    'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/2d87efb73_file_000000002bb081f697b675868e830273.png',
  imageAlt: 'A weathered wooden harvest table at sunset with two mugs of coffee, a pecan pie and scattered autumn leaves, with a lit stone fireplace and lanterns behind.',
  imageRatio: '3 / 2',

  // Ad creatives for paid social only. They carry their own baked-in headline
  // and button, so they are never used as a page image.
  adCreatives: [
    {
      placement: 'Stories and Reels',
      ratio: '941 / 1672',
      image:
        'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/01db06166_file_000000002788820cbb39e7696e6f006d.png',
    },
  ],

  productSlugs: ['fireside-smores', 'harvest-moon-pecan'],
};

/**
 * Both duo coffees, in the order the pair is presented.
 *
 * Reads the combined catalog so a coffee that goes live simply moves from the
 * upcoming list into the active one without the pair losing a member.
 */
/**
 * The two approved package images, in the order the pair is presented. These
 * are the real label shots from the seasonal artwork library, never a redraw.
 */
export const THANKSGIVING_BAGS = ['harvest-moon-pecan', 'fireside-smores'].map((slug) => {
  const art = seasonalArtwork(slug);
  const name = seasonalEntry(slug)?.name || slug;
  return { slug, name, art: art ? { src: art.src, alt: `Torch Republic ${name} coffee bag` } : null };
});

export function winterDuoEditions(editions, upcoming) {
  const bySlug = new Map([...(editions || []), ...(upcoming || [])].map((e) => [e.slug, e]));
  return WINTER_DUO.productSlugs.map((slug) => bySlug.get(slug)).filter(Boolean);
}

/** True only for the two coffees that make up the Winter Duo. */
export function isWinterDuoEdition(edition) {
  return !!edition && WINTER_DUO.productSlugs.includes(edition.slug);
}