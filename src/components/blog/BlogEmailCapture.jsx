import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Check } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const RG = '#E6AC45';

export default function BlogEmailCapture() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await base44.entities.EmailSubscriber.create({
        email,
        source: 'timed_popup',
        discount_code: 'BLOG10',
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitted(true);
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="my-12 p-8 text-center"
        style={{ background: `${RG}06`, border: `1px solid ${RG}20` }}
      >
        <Check size={28} style={{ color: RG, margin: '0 auto 12px' }} />
        <p className="font-serif font-bold mb-2" style={{ fontSize: '1.2rem', color: '#F7F2E9' }}>You're In.</p>
        <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.6)', fontWeight: 300, lineHeight: 1.7 }}>
          Check your inbox for a 10% discount code and our next article.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-12 p-8"
      style={{ background: 'linear-gradient(160deg, #0F0E0D 0%, #0A0908 100%)', border: `1px solid ${RG}20` }}
    >
      <div className="flex items-center gap-3 mb-4">
        <Mail size={18} style={{ color: RG }} />
        <p className="font-mono text-[9px] tracking-[0.4em] uppercase" style={{ color: RG }}>Get 10% Off</p>
      </div>
      <h3 className="font-serif font-bold mb-3" style={{ fontSize: '1.3rem', color: '#F7F2E9', lineHeight: 1.2 }}>
        Enjoyed this article? Get the next one in your inbox.
      </h3>
      <p className="font-heading text-sm mb-5" style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.7 }}>
        Join our newsletter for coffee guides, ritual tips, and a 10% discount on your first order. No spam — just good coffee content.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 px-4 py-3 font-heading text-sm"
          style={{ background: '#080808', border: `1px solid ${RG}25`, color: '#F7F2E9', outline: 'none' }}
        />
        <button
          type="submit"
          disabled={loading}
          className="font-mono text-[9px] tracking-[0.3em] uppercase font-bold py-3 px-6 transition-all hover:opacity-90 disabled:opacity-50"
          style={{ background: RG, color: '#080808', whiteSpace: 'nowrap' }}
        >
          {loading ? 'Sending...' : 'Get 10% Off'}
        </button>
      </form>
    </motion.div>
  );
}