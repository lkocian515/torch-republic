import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { createPageUrl } from '@/utils';

export default function BrandStoryPreview() {
  return (
    <section className="py-20 px-6" style={{ backgroundColor: '#0B0B0B' }}>
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-white mb-2">
            The Torch Republic Story
          </h2>
          <div className="h-1 w-12" style={{ backgroundColor: '#C8A44D' }} />
        </div>

        {/* Story content */}
        <div className="space-y-6 mb-12">
          <p className="text-gray-300 text-lg leading-relaxed">
            Torch Republic was born from a simple conviction: clothing should reflect what you stand for. We design apparel for people who value faith, freedom, family, and the principles that built this country—without apology, without compromise.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Every design is intentional. Every detail matters. We don't do generic patriotism or cheap merch. We do heritage, craftsmanship, and pieces that last. Wear them to declare what you believe. Pass them down as part of your legacy.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            This is more than a brand. It's a movement for those who refuse to stay silent about what matters most.
          </p>
        </div>

        {/* CTA */}
        <Link
          to={createPageUrl('Mission')}
          className="inline-flex items-center gap-2 font-heading font-black text-sm tracking-widest uppercase transition-all hover:gap-3"
          style={{ color: '#C8A44D' }}
        >
          Read Our Full Mission <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}