const KEYWORDS = ['SELECT','FROM','WHERE','JOIN','INNER','LEFT','RIGHT','FULL','ON','GROUP','BY','ORDER','HAVING','LIMIT','OFFSET','WITH','AS','AND','OR','NOT','IN','BETWEEN','LIKE','IS','NULL','CASE','WHEN','THEN','ELSE','END','UNION','ALL','DISTINCT','COUNT','SUM','AVG','MIN','MAX','OVER','PARTITION','RANK','ROW_NUMBER','DENSE_RANK','LEAD','LAG','RECURSIVE','INSERT','INTO','VALUES','UPDATE','SET','DELETE','CREATE','TABLE','DROP','ALTER','INDEX'];

export function formatSQL(sql: string): string {
  if (!sql.trim()) return sql;
  let formatted = sql.trim().replace(/\s+/g, ' ');
  KEYWORDS.forEach(kw => {
    const re = new RegExp(`\\b${kw}\\b`, 'gi');
    formatted = formatted.replace(re, kw);
  });

  const lineBreaks: Record<string, string> = {
    'SELECT': '\nSELECT',
    'FROM': '\nFROM',
    'WHERE': '\nWHERE',
    'INNER JOIN': '\nINNER JOIN',
    'LEFT JOIN': '\nLEFT JOIN',
    'RIGHT JOIN': '\nRIGHT JOIN',
    'FULL JOIN': '\nFULL JOIN',
    'JOIN': '\nJOIN',
    'GROUP BY': '\nGROUP BY',
    'ORDER BY': '\nORDER BY',
    'HAVING': '\nHAVING',
    'LIMIT': '\nLIMIT',
    'UNION': '\nUNION',
    'UNION ALL': '\nUNION ALL'
  };

  Object.entries(lineBreaks).forEach(([kw, replacement]) => {
    formatted = formatted.replace(new RegExp(`\\b${kw}\\b`, 'g'), replacement);
  });

  return formatted.trim();
}

export function downloadCSV(columns: string[], rows: unknown[][]): void {
  const header = columns.join(',');
  const body = rows.map(row => 
    row.map(cell => {
      const s = String(cell ?? '');
      return s.includes(',') || s.includes('"') ? `"${s.replace(/"/g, '""')}"` : s;
    }).join(',')
  ).join('\n');

  const blob = new Blob([`${header}\n${body}`], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sqlriyaz_results_${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'Easy': return 'text-green-400 bg-green-400/10 border-green-400/30';
    case 'Medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
    case 'Hard': return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
    case 'Expert': return 'text-red-400 bg-red-400/10 border-red-400/30';
    default: return 'text-gray-400';
  }
}

export function getXPForDifficulty(difficulty: string): number {
  switch (difficulty) {
    case 'Easy': return 10;
    case 'Medium': return 25;
    case 'Hard': return 50;
    case 'Expert': return 100;
    default: return 10;
  }
}
