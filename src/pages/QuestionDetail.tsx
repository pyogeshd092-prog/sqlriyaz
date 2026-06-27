import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Bookmark, BookmarkCheck, Lightbulb, Eye, EyeOff, ChevronRight, Trophy, Clock } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useProgress } from '../contexts/ProgressContext';
import { useSqlExecutor } from '../hooks/useSqlExecutor';
import SqlEditor from '../components/Playground/SqlEditor';
import Badge from '../components/UI/Badge';
import { getQuestionById, questions } from '../data/questions';

export default function QuestionDetail() {
  const { id } = useParams<{ id: string }>();
  const { config } = useTheme();
  const { markSolved, toggleBookmark, isSolved, isBookmarked } = useProgress();
  const { executeQuery, isExecuting, results, resetDb } = useSqlExecutor();
  const [tab, setTab] = useState<'problem' | 'solution' | 'explanation'>('problem');
  const [hintsShown, setHintsShown] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [userCode, setUserCode] = useState('');
  const startTimeRef = useRef(Date.now());

  const question = getQuestionById(Number(id));
  const solved = question ? isSolved(question.id) : false;
  const bookmarked = question ? isBookmarked(question.id) : false;

  useEffect(() => {
    startTimeRef.current = Date.now();
  }, [id]);

  if (!question) {
    return (
      <div style={{ backgroundColor: config.bg }} className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p style={{ color: config.muted }} className="text-xl mb-4">Question not found.</p>
          <Link to="/questions" style={{ color: config.primary }} className="underline">Back to Questions</Link>
        </div>
      </div>
    );
  }

  const schema = question.tableStructure.map(t => `${t.createSQL}\n${t.insertSQL}`).join('\n\n');

  const handleExecute = async (sql: string) => {
    setUserCode(sql);
    return await executeQuery(sql, schema);
  };

  const handleSubmit = () => {
    if (!results || results.error) return;
    const timeTaken = Math.round((Date.now() - startTimeRef.current) / 1000);
    markSolved(question.id, question.category, question.xpReward, userCode, timeTaken);
    setSubmitted(true);
  };

  const relatedQuestions = question.relatedQuestions
    .map(rid => questions.find(q => q.id === rid))
    .filter(Boolean);

  return (
    <div style={{ backgroundColor: config.bg }} className="min-h-screen pt-16">
      {/* Top bar */}
      <div style={{ backgroundColor: config.card, borderBottomColor: config.border }}
           className="border-b px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <Link to="/questions" style={{ color: config.muted }}
                className="flex items-center gap-1 hover:opacity-70 text-sm">
            <ArrowLeft className="w-4 h-4" /> Questions
          </Link>
          <ChevronRight style={{ color: config.muted }} className="w-4 h-4" />
          <span style={{ color: config.text }} className="font-semibold text-sm">{question.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge text={question.difficulty} variant="difficulty" />
          <button onClick={() => toggleBookmark(question.id)} style={{ color: bookmarked ? config.primary : config.muted }}>
            {bookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
          </button>
          {solved && <CheckCircle2 style={{ color: '#10B981' }} className="w-5 h-5" />}
        </div>
      </div>

      <div className="flex h-[calc(100vh-112px)]">
        {/* Left: Problem Panel */}
        <div style={{ width: '42%', borderRightColor: config.border }}
             className="border-r flex flex-col overflow-hidden">
          {/* Tabs */}
          <div style={{ borderBottomColor: config.border }}
               className="flex border-b px-4 pt-2 gap-1">
            {(['problem', 'solution', 'explanation'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{
                  color: tab === t ? config.primary : config.muted,
                  borderBottomColor: tab === t ? config.primary : 'transparent'
                }}
                className="px-3 py-2 text-sm font-medium border-b-2 transition-colors capitalize">
                {t}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {tab === 'problem' && (
              <>
                <div>
                  <h1 style={{ color: config.text }} className="text-xl font-black mb-3">{question.title}</h1>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <Badge text={question.difficulty} variant="difficulty" />
                    <Badge text={question.category} />
                    {question.tags.map(t => <Badge key={t} text={t} />)}
                  </div>
                  <p style={{ color: config.muted }} className="text-sm leading-relaxed">{question.problemStatement}</p>
                </div>

                {/* Table schemas */}
                {question.tableStructure.length > 0 && (
                  <div>
                    <h3 style={{ color: config.text }} className="font-semibold text-sm mb-2">Table Structure</h3>
                    {question.tableStructure.map(table => (
                      <div key={table.tableName} style={{ borderColor: config.border }}
                           className="border rounded-lg overflow-hidden mb-2">
                        <div style={{ backgroundColor: `${config.primary}10`, color: config.primary }}
                             className="px-3 py-1.5 text-xs font-semibold font-mono">
                          {table.tableName}
                        </div>
                        <table className="w-full text-xs">
                          <thead>
                            <tr style={{ borderBottomColor: config.border }} className="border-b">
                              <th style={{ color: config.muted }} className="text-left px-3 py-1.5">Column</th>
                              <th style={{ color: config.muted }} className="text-left px-3 py-1.5">Type</th>
                            </tr>
                          </thead>
                          <tbody>
                            {table.columns.map(col => (
                              <tr key={col.name} style={{ borderBottomColor: config.border }}
                                  className="border-b last:border-0">
                                <td style={{ color: config.text }} className="px-3 py-1.5 font-mono">{col.name}</td>
                                <td style={{ color: config.primary }} className="px-3 py-1.5">{col.type}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>
                )}

                {/* Expected Output */}
                {question.expectedOutput.length > 0 && (
                  <div>
                    <h3 style={{ color: config.text }} className="font-semibold text-sm mb-2">Expected Output (sample)</h3>
                    <div style={{ borderColor: config.border }} className="border rounded-lg overflow-hidden">
                      <table className="w-full text-xs">
                        <thead>
                          <tr style={{ backgroundColor: `${config.primary}10` }}>
                            {Object.keys(question.expectedOutput[0]).map(k => (
                              <th key={k} style={{ color: config.primary, borderBottomColor: config.border }}
                                  className="text-left px-3 py-2 border-b font-semibold">{k}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {question.expectedOutput.slice(0, 4).map((row, i) => (
                            <tr key={i} style={{ borderBottomColor: config.border }} className="border-b last:border-0">
                              {Object.values(row).map((val, j) => (
                                <td key={j} style={{ color: config.text }}
                                    className="px-3 py-1.5 font-mono">
                                  {val === null ? <span className="text-gray-500 italic">NULL</span> : String(val)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Hints */}
                <div>
                  <h3 style={{ color: config.text }} className="font-semibold text-sm mb-2">
                    <Lightbulb className="w-4 h-4 inline mr-1" style={{ color: config.primary }} />
                    Hints
                  </h3>
                  <div className="space-y-2">
                    {[question.hint1, question.hint2, question.hint3].map((hint, i) => (
                      <div key={i}>
                        {hintsShown > i ? (
                          <div style={{ backgroundColor: `${config.primary}10`, borderColor: `${config.primary}30` }}
                               className="border rounded-lg p-3 text-sm">
                            <span style={{ color: config.primary }} className="font-semibold">Hint {i + 1}: </span>
                            <span style={{ color: config.text }}>{hint}</span>
                          </div>
                        ) : (
                          <button onClick={() => setHintsShown(i + 1)}
                            style={{ borderColor: config.border, color: config.muted }}
                            className="w-full border rounded-lg p-3 text-sm text-left hover:opacity-80 transition-opacity">
                            🔒 Reveal Hint {i + 1}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Companies */}
                {question.companies.length > 0 && (
                  <div>
                    <p style={{ color: config.muted }} className="text-xs font-medium mb-1.5">Asked by:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {question.companies.map(c => (
                        <span key={c} style={{ backgroundColor: `${config.primary}10`, color: config.primary, borderColor: `${config.primary}30` }}
                              className="border rounded-full px-2.5 py-0.5 text-xs font-medium">{c}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* XP reward */}
                <div style={{ backgroundColor: `${config.primary}10`, borderColor: `${config.primary}30` }}
                     className="border rounded-lg p-3 flex items-center gap-2">
                  <Trophy style={{ color: config.primary }} className="w-4 h-4" />
                  <span style={{ color: config.text }} className="text-sm">Solve this to earn <strong style={{ color: config.primary }}>{question.xpReward} XP</strong></span>
                </div>
              </>
            )}

            {tab === 'solution' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 style={{ color: config.text }} className="font-semibold">Solution</h3>
                  <button onClick={() => setShowSolution(!showSolution)}
                    style={{ color: config.muted, backgroundColor: `${config.primary}10` }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs hover:opacity-80">
                    {showSolution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    {showSolution ? 'Hide' : 'Reveal'} Solution
                  </button>
                </div>
                {showSolution ? (
                  <pre style={{ backgroundColor: config.bg, borderColor: config.border, color: config.text }}
                       className="border rounded-xl p-4 text-sm font-mono overflow-x-auto whitespace-pre-wrap">
                    {question.solution}
                  </pre>
                ) : (
                  <div style={{ backgroundColor: config.bg, borderColor: config.border }}
                       className="border rounded-xl p-8 text-center">
                    <p style={{ color: config.muted }} className="text-sm">Click "Reveal Solution" to see the answer.<br />Try solving it yourself first!</p>
                  </div>
                )}
              </div>
            )}

            {tab === 'explanation' && (
              <div>
                <h3 style={{ color: config.text }} className="font-semibold mb-3">Detailed Explanation</h3>
                <p style={{ color: config.muted }} className="text-sm leading-relaxed">{question.explanation}</p>

                {relatedQuestions.length > 0 && (
                  <div className="mt-6">
                    <h4 style={{ color: config.text }} className="font-semibold text-sm mb-3">Related Questions</h4>
                    <div className="space-y-2">
                      {relatedQuestions.map(rq => rq && (
                        <Link key={rq.id} to={`/questions/${rq.id}`}
                          style={{ backgroundColor: config.bg, borderColor: config.border, color: config.text }}
                          className="flex items-center justify-between border rounded-lg p-3 hover:opacity-80 transition-opacity">
                          <span className="text-sm font-medium">{rq.title}</span>
                          <Badge text={rq.difficulty} variant="difficulty" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right: SQL Editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-hidden">
            <SqlEditor
              initialValue={`-- Solve: ${question.title}\n-- Write your SQL query below\n\n`}
              onExecute={handleExecute}
              results={results}
              isExecuting={isExecuting}
              onReset={() => resetDb()}
            />
          </div>

          {/* Submit area */}
          <div style={{ backgroundColor: config.card, borderTopColor: config.border }}
               className="border-t p-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs" style={{ color: config.muted }}>
              <Clock className="w-3.5 h-3.5" />
              <span>Run your query first, then submit.</span>
            </div>

            {solved || submitted ? (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span className="text-green-400 text-sm font-semibold">Solved! +{question.xpReward} XP</span>
              </div>
            ) : (
              <button onClick={handleSubmit}
                disabled={!results || !!results.error || isExecuting}
                style={{ background: `linear-gradient(135deg, ${config.primary}, ${config.accent})` }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold disabled:opacity-40 hover:opacity-90 transition-opacity">
                <CheckCircle2 className="w-4 h-4" />
                Mark as Solved
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
