import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const AC = '#C9A24A';

export default function GeorgeWashingtonCoffee() {
  useEffect(() => {
    document.title = "George Washington's Coffee: What America's First President Might Have Drunk | Torch Republic";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', "Explore the rich history of George Washington's coffee habits and how the first president's love of bold, strong coffee inspired Torch Republic's Washington Blend.");
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = "Explore the rich history of George Washington's coffee habits and how the first president's love of bold, strong coffee inspired Torch Republic's Washington Blend.";
      document.head.appendChild(newMeta);
    }
    return () => {
      document.title = 'Torch Republic';
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#030303', color: '#F0EBE1' }}>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: '#080808', borderBottom: '1px solid rgba(201,162,74,0.1)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 80%, rgba(201,162,74,0.06) 0%, transparent 70%)' }} />
        <div className="max-w-[760px] mx-auto px-6 md:px-10 pt-16 pb-14 relative z-10">
          <Link to="/Journal" className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.4em] uppercase mb-8 transition-opacity hover:opacity-60" style={{ color: 'rgba(201,162,74,0.6)' }}>
            <ArrowLeft className="w-3 h-3" /> The Journal
          </Link>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="font-mono text-[9px] tracking-[0.4em] uppercase px-2.5 py-1" style={{ color: AC, border: '1px solid rgba(201,162,74,0.25)', background: 'rgba(201,162,74,0.05)' }}>
              History
            </span>
            <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.25)' }}>April 2026</span>
            <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.25)' }}>7 min read</span>
          </div>
          <h1 className="font-serif leading-[1.05] mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            George Washington's Coffee: What America's First President Might Have Drunk
          </h1>
          <p className="font-heading" style={{ fontSize: '1.1rem', color: 'rgba(240,235,225,0.6)', lineHeight: 1.8 }}>
            Long before the Boston Tea Party made coffee the patriotic drink of choice, America's founding fathers were developing a taste for bold, unapologetic brews. Washington was no exception.
          </p>
        </div>
      </section>

      {/* Article body */}
      <article className="max-w-[760px] mx-auto px-6 md:px-10 py-16">

        {/* Divider */}
        <div className="h-px mb-14" style={{ background: 'linear-gradient(90deg, rgba(201,162,74,0.3), transparent)' }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-10"
        >

          {/* Section 1 */}
          <section>
            <h2 className="font-serif mb-5" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 700, color: '#FFFFFF' }}>
              From Tea to Coffee: A Revolution in the Cup
            </h2>
            <p style={{ lineHeight: 1.95, color: 'rgba(240,235,225,0.72)', fontSize: '1rem' }}>
              The story of American coffee begins with rebellion. Before 1773, tea was the drink of the British colonies — a daily ritual that carried the weight of empire. But when the Sons of Liberty dumped 342 chests of East India Company tea into Boston Harbor, they didn't just protest a tax. They changed what Americans drank for generations.
            </p>
            <p className="mt-4" style={{ lineHeight: 1.95, color: 'rgba(240,235,225,0.72)', fontSize: '1rem' }}>
              George Washington was a man of discipline. He rose before dawn, reviewed correspondence before breakfast, and ran Mount Vernon with military precision. His mornings demanded something strong — something that matched the weight of what he was building. Coffee became that drink.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="font-serif mb-5" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 700, color: '#FFFFFF' }}>
              What We Know About Washington's Coffee Habits
            </h2>
            <p style={{ lineHeight: 1.95, color: 'rgba(240,235,225,0.72)', fontSize: '1rem' }}>
              Historical records from Mount Vernon document Washington's household accounts in remarkable detail. Coffee was a regular import alongside other provisions — ordered from London merchants and later from domestic suppliers. Washington was known to prefer his morning beverages strong and without ceremony.
            </p>
            <p className="mt-4" style={{ lineHeight: 1.95, color: 'rgba(240,235,225,0.72)', fontSize: '1rem' }}>
              During the Revolutionary War, coffee became a symbol of the cause itself. British tea was replaced by American resolve — and that resolve was fueled by something dark, roasted, and uncompromising. Washington's army drank it in camp. His officers drank it in council. The general himself drank it to start the work of a nation.
            </p>

            <blockquote className="my-8 pl-5" style={{ borderLeft: `2px solid ${AC}`, color: 'rgba(240,235,225,0.55)', fontStyle: 'italic', fontSize: '1.05rem', lineHeight: 1.8 }}>
              "I wish most sincerely there was not a Slave in the province." — Washington on conviction. His coffee was equally uncompromising.
            </blockquote>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="font-serif mb-5" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 700, color: '#FFFFFF' }}>
              The Roast Profile of a Founder
            </h2>
            <p style={{ lineHeight: 1.95, color: 'rgba(240,235,225,0.72)', fontSize: '1rem' }}>
              If Washington drank coffee in the 18th century, it would have been roasted dark by necessity — darker roasts preserved better on long journeys and in field conditions. Beans would have been whole-roasted over fire or in cast-iron pans, ground coarsely, and brewed by simple infusion. The result: bold, smoky, unfiltered.
            </p>
            <p className="mt-4" style={{ lineHeight: 1.95, color: 'rgba(240,235,225,0.72)', fontSize: '1rem' }}>
              No sweeteners. No dairy. No ceremony. Just the drink, the man, and the work ahead.
            </p>

            <h3 className="font-serif mt-8 mb-3" style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF' }}>
              The Characteristics of Washington's Era
            </h3>
            <ul className="space-y-3 mt-2">
              {[
                { label: 'Dark Roast', desc: 'Necessity-driven roasting preserved beans through long campaign seasons' },
                { label: 'Full Body', desc: 'Coarse grounds and simple immersion brewing created thick, bold cups' },
                { label: 'Low Acidity', desc: 'Dark roasts muted brightness — replaced by smoky, earthy depth' },
                { label: 'No Additives', desc: 'Frontier practicality meant black coffee, no embellishment' },
              ].map(({ label, desc }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: AC }} />
                  <span style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.75, fontSize: '0.95rem' }}>
                    <strong style={{ color: '#FFFFFF' }}>{label}:</strong> {desc}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Internal link — Washington Blend */}
          <div className="p-6 my-4" style={{ background: '#0D0D0D', border: `1px solid ${AC}25` }}>
            <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-2" style={{ color: `${AC}60` }}>Related Product</p>
            <p className="font-serif mb-3" style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF' }}>
              The Washington Blend — Built for This Legacy
            </p>
            <p className="font-heading text-sm mb-4" style={{ color: 'rgba(240,235,225,0.55)', lineHeight: 1.75 }}>
              Torch Republic's Washington Blend is a direct tribute to this history — dark-roasted, full-bodied, and built for people who start their mornings with conviction. Small-batch roasted, never mass-produced.
            </p>
            <Link to="/WashingtonBlend" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase transition-opacity hover:opacity-70" style={{ color: AC }}>
              Explore the Washington Blend <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Section 4 */}
          <section>
            <h2 className="font-serif mb-5" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 700, color: '#FFFFFF' }}>
              Coffee as Patriotic Ritual
            </h2>
            <p style={{ lineHeight: 1.95, color: 'rgba(240,235,225,0.72)', fontSize: '1rem' }}>
              The shift from tea to coffee wasn't merely practical — it was ideological. By choosing coffee, colonists declared their independence from British customs as much as from British governance. The morning cup became a small, daily act of self-determination.
            </p>
            <p className="mt-4" style={{ lineHeight: 1.95, color: 'rgba(240,235,225,0.72)', fontSize: '1rem' }}>
              That tradition runs through American culture to this day. The first cup of the morning is a ritual — a moment of clarity before the day's demands arrive. Washington understood this. He built a nation on discipline, and discipline begins before sunrise.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="font-serif mb-5" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 700, color: '#FFFFFF' }}>
              Why This History Matters Today
            </h2>
            <p style={{ lineHeight: 1.95, color: 'rgba(240,235,225,0.72)', fontSize: '1rem' }}>
              At Torch Republic, we didn't pick Washington because he's famous. We picked him because of what he represents: the willingness to begin — to lead before there was a road, to commit before there was certainty. His coffee habit, modest as it was, is part of that story.
            </p>
            <p className="mt-4" style={{ lineHeight: 1.95, color: 'rgba(240,235,225,0.72)', fontSize: '1rem' }}>
              Every Founders Series blend carries a character. Washington's is boldness — uncompromising, dark, and built for the long campaign. You can explore the full{' '}
              <Link to="/CoffeeCollection" style={{ color: AC, textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                Founders Series Coffee Collection
              </Link>{' '}
              to find the blend that matches your own conviction.
            </p>
          </section>

        </motion.div>

        {/* Divider */}
        <div className="h-px my-16" style={{ background: 'linear-gradient(90deg, rgba(201,162,74,0.25), transparent)' }} />

        {/* Related Products */}
        <section>
          <h2 className="font-serif mb-8" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 700, color: '#FFFFFF' }}>
            Related Products
          </h2>
          <Link
            to="/WashingtonBlend"
            className="group flex flex-col sm:flex-row gap-6 p-6 transition-all"
            style={{ background: '#0D0D0D', border: '1px solid rgba(201,162,74,0.15)', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,162,74,0.5)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(201,162,74,0.15)'}
          >
            <div className="flex-shrink-0" style={{ width: '120px', height: '120px', background: '#161616', overflow: 'hidden' }}>
              <img
                src="https://cdn.shopify.com/s/files/1/0620/7140/6844/products/washington-blend.jpg"
                alt="Washington Blend Coffee"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={e => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
            <div className="flex flex-col justify-center gap-2">
              <p className="font-mono text-[9px] tracking-[0.4em] uppercase" style={{ color: `${AC}60` }}>Founders Series</p>
              <h3 className="font-serif font-bold" style={{ fontSize: '1.2rem', color: '#FFFFFF' }}>Washington Blend</h3>
              <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.6 }}>
                Dark roast · Full body · Small-batch roasted
              </p>
              <span className="inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.3em] uppercase mt-1" style={{ color: AC }}>
                Shop Now <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
        </section>

        {/* Divider */}
        <div className="h-px my-16" style={{ background: 'linear-gradient(90deg, rgba(201,162,74,0.25), transparent)' }} />

        {/* CTA */}
        <section className="text-center py-10 px-6" style={{ background: '#0A0A0A', border: '1px solid rgba(201,162,74,0.12)' }}>
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: `${AC}55` }}>Carry the Flame</p>
          <h2 className="font-serif mb-4" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, color: '#FFFFFF' }}>
            Start Your Morning Like Washington
          </h2>
          <p className="font-heading text-sm mb-8 mx-auto" style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.75, maxWidth: '400px' }}>
            Small-batch roasted. Bold and unapologetic. Built for the kind of morning that changes things.
          </p>
          <Link
            to="/WashingtonBlend"
            className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase font-black transition-opacity hover:opacity-85"
            style={{ background: AC, color: '#080808', padding: '14px 36px' }}
          >
            Get the Washington Blend →
          </Link>
          <div className="mt-5">
            <Link to="/CoffeeCollection" className="font-mono text-[9px] tracking-[0.3em] uppercase transition-opacity hover:opacity-60" style={{ color: 'rgba(201,162,74,0.45)' }}>
              Or explore the full collection →
            </Link>
          </div>
        </section>

        {/* Back to Journal */}
        <div className="mt-12">
          <Link to="/Journal" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase transition-opacity hover:opacity-60" style={{ color: 'rgba(201,162,74,0.45)' }}>
            <ArrowLeft className="w-3 h-3" /> Back to The Journal
          </Link>
        </div>

      </article>
    </div>
  );
}