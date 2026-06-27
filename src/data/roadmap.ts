import type { RoadmapTopic } from '../types';

export const roadmapTopics: RoadmapTopic[] = [
  {
    id: "select-basics",
    title: "SELECT Statement",
    level: "Beginner",
    description: "The foundation of SQL — retrieving data from tables.",
    syntax: "SELECT column1, column2, ...\nFROM table_name;",
    example: "SELECT emp_name, salary\nFROM employees;",
    output: "Returns specified columns for all rows.",
    tips: ["Use SELECT * sparingly in production — list specific columns", "Column aliases make output readable: SELECT salary AS annual_salary"],
    questionIds: [1, 2, 3]
  },
  {
    id: "where-clause",
    title: "WHERE Clause",
    level: "Beginner",
    description: "Filter rows based on conditions.",
    syntax: "SELECT columns\nFROM table\nWHERE condition;",
    example: "SELECT * FROM employees\nWHERE salary > 70000 AND department = 'Engineering';",
    output: "Only rows matching the condition are returned.",
    tips: ["Combine conditions with AND, OR, NOT", "Order of operations: NOT > AND > OR (use parentheses to be explicit)"],
    questionIds: [2, 6, 9]
  },
  {
    id: "order-by",
    title: "ORDER BY",
    level: "Beginner",
    description: "Sort query results by one or more columns.",
    syntax: "SELECT columns FROM table\nORDER BY column1 [ASC|DESC], column2 [ASC|DESC];",
    example: "SELECT emp_name, salary FROM employees\nORDER BY salary DESC, emp_name ASC;",
    output: "Rows returned in specified sort order.",
    tips: ["Default is ASC (ascending)", "You can ORDER BY column position: ORDER BY 2 DESC sorts by 2nd column"],
    questionIds: [3, 10]
  },
  {
    id: "limit",
    title: "LIMIT / TOP",
    level: "Beginner",
    description: "Restrict the number of rows returned.",
    syntax: "SELECT columns FROM table\nORDER BY column\nLIMIT n OFFSET m;",
    example: "SELECT * FROM employees\nORDER BY salary DESC\nLIMIT 5 OFFSET 10;",
    output: "Returns at most n rows, skipping m rows.",
    tips: ["Always use with ORDER BY for consistent results", "OFFSET enables pagination: page 2 = LIMIT 10 OFFSET 10"],
    questionIds: [10]
  },
  {
    id: "distinct",
    title: "DISTINCT",
    level: "Beginner",
    description: "Eliminate duplicate rows from results.",
    syntax: "SELECT DISTINCT column1, column2\nFROM table;",
    example: "SELECT DISTINCT department, location\nFROM employees;",
    output: "Only unique combinations of the specified columns.",
    tips: ["DISTINCT applies to all selected columns together", "COUNT(DISTINCT col) counts unique non-null values"],
    questionIds: [5]
  },
  {
    id: "like-pattern",
    title: "LIKE & Pattern Matching",
    level: "Beginner",
    description: "Match strings against patterns with wildcards.",
    syntax: "WHERE column LIKE 'pattern'",
    example: "-- Starts with 'A'\nWHERE name LIKE 'A%'\n-- Contains 'son'\nWHERE name LIKE '%son%'\n-- 5 chars starting with A\nWHERE name LIKE 'A____'",
    output: "Rows where the column matches the pattern.",
    tips: ["% = any number of characters, _ = exactly one character", "Use ILIKE in PostgreSQL for case-insensitive matching"],
    questionIds: [8]
  },
  {
    id: "null-handling",
    title: "NULL Handling",
    level: "Beginner",
    description: "Deal with missing or unknown values in SQL.",
    syntax: "WHERE column IS NULL\nWHERE column IS NOT NULL\nCOALESCE(column, default_value)",
    example: "SELECT emp_name,\n  COALESCE(manager_id, 'No Manager') AS manager\nFROM employees\nWHERE department IS NOT NULL;",
    output: "NULL-aware filtering and replacement.",
    tips: ["Never use = NULL or != NULL — always IS NULL / IS NOT NULL", "COALESCE returns first non-NULL value from its arguments"],
    questionIds: [12]
  },
  {
    id: "inner-join",
    title: "INNER JOIN",
    level: "Intermediate",
    description: "Combine rows from two tables that have matching values.",
    syntax: "SELECT t1.col, t2.col\nFROM table1 t1\nINNER JOIN table2 t2 ON t1.key = t2.key;",
    example: "SELECT e.emp_name, d.dept_name\nFROM employees e\nINNER JOIN departments d ON e.dept_id = d.dept_id;",
    output: "Only rows with matches in BOTH tables.",
    tips: ["INNER JOIN is the most common type", "Use table aliases for readability"],
    questionIds: [18, 21]
  },
  {
    id: "left-join",
    title: "LEFT JOIN",
    level: "Intermediate",
    description: "Return all rows from the left table, matched rows from the right.",
    syntax: "SELECT t1.col, t2.col\nFROM table1 t1\nLEFT JOIN table2 t2 ON t1.key = t2.key;",
    example: "-- Find departments with no employees\nSELECT d.dept_name, e.emp_name\nFROM departments d\nLEFT JOIN employees e ON d.dept_id = e.dept_id\nWHERE e.emp_id IS NULL;",
    output: "All left rows + matched right rows (NULLs for no match).",
    tips: ["LEFT JOIN + IS NULL = Anti-join pattern (very common in interviews)", "RIGHT JOIN is just LEFT JOIN with tables reversed"],
    questionIds: [19, 20]
  },
  {
    id: "group-by-having",
    title: "GROUP BY & HAVING",
    level: "Intermediate",
    description: "Aggregate rows and filter groups.",
    syntax: "SELECT col, AGG(col2)\nFROM table\nWHERE row_condition\nGROUP BY col\nHAVING group_condition;",
    example: "SELECT department, COUNT(*) AS staff, AVG(salary) AS avg_sal\nFROM employees\nGROUP BY department\nHAVING COUNT(*) > 2\nORDER BY avg_sal DESC;",
    output: "One row per group meeting the HAVING condition.",
    tips: ["WHERE filters rows BEFORE grouping; HAVING filters groups AFTER", "You can use aggregate functions in HAVING but not in WHERE"],
    questionIds: [7, 13, 24]
  },
  {
    id: "subqueries",
    title: "Subqueries",
    level: "Intermediate",
    description: "Nested queries used in SELECT, FROM, or WHERE clauses.",
    syntax: "-- Scalar subquery\nWHERE col > (SELECT AVG(col) FROM table)\n-- Derived table\nFROM (SELECT ... FROM ...) AS alias\n-- Correlated subquery\nWHERE EXISTS (SELECT 1 FROM t2 WHERE t2.id = t1.id)",
    example: "SELECT emp_name, salary\nFROM employees\nWHERE salary > (SELECT AVG(salary) FROM employees);",
    output: "Rows filtered by the result of the inner query.",
    tips: ["Scalar subquery returns one value; table subquery returns rows", "Correlated subqueries run once per outer row (can be slow)"],
    questionIds: [16, 17, 25]
  },
  {
    id: "cte",
    title: "Common Table Expressions (CTE)",
    level: "Intermediate",
    description: "Named temporary result sets that improve readability.",
    syntax: "WITH cte_name AS (\n  SELECT ...\n)\nSELECT * FROM cte_name;",
    example: "WITH high_earners AS (\n  SELECT emp_name, salary\n  FROM employees\n  WHERE salary > 80000\n)\nSELECT * FROM high_earners\nORDER BY salary DESC;",
    output: "CTE acts as a temporary table within the query.",
    tips: ["Multiple CTEs: WITH cte1 AS (...), cte2 AS (...)", "CTEs make complex queries much more readable than nested subqueries"],
    questionIds: [53, 55]
  },
  {
    id: "window-functions",
    title: "Window Functions",
    level: "Advanced",
    description: "Perform calculations across related rows without collapsing them.",
    syntax: "function() OVER (\n  PARTITION BY col\n  ORDER BY col\n  ROWS BETWEEN ... AND ...\n)",
    example: "SELECT emp_name, department, salary,\n  RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank,\n  AVG(salary) OVER (PARTITION BY department) AS dept_avg\nFROM employees;",
    output: "Original rows preserved with new calculated columns.",
    tips: ["PARTITION BY = GROUP BY but rows aren't collapsed", "ROW_NUMBER() = unique, RANK() = gaps on ties, DENSE_RANK() = no gaps"],
    questionIds: [51, 52, 53, 54, 55]
  },
  {
    id: "recursive-cte",
    title: "Recursive CTE",
    level: "Advanced",
    description: "CTEs that reference themselves to handle hierarchical or sequential data.",
    syntax: "WITH RECURSIVE cte AS (\n  -- Anchor (base case)\n  SELECT ...\n  UNION ALL\n  -- Recursive member\n  SELECT ... FROM cte WHERE termination_condition\n)",
    example: "WITH RECURSIVE org AS (\n  SELECT emp_id, emp_name, 1 AS level\n  FROM employees WHERE manager_id IS NULL\n  UNION ALL\n  SELECT e.emp_id, e.emp_name, o.level + 1\n  FROM employees e JOIN org o ON e.manager_id = o.emp_id\n)\nSELECT * FROM org;",
    output: "Traverses hierarchical data level by level.",
    tips: ["Always include a termination condition to avoid infinite loops", "Use for: org charts, bill of materials, category trees, number sequences"],
    questionIds: [76, 77]
  },
  {
    id: "query-optimization",
    title: "Query Optimization",
    level: "Advanced",
    description: "Techniques to write faster, more efficient SQL queries.",
    syntax: "-- Use indexes, avoid SELECT *, filter early\nEXPLAIN SELECT ... (see the query plan)",
    example: "-- Slow: function on indexed column\nWHERE YEAR(hire_date) = 2024\n\n-- Fast: range comparison preserves index\nWHERE hire_date >= '2024-01-01'\n  AND hire_date < '2025-01-01'",
    output: "Same results, dramatically faster execution.",
    tips: ["Avoid functions on WHERE clause columns — they prevent index use", "Filter as early as possible; join on indexed columns", "EXPLAIN / EXPLAIN ANALYZE shows the query execution plan"],
    questionIds: []
  }
];

export const getLevelTopics = (level: string) =>
  roadmapTopics.filter(t => t.level === level);
