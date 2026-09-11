import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // Verify admin access
        const user = await base44.auth.me();
        if (user?.role !== 'admin') {
            return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
        }

        const { to, subject, html, customerName, segment } = await req.json();

        if (!to || !subject || !html) {
            return Response.json({ error: 'Missing required fields: to, subject, html' }, { status: 400 });
        }

        // Use Base44 SendEmail integration
        const emailResult = await base44.asServiceRole.integrations.Core.SendEmail({
            to,
            subject,
            html,
        });

        // Log email send to EmailCampaign entity if it exists
        try {
            await base44.entities.EmailCampaign.create({
                recipient_email: to,
                segment,
                customer_name: customerName || '',
                sent_date: new Date().toISOString(),
                campaign_name: 'Torch Republic Relaunch',
                email_number: 1,
                status: 'sent',
            });
        } catch (e) {
            // Entity might not exist yet
            console.log('EmailCampaign entity not available:', e.message);
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