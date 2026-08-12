import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

const RG = '#E6B7AD';
const CLAY = '#B86543';
const PAGE = '#F8F5EF';
const CREAM = '#FBF8F1';
const CARD = '#FFFFFF';
const TEXT = '#3F3027';
const BODY = '#6A5A4A';
const BORDER = 'rgba(230,183,173,0.28)';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', order: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useSEO({
    title: 'Contact Us | Torch Republic Coffee Company',
    description: 'Questions about your order, subscription, or which blend is right for you? Contact Torch Republic Coffee Company. U.S.-based support. We respond within 1-2 business days.',
    url: '/contact',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = { background: CARD, border: `1px solid ${BORDER}`, color: TEXT };

  return (
    <div style={{ backgroundColor: PAGE, color: TEXT, minHeight: '100vh' }}>

      {/* Hero */}
      <section className="px-6 md:px-10 pt-20 pb-14 text-center"
        style={{ borderBottom: '1px solid rgba(230,183,173,0.22)' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="max-w-xl mx-auto">
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: RG }}>
            Carry the Torch
          </p>
          <h1 className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: TEXT, letterSpacing: '-0.02em' }}>
            We're Here for the Journey
          </h1>
          <p className="font-heading" style={{ fontSize: '0.95rem', color: BODY, lineHeight: 1.85, fontWeight: 300 }}>
            Questions about your ritual? Order support? Or just want to connect? We're here to help you carry the torch forward.
          </p>
        </motion.div>
      </section>

      <section className="px-6 md:px-10 py-20">
        <div className="max-w-[960px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-14">

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <h2 className="font-serif font-bold mb-8" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', color: TEXT }}>
              Send a Message
            </h2>

            {submitted ? (
              <div className="p-8 text-center" style={{ background: 'rgba(86,96,71,0.08)', border: '1px solid rgba(86,96,71,0.35)' }}>
                <p className="font-serif font-bold mb-2" style={{ fontSize: '1.2rem', color: TEXT }}>Message received.</p>
                <p className="font-heading text-sm" style={{ color: BODY, fontWeight: 300 }}>
                  We'll be in touch soon. Thank you for reaching out.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: BODY }}>
                      Name <span style={{ color: CLAY }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="px-4 py-3 outline-none font-heading text-sm"
                      style={inputStyle}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: BODY }}>
                      Email <span style={{ color: CLAY }}>*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="px-4 py-3 outline-none font-heading text-sm"
                      style={inputStyle}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: BODY }}>
                    Order Number <span style={{ color: RG }}>(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={form.order}
                    onChange={e => setForm(f => ({ ...f, order: e.target.value }))}
                    className="px-4 py-3 outline-none font-heading text-sm"
                    style={inputStyle}
                    placeholder="e.g. #TR-00142"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: BODY }}>
                    Message <span style={{ color: CLAY }}>*</span>
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="px-4 py-3 outline-none font-heading text-sm resize-none"
                    style={inputStyle}
                    placeholder="How can we help?"
                  />
                </div>
                <button
                  type="submit"
                  className="font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-4"
                  style={{ background: CLAY, color: '#FBF8F1' }}>
                  Send Message →
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6">
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', color: TEXT }}>
              Company Info
            </h2>

            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3 p-5" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <Mail className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: CLAY }} />
                <div>
                  <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-1" style={{ color: RG }}>Support Email</p>
                  <p className="font-heading text-sm" style={{ color: TEXT }}>support@torchrepublic.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-5" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: CLAY }} />
                <div>
                  <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-1" style={{ color: RG }}>Location</p>
                  <p className="font-heading text-sm" style={{ color: TEXT }}>Corpus Christi, TX · U.S.-Based</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-5" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <div className="w-4 h-4 flex-shrink-0 mt-0.5 flex items-center justify-center" style={{ color: CLAY }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                    <path d="M2 12h20"/>
                  </svg>
                </div>
                <div>
                  <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-1" style={{ color: RG }}>Follow the Movement</p>
                  <div className="flex gap-3 mt-2">
                    <a href="https://instagram.com/torchrepublic" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] tracking-[0.2em] uppercase transition-colors hover:text-rose-gold" style={{ color: BODY }}>Instagram</a>
                    <a href="https://tiktok.com/@torchrepublic" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] tracking-[0.2em] uppercase transition-colors hover:text-rose-gold" style={{ color: BODY }}>TikTok</a>
                    <a href="https://facebook.com/torchrepublic" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] tracking-[0.2em] uppercase transition-colors hover:text-rose-gold" style={{ color: BODY }}>Facebook</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div className="p-5" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-4" style={{ color: RG }}>Policies &amp; Info</p>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'Shipping Policy', href: '/shipping-policy' },
                  { label: 'Return Policy', href: '/return-policy' },
                  { label: 'Privacy Policy', href: '/privacy-policy' },
                  { label: 'Terms of Service', href: '/terms-of-service' },
                ].map(l => (
                  <Link key={l.label} to={l.href}
                    className="font-mono text-[10px] tracking-[0.2em] uppercase transition-colors hover:text-rose-gold"
                    style={{ color: CLAY }}>
                    {l.label} →
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/faq"
              className="inline-flex items-center justify-center font-mono text-[10px] tracking-[0.3em] uppercase transition-all hover:opacity-70 py-3.5"
              style={{ border: '1px solid #E6B7AD', color: CLAY }}>
              View FAQ →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FDA */}
      <div className="px-6 py-8 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.22)' }}>
        <p className="font-mono text-[8px] tracking-[0.15em] max-w-xl mx-auto" style={{ color: BODY, lineHeight: 1.75 }}>
          Statements on this site have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </div>
  );
}