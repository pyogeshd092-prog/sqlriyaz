import { ReactNode } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import clsx from 'clsx';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({ children, onClick, variant = 'primary', size = 'md', disabled, className, type = 'button' }: ButtonProps) {
  const { config } = useTheme();

  const sizeClasses = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2 text-sm', lg: 'px-6 py-3 text-base' };

  const baseClass = "inline-flex items-center gap-2 font-medium rounded-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed";

  const variantStyle = {
    primary: { background: `linear-gradient(135deg, ${config.primary}, ${config.accent})`, color: '#fff' },
    secondary: { backgroundColor: `${config.primary}15`, color: config.primary, border: `1px solid ${config.primary}40` },
    ghost: { color: config.muted, backgroundColor: 'transparent' },
    danger: { backgroundColor: '#EF444415', color: '#EF4444', border: '1px solid #EF444430' }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={variantStyle[variant]}
      className={clsx(baseClass, sizeClasses[size], className)}>
      {children}
    </button>
  );
}
