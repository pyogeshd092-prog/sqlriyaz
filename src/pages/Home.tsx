import { Link } from 'react-router-dom';
import { Code2, BookOpen, Target, LayoutDashboard, Zap, CheckCircle2, TrendingUp, Users, Star, Map, Trophy, ArrowRight, Play, Award } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useProgress } from '../contexts/ProgressContext';
import { questions } from '../data/questions';

const features = [
  { icon: Code2, title: 'SQL Playground', desc: 'Write and execute real SQL queries in your browser with multiple datasets.', href: '/playground', color: '#00D4FF' },
  { icon: BookOpen, title: '250+ Questions', desc: 'Curated SQL interview questions from Easy to Expert with detailed explanations.', href: '/questions', color: '#A855F7' },
  { icon: Map, title: 'SQL Roadmap', desc: 'Structured learning path from SQL basics to advanced window functions.', href: '/roadmap', color: '#10B981' },
  { icon: Target, title: 'Job Role Tracks', desc: 'Specialized tracks for Data Analyst, Power BI Dev, Data Engineer & more.', href: '/roles', color: '#EF4444' },
  { icon: Trophy, title: 'Leaderboard', desc: 'Compete with other SQL learners, climb the ranks and track your standing.', href: '/leaderboard', color: '#F59E0B' },
  { icon: LayoutDashboard, title: 'Progress Dashboard', desc: 'Track your solving streak, XP, topic mastery, and interview readiness.', href: '/dashboard', color: '#8B5CF6' },
];

const stats = [
  { value: '250+', label: 'SQL Questions', icon: BookOpen },
  { value: '4', label: 'Difficulty Levels', icon: Award },
  { value: '6', label: 'Job Role Tracks', icon: Target },
  { value: '10+', label: 'Topics Covered', icon: Trophy },
];

const testimonials = [
  { name: 'Rahul Sharma', role: 'Data Analyst at Amazon', text: 'SQLRiyaz helped me crack my Amazon interview. The Hard and Expert questions are exactly what they ask!', rating: 5 },
  { name: 'Priya Nair', role: 'BI Developer at Goldman Sachs', text: 'The window functions section is the most comprehensive I have seen. Got placed in 3 weeks.', rating: 5 },
  { name: 'Arjun Menon', role: 'Data Engineer at Microsoft', text: 'Recursive CTEs and optimization tips are spot on. Best SQL prep platform out there.', rating: 5 },
];

export default function Home() {
  const { config } = useTheme();
  const { progress } = useProgress();

  const easyCount = questions.filter(q => q.difficulty === 'Easy').length;
  const mediumCount = questions.filter(q => q.difficulty === 'Medium').length;
  const hardCount = questions.filter(q => q.difficulty === 'Hard').length;
  const expertCount = questions.filter(q => q.difficulty === 'Expert').length;

  return (
    <div style={{ backgroundColor: config.bg }}>
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16 px-4">
        <div style={{ background: `radial-gradient(ellipse at 50% 0%, ${config.primary}20 0%, transparent 70%)` }}
             className="absolute inset-0 pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative">
          <div style={{ backgroundColor: `${config.primary}15`, color: config.primary, borderColor: `${config.primary}40` }}
               className="inline-flex items-center gap-2 border rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <Zap className="w-3.5 h-3.5" />
            #1 SQL Interview Prep Platform — SQLRiyaz
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight" style={{ color: config.text }}>
            Master SQL for Your{' '}
            <span style={{ background: `linear-gradient(135deg, ${config.primary}, ${config.accent})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Dream Job
            </span>
          </h1>

          <p style={{ color: config.muted }} className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Practice 250+ real SQL interview questions — from basic SELECT to expert window functions and recursive CTEs. Build confidence with our live SQL playground.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Link to="/questions"
              style={{ background: `linear-gradient(135deg, ${config.primary}, ${config.accent})` }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-base hover:opacity-90 transition-opacity shadow-lg">
              <Play className="w-4 h-4" />
              Start Practicing Free
            </Link>
            <Link to="/playground"
              style={{ borderColor: config.border, color: config.text }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border font-semibold text-base hover:opacity-80 transition-opacity">
              <Code2 className="w-4 h-4" />
              Open SQL Playground
            </Link>
          </div>

          {progress.solvedQuestions.length > 0 && (
            <div style={{ backgroundColor: `${config.primary}10`, borderColor: `${config.primary}30` }}
                 className="inline-flex items-center gap-3 border rounded-xl px-5 py-3 mb-8">
              <CheckCircle2 style={{ color: config.primary }} className="w-5 h-5" />
              <span style={{ color: config.text }} className="text-sm font-medium">
                Welcome back! You've solved <span style={{ color: config.primary }}>{progress.solvedQuestions.length} questions</span> and earned <span style={{ color: config.primary }}>{progress.xp} XP</span>.
              </span>
              <Link to="/dashboard" style={{ color: config.primary }} className="text-sm font-semibold underline hover:opacity-80">
                View Dashboard →
              </Link>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} style={{ backgroundColor: config.card, borderColor: config.border }}
                 className="border rounded-xl p-4 text-center">
              <Icon style={{ color: config.primary }} className="w-6 h-6 mx-auto mb-2" />
              <div style={{ color: config.text }} className="text-2xl font-black">{value}</div>
              <div style={{ color: config.muted }} className="text-xs mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 style={{ color: config.text }} className="text-3xl font-black mb-3">Everything You Need to Ace SQL Interviews</h2>
          <p style={{ color: config.muted }} className="text-base max-w-xl mx-auto">
            A complete ecosystem — from structured learning to real interview practice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, desc, href, color }) => (
            <Link key={title} to={href}
              style={{ backgroundColor: config.card, borderColor: config.border }}
              className="border rounded-xl p-5 hover:scale-[1.02] transition-all group">
              <div style={{ backgroundColor: `${color}15`, color }}
                   className="w-11 h-11 rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <h3 style={{ color: config.text }} className="font-bold text-base mb-1.5 group-hover:opacity-80">{title}</h3>
              <p style={{ color: config.muted }} className="text-sm leading-relaxed">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Question difficulty breakdown */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div style={{ backgroundColor: config.card, borderColor: config.border }}
             className="border rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <h2 style={{ color: config.text }} className="text-2xl font-black">Question Bank Overview</h2>
              <p style={{ color: config.muted }} className="text-sm mt-1">Original questions crafted by SQL experts</p>
            </div>
            <Link to="/questions"
              style={{ color: config.primary, borderColor: `${config.primary}40` }}
              className="flex items-center gap-2 border rounded-lg px-4 py-2 text-sm font-semibold hover:opacity-80">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Easy', count: easyCount, color: '#10B981', solved: progress.solvedQuestions.filter(id => questions.find(q => q.id === id && q.difficulty === 'Easy')).length },
              { label: 'Medium', count: mediumCount, color: '#F59E0B', solved: progress.solvedQuestions.filter(id => questions.find(q => q.id === id && q.difficulty === 'Medium')).length },
              { label: 'Hard', count: hardCount, color: '#F97316', solved: progress.solvedQuestions.filter(id => questions.find(q => q.id === id && q.difficulty === 'Hard')).length },
              { label: 'Expert', count: expertCount, color: '#EF4444', solved: progress.solvedQuestions.filter(id => questions.find(q => q.id === id && q.difficulty === 'Expert')).length },
            ].map(({ label, count, color, solved }) => (
              <div key={label} style={{ backgroundColor: `${color}10`, borderColor: `${color}30` }}
                   className="border rounded-xl p-4">
                <div style={{ color }} className="text-2xl font-black">{count}</div>
                <div style={{ color: config.text }} className="font-semibold text-sm mt-0.5">{label}</div>
                <div className="mt-2">
                  <div style={{ backgroundColor: `${color}20` }} className="h-1.5 rounded-full">
                    <div style={{ width: `${count > 0 ? (solved / count) * 100 : 0}%`, backgroundColor: color }}
                         className="h-full rounded-full transition-all" />
                  </div>
                  <p style={{ color: config.muted }} className="text-xs mt-1">{solved}/{count} solved</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <h2 style={{ color: config.text }} className="text-2xl font-black text-center mb-8">Trusted by SQL Learners</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map(({ name, role, text, rating }) => (
            <div key={name} style={{ backgroundColor: config.card, borderColor: config.border }}
                 className="border rounded-xl p-5">
              <div className="flex mb-3">
                {Array.from({ length: rating }).map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
              </div>
              <p style={{ color: config.text }} className="text-sm leading-relaxed mb-4">"{text}"</p>
              <div>
                <p style={{ color: config.text }} className="font-semibold text-sm">{name}</p>
                <p style={{ color: config.muted }} className="text-xs">{role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div style={{
          background: `linear-gradient(135deg, ${config.primary}20, ${config.accent}20)`,
          borderColor: `${config.primary}40`
        }} className="border rounded-2xl p-10 text-center">
          <TrendingUp style={{ color: config.primary }} className="w-12 h-12 mx-auto mb-4" />
          <h2 style={{ color: config.text }} className="text-3xl font-black mb-3">Ready to Land Your Dream SQL Job?</h2>
          <p style={{ color: config.muted }} className="text-base mb-6 max-w-lg mx-auto">
            Join thousands of SQL learners preparing for top companies. Start free, no registration required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/questions"
              style={{ background: `linear-gradient(135deg, ${config.primary}, ${config.accent})` }}
              className="flex items-center gap-2 px-8 py-3 rounded-xl text-white font-bold hover:opacity-90 transition-opacity shadow-lg">
              <Zap className="w-4 h-4" />
              Start Now — It's Free
            </Link>
            <Link to="/roles"
              style={{ color: config.text, borderColor: config.border }}
              className="flex items-center gap-2 px-8 py-3 rounded-xl border font-bold hover:opacity-80 transition-opacity">
              <Users className="w-4 h-4" />
              Browse Job Role Tracks
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
