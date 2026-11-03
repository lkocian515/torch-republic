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
  path: '/duos/peppermint-fireside',

  eyebrow: 'Christmas',
  name: 'The Christmas Duo',
  flavorLine: 'Peppermint Parade + Fireside S’mores',
  supporting: 'Two seasonal coffees paired for the Christmas season.',
  ctaLabel: 'View Christmas Duo',

  teaserHeading: 'The Christmas Coffee Duo',
  teaserText: 'Peppermint Parade + Fireside S’mores.',
  teaserLinkLabel: 'View Christmas Duo',

  // Kept for legacy scene-based components; current merchandising uses the
  // complete supplied image directly so its built-in labels stay intact.
  scene: {
    src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/db1441767_02-15444.png',
    alt: 'Torch Republic Christmas Coffee Duo featuring Peppermint Parade and Fireside S’mores.',
  },
  image:
    'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/db1441767_02-15444.png',
  imageAlt: 'Torch Republic Christmas Coffee Duo featuring Peppermint Parade and Fireside S’mores.',
  imageRatio: '1536 / 864',

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

  productSlugs: ['peppermint-parade', 'fireside-smores'],
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
export const CHRISTMAS_BAGS = ['peppermint-parade', 'fireside-smores'].map((slug) => {
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