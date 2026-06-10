import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);

  const body_json = await req.json();

  // Support both direct call {email} and entity automation payload {data: {email}}
  const email = body_json.email || body_json.data?.email;
  const discount_code = body_json.discount_code || body_json.data?.discount_code;

  const code = discount_code || 'WELCOME15';

  const body = `
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

          <!-- Logo / Brand -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <p style="margin:0;font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:rgba(230,183,173,0.5);font-family:monospace;">
                Torch Republic Coffee Co.
              </p>
            </td>
          </tr>

          <!-- Main card -->
          <tr>
            <td style="background:#141210;border:1px solid rgba(230,183,173,0.15);padding:40px 36px;">

              <h1 style="margin:0 0 12px;font-size:28px;font-weight:700;color:#F5EFE6;line-height:1.2;">
                Welcome to the Ritual. 🔥
              </h1>
              <p style="margin:0 0 28px;font-size:15px;color:rgba(210,195,175,0.75);line-height:1.75;">
                You're officially part of the Torch Republic community — a growing crew of people who take their mornings seriously.
              </p>
              <p style="margin:0 0 28px;font-size:15px;color:rgba(210,195,175,0.75);line-height:1.75;">
                As a thank-you for joining, here's <strong style="color:#E6B7AD;">15% off your first order</strong>:
              </p>

              <!-- Discount code box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td align="center" style="background:#0A0807;border:1px dashed rgba(230,183,173,0.4);padding:20px;">
                    <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:rgba(230,183,173,0.5);font-family:monospace;">
                      Your discount code
                    </p>
                    <p style="margin:0;font-size:26px;font-weight:700;letter-spacing:0.15em;color:#E6B7AD;font-family:monospace;">
                      ${code}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- CTA button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td align="center">
                    <a href="https://torchrepublic.com/shop"
                       style="display:inline-block;background:#E6B7AD;color:#080808;font-size:11px;font-family:monospace;letter-spacing:0.25em;text-transform:uppercase;font-weight:700;padding:16px 44px;text-decoration:none;">
                      Shop Best Sellers →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 8px;font-size:13px;color:rgba(210,195,175,0.5);line-height:1.7;">
                Not sure where to start? Try our
                <a href="https://torchrepublic.com/quiz" style="color:#E6B7AD;text-decoration:none;">Blend Quiz</a>
                or explore the
                <a href="https://torchrepublic.com/build-your-ritual" style="color:#E6B7AD;text-decoration:none;">Build Your Ritual</a>
                bundle builder.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:24px;">
              <p style="margin:0;font-size:11px;color:rgba(230,183,173,0.3);font-family:monospace;letter-spacing:0.1em;">
                © 2026 Torch Republic Coffee Co. · 
                <a href="https://torchrepublic.com/privacy-policy" style="color:rgba(230,183,173,0.3);text-decoration:none;">Privacy</a>
                &nbsp;·&nbsp;
                <a href="https://torchrepublic.com/contact" style="color:rgba(230,183,173,0.3);text-decoration:none;">Contact</a>
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
    subject: 'Welcome to Torch Republic — Your 15% Off Code Inside 🔥',
    body,
    from_name: 'Torch Republic Coffee Co.',
  });

  return Response.json({ success: true });
});