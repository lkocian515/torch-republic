import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useSEO } from '@/hooks/useSEO';
import { ArrowLeft, Calendar, Clock, User, Share2, Bookmark } from 'lucide-react';

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

  useSEO({
    title: post ? `${post.title} | Torch Republic` : 'Loading...',
    description: post?.excerpt || 'Read more on the Torch Republic Ritual Journal',
    url: `/journal/${slug}`,
    type: 'article',
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0A0A0A' }}>
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-rose-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: RG }}>Loading...</p>
        </div>
      </div>
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
                  <Share2 size={14} /> Share
                </button>
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

            {/* CTA */}
            <div
              className="mt-12 p-8 rounded-sm text-center"
              style={{
                background: 'rgba(230,183,173,0.05)',
                border: `1px solid ${RG}20`,
              }}
            >
              <p className="font-serif font-bold text-xl mb-4" style={{ color: '#F5EFE6' }}>
                Ready to Start Your Ritual?
              </p>
              <p className="font-heading mb-6" style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300 }}>
                Explore our collection of mushroom coffee and matcha blends.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-3.5 px-8 rounded-sm"
                style={{ background: RG, color: '#050505' }}
              >
                Shop Blends →
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}