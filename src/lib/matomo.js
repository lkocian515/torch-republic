/**
 * ─────────────────────────────────────────────────────────────────
 *  Torch Republic — Matomo Analytics Module
 *
 *  Runs alongside lib/analytics.js (GA4). Every GA4 page_view / event is
 *  mirrored to Matomo so you have a privacy-first, self-hosted duplicate
 *  of the same data.
 *
 *  Tracker is loaded in index.html via the standard Matomo JS snippet,
 *  which exposes window._paq. This module wraps it with the same helpers
 *  GA4 uses (page views, ecommerce, custom events) and respects the same
 *  notrack rules.
 *
 *  Rule: exactly ONE page_view per route change, including initial load.
 *  Rule: NO analytics on /admin/*, /command/*, auth, cart, utility pages.
 *  Rule: No PII ever sent.
 *  Rule: Debug mode only when window.__TR_ANALYTICS_DEBUG === true.
 * ─────────────────────────────────────────────────────────────────
 */
import { MATOMO_URL, MATOMO_SITE_ID } from '@/lib/matomoConfig';

const BRAND = 'Torch Republic';
const CURRENCY = 'USD';

// ── Debug logger — only active when explicitly enabled ──
const debug = (...args) => {
  if (typeof window !== 'undefined' && window.__TR_ANALYTICS_DEBUG === true) {
    console.log('[TR Matomo]', ...args);
  }
};

// ── Routes that must NEVER be tracked (mirrors lib/analytics.js) ──
const NOTRACK_PREFIXES = [
  '/admin', '/command', '/login', '/register', '/forgot-password',
  '/reset-password', '/cart', '/checkout', '/order-confirmation',
  '/profile', '/loyalty', '/portal', '/traffic-report',
  '/email-campaign', '/admin/shopify', '/admin/keywords', '/admin/traffic',
  '/admin/blog',
];

const isNoTrackRoute = (path) => {
  const normalized = path.toLowerCase().replace(/\/$/, '') || '/';
  return NOTRACK_PREFIXES.some(p => normalized === p || normalized.startsWith(p + '/'));
};

// ── Normalize path: lowercase, remove trailing slash, strip tracking-only params ──
const TRACKING_PARAMS = ['fbclid', 'gclid', 'ttclid', 'msclkid', '_ga', '_gl'];
const normalizePath = (path, search = '') => {
  let normalized = (path || '/').toLowerCase().replace(/\/$/, '') || '/';
  if (search) {
    const params = new URLSearchParams(search);
    TRACKING_PARAMS.forEach(p => params.delete(p));
    const remaining = params.toString();
    if (remaining) normalized += '?' + remaining;
  }
  return normalized;
};

// ── _paq queue helper ──
const hasPaq = () => typeof window !== 'undefined' && Array.isArray(window._paq);
const push = (...args) => {
  if (!hasPaq()) return;
  window._paq.push(args);
  debug('paq.push', args);
};

// ─────────────────────────────────────────────────────────────────
//  PAGE VIEW — called once per route change by useAnalytics()
// ─────────────────────────────────────────────────────────────────
export const matomoTrackPageView = ({ path, search, title } = {}) => {
  if (!hasPaq()) return;
  const normalizedPath = normalizePath(path, search);
  if (isNoTrackRoute(normalizedPath)) {
    debug(`Skipped page_view for notrack route: ${normalizedPath}`);
    return;
  }
  // Matomo uses setCustomUrl + trackPageView for SPA route changes
  const pageLocation = `https://torchrepublic.com${normalizedPath}`;
  push('setCustomUrl', pageLocation);
  push('setDocumentTitle', title || document.title || '');
  push('trackPageView');
  debug(`page_view: ${normalizedPath}`);
};

// ─────────────────────────────────────────────────────────────────
//  ECOMMERCE — mirror GA4 ecommerce events into Matomo ecommerce
// ─────────────────────────────────────────────────────────────────
const buildMatomoItem = (item) => ({
  sku: String(item.item_id || item.id || 'unknown'),
  name: item.item_name || item.name || 'Unknown Product',
  category: item.item_category || item.category || 'Coffee',
  price: parseFloat(item.price) || 0,
  quantity: parseInt(item.quantity) || 1,
  brand: BRAND,
});

export const matomoTrackAddToCart = (item) => {
  if (!hasPaq()) return;
  const matomoItem = buildMatomoItem(item);
  push('addEcommerceItem', matomoItem.sku, matomoItem.name, matomoItem.category, matomoItem.price, matomoItem.quantity);
  push('trackEcommerceCartUpdate', matomoItem.price * matomoItem.quantity);
  debug('add_to_cart', matomoItem);
};

export const matomoTrackRemoveFromCart = (item) => {
  // Matomo has no native remove event — track as custom event
  matomoTrackEvent('Ecommerce', 'remove_from_cart', item.item_name || item.name, parseFloat(item.price) || 0);
};

export const matomoTrackViewCart = (items, value) => {
  if (!hasPaq()) return;
  items.forEach((item) => {
    const mi = buildMatomoItem(item);
    push('addEcommerceItem', mi.sku, mi.name, mi.category, mi.price, mi.quantity);
  });
  push('trackEcommerceCartUpdate', parseFloat(value) || 0);
};

export const matomoTrackBeginCheckout = (items, value) => {
  // Track as custom event + leave the cart state for the eventual purchase
  matomoTrackEvent('Ecommerce', 'begin_checkout', undefined, parseFloat(value) || 0);
};

export const matomoTrackPurchase = ({ transactionId, value, tax, shipping, items } = {}) => {
  if (!hasPaq()) return;
  if (!transactionId) {
    debug('purchase blocked: no transactionId');
    return;
  }
  (items || []).forEach((item) => {
    const mi = buildMatomoItem(item);
    push('addEcommerceItem', mi.sku, mi.name, mi.category, mi.price, mi.quantity);
  });
  push('trackEcommerceOrder',
    String(transactionId),
    parseFloat(value) || 0,          // grand total
    parseFloat((value || 0) - (tax || 0) - (shipping || 0)) || 0, // subtotal
    parseFloat(tax) || 0,
    parseFloat(shipping) || 0,
    0                                // discount (not tracked here)
  );
  debug('purchase', transactionId, value);
};

export const matomoTrackViewItem = (item) => {
  matomoTrackEvent('Ecommerce', 'view_item', item.item_name || item.name, parseFloat(item.price) || 0);
};

export const matomoTrackViewItemList = (items, { listName } = {}) => {
  matomoTrackEvent('Ecommerce', 'view_item_list', listName || 'Product List', items.length);
};

export const matomoTrackSelectItem = (item, { listName } = {}) => {
  matomoTrackEvent('Ecommerce', 'select_item', item.item_name || item.name);
};

// ─────────────────────────────────────────────────────────────────
//  CUSTOM EVENTS — generic Matomo trackEvent(category, action, name, value)
// ─────────────────────────────────────────────────────────────────
export const matomoTrackEvent = (category, action, name, value) => {
  if (!hasPaq()) return;
  push('trackEvent',
    String(category || 'Torch Republic'),
    String(action || 'action'),
    name !== undefined ? String(name) : '',
    value !== undefined ? parseFloat(value) : 0
  );
  debug('event', category, action, name, value);
};

// Standard marketing/conversion events (mirrors GA4 custom events)
export const matomoTrackSignUp = (method = 'email') => matomoTrackEvent('User', 'sign_up', method);
export const matomoTrackLogin = (method = 'email') => matomoTrackEvent('User', 'login', method);
export const matomoTrackGenerateLead = (source = 'newsletter') => matomoTrackEvent('User', 'generate_lead', source);
export const matomoTrackSearch = (searchTerm) => matomoTrackEvent('Search', 'search', searchTerm);
export const matomoTrackViewPromotion = (promotionId, promotionName) => matomoTrackEvent('Promotion', 'view_promotion', promotionName);
export const matomoTrackSelectPromotion = (promotionId, promotionName) => matomoTrackEvent('Promotion', 'select_promotion', promotionName);

// Custom Torch Republic brand events (mirrors lib/analytics.js custom events)
export const matomoTrackHeroCTAClick = (label) => matomoTrackEvent('Home', 'hero_cta_click', label);
export const matomoTrackCollectionCTAClick = (collection) => matomoTrackEvent('Collection', 'collection_cta_click', collection);
export const matomoTrackShopAllClick = (source) => matomoTrackEvent('Shop', 'shop_all_click', source);
export const matomoTrackQuizStart = () => matomoTrackEvent('Quiz', 'quiz_start');
export const matomoTrackQuizComplete = (result) => matomoTrackEvent('Quiz', 'quiz_complete', result);
export const matomoTrackQuizRecommendationClick = (blend) => matomoTrackEvent('Quiz', 'quiz_recommendation_click', blend);
export const matomoTrackBundleBuilderStart = () => matomoTrackEvent('Bundle', 'bundle_builder_start');
export const matomoTrackBundleItemAdded = (itemName) => matomoTrackEvent('Bundle', 'bundle_item_added', itemName);
export const matomoTrackBundleComplete = (itemCount, value) => matomoTrackEvent('Bundle', 'bundle_complete', `${itemCount} items`, parseFloat(value) || 0);
export const matomoTrackSubscribeOptionSelected = () => matomoTrackEvent('Purchase', 'subscribe_option_selected');
export const matomoTrackOneTimePurchaseSelected = () => matomoTrackEvent('Purchase', 'one_time_purchase_selected');
export const matomoTrackReviewsViewed = () => matomoTrackEvent('Content', 'reviews_viewed');
export const matomoTrackIngredientsViewed = () => matomoTrackEvent('Content', 'ingredients_viewed');
export const matomoTrackShippingInformationViewed = () => matomoTrackEvent('Content', 'shipping_information_viewed');
export const matomoTrackFAQOpened = (question) => matomoTrackEvent('Content', 'faq_opened', question);
export const matomoTrackOutboundSocialClick = (platform, url) => matomoTrackEvent('Social', 'outbound_click', platform);
export const matomoTrackCheckoutHandoff = (cartValue, itemCount) => matomoTrackEvent('Checkout', 'checkout_handoff', `${itemCount} items`, parseFloat(cartValue) || 0);

export { MATOMO_URL, MATOMO_SITE_ID };