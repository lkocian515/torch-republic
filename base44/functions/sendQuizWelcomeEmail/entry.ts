import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);

  const body = await req.json();
  const data = body.data || body;

  const email = data.email;
  const blend = data.result_blend || 'GlowMind';
  const profile = data.result_profile || 'Optimizer';
  const code = 'TORCH10';

  if (!email) {
    return Response.json({ error: 'No email provided' }, { status: 400 });
  }

  const isGlowMind = blend === 'GlowMind';
  const blendName = isGlowMind ? 'GlowMind Clarity Blend' : 'MoonCap Restore';
  const blendDesc = isGlowMind
    ? "Lion's Mane and Chaga infused coffee to lock you into deep work flow state."
    : 'A calming, restorative mushroom blend to down-regulate your nervous system and unlock true recovery.';
  const blendUrl = isGlowMind
    ? 'https://torchrepublic.com/products/glowmind-clarity-blend'
    : 'https://torchrepublic.com/products/mooncap-restore';
  const protocolName = isGlowMind ? 'The 90-Minute Sprint Protocol' : 'The Digital Sunset Protocol';
  const ctaLabel = isGlowMind ? 'Optimize Your Focus →' : 'Optimize Your Recovery →';

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="margin:0;padding:0;background:#080808;font-family:'Inter',Arial,sans-serif;color:#F5EFE6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#080808;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Brand -->
          <tr>
            <td align="center" style="padding-bottom:28px;">
              <p style="margin:0;font-size:10px;letter-spacing:0.45em;text-transform:uppercase;color:rgba(212,175,55,0.6);font-family:monospace;">
                Torch Command · Cognitive Profile
              </p>
            </td>
          </tr>

          <!-- Main card -->
          <tr>
            <td style="background:#0D0D0D;border:1px solid rgba(212,175,55,0.2);padding:44px 40px;">

              <!-- Profile headline -->
              <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:rgba(212,175,55,0.55);font-family:monospace;">
                Your Profile
              </p>
              <h1 style="margin:0 0 8px;font-size:30px;font-weight:700;color:#FFFFFF;line-height:1.15;">
                ${profile}
              </h1>
              <p style="margin:0 0 28px;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:rgba(212,175,55,0.5);font-family:monospace;">
                ${protocolName}
              </p>

              <p style="margin:0 0 32px;font-size:14px;color:rgba(240,235,225,0.6);line-height:1.8;">
                Your Torch Command assessment is complete. Based on your answers, we've matched you to your optimal protocol and Torch Republic blend — designed specifically for your cognitive bottleneck.
              </p>

              <!-- Blend recommendation -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;background:#111;border:1px solid rgba(212,175,55,0.25);">
                <tr>
                  <td style="padding:24px 28px;">
                    <p style="margin:0 0 4px;font-size:9px;letter-spacing:0.4em;text-transform:uppercase;color:rgba(212,175,55,0.6);font-family:monospace;">
                      Your Matched Blend
                    </p>
                    <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#D4AF37;">
                      ${blendName}
                    </p>
                    <p style="margin:0 0 20px;font-size:13px;color:rgba(240,235,225,0.55);line-height:1.7;">
                      ${blendDesc}
                    </p>
                    <a href="${blendUrl}"
                       style="display:inline-block;background:#D4AF37;color:#0A0A0A;font-size:10px;font-family:monospace;letter-spacing:0.3em;text-transform:uppercase;font-weight:700;padding:14px 32px;text-decoration:none;">
                      ${ctaLabel}
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Discount code -->
              <p style="margin:0 0 14px;font-size:14px;color:rgba(240,235,225,0.65);line-height:1.75;">
                As a welcome gift, here's <strong style="color:#D4AF37;">10% off your first order</strong>:
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td align="center" style="background:#0A0A0A;border:1px dashed rgba(212,175,55,0.4);padding:20px;">
                    <p style="margin:0 0 6px;font-size:9px;letter-spacing:0.35em;text-transform:uppercase;color:rgba(212,175,55,0.5);font-family:monospace;">
                      Your discount code
                    </p>
                    <p style="margin:0;font-size:28px;font-weight:700;letter-spacing:0.15em;color:#D4AF37;font-family:monospace;">
                      ${code}
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:12px;color:rgba(240,235,225,0.35);line-height:1.7;">
                Browse the full Torch Republic protocol library at
                <a href="https://torchrepublic.com/command/protocols" style="color:rgba(212,175,55,0.6);text-decoration:none;">torchrepublic.com/command</a>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:24px;">
              <p style="margin:0;font-size:10px;color:rgba(212,175,55,0.25);font-family:monospace;letter-spacing:0.1em;">
                © 2026 Torch Republic Coffee Co. ·
                <a href="https://torchrepublic.com/privacy-policy" style="color:rgba(212,175,55,0.25);text-decoration:none;">Privacy</a>
                &nbsp;·&nbsp;
                <a href="https://torchrepublic.com/contact" style="color:rgba(212,175,55,0.25);text-decoration:none;">Contact</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  await base44.asServiceRole.integrations.Core.SendEmail({
    to: email,
    subject: `Your Cognitive Profile: ${profile} — Plus 10% Off Inside 🔥`,
    body: htmlBody,
    from_name: 'Torch Republic Coffee Co.',
  });

  return Response.json({ success: true });
});