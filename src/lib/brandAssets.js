/**
 * Brand assets — the single source of truth for the Torch Republic logo.
 *
 * Change the logo here and every surface picks it up: the site header, product
 * image fallbacks, structured data, and transactional email.
 *
 *   BRAND_LOGO      the full emblem (cup, flame, bean) — used in <img> tags
 *   BRAND_MARK      just the cup and flame — for short placements like the header
 *   BRAND_LOGO_URL  the emblem as an absolute URL — structured data and email
 */

const SITE_URL = 'https://torchrepublic.com';
const LOGO_PATH = '/torch-republic-logo.png';
const MARK_PATH = '/torch-republic-mark.png';

/** The full emblem. Relative, so it resolves on every host. */
export const BRAND_LOGO = LOGO_PATH;

/** The cup and flame alone, for placements too short for the full emblem. */
export const BRAND_MARK = MARK_PATH;

/** The emblem as an absolute URL, for structured data and email. */
export const BRAND_LOGO_URL = `${SITE_URL}${LOGO_PATH}`;

/** Night-sky palette — the spin wheel, its popup, and the brand lockup. */
export const BRAND_COLORS = {
  navyDeep: '#050A12',
  navy: '#0A1424',
  navyLight: '#16233B',
  gold: '#EAC796', // champagne gold — labels and high-contrast accents
  goldLight: '#F3DCBB',
  goldDeep: '#C89965',
  goldAntique: '#C5A059', // antique gold — fine rules, filigree, tick marks
  green: '#7C8F6E', // restrained botanical green
  cream: '#F5EADD', // warm cream, taken from the seasonal label
};