import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    // Verify user is authenticated
    const user = await base44.auth.me();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Only admin users can access Torch Command admin
    if (user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }
    
    // Parse request body
    const body = await req.json();
    const { password } = body;
    
    // Get password from secret (set in dashboard secrets)
    const adminPassword = Deno.env.get('TORCH_COMMAND_PASSWORD');
    
    if (!adminPassword) {
      return Response.json({ 
        error: 'Admin password not configured. Please contact your administrator to set the TORCH_COMMAND_PASSWORD secret.' 
      }, { status: 500 });
    }
    
    // Validate password
    if (password === adminPassword) {
      return Response.json({ success: true });
    } else {
      return Response.json({ success: false, error: 'Incorrect password' }, { status: 401 });
    }
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});