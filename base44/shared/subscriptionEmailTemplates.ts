// ──────────────────────────────────────────────────────────────────────────
// Torch Republic — First-Subscription Email Sequence Templates
// Version 1.0 — September 2026
//
// Three-email sequence for customers who place their FIRST subscription order.
// Uses the current Torch Republic brand design system:
//   - Warm cream background (#FBF8F1)
//   - Near-black text (#292622)
//   - Deep forest green accents (#2A3128)
//   - Muted copper / terracotta buttons (#B7653E)
//   - 600px max-width centered container
//   - 16px minimum body font
//   - Table-based layout for Gmail / Outlook / Apple Mail compatibility
//   - Dark-mode media query in <head>
//
// Product imagery: current two-product pouch photography only.
// Only active product names are used throughout.
// ──────────────────────────────────────────────────────────────────────────

// ── Brand constants ────────────────────────────────────────────────────────
export const BRAND = {
  name: 'Torch Republic Coffee Company',
  baseUrl: 'https://torchrepublic.com',
  supportEmail: 'support@torchrepublic.com',
  logo: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/ea7e0190c_torch_republic_primary_refined_gradient_4000px.png',
  classicImg: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/5e731e05f_file_00000000219c822f89492705850fcb90.png',
  mushroomImg: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/193fcf090_file_00000000d614822fbac1ab269ae9f60a.png',
  colors: {
    cream: '#FBF8F1',
    white: '#FFFFFF',
    text: '#292622',
    textMuted: '#5F574F',
    forest: '#2A3128',
    terracotta: '#B7653E',
    moss: '#566047',
    border: '#E4D8C9',
    darkBg: '#1A1916',
    darkText: '#E8E4DD',
  },
};

// ── Links ───────────────────────────────────────────────────────────────────
export const LINKS = {
  account: `${BRAND.baseUrl}/profile`,
  subscription: `${BRAND.baseUrl}/subscription`,
  journal: `${BRAND.baseUrl}/journal`,
  shop: `${BRAND.baseUrl}/shop`,
  contact: `${BRAND.baseUrl}/contact`,
  privacy: `${BRAND.baseUrl}/privacy-policy`,
  terms: `${BRAND.baseUrl}/terms-of-service`,
  unsubscribe: `${BRAND.baseUrl}/contact?subject=Unsubscribe`,
};

// ── Shared header ────────────────────────────────────────────────────────────
function header() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <title>Torch Republic</title>
  <style>
    @media (prefers-color-scheme: dark) {
      .email-bg { background-color: ${BRAND.colors.darkBg} !important; }
      .email-card { background-color: #2A2925 !important; }
      .email-text { color: ${BRAND.colors.darkText} !important; }
      .email-muted { color: #A09A8E !important; }
    }
    @media (max-width: 600px) {
      .email-container { width: 100% !important; }
      .email-pad { padding: 32px 20px !important; }
      .email-btn { width: 100% !important; box-sizing: border-box !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:${BRAND.colors.cream};font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="email-bg" style="background-color:${BRAND.colors.cream};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" class="email-container email-card" style="max-width:600px;background-color:${BRAND.colors.white};border-radius:8px;overflow:hidden;">
          <tr>
            <td align="center" style="padding:40px 40px 8px;" class="email-pad">
              <img src="${BRAND.logo}" alt="Torch Republic Coffee Company" width="180" style="display:block;max-width:180px;height:auto;border:0;">
            </td>
          </tr>`;
}

// ── Shared footer ───────────────────────────────────────────────────────────
function footer(reasonText) {
  const year = new Date().getFullYear();
  return `          <tr>
            <td style="padding:0 40px 40px;" class="email-pad">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${BRAND.colors.border};margin-top:32px;">
                <tr>
                  <td style="padding-top:28px;text-align:center;">
                    <p style="font-family:'Inter',sans-serif;font-size:13px;font-weight:600;color:${BRAND.colors.text};margin:0 0 6px;" class="email-text">${BRAND.name}</p>
                    <p style="font-family:'Inter',sans-serif;font-size:12px;color:${BRAND.colors.textMuted};margin:0 0 4px;line-height:1.6;" class="email-muted">Corpus Christi, Texas &middot; U.S.A.</p>
                    <p style="font-family:'Inter',sans-serif;font-size:12px;margin:0 0 16px;line-height:1.6;">
                      <a href="${LINKS.contact}" style="color:${BRAND.colors.terracotta};text-decoration:none;">Contact</a>
                      &nbsp;&middot;&nbsp;
                      <a href="${LINKS.privacy}" style="color:${BRAND.colors.terracotta};text-decoration:none;">Privacy</a>
                      &nbsp;&middot;&nbsp;
                      <a href="${LINKS.terms}" style="color:${BRAND.colors.terracotta};text-decoration:none;">Terms</a>
                      &nbsp;&middot;&nbsp;
                      <a href="${LINKS.unsubscribe}" style="color:${BRAND.colors.terracotta};text-decoration:none;">Unsubscribe</a>
                    </p>
                    <p style="font-family:'Inter',sans-serif;font-size:11px;color:${BRAND.colors.textMuted};margin:0 0 8px;line-height:1.6;" class="email-muted">${reasonText}</p>
                    <p style="font-family:'Inter',sans-serif;font-size:11px;color:${BRAND.colors.textMuted};margin:0;" class="email-muted">&copy; ${year} ${BRAND.name}. All rights reserved.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ── CTA button ──────────────────────────────────────────────────────────────
function ctaButton(href, label) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:8px 0 4px;">
        <a href="${href}" class="email-btn" style="display:inline-block;background-color:${BRAND.colors.terracotta};color:${BRAND.colors.cream};font-family:'Inter',sans-serif;font-size:16px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;text-decoration:none;padding:16px 40px;border-radius:6px;min-height:44px;line-height:1;">${label}</a>
      </td>
    </tr>
  </table>`;
}

// ── EMAIL 1: Welcome to the Ritual ───────────────────────────────────────────
export function email1Welcome(customerName) {
  const greeting = customerName ? `Hi ${customerName},` : 'Hi there,';
  const subject = 'Welcome to Torch Republic \u2014 your morning ritual, simplified \u2615';
  const previewText = 'No machines, no pods, no clutter. Here\u2019s what happens next.';

  const html = `${header()}
          <tr>
            <td style="padding:24px 40px 40px;" class="email-pad">
              <p style="font-family:'Inter',sans-serif;font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:${BRAND.colors.moss};margin:0 0 20px;">Welcome to the Republic</p>
              <p style="font-family:'Inter',sans-serif;font-size:18px;line-height:1.6;color:${BRAND.colors.text};margin:0 0 20px;" class="email-text">${greeting}</p>
              <p style="font-family:'Inter',sans-serif;font-size:16px;line-height:1.7;color:${BRAND.colors.text};margin:0 0 28px;" class="email-text">
                You\u2019ve taken the first step toward a simpler, more intentional morning routine. Whether you chose our Instant Classic Coffee or Instant Mushroom Coffee, your new ritual is officially in motion.
              </p>
              <p style="font-family:'Inter',sans-serif;font-size:16px;font-weight:700;color:${BRAND.colors.text};margin:0 0 16px;" class="email-text">Here\u2019s what happens next:</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="padding:0 0 16px;">
                    <p style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;color:${BRAND.colors.text};margin:0;" class="email-text">
                      <strong style="color:${BRAND.colors.forest};">1. We prepare your order.</strong><br>
                      Your Torch Republic pouch will be carefully packed and prepared for shipment.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 16px;">
                    <p style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;color:${BRAND.colors.text};margin:0;" class="email-text">
                      <strong style="color:${BRAND.colors.forest};">2. We send your tracking details.</strong><br>
                      You\u2019ll receive a tracking link as soon as your order is on its way.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 4px;">
                    <p style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;color:${BRAND.colors.text};margin:0;" class="email-text">
                      <strong style="color:${BRAND.colors.forest};">3. You scoop, stir, and sip.</strong><br>
                      Add your preferred amount to hot or iced water, stir, and enjoy\u2014without a brewer, pods, or complicated cleanup.
                    </p>
                  </td>
                </tr>
              </table>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.colors.cream};border-radius:8px;margin-bottom:28px;">
                <tr>
                  <td style="padding:24px;">
                    <p style="font-family:'Inter',sans-serif;font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${BRAND.colors.moss};margin:0 0 10px;">Your subscription flexibility</p>
                    <p style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;color:${BRAND.colors.text};margin:0;" class="email-text">
                      Your subscription is designed to work around your routine. Use your account to review upcoming deliveries and access the subscription-management options supported by the connected Shopify subscription provider.
                    </p>
                  </td>
                </tr>
              </table>
              ${ctaButton(LINKS.account, 'View My Account')}
              <p style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;color:${BRAND.colors.textMuted};margin:28px 0 0;text-align:center;" class="email-muted">
                Need to correct your address or order details? Reply to this email as soon as possible and we\u2019ll do our best to help before your order ships.
              </p>
            </td>
          </tr>
${footer('You\u2019re receiving this email because you started a Torch Republic subscription.')}`;

  return { subject, previewText, html };
}

// ── EMAIL 2: Master Your Morning ─────────────────────────────────────────────
export function email2Preparation(customerName) {
  const greeting = customerName ? `Hi ${customerName},` : 'Hi there,';
  const subject = 'A better cup in a few simple steps \u2615';
  const previewText = 'Hot or iced, here\u2019s how to make your Torch Republic ritual your own.';

  const html = `${header()}
          <tr>
            <td style="padding:24px 40px 40px;" class="email-pad">
              <p style="font-family:'Inter',sans-serif;font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:${BRAND.colors.moss};margin:0 0 20px;">Master Your Morning</p>
              <p style="font-family:'Inter',sans-serif;font-size:18px;line-height:1.6;color:${BRAND.colors.text};margin:0 0 20px;" class="email-text">${greeting}</p>
              <p style="font-family:'Inter',sans-serif;font-size:16px;line-height:1.7;color:${BRAND.colors.text};margin:0 0 28px;" class="email-text">
                Your Torch Republic order should be arriving soon\u2014or may already be waiting for you.
              </p>
              <p style="font-family:'Inter',sans-serif;font-size:16px;line-height:1.7;color:${BRAND.colors.text};margin:0 0 28px;" class="email-text">
                We created Torch Republic for mornings that need to move: workdays, study sessions, travel days, and slow weekends at home. Here\u2019s a simple starting point for preparing your cup.
              </p>

              <p style="font-family:'Inter',sans-serif;font-size:15px;font-weight:700;color:${BRAND.colors.forest};margin:0 0 12px;" class="email-text">Hot Preparation</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr><td style="padding:0 0 8px;"><p style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;color:${BRAND.colors.text};margin:0;" class="email-text">1. Add the serving amount printed on your product pouch to your mug.</p></td></tr>
                <tr><td style="padding:0 0 8px;"><p style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;color:${BRAND.colors.text};margin:0;" class="email-text">2. Pour in the recommended amount of hot water.</p></td></tr>
                <tr><td style="padding:0 0 8px;"><p style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;color:${BRAND.colors.text};margin:0;" class="email-text">3. Stir until fully dissolved.</p></td></tr>
                <tr><td style="padding:0 0 4px;"><p style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;color:${BRAND.colors.text};margin:0;" class="email-text">4. Adjust the strength, sweetness, or milk to your preference.</p></td></tr>
              </table>

              <p style="font-family:'Inter',sans-serif;font-size:15px;font-weight:700;color:${BRAND.colors.forest};margin:0 0 12px;" class="email-text">Iced Preparation</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr><td style="padding:0 0 8px;"><p style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;color:${BRAND.colors.text};margin:0;" class="email-text">1. Add the serving amount printed on your pouch to a glass.</p></td></tr>
                <tr><td style="padding:0 0 8px;"><p style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;color:${BRAND.colors.text};margin:0;" class="email-text">2. Dissolve it in a small amount of warm water.</p></td></tr>
                <tr><td style="padding:0 0 8px;"><p style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;color:${BRAND.colors.text};margin:0;" class="email-text">3. Add cold water and ice.</p></td></tr>
                <tr><td style="padding:0 0 4px;"><p style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;color:${BRAND.colors.text};margin:0;" class="email-text">4. Finish with your preferred milk or creamer, if desired.</p></td></tr>
              </table>

              <p style="font-family:'Inter',sans-serif;font-size:15px;font-weight:700;color:${BRAND.colors.forest};margin:0 0 16px;" class="email-text">Know Your Ritual</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td width="50%" style="padding:0 8px 0 0;vertical-align:top;">
                    <img src="${BRAND.classicImg}" alt="Instant Classic Coffee pouch" width="120" style="display:block;max-width:120px;height:auto;border:0;margin:0 auto 12px;">
                    <p style="font-family:'Inter',sans-serif;font-size:14px;font-weight:700;color:${BRAND.colors.text};margin:0 0 4px;text-align:center;" class="email-text">Instant Classic Coffee</p>
                    <p style="font-family:'Inter',sans-serif;font-size:13px;line-height:1.5;color:${BRAND.colors.textMuted};margin:0;text-align:center;" class="email-muted">A convenient instant coffee made for a smooth, satisfying cup without brewing equipment.</p>
                  </td>
                  <td width="50%" style="padding:0 0 0 8px;vertical-align:top;">
                    <img src="${BRAND.mushroomImg}" alt="Instant Mushroom Coffee pouch" width="120" style="display:block;max-width:120px;height:auto;border:0;margin:0 auto 12px;">
                    <p style="font-family:'Inter',sans-serif;font-size:14px;font-weight:700;color:${BRAND.colors.text};margin:0 0 4px;text-align:center;" class="email-text">Instant Mushroom Coffee</p>
                    <p style="font-family:'Inter',sans-serif;font-size:13px;line-height:1.5;color:${BRAND.colors.textMuted};margin:0;text-align:center;" class="email-muted">Instant coffee blended with Lion\u2019s Mane and Chaga mushroom ingredients for an easy addition to your morning routine.</p>
                  </td>
                </tr>
              </table>

              ${ctaButton(LINKS.journal, 'Explore the Journal')}
            </td>
          </tr>
${footer('You\u2019re receiving this email because you started a Torch Republic subscription.')}`;

  return { subject, previewText, html };
}

// ── EMAIL 3: Your Subscription, Your Routine ──────────────────────────────────
export function email3Manage(customerName) {
  const greeting = customerName ? `Hi ${customerName},` : 'Hi there,';
  const subject = 'Your subscription, your routine \uD83D\uDCE6';
  const previewText = 'Review your next delivery and explore the options available in your account.';

  const html = `${header()}
          <tr>
            <td style="padding:24px 40px 40px;" class="email-pad">
              <p style="font-family:'Inter',sans-serif;font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:${BRAND.colors.moss};margin:0 0 20px;">Your Subscription, Your Routine</p>
              <p style="font-family:'Inter',sans-serif;font-size:18px;line-height:1.6;color:${BRAND.colors.text};margin:0 0 20px;" class="email-text">${greeting}</p>
              <p style="font-family:'Inter',sans-serif;font-size:16px;line-height:1.7;color:${BRAND.colors.text};margin:0 0 28px;" class="email-text">
                How is your new morning ritual fitting into your day?
              </p>
              <p style="font-family:'Inter',sans-serif;font-size:16px;line-height:1.7;color:${BRAND.colors.text};margin:0 0 28px;" class="email-text">
                Your Torch Republic subscription should complement your routine\u2014not complicate it. Before your next renewal, you can review your upcoming order and use the management options available through your subscription plan.
              </p>
              <p style="font-family:'Inter',sans-serif;font-size:16px;line-height:1.7;color:${BRAND.colors.text};margin:0 0 12px;" class="email-text">
                Depending on the options supported by the active Shopify subscription provider, customers may be able to:
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr><td style="padding:0 0 8px;"><p style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;color:${BRAND.colors.text};margin:0;" class="email-text">\u2022 Review the next order and renewal date.</p></td></tr>
                <tr><td style="padding:0 0 8px;"><p style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;color:${BRAND.colors.text};margin:0;" class="email-text">\u2022 Change the delivery schedule.</p></td></tr>
                <tr><td style="padding:0 0 8px;"><p style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;color:${BRAND.colors.text};margin:0;" class="email-text">\u2022 Swap eligible products.</p></td></tr>
                <tr><td style="padding:0 0 8px;"><p style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;color:${BRAND.colors.text};margin:0;" class="email-text">\u2022 Skip an upcoming shipment.</p></td></tr>
                <tr><td style="padding:0 0 8px;"><p style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;color:${BRAND.colors.text};margin:0;" class="email-text">\u2022 Pause or cancel the subscription.</p></td></tr>
                <tr><td style="padding:0 0 4px;"><p style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;color:${BRAND.colors.text};margin:0;" class="email-text">\u2022 Update billing or shipping information.</p></td></tr>
              </table>
              ${ctaButton(LINKS.subscription, 'Manage My Subscription')}
              <p style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;color:${BRAND.colors.textMuted};margin:28px 0 0;text-align:center;" class="email-muted">
                Have a question about your order or subscription? Reply to this email and we\u2019ll be happy to help.
              </p>
            </td>
          </tr>
${footer('You\u2019re receiving this email because you have an active Torch Republic subscription.')}`;

  return { subject, previewText, html };
}