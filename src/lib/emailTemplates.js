/**
 * Torch Republic Relaunch Email Campaign - Email Templates
 * Brand Colors: Black (#080808), Charcoal (#1A1A1A), Rose Gold (#E6B7AD)
 */

export const EMAIL_TEMPLATES = {
    // Email #1: Relaunch Announcement
    relaunch: {
        subject: 'We\'re Back — Your Ritual Awaits',
        previewText: 'Torch Republic returns with premium instant coffee, mushroom coffee & matcha',
        html: (customerName = '') => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Torch Republic Relaunch</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #080808; color: #F5EFE6;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #080808;">
        <!-- Header -->
        <tr>
            <td align="center" style="padding: 40px 20px 30px;">
                <img src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/8e55fe06b_vghvhv.png" alt="Torch Republic Coffee Company" width="280" style="display: block; margin-bottom: 20px;">
                <p style="font-family: 'Courier New', monospace; font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(230,183,173,0.5); margin: 0;">
                    Premium Instant Coffee · Mushroom Coffee · Matcha
                </p>
            </td>
        </tr>
        
        <!-- Hero Image -->
        <tr>
            <td align="center" style="padding: 0 20px 40px;">
                <img src="https://cdn.shopify.com/s/files/1/0620/7140/6844/files/torch-republic-hero-banner.jpg" alt="Torch Republic Product Collection" width="600" style="max-width: 100%; border-radius: 8px;">
            </td>
        </tr>
        
        <!-- Founder Message -->
        <tr>
            <td align="center" style="padding: 0 40px 50px; max-width: 600px;">
                <p style="font-family: 'Georgia', serif; font-size: 18px; line-height: 1.8; color: rgba(245,239,230,0.9); margin-bottom: 20px;">
                    ${customerName ? `Dear ${customerName},` : 'Dear Torchbearer,'}
                </p>
                <p style="font-family: 'Georgia', serif; font-size: 16px; line-height: 1.8; color: rgba(245,239,230,0.8); margin-bottom: 20px;">
                    Torch Republic is back with a renewed commitment to your daily ritual. We've refined our blends, elevated our quality, and strengthened our mission to provide premium instant coffee, functional mushroom coffee, and ceremonial matcha for those who choose to live intentionally.
                </p>
                <p style="font-family: 'Georgia', serif; font-size: 16px; line-height: 1.8; color: rgba(245,239,230,0.8); margin-bottom: 30px;">
                    Whether you're returning to a favorite blend or discovering us for the first time, we're honored to be part of your journey.
                </p>
                <p style="font-family: 'Georgia', serif; font-size: 16px; line-height: 1.8; color: rgba(245,239,230,0.8); margin-bottom: 10px;">
                    With gratitude,<br>
                    <strong style="color: #E6B7AD;">The Torch Republic Team</strong>
                </p>
            </td>
        </tr>
        
        <!-- Discount Code -->
        <tr>
            <td align="center" style="padding: 0 20px 40px;">
                <div style="background: linear-gradient(135deg, rgba(230,183,173,0.1) 0%, rgba(196,163,90,0.05) 100%); border: 2px solid rgba(230,183,173,0.3); border-radius: 8px; padding: 30px; max-width: 500px;">
                    <p style="font-family: 'Courier New', monospace; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(230,183,173,0.6); margin-bottom: 15px;">
                        Welcome Back Offer
                    </p>
                    <p style="font-family: 'Courier New', monospace; font-size: 28px; font-weight: bold; letter-spacing: 0.2em; color: #E6B7AD; margin: 15px 0;">
                        WELCOME15
                    </p>
                    <p style="font-family: 'Inter', sans-serif; font-size: 14px; color: rgba(245,239,230,0.6); margin: 10px 0;">
                        15% off your first order · Free shipping on orders $50+
                    </p>
                </div>
            </td>
        </tr>
        
        <!-- CTA Button -->
        <tr>
            <td align="center" style="padding: 0 20px 50px;">
                <a href="https://torchrepublic.com/shop" style="display: inline-block; background-color: #E6B7AD; color: #080808; font-family: 'Courier New', monospace; font-size: 11px; font-weight: bold; letter-spacing: 0.25em; text-transform: uppercase; text-decoration: none; padding: 18px 48px; border-radius: 4px;">
                    Shop Now →
                </a>
            </td>
        </tr>
        
        <!-- Featured Products -->
        <tr>
            <td align="center" style="padding: 0 20px 50px;">
                <p style="font-family: 'Georgia', serif; font-size: 24px; color: #F5EFE6; margin-bottom: 30px;">
                    Customer Favorites
                </p>
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px;">
                    <tr>
                        <td width="33%" align="center" style="padding: 10px;">
                            <img src="https://cdn.shopify.com/s/files/1/0620/7140/6844/files/15_9efec3d4-7d73-4fd6-a4df-aba0f6cad920.png?v=1781102331" alt="Torchbearer" width="140" style="max-width: 100%; border-radius: 4px;">
                            <p style="font-family: 'Georgia', serif; font-size: 14px; color: #E6B7AD; margin: 10px 0 5px;">Torchbearer</p>
                            <p style="font-family: 'Courier New', monospace; font-size: 10px; color: rgba(245,239,230,0.5); margin: 0;">Classic Instant Coffee</p>
                        </td>
                        <td width="33%" align="center" style="padding: 10px;">
                            <img src="https://cdn.shopify.com/s/files/1/0620/7140/6844/files/dsadasdas_fdecaa67-f286-4373-a98a-55b775a6a2c9.png?v=1785668747" alt="GlowMind Clarity" width="140" style="max-width: 100%; border-radius: 4px;">
                            <p style="font-family: 'Georgia', serif; font-size: 14px; color: #10B981; margin: 10px 0 5px;">GlowMind Clarity</p>
                            <p style="font-family: 'Courier New', monospace; font-size: 10px; color: rgba(245,239,230,0.5); margin: 0;">Mushroom Coffee</p>
                        </td>
                        <td width="33%" align="center" style="padding: 10px;">
                            <img src="https://cdn.shopify.com/s/files/1/0620/7140/6844/files/18_8e5aeb4b-6266-48e5-a725-639e74310697.png?v=1781102333" alt="The Monk" width="140" style="max-width: 100%; border-radius: 4px;">
                            <p style="font-family: 'Georgia', serif; font-size: 14px; color: #6CBD5A; margin: 10px 0 5px;">The Monk</p>
                            <p style="font-family: 'Courier New', monospace; font-size: 10px; color: rgba(245,239,230,0.5); margin: 0;">Ceremonial Matcha</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Footer -->
        <tr>
            <td align="center" style="padding: 40px 20px; border-top: 1px solid rgba(230,183,173,0.1);">
                <p style="font-family: 'Courier New', monospace; font-size: 9px; letter-spacing: 0.15em; color: rgba(255,255,255,0.3); margin-bottom: 15px;">
                    TORCH REPUBLIC COFFEE COMPANY
                </p>
                <p style="font-family: 'Inter', sans-serif; font-size: 12px; color: rgba(255,255,255,0.4); line-height: 1.6; margin-bottom: 15px;">
                    Corpus Christi, Texas · U.S.A.<br>
                    <a href="mailto:admin@torchrepublic.com" style="color: rgba(230,183,173,0.6); text-decoration: none;">admin@torchrepublic.com</a>
                </p>
                <p style="font-family: 'Courier New', monospace; font-size: 8px; letter-spacing: 0.1em; color: rgba(255,255,255,0.2); margin: 10px 0;">
                    © 2026 Torch Republic Coffee Company. All rights reserved.
                </p>
                <p style="font-family: 'Courier New', monospace; font-size: 8px; letter-spacing: 0.1em; color: rgba(255,255,255,0.2); margin: 10px 0;">
                    You're receiving this email because you're a valued Torch Republic customer.
                </p>
            </td>
        </tr>
    </table>
</body>
</html>
        `,
    },

    // Email #2: Best Sellers (3 days later)
    bestSellers: {
        subject: 'What Our Customers Love Most',
        previewText: 'Discover the blends keeping our community focused and energized',
        html: (customerName = '') => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #080808; color: #F5EFE6;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #080808;">
        <!-- Header -->
        <tr>
            <td align="center" style="padding: 40px 20px 30px;">
                <img src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/8e55fe06b_vghvhv.png" alt="Torch Republic Coffee Company" width="280" style="display: block; margin-bottom: 20px;">
            </td>
        </tr>
        
        <!-- Intro -->
        <tr>
            <td align="center" style="padding: 0 40px 40px; max-width: 600px;">
                <p style="font-family: 'Georgia', serif; font-size: 18px; line-height: 1.8; color: rgba(245,239,230,0.9); margin-bottom: 20px;">
                    ${customerName ? `Hi ${customerName},` : 'Hello Torchbearer,'}
                </p>
                <p style="font-family: 'Georgia', serif; font-size: 16px; line-height: 1.8; color: rgba(245,239,230,0.8); margin-bottom: 30px;">
                    Wondering where to start? Here are the blends our customers return to again and again — each crafted for a different moment of your day.
                </p>
            </td>
        </tr>
        
        <!-- Product 1 -->
        <tr>
            <td align="center" style="padding: 0 20px 30px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background: #141312; border: 1px solid rgba(230,183,173,0.1); border-radius: 8px;">
                    <tr>
                        <td width="45%" style="padding: 20px;">
                            <img src="https://cdn.shopify.com/s/files/1/0620/7140/6844/files/15_9efec3d4-7d73-4fd6-a4df-aba0f6cad920.png?v=1781102331" alt="Torchbearer" width="200" style="max-width: 100%; border-radius: 4px;">
                        </td>
                        <td width="55%" style="padding: 20px; vertical-align: top;">
                            <p style="font-family: 'Georgia', serif; font-size: 20px; color: #D6B27A; margin: 0 0 10px;">Torchbearer</p>
                            <p style="font-family: 'Courier New', monospace; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(230,183,173,0.5); margin: 0 0 15px;">
                                Classic Instant Coffee
                            </p>
                            <p style="font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.6; color: rgba(245,239,230,0.7); margin: 0 0 15px;">
                                Bold mornings & deep work. Premium instant Arabica for those who carry the flame.
                            </p>
                            <p style="font-family: 'Inter', sans-serif; font-size: 13px; color: rgba(245,239,230,0.5); margin: 0 0 15px;">
                                ⭐⭐⭐⭐⭐ "My daily ritual starter. Bold, smooth, no bitterness." — Sarah M.
                            </p>
                            <a href="https://torchrepublic.com/products/torchbearer" style="display: inline-block; background-color: #D6B27A; color: #080808; font-family: 'Courier New', monospace; font-size: 10px; font-weight: bold; letter-spacing: 0.2em; text-transform: uppercase; text-decoration: none; padding: 12px 24px; border-radius: 4px;">
                                Shop Torchbearer
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Product 2 -->
        <tr>
            <td align="center" style="padding: 0 20px 30px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background: #141312; border: 1px solid rgba(16,185,129,0.2); border-radius: 8px;">
                    <tr>
                        <td width="45%" style="padding: 20px;">
                            <img src="https://cdn.shopify.com/s/files/1/0620/7140/6844/files/dsadasdas_fdecaa67-f286-4373-a98a-55b775a6a2c9.png?v=1785668747" alt="GlowMind Clarity" width="200" style="max-width: 100%; border-radius: 4px;">
                        </td>
                        <td width="55%" style="padding: 20px; vertical-align: top;">
                            <p style="font-family: 'Georgia', serif; font-size: 20px; color: #10B981; margin: 0 0 10px;">GlowMind Clarity</p>
                            <p style="font-family: 'Courier New', monospace; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(16,185,129,0.6); margin: 0 0 15px;">
                                Mushroom Coffee · Lion's Mane + Chaga
                            </p>
                            <p style="font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.6; color: rgba(245,239,230,0.7); margin: 0 0 15px;">
                                Deep work & daily focus. Functional mushrooms meet premium coffee for sustained mental clarity.
                            </p>
                            <p style="font-family: 'Inter', sans-serif; font-size: 13px; color: rgba(245,239,230,0.5); margin: 0 0 15px;">
                                ⭐⭐⭐⭐⭐ "Game-changer for my workdays. No crash, just focus." — Michael R.
                            </p>
                            <a href="https://torchrepublic.com/products/glowmind-clarity-blend" style="display: inline-block; background-color: #10B981; color: #080808; font-family: 'Courier New', monospace; font-size: 10px; font-weight: bold; letter-spacing: 0.2em; text-transform: uppercase; text-decoration: none; padding: 12px 24px; border-radius: 4px;">
                                Shop GlowMind
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Product 3 -->
        <tr>
            <td align="center" style="padding: 0 20px 40px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background: #141312; border: 1px solid rgba(108,189,90,0.2); border-radius: 8px;">
                    <tr>
                        <td width="45%" style="padding: 20px;">
                            <img src="https://cdn.shopify.com/s/files/1/0620/7140/6844/files/18_8e5aeb4b-6266-48e5-a725-639e74310697.png?v=1781102333" alt="The Monk" width="200" style="max-width: 100%; border-radius: 4px;">
                        </td>
                        <td width="55%" style="padding: 20px; vertical-align: top;">
                            <p style="font-family: 'Georgia', serif; font-size: 20px; color: #6CBD5A; margin: 0 0 10px;">The Monk</p>
                            <p style="font-family: 'Courier New', monospace; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(108,189,90,0.6); margin: 0 0 15px;">
                                Ceremonial Grade Matcha
                            </p>
                            <p style="font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.6; color: rgba(245,239,230,0.7); margin: 0 0 15px;">
                                Focus, calm & presence. 100% ceremonial grade matcha for disciplined daily ritual.
                            </p>
                            <p style="font-family: 'Inter', sans-serif; font-size: 13px; color: rgba(245,239,230,0.5); margin: 0 0 15px;">
                                ⭐⭐⭐⭐⭐ "Smooth, earthy, perfect for my morning meditation." — Jennifer L.
                            </p>
                            <a href="https://torchrepublic.com/products/the-monk-matcha-blend" style="display: inline-block; background-color: #6CBD5A; color: #080808; font-family: 'Courier New', monospace; font-size: 10px; font-weight: bold; letter-spacing: 0.2em; text-transform: uppercase; text-decoration: none; padding: 12px 24px; border-radius: 4px;">
                                Shop The Monk
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- CTA -->
        <tr>
            <td align="center" style="padding: 0 20px 50px;">
                <a href="https://torchrepublic.com/shop" style="display: inline-block; background-color: #E6B7AD; color: #080808; font-family: 'Courier New', monospace; font-size: 11px; font-weight: bold; letter-spacing: 0.25em; text-transform: uppercase; text-decoration: none; padding: 18px 48px; border-radius: 4px;">
                    Shop All Best Sellers →
                </a>
            </td>
        </tr>
        
        <!-- Footer -->
        <tr>
            <td align="center" style="padding: 40px 20px; border-top: 1px solid rgba(230,183,173,0.1);">
                <p style="font-family: 'Courier New', monospace; font-size: 9px; letter-spacing: 0.15em; color: rgba(255,255,255,0.3); margin-bottom: 15px;">
                    TORCH REPUBLIC COFFEE COMPANY
                </p>
                <p style="font-family: 'Courier New', monospace; font-size: 8px; letter-spacing: 0.1em; color: rgba(255,255,255,0.2); margin: 10px 0;">
                    © 2026 Torch Republic Coffee Company. All rights reserved.
                </p>
            </td>
        </tr>
    </table>
</body>
</html>
        `,
    },

    // Email #3: Last Chance (7 days later)
    lastChance: {
        subject: 'Last Chance: Your 15% Off Ends Soon',
        previewText: 'Don\'t miss out on WELCOME15 — your exclusive discount expires soon',
        html: (customerName = '') => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #080808; color: #F5EFE6;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #080808;">
        <!-- Header -->
        <tr>
            <td align="center" style="padding: 40px 20px 30px;">
                <img src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/8e55fe06b_vghvhv.png" alt="Torch Republic Coffee Company" width="280" style="display: block; margin-bottom: 20px;">
            </td>
        </tr>
        
        <!-- Urgency Banner -->
        <tr>
            <td align="center" style="padding: 0 20px 40px;">
                <div style="background: linear-gradient(135deg, rgba(230,183,173,0.15) 0%, rgba(196,163,90,0.08) 100%); border: 2px solid #E6B7AD; border-radius: 8px; padding: 40px 30px; max-width: 500px;">
                    <p style="font-family: 'Courier New', monospace; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: #E6B7AD; margin-bottom: 20px; font-weight: bold;">
                        Final Hours
                    </p>
                    <p style="font-family: 'Georgia', serif; font-size: 20px; color: #F5EFE6; margin-bottom: 20px; line-height: 1.6;">
                        ${customerName ? `${customerName}, your exclusive discount is expiring!` : 'Your exclusive discount is expiring!'}
                    </p>
                    <div style="background: #080808; border: 1px dashed rgba(230,183,173,0.4); border-radius: 4px; padding: 20px; margin: 20px 0;">
                        <p style="font-family: 'Courier New', monospace; font-size: 28px; font-weight: bold; letter-spacing: 0.2em; color: #E6B7AD; margin: 0;">
                            WELCOME15
                        </p>
                    </div>
                    <p style="font-family: 'Inter', sans-serif; font-size: 13px; color: rgba(245,239,230,0.6); margin: 15px 0;">
                        15% off your entire order · Free shipping on orders $50+
                    </p>
                </div>
            </td>
        </tr>
        
        <!-- CTA -->
        <tr>
            <td align="center" style="padding: 0 20px 50px;">
                <a href="https://torchrepublic.com/shop" style="display: inline-block; background-color: #E6B7AD; color: #080808; font-family: 'Courier New', monospace; font-size: 11px; font-weight: bold; letter-spacing: 0.25em; text-transform: uppercase; text-decoration: none; padding: 18px 48px; border-radius: 4px;">
                    Claim Your Discount →
                </a>
            </td>
        </tr>
        
        <!-- Quick Links -->
        <tr>
            <td align="center" style="padding: 0 20px 50px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px;">
                    <tr>
                        <td align="center" style="padding: 10px;">
                            <a href="https://torchrepublic.com/shop/instant-mushroom-coffee" style="font-family: 'Inter', sans-serif; font-size: 13px; color: rgba(230,183,173,0.7); text-decoration: none; border-bottom: 1px solid rgba(230,183,173,0.3); padding-bottom: 3px;">
                                Mushroom Coffee
                            </a>
                        </td>
                        <td align="center" style="padding: 10px;">
                            <a href="https://torchrepublic.com/shop/instant-coffee" style="font-family: 'Inter', sans-serif; font-size: 13px; color: rgba(230,183,173,0.7); text-decoration: none; border-bottom: 1px solid rgba(230,183,173,0.3); padding-bottom: 3px;">
                                Classic Coffee
                            </a>
                        </td>
                        <td align="center" style="padding: 10px;">
                            <a href="https://torchrepublic.com/shop/matcha" style="font-family: 'Inter', sans-serif; font-size: 13px; color: rgba(230,183,173,0.7); text-decoration: none; border-bottom: 1px solid rgba(230,183,173,0.3); padding-bottom: 3px;">
                                Matcha
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Footer -->
        <tr>
            <td align="center" style="padding: 40px 20px; border-top: 1px solid rgba(230,183,173,0.1);">
                <p style="font-family: 'Courier New', monospace; font-size: 9px; letter-spacing: 0.15em; color: rgba(255,255,255,0.3); margin-bottom: 15px;">
                    TORCH REPUBLIC COFFEE COMPANY
                </p>
                <p style="font-family: 'Courier New', monospace; font-size: 8px; letter-spacing: 0.1em; color: rgba(255,255,255,0.2); margin: 10px 0;">
                    © 2026 Torch Republic Coffee Company. All rights reserved.
                </p>
                <p style="font-family: 'Courier New', monospace; font-size: 8px; letter-spacing: 0.1em; color: rgba(255,255,255,0.2); margin: 10px 0;">
                    This is your final reminder. Offer expires soon.
                </p>
            </td>
        </tr>
    </table>
</body>
</html>
        `,
    },
};

// Mobile-optimized versions (simplified layouts)
export const MOBILE_TEMPLATES = {
    relaunch: (customerName = '') => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #080808; color: #F5EFE6;">
    <div style="max-width: 100%; padding: 20px;">
        <img src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/8e55fe06b_vghvhv.png" alt="Torch Republic" width="200" style="display: block; margin: 0 auto 20px;">
        
        <img src="https://cdn.shopify.com/s/files/1/0620/7140/6844/files/torch-republic-hero-banner.jpg" alt="Products" width="100%" style="border-radius: 8px; margin-bottom: 30px;">
        
        <p style="font-size: 16px; line-height: 1.6; color: rgba(245,239,230,0.9); margin-bottom: 20px;">
            ${customerName ? `Dear ${customerName},` : 'Dear Torchbearer,'}
        </p>
        <p style="font-size: 14px; line-height: 1.6; color: rgba(245,239,230,0.8); margin-bottom: 30px;">
            Torch Republic is back with premium instant coffee, mushroom coffee & matcha for your daily ritual.
        </p>
        
        <div style="background: rgba(230,183,173,0.1); border: 2px solid rgba(230,183,173,0.3); border-radius: 8px; padding: 25px; text-align: center; margin-bottom: 30px;">
            <p style="font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(230,183,173,0.6); margin-bottom: 10px;">Use Code</p>
            <p style="font-size: 24px; font-weight: bold; letter-spacing: 0.15em; color: #E6B7AD; margin: 10px 0;">WELCOME15</p>
            <p style="font-size: 12px; color: rgba(245,239,230,0.6); margin: 0;">15% off · Free shipping $50+</p>
        </div>
        
        <a href="https://torchrepublic.com/shop" style="display: block; background-color: #E6B7AD; color: #080808; text-align: center; font-size: 11px; font-weight: bold; letter-spacing: 0.2em; text-transform: uppercase; text-decoration: none; padding: 16px 32px; border-radius: 4px; margin-bottom: 30px;">
            Shop Now →
        </a>
        
        <p style="font-size: 11px; color: rgba(255,255,255,0.3); text-align: center; border-top: 1px solid rgba(230,183,173,0.1); padding-top: 20px;">
            © 2026 Torch Republic Coffee Company
        </p>
    </div>
</body>
</html>
    `,
};