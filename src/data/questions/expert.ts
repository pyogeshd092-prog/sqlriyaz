import type { Question } from '../../types';

const EMP = {
  createSQL: "CREATE TABLE employees (emp_id INTEGER PRIMARY KEY, emp_name TEXT, dept_id INTEGER, salary REAL, hire_date TEXT, manager_id INTEGER);",
  insertSQL: "INSERT INTO employees VALUES (1,'Alice Johnson',1,85000,'2020-01-15',NULL),(2,'Bob Smith',2,62000,'2019-06-01',5),(3,'Carol White',1,92000,'2018-03-20',1),(4,'David Brown',3,55000,'2021-09-10',7),(5,'Eva Green',2,67000,'2020-11-05',NULL),(6,'Frank Lee',1,78000,'2017-07-22',1),(7,'Grace Kim',3,58000,'2022-01-30',NULL),(8,'Henry Das',4,72000,'2016-05-14',NULL),(9,'Isla Roy',4,69000,'2019-08-19',8),(10,'Jack Mehta',2,61000,'2021-03-11',5),(11,'Kiran Sharma',1,95000,'2015-04-01',NULL),(12,'Lena DS',2,58000,'2023-02-28',5),(13,'Mohan Rao',4,76000,'2018-11-11',8),(14,'Nina Kapoor',3,62000,'2020-06-15',7),(15,'Omar Sheikh',1,88000,'2019-09-30',11);"
};

const TRANSACTIONS = {
  createSQL: "CREATE TABLE transactions (txn_id INTEGER PRIMARY KEY, user_id INTEGER, amount REAL, txn_date TEXT, category TEXT, txn_type TEXT);",
  insertSQL: "INSERT INTO transactions VALUES (1,1001,5000,'2024-01-05','Food','debit'),(2,1001,15000,'2024-01-10','Salary','credit'),(3,1002,2000,'2024-01-12','Shopping','debit'),(4,1001,1000,'2024-01-15','Travel','debit'),(5,1002,25000,'2024-01-20','Salary','credit'),(6,1003,3000,'2024-01-22','Food','debit'),(7,1001,500,'2024-02-01','Food','debit'),(8,1002,800,'2024-02-05','Travel','debit'),(9,1003,30000,'2024-02-10','Salary','credit'),(10,1001,12000,'2024-02-12','Salary','credit'),(11,1002,5000,'2024-02-18','Shopping','debit'),(12,1003,2500,'2024-02-20','Food','debit'),(13,1001,200,'2024-03-01','Food','debit'),(14,1002,20000,'2024-03-05','Salary','credit'),(15,1003,4000,'2024-03-10','Shopping','debit');"
};

const SALES = {
  createSQL: "CREATE TABLE sales (sale_id INTEGER PRIMARY KEY, salesperson TEXT, region TEXT, revenue REAL, sale_date TEXT, quarter TEXT, product TEXT, customer_id INTEGER);",
  insertSQL: "INSERT INTO sales VALUES (1,'Alice','North',90000,'2024-01-10','Q1','Laptop',101),(2,'Bob','South',4000,'2024-01-15','Q1','Mouse',102),(3,'Alice','North',36000,'2024-02-01','Q1','Monitor',103),(4,'Carol','East',45000,'2024-02-10','Q1','Laptop',104),(5,'Bob','South',3000,'2024-02-20','Q1','Keyboard',105),(6,'Carol','East',8000,'2024-03-01','Q1','Chair',106),(7,'Alice','North',45000,'2024-04-05','Q2','Laptop',107),(8,'David','West',7000,'2024-04-10','Q2','Headphones',108),(9,'Bob','South',18000,'2024-04-15','Q2','Monitor',109),(10,'David','West',45000,'2024-05-01','Q2','Laptop',110),(11,'Carol','East',6000,'2024-05-10','Q2','Keyboard',111),(12,'Alice','North',5000,'2024-05-15','Q2','Webcam',112),(13,'Alice','North',120000,'2024-07-01','Q3','Enterprise',101),(14,'Carol','East',55000,'2024-07-10','Q3','Laptop',103),(15,'David','West',38000,'2024-08-01','Q3','Monitor',105);"
};

export const expertQuestions: Question[] = [
  {
    id: 301, title: "Recursive CTE: Full Org Chart", slug: "recursive-org-chart",
    difficulty: "Expert", category: "Recursive CTEs", tags: ["Recursive CTE", "Hierarchy", "Path"], companies: [],
    problemStatement: "Build the full organizational hierarchy showing each employee's path from root to themselves (e.g., 'CEO > Manager > Employee').",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"manager_id",type:"INTEGER"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{emp_name:"Alice Johnson",path:"Alice Johnson",depth:1},{emp_name:"Carol White",path:"Alice Johnson > Carol White",depth:2}],
    hint1: "Track the path string as you recurse.", hint2: "Concatenate parent path with ' > ' and current name.", hint3: "WITH RECURSIVE tree AS (SELECT emp_id, emp_name, emp_name AS path, 1 AS depth FROM employees WHERE manager_id IS NULL UNION ALL SELECT e.emp_id, e.emp_name, t.path || ' > ' || e.emp_name, t.depth+1 FROM employees e JOIN tree t ON e.manager_id = t.emp_id)",
    solution: "WITH RECURSIVE tree AS (\n  SELECT emp_id, emp_name, manager_id, emp_name AS path, 1 AS depth\n  FROM employees WHERE manager_id IS NULL\n  UNION ALL\n  SELECT e.emp_id, e.emp_name, e.manager_id, t.path || ' > ' || e.emp_name, t.depth + 1\n  FROM employees e\n  JOIN tree t ON e.manager_id = t.emp_id\n)\nSELECT emp_name, path, depth\nFROM tree\nORDER BY path;",
    explanation: "Building path strings during recursion enables breadcrumb navigation in hierarchies. || concatenates strings in SQL.", relatedQuestions: [302,217], xpReward: 80
  },
  {
    id: 302, title: "Recursive CTE: N-Level Subordinates", slug: "n-level-subordinates",
    difficulty: "Expert", category: "Recursive CTEs", tags: ["Recursive CTE", "Hierarchy", "Depth"], companies: [],
    problemStatement: "Find all direct and indirect reports of 'Alice Johnson' (her entire sub-tree, all levels).",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"manager_id",type:"INTEGER"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{emp_name:"Carol White",level:1},{emp_name:"Frank Lee",level:1},{emp_name:"Omar Sheikh",level:2}],
    hint1: "Start recursive CTE at Alice.", hint2: "Each iteration goes one level deeper.", hint3: "WITH RECURSIVE subordinates AS (SELECT emp_id, emp_name, 1 AS level FROM employees WHERE manager_id = (SELECT emp_id FROM employees WHERE emp_name = 'Alice Johnson') UNION ALL ...)",
    solution: "WITH RECURSIVE subordinates AS (\n  SELECT emp_id, emp_name, 1 AS level\n  FROM employees WHERE manager_id = (SELECT emp_id FROM employees WHERE emp_name = 'Alice Johnson')\n  UNION ALL\n  SELECT e.emp_id, e.emp_name, s.level + 1\n  FROM employees e\n  JOIN subordinates s ON e.manager_id = s.emp_id\n)\nSELECT emp_name, level FROM subordinates ORDER BY level, emp_name;",
    explanation: "Recursive CTE starts at Alice's direct reports, then recursively adds their reports. Terminates when no more children exist.", relatedQuestions: [301,303], xpReward: 80
  },
  {
    id: 303, title: "Advanced Analytics: Customer Lifetime Value Segments", slug: "customer-ltv-segments",
    difficulty: "Expert", category: "Advanced Analytics", tags: ["CTE", "NTILE", "Segmentation"], companies: [],
    problemStatement: "Segment users by total spending into VIP (top 20%), Regular (middle 60%), and Budget (bottom 20%) using transaction data.",
    tableStructure: [
      { tableName: "transactions", columns: [{name:"txn_id",type:"INTEGER"},{name:"user_id",type:"INTEGER"},{name:"amount",type:"REAL"},{name:"txn_type",type:"TEXT"}], createSQL: TRANSACTIONS.createSQL, insertSQL: TRANSACTIONS.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{user_id:1003,total_spend:9500,segment:"VIP"},{user_id:1001,total_spend:6700,segment:"Regular"}],
    hint1: "Calculate total debit per user first.", hint2: "Use NTILE(5) and map to segments.", hint3: "NTILE(5) groups into 5 equal parts; top (5) = VIP, 2-4 = Regular, bottom (1) = Budget",
    solution: "WITH spending AS (\n  SELECT user_id, SUM(amount) AS total_spend\n  FROM transactions WHERE txn_type = 'debit'\n  GROUP BY user_id\n),\ntiled AS (\n  SELECT user_id, total_spend, NTILE(5) OVER (ORDER BY total_spend ASC) AS tile\n  FROM spending\n)\nSELECT user_id, total_spend,\n  CASE\n    WHEN tile = 5 THEN 'VIP'\n    WHEN tile = 1 THEN 'Budget'\n    ELSE 'Regular'\n  END AS segment\nFROM tiled\nORDER BY total_spend DESC;",
    explanation: "Multi-CTE pipeline: first aggregate, then rank, then classify. This is a standard data science segmentation pattern.", relatedQuestions: [304,208], xpReward: 85
  },
  {
    id: 304, title: "Month-over-Month Growth Rate", slug: "mom-growth-rate",
    difficulty: "Expert", category: "Advanced Analytics", tags: ["LAG", "Window Functions", "Growth Rate"], companies: [],
    problemStatement: "Calculate month-over-month revenue growth rate (%) for each salesperson.",
    tableStructure: [
      { tableName: "sales", columns: [{name:"sale_id",type:"INTEGER"},{name:"salesperson",type:"TEXT"},{name:"revenue",type:"REAL"},{name:"sale_date",type:"TEXT"}], createSQL: SALES.createSQL, insertSQL: SALES.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{salesperson:"Alice",month:"2024-01",revenue:90000,prev_month_revenue:null,growth_pct:null}],
    hint1: "Aggregate by month first, then use LAG.", hint2: "(current - previous) / previous * 100 = growth.", hint3: "ROUND((revenue - LAG(revenue) OVER (...)) * 100.0 / LAG(revenue) OVER (...), 1)",
    solution: "WITH monthly AS (\n  SELECT salesperson, SUBSTR(sale_date, 1, 7) AS month, SUM(revenue) AS revenue\n  FROM sales\n  GROUP BY salesperson, SUBSTR(sale_date, 1, 7)\n)\nSELECT salesperson, month, revenue,\n  LAG(revenue) OVER (PARTITION BY salesperson ORDER BY month) AS prev_month_revenue,\n  ROUND((revenue - LAG(revenue) OVER (PARTITION BY salesperson ORDER BY month)) * 100.0 / NULLIF(LAG(revenue) OVER (PARTITION BY salesperson ORDER BY month), 0), 1) AS growth_pct\nFROM monthly\nORDER BY salesperson, month;",
    explanation: "Two-step: aggregate to monthly, then apply LAG window function. NULLIF prevents division by zero for first month.", relatedQuestions: [204,303], xpReward: 85
  },
  {
    id: 305, title: "Median Salary (Without MEDIAN Function)", slug: "median-salary",
    difficulty: "Expert", category: "Advanced Analytics", tags: ["NTILE", "Median", "Percentile"], companies: [],
    problemStatement: "Calculate the median salary across all employees without using a built-in MEDIAN function.",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{median_salary:69000}],
    hint1: "Median is the middle value. For N rows, it's at position (N+1)/2.", hint2: "Use ROW_NUMBER to rank, then find the middle.", hint3: "With 15 employees, median is at rank 8. Use OFFSET 7 LIMIT 1 after sorting.",
    solution: "WITH ranked AS (\n  SELECT salary, ROW_NUMBER() OVER (ORDER BY salary) AS rn, COUNT(*) OVER () AS total\n  FROM employees\n)\nSELECT AVG(salary) AS median_salary\nFROM ranked\nWHERE rn IN ((total + 1) / 2, (total + 2) / 2);",
    explanation: "For odd N: median is at (N+1)/2. For even N: average of N/2 and N/2+1. Integer division in WHERE handles both cases.", relatedQuestions: [208,303], xpReward: 90
  },
  {
    id: 306, title: "Transpose: Departments as Rows to Columns", slug: "transpose-departments",
    difficulty: "Expert", category: "Advanced Pivoting", tags: ["Pivot", "CASE", "Dynamic Columns"], companies: [],
    problemStatement: "Create a report showing employee count and average salary for each department as separate columns in a single row.",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"dept_id",type:"INTEGER"},{name:"salary",type:"REAL"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{eng_count:5,eng_avg_salary:87600,mkt_count:4,mkt_avg_salary:62000}],
    hint1: "Use SUM(CASE WHEN dept_id=1...) for each dept.", hint2: "Combine count and average using conditional aggregation.", hint3: "COUNT(CASE WHEN dept_id=1 THEN 1 END) AS eng_count, AVG(CASE WHEN dept_id=1 THEN salary END) AS eng_avg",
    solution: "SELECT COUNT(CASE WHEN dept_id = 1 THEN 1 END) AS eng_count, ROUND(AVG(CASE WHEN dept_id = 1 THEN salary END), 0) AS eng_avg_salary, COUNT(CASE WHEN dept_id = 2 THEN 1 END) AS mkt_count, ROUND(AVG(CASE WHEN dept_id = 2 THEN salary END), 0) AS mkt_avg_salary, COUNT(CASE WHEN dept_id = 3 THEN 1 END) AS hr_count, ROUND(AVG(CASE WHEN dept_id = 3 THEN salary END), 0) AS hr_avg_salary, COUNT(CASE WHEN dept_id = 4 THEN 1 END) AS fin_count, ROUND(AVG(CASE WHEN dept_id = 4 THEN salary END), 0) AS fin_avg_salary FROM employees;",
    explanation: "AVG(CASE WHEN ...) ignores NULLs (non-matching rows), giving conditional averages. COUNT(CASE WHEN ...) only counts matching rows.", relatedQuestions: [210,307], xpReward: 85
  },
  {
    id: 307, title: "User Retention: Month 1 Cohort Analysis", slug: "cohort-retention",
    difficulty: "Expert", category: "Advanced Analytics", tags: ["Cohort Analysis", "CTE", "Window Functions"], companies: [],
    problemStatement: "Find what percentage of users who transacted in January 2024 also transacted in February 2024 (Month 1 retention).",
    tableStructure: [
      { tableName: "transactions", columns: [{name:"txn_id",type:"INTEGER"},{name:"user_id",type:"INTEGER"},{name:"txn_date",type:"TEXT"}], createSQL: TRANSACTIONS.createSQL, insertSQL: TRANSACTIONS.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{jan_users:3,retained_in_feb:3,retention_pct:100}],
    hint1: "Find Jan users, then check which also appear in Feb.", hint2: "COUNT(DISTINCT) for user sets.", hint3: "WITH jan_users AS (SELECT DISTINCT user_id FROM transactions WHERE txn_date LIKE '2024-01-%'), feb_users AS (...)",
    solution: "WITH jan_users AS (\n  SELECT DISTINCT user_id FROM transactions WHERE txn_date LIKE '2024-01%'\n),\nfeb_users AS (\n  SELECT DISTINCT user_id FROM transactions WHERE txn_date LIKE '2024-02%'\n)\nSELECT\n  COUNT(*) AS jan_users,\n  SUM(CASE WHEN f.user_id IS NOT NULL THEN 1 ELSE 0 END) AS retained_in_feb,\n  ROUND(SUM(CASE WHEN f.user_id IS NOT NULL THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 0) AS retention_pct\nFROM jan_users j\nLEFT JOIN feb_users f ON j.user_id = f.user_id;",
    explanation: "Cohort analysis: define a user cohort (Jan users), then measure their behavior in subsequent periods. LEFT JOIN + CASE counts retained users.", relatedQuestions: [304,308], xpReward: 90
  },
  {
    id: 308, title: "Complex Report: Sales Scorecard", slug: "sales-scorecard",
    difficulty: "Expert", category: "Advanced Analytics", tags: ["Multiple CTEs", "Window Functions", "Complex Query"], companies: [],
    problemStatement: "Create a full sales scorecard per salesperson: total revenue, rank, quarter-over-quarter growth, and category (A/B/C based on rank).",
    tableStructure: [
      { tableName: "sales", columns: [{name:"sale_id",type:"INTEGER"},{name:"salesperson",type:"TEXT"},{name:"revenue",type:"REAL"},{name:"quarter",type:"TEXT"}], createSQL: SALES.createSQL, insertSQL: SALES.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{salesperson:"Alice",total_revenue:356000,revenue_rank:1,category:"A"}],
    hint1: "Build layered CTEs: first totals, then rank, then classify.", hint2: "Use RANK() window function for ranking.", hint3: "WITH totals AS (...), ranked AS (SELECT *, RANK() OVER (ORDER BY total DESC) FROM totals) SELECT *, CASE WHEN revenue_rank=1 THEN 'A' ... FROM ranked",
    solution: "WITH totals AS (\n  SELECT salesperson, SUM(revenue) AS total_revenue\n  FROM sales GROUP BY salesperson\n),\nranked AS (\n  SELECT salesperson, total_revenue, RANK() OVER (ORDER BY total_revenue DESC) AS revenue_rank\n  FROM totals\n),\nq1_totals AS (\n  SELECT salesperson, SUM(revenue) AS q1_rev FROM sales WHERE quarter='Q1' GROUP BY salesperson\n),\nq2_totals AS (\n  SELECT salesperson, SUM(revenue) AS q2_rev FROM sales WHERE quarter='Q2' GROUP BY salesperson\n)\nSELECT r.salesperson, r.total_revenue, r.revenue_rank,\n  CASE WHEN r.revenue_rank = 1 THEN 'A' WHEN r.revenue_rank <= 2 THEN 'B' ELSE 'C' END AS category,\n  q1.q1_rev, q2.q2_rev,\n  ROUND((q2.q2_rev - q1.q1_rev) * 100.0 / NULLIF(q1.q1_rev, 0), 1) AS qoq_growth_pct\nFROM ranked r\nLEFT JOIN q1_totals q1 ON r.salesperson = q1.salesperson\nLEFT JOIN q2_totals q2 ON r.salesperson = q2.salesperson\nORDER BY revenue_rank;",
    explanation: "Complex reports use multiple CTEs as building blocks. Each CTE solves one aspect; the final SELECT assembles the scorecard.", relatedQuestions: [304,306], xpReward: 100
  },
  {
    id: 309, title: "Longest Sequence of Wins", slug: "longest-streak",
    difficulty: "Expert", category: "Advanced Patterns", tags: ["Gap and Islands", "ROW_NUMBER", "Streak"], companies: [],
    problemStatement: "Find the salesperson with the highest single-month revenue in any quarter, and rank all months per salesperson.",
    tableStructure: [
      { tableName: "sales", columns: [{name:"sale_id",type:"INTEGER"},{name:"salesperson",type:"TEXT"},{name:"revenue",type:"REAL"},{name:"sale_date",type:"TEXT"},{name:"quarter",type:"TEXT"}], createSQL: SALES.createSQL, insertSQL: SALES.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{salesperson:"Alice",sale_date:"2024-07-01",revenue:120000,revenue_rank_overall:1}],
    hint1: "Rank all individual sales by revenue.", hint2: "Use RANK() OVER (ORDER BY revenue DESC).", hint3: "RANK() OVER (ORDER BY revenue DESC) AS revenue_rank_overall",
    solution: "WITH all_ranked AS (\n  SELECT salesperson, sale_date, quarter, revenue,\n    RANK() OVER (ORDER BY revenue DESC) AS revenue_rank_overall,\n    RANK() OVER (PARTITION BY salesperson ORDER BY revenue DESC) AS personal_rank\n  FROM sales\n)\nSELECT salesperson, sale_date, revenue, revenue_rank_overall, personal_rank\nFROM all_ranked\nWHERE revenue_rank_overall <= 5\nORDER BY revenue_rank_overall;",
    explanation: "Multiple window functions with different PARTITIONs give both global and per-person rankings simultaneously.", relatedQuestions: [308,201], xpReward: 85
  },
  {
    id: 310, title: "Self-Referential: Salary vs Department Average", slug: "salary-vs-dept-avg",
    difficulty: "Expert", category: "Advanced Analytics", tags: ["Window Functions", "Self-Join", "Comparison"], companies: [],
    problemStatement: "For each employee, show: their salary, department average salary, difference from dept average, and whether they are above/below average.",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"dept_id",type:"INTEGER"},{name:"salary",type:"REAL"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{emp_name:"Alice Johnson",salary:85000,dept_avg:87600,diff:-2600,vs_avg:"Below"}],
    hint1: "Use AVG() as a window function OVER PARTITION BY dept_id.", hint2: "Compute salary - dept_avg for difference.", hint3: "AVG(salary) OVER (PARTITION BY dept_id) AS dept_avg",
    solution: "SELECT emp_name, dept_id, salary, ROUND(AVG(salary) OVER (PARTITION BY dept_id), 0) AS dept_avg, salary - ROUND(AVG(salary) OVER (PARTITION BY dept_id), 0) AS diff, CASE WHEN salary >= AVG(salary) OVER (PARTITION BY dept_id) THEN 'Above' ELSE 'Below' END AS vs_avg FROM employees ORDER BY dept_id, salary DESC;",
    explanation: "Window functions compute group-level aggregates alongside row-level data without collapsing rows (unlike GROUP BY).", relatedQuestions: [201,305], xpReward: 80
  },
  {
    id: 311, title: "Multi-Dimension Analysis with GROUPING SETS", slug: "grouping-sets",
    difficulty: "Expert", category: "Advanced Aggregation", tags: ["CUBE", "ROLLUP", "Aggregation"], companies: [],
    problemStatement: "Using ROLLUP, produce a sales summary with subtotals by region, and a grand total.",
    tableStructure: [
      { tableName: "sales", columns: [{name:"sale_id",type:"INTEGER"},{name:"salesperson",type:"TEXT"},{name:"region",type:"TEXT"},{name:"revenue",type:"REAL"}], createSQL: SALES.createSQL, insertSQL: SALES.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{region:"East",salesperson:"Carol",total:114000},{region:"East",salesperson:null,total:114000},{region:null,salesperson:null,total:556000}],
    hint1: "ROLLUP creates subtotals at each level.", hint2: "GROUP BY ROLLUP(region, salesperson).", hint3: "GROUP BY ROLLUP(region, salesperson) creates rows for (region,salesperson), (region), and ()",
    solution: "SELECT COALESCE(region, 'GRAND TOTAL') AS region, COALESCE(salesperson, 'Subtotal') AS salesperson, SUM(revenue) AS total FROM sales GROUP BY ROLLUP(region, salesperson) ORDER BY region NULLS LAST, salesperson NULLS LAST;",
    explanation: "ROLLUP generates N+1 levels of aggregation. With (region, salesperson), it creates: per-person, per-region subtotals, and grand total.", relatedQuestions: [306,308], xpReward: 90
  },
  {
    id: 312, title: "Find Employees with Salary Higher Than All in Another Department", slug: "all-higher-than-dept",
    difficulty: "Expert", category: "Advanced Subqueries", tags: ["ALL", "Subquery", "Comparison"], companies: [],
    problemStatement: "Find employees whose salary is higher than every employee in the HR department (dept_id = 3).",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"dept_id",type:"INTEGER"},{name:"salary",type:"REAL"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{emp_name:"Alice Johnson",salary:85000},{emp_name:"Carol White",salary:92000},{emp_name:"Kiran Sharma",salary:95000}],
    hint1: "Use > ALL(...) or > MAX(...).", hint2: "ALL requires beating every value in the set.", hint3: "WHERE salary > ALL (SELECT salary FROM employees WHERE dept_id = 3)",
    solution: "SELECT emp_name, salary FROM employees WHERE salary > ALL (SELECT salary FROM employees WHERE dept_id = 3) AND dept_id != 3 ORDER BY salary DESC;",
    explanation: "> ALL is equivalent to > MAX of the subquery. Returns employees whose salary beats the highest HR salary.", relatedQuestions: [311,310], xpReward: 85
  },
  {
    id: 313, title: "User Spending Anomaly Detection", slug: "spending-anomaly",
    difficulty: "Expert", category: "Advanced Analytics", tags: ["Window Functions", "Z-Score", "Anomaly Detection"], companies: [],
    problemStatement: "Flag transactions that are more than 2x the user's average transaction amount as 'Anomaly'.",
    tableStructure: [
      { tableName: "transactions", columns: [{name:"txn_id",type:"INTEGER"},{name:"user_id",type:"INTEGER"},{name:"amount",type:"REAL"},{name:"txn_type",type:"TEXT"}], createSQL: TRANSACTIONS.createSQL, insertSQL: TRANSACTIONS.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{txn_id:2,user_id:1001,amount:15000,user_avg:4740,flag:"Anomaly"}],
    hint1: "Calculate each user's average amount using a window function.", hint2: "Compare each transaction to the window avg.", hint3: "AVG(amount) OVER (PARTITION BY user_id) AS user_avg",
    solution: "SELECT txn_id, user_id, amount, ROUND(AVG(amount) OVER (PARTITION BY user_id), 0) AS user_avg, CASE WHEN amount > 2 * AVG(amount) OVER (PARTITION BY user_id) THEN 'Anomaly' ELSE 'Normal' END AS flag FROM transactions ORDER BY user_id, txn_id;",
    explanation: "Window AVG computes per-user average without collapsing rows, allowing row-level comparison against the group average.", relatedQuestions: [310,307], xpReward: 90
  },
  {
    id: 314, title: "Recursive CTE: Number of Levels Deep", slug: "hierarchy-depth",
    difficulty: "Expert", category: "Recursive CTEs", tags: ["Recursive CTE", "Depth", "Hierarchy"], companies: [],
    problemStatement: "Find the maximum depth of the employee hierarchy (how many levels from CEO to deepest employee).",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"manager_id",type:"INTEGER"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{max_depth:3}],
    hint1: "Recursively build hierarchy with depth counter.", hint2: "Then SELECT MAX(depth).", hint3: "WITH RECURSIVE h AS (SELECT emp_id, 1 AS depth FROM employees WHERE manager_id IS NULL UNION ALL SELECT e.emp_id, h.depth+1 FROM employees e JOIN h ON e.manager_id = h.emp_id) SELECT MAX(depth) FROM h",
    solution: "WITH RECURSIVE h AS (\n  SELECT emp_id, 1 AS depth\n  FROM employees WHERE manager_id IS NULL\n  UNION ALL\n  SELECT e.emp_id, h.depth + 1\n  FROM employees e\n  JOIN h ON e.manager_id = h.emp_id\n)\nSELECT MAX(depth) AS max_depth FROM h;",
    explanation: "Recursive CTE traverses the tree. Tracking depth and taking MAX gives the height of the hierarchy tree.", relatedQuestions: [301,302], xpReward: 85
  },
  {
    id: 315, title: "Full Analytical Pipeline", slug: "full-analytical-pipeline",
    difficulty: "Expert", category: "Advanced Analytics", tags: ["Multiple CTEs", "Window Functions", "Complete Analysis"], companies: [],
    problemStatement: "Create a complete transaction analysis: per-user total credit/debit, net balance, spending rank, and classify as 'Saver' (credit > debit), 'Spender', or 'Balanced'.",
    tableStructure: [
      { tableName: "transactions", columns: [{name:"txn_id",type:"INTEGER"},{name:"user_id",type:"INTEGER"},{name:"amount",type:"REAL"},{name:"txn_type",type:"TEXT"}], createSQL: TRANSACTIONS.createSQL, insertSQL: TRANSACTIONS.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{user_id:1003,total_credit:30000,total_debit:9500,net_balance:20500,spend_rank:1,profile:"Saver"}],
    hint1: "Build CTEs step by step: credits, debits, combine, rank, classify.", hint2: "Use LEFT JOIN to combine credit and debit CTEs.", hint3: "RANK() OVER (ORDER BY total_debit DESC) AS spend_rank",
    solution: "WITH credits AS (\n  SELECT user_id, SUM(amount) AS total_credit FROM transactions WHERE txn_type = 'credit' GROUP BY user_id\n),\ndebits AS (\n  SELECT user_id, SUM(amount) AS total_debit FROM transactions WHERE txn_type = 'debit' GROUP BY user_id\n),\nsummary AS (\n  SELECT COALESCE(c.user_id, d.user_id) AS user_id,\n    COALESCE(c.total_credit, 0) AS total_credit,\n    COALESCE(d.total_debit, 0) AS total_debit,\n    COALESCE(c.total_credit, 0) - COALESCE(d.total_debit, 0) AS net_balance\n  FROM credits c\n  FULL OUTER JOIN debits d ON c.user_id = d.user_id\n),\nranked AS (\n  SELECT *, RANK() OVER (ORDER BY total_debit DESC) AS spend_rank FROM summary\n)\nSELECT user_id, total_credit, total_debit, net_balance, spend_rank,\n  CASE\n    WHEN total_credit > total_debit * 1.2 THEN 'Saver'\n    WHEN total_debit > total_credit * 1.2 THEN 'Spender'\n    ELSE 'Balanced'\n  END AS profile\nFROM ranked\nORDER BY spend_rank;",
    explanation: "Real-world analytics pipelines chain multiple CTEs. Each CTE handles one transformation step, making the query maintainable and testable.", relatedQuestions: [308,307], xpReward: 100
  },
];
