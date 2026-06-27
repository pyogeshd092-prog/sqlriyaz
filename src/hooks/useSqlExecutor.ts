// @ts-ignore
import alasql from 'alasql';
import { useState, useCallback } from 'react';
import type { QueryResult } from '../types';

let currentTables: string[] = [];

function extractTableNames(schema: string): string[] {
  const matches = schema.match(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(\w+)/gi) || [];
  return matches.map(m => m.replace(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?/i, '').trim());
}

function runSchema(schema: string) {
  for (const t of currentTables) {
    try { alasql(`DROP TABLE IF EXISTS \`${t}\``); } catch {}
  }
  currentTables = extractTableNames(schema);
  const statements = schema.split(';').map((s: string) => s.trim()).filter((s: string) => s.length > 0);
  for (const stmt of statements) {
    try { alasql(stmt); } catch (e) { console.error('Schema error:', e); }
  }
}

export function useSqlExecutor() {
  const [isExecuting, setIsExecuting] = useState(false);
  const [results, setResults] = useState<QueryResult | null>(null);
  const [queryHistory, setQueryHistory] = useState<string[]>([]);

  const initDb = useCallback(async (schema?: string) => {
    if (schema) runSchema(schema);
  }, []);

  const executeQuery = useCallback(async (sql: string, schema?: string): Promise<QueryResult> => {
    setIsExecuting(true);
    const start = performance.now();

    try {
      if (schema) runSchema(schema);

      const rawResults: any[] = alasql(sql);
      const elapsed = Math.round(performance.now() - start);

      let queryResult: QueryResult;
      if (!rawResults || rawResults.length === 0) {
        queryResult = { columns: [], rows: [], rowCount: 0, executionTime: elapsed };
      } else {
        const columns = Object.keys(rawResults[0]);
        const rows = rawResults.map((r: any) => columns.map(c => r[c]));
        queryResult = { columns, rows, rowCount: rows.length, executionTime: elapsed };
      }

      setResults(queryResult);
      setQueryHistory(prev => [sql, ...prev.slice(0, 49)]);
      return queryResult;
    } catch (err) {
      const error = err instanceof Error ? err.message : String(err);
      const queryResult: QueryResult = {
        columns: [], rows: [], rowCount: 0,
        executionTime: Math.round(performance.now() - start),
        error
      };
      setResults(queryResult);
      return queryResult;
    } finally {
      setIsExecuting(false);
    }
  }, []);

  const resetDb = useCallback(async (schema?: string) => {
    currentTables = [];
    if (schema) runSchema(schema);
    setResults(null);
  }, []);

  return { executeQuery, isExecuting, results, queryHistory, resetDb, initDb };
}