import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'

const MAX_ATTEMPTS = 5
const LOCKOUT_SECONDS = 30
const STORAGE_KEY = 'sqlriyaz_login_attempts'

interface AttemptData { count: number; lockedUntil: number }

function getAttempts(): AttemptData {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : { count: 0, lockedUntil: 0 }
  } catch { return { count: 0, lockedUntil: 0 } }
}

function saveAttempts(data: AttemptData) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function clearAttempts() {
  sessionStorage.removeItem(STORAGE_KEY)
}

export default function Login() {
  const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth()
  const { config } = useTheme()
  const navigate = useNavigate()

  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [lockoutRemaining, setLockoutRemaining] = useState(0)

  // Countdown timer for lockout
  useEffect(() => {
    const data = getAttempts()
    const remaining = Math.ceil((data.lockedUntil - Date.now()) / 1000)
    if (remaining > 0) setLockoutRemaining(remaining)

    const timer = setInterval(() => {
      const d = getAttempts()
      const rem = Math.ceil((d.lockedUntil - Date.now()) / 1000)
      if (rem <= 0) {
        setLockoutRemaining(0)
        clearInterval(timer)
      } else {
        setLockoutRemaining(rem)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  function friendlyError(msg: string): string {
    if (!msg) return 'Something went wrong. Please try again.'
    const m = msg.toLowerCase()
    if (m.includes('invalid login') || m.includes('invalid credentials') || m.includes('wrong password'))
      return 'Incorrect email or password.'
    if (m.includes('email not confirmed'))
      return 'Please verify your email first — check your inbox.'
    if (m.includes('user already registered') || m.includes('already been registered'))
      return 'This email is already registered. Try logging in instead.'
    if (m.includes('password should be at least'))
      return 'Password must be at least 6 characters.'
    if (m.includes('unable to validate email'))
      return 'Please enter a valid email address.'
    if (m.includes('too many requests') || m.includes('rate limit'))
      return 'Too many attempts. Please wait a moment and try again.'
    return msg
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccessMsg('')

    // Check lockout
    const attempts = getAttempts()
    if (Date.now() < attempts.lockedUntil) {
      const rem = Math.ceil((attempts.lockedUntil - Date.now()) / 1000)
      setError(`Too many failed attempts. Try again in ${rem}s.`)
      return
    }

    setLoading(true)

    if (mode === 'login') {
      const err = await signInWithEmail(email, password)
      if (err) {
        // Track failed attempts
        const updated = { ...attempts, count: attempts.count + 1 }
        if (updated.count >= MAX_ATTEMPTS) {
          updated.lockedUntil = Date.now() + LOCKOUT_SECONDS * 1000
          updated.count = 0
          setLockoutRemaining(LOCKOUT_SECONDS)
        }
        saveAttempts(updated)
        setError(friendlyError(err))
        setLoading(false)
        return
      }
      clearAttempts()
      navigate('/')
    } else {
      if (!username.trim()) { setError('Username is required'); setLoading(false); return }
      if (username.trim().length < 3) { setError('Username must be at least 3 characters'); setLoading(false); return }
      const err = await signUpWithEmail(email, password, username)
      if (err) { setError(friendlyError(err)); setLoading(false); return }
      // Try auto-login after signup (works when email confirmation is disabled)
      const loginErr = await signInWithEmail(email, password)
      if (!loginErr) {
        clearAttempts()
        navigate('/')
        return
      }
      setSuccessMsg('Account created! Check your email to verify, then log in.')
      setMode('login')
    }
    setLoading(false)
  }

  const isLocked = lockoutRemaining > 0

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: config.bg }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-black" style={{ color: config.primary }}>
            SQL<span style={{ color: config.text }}>Riyaz</span>
          </Link>
          <p className="mt-2" style={{ color: config.muted }}>Master SQL for Your Dream Job</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border p-8" style={{ background: config.card, borderColor: config.border }}>
          {/* Tabs */}
          <div className="flex mb-6 rounded-lg overflow-hidden border" style={{ borderColor: config.border }}>
            {(['login', 'signup'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => { setMode(tab); setError(''); setSuccessMsg('') }}
                className="flex-1 py-2.5 text-sm font-semibold transition-all"
                style={{
                  background: mode === tab ? config.primary : 'transparent',
                  color: mode === tab ? '#000' : config.muted,
                }}
              >
                {tab === 'login' ? 'Log In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Google */}
          <button
            onClick={signInWithGoogle}
            disabled={isLocked}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border mb-4 font-medium transition-opacity hover:opacity-80 disabled:opacity-40"
            style={{ borderColor: config.border, color: config.text, background: config.bg }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px" style={{ background: config.border }} />
            <span className="text-xs" style={{ color: config.muted }}>or</span>
            <div className="flex-1 h-px" style={{ background: config.border }} />
          </div>

          {/* Lockout banner */}
          {isLocked && (
            <div className="mb-4 px-4 py-3 rounded-xl text-sm font-medium text-orange-400 bg-orange-400/10 border border-orange-400/20">
              🔒 Too many failed attempts. Try again in {lockoutRemaining}s.
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm mb-1.5" style={{ color: config.muted }}>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="sqlmaster"
                  required
                  disabled={isLocked}
                  className="w-full px-4 py-3 rounded-xl border outline-none transition-all focus:ring-2 disabled:opacity-50"
                  style={{
                    background: config.bg, borderColor: config.border,
                    color: config.text, '--tw-ring-color': config.primary
                  } as React.CSSProperties}
                />
              </div>
            )}
            <div>
              <label className="block text-sm mb-1.5" style={{ color: config.muted }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                disabled={isLocked}
                className="w-full px-4 py-3 rounded-xl border outline-none disabled:opacity-50"
                style={{ background: config.bg, borderColor: config.border, color: config.text }}
              />
            </div>
            <div>
              <label className="block text-sm mb-1.5" style={{ color: config.muted }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                disabled={isLocked}
                className="w-full px-4 py-3 rounded-xl border outline-none disabled:opacity-50"
                style={{ background: config.bg, borderColor: config.border, color: config.text }}
              />
            </div>

            {error && !isLocked && (
              <p className="text-sm text-red-400 bg-red-400/10 px-4 py-2 rounded-lg">{error}</p>
            )}
            {successMsg && (
              <p className="text-sm text-green-400 bg-green-400/10 px-4 py-2 rounded-lg">{successMsg}</p>
            )}

            <button
              type="submit"
              disabled={loading || isLocked}
              className="w-full py-3 rounded-xl font-bold text-black transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: config.primary }}
            >
              {loading ? 'Please wait...' : isLocked ? `Locked (${lockoutRemaining}s)` : mode === 'login' ? 'Log In' : 'Create Account'}
            </button>
          </form>
        </div>

        <p className="text-center mt-4 text-sm" style={{ color: config.muted }}>
          <Link to="/" style={{ color: config.primary }}>← Back to home</Link>
        </p>
      </div>
    </div>
  )
}
