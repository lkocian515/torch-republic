import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Quote } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { ALL_PRODUCTS } from '@/lib/mushroomProducts';

const theme = { page: '#FBF8F1', section: '#F7F1E7', sage: '#EEF2E8', card: '#FFFFFF', text: '#293626', body: '#5F5145', border: '#E4D8C9', accent: '#B86543', gold: '#B48A4A' };
const emptyForm = { name: '', email: '', display_name: '', favorite_product: '', preparation: '', story: '', permission_to_publish: false };

function StoryCard({ story, featured = false }) {
  return <article className={`rounded-[2rem] border p-6 ${featured ? 'md:p-8' : ''}`} style={{ background: theme.card, borderColor: theme.border }}>
    <div className={featured ? 'grid gap-8 md:grid-cols-[260px_1fr] md:items-center' : 'space-y-5'}>
      <div className="overflow-hidden rounded-[1.5rem]" style={{ background: '#F3ECE2', aspectRatio: featured ? '4 / 3' : '1 / 1' }}>{story.photo_url ? <img src={story.photo_url} alt={`${story.display_name}'s Torch Republic ritual`} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center"><Camera className="h-12 w-12" style={{ color: theme.gold }} aria-hidden="true" /></div>}</div>
      <div><p className="mb-3 font-heading text-sm uppercase tracking-[0.3em]" style={{ color: theme.accent }}>{story.favorite_product}</p><h2 className="font-serif text-3xl font-bold" style={{ color: theme.text }}>{story.display_name}</h2>{story.quote && <div className="mt-5 flex gap-3"><Quote className="mt-1 h-5 w-5 flex-shrink-0" style={{ color: theme.gold }} aria-hidden="true" /><p className="font-heading text-lg italic leading-8" style={{ color: theme.body }}>“{story.quote}”</p></div>}<p className="mt-5 font-heading leading-8" style={{ color: theme.body }}>{featured ? story.story : `${story.story.slice(0, 170)}${story.story.length > 170 ? '…' : ''}`}</p>{story.preparation && <p className="mt-4 rounded-xl p-4 font-heading text-sm" style={{ background: '#F7F1E7', color: theme.body }}><strong style={{ color: theme.text }}>How they prepare it:</strong> {story.preparation}</p>}</div>
    </div>
  </article>;
}

export default function CustomerSpotlight() {
  const [form, setForm] = useState(emptyForm);
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useSEO({ title: 'Customer Spotlight | Torch Republic Rituals', description: 'Meet members of the Torch Republic community and discover how coffee, mushroom blends, and matcha fit into their daily rituals.', url: '/customer-spotlight', type: 'website' });
  const { data: stories = [] } = useQuery({ queryKey: ['customer-story-submissions', 'approved'], queryFn: () => base44.entities.CustomerStorySubmission.filter({ status: 'approved' }, '-created_date', 20) });
  const featured = stories[0];
  const moreStories = useMemo(() => stories.slice(1), [stories]);

  const submitStory = async (e) => {
    e.preventDefault();
    if (!form.permission_to_publish) { setMessage('Please confirm permission before submitting your story.'); return; }
    setSubmitting(true);
    setMessage('');
    try {
      let photo_url = '';
      if (photo) {
        const uploaded = await base44.integrations.Core.UploadFile({ file: photo });
        photo_url = uploaded.file_url;
      }
      await base44.entities.CustomerStorySubmission.create({ ...form, photo_url, status: 'pending' });
      setForm(emptyForm); setPhoto(null); setMessage('Thank you — your story was submitted for review before publication.');
    } catch (error) { setMessage('We could not submit your story right now. Please try again.'); }
    setSubmitting(false);
  };

  return <main className="min-h-screen" style={{ background: theme.page, color: theme.text }}>
    <section className="relative overflow-hidden px-5 py-20 md:px-10 md:py-24" style={{ background: theme.section }}><div className="pointer-events-none absolute -left-16 top-12 h-64 w-64 rounded-full opacity-50" style={{ background: theme.sage }} aria-hidden="true" /><div className="mx-auto max-w-3xl text-center"><p className="mb-4 font-heading text-sm uppercase tracking-[0.35em]" style={{ color: theme.accent }}>Torch Republic Community</p><h1 className="font-serif text-5xl font-bold leading-tight md:text-6xl" style={{ color: theme.text }}>The Rituals Behind the Cup</h1><p className="mx-auto mt-6 max-w-2xl font-heading text-lg leading-8" style={{ color: theme.body }}>Meet the people who make Torch Republic part of their mornings, workdays, creative routines, and quieter moments.</p></div></section>

    <section className="px-5 py-16 md:px-10"><div className="mx-auto max-w-6xl"><p className="mb-4 font-heading text-sm uppercase tracking-[0.3em]" style={{ color: theme.accent }}>Featured Spotlight</p>{featured ? <StoryCard story={featured} featured /> : <div className="rounded-[2rem] border p-10 text-center" style={{ background: theme.card, borderColor: theme.border }}><h2 className="font-serif text-3xl font-bold" style={{ color: theme.text }}>Approved customer stories will appear here.</h2><p className="mx-auto mt-4 max-w-2xl font-heading leading-8" style={{ color: theme.body }}>We only publish customer stories after permission and review, so this page stays authentic and privacy-minded.</p></div>}</div></section>

    {moreStories.length > 0 && <section className="px-5 py-16 md:px-10" style={{ background: theme.sage }}><div className="mx-auto max-w-6xl"><h2 className="mb-8 font-serif text-4xl font-bold" style={{ color: theme.text }}>More Rituals</h2><div className="grid gap-6 md:grid-cols-3">{moreStories.map((story) => <StoryCard key={story.id} story={story} />)}</div></div></section>}

    <section id="submit-story" className="px-5 py-16 md:px-10" style={{ background: theme.sage }}><div className="mx-auto grid max-w-6xl gap-8 rounded-[2rem] border p-6 md:grid-cols-[0.8fr_1.2fr] md:p-8" style={{ background: theme.card, borderColor: theme.border }}><div><p className="mb-3 font-heading text-sm uppercase tracking-[0.3em]" style={{ color: theme.accent }}>Share Your Torch Republic Ritual</p><h2 className="font-serif text-4xl font-bold" style={{ color: theme.text }}>Tell us what is in your cup.</h2><p className="mt-4 font-heading leading-8" style={{ color: theme.body }}>Tell us which blend you enjoy, how you prepare it, and what makes it part of your routine. Submissions are reviewed before anything is published.</p>{message && <p className="mt-4 rounded-xl p-3 font-heading text-sm" style={{ background: '#F3ECE2', color: theme.text }}>{message}</p>}</div><form onSubmit={submitStory} className="grid gap-4"><label className="font-heading text-sm font-semibold" style={{ color: theme.text }}>Name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 min-h-[44px] w-full rounded-xl border px-4 text-base" style={{ borderColor: theme.border }} /></label><label className="font-heading text-sm font-semibold" style={{ color: theme.text }}>Email<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2 min-h-[44px] w-full rounded-xl border px-4 text-base" style={{ borderColor: theme.border }} /></label><label className="font-heading text-sm font-semibold" style={{ color: theme.text }}>Display name<input required value={form.display_name} onChange={(e) => setForm({ ...form, display_name: e.target.value })} className="mt-2 min-h-[44px] w-full rounded-xl border px-4 text-base" style={{ borderColor: theme.border }} /></label><label className="font-heading text-sm font-semibold" style={{ color: theme.text }}>Favorite product<select required value={form.favorite_product} onChange={(e) => setForm({ ...form, favorite_product: e.target.value })} className="mt-2 min-h-[44px] w-full rounded-xl border bg-white px-4 text-base" style={{ borderColor: theme.border }}><option value="">Choose a product</option>{ALL_PRODUCTS.map((p) => <option key={p.slug} value={p.name}>{p.name}</option>)}</select></label><label className="font-heading text-sm font-semibold" style={{ color: theme.text }}>How do you prepare it?<input value={form.preparation} onChange={(e) => setForm({ ...form, preparation: e.target.value })} className="mt-2 min-h-[44px] w-full rounded-xl border px-4 text-base" style={{ borderColor: theme.border }} /></label><label className="font-heading text-sm font-semibold" style={{ color: theme.text }}>Story<textarea required value={form.story} onChange={(e) => setForm({ ...form, story: e.target.value })} rows={5} className="mt-2 w-full rounded-xl border px-4 py-3 text-base" style={{ borderColor: theme.border }} /></label><label className="font-heading text-sm font-semibold" style={{ color: theme.text }}>Optional photo<input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files?.[0] || null)} className="mt-2 min-h-[44px] w-full rounded-xl border bg-white px-4 py-3 text-base" style={{ borderColor: theme.border }} /></label><label className="flex items-start gap-3 font-heading text-sm" style={{ color: theme.body }}><input required type="checkbox" checked={form.permission_to_publish} onChange={(e) => setForm({ ...form, permission_to_publish: e.target.checked })} className="mt-1 h-5 w-5" /> I give Torch Republic permission to review this submission and contact me about possible publication.</label><button disabled={submitting} className="min-h-[48px] rounded-full px-7 py-3 font-heading font-semibold disabled:opacity-60" style={{ background: theme.accent, color: '#FBF8F1' }}>{submitting ? 'Submitting…' : 'Submit Your Story'}</button></form></div></section>

    <section className="px-5 py-16 text-center md:px-10"><h2 className="font-serif text-4xl font-bold" style={{ color: theme.text }}>Want to hear from more customers?</h2><p className="mx-auto mt-4 max-w-2xl font-heading leading-8" style={{ color: theme.body }}>Read customer experiences across Torch Republic coffee, mushroom blends, and matcha.</p><Link to="/reviews" className="mt-8 inline-flex min-h-[48px] items-center rounded-full px-8 py-3 font-heading font-semibold" style={{ background: theme.text, color: '#FBF8F1' }}>Read Customer Reviews</Link></section>
  </main>;
}