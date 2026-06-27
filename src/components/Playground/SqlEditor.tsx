import { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, Download, Copy, Wand2 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { formatSQL, downloadCSV } from '../../utils/sqlFormatter';
import type { QueryResult } from '../../types';

interface SqlEditorProps {
  initialValue?: string;
  onExecute: (sql: string) => Promise<QueryResult>;
  results: QueryResult | null;
  isExecuting: boolean;
  onReset?: () => void;
}

export default function SqlEditor({ initialValue = '', onExecute, results, isExecuting, onReset }: SqlEditorProps) {
  const { config, theme } = useTheme();
  const [code, setCode] = useState(initialValue);
  const [copied, setCopied] = useState(false);
  const editorRef = useRef<unknown>(null);

  const monacoTheme = theme === 'green' ? 'vs-dark' : 'vs-dark';

  const handleRun = async () => {
    if (!code.trim()) return;
    await onExecute(code);
  };

  const handleFormat = () => {
    const formatted = formatSQL(code);
    setCode(formatted);
    // @ts-expect-error monaco ref
    if (editorRef.current) editorRef.current.setValue(formatted);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div style={{ backgroundColor: config.card, borderColor: config.border }}
           className="flex items-center justify-between px-3 py-2 border-b gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <button onClick={handleRun} disabled={isExecuting}
            style={{ background: `linear-gradient(135deg, ${config.primary}, ${config.accent})` }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-white text-sm font-medium disabled:opacity-50 hover:opacity-90 transition-opacity">
            <Play className="w-3.5 h-3.5" />
            {isExecuting ? 'Running...' : 'Run SQL'}
          </button>
          <button onClick={handleFormat}
            style={{ color: config.muted, backgroundColor: `${config.primary}10` }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs hover:opacity-80 transition-opacity">
            <Wand2 className="w-3.5 h-3.5" />
            Format
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleCopy}
            style={{ color: config.muted }}
            className="flex items-center gap-1.5 text-xs hover:opacity-70 transition-opacity">
            <Copy className="w-3.5 h-3.5" />
            {copied ? 'Copied!' : 'Copy'}
          </button>
          {onReset && (
            <button onClick={onReset}
              style={{ color: config.muted }}
              className="flex items-center gap-1.5 text-xs hover:opacity-70 transition-opacity">
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 min-h-[200px]">
        <Editor
          height="100%"
          language="sql"
          value={code}
          theme="vs-dark"
          onChange={(v) => setCode(v || '')}
          onMount={(editor) => { editorRef.current = editor; }}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            lineNumbers: 'on',
            renderLineHighlight: 'line',
            automaticLayout: true,
            padding: { top: 12, bottom: 12 },
            fontFamily: 'JetBrains Mono, Fira Code, monospace',
            fontLigatures: true,
            tabSize: 2,
          }}
        />
      </div>

      {/* Results */}
      {results && (
        <div style={{ backgroundColor: config.bg, borderColor: config.border }}
             className="border-t flex flex-col max-h-72">
          {/* Results header */}
          <div style={{ borderColor: config.border }}
               className="flex items-center justify-between px-3 py-2 border-b">
            <div className="flex items-center gap-3">
              {results.error ? (
                <span className="text-red-400 text-sm font-medium">❌ Error</span>
              ) : (
                <span style={{ color: config.primary }} className="text-sm font-medium">
                  ✓ {results.rowCount} rows — {results.executionTime}ms
                </span>
              )}
            </div>
            {!results.error && results.rows.length > 0 && (
              <button onClick={() => downloadCSV(results.columns, results.rows)}
                style={{ color: config.muted }}
                className="flex items-center gap-1.5 text-xs hover:opacity-70 transition-opacity">
                <Download className="w-3.5 h-3.5" />
                CSV
              </button>
            )}
          </div>

          {results.error ? (
            <div className="p-4">
              <p className="text-red-400 text-sm font-mono bg-red-400/10 rounded-lg p-3">{results.error}</p>
            </div>
          ) : (
            <div className="overflow-auto flex-1">
              {results.columns.length > 0 ? (
                <table className="w-full text-sm min-w-max">
                  <thead>
                    <tr style={{ backgroundColor: `${config.primary}10` }}>
                      {results.columns.map(col => (
                        <th key={col} style={{ color: config.primary, borderColor: config.border }}
                            className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider border-b sticky top-0 whitespace-nowrap">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {results.rows.map((row, ri) => (
                      <tr key={ri} style={{ borderColor: config.border }}
                          className="border-b last:border-0 hover:bg-white/5 transition-colors">
                        {(row as unknown[]).map((cell, ci) => (
                          <td key={ci} style={{ color: config.text }}
                              className="px-4 py-2 text-sm font-mono whitespace-nowrap">
                            {cell === null ? <span className="text-gray-500 italic">NULL</span> : String(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p style={{ color: config.muted }} className="p-4 text-sm text-center">Query executed successfully. No rows returned.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
