import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronDown } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { base44 } from '@/api/base44Client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ALL_PRODUCTS } from '@/lib/mushroomProducts';
import MobileSelect from '@/components/forms/MobileSelect';

const theme = {
  page: '#F7F2E9',
  section: '#F7F2E9',
  sage: '#EEF2E8',
  card: '#FFFCF7',
  text: '#264A35',
  body: '#5E4639',
  border: '#B89A6D',
  accent: '#9B4E2F',
  gold: '#E6AC45',
};

const categoryLabels = {
  'classic-coffee': 'Classic Coffee',
  'mushroom-coffee': 'Mushroom Coffee',
};

function StarRating({ rating, size = 'sm' }) {
  const stars = Math.max(0, Math.min(5, Number(rating) || 0));
  const sz = size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';
  return <div className="flex items-center gap-1" aria-label={`${stars} out of 5 stars`}>{[1, 2, 3, 4, 5].map((i) => <Star key={i} className={`${sz} ${i <= stars ? 'fill-current' : ''}`} style={{ color: i <= stars ? theme.gold : '#D8C9B6' }} aria-hidden="true" />)}</div>;
}

function ReviewCard({ review }) {
  const product = ALL_PRODUCTS.find((p) => p.shopifyHandle === review.product_handle || p.slug === review.product_id);
  return <article className="rounded-[1.5rem] border p-6 shadow-sm" style={{ background: theme.card, borderColor: theme.border }}>
    <div className="mb-4 flex items-center justify-between gap-4"><StarRating rating={review.rating} /><time className="font-heading text-sm" style={{ color: theme.body }}>{review.review_date ? new Date(review.review_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''}</time></div>
    {product && <p className="mb-3 font-heading text-sm font-semibold" style={{ color: theme.accent }}>{product.name}</p>}
    <blockquote className="font-heading text-base leading-8" style={{ color: theme.body }}>“{review.body}”</blockquote>
    <div className="mt-6 border-t pt-4" style={{ borderColor: theme.border }}><p className="font-heading font-semibold" style={{ color: theme.text }}>{review.reviewer_name}</p>{review.location && <p className="font-heading text-sm" style={{ color: theme.body }}>{review.location}</p>}</div>
  </article>;
}

export default function Reviews() {
  const queryClient = useQueryClient();
  const [category, setCategory] = useState('all');
  const [productHandle, setProductHandle] = useState('all');
  const [sort, setSort] = useState('recent');
  const [showAll, setShowAll] = useState(false);
  const [form, setForm] = useState({ reviewer_name: '', location: '', product_handle: '', rating: 0, body: '' });
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useSEO({ title: 'Torch Republic Reviews', description: 'Read customer experiences with Torch Republic instant coffee and mushroom coffee.', url: '/reviews', type: 'website' });

  const { data: allReviews = [] } = useQuery({ queryKey: ['reviews'], queryFn: () => base44.entities.Review.list('-review_date', 200) });
  const productMap = useMemo(() => new Map(ALL_PRODUCTS.map((p) => [p.shopifyHandle, p])), []);
  const reviewedProducts = useMemo(() => ALL_PRODUCTS.filter((p) => allReviews.some((r) => r.product_handle === p.shopifyHandle)), [allReviews]);
  const categories = useMemo(() => Object.keys(categoryLabels).filter((key) => reviewedProducts.some((p) => p.category === key)), [reviewedProducts]);
  const reviewedProductOptions = useMemo(() => [{ value: 'all', label: 'Product name' }, ...reviewedProducts.map((p) => ({ value: p.shopifyHandle, label: p.name }))], [reviewedProducts]);
  const allProductOptions = useMemo(() => [{ value: '', label: 'Choose a product' }, ...ALL_PRODUCTS.map((p) => ({ value: p.shopifyHandle, label: p.name }))], []);
  const ratingOptions = useMemo(() => [{ value: 0, label: 'Select a rating' }, ...[5, 4, 3, 2, 1].map((rating) => ({ value: rating, label: `${rating} stars` }))], []);
  const sortOptions = useMemo(() => [{ value: 'recent', label: 'Most Recent' }, { value: 'highest', label: 'Highest Rated' }], []);

  const filtered = useMemo(() => {
    let items = [...allReviews];
    if (category !== 'all') items = items.filter((r) => productMap.get(r.product_handle)?.category === category);
    if (productHandle !== 'all') items = items.filter((r) => r.product_handle === productHandle);
    return items.sort((a, b) => sort === 'highest' ? (Number(b.rating) || 0) - (Number(a.rating) || 0) : new Date(b.review_date || b.created_date || 0) - new Date(a.review_date || a.created_date || 0));
  }, [allReviews, category, productHandle, productMap, sort]);

  const avgRating = allReviews.length ? (allReviews.reduce((sum, r) => sum + (Number(r.rating) || 0), 0) / allReviews.length).toFixed(1) : null;
  const distribution = [5, 4, 3, 2, 1].map((rating) => ({ rating, count: allReviews.filter((r) => Number(r.rating) === rating).length }));
  const visibleReviews = showAll ? filtered : filtered.slice(0, 9);

  const submitReview = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    if (!form.product_handle) {
      setMessage('Please choose the product you reviewed.');
      setSubmitting(false);
      return;
    }
    if (Number(form.rating) < 1) {
      setMessage('Please select a star rating.');
      setSubmitting(false);
      return;
    }
    try {
      await base44.entities.Review.create({ ...form, rating: Number(form.rating), review_date: new Date().toISOString(), product_id: ALL_PRODUCTS.find((p) => p.shopifyHandle === form.product_handle)?.slug });
      setForm({ reviewer_name: '', location: '', product_handle: '', rating: 0, body: '' });
      setMessage('Thank you — your review has been submitted.');
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    } catch (error) { setMessage('We could not submit your review right now. Please try again.'); }
    setSubmitting(false);
  };

  return <main className="min-h-screen" style={{ background: theme.page, color: theme.text }}>
    <section className="relative overflow-hidden px-5 py-20 md:px-10 md:py-24" style={{ background: theme.section }}>
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-40" style={{ background: theme.sage }} aria-hidden="true" />
      <div className="mx-auto max-w-3xl text-center"><p className="mb-4 font-heading text-sm uppercase tracking-[0.35em]" style={{ color: theme.accent }}>Customer Reviews</p><h1 className="font-serif text-5xl font-bold leading-tight md:text-6xl" style={{ color: theme.text }}>Real Rituals. Real Experiences.</h1><p className="mx-auto mt-6 max-w-2xl font-heading text-lg leading-8" style={{ color: theme.body }}>Read what customers are sharing about Torch Republic coffee and their everyday routines.</p></div>
    </section>

    {allReviews.length > 0 && <section className="px-5 py-12 md:px-10"><div className="mx-auto grid max-w-6xl gap-6 rounded-[2rem] border p-6 md:grid-cols-[260px_1fr] md:p-8" style={{ background: theme.card, borderColor: theme.border }}><div><p className="font-serif text-5xl font-bold" style={{ color: theme.text }}>{avgRating}</p><StarRating rating={Math.round(Number(avgRating))} size="lg" /><p className="mt-3 font-heading" style={{ color: theme.body }}>Based on {allReviews.length} customer {allReviews.length === 1 ? 'review' : 'reviews'}.</p></div><div className="space-y-3">{distribution.map((row) => <div key={row.rating} className="grid grid-cols-[64px_1fr_40px] items-center gap-3"><span className="font-heading text-sm" style={{ color: theme.body }}>{row.rating} star</span><div className="h-2 rounded-full" style={{ background: '#F0E7DB' }}><div className="h-2 rounded-full" style={{ width: `${allReviews.length ? (row.count / allReviews.length) * 100 : 0}%`, background: theme.gold }} /></div><span className="font-heading text-sm" style={{ color: theme.body }}>{row.count}</span></div>)}</div></div></section>}

    {allReviews.length === 0 && <section className="px-5 py-16 md:px-10"><div className="mx-auto max-w-2xl rounded-[2rem] border p-10 text-center" style={{ background: theme.card, borderColor: theme.border }}><p className="font-serif text-3xl font-bold mb-4" style={{ color: theme.text }}>No verified purchase reviews yet.</p><p className="font-heading" style={{ color: theme.body, lineHeight: 1.8 }}>When customers share their experiences, they will appear here. Be the first to leave a review after trying Torch Republic coffee.</p><div className="mt-8"><Link to="/shop" className="inline-flex min-h-[48px] items-center rounded-full px-8 py-3 font-heading font-semibold" style={{ background: theme.accent, color: '#F7F2E9' }}>Shop Coffee</Link></div></div></section>}

    <section className="px-5 pb-6 md:px-10"><div className="mx-auto flex max-w-6xl flex-col gap-3 rounded-[1.25rem] border p-4 md:flex-row md:items-center" style={{ background: theme.card, borderColor: theme.border }}><button onClick={() => { setCategory('all'); setProductHandle('all'); }} className="w-full rounded-full px-5 py-3 font-heading text-sm font-semibold md:w-auto" style={{ background: category === 'all' && productHandle === 'all' ? theme.text : '#F7F2E9', color: category === 'all' && productHandle === 'all' ? '#F7F2E9' : theme.text }}>All Reviews</button>{categories.map((key) => <button key={key} onClick={() => { setCategory(key); setProductHandle('all'); }} className="w-full rounded-full px-5 py-3 font-heading text-sm font-semibold md:w-auto" style={{ background: category === key ? theme.text : '#F7F2E9', color: category === key ? '#F7F2E9' : theme.text }}>{categoryLabels[key]}</button>)}<MobileSelect ariaLabel="Filter by product" title="Filter by product" value={productHandle} onChange={setProductHandle} options={reviewedProductOptions} className="rounded-full border bg-white px-4 font-heading text-base md:w-auto" style={{ borderColor: theme.border, color: theme.text }} /><MobileSelect ariaLabel="Sort reviews" title="Sort reviews" value={sort} onChange={setSort} options={sortOptions} className="rounded-full border bg-white px-4 font-heading text-base md:w-auto" style={{ borderColor: theme.border, color: theme.text }} /></div></section>

    <section className="px-5 py-10 md:px-10"><div className="mx-auto max-w-6xl">{visibleReviews.length ? <><p className="mb-6 text-center font-heading text-sm" style={{ color: theme.body }}>Showing {visibleReviews.length} of {filtered.length} reviews</p><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{visibleReviews.map((review) => <ReviewCard key={review.id} review={review} />)}</div>{!showAll && filtered.length > visibleReviews.length && <div className="mt-10 text-center"><button onClick={() => setShowAll(true)} className="inline-flex min-h-[44px] items-center gap-2 rounded-full border px-7 py-3 font-heading font-semibold" style={{ borderColor: theme.accent, color: theme.accent }}>Show More Reviews <ChevronDown className="h-4 w-4" /></button></div>}</> : <div className="rounded-[2rem] border p-10 text-center" style={{ background: theme.card, borderColor: theme.border }}><p className="font-heading text-lg" style={{ color: theme.body }}>No reviews are available for this filter yet.</p></div>}</div></section>

    <section className="px-5 py-16 md:px-10" style={{ background: theme.sage }}><div className="mx-auto grid max-w-6xl gap-8 rounded-[2rem] border p-6 md:grid-cols-[0.8fr_1.2fr] md:p-8" style={{ background: theme.card, borderColor: theme.border }}><div><p className="mb-3 font-heading text-sm uppercase tracking-[0.3em]" style={{ color: theme.accent }}>Write a Review</p><h2 className="font-serif text-4xl font-bold" style={{ color: theme.text }}>Share your Torch Republic ritual.</h2><p className="mt-4 font-heading leading-8" style={{ color: theme.body }}>Choose the product you tried and tell other customers what the experience was like.</p>{message && <p className="mt-4 rounded-xl p-3 font-heading text-sm" style={{ background: '#F7F2E9', color: theme.text }}>{message}</p>}</div><form onSubmit={submitReview} className="grid gap-4"><label className="font-heading text-sm font-semibold" style={{ color: theme.text }}>Display name<input required value={form.reviewer_name} onChange={(e) => setForm({ ...form, reviewer_name: e.target.value })} className="mt-2 min-h-[44px] w-full rounded-xl border px-4 text-base" style={{ borderColor: theme.border }} /></label><label className="font-heading text-sm font-semibold" style={{ color: theme.text }}>Product<MobileSelect ariaLabel="Choose a product to review" title="Choose a product" value={form.product_handle} onChange={(value) => setForm({ ...form, product_handle: value })} options={allProductOptions} className="mt-2 rounded-xl border bg-white px-4 text-base" style={{ borderColor: theme.border }} /></label><label className="font-heading text-sm font-semibold" style={{ color: theme.text }}>Rating<MobileSelect ariaLabel="Choose a rating" title="Choose a rating" value={form.rating} onChange={(value) => setForm({ ...form, rating: value })} options={ratingOptions} className="mt-2 rounded-xl border bg-white px-4 text-base" style={{ borderColor: theme.border }} /></label><label className="font-heading text-sm font-semibold" style={{ color: theme.text }}>Review<textarea required value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} rows={5} className="mt-2 w-full rounded-xl border px-4 py-3 text-base" style={{ borderColor: theme.border }} /></label><label className="font-heading text-sm font-semibold" style={{ color: theme.text }}>Location, optional<input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="mt-2 min-h-[44px] w-full rounded-xl border px-4 text-base" style={{ borderColor: theme.border }} /></label><button disabled={submitting} className="min-h-[48px] rounded-full px-7 py-3 font-heading font-semibold disabled:opacity-60" style={{ background: theme.accent, color: '#F7F2E9' }}>{submitting ? 'Submitting…' : 'Write a Review'}</button></form></div></section>

    <section className="px-5 py-16 text-center md:px-10"><h2 className="font-serif text-4xl font-bold" style={{ color: theme.text }}>Explore the Collection</h2><p className="mx-auto mt-4 max-w-2xl font-heading leading-8" style={{ color: theme.body }}>Find the coffee that fits your daily ritual.</p><Link to="/shop" className="mt-8 inline-flex min-h-[48px] items-center rounded-full px-8 py-3 font-heading font-semibold" style={{ background: theme.text, color: '#F7F2E9' }}>Explore the Collection</Link></section>
  </main>;
}