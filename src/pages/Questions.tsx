import { useState, useMemo } from 'react';
import { Search, Filter, Bookmark, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useProgress } from '../contexts/ProgressContext';
import QuestionCard from '../components/Questions/QuestionCard';
import { questions, categories } from '../data/questions';

const difficulties = ['All', 'Easy', 'Medium', 'Hard', 'Expert'];

export default function Questions() {
  const { config } = useTheme();
  const { progress } = useProgress();
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('All');
  const [category, setCategory] = useState('All');
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [showSolved, setShowSolved] = useState(false);

  const filtered = useMemo(() => {
    return questions.filter(q => {
      if (search && !q.title.toLowerCase().includes(search.toLowerCase()) &&
          !q.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))) return false;
      if (difficulty !== 'All' && q.difficulty !== difficulty) return false;
      if (category !== 'All' && q.category !== category) return false;
      if (showBookmarked && !progress.bookmarkedQuestions.includes(q.id)) return false;
      if (showSolved && !progress.solvedQuestions.includes(q.id)) return false;
      return true;
    });
  }, [search, difficulty, category, showBookmarked, showSolved, progress]);

  const solvedCount = progress.solvedQuestions.length;
  const totalCount = questions.length;

  return (
    <div style={{ backgroundColor: config.bg }} className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 style={{ color: config.text }} className="text-3xl font-black mb-2">SQL Question Bank</h1>
          <p style={{ color: config.muted }} className="text-sm">
            {solvedCount} / {totalCount} solved · {progress.bookmarkedQuestions.length} bookmarked
          </p>

          {/* Progress bar */}
          <div className="mt-3 h-2 rounded-full" style={{ backgroundColor: `${config.primary}20` }}>
            <div style={{ width: `${(solvedCount / totalCount) * 100}%`, background: `linear-gradient(90deg, ${config.primary}, ${config.accent})` }}
                 className="h-full rounded-full transition-all" />
          </div>
        </div>

        {/* Filters */}
        <div style={{ backgroundColor: config.card, borderColor: config.border }}
             className="border rounded-xl p-4 mb-6 space-y-3">
          {/* Search */}
          <div className="relative">
            <Search style={{ color: config.muted }} className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search questions or tags..."
              style={{ backgroundColor: config.bg, color: config.text, borderColor: config.border }}
              className="w-full border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 ring-current"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Difficulty */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {difficulties.map(d => (
                <button key={d} onClick={() => setDifficulty(d)}
                  style={{
                    borderColor: difficulty === d ? config.primary : config.border,
                    color: difficulty === d ? config.primary : config.muted,
                    backgroundColor: difficulty === d ? `${config.primary}15` : 'transparent'
                  }}
                  className="border rounded-lg px-3 py-1 text-xs font-medium transition-all">
                  {d}
                </button>
              ))}
            </div>

            {/* Category */}
            <select value={category} onChange={e => setCategory(e.target.value)}
              style={{ backgroundColor: config.bg, color: config.text, borderColor: config.border }}
              className="border rounded-lg px-3 py-1 text-xs">
              <option value="All">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            {/* Toggles */}
            <button onClick={() => setShowBookmarked(!showBookmarked)}
              style={{
                borderColor: showBookmarked ? config.primary : config.border,
                color: showBookmarked ? config.primary : config.muted,
                backgroundColor: showBookmarked ? `${config.primary}15` : 'transparent'
              }}
              className="flex items-center gap-1.5 border rounded-lg px-3 py-1 text-xs font-medium transition-all">
              <Bookmark className="w-3 h-3" />
              Bookmarked
            </button>

            <button onClick={() => setShowSolved(!showSolved)}
              style={{
                borderColor: showSolved ? '#10B981' : config.border,
                color: showSolved ? '#10B981' : config.muted,
                backgroundColor: showSolved ? '#10B98115' : 'transparent'
              }}
              className="flex items-center gap-1.5 border rounded-lg px-3 py-1 text-xs font-medium transition-all">
              <CheckCircle2 className="w-3 h-3" />
              Solved
            </button>

            <span style={{ color: config.muted }} className="text-xs self-center ml-auto">
              <Filter className="w-3 h-3 inline mr-1" />
              {filtered.length} questions
            </span>
          </div>
        </div>

        {/* Question List */}
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div style={{ backgroundColor: config.card, borderColor: config.border }}
                 className="border rounded-xl p-12 text-center">
              <p style={{ color: config.muted }} className="text-lg">No questions match your filters.</p>
              <button onClick={() => { setSearch(''); setDifficulty('All'); setCategory('All'); setShowBookmarked(false); setShowSolved(false); }}
                style={{ color: config.primary }} className="text-sm mt-2 underline">
                Clear all filters
              </button>
            </div>
          ) : (
            filtered.map((q, i) => <QuestionCard key={q.id} question={q} index={i} />)
          )}
        </div>
      </div>
    </div>
  );
}
