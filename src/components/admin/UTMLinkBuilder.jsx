/**
 * UTM Link Builder — Admin only, used inside TrafficGrowthCenter
 * Generates clean, copyable UTM-tagged URLs for campaigns.
 * Does NOT publish links automatically.
 */
import React, { useState } from 'react';
import { Copy, CheckCircle, ExternalLink } from 'lucide-react';
import MobileSelectDrawer from '@/components/forms/MobileSelectDrawer';

const RG = '#E6B7AD';
const BASE = 'https://torchrepublic.com';

const PRESETS = [
  {
    label: 'Facebook Organic',
    values: { source: 'facebook', medium: 'social', campaign: '', content: '', term: '' },
  },
  {
    label: 'Facebook Paid',
    values: { source: 'facebook', medium: 'paid_social', campaign: '', content: '', term: '' },
  },
  {
    label: 'Instagram Organic',
    values: { source: 'instagram', medium: 'social', campaign: '', content: '', term: '' },
  },
  {
    label: 'Instagram Paid',
    values: { source: 'instagram', medium: 'paid_social', campaign: '', content: '', term: '' },
  },
  {
    label: 'TikTok Organic',
    values: { source: 'tiktok', medium: 'social', campaign: '', content: '', term: '' },
  },
  {
    label: 'TikTok Paid',
    values: { source: 'tiktok', medium: 'paid_social', campaign: '', content: '', term: '' },
  },
  {
    label: 'Email',
    values: { source: 'klaviyo', medium: 'email', campaign: '', content: '', term: '' },
  },
  {
    label: 'QR Code',
    values: { source: 'qr', medium: 'offline', campaign: '', content: '', term: '' },
  },
];

const DESTINATION_PRESETS = [
  { label: 'Homepage', path: '/' },
  { label: 'Shop All', path: '/shop' },
  { label: 'Mushroom Coffee', path: '/shop/instant-mushroom-coffee' },
  { label: 'Classic Coffee', path: '/shop/instant-coffee' },
  { label: 'Matcha', path: '/shop/matcha' },
  { label: 'Build Your Ritual', path: '/build-your-ritual' },
  { label: 'Subscribe & Save', path: '/subscription' },
  { label: 'Blend Quiz', path: '/quiz' },
];

export default function UTMLinkBuilder() {
  const [destination, setDestination] = useState('/shop');
  const [customDestination, setCustomDestination] = useState('');
  const [fields, setFields] = useState({ source: '', medium: '', campaign: '', content: '', term: '' });
  const [copied, setCopied] = useState(false);

  const applyPreset = (preset) => {
    setFields({ ...preset.values });
  };

  const getDestinationPath = () => {
    return customDestination.trim() || destination;
  };

  const buildURL = () => {
    const path = getDestinationPath();
    const base = `${BASE}${path.startsWith('/') ? path : '/' + path}`;
    const params = new URLSearchParams();
    if (fields.source.trim()) params.set('utm_source', fields.source.trim());
    if (fields.medium.trim()) params.set('utm_medium', fields.medium.trim());
    if (fields.campaign.trim()) params.set('utm_campaign', fields.campaign.trim());
    if (fields.content.trim()) params.set('utm_content', fields.content.trim());
    if (fields.term.trim()) params.set('utm_term', fields.term.trim());
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  };

  const finalURL = buildURL();
  const isValid = fields.source.trim() && fields.medium.trim() && fields.campaign.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(finalURL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const inputStyle = {
    background: '#141312',
    border: '1px solid rgba(230,183,173,0.15)',
    color: '#F5EFE6',
    padding: '10px 12px',
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    letterSpacing: '0.05em',
    width: '100%',
    outline: 'none',
  };

  return (
    <div style={{ background: '#0A0908', border: '1px solid rgba(230,183,173,0.1)' }}>
      {/* Header */}
      <div className="px-6 py-5" style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <p className="font-mono text-[11px] tracking-[0.3em] uppercase mb-1" style={{ color: RG }}>UTM Link Builder</p>
        <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 300 }}>
          Build clean campaign URLs for social, email, and offline traffic. Links are not published automatically.
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Preset Buttons */}
        <div>
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.5)' }}>Quick Presets</p>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.label}
                onClick={() => applyPreset(preset)}
                className="font-mono text-[9px] tracking-[0.15em] uppercase px-3 py-1.5 transition-all hover:opacity-80"
                style={{ border: '1px solid rgba(230,183,173,0.2)', color: 'rgba(230,183,173,0.8)', background: 'transparent' }}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Destination */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-mono text-[9px] tracking-[0.2em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.5)' }}>Destination Page</p>
            <MobileSelectDrawer
              value={destination}
              onChange={value => { setDestination(value); setCustomDestination(''); }}
              options={DESTINATION_PRESETS.map(d => ({ value: d.path, label: `${d.label} (${d.path})` }))}
              title="Choose destination"
              style={{ ...inputStyle, cursor: 'pointer' }}
            />
          </div>
          <div>
            <p className="font-mono text-[9px] tracking-[0.2em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.5)' }}>Custom Path (overrides above)</p>
            <input
              type="text"
              placeholder="/shop/instant-mushroom-coffee"
              value={customDestination}
              onChange={e => setCustomDestination(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        {/* UTM Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { key: 'source', label: 'utm_source *', placeholder: 'facebook, instagram, tiktok' },
            { key: 'medium', label: 'utm_medium *', placeholder: 'social, email, paid_social' },
            { key: 'campaign', label: 'utm_campaign *', placeholder: 'summer-launch-2026' },
            { key: 'content', label: 'utm_content', placeholder: 'hero-image, link-in-bio' },
            { key: 'term', label: 'utm_term', placeholder: 'mushroom coffee (paid search)' },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <p className="font-mono text-[9px] tracking-[0.2em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.5)' }}>{label}</p>
              <input
                type="text"
                placeholder={placeholder}
                value={fields[key]}
                onChange={e => setFields(f => ({ ...f, [key]: e.target.value }))}
                style={inputStyle}
              />
            </div>
          ))}
        </div>

        {/* Generated URL */}
        <div>
          <p className="font-mono text-[9px] tracking-[0.2em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.5)' }}>
            Generated URL {!isValid && <span style={{ color: '#E8697A' }}>— Fill source, medium, campaign to validate</span>}
          </p>
          <div
            className="flex items-stretch gap-0"
            style={{ border: `1px solid ${isValid ? 'rgba(108,189,90,0.3)' : 'rgba(230,183,173,0.15)'}` }}
          >
            <div
              className="flex-1 p-3 font-mono text-[10px] break-all select-all"
              style={{ background: '#141312', color: isValid ? '#F5EFE6' : 'rgba(240,235,225,0.35)', lineHeight: 1.6 }}
            >
              {finalURL}
            </div>
            <div className="flex flex-col border-l" style={{ borderColor: 'rgba(230,183,173,0.15)' }}>
              <button
                onClick={handleCopy}
                disabled={!isValid}
                className="flex items-center gap-1.5 px-4 py-2 font-mono text-[9px] tracking-[0.1em] uppercase transition-all hover:opacity-80 disabled:opacity-30 h-full"
                style={{ color: copied ? '#6CBD5A' : RG, background: 'transparent', border: 'none', cursor: isValid ? 'pointer' : 'not-allowed' }}
              >
                {copied ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>

        {/* Preview link */}
        {isValid && (
          <a
            href={finalURL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] uppercase transition-all hover:opacity-70"
            style={{ color: 'rgba(230,183,173,0.5)', borderBottom: '1px solid rgba(230,183,173,0.2)', paddingBottom: '1px' }}
          >
            Preview destination <ExternalLink className="w-3 h-3" />
          </a>
        )}

        {/* GA4 Instructions */}
        <div className="p-4 text-xs space-y-1" style={{ background: 'rgba(230,183,173,0.04)', border: '1px solid rgba(230,183,173,0.1)' }}>
          <p className="font-mono text-[9px] tracking-[0.2em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.5)' }}>GA4 Internal Traffic Filter Setup</p>
          <p className="font-heading" style={{ color: 'rgba(240,235,225,0.6)', fontWeight: 300, lineHeight: 1.6 }}>
            1. Go to GA4 → Admin → Data Settings → Data Filters → Create Filter → Internal Traffic.<br/>
            2. Set rule: <strong style={{ color: RG }}>traffic_type</strong> equals <strong style={{ color: RG }}>internal</strong>.<br/>
            3. Set filter state to <strong>Testing</strong> first. Verify in GA4 Realtime that your own sessions appear under "Internal Traffic" dimension.<br/>
            4. Only after verification, change state to <strong>Active</strong>.<br/>
            5. Your admin sessions are automatically tagged by the analytics hook in this app.
          </p>
        </div>
      </div>
    </div>
  );
}