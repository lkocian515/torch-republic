import React, { useState } from 'react';
import { Share2, Check, Link as LinkIcon } from 'lucide-react';

// Sophisticated share buttons — unified brand palette instead of pastel
// platform colors. All buttons share one style: subtle outlined pill on
// light backgrounds, filled on hover. Works on product pages and articles.
const BTN_BASE = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.375rem',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.625rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  fontWeight: 600,
  padding: '0.5rem 0.75rem',
  borderRadius: '4px',
  border: '1px solid #E4D8C9',
  background: 'transparent',
  color: '#5F574F',
  cursor: 'pointer',
  transition: 'background-color .2s ease, color .2s ease, border-color .2s ease',
};

const BTN_HOVER = '#B7653E';

export default function ShareButtons({ title, url, image, compact = false }) {
  const [copied, setCopied] = useState(false);
  const fullUrl = url ? `${window.location.origin}${url}` : window.location.href;
  const imageUrl = image || '';
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
        className="flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] uppercase font-semibold transition-opacity hover:opacity-70"
        style={{ color: '#7A5C23' }}
      >
        <Share2 size={14} /> Share
      </button>
    );
  }

  return (
    <div>
      <p className="font-mono text-[9px] tracking-[0.2em] uppercase mb-2.5 font-semibold" style={{ color: '#7A5C23' }}>
        Share
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank')}
          style={BTN_BASE}
          onMouseEnter={(e) => { e.currentTarget.style.background = BTN_HOVER; e.currentTarget.style.color = '#FBF8F1'; e.currentTarget.style.borderColor = BTN_HOVER; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#5F574F'; e.currentTarget.style.borderColor = '#E4D8C9'; }}
        >
          <Share2 size={12} /> Post
        </button>
        <button
          onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`, '_blank')}
          style={BTN_BASE}
          onMouseEnter={(e) => { e.currentTarget.style.background = BTN_HOVER; e.currentTarget.style.color = '#FBF8F1'; e.currentTarget.style.borderColor = BTN_HOVER; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#5F574F'; e.currentTarget.style.borderColor = '#E4D8C9'; }}
        >
          <Share2 size={12} /> Share
        </button>
        <button
          onClick={() => window.open(`https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(fullUrl)}&description=${encodeURIComponent(title)}&media=${encodeURIComponent(imageUrl)}`, '_blank')}
          style={BTN_BASE}
          onMouseEnter={(e) => { e.currentTarget.style.background = BTN_HOVER; e.currentTarget.style.color = '#FBF8F1'; e.currentTarget.style.borderColor = BTN_HOVER; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#5F574F'; e.currentTarget.style.borderColor = '#E4D8C9'; }}
        >
          <Share2 size={12} /> Pin
        </button>
        <button
          onClick={handleCopy}
          style={{ ...BTN_BASE, color: copied ? '#5A7A4E' : '#5F574F', borderColor: copied ? '#5A7A4E' : '#E4D8C9' }}
          onMouseEnter={(e) => { if (!copied) { e.currentTarget.style.background = BTN_HOVER; e.currentTarget.style.color = '#FBF8F1'; e.currentTarget.style.borderColor = BTN_HOVER; } }}
          onMouseLeave={(e) => { if (!copied) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#5F574F'; e.currentTarget.style.borderColor = '#E4D8C9'; } }}
        >
          {copied ? <Check size={12} /> : <LinkIcon size={12} />}
          {copied ? 'Copied' : 'Copy Link'}
        </button>
      </div>
    </div>
  );
}