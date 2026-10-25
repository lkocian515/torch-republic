/**
 * Dynamic Ingredient Deep-Dive Page
 * Route: /ingredients/:slug
 */
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, ChevronRight, Leaf, FlaskConical, Star } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { INGREDIENT_PAGES, ALL_BLOG_TOPICS, INGREDIENT_LONG_FORM } from '@/lib/seoContent';

const RG = '#E6B7AD';

export default function IngredientPage() {
  const { slug } = useParams();
  const ingredient = INGREDIENT_PAGES.find(i => i.slug === slug);

  const longForm = INGREDIENT_LONG_FORM?.[slug];

  const relatedArticles = ingredient?.relatedSlugs
    ? ALL_BLOG_TOPICS.filter(t => ingredient.relatedSlugs.includes(t.slug) && t.exists)
    : [];

  useSEO({
    title: ingredient?.metaTitle || `${ingredient?.name || 'Ingredient'} | Torch Republic`,
    description: ingredient?.metaDescription || 'Detailed ingredient guide from Torch Republic Coffee Company.',
    url: ingredient ? `/ingredients/${ingredient.slug}` : '/ingredients',
    type: 'website',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Ingredients', url: '/ingredients' },
      ...(ingredient ? [{ name: ingredient.name, url: `/ingredients/${ingredient.slug}` }] : []),
    ],
  });

  if (!ingredient) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#080808' }}>
        <div className="text-center px-6">
          <p className="font-serif text-2xl text-white mb-4">Ingredient not found</p>
          <Link to="/ingredients" className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: RG }}>
            Browse All Ingredients →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#080808' }}>
      {/* Breadcrumb */}
      <div className="px-6 md:px-10 pt-6">
        <div className="max-w-5xl mx-auto flex items-center gap-2 flex-wrap">
          <Link to="/" className="font-mono text-[8px] tracking-[0.2em] uppercase hover:opacity-70" style={{ color: 'rgba(230,183,173,0.4)' }}>Home</Link>
          <ChevronRight size={10} style={{ color: 'rgba(230,183,173,0.2)' }} />
          <Link to="/ingredients" className="font-mono text-[8px] tracking-[0.2em] uppercase hover:opacity-70" style={{ color: 'rgba(230,183,173,0.4)' }}>Ingredients</Link>
          <ChevronRight size={10} style={{ color: 'rgba(230,183,173,0.2)' }} />
          <span className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.6)' }}>{ingredient.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="px-6 md:px-10 pt-12 pb-16" style={{ borderBottom: `1px solid ${ingredient.color}20` }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5" style={{ background: `${ingredient.color}12`, border: `1px solid ${ingredient.color}30` }}>
              <Leaf size={10} style={{ color: ingredient.color }} />
              <span className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: ingredient.color }}>{ingredient.category}</span>
            </div>

            <h1 className="font-serif font-bold mb-2" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: '#F5EFE6', letterSpacing: '-0.02em' }}>
              {ingredient.name}
            </h1>
            {ingredient.scientificName && (
              <p className="font-heading italic mb-4" style={{ color: 'rgba(240,235,225,0.4)', fontSize: '1rem' }}>
                {ingredient.scientificName}
              </p>
            )}
            <p className="font-heading max-w-2xl mb-8" style={{ fontSize: '1.05rem', color: 'rgba(240,235,225,0.7)', fontWeight: 300, lineHeight: 1.85 }}>
              {ingredient.tagline}
            </p>

            {/* Active Compounds */}
            <div className="flex flex-wrap gap-2">
              {ingredient.activeCompounds.map((compound, i) => (
                <span key={i} className="font-mono text-[8px] tracking-[0.2em] uppercase px-3 py-1.5"
                  style={{ background: `${ingredient.color}10`, border: `1px solid ${ingredient.color}25`, color: ingredient.color }}>
                  {compound}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 md:px-10 py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Description + Benefits */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-5">
                <FlaskConical size={18} style={{ color: ingredient.color }} />
                <h2 className="font-serif font-bold text-xl" style={{ color: '#F5EFE6' }}>Overview</h2>
              </div>
              <p className="font-heading" style={{ color: 'rgba(240,235,225,0.7)', fontWeight: 300, lineHeight: 1.9, fontSize: '0.95rem' }}>
                {ingredient.description}
              </p>
            </motion.div>

            {/* Benefits */}
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-5">
                <Star size={18} style={{ color: ingredient.color }} />
                <h2 className="font-serif font-bold text-xl" style={{ color: '#F5EFE6' }}>Properties & Research</h2>
              </div>
              <div className="space-y-4">
                {ingredient.benefits.map((benefit, i) => (
                  <div key={i} className="p-5" style={{ background: '#0F0E0D', border: `1px solid ${ingredient.color}18` }}>
                    <h3 className="font-serif font-bold mb-2" style={{ color: ingredient.color, fontSize: '1rem' }}>{benefit.title}</h3>
                    <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.6)', fontWeight: 300, lineHeight: 1.75 }}>{benefit.detail}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Research Summary */}
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="p-6" style={{ background: `${ingredient.color}08`, border: `1px solid ${ingredient.color}25` }}>
                <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-3" style={{ color: ingredient.color }}>Research Summary</p>
                <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.7)', fontWeight: 300, lineHeight: 1.8 }}>
                  {ingredient.researchSummary}
                </p>

              </div>
            </motion.div>

            {/* Long-Form Content */}
            {longForm && (
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-8">
                <p className="font-heading" style={{ fontSize: '1rem', color: 'rgba(240,235,225,0.7)', fontWeight: 300, lineHeight: 1.95 }}>
                  {longForm.intro}
                </p>
                {longForm.sections.map((section, i) => (
                  <div key={i}>
                    <h2 className="font-serif font-bold mb-4" style={{ fontSize: '1.25rem', color: '#F5EFE6' }}>{section.heading}</h2>
                    {section.body.split('\n\n').map((para, j) => (
                      <p key={j} className="font-heading mb-4" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.65)', fontWeight: 300, lineHeight: 1.9 }}>
                        {para}
                      </p>
                    ))}
                  </div>
                ))}
              </motion.div>
            )}

            {/* FDA Disclaimer */}
            <p className="font-mono text-[7px] tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.2)', lineHeight: 1.8 }}>
              These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease.
            </p>
          </div>

          {/* Right: Products + Articles */}
          <div className="space-y-6">
            {/* Products */}
            <div className="p-5 sticky top-24" style={{ background: '#0F0E0D', border: `1px solid ${ingredient.color}20` }}>
              <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-4" style={{ color: ingredient.color }}>{ingredient.productsHeading || `Products with ${ingredient.name}`}</p>
              <div className="space-y-2">
                {ingredient.products.map((p, i) => (
                  <Link key={i} to={p.path}
                    className="flex items-center justify-between p-3 transition-opacity hover:opacity-75"
                    style={{ background: i === 0 ? `${ingredient.color}12` : 'rgba(255,255,255,0.02)', border: `1px solid ${ingredient.color}${i === 0 ? '30' : '10'}` }}>
                    <span className="font-heading text-sm" style={{ color: '#F5EFE6' }}>{p.name}</span>
                    <ArrowRight size={12} style={{ color: ingredient.color }} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="p-5" style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.1)' }}>
                <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.5)' }}>Related Articles</p>
                <div className="space-y-3">
                  {relatedArticles.map((a, i) => (
                    <Link key={i} to={`/journal/${a.slug}`}
                      className="flex items-start gap-2 py-2 hover:opacity-75 transition-opacity">
                      <BookOpen size={12} className="flex-shrink-0 mt-0.5" style={{ color: 'rgba(230,183,173,0.5)' }} />
                      <p className="font-heading text-xs" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.4 }}>{a.title}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Other Ingredients */}
      <section className="px-6 md:px-10 py-12" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif font-bold mb-6" style={{ fontSize: '1.4rem', color: '#F5EFE6' }}>All Ingredients</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {INGREDIENT_PAGES.map((ing, i) => (
              <Link key={i} to={`/ingredients/${ing.slug}`}
                className="p-4 text-center block transition-all"
                style={{ background: ing.slug === slug ? `${ing.color}15` : '#0F0E0D', border: `1px solid ${ing.slug === slug ? ing.color : ing.color + '20'}` }}>
                <p className="font-serif font-bold text-sm mb-1" style={{ color: ing.color }}>{ing.name}</p>
                <p className="font-mono text-[7px] tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>{ing.category}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}