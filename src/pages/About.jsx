import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MUSHROOM_PRODUCTS } from '../lib/mushroomProducts';

const RG = '#E6B7AD';

const SECTIONS = [
  {
    label: '01 — Three Categories, One Standard',
    title: 'Classic Coffee. Mushroom Coffee. Matcha.',
    body: "Whether you want pure classic instant coffee with no mushrooms, functional mushroom coffee with Lion's Mane + Chaga for focus and clarity, or ceremonial grade matcha for calm energy — each category is designed for consistency, quality, and ease. When coffee is this easy to prepare, you show up for your ritual every single day.",
  },
  {
    label: '02 — Our Promise',
    title: 'Clear product information. Simple experience.',
    body: 'We believe in transparent ingredients, honest product descriptions, responsive support, and a premium customer experience from first sip to monthly subscription. No hype, no overclaiming, no complicated fine print.',
  },
];

const TRUST = [
  { label: 'Three Categories', desc: "Classic Instant Coffee (no mushrooms), Mushroom Coffee (Lion's Mane + Chaga), and Ceremonial Matcha — clearly labeled." },
  { label: 'Clear Product Details', desc: '27 servings for coffee blends, 25 for matcha. Premium ingredients, no hidden additives.' },
  { label: 'Secure Checkout', desc: 'Trusted payment options and a clean, simple checkout flow.' },
  { label: 'Easy Support', desc: 'Questions about your order or subscription? Reach out and we\'ll help.' },
];

export default function About() {
  useSEO({
    title: 'About Torch Republic Coffee Company | Instant Coffee, Mushroom Coffee & Matcha',
    description: "Torch Republic Coffee Company creates premium instant coffee, mushroom coffee, and matcha for modern rituals. Classic Arabica, functional blends with Lion's Mane + Chaga, and ceremonial grade matcha.",
    url: '/about',
  });

  return (
    <div style={{ backgroundColor: '#080808', color: '#F0EBE1', minHeight: '100vh' }}>

      {/* Hero */}
      <section className="px-6 md:px-10 pt-20 pb-16 text-center"
        style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto">
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>
            About Us
          </p>
          <h1 className="font-serif font-bold mb-5"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            About Torch Republic Coffee Company
          </h1>
          <p className="font-heading"
            style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.5)', lineHeight: 1.9, fontWeight: 300 }}>
            Torch Republic Coffee Company creates premium instant coffee, mushroom coffee, and matcha for modern rituals. Choose Classic Arabica (no mushrooms), Functional Blends with Lion's Mane + Chaga, or Ceremonial Matcha — each designed for a smooth, intentional routine without a grinder, brewer, or complicated morning.
          </p>
        </motion.div>
      </section>

      {/* Our Story — Inspiration & Mission */}
      <section className="px-6 md:px-10 py-20" style={{ background: '#0A0908', borderTop: '1px solid rgba(230,183,173,0.06)', borderBottom: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-[860px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3 text-center" style={{ color: 'rgba(230,183,173,0.5)' }}>Our Story</p>
            <h2 className="font-serif font-bold text-white text-center" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', lineHeight: 1.2 }}>
              Elevating the Daily Ritual
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <p className="font-heading text-base leading-relaxed mb-5" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
                Torch Republic was born from a simple observation: the way you start your morning sets the tone for everything that follows. We watched people rushing through their mornings with complicated brewing setups, settling for mediocre coffee, or skipping the ritual altogether — and we knew there had to be a better way.
              </p>
              <p className="font-heading text-base leading-relaxed mb-5" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
                We believed your morning coffee could be more than just caffeine. It could be an intentional moment of clarity, focus, and preparation — a ritual that honors both tradition and the demands of modern life.
              </p>
              <p className="font-heading text-base leading-relaxed mb-5" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
                Our mission is to elevate the daily ritual. We create premium blends that dissolve instantly, taste exceptional, and transform your morning from rushed to intentional — no grinder, no brewer, no compromise required.
              </p>
              <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
                Three paths, one standard: pure Classic Instant Coffee for traditionalists, functional Mushroom Coffee with Lion's Mane and Chaga for cognitive support, and Ceremonial Matcha for calm, sustained energy. Each crafted to help you show up as your best self, every single day.
              </p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="flex flex-col gap-5">
              <div className="p-6" style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.1)' }}>
                <div className="w-8 h-8 rounded-full mb-4 flex items-center justify-center" style={{ background: 'rgba(230,183,173,0.15)' }}>
                  <span style={{ color: RG, fontSize: '1.1rem' }}>✦</span>
                </div>
                <h3 className="font-serif font-bold text-white mb-2" style={{ fontSize: '1.15rem' }}>Our Mission</h3>
                <p className="font-heading text-sm leading-relaxed" style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300 }}>
                  To transform the daily coffee ritual into a moment of intention — blending premium ingredients with effortless preparation so you can show up as your best self, every single day.
                </p>
              </div>
              
              <div className="p-6" style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.1)' }}>
                <div className="w-8 h-8 rounded-full mb-4 flex items-center justify-center" style={{ background: 'rgba(230,183,173,0.15)' }}>
                  <span style={{ color: RG, fontSize: '1.1rem' }}>⚡</span>
                </div>
                <h3 className="font-serif font-bold text-white mb-2" style={{ fontSize: '1.15rem' }}>Why Torch Republic</h3>
                <p className="font-heading text-sm leading-relaxed" style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300 }}>
                  We believe in transparency over hype, quality over quantity, and rituals over routines. Every blend is crafted with purpose, every ingredient is chosen with care, and every cup is an invitation to begin again.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story sections */}
      <section className="px-6 md:px-10 py-20">
        <div className="max-w-[860px] mx-auto flex flex-col gap-20">
          {SECTIONS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-8 items-start"
            >
              <div>
                <p className="font-mono text-[8px] tracking-[0.4em] uppercase" style={{ color: RG }}>{s.label}</p>
              </div>
              <div className="flex flex-col gap-3">
                <h2 className="font-serif font-bold text-white" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', lineHeight: 1.2 }}>
                  {s.title}
                </h2>
                <p className="font-heading" style={{ color: 'rgba(247,241,232,0.5)', fontWeight: 300, lineHeight: 1.9, fontSize: '0.95rem' }}>
                  {s.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* The Six Blends */}
      <section className="px-6 md:px-10 py-20" style={{ background: '#060606', borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-[860px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.5)' }}>04 — The Collection</p>
            <h2 className="font-serif font-bold text-white" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)' }}>
              The Full Collection
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MUSHROOM_PRODUCTS.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Link to={`/products/${p.slug}`}
                  className="flex items-start gap-4 p-4 group"
                  style={{ background: '#0F0E0D', border: `1px solid ${p.accent}15`, textDecoration: 'none', display: 'flex' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = `${p.accent}35`}
                  onMouseLeave={e => e.currentTarget.style.borderColor = `${p.accent}15`}>
                  <div className="flex-shrink-0 w-2 h-2 rounded-full mt-1.5" style={{ background: p.accent }} />
                  <div className="flex-1 min-w-0">
                    <p className="font-serif font-bold text-white text-sm">{p.name}</p>
                    <p className="font-mono text-[8px] tracking-[0.2em] uppercase mt-0.5" style={{ color: `${p.accent}70` }}>{p.roast} · {p.mood}</p>
                  </div>
                  <span className="font-mono text-[9px] group-hover:translate-x-1 transition-transform flex-shrink-0" style={{ color: `${p.accent}50` }}>→</span>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link to="/shop"
              className="inline-flex items-center justify-center font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-4 px-8"
              style={{ background: RG, color: '#080808' }}>
              Shop All Blends →
            </Link>
            <Link to="/bundle"
              className="inline-flex items-center justify-center font-mono text-[10px] tracking-[0.3em] uppercase transition-all hover:opacity-70 py-4 px-8"
              style={{ border: '1px solid rgba(230,183,173,0.3)', color: 'rgba(230,183,173,0.7)' }}>
              Shop the Full Ritual Set →
            </Link>
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="px-6 md:px-10 py-20">
        <div className="max-w-[860px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.5)' }}>Our Commitment</p>
            <h2 className="font-serif font-bold text-white" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)' }}>
              Built for a Better Coffee Ritual
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TRUST.map((t, i) => (
              <motion.div key={t.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="p-6" style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.08)' }}>
                <p className="font-serif font-bold text-white mb-2 text-sm">{t.label}</p>
                <p className="font-heading text-xs leading-relaxed" style={{ color: 'rgba(247,241,232,0.45)', fontWeight: 300 }}>{t.desc}</p>
              </motion.div>
            ))}
          </div>
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