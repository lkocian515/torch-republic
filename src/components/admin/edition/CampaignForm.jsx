import React, { useState } from 'react';
import FormField from './FormField';
import ImageField from './ImageField';

const toLocalInput = (iso) => (iso ? new Date(iso).toISOString().slice(0, 16) : '');

/**
 * Admin form for one campaign (hero copy, artwork, schedule).
 *
 * Scheduling controls editorial promotion only — it never bypasses product
 * approval or Shopify availability checks on the storefront.
 */
export default function CampaignForm({ value, onSave, onCancel, saving }) {
  const [draft, setDraft] = useState(() => ({ ...value }));

  const set = (patch) => setDraft((d) => ({ ...d, ...patch }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField label="Campaign name" value={draft.name} onChange={(v) => set({ name: v })} placeholder="Halloween Duo" />
        <FormField label="Campaign slug" value={draft.slug} onChange={(v) => set({ slug: v })} />
        <FormField label="Collection slug" value={draft.collection_slug} onChange={(v) => set({ collection_slug: v })} hint="Which special-edition collection this campaign promotes." />
        <FormField label="Display order" type="number" value={draft.display_order} onChange={(v) => set({ display_order: v })} />
      </div>

      <FormField label="Eyebrow" value={draft.eyebrow} onChange={(v) => set({ eyebrow: v })} placeholder="Halloween Special Edition" />
      <FormField label="Headline" value={draft.headline} onChange={(v) => set({ headline: v })} placeholder="Something wicked is brewing." />
      <FormField label="Supporting text" type="textarea" rows={2} value={draft.supporting_text} onChange={(v) => set({ supporting_text: v })} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField label="CTA label before launch" value={draft.cta_label_prelaunch} onChange={(v) => set({ cta_label_prelaunch: v })} placeholder="Preview the Halloween Duo" />
        <FormField label="CTA label once live" value={draft.cta_label_live} onChange={(v) => set({ cta_label_live: v })} placeholder="Shop the Halloween Duo" />
      </div>

      <ImageField
        label="Desktop hero image"
        value={draft.desktop_hero_image}
        onChange={(url) => set({ desktop_hero_image: url })}
        hint="Shown behind the headline on desktop. Leave empty to use a styled text panel."
      />
      <ImageField
        label="Mobile hero image"
        value={draft.mobile_hero_image}
        onChange={(url) => set({ mobile_hero_image: url })}
        hint="Optional. Must keep both products visible — do not crop one away."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          label="Start date"
          type="datetime-local"
          value={toLocalInput(draft.start_date)}
          onChange={(v) => set({ start_date: v ? new Date(v).toISOString() : '' })}
          hint="Optional. Before this the campaign is not featured."
        />
        <FormField
          label="End date"
          type="datetime-local"
          value={toLocalInput(draft.end_date)}
          onChange={(v) => set({ end_date: v ? new Date(v).toISOString() : '' })}
          hint="Optional. After this the campaign drops out of the hero automatically."
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <FormField label="Featured campaign" type="checkbox" value={draft.featured} onChange={(v) => set({ featured: v })} hint="Shown as the homepage hero while live." />
        <FormField label="Archived" type="checkbox" value={draft.archived} onChange={(v) => set({ archived: v })} hint="Archived campaigns never render." />
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <button type="button" className="btn btn-primary" disabled={saving} onClick={() => onSave(draft)}>
          {saving ? 'Saving...' : 'Save campaign'}
        </button>
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}