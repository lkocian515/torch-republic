/**
 * spinWheelStorage.js — Versioned localStorage with expiration timestamps.
 *
 * Storage key: torchRepublic.spinWheel.v1
 *
 * Stored record:
 *   status           — 'dismissed' | 'completed'
 *   dismissedAt      — timestamp of dismissal
 *   completedAt      — timestamp of spin completion
 *   expiresAt        — timestamp when suppression expires
 *   componentVersion — schema version (mismatches invalidate the record)
 *
 * Suppression windows:
 *   Dismissed without completing: 14 days
 *   Completed spin:               30 days
 *
 * Session-level: once dismissed in this tab session, never re-show
 * (prevents the popup re-appearing on SPA navigation within the same session).
 *
 * Fail-safe: if localStorage/sessionStorage is inaccessible (privacy mode,
 * quota exceeded, malformed data), the module never throws and never
 * permanently blocks the wheel — it returns false (not suppressed).
 */

const STORAGE_KEY = 'torchRepublic.spinWheel.v1';
const SESSION_KEY = 'torchRepublic.spinWheel.sessionDismissed';
const COMPONENT_VERSION = 1;

const DISMISS_SUPPRESSION_MS = 14 * 24 * 60 * 60 * 1000;
const COMPLETED_SUPPRESSION_MS = 30 * 24 * 60 * 60 * 1000;

const isBrowser = () => typeof window !== 'undefined';

const read = () => {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    // Malformed record — don't block
    if (typeof data !== 'object' || data === null) return null;
    // Wrong schema version — invalidate silently
    if (data.componentVersion !== COMPONENT_VERSION) return null;
    return data;
  } catch (_) {
    return null;
  }
};

const write = (data) => {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...data, componentVersion: COMPONENT_VERSION })
    );
  } catch (_) { /* quota / privacy mode — fail silently */ }
};

const now = () => Date.now();

export const isSuppressed = () => {
  const s = read();
  if (!s) return false;
  const t = now();

  // Explicit expiration — expired records never block
  if (s.expiresAt && t > s.expiresAt) return false;

  // Completed suppression window
  if (s.completedAt && t - s.completedAt < COMPLETED_SUPPRESSION_MS) return true;

  // Dismissed suppression window
  if (s.dismissedAt && t - s.dismissedAt < DISMISS_SUPPRESSION_MS) return true;

  return false;
};

export const isSessionDismissed = () => {
  if (!isBrowser()) return false;
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  } catch (_) {
    return false;
  }
};

export const markSessionDismissed = () => {
  if (!isBrowser()) return;
  try {
    sessionStorage.setItem(SESSION_KEY, '1');
  } catch (_) { /* noop */ }
};

export const markDismissed = () => {
  const s = read() || {};
  const t = now();
  write({ ...s, status: 'dismissed', dismissedAt: t, expiresAt: t + DISMISS_SUPPRESSION_MS });
  markSessionDismissed();
};

export const markCompleted = () => {
  const s = read() || {};
  const t = now();
  write({ ...s, status: 'completed', completedAt: t, expiresAt: t + COMPLETED_SUPPRESSION_MS });
};

/**
 * Clears ONLY the spin wheel's own versioned storage keys.
 * Does NOT touch cart, auth, preferences, or any other site storage.
 */
export const reset = () => {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(SESSION_KEY);
  } catch (_) { /* noop */ }
};

// ── Development-only reset control ──────────────────────────────────────────
// Exposed on window for testing. Call window.__torchRepublicResetSpinWheel()
// in the browser console to clear the wheel's suppression state, then reload.
// This does NOT clear cart, auth, or any other storage.
if (isBrowser() && !window.__torchRepublicResetSpinWheel) {
  window.__torchRepublicResetSpinWheel = () => {
    reset();
    return 'Spin wheel storage cleared. Reload the page to see the wheel again.';
  };
}