import React from 'react';
import { Star } from 'lucide-react';

export default function SocialProof() {
  return (
    <section className="py-16 px-6 border-t" style={{ backgroundColor: '#000', borderColor: 'rgba(200,164,77,0.1)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Reviews */}
          <div className="text-center border-r" style={{ borderColor: 'rgba(200,164,77,0.1)' }}>
            <div className="flex items-center justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-white font-heading font-bold text-2xl mb-1">4.9/5</p>
            <p className="text-gray-500 font-mono text-xs">Based on 2,400+ reviews</p>
          </div>

          {/* Shipping */}
          <div className="text-center border-r" style={{ borderColor: 'rgba(200,164,77,0.1)' }}>
            <p className="text-primary font-heading font-black text-2xl mb-1">Fast U.S.</p>
            <p className="text-gray-500 font-mono text-xs">Ships within 2 business days</p>
          </div>

          {/* Purpose */}
          <div className="text-center">
            <p className="text-white font-heading font-bold text-2xl mb-1">Built with Purpose</p>
            <p className="text-gray-500 font-mono text-xs">American-made, faith-driven brand</p>
          </div>
        </div>
      </div>
    </section>
  );
}