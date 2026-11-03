import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home } from 'lucide-react';
import useNoIndex from '@/hooks/useNoIndex';
import { useSEO } from '@/hooks/useSEO';

const CLAY = '#9B4E2F';
const INK = '#32190F';
const SECONDARY = '#5C544C';
const RULE = '#B89A6D';
const CREAM = '#F7F2E9';
const CARD = '#FFFCF7';

export default function Restocking() {
  useNoIndex();
  useSEO({
    title: 'Restocking Soon | Torch Republic Coffee Company',
    description:
      'Our current collection is temporarily unavailable while we prepare the next restock. Your ritual will be back soon.',
    url: '/restocking',
    noindex: true,
  });

  return (
    <div style={{ background: CREAM, color: INK, minHeight: '100vh' }}>
      <section className="mx-auto max-w-[640px] px-6 md:px-10 py-24 md:py-32 text-center">
        {/* Decorative mark */}
        <div
          className="mx-auto mb-8 flex items-center justify-center"
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: `${CLAY}12`,
            border: `1px solid ${CLAY}40`,
          }}
          aria-hidden="true"
        >
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: '1.6rem',
              color: CLAY,
              lineHeight: 1,
            }}
          >
            T
          </span>
        </div>

        <p className="eyebrow" style={{ color: CLAY }}>Torch Republic</p>
        <h1 className="h1" style={{ margin: '1rem 0 1.25rem' }}>That ritual went fast.</h1>
        <p className="body-lg" style={{ color: SECONDARY, maxWidth: '480px', margin: '0 auto 2.5rem' }}>
          Our current collection is temporarily unavailable while we prepare the next restock.
          Your ritual will be back soon.
        </p>

        <div
          className="mx-auto mb-10"
          style={{ height: 1, width: 64, background: RULE }}
          aria-hidden="true"
        />

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/shop" className="btn btn-primary">
            Continue Exploring <ArrowRight style={{ width: 16, height: 16 }} />
          </Link>
          <Link to="/" className="btn btn-ghost">
            <Home style={{ width: 16, height: 16 }} /> Return Home
          </Link>
        </div>
      </section>
    </div>
  );
}