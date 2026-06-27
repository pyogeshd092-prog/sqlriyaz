import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building2, TrendingUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useProgress } from '../contexts/ProgressContext';
import QuestionCard from '../components/Questions/QuestionCard';
import Badge from '../components/UI/Badge';
import { getCompanyById } from '../data/companies';
import { questions } from '../data/questions';

export default function CompanyDetail() {
  const { id } = useParams<{ id: string }>();
  const { config } = useTheme();
  const { progress } = useProgress();
  const company = getCompanyById(id || '');

  if (!company) {
    return (
      <div style={{ backgroundColor: config.bg }} className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p style={{ color: config.muted }}>Company not found.</p>
          <Link to="/companies" style={{ color: config.primary }} className="underline text-sm mt-2 block">Back</Link>
        </div>
      </div>
    );
  }

  const companyQuestions = questions.filter(q => company.questionIds.includes(q.id));
  const solvedCount = progress.solvedQuestions.filter(id => company.questionIds.includes(id)).length;

  return (
    <div style={{ backgroundColor: config.bg }} className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/companies" style={{ color: config.muted }}
              className="flex items-center gap-1 text-sm mb-6 hover:opacity-70">
          <ArrowLeft className="w-4 h-4" /> Back to Companies
        </Link>

        {/* Company Header */}
        <div style={{ backgroundColor: config.card, borderColor: config.border }}
             className="border rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-4 mb-4">
            <div style={{ background: `linear-gradient(135deg, ${config.primary}, ${config.accent})` }}
                 className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-lg">
              {company.logo}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <h1 style={{ color: config.text }} className="text-2xl font-black">{company.name}</h1>
                <Badge text={company.difficulty} variant="difficulty" />
              </div>
              <p style={{ color: config.muted }} className="text-sm">{company.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {[
              { label: 'Questions', value: company.totalQuestions },
              { label: 'Solved', value: solvedCount },
              { label: 'Completion', value: `${Math.round((solvedCount / company.totalQuestions) * 100)}%` },
              { label: 'Sector', value: company.sector },
            ].map(({ label, value }) => (
              <div key={label} style={{ backgroundColor: config.bg, borderColor: config.border }}
                   className="border rounded-lg p-3 text-center">
                <p style={{ color: config.text }} className="font-bold text-lg">{value}</p>
                <p style={{ color: config.muted }} className="text-xs">{label}</p>
              </div>
            ))}
          </div>

          <div style={{ borderColor: config.border }} className="border-t pt-4">
            <h3 style={{ color: config.text }} className="font-semibold text-sm mb-2 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" style={{ color: config.primary }} />
              Interview Pattern
            </h3>
            <p style={{ color: config.muted }} className="text-sm leading-relaxed">{company.interviewPattern}</p>
          </div>

          <div className="mt-4">
            <p style={{ color: config.muted }} className="text-xs font-medium mb-2">Most Asked Topics:</p>
            <div className="flex flex-wrap gap-1.5">
              {company.mostAskedTopics.map(t => (
                <span key={t} style={{ backgroundColor: `${config.primary}15`, color: config.primary, borderColor: `${config.primary}40` }}
                      className="border text-xs px-3 py-1 rounded-full font-medium">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Questions */}
        <h2 style={{ color: config.text }} className="text-xl font-bold mb-4">
          {company.name} SQL Questions
          <span style={{ color: config.muted }} className="text-sm font-normal ml-2">({companyQuestions.length})</span>
        </h2>
        <div className="space-y-2">
          {companyQuestions.map((q, i) => <QuestionCard key={q.id} question={q} index={i} />)}
        </div>
      </div>
    </div>
  );
}
