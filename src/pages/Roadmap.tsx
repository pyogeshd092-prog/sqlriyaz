import { useState } from 'react';
import { Map, ChevronDown, ChevronRight, BookOpen, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useProgress } from '../contexts/ProgressContext';
import { roadmapTopics, getLevelTopics } from '../data/roadmap';
import { questions } from '../data/questions';
import { Link } from 'react-router-dom';

const levels = ['Beginner', 'Intermediate', 'Advanced'] as const;

const levelColors: Record<string, string> = {
  Beginner: '#10B981',
  Intermediate: '#F59E0B',
  Advanced: '#EF4444'
};

export default function Roadmap() {
  const { config } = useTheme();
  const { isSolved } = useProgress();
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  return (
    <div style={{ backgroundColor: config.bg }} className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Map style={{ color: config.primary }} className="w-7 h-7" />
            <h1 style={{ color: config.text }} className="text-3xl font-black">SQL Learning Roadmap</h1>
          </div>
          <p style={{ color: config.muted }} className="text-sm">
            A structured path from SQL basics to advanced techniques. Complete each level before moving to the next.
          </p>
        </div>

        {levels.map(level => {
          const topics = getLevelTopics(level);
          const color = levelColors[level];

          return (
            <div key={level} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div style={{ backgroundColor: `${color}20`, color, borderColor: `${color}40` }}
                     className="border rounded-full px-4 py-1 text-sm font-bold">
                  {level}
                </div>
                <div style={{ backgroundColor: config.border }} className="flex-1 h-px" />
                <span style={{ color: config.muted }} className="text-xs">{topics.length} topics</span>
              </div>

              <div className="space-y-3">
                {topics.map((topic, idx) => {
                  const topicQuestions = questions.filter(q => topic.questionIds.includes(q.id));
                  const solvedCount = topicQuestions.filter(q => isSolved(q.id)).length;
                  const isExpanded = expandedTopic === topic.id;

                  return (
                    <div key={topic.id} style={{ backgroundColor: config.card, borderColor: config.border }}
                         className="border rounded-xl overflow-hidden">
                      <button
                        onClick={() => setExpandedTopic(isExpanded ? null : topic.id)}
                        className="w-full flex items-center gap-3 p-4 text-left hover:opacity-90 transition-opacity">
                        <div style={{ backgroundColor: `${color}15`, color }}
                             className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {idx + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 style={{ color: config.text }} className="font-semibold text-sm">{topic.title}</h3>
                          <p style={{ color: config.muted }} className="text-xs mt-0.5 line-clamp-1">{topic.description}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {topicQuestions.length > 0 && (
                            <span style={{ color: config.muted }} className="text-xs">
                              {solvedCount}/{topicQuestions.length} solved
                            </span>
                          )}
                          {isExpanded ? (
                            <ChevronDown style={{ color: config.muted }} className="w-4 h-4" />
                          ) : (
                            <ChevronRight style={{ color: config.muted }} className="w-4 h-4" />
                          )}
                        </div>
                      </button>

                      {isExpanded && (
                        <div style={{ borderTopColor: config.border }} className="border-t p-4 space-y-4">
                          {/* Syntax */}
                          <div>
                            <p style={{ color: config.muted }} className="text-xs font-semibold uppercase tracking-wider mb-2">Syntax</p>
                            <pre style={{ backgroundColor: config.bg, color: config.primary, borderColor: config.border }}
                                 className="border rounded-lg p-3 text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                              {topic.syntax}
                            </pre>
                          </div>

                          {/* Example */}
                          <div>
                            <p style={{ color: config.muted }} className="text-xs font-semibold uppercase tracking-wider mb-2">Example</p>
                            <pre style={{ backgroundColor: config.bg, color: config.text, borderColor: config.border }}
                                 className="border rounded-lg p-3 text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                              {topic.example}
                            </pre>
                          </div>

                          {/* Tips */}
                          {topic.tips.length > 0 && (
                            <div>
                              <p style={{ color: config.muted }} className="text-xs font-semibold uppercase tracking-wider mb-2">💡 Key Tips</p>
                              <ul className="space-y-1">
                                {topic.tips.map((tip, ti) => (
                                  <li key={ti} style={{ color: config.text }} className="flex items-start gap-2 text-xs">
                                    <span style={{ color: color }} className="mt-0.5">•</span>
                                    {tip}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Practice questions */}
                          {topicQuestions.length > 0 && (
                            <div>
                              <p style={{ color: config.muted }} className="text-xs font-semibold uppercase tracking-wider mb-2">
                                <BookOpen className="w-3.5 h-3.5 inline mr-1" />
                                Practice Questions
                              </p>
                              <div className="space-y-1.5">
                                {topicQuestions.map(q => (
                                  <Link key={q.id} to={`/questions/${q.id}`}
                                    style={{ backgroundColor: config.bg, borderColor: config.border, color: config.text }}
                                    className="flex items-center justify-between border rounded-lg px-3 py-2 text-xs hover:opacity-80 transition-opacity">
                                    <span className="flex items-center gap-2">
                                      {isSolved(q.id) && <CheckCircle2 style={{ color: '#10B981' }} className="w-3.5 h-3.5" />}
                                      {q.title}
                                    </span>
                                    <span className={`px-2 py-0.5 rounded text-xs ${
                                      q.difficulty === 'Easy' ? 'text-green-400' :
                                      q.difficulty === 'Medium' ? 'text-yellow-400' :
                                      'text-red-400'}`}>
                                      {q.difficulty}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
