import { getDifficultyColor } from '../../utils/sqlFormatter';

interface BadgeProps {
  text: string;
  variant?: 'difficulty' | 'category' | 'tag';
}

export default function Badge({ text, variant = 'tag' }: BadgeProps) {
  const baseClass = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border";
  if (variant === 'difficulty') {
    return <span className={`${baseClass} ${getDifficultyColor(text)}`}>{text}</span>;
  }
  return <span className={`${baseClass} bg-white/5 text-gray-400 border-white/10`}>{text}</span>;
}
