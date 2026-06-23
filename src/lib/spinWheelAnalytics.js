/**
 * spinWheelAnalytics.js — Funnel analytics for the spin-wheel feature.
 *
 * Uses the existing dedup-safe trackEvent from analyticsEvents so each event
 * fires at most once per (eventName + dedupKey) per page session, mirroring the
 * site-wide GA4/Matomo pattern. No PII (no email, name, IP, customer IDs) is sent
 * in event parameters or URLs.
 *
 * Events (fired once each):
 *   spin_wheel_eligible        — visitor became eligible (timer/scroll/exit)
 *   spin_wheel_view            — modal rendered to the visitor
 *   spin_wheel_close           — visitor closed the modal
 *   spin_wheel_email_submit    — valid email submitted
 *   spin_wheel_email_error     — invalid/duplicate email attempt
 *   spin_wheel_first_spin      — first spin started
 *   spin_wheel_spin_again      — second spin started
 *   spin_wheel_discount_unlock — visitor unlocked 15%
 *   spin_wheel_code_copy       — visitor copied the code
 *   spin_wheel_shop_click      — visitor clicked Shop Bestsellers / Apply
 *   spin_wheel_email_sent      — backend confirmed email delivery
 *   spin_wheel_reopen          — modal reopened via the discreet tab
 */
import { trackEvent, getStoredUTM, detectSessionQuality } from '@/lib/analyticsEvents';

const baseProps = () => {
  const utm = getStoredUTM() || {};
  const traffic_source = utm.utm_source || 'direct';
  const device_type = /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
  const new_or_returning_visitor =
    !sessionStorage.getItem('tr_spin_seen_before') ? 'new' : 'returning';
  // Mark as seen once we've computed it, so subsequent fires are 'returning'.
  try { sessionStorage.setItem('tr_spin_seen_before', '1'); } catch (_) {}
  return {
    page_path: window.location.pathname,
    device_type,
    traffic_source,
    new_or_returning_visitor,
    session_quality: detectSessionQuality(),
  };
};

const fire = (eventName, extra = {}, dedupKey = '') => {
  try {
    trackEvent(eventName, { ...baseProps(), ...extra }, dedupKey || eventName);
  } catch (_) { /* analytics must never break the UX */ }
};

export const trackEligible = () => fire('spin_wheel_eligible');
export const trackView = (modalLocation = 'auto') =>
  fire('spin_wheel_view', { modal_location: modalLocation }, 'spin_wheel_view');
export const trackClose = (stage = 'unknown') =>
  fire('spin_wheel_close', { stage }, 'spin_wheel_close');
export const trackEmailSubmit = () => fire('spin_wheel_email_submit');
export const trackEmailError = (reason = 'invalid') =>
  fire('spin_wheel_email_error', { reason }, 'spin_wheel_email_error');
export const trackFirstSpin = (outcome) =>
  fire('spin_wheel_first_spin', { spin_number: 1, outcome }, 'spin_wheel_first_spin');
export const trackSpinAgain = (outcome) =>
  fire('spin_wheel_spin_again', { spin_number: 2, outcome }, 'spin_wheel_spin_again');
export const trackDiscountUnlock = () => fire('spin_wheel_discount_unlock');
export const trackCodeCopy = () => fire('spin_wheel_code_copy');
export const trackShopClick = (destination = 'bestsellers') =>
  fire('spin_wheel_shop_click', { destination }, 'spin_wheel_shop_click');
export const trackEmailSent = () => fire('spin_wheel_email_sent');
export const trackReopen = () => fire('spin_wheel_reopen');