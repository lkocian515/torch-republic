import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save, Eye, Image as ImageIcon, Calendar, Clock, User, Tag, Globe } from 'lucide-react';
import { toast } from 'sonner';

const RG = '#E6B7AD';

const CATEGORY_OPTIONS = [
  { value: 'science', label: 'Science' },
  { value: 'habits', label: 'Habits' },
  { value: 'recipes', label: 'Recipes' },
  { value: 'wellness', label: 'Wellness' },
  { value: 'news', label: 'News' },
];

export default function AdminBlogEditor() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isCreating, setIsCreating] = useState(!slug);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: '',
    category: 'wellness',
    featured_image: '',
    published: false,
    published_date: new Date().toISOString().split('T')[0],
    read_time: 5,
    tags: [],
    // SEO Meta Fields
    meta_title: '',
    meta_description: '',
    og_title: '',
    og_description: '',
    og_image: '',
    twitter_card: 'summary_large_image',
  });

  const [tagInput, setTagInput] = useState('');

  // Fetch existing post if editing
  const { data: post, isLoading } = useQuery({
    queryKey: ['blogPost', slug],
    queryFn: async () => {
      if (!slug) return null;
      const posts = await base44.entities.BlogPost.filter({ slug });
      return posts.length > 0 ? posts[0] : null;
    },
    enabled: !!slug,
  });

  // Populate form when post data loads
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        slug: post.slug || '',
        excerpt: post.excerpt || '',
        content: post.content || '',
        author: post.author || '',
        category: post.category || 'wellness',
        featured_image: post.featured_image || '',
        published: post.published ?? false,
        published_date: post.published_date ? post.published_date.split('T')[0] : '',
        read_time: post.read_time || 5,
        tags: post.tags || [],
        meta_title: post.meta_title || '',
        meta_description: post.meta_description || '',
        og_title: post.og_title || '',
        og_description: post.og_description || '',
        og_image: post.og_image || '',
        twitter_card: post.twitter_card || 'summary_large_image',
      });
    }
  }, [post]);

  // Save mutation
  const saveMutation = useMutation({
    mutationFn: async (data) => {
      const payload = {
        ...data,
        published_date: data.published_date ? new Date(data.published_date).toISOString() : null,
      };
      
      if (isCreating || !post) {
        return await base44.entities.BlogPost.create(payload);
      } else {
        return await base44.entities.BlogPost.update(post.id, payload);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPost', slug] });
      toast.success(isCreating ? 'Article created!' : 'Article updated!');
      if (isCreating && formData.slug) {
        navigate(`/admin/blog/${formData.slug}`);
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to save article');
    },
  });

  const handleSave = () => {
    saveMutation.mutate(formData);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0A0A0A' }}>
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-rose-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: RG }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{isCreating ? 'New Article' : `Edit: ${formData.title}`} | Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div style={{ backgroundColor: '#080808', minHeight: '100vh', color: '#F0EBE1' }}>
        {/* Header */}
        <div className="px-6 md:px-10 pt-8 pb-6" style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <Link
              to="/journal"
              className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase transition-all hover:opacity-80"
              style={{ color: RG }}
            >
              <ArrowLeft size={14} /> Back to Journal
            </Link>
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.open(`/journal/${formData.slug || post?.slug}`, '_blank')}
                disabled={!formData.slug && !post?.slug}
                className="flex items-center gap-2 px-4 py-2 font-mono text-[9px] tracking-[0.2em] uppercase transition-all hover:opacity-80 disabled:opacity-40"
                style={{ border: `1px solid ${RG}40`, color: RG }}
              >
                <Eye size={12} /> Preview
              </button>
              <button
                onClick={handleSave}
                disabled={saveMutation.isPending || !formData.title}
                className="flex items-center gap-2 px-6 py-2.5 font-mono text-[9px] tracking-[0.3em] uppercase font-bold transition-all hover:opacity-90 disabled:opacity-40"
                style={{ background: RG, color: '#080808' }}
              >
                <Save size={14} /> {saveMutation.isPending ? 'Saving...' : (isCreating ? 'Create' : 'Save')}
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 md:px-10 py-8 max-w-5xl mx-auto space-y-8">
          
          {/* Basic Information */}
          <section>
            <h2 className="font-serif font-bold text-xl mb-4" style={{ color: '#F5EFE6' }}>Basic Information</h2>
            <div className="grid gap-5" style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.1)', borderRadius: '4px' }}>
              
              {/* Title */}
              <div className="p-5">
                <label className="block font-mono text-[9px] tracking-[0.25em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.5)' }}>
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setFormData(prev => ({
                      ...prev,
                      title,
                      slug: prev.slug || generateSlug(title)
                    }));
                  }}
                  className="w-full px-4 py-3 font-heading text-base"
                  style={{ 
                    background: '#0A0908', 
                    border: '1px solid rgba(230,183,173,0.15)',
                    color: '#F5EFE6',
                    borderRadius: '3px'
                  }}
                  placeholder="Enter article title"
                />
              </div>

              {/* Slug */}
              <div className="p-5">
                <label className="block font-mono text-[9px] tracking-[0.25em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.5)' }}>
                  URL Slug *
                </label>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs" style={{ color: 'rgba(230,183,173,0.4)' }}>torchrepublic.com/journal/</span>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    className="flex-1 px-4 py-3 font-mono text-sm"
                    style={{ 
                      background: '#0A0908', 
                      border: '1px solid rgba(230,183,173,0.15)',
                      color: RG,
                      borderRadius: '3px'
                    }}
                    placeholder="article-slug"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div className="p-5">
                <label className="block font-mono text-[9px] tracking-[0.25em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.5)' }}>
                  Excerpt
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  className="w-full px-4 py-3 font-heading text-sm"
                  style={{ 
                    background: '#0A0908', 
                    border: '1px solid rgba(230,183,173,0.15)',
                    color: '#F5EFE6',
                    borderRadius: '3px',
                    minHeight: '100px'
                  }}
                  placeholder="Short summary or teaser text"
                />
                <p className="font-mono text-[8px] mt-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  Used as meta description and social preview text
                </p>
              </div>

              {/* Author, Category, Read Time */}
              <div className="grid grid-cols-3 gap-4 p-5 pt-0">
                <div>
                  <label className="block font-mono text-[9px] tracking-[0.25em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.5)' }}>
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                    className="w-full px-4 py-2.5 font-heading text-sm"
                    style={{ 
                      background: '#0A0908', 
                      border: '1px solid rgba(230,183,173,0.15)',
                      color: '#F5EFE6',
                      borderRadius: '3px'
                    }}
                    placeholder="Torch Republic"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[9px] tracking-[0.25em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.5)' }}>
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-2.5 font-heading text-sm"
                    style={{ 
                      background: '#0A0908', 
                      border: '1px solid rgba(230,183,173,0.15)',
                      color: '#F5EFE6',
                      borderRadius: '3px'
                    }}
                  >
                    {CATEGORY_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-[9px] tracking-[0.25em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.5)' }}>
                    Read Time (min)
                  </label>
                  <input
                    type="number"
                    value={formData.read_time}
                    onChange={(e) => setFormData(prev => ({ ...prev, read_time: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-2.5 font-heading text-sm"
                    style={{ 
                      background: '#0A0908', 
                      border: '1px solid rgba(230,183,173,0.15)',
                      color: '#F5EFE6',
                      borderRadius: '3px'
                    }}
                    min="1"
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="p-5 pt-0">
                <label className="block font-mono text-[9px] tracking-[0.25em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.5)' }}>
                  Tags
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    className="flex-1 px-4 py-2.5 font-heading text-sm"
                    style={{ 
                      background: '#0A0908', 
                      border: '1px solid rgba(230,183,173,0.15)',
                      color: '#F5EFE6',
                      borderRadius: '3px'
                    }}
                    placeholder="Add a tag"
                  />
                  <button
                    onClick={handleAddTag}
                    className="px-4 py-2.5 font-mono text-[8px] tracking-[0.2em] uppercase"
                    style={{ background: RG, color: '#080808', borderRadius: '3px' }}
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-mono text-[8px] tracking-[0.25em] uppercase"
                      style={{
                        background: `${RG}10`,
                        border: `1px solid ${RG}25`,
                        color: `${RG}70`,
                      }}
                    >
                      #{tag}
                      <button onClick={() => handleRemoveTag(tag)} className="hover:opacity-70">×</button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Content */}
          <section>
            <h2 className="font-serif font-bold text-xl mb-4" style={{ color: '#F5EFE6' }}>Content</h2>
            <div className="p-5" style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.1)', borderRadius: '4px' }}>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                className="w-full px-4 py-3 font-heading text-sm"
                style={{ 
                  background: '#0A0908', 
                  border: '1px solid rgba(230,183,173,0.15)',
                  color: '#F5EFE6',
                  borderRadius: '3px',
                  minHeight: '400px',
                  fontFamily: 'monospace'
                }}
                placeholder="Article content (HTML or Markdown)"
              />
              <p className="font-mono text-[8px] mt-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
                You can use HTML tags or Markdown formatting
              </p>
            </div>
          </section>

          {/* Featured Image */}
          <section>
            <h2 className="font-serif font-bold text-xl mb-4" style={{ color: '#F5EFE6' }}>Featured Image</h2>
            <div className="p-5" style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.1)', borderRadius: '4px' }}>
              <label className="block font-mono text-[9px] tracking-[0.25em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.5)' }}>
                Image URL
              </label>
              <input
                type="text"
                value={formData.featured_image}
                onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
                className="w-full px-4 py-3 font-mono text-sm mb-4"
                style={{ 
                  background: '#0A0908', 
                  border: '1px solid rgba(230,183,173,0.15)',
                  color: RG,
                  borderRadius: '3px'
                }}
                placeholder="https://..."
              />
              {formData.featured_image && (
                <div className="mt-4">
                  <img
                    src={formData.featured_image}
                    alt="Preview"
                    className="w-full max-h-[300px] object-cover rounded-sm"
                    style={{ border: '1px solid rgba(230,183,173,0.1)' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden items-center justify-center p-8" style={{ background: '#0A0908', border: '1px solid rgba(230,183,173,0.1)', borderRadius: '4px' }}>
                    <ImageIcon size={48} style={{ color: 'rgba(230,183,173,0.3)', marginBottom: '12px' }} />
                    <p className="font-mono text-[9px]" style={{ color: 'rgba(230,183,173,0.4)' }}>Image failed to load</p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* SEO Meta Tags */}
          <section>
            <h2 className="font-serif font-bold text-xl mb-4" style={{ color: '#F5EFE6' }}>SEO & Social Media Meta Tags</h2>
            <div className="space-y-5">
              
              {/* Meta Title & Description */}
              <div className="p-5" style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.1)', borderRadius: '4px' }}>
                <h3 className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold mb-4" style={{ color: RG }}>Search Engine Meta Tags</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block font-mono text-[9px] tracking-[0.25em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.5)' }}>
                      Meta Title (appears in Google search)
                    </label>
                    <input
                      type="text"
                      value={formData.meta_title}
                      onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
                      className="w-full px-4 py-3 font-heading text-sm"
                      style={{ 
                        background: '#0A0908', 
                        border: '1px solid rgba(230,183,173,0.15)',
                        color: '#F5EFE6',
                        borderRadius: '3px'
                      }}
                      placeholder={formData.title || 'Defaults to article title'}
                    />
                    <p className="font-mono text-[8px] mt-1.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      Recommended: 50-60 characters
                    </p>
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] tracking-[0.25em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.5)' }}>
                      Meta Description (appears in Google search)
                    </label>
                    <textarea
                      value={formData.meta_description}
                      onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                      className="w-full px-4 py-3 font-heading text-sm"
                      style={{ 
                        background: '#0A0908', 
                        border: '1px solid rgba(230,183,173,0.15)',
                        color: '#F5EFE6',
                        borderRadius: '3px',
                        minHeight: '80px'
                      }}
                      placeholder={formData.excerpt || 'Defaults to excerpt'}
                    />
                    <p className="font-mono text-[8px] mt-1.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      Recommended: 150-160 characters
                    </p>
                  </div>
                </div>
              </div>

              {/* Open Graph / Facebook */}
              <div className="p-5" style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.1)', borderRadius: '4px' }}>
                <h3 className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold mb-4" style={{ color: RG }}>Open Graph (Facebook, LinkedIn)</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block font-mono text-[9px] tracking-[0.25em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.5)' }}>
                      OG Title
                    </label>
                    <input
                      type="text"
                      value={formData.og_title}
                      onChange={(e) => setFormData(prev => ({ ...prev, og_title: e.target.value }))}
                      className="w-full px-4 py-3 font-heading text-sm"
                      style={{ 
                        background: '#0A0908', 
                        border: '1px solid rgba(230,183,173,0.15)',
                        color: '#F5EFE6',
                        borderRadius: '3px'
                      }}
                      placeholder={formData.title || 'Defaults to article title'}
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] tracking-[0.25em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.5)' }}>
                      OG Description
                    </label>
                    <textarea
                      value={formData.og_description}
                      onChange={(e) => setFormData(prev => ({ ...prev, og_description: e.target.value }))}
                      className="w-full px-4 py-3 font-heading text-sm"
                      style={{ 
                        background: '#0A0908', 
                        border: '1px solid rgba(230,183,173,0.15)',
                        color: '#F5EFE6',
                        borderRadius: '3px',
                        minHeight: '80px'
                      }}
                      placeholder={formData.excerpt || 'Defaults to excerpt'}
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] tracking-[0.25em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.5)' }}>
                      OG Image URL
                    </label>
                    <input
                      type="text"
                      value={formData.og_image}
                      onChange={(e) => setFormData(prev => ({ ...prev, og_image: e.target.value }))}
                      className="w-full px-4 py-3 font-mono text-sm"
                      style={{ 
                        background: '#0A0908', 
                        border: '1px solid rgba(230,183,173,0.15)',
                        color: RG,
                        borderRadius: '3px'
                      }}
                      placeholder={formData.featured_image || 'Defaults to featured image'}
                    />
                    <p className="font-mono text-[8px] mt-1.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      Recommended: 1200x630px
                    </p>
                  </div>
                </div>
              </div>

              {/* Twitter Card */}
              <div className="p-5" style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.1)', borderRadius: '4px' }}>
                <h3 className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold mb-4" style={{ color: RG }}>Twitter Card</h3>
                <div>
                  <label className="block font-mono text-[9px] tracking-[0.25em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.5)' }}>
                    Card Type
                  </label>
                  <select
                    value={formData.twitter_card}
                    onChange={(e) => setFormData(prev => ({ ...prev, twitter_card: e.target.value }))}
                    className="w-full px-4 py-3 font-heading text-sm"
                    style={{ 
                      background: '#0A0908', 
                      border: '1px solid rgba(230,183,173,0.15)',
                      color: '#F5EFE6',
                      borderRadius: '3px'
                    }}
                  >
                    <option value="summary_large_image">Summary Large Image</option>
                    <option value="summary">Summary</option>
                  </select>
                  <p className="font-mono text-[8px] mt-1.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    Uses same title, description, and image as Open Graph if not specified
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* Publishing */}
          <section>
            <h2 className="font-serif font-bold text-xl mb-4" style={{ color: '#F5EFE6' }}>Publishing</h2>
            <div className="p-5" style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.1)', borderRadius: '4px' }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[9px] tracking-[0.25em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.5)' }}>
                    Published Date
                  </label>
                  <input
                    type="date"
                    value={formData.published_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, published_date: e.target.value }))}
                    className="w-full px-4 py-3 font-heading text-sm"
                    style={{ 
                      background: '#0A0908', 
                      border: '1px solid rgba(230,183,173,0.15)',
                      color: '#F5EFE6',
                      borderRadius: '3px'
                    }}
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                      className="w-5 h-5 rounded"
                      style={{ 
                        accentColor: RG,
                        border: '1px solid rgba(230,183,173,0.3)'
                      }}
                    />
                    <span className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: RG }}>
                      Published
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}