import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight, ChevronDown, BookOpen } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { Helmet } from 'react-helmet';
import { getRelatedArticles } from '@/lib/knowledgeArticles';
import BlogEmailCapture from '@/components/blog/BlogEmailCapture';
import PopularArticles from '@/components/blog/PopularArticles';

const RG = '#E6B7AD';

const CATEGORY_COLORS = {
  'Coffee Origins': '#A8D5BA',
  'Mushroom Coffee Education': '#D4A574',
  'Instant Coffee Education': '#E6B7AD',
  'Travel Coffee': '#A5C5D4',
  'Brewing Alternatives': '#B5A5D4',
  'Coffee Comparisons': '#D4B5A5',
};

// ── Content Block Renderer ──
function renderBlock(block, key) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p key={key} className="font-heading mb-5" style={{ color: 'rgba(240,235,225,0.8)', fontWeight: 300, lineHeight: 1.85, fontSize: '1.02rem' }}>
          {block.text}
        </p>
      );
    case 'heading3':
      return (
        <h3 key={key} className="font-serif font-bold mt-8 mb-4" style={{ fontSize: '1.3rem', color: '#F5EFE6', lineHeight: 1.3 }}>
          {block.text}
        </h3>
      );
    case 'list':
      return (
        <ul key={key} className="mb-5 ml-5 space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="font-heading flex gap-3" style={{ color: 'rgba(240,235,225,0.8)', fontWeight: 300, lineHeight: 1.7, fontSize: '1.02rem' }}>
              <span style={{ color: RG, marginTop: '2px' }}>•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'numbered':
      return (
        <ol key={key} className="mb-5 ml-5 space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="font-heading flex gap-3" style={{ color: 'rgba(240,235,225,0.8)', fontWeight: 300, lineHeight: 1.7, fontSize: '1.02rem' }}>
              <span className="font-mono text-sm font-bold" style={{ color: RG, minWidth: '1.5rem' }}>{i + 1}.</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      );
    case 'table':
      return (
        <div key={key} className="mb-6 overflow-x-auto">
          <table className="w-full" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {block.headers.map((h, i) => (
                  <th key={i} className="font-mono text-[8px] tracking-[0.2em] uppercase text-left p-3" style={{ background: 'rgba(230,183,173,0.08)', color: RG, borderBottom: `1px solid ${RG}30` }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
                  {row.map((cell, j) => (
                    <td key={j} className="font-heading p-3" style={{ color: j === 0 ? '#F5EFE6' : 'rgba(240,235,225,0.7)', fontWeight: j === 0 ? 500 : 300, fontSize: '0.9rem', lineHeight: 1.6 }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'callout':
      return (
        <div key={key} className="my-6 p-5" style={{ background: `${RG}06`, border: `1px solid ${RG}20`, borderLeft: `3px solid ${RG}` }}>
          {block.title && (
            <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-2" style={{ color: RG }}>{block.title}</p>
          )}
          <p className="font-heading" style={{ color: 'rgba(240,235,225,0.75)', fontWeight: 300, lineHeight: 1.75, fontSize: '0.95rem' }}>
            {block.text}
          </p>
        </div>
      );
    case 'timeline':
      return (
        <div key={key} className="mb-6 space-y-4">
          {block.items.map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: RG, marginTop: 4 }} />
                {i < block.items.length - 1 && <div style={{ width: 1, flex: 1, background: `${RG}30` }} />}
              </div>
              <div className="pb-4">
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase font-bold" style={{ color: RG }}>{item.year}</span>
                <p className="font-heading mt-1" style={{ color: 'rgba(240,235,225,0.8)', fontWeight: 300, lineHeight: 1.7, fontSize: '0.95rem' }}>
                  {item.event}
                </p>
              </div>
            </div>
          ))}
        </div>
      );
    case 'infographic':
      return (
        <div key={key} className="my-6 p-6" style={{ background: 'linear-gradient(160deg, #0F0E0D 0%, #0A0908 100%)', border: `1px solid ${RG}20` }}>
          <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-4 text-center" style={{ color: RG }}>{block.title}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {block.steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto mb-3 flex items-center justify-center" style={{ width: 48, height: 48, borderRadius: '50%', background: `${RG}12`, border: `1px solid ${RG}30` }}>
                  <span className="font-mono font-bold" style={{ color: RG, fontSize: '0.9rem' }}>{i + 1}</span>
                </div>
                <p className="font-serif font-bold mb-1" style={{ fontSize: '0.85rem', color: '#F5EFE6' }}>{step.title}</p>
                <p className="font-heading text-xs" style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 300, lineHeight: 1.6 }}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
}

// ── Table of Contents ──
function TableOfContents({ sections }) {
  const [activeId, setActiveId] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <>
      {/* Desktop sticky sidebar */}
      <div className="hidden lg:block sticky top-24 self-start">
        <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.5)' }}>Table of Contents</p>
        <nav className="space-y-2">
          {sections.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="block font-heading text-sm transition-all"
              style={{
                color: activeId === s.id ? RG : 'rgba(240,235,225,0.45)',
                fontWeight: activeId === s.id ? 500 : 300,
                paddingLeft: activeId === s.id ? '8px' : '0',
                borderLeft: activeId === s.id ? `2px solid ${RG}` : '2px solid transparent',
                lineHeight: 1.5,
              }}
            >
              {i + 1}. {s.heading}
            </a>
          ))}
        </nav>
      </div>

      {/* Mobile collapsible */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full flex items-center justify-between p-3"
          style={{ background: 'rgba(230,183,173,0.05)', border: `1px solid ${RG}20` }}
        >
          <span className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: RG }}>Table of Contents</span>
          <ChevronDown size={14} style={{ color: RG, transform: mobileOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
        </button>
        {mobileOpen && (
          <nav className="mt-2 p-3 space-y-2" style={{ background: 'rgba(230,183,173,0.03)', border: `1px solid ${RG}15` }}>
            {sections.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setMobileOpen(false)}
                className="block font-heading text-sm"
                style={{ color: activeId === s.id ? RG : 'rgba(240,235,225,0.5)', fontWeight: 300, lineHeight: 1.5 }}
              >
                {i + 1}. {s.heading}
              </a>
            ))}
          </nav>
        )}
      </div>
    </>
  );
}

// ── Main Component ──
export default function CornerstoneArticle({ article }) {
  const categoryColor = CATEGORY_COLORS[article.category] || RG;
  const relatedArticles = article.relatedArticles || getRelatedArticles(article.slug, article.category);

  // SEO
  useSEO({
    title: article.title,
    description: article.excerpt,
    url: `/knowledge/${article.slug}`,
    type: 'article',
    article: {
      author: article.author || 'Torch Republic',
      datePublished: article.publishedDate || '2026-06-20',
      dateModified: article.publishedDate || '2026-06-20',
      section: article.category,
      keywords: article.keywords || [],
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Knowledge Center', url: '/knowledge' },
      { name: article.category, url: '/knowledge' },
      { name: article.title, url: `/knowledge/${article.slug}` },
    ],
    faq: article.faqs.map(f => ({ question: f.question, answer: f.answer })),
  });

  // Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    author: { '@type': 'Organization', name: article.author || 'Torch Republic' },
    publisher: { '@type': 'Organization', name: 'Torch Republic' },
    datePublished: article.publishedDate || '2026-06-20',
    dateModified: article.publishedDate || '2026-06-20',
    keywords: (article.keywords || []).join(', '),
    articleSection: article.category,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://torchrepublic.com/' },
      { '@type': 'ListItem', position: 2, name: 'Knowledge Center', item: 'https://torchrepublic.com/knowledge' },
      { '@type': 'ListItem', position: 3, name: article.title, item: `https://torchrepublic.com/knowledge/${article.slug}` },
    ],
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="min-h-screen" style={{ background: '#0A0A0A' }}>
        {/* Breadcrumb */}
        <div className="px-6 md:px-10 py-4" style={{ borderBottom: '1px solid rgba(230,183,173,0.06)' }}>
          <div className="max-w-[1200px] mx-auto flex items-center gap-2 font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.4)' }}>
            <Link to="/" className="hover:opacity-70">Home</Link>
            <span>/</span>
            <Link to="/knowledge" className="hover:opacity-70">Knowledge</Link>
            <span>/</span>
            <span style={{ color: 'rgba(230,183,173,0.6)' }}>{article.category}</span>
          </div>
        </div>

        {/* Article Header */}
        <header className="px-6 md:px-10 pt-12 pb-8">
          <div className="max-w-[800px] mx-auto text-center">
            <Link to="/knowledge" className="inline-flex items-center gap-2 mb-6">
              <BookOpen size={14} style={{ color: categoryColor }} />
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: categoryColor }}>{article.category}</span>
            </Link>
            <h1 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', color: '#F5EFE6', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              {article.title}
            </h1>
            <p className="font-heading text-lg mb-8" style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.8 }}>
              {article.excerpt}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-2" style={{ color: 'rgba(230,183,173,0.5)' }}>
                <User size={13} />
                <span className="font-mono text-[8px] tracking-[0.25em] uppercase">{article.author || 'Torch Republic'}</span>
              </div>
              <div className="flex items-center gap-2" style={{ color: 'rgba(230,183,173,0.5)' }}>
                <Calendar size={13} />
                <span className="font-mono text-[8px] tracking-[0.25em] uppercase">{new Date(article.publishedDate || '2026-06-20').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2" style={{ color: 'rgba(230,183,173,0.5)' }}>
                <Clock size={13} />
                <span className="font-mono text-[8px] tracking-[0.25em] uppercase">{article.readTime} min read</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content — Two column on desktop */}
        <div className="px-6 md:px-10 pb-16">
          <div className="max-w-[1200px] mx-auto flex gap-12">
            {/* TOC Sidebar */}
            <aside className="hidden lg:block w-56 flex-shrink-0">
              <TableOfContents sections={article.sections} />
            </aside>

            {/* Main Content */}
            <div className="flex-1 max-w-[750px] mx-auto lg:mx-0">
              {/* Mobile TOC */}
              <TableOfContents sections={article.sections} />

              {/* Sections */}
              {article.sections.map((section, sIdx) => (
                <motion.section
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: sIdx * 0.05 }}
                  className="scroll-mt-24 mb-10"
                >
                  <h2 className="font-serif font-bold mb-5" style={{ fontSize: '1.6rem', color: '#F5EFE6', lineHeight: 1.3, paddingBottom: '0.5rem', borderBottom: `1px solid ${RG}15` }}>
                    {section.heading}
                  </h2>
                  {section.content.map((block, bIdx) => renderBlock(block, bIdx))}
                </motion.section>
              ))}

              {/* Email Capture */}
              <BlogEmailCapture />

              {/* FAQ Section */}
              <section className="mt-12 pt-8" style={{ borderTop: `1px solid ${RG}15` }}>
                <h2 className="font-serif font-bold mb-6" style={{ fontSize: '1.6rem', color: '#F5EFE6' }}>Frequently Asked Questions</h2>
                <div className="space-y-3">
                  {article.faqs.map((faq, i) => (
                    <FAQItem key={i} faq={faq} />
                  ))}
                </div>
              </section>

              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <section className="mt-12 pt-8" style={{ borderTop: `1px solid ${RG}15` }}>
                  <p className="font-mono text-[9px] tracking-[0.35em] uppercase mb-5" style={{ color: 'rgba(230,183,173,0.5)' }}>Related Articles</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {relatedArticles.map((r, i) => (
                      <Link key={i} to={`/knowledge/${r.slug}`}
                        className="p-4 block transition-all hover:opacity-75"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(230,183,173,0.1)' }}>
                        <p className="font-mono text-[7px] tracking-[0.2em] uppercase mb-2" style={{ color: `${RG}70` }}>{r.category}</p>
                        <p className="font-heading text-sm" style={{ color: '#F5EFE6', fontWeight: 500, lineHeight: 1.4 }}>{r.title}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <span className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>Read</span>
                          <ArrowRight className="w-3 h-3" style={{ color: 'rgba(230,183,173,0.5)' }} />
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Related Products CTA */}
              {article.relatedProducts && article.relatedProducts.length > 0 && (
                <section className="mt-8 p-6" style={{ background: 'rgba(230,183,173,0.04)', border: `1px solid ${RG}18` }}>
                  <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.5)' }}>Explore the Products</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    {article.relatedProducts.map((prod, i) => (
                      <Link key={i} to={prod.path}
                        className="font-mono text-[9px] tracking-[0.25em] uppercase font-bold py-3 px-6 text-center transition-all hover:opacity-80"
                        style={i === 0 ? { background: RG, color: '#050505' } : { border: `1px solid ${RG}40`, color: RG }}>
                        {prod.name} →
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Bottom CTA */}
              {article.cta && (
                <section className="mt-8 p-8 text-center" style={{ background: 'linear-gradient(160deg, #0F0E0D 0%, #0A0908 100%)', border: `1px solid ${RG}20` }}>
                  <h3 className="font-serif font-bold mb-3" style={{ fontSize: '1.4rem', color: '#F5EFE6' }}>{article.cta.title}</h3>
                  <p className="font-heading mb-6 max-w-md mx-auto" style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.7 }}>{article.cta.body}</p>
                  <Link to={article.cta.buttonPath}
                    className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-3.5 px-8"
                    style={{ background: RG, color: '#050505' }}>
                    {article.cta.buttonText} <ArrowRight size={12} />
                  </Link>
                </section>
              )}
            </div>
          </div>
        </div>

        {/* Popular Articles */}
        <PopularArticles />
      </div>
    </>
  );
}

// ── FAQ Item ──
function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: 'rgba(230,183,173,0.03)', border: `1px solid ${RG}15` }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <span className="font-heading text-sm" style={{ color: '#F5EFE6', fontWeight: 500, lineHeight: 1.4 }}>{faq.question}</span>
        <ChevronDown size={16} style={{ color: RG, flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>
      {open && (
        <div className="px-4 pb-4">
          <p className="font-heading" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300, lineHeight: 1.75, fontSize: '0.92rem' }}>
            {faq.answer}
          </p>
        </div>
      )}
    </div>
  );
}