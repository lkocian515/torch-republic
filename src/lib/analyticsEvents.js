/**
 * analyticsEvents.js — Centralised, deduplication-safe analytics helpers.
 * 
 * Prevents duplicate events from:
 * - Component re-renders (event registry keyed by eventName+dedupKey)
 * - Route changes (registry cleared on navigation)
 * - Button taps firing both click and submit handlers (debounce per key)
 *
 * Usage:
 *   import { trackEvent, trackAddToCart, trackPageView } from '@/lib/analyticsEvents';
 */

// ── Registry: set of "eventName::dedupKey" strings fired this page session ──
const firedRegistry = new Set();
// Debounce timers per key
const debounceTimers = {};
const DEBOUNCE_MS = 500;

/**
 * Core tracked event. Fires only once per (eventName + dedupKey) per page load.
 * @param {string} eventName
 * @param {object} properties
 * @param {string} [dedupKey]  – unique key to prevent duplicates (defaults to eventName)
 */
export function trackEvent(eventName, properties = {}, dedupKey = '') {
  const key = `${eventName}::${dedupKey || eventName}`;
  if (firedRegistry.has(key)) return;

  // Debounce rapid-fire calls (e.g. double tap / click + submit)
  if (debounceTimers[key]) return;
  debounceTimers[key] = setTimeout(() => { delete debounceTimers[key]; }, DEBOUNCE_MS);

  firedRegistry.add(key);

  const enriched = {
    ...properties,
    page_url: window.location.pathname,
    device_type: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
  };

  // base44 client is only available at runtime via the module — skip server-side tracking
  // GA4 handles the primary event below; base44 analytics tracked via gtag

  try {
    if (window.gtag) {
      window.gtag('event', eventName, enriched);
    }
  } catch (_) {}
}

/**
 * Clear registry on route change — called by useAnalytics hook.
 * Allows the same event to re-fire on a new page.
 */
export function clearEventRegistry() {
  firedRegistry.clear();
}

// ── Typed helpers ──

export function trackViewItem({ productId, productName, category, price }) {
  trackEvent('view_item', {
    product_id: productId,
    product_name: productName,
    category,
    price,
    currency: 'USD',
  }, `view_item::${productId}`);
}

export function trackAddToCart({ productId, productName, category, price, quantity, isSubscription, ctaLocation }) {
  trackEvent('add_to_cart', {
    product_id: productId,
    product_name: productName,
    category,
    price,
    quantity,
    is_subscription: !!isSubscription,
    currency: 'USD',
    cta_location: ctaLocation || 'product_primary_add_to_cart',
  }, `add_to_cart::${productId}::${Date.now()}`);
  // add_to_cart must allow multiple fires (user can add multiple times) — remove from registry after fire
  setTimeout(() => firedRegistry.delete(`add_to_cart::${productId}::${Date.now()}`), 100);
}

export function trackJournalCTA({ ctaLocation, destination }) {
  trackEvent('journal_cta_click', { cta_location: ctaLocation, destination }, `journal_cta_click::${ctaLocation}`);
}

export function trackCompareCTA({ ctaLocation, destination }) {
  trackEvent('compare_cta_click', { cta_location: ctaLocation, destination }, `compare_cta_click::${ctaLocation}`);
}

export function trackCollectionCTA({ ctaLocation, destination }) {
  trackEvent('collection_cta_click', { cta_location: ctaLocation, destination }, `collection_cta_click::${ctaLocation}`);
}

export function trackBeginCheckout({ items, value }) {
  trackEvent('begin_checkout', { items, value, currency: 'USD' }, 'begin_checkout');
}

export function trackBuildYourRitualClick(ctaLocation) {
  trackEvent('build_your_ritual_click', { cta_location: ctaLocation }, `build_your_ritual_click::${ctaLocation}`);
}

export function trackSubscriptionSelected({ productId, productName, price }) {
  trackEvent('subscription_selected', { product_id: productId, product_name: productName, price }, `subscription_selected::${productId}`);
}

/**
 * Session-level UTM preservation.
 * Call once on app init to capture UTM params and store in sessionStorage.
 * On subsequent page views, UTM values are NOT overwritten with "direct".
 */
export function preserveUTM() {
  const params = new URLSearchParams(window.location.search);
  const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  const hasUTM = UTM_KEYS.some(k => params.get(k));
  if (hasUTM) {
    const utm = {};
    UTM_KEYS.forEach(k => { if (params.get(k)) utm[k] = params.get(k); });
    sessionStorage.setItem('tr_utm', JSON.stringify(utm));
  }
}

export function getStoredUTM() {
  try {
    return JSON.parse(sessionStorage.getItem('tr_utm') || '{}');
  } catch (_) { return {}; }
}

/**
 * Lightweight bot/automated session detection.
 * Returns a confidence label — does NOT block any visitor.
 * Only signals "possible automated" when multiple strong indicators exist.
 */
export function detectSessionQuality() {
  const ua = navigator.userAgent || '';
  const botPatterns = [
    /bot|crawler|spider|scraper|headless|phantom|puppeteer|selenium|webdriver|lighthouse|pagespeed|gtmetrix|pingdom|uptime|monitor|checker|preview|prerender/i,
  ];
  const isBotUA = botPatterns.some(p => p.test(ua));
  const isHeadless = /HeadlessChrome|PhantomJS/.test(ua);
  const noTouchAndNoPointer = !('ontouchstart' in window) && !window.matchMedia('(pointer: coarse)').matches && navigator.maxTouchPoints === 0;

  // Only label as "possible automated" when multiple signals fire
  const signals = [isBotUA, isHeadless].filter(Boolean).length;
  if (signals >= 1) return 'possible_automated';
  return 'human';
}