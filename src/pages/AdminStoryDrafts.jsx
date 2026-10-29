import React, { useCallback, useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useSEO } from '@/hooks/useSEO';
import DraftCard from '@/components/admin/story/DraftCard';

const SECTIONS = [
  { key: 'our-story', label: 'Our Story', blurb: 'The stand-alone story page copy.' },
  { key: 'product-story', label: 'Product stories', blurb: 'One story per product, shown under the buying information.' },
  { key: 'dispatches', label: 'Dispatches', blurb: 'The journal landing page and the first season of posts.' },
];

/**
 * Staged Story World copy, for review only.
 * Approving a draft marks it signed off; it publishes nothing.
 */
export default function AdminStoryDrafts() {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);

  useSEO({ title: 'Story drafts', url: '/admin/story-drafts', noindex: true });

  const load = useCallback(async () => {
    const page = await base44.entities.StoryDraft.filter({}, { sort: 'display_order', limit: 100 });
    setDrafts(page.items || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleApprove = async (draft, status) => {
    setDrafts((current) => current.map((item) => (item.id === draft.id ? { ...item, status } : item)));
    await base44.entities.StoryDraft.update(draft.id, { status });
  };

  const approvedCount = drafts.filter((draft) => draft.status === 'approved').length;

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
      <p className="font-mono text-[0.625rem] uppercase tracking-[0.35em] text-primary">
        Torch Republic · Review
      </p>
      <h1 className="mt-2 font-heading text-3xl font-bold text-foreground md:text-4xl">Story World drafts</h1>
      <p className="mt-2 font-heading text-sm text-muted-foreground">
        Staged copy for review. Nothing here appears on the public site. Approving a draft marks it signed off only;
        publishing is a separate step.
      </p>

      {loading ? (
        <p className="mt-8 font-heading text-sm text-muted-foreground">Loading drafts…</p>
      ) : (
        <p className="mt-4 font-mono text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground">
          {drafts.length} drafts · {approvedCount} approved
        </p>
      )}

      {SECTIONS.map((section) => {
        const items = drafts.filter((draft) => draft.section === section.key);
        if (items.length === 0) return null;
        return (
          <section key={section.key} className="mt-10">
            <h2 className="font-heading text-lg font-bold text-foreground">{section.label}</h2>
            <p className="mt-1 font-heading text-sm text-muted-foreground">{section.blurb}</p>
            <div className="mt-4 flex flex-col gap-4">
              {items.map((draft) => (
                <DraftCard key={draft.id} draft={draft} onApprove={handleApprove} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}