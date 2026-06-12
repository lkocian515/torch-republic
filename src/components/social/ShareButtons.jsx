import React, { useState } from 'react';
import { Share2, Check, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RG = '#E6B7AD';

export default function ShareButtons({ title, url, compact = false }) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const fullUrl = url ? `${window.location.origin}${url}` : window.location.href;
  const text = `${title} — ${fullUrl}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({ title, url: fullUrl });
    } else {
      handleCopy();
    }
  };

  if (compact) {
    return (
      <button
        onClick={handleNativeShare}
        className="flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] uppercase transition-all hover:opacity-80"
        style={{ color: `${RG}60` }}
      >
        <Share2 size={14} /> Share
      </button>
    );
  }

  return (
    <>
      <div>
        <p className="font-mono text-[7px] tracking-[0.25em] uppercase mb-2.5" style={{ color: 'rgba(240,235,225,0.3)' }}>
          Share
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank')}
            className="font-mono text-[7px] tracking-[0.2em] uppercase px-3 py-2 transition-all hover:opacity-80"
            style={{ background: 'rgba(29,161,242,0.1)', color: '#1DA1F2', border: '1px solid rgba(29,161,242,0.25)', borderRadius: '3px' }}
          >
            𝕏 Twitter
          </button>
          <button
            onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`, '_blank')}
            className="font-mono text-[7px] tracking-[0.2em] uppercase px-3 py-2 transition-all hover:opacity-80"
            style={{ background: 'rgba(24,119,242,0.1)', color: '#1877F2', border: '1px solid rgba(24,119,242,0.25)', borderRadius: '3px' }}
          >
            Facebook
          </button>
          <button
            onClick={() => window.open(`https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(fullUrl)}&description=${encodeURIComponent(title)}`, '_blank')}
            className="font-mono text-[7px] tracking-[0.2em] uppercase px-3 py-2 transition-all hover:opacity-80"
            style={{ background: 'rgba(230,0,35,0.1)', color: '#E60023', border: '1px solid rgba(230,0,35,0.25)', borderRadius: '3px' }}
          >
            Pinterest
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 font-mono text-[7px] tracking-[0.2em] uppercase px-3 py-2 transition-all hover:opacity-80"
            style={{ background: `${RG}10`, color: copied ? '#10B981' : RG, border: `1px solid ${copied ? '#10B98140' : `${RG}30`}`, borderRadius: '3px' }}
          >
            {copied ? <Check size={12} /> : <LinkIcon size={12} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Share Modal for larger screens */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-6"
            style={{ background: 'rgba(0,0,0,0.85)' }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md p-6 rounded-lg"
              style={{ background: '#0E0C0B', border: `1px solid ${RG}30` }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Preview */}
              {url && (
                <div className="mb-4">
                  <div className="w-full aspect-video rounded-lg overflow-hidden" style={{ background: 'rgba(230,183,173,0.05)' }}>
                    <img src={fullUrl} alt={title} className="w-full h-full object-cover" onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }} />
                    <div className="w-full h-full hidden items-center justify-center" style={{ background: 'rgba(230,183,173,0.05)' }}>
                      <div className="text-center">
                        <ImageIcon size={48} style={{ color: `${RG}40`, marginBottom: '12px' }} />
                        <p className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: `${RG}50` }}>No Image</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Title & URL */}
              <div className="mb-6">
                <h4 className="font-serif font-bold text-lg mb-2" style={{ color: '#F5EFE6' }}>{title}</h4>
                <div className="flex items-center gap-2" style={{ color: `${RG}60` }}>
                  <LinkIcon size={12} />
                  <p className="font-mono text-[8px] tracking-[0.15em]" style={{ color: `${RG}50` }}>{url}</p>
                </div>
              </div>

              {/* Share Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleNativeShare}
                  className="w-full flex items-center justify-center gap-2 font-mono text-[9px] tracking-[0.25em] uppercase font-bold py-3 transition-all hover:opacity-90 rounded"
                  style={{ background: RG, color: '#080808' }}
                >
                  <Share2 size={14} /> Share This Article
                </button>
                <button
                  onClick={handleCopy}
                  className="w-full flex items-center justify-center gap-2 font-mono text-[8px] tracking-[0.2em] uppercase py-2.5 transition-all hover:opacity-80 rounded"
                  style={{ background: `${RG}10`, color: copied ? '#10B981' : RG, border: `1px solid ${copied ? '#10B98140' : `${RG}30`}` }}
                >
                  {copied ? <Check size={14} /> : <LinkIcon size={14} />}
                  {copied ? 'Link Copied!' : 'Copy Link'}
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="mt-4 w-full font-mono text-[8px] tracking-[0.2em] uppercase py-2 transition-all hover:opacity-80"
                style={{ color: `${RG}50` }}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}