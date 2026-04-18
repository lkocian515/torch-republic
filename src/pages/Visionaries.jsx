import React from 'react';
import CollectionPageTemplate from '../components/collections/CollectionPageTemplate';
import { Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Visionaries() {
  return (
    <CollectionPageTemplate
      bannerImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=85"
      eyebrow="Torch Republic"
      title="Visionaries"
      subtitle="Ideas that changed the world. Coffee for those who think ahead."
      description="History wasn't built by those who accepted the world as it was. It was built by those who saw what it could become — and had the nerve to say so. The Visionaries collection is coming for the ones who still think that way."
      quote="The future belongs to those who prepare for it today."
      quoteAttrib="Malcolm X"
      accentColor="#9BB8CC"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center py-20 px-6"
        style={{ border: '1px solid rgba(155,184,204,0.1)', background: 'rgba(155,184,204,0.03)' }}
      >
        <div className="flex items-center justify-center w-14 h-14 mx-auto mb-6"
          style={{ border: '1px solid rgba(155,184,204,0.2)', background: 'rgba(155,184,204,0.06)' }}>
          <Flame className="w-6 h-6" style={{ color: 'rgba(155,184,204,0.5)' }} />
        </div>
        <p className="font-mono text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(155,184,204,0.45)' }}>
          Coming Soon
        </p>
        <p className="font-serif text-xl mb-2" style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 700 }}>
          This series is being crafted.
        </p>
        <p className="font-heading max-w-md mx-auto" style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.3)', lineHeight: 1.85, fontWeight: 300 }}>
          The Visionaries collection will honor the thinkers, builders, and inventors who dared to imagine a better world. Each blend will carry a story worth knowing.
        </p>
      </motion.div>
    </CollectionPageTemplate>
  );
}