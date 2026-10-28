/**
 * CART PREVIEW — resolve cart lines by product slug without creating a cart.
 *
 * POST { lines: [{ slug, quantity }] }
 *  -> { accepted: [...], rejectedLines: [{ slug, reason }], duoEnabled }
 *
 * Read-only: nothing is created in Shopify and no customer data is read, so the
 * storefront (and QA) can confirm exactly which items a cart would accept and
 * why the rest were refused.
 */

import { createClientFromRequest } from "npm:@base44/sdk@0.8.54";
import { buildCartLines } from "../../shared/cartLines.ts";
import { loadApprovedEditionVariantIds } from "../../shared/specialEditions.ts";
import { DUO_ENABLED } from "../../shared/shopifyStorefront.ts";

const MAX_LINES = 50;

export default async function (req) {
  try {
    const body = await req.json().catch(() => ({}));
    const lines = Array.isArray(body.lines) ? body.lines : Array.isArray(body.items) ? body.items : null;

    if (!lines) {
      return Response.json({ error: "lines must be an array of { slug, quantity }" }, { status: 400 });
    }
    if (lines.length > MAX_LINES) {
      return Response.json({ error: `A cart can hold at most ${MAX_LINES} lines` }, { status: 400 });
    }

    const base44 = createClientFromRequest(req);
    const editionVariantIds = await loadApprovedEditionVariantIds(base44);
    const { accepted, rejectedLines } = buildCartLines(lines, editionVariantIds);

    return Response.json({
      accepted,
      rejectedLines,
      duoEnabled: DUO_ENABLED,
      totalQuantity: accepted.reduce((sum, line) => sum + line.quantity, 0),
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}