import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('google_analytics');

    // First, list GA4 properties
    const propertiesRes = await fetch('https://analyticsadmin.googleapis.com/v1beta/accountSummaries', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const propertiesData = await propertiesRes.json();

    return Response.json({ debug: propertiesData });

    // Query traffic sources (last 30 days)
    const reportRes = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'sessionDefaultChannelGroup' }],
        metrics: [{ name: 'sessions' }, { name: 'totalUsers' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 10
      })
    });

    const reportData = await reportRes.json();

    if (reportData.error) {
      return Response.json({ error: reportData.error.message }, { status: 500 });
    }

    const rows = (reportData.rows || []).map(row => ({
      channel: row.dimensionValues[0].value,
      sessions: parseInt(row.metricValues[0].value),
      users: parseInt(row.metricValues[1].value)
    }));

    const totalSessions = rows.reduce((sum, r) => sum + r.sessions, 0);
    const rowsWithPercent = rows.map(r => ({
      ...r,
      percent: totalSessions > 0 ? Math.round((r.sessions / totalSessions) * 100) : 0
    }));

    return Response.json({
      property: propertyName,
      period: 'Last 30 days',
      totalSessions,
      channels: rowsWithPercent
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});