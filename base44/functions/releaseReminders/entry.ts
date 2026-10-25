import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';

const TZ = "America/Chicago";

const KIND_LABEL = {
  prep: "Preparation check, 21 days before the preview",
  readiness: "Readiness check, 7 days before the window opens",
  preview: "Preview day",
  launch: "Sale window opens",
  campaign_reminder: "Campaign reminder date",
  results: "Results follow-up, 2 days after the window closed",
  weekly: "Weekly Monday review",
};

const KIND_ACTION = {
  prep: "Check supplier availability, labels, product-page drafts, images, pricing and shipping.",
  readiness: "Confirm the product page, stock, pricing and campaign are ready to go live.",
  preview: "Publish the preview and review the draft materials for this release.",
  launch: "Open the sale window and confirm the page, stock and campaign are live.",
  campaign_reminder: "Post the campaign reminder draft for this release.",
  results: "Record orders, revenue and lessons on the release record.",
  weekly: "Review releases and tasks due in the next 90 days.",
};

function asArray(res) {
  if (Array.isArray(res)) return res;
  if (res && Array.isArray(res.items)) return res.items;
  return [];
}

function addDays(iso, days) {
  const [y, m, d] = String(iso).slice(0, 10).split("-").map(Number);
  if (!y || !m || !d) return "";
  return new Date(Date.UTC(y, m - 1, d) + days * 86400000).toISOString().slice(0, 10);
}

/**
 * Daily release reminder check for the 2027 seasonal plan.
 * Runs at 9:00am America/Chicago. Issues only the reminders due today, records each
 * one so it is never issued twice, and emails the admins the checklist and drafts.
 * It never publishes, sends or edits anything else.
 */
export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
    if (user.role !== "admin") return Response.json({ error: "Forbidden" }, { status: 403 });

    const svc = base44.asServiceRole;
    const payload = await req.json().catch(() => ({}));
    const override = typeof payload?.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(payload.date) ? payload.date : "";
    const now = new Date();
    const today = override || new Intl.DateTimeFormat("en-CA", {
      timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit",
    }).format(now);
    // A date override is a preview run: it reports what would be issued and sends the
    // same email for review, but writes nothing, so a real reminder is never suppressed.
    const preview = Boolean(override);
    const isMonday = preview
      ? new Date(`${today}T12:00:00Z`).getUTCDay() === 1
      : new Intl.DateTimeFormat("en-US", { timeZone: TZ, weekday: "short" }).format(now) === "Mon";

    const [releases, tasks, drafts] = await Promise.all([
      svc.entities.SeasonalRelease.list({ sort: "display_order", limit: 200 }).then(asArray),
      svc.entities.ReleaseTask.list({ sort: "due_date", limit: 500 }).then(asArray),
      svc.entities.ReleaseDraft.list({ limit: 500 }).then(asArray),
    ]);

    const due = [];
    const add = (key, releaseName, slug, kind) => due.push({ key, releaseName, slug, kind });

    for (const r of releases) {
      if (!r || r.status === "Complete") continue;
      if (r.preview_date && addDays(r.preview_date, -21) === today) add(`${r.slug}|prep|${today}`, r.release_name, r.slug, "prep");
      if (r.sale_start && addDays(r.sale_start, -7) === today) add(`${r.slug}|readiness|${today}`, r.release_name, r.slug, "readiness");
      if (String(r.preview_date || "").slice(0, 10) === today) add(`${r.slug}|preview|${today}`, r.release_name, r.slug, "preview");
      if (String(r.sale_start || "").slice(0, 10) === today) add(`${r.slug}|launch|${today}`, r.release_name, r.slug, "launch");
      for (const d of r.reminder_dates || []) {
        if (String(d).slice(0, 10) === today) add(`${r.slug}|campaign_reminder|${today}`, r.release_name, r.slug, "campaign_reminder");
      }
      if (r.sale_end && addDays(r.sale_end, 2) === today) add(`${r.slug}|results|${today}`, r.release_name, r.slug, "results");
    }
    if (isMonday) add(`weekly-review|${today}`, "All releases", "", "weekly");

    if (due.length === 0) {
      return Response.json({ date: today, sent: false, reason: "Nothing is due today.", reminders: [] });
    }

    const logged = await svc.entities.ReleaseTask.filter({
      dedupe_key: { $in: due.map((d) => d.key) },
    }).then(asArray);
    const alreadyIssued = new Set(logged.map((t) => t.dedupe_key));
    const toIssue = due.filter((d) => !alreadyIssued.has(d.key));

    if (toIssue.length === 0) {
      return Response.json({ date: today, sent: false, reason: "Every reminder due today has already been issued.", reminders: [] });
    }

    if (!preview) await svc.entities.ReleaseTask.bulkCreate(toIssue.map((d) => ({
      title: `${d.releaseName} - ${KIND_LABEL[d.kind]}`,
      release_slug: d.slug,
      release_name: d.releaseName,
      phase: "Reminder",
      due_date: today,
      status: "done",
      priority: "medium",
      source: "Release reminder engine",
      dedupe_key: d.key,
      completed_date: today,
      notes: KIND_ACTION[d.kind],
    })));

    const horizon = addDays(today, 90);
    const open = tasks.filter((t) => t.status !== "done" && t.due_date);
    const byDate = (a, b) => (a.due_date < b.due_date ? -1 : 1);
    const overdue = open.filter((t) => t.due_date < today).sort(byDate);
    const next90 = open.filter((t) => t.due_date >= today && t.due_date <= horizon).sort(byDate);

    const lines = [];
    for (const d of toIssue) {
      const rel = releases.find((r) => r.slug === d.slug);
      lines.push(`${d.releaseName} - ${KIND_LABEL[d.kind]}`);
      lines.push(`  ${KIND_ACTION[d.kind]}`);
      if (rel) {
        lines.push(`  Window ${rel.sale_window_label || "not set"} | Preview ${rel.preview_date || "not set"} | Status ${rel.status || "not set"}`);
        lines.push(`  Next action: ${rel.next_action || "none recorded"} (due ${rel.next_action_due || "not set"})`);
      }
      if (d.kind !== "weekly") {
        const relDrafts = drafts.filter((x) => x.release_slug === d.slug);
        lines.push(relDrafts.length
          ? `  Drafts, all unpublished: ${relDrafts.map((x) => `${x.title} [${x.status}]`).join("; ")}`
          : "  Drafts: none created yet for this release.");
      }
      lines.push("");
    }

    if (isMonday) {
      lines.push(`Weekly review - tasks due in the next 90 days, to ${horizon}:`);
      lines.push(next90.length
        ? next90.slice(0, 25).map((t) => `  ${t.due_date} - ${t.title}${t.release_name ? ` (${t.release_name})` : ""} [${t.status}]`).join("\n")
        : "  None.");
      lines.push("");
      lines.push(overdue.length ? `Overdue, ${overdue.length}:` : "Overdue: none.");
      if (overdue.length) lines.push(overdue.map((t) => `  ${t.due_date} - ${t.title} [${t.status}]`).join("\n"));
      lines.push("");
    }

    const body = [
      `Torch Republic seasonal release check - ${today} (America/Chicago)`,
      "",
      ...lines,
      "Release board: /admin/releases",
      "",
      "Nothing was published, sent or changed by this check. Every draft stays unpublished until you approve it.",
    ].join("\n");

    const users = await svc.entities.User.list().then(asArray);
    const admins = users.filter((u) => u.role === "admin" && u.email).map((u) => u.email);

    const sentTo = [];
    for (const email of admins) {
      try {
        await svc.integrations.Core.SendEmail({
          to: email,
          subject: `${preview ? "[PREVIEW] " : ""}Seasonal release reminders - ${today}`,
          body,
          from_name: "Torch Republic Release Plan",
        });
        sentTo.push(email);
      } catch (_ignored) {
        // One failing recipient must not block the others.
      }
    }

    return Response.json({
      date: today,
      preview,
      sent: sentTo.length > 0,
      sentTo,
      reminders: toIssue.map((d) => ({ release: d.releaseName, kind: d.kind, key: d.key })),
      emailBody: preview ? body : undefined,
      overdueCount: overdue.length,
      dueWithin90Days: next90.length,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}