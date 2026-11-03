/**
 * ArticleShareBar — global, reusable social-sharing component for editorial content.
 *
 * Shows the native device Share sheet first on supporting mobile devices, then
 * Facebook, X, LinkedIn, Pinterest, WhatsApp, Email, and Copy Link.
 *
 * Shares the live torchrepublic.com canonical URL (never a preview domain),
 * uses the article title as share text, and the excerpt/featured image where
 * platforms support them. Fires one `article_share` analytics event per click.
 *
 * Used on: Journal/blog posts, Knowledge articles, Research, substantial
 * comparison articles. Not on product/cart/checkout/account/admin/policy pages.
 */
import React, { useState, useEffect, useCallback } from 'react';
import { Facebook, Twitter, Linkedin, Mail, Link as LinkIcon, Check, Share2, MessageCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { resolveLiveUrl, resolveImageUrl } from '@/lib/articleSocialMeta';

const RG = '#E6AC45';

/**
 * @param {object} props
 * @param {string} props.title       - Article headline (used as share text)
 * @param {string} props.url         - Canonical path, e.g. '/journal/coffee-pods-plastic-waste-microplastics'
 * @param {string} [props.excerpt]   - Article excerpt (used for platforms that support it)
 * @param {string} [props.image]     - Absolute featured image URL
 * @param {string} [props.slug]      - Article slug (analytics)
 * @param {string} [props.contentType='article'] - Analytics content_type
 * @param {'top'|'bottom'} [props.location='top']
 * @param {boolean} [props.compact=false] - Compact header variant (no big heading)
 */
export default function ArticleShareBar({
  title,
  url,
  excerpt,
  image,
  slug,
  contentType = 'article',
  location = 'top',
  compact = false,
}) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  const liveUrl = resolveLiveUrl(url);
  const liveImage = resolveImageUrl(image);
  const shareText = title || '';
  const shareDescription = excerpt || title || '';

  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function');
  }, []);

  const trackShare = useCallback((platform) => {
    try {
      base44.analytics?.track?.({
        eventName: 'article_share',
        properties: {
          article_slug: slug || '',
          article_title: title || '',
          share_platform: platform,
          share_location: location,
          content_type: contentType,
        },
      });
    } catch { /* analytics must never block the share */ }
  }, [slug, title, location, contentType]);

  const openShare = (shareUrl) => {
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=560');
  };

  const handleFacebook = () => {
    trackShare('facebook');
    openShare(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(liveUrl)}`);
  };

  const handleX = () => {
    trackShare('x');
    openShare(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(liveUrl)}`);
  };

  const handleLinkedIn = () => {
    trackShare('linkedin');
    openShare(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(liveUrl)}`);
  };

  const handlePinterest = () => {
    trackShare('pinterest');
    openShare(
      `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(liveUrl)}&description=${encodeURIComponent(shareText)}&media=${encodeURIComponent(liveImage)}`
    );
  };

  const handleWhatsApp = () => {
    trackShare('whatsapp');
    const waText = encodeURIComponent(`${shareText} — ${liveUrl}`);
    // Use WhatsApp Desktop/web intent — works on mobile and desktop browsers.
    window.open(`https://wa.me/?text=${waText}`, '_blank', 'noopener,noreferrer');
  };

  const handleEmail = () => {
    trackShare('email');
    const subject = encodeURIComponent(shareText);
    const body = encodeURIComponent(`${shareDescription}\n\n${liveUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleNativeShare = async () => {
    trackShare('native');
    try {
      if (navigator.share) {
        await navigator.share({ title: shareText, text: shareDescription, url: liveUrl });
      }
    } catch { /* user cancelled — no action needed */ }
  };

  const handleCopy = async () => {
    trackShare('copy_link');
    try {
      await navigator.clipboard.writeText(liveUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard blocked */ }
  };

  const buttonBase =
    'inline-flex items-center justify-center gap-2 font-mono text-[8px] tracking-[0.18em] uppercase px-3 transition-all hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-gold min-h-[44px]';
  const nativeBtnStyle = { background: RG, color: '#080808', fontWeight: 700, border: `1px solid ${RG}` };
  const iconBtnStyle = (bg, color, bd) => ({ background: bg, color, border: `1px solid ${bd}`, borderRadius: '3px' });

  return (
    <div className="w-full" role="region" aria-label="Share this article">
      {!compact && (
        <p
          className="font-mono text-[8px] tracking-[0.35em] uppercase mb-3"
          style={{ color: 'rgba(240,235,225,0.4)' }}
        >
          Share This Article
        </p>
      )}

      <div className="flex flex-wrap gap-2 items-center">
        {/* Native Share — most prominent on supported mobile devices */}
        {canNativeShare && (
          <button
            type="button"
            onClick={handleNativeShare}
            aria-label="Share via device share sheet"
            className={`${buttonBase} font-bold`}
            style={nativeBtnStyle}
          >
            <Share2 size={13} /> Share
          </button>
        )}

        {/* Facebook */}
        <button
          type="button"
          onClick={handleFacebook}
          aria-label="Share on Facebook"
          className={buttonBase}
          style={iconBtnStyle('rgba(24,119,242,0.10)', '#1877F2', 'rgba(24,119,242,0.28)')}
        >
          <Facebook size={13} /> Facebook
        </button>

        {/* X (Twitter) */}
        <button
          type="button"
          onClick={handleX}
          aria-label="Share on X"
          className={buttonBase}
          style={iconBtnStyle('rgba(230,235,255,0.06)', '#E7E9EA', 'rgba(231,233,234,0.22)')}
        >
          <Twitter size={13} /> X
        </button>

        {/* LinkedIn */}
        <button
          type="button"
          onClick={handleLinkedIn}
          aria-label="Share on LinkedIn"
          className={buttonBase}
          style={iconBtnStyle('rgba(10,102,194,0.10)', '#0A66C2', 'rgba(10,102,194,0.28)')}
        >
          <Linkedin size={13} /> LinkedIn
        </button>

        {/* Pinterest */}
        <button
          type="button"
          onClick={handlePinterest}
          aria-label="Share on Pinterest"
          className={buttonBase}
          style={iconBtnStyle('rgba(230,0,35,0.10)', '#E60023', 'rgba(230,0,35,0.28)')}
        >
          {/* Pinterest-brand glyph via lucide Placeholder is not bundled; use a P initial */}
          <span style={{ fontWeight: 700, fontSize: '13px', lineHeight: 1 }}>P</span> Pinterest
        </button>

        {/* WhatsApp */}
        <button
          type="button"
          onClick={handleWhatsApp}
          aria-label="Share on WhatsApp"
          className={buttonBase}
          style={iconBtnStyle('rgba(37,211,102,0.10)', '#25D366', 'rgba(37,211,102,0.28)')}
        >
          <MessageCircle size={13} /> WhatsApp
        </button>

        {/* Email */}
        <button
          type="button"
          onClick={handleEmail}
          aria-label="Share via email"
          className={buttonBase}
          style={iconBtnStyle(`${RG}10`, RG, `${RG}30`)}
        >
          <Mail size={13} /> Email
        </button>

        {/* Copy Link — visible confirmation */}
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy article link"
          className={buttonBase}
          style={iconBtnStyle(copied ? 'rgba(16,185,129,0.12)' : `${RG}10`, copied ? '#264A35' : RG, copied ? 'rgba(16,185,129,0.4)' : `${RG}30`)}
        >
          {copied ? <Check size={13} /> : <LinkIcon size={13} />}
          {copied ? 'Link Copied' : 'Copy Link'}
        </button>
      </div>
    </div>
  );
}