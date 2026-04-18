import React from 'react';
import CollectionPageTemplate from '../components/collections/CollectionPageTemplate';
import { Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Patriots() {
  return (
    <CollectionPageTemplate
      bannerImage="https://images.unsplash.com/photo-1569025591790-f54b6a9f4c2c?w=1600&q=85"
      eyebrow="Torch Republic"
      title="Patriots"
      subtitle="For those who stand firm. Everyday courage, brewed strong."
      description="Patriotism isn't a bumper sticker. It's the quiet discipline of showing up — to your family, your community, your country — when it would be easier not to. The Patriots collection honors that daily commitment."
      quote="Endurance is the real flex."
      accentColor="#C9A24A"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center py-20 px-6"
        style={{ border: '1px solid rgba(201,162,74,0.1)', background: 'rgba(201,162,74,0.03)' }}
      >
        <div className="flex items-center justify-center w-14 h-14 mx-auto mb-6"
          style={{ border: '1px solid rgba(201,162,74,0.2)', background: 'rgba(201,162,74,0.06)' }}>
          <Flame className="w-6 h-6" style={{ color: 'rgba(201,162,74,0.5)' }} />
        </div>
        <p className="font-mono text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(201,162,74,0.45)' }}>
          Coming Soon
        </p>
        <p className="font-serif text-xl mb-2" style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 700 }}>
          This series is being crafted.
        </p>
        <p className="font-heading max-w-md mx-auto" style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.3)', lineHeight: 1.85, fontWeight: 300 }}>
          The Patriots collection will honor everyday Americans who showed up — not for glory, but because it was right. Each blend tells a story of ordinary courage.
        </p>
      </motion.div>
    </CollectionPageTemplate>
  );
}