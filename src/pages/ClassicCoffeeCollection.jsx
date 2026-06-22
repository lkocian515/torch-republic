import React, { useState, useEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Coffee, Zap, Sparkles } from 'lucide-react';
import { CLASSIC_COFFEE_PRODUCTS, CLASSIC_COLLECTION_IMAGE } from '@/lib/mushroomProducts';
import MushroomProductCard from '../components/mushroom/ProductCard';
import CollectionReviewCarousel from '../components/mushroom/CollectionReviewCarousel';
import { base44 } from '@/api/base44Client';
import CategorySEO from '@/components/seo/CategorySEO';
import GlobalSEOHead from '@/components/seo/GlobalSEOHead';
import FAQSchema from '@/components/seo/FAQSchema';
import CoffeeOriginSection from '@/components/coffee/CoffeeOriginSection';
import FlavorExperienceSection from '@/components/coffee/FlavorExperienceSection';
import WhyFreezeDriedSection from '@/components/coffee/WhyFreezeDriedSection';
import WhyInstantRitualSection from '@/components/coffee/WhyInstantRitualSection';
import CoffeeTrustBar from '@/components/coffee/CoffeeTrustBar';

const GOLD = '#C4A35A';

// FAQ data for schema
const FAQS = [
  { q: 'What makes Papua New Guinea coffee special?', a: 'Papua New Guinea coffee is grown in the mountainous highlands in rich volcanic soil at high elevations. It is highly regarded for its clean cup profile, complexity, smooth character, and nuanced sweetness. Many PNG coffees trace their heritage to Jamaica Blue Mountain stock, giving the region a reputation for exceptionally balanced and refined coffees.' },
  { q: 'What does Torch Republic instant coffee taste like?', a: 'Our single-origin Papua New Guinea coffee highlights notes of dark chocolate, toasted almond, and sweet toffee with a smooth, aromatic finish. The body is smooth and rich with balanced acidity — a flavor profile that stands apart from typical commodity instant coffee.' },
  { q: 'What is freeze-dried coffee?', a: 'Freeze-dried coffee is made by brewing specialty coffee to full concentration, then freeze-drying it to preserve the natural flavor compounds, aroma, and freshness. The freeze-drying process removes water through sublimation while locking in the complex flavors. The result dissolves instantly in hot water with no brewing equipment required.' },
  { q: 'Do I need a coffee machine?', a: 'No. Torch Republic instant coffee just needs hot water. Add one serving to 8–10 oz of hot water, stir, and enjoy. No machine, pods, or grinder needed. It is designed for home, office, travel, and camping.' },
  { q: 'How many servings are in each tube?', a: 'Each tube contains 27 servings of premium single-origin Papua New Guinea instant coffee — nearly a month of daily rituals.' },
  { q: 'Is Torch Republic instant coffee single-origin?', a: 'Yes. Our coffee is single-origin from Papua New Guinea, 100% Arabica, and freeze-dried to preserve the flavor compounds that make this region respected among specialty coffee drinkers.' },
  { q: 'Can I drink instant coffee daily?', a: 'Yes, instant coffee is designed for daily ritual use. Many people prefer it for its convenience, consistent taste, and the fact that it requires no machine or cleanup.' },
];

export default function ClassicCoffeeCollection() {
  const [products, setProducts] = useState(CLASSIC_COFFEE_PRODUCTS);
  const [collectionImage, setCollectionImage] = useState(CLASSIC_COLLECTION_IMAGE);
  const [loading, setLoading] = useState(false);

  // Fetch Shopify products with live images on mount
  useEffect(() => {
    async function fetchShopifyData() {
      try {
        setLoading(true);
        const response = await base44.functions.invoke('fetchCollectionByHandle', {
          handle: 'classic-coffee',
        });
        
        if (response.data?.products) {
          // Merge Shopify images with local product data
          const merged = CLASSIC_COFFEE_PRODUCTS.map(local => {
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
    title: 'Premium Freeze-Dried Instant Coffee | 100% Arabica | Torch Republic',
    description: 'Premium freeze-dried instant coffee made from single-origin Papua New Guinea Arabica. Dark chocolate and toasted almond notes. No machine, no pods. 27 servings per tube.',
    url: '/shop/instant-coffee',
    type: 'website',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Shop', url: '/shop' },
      { name: 'Instant Coffee', url: '/shop/instant-coffee' },
    ],
    faq: FAQS,
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#111111' }}>
      {/* SEO Components */}
      <GlobalSEOHead page={{ url: '/shop/instant-coffee', type: 'product.group' }} />
      <CategorySEO category="instant-coffee" products={products} />
      <FAQSchema faqs={FAQS} />

      {/* Hero */}
      <section style={{ background: '#080808', padding: 'clamp(60px,8vw,100px) 24px', borderBottom: `1px solid ${GOLD}25` }}>
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="font-mono text-[9px] tracking-[0.45em] uppercase mb-4" style={{ color: GOLD }}>
              Torch Republic Coffee Co. — Classic Instant Coffee
            </p>
            <h1 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(2.2rem,4vw,3.2rem)', color: '#F5EFE6', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
               Premium Coffee Rituals<br />Powered By Nature
             </h1>
             <p className="font-heading text-sm max-w-2xl mx-auto mb-6" style={{ color: 'rgba(210,195,175,0.6)', fontWeight: 300, lineHeight: 1.8 }}>
               Single-origin Papua New Guinea coffee — 100% Arabica, freeze-dried to preserve dark chocolate, toasted almond, and sweet toffee notes. No machine, no pods, no compromise. Just add hot water.
             </p>
            <div style={{ background: 'rgba(196,163,90,0.08)', border: '1px solid rgba(196,163,90,0.15)', borderRadius: '6px', padding: '16px' }}>
              <p className="font-heading text-xs" style={{ color: 'rgba(245,239,230,0.55)', lineHeight: 1.7 }}>
                <strong>Note:</strong> These are pure classic coffee blends. They do not contain mushrooms.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link to="/shop" className="inline-flex items-center justify-center font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90" style={{ background: GOLD, color: '#050505', padding: '14px 36px', borderRadius: '4px' }}>
                Shop Classic Coffee
              </Link>
              <Link to="/quiz" className="inline-flex items-center justify-center font-mono text-[10px] tracking-[0.3em] uppercase transition-all hover:opacity-75" style={{ border: `1px solid ${GOLD}`, color: GOLD, padding: '14px 36px', borderRadius: '4px' }}>
                Find Your Ritual
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Collection Showcase */}
      <section style={{ padding: '40px 24px', background: '#0A0A0A', borderBottom: `1px solid ${GOLD}15` }}>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-6xl mx-auto">
          <img 
            src={collectionImage} 
            alt="Torch Republic Classic Instant Coffee Collection - Torchbearer, Ember Rise, Midnight Watch" 
            loading="lazy"
            decoding="async"
            className="w-full rounded-lg shadow-lg"
            style={{ border: `1px solid ${GOLD}20` }}
            onError={(e) => {
              e.target.src = CLASSIC_COLLECTION_IMAGE;
            }}
          />
        </motion.div>
      </section>

      {/* Coffee Trust Bar */}
      <CoffeeTrustBar accent={GOLD} />

      {/* Coffee Origin Story */}
      <CoffeeOriginSection accent={GOLD} />

      {/* Flavor Experience */}
      <FlavorExperienceSection accent={GOLD} />

      {/* Why Freeze-Dried */}
      <WhyFreezeDriedSection accent={GOLD} />

      {/* Why Instant Ritual Coffee */}
      <WhyInstantRitualSection accent={GOLD} />

      {/* Products */}
      <section style={{ padding: 'clamp(60px,8vw,100px) 24px' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: GOLD }}>The Collection</p>
            <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.8rem,3vw,2.4rem)', color: '#F5EFE6' }}>
              Choose Your Classic Ritual
            </h2>
            <p className="font-heading text-sm" style={{ color: 'rgba(210,195,175,0.55)' }}>
              Three premium instant coffee blends. Pure coffee. No mushrooms. Just smooth, elevated mornings.
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
      <CollectionReviewCarousel category="classic-coffee" />

      {/* FAQ Section */}
      <section style={{ padding: 'clamp(60px,8vw,100px) 24px', background: '#0A0A0A' }}>
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: GOLD }}>FAQ</p>
            <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.8rem,3vw,2.4rem)', color: '#F5EFE6' }}>
              Frequently Asked Questions
            </h2>
          </motion.div>
          
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="p-5" style={{ background: '#0F0E0D', border: `1px solid ${GOLD}15`, borderRadius: '6px' }}>
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
            <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.8rem,3vw,2.4rem)', color: '#F5EFE6' }}>Premium Coffee Rituals Powered By Nature</h2>
            <p className="font-heading text-sm mb-8" style={{ color: 'rgba(210,195,175,0.55)' }}>Single-origin Papua New Guinea coffee — freeze-dried to preserve dark chocolate, toasted almond, and toffee notes. A daily ritual that fits real life. No machine, no pods, no compromise. Just add hot water and begin.</p>
            <Link to="/shop" className="inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.28em] uppercase font-bold transition-all hover:opacity-90" style={{ background: GOLD, color: '#050505', padding: '14px 36px', borderRadius: '999px' }}>
              Shop All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}