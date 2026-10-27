'use client';
import React from 'react';
import LenseLoader from './LenseLoader';

/**
 * Universal LoadingSpinner component matching LEnSE 2026 design system
 */
export default function LoadingSpinner({ message = 'L O A D I N G . . .', fullScreen = false }) {
  return (
    <LenseLoader
      fullScreen={fullScreen}
      message={message}
      autoProgress={true}
      duration={400}
    />
  );
}
