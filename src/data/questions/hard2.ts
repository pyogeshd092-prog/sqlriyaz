import type { Question } from '../../types';

const TRADING = {
  createSQL: "CREATE TABLE stock_prices (stock_id INTEGER PRIMARY KEY, symbol TEXT, price REAL, trade_date TEXT, volume INTEGER, market_cap REAL);",
  insertSQL: "INSERT INTO stock_prices VALUES (1,'AAPL',175,'2024-01-02',50000000,2800000),(2,'AAPL',178,'2024-01-03',45000000,2850000),(3,'AAPL',172,'2024-01-04',55000000,2750000),(4,'AAPL',180,'2024-01-05',60000000,2880000),(5,'AAPL',176,'2024-01-08',48000000,2816000),(6,'GOOGL',140,'2024-01-02',30000000,1750000),(7,'GOOGL',142,'2024-01-03',28000000,1775000),(8,'GOOGL',138,'2024-01-04',35000000,1725000),(9,'GOOGL',145,'2024-01-05',32000000,1812500),(10,'GOOGL',141,'2024-01-08',29000000,1762500),(11,'MSFT',375,'2024-01-02',25000000,2800000),(12,'MSFT',380,'2024-01-03',22000000,2837000),(13,'MSFT',372,'2024-01-04',28000000,2776000),(14,'MSFT',385,'2024-01-05',30000000,2873000),(15,'MSFT',377,'2024-01-08',24000000,2814000);"
};

const VISITS = {
  createSQL: "CREATE TABLE page_views (view_id INTEGER PRIMARY KEY, user_id INTEGER, page TEXT, view_date TEXT, time_spent_sec INTEGER, source TEXT);",
  insertSQL: "INSERT INTO page_views VALUES (1,1001,'Home','2024-01-10',45,'organic'),(2,1001,'Products','2024-01-10',120,'organic'),(3,1001,'Checkout','2024-01-10',300,'organic'),(4,1002,'Home','2024-01-10',30,'paid'),(5,1002,'Products','2024-01-10',90,'paid'),(6,1003,'Home','2024-01-11',60,'organic'),(7,1003,'Blog','2024-01-11',180,'organic'),(8,1003,'Products','2024-01-11',150,'organic'),(9,1004,'Home','2024-01-11',25,'social'),(10,1004,'Home','2024-01-12',40,'social'),(11,1001,'Home','2024-01-12',55,'direct'),(12,1002,'Blog','2024-01-12',200,'paid'),(13,1005,'Home','2024-01-12',35,'organic'),(14,1005,'Products','2024-01-12',110,'organic'),(15,1005,'Checkout','2024-01-12',250,'organic');"
};

const EMP = {
  createSQL: "CREATE TABLE employees (emp_id INTEGER PRIMARY KEY, emp_name TEXT, dept_id INTEGER, salary REAL, hire_date TEXT, manager_id INTEGER);",
  insertSQL: "INSERT INTO employees VALUES (1,'Alice Johnson',1,85000,'2020-01-15',NULL),(2,'Bob Smith',2,62000,'2019-06-01',5),(3,'Carol White',1,92000,'2018-03-20',1),(4,'David Brown',3,55000,'2021-09-10',7),(5,'Eva Green',2,67000,'2020-11-05',NULL),(6,'Frank Lee',1,78000,'2017-07-22',1),(7,'Grace Kim',3,58000,'2022-01-30',NULL),(8,'Henry Das',4,72000,'2016-05-14',NULL),(9,'Isla Roy',4,69000,'2019-08-19',8),(10,'Jack Mehta',2,61000,'2021-03-11',5),(11,'Kiran Sharma',1,95000,'2015-04-01',NULL),(12,'Lena DS',2,58000,'2023-02-28',5),(13,'Mohan Rao',4,76000,'2018-11-11',8),(14,'Nina Kapoor',3,62000,'2020-06-15',7),(15,'Omar Sheikh',1,88000,'2019-09-30',11);"
};

export const hard2Questions: Question[] = [
  {
    id: 221, title: "Stock Price Daily Change with LAG", slug: "stock-price-daily-change",
    difficulty: "Hard", category: "Window Functions", tags: ["LAG", "Window Functions", "Finance"], companies: [],
    problemStatement: "For each stock, calculate the daily price change and percentage change from the previous trading day.",
    tableStructure: [
      { tableName: "stock_prices", columns: [{name:"stock_id",type:"INTEGER"},{name:"symbol",type:"TEXT"},{name:"price",type:"REAL"},{name:"trade_date",type:"TEXT"}], createSQL: TRADING.createSQL, insertSQL: TRADING.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{symbol:"AAPL",trade_date:"2024-01-02",price:175,prev_price:null,change:null},{symbol:"AAPL",trade_date:"2024-01-03",price:178,prev_price:175,change:3,pct_change:1.71}],
    hint1: "Use LAG(price) OVER (PARTITION BY symbol ORDER BY trade_date).", hint2: "Calculate difference and percentage.", hint3: "price - LAG(price) OVER (...) AS change",
    solution: "SELECT symbol, trade_date, price, LAG(price) OVER (PARTITION BY symbol ORDER BY trade_date) AS prev_price, price - LAG(price) OVER (PARTITION BY symbol ORDER BY trade_date) AS change, ROUND((price - LAG(price) OVER (PARTITION BY symbol ORDER BY trade_date)) * 100.0 / LAG(price) OVER (PARTITION BY symbol ORDER BY trade_date), 2) AS pct_change FROM stock_prices ORDER BY symbol, trade_date;",
    explanation: "PARTITION BY symbol creates separate windows per stock. LAG compares today vs yesterday. Two window functions with same OVER share computation.", relatedQuestions: [204,222], xpReward: 50
  },
  {
    id: 222, title: "Highest Stock Price in Rolling 3-Day Window", slug: "rolling-3-day-max",
    difficulty: "Hard", category: "Window Functions", tags: ["MAX OVER", "Window Functions", "ROWS BETWEEN"], companies: [],
    problemStatement: "For each stock, find the highest price in the current and previous 2 trading days.",
    tableStructure: [
      { tableName: "stock_prices", columns: [{name:"stock_id",type:"INTEGER"},{name:"symbol",type:"TEXT"},{name:"price",type:"REAL"},{name:"trade_date",type:"TEXT"}], createSQL: TRADING.createSQL, insertSQL: TRADING.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{symbol:"AAPL",trade_date:"2024-01-02",price:175,rolling_3d_max:175},{symbol:"AAPL",trade_date:"2024-01-03",price:178,rolling_3d_max:178}],
    hint1: "MAX as window function with ROWS BETWEEN.", hint2: "2 PRECEDING AND CURRENT ROW gives 3-row window.", hint3: "MAX(price) OVER (PARTITION BY symbol ORDER BY trade_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)",
    solution: "SELECT symbol, trade_date, price, MAX(price) OVER (PARTITION BY symbol ORDER BY trade_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS rolling_3d_max FROM stock_prices ORDER BY symbol, trade_date;",
    explanation: "MAX() as a window function with a 3-row frame finds the peak price over a rolling window. Useful for resistance level analysis.", relatedQuestions: [221,207], xpReward: 50
  },
  {
    id: 223, title: "First and Last Purchase per Customer", slug: "first-last-purchase",
    difficulty: "Hard", category: "Window Functions", tags: ["FIRST_VALUE", "LAST_VALUE", "PARTITION BY"], companies: [],
    problemStatement: "Using page_views, find for each user: the first page they visited and the last page they visited.",
    tableStructure: [
      { tableName: "page_views", columns: [{name:"view_id",type:"INTEGER"},{name:"user_id",type:"INTEGER"},{name:"page",type:"TEXT"},{name:"view_date",type:"TEXT"},{name:"time_spent_sec",type:"INTEGER"}], createSQL: VISITS.createSQL, insertSQL: VISITS.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{user_id:1001,first_page:"Home",last_page:"Home"}],
    hint1: "FIRST_VALUE gives the first in the ordered window.", hint2: "LAST_VALUE with RANGE BETWEEN UNBOUNDED for the last.", hint3: "FIRST_VALUE(page) OVER (PARTITION BY user_id ORDER BY view_date, view_id)",
    solution: "WITH user_visits AS (\n  SELECT user_id, page, view_date, view_id,\n    FIRST_VALUE(page) OVER (PARTITION BY user_id ORDER BY view_date, view_id) AS first_page,\n    LAST_VALUE(page) OVER (PARTITION BY user_id ORDER BY view_date, view_id ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS last_page\n  FROM page_views\n)\nSELECT DISTINCT user_id, first_page, last_page FROM user_visits ORDER BY user_id;",
    explanation: "FIRST_VALUE uses default frame (start to current). LAST_VALUE needs UNBOUNDED FOLLOWING to see to the end of partition.", relatedQuestions: [209,224], xpReward: 50
  },
  {
    id: 224, title: "Session Analysis: Time Between Page Views", slug: "session-analysis",
    difficulty: "Hard", category: "Window Functions", tags: ["LAG", "Session Analysis", "Window Functions"], companies: [],
    problemStatement: "For each user's page views, calculate the gap (in seconds) between consecutive page visits.",
    tableStructure: [
      { tableName: "page_views", columns: [{name:"view_id",type:"INTEGER"},{name:"user_id",type:"INTEGER"},{name:"page",type:"TEXT"},{name:"view_date",type:"TEXT"},{name:"time_spent_sec",type:"INTEGER"}], createSQL: VISITS.createSQL, insertSQL: VISITS.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{user_id:1001,page:"Home",prev_page:null,gap_sec:null},{user_id:1001,page:"Products",prev_page:"Home",gap_sec:45}],
    hint1: "LAG(page) gives the previous page.", hint2: "LAG(time_spent_sec) can give time from previous visit.", hint3: "LAG(page) OVER (PARTITION BY user_id ORDER BY view_date, view_id)",
    solution: "SELECT user_id, page, LAG(page) OVER (PARTITION BY user_id ORDER BY view_date, view_id) AS prev_page, LAG(time_spent_sec) OVER (PARTITION BY user_id ORDER BY view_date, view_id) AS gap_sec FROM page_views ORDER BY user_id, view_date, view_id;",
    explanation: "LAG within PARTITION BY user_id tracks each user's journey independently. The gap is how long they spent on the previous page.", relatedQuestions: [223,225], xpReward: 50
  },
  {
    id: 225, title: "Conversion Funnel Analysis", slug: "conversion-funnel",
    difficulty: "Hard", category: "Advanced Analytics", tags: ["COUNT", "CASE", "Funnel"], companies: [],
    problemStatement: "Build a conversion funnel: count unique users who visited Home → Products → Checkout (each stage separately).",
    tableStructure: [
      { tableName: "page_views", columns: [{name:"view_id",type:"INTEGER"},{name:"user_id",type:"INTEGER"},{name:"page",type:"TEXT"},{name:"view_date",type:"TEXT"}], createSQL: VISITS.createSQL, insertSQL: VISITS.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{stage:"Home",unique_users:5},{stage:"Products",unique_users:4},{stage:"Checkout",unique_users:2}],
    hint1: "Use COUNT(DISTINCT) per page.", hint2: "UNION results for each funnel stage.", hint3: "SELECT 'Home' AS stage, COUNT(DISTINCT user_id) FROM page_views WHERE page='Home' UNION ALL ...",
    solution: "SELECT 'Home' AS stage, COUNT(DISTINCT user_id) AS unique_users FROM page_views WHERE page = 'Home'\nUNION ALL\nSELECT 'Products', COUNT(DISTINCT user_id) FROM page_views WHERE page = 'Products'\nUNION ALL\nSELECT 'Checkout', COUNT(DISTINCT user_id) FROM page_views WHERE page = 'Checkout';",
    explanation: "Funnel analysis counts unique users at each stage. UNION ALL combines named stages. The drop-off between stages shows conversion rates.", relatedQuestions: [307,226], xpReward: 45
  },
  {
    id: 226, title: "Percentile Rank of Employees", slug: "percentile-rank",
    difficulty: "Hard", category: "Window Functions", tags: ["PERCENT_RANK", "CUME_DIST", "Window Functions"], companies: [],
    problemStatement: "Calculate each employee's percentile rank within their department based on salary.",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"dept_id",type:"INTEGER"},{name:"salary",type:"REAL"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{emp_name:"Alice Johnson",salary:85000,dept_id:1,pct_rank:0.5}],
    hint1: "CUME_DIST() gives cumulative distribution.", hint2: "PARTITION BY dept_id, ORDER BY salary.", hint3: "ROUND(CUME_DIST() OVER (PARTITION BY dept_id ORDER BY salary), 2)",
    solution: "SELECT emp_name, dept_id, salary, ROUND(CUME_DIST() OVER (PARTITION BY dept_id ORDER BY salary), 2) AS cume_dist_pct, ROUND(PERCENT_RANK() OVER (PARTITION BY dept_id ORDER BY salary), 2) AS pct_rank FROM employees ORDER BY dept_id, salary;",
    explanation: "CUME_DIST: fraction of values <= current. PERCENT_RANK: (rank-1)/(count-1). Both measure relative position within the window.", relatedQuestions: [208,213], xpReward: 50
  },
  {
    id: 227, title: "Stock with Highest Average Volume", slug: "highest-avg-volume",
    difficulty: "Hard", category: "Window Functions", tags: ["AVG OVER", "PARTITION BY", "Ranking"], companies: [],
    problemStatement: "Find the stock with the highest average trading volume across all trading days.",
    tableStructure: [
      { tableName: "stock_prices", columns: [{name:"stock_id",type:"INTEGER"},{name:"symbol",type:"TEXT"},{name:"price",type:"REAL"},{name:"trade_date",type:"TEXT"},{name:"volume",type:"INTEGER"}], createSQL: TRADING.createSQL, insertSQL: TRADING.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{symbol:"AAPL",avg_volume:51600000}],
    hint1: "AVG volume per symbol.", hint2: "ORDER BY avg_volume DESC LIMIT 1.", hint3: "SELECT symbol, AVG(volume) FROM stock_prices GROUP BY symbol ORDER BY AVG(volume) DESC LIMIT 1",
    solution: "WITH vol_avg AS (\n  SELECT symbol, AVG(volume) AS avg_volume, RANK() OVER (ORDER BY AVG(volume) DESC) AS rnk\n  FROM stock_prices GROUP BY symbol\n)\nSELECT symbol, ROUND(avg_volume, 0) AS avg_volume FROM vol_avg WHERE rnk = 1;",
    explanation: "CTE aggregates average volume per symbol, window RANK() finds the top. Equivalent to simple ORDER BY + LIMIT 1 but handles ties.", relatedQuestions: [228,222], xpReward: 40
  },
  {
    id: 228, title: "Double Window: Compare to Both Department and Company Average", slug: "double-window-comparison",
    difficulty: "Hard", category: "Window Functions", tags: ["Multiple Windows", "Comparison", "Analytics"], companies: [],
    problemStatement: "Show each employee's salary vs their department average AND vs the company average.",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"dept_id",type:"INTEGER"},{name:"salary",type:"REAL"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{emp_name:"Alice Johnson",salary:85000,dept_avg:87600,company_avg:72000,vs_dept:"Below",vs_company:"Above"}],
    hint1: "Two window functions with different PARTITION BY.", hint2: "PARTITION BY dept_id for dept avg; no PARTITION for company avg.", hint3: "AVG(salary) OVER (PARTITION BY dept_id) and AVG(salary) OVER ()",
    solution: "SELECT emp_name, dept_id, salary, ROUND(AVG(salary) OVER (PARTITION BY dept_id), 0) AS dept_avg, ROUND(AVG(salary) OVER (), 0) AS company_avg, CASE WHEN salary >= AVG(salary) OVER (PARTITION BY dept_id) THEN 'Above' ELSE 'Below' END AS vs_dept, CASE WHEN salary >= AVG(salary) OVER () THEN 'Above' ELSE 'Below' END AS vs_company FROM employees ORDER BY dept_id, salary DESC;",
    explanation: "OVER() with no PARTITION BY covers all rows (company-wide). OVER(PARTITION BY dept_id) covers each department separately.", relatedQuestions: [310,226], xpReward: 55
  },
  {
    id: 229, title: "Page Source Effectiveness", slug: "page-source-effectiveness",
    difficulty: "Hard", category: "Advanced Analytics", tags: ["GROUP BY", "CASE", "Aggregation"], companies: [],
    problemStatement: "Analyze traffic sources: for each source, show total visits, unique users, and average time spent per page.",
    tableStructure: [
      { tableName: "page_views", columns: [{name:"view_id",type:"INTEGER"},{name:"user_id",type:"INTEGER"},{name:"source",type:"TEXT"},{name:"time_spent_sec",type:"INTEGER"}], createSQL: VISITS.createSQL, insertSQL: VISITS.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{source:"organic",total_visits:9,unique_users:3,avg_time_sec:121.1}],
    hint1: "GROUP BY source.", hint2: "COUNT(*) for visits, COUNT(DISTINCT user_id) for unique users.", hint3: "SELECT source, COUNT(*), COUNT(DISTINCT user_id), AVG(time_spent_sec)",
    solution: "SELECT source, COUNT(*) AS total_visits, COUNT(DISTINCT user_id) AS unique_users, ROUND(AVG(time_spent_sec), 1) AS avg_time_sec FROM page_views GROUP BY source ORDER BY total_visits DESC;",
    explanation: "COUNT(*) counts all views. COUNT(DISTINCT user_id) counts unique people. AVG gives engagement time. Together they show source quality.", relatedQuestions: [225,230], xpReward: 40
  },
  {
    id: 230, title: "Employee Salary Change Simulation with CASE", slug: "salary-change-simulation",
    difficulty: "Hard", category: "Advanced Analytics", tags: ["CASE", "Window Functions", "Simulation"], companies: [],
    problemStatement: "Simulate a salary adjustment: employees in bottom 25% salary quartile get 20% raise, middle 50% get 10%, top 25% get 5%. Show old and new salary.",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"dept_id",type:"INTEGER"},{name:"salary",type:"REAL"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{emp_name:"David Brown",salary:55000,quartile:1,raise_pct:20,new_salary:66000}],
    hint1: "NTILE(4) for quartiles.", hint2: "CASE on quartile for raise percentage.", hint3: "new_salary = salary * (1 + raise_pct/100)",
    solution: "WITH tiled AS (\n  SELECT emp_name, salary, NTILE(4) OVER (ORDER BY salary ASC) AS quartile\n  FROM employees\n),\nadjusted AS (\n  SELECT emp_name, salary, quartile,\n    CASE WHEN quartile = 1 THEN 20 WHEN quartile = 4 THEN 5 ELSE 10 END AS raise_pct\n  FROM tiled\n)\nSELECT emp_name, salary, quartile, raise_pct, ROUND(salary * (1 + raise_pct / 100.0), 0) AS new_salary\nFROM adjusted\nORDER BY salary;",
    explanation: "Multi-step CTE: NTILE creates salary quartiles, CASE maps quartile to raise rate, final SELECT computes new salaries.", relatedQuestions: [213,208], xpReward: 55
  },
];
