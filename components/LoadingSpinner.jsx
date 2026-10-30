'use client';
import React from 'react';
import LenseLoader from './LenseLoader';

/**
 * Universal LoadingSpinner component - Simple, clean, and lightweight
 */
export default function LoadingSpinner({ message = 'Loading...', fullScreen = false }) {
  return (
    <LenseLoader
      fullScreen={fullScreen}
      message={message}
      autoProgress={true}
      duration={350}
    />
  );
}
