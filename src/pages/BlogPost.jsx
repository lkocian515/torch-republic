import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useSEO } from '@/hooks/useSEO';
import { ArrowLeft, Calendar, Clock, User, Bookmark, ArrowRight } from 'lucide-react';
import ArticleShareBar from '@/components/social/ArticleShareBar';
import BlogEmailCapture from '../components/blog/BlogEmailCapture';
import PopularArticles from '../components/blog/PopularArticles';
import { KNOWLEDGE_ARTICLES } from '@/lib/knowledgeArticles';
import JournalRitualCTA from '../components/journal/JournalRitualCTA';
import JournalMidCTA from '../components/journal/JournalMidCTA';
import {
  ARTICLE_SOCIAL_OVERRIDES,
  articleUrl,
  resolveArticleImage,
  SOCIAL_CONSTANTS,
} from '@/lib/articleSocialMeta';
import { ALL_BLOG_TOPICS } from '@/lib/seoContent';

// Synchronous title lookup from the static topic list — lets us emit correct
// OG title on the FIRST render, before the async DB fetch resolves.
const TITLE_BY_SLUG = Object.fromEntries(
  ALL_BLOG_TOPICS.map((t) => [t.slug, t.title])
);

// Related articles map by slug — covers all 5 priority articles + existing content
const RELATED_BY_SLUG = {
  // ── 5 PRIORITY ARTICLES ──
  'mushroom-coffee-vs-regular-coffee': [
    { title: 'Does Mushroom Coffee Make You Less Jittery?', slug: 'does-mushroom-coffee-make-you-less-jittery' },
    { title: 'What Does Mushroom Coffee Actually Taste Like?', slug: 'what-does-mushroom-coffee-taste-like' },
    { title: 'The Science of Lion\'s Mane', slug: 'science-of-lions-mane' },
  ],
  'does-mushroom-coffee-make-you-less-jittery': [
    { title: 'Mushroom Coffee vs. Regular Coffee', slug: 'mushroom-coffee-vs-regular-coffee' },
    { title: 'Matcha vs. Coffee: Energy, Focus, Taste', slug: 'matcha-vs-coffee' },
    { title: 'What Does Mushroom Coffee Actually Taste Like?', slug: 'what-does-mushroom-coffee-taste-like' },
  ],
  'what-does-mushroom-coffee-taste-like': [
    { title: 'Mushroom Coffee vs. Regular Coffee', slug: 'mushroom-coffee-vs-regular-coffee' },
    { title: 'Does Mushroom Coffee Make You Less Jittery?', slug: 'does-mushroom-coffee-make-you-less-jittery' },
    { title: 'The History of Mushroom Coffee', slug: 'history-of-mushroom-coffee' },
  ],
  'why-coffee-drinkers-are-switching-away-from-pods': [
    { title: 'Mushroom Coffee vs. Regular Coffee', slug: 'mushroom-coffee-vs-regular-coffee' },
    { title: 'What Makes Premium Instant Coffee Different?', slug: 'what-makes-premium-instant-coffee-different' },
    { title: 'Does Mushroom Coffee Make You Less Jittery?', slug: 'does-mushroom-coffee-make-you-less-jittery' },
  ],
  'matcha-vs-coffee': [
    { title: 'Mushroom Coffee vs. Regular Coffee', slug: 'mushroom-coffee-vs-regular-coffee' },
    { title: 'The History of Matcha', slug: 'history-of-matcha' },
    { title: 'Does Mushroom Coffee Make You Less Jittery?', slug: 'does-mushroom-coffee-make-you-less-jittery' },
  ],
  'mushroom-coffee-vs-regular-coffee': [
    { title: 'Does Mushroom Coffee Make You Less Jittery?', slug: 'does-mushroom-coffee-make-you-less-jittery' },
    { title: 'What Does Mushroom Coffee Actually Taste Like?', slug: 'what-does-mushroom-coffee-taste-like' },
    { title: 'The Science of Lion\'s Mane', slug: 'science-of-lions-mane' },
  ],
  'does-mushroom-coffee-make-you-less-jittery': [
    { title: 'Mushroom Coffee vs. Regular Coffee', slug: 'mushroom-coffee-vs-regular-coffee' },
    { title: 'Matcha vs. Coffee: Energy, Focus, Taste', slug: 'matcha-vs-coffee' },
    { title: 'What Does Mushroom Coffee Actually Taste Like?', slug: 'what-does-mushroom-coffee-taste-like' },
  ],
  'what-does-mushroom-coffee-taste-like': [
    { title: 'Mushroom Coffee vs. Regular Coffee', slug: 'mushroom-coffee-vs-regular-coffee' },
    { title: 'Does Mushroom Coffee Make You Less Jittery?', slug: 'does-mushroom-coffee-make-you-less-jittery' },
    { title: 'The History of Mushroom Coffee', slug: 'history-of-mushroom-coffee' },
  ],
  'why-coffee-drinkers-are-switching-away-from-pods': [
    { title: 'Mushroom Coffee vs. Regular Coffee', slug: 'mushroom-coffee-vs-regular-coffee' },
    { title: 'What Makes Premium Instant Coffee Different?', slug: 'what-makes-premium-instant-coffee-different' },
    { title: 'Does Mushroom Coffee Make You Less Jittery?', slug: 'does-mushroom-coffee-make-you-less-jittery' },
  ],
  'matcha-vs-coffee': [
    { title: 'Mushroom Coffee vs. Regular Coffee', slug: 'mushroom-coffee-vs-regular-coffee' },
    { title: 'The History of Matcha', slug: 'history-of-matcha' },
    { title: 'Does Mushroom Coffee Make You Less Jittery?', slug: 'does-mushroom-coffee-make-you-less-jittery' },
  ],
  'science-of-lions-mane': [
    { title: 'Mushroom Coffee vs. Regular Coffee', slug: 'mushroom-coffee-vs-regular-coffee' },
    { title: 'Chaga Mushroom: The Antioxidant King', slug: 'chaga-mushroom-antioxidant-king' },
    { title: 'What Does Mushroom Coffee Actually Taste Like?', slug: 'what-does-mushroom-coffee-taste-like' },
  ],
  'history-of-matcha': [
    { title: 'Matcha vs. Coffee', slug: 'matcha-vs-coffee' },
    { title: 'Instant Ceremonial Matcha', slug: 'instant-ceremonial-matcha' },
    { title: 'Matcha Benefits Guide', slug: 'matcha-benefits' },
  ],
  'history-of-mushroom-coffee': [
    { title: 'Mushroom Coffee vs. Regular Coffee', slug: 'mushroom-coffee-vs-regular-coffee' },
    { title: 'The Science of Lion\'s Mane', slug: 'science-of-lions-mane' },
    { title: 'Chaga Mushroom: The Antioxidant King', slug: 'chaga-mushroom-antioxidant-king' },
  ],
  'chaga-mushroom-antioxidant-king': [
    { title: 'The Science of Lion\'s Mane', slug: 'science-of-lions-mane' },
    { title: 'Mushroom Coffee vs. Regular Coffee', slug: 'mushroom-coffee-vs-regular-coffee' },
    { title: 'The History of Mushroom Coffee', slug: 'history-of-mushroom-coffee' },
  ],
};

// Related product links by content category
const RELATED_PRODUCTS_BY_SLUG = {
  'mushroom-coffee-vs-regular-coffee': [
    { name: 'Shop Mushroom Coffee', path: '/shop/instant-mushroom-coffee' },
    { name: 'Shop Classic Instant Coffee', path: '/shop/instant-coffee' },
  ],
  'does-mushroom-coffee-make-you-less-jittery': [
    { name: 'Shop Mushroom Coffee', path: '/shop/instant-mushroom-coffee' },
    { name: 'Take the Blend Quiz', path: '/quiz' },
  ],
  'what-does-mushroom-coffee-taste-like': [
    { name: 'Shop Mushroom Coffee', path: '/shop/instant-mushroom-coffee' },
    { name: 'GlowMind Clarity Blend', path: '/products/glowmind-clarity-blend' },
  ],
  'why-coffee-drinkers-are-switching-away-from-pods': [
    { name: 'Shop Classic Instant Coffee', path: '/shop/instant-coffee' },
    { name: 'Shop Mushroom Coffee', path: '/shop/instant-mushroom-coffee' },
  ],
  'matcha-vs-coffee': [
    { name: 'Shop Ceremonial Matcha', path: '/shop/matcha' },
    { name: 'The Monk Matcha Blend', path: '/products/the-monk-matcha-blend' },
  ],
  'science-of-lions-mane': [
    { name: 'GlowMind Clarity Blend', path: '/products/glowmind-clarity-blend' },
    { name: 'Shop Mushroom Coffee', path: '/shop/instant-mushroom-coffee' },
  ],
  'history-of-matcha': [
    { name: 'Shop Ceremonial Matcha', path: '/shop/matcha' },
    { name: 'The Monk Matcha Blend', path: '/products/the-monk-matcha-blend' },
  ],
  'chaga-mushroom-antioxidant-king': [
    { name: 'MoonCap Restore', path: '/products/mooncap-restore' },
    { name: 'Shop Mushroom Coffee', path: '/shop/instant-mushroom-coffee' },
  ],
  'what-makes-premium-instant-coffee-different': [
    { name: 'Torchbearer Classic Coffee', path: '/products/torchbearer-instant-coffee' },
    { name: 'Shop Classic Instant Coffee', path: '/shop/instant-coffee' },
  ],
};

// ── Extract FAQ Q&A pairs from HTML content for FAQ schema ──
function extractFAQFromContent(html) {
  if (!html) return [];
  // Find FAQ section (h2/h3 containing "FAQ" or "Frequently Asked Questions")
  const faqMatch = html.match(/<h[23][^>]*>(?:FAQ|Frequently Asked Questions|Common Questions)[^<]*<\/h[23]>([\s\S]*?)(?=<h[23]|<\/article>|$)/i);
  if (!faqMatch) return [];
  const faqSection = faqMatch[1];
  const qaPairs = [];
  // Match h3/h4 (question) followed by p or ul (answer)
  const qaRegex = /<h[34][^>]*>(.*?)<\/h[34]>\s*(?:<p[^>]*>(.*?)<\/p>|<ul[^>]*>([\s\S]*?)<\/ul>)/gi;
  let match;
  while ((match = qaRegex.exec(faqSection)) !== null) {
    const question = match[1].replace(/<[^>]*>/g, '').trim();
    const answer = (match[2] || match[3] || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    if (question && answer) qaPairs.push({ question, answer });
  }
  return qaPairs;
}

// ── Get relevant Knowledge Center articles based on post content ──
function getKnowledgeCenterLinks(post) {
  if (!post) return [];
  const checkText = `${post.title || ''} ${(post.tags || []).join(' ')} ${post.category || ''}`.toLowerCase();
  const keywordMap = {
    'mushroom': ['mushroom-coffee-vs-regular-coffee', 'how-much-caffeine-in-mushroom-coffee', 'can-you-take-mushroom-coffee-on-plane'],
    'coffee': ['what-makes-papua-new-guinea-coffee-different', 'why-freeze-dried-coffee-making-comeback', 'best-coffee-without-coffee-maker'],
    'instant': ['why-freeze-dried-coffee-making-comeback', 'coffee-pods-vs-instant-coffee', 'best-coffee-without-coffee-maker'],
    'pod': ['coffee-pods-vs-instant-coffee', 'why-coffee-drinkers-ditching-pods', 'best-coffee-without-coffee-maker'],
    'travel': ['best-coffee-for-travel-2026', 'can-you-take-mushroom-coffee-on-plane'],
    'matcha': ['mushroom-coffee-vs-regular-coffee'],
    'papua': ['what-makes-papua-new-guinea-coffee-different', 'history-of-papua-new-guinea-coffee'],
    'freeze': ['why-freeze-dried-coffee-making-comeback'],
    'caffeine': ['how-much-caffeine-in-mushroom-coffee'],
    'lion': ['mushroom-coffee-vs-regular-coffee', 'how-much-caffeine-in-mushroom-coffee'],
    'chaga': ['mushroom-coffee-vs-regular-coffee'],
    'adaptogen': ['mushroom-coffee-vs-regular-coffee'],
    'ritual': ['best-coffee-without-coffee-maker', 'best-coffee-for-travel-2026'],
  };
  const matchedSlugs = new Set();
  Object.entries(keywordMap).forEach(([keyword, slugs]) => {
    if (checkText.includes(keyword)) slugs.forEach(s => matchedSlugs.add(s));
  });
  return KNOWLEDGE_ARTICLES.filter(a => matchedSlugs.has(a.slug)).slice(0, 3);
}

// ── Default related products fallback for unmapped slugs ──
const DEFAULT_PRODUCTS = [
  { name: 'Shop All Coffee', path: '/shop' },
  { name: 'Take the Blend Quiz', path: '/quiz' },
];

const RG = '#E6B7AD';

const CATEGORY_COLORS = {
  science: '#A8D5BA',
  habits: '#D4A574',
  recipes: '#E6B7AD',
  wellness: '#B5A5D4',
  news: '#A5C5D4',
};

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // ── SYNCHRONOUS first-render meta ─────────────────────────────────────────
  // Base44 prerenders the React tree for social crawlers. To guarantee the
  // crawler snapshot reads article-specific OG tags (not the generic
  // "Loading…" / Journal-home defaults), compute meta from the slug on the
  // very first render — before the async DB fetch resolves. The DB post
  // (when it arrives) refines title/excerpt/featured image, but the article
  // URL, type, image priority order, and image alt are correct from t=0.
  const syncMeta = React.useMemo(() => {
    const override = ARTICLE_SOCIAL_OVERRIDES[slug];
    const syncTitle = override?.title || TITLE_BY_SLUG[slug];
    const syncDesc = override?.description;
    const { image: syncImage, alt: syncImageAlt } = resolveArticleImage(slug, null);
    return {
      title: syncTitle,
      description: syncDesc,
      image: syncImage,
      imageAlt: syncImageAlt,
      url: articleUrl(slug),
    };
  }, [slug]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const posts = await base44.entities.BlogPost.filter({ slug });
        if (posts.length > 0 && posts[0].published) {
          setPost(posts[0]);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  // Parse FAQ JSON for structured data injection
  const faqItems = (() => {
    if (!post?.tags) return null;
    // FAQ data embedded in newer DB posts via faq_json tag (stored separately, not shown raw)
    return null; // FAQPage schema is handled below via Helmet for DB posts
  })();

  // Resolve the article social image with the centralized priority order:
  //   1. article-specific social image  2. DB featured_image  3. Journal cover  4. logo
  const { image: resolvedOgImage, alt: resolvedImageAlt } = resolveArticleImage(slug, post?.featured_image);

  useSEO({
    title: post ? `${post.title} | Torch Republic` : (syncMeta.title ? `${syncMeta.title} | Torch Republic` : 'Loading...'),
    description: post?.excerpt || syncMeta.description || 'Read more on the Torch Republic Ritual Journal',
    image: resolvedOgImage,
    imageAlt: resolvedImageAlt,
    url: `/journal/${slug}`,
    type: 'article',
    article: {
      author: post?.author || 'Torch Republic',
      datePublished: post?.published_date || new Date().toISOString(),
      dateModified: post?.updated_date || post?.published_date || new Date().toISOString(),
      section: post?.category ? `${post.category.charAt(0).toUpperCase() + post.category.slice(1)}` : 'Journal',
      keywords: post?.tags || [],
    },
    breadcrumbs: post ? [
      { name: 'Home', url: '/' },
      { name: 'Journal', url: '/journal' },
      { name: post.title, url: `/journal/${slug}` },
    ] : undefined,
  });

  if (loading) {
    // Even during loading, emit article-specific OG meta so any crawler
    // snapshot is correct. Title shows article title (or a generic "Read on
    // the Journal" if the slug is unknown), never the homepage defaults.
    const loadingTitle = syncMeta.title
      ? `${syncMeta.title} | Torch Republic`
      : 'Read on the Torch Republic Ritual Journal';
    return (
      <>
        <Helmet>
          <title>{loadingTitle}</title>
          <meta name="description" content={syncMeta.description || 'Read this Torch Republic Journal article.'} />
          <link rel="canonical" href={syncMeta.url} />
          {/* Open Graph */}
          <meta property="og:title" content={loadingTitle} />
          <meta property="og:description" content={syncMeta.description || ''} />
          <meta property="og:url" content={syncMeta.url} />
          <meta property="og:type" content="article" />
          <meta property="og:site_name" content={SOCIAL_CONSTANTS.SITE_NAME} />
          <meta property="og:image" content={syncMeta.image} />
          <meta property="og:image:secure_url" content={syncMeta.image} />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content={syncMeta.imageAlt} />
          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={loadingTitle} />
          <meta name="twitter:description" content={syncMeta.description || ''} />
          <meta name="twitter:image" content={syncMeta.image} />
          <meta name="twitter:image:alt" content={syncMeta.imageAlt} />
        </Helmet>
        <div className="min-h-screen flex items-center justify-center" style={{ background: '#0A0A0A' }}>
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-rose-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: RG }}>Loading...</p>
          </div>
        </div>
      </>
    );
  }

  if (!post) {
    return (
      <>
        {/* noindex + canonical so an unpublished/missing article URL never
            surfaces homepage OG metadata to crawlers. */}
        <Helmet>
          <meta name="robots" content="noindex, follow" />
          <link rel="canonical" href={syncMeta.url} />
        </Helmet>
        <div className="min-h-screen flex items-center justify-center" style={{ background: '#0A0A0A' }}>
          <div className="text-center max-w-md px-6">
            <h1 className="font-serif font-bold mb-4" style={{ fontSize: '2rem', color: '#F5EFE6' }}>
              Article Not Found
            </h1>
            <p className="font-heading mb-8" style={{ color: 'rgba(210,195,175,0.6)' }}>
              This article may have been moved or unpublished.
            </p>
            <Link
              to="/journal"
              className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-3.5 px-8 rounded-sm"
              style={{ background: RG, color: '#050505' }}
            >
              <ArrowLeft size={14} /> Back to Journal
            </Link>
          </div>
        </div>
      </>
    );
  }

  const categoryColor = CATEGORY_COLORS[post.category] || RG;

  return (
    <>
      <Helmet>
        <title>{post.title} | Torch Republic</title>
        <meta name="description" content={post.excerpt || post.title} />
        <link rel="canonical" href={`https://torchrepublic.com/journal/${slug}`} />
        {/* Open Graph / Facebook */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || post.title} />
        <meta property="og:url" content={`https://torchrepublic.com/journal/${slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={SOCIAL_CONSTANTS.SITE_NAME} />
        <meta property="og:image" content={resolvedOgImage} />
        <meta property="og:image:secure_url" content={resolvedOgImage} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={resolvedImageAlt} />
        <meta property="article:published_time" content={post.published_date} />
        <meta property="article:author" content={post.author || 'Torch Republic'} />
        <meta property="article:section" content={post.category} />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt || post.title} />
        <meta name="twitter:image" content={resolvedOgImage} />
        <meta name="twitter:image:alt" content={resolvedImageAlt} />
      </Helmet>
      <div className="min-h-screen" style={{ background: '#0A0A0A' }}>
      {/* Back Link */}
      <div className="px-6 md:px-10 py-6" style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <Link
          to="/journal"
          className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase transition-all hover:opacity-80"
          style={{ color: RG }}
        >
          <ArrowLeft size={14} /> Back to Journal
        </Link>
      </div>

      {/* Article Header */}
      <article>
        <header className="px-6 md:px-10 pt-12 pb-8">
          <div className="max-w-[900px] mx-auto">
            {/* Category Badge */}
            <div className="mb-6">
              <span
                className="px-4 py-2 rounded-sm font-mono text-[9px] tracking-[0.3em] uppercase font-bold"
                style={{
                  background: `${categoryColor}15`,
                  border: `1px solid ${categoryColor}40`,
                  color: categoryColor,
                }}
              >
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1
              className="font-serif font-bold mb-6"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#F5EFE6', lineHeight: 1.2, letterSpacing: '-0.02em' }}
            >
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p
                className="font-heading text-lg mb-8"
                style={{ color: 'rgba(240,235,225,0.6)', fontWeight: 300, lineHeight: 1.8 }}
              >
                {post.excerpt}
              </p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 pb-8" style={{ borderBottom: '1px solid rgba(230,183,173,0.15)' }}>
              {post.author && (
                <div className="flex items-center gap-2" style={{ color: `${RG}60` }}>
                  <User size={14} />
                  <span className="font-mono text-[9px] tracking-[0.25em] uppercase">{post.author}</span>
                </div>
              )}
              {post.published_date && (
                <div className="flex items-center gap-2" style={{ color: `${RG}60` }}>
                  <Calendar size={14} />
                  <span className="font-mono text-[9px] tracking-[0.25em] uppercase">
                    {new Date(post.published_date).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
              )}
              {post.read_time && (
                <div className="flex items-center gap-2" style={{ color: `${RG}60` }}>
                  <Clock size={14} />
                  <span className="font-mono text-[9px] tracking-[0.25em] uppercase">{post.read_time} min read</span>
                </div>
              )}
              <div className="flex items-center gap-4 ml-auto">
                <button className="flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] uppercase transition-all hover:opacity-80" style={{ color: `${RG}50` }}>
                  <Bookmark size={14} /> Save
                </button>
              </div>
            </div>

            {/* Share Bar — directly below author/date/reading-time row */}
            <div className="mt-6">
              <ArticleShareBar
                title={post.title}
                url={`/journal/${post.slug}`}
                excerpt={post.excerpt}
                image={resolvedOgImage}
                slug={post.slug}
                contentType="article"
                location="top"
              />
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="px-6 md:px-10 mb-12">
            <div className="max-w-[900px] mx-auto overflow-hidden rounded-sm">
              <img
                src={post.featured_image}
                alt={`${post.title} — Torch Republic Coffee Company`}
                className="w-full h-auto object-cover"
                style={{ maxHeight: '500px' }}
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="px-6 md:px-10 pb-16">
          <div className="max-w-[750px] mx-auto">
            {/* Mid-article inline CTA — injected via React, not into HTML content */}
            <JournalMidCTA slug={post.slug} category={post.category} />
            <div
              className="prose prose-invert prose-lg max-w-none"
              style={{
                color: 'rgba(240,235,225,0.85)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 300,
                lineHeight: 1.8,
              }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(230,183,173,0.1)' }}>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-sm font-mono text-[8px] tracking-[0.25em] uppercase"
                      style={{
                        background: `${RG}10`,
                        border: `1px solid ${RG}25`,
                        color: `${RG}70`,
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Continue Your Ritual CTA — conversion section before related articles */}
            <JournalRitualCTA slug={post.slug} category={post.category} />

            {/* Email Capture */}
            <BlogEmailCapture />

            {/* Related Articles */}
            {RELATED_BY_SLUG[post.slug] && (
              <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(230,183,173,0.1)' }}>
                <p className="font-mono text-[9px] tracking-[0.35em] uppercase mb-5" style={{ color: 'rgba(230,183,173,0.5)' }}>
                  Related Reading
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {RELATED_BY_SLUG[post.slug].map((r, i) => (
                    <Link key={i} to={`/journal/${r.slug}`}
                      className="p-4 block transition-all hover:opacity-75"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(230,183,173,0.1)' }}>
                      <p className="font-heading text-sm" style={{ color: '#F5EFE6', fontWeight: 500, lineHeight: 1.4 }}>{r.title}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <span className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>Read</span>
                        <ArrowRight className="w-3 h-3" style={{ color: 'rgba(230,183,173,0.5)' }} />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Share Bar — bottom, after conclusion and references */}
            <div className="mt-10 pt-8" style={{ borderTop: '1px solid rgba(230,183,173,0.1)' }}>
              <ArticleShareBar
                title={post.title}
                url={`/journal/${post.slug}`}
                excerpt={post.excerpt}
                image={resolvedOgImage}
                slug={post.slug}
                contentType="article"
                location="bottom"
              />
            </div>

            {/* Related Products CTA */}
            {RELATED_PRODUCTS_BY_SLUG[post.slug] ? (
              <div className="mt-8 p-6" style={{ background: 'rgba(230,183,173,0.04)', border: `1px solid ${RG}18` }}>
                <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.5)' }}>Explore the Products</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  {RELATED_PRODUCTS_BY_SLUG[post.slug].map((prod, i) => (
                    <Link key={i} to={prod.path}
                      className="font-mono text-[9px] tracking-[0.25em] uppercase font-bold py-3 px-6 text-center transition-all hover:opacity-80"
                      style={i === 0
                        ? { background: RG, color: '#050505' }
                        : { border: `1px solid ${RG}40`, color: RG }}>
                      {prod.name} →
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-8 p-8 text-center" style={{ background: 'rgba(230,183,173,0.05)', border: `1px solid ${RG}20` }}>
                <p className="font-serif font-bold text-xl mb-4" style={{ color: '#F5EFE6' }}>Ready to Start Your Ritual?</p>
                <p className="font-heading mb-6" style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300 }}>
                  Explore our collection of mushroom coffee and matcha blends.
                </p>
                <Link to="/shop"
                  className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-3.5 px-8"
                  style={{ background: RG, color: '#050505' }}>
                  Shop Blends →
                </Link>
              </div>
            )}
          </div>
        </div>
      </article>

      <PopularArticles />
      </div>
      </>
      );
      }