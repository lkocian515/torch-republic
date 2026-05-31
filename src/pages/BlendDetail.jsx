import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MUSHROOM_PRODUCTS } from '../lib/mushroomProducts';
import FAQSection from '../components/mushroom/FAQSection';
import MushroomProductCard from '../components/mushroom/ProductCard';

export default function BlendDetail() {
  const { slug } = useParams();
  const product = MUSHROOM_PRODUCTS.find(p => p.slug === slug);
  const [openFaq, setOpenFaq] = useState(null);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6"
        style={{ background: '#080808', color: '#F0EBE1' }}>
        <p className="font-serif text-2xl">Blend not found.</p>
        <Link to="/shop" className="font-mono text-[10px] tracking-[0.3em] uppercase"
          style={{ color: '#C9A24A' }}>← Back to Shop</Link>
      </div>
    );
  }

  const related = MUSHROOM_PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div style={{ backgroundColor: '#080808', color: '#F0EBE1', minHeight: '100vh' }}>

      {/* Breadcrumb */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-8 pb-2">
        <nav className="flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] uppercase"
          style={{ color: 'rgba(255,255,255,0.28)' }}>
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>›</span>
          <Link to="/shop" className="hover:text-white transition-colors">Shop</Link>
          <span>›</span>
          <span style={{ color: `${product.accent}80` }}>{product.name}</span>
        </nav>
      </div>

      {/* Product section */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75 }}
            className="sticky top-24"
          >
            <div className="relative flex items-center justify-center"
              style={{ background: '#0C0C0C', aspectRatio: '1/1', border: '1px solid rgba(201,162,74,0.1)' }}>
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(ellipse 60% 60% at 50% 50%, ${product.accent}0F 0%, transparent 70%)` }} />
              {product.imagePlaceholder || !product.image ? (
                <div className="flex flex-col items-center justify-center gap-4 p-12">
                  <div className="w-24 h-24 rounded-full border-2 border-dashed"
                    style={{ borderColor: `${product.accent}35` }} />
                  <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-center"
                    style={{ color: `${product.accent}50` }}>
                    Mystic Bloom Blend<br />Product image needed
                  </p>
                </div>
              ) : (
                <img
                  src={product.image}
                  alt={product.alt}
                  className="w-full h-full object-contain p-8"
                  style={{ filter: 'drop-shadow(0 0 40px rgba(0,0,0,0.5))' }}
                />
              )}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {/* Labels */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[8px] tracking-[0.35em] uppercase px-2.5 py-1"
                style={{ background: `${product.accent}15`, color: product.accent, border: `1px solid ${product.accent}30` }}>
                {product.roast}
              </span>
              <span className="font-mono text-[8px] tracking-[0.3em] uppercase px-2.5 py-1"
                style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}>
                Instant Mushroom Coffee
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif font-bold"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
              {product.name}
            </h1>

            {/* Mood */}
            <p className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: `${product.accent}80` }}>
              {product.mood}
            </p>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-3">
              {[
                ["Lion's Mane + Chaga", 'Mushroom Blend'],
                ['1.9 oz / 54g', 'Net Weight'],
                ['27 Servings', 'Per Tube'],
                ['Instant', 'No Brewer Needed'],
              ].map(([val, label]) => (
                <div key={label} className="flex flex-col gap-1 p-4"
                  style={{ background: '#0F0E0E', border: '1px solid rgba(201,162,74,0.1)' }}>
                  <p className="font-serif font-bold text-white text-sm">{val}</p>
                  <p className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.32)' }}>{label}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <p className="font-heading leading-relaxed"
              style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.6)', fontWeight: 300, lineHeight: 1.9 }}>
              {product.description}
            </p>

            {/* Flavor Notes */}
            <div className="flex flex-wrap gap-2">
              {product.flavorNotes.map(note => (
                <span key={note} className="font-mono text-[8px] tracking-[0.25em] uppercase px-3 py-1.5"
                  style={{ background: `${product.accent}08`, border: `1px solid ${product.accent}20`, color: `${product.accent}75` }}>
                  {note}
                </span>
              ))}
            </div>

            {/* Price */}
            <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, rgba(201,162,74,0.25), transparent)' }} />
            <div className="flex items-baseline gap-3">
              <span className="font-mono font-black" style={{ fontSize: '2.2rem', color: product.accent }}>
                ${product.price.toFixed(2)}
              </span>
              <span className="font-mono text-[9px] tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.28)' }}>
                per tube · 27 servings
              </span>
            </div>

            {/* CTA */}
            <a
              href={`https://torch-republic.com/products/${product.shopifyHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-4"
              style={{ background: '#C9A24A', color: '#080808', display: 'block' }}
            >
              Add to Cart — ${product.price.toFixed(2)}
            </a>
            <a
              href={`https://torch-republic.com/products/${product.shopifyHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-70 py-4"
              style={{ border: '1px solid rgba(201,162,74,0.4)', color: 'rgba(201,162,74,0.8)', display: 'block' }}
            >
              Buy Now →
            </a>

            {/* How to Use */}
            <div className="p-5" style={{ background: '#0F0E0E', border: '1px solid rgba(201,162,74,0.1)' }}>
              <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-3" style={{ color: 'rgba(201,162,74,0.55)' }}>
                How to Use
              </p>
              <ol className="space-y-2">
                {['Add one serving to your cup.', 'Mix with hot water, milk, or your favorite creamer.', 'Stir, sip, and enjoy your ritual.'].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="font-mono text-[9px] font-bold flex-shrink-0 mt-0.5" style={{ color: product.accent }}>{i + 1}.</span>
                    <span className="font-heading text-xs leading-relaxed" style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300 }}>{step}</span>
                  </li>
                ))}
              </ol>
              <p className="font-mono text-[8px] mt-3" style={{ color: 'rgba(255,255,255,0.2)' }}>
                Follow the serving instructions on the product packaging.
              </p>
            </div>

            {/* Disclaimer */}
            <p className="font-mono text-[8px] tracking-[0.1em] leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.2)' }}>
              Statements on this site have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection />

      {/* Related products */}
      <section className="px-6 md:px-10 py-20" style={{ borderTop: '1px solid rgba(201,162,74,0.08)' }}>
        <div className="max-w-[1100px] mx-auto">
          <p className="font-mono text-[9px] tracking-[0.45em] uppercase text-center mb-10"
            style={{ color: 'rgba(201,162,74,0.5)' }}>
            You Might Also Like
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map((p, i) => (
              <MushroomProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}