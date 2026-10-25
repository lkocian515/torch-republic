import { base44 } from '@/api/base44Client';

/**
 * SPECIAL EDITIONS — storefront data helpers.
 *
 * Editorial content (descriptions, imagery, campaign copy, scheduling) comes
 * from the website's own records. Price, stock and purchasing availability
 * come from Shopify. Supplier approval is tracked separately from stock.
 */

let cache = null;
let inflight = null;

export async function loadSpecialEditions({ force = false } = {}) {
  if (cache && !force) return cache;
  if (inflight) return inflight;
  inflight = base44.functions
    .invoke('getSpecialEditions', {})
    .then((res) => {
      cache = res?.data || { editions: [], campaigns: [], shopifyError: null };
      return cache;
    })
    .catch(() => {
      cache = { editions: [], campaigns: [], shopifyError: 'unavailable' };
      return cache;
    })
    .finally(() => {
      inflight = null;
    });
  return inflight;
}

export function clearSpecialEditionsCache() {
  cache = null;
}

const VARIANT_GID = /^gid:\/\/shopify\/ProductVariant\/\d+$/;

export function isMappedVariant(id) {
  return typeof id === 'string' && VARIANT_GID.test(id);
}

/**
 * Purchasable only when approved AND mapped to a real Shopify variant AND
 * Shopify confirms it is available. Anything Shopify has not confirmed reads
 * as coming soon — only a confirmed sold-out answer is shown as sold out.
 */
export function optionState(option) {
  // An option Shopify has not confirmed as available reads as coming soon, so
  // the storefront never promises a purchase it cannot complete.
  if (!option) return { state: 'pending', purchasable: false, label: 'Coming soon' };
  if (!option.approved) return { state: 'pending', purchasable: false, label: 'Coming soon' };
  if (!isMappedVariant(option.shopify_variant_id)) {
    return { state: 'pending', purchasable: false, label: 'Coming soon' };
  }
  if (!option.shopify || option.shopify.error || option.shopify.unavailable) {
    return { state: 'error', purchasable: false, label: 'Coming soon' };
  }
  if (!option.shopify.available) {
    return { state: 'soldout', purchasable: false, label: 'Sold out' };
  }
  return {
    state: 'available',
    purchasable: true,
    label: 'In stock',
    price: option.shopify.price,
    compareAtPrice: option.shopify.compareAtPrice,
    currency: option.shopify.currency,
  };
}

export function editionOptions(edition) {
  return edition?.options || [];
}

export function purchasableOptions(edition) {
  return editionOptions(edition).filter((o) => optionState(o).purchasable);
}

export function defaultOption(edition) {
  const options = editionOptions(edition);
  if (options.length === 0) return null;
  const flagged = options.find((o) => o.is_default);
  if (flagged) return flagged;
  const buyable = options.filter((o) => optionState(o).purchasable);
  return buyable[0] || options[0];
}

export function findOption(edition, key) {
  if (!key) return null;
  return editionOptions(edition).find((o) => o.key === key) || null;
}

/**
 * An upcoming release is announced but not yet produced. It is never
 * purchasable and never carries an unconfirmed price, format or stock state.
 */
export function isUpcomingEdition(edition) {
  return edition?.status === 'coming_soon';
}

export const COMING_SOON_COPY =
  'This seasonal release is in preparation. Product details and ordering will be available after production and Shopify setup are complete.';

export function editionState(edition) {
  if (isUpcomingEdition(edition)) return { state: 'pending', label: 'Coming Soon' };
  const options = editionOptions(edition);
  if (options.length === 0) return { state: 'pending', label: 'Coming soon' };
  if (options.some((o) => optionState(o).purchasable)) return { state: 'available', label: 'Available' };
  if (options.some((o) => optionState(o).state === 'error')) return { state: 'error', label: 'Coming soon' };
  if (options.some((o) => o.approved && isMappedVariant(o.shopify_variant_id))) {
    return { state: 'soldout', label: 'Sold out' };
  }
  return { state: 'pending', label: 'Coming soon' };
}

export function editionsInCollection(editions, collectionSlug) {
  if (!collectionSlug) return editions || [];
  return (editions || []).filter((e) => (e.collections || []).includes(collectionSlug));
}

export function editionPath(edition) {
  return `/special-editions/${edition?.slug || ''}`;
}

export function collectionPath(collectionSlug) {
  return `/special-editions/collections/${collectionSlug}`;
}

export function isCampaignLive(campaign, now = new Date()) {
  if (!campaign || campaign.archived) return false;
  if (campaign.start_date && new Date(campaign.start_date) > now) return false;
  if (campaign.end_date && new Date(campaign.end_date) < now) return false;
  return true;
}

/** The featured campaign for the homepage hero. Expired campaigns drop out. */
export function pickFeaturedCampaign(campaigns) {
  const live = (campaigns || []).filter((c) => isCampaignLive(c));
  const featured = live.filter((c) => c.featured);
  const pool = featured.length > 0 ? featured : live;
  return [...pool].sort((a, b) => (a.display_order || 0) - (b.display_order || 0))[0] || null;
}

export function formatMoney(amount, currency = 'USD') {
  const value = Number(amount);
  if (!Number.isFinite(value)) return null;
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency || 'USD' }).format(value);
  } catch {
    return `$${value.toFixed(2)}`;
  }
}

/**
 * Convert an edition option into a cart line. The variant ID is Shopify's own
 * and is validated server-side against the approved-edition allowlist.
 */
export function toCartProduct(edition, option) {
  return {
    id: `edition:${edition.slug}:${option.key}`,
    name: `${edition.name} - ${option.label}`,
    shopifyHandle: `edition-${edition.slug}-${option.key}`,
    variantId: option.shopify_variant_id,
    image: option.image_url || '',
    price: Number(option.shopify?.price || 0),
    shopifyPrice: option.shopify?.price || null,
    category: 'special-edition',
  };
}