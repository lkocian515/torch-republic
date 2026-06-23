/**
 * spinWheelState.js — Timestamp-based state machine for the spin-wheel feature.
 *
 * Storage: localStorage (first-party, timestamped — never a permanent boolean).
 * One JSON object under STORAGE_KEY holds the entire funnel state. The frontend
 * reads/writes through these helpers so the React layer never touches storage
 * keys directly (useful for the dev reset tool + report).
 *
 * State machine:
 *   not_shown → shown → dismissed | email_submitted → first_spin → spin_again | unlocked
 *
 * Suppression windows (timestamp compared to Date.now()):
 *   dismissed_without_email   : 7 days
 *   email_submitted_no_spin   : 7 days
 *   spin_again_closed         : 7 days (second spin preserved)
 *   unlocked                  : 30 days (code access preserved separately)
 *
 * DEV RESET: window.__resetSpinWheel() clears all keys and reloads.
 */

const STORAGE_KEY = 'tr_spin_wheel_v1';
const TAB_CLOSED_KEY = 'tr_spin_wheel_tab_closed';

export const SUPPRESSION_MS = {
  dismissed_no_email: 7 * 24 * 60 * 60 * 1000,
  email_no_spin: 7 * 24 * 60 * 60 * 1000,
  spin_again_closed: 7 * 24 * 60 * 60 * 1000,
  unlocked: 30 * 24 * 60 * 60 * 1000,
};

// Funnel states — stored on the `state` field of the persisted object.
export const STATES = {
  NOT_SHOWN: 'not_shown',
  SHOWN: 'shown',
  DISMISSED: 'dismissed',
  EMAIL_SUBMITTED: 'email_submitted',
  FIRST_SPIN: 'first_spin',
  WAITING_SPIN_AGAIN: 'waiting_spin_again',
  UNLOCKED: 'unlocked',
};

export const STORAGE_KEYS_REPORT = {
  state: STORAGE_KEY,
  tabClosed: TAB_CLOSED_KEY,
};

const isBrowser = () => typeof window !== 'undefined';

const read = () => {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
};

const write = (obj) => {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
  } catch (_) { /* quota / privacy mode — silent */ }
};

const now = () => Date.now();

/**
 * Build a fresh state object.
 */
const fresh = () => ({
  state: STATES.NOT_SHOWN,
  email: null,            // kept only to dedupe; never sent to analytics
  sessionId: null,        // used for email idempotency
  firstOutcome: null,    // '15pct' | 'spin_again' | null
  unlockTimestamp: null, // ms when discount was unlocked
  dismissTimestamp: null, // ms when last dismissed (before unlock)
  emailSent: false,       // whether welcome email fired
  codeCopied: false,
  version: 1,
});

export const getSpinWheelState = () => {
  const s = read();
  return s || fresh();
};

const setField = (patch) => {
  const cur = read() || fresh();
  const next = { ...cur, ...patch };
  write(next);
  return next;
};

// ── Eligibility / suppression logic ───────────────────────────────────────────

/**
 * Is the modal eligible to be shown right now given the persisted state?
 * Returns { eligible: boolean, reason?: string }.
 */
export const isEligibleToShow = () => {
  if (!isBrowser()) return { eligible: false, reason: 'no_window' };
  const s = read() || fresh();
  const t = now();

  switch (s.state) {
    case STATES.NOT_SHOWN:
      return { eligible: true };

    case STATES.DISMISSED: {
      // dismissed before entering an email → 7 days
      if (t - (s.dismissTimestamp || 0) < SUPPRESSION_MS.dismissed_no_email) {
        return { eligible: false, reason: 'suppressed_dismissed' };
      }
      return { eligible: true };
    }

    case STATES.EMAIL_SUBMITTED: {
      // submitted email but never spun → 7 days
      if (t - (s.dismissTimestamp || 0) < SUPPRESSION_MS.email_no_spin) {
        return { eligible: false, reason: 'suppressed_email_no_spin' };
      }
      return { eligible: true };
    }

    case STATES.WAITING_SPIN_AGAIN: {
      // closed during the "spin again" wait — preserve progress, 7 days
      if (t - (s.dismissTimestamp || 0) < SUPPRESSION_MS.spin_again_closed) {
        return { eligible: false, reason: 'suppressed_spin_again' };
      }
      return { eligible: true };
    }

    case STATES.UNLOCKED: {
      if (t - (s.unlockTimestamp || 0) < SUPPRESSION_MS.unlocked) {
        return { eligible: false, reason: 'suppressed_unlocked' };
      }
      return { eligible: true };
    }

    default:
      return { eligible: true };
  }
};

// ── State transitions ─────────────────────────────────────────────────────────

export const markShown = () => setField({ state: STATES.SHOWN });

export const markDismissed = () =>
  setField({ state: STATES.DISMISSED, dismissTimestamp: now() });

export const markEmailSubmitted = (email, sessionId) =>
  setField({
    state: STATES.EMAIL_SUBMITTED,
    email: (email || '').toLowerCase(),
    sessionId: sessionId || null,
  });

export const markFirstSpin = (outcome) =>
  setField({ state: STATES.FIRST_SPIN, firstOutcome: outcome });

export const markWaitingSpinAgain = () =>
  setField({ state: STATES.WAITING_SPIN_AGAIN, dismissTimestamp: null });

export const markUnlocked = (sessionId) =>
  setField({
    state: STATES.UNLOCKED,
    unlockTimestamp: now(),
    sessionId: sessionId || null,
  });

export const markEmailSent = () => setField({ emailSent: true });

export const markCodeCopied = () => setField({ codeCopied: true });

// Convenience: is the visitor already past the email step? Used to restore the
// winning state if they reopen the modal in the same session.
export const isAlreadyUnlocked = () => {
  const s = read() || fresh();
  return s.state === STATES.UNLOCKED;
};

export const hasEmailInState = () => {
  const s = read() || fresh();
  return !!(s.email && s.sessionId);
};

// ── Reopen tab suppression (separate, lighter storage) ───────────────────────

export const isTabClosedSuppressed = () => {
  if (!isBrowser()) return false;
  try {
    const ts = parseInt(localStorage.getItem(TAB_CLOSED_KEY) || '0', 10);
    if (!ts) return false;
    return now() - ts < SUPPRESSION_MS.dismissed_no_email;
  } catch (_) { return false; }
};

export const markTabClosed = () => {
  if (!isBrowser()) return;
  try { localStorage.setItem(TAB_CLOSED_KEY, String(now())); } catch (_) {}
};

// ── Dev reset tool ─────────────────────────────────────────────────────────────

export const resetSpinWheel = () => {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(TAB_CLOSED_KEY);
  } catch (_) { /* noop */ }
};

if (isBrowser()) {
  // Expose a dev-only reset. Not visible to customers; intentionally plain.
  window.__resetSpinWheel = () => {
    resetSpinWheel();
    // Hard reload so all in-memory timers/listeners are cleared.
    window.location.reload();
  };
}