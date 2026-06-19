/**
 * Matomo configuration for Torch Republic.
 *
 * Mirrors the GA4 pattern: the tracker URL + site ID are public (like a GA4
 * measurement ID) — they only identify WHERE to send hits, not any private
 * credential. Set them here once and they're used by lib/matomo.js + index.html.
 *
 * Update MATOMO_URL and MATOMO_SITE_ID to match your self-hosted Matomo instance.
 */
export const MATOMO_URL = 'https://analytics.torchrepublic.com'; // no trailing slash
export const MATOMO_SITE_ID = '1';