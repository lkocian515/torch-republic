import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();
  if (user?.role !== 'admin') {
    return Response.json({ error: 'Admin only' }, { status: 403 });
  }

  const products = await base44.asServiceRole.entities.Product.list('', 250);
  const results = [];

  for (const product of products) {
    const rawDesc = product.description || '';
    const rawTitle = product.title || '';

    // Clean up obvious issues without LLM first
    const needsCleaning = 
      rawDesc.includes('\xa0') ||
      rawDesc.includes('EU representative') ||
      rawDesc.includes('gpsr@') ||
      rawDesc.length < 60 ||
      rawDesc.endsWith(':') ||
      rawDesc.endsWith('makes') ||
      rawDesc.endsWith('wash') ||
      rawDesc.endsWith('workd') ||
      rawTitle.includes('  ') || // double spaces
      rawTitle.includes('â€™') || // encoding issues
      false;

    if (!needsCleaning && rawDesc.length > 100) {
      results.push({ id: product.id, title: rawTitle, status: 'skipped' });
      continue;
    }

    const cleaned = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt: `You are cleaning product data for a patriotic American apparel store called Torch Republic.

Product title: "${rawTitle}"
Product description: "${rawDesc}"

Tasks:
1. Fix the title if it has double spaces, encoding errors (â€™ → '), or awkward formatting. Keep it as-is if it's fine.
2. Rewrite the description to be clean, compelling, 2-3 sentences max. Remove: EU representative text, raw spec codes (like "Next Level 1533"), legal boilerplate, encoding artifacts (\\xa0, â€™), truncated sentences. Write in an authentic patriotic brand voice — bold, grounded, American. No fluff.

Return JSON only.`,
      response_json_schema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          description: { type: 'string' }
        }
      }
    });

    await base44.asServiceRole.entities.Product.update(product.id, {
      title: cleaned.title,
      description: cleaned.description
    });

    results.push({ id: product.id, title: cleaned.title, status: 'updated' });
  }

  const updated = results.filter(r => r.status === 'updated').length;
  return Response.json({ total: products.length, updated, skipped: products.length - updated, results });
});