import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';

export default function CeremonialMatchaVsCulinary() {
  useSEO({
    title: 'Ceremonial Matcha vs Culinary Matcha: What\'s the Difference?',
    description: 'Ceremonial matcha is shade-grown, stone-milled whole leaf green tea. Culinary matcha is lower grade, harsher, and made for cooking. Learn why grade matters for your daily ritual.',
    url: '/journal/ceremonial-matcha-vs-culinary',
    type: 'article',
    article: {
      author: 'Torch Republic Coffee Co.',
      datePublished: '2026-06-02T00:00:00Z',
      dateModified: '2026-06-14T00:00:00Z',
      section: 'Matcha',
      keywords: ['ceremonial matcha vs culinary matcha', 'what is ceremonial matcha', 'ceremonial grade matcha', 'matcha grades explained', 'best matcha for drinking', 'instant ceremonial matcha'],
    },
    faq: [
      { question: 'What is ceremonial grade matcha?', answer: 'Ceremonial grade matcha is the highest quality matcha, made from the youngest shade-grown tea leaves that are stone-milled into a fine powder. It is smooth, naturally sweet, and designed for drinking,  not baking or cooking.' },
      { question: 'Can you drink culinary grade matcha?', answer: 'You can, but culinary grade matcha has a more bitter, astringent taste. It\'s optimized for use in recipes where other flavors mask it. For a smooth daily matcha ritual, ceremonial grade is the better choice.' },
      { question: 'Is ceremonial matcha worth the extra cost?', answer: 'If you are drinking matcha straight,  with just water or milk,  yes. The quality difference is noticeable in taste and color. Torch Republic matcha products use ceremonial grade at $24.99 for 25 servings, which is about $1.00 per serving.' },
      { question: 'What does shade-grown mean for matcha?', answer: 'Shade-growing means the tea plants are covered before harvest, limiting sunlight. This slows growth and increases chlorophyll production, resulting in deeper green color, higher L-Theanine content, and a sweeter, smoother flavor.' },
    ],
  });

  return (
    <article style={{ background: '#080808', color: '#F7F1E8', minHeight: '100vh' }}>
      <div className="max-w-[740px] mx-auto px-6 py-16 md:py-24">

        <nav className="flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] uppercase mb-10" style={{ color: 'rgba(255,255,255,0.28)' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }} className="hover:text-white transition-colors">Home</Link>
          <span>›</span>
          <Link to="/journal" style={{ color: 'inherit', textDecoration: 'none' }} className="hover:text-white transition-colors">Journal</Link>
          <span>›</span>
          <span style={{ color: '#E6B7AD' }}>Ceremonial vs Culinary Matcha</span>
        </nav>

        <span className="font-mono text-[8px] tracking-[0.4em] uppercase px-3 py-1.5 mb-6 inline-block" style={{ background: 'rgba(107,189,90,0.1)', color: '#6CBD5A', border: '1px solid rgba(107,189,90,0.25)' }}>
          Matcha
        </span>

        <h1 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          Ceremonial Matcha vs Culinary Matcha: What's the Difference?
        </h1>

        <p className="font-heading mb-8" style={{ fontSize: '1.1rem', color: 'rgba(247,241,232,0.6)', fontWeight: 300, lineHeight: 1.9 }}>
          If you've shopped for matcha, you've seen two grades: ceremonial and culinary. The difference is significant,  and it explains why premium matcha costs more than the green powder at your grocery store.
        </p>

        <div className="h-px w-full mb-10" style={{ background: 'linear-gradient(90deg, rgba(107,189,90,0.4), transparent)' }} />

        <div className="space-y-8 font-heading" style={{ fontSize: '1rem', color: 'rgba(247,241,232,0.75)', fontWeight: 300, lineHeight: 1.85 }}>

          <section>
            <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.3rem' }}>What Is Ceremonial Grade Matcha?</h2>
            <p>Ceremonial grade matcha is the highest quality matcha available. It's made exclusively from the youngest, most tender tea leaves harvested at the top of the plant,  then stone-milled into a fine, vibrant powder.</p>
            <p className="mt-3">The word "ceremonial" comes from the traditional Japanese tea ceremony (chado), where only the finest matcha was served. Today, ceremonial grade means matcha that is smooth, naturally sweet, and designed for drinking straight,  just whisked with hot water.</p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.3rem' }}>What Is Culinary Grade Matcha?</h2>
            <p>Culinary grade matcha is produced from older, more mature leaves,  often from the lower parts of the plant. It's a more robust, more bitter powder designed to hold up in recipes: lattes with lots of milk, baked goods, smoothies, ice cream.</p>
            <p className="mt-3">In those uses, the other ingredients mask the bitterness. But if you try to drink culinary matcha straight? You'll notice the difference immediately.</p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-white mb-4" style={{ fontSize: '1.3rem' }}>Grade Comparison at a Glance</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(107,189,90,0.2)' }}>
                    <th className="text-left py-3 font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}></th>
                    <th className="py-3 font-mono text-[8px] tracking-[0.25em] uppercase text-center" style={{ color: '#6CBD5A' }}>Ceremonial</th>
                    <th className="py-3 font-mono text-[8px] tracking-[0.25em] uppercase text-center" style={{ color: 'rgba(255,255,255,0.35)' }}>Culinary</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Leaf harvest', 'Young, tender tips', 'Mature lower leaves'],
                    ['Color', 'Vivid emerald green', 'Dull or yellowish green'],
                    ['Flavor', 'Smooth, sweet, umami', 'Bitter, astringent'],
                    ['Processing', 'Stone-milled', 'Industrial grinding'],
                    ['Best for', 'Drinking straight', 'Cooking & baking'],
                    ['Shade-grown', 'Yes', 'Sometimes'],
                    ['L-Theanine content', 'Higher', 'Lower'],
                  ].map(([f, c, cu]) => (
                    <tr key={f} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td className="py-2.5 pr-4" style={{ color: 'rgba(247,241,232,0.7)' }}>{f}</td>
                      <td className="py-2.5 text-center text-xs" style={{ color: '#6CBD5A' }}>{c}</td>
                      <td className="py-2.5 text-center text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{cu}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.3rem' }}>Why Shade-Growing Matters</h2>
            <p>About three to four weeks before harvest, ceremonial matcha tea plants are covered to block direct sunlight. This forces the plant to produce more chlorophyll (giving it that deep green color) and increases L-Theanine,  the amino acid responsible for matcha's famous calm-focus effect.</p>
            <p className="mt-3">Shade-growing is labor-intensive. It requires careful timing and monitoring. That's part of why ceremonial matcha costs more.</p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.3rem' }}>Why Stone-Milling Matters</h2>
            <p>Ceremonial matcha is ground on traditional granite stone mills,  a slow, cool process that preserves flavor compounds, enzymes, and nutrients. Industrial grinding generates heat that can degrade these compounds.</p>
            <p className="mt-3">Stone-milling also produces a finer, more uniform powder,  one reason ceremonial matcha dissolves so smoothly and froths so beautifully when whisked.</p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.3rem' }}>L-Theanine: The Calm Focus Compound</h2>
            <p>L-Theanine is an amino acid found naturally in green tea,  and in higher concentrations in shade-grown, ceremonial matcha. It's known for supporting calm, focused energy without jitters or the crash you might get from caffeine alone.</p>
            <p className="mt-3">This is why matcha drinkers often describe the energy as "smooth" or "focused",  it's the L-Theanine and caffeine working together. Ceremonial grade maximizes this effect. Culinary grade delivers less of it.</p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.3rem' }}>Torch Republic Matcha: Ceremonial Grade, Instant Format</h2>
            <p>Both Torch Republic matcha blends,  <Link to="/products/the-monk-matcha-blend" style={{ color: '#E6B7AD', textDecoration: 'none' }}>The Monk</Link> and <Link to="/products/the-alchemist-matcha-blend" style={{ color: '#E6B7AD', textDecoration: 'none' }}>The Alchemist</Link>,  use 100% ceremonial grade matcha in instant format.</p>
            <p className="mt-3">That means you get the smooth, vibrant taste and full L-Theanine content of ceremonial matcha,  without needing a bamboo whisk, a chawan, or any equipment at all. Just add water and stir.</p>
            <p className="mt-3">25 servings per tin. $24.99. About $1.00 per ceremonial-grade serving.</p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.3rem' }}>The Bottom Line</h2>
            <p>If you're drinking matcha for the ritual,  the calm, focused energy, the intention, the taste,  choose ceremonial grade. Culinary grade is for cooking.</p>
            <p className="mt-3">The price difference is real but reasonable. At $1.00 per serving, ceremonial matcha from Torch Republic costs a fraction of what you'd pay at a café,  and delivers a better, more consistent cup every time.</p>
          </section>

        </div>

        <p className="font-mono text-[8px] tracking-[0.1em] leading-relaxed mt-12 pt-6" style={{ color: 'rgba(255,255,255,0.2)', borderTop: '1px solid rgba(107,189,90,0.1)' }}>
          Statements on this site have not been evaluated by the FDA. These products are not intended to diagnose, treat, cure, or prevent any disease.
        </p>

        <div className="mt-10 p-6" style={{ background: 'rgba(107,189,90,0.04)', border: '1px solid rgba(107,189,90,0.15)' }}>
          <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-3" style={{ color: 'rgba(107,189,90,0.6)' }}>Ready for Ceremonial Matcha?</p>
          <p className="font-heading text-sm mb-4" style={{ color: 'rgba(247,241,232,0.6)', fontWeight: 300, lineHeight: 1.7 }}>
            Explore our ceremonial grade matcha blends,  instant format, no equipment needed.
          </p>
          <Link to="/shop/matcha" className="inline-block font-mono text-[9px] tracking-[0.3em] uppercase font-bold px-6 py-3 transition-all hover:opacity-90" style={{ background: '#6CBD5A', color: '#080808' }}>
            Shop Ceremonial Matcha →
          </Link>
        </div>

        <div className="mt-12">
          <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.4)' }}>Related Articles</p>
          <div className="space-y-2">
            {[
              { to: '/journal/instant-ceremonial-matcha', label: 'Instant Ceremonial Matcha: Is It Worth It?' },
              { to: '/journal/matcha-benefits', label: 'Matcha Benefits: What the Research Shows' },
              { to: '/journal/history-of-matcha', label: 'The History of Matcha' },
            ].map(({ to, label }) => (
              <Link key={to} to={to} className="block font-heading text-sm" style={{ color: '#E6B7AD', textDecoration: 'none' }}>→ {label}</Link>
            ))}
          </div>
        </div>

      </div>
    </article>
  );
}