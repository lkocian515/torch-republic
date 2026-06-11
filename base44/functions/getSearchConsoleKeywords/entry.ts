import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('google_search_console');

    // Step 1: Get the list of verified sites
    const sitesRes = await fetch('https://www.googleapis.com/webmasters/v3/sites', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const sitesData = await sitesRes.json();
    const sites = sitesData.siteEntry || [];

    // Find torchrepublic.com (or use first site)
    const site =
      sites.find((s) => s.siteUrl.includes('torchrepublic.com')) || sites[0];

    if (!site) {
      return Response.json({ error: 'No verified sites found in Search Console.' }, { status: 404 });
    }

    const siteUrl = site.siteUrl;

    // Step 2: Query search analytics — last 90 days, by query
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 90);
    const fmt = (d) => d.toISOString().split('T')[0];

    const analyticsRes = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: fmt(startDate),
          endDate: fmt(endDate),
          dimensions: ['query'],
          rowLimit: 100,
          orderBy: [{ fieldName: 'clicks', sortOrder: 'DESCENDING' }],
        }),
      }
    );

    const analyticsData = await analyticsRes.json();

    if (analyticsData.error) {
      return Response.json({ error: analyticsData.error.message }, { status: 500 });
    }

    const rows = analyticsData.rows || [];

    // Step 3: Filter for coffee-related keywords
    const coffeeTerms = [
      'coffee', 'mushroom', 'matcha', 'instant', 'lion', 'chaga', 'ritual',
      'blend', 'torch', 'pod', 'energy', 'focus', 'wellness', 'organic',
      'caffeine', 'morning', 'brew', 'latte', 'espresso',
    ];

    const allKeywords = rows.map((row) => ({
      query: row.keys[0],
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: parseFloat((row.ctr * 100).toFixed(2)),
      position: parseFloat(row.position.toFixed(1)),
    }));

    const coffeeKeywords = allKeywords.filter((k) =>
      coffeeTerms.some((term) => k.query.toLowerCase().includes(term))
    );

    // Top opportunities: high impressions, low position (< 20), low CTR
    const opportunities = allKeywords
      .filter((k) => k.impressions > 10 && k.position <= 20 && k.ctr < 5)
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 20);

    return Response.json({
      siteUrl,
      dateRange: { start: fmt(startDate), end: fmt(endDate) },
      topCoffeeKeywords: coffeeKeywords.slice(0, 50),
      topByClicks: allKeywords.slice(0, 20),
      opportunities,
      totalRows: rows.length,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});