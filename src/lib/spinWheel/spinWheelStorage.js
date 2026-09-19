/**
 * spinWheelStorage.js — Versioned localStorage with expiration timestamps.
 *
 * Suppression windows:
 *   Dismissed without completing: 14 days
 *   Completed spin:               30 days
 *
 * Session-level: once dismissed in this tab session, never re-show
 * (prevents the popup re-appearing on SPA navigation within the same session).
 *
 * Versioned: if the schema changes, the version key bumps and old records
 * are treated as expired.
 */

const STORAGE_KEY = 'tr_spin_wheel_v2';
const SESSION_KEY = 'tr_spin_wheel_session_dismissed';
const SCHEMA_VERSION = 2;

const DISMISS_SUPPRESSION_MS = 14 * 24 * 60 * 60 * 1000;
const COMPLETED_SUPPRESSION_MS = 30 * 24 * 60 * 60 * 1000;

const isBrowser = () => typeof window !== 'undefined';

const read = () => {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data.version !== SCHEMA_VERSION) return null;
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
      JSON.stringify({ ...data, version: SCHEMA_VERSION })
    );
  } catch (_) { /* quota / privacy mode */ }
};

const now = () => Date.now();

export const isSuppressed = () => {
  const s = read();
  if (!s) return false;
  const t = now();
  if (s.completedAt && t - s.completedAt < COMPLETED_SUPPRESSION_MS) return true;
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
  write({ ...s, dismissedAt: now() });
  markSessionDismissed();
};

export const markCompleted = () => {
  const s = read() || {};
  write({ ...s, completedAt: now() });
};

export const reset = () => {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(SESSION_KEY);
  } catch (_) { /* noop */ }
};