import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Brain, Coffee, ArrowRight, Zap, Heart } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

const theme = { page: '#F7F2E9', section: '#F7F2E9', sage: '#EEF2E8', card: '#FFFCF7', text: '#292626', body: '#5E4639', border: '#B89A6D', accent: '#9B4E2F', gold: '#E6AC45' };

// Conservative, educational ingredient descriptions. No disease-treatment
// claims — only traditional use, naturally occurring compounds, and notes
// that research remains ongoing.
const INGREDIENTS = [
  {
    name: "Lion's Mane Mushroom",
    scientific: 'Hericium erinaceus',
    icon: Brain,
    description: "Lion's Mane is a functional mushroom traditionally used in East Asian practice. Early research has explored compounds that may be associated with nerve growth factor (NGF) activity. Research remains ongoing and findings are not conclusive.",
    uses: ['Daily focus rituals', 'Mental clarity', 'Morning routines'],
  },
  {
    name: 'Cordyceps Mushroom',
    scientific: 'Cordyceps militaris',
    icon: Zap,
    description: 'Cordyceps is a functional mushroom traditionally used in East Asian practice, historically associated with energy and stamina. Research has explored compounds such as cordycepin; findings remain ongoing and are not conclusive.',
    uses: ['Daily energy rituals', 'Stamina', 'Active mornings'],
  },
  {
    name: 'Reishi Mushroom',
    scientific: 'Ganoderma lucidum',
    icon: Heart,
    description: 'Reishi is a functional mushroom with a long history of traditional use, valued for its naturally occurring triterpenes and beta-glucans. Modern research is still preliminary and health outcomes are not proven.',
    uses: ['Daily wellness support', 'Antioxidant intake', 'Evening wind-down'],
  },
  {
    name: 'Single-Origin Arabica Coffee',
    scientific: 'Coffea arabica',
    icon: Coffee,
    description: "Our classic coffee uses single-origin Arabica coffee, freeze-dried to preserve aroma and flavor. Arabica is known for its smooth, refined profile and naturally occurring caffeine and antioxidants.",
    uses: ['Morning energy', 'Afternoon pick-me-up', 'Traditional coffee ritual'],
  },
];

// Transparent overview of which ingredients are in the two current products.
const PRODUCTS = [
  { name: 'Instant Classic Coffee', ingredients: ['Single-origin Arabica coffee'], note: '27 servings · medium roast · high caffeine' },
  { name: 'Instant Mushroom Coffee', ingredients: ['Premium instant coffee', "Lion's Mane extract", 'Cordyceps extract', 'Reishi extract'], note: '27 servings · medium caffeine' },
];

// Local deep-dive links — kept inline so this page does not depend on a large
// shared SEO module that delayed the route's initial render.
const DEEP_DIVES = [
  { name: "Lion's Mane", slug: 'lions-mane-mushroom-coffee', category: 'Mushroom', color: '#9B4E2F' },
  { name: 'Reishi', slug: 'reishi-mushroom-coffee', category: 'Mushroom', color: '#8A6A3A' },
  { name: 'Freeze-Dried Coffee', slug: 'freeze-dried-instant-coffee', category: 'Coffee', color: '#7A5230' },
];

export default function Ingredients() {
  useSEO({
    title: 'Our Ingredients | Torch Republic Coffee Company',
    description: 'An honest overview of Torch Republic ingredients — Lion\u2019s Mane, Cordyceps, Reishi, and premium instant coffee — with conservative notes on traditional use and preliminary research.',
    url: '/ingredients',
    type: 'website',
  });

  return (
    <main className="min-h-screen" style={{ background: theme.page, color: theme.text }}>
      {/* Hero */}
      <section className="px-5 py-20 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 font-heading text-sm uppercase tracking-[0.35em]" style={{ color: theme.accent }}>Transparency & Quality</p>
          <h1 className="font-serif text-5xl font-bold leading-tight md:text-6xl" style={{ color: theme.text }}>Our Ingredients</h1>
          <p className="mx-auto mt-6 max-w-2xl font-heading text-lg leading-8" style={{ color: theme.body }}>Every Torch Republic product is made with clearly listed ingredients — no hidden additives, no artificial fillers, no proprietary blends. Here is what is inside, in plain language.</p>
        </div>
      </section>

      {/* What are functional mushrooms */}
      <section className="px-5 py-16 md:px-10" style={{ background: theme.section }}>
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 font-heading text-sm uppercase tracking-[0.3em]" style={{ color: theme.accent }}>Education</p>
          <h2 className="font-serif text-4xl font-bold" style={{ color: theme.text }}>What Are Functional Mushrooms?</h2>
          <div className="mt-6 space-y-5 font-heading leading-8" style={{ color: theme.body }}>
            <p>Functional mushrooms are varieties traditionally used beyond basic nutrition. They contain naturally occurring compounds such as beta-glucans, triterpenes, and antioxidants, and have a long history of use in traditional Eastern practices.</p>
            <p>The three functional mushrooms we use — Lion's Mane, Cordyceps and Reishi — have been studied for their potential wellness interest. These mushrooms have been used in traditional practice for centuries and are now the subject of ongoing modern research.</p>
            <p><strong>Important:</strong> Torch Republic products are created for daily ritual and general wellness support. They are not intended to diagnose, treat, cure, or prevent any disease. Always consult a healthcare professional before making significant changes to your diet or wellness routine.</p>
          </div>
        </div>
      </section>

      {/* Ingredient cards */}
      <section className="px-5 py-16 md:px-10">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="mb-10 text-center font-serif text-4xl font-bold" style={{ color: theme.text }}>What's Inside Every Cup</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {INGREDIENTS.map((ingredient) => {
              const Icon = ingredient.icon;
              return (
                <article key={ingredient.name} className="rounded-[2rem] border p-8" style={{ background: theme.card, borderColor: theme.border }}>
                  <div className="mb-6 flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: '#F7F2E9' }}>
                      <Icon className="h-5 w-5" style={{ color: theme.accent }} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl font-bold" style={{ color: theme.text }}>{ingredient.name}</h3>
                      <p className="mt-1 font-heading text-xs italic" style={{ color: theme.body }}>{ingredient.scientific}</p>
                    </div>
                  </div>
                  <p className="font-heading leading-7" style={{ color: theme.body }}>{ingredient.description}</p>
                  <div className="mt-6">
                    <p className="mb-3 font-heading text-xs uppercase tracking-[0.2em]" style={{ color: theme.accent }}>Often associated with</p>
                    <div className="flex flex-wrap gap-2">
                      {ingredient.uses.map((use) => (
                        <span key={use} className="rounded-full px-3 py-1.5 font-heading text-xs" style={{ background: '#F7F2E9', color: theme.body, border: `1px solid ${theme.border}` }}>{use}</span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Transparent product overview (replaces vague competitor table) */}
      <section className="px-5 py-16 md:px-10" style={{ background: theme.sage }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-10 text-center">
            <p className="mb-3 font-heading text-sm uppercase tracking-[0.3em]" style={{ color: theme.accent }}>By Product</p>
            <h2 className="font-serif text-4xl font-bold" style={{ color: theme.text }}>What's in Each Torch Republic Product</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {PRODUCTS.map((p) => (
              <article key={p.name} className="rounded-[1.5rem] border p-6" style={{ background: theme.card, borderColor: theme.border }}>
                <h3 className="font-serif text-xl font-bold" style={{ color: theme.text }}>{p.name}</h3>
                <p className="mt-1 font-heading text-xs" style={{ color: theme.body }}>{p.note}</p>
                <ul className="mt-4 space-y-2">
                  {p.ingredients.map((ing) => (
                    <li key={ing} className="flex items-center gap-2 font-heading text-sm" style={{ color: theme.body }}>
                      <CheckCircle className="h-4 w-4" style={{ color: theme.accent }} /> {ing}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* No hidden additives */}
      <section className="px-5 py-16 md:px-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-4xl font-bold" style={{ color: theme.text }}>No Hidden Additives. Ever.</h2>
          <p className="mt-4 font-heading leading-7" style={{ color: theme.body }}>We list every ingredient clearly. No proprietary blends, no hidden fillers, and no artificial ingredients.</p>
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {['No artificial flavors', 'No artificial colors', 'No preservatives', 'No fillers or flow agents', 'No added sugars', 'No GMO ingredients'].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5" style={{ color: theme.accent }} />
                <span className="font-heading text-sm" style={{ color: theme.body }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sourcing (conservative — no invented supplier relationships) */}
      <section className="px-5 py-16 md:px-10" style={{ background: theme.section }}>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-4xl font-bold" style={{ color: theme.text }}>Selected With Care</h2>
          <p className="mt-4 font-heading leading-7" style={{ color: theme.body }}>We keep the collection small on purpose. Our classic coffee is single-origin Arabica, and our mushroom coffee includes Lion's Mane, Cordyceps and Reishi extracts. We list every ingredient so you always know what is in your cup.</p>
          <Link to="/our-story" className="mt-6 inline-flex min-h-[48px] items-center rounded-full px-8 py-3 font-heading font-semibold" style={{ background: theme.accent, color: '#F7F2E9' }}>Read Our Story →</Link>
        </div>
      </section>

      {/* Deep dives */}
      <section className="px-5 py-16 md:px-10">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="mb-8 text-center font-serif text-4xl font-bold" style={{ color: theme.text }}>Ingredient Deep Dives</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {DEEP_DIVES.map((ing) => (
              <Link key={ing.slug} to={`/ingredients/${ing.slug}`} className="block rounded-[1rem] border p-5 text-center transition-all hover:opacity-90" style={{ background: theme.card, borderColor: theme.border }}>
                <p className="font-serif text-base font-bold" style={{ color: ing.color }}>{ing.name}</p>
                <p className="mt-1 font-heading text-[10px] uppercase tracking-[0.15em]" style={{ color: theme.body }}>{ing.category}</p>
                <div className="mt-2 flex items-center justify-center gap-1">
                  <span className="font-heading text-[10px] uppercase tracking-[0.15em]" style={{ color: theme.accent }}>Deep Dive</span>
                  <ArrowRight className="h-3 w-3" style={{ color: theme.accent }} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FDA disclaimer */}
      <section className="px-5 py-12 md:px-10" style={{ background: theme.section }}>
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-heading text-xs leading-7" style={{ color: theme.body }}>Statements on this site have not been evaluated by the FDA. These products are not intended to diagnose, treat, cure, or prevent any disease. If you are pregnant, nursing, taking medication, or have a health condition, consult a qualified healthcare professional before use.</p>
        </div>
      </section>
    </main>
  );
}