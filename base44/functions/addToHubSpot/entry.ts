import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    // Get HubSpot connection
    const { accessToken } = await base44.asServiceRole.connectors.getConnection("hubspot");
    
    // Parse request body
    const { email } = await req.json();
    
    if (!email) {
      return Response.json({ error: 'Email is required' }, { status: 400 });
    }
    
    // Create or update contact in HubSpot
    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          email: email,
        },
      }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to add contact to HubSpot');
    }
    
    const data = await response.json();
    
    return Response.json({ 
      success: true, 
      contactId: data.id,
      message: 'Contact added to HubSpot successfully'
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});