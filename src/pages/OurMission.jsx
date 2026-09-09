import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { ALL_PRODUCTS } from '@/lib/mushroomProducts';

const theme = { page: '#FBF8F1', section: '#F7F1E7', sage: '#EEF2E8', card: '#FFFFFF', text: '#292626', body: '#5F5145', border: '#E4D8C9', accent: '#B86543', gold: '#B48A4A' };

// Only products with a valid image are rendered, so a missing asset can never
// crash the entire page.
const products = (ALL_PRODUCTS || []).filter((p) => p && p.image && p.name && p.slug);

const principles = [
  ['Intentional routines', 'Products made to help a simple daily cup feel more deliberate.'],
  ['Thoughtful selection', 'A focused collection of two products, chosen with care over quantity.'],
  ['Clear transparency', 'Straightforward ingredient language and honest product descriptions.'],
  ['Convenient preparation', 'Instant formats for hot or iced drinks without pods or machines.'],
];

export default function OurMission() {
  useSEO({
    title: 'Our Story | Torch Republic Coffee Company',
    description: 'Torch Republic Coffee Company is a modern coffee and wellness brand built around simple, intentional daily rituals — instant coffee and functional mushroom coffee.',
    url: '/our-story',
    type: 'website',
  });

  return (
    <main className="min-h-screen" style={{ background: theme.page, color: theme.text }}>
      {/* Hero */}
      <section className="px-5 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 font-heading text-sm uppercase tracking-[0.35em]" style={{ color: theme.accent }}>Our Story</p>
          <h1 className="font-serif text-5xl font-bold leading-tight md:text-6xl" style={{ color: theme.text }}>A Better Daily Ritual, Made Simple</h1>
          <p className="mx-auto mt-6 max-w-2xl font-heading text-lg leading-8" style={{ color: theme.body }}>Torch Republic Coffee Company is a modern coffee and wellness brand built around simple, intentional daily rituals — a few thoughtfully made products for the moments that start and shape your day.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/shop" className="inline-flex min-h-[48px] items-center justify-center rounded-full px-8 py-3 font-heading font-semibold" style={{ background: theme.accent, color: '#FBF8F1' }}>Explore the Collection</Link>
            <Link to="/founder-story" className="inline-flex min-h-[48px] items-center justify-center rounded-full border px-8 py-3 font-heading font-semibold" style={{ borderColor: theme.accent, color: theme.accent }}>Read the Founder Story</Link>
          </div>
        </div>
      </section>

      {/* Why we began */}
      <section className="px-5 py-16 md:px-10" style={{ background: theme.section }}>
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 font-heading text-sm uppercase tracking-[0.3em]" style={{ color: theme.accent }}>Why Torch Republic Began</p>
          <h2 className="font-serif text-4xl font-bold" style={{ color: theme.text }}>Convenience without losing intention.</h2>
          <div className="mt-6 space-y-5 font-heading leading-8" style={{ color: theme.body }}>
            <p>Torch Republic began with a simple idea: the convenience of instant coffee without the pods, machines, or complicated steps. We wanted a daily cup that felt easy and still worth slowing down for.</p>
            <p>That idea became a small, focused collection — instant coffee and mushroom coffee — made for people who want their routine to feel simple, elevated, and more mindful.</p>
          </div>
        </div>
      </section>

      {/* Why three products */}
      <section className="px-5 py-16 md:px-10" style={{ background: theme.sage }}>
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="mb-3 font-heading text-sm uppercase tracking-[0.3em]" style={{ color: theme.accent }}>Why Two Products</p>
            <h2 className="font-serif text-4xl font-bold" style={{ color: theme.text }}>A focused collection, made well.</h2>
            <p className="mx-auto mt-4 max-w-2xl font-heading leading-7" style={{ color: theme.body }}>Each product is designed for convenient hot or iced preparation without pods or complicated equipment.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {products.map((product) => (
              <article key={product.slug} className="overflow-hidden rounded-[2rem] border" style={{ background: theme.card, borderColor: theme.border }}>
                <div className="p-6" style={{ background: '#F8F5EF' }}>
                  <img src={product.image} alt={`${product.name} by Torch Republic`} className="mx-auto aspect-square w-full max-w-[220px] object-contain" loading="lazy" />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-bold" style={{ color: theme.text }}>{product.name}</h3>
                  <p className="mt-3 font-heading leading-7" style={{ color: theme.body }}>{product.description}</p>
                  <Link to={`/products/${product.slug}`} className="mt-5 inline-flex font-heading font-semibold" style={{ color: theme.accent }}>View product →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="px-5 py-16 md:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-center font-heading text-sm uppercase tracking-[0.3em]" style={{ color: theme.accent }}>What Guides Us</p>
          <h2 className="text-center font-serif text-4xl font-bold" style={{ color: theme.text }}>Built around small daily choices.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {principles.map(([title, body], index) => (
              <article key={title} className="rounded-[1.5rem] border p-6" style={{ background: theme.card, borderColor: theme.border }}>
                <p className="mb-4 font-serif text-3xl" style={{ color: theme.gold }}>0{index + 1}</p>
                <h3 className="font-heading text-lg font-semibold" style={{ color: theme.text }}>{title}</h3>
                <p className="mt-3 font-heading leading-7" style={{ color: theme.body }}>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Founder callout */}
      <section className="px-5 py-16 md:px-10" style={{ background: theme.section }}>
        <div className="mx-auto max-w-4xl rounded-[2rem] border p-8 md:p-10" style={{ background: theme.card, borderColor: theme.border }}>
          <p className="mb-3 font-heading text-sm uppercase tracking-[0.3em]" style={{ color: theme.accent }}>Founder Note</p>
          <h2 className="font-serif text-4xl font-bold" style={{ color: theme.text }}>One cup. One ritual. One intentional step forward.</h2>
          <div className="mt-6 space-y-5 font-heading leading-8" style={{ color: theme.body }}>
            <p>We believe wellness is not about perfection. It is built through small, consistent choices repeated day after day.</p>
            <p>The torch in our name represents awareness — the quiet light that reminds us growth is always possible.</p>
          </div>
          <p className="mt-6 font-heading font-semibold" style={{ color: theme.text }}>Lisa Marie Kocian, Founder</p>
          <Link to="/founder-story" className="mt-6 inline-flex min-h-[44px] items-center rounded-full border px-6 py-2 font-heading font-semibold" style={{ borderColor: theme.accent, color: theme.accent }}>Read the full Founder Story →</Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 py-20 text-center md:px-10">
        <h2 className="font-serif text-4xl font-bold" style={{ color: theme.text }}>Find the Ritual That Fits Your Day</h2>
        <p className="mx-auto mt-4 max-w-2xl font-heading leading-8" style={{ color: theme.body }}>Explore instant coffee and mushroom coffee designed for simple daily routines.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/shop" className="inline-flex min-h-[48px] items-center justify-center rounded-full px-8 py-3 font-heading font-semibold" style={{ background: theme.text, color: '#FBF8F1' }}>Explore the Collection</Link>
          <Link to="/quiz" className="inline-flex min-h-[48px] items-center justify-center rounded-full border px-8 py-3 font-heading font-semibold" style={{ borderColor: theme.accent, color: theme.accent }}>Find Your Blend</Link>
        </div>
        <p className="mt-10 font-heading text-xs leading-6" style={{ color: theme.body }}>Torch Republic Coffee Company is a DBA of LiberTees For All Apparel LLC.</p>
      </section>
    </main>
  );
}