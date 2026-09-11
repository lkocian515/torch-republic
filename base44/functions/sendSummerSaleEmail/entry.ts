import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);

        // Verify admin access
        const user = await base44.auth.me();
        if (user?.role !== 'admin') {
            return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
        }

        const { to, subject, html, customerName, emailNumber } = await req.json();

        if (!to || !subject || !html) {
            return Response.json({ error: 'Missing required fields: to, subject, html' }, { status: 400 });
        }

        // Use Base44 SendEmail integration
        const emailResult = await base44.asServiceRole.integrations.Core.SendEmail({
            to,
            subject,
            body: html,
        });

        // Log email send to EmailCampaign entity
        try {
            await base44.asServiceRole.entities.EmailCampaign.create({
                recipient_email: to,
                customer_name: customerName || '',
                segment: 'allCustomers',
                campaign_name: 'Summer Sale 2026',
                email_number: emailNumber || 1,
                sent_date: new Date().toISOString(),
                status: 'sent',
            });
        } catch (e) {
            console.log('EmailCampaign entity log failed:', e.message);
        }

        return Response.json({
            success: true,
            messageId: emailResult.message_id || 'sent',
            recipient: to,
        });
    } catch (error) {
        return Response.json({
            error: error.message,
            success: false
        }, { status: 500 });
    }
});