import { Link } from 'react-router-dom';
import { CheckCircle2, Bookmark, BookmarkCheck, Building2 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useProgress } from '../../contexts/ProgressContext';
import Badge from '../UI/Badge';
import type { Question } from '../../types';

interface QuestionCardProps {
  question: Question;
  index: number;
}

export default function QuestionCard({ question, index }: QuestionCardProps) {
  const { config } = useTheme();
  const { isSolved, isBookmarked, toggleBookmark } = useProgress();
  const solved = isSolved(question.id);
  const bookmarked = isBookmarked(question.id);

  return (
    <div style={{ backgroundColor: config.card, borderColor: solved ? `${config.primary}60` : config.border }}
         className="border rounded-xl p-4 transition-all hover:scale-[1.01] hover:shadow-lg group">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {/* Index / solved indicator */}
          <div style={{
            width: 32, height: 32, flexShrink: 0,
            backgroundColor: solved ? `${config.primary}20` : `${config.muted}15`,
            color: solved ? config.primary : config.muted,
            borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600
          }}>
            {solved ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
          </div>

          <div className="flex-1 min-w-0">
            <Link to={`/questions/${question.id}`}
              style={{ color: solved ? config.primary : config.text }}
              className="font-semibold text-sm hover:underline line-clamp-1">
              {question.title}
            </Link>
            <div className="flex items-center flex-wrap gap-1.5 mt-2">
              <Badge text={question.difficulty} variant="difficulty" />
              <span style={{ color: config.muted }} className="text-xs">{question.category}</span>
              {question.companies.slice(0, 2).map(c => (
                <span key={c} style={{ color: config.muted }}
                      className="text-xs flex items-center gap-0.5">
                  <Building2 className="w-3 h-3" />
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span style={{ color: config.primary }} className="text-xs font-semibold">+{question.xpReward} XP</span>
          <button
            onClick={(e) => { e.preventDefault(); toggleBookmark(question.id); }}
            style={{ color: bookmarked ? config.primary : config.muted }}
            className="hover:opacity-70 transition-opacity">
            {bookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
