import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import useSpecialEditions from '@/hooks/useSpecialEditions';
import { editionState } from '@/lib/specialEditions';
import { WINTER_DUO, winterDuoEditions } from '@/lib/winterDuo';
import { SANS, TYPE, fadeUp } from './driftTheme';

// Deep winter band — the homepage's editorial rhythm, lit for a cold evening
// instead of a bright morning.
const W = {
  night: '#0F1A21',
  cream: '#F7EEDD',
  body: '#D9CFC1',
  ember: '#D6743A',
  hairline: 'rgba(214,116,58,0.28)',
  shadow: '0 10px 30px rgba(4,10,14,0.45)',
};

/**
 * Homepage Winter Duo feature.
 *
 * The artwork and the copy are separate elements: the headline, flavor line,
 * supporting sentence and button are real HTML, so they stay readable, editable
 * and available to a screen reader. Nothing here claims a price, a format or a
 * shipping promise — each coffee reports the availability its own edition record
 * carries, and the button only ever opens the preview page.
 */
export default function DriftWinterDuo() {
  const { editions, upcoming, loading } = useSpecialEditions();

  if (loading) return null;

  const duo = winterDuoEditions(editions, upcoming);
  if (duo.length === 0) return null;

  return (
    <section style={{ background: W.night }} aria-labelledby="winter-duo-heading">
      <div className="mx-auto max-w-[1200px] px-6 py-16 md:py-20">
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <p style={{ ...TYPE.eyebrow, color: W.ember, margin: '0 0 1.25rem' }}>
            {WINTER_DUO.eyebrow}
          </p>

          <h2 id="winter-duo-heading" style={{ ...TYPE.heading, color: W.cream, margin: 0 }}>
            {WINTER_DUO.name}
          </h2>

          <p style={{ ...TYPE.meta, fontSize: '0.8125rem', letterSpacing: '0.08em', color: W.ember, margin: '1.25rem 0 0' }}>
            {WINTER_DUO.flavorLine}
          </p>

          <p style={{ ...TYPE.lead, color: W.body, margin: '1.25rem auto 0', maxWidth: '46ch' }}>
            {WINTER_DUO.supporting}
          </p>

          {/* Each coffee states its own availability, so a release that lands
              first never makes the pair look orderable. */}
          <ul className="flex flex-wrap justify-center gap-2" style={{ listStyle: 'none', margin: '1.5rem 0 0', padding: 0 }}>
            {duo.map((edition) => (
              <li
                key={edition.id}
                className="inline-flex items-center gap-2"
                style={{ border: `1px solid ${W.hairline}`, borderRadius: 999, padding: '0.4rem 0.9rem' }}
              >
                <span style={{ fontFamily: SANS, fontSize: '0.8125rem', fontWeight: 600, color: W.cream }}>
                  {edition.name}
                </span>
                <span style={{ ...TYPE.meta, fontSize: '0.625rem', color: W.ember }}>
                  {editionState(edition).label}
                </span>
              </li>
            ))}
          </ul>

          <Link
            to={WINTER_DUO.path}
            className="group inline-flex items-center justify-center gap-2 font-heading font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#D6743A]"
            style={{
              marginTop: '2rem',
              minHeight: 48,
              padding: '0.875rem 2rem',
              borderRadius: 999,
              border: `1px solid ${W.ember}`,
              color: W.cream,
              background: 'transparent',
            }}
          >
            {WINTER_DUO.ctaLabel}
            <ArrowRight size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        <motion.div {...fadeUp} className="mt-10 md:mt-14" style={{ boxShadow: W.shadow, borderRadius: 10, overflow: 'hidden' }}>
          <img src={WINTER_DUO.image} alt={WINTER_DUO.imageAlt} width="1536" height="864" className="block h-auto w-full" style={{ objectFit: 'contain' }} loading="lazy" decoding="async" />
        </motion.div>
      </div>
    </section>
  );
}