import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// ── Weekly Best Sellers Rotation Templates (inlined — no local imports in Deno Deploy) ──
const LOGO_URL = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/ea7e0190c_torch_republic_primary_refined_gradient_4000px.png';
const TORCHBEARER_IMG = 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/15_9efec3d4-7d73-4fd6-a4df-aba0f6cad920.png?v=1781102331';
const GLOWMIND_IMG = 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/4_21dba766-0e82-4b33-821a-3efdf847b2e9.png?v=1781102333';
const MONK_IMG = 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/18_8e5aeb4b-6266-48e5-a725-639e74310697.png?v=1781102333';

const FOOTER = `
        <tr>
            <td align="center" style="padding: 40px 20px; border-top: 1px solid rgba(230,183,173,0.1);">
                <p style="font-family: 'Courier New', monospace; font-size: 9px; letter-spacing: 0.15em; color: rgba(255,255,255,0.3); margin-bottom: 15px;">TORCH REPUBLIC COFFEE COMPANY</p>
                <p style="font-family: 'Inter', sans-serif; font-size: 12px; color: rgba(255,255,255,0.4); line-height: 1.6; margin-bottom: 15px;">Corpus Christi, Texas · U.S.A.<br><a href="mailto:info@torchrepublic.com" style="color: rgba(230,183,173,0.6); text-decoration: none;">info@torchrepublic.com</a></p>
                <p style="font-family: 'Courier New', monospace; font-size: 8px; letter-spacing: 0.1em; color: rgba(255,255,255,0.2); margin: 10px 0;">© 2026 Torch Republic Coffee Company. All rights reserved.</p>
                <p style="font-family: 'Courier New', monospace; font-size: 8px; letter-spacing: 0.1em; color: rgba(255,255,255,0.2); margin: 10px 0;">You're receiving this email because you're a valued Torch Republic customer.</p>
            </td>
        </tr>
    </table>
</body>
</html>`;

const HEADER = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Torch Republic — Best Sellers</title></head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #080808; color: #F5EFE6;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #080808;">
        <tr><td align="center" style="padding: 40px 20px 30px;"><img src="${LOGO_URL}" alt="Torch Republic" width="280" style="display: block; margin-bottom: 20px;"><p style="font-family: 'Courier New', monospace; font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(230,183,173,0.5); margin: 0;">Premium Instant Coffee · Mushroom Coffee · Matcha</p></td></tr>`;

// Three rotating templates — each spotlights a different best seller
const TEMPLATES = {
    1: {
        // Monday — Torchbearer spotlight
        subject: 'Start Your Week Bold — Torchbearer Best Seller',
        html: (name) => `${HEADER}
        <tr><td align="center" style="padding: 0 40px 40px; max-width: 600px;">
            <p style="font-family: 'Georgia', serif; font-size: 18px; line-height: 1.8; color: rgba(245,239,230,0.9); margin-bottom: 20px;">${name ? `Good morning ${name},` : 'Good morning Torchbearer,'}</p>
            <p style="font-family: 'Georgia', serif; font-size: 16px; line-height: 1.8; color: rgba(245,239,230,0.8); margin-bottom: 20px;">Every great week starts with a great cup. Our #1 best seller — <strong style="color: #D6B27A;">Torchbearer</strong> — is the bold, smooth instant coffee that thousands of customers reach for first thing.</p>
            <p style="font-family: 'Georgia', serif; font-size: 16px; line-height: 1.8; color: rgba(245,239,230,0.8); margin-bottom: 30px;">No machine, no waiting, no bitterness. Just premium Arabica in a tube you can take anywhere.</p>
        </td></tr>
        <tr><td align="center" style="padding: 0 20px 30px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background: #141312; border: 1px solid rgba(230,183,173,0.1); border-radius: 8px;"><tr>
                <td width="45%" style="padding: 20px;"><img src="${TORCHBEARER_IMG}" alt="Torchbearer" width="200" style="max-width: 100%; border-radius: 4px;"></td>
                <td width="55%" style="padding: 20px; vertical-align: top;">
                    <p style="font-family: 'Georgia', serif; font-size: 20px; color: #D6B27A; margin: 0 0 10px;">Torchbearer</p>
                    <p style="font-family: 'Courier New', monospace; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(230,183,173,0.5); margin: 0 0 15px;">Classic Instant Coffee · #1 Best Seller</p>
                    <p style="font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.6; color: rgba(245,239,230,0.7); margin: 0 0 15px;">Bold mornings & deep work. Premium instant Arabica for those who carry the flame.</p>
                    <p style="font-family: 'Inter', sans-serif; font-size: 13px; color: rgba(245,239,230,0.5); margin: 0 0 15px;">⭐⭐⭐⭐⭐ "My daily ritual starter. Bold, smooth, no bitterness." — Sarah M.</p>
                    <a href="https://torchrepublic.com/products/torchbearer" style="display: inline-block; background-color: #D6B27A; color: #080808; font-family: 'Courier New', monospace; font-size: 10px; font-weight: bold; letter-spacing: 0.2em; text-transform: uppercase; text-decoration: none; padding: 12px 24px; border-radius: 4px;">Shop Torchbearer</a>
                </td>
            </tr></table>
        </td></tr>
        <tr><td align="center" style="padding: 0 20px 50px;"><a href="https://torchrepublic.com/shop" style="display: inline-block; background-color: #E6B7AD; color: #080808; font-family: 'Courier New', monospace; font-size: 11px; font-weight: bold; letter-spacing: 0.25em; text-transform: uppercase; text-decoration: none; padding: 18px 48px; border-radius: 4px;">Shop All Best Sellers →</a></td></tr>
${FOOTER}`,
    },
    2: {
        // Wednesday — GlowMind spotlight
        subject: 'Mid-Week Focus — GlowMind Mushroom Coffee',
        html: (name) => `${HEADER}
        <tr><td align="center" style="padding: 0 40px 40px; max-width: 600px;">
            <p style="font-family: 'Georgia', serif; font-size: 18px; line-height: 1.8; color: rgba(245,239,230,0.9); margin-bottom: 20px;">${name ? `Hi ${name},` : 'Hello Torchbearer,'}</p>
            <p style="font-family: 'Georgia', serif; font-size: 16px; line-height: 1.8; color: rgba(245,239,230,0.8); margin-bottom: 20px;">Hump day calls for deep focus. Our best-selling <strong style="color: #10B981;">GlowMind Clarity</strong> blends premium coffee with Lion's Mane and Chaga mushrooms for sustained mental clarity — no crash, no jitters.</p>
            <p style="font-family: 'Georgia', serif; font-size: 16px; line-height: 1.8; color: rgba(245,239,230,0.8); margin-bottom: 30px;">It's the mushroom coffee our customers swear by for workdays, study sessions, and creative flow.</p>
        </td></tr>
        <tr><td align="center" style="padding: 0 20px 30px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background: #141312; border: 1px solid rgba(16,185,129,0.2); border-radius: 8px;"><tr>
                <td width="45%" style="padding: 20px;"><img src="${GLOWMIND_IMG}" alt="GlowMind" width="200" style="max-width: 100%; border-radius: 4px;"></td>
                <td width="55%" style="padding: 20px; vertical-align: top;">
                    <p style="font-family: 'Georgia', serif; font-size: 20px; color: #10B981; margin: 0 0 10px;">GlowMind Clarity</p>
                    <p style="font-family: 'Courier New', monospace; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(16,185,129,0.6); margin: 0 0 15px;">Mushroom Coffee · Lion's Mane + Chaga</p>
                    <p style="font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.6; color: rgba(245,239,230,0.7); margin: 0 0 15px;">Deep work & daily focus. Functional mushrooms meet premium coffee for sustained mental clarity.</p>
                    <p style="font-family: 'Inter', sans-serif; font-size: 13px; color: rgba(245,239,230,0.5); margin: 0 0 15px;">⭐⭐⭐⭐⭐ "Game-changer for my workdays. No crash, just focus." — Michael R.</p>
                    <a href="https://torchrepublic.com/products/glowmind-clarity-blend" style="display: inline-block; background-color: #10B981; color: #080808; font-family: 'Courier New', monospace; font-size: 10px; font-weight: bold; letter-spacing: 0.2em; text-transform: uppercase; text-decoration: none; padding: 12px 24px; border-radius: 4px;">Shop GlowMind</a>
                </td>
            </tr></table>
        </td></tr>
        <tr><td align="center" style="padding: 0 20px 50px;"><a href="https://torchrepublic.com/shop" style="display: inline-block; background-color: #E6B7AD; color: #080808; font-family: 'Courier New', monospace; font-size: 11px; font-weight: bold; letter-spacing: 0.25em; text-transform: uppercase; text-decoration: none; padding: 18px 48px; border-radius: 4px;">Shop All Best Sellers →</a></td></tr>
${FOOTER}`,
    },
    3: {
        // Friday — The Monk spotlight
        subject: 'Weekend Calm — The Monk Ceremonial Matcha',
        html: (name) => `${HEADER}
        <tr><td align="center" style="padding: 0 40px 40px; max-width: 600px;">
            <p style="font-family: 'Georgia', serif; font-size: 18px; line-height: 1.8; color: rgba(245,239,230,0.9); margin-bottom: 20px;">${name ? `Dear ${name},` : 'Dear Torchbearer,'}</p>
            <p style="font-family: 'Georgia', serif; font-size: 16px; line-height: 1.8; color: rgba(245,239,230,0.8); margin-bottom: 20px;">The weekend is here — time to slow down. Our best-selling <strong style="color: #6CBD5A;">The Monk</strong> is 100% ceremonial-grade matcha, prized for its smooth, earthy flavor and calm, focused energy.</p>
            <p style="font-family: 'Georgia', serif; font-size: 16px; line-height: 1.8; color: rgba(245,239,230,0.8); margin-bottom: 30px;">Perfect for a mindful morning, an afternoon reset, or a pre-meditation ritual.</p>
        </td></tr>
        <tr><td align="center" style="padding: 0 20px 30px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background: #141312; border: 1px solid rgba(108,189,90,0.2); border-radius: 8px;"><tr>
                <td width="45%" style="padding: 20px;"><img src="${MONK_IMG}" alt="The Monk" width="200" style="max-width: 100%; border-radius: 4px;"></td>
                <td width="55%" style="padding: 20px; vertical-align: top;">
                    <p style="font-family: 'Georgia', serif; font-size: 20px; color: #6CBD5A; margin: 0 0 10px;">The Monk</p>
                    <p style="font-family: 'Courier New', monospace; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(108,189,90,0.6); margin: 0 0 15px;">Ceremonial Grade Matcha · Best Seller</p>
                    <p style="font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.6; color: rgba(245,239,230,0.7); margin: 0 0 15px;">Focus, calm & presence. 100% ceremonial grade matcha for disciplined daily ritual.</p>
                    <p style="font-family: 'Inter', sans-serif; font-size: 13px; color: rgba(245,239,230,0.5); margin: 0 0 15px;">⭐⭐⭐⭐⭐ "Smooth, earthy, perfect for my morning meditation." — Jennifer L.</p>
                    <a href="https://torchrepublic.com/products/the-monk-matcha-blend" style="display: inline-block; background-color: #6CBD5A; color: #080808; font-family: 'Courier New', monospace; font-size: 10px; font-weight: bold; letter-spacing: 0.2em; text-transform: uppercase; text-decoration: none; padding: 12px 24px; border-radius: 4px;">Shop The Monk</a>
                </td>
            </tr></table>
        </td></tr>
        <tr><td align="center" style="padding: 0 20px 50px;"><a href="https://torchrepublic.com/shop" style="display: inline-block; background-color: #E6B7AD; color: #080808; font-family: 'Courier New', monospace; font-size: 11px; font-weight: bold; letter-spacing: 0.25em; text-transform: uppercase; text-decoration: none; padding: 18px 48px; border-radius: 4px;">Shop All Best Sellers →</a></td></tr>
${FOOTER}`,
    },
};

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);

        // Verify admin access
        const user = await base44.auth.me();
        if (user?.role !== 'admin') {
            return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
        }

        const { emailNumber } = await req.json();

        if (!emailNumber) {
            return Response.json({ error: 'Missing required field: emailNumber' }, { status: 400 });
        }

        const template = TEMPLATES[emailNumber];
        if (!template) {
            return Response.json({ error: 'Invalid emailNumber (must be 1, 2, or 3)' }, { status: 400 });
        }

        // Fetch ALL customers from the Customer entity
        const customers = await base44.asServiceRole.entities.Customer.list();

        if (!customers || customers.length === 0) {
            return Response.json({
                success: false,
                error: 'No customers found in database. Run "Import from Shopify" first.',
            }, { status: 400 });
        }

        // Send emails to each customer
        const results = {
            total: customers.length,
            sent: 0,
            failed: 0,
            errors: [],
        };

        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        for (const customer of customers) {
            try {
                const customerName = customer.first_name || '';
                const html = template.html(customerName);

                // Send email via Resend API
                const resendResp = await fetch('https://api.resend.com/emails', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        from: 'Torch Republic <info@torchrepublic.com>',
                        to: [customer.email],
                        subject: template.subject,
                        html: html,
                    }),
                });

                if (!resendResp.ok) {
                    const errText = await resendResp.text();
                    throw new Error(`Resend API ${resendResp.status}: ${errText}`);
                }

                // Log to EmailCampaign entity
                try {
                    await base44.asServiceRole.entities.EmailCampaign.create({
                        recipient_email: customer.email,
                        customer_name: customerName,
                        segment: 'allCustomers',
                        campaign_name: 'Weekly Best Sellers Rotation',
                        email_number: emailNumber,
                        sent_date: new Date().toISOString(),
                        status: 'sent',
                    });
                } catch (e) {
                    console.log('EmailCampaign log failed:', e.message);
                }

                results.sent++;
                // Rate limit: pause between sends to avoid 429s
                await delay(300);
            } catch (error) {
                results.failed++;
                results.errors.push({
                    email: customer.email,
                    error: error.message,
                });
                await delay(200);
            }
        }

        return Response.json({
            success: true,
            results,
            message: `Weekly Best Sellers #${emailNumber}: Sent ${results.sent}/${results.total} emails to all customers`,
        });
    } catch (error) {
        return Response.json({
            error: error.message,
            success: false
        }, { status: 500 });
    }
});