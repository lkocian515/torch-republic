import React, { useState, useEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Leaf, Zap, Shield } from 'lucide-react';
import { MATCHA_PRODUCTS, MATCHA_COLLECTION_IMAGE } from '@/lib/mushroomProducts';
import MushroomProductCard from '../components/mushroom/ProductCard';
import CollectionReviewCarousel from '../components/mushroom/CollectionReviewCarousel';
import { base44 } from '@/api/base44Client';
import CategorySEO from '@/components/seo/CategorySEO';
import GlobalSEOHead from '@/components/seo/GlobalSEOHead';
import FAQSchema from '@/components/seo/FAQSchema';

const MATCHA_GREEN = '#10B981';

// FAQ data for schema
const FAQS = [
  { q: 'What is ceremonial matcha?', a: 'Ceremonial matcha is the highest grade of matcha powder, made from shade-grown tea leaves that are stone-ground into a fine powder. It has a smooth, naturally sweet flavor and vibrant green color.' },
  { q: 'How is matcha different from coffee?', a: 'Matcha provides calm, focused energy through L-theanine and caffeine working together. Unlike coffee quick spike, matcha offers steady energy without jitters or crash.' },
  { q: 'How do I prepare Torch Republic matcha?', a: 'Add one serving to hot or cold water/milk, stir or shake until dissolved, and enjoy. No whisk needed—our instant format dissolves easily.' },
  { q: 'Does matcha have caffeine?', a: 'Yes, ceremonial matcha contains caffeine (typically 30–70mg per serving). The L-theanine in matcha creates a calmer, more focused energy compared to coffee.' },
  { q: 'How many servings are in each tin?', a: 'Each tin contains 25 servings of ceremonial grade matcha powder.' },
  { q: 'Can I drink matcha daily?', a: 'Yes, matcha is designed for daily ritual use. Many people enjoy it as a morning or afternoon alternative to coffee.' },
];

export default function MatchaCollection() {
  const [products, setProducts] = useState(MATCHA_PRODUCTS);
  const [collectionImage, setCollectionImage] = useState(MATCHA_COLLECTION_IMAGE);
  const [loading, setLoading] = useState(false);

  // Fetch Shopify products with live images on mount
  useEffect(() => {
    async function fetchShopifyData() {
      try {
        setLoading(true);
        const response = await base44.functions.invoke('fetchCollectionByHandle', {
          handle: 'matcha',
        });
        
        if (response.data?.products) {
          // Merge Shopify images with local product data
          const merged = MATCHA_PRODUCTS.map(local => {
            const shopify = response.data.products.find(p => 
              p.handle === local.shopifyHandle || p.handle === local.handle
            );
            return shopify ? {
              ...local,
              image: shopify.image_url || local.image,
              galleryImages: shopify.image_url ? [shopify.image_url] : local.galleryImages,
              price: shopify.price || local.price,
              inStock: shopify.in_stock,
            } : local;
          });
          
          setProducts(merged);
          
          // Use first product image as collection image if available
          if (response.data.products[0]?.image_url) {
            setCollectionImage(response.data.products[0].image_url);
          }
        }
      } catch (error) {
        console.error('Failed to fetch Shopify data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchShopifyData();
  }, []);

  useSEO({
    title: 'Ceremonial Matcha | Smooth Focus & Daily Rituals | Torch Republic',
    description: 'Shop three ceremonial matcha blends—The Monk, The Ascendant, and The Alchemist. Premium grade matcha for calm focus and mindful energy. Instant preparation, no whisk needed.',
    url: '/shop/matcha',
    type: 'website',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Shop', url: '/shop' },
      { name: 'Ceremonial Matcha', url: '/shop/matcha' },
    ],
    faq: FAQS,
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#111111' }}>
      {/* SEO Components */}
      <GlobalSEOHead page={{ url: '/shop/matcha', type: 'product.group' }} />
      <CategorySEO category="matcha" products={products} />
      <FAQSchema faqs={FAQS} />

      {/* Hero */}
      <section style={{ background: '#080808', padding: 'clamp(60px,8vw,100px) 24px', borderBottom: `1px solid ${MATCHA_GREEN}25` }}>
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="font-mono text-[9px] tracking-[0.45em] uppercase mb-4" style={{ color: MATCHA_GREEN }}>
              Torch Republic Coffee Co. — Ceremonial Matcha
            </p>
            <h1 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(2.2rem,4vw,3.2rem)', color: '#F5EFE6', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Ceremonial Matcha<br />for Smooth Focus & Daily Rituals
            </h1>
            <p className="font-heading text-sm max-w-2xl mx-auto mb-6" style={{ color: 'rgba(210,195,175,0.6)', fontWeight: 300, lineHeight: 1.8 }}>
              Three smooth ceremonial matcha blends for calm focus, mindful energy, and a grounded daily reset. Instant preparation. No whisk needed.
            </p>
            <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: '6px', padding: '16px' }}>
              <p className="font-heading text-xs" style={{ color: 'rgba(245,239,230,0.55)', lineHeight: 1.7 }}>
                <strong>Note:</strong> These are matcha blends, not mushroom coffee.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link to="/shop" className="inline-flex items-center justify-center font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90" style={{ background: MATCHA_GREEN, color: '#050505', padding: '14px 36px', borderRadius: '4px' }}>
                Shop Matcha
              </Link>
              <Link to="/quiz" className="inline-flex items-center justify-center font-mono text-[10px] tracking-[0.3em] uppercase transition-all hover:opacity-75" style={{ border: `1px solid ${MATCHA_GREEN}`, color: MATCHA_GREEN, padding: '14px 36px', borderRadius: '4px' }}>
                Find Your Ritual
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Collection Showcase */}
      <section style={{ padding: '40px 24px', background: '#0A0A0A', borderBottom: `1px solid ${MATCHA_GREEN}15` }}>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-6xl mx-auto">
          <img 
            src={collectionImage} 
            alt="Torch Republic Matcha Collection - The Monk, The Ascendant, The Alchemist" 
            loading="lazy"
            decoding="async"
            className="w-full rounded-lg shadow-lg"
            style={{ border: `1px solid ${MATCHA_GREEN}20` }}
            onError={(e) => {
              e.target.src = MATCHA_COLLECTION_IMAGE;
            }}
          />
        </motion.div>
      </section>

      {/* Benefits */}
      <section style={{ background: '#0A0A0A', padding: '20px 24px', borderBottom: `1px solid ${MATCHA_GREEN}15` }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: 'Ceremonial Grade', icon: Sparkles },
              { label: 'Calm Energy', icon: Leaf },
              { label: 'No Whisk', icon: Zap },
              { label: '25 Servings', icon: Sparkles },
              { label: 'L-Theanine', icon: Shield },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-2">
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${MATCHA_GREEN}15`, border: `1px solid ${MATCHA_GREEN}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <item.icon size={16} style={{ color: MATCHA_GREEN }} />
                </div>
                <p className="font-heading text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(245,239,230,0.6)' }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Matcha */}
      <section style={{ padding: 'clamp(60px,8vw,100px) 24px', background: '#080808' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: MATCHA_GREEN }}>Why Matcha</p>
            <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.8rem,3vw,2.4rem)', color: '#F5EFE6' }}>
              The Calm Energy Alternative
            </h2>
            <p className="font-heading text-sm" style={{ color: 'rgba(210,195,175,0.55)', lineHeight: 1.8 }}>
              Matcha offers a different kind of energy—calm, focused, and sustained. The L-theanine in ceremonial matcha works with caffeine to create alert relaxation without jitters or crash.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Calm Focus', desc: 'L-theanine promotes alpha brain waves for relaxed alertness. Perfect for deep work or mindful mornings.' },
              { title: 'Sustained Energy', desc: 'No spike, no crash. Matcha energy builds gradually and lasts 4–6 hours.' },
              { title: 'Antioxidants', desc: 'Rich in catechins, especially EGCG. One cup of matcha equals approximately 10 cups of green tea in antioxidant content.' },
            ].map((card, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-5" style={{ background: '#0F0E0D', border: `1px solid ${MATCHA_GREEN}20`, borderRadius: '6px' }}>
                <h3 className="font-serif font-bold text-white mb-2" style={{ fontSize: '1.1rem' }}>{card.title}</h3>
                <p className="font-heading text-sm" style={{ color: 'rgba(245,239,230,0.5)', lineHeight: 1.7 }}>{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section style={{ padding: 'clamp(60px,8vw,100px) 24px' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: MATCHA_GREEN }}>The Collection</p>
            <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.8rem,3vw,2.4rem)', color: '#F5EFE6' }}>
              Choose Your Matcha Ritual
            </h2>
            <p className="font-heading text-sm" style={{ color: 'rgba(210,195,175,0.55)' }}>
              Three ceremonial matcha blends. Each crafted for a different intention.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <MushroomProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <CollectionReviewCarousel category="matcha" />

      {/* FAQ Section */}
      <section style={{ padding: 'clamp(60px,8vw,100px) 24px', background: '#0A0A0A' }}>
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: MATCHA_GREEN }}>FAQ</p>
            <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.8rem,3vw,2.4rem)', color: '#F5EFE6' }}>
              Frequently Asked Questions
            </h2>
          </motion.div>
          
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="p-5" style={{ background: '#0F0E0D', border: `1px solid ${MATCHA_GREEN}15`, borderRadius: '6px' }}>
                <h3 className="font-serif font-bold text-white mb-2" style={{ fontSize: '1.05rem' }}>{faq.q}</h3>
                <p className="font-heading text-sm" style={{ color: 'rgba(245,239,230,0.55)', lineHeight: 1.7 }}>{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(60px,8vw,100px) 24px' }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.8rem,3vw,2.4rem)', color: '#F5EFE6' }}>Calm Energy. Clear Focus.</h2>
            <p className="font-heading text-sm mb-8" style={{ color: 'rgba(210,195,175,0.55)' }}>Ceremonial matcha designed for smooth, steady energy without the spike. An intentional daily ritual you can look forward to.</p>
            <Link to="/shop" className="inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.28em] uppercase font-bold transition-all hover:opacity-90" style={{ background: MATCHA_GREEN, color: '#050505', padding: '14px 36px', borderRadius: '999px' }}>
              Shop All Matcha <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}