import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

// ═══════════════════════════════════════════════════════════════════════════
// PRIZE CONFIGURATION (SERVER-SIDE ONLY)
// ═══════════════════════════════════════════════════════════════════════════
// These discount codes are NEVER shipped to the browser bundle. The frontend
// receives only display metadata (id, label, weight, minPurchase, expiresText)
// via the 'status' action.
//
// SETUP REQUIRED — Create the following discount codes in your Shopify admin
// (Discounts > Create discount > Code). Each must be active and recognized at
// Shopify checkout.
//
//   Prize            Code to create     Type                  Min subtotal
//   ───────────────  ─────────────────  ────────────────────  ───────────
//   10% off          WELCOME10          10% percentage        —
//   15% off          TORCH15            15% percentage        —
//   $5 off $40+      TORCH5OFF          $5 fixed amount       $40
//   20% off          TORCH20            20% percentage        —
//
// WELCOME10 is the only enabled prize. The wheel remains available with a
// configured reward, and selectPrize() ignores disabled or code-less entries.
// ═══════════════════════════════════════════════════════════════════════════

const PRIZE_CONFIG = [
  {
    id: 'ten_percent',
    label: '10% OFF',
    sublabel: 'Your next coffee order',
    weight: 60,
    code: 'WELCOME10',
    minPurchase: null,
    expiresText: 'Valid for 30 days from today',
    enabled: true,
  },
  {
    id: 'fifteen_percent',
    label: '15% OFF',
    sublabel: 'Your next coffee order',
    weight: 25,
    code: '', // TODO: Create TORCH15 in Shopify, then set enabled: true
    minPurchase: null,
    expiresText: 'Valid for 30 days from today',
    enabled: false,
  },
  {
    id: 'five_off_40',
    label: '$5 OFF',
    sublabel: 'Orders $40+',
    weight: 10,
    code: '', // TODO: Create TORCH5OFF in Shopify (min subtotal $40), then set enabled: true
    minPurchase: 40,
    expiresText: 'Valid for 30 days from today',
    enabled: false,
  },
  {
    id: 'twenty_percent',
    label: '20% OFF',
    sublabel: 'Your next coffee order',
    weight: 5,
    code: '', // TODO: Create TORCH20 in Shopify, then set enabled: true
    minPurchase: null,
    expiresText: 'Valid for 30 days from today',
    enabled: false,
  },
];

const STORE_URL = 'https://torchrepublic.base44.app';

// ── Helpers ──────────────────────────────────────────────────────────────────

// The wheel appears when at least one prize is fully configured (code + enabled).
// selectPrize() only picks from enabled prizes; disabled rewards never appear
// as possible outcomes in the customer-facing wheel.
function hasEnabledPrizes() {
  return PRIZE_CONFIG.some(function (p) {
    return p.enabled && p.code;
  });
}

function publicPrizes() {
  return PRIZE_CONFIG.map(function (p) {
    return {
      id: p.id,
      label: p.label,
      sublabel: p.sublabel,
      weight: p.weight,
      minPurchase: p.minPurchase,
      expiresText: p.expiresText,
    };
  });
}

function selectPrize() {
  var enabled = PRIZE_CONFIG.filter(function (p) {
    return p.enabled && p.code;
  });
  var totalWeight = enabled.reduce(function (s, p) {
    return s + p.weight;
  }, 0);
  var r = Math.random() * totalWeight;
  for (var i = 0; i < enabled.length; i++) {
    r -= enabled[i].weight;
    if (r <= 0) return enabled[i];
  }
  return enabled[enabled.length - 1];
}

function normalizeEmail(email) {
  return (email || '').toString().trim().toLowerCase();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function buildPrizeEmail(prize) {
  var minText = prize.minPurchase
    ? '<p style="margin:0 0 16px;font-size:14px;color:rgba(45,40,36,0.6);line-height:1.7;">Minimum order of $' +
      prize.minPurchase +
      ' required.</p>'
    : '';
  return (
    '<!DOCTYPE html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>' +
    '<body style="margin:0;padding:0;background:#FBF8F2;font-family:Inter,Arial,sans-serif;color:#2D2824;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="background:#FBF8F2;padding:40px 0;">' +
    '<tr><td align="center"><table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">' +
    '<tr><td align="center" style="padding-bottom:24px;"><p style="margin:0;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#B86543;font-family:monospace;">Torch Republic Coffee Co.</p></td></tr>' +
    '<tr><td style="background:#FFFFFF;border:1px solid #E4D8C9;padding:40px 36px;">' +
    '<p style="margin:0 0 8px;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#B86543;font-family:monospace;">You won ' +
    prize.label +
    '</p>' +
    '<h1 style="margin:0 0 16px;font-size:26px;font-weight:700;color:#2D2824;line-height:1.2;font-family:Georgia,serif;">Your prize is ready.</h1>' +
    '<p style="margin:0 0 24px;font-size:15px;color:#6A5A4A;line-height:1.7;">Thank you for spinning! Here is your offer, ready for your next Torch Republic coffee order.</p>' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;"><tr><td align="center" style="background:#FBF8F2;border:1px dashed #B86543;padding:18px;">' +
    '<p style="margin:0 0 6px;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:#B86543;font-family:monospace;">Your discount code</p>' +
    '<p style="margin:0;font-size:24px;font-weight:700;letter-spacing:0.15em;color:#B86543;font-family:monospace;">' +
    prize.code +
    '</p></td></tr></table>' +
    minText +
    '<p style="margin:0 0 24px;font-size:13px;color:#6A5A4A;line-height:1.7;">' +
    prize.expiresText +
    '. Enter this code during Shopify checkout. Cannot be combined with other offers.</p>' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;"><tr><td align="center">' +
    '<a href="' +
    STORE_URL +
    '/shop" style="display:inline-block;background:#B86543;color:#FBF8F2;font-size:12px;font-family:monospace;letter-spacing:0.2em;text-transform:uppercase;font-weight:700;padding:16px 40px;text-decoration:none;border-radius:999px;">Shop Coffee</a>' +
    '</td></tr></table></td></tr>' +
    '<tr><td align="center" style="padding-top:20px;"><p style="margin:0;font-size:11px;color:#A99787;font-family:monospace;letter-spacing:0.05em;">You received this email from the Torch Republic Spin to Win wheel. <a href="' +
    STORE_URL +
    '/privacy-policy" style="color:#A99787;text-decoration:none;">Privacy</a></p></td></tr>' +
    '</table></td></tr></table></body></html>'
  ).trim();
}

// ── Handler ──────────────────────────────────────────────────────────────────

export default async function (req) {
  try {
    var base44 = createClientFromRequest(req);
    var body = await req.json().catch(function () {
      return {};
    });
    var action = (body.action || 'status').toString();

    // ── STATUS: check if wheel is enabled, return public prize config ───────
    if (action === 'status') {
      return Response.json(
        { enabled: hasEnabledPrizes(), prizes: publicPrizes() },
        { status: 200 }
      );
    }

    // ── SPIN: process a new spin ───────────────────────────────────────────
    if (action === 'spin') {
      var email = normalizeEmail(body.email);
      var consent = !!body.consent;
      var utm = body.utm || {};

      if (!isValidEmail(email)) {
        return Response.json(
          { status: 'error', reason: 'invalid_email' },
          { status: 200 }
        );
      }

      if (!hasEnabledPrizes()) {
        return Response.json(
          { status: 'error', reason: 'not_configured' },
          { status: 200 }
        );
      }

      // Check if already participated (service role — read is admin-only)
      var existing = await base44.asServiceRole.entities.EmailSubscriber.filter({
        email: email,
        source: 'spin_wheel',
      });

      if (existing && existing.length > 0) {
        return Response.json(
          { status: 'already_participated' },
          { status: 200 }
        );
      }

      // Select prize using weighted probabilities (secure, server-side)
      var prize = selectPrize();

      // Record the entry
      var descriptionParts = [
        'spin_wheel',
        'prize:' + prize.id,
        'consent:' + consent,
        'utm:' + (utm.utm_source || 'direct'),
        'ts:' + new Date().toISOString(),
        'redeemed:false',
      ];

      try {
        await base44.asServiceRole.entities.EmailSubscriber.create({
          email: email,
          source: 'spin_wheel',
          discount_code: prize.code,
          marketing_consent: consent,
          description: descriptionParts.join(' | '),
        });
      } catch (createErr) {
        // Concurrent spin — check if a record was created by a parallel request
        var recheck = await base44.asServiceRole.entities.EmailSubscriber.filter({
          email: email,
          source: 'spin_wheel',
        });
        if (recheck && recheck.length > 0) {
          return Response.json(
            { status: 'already_participated' },
            { status: 200 }
          );
        }
        return Response.json(
          { status: 'error', reason: 'record_failed' },
          { status: 200 }
        );
      }

      // Send prize email (best-effort — code is shown on screen regardless)
      var emailSent = false;
      var emailError = null;
      try {
        await base44.asServiceRole.integrations.Core.SendEmail({
          to: email,
          subject: 'You won ' + prize.label + ' - Your Torch Republic offer',
          html: buildPrizeEmail(prize),
          from_name: 'Torch Republic Coffee Co.',
        });
        emailSent = true;
      } catch (err) {
        emailError = (err && err.message) || 'send_failed';
      }

      return Response.json(
        {
          status: 'won',
          prize_id: prize.id,
          label: prize.label,
          sublabel: prize.sublabel,
          code: prize.code,
          minPurchase: prize.minPurchase,
          expiresText: prize.expiresText,
          emailSent: emailSent,
          emailError: emailError,
        },
        { status: 200 }
      );
    }

    // ── RESEND: resend email for an existing participation ────────────────
    if (action === 'resend') {
      var resendEmail = normalizeEmail(body.email);

      if (!isValidEmail(resendEmail)) {
        return Response.json(
          { status: 'error', reason: 'invalid_email' },
          { status: 200 }
        );
      }

      var existingRow = await base44.asServiceRole.entities.EmailSubscriber.filter({
        email: resendEmail,
        source: 'spin_wheel',
      });

      if (!existingRow || existingRow.length === 0) {
        return Response.json(
          { status: 'error', reason: 'not_found' },
          { status: 200 }
        );
      }

      var row = existingRow[0];
      var resendPrize = PRIZE_CONFIG.find(function (p) {
        return p.code === row.discount_code;
      });
      if (!resendPrize) {
        return Response.json(
          { status: 'error', reason: 'prize_not_found' },
          { status: 200 }
        );
      }

      var resendSent = false;
      var resendError = null;
      try {
        await base44.asServiceRole.integrations.Core.SendEmail({
          to: resendEmail,
          subject: 'You won ' + resendPrize.label + ' - Your Torch Republic offer',
          html: buildPrizeEmail(resendPrize),
          from_name: 'Torch Republic Coffee Co.',
        });
        resendSent = true;
      } catch (err) {
        resendError = (err && err.message) || 'send_failed';
      }

      return Response.json(
        {
          status: 'won',
          prize_id: resendPrize.id,
          label: resendPrize.label,
          code: resendPrize.code,
          emailSent: resendSent,
          emailError: resendError,
        },
        { status: 200 }
      );
    }

    return Response.json(
      { status: 'error', reason: 'unknown_action' },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { status: 'error', reason: (error && error.message) || 'unknown_error' },
      { status: 200 }
    );
  }
}