import React, { useState, useEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Coffee, Zap, Sparkles, Leaf, Brain, Moon, Sun, Shield, Truck, Star, Check } from 'lucide-react';
import { MUSHROOM_PRODUCTS, mergeWithShopifyData, getCollectionImage } from '@/lib/mushroomProducts';
import MushroomProductCard from '../components/mushroom/ProductCard';
import CollectionReviewCarousel from '../components/mushroom/CollectionReviewCarousel';
import BlendComparisonChart from '@/components/mushroom/BlendComparisonChart';
import MushroomTransparencyTable from '../components/mushroom/MushroomTransparencyTable';
import CategorySEO from '@/components/seo/CategorySEO';
import GlobalSEOHead from '@/components/seo/GlobalSEOHead';
import FAQSchema from '@/components/seo/FAQSchema';

const RG = '#E6B7AD';
const DEEP_CHARCOAL = '#0A0908';
const WARM_CREAM = '#F0EBE1';

// Find Your Blend recommendations
const BLEND_RECOMMENDATIONS = [
  { goal: 'I want focus', blend: 'GlowMind Clarity', slug: 'glowmind-clarity', icon: Brain, color: '#E6B7AD' },
  { goal: 'I want morning energy', blend: 'SunCap Rise', slug: 'suncap-rise', icon: Sun, color: '#D6B27A' },
  { goal: 'I want calm restoration', blend: 'MoonCap Restore', slug: 'mooncap-restore', icon: Moon, color: '#C98F86' },
  { goal: 'I want intuition and reflection', blend: 'The Oracle', slug: 'the-oracle', icon: Sparkles, color: '#C4A8A0' },
];

// Ingredient data
const INGREDIENTS = [
  { name: "Lion's Mane", benefit: 'Commonly chosen to support focus, clarity, and mental performance', blends: 'All mushroom blends' },
  { name: 'Chaga', benefit: 'Traditionally used for daily resilience and balance', blends: 'All mushroom blends' },
  { name: 'Premium Instant Coffee', benefit: 'Smooth, convenient coffee base — no maker needed', blends: 'All blends' },
];

// FAQ data for schema
const FAQS = [
  { q: 'What is mushroom coffee?', a: 'Mushroom coffee combines premium instant coffee with functional mushrooms traditionally used in wellness routines. Torch Republic blends create an easy daily ritual for focus, clarity, and intention.' },
  { q: 'Does it taste like mushrooms?', a: 'It tastes primarily like coffee, with a smooth and lightly earthy profile depending on the blend. The coffee flavor is dominant.' },
  { q: 'Is this regular coffee or a supplement?', a: 'It is coffee with functional mushroom ingredients. It is designed as a daily beverage ritual, not a medical product.' },
  { q: 'Does it have caffeine?', a: 'Yes, all mushroom coffee blends contain caffeine from the premium instant coffee base.' },
  { q: 'How do I make it?', a: 'Add one serving to hot water, stir, and enjoy. It works with milk, creamer, or iced preparations too.' },
  { q: 'Which blend should I start with?', a: 'Start with SunCap Rise for morning energy, GlowMind Clarity for focus, or MoonCap Restore for a calmer ritual.' },
  { q: 'Can I drink it every day?', a: 'Yes, it is designed for daily ritual use. Follow product directions and consult a healthcare professional if pregnant, nursing, or managing a medical condition.' },
];

export default function MushroomCoffeeCollection() {
  const [openFaq, setOpenFaq] = useState(null);
  const [products, setProducts] = useState(MUSHROOM_PRODUCTS);
  const [collectionImage, setCollectionImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const { products: mergedProducts, collections } = await mergeWithShopifyData(MUSHROOM_PRODUCTS);
        setProducts(mergedProducts);
        // Get mushroom collection image from Shopify
        const mushroomCollection = getCollectionImage('mushroom-coffee', collections);
        if (mushroomCollection) {
          setCollectionImage(mushroomCollection);
        }
      } catch (error) {
        console.error('Failed to load Shopify data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useSEO({
    title: "Lion's Mane Mushroom Coffee for Focus & Deep Work | Torch Republic",
    description: "Six instant mushroom coffee blends with Lion's Mane and Chaga — crafted for mental clarity, deep work focus, and calm morning energy. No machine needed. Cheaper than MUD\\WTR & Four Sigmatic.",
    url: '/shop/instant-mushroom-coffee',
    type: 'website',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Shop', url: '/shop' },
      { name: 'Instant Mushroom Coffee', url: '/shop/instant-mushroom-coffee' },
    ],
    faq: FAQS,
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#080808' }}>
      {/* SEO Components */}
      <GlobalSEOHead page={{ url: '/shop/instant-mushroom-coffee', type: 'product.group' }} />
      <CategorySEO category="instant-mushroom-coffee" products={products} />
      <FAQSchema faqs={FAQS} />

      {/* ── HERO SECTION ── */}
      <section className="relative px-6 md:px-10 pt-20 pb-16" style={{ background: '#080808', borderBottom: `1px solid ${RG}25` }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center mb-12">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: RG }}>
              Torch Republic Coffee Co. — Mushroom Coffee
            </p>
            <h1 className="font-serif font-bold mb-5" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Instant Mushroom Coffee<br />Made for Clarity
            </h1>
            <p className="font-heading max-w-2xl mx-auto mb-8" style={{ fontSize: '1.05rem', color: 'rgba(240,235,225,0.6)', fontWeight: 300, lineHeight: 1.8 }}>
              Six premium instant coffee blends with Lion's Mane and Chaga — crafted for focus, calm energy, and intentional daily rituals. Coffee-forward. No machines. No pods.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link to="/shop" className="inline-flex items-center justify-center font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-4 px-10" style={{ background: RG, color: '#080808', borderRadius: '4px' }}>
                Shop Mushroom Coffee
              </Link>
              <Link to="#find-your-blend" className="inline-flex items-center justify-center font-mono text-[10px] tracking-[0.3em] uppercase transition-all hover:opacity-70 py-4 px-10" style={{ border: `1px solid ${RG}`, color: RG, borderRadius: '4px' }}>
                Find Your Blend
              </Link>
            </div>
          </motion.div>

          {/* Trust Bar */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-6" style={{ background: 'rgba(230,183,173,0.05)', border: `1px solid ${RG}15`, borderRadius: '6px' }}>
              {[
                { label: 'Premium Instant Coffee', icon: Coffee },
                { label: 'Functional Mushrooms', icon: Leaf },
                { label: '27 Servings', icon: Check },
                { label: 'No Coffee Maker', icon: Zap },
                { label: 'Daily Ritual', icon: Sparkles },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-2 p-3">
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${RG}15`, border: `1px solid ${RG}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <item.icon size={16} style={{ color: RG }} />
                  </div>
                  <p className="font-heading text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgba(240,235,225,0.65)' }}>{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Collection Showcase */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }} className="mt-16">
            <img 
              src={collectionImage || 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/1c5f69d5c_bgyvyj.png'} 
              alt="Torch Republic mushroom coffee collection featuring six instant mushroom coffee blends" 
              loading="lazy"
              decoding="async"
              className="w-full rounded-lg shadow-lg"
              style={{ border: `1px solid ${RG}20` }}
              onError={(e) => {
                // Fallback to placeholder if Shopify image fails
                e.target.src = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/1c5f69d5c_bgyvyj.png';
              }}
            />
          </motion.div>
          </div>
          </section>

      {/* ── WHY MUSHROOM COFFEE ── */}
      <section className="px-6 md:px-10 py-20" style={{ background: DEEP_CHARCOAL, borderTop: `1px solid ${RG}15`, borderBottom: `1px solid ${RG}15` }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: RG }}>01 — The Ritual Upgrade</p>
            <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#FFFFFF' }}>
              Why Add Mushrooms to Your Coffee?
            </h2>
            <p className="font-heading max-w-2xl mx-auto" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.9 }}>
              Regular coffee gives you energy. Mushroom coffee is designed to make that energy feel more intentional. Torch Republic blends premium instant coffee with functional mushrooms traditionally used to support focus, balance, and daily resilience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: 'Focus', desc: 'Blends featuring Lion\'s Mane are crafted for mornings when you want clarity and mental presence.', icon: Brain, color: '#E6B7AD' },
              { title: 'Resilience', desc: 'Mushroom blends such as Chaga are often chosen by people building a steadier daily ritual.', icon: Shield, color: '#D6B27A' },
              { title: 'Ritual', desc: 'Instant format means no grinder, no machine, and no complicated routine. Just scoop, stir, and begin.', icon: Coffee, color: '#C98F86' },
            ].map((card, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-6" style={{ background: '#0F0E0D', border: `1px solid ${card.color}25`, borderRadius: '6px' }}>
                <div className="mb-4" style={{ width: 48, height: 48, borderRadius: '50%', background: `${card.color}15`, border: `1px solid ${card.color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <card.icon size={22} style={{ color: card.color }} />
                </div>
                <h3 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.2rem' }}>{card.title}</h3>
                <p className="font-heading text-sm leading-relaxed" style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 300 }}>{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT COLLECTION ── */}
      <section className="px-6 md:px-10 py-20" style={{ background: '#080808' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: RG }}>02 — The Collection</p>
            <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#FFFFFF' }}>
              Choose Your Ritual
            </h2>
            <p className="font-heading max-w-2xl mx-auto" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.8 }}>
              Six purpose-built blends. Each crafted with premium instant coffee, Lion's Mane, and Chaga for a different kind of morning.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Link to={`/products/${product.slug}`} className="block group" style={{ background: '#0F0E0D', border: `1px solid ${product.accent}20`, borderRadius: '6px', overflow: 'hidden', textDecoration: 'none' }}>
                  <div className="aspect-[4/5] relative overflow-hidden" style={{ background: '#141312' }}>
                    <img 
                      src={product.image} 
                      alt={product.alt} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        // Show placeholder if image fails
                        e.target.style.display = 'none';
                        const placeholder = e.target.parentElement.querySelector('.image-placeholder');
                        if (placeholder) placeholder.style.display = 'flex';
                      }}
                    />
                    <div className="image-placeholder hidden flex-col items-center justify-center w-full h-full" style={{ background: '#141312' }}>
                      <div className="w-16 h-16 rounded-full border border-dashed" style={{ borderColor: `${product.accent}40` }} />
                      <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-center" style={{ color: `${product.accent}50` }}>Image unavailable</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif font-bold text-white mb-1" style={{ fontSize: '1.2rem' }}>{product.name}</h3>
                    <p className="font-mono text-[7px] tracking-[0.2em] uppercase mb-3" style={{ color: product.accent }}>{product.tagline}</p>
                    <p className="font-heading text-xs mb-4" style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 300, lineHeight: 1.7 }}>{product.description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-mono text-[7px] tracking-[0.2em] uppercase mb-1" style={{ color: 'rgba(240,235,225,0.4)' }}>27 Servings</p>
                        <p className="font-serif font-bold" style={{ fontSize: '1.3rem', color: product.accent }}>${product.price}</p>
                      </div>
                      <span className="font-mono text-[8px] tracking-[0.3em] uppercase font-bold transition-all group-hover:translate-x-1" style={{ color: RG }}>View Blend →</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FIND YOUR BLEND ── */}
      <section id="find-your-blend" className="px-6 md:px-10 py-20" style={{ background: DEEP_CHARCOAL, borderTop: `1px solid ${RG}15`, borderBottom: `1px solid ${RG}15` }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: RG }}>03 — Ritual Guide</p>
            <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#FFFFFF' }}>
              Find the Blend That Fits Your Ritual
            </h2>
            <p className="font-heading max-w-2xl mx-auto" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.8 }}>
              Not sure where to start? Match your intention to the right blend.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BLEND_RECOMMENDATIONS.map((rec, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-6 text-center" style={{ background: '#0F0E0D', border: `1px solid ${rec.color}25`, borderRadius: '6px' }}>
                <div className="mb-4 flex justify-center" style={{ width: 56, height: 56, margin: '0 auto 16px', borderRadius: '50%', background: `${rec.color}15`, border: `1px solid ${rec.color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <rec.icon size={26} style={{ color: rec.color }} />
                </div>
                <p className="font-heading text-sm mb-3" style={{ color: 'rgba(240,235,225,0.6)', fontWeight: 300 }}>{rec.goal}</p>
                <p className="font-serif font-bold text-white mb-4" style={{ fontSize: '1.1rem' }}>Recommended: {rec.blend}</p>
                <Link to={`/products/${rec.slug}`} className="inline-block font-mono text-[8px] tracking-[0.3em] uppercase font-bold transition-all hover:opacity-80" style={{ color: rec.color }}>
                  Shop This Ritual →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON CHART ── */}
      <BlendComparisonChart />

      {/* ── INGREDIENT TRANSPARENCY ── */}
      <section className="px-6 md:px-10 py-20" style={{ background: DEEP_CHARCOAL, borderTop: `1px solid ${RG}15`, borderBottom: `1px solid ${RG}15` }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: RG }}>04 — Transparency</p>
            <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#FFFFFF' }}>
              What's Inside Each Cup?
            </h2>
            <p className="font-heading max-w-2xl mx-auto mb-8" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.8 }}>
              Every blend is formulated with a different ritual in mind. Check individual product pages for exact ingredients and serving details.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {INGREDIENTS.map((ing, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-6" style={{ background: '#0F0E0D', border: `1px solid ${RG}20`, borderRadius: '6px' }}>
                <h3 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.15rem' }}>{ing.name}</h3>
                <p className="font-heading text-sm mb-3" style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.7 }}>{ing.benefit}</p>
                <p className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: RG }}>{ing.blends}</p>
              </motion.div>
            ))}
          </div>

          {/* FDA Disclaimer */}
          <div className="p-6 text-center" style={{ background: 'rgba(230,183,173,0.05)', border: `1px solid ${RG}15`, borderRadius: '6px' }}>
            <p className="font-mono text-[7px] tracking-[0.15em] max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.3)', lineHeight: 1.8 }}>
              These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
            </p>
          </div>
        </div>
      </section>

      {/* ── MUSHROOM TRANSPARENCY TABLE ── */}
      <MushroomTransparencyTable />

      {/* ── FAQ SECTION ── */}
      <section className="px-6 md:px-10 py-20" style={{ background: '#080808', borderTop: `1px solid ${RG}15`, borderBottom: `1px solid ${RG}15` }}>
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: RG }}>05 — Questions</p>
            <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#FFFFFF' }}>
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="p-5" style={{ background: '#0F0E0D', border: `1px solid ${RG}15`, borderRadius: '6px' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between text-left" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                  <span className="font-serif font-bold text-white" style={{ fontSize: '1.05rem' }}>{faq.q}</span>
                  <span className="font-mono text-lg" style={{ color: RG }}>{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 pt-4" style={{ borderTop: `1px solid ${RG}15` }}>
                    <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.8 }}>{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <CollectionReviewCarousel category="mushroom-coffee" />

      {/* ── FINAL CTA ── */}
      <section className="px-6 md:px-10 py-20 text-center" style={{ background: '#080808', borderTop: `1px solid ${RG}15` }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#FFFFFF' }}>
            Begin Your Ritual Today
          </h2>
          <p className="font-heading mb-8" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.8 }}>
            Premium instant coffee. Functional mushrooms. A clearer morning.
          </p>
          <Link to="/shop" className="inline-flex items-center justify-center font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-4 px-10" style={{ background: RG, color: '#080808', borderRadius: '4px' }}>
            Shop Mushroom Coffee →
          </Link>
        </motion.div>
      </section>
    </div>
  );
}