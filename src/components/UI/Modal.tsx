import { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Modal({ open, onClose, title, children, size = 'md' }: ModalProps) {
  const { config } = useTheme();
  const sizeClass = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-2xl', xl: 'max-w-4xl' };

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div style={{ backgroundColor: config.card, borderColor: config.border }}
           className={`relative w-full ${sizeClass[size]} border rounded-2xl shadow-2xl`}>
        <div style={{ borderBottomColor: config.border }} className="flex items-center justify-between px-6 py-4 border-b">
          <h2 style={{ color: config.text }} className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} style={{ color: config.muted }} className="hover:opacity-70 transition-opacity">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
