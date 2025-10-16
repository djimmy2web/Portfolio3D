import { create } from 'zustand';

interface ThemeState {
  theme: 'dark';
  getResolvedTheme: () => 'dark';
}

export const useThemeStore = create<ThemeState>()(() => ({
  theme: 'dark',
  getResolvedTheme: () => 'dark',
}));

// Apply dark theme on initialization
if (typeof window !== 'undefined') {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add('dark');
  
  // Update meta theme-color for mobile browsers
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', '#0a0a0a');
  }
}
