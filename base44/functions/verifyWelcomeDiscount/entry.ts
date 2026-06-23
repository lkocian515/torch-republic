/**
 * verifyWelcomeDiscount — Checks whether the Shopify discount code WELCOME15 is
 * active and correctly configured before the spin wheel is allowed to display.
 *
 * Uses the Shopify Admin API (SHOPIFY_ADMIN_TOKEN) to fetch the discount code.
 * Returns a structured verdict so the frontend can decide whether to show the
 * wheel publicly. The frontend MUST treat a non-verified result as "do not show".
 *
 * Security: service-role (no user auth) — this is a public config check, but the
 * response never reveals the admin token or unrelated discount data.
 */
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const SHOPIFY_SHOP = 'libertees-for-all';
const ADMIN_TOKEN = Deno.env.get('SHOPIFY_ADMIN_TOKEN');
const API_VERSION = '2024-10';

const EXPECTED_CODE = 'WELCOME15';
const EXPECTED_PERCENT = 15;

Deno.serve(async (req) => {
  try {
    const _base44 = createClientFromRequest(req);

    if (!ADMIN_TOKEN) {
      return Response.json({
        verified: false,
        reason: 'SHOPIFY_ADMIN_TOKEN not configured',
        code: EXPECTED_CODE,
      }, { status: 200 });
    }

    // 1) Lookup discount code by code value
    const codeUrl = `https://${SHOPIFY_SHOP}.myshopify.com/admin/api/${API_VERSION}/discount_codes/lookup.json?code=${encodeURIComponent(EXPECTED_CODE)}`;
    const codeRes = await fetch(codeUrl, {
      headers: {
        'X-Shopify-Access-Token': ADMIN_TOKEN,
        'Content-Type': 'application/json',
      },
    });

    if (!codeRes.ok) {
      const body = await codeRes.text();
      return Response.json({
        verified: false,
        reason: 'Discount code lookup failed (' + codeRes.status + ')',
        detail: body.slice(0, 200),
        code: EXPECTED_CODE,
      }, { status: 200 });
    }

    const codeData = await codeRes.json();
    const dc = codeData && codeData.discount_code;
    if (!dc) {
      return Response.json({
        verified: false,
        reason: 'Discount code ' + EXPECTED_CODE + ' not found',
        code: EXPECTED_CODE,
      }, { status: 200 });
    }

    // 2) Fetch linked price rule for terms
    const ruleId = dc.price_rule_id;
    let rule = null;
    if (ruleId) {
      const ruleUrl = `https://${SHOPIFY_SHOP}.myshopify.com/admin/api/${API_VERSION}/price_rules/${ruleId}.json`;
      const ruleRes = await fetch(ruleUrl, {
        headers: {
          'X-Shopify-Access-Token': ADMIN_TOKEN,
          'Content-Type': 'application/json',
        },
      });
      if (ruleRes.ok) {
        const ruleData = await ruleRes.json();
        rule = ruleData && ruleData.price_rule;
      }
    }

    if (!rule) {
      return Response.json({
        verified: false,
        reason: 'Linked price rule not found',
        code: EXPECTED_CODE,
      }, { status: 200 });
    }

    // 3) Evaluate terms
    // Shopify stores percentage discount values as NEGATIVE decimals (e.g. -15.0
    // means 15% off). Use abs() so the magnitude matches EXPECTED_PERCENT.
    const value = Math.abs(parseFloat(rule.value));
    const isPercentage = rule.value_type === 'percentage';
    const correctValue = isPercentage ? Math.round(value) === EXPECTED_PERCENT : false;
    // A price rule is active if status is "active" OR if it has no end date (ends_at
    // is null/empty) and started in the past. Some rules report status differently.
    const startsInFuture = rule.starts_at && new Date(rule.starts_at).getTime() > Date.now();
    const endedInPast = rule.ends_at && new Date(rule.ends_at).getTime() < Date.now();
    const isActive = !startsInFuture && !endedInPast && (!rule.status || String(rule.status).toLowerCase() === 'active');

    const issues = [];
    if (!isActive) issues.push('price rule is not active (starts_in_future=' + !!startsInFuture + ', ended=' + !!endedInPast + ', status=' + rule.status + ')');
    if (!isPercentage) issues.push('value_type is "' + rule.value_type + '", expected "percentage"');
    if (!correctValue) issues.push('discount value is ' + rule.value + ', expected ' + EXPECTED_PERCENT);

    const verified = isActive && isPercentage && correctValue;

    return Response.json({
      verified: verified,
      code: EXPECTED_CODE,
      percent: isPercentage ? Math.round(value) : null,
      value_type: rule.value_type,
      status: rule.status,
      once_per_customer: !!rule.once_per_customer,
      usage_limit_per_user: rule.usage_limit_per_user || null,
      total_usage_limit: rule.usage_limit_count ? rule.usage_limit_count : null,
      min_requirement: rule.prerequisite_subtotal_range || rule.prerequisite_quantity_range || null,
      starts_at: rule.starts_at || null,
      ends_at: rule.ends_at || null,
      eligible_variant_ids: rule.prerequisite_variant_ids || null,
      entitled_variant_ids: rule.entitled_variant_ids || null,
      misconfigurations: issues.length ? issues : null,
      reason: verified ? null : 'Discount does not match the expected 15% first-order offer',
    }, { status: 200 });
  } catch (error) {
    return Response.json({
      verified: false,
      reason: error.message || 'Unknown error verifying discount',
      code: EXPECTED_CODE,
    }, { status: 200 });
  }
});