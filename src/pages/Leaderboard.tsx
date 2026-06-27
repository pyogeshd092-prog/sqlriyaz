import { useEffect, useState } from 'react'
import { Trophy, Flame, Star, Medal } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'

type LeaderboardEntry = {
  id: string
  username: string | null
  full_name: string | null
  avatar_url: string | null
  xp: number
  level: number
  streak: number
  questions_solved: number
  rank: number
}

export default function Leaderboard() {
  const { config } = useTheme()
  const { user } = useAuth()
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'xp' | 'streak' | 'solved'>('xp')

  useEffect(() => {
    fetchLeaderboard()
  }, [tab])

  async function fetchLeaderboard() {
    setLoading(true)
    const orderCol = tab === 'xp' ? 'xp' : tab === 'streak' ? 'streak' : 'questions_solved'
    const { data } = await supabase
      .from('profiles')
      .select('id, username, full_name, avatar_url, xp, level, streak, questions_solved')
      .order(orderCol, { ascending: false })
      .limit(50)

    if (data) {
      setEntries(data.map((d, i) => ({ ...d, rank: i + 1 })) as LeaderboardEntry[])
    }
    setLoading(false)
  }

  function getRankIcon(rank: number) {
    if (rank === 1) return <Trophy size={20} className="text-yellow-400" />
    if (rank === 2) return <Medal size={20} className="text-gray-300" />
    if (rank === 3) return <Medal size={20} className="text-amber-600" />
    return <span className="text-sm font-bold w-5 text-center" style={{ color: config.muted }}>#{rank}</span>
  }

  function getInitials(entry: LeaderboardEntry) {
    const name = entry.full_name || entry.username || '?'
    return name.slice(0, 2).toUpperCase()
  }

  return (
    <div className="min-h-screen py-12 px-4" style={{ background: config.bg }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Trophy size={32} style={{ color: config.primary }} />
            <h1 className="text-4xl font-black" style={{ color: config.text }}>Leaderboard</h1>
          </div>
          <p style={{ color: config.muted }}>Top SQL practitioners competing globally</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 p-1 rounded-xl border" style={{ borderColor: config.border, background: config.card }}>
          {([
            { key: 'xp', label: 'XP Points', icon: <Star size={14} /> },
            { key: 'streak', label: 'Streak', icon: <Flame size={14} /> },
            { key: 'solved', label: 'Questions Solved', icon: <Medal size={14} /> },
          ] as const).map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: tab === t.key ? config.primary : 'transparent',
                color: tab === t.key ? '#000' : config.muted,
              }}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Top 3 podium */}
        {!loading && entries.length >= 3 && (
          <div className="flex items-end justify-center gap-4 mb-8">
            {[entries[1], entries[0], entries[2]].map((entry, i) => {
              const heights = ['h-24', 'h-32', 'h-20']
              const colors = ['text-gray-300', 'text-yellow-400', 'text-amber-600']
              const ranks = [2, 1, 3]
              return (
                <div key={entry.id} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-black"
                    style={{ background: config.primary + '30', color: config.primary }}>
                    {getInitials(entry)}
                  </div>
                  <p className="text-xs font-semibold" style={{ color: config.text }}>
                    {entry.username || entry.full_name || 'User'}
                  </p>
                  <p className="text-xs" style={{ color: config.muted }}>
                    {tab === 'xp' ? `${entry.xp} XP` : tab === 'streak' ? `${entry.streak}d` : `${entry.questions_solved} solved`}
                  </p>
                  <div className={`${heights[i]} w-20 rounded-t-xl flex items-center justify-center`}
                    style={{ background: config.primary + (i === 1 ? '40' : '20') }}>
                    <span className={`text-2xl font-black ${colors[i]}`}>#{ranks[i]}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* List */}
        <div className="rounded-2xl border overflow-hidden" style={{ borderColor: config.border }}>
          {loading ? (
            <div className="text-center py-16" style={{ color: config.muted }}>Loading leaderboard...</div>
          ) : entries.length === 0 ? (
            <div className="text-center py-16" style={{ color: config.muted }}>
              No users yet. Be the first to sign up and solve questions!
            </div>
          ) : (
            entries.map((entry, idx) => (
              <div
                key={entry.id}
                className="flex items-center gap-4 px-6 py-4 border-b transition-colors hover:opacity-90"
                style={{
                  borderColor: config.border,
                  background: entry.id === user?.id ? config.primary + '15' : idx % 2 === 0 ? config.card : config.bg,
                }}
              >
                <div className="w-8 flex items-center justify-center flex-shrink-0">
                  {getRankIcon(entry.rank)}
                </div>

                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{ background: config.primary + '30', color: config.primary }}>
                  {entry.avatar_url
                    ? <img src={entry.avatar_url} alt="" className="w-10 h-10 rounded-full object-cover" />
                    : getInitials(entry)
                  }
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate" style={{ color: config.text }}>
                    {entry.username || entry.full_name || 'Anonymous'}
                    {entry.id === user?.id && (
                      <span className="ml-2 text-xs px-2 py-0.5 rounded-full" style={{ background: config.primary + '30', color: config.primary }}>You</span>
                    )}
                  </p>
                  <p className="text-xs" style={{ color: config.muted }}>Level {entry.level}</p>
                </div>

                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center hidden sm:block">
                    <p className="font-bold" style={{ color: config.primary }}>{entry.xp}</p>
                    <p className="text-xs" style={{ color: config.muted }}>XP</p>
                  </div>
                  <div className="text-center hidden sm:block">
                    <p className="font-bold flex items-center gap-1" style={{ color: config.text }}>
                      <Flame size={12} className="text-orange-400" />{entry.streak}
                    </p>
                    <p className="text-xs" style={{ color: config.muted }}>Streak</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold" style={{ color: config.text }}>{entry.questions_solved}</p>
                    <p className="text-xs" style={{ color: config.muted }}>Solved</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
