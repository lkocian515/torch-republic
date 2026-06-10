import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // Verify admin access
        const user = await base44.auth.me();
        if (user?.role !== 'admin') {
            return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
        }

        // Fetch all customers from Customer entity
        const customers = await base44.entities.Customer.list();
        
        console.log('=== SEGMENTATION START ===');
        console.log('Total customers fetched:', customers.length);
        if (customers.length > 0) {
            console.log('First customer structure:', JSON.stringify(customers[0], null, 2));
        }
        
        // Segment customers based on their purchase history
        const segments = {
            previousPurchasers: [],
            emailSubscribers: [],
            abandonedCart: [],
        };

        // Group by unique email
        const emailMap = new Map();
        
        customers.forEach(customer => {
            // Customer entity returns flat data (not wrapped in .data)
            const email = customer?.email;
            if (!email || !email.includes('@')) return;
            
            // Skip if already processed
            if (emailMap.has(email)) return;
            
            const name = (customer.first_name || customer.last_name) 
                ? `${customer.first_name || ''} ${customer.last_name || ''}`.trim()
                : '';
            
            const customerData = {
                email: email,
                name: name,
                first_name: customer.first_name || '',
                last_name: customer.last_name || '',
                total_spent: customer.total_spent || 0,
                total_orders: customer.total_orders || 0,
                accepts_email_marketing: customer.accepts_email_marketing || false,
                customer_id: customer.customer_id || '',
            };

            console.log('Processing customer:', email, 'orders:', customerData.total_orders, 'spent:', customerData.total_spent, 'marketing:', customerData.accepts_email_marketing);

            // Segment based on purchase history and marketing consent
            if (customerData.total_orders > 0 || customerData.total_spent > 0) {
                segments.previousPurchasers.push(customerData);
            } else if (customerData.accepts_email_marketing) {
                segments.emailSubscribers.push(customerData);
            } else {
                segments.abandonedCart.push(customerData);
            }
            
            emailMap.set(email, true);
        });

        const result = {
            totalCustomers: emailMap.size,
            segments: {
                previousPurchasers: segments.previousPurchasers,
                emailSubscribers: segments.emailSubscribers,
                abandonedCart: segments.abandonedCart,
            },
            segmentCounts: {
                previousPurchasers: segments.previousPurchasers.length,
                emailSubscribers: segments.emailSubscribers.length,
                abandonedCart: segments.abandonedCart.length,
            },
            fetchedAt: new Date().toISOString(),
        };

        return Response.json({
            success: true,
            data: result,
            message: `Successfully segmented ${emailMap.size} customers from Customer entity`,
        });
    } catch (error) {
        return Response.json({ 
            error: error.message,
            success: false 
        }, { status: 500 });
    }
});