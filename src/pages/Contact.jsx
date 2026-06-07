import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';

const RG = '#E6B7AD';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', order: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Contact Us | Torch Republic Coffee Company';
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: '#080808', color: '#F0EBE1', minHeight: '100vh' }}>

      {/* Hero */}
      <section className="px-6 md:px-10 pt-20 pb-14 text-center"
        style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="max-w-xl mx-auto">
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>
            Get in Touch
          </p>
          <h1 className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Contact Torch Republic Coffee Company
          </h1>
          <p className="font-heading" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.5)', lineHeight: 1.85, fontWeight: 300 }}>
            Questions about your order, our instant coffee, mushroom coffee, matcha blends, or your monthly subscription? Reach out and we'll help.
          </p>
        </motion.div>
      </section>

      <section className="px-6 md:px-10 py-20">
        <div className="max-w-[960px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-14">

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <h2 className="font-serif font-bold text-white mb-8" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)' }}>
              Send a Message
            </h2>

            {submitted ? (
              <div className="p-8 text-center" style={{ background: 'rgba(230,183,173,0.06)', border: '1px solid rgba(230,183,173,0.25)' }}>
                <p className="font-serif font-bold text-white mb-2" style={{ fontSize: '1.2rem' }}>Message received.</p>
                <p className="font-heading text-sm" style={{ color: 'rgba(247,241,232,0.5)', fontWeight: 300 }}>
                  We'll be in touch soon. Thank you for reaching out.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(230,183,173,0.55)' }}>
                      Name <span style={{ color: RG }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="px-4 py-3 outline-none font-heading text-sm"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(230,183,173,0.18)', color: '#F0EBE1' }}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(230,183,173,0.55)' }}>
                      Email <span style={{ color: RG }}>*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="px-4 py-3 outline-none font-heading text-sm"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(230,183,173,0.18)', color: '#F0EBE1' }}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(230,183,173,0.55)' }}>
                    Order Number <span style={{ color: 'rgba(230,183,173,0.3)' }}>(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={form.order}
                    onChange={e => setForm(f => ({ ...f, order: e.target.value }))}
                    className="px-4 py-3 outline-none font-heading text-sm"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(230,183,173,0.18)', color: '#F0EBE1' }}
                    placeholder="e.g. #TR-00142"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(230,183,173,0.55)' }}>
                    Message <span style={{ color: RG }}>*</span>
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="px-4 py-3 outline-none font-heading text-sm resize-none"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(230,183,173,0.18)', color: '#F0EBE1' }}
                    placeholder="How can we help?"
                  />
                </div>
                <button
                  type="submit"
                  className="font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-4"
                  style={{ background: RG, color: '#080808' }}>
                  Send Message →
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6">
            <h2 className="font-serif font-bold text-white" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)' }}>
              Company Info
            </h2>

            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3 p-5" style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.08)' }}>
                <Mail className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: RG }} />
                <div>
                  <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-1" style={{ color: 'rgba(230,183,173,0.5)' }}>Support Email</p>
                  <p className="font-heading text-sm" style={{ color: 'rgba(247,241,232,0.7)' }}>admin@torchrepublic.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-5" style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.08)' }}>
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: RG }} />
                <div>
                  <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-1" style={{ color: 'rgba(230,183,173,0.5)' }}>Location</p>
                  <p className="font-heading text-sm" style={{ color: 'rgba(247,241,232,0.7)' }}>Corpus Christi, TX · U.S.-Based</p>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div className="p-5" style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.08)' }}>
              <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.5)' }}>Policies &amp; Info</p>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'Shipping Policy', href: 'https://torchrepublic.com/policies/shipping-policy' },
                  { label: 'Return Policy', href: 'https://torchrepublic.com/policies/refund-policy' },
                  { label: 'Privacy Policy', href: 'https://torchrepublic.com/policies/privacy-policy' },
                  { label: 'Terms of Service', href: 'https://torchrepublic.com/policies/terms-of-service' },
                ].map(l => (
                  <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                    className="font-mono text-[10px] tracking-[0.2em] uppercase transition-colors hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.32)' }}>
                    {l.label} →
                  </a>
                ))}
              </div>
            </div>

            <Link to="/faq"
              className="inline-flex items-center justify-center font-mono text-[10px] tracking-[0.3em] uppercase transition-all hover:opacity-70 py-3.5"
              style={{ border: '1px solid rgba(230,183,173,0.25)', color: 'rgba(230,183,173,0.7)' }}>
              View FAQ →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FDA */}
      <div className="px-6 py-8 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <p className="font-mono text-[8px] tracking-[0.15em] max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.2)', lineHeight: 1.75 }}>
          Statements on this site have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </div>
  );
}