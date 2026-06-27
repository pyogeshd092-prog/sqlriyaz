import { useState } from 'react';
import { Palette } from 'lucide-react';
import { useTheme, themes } from '../../contexts/ThemeContext';
import type { Theme } from '../../types';

export default function ThemeSelector() {
  const { theme, setTheme, config } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        style={{ color: config.muted, backgroundColor: `${config.primary}10`, borderColor: config.border }}
        className="flex items-center gap-2 px-2.5 py-2 rounded-lg border text-sm transition-all hover:opacity-80">
        <Palette className="w-4 h-4" />
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: config.primary }} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div style={{ backgroundColor: config.card, borderColor: config.border }}
               className="absolute right-0 top-11 z-50 border rounded-xl p-3 shadow-2xl w-48">
            <p style={{ color: config.muted }} className="text-xs font-medium mb-2 uppercase tracking-wider">Theme</p>
            {(Object.keys(themes) as Theme[]).map(t => {
              const cfg = themes[t];
              return (
                <button
                  key={t}
                  onClick={() => { setTheme(t); setOpen(false); }}
                  className="flex items-center gap-3 w-full px-2 py-2 rounded-lg text-sm transition-all hover:opacity-80"
                  style={{
                    color: t === theme ? cfg.primary : config.text,
                    backgroundColor: t === theme ? `${cfg.primary}15` : 'transparent'
                  }}>
                  <div className="w-5 h-5 rounded-full border-2"
                       style={{ backgroundColor: cfg.primary, borderColor: t === theme ? cfg.primary : 'transparent' }} />
                  {cfg.name}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
