/**
 * ─────────────────────────────────────────────────────────────────
 *  Torch Republic — Authoritative GA4 Analytics Module
 *  GA4 Measurement ID: G-5QZ4ECWB15 (stored once — here and index.html)
 *
 *  SPA Page-View Method: MANUAL — index.html sets send_page_view: false
 *  for the initial load AFTER this module fires the first page_view.
 *  React Router location changes trigger trackPageView() via useAnalytics().
 *
 *  Rule: exactly ONE page_view per route change, including initial load.
 *  Rule: NO analytics on /admin/*, /command/*, auth, cart, utility pages.
 *  Rule: Admin/owner sessions tagged with traffic_type='internal' for GA4 filter.
 *  Rule: No PII ever sent.
 *  Rule: Debug mode only when window.__TR_ANALYTICS_DEBUG === true.
 * ─────────────────────────────────────────────────────────────────
 */

const GA4_ID = 'G-5QZ4ECWB15';
const BRAND = 'Torch Republic';
const CURRENCY = 'USD';

// ── Debug logger — only active when explicitly enabled ──
const debug = (...args) => {
  if (typeof window !== 'undefined' && window.__TR_ANALYTICS_DEBUG === true) {
    console.log('[TR Analytics]', ...args);
  }
};

// ── Routes that must NEVER be tracked ──
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
  // Preserve UTM params, strip pure tracking params that create duplicate pages
  if (search) {
    const params = new URLSearchParams(search);
    TRACKING_PARAMS.forEach(p => params.delete(p));
    const remaining = params.toString();
    if (remaining) normalized += '?' + remaining;
  }
  return normalized;
};

// ── Check if gtag is available ──
const hasGtag = () => typeof window !== 'undefined' && typeof window.gtag === 'function';

// ── Internal traffic classification ──
// Call this for admin/owner browsing sessions so GA4 can filter them
export const setInternalTraffic = () => {
  if (!hasGtag()) return;
  window.gtag('set', 'user_properties', { traffic_type: 'internal' });
  debug('Internal traffic flag set');
};

// ── Deduplicate purchase events ──
const PURCHASE_DEDUP_KEY = 'tr_tracked_orders';
const hasPurchaseBeenTracked = (transactionId) => {
  if (!transactionId) return false;
  const tracked = JSON.parse(sessionStorage.getItem(PURCHASE_DEDUP_KEY) || '[]');
  return tracked.includes(String(transactionId));
};
const markPurchaseTracked = (transactionId) => {
  if (!transactionId) return;
  const tracked = JSON.parse(sessionStorage.getItem(PURCHASE_DEDUP_KEY) || '[]');
  tracked.push(String(transactionId));
  sessionStorage.setItem(PURCHASE_DEDUP_KEY, JSON.stringify(tracked.slice(-20)));
};

// ── Core event sender ──
const send = (eventName, params = {}) => {
  if (!hasGtag()) return;
  debug(`Event: ${eventName}`, params);
  window.gtag('event', eventName, params);
};

// ─────────────────────────────────────────────────────────────────
//  PAGE VIEW — called once per route change by useAnalytics()
// ─────────────────────────────────────────────────────────────────
export const trackPageView = ({ path, search, title, referrer } = {}) => {
  if (!hasGtag()) return;
  const normalizedPath = normalizePath(path, search);
  if (isNoTrackRoute(normalizedPath)) {
    debug(`Skipped page_view for notrack route: ${normalizedPath}`);
    return;
  }
  const pageLocation = `https://torchrepublic.com${normalizedPath}`;
  window.gtag('event', 'page_view', {
    page_location: pageLocation,
    page_path: normalizedPath,
    page_title: title || document.title,
    page_referrer: referrer || document.referrer || '',
  });
  debug(`page_view: ${normalizedPath}`);
};

// ─────────────────────────────────────────────────────────────────
//  ITEM HELPERS — consistent GA4 ecommerce item shape
// ─────────────────────────────────────────────────────────────────
export const buildItem = ({
  id, name, category, category2, variant, listId, listName, index = 0, price, quantity = 1, discount = 0, coupon,
}) => ({
  item_id: String(id || name || 'unknown'),
  item_name: name || 'Unknown Product',
  item_brand: BRAND,
  item_category: category || 'Coffee',
  ...(category2 ? { item_category2: category2 } : {}),
  ...(variant ? { item_variant: variant } : {}),
  ...(listId ? { item_list_id: listId } : {}),
  ...(listName ? { item_list_name: listName } : {}),
  index,
  price: parseFloat(price) || 0,
  quantity: parseInt(quantity) || 1,
  ...(discount > 0 ? { discount: parseFloat(discount) } : {}),
  ...(coupon ? { coupon } : {}),
});

// ─────────────────────────────────────────────────────────────────
//  STANDARD GA4 ECOMMERCE EVENTS
// ─────────────────────────────────────────────────────────────────
export const trackViewItemList = (items, { listId, listName } = {}) => {
  send('view_item_list', {
    item_list_id: listId || 'general',
    item_list_name: listName || 'Product List',
    items,
  });
};

export const trackSelectItem = (item, { listId, listName } = {}) => {
  send('select_item', {
    item_list_id: listId || 'general',
    item_list_name: listName || 'Product List',
    items: [item],
  });
};

export const trackViewItem = (item) => {
  send('view_item', {
    currency: CURRENCY,
    value: item.price * item.quantity,
    items: [item],
  });
};

export const trackAddToCart = (item, { coupon } = {}) => {
  const itemWithCoupon = coupon ? { ...item, coupon } : item;
  send('add_to_cart', {
    currency: CURRENCY,
    value: item.price * item.quantity,
    items: [itemWithCoupon],
  });
};

export const trackRemoveFromCart = (item) => {
  send('remove_from_cart', {
    currency: CURRENCY,
    value: item.price * item.quantity,
    items: [item],
  });
};

export const trackViewCart = (items, value) => {
  send('view_cart', {
    currency: CURRENCY,
    value: parseFloat(value) || 0,
    items,
  });
};

export const trackBeginCheckout = (items, value, coupon) => {
  send('begin_checkout', {
    currency: CURRENCY,
    value: parseFloat(value) || 0,
    items,
    ...(coupon ? { coupon } : {}),
  });
};

export const trackAddShippingInfo = (items, value, shippingTier) => {
  send('add_shipping_info', {
    currency: CURRENCY,
    value: parseFloat(value) || 0,
    shipping_tier: shippingTier || 'standard',
    items,
  });
};

export const trackAddPaymentInfo = (items, value, paymentType) => {
  send('add_payment_info', {
    currency: CURRENCY,
    value: parseFloat(value) || 0,
    payment_type: paymentType || 'shopify',
    items,
  });
};

// purchase — only call after VERIFIED completion with a unique Shopify order ID
export const trackPurchase = ({ transactionId, value, tax, shipping, coupon, items } = {}) => {
  if (!transactionId) {
    debug('purchase blocked: no transactionId');
    return;
  }
  if (hasPurchaseBeenTracked(transactionId)) {
    debug(`purchase blocked: duplicate transactionId ${transactionId}`);
    return;
  }
  send('purchase', {
    transaction_id: String(transactionId),
    currency: CURRENCY,
    value: parseFloat(value) || 0,
    tax: parseFloat(tax) || 0,
    shipping: parseFloat(shipping) || 0,
    ...(coupon ? { coupon } : {}),
    items: items || [],
  });
  markPurchaseTracked(transactionId);
};

export const trackViewPromotion = (promotionId, promotionName, items = []) => {
  send('view_promotion', { promotion_id: promotionId, promotion_name: promotionName, items });
};

export const trackSelectPromotion = (promotionId, promotionName, items = []) => {
  send('select_promotion', { promotion_id: promotionId, promotion_name: promotionName, items });
};

export const trackSearch = (searchTerm) => {
  send('search', { search_term: searchTerm });
};

export const trackSignUp = (method = 'email') => {
  send('sign_up', { method });
};

export const trackLogin = (method = 'email') => {
  send('login', { method });
};

export const trackGenerateLead = (source = 'newsletter') => {
  send('generate_lead', { source });
};

// ─────────────────────────────────────────────────────────────────
//  CUSTOM TORCH REPUBLIC EVENTS
// ─────────────────────────────────────────────────────────────────
export const trackHeroCTAClick = (label) => send('hero_cta_click', { cta_label: label });
export const trackCollectionCTAClick = (collection) => send('collection_cta_click', { collection_name: collection });
export const trackShopAllClick = (source) => send('shop_all_click', { source });
export const trackQuizStart = () => send('quiz_start');
export const trackQuizComplete = (result) => send('quiz_complete', { recommended_blend: result });
export const trackQuizRecommendationClick = (blend) => send('quiz_recommendation_click', { blend_name: blend });
export const trackBundleBuilderStart = () => send('bundle_builder_start');
export const trackBundleItemAdded = (itemName) => send('bundle_item_added', { item_name: itemName });
export const trackBundleComplete = (itemCount, value) => send('bundle_complete', { item_count: itemCount, value });
export const trackSubscribeOptionSelected = () => send('subscribe_option_selected');
export const trackOneTimePurchaseSelected = () => send('one_time_purchase_selected');
export const trackReviewsViewed = () => send('reviews_viewed');
export const trackIngredientsViewed = () => send('ingredients_viewed');
export const trackShippingInformationViewed = () => send('shipping_information_viewed');
export const trackFAQOpened = (question) => send('faq_opened', { question });
export const trackOutboundSocialClick = (platform, url) => send('outbound_social_click', { platform, url });
export const trackCheckoutHandoff = (cartValue, itemCount) => send('checkout_handoff', { cart_value: cartValue, item_count: itemCount });