/**
 * DAILY STOREFRONT QA — repeatable smoke test for the customer shopping journey.
 *
 * Runs the checks that can be verified from the server, against live sources:
 *   - Shopify Storefront API (price, stock, variant, checkout handoff)
 *   - the app's own public special-editions catalog (approval + availability)
 *   - the published storefront pages (reachability)
 * Everything that needs a real browser (cart interaction, discounts, shipping
 * and tax display, confirmation, mobile layout, accessibility, analytics
 * events) is reported as "Not tested" with manual steps. Nothing is edited,
 * published or purchased. No payment is attempted and no order is created.
 *
 * Invoked by the "Daily Storefront QA" workflow at 8:00am America/Chicago.
 */

import { createClientFromRequest } from "npm:@base44/sdk@0.8.54";
import { storefrontQuery, CART_CREATE_MUTATION } from "../../shared/shopifyStorefront.ts";

const STOREFRONT_ORIGIN = "https://torchrepublic.com";
const FALLBACK_ORIGIN = "https://torchrepublic.base44.app";
// Domain referenced by the app's own emails and brand assets. Probed so a dead
// link in customer-facing email is caught the day it breaks.
const LEGACY_DOMAIN = "https://liberteesllc.com";
const VARIANT_GID = /^gid:\/\/shopify\/ProductVariant\/\d+$/;
const REPORT_RECIPIENT_CAP = 5;

// Approved core catalog (verified against the Storefront API in this app's
// own validation record). Price and SKU are the comparison basis.
const CORE = [
  {
    name: "Instant Classic Coffee",
    handle: "instant-coffee-1",
    sku: "C-INSTANTCOFFEE-ST-3OZ-BL",
    variantId: "gid://shopify/ProductVariant/51245709623548",
    price: "22.99",
    path: "/products/instant-classic-coffee",
  },
  {
    name: "Instant Mushroom Coffee",
    handle: "instant-coffee-with-mushroom",
    sku: "C-INSTANTCOFFEEWITHMUSHROOM-ST-3OZ-BL",
    variantId: "gid://shopify/ProductVariant/51245706608892",
    price: "25.99",
    path: "/products/instant-mushroom-coffee",
  },
];

const PAGES = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  { label: "Classic product", path: "/products/instant-classic-coffee" },
  { label: "Mushroom product", path: "/products/instant-mushroom-coffee" },
  { label: "Special editions", path: "/special-editions" },
  { label: "Cart", path: "/cart" },
];

function chicagoNow() {
  return new Date().toLocaleString("en-US", {
    timeZone: "America/Chicago",
    dateStyle: "full",
    timeStyle: "short",
  });
}

async function probe(origin, path) {
  try {
    const res = await fetch(origin + path, {
      redirect: "follow",
      signal: AbortSignal.timeout(12000),
      headers: { "User-Agent": "TorchRepublic-DailyQA/1.0" },
    });
    const html = await res.text();
    return { ok: res.status === 200, status: res.status, length: html.length, html };
  } catch (error) {
    return { ok: false, status: 0, error: error.message || "fetch failed" };
  }
}

function money(value) {
  return value ? `$${value}` : "n/a";
}

/** Storefront purchasability rule: approved AND mapped AND Shopify-available. */
function optionState(option) {
  if (!option) return "unavailable";
  if (!option.approved) return "not approved";
  if (!VARIANT_GID.test(option.shopify_variant_id || "")) return "not mapped";
  if (option.shopify?.error) return "shopify unavailable";
  if (option.shopify?.unavailable) return "variant not found";
  if (!option.shopify?.available) return "sold out";
  return "purchasable";
}

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me().catch(() => null);
    if (user && user.role !== "admin") {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    const runAt = chicagoNow();
    const stamp = new Date().toISOString().slice(0, 10);
    const checks = [];
    const failures = [];
    const untested = [];
    let defectSeq = 0;

    const addCheck = (id, name, result, evidence) => {
      const defectId = result === "Fail" ? `QA-${stamp}-${++defectSeq}` : "";
      const row = { id, name, result, evidence, defectId };
      checks.push(row);
      if (result === "Fail") failures.push(row);
      return row;
    };

    // ── Shopify: the source of truth for price, stock and variants ──────────
    const aliases = CORE.map(
      (p, i) =>
        `p${i}: productByHandle(handle: "${p.handle}") { title handle availableForSale variants(first: 5) { edges { node { id sku availableForSale priceV2 { amount currencyCode } } } } }`,
    ).join("\n");
    const coreRes = await storefrontQuery(`query QACore { ${aliases} }`);

    const core = CORE.map((product, i) => {
      const node = coreRes.ok ? coreRes.json?.data?.[`p${i}`] : null;
      const variant =
        (node?.variants?.edges || [])
          .map((e) => e.node)
          .find((v) => v.sku === product.sku) || null;
      return { ...product, node, variant };
    });

    // ── Storefront pages: reachable and serving ────────────────────────────
    const pages = await Promise.all(
      PAGES.map(async (page) => {
        const primary = await probe(STOREFRONT_ORIGIN, page.path);
        const fallback = primary.ok ? null : await probe(FALLBACK_ORIGIN, page.path);
        return { ...page, primary, fallback };
      }),
    );
    const pageLine = (page) =>
      page.primary.ok
        ? `${page.label} ${page.primary.status}`
        : page.fallback?.ok
          ? `${page.label} ${page.primary.error || `HTTP ${page.primary.status}`} on the custom domain, ${page.fallback.status} on the base44.app URL`
          : `${page.label} unreachable (${page.primary.error || `HTTP ${page.primary.status}`})`;

    const legacy = await probe(LEGACY_DOMAIN, "/");
    const legacyNote = legacy.ok
      ? `${LEGACY_DOMAIN} also served the home page (HTTP ${legacy.status}).`
      : `${LEGACY_DOMAIN} did not serve the home page (${legacy.error || `HTTP ${legacy.status}`}); this domain appears in the app's own email links, so confirm those links point at ${STOREFRONT_ORIGIN}.`;

    // ── The app's own public special-editions catalog ───────────────────────
    let catalog = { editions: [], shopifyError: null };
    try {
      const catalogRes = await base44.functions.invoke("getSpecialEditions", {});
      catalog = catalogRes?.data || catalogRes || catalog;
    } catch (error) {
      catalog = { editions: [], shopifyError: error.message || "unavailable" };
    }
    const editions = Array.isArray(catalog.editions) ? catalog.editions : [];
    const editionLines = editions.map((edition) => {
      const states = (edition.options || []).map(
        (option) => `${option.label || option.key}: ${optionState(option)}`,
      );
      return `${edition.name} (${states.join("; ") || "no options"})`;
    });
    const purchasableEditions = editions.filter((edition) =>
      (edition.options || []).some((option) => optionState(option) === "purchasable"),
    );
    const unapprovedAvailable = editions.filter((edition) =>
      (edition.options || []).some((option) => !option.approved && option.shopify?.available),
    );

    // ── C1: product and variant accuracy ───────────────────────────────────
    const corePageFailures = pages.filter(
      (page) => CORE.some((c) => c.path === page.path) && !page.primary.ok && !page.fallback?.ok,
    );
    const coreMismatches = core.filter(
      (item) => !item.variant || item.variant.priceV2?.amount !== item.price,
    );
    let c1Result = "Pass";
    let c1Evidence = "";
    if (!coreRes.ok) {
      c1Result = "Blocked";
      c1Evidence = `Shopify Storefront API did not answer (${coreRes.error || "no response"}), so price and stock could not be compared with the approved catalog. `;
    } else if (corePageFailures.length || coreMismatches.length || unapprovedAvailable.length) {
      c1Result = "Fail";
      c1Evidence = "";
    }
    if (c1Result !== "Blocked") {
      c1Evidence = coreRes.ok
        ? core
            .map(
              (item) =>
                `${item.name}: ${item.variant ? `${money(item.variant.priceV2?.amount)} (approved ${money(item.price)}), ${item.variant.availableForSale ? "in stock" : "out of stock"}` : "variant not found on the sales channel"}`,
            )
            .join(". ")
        : c1Evidence;
      c1Evidence += `. Pages: ${CORE.map((c) => pageLine(pages.find((p) => p.path === c.path))).join(", ")}. `;
      c1Evidence += editionLines.length
        ? `Special editions: ${editionLines.join(" | ")}.`
        : "No active special editions returned by the storefront catalog.";
      const homePage = pages.find((p) => p.path === "/");
      const homeHtml = homePage?.primary.html || homePage?.fallback?.html || "";
      const mentionedNotPurchasable = editions
        .filter((e) => !purchasableEditions.includes(e) && homeHtml.includes(e.name))
        .map((e) => e.name);
      c1Evidence += ` ${legacyNote}`;
      if (mentionedNotPurchasable.length) {
        c1Evidence += ` The home page names ${mentionedNotPurchasable.join(", ")}, which is not approved or mapped to a Shopify variant; confirm it is not presented as available for purchase.`;
        untested.push(
          `Confirm in a browser that the home page does not present ${mentionedNotPurchasable.join(", ")} as available for purchase: open ${STOREFRONT_ORIGIN}, follow the hero and any seasonal link, and check that the buy button reads as coming soon.`,
        );
      }
    }
    addCheck("C1", "Product and variant accuracy", c1Result, c1Evidence);

    if (corePageFailures.length) {
      untested.push(
        `Browser cart interaction (adding each core product to the cart) was not run: the page probe could not load ${corePageFailures.map((p) => p.path).join(", ")}. Verify manually.`,
      );
    } else {
      untested.push(
        "Cart add and cart persistence (item, option and price preserved) needs a browser. Manual steps: open each core product page, add to cart, confirm the item, option and price in the cart, then reload the page and confirm the cart survives.",
      );
    }
    untested.push(
      "Confirm that no unpublished or unapproved product is presented as available for purchase. Manual steps: open the home page hero and the seasonal collection, and confirm every product shown as available has a working buy button while coming-soon items read as coming soon. The hero renders in the browser, so this cannot be read from the page source.",
    );
    if (unapprovedAvailable.length) {
      untested.push(
        `Confirm in a browser that these editions still read as coming soon and cannot be purchased: ${unapprovedAvailable.map((e) => e.name).join(", ")} (mapped and in stock at Shopify but not supplier-approved).`,
      );
    }

    // ── C2: search and filters ─────────────────────────────────────────────
    addCheck(
      "C2",
      "Search and filters",
      "Not tested",
      "Storefront search runs in the browser and has no server endpoint this runner can query.",
    );
    untested.push(
      'Search and filters need a browser. Manual steps: search "Classic Coffee" and "Mushroom Coffee", try a partial query and a query with no match, confirm prices and images in the results, clear the search and confirm the catalog returns.',
    );

    // ── C3: discounts ──────────────────────────────────────────────────────
    addCheck(
      "C3",
      "Discounts",
      "Not tested",
      "No active test discount code or rule is available to this runner. No code was guessed.",
    );
    untested.push(
      "Discounts need a test code and its rule. Provide one active test code with its eligibility and amount, then this check can compare the discount and the revised total against that rule.",
    );

    // ── C4: shipping and tax display ───────────────────────────────────────
    addCheck(
      "C4",
      "Shipping and tax display",
      "Not tested",
      "Shipping and tax display require a browser session with an address. No rate or amount is asserted here.",
    );
    untested.push(
      "Shipping and tax need a browser plus an approved test destination. Manual steps: check what the cart says before an address is entered, then enter the test destination at checkout and confirm the shipping method, the tax and the final total are labelled and included.",
    );

    // ── C5: cart quantities ────────────────────────────────────────────────
    addCheck(
      "C5",
      "Cart quantities",
      "Not tested",
      "Quantity controls are browser interactions and cannot be exercised by this runner.",
    );
    untested.push(
      "Cart quantities need a browser. Manual steps: add one item, raise and lower the quantity, remove it, confirm line totals, subtotal and item count update, add both core products and change one quantity, and confirm an invalid quantity cannot proceed to checkout.",
    );

    // ── C6: checkout handoff (verified server-side, no payment) ────────────
    const cartRes = await storefrontQuery(CART_CREATE_MUTATION, {
      input: { lines: [{ merchandiseId: CORE[0].variantId, quantity: 1 }] },
    });
    const cartNode = cartRes.ok ? cartRes.json?.data?.cartCreate?.cart : null;
    const cartErrors = cartRes.json?.data?.cartCreate?.userErrors || [];
    const cartLine = cartNode?.lines?.edges?.[0]?.node;
    let c6Result = "Pass";
    let c6Evidence = "";
    if (!cartRes.ok || !cartNode) {
      c6Result = "Blocked";
      c6Evidence = `The Storefront API did not return a cart (${cartRes.error || "no cart node"}), so the checkout handoff could not be confirmed.`;
    } else if (cartErrors.length) {
      c6Result = "Fail";
      c6Evidence = `Shopify refused the cart line: ${cartErrors.map((e) => e.message).join("; ")}.`;
    } else {
      c6Evidence = `A test cart was created with ${CORE[0].name} x1 at ${money(cartLine?.merchandise?.priceV2?.amount)}, quantity ${cartNode.totalQuantity}, subtotal ${money(cartNode.cost?.subtotalAmount?.amount)} ${cartNode.cost?.subtotalAmount?.currencyCode || ""}. Checkout link returned: ${cartNode.checkoutUrl ? "yes" : "no"}. No payment was attempted and no order was created.`;
      if (!cartNode.checkoutUrl) {
        c6Result = "Fail";
      }
    }
    addCheck("C6", "Checkout handoff", c6Result, c6Evidence);
    untested.push(
      "Checkout form validation and the payment step need a browser with an authorized sandbox or test payment flow. The handoff link itself is confirmed above.",
    );

    // ── C7: confirmation ──────────────────────────────────────────────────
    addCheck(
      "C7",
      "Confirmation",
      "Not tested",
      "Completing an order requires an authorized test payment flow, which this runner must not use.",
    );
    untested.push(
      "Confirmation needs an authorized test mode. Manual steps: place one test order, confirm the success page shows an order reference with matching products, quantities and totals, check the confirmation email, then reload the confirmation page and confirm it does not create a second order.",
    );

    // ── C8: mobile layout ─────────────────────────────────────────────────
    addCheck(
      "C8",
      "Mobile layout",
      "Not tested",
      "This runner has no rendering engine, so nothing about layout was observed.",
    );
    untested.push(
      "Mobile layout needs a browser at a narrow and a typical phone width. Manual steps: open the home page, both product pages, the cart and the checkout handoff, look for horizontal overflow, clipped text, overlapping controls and hard-to-tap buttons, then open and dismiss navigation, search, cart, filters, banners and popups and confirm the page stays scrollable.",
    );

    // ── C9: basic accessibility ───────────────────────────────────────────
    addCheck(
      "C9",
      "Basic accessibility",
      "Not tested",
      "No accessibility tree, screen reader or browser is available to this runner.",
    );
    untested.push(
      "Accessibility needs a browser and a keyboard. Manual steps: tab through the shopping path and confirm visible focus and activatable controls, check that inputs and buttons have understandable names and product images have text alternatives, check heading order and contrast at 200% zoom, and trigger a form error to confirm the message identifies the problem in text and not by colour alone.",
    );

    // ── C10: key analytics events ─────────────────────────────────────────
    addCheck(
      "C10",
      "Key analytics events",
      "Not tested",
      "Browser events cannot be observed from the server. Nothing is claimed to have fired.",
    );
    untested.push(
      "Analytics events still to verify in a browser: view_item_list, view_item, search, select_item, add_to_cart, remove_from_cart, view_cart, begin_checkout, add_shipping_info, add_payment_info and purchase (firing once with a unique transaction ID). Confirm each payload carries item, quantity, value and currency, and no payment credentials or unnecessary personal data.",
    );

    // ── Overall result ────────────────────────────────────────────────────
    const overall = checks.some((c) => c.result === "Fail")
      ? "Fail"
      : checks.some((c) => c.result === "Blocked")
        ? "Blocked"
        : "Pass";
    const reason =
      overall === "Pass"
        ? "Every check this runner can verify from the server passed; browser-only checks are listed as not tested."
        : overall === "Fail"
          ? `${failures.length} check${failures.length === 1 ? "" : "s"} failed: ${failures.map((f) => `${f.id} ${f.name}`).join(", ")}.`
          : "A source this runner depends on did not answer, so one or more checks could not be compared against the approved catalog.";

    // ── Report ────────────────────────────────────────────────────────────
    const runDetails = {
      runAt,
      storefront: STOREFRONT_ORIGIN,
      environment: "production",
      build: FALLBACK_ORIGIN,
      runner: "Base44 scheduled function, server side",
      device: "not applicable (no browser)",
      sources: [
        `Shopify Storefront API ${coreRes.ok ? `ok (HTTP ${coreRes.status})` : `unavailable (${coreRes.error})`}`,
        `Public special-editions catalog ${catalog.shopifyError ? "reported an availability problem" : "ok"}`,
      ],
      editsMade: "none",
    };

    const priorities = [];
    failures.slice(0, 3).forEach((f) => priorities.push(`Fix ${f.id} ${f.name}.`));
    [
      "Confirm one active test discount code and its rule so the discount check can run against it.",
      "Turn on completed-purchase tracking from Shopify order data so conversion and revenue can be measured.",
      "Run the browser checks (cart, checkout, mobile, accessibility, analytics) by hand once a week until a browser runner exists.",
    ].forEach((p) => {
      if (priorities.length < 3) priorities.push(p);
    });

    const report = {
      overall,
      reason,
      runDetails,
      checks,
      failures,
      untested,
      priorities: priorities.slice(0, 3),
      purchasableEditions: purchasableEditions.map((e) => e.name),
      shopifyStatus: coreRes.ok ? `ok (HTTP ${coreRes.status})` : `unavailable (${coreRes.error})`,
    };

    // ── Email the report to the app's admins ──────────────────────────────
    const users = await base44.asServiceRole.entities.User.list().catch(() => []);
    const recipients = (Array.isArray(users) ? users : users?.items || [])
      .filter((u) => u.role === "admin" && u.email)
      .map((u) => u.email)
      .slice(0, REPORT_RECIPIENT_CAP);

    const RESULT_COLOR = {
      Pass: "#1a7f37",
      Fail: "#b3261e",
      Blocked: "#8a5a00",
      "Not tested": "#6b5d54",
    };
    const esc = (value) =>
      String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    const checkRows = checks
      .map(
        (c) => `<tr>
      <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;font-family:'JetBrains Mono',Consolas,monospace;font-size:12px;color:#382b24;">${esc(c.id)}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;font-size:13px;color:#382b24;">${esc(c.name)}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:700;color:${RESULT_COLOR[c.result] || "#382b24"};">${esc(c.result)}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;font-size:12px;color:#6b5d54;">${esc(c.evidence)}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;font-family:'JetBrains Mono',Consolas,monospace;font-size:12px;color:#b3261e;">${esc(c.defectId)}</td>
    </tr>`,
      )
      .join("");

    const failureBlocks = failures.length
      ? failures
          .map(
            (f) => `<div style="background:#f1ece5;border-radius:4px;padding:16px;margin:0 0 12px;">
        <p style="margin:0 0 6px;font-size:14px;font-weight:700;color:#b3261e;">${esc(f.defectId)} ${esc(f.id)} ${esc(f.name)}</p>
        <p style="margin:0 0 4px;font-size:13px;color:#382b24;"><strong>Expected:</strong> ${esc(f.expected || "the check passes against the approved catalog and configured settings.")}</p>
        <p style="margin:0 0 4px;font-size:13px;color:#382b24;"><strong>Actual:</strong> ${esc(f.evidence)}</p>
        <p style="margin:0 0 4px;font-size:13px;color:#382b24;"><strong>Reproduction:</strong> open ${esc(STOREFRONT_ORIGIN)} and follow the steps for ${esc(f.id)} in the checklist.</p>
        <p style="margin:0;font-size:13px;color:#382b24;"><strong>Severity:</strong> ${esc(f.severity || "high, the shopping path is affected.")}</p>
      </div>`,
          )
          .join("")
      : `<p style="margin:0;font-size:13px;color:#6b5d54;">No failures in this run.</p>`;

    const html = `<div style="background:#fbf8f3;padding:24px 0;font-family:'Inter',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#fbf8f3;">
    <tr>
      <td style="background:#b66443;padding:18px 24px;">
        <img src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/1e723899d_logo.png" alt="Torch Republic Coffee Company" height="34" style="height:34px;vertical-align:middle;" />
        <span style="font-size:16px;font-weight:700;color:#000000;margin-left:10px;vertical-align:middle;">Torch Republic Coffee Company</span>
      </td>
    </tr>
    <tr>
      <td style="padding:24px;">
        <p style="margin:0 0 4px;font-size:22px;font-weight:700;color:#382b24;">Daily storefront check: ${esc(overall)}</p>
        <p style="margin:0 0 20px;font-size:14px;color:#6b5d54;">${esc(reason)}</p>

        <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#382b24;">Run details</p>
        <p style="margin:0 0 20px;font-size:12px;color:#6b5d54;line-height:1.7;">
          ${esc(runDetails.runAt)} (America/Chicago)<br/>
          Storefront: ${esc(runDetails.storefront)} (${esc(runDetails.environment)})<br/>
          Build: ${esc(runDetails.build)}<br/>
          Runner: ${esc(runDetails.runner)}<br/>
          Device and viewport: ${esc(runDetails.device)}<br/>
          Sources: ${esc(runDetails.sources.join(". "))}<br/>
          Changes made: ${esc(runDetails.editsMade)}
        </p>

        <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#382b24;">Checklist</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#ffffff;border-radius:4px;margin-bottom:20px;">
          <tr>
            <th align="left" style="padding:8px 10px;font-size:11px;text-transform:uppercase;color:#6b5d54;border-bottom:1px solid #e5e7eb;">ID</th>
            <th align="left" style="padding:8px 10px;font-size:11px;text-transform:uppercase;color:#6b5d54;border-bottom:1px solid #e5e7eb;">Check</th>
            <th align="left" style="padding:8px 10px;font-size:11px;text-transform:uppercase;color:#6b5d54;border-bottom:1px solid #e5e7eb;">Result</th>
            <th align="left" style="padding:8px 10px;font-size:11px;text-transform:uppercase;color:#6b5d54;border-bottom:1px solid #e5e7eb;">Evidence</th>
            <th align="left" style="padding:8px 10px;font-size:11px;text-transform:uppercase;color:#6b5d54;border-bottom:1px solid #e5e7eb;">Defect</th>
          </tr>
          ${checkRows}
        </table>

        <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#382b24;">Failures</p>
        ${failureBlocks}

        <p style="margin:20px 0 6px;font-size:13px;font-weight:700;color:#382b24;">Not tested, and how to verify</p>
        <ul style="margin:0 0 20px;padding-left:18px;font-size:13px;color:#6b5d54;line-height:1.6;">
          ${untested.map((u) => `<li style="margin-bottom:6px;">${esc(u)}</li>`).join("")}
        </ul>

        <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#382b24;">Three priorities</p>
        <ol style="margin:0;padding-left:18px;font-size:13px;color:#382b24;line-height:1.6;">
          ${priorities.slice(0, 3).map((p) => `<li style="margin-bottom:6px;">${esc(p)}</li>`).join("")}
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background:#f1ece5;padding:16px 24px;">
        <p style="margin:0;font-size:11px;color:#6b5d54;">Automated report. Inspect only: no products, prices, settings or code were changed, and no order was placed.</p>
      </td>
    </tr>
  </table>
</div>`;

    const subject = `Daily storefront check: ${overall} (${stamp})`;
    const sent = [];
    for (const to of recipients) {
      try {
        await base44.asServiceRole.integrations.Core.SendEmail({
          to,
          subject,
          html,
          from_name: "Torch Republic QA",
        });
        sent.push(to);
      } catch (error) {
        console.log(`Send to ${to} failed: ${error.message}`);
      }
    }

    return Response.json({ overall, reason, recipients: sent, report });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}