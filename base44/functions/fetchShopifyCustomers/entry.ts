import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // Verify admin access
        const user = await base44.auth.me();
        if (user?.role !== 'admin') {
            return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
        }

        const SHOPIFY_TOKEN = Deno.env.get('SHOPIFY_ADMIN_TOKEN');
        const SHOPIFY_STORE = 'torch-republic-coffee-company.myshopify.com';
        
        console.log('Store:', SHOPIFY_STORE);
        
        // Fetch all customers from Shopify using latest stable API
        const url = `https://${SHOPIFY_STORE}/admin/api/2024-10/customers.json?limit=250`;
        console.log('Request URL:', url);
        
        const response = await fetch(url, {
            headers: {
                'X-Shopify-Access-Token': SHOPIFY_TOKEN,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Shopify API error: ${response.status}`);
        }

        const data = await response.json();
        const customers = data.customers || [];

        console.log('Shopify customers fetched:', customers.length);

        // Segment customers
        const segmented = {
            previousPurchasers: customers.filter(c => c.orders_count > 0),
            emailSubscribers: customers.filter(c => c.accepts_marketing && c.orders_count === 0),
            abandonedCart: customers.filter(c => 
                c.orders_count === 0 && c.marketing_opt_in_level === 'single_opt_in'
            ),
        };

        // Prepare customer data for email campaign
        const campaignData = {
            totalCustomers: customers.length,
            segments: {
                previousPurchasers: segmented.previousPurchasers.map(c => ({
                    email: c.email,
                    name: c.first_name || c.default_address?.first_name || '',
                    totalSpent: c.total_spent,
                    ordersCount: c.orders_count,
                    lastOrderDate: c.last_order_id ? 'previous_customer' : null,
                })),
                emailSubscribers: segmented.emailSubscribers.map(c => ({
                    email: c.email,
                    name: c.first_name || '',
                    subscribedDate: c.created_at,
                })),
                abandonedCart: segmented.abandonedCart.map(c => ({
                    email: c.email,
                    name: c.first_name || '',
                    cartDate: c.updated_at,
                })),
            },
            fetchedAt: new Date().toISOString(),
        };

        return Response.json({
            success: true,
            data: campaignData,
            message: `Successfully fetched ${customers.length} customers from Shopify`,
        });
    } catch (error) {
        return Response.json({ 
            error: error.message,
            success: false 
        }, { status: 500 });
    }
});