import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Clock } from 'lucide-react';

const RG = '#E6AC45';

export default function LocalSEO() {
  useSEO({
    title: 'Torch Republic Coffee Company | Corpus Christi, Texas',
    description: 'U.S.-based premium instant coffee, mushroom coffee, and ceremonial matcha. Located in Corpus Christi, Texas. Fast shipping nationwide.',
    url: '/local',
    type: 'website',
    noindex: true, // Admin/internal page - not for public indexing
  });

  return (
    <div className="min-h-screen" style={{ background: '#080808' }}>
      
      {/* Hero Section */}
      <section className="px-6 md:px-10 py-16 md:py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[11px] tracking-[0.35em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.45)' }}>
            Local Business
          </p>
          <h1 className="font-serif font-bold text-4xl md:text-5xl mb-6" style={{ color: '#F7F2E9', letterSpacing: '-0.02em' }}>
            Torch Republic Coffee Company
          </h1>
          <p className="font-heading text-lg md:text-xl max-w-3xl mx-auto" style={{ color: 'rgba(245,239,230,0.85)', lineHeight: 1.8 }}>
            Premium instant coffee, mushroom coffee, and ceremonial matcha crafted in Corpus Christi, Texas. U.S.-owned small business serving customers nationwide.
          </p>
        </motion.div>
      </section>

      {/* Business Information */}
      <section className="px-6 md:px-10 py-12 md:py-16">
        <div className="max-w-[1000px] mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-serif font-bold text-2xl mb-6" style={{ color: '#F7F2E9' }}>
                Contact Information
              </h2>
              
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 mt-1" style={{ color: RG }} />
                <div>
                  <p className="font-mono text-[9px] tracking-[0.2em] uppercase mb-1" style={{ color: 'rgba(230,183,173,0.4)' }}>
                    Location
                  </p>
                  <p className="font-heading" style={{ color: 'rgba(245,239,230,0.85)' }}>
                    Corpus Christi, Texas, U.S.A.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 mt-1" style={{ color: RG }} />
                <div>
                  <p className="font-mono text-[9px] tracking-[0.2em] uppercase mb-1" style={{ color: 'rgba(230,183,173,0.4)' }}>
                    Email
                  </p>
                  <a href="mailto:info@torchrepublic.com" className="font-heading hover:underline" style={{ color: RG }}>
                    info@torchrepublic.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 mt-1" style={{ color: RG }} />
                <div>
                  <p className="font-mono text-[9px] tracking-[0.2em] uppercase mb-1" style={{ color: 'rgba(230,183,173,0.4)' }}>
                    Business Hours
                  </p>
                  <p className="font-heading" style={{ color: 'rgba(245,239,230,0.85)' }}>
                    Monday - Friday: 9AM - 6PM CST
                  </p>
                  <p className="font-heading text-sm" style={{ color: 'rgba(245,239,230,0.6)' }}>
                    Saturday - Sunday: Closed
                  </p>
                </div>
              </div>
            </motion.div>

            {/* About */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-serif font-bold text-2xl mb-6" style={{ color: '#F7F2E9' }}>
                About Our Business
              </h2>
              <p className="font-heading leading-relaxed" style={{ color: 'rgba(245,239,230,0.85)' }}>
                Torch Republic Coffee Company is a U.S.-owned small business based in Corpus Christi, Texas. We specialize in premium instant coffee, functional mushroom coffee, and ceremonial matcha designed for intentional daily rituals.
              </p>
              <p className="font-heading leading-relaxed" style={{ color: 'rgba(245,239,230,0.85)' }}>
                Our products are crafted for modern life — no machine needed, just add hot water and enjoy quality coffee in seconds. We're committed to supporting focus, clarity, and wellness through our functional beverage blends.
              </p>
              
              <div className="pt-4">
                <p className="font-mono text-[9px] tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.4)' }}>
                  Business Entity
                </p>
                <p className="font-heading text-sm" style={{ color: 'rgba(245,239,230,0.7)' }}>
                  Torch Republic Coffee Company is a DBA of LiberTees For All Apparel LLC
                </p>
              </div>
            </motion.div>
          </div>

          {/* Service Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 md:p-8"
            style={{ 
              background: 'rgba(230,183,173,0.03)', 
              border: '1px solid rgba(230,183,173,0.08)',
              borderRadius: '4px'
            }}
          >
            <h2 className="font-serif font-bold text-2xl mb-4" style={{ color: '#F7F2E9' }}>
              Service Area
            </h2>
            <p className="font-heading mb-6" style={{ color: 'rgba(245,239,230,0.85)' }}>
              We proudly serve customers across the United States with fast, reliable shipping. All orders are processed and shipped from our U.S. facility.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4" style={{ background: 'rgba(230,183,173,0.05)', borderRadius: '4px' }}>
                <p className="font-serif font-bold text-lg" style={{ color: RG }}>Nationwide</p>
                <p className="font-mono text-[8px] tracking-[0.15em] uppercase mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>Free Shipping $45+</p>
              </div>
              <div className="text-center p-4" style={{ background: 'rgba(230,183,173,0.05)', borderRadius: '4px' }}>
                <p className="font-serif font-bold text-lg" style={{ color: RG }}>Secure</p>
                <p className="font-mono text-[8px] tracking-[0.15em] uppercase mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>256-bit SSL</p>
              </div>
              <div className="text-center p-4" style={{ background: 'rgba(230,183,173,0.05)', borderRadius: '4px' }}>
                <p className="font-serif font-bold text-lg" style={{ color: RG }}>Fast</p>
                <p className="font-mono text-[8px] tracking-[0.15em] uppercase mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>2-5 Business Days</p>
              </div>
              <div className="text-center p-4" style={{ background: 'rgba(230,183,173,0.05)', borderRadius: '4px' }}>
                <p className="font-serif font-bold text-lg" style={{ color: RG }}>Guaranteed</p>
                <p className="font-mono text-[8px] tracking-[0.15em] uppercase mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>30-Day Returns</p>
              </div>
            </div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="font-mono text-[9px] tracking-[0.2em] uppercase mb-6" style={{ color: 'rgba(230,183,173,0.4)' }}>
              Trusted By Customers Nationwide
            </p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              <div className="text-center">
                <p className="font-serif font-bold text-3xl" style={{ color: RG }}>4.9</p>
                <p className="font-mono text-[8px] tracking-[0.15em] uppercase mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Average Rating</p>
              </div>
              <div className="text-center">
                <p className="font-serif font-bold text-3xl" style={{ color: RG }}>1000+</p>
                <p className="font-mono text-[8px] tracking-[0.15em] uppercase mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Happy Customers</p>
              </div>
              <div className="text-center">
                <p className="font-serif font-bold text-3xl" style={{ color: RG }}>100%</p>
                <p className="font-mono text-[8px] tracking-[0.15em] uppercase mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>U.S. Based</p>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link
              to="/shop"
              className="inline-block font-mono text-[11px] tracking-[0.25em] uppercase font-bold transition-all hover:opacity-90"
              style={{ background: RG, color: '#080808', padding: '16px 44px', borderRadius: '2px' }}
            >
              Shop Our Products →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="px-6 md:px-10 py-12" style={{ background: '#0A0807' }}>
        <div className="max-w-[1000px] mx-auto text-center">
          <p className="font-mono text-[9px] tracking-[0.2em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.4)' }}>
            Service Region
          </p>
          <div 
            className="w-full h-64 md:h-80 flex items-center justify-center"
            style={{ 
              background: 'rgba(230,183,173,0.03)', 
              border: '1px solid rgba(230,183,173,0.08)',
              borderRadius: '4px'
            }}
          >
            <div className="text-center">
              <MapPin className="w-12 h-12 mx-auto mb-3" style={{ color: 'rgba(230,183,173,0.3)' }} />
              <p className="font-heading" style={{ color: 'rgba(245,239,230,0.6)' }}>
                Corpus Christi, Texas
              </p>
              <p className="font-mono text-[8px] tracking-[0.15em] uppercase mt-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Serving the United States
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}