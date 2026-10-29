import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { CORE_PRODUCTS } from '@/lib/coreProducts';

const steps = [
  ['Choose your coffee', 'Open a product below to see its available purchase options.'],
  ['Review your delivery plan', 'Choose the recurring delivery option and review its current price and four-week schedule. Buy once is selected by default.'],
  ['Confirm at checkout', 'Check the product, quantity, recurring charge, shipping, and taxes before placing your order.'],
];

export default function Subscription() {
  useSEO({
    title: 'Coffee Subscriptions | Torch Republic Coffee Company',
    description: 'Subscribe to Classic or Mushroom Coffee for delivery every four weeks. Review current prices, savings, and renewal terms on each product page.',
    url: '/subscription',
  });
  return (
    <main id="main-content" style={{ background: '#F7F1E7', color: '#292622', minHeight: '100vh' }}>
      <section className="max-w-3xl mx-auto px-5 pt-6 pb-3 md:pt-12 md:pb-8 text-center">
        <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: '#824329' }}>Coffee subscriptions</p>
        <h1 className="font-serif font-bold text-3xl md:text-5xl leading-tight">Your daily ritual.<br />One less thing to remember.</h1>
        <p className="font-heading text-base md:text-lg leading-relaxed mt-3" style={{ color: '#5F574F' }}>
          Coffee subscriptions are available now. Choose Classic or Mushroom Coffee for delivery every four weeks.
          The current price and delivery schedule appear with each product.
        </p>
        <a href="#coffee-options" className="inline-flex items-center justify-center rounded-md px-7 py-3 mt-7 font-heading font-semibold" style={{ background: '#824329', color: '#FFFDF8', minHeight: 48 }}>Choose your coffee</a>
        <p className="font-heading text-sm mt-5 leading-relaxed" style={{ color: '#5F574F' }}>
          After a different seasonal coffee every month? That is the separate{' '}
          <Link to="/torchbearer-club" className="underline" style={{ color: '#824329' }}>Torchbearer Club</Link>, not a four-week refill plan.
        </p>
      </section>
      <section id="coffee-options" className="max-w-5xl mx-auto px-5 py-6 md:py-12 scroll-mt-28">
        <h2 className="font-serif font-bold text-3xl text-center mb-8">Find your everyday coffee</h2>
        <div className="grid sm:grid-cols-2 gap-7">
          {CORE_PRODUCTS.map(product => (
            <article key={product.id} className="rounded-xl p-6 border flex flex-col" style={{ background: '#FFFDF8', borderColor: '#E4D8C9' }}>
              <img src={product.image} alt={product.name} className="w-full h-64 object-contain mb-6" loading="lazy" />
              <h3 className="font-serif font-bold text-2xl">{product.name}</h3>
              <p className="font-heading mt-3 mb-6 leading-relaxed" style={{ color: '#5F574F' }}>{product.description}</p>
              <Link to={product.path} className="mt-auto inline-flex items-center justify-center rounded-md px-5 py-3 font-heading font-semibold" style={{ background: '#824329', color: '#FFFDF8', minHeight: 48 }}>View purchase options →</Link>
            </article>
          ))}
        </div>
        <p className="font-heading text-center mt-8 mx-auto max-w-xl leading-relaxed" style={{ color: '#5F574F', fontSize: '0.9375rem' }}>
          Looking for monthly seasonal coffee instead? The Torchbearer Club is taking{' '}
          <Link to="/torchbearer-club" className="underline underline-offset-4 font-semibold" style={{ color: '#824329' }}>
            waitlist names
          </Link>
          {' '}for one featured Seasonal Reserve bag each calendar month.
        </p>
      </section>
      <section aria-label="How subscriptions work" className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-6">
        {steps.map(([title, body], index) => (
          <div key={title} className="rounded-xl p-6 border" style={{ background: '#FFFDF8', borderColor: '#E4D8C9' }}>
            <p className="font-mono text-sm mb-3" style={{ color: '#824329' }}>0{index + 1}</p>
            <h2 className="font-serif font-bold text-xl mb-3">{title}</h2>
            <p className="font-heading leading-relaxed" style={{ color: '#5F574F' }}>{body}</p>
          </div>
        ))}
      </section>
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div className="rounded-xl border p-6 md:p-8" style={{ background: '#FBF8F1', borderColor: '#E4D8C9' }}>
          <h2 className="font-serif font-bold text-2xl mb-4">Before you subscribe</h2>
          <p className="font-heading leading-relaxed mb-4" style={{ color: '#5F574F' }}>Subscriptions renew automatically at the price and interval shown until cancelled. Shipping and taxes are calculated at checkout. Any available savings are shown with the actual product price.</p>
          <p className="font-heading leading-relaxed mb-6" style={{ color: '#5F574F' }}>Already subscribed? Use your customer account to manage your subscription, or contact us if you need help.</p>
          <div className="flex flex-wrap gap-5 font-heading font-semibold">
            <a className="underline underline-offset-4" href="https://libertees-for-all.myshopify.com/account">Manage my subscription</a>
            <Link className="underline underline-offset-4" to="/contact">Contact support</Link>
            <Link className="underline underline-offset-4" to="/shop">Shop one-time purchases</Link>
          </div>
        </div>
      </section>
    </main>
  );
}