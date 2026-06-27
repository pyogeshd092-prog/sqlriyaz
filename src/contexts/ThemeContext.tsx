import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Theme, ThemeConfig } from '../types';

export const themes: Record<Theme, ThemeConfig> = {
  blue: {
    id: 'blue',
    name: 'Ocean Blue',
    primary: '#00D4FF',
    accent: '#0080FF',
    bg: '#0A0E1A',
    card: '#111827',
    border: '#1E3A5F',
    text: '#E2E8F0',
    muted: '#64748B',
    gradient: 'from-[#00D4FF] to-[#0080FF]',
    badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
  },
  purple: {
    id: 'purple',
    name: 'Royal Purple',
    primary: '#A855F7',
    accent: '#7C3AED',
    bg: '#0D0D1A',
    card: '#1A1A2E',
    border: '#2D1B69',
    text: '#E2E8F0',
    muted: '#9CA3AF',
    gradient: 'from-[#A855F7] to-[#7C3AED]',
    badge: 'bg-purple-500/10 text-purple-400 border-purple-500/30'
  },
  orange: {
    id: 'orange',
    name: 'Amber Fire',
    primary: '#F59E0B',
    accent: '#EF4444',
    bg: '#0F0F0F',
    card: '#1A1A1A',
    border: '#2D2006',
    text: '#E2E8F0',
    muted: '#9CA3AF',
    gradient: 'from-[#F59E0B] to-[#EF4444]',
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30'
  },
  green: {
    id: 'green',
    name: 'Matrix Green',
    primary: '#10B981',
    accent: '#059669',
    bg: '#0A0F0A',
    card: '#0F1F0F',
    border: '#1A3A1A',
    text: '#D1FAE5',
    muted: '#6EE7B7',
    gradient: 'from-[#10B981] to-[#059669]',
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
  }
};

interface ThemeContextType {
  theme: Theme;
  config: ThemeConfig;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'blue',
  config: themes.blue,
  setTheme: () => {}
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem('sqlace_theme') as Theme) || 'blue';
  });

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem('sqlace_theme', t);
  };

  useEffect(() => {
    const root = document.documentElement;
    const cfg = themes[theme];
    root.style.setProperty('--color-primary', cfg.primary);
    root.style.setProperty('--color-accent', cfg.accent);
    root.style.setProperty('--color-bg', cfg.bg);
    root.style.setProperty('--color-card', cfg.card);
    root.style.setProperty('--color-border', cfg.border);
    root.style.setProperty('--color-text', cfg.text);
    root.style.setProperty('--color-muted', cfg.muted);
    document.body.style.backgroundColor = cfg.bg;
    document.body.style.color = cfg.text;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, config: themes[theme], setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
