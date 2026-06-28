import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Database, Code2, BookOpen, Target, LayoutDashboard, Menu, X, Map, Zap, Trophy, LogOut, LogIn, User, MessageSquare } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useProgress } from '../../contexts/ProgressContext';
import { useAuth } from '../../contexts/AuthContext';
import ThemeSelector from '../UI/ThemeSelector';

const navLinks = [
  { path: '/', label: 'Home', icon: Zap },
  { path: '/playground', label: 'Playground', icon: Code2 },
  { path: '/questions', label: 'Questions', icon: BookOpen },
  { path: '/roadmap', label: 'Roadmap', icon: Map },
  { path: '/roles', label: 'Job Roles', icon: Target },
  { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/feedback', label: 'Feedback', icon: MessageSquare },
];

export default function Navbar() {
  const { config } = useTheme();
  const { progress, getLevelInfo } = useProgress();
  const { user, profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const levelInfo = getLevelInfo();

  async function handleSignOut() {
    await signOut();
    setUserMenuOpen(false);
    navigate('/');
  }

  return (
    <nav style={{ backgroundColor: config.card, borderBottomColor: config.border }}
         className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 group">
          <div style={{ background: `linear-gradient(135deg, ${config.primary}, ${config.accent})` }}
               className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg">
            <Database className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl" style={{ color: config.text }}>
            SQL<span style={{ color: config.primary }}>Riyaz</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map(({ path, label, icon: Icon }) => {
            const active = location.pathname === path;
            return (
              <Link key={path} to={path}
                style={{ color: active ? config.primary : config.muted, backgroundColor: active ? `${config.primary}15` : 'transparent' }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90">
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <ThemeSelector />

          {user && (
            <div style={{ backgroundColor: `${config.primary}15`, borderColor: `${config.primary}40`, color: config.primary }}
                 className="hidden sm:flex items-center gap-1.5 border rounded-full px-3 py-1 text-sm font-semibold">
              <Zap className="w-3.5 h-3.5" />
              <span>{progress.xp} XP</span>
              <span style={{ color: config.muted }} className="text-xs">Lv.{levelInfo.level}</span>
            </div>
          )}

          {user && progress.streak > 0 && (
            <div className="hidden sm:flex items-center gap-1 text-orange-400 text-sm font-semibold">
              {progress.streak}
            </div>
          )}

          {user ? (
            <div className="relative">
              <button onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all hover:opacity-80"
                style={{ borderColor: config.border, background: config.bg }}>
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="" className="w-6 h-6 rounded-full object-cover" />
                ) : (
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: config.primary + '30', color: config.primary }}>
                    {(profile?.username || profile?.full_name || user.email || '?').slice(0, 1).toUpperCase()}
                  </div>
                )}
                <span className="text-sm font-medium hidden sm:block" style={{ color: config.text }}>
                  {profile?.username || profile?.full_name || 'You'}
                </span>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border shadow-xl overflow-hidden z-50"
                  style={{ background: config.card, borderColor: config.border }}>
                  <Link to="/dashboard" onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 text-sm hover:opacity-80 transition-opacity"
                    style={{ color: config.text }}>
                    <User size={14} /> My Dashboard
                  </Link>
                  <button onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm hover:opacity-80 transition-opacity text-red-400">
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-semibold text-sm transition-opacity hover:opacity-80"
              style={{ background: config.primary, color: '#000' }}>
              <LogIn size={14} /> Login
            </Link>
          )}

          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg"
            style={{ color: config.muted }}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div style={{ backgroundColor: config.card, borderColor: config.border }}
             className="lg:hidden border-t px-4 py-3 space-y-1">
          {navLinks.map(({ path, label, icon: Icon }) => {
            const active = location.pathname === path;
            return (
              <Link key={path} to={path} onClick={() => setMobileOpen(false)}
                style={{ color: active ? config.primary : config.muted, backgroundColor: active ? `${config.primary}15` : 'transparent' }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all">
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            );
          })}
          {user ? (
            <button onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          ) : (
            <Link to="/login" onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium"
              style={{ color: config.primary }}>
              <LogIn className="w-4 h-4" /> Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
