import { base44 } from '@/api/base44Client';

// One-time points awarded when a member first opens their rewards.
export const WELCOME_BONUS_POINTS = 50;
export const WELCOME_BONUS_LABEL = 'Welcome bonus';
export const ACTIVITY_LIMIT = 10;

// Read the current user's loyalty record (or null).
export async function fetchLoyaltyRecord(user) {
  if (!user?.id) return null;
  const records = await base44.entities.LoyaltyPoints.filter({ user_id: user.id });
  return records[0] || null;
}

// Read the current user's recent points activity.
export async function fetchPointsActivity(user, limit = ACTIVITY_LIMIT) {
  if (!user?.id) return [];
  return base44.entities.PointsActivity.filter({ user_id: user.id }, '-created_date', limit);
}

// Ensure a loyalty record exists for the user. On first visit this bootstraps
// the record and logs a one-time welcome-bonus earn entry — client-side, so
// rewards work without a backend function.
export async function ensureLoyaltyRecord(user) {
  if (!user?.id) return { record: null, activity: [] };

  const [existing, activity] = await Promise.all([
    base44.entities.LoyaltyPoints.filter({ user_id: user.id }),
    base44.entities.PointsActivity.filter({ user_id: user.id }, '-created_date', ACTIVITY_LIMIT),
  ]);

  if (existing[0]) {
    return { record: existing[0], activity };
  }

  // First time: create the record + welcome-bonus activity.
  const record = await base44.entities.LoyaltyPoints.create({
    user_id: user.id,
    points: WELCOME_BONUS_POINTS,
    lifetime_points: WELCOME_BONUS_POINTS,
    redeemed_codes: [],
  });
  const welcomeActivity = await base44.entities.PointsActivity.create({
    user_id: user.id,
    type: 'earn',
    points: WELCOME_BONUS_POINTS,
    label: WELCOME_BONUS_LABEL,
  });

  return { record, activity: [welcomeActivity, ...activity].slice(0, ACTIVITY_LIMIT) };
}

// Redeem a reward: deduct points, mark the code redeemed, and log a redeem
// activity entry. Returns the updated record and the new activity entry.
export async function redeemReward(user, record, reward) {
  if (!user?.id || !record?.id) throw new Error('No loyalty record to redeem against');
  if (record.points < reward.points) throw new Error('Not enough points');
  if (record.redeemed_codes?.includes(reward.code)) throw new Error('Reward already redeemed');

  const updated = await base44.entities.LoyaltyPoints.update(record.id, {
    points: record.points - reward.points,
    redeemed_codes: [...(record.redeemed_codes || []), reward.code],
  });
  const activity = await base44.entities.PointsActivity.create({
    user_id: user.id,
    type: 'redeem',
    points: reward.points,
    label: `Redeemed ${reward.label}`,
  });

  return { record: updated, activity };
}