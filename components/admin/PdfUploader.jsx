'use client';

import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Link as LinkIcon,
  X,
  RefreshCw,
  Download,
  ExternalLink,
  FileCheck
} from 'lucide-react';

export default function PdfUploader({
  value = '',
  onChange,
  onFileDetails, // optional ({ size, type, filename })
  category = 'resources',
  label = 'PDF Document File',
  helperText = 'Upload PDF documents (saved to Cloudinary CDN) for users to download.',
  className = ''
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'url'
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // Format bytes into human-readable size
  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '1.0 MB';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleFileUpload = async (file) => {
    if (!file) return;

    // Check extension or MIME type
    const isPdf = file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf';
    const isDoc = file.name.toLowerCase().endsWith('.docx') || file.name.toLowerCase().endsWith('.doc');
    const isZip = file.name.toLowerCase().endsWith('.zip');

    if (!isPdf && !isDoc && !isZip && !file.type.includes('document')) {
      setError('Please upload a valid PDF document (or DOCX / ZIP file).');
      return;
    }

    // Size limit check: 25MB max
    if (file.size > 25 * 1024 * 1024) {
      setError('File size exceeds 25MB limit. Please select a document under 25MB.');
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
        throw new Error(data.error || 'Failed to upload document file');
      }

      // Format size and type
      const computedSize = formatFileSize(file.size);
      let computedType = 'PDF';
      if (file.name.toLowerCase().endsWith('.docx') || file.name.toLowerCase().endsWith('.doc')) {
        computedType = 'Word Document (DOCX)';
      } else if (file.name.toLowerCase().endsWith('.zip')) {
        computedType = 'Archive (ZIP)';
      }

      // Propagate new document URL
      if (onChange) {
        onChange(data.url);
      }

      // Propagate file metadata if callback exists
      if (onFileDetails) {
        onFileDetails({
          size: computedSize,
          type: computedType,
          filename: file.name,
          url: data.url
        });
      }
    } catch (err) {
      console.error('File upload failed:', err);
      setError(err.message || 'Document upload failed. Please try again.');
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

  const hasValue = Boolean(value && value !== '#');

  return (
    <div className={`space-y-2 font-sans ${className}`}>
      {/* Label and Tab Switcher */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-[#142618] flex items-center gap-1.5">
          <FileText size={14} className="text-[#2d5a3c]" />
          <span>{label} *</span>
        </label>

        <div className="flex items-center gap-1 bg-[#edf3ee] p-0.5 rounded-lg border border-[#d8e5da] text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-2.5 py-1 rounded-md transition-all font-semibold flex items-center gap-1 cursor-pointer ${
              activeTab === 'upload'
                ? 'bg-white text-[#1b3726] shadow-xs'
                : 'text-[#566e5a] hover:text-[#1b3726]'
            }`}
          >
            <UploadCloud size={12} />
            Cloud Upload
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-2.5 py-1 rounded-md transition-all font-semibold flex items-center gap-1 cursor-pointer ${
              activeTab === 'url'
                ? 'bg-white text-[#1b3726] shadow-xs'
                : 'text-[#566e5a] hover:text-[#1b3726]'
            }`}
          >
            <LinkIcon size={12} />
            URL / Link
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
          className={`relative border-2 border-dashed rounded-2xl p-4 sm:p-5 transition-all cursor-pointer text-center group ${
            isDragOver
              ? 'border-[#2d5a3c] bg-emerald-50/60 scale-[1.01]'
              : 'border-[#d4e2d6] hover:border-[#2d5a3c] bg-[#fbfdfb] hover:bg-[#f2f7f2]'
          } ${uploading ? 'pointer-events-none opacity-80' : ''}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf,.docx,.doc,.zip"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileUpload(e.target.files[0]);
              }
            }}
          />

          <div className="flex flex-col items-center justify-center py-2">
            {uploading ? (
              <div className="flex flex-col items-center space-y-2 py-2">
                <Loader2 className="animate-spin text-[#2d5a3c]" size={30} />
                <p className="text-xs font-bold text-[#1b3726]">Uploading PDF file to Cloudinary CDN...</p>
                <span className="text-[11px] text-[#607764]">Please wait while document is saved</span>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform shadow-xs">
                  <FileText size={24} />
                </div>
                <p className="text-xs font-bold text-[#142618]">
                  <span className="text-[#2d5a3c] underline decoration-[#2d5a3c]/30 underline-offset-2">Click to select PDF</span> or drag and drop here
                </p>
                <p className="text-[11px] text-[#556959] mt-1">
                  Supports documents up to 25MB (saved to <span className="font-mono text-[#1b3726] font-semibold">Cloudinary CDN</span>)
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
            placeholder={`/admin/resources/brochure.pdf or https://...`}
            className="w-full pl-9 pr-8 py-2.5 text-xs bg-[#fbfdfb] border border-[#d5e2d6] rounded-xl text-[#142618] placeholder-[#8ca090] focus:outline-none focus:border-[#2d5a3c] focus:bg-white transition-all"
          />
          <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7f9483]" />
          {hasValue && (
            <button
              type="button"
              onClick={() => onChange && onChange('#')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8ca090] hover:text-[#142618]"
            >
              <X size={14} />
            </button>
          )}
        </div>
      )}

      {/* Error alert */}
      {error && (
        <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 animate-in fade-in">
          <AlertCircle size={14} className="shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Active File Preview Box */}
      {hasValue && (
        <div className="p-3 rounded-2xl bg-[#f4f8f4] border border-[#d2e4d5] shadow-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-rose-100/90 text-rose-700 border border-rose-200 flex items-center justify-center shrink-0">
              <FileCheck size={20} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-800">
                <CheckCircle2 size={13} className="text-emerald-600" />
                <span>PDF Attached &amp; Ready to Download</span>
              </div>
              <p className="text-[11px] text-[#4d6352] font-mono truncate max-w-[240px] sm:max-w-[340px]" title={value}>
                {value}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <a
              href={value}
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1.5 text-[11px] font-bold text-[#1b3726] bg-white border border-[#d0e2d3] hover:bg-[#eaf2eb] rounded-lg transition-colors flex items-center gap-1"
              title="Preview / Download file in browser"
            >
              <ExternalLink size={12} />
              <span>Preview</span>
            </a>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1.5 text-[11px] font-bold text-[#445b49] bg-white border border-[#d0e2d3] hover:bg-[#eaf2eb] rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              title="Upload replacement PDF"
            >
              <RefreshCw size={11} />
              <span>Replace</span>
            </button>

            <button
              type="button"
              onClick={() => onChange && onChange('#')}
              className="p-1.5 text-[#7f9483] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
              title="Remove attached file"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Helper text */}
      {helperText && !error && !hasValue && (
        <p className="text-[11px] text-[#697d6d]">
          {helperText}
        </p>
      )}
    </div>
  );
}
