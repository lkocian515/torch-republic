import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const SHOP_DOMAIN = 'https://www.torchrepublic.com';
const BLOG_BASE = `${SHOP_DOMAIN}/blogs/torchbearer-blog`;

const POSTS = [
  {
    slug: 'why-faith-over-fear-isnt-just-a-saying-its-a-lifestyle',
    date: 'Mar 21, 2026',
    category: 'Faith & Identity',
    title: "Why \"Faith Over Fear\" Isn't Just a Saying — It's a Lifestyle",
    excerpt: "It's easy to put the words on a shirt. It's harder to live them. Here's what it actually means to carry that conviction every single day.",
  },
  {
    slug: 'the-torch-and-the-republic-why-light-has-always-belonged-to-the-people',
    date: 'Mar 12, 2026',
    category: 'American Heritage',
    title: 'The Torch and the Republic: Why Light Has Always Belonged to the People',
    excerpt: "The torch isn't a symbol of power — it's a symbol of responsibility. And it's always been in the hands of ordinary people who refused to let it go out.",
  },
  {
    slug: 'why-torch-republic-exists-and-why-now',
    date: 'Feb 27, 2026',
    category: 'Our Story',
    title: 'Why Torch Republic Exists — and Why Now',
    excerpt: "This brand didn't start as a business plan. It started as a conviction. Here's the honest story of why Torch Republic exists and what it's fighting for.",
  },
];

export default function TorchbearerBlog() {
  return (
    <section
      className="py-20 px-6 md:px-8"
      style={{ backgroundColor: '#080808', borderTop: '1px solid rgba(201,162,74,0.12)' }}
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, #09243A, #E6AC45)' }} />
              <span className="font-mono text-xs tracking-[0.35em] uppercase" style={{ color: '#E6AC45' }}>
                The Torchbearer
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-white">
              Torchbearer Blog
            </h2>
            <p className="text-gray-500 text-sm mt-1 font-mono">Conviction · Heritage · Identity</p>
          </div>
          <a
            href={BLOG_BASE}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 font-mono text-sm tracking-wider hover:gap-3 transition-all"
            style={{ color: '#E6AC45' }}
          >
            View All <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {POSTS.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col border p-6 transition-all duration-300"
              style={{ borderColor: 'rgba(201,162,74,0.12)', backgroundColor: '#0D0D0D' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,162,74,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,162,74,0.12)'; }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: '#E6AC45' }}>
                  {post.category}
                </span>
                <span className="text-gray-700 font-mono text-[10px]">·</span>
                <span className="font-mono text-[10px] text-gray-600 tracking-wider">{post.date}</span>
              </div>

              <a href={`${BLOG_BASE}/${post.slug}`} target="_blank" rel="noopener noreferrer" className="block">
                <h3 className="font-heading font-black text-lg text-white leading-snug mb-3 group-hover:text-gold transition-colors">
                  {post.title}
                </h3>
              </a>

              <p className="font-mono text-xs text-gray-500 leading-relaxed flex-1">
                {post.excerpt}
              </p>

              <a
                href={`${BLOG_BASE}/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs tracking-wider mt-5 group-hover:gap-3 transition-all"
                style={{ color: 'rgba(201,162,74,0.7)' }}
              >
                Read More <ArrowRight className="w-3 h-3" />
              </a>
            </motion.article>
          ))}
        </div>

        {/* Mobile View All */}
        <a
          href={BLOG_BASE}
          target="_blank"
          rel="noopener noreferrer"
          className="md:hidden flex items-center justify-center gap-2 font-mono text-sm tracking-wider mt-8 hover:gap-3 transition-all"
          style={{ color: '#E6AC45' }}
        >
          View All Posts <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}