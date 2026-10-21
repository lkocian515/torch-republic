import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const WELCOME_BONUS_POINTS = 50;

// Awards the one-time welcome bonus to the signed-in member the first time
// they open their loyalty section. Idempotent — if a LoyaltyPoints record
// already exists for the user, it returns it without creating a new bonus.
// Used so every new member starts with points and has a real earn entry in
// Recent Activity.
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const existing = await base44.asServiceRole.entities.LoyaltyPoints.filter(
      { user_id: user.id }
    );

    if (existing.length > 0) {
      return Response.json({ record: existing[0], awarded: false });
    }

    // Service role bypasses the admin-only create rule on LoyaltyPoints.
    const newRecord = await base44.asServiceRole.entities.LoyaltyPoints.create({
      user_id: user.id,
      points: WELCOME_BONUS_POINTS,
      lifetime_points: WELCOME_BONUS_POINTS,
      redeemed_codes: [],
    });

    // PointsActivity writes are restricted to trusted server-side code.
    // Keep the earn event linked to the same authenticated user.
    let earnEntry = null;
    try {
      earnEntry = await base44.asServiceRole.entities.PointsActivity.create({
        user_id: user.id,
        type: 'earn',
        points: WELCOME_BONUS_POINTS,
        label: 'Welcome bonus',
      });
    } catch (e) {
      // Points record was created; activity is best-effort.
    }

    return Response.json({ record: newRecord, activity: earnEntry, awarded: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});