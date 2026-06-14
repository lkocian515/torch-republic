import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const GA4_PROPERTY_ID = '525961514';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('google_analytics');

    const body = req.method === 'POST' ? await req.json() : {};
    const days = body.days || 28;
    const startDate = `${days}daysAgo`;

    const response = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${GA4_PROPERTY_ID}:runReport`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dateRanges: [{ startDate, endDate: 'today' }],
          metrics: [
            { name: 'sessions' },
            { name: 'activeUsers' },
            { name: 'screenPageViews' },
            { name: 'bounceRate' },
            { name: 'averageSessionDuration' },
            { name: 'newUsers' },
          ],
          dimensions: [],
        }),
      }
    );

    const overviewData = await response.json();

    // Traffic by channel
    const channelResponse = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${GA4_PROPERTY_ID}:runReport`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dateRanges: [{ startDate, endDate: 'today' }],
          metrics: [{ name: 'sessions' }, { name: 'activeUsers' }],
          dimensions: [{ name: 'sessionDefaultChannelGroup' }],
          orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
          limit: 8,
        }),
      }
    );
    const channelData = await channelResponse.json();

    // Top pages
    const pagesResponse = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${GA4_PROPERTY_ID}:runReport`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dateRanges: [{ startDate, endDate: 'today' }],
          metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }],
          dimensions: [{ name: 'pagePath' }],
          orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
          limit: 10,
        }),
      }
    );
    const pagesData = await pagesResponse.json();

    // Parse overview metrics
    const metricValues = overviewData.rows?.[0]?.metricValues || [];
    const metricHeaders = overviewData.metricHeaders || [];
    const metrics = {};
    metricHeaders.forEach((h, i) => {
      metrics[h.name] = metricValues[i]?.value || '0';
    });

    // Parse channels
    const channels = (channelData.rows || []).map(row => ({
      channel: row.dimensionValues?.[0]?.value || 'Unknown',
      sessions: parseInt(row.metricValues?.[0]?.value || '0'),
      users: parseInt(row.metricValues?.[1]?.value || '0'),
    }));

    // Parse pages
    const topPages = (pagesData.rows || []).map(row => ({
      path: row.dimensionValues?.[0]?.value || '/',
      pageViews: parseInt(row.metricValues?.[0]?.value || '0'),
      users: parseInt(row.metricValues?.[1]?.value || '0'),
    }));

    return Response.json({
      connected: true,
      overview: {
        sessions: parseInt(metrics.sessions || '0'),
        activeUsers: parseInt(metrics.activeUsers || '0'),
        pageViews: parseInt(metrics.screenPageViews || '0'),
        newUsers: parseInt(metrics.newUsers || '0'),
        bounceRate: parseFloat(metrics.bounceRate || '0'),
        avgSessionDuration: parseFloat(metrics.averageSessionDuration || '0'),
      },
      channels,
      topPages,
    });
  } catch (error) {
    return Response.json({ error: error.message, connected: false }, { status: 500 });
  }
});