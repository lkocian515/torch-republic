import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import { EMAIL_TEMPLATES } from '../../shared/emailTemplates.js';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // Verify admin access
        const user = await base44.auth.me();
        if (user?.role !== 'admin') {
            return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
        }

        const { segment, emailNumber } = await req.json();

        if (!segment || !emailNumber) {
            return Response.json({ error: 'Missing required fields: segment, emailNumber' }, { status: 400 });
        }

        // Fetch customer data
        const customersResponse = await base44.functions.invoke('fetchShopifyCustomers', {});
        if (!customersResponse.data?.success) {
            throw new Error('Failed to fetch customers');
        }

        const customers = customersResponse.data.data.segments[segment] || [];
        
        let template;
        let subject;
        
        if (emailNumber === 1) {
            template = EMAIL_TEMPLATES.relaunch;
            subject = EMAIL_TEMPLATES.relaunch.subject;
        } else if (emailNumber === 2) {
            template = EMAIL_TEMPLATES.bestSellers;
            subject = EMAIL_TEMPLATES.bestSellers.subject;
        } else if (emailNumber === 3) {
            template = EMAIL_TEMPLATES.lastChance;
            subject = EMAIL_TEMPLATES.lastChance.subject;
        }

        if (!template) {
            return Response.json({ error: 'Invalid email number' }, { status: 400 });
        }

        // Send emails to each customer in the segment
        const results = {
            total: customers.length,
            sent: 0,
            failed: 0,
            errors: [],
        };

        for (const customer of customers) {
            try {
                const html = template.html(customer.name || '');
                
                await base44.functions.invoke('sendRelaunchEmail', {
                    to: customer.email,
                    subject,
                    html,
                    customerName: customer.name,
                    segment,
                });
                
                results.sent++;
            } catch (error) {
                results.failed++;
                results.errors.push({
                    email: customer.email,
                    error: error.message,
                });
            }
        }

        return Response.json({
            success: true,
            results,
            message: `Sent ${results.sent}/${results.total} emails to ${segment} segment`,
        });
    } catch (error) {
        return Response.json({ 
            error: error.message,
            success: false 
        }, { status: 500 });
    }
});