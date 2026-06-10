import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
    try {
        const url = new URL(req.url);
        const emailId = url.searchParams.get('email_id');
        const type = url.searchParams.get('type');
        const link = url.searchParams.get('link');

        if (!emailId || !type) {
            return new Response(
                Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'),
                {
                    headers: {
                        'Content-Type': 'image/gif',
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                    },
                }
            );
        }

        const base44 = createClientFromRequest(req);

        const campaigns = await base44.entities.EmailCampaign.filter({
            _id: emailId,
        });

        if (campaigns.length === 0) {
            return new Response(
                Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'),
                {
                    headers: {
                        'Content-Type': 'image/gif',
                    },
                }
            );
        }

        const campaign = campaigns[0];
        const updateData = {};

        if (type === 'open') {
            updateData.opened = true;
            updateData.opened_date = new Date().toISOString();
        } else if (type === 'click' && link) {
            updateData.clicked = true;
            updateData.clicked_date = new Date().toISOString();
            return Response.redirect(link, 302);
        }

        if (Object.keys(updateData).length > 0) {
            await base44.entities.EmailCampaign.update(campaign.id, updateData);
        }

        return new Response(
            Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'),
            {
                headers: {
                    'Content-Type': 'image/gif',
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                },
            }
        );
    } catch (error) {
        return new Response(
            Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'),
            {
                headers: {
                    'Content-Type': 'image/gif',
                },
            }
        );
    }
});