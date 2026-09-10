'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, CheckCircle2, AlertCircle, Loader2, Link as LinkIcon, X, RefreshCw } from 'lucide-react';

export default function ImageUploader({
  value = '',
  onChange,
  category = 'events',
  label = 'Image',
  helperText = 'Upload from device (saved to Cloudinary CDN) or enter image URL',
  className = ''
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'url'
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (file) => {
    if (!file) return;

    // Check if image file
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, WEBP, SVG, GIF).');
      return;
    }

    // Size limit check: 15MB
    if (file.size > 15 * 1024 * 1024) {
      setError('File size exceeds 15MB limit.');
      return;
    }

    setError('');
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', category);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to upload image');
      }

      // Propagate new image URL to parent component
      if (onChange) {
        onChange(data.url);
      }
    } catch (err) {
      console.error('Image upload failed:', err);
      setError(err.message || 'Image upload failed. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className={`space-y-2 font-outfit ${className}`}>
      {/* Label and Tab Switcher */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <ImageIcon size={13} className="text-[#2d5a3c]" />
          {label}
        </label>
        
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-2.5 py-1 rounded-md transition-all font-medium flex items-center gap-1 ${
              activeTab === 'upload'
                ? 'bg-white text-[#2d5a3c] shadow-xs font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <UploadCloud size={12} />
            Cloud Upload
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-2.5 py-1 rounded-md transition-all font-medium flex items-center gap-1 ${
              activeTab === 'url'
                ? 'bg-white text-[#2d5a3c] shadow-xs font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LinkIcon size={12} />
            URL / Path
          </button>
        </div>
      </div>

      {/* Upload Zone or URL Input */}
      {activeTab === 'upload' ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-4 transition-all cursor-pointer text-center group ${
            isDragOver
              ? 'border-[#2d5a3c] bg-emerald-50/50'
              : 'border-slate-200 hover:border-[#2d5a3c] bg-slate-50/60 hover:bg-emerald-50/20'
          } ${uploading ? 'pointer-events-none opacity-80' : ''}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp, image/gif, image/svg+xml"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileUpload(e.target.files[0]);
              }
            }}
          />

          <div className="flex flex-col items-center justify-center py-2">
            {uploading ? (
              <div className="flex flex-col items-center space-y-2">
                <Loader2 className="animate-spin text-[#2d5a3c]" size={28} />
                <p className="text-xs font-medium text-[#2d5a3c]">Uploading to Cloudinary CDN...</p>
              </div>
            ) : (
              <>
                <div className="w-10 h-10 rounded-full bg-emerald-100/80 text-[#2d5a3c] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform shadow-xs">
                  <UploadCloud size={20} />
                </div>
                <p className="text-xs font-medium text-slate-800">
                  <span className="text-[#2d5a3c] font-semibold underline decoration-[#2d5a3c]/30 underline-offset-2">Click to browse</span> or drag and drop
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Saved securely to <span className="font-mono text-slate-700 font-medium">Cloudinary CDN (universe/{category})</span>
                </p>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="relative">
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange && onChange(e.target.value)}
            placeholder={`/admin/${category}/image.png or https://...`}
            className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2d5a3c] focus:ring-2 focus:ring-[#2d5a3c]/10"
          />
          <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          {value && (
            <button
              type="button"
              onClick={() => onChange && onChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              <X size={13} />
            </button>
          )}
        </div>
      )}

      {/* Error alert */}
      {error && (
        <div className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-1.5 animate-fadeIn">
          <AlertCircle size={13} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Preview Box if value is present */}
      {value && (
        <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-12 h-12 rounded-lg border border-slate-200 overflow-hidden bg-slate-100 shrink-0 relative">
              <img
                src={value}
                alt="Uploaded preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/events/e1.png';
                }}
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                <CheckCircle2 size={12} />
                <span>Image Active</span>
              </div>
              <p className="text-[11px] text-slate-600 font-mono truncate max-w-[220px] sm:max-w-[320px]" title={value}>
                {value}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-2 py-1 text-[11px] font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors flex items-center gap-1"
              title="Replace Image"
            >
              <RefreshCw size={10} />
              Replace
            </button>
            <button
              type="button"
              onClick={() => onChange && onChange('')}
              className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
              title="Remove Image"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Helper text */}
      {helperText && !error && (
        <p className="text-[11px] text-slate-400">
          {helperText}
        </p>
      )}
    </div>
  );
}
