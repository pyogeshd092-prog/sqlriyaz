import { ReactNode } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
}

export default function StatCard({ icon, label, value, sub, color }: StatCardProps) {
  const { config } = useTheme();
  return (
    <div style={{ backgroundColor: config.card, borderColor: config.border }}
         className="border rounded-xl p-5 flex items-center gap-4 transition-all hover:scale-[1.02]">
      <div style={{ backgroundColor: `${color || config.primary}15`, color: color || config.primary }}
           className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
        {icon}
      </div>
      <div>
        <p style={{ color: config.muted }} className="text-sm">{label}</p>
        <p style={{ color: config.text }} className="text-2xl font-bold">{value}</p>
        {sub && <p style={{ color: config.muted }} className="text-xs mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}
