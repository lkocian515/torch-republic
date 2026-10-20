import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, ExternalLink } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useSEO } from '@/hooks/useSEO';
import { clearSpecialEditionsCache } from '@/lib/specialEditions';
import EditionForm from '@/components/admin/edition/EditionForm';
import CampaignForm from '@/components/admin/edition/CampaignForm';

const STRIP = ['id', 'created_date', 'updated_date', 'created_by_id'];

const NEW_EDITION = {
  name: '',
  slug: '',
  badge: '',
  collections: ['special-editions'],
  size: '',
  format_summary: '',
  short_description: '',
  description: '',
  promo_copy: '',
  brew_guidance: '',
  ingredients: '',
  requires_brewing: true,
  is_instant: false,
  options: [],
  additional_images: [],
  display_order: 0,
  status: 'draft',
  seo_title: '',
  seo_description: '',
  social_image: '',
};

const NEW_CAMPAIGN = {
  name: '',
  slug: '',
  eyebrow: '',
  headline: '',
  supporting_text: '',
  desktop_hero_image: '',
  mobile_hero_image: '',
  collection_slug: '',
  cta_label_prelaunch: '',
  cta_label_live: '',
  start_date: '',
  end_date: '',
  featured: false,
  archived: false,
  display_order: 0,
};

const payloadOf = (draft) =>
  Object.fromEntries(Object.entries(draft).filter(([key]) => !STRIP.includes(key)));

/**
 * Admin management for special editions and campaigns.
 * Future releases are added here — no homepage or product-page rebuild.
 */
export default function AdminSpecialEditions() {
  const [tab, setTab] = useState('editions');
  const [editions, setEditions] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  useSEO({ title: 'Special Editions Admin', url: '/admin/special-editions', noindex: true });

  const load = useCallback(async () => {
    setLoading(true);
    const [editionPage, campaignPage] = await Promise.all([
      base44.entities.SpecialEdition.list({ sort: 'display_order', limit: 100 }),
      base44.entities.EditionCampaign.list({ sort: 'display_order', limit: 100 }),
    ]);
    setEditions(Array.isArray(editionPage) ? editionPage : editionPage?.items || []);
    setCampaigns(Array.isArray(campaignPage) ? campaignPage : campaignPage?.items || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const save = async (draft) => {
    setSaving(true);
    try {
      const entity = editing.entity === 'edition' ? base44.entities.SpecialEdition : base44.entities.EditionCampaign;
      const payload = payloadOf(draft);
      if (draft.id) await entity.update(draft.id, payload);
      else await entity.create(payload);
      clearSpecialEditionsCache();
      setEditing(null);
      await load();
    } finally {
      setSaving(false);
    }
  };

  const remove = async (entityName, record) => {
    if (!window.confirm(`Delete "${record.name}"? This cannot be undone from here.`)) return;
    await base44.entities[entityName].delete(record.id);
    clearSpecialEditionsCache();
    await load();
  };

  const rows = tab === 'editions' ? editions : campaigns;

  return (
    <div className="section-torch">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Admin</p>
            <h1 className="h1 mt-2">Special Editions</h1>
          </div>
          <div className="flex gap-3">
            <Link to="/special-editions" className="btn btn-ghost">
              <ExternalLink size={15} strokeWidth={2} />
              View storefront
            </Link>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                setEditing(
                  tab === 'editions'
                    ? { entity: 'edition', value: { ...NEW_EDITION } }
                    : { entity: 'campaign', value: { ...NEW_CAMPAIGN } },
                )
              }
            >
              <Plus size={15} strokeWidth={2} />
              {tab === 'editions' ? 'New edition' : 'New campaign'}
            </button>
          </div>
        </header>

        <div className="mt-8 flex gap-2">
          {['editions', 'campaigns'].map((key) => (
            <button
              key={key}
              type="button"
              className={tab === key ? 'btn btn-primary' : 'btn btn-secondary'}
              onClick={() => {
                setTab(key);
                setEditing(null);
              }}
            >
              {key === 'editions' ? 'Editions' : 'Campaigns'}
            </button>
          ))}
        </div>

        {editing && (
          <div className="card-torch mt-8 p-6">
            <h2 className="h2">{editing.value.id ? 'Edit' : 'New'} {editing.entity === 'edition' ? 'edition' : 'campaign'}</h2>
            <div className="mt-6">
              {editing.entity === 'edition' ? (
                <EditionForm
                  value={editing.value}
                  saving={saving}
                  onSave={save}
                  onCancel={() => setEditing(null)}
                />
              ) : (
                <CampaignForm
                  value={editing.value}
                  saving={saving}
                  onSave={save}
                  onCancel={() => setEditing(null)}
                />
              )}
            </div>
          </div>
        )}

        <div className="mt-8">
          {loading ? (
            <p className="body text-readable-secondary">Loading...</p>
          ) : rows.length === 0 ? (
            <p className="body text-readable-secondary">
              Nothing here yet. Use the button above to add your first {tab === 'editions' ? 'edition' : 'campaign'}.
            </p>
          ) : (
            <ul className="space-y-3">
              {rows.map((record) => (
                <li key={record.id} className="card-torch flex flex-wrap items-center justify-between gap-4 p-4">
                  <div>
                    <p className="font-heading font-semibold">{record.name}</p>
                    <p className="font-mono uppercase" style={{ fontSize: '10px', letterSpacing: '0.14em', color: 'hsl(var(--muted-foreground))' }}>
                      {tab === 'editions'
                        ? `${record.status || 'draft'} / ${(record.options || []).length} option(s)`
                        : `${record.featured ? 'featured' : 'not featured'}${record.archived ? ' / archived' : ''}`}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setEditing({ entity: tab === 'editions' ? 'edition' : 'campaign', value: record })}
                    >
                      <Pencil size={15} strokeWidth={2} />
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => remove(tab === 'editions' ? 'SpecialEdition' : 'EditionCampaign', record)}
                    >
                      <Trash2 size={15} strokeWidth={2} />
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}