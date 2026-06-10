import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // Get new customers who received welcome email 7 days ago
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

        const campaigns = await base44.entities.EmailCampaign.filter({
            campaign_name: 'New Customer Welcome',
            email_number: 1,
            status: 'sent',
            sent_date: { $lte: sevenDaysAgo.toISOString() },
        });

        let sentCount = 0;
        let failedCount = 0;

        for (const campaign of campaigns) {
            // Check if already sent onboarding email
            const alreadySent = await base44.entities.EmailCampaign.filter({
                recipient_email: campaign.recipient_email,
                campaign_name: 'New Customer Onboarding',
            });

            if (alreadySent.length > 0) continue;

            const customerName = campaign.customer_name || campaign.recipient_email.split('@')[0];

            const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #080808; color: #F7F1E8;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; border-collapse: collapse; background-color: #1A1A1A; border: 1px solid rgba(230,183,173,0.1);">
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h1 style="font-size: 26px; font-weight: 700; color: #E6B7AD; margin: 0 0 20px 0; text-align: center;">Getting the Most from Your Ritual, ${customerName}?</h1>
                            
                            <p style="font-size: 16px; line-height: 1.6; color: rgba(247,241,232,0.7); margin: 0 0 20px 0; text-align: center;">
                                You've been part of the Torch Republic for a week now. Here's how to make your ritual even better.
                            </p>

                            <table role="presentation" style="width: 100%; margin: 30px 0;">
                                <tr>
                                    <td style="padding: 15px; background-color: rgba(230,183,173,0.05); border-left: 3px solid #E6B7AD; margin-bottom: 15px;">
                                        <p style="font-size: 14px; font-weight: 600; color: #E6B7AD; margin: 0 0 8px 0;">☀️ Morning Ritual</p>
                                        <p style="font-size: 13px; color: rgba(247,241,232,0.6); margin: 0;">Start your day with GlowMind or Lions Mane for focused energy without the crash.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 15px; background-color: rgba(230,183,173,0.05); border-left: 3px solid #E6B7AD; margin-bottom: 15px;">
                                        <p style="font-size: 14px; font-weight: 600; color: #E6B7AD; margin: 0 0 8px 0;">🌙 Evening Wind-Down</p>
                                        <p style="font-size: 13px; color: rgba(247,241,232,0.6); margin: 0;">Try DreamCap in the evening to support restful sleep and recovery.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 15px; background-color: rgba(230,183,173,0.05); border-left: 3px solid #E6B7AD;">
                                        <p style="font-size: 14px; font-weight: 600; color: #E6B7AD; margin: 0 0 8px 0;">💧 Pro Tip</p>
                                        <p style="font-size: 13px; color: rgba(247,241,232,0.6); margin: 0;">Mix with your favorite creamer or milk for a creamier texture. Works hot or iced!</p>
                                    </td>
                                </tr>
                            </table>

                            <table role="presentation" style="width: 100%; margin: 30px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="https://torchrepublic.com/recipes?utm_source=email&utm_medium=onboarding" 
                                           style="display: inline-block; padding: 14px 32px; background-color: transparent; color: #E6B7AD; text-decoration: none; font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; border: 1px solid rgba(230,183,173,0.3); border-radius: 4px;">
                                            Explore Recipes →
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="font-size: 12px; line-height: 1.6; color: rgba(247,241,232,0.4); margin: 30px 0 0 0; text-align: center;">
                                Questions? Reply to this email — we're here to help.<br>
                                — The Torch Republic Team
                            </p>

                            <table role="presentation" style="width: 100%; margin-top: 40px; border-top: 1px solid rgba(230,183,173,0.1);">
                                <tr>
                                    <td style="padding-top: 30px; text-align: center;">
                                        <p style="font-size: 11px; color: rgba(247,241,232,0.3); margin: 0;">
                                            Torch Republic Coffee Company
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Tracking Pixel -->
                            <img src="https://your-app.base44.app/functions/trackEmail?email_id=${campaign.id}&type=open" width="1" height="1" style="display: none;" />
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
            `;

            try {
                await base44.integrations.Core.SendEmail({
                    to: campaign.recipient_email,
                    subject: 'Getting the Most from Your Ritual?',
                    html: html,
                });

                await base44.entities.EmailCampaign.create({
                    recipient_email: campaign.recipient_email,
                    customer_name: campaign.customer_name,
                    segment: 'new_customer',
                    campaign_name: 'New Customer Onboarding',
                    email_number: 2,
                    sent_date: new Date().toISOString(),
                    status: 'sent',
                    description: 'Day 7 onboarding: Ritual tips and recipes',
                });

                sentCount++;
            } catch (error) {
                console.error(`Failed to send to ${campaign.recipient_email}:`, error);
                failedCount++;
            }
        }

        return Response.json({
            success: true,
            sent: sentCount,
            failed: failedCount,
        });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});