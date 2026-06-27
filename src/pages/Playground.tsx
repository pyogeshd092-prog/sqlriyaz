import { useState, useEffect } from 'react';
import { Database, ChevronDown, ChevronRight, LayoutGrid, History, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useSqlExecutor } from '../hooks/useSqlExecutor';
import SqlEditor from '../components/Playground/SqlEditor';
import { datasets } from '../data/datasets';

const STARTER_QUERY = `-- Welcome to the SQLRiyaz SQL Playground! 🚀
-- Write any SQL query below and click Run SQL

SELECT 'Hello, SQLRiyaz!' AS greeting,
       'Ready to practice SQL!' AS message;`;

export default function Playground() {
  const { config } = useTheme();
  const { executeQuery, isExecuting, results, queryHistory, resetDb } = useSqlExecutor();
  const [selectedDataset, setSelectedDataset] = useState<string>('');
  const [datasetLoaded, setDatasetLoaded] = useState(false);
  const [schemaOpen, setSchemaOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [currentQuery, setCurrentQuery] = useState(STARTER_QUERY);
  const [expandedTable, setExpandedTable] = useState<string | null>(null);

  const dataset = datasets.find(d => d.id === selectedDataset);

  const loadDataset = async (datasetId: string) => {
    const ds = datasets.find(d => d.id === datasetId);
    if (!ds) return;
    const schema = ds.tables.map(t => `${t.createSQL}\n${t.insertSQL}`).join('\n\n');
    await resetDb(schema);
    setDatasetLoaded(true);
    const tableNames = ds.tables.map(t => t.tableName).join(', ');
    setCurrentQuery(`-- ✅ Dataset "${ds.name}" loaded!\n-- Tables available: ${tableNames}\n\n-- Try:\nSELECT * FROM ${ds.tables[0]?.tableName || 'table_name'} LIMIT 10;`);
  };

  const handleExecute = async (sql: string) => {
    let schema: string | undefined;
    if (selectedDataset && !datasetLoaded) {
      const ds = datasets.find(d => d.id === selectedDataset);
      if (ds) schema = ds.tables.map(t => `${t.createSQL}\n${t.insertSQL}`).join('\n\n');
    }
    return await executeQuery(sql, schema);
  };

  return (
    <div style={{ backgroundColor: config.bg }} className="min-h-screen pt-16">
      {/* Header */}
      <div style={{ backgroundColor: config.card, borderBottomColor: config.border }}
           className="border-b px-4 py-3 flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Database style={{ color: config.primary }} className="w-5 h-5" />
          <span style={{ color: config.text }} className="font-bold">SQL Playground</span>
        </div>

        {/* Dataset selector */}
        <div className="flex items-center gap-2">
          <select
            value={selectedDataset}
            onChange={e => { setSelectedDataset(e.target.value); setDatasetLoaded(false); }}
            style={{ backgroundColor: config.bg, color: config.text, borderColor: config.border }}
            className="border rounded-lg px-3 py-1.5 text-sm">
            <option value="">— Select Dataset —</option>
            {datasets.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
          {selectedDataset && !datasetLoaded && (
            <button onClick={() => loadDataset(selectedDataset)}
              style={{ background: `linear-gradient(135deg, ${config.primary}, ${config.accent})` }}
              className="px-3 py-1.5 rounded-lg text-white text-sm font-medium hover:opacity-90">
              Load
            </button>
          )}
          {datasetLoaded && (
            <span style={{ color: '#10B981' }} className="text-xs font-medium">✓ Loaded</span>
          )}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button onClick={() => setSchemaOpen(!schemaOpen)}
            style={{ color: config.muted, backgroundColor: `${config.primary}10` }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs hover:opacity-80">
            <LayoutGrid className="w-3.5 h-3.5" />
            Schema
          </button>
          <button onClick={() => setHistoryOpen(!historyOpen)}
            style={{ color: config.muted, backgroundColor: `${config.primary}10` }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs hover:opacity-80">
            <History className="w-3.5 h-3.5" />
            History
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Schema Sidebar */}
        {schemaOpen && (
          <div style={{ backgroundColor: config.card, borderRightColor: config.border, width: 240 }}
               className="border-r overflow-y-auto flex-shrink-0">
            <div style={{ borderBottomColor: config.border }} className="flex items-center justify-between px-3 py-2 border-b">
              <span style={{ color: config.text }} className="text-sm font-semibold">Schema</span>
              <button onClick={() => setSchemaOpen(false)} style={{ color: config.muted }}>
                <X className="w-4 h-4" />
              </button>
            </div>
            {dataset ? (
              <div className="p-2">
                {dataset.tables.map(table => (
                  <div key={table.tableName} className="mb-2">
                    <button onClick={() => setExpandedTable(expandedTable === table.tableName ? null : table.tableName)}
                      style={{ color: config.text }}
                      className="flex items-center gap-2 w-full text-left px-2 py-1.5 rounded-lg hover:bg-white/5 text-sm font-medium">
                      {expandedTable === table.tableName ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                      <Database className="w-3.5 h-3.5" style={{ color: config.primary }} />
                      {table.tableName}
                    </button>
                    {expandedTable === table.tableName && (
                      <div className="ml-6 mt-1 space-y-0.5">
                        {table.columns.map(col => (
                          <div key={col.name} className="flex items-center justify-between px-2 py-1">
                            <span style={{ color: config.muted }} className="text-xs">{col.name}</span>
                            <span style={{ color: config.primary }} className="text-xs">{col.type}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: config.muted }} className="text-xs p-3">Load a dataset to see schema.</p>
            )}
          </div>
        )}

        {/* Main Editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <SqlEditor
            initialValue={currentQuery}
            onExecute={handleExecute}
            results={results}
            isExecuting={isExecuting}
            onReset={() => resetDb()}
          />
        </div>

        {/* Query History Sidebar */}
        {historyOpen && (
          <div style={{ backgroundColor: config.card, borderLeftColor: config.border, width: 240 }}
               className="border-l overflow-y-auto flex-shrink-0">
            <div style={{ borderBottomColor: config.border }} className="flex items-center justify-between px-3 py-2 border-b">
              <span style={{ color: config.text }} className="text-sm font-semibold">History</span>
              <button onClick={() => setHistoryOpen(false)} style={{ color: config.muted }}>
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-2 space-y-1">
              {queryHistory.length === 0 ? (
                <p style={{ color: config.muted }} className="text-xs p-2">No history yet.</p>
              ) : queryHistory.map((q, i) => (
                <button key={i}
                  style={{ color: config.muted, borderColor: config.border }}
                  className="w-full text-left text-xs border rounded-lg p-2 hover:opacity-80 transition-opacity font-mono truncate">
                  {q.split('\n')[0].substring(0, 50)}...
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
