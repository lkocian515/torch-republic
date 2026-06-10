import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // Get all customers from Shopify
        const response = await base44.functions.invoke('fetchShopifyCustomers', {});
        
        if (!response.data?.customers) {
            return Response.json({ error: 'Failed to fetch customers' }, { status: 500 });
        }

        const customers = response.data.customers;
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

        let winbackCount = 0;
        let vipCount = 0;
        let newCustomerCount = 0;

        for (const customer of customers) {
            if (!customer.email) continue;

            const lastOrderDate = customer.last_order_date ? new Date(customer.last_order_date) : null;
            const totalSpent = parseFloat(customer.total_spent || '0');
            const ordersCount = customer.orders_count || 0;

            // Check if already in EmailCampaign
            const existing = await base44.entities.EmailCampaign.filter({
                recipient_email: customer.email,
                campaign_name: 'Lifecycle Segmentation',
            });

            if (existing.length > 0) continue; // Already processed

            let segment = '';
            let campaignName = '';
            let emailNumber = 1;

            // VIP Customers (3+ orders OR $300+ lifetime)
            if (ordersCount >= 3 || totalSpent >= 300) {
                segment = 'vip';
                campaignName = 'VIP Rewards';
                vipCount++;
            }
            // Win-back (no order in 30-90 days)
            else if (lastOrderDate && lastOrderDate < thirtyDaysAgo && lastOrderDate > ninetyDaysAgo) {
                segment = 'winback';
                campaignName = 'Win-Back Campaign';
                emailNumber = 1;
                winbackCount++;
            }
            // New Customer (first order within 30 days)
            else if (lastOrderDate && lastOrderDate > thirtyDaysAgo && ordersCount === 1) {
                segment = 'new_customer';
                campaignName = 'New Customer Welcome';
                emailNumber = 1;
                newCustomerCount++;
            }

            if (!segment) continue;

            // Create EmailCampaign record
            await base44.entities.EmailCampaign.create({
                recipient_email: customer.email,
                customer_name: customer.first_name || customer.email.split('@')[0],
                segment: segment,
                campaign_name: campaignName,
                email_number: emailNumber,
                sent_date: now.toISOString(),
                status: 'sent',
                description: `Lifecycle segment: ${segment}, Orders: ${ordersCount}, Spent: $${totalSpent}`,
            });
        }

        return Response.json({
            success: true,
            message: 'Customer lifecycle segmentation complete',
            counts: {
                vip: vipCount,
                winback: winbackCount,
                new_customer: newCustomerCount,
            },
        });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});