import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useSEO } from '@/hooks/useSEO';
import { ArrowLeft, Calendar, Clock, User, Bookmark, ArrowRight } from 'lucide-react';
import ShareButtons from '../components/social/ShareButtons';

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

  // Set meta tags immediately for social media crawlers
  useEffect(() => {
    const setMetaTag = (property, content, isProperty = true) => {
      let el = document.querySelector(`meta[${isProperty ? 'property' : 'name'}="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(isProperty ? 'property' : 'name', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const fetchPostAndSetMeta = async () => {
      try {
        const posts = await base44.entities.BlogPost.filter({ slug });
        if (posts.length > 0 && posts[0].published) {
          const postData = posts[0];
          setPost(postData);
          
          // Set meta tags immediately
          const ogImage = postData.featured_image || 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/134aeb9a2_LIVEFREESTAYREADY_20260606_001446_0000.png';
          const fullUrl = `https://torchrepublic.com/journal/${slug}`;
          
          setMetaTag('og:title', postData.title);
          setMetaTag('og:description', postData.excerpt || postData.title);
          setMetaTag('og:image', ogImage);
          setMetaTag('og:image:width', '1200');
          setMetaTag('og:image:height', '630');
          setMetaTag('og:type', 'article');
          setMetaTag('og:url', fullUrl);
          setMetaTag('article:published_time', postData.published_date);
          setMetaTag('article:author', postData.author || 'Torch Republic');
          setMetaTag('article:section', postData.category);
          setMetaTag('twitter:title', postData.title, false);
          setMetaTag('twitter:description', postData.excerpt || postData.title, false);
          setMetaTag('twitter:image', ogImage, false);
          setMetaTag('twitter:card', 'summary_large_image', false);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPostAndSetMeta();
  }, [slug]);

  // Parse FAQ JSON for structured data injection
  const faqItems = (() => {
    if (!post?.tags) return null;
    // FAQ data embedded in newer DB posts via faq_json tag (stored separately, not shown raw)
    return null; // FAQPage schema is handled below via Helmet for DB posts
  })();

  useSEO({
    title: post ? `${post.title} | Torch Republic` : 'Loading...',
    description: post?.excerpt || 'Read more on the Torch Republic Ritual Journal',
    image: post?.featured_image || 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/134aeb9a2_LIVEFREESTAYREADY_20260606_001446_0000.png',
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

  // For social media crawlers that don't execute JS, we also use Helmet
  const ogImage = post?.featured_image || 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/134aeb9a2_LIVEFREESTAYREADY_20260606_001446_0000.png';

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Loading... | Torch Republic</title>
          <meta property="og:title" content="Loading..." />
          <meta property="og:description" content="Loading article..." />
          <meta property="og:image" content="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/134aeb9a2_LIVEFREESTAYREADY_20260606_001446_0000.png" />
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
    );
  }

  const categoryColor = CATEGORY_COLORS[post.category] || RG;

  return (
    <>
      <Helmet>
        <title>{post.title} | Torch Republic</title>
        <meta name="description" content={post.excerpt || post.title} />
        {/* Open Graph / Facebook */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || post.title} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://torchrepublic.com/journal/${slug}`} />
        <meta property="article:published_time" content={post.published_date} />
        <meta property="article:author" content={post.author || 'Torch Republic'} />
        <meta property="article:section" content={post.category} />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt || post.title} />
        <meta name="twitter:image" content={ogImage} />
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
                <ShareButtons title={post.title} url={`/journal/${post.slug}`} image={post.featured_image} compact />
                <button className="flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] uppercase transition-all hover:opacity-80" style={{ color: `${RG}50` }}>
                  <Bookmark size={14} /> Save
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="px-6 md:px-10 mb-12">
            <div className="max-w-[900px] mx-auto overflow-hidden rounded-sm">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-auto object-cover"
                style={{ maxHeight: '500px' }}
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="px-6 md:px-10 pb-16">
          <div className="max-w-[750px] mx-auto">
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

            {/* Share at bottom */}
            <div className="mt-10 pt-8" style={{ borderTop: '1px solid rgba(230,183,173,0.1)' }}>
              <ShareButtons title={post.title} url={`/journal/${post.slug}`} image={post.featured_image} />
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
    </div>
    </>
  );
}