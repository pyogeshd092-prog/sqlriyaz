import { Link } from 'react-router-dom';
import { Target, ArrowRight, TrendingUp, BookOpen, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useProgress } from '../contexts/ProgressContext';
import { jobRoles } from '../data/jobRoles';
import { questions } from '../data/questions';
import QuestionCard from '../components/Questions/QuestionCard';
import { useState } from 'react';

export default function JobRoles() {
  const { config } = useTheme();
  const { progress } = useProgress();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const role = jobRoles.find(r => r.id === selectedRole);
  const roleQuestions = role ? questions.filter(q => role.questionIds.includes(q.id)) : [];

  return (
    <div style={{ backgroundColor: config.bg }} className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 style={{ color: config.text }} className="text-3xl font-black mb-2">Job Role SQL Tracks</h1>
          <p style={{ color: config.muted }} className="text-sm">
            Specialized SQL preparation for your target role. Each track has curated content and questions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {jobRoles.map(role => {
            const solved = progress.solvedQuestions.filter(id => role.questionIds.includes(id)).length;
            const pct = role.questionIds.length > 0 ? Math.round((solved / role.questionIds.length) * 100) : 0;
            const isSelected = selectedRole === role.id;

            return (
              <button key={role.id} onClick={() => setSelectedRole(isSelected ? null : role.id)}
                style={{
                  backgroundColor: config.card,
                  borderColor: isSelected ? config.primary : config.border
                }}
                className="border rounded-xl p-5 text-left transition-all hover:scale-[1.02] group">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{role.icon}</span>
                  <span style={{ color: config.primary }} className="text-sm font-semibold">{role.avgSalary}</span>
                </div>
                <h3 style={{ color: config.text }} className="font-bold text-base mb-1">{role.title}</h3>
                <p style={{ color: config.muted }} className="text-xs mb-3 leading-relaxed">{role.description}</p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {role.skills.slice(0, 3).map(s => (
                    <span key={s} style={{ backgroundColor: `${config.primary}10`, color: config.primary }}
                          className="text-xs px-2 py-0.5 rounded">{s}</span>
                  ))}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span style={{ color: config.muted }} className="text-xs">{solved}/{role.questionIds.length} questions done</span>
                    <span style={{ color: config.primary }} className="text-xs font-semibold">{pct}%</span>
                  </div>
                  <div style={{ backgroundColor: `${config.primary}20` }} className="h-1.5 rounded-full">
                    <div style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${config.primary}, ${config.accent})` }}
                         className="h-full rounded-full transition-all" />
                  </div>
                </div>

                <div style={{ color: isSelected ? config.primary : config.muted }}
                     className="flex items-center gap-1 text-xs mt-3 font-medium">
                  {isSelected ? 'Hide' : 'View'} Track <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Role Detail */}
        {role && (
          <div style={{ backgroundColor: config.card, borderColor: config.border }}
               className="border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">{role.icon}</span>
              <div>
                <h2 style={{ color: config.text }} className="text-xl font-black">{role.title}</h2>
                <p style={{ color: config.muted }} className="text-sm">Average salary: {role.avgSalary}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 style={{ color: config.text }} className="font-semibold text-sm mb-3 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" style={{ color: config.primary }} />
                  Learning Path
                </h3>
                <div className="space-y-2">
                  {role.learningPath.map((step, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div style={{ backgroundColor: `${config.primary}20`, color: config.primary }}
                           className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </div>
                      <span style={{ color: config.text }} className="text-sm">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 style={{ color: config.text }} className="font-semibold text-sm mb-3">
                  Required Skills
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {role.skills.map(s => (
                    <span key={s} style={{ backgroundColor: `${config.primary}15`, color: config.primary, borderColor: `${config.primary}40` }}
                          className="border text-xs px-3 py-1 rounded-full">{s}</span>
                  ))}
                </div>
              </div>
            </div>

            <h3 style={{ color: config.text }} className="font-semibold text-sm mb-3 flex items-center gap-1">
              <BookOpen className="w-4 h-4" style={{ color: config.primary }} />
              Practice Questions ({roleQuestions.length})
            </h3>
            <div className="space-y-2">
              {roleQuestions.map((q, i) => <QuestionCard key={q.id} question={q} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
