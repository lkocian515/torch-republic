import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('google_analytics');

    // 1. Discover the first GA4 property
    const summariesRes = await fetch('https://analyticsadmin.googleapis.com/v1beta/accountSummaries', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const summariesData = await summariesRes.json();

    if (summariesData.error) {
      return Response.json({ error: summariesData.error.message }, { status: 500 });
    }

    const accounts = summariesData.accountSummaries || [];
    if (!accounts.length || !accounts[0].propertySummaries?.length) {
      return Response.json({ 
        error: 'No GA4 properties found for this account.',
        debug_accounts: accounts.map(a => ({ name: a.displayName, id: a.account }))
      }, { status: 404 });
    }

    // Use the first property (e.g. "properties/123456789")
    const propertyResource = accounts[0].propertySummaries[0].property;
    const propertyName = accounts[0].propertySummaries[0].displayName;
    const propertyId = propertyResource.replace('properties/', '');

    // 2. Query top traffic sources for product pages (paths matching /products/ or /blends/ or /torchbearer)
    const reportRes = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        dimensions: [
          { name: 'sessionDefaultChannelGroup' },
          { name: 'sessionSourceMedium' }
        ],
        metrics: [
          { name: 'sessions' },
          { name: 'totalUsers' },
          { name: 'screenPageViews' }
        ],
        dimensionFilter: {
          orGroup: {
            expressions: [
              { filter: { fieldName: 'pagePath', stringFilter: { matchType: 'CONTAINS', value: '/products/' } } },
              { filter: { fieldName: 'pagePath', stringFilter: { matchType: 'CONTAINS', value: '/blends/' } } },
              { filter: { fieldName: 'pagePath', stringFilter: { matchType: 'BEGINS_WITH', value: '/torchbearer' } } }
            ]
          }
        },
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 20
      })
    });

    const reportData = await reportRes.json();

    if (reportData.error) {
      return Response.json({ error: reportData.error.message }, { status: 500 });
    }

    // 3. Also get top product pages by views
    const pagesRes = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
        metrics: [{ name: 'screenPageViews' }, { name: 'totalUsers' }],
        dimensionFilter: {
          orGroup: {
            expressions: [
              { filter: { fieldName: 'pagePath', stringFilter: { matchType: 'CONTAINS', value: '/products/' } } },
              { filter: { fieldName: 'pagePath', stringFilter: { matchType: 'CONTAINS', value: '/blends/' } } },
              { filter: { fieldName: 'pagePath', stringFilter: { matchType: 'BEGINS_WITH', value: '/torchbearer' } } }
            ]
          }
        },
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 10
      })
    });

    const pagesData = await pagesRes.json();

    const rows = (reportData.rows || []).map(row => ({
      channel: row.dimensionValues[0].value,
      sourceMedium: row.dimensionValues[1].value,
      sessions: parseInt(row.metricValues[0].value),
      users: parseInt(row.metricValues[1].value),
      pageViews: parseInt(row.metricValues[2].value)
    }));

    // Aggregate by channel
    const channelMap = {};
    rows.forEach(r => {
      if (!channelMap[r.channel]) {
        channelMap[r.channel] = { channel: r.channel, sessions: 0, users: 0, pageViews: 0, sources: [] };
      }
      channelMap[r.channel].sessions += r.sessions;
      channelMap[r.channel].users += r.users;
      channelMap[r.channel].pageViews += r.pageViews;
      channelMap[r.channel].sources.push({ sourceMedium: r.sourceMedium, sessions: r.sessions });
    });

    const channels = Object.values(channelMap).sort((a, b) => b.sessions - a.sessions);
    const totalSessions = channels.reduce((sum, c) => sum + c.sessions, 0);
    const channelsWithPercent = channels.map(c => ({
      ...c,
      percent: totalSessions > 0 ? Math.round((c.sessions / totalSessions) * 100) : 0
    }));

    const topPages = (pagesData.rows || []).map(row => ({
      path: row.dimensionValues[0].value,
      title: row.dimensionValues[1].value,
      pageViews: parseInt(row.metricValues[0].value),
      users: parseInt(row.metricValues[1].value)
    }));

    return Response.json({
      property: propertyName,
      period: 'Last 30 days',
      totalSessions,
      channels: channelsWithPercent,
      topPages
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});