// ──────────────────────────────────────────────────────────────────────────
// DEPRECATED — September 2026
//
// This module has been superseded by base44/shared/subscriptionEmailTemplates.ts
// which contains the current three-email first-subscription sequence using
// the active Torch Republic brand system (Instant Classic Coffee and
// Instant Mushroom Coffee only).
//
// All automations that referenced these templates have been archived.
// This stub is kept solely to prevent import errors in legacy function files.
// Do NOT re-enable any automation that calls these templates.
// ──────────────────────────────────────────────────────────────────────────

export const EMAIL_TEMPLATES = {
  relaunch: {
    subject: '[DEPRECATED] Do not use',
    previewText: 'This template has been retired.',
    html: () => '<p>This template has been retired.</p>',
  },
  bestSellers: {
    subject: '[DEPRECATED] Do not use',
    previewText: 'This template has been retired.',
    html: () => '<p>This template has been retired.</p>',
  },
  lastChance: {
    subject: '[DEPRECATED] Do not use',
    previewText: 'This template has been retired.',
    html: () => '<p>This template has been retired.</p>',
  },
};

export const MOBILE_TEMPLATES = {
  relaunch: () => '<p>This template has been retired.</p>',
};