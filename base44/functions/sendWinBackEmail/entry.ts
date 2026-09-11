import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // Get customers who haven't purchased in 60+ days
        const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);

        // Find EmailCampaign records from 60+ days ago
        const oldCampaigns = await base44.entities.EmailCampaign.filter({
            sent_date: { $lte: sixtyDaysAgo.toISOString() },
            converted: false,
        });

        // Get unique emails
        const uniqueEmails = [...new Set(oldCampaigns.map(c => c.recipient_email))];
        
        let sentCount = 0;
        let failedCount = 0;

        for (const email of uniqueEmails) {
            // Check if already sent win-back
            const alreadySent = await base44.entities.EmailCampaign.filter({
                recipient_email: email,
                campaign_name: 'Win-Back Campaign',
            });

            if (alreadySent.length > 0) continue;

            const customerName = oldCampaigns.find(c => c.recipient_email === email)?.customer_name || email.split('@')[0];
            const trackingId = alreadySent.length > 0 ? alreadySent[0].id : 'new';

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
                            <h1 style="font-size: 28px; font-weight: 700; color: #E6B7AD; margin: 0 0 20px 0; text-align: center;">We Miss You, ${customerName}</h1>
                            
                            <p style="font-size: 16px; line-height: 1.6; color: rgba(247,241,232,0.7); margin: 0 0 30px 0; text-align: center;">
                                It's been a while since your last Torch Republic ritual. We'd love to welcome you back with an exclusive offer.
                            </p>

                            <table role="presentation" style="width: 100%; margin: 30px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="https://torchrepublic.com?utm_source=email&utm_medium=winback" 
                                           style="display: inline-block; padding: 16px 40px; background-color: #E6B7AD; color: #080808; text-decoration: none; font-size: 14px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; border-radius: 4px;">
                                            Return to Your Ritual →
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="font-size: 14px; line-height: 1.6; color: rgba(247,241,232,0.5); margin: 30px 0 0 0; text-align: center;">
                                Use code <strong style="color: #E6B7AD;">WELCOME20</strong> for 20% off your next order.
                            </p>

                            <table role="presentation" style="width: 100%; margin-top: 40px; border-top: 1px solid rgba(230,183,173,0.1);">
                                <tr>
                                    <td style="padding-top: 30px; text-align: center;">
                                        <p style="font-size: 12px; color: rgba(247,241,232,0.4); margin: 0;">
                                            Torch Republic Coffee Company<br>
                                            Functional Mushroom Coffee & Wellness
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Tracking Pixel -->
                            <img src="https://your-app.base44.app/functions/trackEmail?email_id=${trackingId}&type=open" width="1" height="1" style="display: none;" />
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
                await base44.asServiceRole.integrations.Core.SendEmail({
                    to: email,
                    subject: 'We Miss You — Come Back to Your Ritual',
                    html: html,
                });

                await base44.entities.EmailCampaign.create({
                    recipient_email: email,
                    customer_name: customerName,
                    segment: 'winback',
                    campaign_name: 'Win-Back Campaign',
                    email_number: 1,
                    sent_date: new Date().toISOString(),
                    status: 'sent',
                    description: 'Win-back: 60+ days inactive, 20% off incentive',
                });

                sentCount++;
            } catch (error) {
                console.error(`Failed to send to ${email}:`, error);
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