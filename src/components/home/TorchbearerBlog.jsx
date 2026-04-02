import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const POSTS = [
  {
    date: 'March 2026',
    category: 'Faith & Identity',
    title: 'Why What You Wear Is a Declaration',
    excerpt: "Every garment carries a signal. When you put on something that stands for truth, you're not just getting dressed — you're making a statement about who you are and what you refuse to surrender.",
  },
  {
    date: 'February 2026',
    category: 'Freedom',
    title: 'The Cost of Silence in a Loud World',
    excerpt: "In a culture that rewards conformity and punishes conviction, the most radical thing you can do is speak plainly. Torchbearers don't blend in. They hold the line.",
  },
  {
    date: 'January 2026',
    category: 'American Heritage',
    title: 'What the Founders Actually Said About Freedom',
    excerpt: "Beyond the soundbites and the textbooks, the founders wrote with urgency and clarity. Their words weren't abstract. They were warnings — written directly to us.",
  },
];

export default function TorchbearerBlog() {
  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: '#080808', borderTop: '1px solid rgba(201,162,74,0.12)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, #0E2A2F, #C8A44D)' }} />
              <span className="font-mono text-xs tracking-[0.35em] uppercase" style={{ color: '#C8A44D' }}>
                The Torchbearer
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-white">
              Torchbearer Blog
            </h2>
            <p className="text-gray-500 text-sm mt-1 font-mono">Conviction · Heritage · Identity</p>
          </div>
          <Link
            to="/Mission"
            className="hidden md:flex items-center gap-2 font-mono text-sm tracking-wider hover:gap-3 transition-all"
            style={{ color: '#C8A44D' }}
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {POSTS.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col border p-6 cursor-pointer transition-all duration-300"
              style={{
                borderColor: 'rgba(201,162,74,0.12)',
                backgroundColor: '#0D0D0D',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,162,74,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,162,74,0.12)'; }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: '#C8A44D' }}>
                  {post.category}
                </span>
                <span className="text-gray-700 font-mono text-[10px]">·</span>
                <span className="font-mono text-[10px] text-gray-600 tracking-wider">{post.date}</span>
              </div>

              <h3 className="font-heading font-black text-lg text-white leading-snug mb-3 group-hover:text-gold transition-colors">
                {post.title}
              </h3>

              <p className="font-mono text-xs text-gray-500 leading-relaxed flex-1">
                {post.excerpt}
              </p>

              <div
                className="inline-flex items-center gap-2 font-mono text-xs tracking-wider mt-5 group-hover:gap-3 transition-all"
                style={{ color: 'rgba(201,162,74,0.7)' }}
              >
                Read More <ArrowRight className="w-3 h-3" />
              </div>
            </motion.article>
          ))}
        </div>

        {/* Mobile View All */}
        <Link
          to="/Mission"
          className="md:hidden flex items-center justify-center gap-2 font-mono text-sm tracking-wider mt-8 hover:gap-3 transition-all"
          style={{ color: '#C8A44D' }}
        >
          View All Posts <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}