import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import FormField from './FormField';
import ImageField from './ImageField';

const slugify = (value) =>
  String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const EMPTY_OPTION = {
  key: '',
  label: '',
  format_label: '',
  image_url: '',
  approved: false,
  shopify_handle: '',
  shopify_product_id: '',
  shopify_variant_id: '',
  is_default: false,
};

/**
 * Admin form for one special-edition product.
 *
 * Supplier approval and Shopify mapping are per option, so a single grind can
 * be approved and purchasable while the other stays pending.
 */
export default function EditionForm({ value, onSave, onCancel, saving }) {
  const [draft, setDraft] = useState(() => ({
    ...value,
    collections: value.collections || [],
    options: value.options || [],
    additional_images: value.additional_images || [],
  }));

  const set = (patch) => setDraft((d) => ({ ...d, ...patch }));
  const setOption = (index, patch) =>
    setDraft((d) => ({ ...d, options: d.options.map((o, i) => (i === index ? { ...o, ...patch } : o)) }));

  const addOption = () => setDraft((d) => ({ ...d, options: [...d.options, { ...EMPTY_OPTION }] }));
  const removeOption = (index) => setDraft((d) => ({ ...d, options: d.options.filter((_, i) => i !== index) }));

  const setImage = (index, url) =>
    setDraft((d) => ({ ...d, additional_images: d.additional_images.map((src, i) => (i === index ? url : src)) }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField label="Name" value={draft.name} onChange={(v) => set({ name: v, slug: draft.slug || slugify(v) })} />
        <FormField label="URL slug" value={draft.slug} onChange={(v) => set({ slug: slugify(v) })} hint="Used at /special-editions/<slug>" />
        <FormField label="Badge" value={draft.badge} onChange={(v) => set({ badge: v })} placeholder="Halloween Special Edition" />
        <FormField label="Size" value={draft.size} onChange={(v) => set({ size: v })} placeholder="12 oz (340 g)" />
        <FormField label="Format summary" value={draft.format_summary} onChange={(v) => set({ format_summary: v })} placeholder="Ground or Whole Bean" />
        <FormField label="Display order" type="number" value={draft.display_order} onChange={(v) => set({ display_order: v })} />
        <FormField
          label="Status"
          type="select"
          value={draft.status || 'draft'}
          onChange={(v) => set({ status: v })}
          options={[
            { value: 'draft', label: 'Draft (hidden)' },
            { value: 'active', label: 'Active' },
            { value: 'archived', label: 'Archived' },
          ]}
        />
        <FormField
          label="Collections"
          value={(draft.collections || []).join(', ')}
          onChange={(v) => set({ collections: v.split(',').map(slugify).filter(Boolean) })}
          hint="Comma separated. e.g. special-editions, halloween"
        />
      </div>

      <FormField label="Short description" type="textarea" rows={2} value={draft.short_description} onChange={(v) => set({ short_description: v })} />
      <FormField label="Full description" type="textarea" rows={4} value={draft.description} onChange={(v) => set({ description: v })} />
      <FormField label="Promo copy" type="textarea" rows={2} value={draft.promo_copy} onChange={(v) => set({ promo_copy: v })} />
      <FormField label="Brewing guidance" type="textarea" rows={3} value={draft.brew_guidance} onChange={(v) => set({ brew_guidance: v })} />
      <FormField
        label="Ingredients"
        type="textarea"
        rows={3}
        value={draft.ingredients}
        onChange={(v) => set({ ingredients: v })}
        hint="Only enter what the approved supplier listing confirms."
      />

      <div className="flex flex-wrap gap-6">
        <FormField label="Requires brewing" type="checkbox" value={draft.requires_brewing} onChange={(v) => set({ requires_brewing: v })} />
        <FormField label="Instant product (just add water)" type="checkbox" value={draft.is_instant} onChange={(v) => set({ is_instant: v })} />
      </div>

      {/* Options */}
      <div className="tr-section-divider pt-6">
        <div className="flex items-center justify-between">
          <h3 className="h3">Options (grind / format)</h3>
          <button type="button" className="btn btn-secondary" onClick={addOption}>
            <Plus size={15} strokeWidth={2} />
            Add option
          </button>
        </div>

        <div className="mt-4 space-y-5">
          {(draft.options || []).map((option, index) => (
            <div key={index} className="card-torch p-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField label="Option key" value={option.key} onChange={(v) => setOption(index, { key: slugify(v) })} placeholder="ground" />
                <FormField label="Label" value={option.label} onChange={(v) => setOption(index, { label: v })} placeholder="Ground" />
                <FormField
                  label="Packaging format label"
                  value={option.format_label}
                  onChange={(v) => setOption(index, { format_label: v })}
                  placeholder="GROUND COFFEE"
                />
                <FormField
                  label="Shopify handle"
                  value={option.shopify_handle}
                  onChange={(v) => setOption(index, { shopify_handle: v })}
                />
                <FormField
                  label="Shopify product ID"
                  value={option.shopify_product_id}
                  onChange={(v) => setOption(index, { shopify_product_id: v })}
                  placeholder="gid://shopify/Product/..."
                />
                <FormField
                  label="Shopify variant ID"
                  value={option.shopify_variant_id}
                  onChange={(v) => setOption(index, { shopify_variant_id: v })}
                  placeholder="gid://shopify/ProductVariant/..."
                  hint="Purchasing stays disabled until this is a real Shopify variant."
                />
              </div>

              <div className="mt-4">
                <ImageField
                  label="Option product photo"
                  value={option.image_url}
                  onChange={(url) => setOption(index, { image_url: url })}
                  hint="Must match this exact option's packaging."
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-6">
                <FormField
                  label="Approved for launch"
                  type="checkbox"
                  value={option.approved}
                  onChange={(v) => setOption(index, { approved: v })}
                  hint="Supplier approval, separate from Shopify stock."
                />
                <FormField
                  label="Default selection"
                  type="checkbox"
                  value={option.is_default}
                  onChange={(v) => setOption(index, { is_default: v })}
                />
                <button type="button" className="btn btn-ghost" onClick={() => removeOption(index)}>
                  <Trash2 size={15} strokeWidth={2} />
                  Remove option
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Extra gallery images */}
      <div className="tr-section-divider pt-6">
        <div className="flex items-center justify-between">
          <h3 className="h3">Extra gallery images</h3>
          <button type="button" className="btn btn-secondary" onClick={() => setDraft((d) => ({ ...d, additional_images: [...d.additional_images, ''] }))}>
            <Plus size={15} strokeWidth={2} />
            Add image
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {(draft.additional_images || []).map((src, index) => (
            <div key={index} className="flex items-end gap-4">
              <div className="flex-1">
                <ImageField label={`Gallery image ${index + 1}`} value={src} onChange={(url) => setImage(index, url)} />
              </div>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setDraft((d) => ({ ...d, additional_images: d.additional_images.filter((_, i) => i !== index) }))}
              >
                <Trash2 size={15} strokeWidth={2} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SEO */}
      <div className="tr-section-divider pt-6 grid grid-cols-1 gap-4">
        <FormField label="SEO title" value={draft.seo_title} onChange={(v) => set({ seo_title: v })} />
        <FormField label="SEO description" type="textarea" rows={2} value={draft.seo_description} onChange={(v) => set({ seo_description: v })} />
        <ImageField label="Social sharing image" value={draft.social_image} onChange={(url) => set({ social_image: url })} />
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <button type="button" className="btn btn-primary" disabled={saving} onClick={() => onSave(draft)}>
          {saving ? 'Saving...' : 'Save edition'}
        </button>
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}