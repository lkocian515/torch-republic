import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import { EMAIL_TEMPLATES } from '../../shared/emailTemplates.js';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // This is an admin-only scheduled automation
        const user = await base44.auth.me();
        if (user?.role !== 'admin') {
            return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
        }

        // Fetch customers who received Email #1 but not Email #3
        const email1Recipients = await base44.entities.EmailCampaign.filter({
            campaign_name: 'Torch Republic Relaunch',
            email_number: 1,
        });

        const email1Ids = new Set(email1Recipients.map(e => e.recipient_email));
        
        const email3Recipients = await base44.entities.EmailCampaign.filter({
            campaign_name: 'Torch Republic Relaunch',
            email_number: 3,
        });

        const email3Ids = new Set(email3Recipients.map(e => e.recipient_email));

        // Find customers who should receive Email #3 (received #1 but not #3, and it's been 7+ days)
        const eligibleForEmail3 = email1Recipients.filter(e => 
            !email3Ids.has(e.recipient_email) &&
            new Date(e.sent_date) <= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
        );

        if (eligibleForEmail3.length === 0) {
            return Response.json({
                success: true,
                message: 'No customers eligible for Email #3 at this time',
                count: 0,
            });
        }

        const template = EMAIL_TEMPLATES.lastChance;
        const subject = EMAIL_TEMPLATES.lastChance.subject;

        let sent = 0;
        let failed = 0;

        for (const record of eligibleForEmail3) {
            try {
                const html = template.html(record.customer_name || '');
                
                await base44.functions.invoke('sendRelaunchEmail', {
                    to: record.recipient_email,
                    subject,
                    html,
                    customerName: record.customer_name,
                    segment: record.segment,
                });

                // Create Email #3 record
                await base44.entities.EmailCampaign.create({
                    recipient_email: record.recipient_email,
                    customer_name: record.customer_name,
                    segment: record.segment,
                    campaign_name: 'Torch Republic Relaunch',
                    email_number: 3,
                    sent_date: new Date().toISOString(),
                    status: 'sent',
                });

                sent++;
            } catch (error) {
                failed++;
                console.error(`Failed to send to ${record.recipient_email}:`, error);
            }
        }

        return Response.json({
            success: true,
            message: `Sent ${sent} Email #3 messages`,
            sent,
            failed,
        });
    } catch (error) {
        return Response.json({ 
            error: error.message,
            success: false 
        }, { status: 500 });
    }
});