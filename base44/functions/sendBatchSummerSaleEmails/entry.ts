import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// ── Summer Sale Email Templates (inlined — no local imports in Deno Deploy) ──
const LOGO_URL = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/ea7e0190c_torch_republic_primary_refined_gradient_4000px.png';
const HERO_IMG = 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/torch-republic-hero-banner.jpg';
const TORCHBEARER_IMG = 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/15_9efec3d4-7d73-4fd6-a4df-aba0f6cad920.png?v=1781102331';
const GLOWMIND_IMG = 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/4_21dba766-0e82-4b33-821a-3efdf847b2e9.png?v=1781102333';
const MONK_IMG = 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/18_8e5aeb4b-6266-48e5-a725-639e74310697.png?v=1781102333';

const FOOTER = `
        <tr>
            <td align="center" style="padding: 40px 20px; border-top: 1px solid rgba(230,183,173,0.1);">
                <p style="font-family: 'Courier New', monospace; font-size: 9px; letter-spacing: 0.15em; color: rgba(255,255,255,0.3); margin-bottom: 15px;">TORCH REPUBLIC COFFEE COMPANY</p>
                <p style="font-family: 'Inter', sans-serif; font-size: 12px; color: rgba(255,255,255,0.4); line-height: 1.6; margin-bottom: 15px;">Corpus Christi, Texas · U.S.A.<br><a href="mailto:admin@torchrepublic.com" style="color: rgba(230,183,173,0.6); text-decoration: none;">admin@torchrepublic.com</a></p>
                <p style="font-family: 'Courier New', monospace; font-size: 8px; letter-spacing: 0.1em; color: rgba(255,255,255,0.2); margin: 10px 0;">© 2026 Torch Republic Coffee Company. All rights reserved.</p>
                <p style="font-family: 'Courier New', monospace; font-size: 8px; letter-spacing: 0.1em; color: rgba(255,255,255,0.2); margin: 10px 0;">You're receiving this email because you're a valued Torch Republic customer.</p>
            </td>
        </tr>
    </table>
</body>
</html>`;

const HEADER = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Torch Republic Summer Sale</title></head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #080808; color: #F5EFE6;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #080808;">
        <tr><td align="center" style="padding: 40px 20px 30px;"><img src="${LOGO_URL}" alt="Torch Republic" width="280" style="display: block; margin-bottom: 20px;"><p style="font-family: 'Courier New', monospace; font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(230,183,173,0.5); margin: 0;">Premium Instant Coffee · Mushroom Coffee · Matcha</p></td></tr>`;

const TEMPLATES = {
    1: {
        subject: 'Summer Sale Starts Now — 20% Off All Blends',
        html: (name) => `${HEADER}
        <tr><td align="center" style="padding: 0 20px 40px;"><img src="${HERO_IMG}" alt="Summer Sale" width="600" style="max-width: 100%; border-radius: 8px;"></td></tr>
        <tr><td align="center" style="padding: 0 40px 50px; max-width: 600px;">
            <p style="font-family: 'Georgia', serif; font-size: 18px; line-height: 1.8; color: rgba(245,239,230,0.9); margin-bottom: 20px;">${name ? `Dear ${name},` : 'Dear Torchbearer,'}</p>
            <p style="font-family: 'Georgia', serif; font-size: 16px; line-height: 1.8; color: rgba(245,239,230,0.8); margin-bottom: 20px;">Summer is here, and so is our biggest sale of the season. For a limited time, enjoy <strong style="color: #E6B7AD;">20% off</strong> every blend — from our bold Torchbearer instant coffee to our functional GlowMind mushroom coffee and ceremonial-grade matcha.</p>
            <p style="font-family: 'Georgia', serif; font-size: 16px; line-height: 1.8; color: rgba(245,239,230,0.8); margin-bottom: 30px;">Whether you're fueling deep work, winding down with a calming ritual, or stocking up for summer adventures, now is the perfect time to stock your pantry.</p>
        </td></tr>
        <tr><td align="center" style="padding: 0 20px 40px;">
            <div style="background: linear-gradient(135deg, rgba(230,183,173,0.15) 0%, rgba(196,163,90,0.08) 100%); border: 2px solid rgba(230,183,173,0.3); border-radius: 8px; padding: 30px; max-width: 500px;">
                <p style="font-family: 'Courier New', monospace; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(230,183,173,0.6); margin-bottom: 15px;">Summer Sale · 20% Off Everything</p>
                <p style="font-family: 'Courier New', monospace; font-size: 28px; font-weight: bold; letter-spacing: 0.2em; color: #E6B7AD; margin: 15px 0;">SUMMER20</p>
                <p style="font-family: 'Inter', sans-serif; font-size: 14px; color: rgba(245,239,230,0.6); margin: 10px 0;">20% off your entire order · Free shipping on orders $75+</p>
            </div>
        </td></tr>
        <tr><td align="center" style="padding: 0 20px 50px;"><a href="https://torchrepublic.com/shop" style="display: inline-block; background-color: #E6B7AD; color: #080808; font-family: 'Courier New', monospace; font-size: 11px; font-weight: bold; letter-spacing: 0.25em; text-transform: uppercase; text-decoration: none; padding: 18px 48px; border-radius: 4px;">Shop the Summer Sale →</a></td></tr>
        <tr><td align="center" style="padding: 0 20px 50px;">
            <p style="font-family: 'Georgia', serif; font-size: 24px; color: #F5EFE6; margin-bottom: 30px;">Summer Favorites</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px;"><tr>
                <td width="33%" align="center" style="padding: 10px;"><img src="${TORCHBEARER_IMG}" alt="Torchbearer" width="140" style="max-width: 100%; border-radius: 4px;"><p style="font-family: 'Georgia', serif; font-size: 14px; color: #E6B7AD; margin: 10px 0 5px;">Torchbearer</p><p style="font-family: 'Courier New', monospace; font-size: 10px; color: rgba(245,239,230,0.5); margin: 0;">Classic Instant Coffee</p></td>
                <td width="33%" align="center" style="padding: 10px;"><img src="${GLOWMIND_IMG}" alt="GlowMind" width="140" style="max-width: 100%; border-radius: 4px;"><p style="font-family: 'Georgia', serif; font-size: 14px; color: #10B981; margin: 10px 0 5px;">GlowMind Clarity</p><p style="font-family: 'Courier New', monospace; font-size: 10px; color: rgba(245,239,230,0.5); margin: 0;">Mushroom Coffee</p></td>
                <td width="33%" align="center" style="padding: 10px;"><img src="${MONK_IMG}" alt="The Monk" width="140" style="max-width: 100%; border-radius: 4px;"><p style="font-family: 'Georgia', serif; font-size: 14px; color: #6CBD5A; margin: 10px 0 5px;">The Monk</p><p style="font-family: 'Courier New', monospace; font-size: 10px; color: rgba(245,239,230,0.5); margin: 0;">Ceremonial Matcha</p></td>
            </tr></table>
        </td></tr>
${FOOTER}`,
    },
    2: {
        subject: 'Customer Favorites — Now 20% Off',
        html: (name) => `${HEADER}
        <tr><td align="center" style="padding: 0 40px 40px; max-width: 600px;">
            <p style="font-family: 'Georgia', serif; font-size: 18px; line-height: 1.8; color: rgba(245,239,230,0.9); margin-bottom: 20px;">${name ? `Hi ${name},` : 'Hello Torchbearer,'}</p>
            <p style="font-family: 'Georgia', serif; font-size: 16px; line-height: 1.8; color: rgba(245,239,230,0.8); margin-bottom: 20px;">Our Summer Sale is in full swing. Here are the three blends our customers return to again and again — each crafted for a different moment of your day, all <strong style="color: #E6B7AD;">20% off</strong> with code <strong>SUMMER20</strong>.</p>
        </td></tr>
        <tr><td align="center" style="padding: 0 20px 30px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background: #141312; border: 1px solid rgba(230,183,173,0.1); border-radius: 8px;"><tr>
                <td width="45%" style="padding: 20px;"><img src="${TORCHBEARER_IMG}" alt="Torchbearer" width="200" style="max-width: 100%; border-radius: 4px;"></td>
                <td width="55%" style="padding: 20px; vertical-align: top;">
                    <p style="font-family: 'Georgia', serif; font-size: 20px; color: #D6B27A; margin: 0 0 10px;">Torchbearer</p>
                    <p style="font-family: 'Courier New', monospace; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(230,183,173,0.5); margin: 0 0 15px;">Classic Instant Coffee</p>
                    <p style="font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.6; color: rgba(245,239,230,0.7); margin: 0 0 15px;">Bold mornings & deep work. Premium instant Arabica for those who carry the flame.</p>
                    <p style="font-family: 'Inter', sans-serif; font-size: 13px; color: rgba(245,239,230,0.5); margin: 0 0 15px;">⭐⭐⭐⭐⭐ "My daily ritual starter. Bold, smooth, no bitterness." — Sarah M.</p>
                    <a href="https://torchrepublic.com/products/torchbearer" style="display: inline-block; background-color: #D6B27A; color: #080808; font-family: 'Courier New', monospace; font-size: 10px; font-weight: bold; letter-spacing: 0.2em; text-transform: uppercase; text-decoration: none; padding: 12px 24px; border-radius: 4px;">Shop Torchbearer</a>
                </td>
            </tr></table>
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
        <tr><td align="center" style="padding: 0 20px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background: #141312; border: 1px solid rgba(108,189,90,0.2); border-radius: 8px;"><tr>
                <td width="45%" style="padding: 20px;"><img src="${MONK_IMG}" alt="The Monk" width="200" style="max-width: 100%; border-radius: 4px;"></td>
                <td width="55%" style="padding: 20px; vertical-align: top;">
                    <p style="font-family: 'Georgia', serif; font-size: 20px; color: #6CBD5A; margin: 0 0 10px;">The Monk</p>
                    <p style="font-family: 'Courier New', monospace; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(108,189,90,0.6); margin: 0 0 15px;">Ceremonial Grade Matcha</p>
                    <p style="font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.6; color: rgba(245,239,230,0.7); margin: 0 0 15px;">Focus, calm & presence. 100% ceremonial grade matcha for disciplined daily ritual.</p>
                    <p style="font-family: 'Inter', sans-serif; font-size: 13px; color: rgba(245,239,230,0.5); margin: 0 0 15px;">⭐⭐⭐⭐⭐ "Smooth, earthy, perfect for my morning meditation." — Jennifer L.</p>
                    <a href="https://torchrepublic.com/products/the-monk-matcha-blend" style="display: inline-block; background-color: #6CBD5A; color: #080808; font-family: 'Courier New', monospace; font-size: 10px; font-weight: bold; letter-spacing: 0.2em; text-transform: uppercase; text-decoration: none; padding: 12px 24px; border-radius: 4px;">Shop The Monk</a>
                </td>
            </tr></table>
        </td></tr>
        <tr><td align="center" style="padding: 0 20px 50px;"><a href="https://torchrepublic.com/shop" style="display: inline-block; background-color: #E6B7AD; color: #080808; font-family: 'Courier New', monospace; font-size: 11px; font-weight: bold; letter-spacing: 0.25em; text-transform: uppercase; text-decoration: none; padding: 18px 48px; border-radius: 4px;">Shop All Best Sellers →</a></td></tr>
${FOOTER}`,
    },
    3: {
        subject: 'Last Chance: Summer Sale Ends Soon',
        html: (name) => `${HEADER}
        <tr><td align="center" style="padding: 0 20px 40px;">
            <div style="background: linear-gradient(135deg, rgba(230,183,173,0.15) 0%, rgba(196,163,90,0.08) 100%); border: 2px solid #E6B7AD; border-radius: 8px; padding: 40px 30px; max-width: 500px;">
                <p style="font-family: 'Courier New', monospace; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: #E6B7AD; margin-bottom: 20px; font-weight: bold;">Final Days</p>
                <p style="font-family: 'Georgia', serif; font-size: 20px; color: #F5EFE6; margin-bottom: 20px; line-height: 1.6;">${name ? `${name}, your Summer Sale discount is ending soon!` : 'Your Summer Sale discount is ending soon!'}</p>
                <div style="background: #080808; border: 1px dashed rgba(230,183,173,0.4); border-radius: 4px; padding: 20px; margin: 20px 0;">
                    <p style="font-family: 'Courier New', monospace; font-size: 28px; font-weight: bold; letter-spacing: 0.2em; color: #E6B7AD; margin: 0;">SUMMER20</p>
                </div>
                <p style="font-family: 'Inter', sans-serif; font-size: 13px; color: rgba(245,239,230,0.6); margin: 15px 0;">20% off your entire order · Free shipping on orders $75+</p>
            </div>
        </td></tr>
        <tr><td align="center" style="padding: 0 20px 50px;"><a href="https://torchrepublic.com/shop" style="display: inline-block; background-color: #E6B7AD; color: #080808; font-family: 'Courier New', monospace; font-size: 11px; font-weight: bold; letter-spacing: 0.25em; text-transform: uppercase; text-decoration: none; padding: 18px 48px; border-radius: 4px;">Claim Your Discount →</a></td></tr>
        <tr><td align="center" style="padding: 0 20px 50px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px;"><tr>
                <td align="center" style="padding: 10px;"><a href="https://torchrepublic.com/shop/instant-mushroom-coffee" style="font-family: 'Inter', sans-serif; font-size: 13px; color: rgba(230,183,173,0.7); text-decoration: none; border-bottom: 1px solid rgba(230,183,173,0.3); padding-bottom: 3px;">Mushroom Coffee</a></td>
                <td align="center" style="padding: 10px;"><a href="https://torchrepublic.com/shop/instant-coffee" style="font-family: 'Inter', sans-serif; font-size: 13px; color: rgba(230,183,173,0.7); text-decoration: none; border-bottom: 1px solid rgba(230,183,173,0.3); padding-bottom: 3px;">Classic Coffee</a></td>
                <td align="center" style="padding: 10px;"><a href="https://torchrepublic.com/shop/matcha" style="font-family: 'Inter', sans-serif; font-size: 13px; color: rgba(230,183,173,0.7); text-decoration: none; border-bottom: 1px solid rgba(230,183,173,0.3); padding-bottom: 3px;">Matcha</a></td>
            </tr></table>
        </td></tr>
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

                // Send email via service role to bypass app-user restriction
                await base44.asServiceRole.integrations.Core.SendEmail({
                    to: customer.email,
                    subject: template.subject,
                    body: html,
                });

                // Log to EmailCampaign entity
                try {
                    await base44.asServiceRole.entities.EmailCampaign.create({
                        recipient_email: customer.email,
                        customer_name: customerName,
                        segment: 'allCustomers',
                        campaign_name: 'Summer Sale 2026',
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
            message: `Summer Sale Email #${emailNumber}: Sent ${results.sent}/${results.total} emails to all customers`,
        });
    } catch (error) {
        return Response.json({
            error: error.message,
            success: false
        }, { status: 500 });
    }
});