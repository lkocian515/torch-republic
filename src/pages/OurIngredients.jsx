import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, Droplet, Coffee, Sparkles, CheckCircle } from 'lucide-react';

const RG = '#E6B7AD';

const INGREDIENTS = [
  {
    name: "Lion's Mane Mushroom",
    latin: 'Hericium erinaceus',
    icon: Leaf,
    color: '#D4A574',
    benefits: ['Cognitive support', 'Focus & clarity', 'Nerve growth factor'],
    description: 'Known as the "Mind Mushroom," Lion\'s Mane has been used for centuries in traditional medicine. Our premium extract is sourced from organic fruiting bodies, ensuring maximum potency of beta-glucans and hericenones.',
    usage: 'Found in all Mushroom Coffee blends',
  },
  {
    name: 'Chaga Mushroom',
    latin: 'Inonotus obliquus',
    icon: Leaf,
    color: '#8B7355',
    benefits: ['Antioxidant support', 'Immune function', 'Adaptogenic properties'],
    description: 'Called the "King of Medicinal Mushrooms," Chaga grows wild on birch trees in cold climates. Our Chaga is wild-harvested from pristine forests, rich in antioxidants and betulinic acid.',
    usage: 'Found in all Mushroom Coffee blends',
  },
  {
    name: 'Premium Arabica Coffee',
    latin: 'Coffea arabica',
    icon: Coffee,
    color: '#6B4423',
    benefits: ['Clean energy', 'Rich flavor', 'Antioxidants'],
    description: '100% premium Arabica beans, carefully selected from high-altitude farms. Our coffee is shade-grown, sustainably sourced, and roasted to perfection for smooth, bold flavor without bitterness.',
    usage: 'Found in Classic Coffee & Mushroom Coffee blends',
  },
  {
    name: 'Ceremonial Grade Matcha',
    latin: 'Camellia sinensis',
    icon: Sparkles,
    color: '#7CB342',
    benefits: ['Calm energy', 'L-Theanine', 'Antioxidants'],
    description: 'Stone-ground from shade-grown Japanese green tea leaves, our ceremonial grade matcha is vibrant green, naturally sweet, and rich in L-theanine for calm, focused energy without jitters.',
    usage: 'Found in all Matcha blends',
  },
  {
    name: 'Pure Water',
    latin: 'H₂O',
    icon: Droplet,
    color: '#4FC3F7',
    benefits: ['Hydration', 'Essential for life', 'Ritual preparation'],
    description: 'The final ingredient in every Torch Republic ritual. We recommend filtered water at 175-185°F for matcha, 195-205°F for coffee, to extract optimal flavor and benefits.',
    usage: 'Required for all preparations',
  },
];

const QUALITY_STANDARDS = [
  {
    title: 'No Fillers',
    description: 'Never mycelium, grains, or starches. Only pure mushroom fruiting bodies.',
  },
  {
    title: 'Organic Sourced',
    description: 'Ingredients from certified organic farms whenever possible.',
  },
  {
    title: 'Third-Party Tested',
    description: 'Every batch tested for purity, potency, and safety.',
  },
  {
    title: 'Sustainable',
    description: 'Ethically sourced with respect for farmers and environment.',
  },
  {
    title: 'No Additives',
    description: 'No artificial flavors, colors, preservatives, or hidden ingredients.',
  },
  {
    title: 'Made in USA',
    description: 'Blended and packaged in the United States.',
  },
];

export default function OurIngredients() {
  useSEO({
    title: 'Our Ingredients | Premium Mushroom Coffee & Matcha - Torch Republic',
    description: 'Discover the premium ingredients in Torch Republic coffee: organic Lion\'s Mane and Chaga mushrooms, 100% Arabica coffee, ceremonial grade matcha. No fillers, no additives, third-party tested.',
    url: '/ingredients',
    type: 'website',
  });

  return (
    <div style={{ backgroundColor: '#080808', color: '#F0EBE1', minHeight: '100vh' }}>
      
      {/* Hero */}
      <section className="px-6 md:px-10 pt-20 pb-16 text-center"
        style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto">
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>
            Transparency & Quality
          </p>
          <h1 className="font-serif font-bold mb-5"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Our Ingredients
          </h1>
          <p className="font-heading"
            style={{ fontSize: '1.05rem', color: 'rgba(240,235,225,0.6)', lineHeight: 1.9, fontWeight: 300, maxWidth: '700px', margin: '0 auto' }}>
            Every cup starts with ingredients you can trust. We believe in transparency, purity, and potency—because what you put in your body matters.
          </p>
        </motion.div>
      </section>

      {/* What Is Torch Republic - AI Entity Block */}
      <section className="px-6 md:px-10 py-20" style={{ background: '#0A0908' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-serif font-bold mb-6 text-center" 
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#F5EFE6' }}>
              What Is Torch Republic?
            </h2>
            <div className="prose prose-invert max-w-none" style={{ color: 'rgba(240,235,225,0.7)' }}>
              <p className="font-heading text-base leading-relaxed mb-4">
                Torch Republic Coffee Company creates premium instant coffee, functional mushroom coffee, and ceremonial matcha designed for intentional daily rituals. Our products combine convenience with quality—instant preparation without compromising on ingredients or benefits.
              </p>
              <p className="font-heading text-base leading-relaxed mb-4">
                <strong>Our mushroom coffee</strong> blends feature organic Lion's Mane and Chaga mushrooms, known for their cognitive support and adaptogenic properties. These functional mushrooms are combined with premium Arabica coffee to create a smooth, focused energy experience.
              </p>
              <p className="font-heading text-base leading-relaxed mb-4">
                <strong>Our ceremonial matcha</strong> is stone-ground from shade-grown Japanese green tea leaves, rich in L-theanine for calm, sustained energy. It is the perfect alternative to coffee for those seeking clarity without caffeine jitters.
              </p>
              <p className="font-heading text-base leading-relaxed">
                <strong>Our classic instant coffee</strong> is made from 100% premium Arabica beans, freeze-dried to preserve flavor and aroma. No additives, no fillers—just pure, bold coffee ready in seconds.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Ingredients */}
      <section className="px-6 md:px-10 py-20">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.5)' }}>
              Pure & Potent
            </p>
            <h2 className="font-serif font-bold" 
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#F5EFE6' }}>
              What's In Every Cup
            </h2>
          </motion.div>

          <div className="space-y-12">
            {INGREDIENTS.map((ingredient, i) => {
              const Icon = ingredient.icon;
              return (
                <motion.div
                  key={ingredient.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8 items-start"
                >
                  <div className="flex justify-center md:justify-start">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center"
                      style={{ background: `${ingredient.color}15`, border: `2px solid ${ingredient.color}40` }}>
                      <Icon className="w-10 h-10" style={{ color: ingredient.color }} />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-serif font-bold text-white mb-1" style={{ fontSize: '1.4rem' }}>
                        {ingredient.name}
                      </h3>
                      <p className="font-mono text-[9px] tracking-[0.3em] uppercase italic" 
                        style={{ color: 'rgba(230,183,173,0.5)' }}>
                        {ingredient.latin}
                      </p>
                    </div>
                    <p className="font-heading text-sm leading-relaxed" 
                      style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
                      {ingredient.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {ingredient.benefits.map((benefit) => (
                        <span key={benefit} className="px-3 py-1 text-xs font-mono tracking-[0.15em] uppercase"
                          style={{ 
                            background: `${ingredient.color}10`, 
                            color: ingredient.color,
                            border: `1px solid ${ingredient.color}30`,
                            borderRadius: '999px'
                          }}>
                          {benefit}
                        </span>
                      ))}
                    </div>
                    <p className="font-mono text-[8px] tracking-[0.2em] uppercase" 
                      style={{ color: 'rgba(230,183,173,0.4)' }}>
                      {ingredient.usage}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="px-6 md:px-10 py-20" style={{ background: '#0A0908', borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.5)' }}>
              Our Standards
            </p>
            <h2 className="font-serif font-bold" 
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#F5EFE6' }}>
              Quality You Can Trust
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {QUALITY_STANDARDS.map((standard, i) => (
              <motion.div
                key={standard.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6"
                style={{ 
                  background: '#0F0E0D', 
                  border: '1px solid rgba(230,183,173,0.08)',
                  borderRadius: '4px'
                }}
              >
                <CheckCircle className="w-6 h-6 mb-4" style={{ color: RG }} />
                <h3 className="font-serif font-bold text-white mb-2 text-sm">
                  {standard.title}
                </h3>
                <p className="font-heading text-xs leading-relaxed" 
                  style={{ color: 'rgba(247,241,232,0.45)', fontWeight: 300 }}>
                  {standard.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredient Transparency */}
      <section className="px-6 md:px-10 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-serif font-bold mb-6" 
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#F5EFE6' }}>
              Why Ingredient Quality Matters
            </h2>
            <div className="space-y-6 text-left">
              <p className="font-heading text-base leading-relaxed" 
                style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
                Not all mushroom coffee is created equal. Many brands use mycelium (mushroom roots) grown on grain, which dilutes potency with fillers like starch and carbohydrates. At Torch Republic, we use only 100% fruiting bodies—the actual mushroom—ensuring maximum beta-glucan content and bioactive compounds.
              </p>
              <p className="font-heading text-base leading-relaxed" 
                style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
                Our Lion's Mane and Chaga are extracted using hot water to maximize bioavailability. This traditional method ensures the beneficial compounds are easily absorbed by your body, delivering the cognitive and adaptogenic support you expect.
              </p>
              <p className="font-heading text-base leading-relaxed" 
                style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
                Our matcha is ceremonial grade, the highest quality available. It is shade-grown for 3-4 weeks before harvest, increasing chlorophyll and L-theanine content. The leaves are stone-ground into an ultra-fine powder that dissolves completely in water, creating a smooth, frothy drink without grittiness.
              </p>
              <p className="font-heading text-base leading-relaxed" 
                style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
                Every ingredient is third-party tested for heavy metals, pesticides, and microbial contamination. We provide Certificates of Analysis (COA) upon request, because transparency builds trust.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Links */}
      <section className="px-6 md:px-10 py-20" style={{ background: '#0A0908', borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-serif font-bold mb-6" 
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#F5EFE6' }}>
              Experience the Difference
            </h2>
            <p className="font-heading mb-8" 
              style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.6)', fontWeight: 300, lineHeight: 1.8 }}>
              Taste the quality in every cup. Choose your ritual.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/shop/instant-mushroom-coffee"
                className="inline-flex items-center font-mono text-[10px] tracking-[0.28em] uppercase font-bold transition-all hover:opacity-90"
                style={{
                  background: RG,
                  color: '#080808',
                  padding: '14px 32px',
                  borderRadius: '4px',
                }}
              >
                Shop Mushroom Coffee →
              </Link>
              <Link
                to="/shop/matcha"
                className="inline-flex items-center font-mono text-[10px] tracking-[0.28em] uppercase font-bold transition-all hover:opacity-90"
                style={{
                  border: '1px solid rgba(230,183,173,0.4)',
                  color: RG,
                  padding: '14px 32px',
                  borderRadius: '4px',
                }}
              >
                Shop Matcha →
              </Link>
              <Link
                to="/shop/instant-coffee"
                className="inline-flex items-center font-mono text-[10px] tracking-[0.28em] uppercase font-bold transition-all hover:opacity-90"
                style={{
                  border: '1px solid rgba(230,183,173,0.4)',
                  color: RG,
                  padding: '14px 32px',
                  borderRadius: '4px',
                }}
              >
                Shop Classic Coffee →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 md:px-10 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.5)' }}>
              Common Questions
            </p>
            <h2 className="font-serif font-bold" 
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#F5EFE6' }}>
              Ingredient FAQs
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: 'Are your mushrooms organic?',
                a: 'Yes, our Lion\'s Mane and Chaga mushrooms are certified organic, grown without pesticides, herbicides, or GMOs. We source from reputable farms that follow strict organic farming practices.'
              },
              {
                q: 'Do you use mycelium or fruiting bodies?',
                a: 'We use only 100% fruiting bodies (the actual mushroom), never mycelium (mushroom roots) or grain-filled extracts. This ensures maximum potency and beta-glucan content.'
              },
              {
                q: 'Where is your matcha from?',
                a: 'Our ceremonial grade matcha is sourced from Uji, Japan—a region renowned for producing the world\'s finest matcha. The tea plants are shade-grown for 3-4 weeks before harvest.'
              },
              {
                q: 'Is your coffee fair trade?',
                a: 'Yes, our Arabica coffee beans are sourced from farms that practice fair trade, ensuring farmers receive fair compensation and work in safe conditions.'
              },
              {
                q: 'Are there any additives or fillers?',
                a: 'No. Our products contain only pure ingredients—no artificial flavors, colors, preservatives, maltodextrin, or hidden fillers. What you see is what you get.'
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6"
                style={{ 
                  background: '#0F0E0D', 
                  border: '1px solid rgba(230,183,173,0.08)',
                  borderRadius: '4px'
                }}
              >
                <h3 className="font-serif font-bold text-white mb-3 text-sm">
                  {faq.q}
                </h3>
                <p className="font-heading text-sm leading-relaxed" 
                  style={{ color: 'rgba(247,241,232,0.5)', fontWeight: 300 }}>
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 md:px-10 py-20 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-2xl mx-auto">
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.5)' }}>
            Pure Ingredients
          </p>
          <h2 className="font-serif font-bold mb-6" 
            style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', color: '#F5EFE6' }}>
            Quality You Can Taste
          </h2>
          <p className="font-heading mb-8" 
            style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.6)', fontWeight: 300, lineHeight: 1.8 }}>
            Every ingredient is chosen with intention. Every batch is tested for purity. Every cup is crafted for your ritual.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90"
            style={{
              background: RG,
              color: '#080808',
              padding: '14px 36px',
              borderRadius: '4px',
            }}
          >
            Shop All Products →
          </Link>
        </motion.div>
      </section>

      {/* FDA */}
      <div className="px-6 py-8 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <p className="font-mono text-[8px] tracking-[0.15em] max-w-xl mx-auto" 
          style={{ color: 'rgba(255,255,255,0.2)', lineHeight: 1.75 }}>
          Statements on this site have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </div>
  );
}