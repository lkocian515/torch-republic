import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Shield, Leaf, Coffee, ArrowRight } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

const theme = { page: '#FBF8F1', section: '#F7F1E7', sage: '#EEF2E8', card: '#FFFFFF', text: '#292626', body: '#5F5145', border: '#E4D8C9', accent: '#B86543', gold: '#B48A4A' };

const TOPICS = [
  { icon: Brain, title: "Lion's Mane", slug: 'lions-mane-mushroom-coffee', summary: "Lion's Mane (Hericium erinaceus) is a functional mushroom traditionally used in East Asian practice and currently studied for compounds that may be associated with cognitive support. Research remains ongoing." },
  { icon: Shield, title: 'Chaga', slug: 'chaga-mushroom-coffee', summary: "Chaga (Inonotus obliquus) grows on birch trees in cold climates and contains naturally occurring antioxidants. It has a long history of traditional use; modern research is still preliminary." },
  { icon: Leaf, title: 'Ceremonial Matcha', slug: 'ceremonial-matcha', summary: "Matcha is made from shade-grown green tea leaves stone-ground into a fine powder. It contains naturally occurring L-theanine and antioxidants, and is often studied for calm, sustained focus." },
  { icon: Coffee, title: 'Instant Coffee', slug: 'freeze-dried-instant-coffee', summary: "Freeze-dried instant coffee preserves the aroma and flavor of brewed coffee in a convenient format. It contains naturally occurring caffeine and antioxidants." },
];

const EVIDENCE = [
  ['Traditional use', "Lion's Mane, Cordyceps, Reishi, and matcha each have long histories of use in traditional practices. Traditional use is not the same as established clinical evidence."],
  ['Preliminary research', "A number of laboratory and small human studies have explored these ingredients. Early findings are promising but limited, and more rigorous, larger studies are needed before drawing firm conclusions."],
  ['Established evidence', "Some properties — such as the caffeine and antioxidant content of coffee and matcha — are better established. Health outcomes beyond that are not proven for Torch Republic products."],
];

export default function ResearchHub() {
  useSEO({
    title: 'Research Hub | Torch Republic Coffee Company',
    description: 'An educational overview of the ingredients behind Torch Republic — functional mushrooms, ceremonial matcha, and instant coffee — with notes on traditional use, preliminary research, and established evidence.',
    url: '/research',
    type: 'website',
  });

  return (
    <main className="min-h-screen" style={{ background: theme.page, color: theme.text }}>
      {/* Hero */}
      <section className="px-5 py-20 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 font-heading text-sm uppercase tracking-[0.35em]" style={{ color: theme.accent }}>Research Hub</p>
          <h1 className="font-serif text-5xl font-bold leading-tight md:text-6xl" style={{ color: theme.text }}>What We Know About Our Ingredients</h1>
          <p className="mx-auto mt-6 max-w-2xl font-heading text-lg leading-8" style={{ color: theme.body }}>An educational overview of the ingredients behind Torch Republic products — what they are, how they have been used, and what current research does and does not yet show.</p>
        </div>
      </section>

      {/* Ingredients we feature */}
      <section className="px-5 py-16 md:px-10" style={{ background: theme.section }}>
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center font-serif text-4xl font-bold" style={{ color: theme.text }}>Ingredients We Feature</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {TOPICS.map(({ icon: Icon, title, slug, summary }) => (
              <article key={slug} className="rounded-[2rem] border p-6" style={{ background: theme.card, borderColor: theme.border }}>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full" style={{ background: '#F3ECE2' }}>
                  <Icon className="h-5 w-5" style={{ color: theme.accent }} aria-hidden="true" />
                </div>
                <h3 className="font-serif text-2xl font-bold" style={{ color: theme.text }}>{title}</h3>
                <p className="mt-3 font-heading leading-7" style={{ color: theme.body }}>{summary}</p>
                <Link to={`/ingredients/${slug}`} className="mt-5 inline-flex items-center gap-2 font-heading font-semibold" style={{ color: theme.accent }}>Read the deep dive <ArrowRight className="h-4 w-4" /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How to read this research */}
      <section className="px-5 py-16 md:px-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center font-serif text-4xl font-bold" style={{ color: theme.text }}>How to Read This Research</h2>
          <div className="space-y-5">
            {EVIDENCE.map(([label, body]) => (
              <article key={label} className="rounded-[1.5rem] border p-6" style={{ background: theme.card, borderColor: theme.border }}>
                <p className="mb-2 font-heading text-sm uppercase tracking-[0.2em]" style={{ color: theme.accent }}>{label}</p>
                <p className="font-heading leading-7" style={{ color: theme.body }}>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Read more */}
      <section className="px-5 py-16 md:px-10" style={{ background: theme.sage }}>
        <div className="mx-auto max-w-4xl rounded-[2rem] border p-8 md:p-10" style={{ background: theme.card, borderColor: theme.border }}>
          <h2 className="mb-4 font-serif text-3xl font-bold" style={{ color: theme.text }}>Read More</h2>
          <p className="font-heading leading-7" style={{ color: theme.body }}>Explore our Journal for articles on preparation, rituals, and ingredients, or visit the full ingredient overview.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link to="/journal" className="inline-flex min-h-[48px] items-center justify-center rounded-full px-8 py-3 font-heading font-semibold" style={{ background: theme.accent, color: '#FBF8F1' }}>Visit the Journal</Link>
            <Link to="/ingredients" className="inline-flex min-h-[48px] items-center justify-center rounded-full border px-8 py-3 font-heading font-semibold" style={{ borderColor: theme.accent, color: theme.accent }}>Ingredient Overview</Link>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="px-5 py-12 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-heading text-xs leading-7" style={{ color: theme.body }}>This page is for general educational purposes only. Statements here have not been evaluated by the FDA and are not intended to diagnose, treat, cure, or prevent any disease. If you are pregnant, nursing, taking medication, or have a health condition, consult a qualified healthcare professional before making changes to your routine.</p>
        </div>
      </section>
    </main>
  );
}