import { Link } from 'react-router-dom';
import { Building2, ChevronRight, Target, BookOpen } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useProgress } from '../contexts/ProgressContext';
import Badge from '../components/UI/Badge';
import { companies, getSectors } from '../data/companies';

export default function Companies() {
  const { config } = useTheme();
  const { progress } = useProgress();
  const sectors = getSectors();

  return (
    <div style={{ backgroundColor: config.bg }} className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 style={{ color: config.text }} className="text-3xl font-black mb-2">Company-Wise SQL Preparation</h1>
          <p style={{ color: config.muted }} className="text-sm">
            Targeted interview question sets for top companies hiring SQL talent.
          </p>
        </div>

        {sectors.map(sector => (
          <div key={sector} className="mb-10">
            <h2 style={{ color: config.text }} className="text-xl font-bold mb-4 flex items-center gap-2">
              <Building2 style={{ color: config.primary }} className="w-5 h-5" />
              {sector}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {companies.filter(c => c.sector === sector).map(company => {
                const solvedForCompany = progress.solvedQuestions.filter(id => company.questionIds.includes(id)).length;
                const pct = company.totalQuestions > 0 ? Math.round((solvedForCompany / company.totalQuestions) * 100) : 0;

                return (
                  <Link key={company.id} to={`/companies/${company.id}`}
                    style={{ backgroundColor: config.card, borderColor: config.border }}
                    className="border rounded-xl p-5 hover:scale-[1.02] transition-all group">
                    <div className="flex items-start justify-between mb-3">
                      <div style={{ background: `linear-gradient(135deg, ${config.primary}, ${config.accent})` }}
                           className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-sm">
                        {company.logo}
                      </div>
                      <Badge text={company.difficulty} variant="difficulty" />
                    </div>

                    <h3 style={{ color: config.text }} className="font-bold text-base mb-1">{company.name}</h3>
                    <p style={{ color: config.muted }} className="text-xs mb-3 line-clamp-2">{company.description}</p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {company.mostAskedTopics.slice(0, 3).map(t => (
                        <span key={t} style={{ backgroundColor: `${config.primary}10`, color: config.primary }}
                              className="text-xs px-2 py-0.5 rounded">{t}</span>
                      ))}
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span style={{ color: config.muted }} className="text-xs">{solvedForCompany}/{company.totalQuestions} solved</span>
                        <span style={{ color: config.primary }} className="text-xs font-semibold">{pct}%</span>
                      </div>
                      <div style={{ backgroundColor: `${config.primary}20` }} className="h-1.5 rounded-full">
                        <div style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${config.primary}, ${config.accent})` }}
                             className="h-full rounded-full transition-all" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs" style={{ color: config.muted }}>
                      <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{company.totalQuestions} questions</span>
                      <span className="flex items-center gap-1 group-hover:opacity-80" style={{ color: config.primary }}>
                        Start Track <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
