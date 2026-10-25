/**
 * Brand assets — the single source of truth for the Torch Republic logo.
 *
 * Change a URL here and every surface picks it up: the site header, product
 * image fallbacks, structured data, and transactional email.
 *
 *   BRAND_LOGO          horizontal lockup on white — the website wordmark
 *   BRAND_LOGO_STACKED  stacked lockup, transparent — narrow or dark surfaces
 */

const BASE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec';

export const BRAND_LOGO = `${BASE}/0d88c4bb9_Torch-Republic-Website-Logo-White.png`;

export const BRAND_LOGO_STACKED = `${BASE}/63195e832_Torch-Republic-Original-Style-Transparent.png`;

/** Logo palette, taken from the wordmark itself. */
export const BRAND_COLORS = {
  brown: '#4B2C20',
  brownDeep: '#2A1813',
  terracotta: '#C2673A',
  tan: '#E5A870',
};