import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flame } from 'lucide-react';

const BREW_ICONS = { 'Drip': '☕', 'French Press': '⬛', 'Pour Over': '◈', 'Espresso': '⚡', 'Cold Brew': '🧊', 'Aeropress': '🔬' };
const ROAST_LEVELS = ['Light', 'Light-Medium', 'Medium', 'Medium-Dark', 'Dark', 'Extra Dark'];

function FadeUp({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function GoldDivider() {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="flex items-center justify-center gap-4 my-10"
    >
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(196,163,90,0.35))' }} />
      <Flame className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'rgba(196,163,90,0.5)' }} />
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(196,163,90,0.35), transparent)' }} />
    </motion.div>
  );
}

function RoastBar({ level }) {
  const idx = ROAST_LEVELS.findIndex(l => level.toLowerCase().includes(l.toLowerCase()));
  const pct = idx < 0 ? 50 : Math.round(((idx + 1) / ROAST_LEVELS.length) * 100);
  return (
    <div>
      <div className="flex justify-between font-mono text-[9px] mb-2" style={{ color: 'rgba(196,163,90,0.45)' }}>
        <span>LIGHT</span><span>DARK</span>
      </div>
      <div className="h-1 rounded-full" style={{ background: 'rgba(196,163,90,0.1)' }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, rgba(196,163,90,0.4), #E6AC45)' }}
        />
      </div>
      <p className="font-mono text-[10px] mt-2 text-center" style={{ color: 'rgba(196,163,90,0.6)' }}>{level}</p>
    </div>
  );
}

export default function QRStoryTemplate({ data }) {
  const {
    product_name, collection, TR_number, hero_quote, hook_text, symbolism_text,
    historical_anchor, flavor_notes, roast_level, brew_methods, takeaway_quote,
    takeaway_text, hero_image, accent_color = '#E6AC45', series_blends = [],
    shopify_handle,
  } = data;

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const glowX = useTransform(scrollYProgress, [0, 1], ['30%', '70%']);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.06, 0.06, 0]);

  return (
    <div ref={containerRef} style={{ backgroundColor: '#0B0B0B', color: '#F7F2E9', minHeight: '100vh' }}>

      {/* ── AMBIENT TORCH GLOW ── */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(ellipse 400px 400px at ${glowX} 50%, rgba(196,163,90,0.07), transparent)`,
          opacity: glowOpacity,
        }}
      />

      {/* ══════════════════════════════════════════ */}
      {/* SECTION 1 — HERO */}
      {/* ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center px-6 md:px-16 py-24 overflow-hidden">
        {/* Subtle radial background glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 60% 50%, rgba(196,163,90,0.04) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-[1280px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — Image */}
          <FadeUp>
            <div className="relative" style={{ aspectRatio: '4/5' }}>
              <img
                src={hero_image}
                alt={product_name}
                className="w-full h-full object-cover"
                style={{ opacity: 0.85 }}
              />
              {/* Edge fades */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, #0B0B0B 100%)' }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0B0B0B 0%, transparent 30%)' }} />
              {/* TR number badge */}
              <div className="absolute top-6 left-6">
                <span className="font-mono text-[10px] tracking-[0.4em] uppercase px-3 py-1.5"
                  style={{ background: accent_color, color: '#000' }}>
                  {TR_number}
                </span>
              </div>
            </div>
          </FadeUp>

          {/* RIGHT — Content */}
          <div className="flex flex-col gap-8">
            <FadeUp delay={0.1}>
              <p className="font-mono text-[9px] tracking-[0.5em] uppercase" style={{ color: 'rgba(196,163,90,0.5)' }}>
                {collection}
              </p>
            </FadeUp>

            <FadeUp delay={0.2}>
              <blockquote
                className="font-serif italic leading-tight"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', color: '#F7F2E9', fontWeight: 700 }}
              >
                "{hero_quote}"
              </blockquote>
            </FadeUp>

            <FadeUp delay={0.3}>
              <p className="font-heading text-sm leading-relaxed" style={{ color: 'rgba(240,235,225,0.55)', maxWidth: '480px' }}>
                {hook_text}
              </p>
            </FadeUp>

            <FadeUp delay={0.4}>
              <div className="h-px w-16" style={{ background: `linear-gradient(90deg, ${accent_color}, transparent)` }} />
            </FadeUp>

            <FadeUp delay={0.5}>
              <div className="flex flex-wrap gap-3">
                {shopify_handle && (
                  <a
                    href={`https://torchrepublic.com/products/${shopify_handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-7 py-3.5 font-mono text-xs tracking-widest uppercase transition-all"
                    style={{ background: accent_color, color: '#000', border: `1px solid ${accent_color}` }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    Explore the Blend
                  </a>
                )}
                <Link
                  to="/CoffeeCollection"
                  className="inline-flex items-center px-7 py-3.5 font-mono text-xs tracking-widest uppercase transition-all"
                  style={{ background: 'transparent', color: accent_color, border: `1px solid ${accent_color}40` }}
                  onMouseEnter={e => e.currentTarget.style.background = `${accent_color}10`}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  All Blends
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ══════════════════════════════════════════ */}
      {/* SECTION 2 — WHAT THIS REPRESENTS */}
      {/* ══════════════════════════════════════════ */}
      <section className="px-6 md:px-16 py-20 max-w-[900px] mx-auto text-center">
        <FadeUp>
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-6" style={{ color: 'rgba(196,163,90,0.4)' }}>
            What This Represents
          </p>
          <h2 className="font-serif font-bold mb-10 leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#F7F2E9' }}>
            {product_name}
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="space-y-5 text-left">
            {(Array.isArray(symbolism_text) ? symbolism_text : [symbolism_text]).map((para, i) => (
              <p key={i} className="font-heading text-sm leading-relaxed" style={{ color: 'rgba(240,235,225,0.58)', fontSize: '1rem' }}>
                {para}
              </p>
            ))}
          </div>
        </FadeUp>
      </section>

      <GoldDivider />

      {/* ══════════════════════════════════════════ */}
      {/* SECTION 3 — WHY IT MATTERS */}
      {/* ══════════════════════════════════════════ */}
      <section className="px-6 md:px-16 py-20">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — Historical visual */}
          <FadeUp>
            <div className="relative p-12 flex items-center justify-center"
              style={{ background: 'rgba(196,163,90,0.02)', border: '1px solid rgba(196,163,90,0.08)' }}>
              <motion.div
                animate={{ opacity: [0.06, 0.12, 0.06] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <Flame style={{ color: accent_color, width: '8rem', height: '8rem' }} />
              </motion.div>
              <blockquote className="relative z-10 font-serif italic text-center"
                style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', color: 'rgba(240,235,225,0.6)', lineHeight: 1.6 }}>
                "{historical_anchor.quote}"
                <footer className="font-mono text-[9px] tracking-widest uppercase mt-4 not-italic"
                  style={{ color: 'rgba(196,163,90,0.4)' }}>
                  — {historical_anchor.attribution}
                </footer>
              </blockquote>
            </div>
          </FadeUp>

          {/* RIGHT — Why it matters */}
          <FadeUp delay={0.15}>
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-6" style={{ color: 'rgba(196,163,90,0.4)' }}>
              Why It Matters
            </p>
            <div className="space-y-4">
              {(Array.isArray(historical_anchor.body) ? historical_anchor.body : [historical_anchor.body]).map((line, i) => (
                <p key={i} className="font-heading text-sm leading-relaxed"
                  style={{ color: 'rgba(240,235,225,0.55)', fontSize: '0.95rem' }}>
                  {line}
                </p>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <GoldDivider />

      {/* ══════════════════════════════════════════ */}
      {/* SECTION 4 — THE BLEND */}
      {/* ══════════════════════════════════════════ */}
      <section className="px-6 md:px-16 py-20 max-w-[1100px] mx-auto">
        <FadeUp>
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(196,163,90,0.4)' }}>
            The Blend
          </p>
          <h2 className="font-serif font-bold mb-12" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: '#F7F2E9' }}>
            Craft. Flavor. Meaning.
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Flavor notes */}
          <FadeUp delay={0.05}>
            <p className="font-mono text-[10px] tracking-[0.35em] uppercase mb-6" style={{ color: accent_color }}>
              Tasting Notes
            </p>
            <div className="space-y-3">
              {flavor_notes.map((note, i) => (
                <motion.div
                  key={note}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accent_color }} />
                  <span style={{ color: 'rgba(240,235,225,0.65)', fontSize: '0.95rem' }}>{note}</span>
                </motion.div>
              ))}
            </div>
          </FadeUp>

          {/* Roast level */}
          <FadeUp delay={0.1}>
            <p className="font-mono text-[10px] tracking-[0.35em] uppercase mb-6" style={{ color: accent_color }}>
              Roast Level
            </p>
            <RoastBar level={roast_level} />
          </FadeUp>

          {/* Brew methods */}
          <FadeUp delay={0.15}>
            <p className="font-mono text-[10px] tracking-[0.35em] uppercase mb-6" style={{ color: accent_color }}>
              Brew Methods
            </p>
            <div className="space-y-3">
              {brew_methods.map((method, i) => (
                <div key={i} className="flex items-center gap-4 py-3 px-4"
                  style={{ border: '1px solid rgba(196,163,90,0.08)', background: 'rgba(196,163,90,0.02)' }}>
                  <span style={{ fontSize: '1.1rem' }}>{BREW_ICONS[method.name] || '☕'}</span>
                  <div>
                    <p className="font-mono text-[10px] font-bold tracking-wide" style={{ color: accent_color }}>{method.name}</p>
                    <p className="font-mono text-[9px] mt-0.5" style={{ color: 'rgba(255,255,255,0.28)' }}>{method.tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>

        {/* Flavor → meaning bridge */}
        {data.blend_meaning && (
          <FadeUp delay={0.2}>
            <div className="mt-12 pt-10 border-t" style={{ borderColor: 'rgba(196,163,90,0.08)' }}>
              <p className="font-heading text-sm leading-relaxed max-w-2xl"
                style={{ color: 'rgba(240,235,225,0.45)', fontStyle: 'italic' }}>
                {data.blend_meaning}
              </p>
            </div>
          </FadeUp>
        )}
      </section>

      <GoldDivider />

      {/* ══════════════════════════════════════════ */}
      {/* SECTION 5 — TORCHBEARER TAKEAWAY */}
      {/* ══════════════════════════════════════════ */}
      <section className="relative px-6 md:px-16 py-28 text-center overflow-hidden">
        <motion.div
          animate={{ opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <Flame style={{ color: accent_color, width: '20rem', height: '20rem' }} />
        </motion.div>
        <div className="relative z-10 max-w-[800px] mx-auto">
          <FadeUp>
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-10" style={{ color: 'rgba(196,163,90,0.4)' }}>
              Torchbearer Takeaway
            </p>
            <blockquote className="font-serif italic leading-tight mb-8"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#F7F2E9', fontWeight: 700 }}>
              "{takeaway_quote}"
            </blockquote>
            <p className="font-heading text-sm leading-relaxed" style={{ color: 'rgba(240,235,225,0.45)', maxWidth: '560px', margin: '0 auto' }}>
              {takeaway_text}
            </p>
          </FadeUp>
        </div>
      </section>

      <GoldDivider />

      {/* ══════════════════════════════════════════ */}
      {/* SECTION 6 — COMPLETE THE SERIES */}
      {/* ══════════════════════════════════════════ */}
      {series_blends.length > 0 && (
        <section className="px-6 md:px-16 py-20">
          <div className="max-w-[1280px] mx-auto">
            <FadeUp>
              <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3 text-center" style={{ color: 'rgba(196,163,90,0.4)' }}>
                Complete the Series
              </p>
              <h2 className="font-serif font-bold mb-12 text-center" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#F7F2E9' }}>
                Carry Every Flame
              </h2>
            </FadeUp>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {series_blends.map((blend, i) => (
                <motion.div
                  key={blend.route}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="group"
                >
                  <Link
                    to={blend.route}
                    className="block relative overflow-hidden transition-all duration-300"
                    style={{ border: '1px solid rgba(196,163,90,0.1)', background: '#111' }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'rgba(196,163,90,0.4)';
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(196,163,90,0.08)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(196,163,90,0.1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {blend.image && (
                      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                        <img src={blend.image} alt={blend.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          style={{ opacity: 0.6 }} />
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #111 0%, transparent 60%)' }} />
                      </div>
                    )}
                    <div className="p-5">
                      <p className="font-serif font-bold mb-1" style={{ color: '#F7F2E9', fontSize: '1.05rem' }}>{blend.name}</p>
                      <p className="font-mono text-[9px]" style={{ color: 'rgba(196,163,90,0.5)' }}>{blend.roast}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════ */}
      {/* SECTION 7 — FINAL CTA */}
      {/* ══════════════════════════════════════════ */}
      <section className="px-6 md:px-16 py-28 text-center" style={{ borderTop: '1px solid rgba(196,163,90,0.06)' }}>
        <FadeUp>
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-6" style={{ color: 'rgba(196,163,90,0.4)' }}>
            Torch Republic
          </p>
          <h2 className="font-serif font-bold mb-4 leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#F7F2E9' }}>
            Carry the Flame
          </h2>
          <p className="font-heading text-sm mb-12 max-w-md mx-auto" style={{ color: 'rgba(240,235,225,0.35)' }}>
            Every sip is a statement. Every blend carries a legacy.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/TheTorchBox"
              className="px-8 py-4 font-mono text-xs tracking-widest uppercase transition-all"
              style={{ background: '#E6AC45', color: '#000', border: '1px solid #E6AC45' }}
              onMouseEnter={e => e.currentTarget.style.background = '#E4C46A'}
              onMouseLeave={e => e.currentTarget.style.background = '#E6AC45'}
            >
              Join Torchbearers
            </Link>
            <Link
              to="/Collections"
              className="px-8 py-4 font-mono text-xs tracking-widest uppercase transition-all"
              style={{ background: 'transparent', color: '#E6AC45', border: '1px solid rgba(196,163,90,0.4)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(196,163,90,0.06)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              Explore All Blends
            </Link>
          </div>
        </FadeUp>
      </section>

    </div>
  );
}