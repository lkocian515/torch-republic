/**
 * TRACK CLUB SUBSCRIBER — records a person who joins the Monthly Special
 * Edition Club list, so the owner has a roster instead of only a raw request
 * log.
 *
 * Public by design: the club waitlist form is open to visitors. The endpoint
 * accepts one thing, an email address, normalises it, and refuses duplicates,
 * so a repeated submission can never inflate the roster. Nothing about the
 * roster is returned — only whether the record was created.
 */

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);

    const body = await req.json().catch(() => ({}));
    const email = String(body?.email || '').trim().toLowerCase();

    if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
      return Response.json({ error: 'A valid email address is required' }, { status: 400 });
    }

    const existing = await base44.asServiceRole.entities.ClubSubscriber.filter(
      { email },
      { limit: 1 },
    );

    if (existing?.items?.length) {
      return Response.json({ ok: true, created: false });
    }

    const origin = String(body?.source || 'waitlist').slice(0, 60);

    await base44.asServiceRole.entities.ClubSubscriber.create({
      email,
      status: 'waitlist',
      source: 'waitlist',
      plan_title: 'Monthly Special Edition Club',
      joined_date: new Date().toISOString().slice(0, 10),
      description: `Joined the club list from ${origin}`,
    });

    return Response.json({ ok: true, created: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}