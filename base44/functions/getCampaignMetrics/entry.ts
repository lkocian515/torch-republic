import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // Verify admin access
        const user = await base44.auth.me();
        if (user?.role !== 'admin') {
            return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
        }

        // Fetch all email campaign records
        const campaigns = await base44.entities.EmailCampaign.filter({
            campaign_name: 'Torch Republic Relaunch',
        });

        // Calculate metrics
        const metrics = {
            totalSent: campaigns.length,
            totalOpened: campaigns.filter(c => c.opened).length,
            totalClicked: campaigns.filter(c => c.clicked).length,
            totalConverted: campaigns.filter(c => c.converted).length,
            totalRevenue: campaigns.reduce((sum, c) => sum + (c.revenue || 0), 0),
            byEmail: {},
            bySegment: {},
        };

        // Break down by email number
        [1, 2, 3].forEach(num => {
            const emails = campaigns.filter(c => c.email_number === num);
            metrics.byEmail[num] = {
                sent: emails.length,
                opened: emails.filter(c => c.opened).length,
                clicked: emails.filter(c => c.clicked).length,
                converted: emails.filter(c => c.converted).length,
                revenue: emails.reduce((sum, c) => sum + (c.revenue || 0), 0),
                openRate: emails.length > 0 ? (emails.filter(c => c.opened).length / emails.length * 100).toFixed(2) : 0,
                clickRate: emails.length > 0 ? (emails.filter(c => c.clicked).length / emails.length * 100).toFixed(2) : 0,
                conversionRate: emails.length > 0 ? (emails.filter(c => c.converted).length / emails.length * 100).toFixed(2) : 0,
            };
        });

        // Break down by segment
        ['previousPurchasers', 'emailSubscribers', 'abandonedCart'].forEach(segment => {
            const emails = campaigns.filter(c => c.segment === segment);
            metrics.bySegment[segment] = {
                sent: emails.length,
                opened: emails.filter(c => c.opened).length,
                clicked: emails.filter(c => c.clicked).length,
                converted: emails.filter(c => c.converted).length,
                revenue: emails.reduce((sum, c) => sum + (c.revenue || 0), 0),
                openRate: emails.length > 0 ? (emails.filter(c => c.opened).length / emails.length * 100).toFixed(2) : 0,
                clickRate: emails.length > 0 ? (emails.filter(c => c.clicked).length / emails.length * 100).toFixed(2) : 0,
                conversionRate: emails.length > 0 ? (emails.filter(c => c.converted).length / emails.length * 100).toFixed(2) : 0,
            };
        });

        // Overall rates
        metrics.overallOpenRate = metrics.totalSent > 0 ? (metrics.totalOpened / metrics.totalSent * 100).toFixed(2) : 0;
        metrics.overallClickRate = metrics.totalSent > 0 ? (metrics.totalClicked / metrics.totalSent * 100).toFixed(2) : 0;
        metrics.overallConversionRate = metrics.totalSent > 0 ? (metrics.totalConverted / metrics.totalSent * 100).toFixed(2) : 0;
        metrics.revenuePerEmail = metrics.totalSent > 0 ? (metrics.totalRevenue / metrics.totalSent).toFixed(2) : 0;

        return Response.json({
            success: true,
            data: metrics,
            generatedAt: new Date().toISOString(),
        });
    } catch (error) {
        return Response.json({ 
            error: error.message,
            success: false 
        }, { status: 500 });
    }
});