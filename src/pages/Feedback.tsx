import { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { MessageSquare, Bug, Zap, HelpCircle, Send, CheckCircle } from 'lucide-react'

type FeedbackType = 'bug' | 'feature' | 'ui' | 'other'

const FEEDBACK_TYPES: { value: FeedbackType; label: string; icon: typeof Bug; desc: string }[] = [
  { value: 'bug', label: 'Bug Report', icon: Bug, desc: 'Something is broken or not working' },
  { value: 'feature', label: 'Feature Request', icon: Zap, desc: 'I want a new feature or improvement' },
  { value: 'ui', label: 'UI / UX Issue', icon: MessageSquare, desc: 'Design or usability problem' },
  { value: 'other', label: 'Other', icon: HelpCircle, desc: 'General feedback or question' },
]

export default function Feedback() {
  const { config } = useTheme()
  const { user, profile } = useAuth()

  const [type, setType] = useState<FeedbackType>('bug')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [email, setEmail] = useState(user?.email || '')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!description.trim()) { setError('Please describe the issue.'); return }
    setError('')
    setLoading(true)

    const { error: dbError } = await supabase.from('feedback').insert({
      type,
      title: title.trim() || null,
      description: description.trim(),
      email: email.trim() || null,
      user_id: user?.id || null,
      username: profile?.username || profile?.full_name || null,
      page_url: window.location.href,
    })

    if (dbError) {
      setError('Failed to submit. Please try again.')
      console.error(dbError)
    } else {
      setSubmitted(true)
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center px-4" style={{ background: config.bg }}>
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: `${config.primary}20` }}>
            <CheckCircle className="w-10 h-10" style={{ color: config.primary }} />
          </div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: config.text }}>Thank you!</h2>
          <p className="mb-6" style={{ color: config.muted }}>
            Your feedback has been received. We'll look into it and improve SQLRiyaz for everyone.
          </p>
          <div className="flex gap-3 justify-center">
            <a href="/"
              className="px-6 py-2.5 rounded-xl font-semibold text-black"
              style={{ background: config.primary }}>
              Go Home
            </a>
            <button onClick={() => { setSubmitted(false); setTitle(''); setDescription(''); setType('bug') }}
              className="px-6 py-2.5 rounded-xl font-semibold border"
              style={{ borderColor: config.border, color: config.text }}>
              Submit Another
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4" style={{ background: config.bg }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: `linear-gradient(135deg, ${config.primary}, ${config.accent})` }}>
            <MessageSquare className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-black mb-2" style={{ color: config.text }}>Share Feedback</h1>
          <p style={{ color: config.muted }}>Found a bug or have a suggestion? Tell us — we read everything.</p>
        </div>

        <div className="rounded-2xl border p-8" style={{ background: config.card, borderColor: config.border }}>
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Feedback Type */}
            <div>
              <label className="block text-sm font-semibold mb-3" style={{ color: config.text }}>
                What type of feedback is this?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {FEEDBACK_TYPES.map(({ value, label, icon: Icon, desc }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setType(value)}
                    className="flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all"
                    style={{
                      borderColor: type === value ? config.primary : config.border,
                      background: type === value ? `${config.primary}12` : config.bg,
                    }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: type === value ? config.primary : `${config.primary}20` }}>
                      <Icon className="w-4 h-4" style={{ color: type === value ? '#000' : config.primary }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: config.text }}>{label}</p>
                      <p className="text-xs mt-0.5" style={{ color: config.muted }}>{desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: config.text }}>
                Short title <span style={{ color: config.muted }}>(optional)</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Run Query button not working on mobile"
                maxLength={100}
                className="w-full px-4 py-3 rounded-xl border outline-none"
                style={{ background: config.bg, borderColor: config.border, color: config.text }}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: config.text }}>
                Describe the issue <span className="text-red-400">*</span>
              </label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder={
                  type === 'bug'
                    ? 'What happened? What did you expect to happen? Which page/question were you on?'
                    : type === 'feature'
                    ? 'Describe the feature you want and why it would help.'
                    : 'Describe what you experienced...'
                }
                required
                rows={5}
                maxLength={2000}
                className="w-full px-4 py-3 rounded-xl border outline-none resize-none"
                style={{ background: config.bg, borderColor: config.border, color: config.text }}
              />
              <p className="text-xs mt-1 text-right" style={{ color: config.muted }}>
                {description.length}/2000
              </p>
            </div>

            {/* Email */}
            {!user && (
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: config.text }}>
                  Email <span style={{ color: config.muted }}>(optional — if you want a reply)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border outline-none"
                  style={{ background: config.bg, borderColor: config.border, color: config.text }}
                />
              </div>
            )}

            {user && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl"
                style={{ background: `${config.primary}10`, borderColor: `${config.primary}30` }}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: config.primary + '30', color: config.primary }}>
                  {(profile?.username || user.email || '?').slice(0, 1).toUpperCase()}
                </div>
                <p className="text-sm" style={{ color: config.muted }}>
                  Submitting as <span style={{ color: config.text, fontWeight: 600 }}>
                    {profile?.username || user.email}
                  </span>
                </p>
              </div>
            )}

            {error && (
              <p className="text-sm text-red-400 bg-red-400/10 px-4 py-2 rounded-lg">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-black transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ background: config.primary }}
            >
              <Send className="w-4 h-4" />
              {loading ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-sm" style={{ color: config.muted }}>
          We review all feedback. Critical bugs are fixed within 24–48 hours.
        </p>
      </div>
    </div>
  )
}
