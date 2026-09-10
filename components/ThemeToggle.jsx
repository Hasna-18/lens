'use client';
import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useToast } from './Toast';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('dark');
  const { showToast } = useToast();

  useEffect(() => {
    const savedTheme = localStorage.getItem('clese_theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('clese_theme', nextTheme);
    showToast(`Switched to ${nextTheme.toUpperCase()} Glass Theme`, 'info');
  };

  return (
    <button 
      className="theme-toggle-btn glass-btn" 
      onClick={toggleTheme}
      title="Toggle Glass Theme"
      aria-label="Toggle Glass Theme"
    >
      {theme === 'dark' ? (
        <Moon className="moon-icon" size={18} />
      ) : (
        <Sun className="sun-icon" size={18} />
      )}
    </button>
  );
}
