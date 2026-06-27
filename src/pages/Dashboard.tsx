import { useTheme } from '../contexts/ThemeContext';
import { useProgress } from '../contexts/ProgressContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import { Trophy, Flame, Target, BookOpen, RotateCcw, TrendingUp } from 'lucide-react';
import { questions } from '../data/questions';
import { achievements, getLevelTitle } from '../data/achievements';
import StatCard from '../components/UI/StatCard';
import Modal from '../components/UI/Modal';
import { useState } from 'react';


export default function Dashboard() {
  const { config } = useTheme();
  const { progress, getLevelInfo, resetProgress } = useProgress();
  const [showReset, setShowReset] = useState(false);

  const levelInfo = getLevelInfo();
  // Get XP threshold of the previous level to calculate % within current level
  const prevLevelXPMap: Record<number, number> = { 1: 0, 2: 100, 3: 300, 4: 700, 5: 1500, 6: 3000, 7: 6000 };
  const prevLevelXP = prevLevelXPMap[levelInfo.level] ?? 0;
  const xpPercent = levelInfo.nextXP === Infinity ? 100 :
    Math.min(100, Math.round(((progress.xp - prevLevelXP) / (levelInfo.nextXP - prevLevelXP)) * 100));

  // Topic breakdown
  const topicData = Object.entries(progress.topicProgress).map(([topic, count]) => ({
    topic: topic.length > 15 ? topic.substring(0, 14) + '…' : topic,
    solved: count
  }));

  // Daily activity (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().split('T')[0];
    return { day: d.toLocaleDateString('en', { weekday: 'short' }), solves: progress.dailySolves[key] || 0 };
  });

  const solvedByDifficulty = ['Easy', 'Medium', 'Hard', 'Expert'].map(diff => ({
    diff,
    total: questions.filter(q => q.difficulty === diff).length,
    solved: progress.solvedQuestions.filter(id => questions.find(q => q.id === id && q.difficulty === diff)).length,
    color: diff === 'Easy' ? '#10B981' : diff === 'Medium' ? '#F59E0B' : diff === 'Hard' ? '#F97316' : '#EF4444'
  }));

  // Accuracy = % of total questions attempted that were solved correctly
  const accuracy = questions.length > 0
    ? Math.round((progress.solvedQuestions.length / questions.length) * 100)
    : 0;

  const readinessScore = Math.min(100, Math.round(
    (progress.solvedQuestions.length / questions.length) * 40 +
    (progress.streak / 30) * 20 +
    (accuracy / 100) * 20 +
    (Object.keys(progress.topicProgress).length / 8) * 20
  ));

  return (
    <div style={{ backgroundColor: config.bg }} className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 style={{ color: config.text }} className="text-3xl font-black">Your Dashboard</h1>
            <p style={{ color: config.muted }} className="text-sm mt-1">Track your SQL interview preparation progress</p>
          </div>
          <button onClick={() => setShowReset(true)}
            style={{ color: config.muted, borderColor: config.border }}
            className="flex items-center gap-2 border rounded-lg px-3 py-2 text-sm hover:opacity-80 transition-opacity">
            <RotateCcw className="w-4 h-4" />
            Reset Progress
          </button>
        </div>

        {/* Level Card */}
        <div style={{ background: `linear-gradient(135deg, ${config.primary}20, ${config.accent}20)`, borderColor: `${config.primary}40` }}
             className="border rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p style={{ color: config.muted }} className="text-sm">Current Level</p>
              <h2 style={{ color: config.text }} className="text-2xl font-black">{levelInfo.title}</h2>
              <p style={{ color: config.primary }} className="text-sm font-semibold mt-0.5">Level {levelInfo.level}</p>
            </div>
            <div className="text-right">
              <p style={{ color: config.primary }} className="text-3xl font-black">{progress.xp}</p>
              <p style={{ color: config.muted }} className="text-sm">Total XP</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1">
              <span style={{ color: config.muted }} className="text-xs">Progress to Level {levelInfo.level + 1}</span>
              {levelInfo.nextXP !== Infinity && (
                <span style={{ color: config.primary }} className="text-xs">{progress.xp}/{levelInfo.nextXP} XP</span>
              )}
            </div>
            <div style={{ backgroundColor: `${config.primary}20` }} className="h-3 rounded-full">
              <div style={{ width: `${Math.min(100, xpPercent)}%`, background: `linear-gradient(90deg, ${config.primary}, ${config.accent})` }}
                   className="h-full rounded-full transition-all" />
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard icon={<BookOpen className="w-5 h-5" />} label="Questions Solved" value={progress.solvedQuestions.length} sub={`/ ${questions.length} total`} color={config.primary} />
          <StatCard icon={<Flame className="w-5 h-5" />} label="Current Streak" value={`${progress.streak} days`} sub={`Best: ${progress.longestStreak} days`} color="#F97316" />
          <StatCard icon={<Target className="w-5 h-5" />} label="Completion" value={`${accuracy}%`} sub={`${progress.solvedQuestions.length} of ${questions.length} solved`} color="#10B981" />
          <StatCard icon={<TrendingUp className="w-5 h-5" />} label="Readiness Score" value={`${readinessScore}%`} sub="Interview readiness" color="#A855F7" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Difficulty Breakdown */}
          <div style={{ backgroundColor: config.card, borderColor: config.border }} className="border rounded-xl p-5">
            <h3 style={{ color: config.text }} className="font-bold mb-4">Progress by Difficulty</h3>
            {solvedByDifficulty.map(({ diff, total, solved, color }) => (
              <div key={diff} className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span style={{ color }} className="text-sm font-medium">{diff}</span>
                  <span style={{ color: config.muted }} className="text-xs">{solved}/{total}</span>
                </div>
                <div style={{ backgroundColor: `${color}20` }} className="h-2 rounded-full">
                  <div style={{ width: total > 0 ? `${(solved / total) * 100}%` : '0%', backgroundColor: color }}
                       className="h-full rounded-full transition-all" />
                </div>
              </div>
            ))}
          </div>

          {/* Weekly Activity */}
          <div style={{ backgroundColor: config.card, borderColor: config.border }} className="border rounded-xl p-5">
            <h3 style={{ color: config.text }} className="font-bold mb-4">Weekly Activity</h3>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={last7Days}>
                <XAxis dataKey="day" tick={{ fill: config.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: config.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: config.card, border: `1px solid ${config.border}`, borderRadius: 8, color: config.text }} />
                <Bar dataKey="solves" fill={config.primary} radius={[4, 4, 0, 0]} name="Solved" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Topic Breakdown */}
        {topicData.length > 0 && (
          <div style={{ backgroundColor: config.card, borderColor: config.border }} className="border rounded-xl p-5 mb-6">
            <h3 style={{ color: config.text }} className="font-bold mb-4">Questions Solved by Topic</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={topicData} layout="vertical">
                <XAxis type="number" tick={{ fill: config.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="topic" tick={{ fill: config.text, fontSize: 11 }} axisLine={false} tickLine={false} width={120} />
                <Tooltip contentStyle={{ backgroundColor: config.card, border: `1px solid ${config.border}`, borderRadius: 8, color: config.text }} />
                <Bar dataKey="solved" fill={config.primary} radius={[0, 4, 4, 0]} name="Solved" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Achievements */}
        <div style={{ backgroundColor: config.card, borderColor: config.border }} className="border rounded-xl p-5">
          <h3 style={{ color: config.text }} className="font-bold mb-4 flex items-center gap-2">
            <Trophy style={{ color: config.primary }} className="w-5 h-5" />
            Achievements ({progress.achievements.length}/{achievements.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {achievements.map(ach => {
              const earned = progress.achievements.includes(ach.id);
              return (
                <div key={ach.id}
                  style={{
                    backgroundColor: earned ? `${config.primary}10` : config.bg,
                    borderColor: earned ? `${config.primary}40` : config.border,
                    opacity: earned ? 1 : 0.5
                  }}
                  className="border rounded-xl p-3 text-center">
                  <div className="text-2xl mb-1">{ach.icon}</div>
                  <p style={{ color: earned ? config.text : config.muted }} className="text-xs font-semibold">{ach.title}</p>
                  <p style={{ color: config.muted }} className="text-xs mt-0.5 line-clamp-2">{ach.description}</p>
                  {earned && <p style={{ color: config.primary }} className="text-xs mt-1 font-semibold">+{ach.xpReward} XP</p>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reset Confirmation */}
      <Modal open={showReset} onClose={() => setShowReset(false)} title="Reset Progress?" size="sm">
        <p style={{ color: config.muted }} className="text-sm mb-4">
          This will permanently delete all your progress, XP, solved questions, and achievements. This cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={() => setShowReset(false)}
            style={{ backgroundColor: config.bg, color: config.text, borderColor: config.border }}
            className="flex-1 border rounded-lg py-2 text-sm font-medium hover:opacity-80">
            Cancel
          </button>
          <button onClick={() => { resetProgress(); setShowReset(false); }}
            className="flex-1 bg-red-500 text-white rounded-lg py-2 text-sm font-medium hover:opacity-80">
            Reset Everything
          </button>
        </div>
      </Modal>
    </div>
  );
}
