import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';

const RG = '#E6B7AD';

export default function ShareButtons({ title, url, compact = false }) {
  const [copied, setCopied] = useState(false);
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
          {copied ? <Check size={10} /> : <Share2 size={10} />}
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  );
}