'use client';
import React from 'react';

export default function Template({ children }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-1 duration-300 transition-all">
      {children}
    </div>
  );
}
