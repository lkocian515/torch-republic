import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // Verify admin access
        const user = await base44.auth.me();
        if (user?.role !== 'admin') {
            return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
        }

        // Fetch all customers from Shopify using latest stable API
        const SHOPIFY_TOKEN = Deno.env.get('SHOPIFY_ADMIN_TOKEN');
        const SHOPIFY_STORE = 'torch-republic-coffee-company.myshopify.com';
        
        const response = await fetch(`https://${SHOPIFY_STORE}/admin/api/2024-10/customers.json?limit=250`, {
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

        // Segment customers
        const segmented = {
            previousPurchasers: customers.filter(c => c.orders_count > 0),
            emailSubscribers: customers.filter(c => c.accepts_marketing && c.orders_count === 0),
            abandonedCart: customers.filter(c => 
                c.orders_count === 0 && !c.accepts_marketing
            ),
        };

        // Import into Customer entity (only fields that exist in the schema)
        const customerRecords = customers.map(c => ({
            customer_id: c.id.toString(),
            first_name: c.first_name || '',
            last_name: c.last_name || '',
            email: c.email,
            accepts_email_marketing: c.accepts_marketing || false,
            total_spent: parseFloat(c.total_spent) || 0,
            total_orders: c.orders_count || 0,
            city: c.default_address?.city || '',
            province_code: c.default_address?.province_code || '',
            country_code: c.default_address?.country_code || '',
            phone: c.phone || '',
        }));

        // Bulk create customers
        if (customerRecords.length > 0) {
            await base44.asServiceRole.entities.Customer.bulkCreate(customerRecords);
        }

        return Response.json({
            success: true,
            data: {
                totalCustomers: customers.length,
                segments: {
                    previousPurchasers: segmented.previousPurchasers.length,
                    emailSubscribers: segmented.emailSubscribers.length,
                    abandonedCart: segmented.abandonedCart.length,
                }
            },
            message: `Successfully imported ${customers.length} customers into database`,
        });
    } catch (error) {
        return Response.json({ 
            error: error.message,
            success: false 
        }, { status: 500 });
    }
});