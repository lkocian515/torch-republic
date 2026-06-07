import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, Coffee, Leaf, Sparkles } from 'lucide-react';

const RG = '#E6B7AD';

const BENEFIT_ICONS = [
  { icon: Zap, label: 'Ready in Seconds' },
  { icon: Coffee, label: '100% Instant' },
  { icon: Leaf, label: 'Purposeful Blends' },
  { icon: Sparkles, label: '25–27 Servings' },
];

export default function PremiumHero() {
  const scrollToShop = (e) => {
    e.preventDefault();
    const el = document.getElementById('choose-your-ritual');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section style={{ background: '#0A0A0A', borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
      {/* Desktop Hero */}
      <div className="hidden md:block relative" style={{ minHeight: '680px' }}>
        {/* Background image with overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.7) 50%, rgba(10,10,10,0.85) 100%)',
            backgroundImage: 'url(https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/ee5e8f634_LIVEFREESTAYREADY5.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-8 py-24" style={{ minHeight: '680px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6" style={{ background: 'rgba(230,183,173,0.08)', border: '1px solid rgba(230,183,173,0.2)', borderRadius: '999px' }}>
              <Sparkles className="w-3 h-3" style={{ color: RG }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: RG }}>Premium Instant Rituals</span>
            </div>

            {/* Headline */}
            <h1
              className="font-serif font-bold mb-6"
              style={{
                fontSize: 'clamp(2.8rem,5vw,4.2rem)',
                color: '#F5EFE6',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              Instant Coffee for<br />
              <span style={{ color: RG }}>Focus, Calm Energy & Ritual</span>
            </h1>

            {/* Subheadline */}
            <p
              className="font-heading text-lg mb-10 max-w-2xl"
              style={{
                color: 'rgba(245,239,230,0.7)',
                fontWeight: 300,
                lineHeight: 1.8,
              }}
            >
              Premium instant mushroom coffee blends for focus and clarity, classic coffee for bold everyday energy, and matcha for calm mornings — no machine, no pods, no compromise.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4 mb-12">
              <Link
                to="/mushroom-coffee"
                className="inline-flex items-center font-mono text-[9px] tracking-[0.28em] uppercase font-bold transition-all hover:opacity-90"
                style={{
                  background: RG,
                  color: '#050505',
                  padding: '14px 36px',
                  borderRadius: '4px',
                }}
              >
                Shop Mushroom Coffee
              </Link>
              <Link
                to="/classic-coffee"
                className="inline-flex items-center font-mono text-[9px] tracking-[0.28em] uppercase font-bold transition-all hover:opacity-70"
                style={{
                  background: 'transparent',
                  color: RG,
                  border: `1px solid ${RG}`,
                  padding: '14px 36px',
                  borderRadius: '4px',
                }}
              >
                Explore Classic Coffee & Matcha
              </Link>
            </div>

            {/* Benefit Icons */}
            <div className="flex items-center gap-8">
              {BENEFIT_ICONS.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: 'rgba(230,183,173,0.08)',
                      border: `1px solid ${RG}25`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <item.icon className="w-4 h-4" style={{ color: RG }} />
                  </div>
                  <span className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: 'rgba(245,239,230,0.6)' }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Hero */}
      <div className="md:hidden relative px-6 py-16" style={{ background: '#0A0A0A' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Product Image */}
          <div className="mb-8" style={{ aspectRatio: '1/1', borderRadius: '8px', overflow: 'hidden' }}>
            <img
              src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/ee5e8f634_LIVEFREESTAYREADY5.png"
              alt="Torch Republic Products"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4" style={{ background: 'rgba(230,183,173,0.08)', border: '1px solid rgba(230,183,173,0.2)', borderRadius: '999px' }}>
            <Sparkles className="w-2.5 h-2.5" style={{ color: RG }} />
            <span className="font-mono text-[7px] tracking-[0.35em] uppercase" style={{ color: RG }}>Premium Instant Rituals</span>
          </div>

          {/* Headline */}
          <h1
            className="font-serif font-bold mb-4"
            style={{
              fontSize: '2.2rem',
              color: '#F5EFE6',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            Instant Coffee for<br />
            <span style={{ color: RG }}>Focus, Calm & Ritual</span>
          </h1>

          {/* Subheadline */}
          <p
            className="font-heading text-sm mb-6"
            style={{
              color: 'rgba(245,239,230,0.65)',
              fontWeight: 300,
              lineHeight: 1.7,
            }}
          >
            Mushroom coffee for focus, classic coffee for bold energy, matcha for calm — no machine needed.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3">
            <Link
              to="/mushroom-coffee"
              className="inline-flex items-center justify-center font-mono text-[9px] tracking-[0.28em] uppercase font-bold transition-all hover:opacity-90"
              style={{
                background: RG,
                color: '#050505',
                padding: '14px 24px',
                borderRadius: '4px',
              }}
            >
              Shop Mushroom Coffee
            </Link>
            <Link
              to="/classic-coffee"
              className="inline-flex items-center justify-center font-mono text-[9px] tracking-[0.28em] uppercase font-bold transition-all hover:opacity-70"
              style={{
                background: 'transparent',
                color: RG,
                border: `1px solid ${RG}`,
                padding: '14px 24px',
                borderRadius: '4px',
              }}
            >
              Explore Classic & Matcha
            </Link>
          </div>

          {/* Benefit Icons */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            {BENEFIT_ICONS.map((item, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'rgba(230,183,173,0.08)',
                    border: `1px solid ${RG}25`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <item.icon className="w-3.5 h-3.5" style={{ color: RG }} />
                </div>
                <span className="font-mono text-[7px] tracking-[0.25em] uppercase" style={{ color: 'rgba(245,239,230,0.55)' }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}