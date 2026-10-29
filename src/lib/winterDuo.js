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

export const WINTER_DUO = {
  slug: 'winter-duo',
  path: '/duos/harvest-fireside',

  eyebrow: 'Seasonal Pairing',
  name: 'The Thanksgiving Duo',
  flavorLine: 'Fireside S\u2019mores + Harvest Moon Pecan',
  supporting: 'Two cozy flavored coffees for fireside evenings and cold-weather mornings.',
  ctaLabel: 'Explore the Duo',

  teaserHeading: 'Cozy season is coming',
  teaserText: 'Meet Fireside S\u2019mores and Harvest Moon Pecan.',
  teaserLinkLabel: 'See the Thanksgiving Duo',

  // 1774 x 887 wide landscape. Rendered at its own ratio so both pouches and
  // their package labels stay complete at every breakpoint.
  image:
    'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/ed4ea0239_file_00000000f010820da8ae9117e93df19c.png',
  imageAlt: 'Torch Republic Fireside S\u2019mores and Harvest Moon Pecan coffee bags in a winter setting.',
  imageRatio: '1774 / 887',

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
export function winterDuoEditions(editions, upcoming) {
  const bySlug = new Map([...(editions || []), ...(upcoming || [])].map((e) => [e.slug, e]));
  return WINTER_DUO.productSlugs.map((slug) => bySlug.get(slug)).filter(Boolean);
}

/** True only for the two coffees that make up the Winter Duo. */
export function isWinterDuoEdition(edition) {
  return !!edition && WINTER_DUO.productSlugs.includes(edition.slug);
}