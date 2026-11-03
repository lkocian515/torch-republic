import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RG = '#E6AC45';

const perks = [
  { icon: '💰', label: 'Subscribe & Save 20%' },
  { icon: '🚫', label: 'No pods or machines' },
  { icon: '⚡', label: 'Instant preparation' },
  { icon: '🌿', label: 'Premium daily ritual' },
  { icon: '🧠', label: 'Morning focus & calm energy' },
  { icon: '🔄', label: 'Cancel anytime' },
];

export default function StarterBundleSection() {
  return (
    <section className="px-6 md:px-10 py-16 md:py-24 relative" style={{ background: '#0D0C0B' }}>
      <div className="divider-gradient absolute top-0 left-0 right-0" />
      <div className="max-w-[900px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-[8px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.5)' }}>
            Start Here
          </p>
          <h2 className="font-serif font-bold mb-5" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#F7F2E9', letterSpacing: '-0.02em' }}>
            Build Your Ritual Bundle
          </h2>
          <p className="font-heading mb-3 mx-auto" style={{ fontSize: '1rem', color: 'rgba(240,235,225,0.6)', fontWeight: 300, lineHeight: 1.85, maxWidth: '580px' }}>
            Pick any 3 blends — classic coffee, mushroom coffee, or matcha — and get them as a discounted bundle. Try different rituals, find your favorite, reorder monthly.
          </p>
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-10 mx-auto" style={{ color: RG, maxWidth: '480px' }}>
            ◆ $74.97 value · Bundle pricing applied at checkout · Subscribe & Save an additional 20%
          </p>

          {/* Perks grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
            {perks.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center gap-3 text-left p-4"
                style={{ background: '#111', border: '1px solid rgba(230,183,173,0.1)' }}
              >
                <span className="text-xl flex-shrink-0">{p.icon}</span>
                <span className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.7)' }}>
                  {p.label}
                </span>
              </motion.div>
            ))}
          </div>

          <Link
            to="/build-your-ritual"
            className="inline-block font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90"
            style={{ background: RG, color: '#080808', padding: '16px 44px' }}
          >
            Build Your Ritual Bundle →
          </Link>
          <p className="font-mono text-[7.5px] tracking-[0.2em] uppercase mt-5" style={{ color: 'rgba(230,183,173,0.35)' }}>
            ✦ 30-Day Guarantee · Free Shipping on Bundles · Cancel Anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}