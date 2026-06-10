import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // Verify admin access
        const user = await base44.auth.me();
        if (user?.role !== 'admin') {
            return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
        }

        // Fetch all existing EmailCampaign records
        const existingRecords = await base44.entities.EmailCampaign.list();
        
        // Segment customers based on their purchase history
        const segments = {
            previousPurchasers: [],
            emailSubscribers: [],
            abandonedCart: [],
        };

        // Group by unique email
        const emailMap = new Map();
        
        console.log('Total records:', existingRecords.length);
        console.log('First record:', JSON.stringify(existingRecords[0]));
        
        existingRecords.forEach(record => {
            const email = record?.data?.recipient_email;
            if (!email || !email.includes('@')) return;
            
            // Skip if already processed
            if (emailMap.has(email)) return;
            
            const customerData = {
                email: email,
                name: record.data.customer_name || '',
                totalSpent: record.data.revenue || 0,
                ordersCount: record.data.converted ? 1 : 0,
            };

            // Segment based on purchase history
            if (customerData.ordersCount > 0 || customerData.totalSpent > 0) {
                segments.previousPurchasers.push(customerData);
            } else if (record.data.segment === 'emailSubscribers') {
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
            message: `Successfully segmented ${emailMap.size} customers`,
        });
    } catch (error) {
        return Response.json({ 
            error: error.message,
            success: false 
        }, { status: 500 });
    }
});