/**
 * Brand assets — the single source of truth for the Torch Republic logo.
 *
 * All artwork comes from the approved Torch Republic logo package, exported as
 * standalone transparent PNGs. Nothing is cropped, masked, recolored or
 * re-created with text: every surface points at the file drawn for the surface
 * it sits on.
 *
 *   BRAND.horizontalLight   espresso lettering, burnt-orange flame — cream/ivory surfaces
 *   BRAND.horizontalDark    ivory lettering, gold outline — navy/charcoal
 *   BRAND.stackedLight/Dark tall lockup — larger brand placements only
 *   BRAND.badgeLight/Dark   circular badge — social/sharing and large badges
 *   BRAND.mark              cup and flame alone — tight spots (mobile header, favicon, wheel hub)
 *   BRAND.popupLockup       original gold-and-ivory lockup — celestial popup
 *   BRAND.shareImage        1200×630 sharing card
 */

const SITE_URL = 'https://torchrepublic.com';
const DIR = '/brand';

/* The two approved master files (transparent PNG, espresso + burnt orange).
   2092×752 horizontal lockup · 1194×1317 cup-and-flame icon. */
const HORIZONTAL_LIGHT =
  'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/2e2c8c900_01-15073.png';
const MARK =
  'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/2e2c8c900_01-15073.png';

/* Approved stacked lockup for the phone header — cup and flame above the
   TORCH REPUBLIC wordmark, with COFFEE COMPANY ruled beneath. Transparent PNG,
   1214×1295, artwork inset on the canvas (see BRAND_ASPECT.stackedMobile). */
const STACKED_MOBILE =
  'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/2e2c8c900_01-15073.png';

export const BRAND = {
  horizontalLight: HORIZONTAL_LIGHT,
  horizontalDark: `${DIR}/torch-republic-horizontal-dark.png`,
  stackedLight: `${DIR}/torch-republic-stacked-light.png`,
  stackedDark: `${DIR}/torch-republic-stacked-dark.png`,
  badgeLight: `${DIR}/torch-republic-badge-light.png`,
  badgeDark: `${DIR}/torch-republic-badge-dark.png`,
  mark: MARK,
  stackedMobile: STACKED_MOBILE,
  popupLockup: `${DIR}/torch-republic-popup-gold-ivory.png`,
  shareImage: `${DIR}/og-torch-republic.png`,
};

/** Intrinsic aspect ratios, so layouts can reserve space before the PNG loads. */
export const BRAND_ASPECT = {
  horizontal: 1, // supplied cup-and-flame mark
  mark: 1,
  stackedMobile: 1,
  square: 1,
};

/** The horizontal light lockup. Absolute, so it resolves on every host. */
export const BRAND_LOGO = BRAND.horizontalLight;

/** The cup and flame alone, for placements too short for the full wording. */
export const BRAND_MARK = BRAND.mark;

/** Absolute URLs for structured data, email and sharing metadata. */
export const BRAND_LOGO_URL = BRAND.horizontalLight;
export const BRAND_BADGE_URL = `${SITE_URL}${BRAND.badgeLight}`;
export const BRAND_SHARE_URL = `${SITE_URL}${BRAND.shareImage}`;

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