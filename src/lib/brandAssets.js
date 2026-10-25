/**
 * Brand assets — the single source of truth for the Torch Republic logo.
 *
 * Change the logo here and every surface picks it up: the site header, product
 * image fallbacks, structured data, and transactional email.
 *
 *   BRAND_LOGO      the wordmark, served from the app — used in <img> tags
 *   BRAND_LOGO_URL  the same wordmark as an absolute URL — structured data and email
 */

const SITE_URL = 'https://torchrepublic.com';
const LOGO_PATH = '/torch-republic-logo-transparent.png';

/** The site wordmark. Relative, so it resolves on every host. */
export const BRAND_LOGO = LOGO_PATH;

/** The same wordmark as an absolute URL, for structured data and email. */
export const BRAND_LOGO_URL = `${SITE_URL}${LOGO_PATH}`;

/** Palette used by the spin wheel. */
export const BRAND_COLORS = {
  brown: '#4B2C20',
  brownDeep: '#2A1813',
  terracotta: '#C2673A',
  tan: '#E5A870',
};