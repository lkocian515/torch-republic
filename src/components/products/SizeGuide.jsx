import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const SIZE_CHARTS = {
  'tshirts': {
    label: 'T-Shirts',
    sizes: [
      { size: 'XS', chest: '32-34"', length: '27"' },
      { size: 'S', chest: '34-36"', length: '28"' },
      { size: 'M', chest: '38-40"', length: '29"' },
      { size: 'L', chest: '42-44"', length: '30"' },
      { size: 'XL', chest: '46-48"', length: '31"' },
      { size: 'XXL', chest: '50-52"', length: '32"' },
    ],
  },
  'hoodies': {
    label: 'Hoodies',
    sizes: [
      { size: 'XS', chest: '34-36"', length: '27"' },
      { size: 'S', chest: '36-38"', length: '28"' },
      { size: 'M', chest: '40-42"', length: '29"' },
      { size: 'L', chest: '44-46"', length: '30"' },
      { size: 'XL', chest: '48-50"', length: '31"' },
      { size: 'XXL', chest: '52-54"', length: '32"' },
    ],
  },
  'hats': {
    label: 'Hats',
    sizes: [
      { size: 'One Size', fit: 'Adjustable back strap', note: 'Fits most' },
    ],
  },
};

export default function SizeGuide({ isOpen, onClose, category = 'tshirts' }) {
  const chart = SIZE_CHARTS[category] || SIZE_CHARTS['tshirts'];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-40"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="bg-card border rounded w-full max-w-md max-h-[80vh] overflow-y-auto"
              style={{ borderColor: 'rgba(200,164,77,0.3)' }}
            >
              {/* Header */}
              <div className="sticky top-0 flex items-center justify-between p-6 border-b" style={{ borderColor: 'rgba(200,164,77,0.2)' }}>
                <h2 className="text-lg font-heading font-bold uppercase tracking-wide text-foreground">
                  Size Guide
                </h2>
                <button
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-heading font-bold text-foreground mb-4">
                  {chart.label}
                </h3>

                {/* Size table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b" style={{ borderColor: 'rgba(200,164,77,0.2)' }}>
                        <th className="text-left py-2 px-3 font-mono font-bold text-primary text-xs">Size</th>
                        {chart.sizes[0].chest && <th className="text-left py-2 px-3 font-mono font-bold text-primary text-xs">Chest</th>}
                        {chart.sizes[0].length && <th className="text-left py-2 px-3 font-mono font-bold text-primary text-xs">Length</th>}
                        {chart.sizes[0].fit && <th className="text-left py-2 px-3 font-mono font-bold text-primary text-xs">Fit</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {chart.sizes.map((row, idx) => (
                        <tr
                          key={idx}
                          className="border-b"
                          style={{ borderColor: 'rgba(200,164,77,0.1)' }}
                        >
                          <td className="py-2 px-3 font-mono font-bold text-foreground">{row.size}</td>
                          {row.chest && <td className="py-2 px-3 font-mono text-muted-foreground text-xs">{row.chest}</td>}
                          {row.length && <td className="py-2 px-3 font-mono text-muted-foreground text-xs">{row.length}</td>}
                          {row.fit && <td className="py-2 px-3 font-mono text-muted-foreground text-xs">{row.fit}</td>}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Help text */}
                <p className="text-xs text-muted-foreground mt-6 leading-relaxed">
                  Measurements are approximate and may vary slightly. For the best fit, measure yourself and compare with the size chart above. If between sizes, we recommend sizing up.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}