import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // Get customers with conversions (repeat purchasers)
        const allCampaigns = await base44.entities.EmailCampaign.filter({
            converted: true,
        });

        // Group by email to find repeat customers
        const customerOrders = {};
        allCampaigns.forEach(c => {
            if (c.converted && c.revenue > 0) {
                if (!customerOrders[c.recipient_email]) {
                    customerOrders[c.recipient_email] = {
                        email: c.recipient_email,
                        name: c.customer_name,
                        orders: 0,
                        totalRevenue: 0,
                    };
                }
                customerOrders[c.recipient_email].orders++;
                customerOrders[c.recipient_email].totalRevenue += c.revenue;
            }
        });

        // Filter for VIP (2+ orders)
        const vipCustomers = Object.values(customerOrders).filter(c => c.orders >= 2);
        
        let sentCount = 0;
        let failedCount = 0;

        for (const vip of vipCustomers) {
            // Check if already sent VIP email
            const alreadySent = await base44.entities.EmailCampaign.filter({
                recipient_email: vip.email,
                campaign_name: 'VIP Rewards Program',
            });

            if (alreadySent.length > 0) continue;

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
                <table role="presentation" style="max-width: 600px; border-collapse: collapse; background-color: #1A1A1A; border: 1px solid rgba(230,183,173,0.15);">
                    <tr>
                        <td style="padding: 40px 30px;">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <span style="font-size: 32px;">&#128293;</span>
                            </div>
                            
                            <h1 style="font-size: 28px; font-weight: 700; color: #E6B7AD; margin: 0 0 15px 0; text-align: center;">You're a Torchbearer, ${vip.name || vip.email.split('@')[0]}!</h1>
                            
                            <p style="font-size: 15px; line-height: 1.6; color: rgba(247,241,232,0.7); margin: 0 0 30px 0; text-align: center;">
                                As one of our most loyal customers, you're invited to join our exclusive VIP rewards program.
                            </p>

                            <table role="presentation" style="width: 100%; margin: 30px 0; background-color: rgba(230,183,173,0.05); border: 1px solid rgba(230,183,173,0.1); border-radius: 8px;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <p style="font-size: 13px; font-weight: 700; color: #E6B7AD; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 0.1em;">VIP Benefits:</p>
                                        <ul style="font-size: 13px; color: rgba(247,241,232,0.6); margin: 0; padding-left: 20px; line-height: 1.8;">
                                            <li>Early access to new blends & limited editions</li>
                                            <li>Exclusive 25% discount on all orders</li>
                                            <li>Free shipping on every order (no minimum)</li>
                                            <li>Birthday gift: Free limited-edition product</li>
                                            <li>Priority customer support</li>
                                        </ul>
                                    </td>
                                </tr>
                            </table>

                            <table role="presentation" style="width: 100%; margin: 30px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="https://torchrepublic.com/torchbearers-rewards?utm_source=email&utm_medium=vip" 
                                           style="display: inline-block; padding: 16px 40px; background-color: #E6B7AD; color: #080808; text-decoration: none; font-size: 14px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; border-radius: 4px;">
                                            Activate VIP Status
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="font-size: 12px; line-height: 1.6; color: rgba(247,241,232,0.4); margin: 30px 0 0 0; text-align: center;">
                                Thank you for being part of the Torch Republic. Your support means everything.
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
                    to: vip.email,
                    subject: 'You\'re Invited: Exclusive VIP Rewards Program',
                    html: html,
                });

                await base44.entities.EmailCampaign.create({
                    recipient_email: vip.email,
                    customer_name: vip.name,
                    segment: 'vip',
                    campaign_name: 'VIP Rewards Program',
                    email_number: 1,
                    sent_date: new Date().toISOString(),
                    status: 'sent',
                    description: 'VIP invitation: ' + vip.orders + ' orders, $' + vip.totalRevenue.toFixed(2) + ' lifetime value',
                });

                sentCount++;
            } catch (error) {
                console.error('Failed to send to ' + vip.email + ':', error);
                failedCount++;
            }
        }

        return Response.json({
            success: true,
            sent: sentCount,
            failed: failedCount,
            totalVIPs: vipCustomers.length,
        });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});