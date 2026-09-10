import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

const TRACKING_PIXEL = 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
const TRUSTED_REDIRECT_HOSTS = new Set([
    'torchrepublic.com',
    'www.torchrepublic.com',
    'torch-republic.com',
    'www.torch-republic.com',
]);

const pixelResponse = (headers = {}) => new Response(
    Uint8Array.from(atob(TRACKING_PIXEL), c => c.charCodeAt(0)),
    {
        headers: {
            'Content-Type': 'image/gif',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            ...headers,
        },
    }
);

const isShopOrProductLink = (link) => {
    try {
        const path = link.startsWith('/') && !link.startsWith('//')
            ? link
            : new URL(link).pathname.toLowerCase();
        return (
            path === '/shop' ||
            path.startsWith('/shop/') ||
            path.startsWith('/products/') ||
            path.startsWith('/blends/') ||
            path.startsWith('/build-your-ritual') ||
            path.startsWith('/bundle')
        );
    } catch {
        return false;
    }
};

const getSafeRedirectUrl = (link) => {
    try {
        if (link.startsWith('/') && !link.startsWith('//')) {
            return `https://torchrepublic.com${link}`;
        }
        const redirectUrl = new URL(link);
        if (redirectUrl.protocol === 'https:' && TRUSTED_REDIRECT_HOSTS.has(redirectUrl.hostname.toLowerCase())) {
            return redirectUrl.toString();
        }
    } catch {
        return null;
    }
    return null;
};

export default async function(req) {
    try {
        const url = new URL(req.url);
        const emailId = url.searchParams.get('email_id');
        const type = url.searchParams.get('type');
        const link = url.searchParams.get('link');

        if (!emailId || !type) {
            return pixelResponse();
        }

        const base44 = createClientFromRequest(req);

        const campaigns = await base44.entities.EmailCampaign.filter({
            _id: emailId,
        });

        if (campaigns.length === 0) {
            return pixelResponse();
        }

        const campaign = campaigns[0];
        const updateData = {};

        if (type === 'open') {
            updateData.opened = true;
            updateData.opened_date = new Date().toISOString();
        } else if (type === 'click' && link) {
            const redirectUrl = getSafeRedirectUrl(link);
            if (!redirectUrl) {
                return new Response('Invalid redirect URL', { status: 400 });
            }
            updateData.clicked = true;
            updateData.clicked_date = new Date().toISOString();
            await base44.entities.EmailCampaign.update(campaign.id, updateData);
            // Track email-driven shop/product clicks for marketing KPIs
            if (isShopOrProductLink(link)) {
                try {
                    await base44.analytics.track({
                        eventName: 'email_click_to_shop',
                        properties: { email_id: emailId, link },
                    });
                } catch (_) {}
            }
            return Response.redirect(redirectUrl, 302);
        }

        if (Object.keys(updateData).length > 0) {
            await base44.entities.EmailCampaign.update(campaign.id, updateData);
        }

        return pixelResponse();
    } catch (error) {
        return pixelResponse({ 'Cache-Control': 'no-cache, no-store, must-revalidate' });
    }
}