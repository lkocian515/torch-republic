import React from 'react';
import { Link } from 'react-router-dom';

/**
 * SEO-only section — visually minimal, semantically rich.
 * Provides H1, keyword-rich body text, and internal links for search engines.
 * Design is intentionally understated to not compete with the hero.
 */
export default function HomeSEOSection() {
  return (
    <section
      aria-label="About Torch Republic Coffee"
      style={{
        backgroundColor: '#050505',
        borderTop: '1px solid rgba(201,162,74,0.07)',
        borderBottom: '1px solid rgba(201,162,74,0.07)',
        padding: '40px 24px',
      }}
    >
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        {/* H1 — primary keyword target */}
        <h1
          style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            fontWeight: 700,
            color: '#E6AC45',
            letterSpacing: '0.02em',
            marginBottom: '16px',
            fontFamily: 'var(--font-serif)',
          }}
        >
          Premium American Coffee Inspired by History
        </h1>

        {/* SEO body copy — 150–250 words, keyword-rich, natural */}
        <p
          style={{
            fontSize: '0.88rem',
            color: 'rgba(240,235,225,0.45)',
            lineHeight: 1.85,
            marginBottom: '20px',
            fontWeight: 300,
          }}
        >
          Torch Republic Coffee Company crafts premium American coffee rooted in the stories, discipline, and legacy of the people who built this nation. Every blend in our collection is small-batch roasted with precision — no fillers, no shortcuts, just bold flavor and authentic character.
        </p>
        <p
          style={{
            fontSize: '0.88rem',
            color: 'rgba(240,235,225,0.45)',
            lineHeight: 1.85,
            marginBottom: '20px',
            fontWeight: 300,
          }}
        >
          Start your journey with our{' '}
          <Link
            to="/washington-pods"
            style={{ color: 'rgba(201,162,74,0.7)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
          >
            American coffee pods
          </Link>{' '}
          — compatible with most single-serve brewers and built for those who refuse to compromise on quality. Our{' '}
          <Link
            to="/CoffeeCollection"
            style={{ color: 'rgba(201,162,74,0.7)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
          >
            Founders Series coffee
          </Link>{' '}
          features six limited-edition blends inspired by Washington, Jefferson, Franklin, Lincoln, Adams, and Roosevelt — each roasted once and retired forever. Collect them all before they're gone.
        </p>
        <p
          style={{
            fontSize: '0.88rem',
            color: 'rgba(240,235,225,0.45)',
            lineHeight: 1.85,
            fontWeight: 300,
          }}
        >
          Looking for the best value in American coffee? Our{' '}
          <Link
            to="/TheTorchBox"
            style={{ color: 'rgba(201,162,74,0.7)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
          >
            Torch Box coffee subscription
          </Link>{' '}
          delivers exclusive member-only blends straight to your door every month — saving you up to $42 per shipment while ensuring you never miss a limited release. Cancel or pause anytime. No contracts. Just great coffee.
        </p>

      </div>
    </section>
  );
}