import type { Question } from '../../types';

const TRADING = {
  c: "CREATE TABLE trades (trade_id INTEGER PRIMARY KEY, trader TEXT, symbol TEXT, trade_type TEXT, quantity INTEGER, price REAL, trade_date TEXT);",
  i: "INSERT INTO trades VALUES (1,'Alice','AAPL','BUY',100,175,'2024-01-02'),(2,'Alice','GOOGL','BUY',50,140,'2024-01-02'),(3,'Bob','AAPL','BUY',200,175,'2024-01-02'),(4,'Alice','AAPL','SELL',50,180,'2024-01-05'),(5,'Bob','GOOGL','BUY',100,138,'2024-01-04'),(6,'Carol','MSFT','BUY',150,375,'2024-01-02'),(7,'Alice','MSFT','BUY',80,375,'2024-01-03'),(8,'Bob','AAPL','SELL',100,182,'2024-01-05'),(9,'Carol','AAPL','BUY',200,172,'2024-01-04'),(10,'Carol','MSFT','SELL',100,385,'2024-01-05'),(11,'Alice','AAPL','BUY',75,176,'2024-01-08'),(12,'Bob','MSFT','BUY',120,377,'2024-01-08'),(13,'Carol','GOOGL','BUY',80,141,'2024-01-08'),(14,'Alice','GOOGL','SELL',30,145,'2024-01-09'),(15,'Bob','AAPL','BUY',150,177,'2024-01-09');"
};

const HR = {
  c: "CREATE TABLE employees (emp_id INTEGER PRIMARY KEY, emp_name TEXT, dept_id INTEGER, salary REAL, hire_date TEXT, manager_id INTEGER);",
  i: "INSERT INTO employees VALUES (1,'Alice Johnson',1,85000,'2020-01-15',NULL),(2,'Bob Smith',2,62000,'2019-06-01',5),(3,'Carol White',1,92000,'2018-03-20',1),(4,'David Brown',3,55000,'2021-09-10',7),(5,'Eva Green',2,67000,'2020-11-05',NULL),(6,'Frank Lee',1,78000,'2017-07-22',1),(7,'Grace Kim',3,58000,'2022-01-30',NULL),(8,'Henry Das',4,72000,'2016-05-14',NULL),(9,'Isla Roy',4,69000,'2019-08-19',8),(10,'Jack Mehta',2,61000,'2021-03-11',5),(11,'Kiran Sharma',1,95000,'2015-04-01',NULL),(12,'Lena DS',2,58000,'2023-02-28',5),(13,'Mohan Rao',4,76000,'2018-11-11',8),(14,'Nina Kapoor',3,62000,'2020-06-15',7),(15,'Omar Sheikh',1,88000,'2019-09-30',11);"
};

const EVENTS = {
  c: "CREATE TABLE events (event_id INTEGER PRIMARY KEY, user_id INTEGER, event_type TEXT, event_time TEXT, session_id TEXT);",
  i: "INSERT INTO events VALUES (1,101,'page_view','2024-01-10 09:00:00','s1'),(2,101,'click','2024-01-10 09:01:30','s1'),(3,101,'purchase','2024-01-10 09:05:00','s1'),(4,102,'page_view','2024-01-10 10:00:00','s2'),(5,102,'click','2024-01-10 10:02:00','s2'),(6,102,'page_view','2024-01-10 10:05:00','s2'),(7,103,'page_view','2024-01-11 14:00:00','s3'),(8,103,'purchase','2024-01-11 14:03:00','s3'),(9,101,'page_view','2024-01-12 09:00:00','s4'),(10,101,'purchase','2024-01-12 09:02:00','s4'),(11,104,'page_view','2024-01-12 11:00:00','s5'),(12,104,'click','2024-01-12 11:01:00','s5'),(13,104,'click','2024-01-12 11:02:30','s5'),(14,104,'page_view','2024-01-12 11:05:00','s5'),(15,104,'purchase','2024-01-12 11:08:00','s5');"
};

export const expert2Questions: Question[] = [
  {
    id: 316, title: "Portfolio Value: BUY vs SELL Analysis", slug: "portfolio-buy-sell",
    difficulty: "Expert", category: "Advanced Analytics", tags: ["CASE", "SUM", "Multiple CTEs"], companies: [],
    problemStatement: "For each trader, calculate total BUY value, total SELL value, and net position (BUY - SELL) per symbol.",
    tableStructure: [
      { tableName:"trades", columns:[{name:"trade_id",type:"INTEGER"},{name:"trader",type:"TEXT"},{name:"symbol",type:"TEXT"},{name:"trade_type",type:"TEXT"},{name:"quantity",type:"INTEGER"},{name:"price",type:"REAL"}], createSQL:TRADING.c, insertSQL:TRADING.i }
    ],
    sampleData:{}, expectedOutput:[{trader:"Alice",symbol:"AAPL",buy_value:30775,sell_value:9000,net_position:21775}],
    hint1:"Separate BUY and SELL using CASE.", hint2:"SUM(CASE WHEN trade_type='BUY' THEN quantity*price ELSE 0 END).", hint3:"GROUP BY trader, symbol",
    solution:"SELECT trader, symbol, SUM(CASE WHEN trade_type='BUY' THEN quantity*price ELSE 0 END) AS buy_value, SUM(CASE WHEN trade_type='SELL' THEN quantity*price ELSE 0 END) AS sell_value, SUM(CASE WHEN trade_type='BUY' THEN quantity*price ELSE 0 END) - SUM(CASE WHEN trade_type='SELL' THEN quantity*price ELSE 0 END) AS net_position FROM trades GROUP BY trader, symbol ORDER BY trader, symbol;",
    explanation:"Conditional aggregation with CASE inside SUM separates BUY and SELL transactions into columns. GROUP BY two columns gives per-trader per-symbol analysis.", relatedQuestions:[317,218], xpReward:85
  },
  {
    id: 317, title: "Most Traded Symbol per Trader (Window)", slug: "most-traded-symbol",
    difficulty: "Expert", category: "Window Functions", tags: ["ROW_NUMBER","PARTITION BY","Analytics"], companies: [],
    problemStatement: "Find each trader's most frequently traded symbol (by number of trades).",
    tableStructure: [
      { tableName:"trades", columns:[{name:"trade_id",type:"INTEGER"},{name:"trader",type:"TEXT"},{name:"symbol",type:"TEXT"}], createSQL:TRADING.c, insertSQL:TRADING.i }
    ],
    sampleData:{}, expectedOutput:[{trader:"Alice",symbol:"AAPL",trade_count:3},{trader:"Bob",symbol:"AAPL",trade_count:3},{trader:"Carol",symbol:"AAPL",trade_count:2}],
    hint1:"Count trades per trader+symbol.", hint2:"ROW_NUMBER PARTITION BY trader ORDER BY count DESC.", hint3:"Filter WHERE rn = 1 for most traded",
    solution:"WITH trade_counts AS (\n  SELECT trader, symbol, COUNT(*) AS trade_count\n  FROM trades GROUP BY trader, symbol\n),\nranked AS (\n  SELECT *, ROW_NUMBER() OVER (PARTITION BY trader ORDER BY trade_count DESC) AS rn\n  FROM trade_counts\n)\nSELECT trader, symbol, trade_count FROM ranked WHERE rn = 1 ORDER BY trader;",
    explanation:"Multi-step: count per (trader, symbol), then rank within each trader. Top rank = most active symbol for that trader.", relatedQuestions:[316,203], xpReward:85
  },
  {
    id: 318, title: "Event Sequence Analysis: Steps to Purchase", slug: "event-sequence-purchase",
    difficulty: "Expert", category: "Advanced Analytics", tags: ["CTE","COUNT","Sequence"], companies: [],
    problemStatement: "For each session that ended in a purchase, count how many events occurred before the purchase (path length).",
    tableStructure: [
      { tableName:"events", columns:[{name:"event_id",type:"INTEGER"},{name:"user_id",type:"INTEGER"},{name:"event_type",type:"TEXT"},{name:"session_id",type:"TEXT"}], createSQL:EVENTS.c, insertSQL:EVENTS.i }
    ],
    sampleData:{}, expectedOutput:[{session_id:"s1",user_id:101,events_before_purchase:2},{session_id:"s3",user_id:103,events_before_purchase:1},{session_id:"s4",user_id:101,events_before_purchase:1},{session_id:"s5",user_id:104,events_before_purchase:4}],
    hint1:"Find sessions with a purchase.", hint2:"Count events per session that are not the purchase.", hint3:"Correlated subquery or GROUP BY with CASE",
    solution:"WITH purchase_sessions AS (\n  SELECT DISTINCT session_id, user_id FROM events WHERE event_type = 'purchase'\n),\npath_lengths AS (\n  SELECT e.session_id, p.user_id, COUNT(*) - 1 AS events_before_purchase\n  FROM events e JOIN purchase_sessions p ON e.session_id = p.session_id\n  GROUP BY e.session_id, p.user_id\n)\nSELECT * FROM path_lengths ORDER BY session_id;",
    explanation:"Find sessions with purchase, join all events in those sessions, subtract 1 (the purchase itself). Shorter paths = more direct purchase journeys.", relatedQuestions:[307,319], xpReward:90
  },
  {
    id: 319, title: "Recursive CTE: Salary Doubling Schedule", slug: "salary-doubling-recursive",
    difficulty: "Expert", category: "Recursive CTEs", tags: ["Recursive CTE","Finance","Simulation"], companies: [],
    problemStatement: "Using a recursive CTE, generate a 10-year salary projection for Alice assuming 10% annual raise each year.",
    tableStructure: [
      { tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL:HR.c, insertSQL:HR.i }
    ],
    sampleData:{}, expectedOutput:[{year:1,salary:85000},{year:2,salary:93500},{year:3,salary:102850}],
    hint1:"Start with Alice's current salary.", hint2:"Each year: new_salary = old_salary * 1.10.", hint3:"WITH RECURSIVE proj AS (SELECT 1 AS year, salary FROM employees WHERE emp_name='Alice' UNION ALL SELECT year+1, ROUND(salary*1.10,0) FROM proj WHERE year < 10)",
    solution:"WITH RECURSIVE projection(year, salary) AS (\n  SELECT 1, salary FROM employees WHERE emp_name = 'Alice Johnson'\n  UNION ALL\n  SELECT year + 1, ROUND(salary * 1.10, 0)\n  FROM projection WHERE year < 10\n)\nSELECT year, salary FROM projection ORDER BY year;",
    explanation:"Recursive CTE simulates compound growth: anchor gets starting salary, each iteration multiplies by 1.10. Terminates after 10 iterations.", relatedQuestions:[215,301], xpReward:85
  },
  {
    id: 320, title: "Advanced: Find Users Who Converted in Every Session", slug: "converted-every-session",
    difficulty: "Expert", category: "Advanced Analytics", tags: ["CTE","COUNT","Every Session","Analytics"], companies: [],
    problemStatement: "Find users who made a purchase in EVERY one of their sessions (100% session conversion rate).",
    tableStructure: [
      { tableName:"events", columns:[{name:"event_id",type:"INTEGER"},{name:"user_id",type:"INTEGER"},{name:"event_type",type:"TEXT"},{name:"session_id",type:"TEXT"}], createSQL:EVENTS.c, insertSQL:EVENTS.i }
    ],
    sampleData:{}, expectedOutput:[{user_id:103,total_sessions:1,purchase_sessions:1,conversion_rate:100}],
    hint1:"Count total sessions per user and purchase sessions per user.", hint2:"If they're equal, user converted every session.", hint3:"HAVING COUNT(DISTINCT session_id) = COUNT(DISTINCT CASE WHEN event_type='purchase' THEN session_id END)",
    solution:"WITH session_stats AS (\n  SELECT user_id,\n    COUNT(DISTINCT session_id) AS total_sessions,\n    COUNT(DISTINCT CASE WHEN event_type = 'purchase' THEN session_id END) AS purchase_sessions\n  FROM events\n  GROUP BY user_id\n)\nSELECT user_id, total_sessions, purchase_sessions, ROUND(purchase_sessions * 100.0 / total_sessions, 0) AS conversion_rate\nFROM session_stats\nWHERE purchase_sessions = total_sessions\nORDER BY user_id;",
    explanation:"COUNT(DISTINCT CASE WHEN...) counts unique sessions with purchases. Comparing to total sessions identifies 100% converters.", relatedQuestions:[307,318], xpReward:95
  },
  {
    id: 321, title: "Advanced Pivot: Trader Portfolio Matrix", slug: "trader-portfolio-matrix",
    difficulty: "Expert", category: "Advanced Pivoting", tags: ["Pivot","CASE","Complex Aggregation"], companies: [],
    problemStatement: "Create a matrix showing each trader's total quantity traded (BUY+SELL) per stock symbol as separate columns.",
    tableStructure: [
      { tableName:"trades", columns:[{name:"trade_id",type:"INTEGER"},{name:"trader",type:"TEXT"},{name:"symbol",type:"TEXT"},{name:"quantity",type:"INTEGER"}], createSQL:TRADING.c, insertSQL:TRADING.i }
    ],
    sampleData:{}, expectedOutput:[{trader:"Alice",AAPL:225,GOOGL:80,MSFT:80}],
    hint1:"Pivot symbol into columns.", hint2:"SUM(CASE WHEN symbol='AAPL' THEN quantity ELSE 0 END).", hint3:"GROUP BY trader",
    solution:"SELECT trader, SUM(CASE WHEN symbol='AAPL' THEN quantity ELSE 0 END) AS AAPL, SUM(CASE WHEN symbol='GOOGL' THEN quantity ELSE 0 END) AS GOOGL, SUM(CASE WHEN symbol='MSFT' THEN quantity ELSE 0 END) AS MSFT FROM trades GROUP BY trader ORDER BY trader;",
    explanation:"Pivot technique: one column per unique value (AAPL, GOOGL, MSFT) using conditional SUM. GROUP BY trader gives one row per trader.", relatedQuestions:[210,306], xpReward:85
  },
  {
    id: 322, title: "Identify High-Frequency Traders", slug: "high-frequency-traders",
    difficulty: "Expert", category: "Advanced Analytics", tags: ["Window Functions","Classification","Analytics"], companies: [],
    problemStatement: "Classify traders as 'High Frequency' (>5 trades), 'Medium' (3-5 trades), or 'Low' (<3 trades) and show their P&L.",
    tableStructure: [
      { tableName:"trades", columns:[{name:"trade_id",type:"INTEGER"},{name:"trader",type:"TEXT"},{name:"trade_type",type:"TEXT"},{name:"quantity",type:"INTEGER"},{name:"price",type:"REAL"}], createSQL:TRADING.c, insertSQL:TRADING.i }
    ],
    sampleData:{}, expectedOutput:[{trader:"Alice",total_trades:5,frequency:"Medium",gross_traded:49775}],
    hint1:"Count trades and SUM(quantity*price) per trader.", hint2:"CASE on trade count for classification.", hint3:"CASE WHEN trade_count > 5 THEN 'High Frequency' WHEN trade_count >= 3 THEN 'Medium' ELSE 'Low' END",
    solution:"WITH trader_stats AS (\n  SELECT trader, COUNT(*) AS total_trades, SUM(quantity*price) AS gross_traded\n  FROM trades GROUP BY trader\n)\nSELECT trader, total_trades, gross_traded, CASE WHEN total_trades > 5 THEN 'High Frequency' WHEN total_trades >= 3 THEN 'Medium' ELSE 'Low' END AS frequency FROM trader_stats ORDER BY total_trades DESC;",
    explanation:"CTE aggregates, outer CASE classifies. This multi-step approach cleanly separates computation from classification.", relatedQuestions:[321,303], xpReward:85
  },
  {
    id: 323, title: "Compare Trader Performance: Above/Below Peer Average", slug: "trader-vs-peer-avg",
    difficulty: "Expert", category: "Advanced Analytics", tags: ["Window Functions","AVG OVER","Peer Comparison"], companies: [],
    problemStatement: "For each trader, show their total BUY volume and how it compares to the average BUY volume across all traders.",
    tableStructure: [
      { tableName:"trades", columns:[{name:"trade_id",type:"INTEGER"},{name:"trader",type:"TEXT"},{name:"trade_type",type:"TEXT"},{name:"quantity",type:"INTEGER"},{name:"price",type:"REAL"}], createSQL:TRADING.c, insertSQL:TRADING.i }
    ],
    sampleData:{}, expectedOutput:[{trader:"Alice",buy_volume:24775,peer_avg:32658,vs_peers:"Below"}],
    hint1:"Aggregate BUY volume per trader first.", hint2:"Use window AVG() over all traders.", hint3:"AVG(buy_volume) OVER () as peer_avg",
    solution:"WITH buy_vols AS (\n  SELECT trader, SUM(quantity*price) AS buy_volume\n  FROM trades WHERE trade_type = 'BUY' GROUP BY trader\n)\nSELECT trader, buy_volume, ROUND(AVG(buy_volume) OVER (), 0) AS peer_avg, CASE WHEN buy_volume >= AVG(buy_volume) OVER () THEN 'Above' ELSE 'Below' END AS vs_peers FROM buy_vols ORDER BY buy_volume DESC;",
    explanation:"AVG() OVER() with no PARTITION BY applies to all rows (all traders). This creates a company-wide benchmark for comparison.", relatedQuestions:[310,228], xpReward:85
  },
  {
    id: 324, title: "Recursive Number Sequence with Conditional Exit", slug: "recursive-conditional-exit",
    difficulty: "Expert", category: "Recursive CTEs", tags: ["Recursive CTE","Simulation","Series"], companies: [],
    problemStatement: "Generate a sequence of numbers from 1 to 20, including only ODD numbers, using a recursive CTE.",
    tableStructure: [],
    sampleData:{}, expectedOutput:[{n:1},{n:3},{n:5},{n:7},{n:9},{n:11},{n:13},{n:15},{n:17},{n:19}],
    hint1:"Start from 1, add 2 each step.", hint2:"Stop at 20 with WHERE n + 2 <= 20.", hint3:"WITH RECURSIVE seq(n) AS (SELECT 1 UNION ALL SELECT n+2 FROM seq WHERE n+2 <= 20)",
    solution:"WITH RECURSIVE odds(n) AS (\n  SELECT 1\n  UNION ALL\n  SELECT n + 2 FROM odds WHERE n + 2 <= 20\n)\nSELECT n FROM odds ORDER BY n;",
    explanation:"Recursive CTE increments by 2 instead of 1, naturally generating only odd numbers. WHERE n+2 <= 20 prevents over-recursion.", relatedQuestions:[215,216], xpReward:80
  },
  {
    id: 325, title: "Complete Analytical Dashboard Query", slug: "analytical-dashboard",
    difficulty: "Expert", category: "Advanced Analytics", tags: ["Multiple CTEs","Full Pipeline","Comprehensive"], companies: [],
    problemStatement: "Build a complete employee performance dashboard: average salary by dept, top earner per dept, dept headcount, and budget utilization (salary/budget %).",
    tableStructure: [
      { tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"dept_id",type:"INTEGER"},{name:"salary",type:"REAL"}], createSQL:HR.c, insertSQL:HR.i },
      { tableName:"departments", columns:[{name:"dept_id",type:"INTEGER"},{name:"dept_name",type:"TEXT"},{name:"budget",type:"REAL"}], createSQL:"CREATE TABLE departments (dept_id INTEGER PRIMARY KEY, dept_name TEXT, budget REAL, location TEXT);", insertSQL:"INSERT INTO departments VALUES (1,'Engineering',500000,'Bangalore'),(2,'Marketing',200000,'Mumbai'),(3,'HR',150000,'Delhi'),(4,'Finance',300000,'Chennai');" }
    ],
    sampleData:{}, expectedOutput:[{dept_name:"Engineering",headcount:5,avg_salary:87600,top_earner:"Kiran Sharma",budget_util_pct:87.6}],
    hint1:"Multiple CTEs: one for stats, one for top earners.", hint2:"Join CTEs with departments table.", hint3:"WITH dept_stats AS (...), top_earners AS (...) SELECT ... FROM departments d JOIN dept_stats s ... JOIN top_earners t ...",
    solution:"WITH dept_stats AS (\n  SELECT dept_id, COUNT(*) AS headcount, ROUND(AVG(salary),0) AS avg_salary, SUM(salary) AS total_payroll\n  FROM employees GROUP BY dept_id\n),\ntop_earners AS (\n  SELECT dept_id, emp_name AS top_earner\n  FROM employees\n  WHERE (dept_id, salary) IN (SELECT dept_id, MAX(salary) FROM employees GROUP BY dept_id)\n)\nSELECT d.dept_name, s.headcount, s.avg_salary, t.top_earner, ROUND(s.total_payroll * 100.0 / d.budget, 1) AS budget_util_pct\nFROM departments d\nJOIN dept_stats s ON d.dept_id = s.dept_id\nJOIN top_earners t ON d.dept_id = t.dept_id\nORDER BY budget_util_pct DESC;",
    explanation:"Enterprise reporting uses chained CTEs: one for aggregates, one for top earners. Final SELECT joins everything with the departments table for a complete view.", relatedQuestions:[308,315], xpReward:100
  },
];
