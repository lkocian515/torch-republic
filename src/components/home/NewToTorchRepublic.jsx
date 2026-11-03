import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RG = '#E6AC45';

const PATHS = [
  {
    label: 'Classic coffee drinker',
    link: '/shop/instant-coffee',
    accent: '#E6AC45',
    desc: 'Bold, smooth instant coffee — no machine',
  },
  {
    label: 'Mushroom coffee curious',
    link: '/shop/instant-mushroom-coffee',
    accent: '#264A35',
    desc: 'Coffee-forward taste with functional mushrooms',
  },
  {
    label: 'Matcha drinker',
    link: '/shop/matcha',
    accent: '#264A35',
    desc: 'Ceremonial-grade matcha, ready in seconds',
  },
  {
    label: 'Replacing coffee pods',
    link: '/switch-from-pods',
    accent: RG,
    desc: 'Same convenience, no pod machine needed',
  },
  {
    label: 'Coffee for travel or work',
    link: '/shop/travel-coffee',
    accent: '#8B9ED4',
    desc: 'Compact, lightweight, anywhere-ready',
  },
];

export default function NewToTorchRepublic() {
  return (
    <section className="px-5 md:px-10 py-14 md:py-20" style={{ background: '#0A0807' }}>
      <div className="max-w-[900px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 md:p-10"
          style={{
            background: '#121110',
            border: `1px solid rgba(230,183,173,0.18)`,
            borderRadius: '4px',
          }}
        >
          {/* Header */}
          <div className="mb-7">
            <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-2" style={{ color: RG }}>
              New Here?
            </p>
            <h2
              className="font-serif font-bold mb-2"
              style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: '#F7F2E9', lineHeight: 1.25 }}
            >
              New to Torch Republic?
            </h2>
            <p className="font-heading" style={{ fontSize: '0.9rem', color: 'rgba(245,239,230,0.7)', fontWeight: 400, lineHeight: 1.7 }}>
              Not sure where to begin? Choose the ritual that best matches the experience you already enjoy.
            </p>
          </div>

          {/* Path options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 mb-7">
            {PATHS.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={p.link}
                  className="flex flex-col gap-1 p-4 transition-all duration-200 block group"
                  style={{
                    background: '#0E0D0C',
                    border: `1px solid rgba(230,183,173,0.08)`,
                    borderRadius: '3px',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = p.accent;
                    e.currentTarget.style.background = `${p.accent}08`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(230,183,173,0.08)';
                    e.currentTarget.style.background = '#0E0D0C';
                  }}
                >
                  <span
                    className="font-mono text-[9px] tracking-[0.15em] uppercase font-semibold"
                    style={{ color: p.accent }}
                  >
                    {p.label}
                  </span>
                  <span
                    className="font-heading text-[0.78rem] leading-snug"
                    style={{ color: 'rgba(245,239,230,0.55)', fontWeight: 400 }}
                  >
                    {p.desc}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link
              to="/quiz"
              className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold transition-all hover:opacity-90 px-6 py-3 inline-block"
              style={{ background: RG, color: '#080808', borderRadius: '2px' }}
            >
              FIND MY RITUAL →
            </Link>
            <p
              className="font-mono text-[8px] tracking-[0.12em] uppercase"
              style={{ color: 'rgba(230,183,173,0.5)' }}
            >
              2-minute quiz · free · no account needed
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}