import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';

/**
 * Image upload for storefront artwork. Files are stored publicly
 * (stored publicly — anyone with the link can open them) because the
 * storefront, social cards and structured data all need a plain URL.
 */
export default function ImageField({ label, value, onChange, hint }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const handleFile = async (file) => {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const { file_url } = await base44.integrations.Core.UploadPublicFile({ file });
      onChange(file_url);
    } catch {
      setError('Upload failed. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <label>{label}</label>
      {hint && (
        <p className="mt-1 text-readable-secondary" style={{ fontSize: '0.75rem' }}>
          {hint}
        </p>
      )}

      <div className="mt-2 flex items-center gap-3">
        {value ? (
          <div style={{ width: 72, height: 72, border: '1px solid hsl(var(--border))', borderRadius: 10, overflow: 'hidden', background: '#F8F5EF' }}>
            <img src={value} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
        ) : (
          <div
            className="text-readable-secondary"
            style={{ width: 72, height: 72, border: '1px dashed hsl(var(--border))', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6875rem' }}
          >
            None
          </div>
        )}

        <button type="button" className="btn btn-secondary" disabled={busy} onClick={() => inputRef.current?.click()}>
          <Upload size={15} strokeWidth={2} />
          {busy ? 'Uploading...' : value ? 'Replace' : 'Upload'}
        </button>

        {value && (
          <button type="button" className="btn btn-ghost" onClick={() => onChange('')} aria-label={`Remove ${label}`}>
            <X size={15} strokeWidth={2} />
            Remove
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        style={{ display: 'none' }}
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = '';
        }}
      />

      {error && (
        <p className="mt-2" style={{ color: 'hsl(var(--destructive))', fontSize: '0.8125rem' }}>
          {error}
        </p>
      )}
    </div>
  );
}