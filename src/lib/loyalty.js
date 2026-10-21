import { base44 } from '@/api/base44Client';

// Rewards are read-only from the browser. All balance writes are server-side.
// A welcome bonus can be claimed once by an authenticated user.
export const WELCOME_BONUS_POINTS = 50;
export const ACTIVITY_LIMIT = 10;

export async function fetchLoyaltyRecord(user) {
  if (!user?.id) return null;
  const records = await base44.entities.LoyaltyPoints.filter({ user_id: user.id });
  return records[0] || null;
}

export async function fetchPointsActivity(user, limit = ACTIVITY_LIMIT) {
  if (!user?.id) return [];
  return base44.entities.PointsActivity.filter({ user_id: user.id }, '-created_date', limit);
}

export async function ensureLoyaltyRecord(user) {
  if (!user?.id) return { record: null, activity: [] };
  // Claiming is server-authenticated and checks for an existing record.
  const response = await base44.functions.invoke('claimWelcomeBonus', {});
  if (response?.data?.error) throw new Error('Unable to load rewards');
  const record = response?.data?.record ?? await fetchLoyaltyRecord(user);
  const activity = await fetchPointsActivity(user);
  return { record, activity };
}

// Not available until a unique Shopify discount can be issued atomically by
// a trusted backend and successful issuance verified before points are deducted.
export async function redeemReward() {
  throw new Error('Rewards redemption is not yet available. Your points are safe.');
}
