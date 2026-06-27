import type { Question } from '../../types';

const EMP = {
  createSQL: "CREATE TABLE employees (emp_id INTEGER PRIMARY KEY, emp_name TEXT, dept_id INTEGER, salary REAL, hire_date TEXT);",
  insertSQL: "INSERT INTO employees VALUES (1,'Alice Johnson',1,85000,'2020-01-15'),(2,'Bob Smith',2,62000,'2019-06-01'),(3,'Carol White',1,92000,'2018-03-20'),(4,'David Brown',3,55000,'2021-09-10'),(5,'Eva Green',2,67000,'2020-11-05'),(6,'Frank Lee',1,78000,'2017-07-22'),(7,'Grace Kim',3,58000,'2022-01-30'),(8,'Henry Das',4,72000,'2016-05-14'),(9,'Isla Roy',4,69000,'2019-08-19'),(10,'Jack Mehta',2,61000,'2021-03-11'),(11,'Kiran Sharma',1,95000,'2015-04-01'),(12,'Lena D''Souza',2,58000,'2023-02-28'),(13,'Mohan Rao',4,76000,'2018-11-11'),(14,'Nina Kapoor',3,62000,'2020-06-15'),(15,'Omar Sheikh',1,88000,'2019-09-30');"
};

const SALES = {
  createSQL: "CREATE TABLE sales (sale_id INTEGER PRIMARY KEY, salesperson TEXT, region TEXT, revenue REAL, sale_date TEXT, quarter TEXT, product TEXT);",
  insertSQL: "INSERT INTO sales VALUES (1,'Alice','North',90000,'2024-01-10','Q1','Laptop'),(2,'Bob','South',4000,'2024-01-15','Q1','Mouse'),(3,'Alice','North',36000,'2024-02-01','Q1','Monitor'),(4,'Carol','East',45000,'2024-02-10','Q1','Laptop'),(5,'Bob','South',3000,'2024-02-20','Q1','Keyboard'),(6,'Carol','East',8000,'2024-03-01','Q1','Chair'),(7,'Alice','North',45000,'2024-04-05','Q2','Laptop'),(8,'David','West',7000,'2024-04-10','Q2','Headphones'),(9,'Bob','South',18000,'2024-04-15','Q2','Monitor'),(10,'David','West',45000,'2024-05-01','Q2','Laptop'),(11,'Carol','East',6000,'2024-05-10','Q2','Keyboard'),(12,'Alice','North',5000,'2024-05-15','Q2','Webcam'),(13,'Alice','North',120000,'2024-07-01','Q3','Enterprise'),(14,'Carol','East',55000,'2024-07-10','Q3','Laptop'),(15,'David','West',38000,'2024-08-01','Q3','Monitor'),(16,'Bob','South',22000,'2024-08-15','Q3','Monitor'),(17,'Alice','North',15000,'2024-09-01','Q3','Webcam'),(18,'Carol','East',70000,'2024-09-10','Q3','Enterprise');"
};

const ORDERS = {
  createSQL: "CREATE TABLE orders (order_id INTEGER PRIMARY KEY, customer_id INTEGER, product TEXT, amount REAL, order_date TEXT, status TEXT);",
  insertSQL: "INSERT INTO orders VALUES (1,101,'Laptop',45000,'2024-01-10','Completed'),(2,102,'Mouse',800,'2024-01-15','Completed'),(3,101,'Keyboard',1500,'2024-02-01','Pending'),(4,103,'Monitor',18000,'2024-02-10','Completed'),(5,104,'Desk',12000,'2024-02-20','Cancelled'),(6,102,'Chair',8000,'2024-03-01','Completed'),(7,105,'Laptop',45000,'2024-03-05','Pending'),(8,101,'Headphones',3500,'2024-03-10','Completed'),(9,103,'Webcam',2500,'2024-03-15','Completed'),(10,106,'Notebook',50,'2024-03-20','Completed'),(11,101,'Monitor',18000,'2024-04-01','Completed'),(12,102,'Laptop',45000,'2024-04-05','Completed'),(13,103,'Chair',8000,'2024-04-10','Completed'),(14,104,'Keyboard',1500,'2024-04-15','Completed'),(15,105,'Mouse',800,'2024-04-20','Completed');"
};

export const hardQuestions: Question[] = [
  {
    id: 201, title: "ROW_NUMBER: Rank Employees by Salary", slug: "row-number-salary",
    difficulty: "Hard", category: "Window Functions", tags: ["ROW_NUMBER", "OVER", "PARTITION BY"], companies: [],
    problemStatement: "Assign a rank to each employee within their department based on salary (highest = rank 1).",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"dept_id",type:"INTEGER"},{name:"salary",type:"REAL"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{emp_name:"Kiran Sharma",dept_id:1,salary:95000,dept_rank:1},{emp_name:"Carol White",dept_id:1,salary:92000,dept_rank:2}],
    hint1: "Use ROW_NUMBER() window function.", hint2: "PARTITION BY divides rows into groups.", hint3: "ROW_NUMBER() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS dept_rank",
    solution: "SELECT emp_name, dept_id, salary, ROW_NUMBER() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS dept_rank FROM employees ORDER BY dept_id, dept_rank;",
    explanation: "ROW_NUMBER() assigns sequential numbers within each PARTITION. ORDER BY inside OVER determines the ranking order.", relatedQuestions: [202,203], xpReward: 40
  },
  {
    id: 202, title: "RANK vs DENSE_RANK: Handling Ties", slug: "rank-vs-dense-rank",
    difficulty: "Hard", category: "Window Functions", tags: ["RANK", "DENSE_RANK", "Ties"], companies: [],
    problemStatement: "Show employee salaries with both RANK and DENSE_RANK (to illustrate how they handle equal salaries).",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{emp_name:"Kiran Sharma",salary:95000,rnk:1,dense_rnk:1},{emp_name:"Carol White",salary:92000,rnk:2,dense_rnk:2}],
    hint1: "RANK skips numbers after ties; DENSE_RANK does not.", hint2: "Use both in the same SELECT.", hint3: "RANK() OVER (ORDER BY salary DESC) AS rnk, DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rnk",
    solution: "SELECT emp_name, salary, RANK() OVER (ORDER BY salary DESC) AS rnk, DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rnk FROM employees ORDER BY salary DESC;",
    explanation: "RANK: gaps after ties (1,1,3). DENSE_RANK: no gaps (1,1,2). Choose based on business need.", relatedQuestions: [201,203], xpReward: 40
  },
  {
    id: 203, title: "TOP N per Group: Top 2 per Department", slug: "top-n-per-group",
    difficulty: "Hard", category: "Window Functions", tags: ["ROW_NUMBER", "Top N per Group"], companies: [],
    problemStatement: "Find the top 2 highest-paid employees in each department.",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"dept_id",type:"INTEGER"},{name:"salary",type:"REAL"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{emp_name:"Kiran Sharma",dept_id:1,salary:95000,dept_rank:1},{emp_name:"Carol White",dept_id:1,salary:92000,dept_rank:2}],
    hint1: "Use ROW_NUMBER inside a CTE.", hint2: "Then filter WHERE dept_rank <= 2.", hint3: "WITH ranked AS (SELECT *, ROW_NUMBER() OVER (...) AS r FROM employees) SELECT * FROM ranked WHERE r <= 2",
    solution: "WITH ranked AS (\n  SELECT emp_name, dept_id, salary, ROW_NUMBER() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS dept_rank\n  FROM employees\n)\nSELECT emp_name, dept_id, salary, dept_rank\nFROM ranked\nWHERE dept_rank <= 2\nORDER BY dept_id, dept_rank;",
    explanation: "The 'Top N per group' pattern: use ROW_NUMBER() with PARTITION BY in a CTE, then filter in outer query.", relatedQuestions: [201,204], xpReward: 45
  },
  {
    id: 204, title: "LAG: Month-over-Month Revenue Change", slug: "lag-mom-change",
    difficulty: "Hard", category: "Window Functions", tags: ["LAG", "Window Functions"], companies: [],
    problemStatement: "For each sale, show the previous sale's revenue by the same salesperson and the difference.",
    tableStructure: [
      { tableName: "sales", columns: [{name:"sale_id",type:"INTEGER"},{name:"salesperson",type:"TEXT"},{name:"revenue",type:"REAL"},{name:"sale_date",type:"TEXT"}], createSQL: SALES.createSQL, insertSQL: SALES.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{salesperson:"Alice",revenue:90000,prev_revenue:null,change:null},{salesperson:"Alice",revenue:36000,prev_revenue:90000,change:-54000}],
    hint1: "LAG() accesses the previous row's value.", hint2: "PARTITION BY salesperson, ORDER BY sale_date.", hint3: "LAG(revenue) OVER (PARTITION BY salesperson ORDER BY sale_date) AS prev_revenue",
    solution: "SELECT salesperson, sale_date, revenue, LAG(revenue) OVER (PARTITION BY salesperson ORDER BY sale_date) AS prev_revenue, revenue - LAG(revenue) OVER (PARTITION BY salesperson ORDER BY sale_date) AS change FROM sales ORDER BY salesperson, sale_date;",
    explanation: "LAG(col) returns the value of col from the previous row in the window. LEAD() does the same for the next row.", relatedQuestions: [205,201], xpReward: 45
  },
  {
    id: 205, title: "LEAD: Next Sale Preview", slug: "lead-next-sale",
    difficulty: "Hard", category: "Window Functions", tags: ["LEAD", "Window Functions"], companies: [],
    problemStatement: "For each sale by Alice, show the revenue of her next sale.",
    tableStructure: [
      { tableName: "sales", columns: [{name:"sale_id",type:"INTEGER"},{name:"salesperson",type:"TEXT"},{name:"revenue",type:"REAL"},{name:"sale_date",type:"TEXT"}], createSQL: SALES.createSQL, insertSQL: SALES.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{sale_date:"2024-01-10",revenue:90000,next_revenue:36000},{sale_date:"2024-02-01",revenue:36000,next_revenue:45000}],
    hint1: "LEAD() accesses the next row's value.", hint2: "Filter to Alice after computing.", hint3: "LEAD(revenue) OVER (PARTITION BY salesperson ORDER BY sale_date) AS next_revenue",
    solution: "SELECT sale_date, revenue, LEAD(revenue) OVER (PARTITION BY salesperson ORDER BY sale_date) AS next_revenue FROM sales WHERE salesperson = 'Alice' ORDER BY sale_date;",
    explanation: "LEAD(col) looks forward to the next row. Useful for forecasting and sequential comparisons.", relatedQuestions: [204,206], xpReward: 40
  },
  {
    id: 206, title: "Running Total with SUM OVER", slug: "running-total-sum-over",
    difficulty: "Hard", category: "Window Functions", tags: ["SUM OVER", "Running Total", "ROWS BETWEEN"], companies: [],
    problemStatement: "Calculate a running (cumulative) total of revenue across all sales, ordered by sale date.",
    tableStructure: [
      { tableName: "sales", columns: [{name:"sale_id",type:"INTEGER"},{name:"salesperson",type:"TEXT"},{name:"revenue",type:"REAL"},{name:"sale_date",type:"TEXT"}], createSQL: SALES.createSQL, insertSQL: SALES.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{sale_date:"2024-01-10",revenue:90000,running_total:90000},{sale_date:"2024-01-15",revenue:4000,running_total:94000}],
    hint1: "Use SUM as a window function.", hint2: "ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW.", hint3: "SUM(revenue) OVER (ORDER BY sale_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)",
    solution: "SELECT sale_date, salesperson, revenue, SUM(revenue) OVER (ORDER BY sale_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total FROM sales ORDER BY sale_date;",
    explanation: "Window frame ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW creates a cumulative sum from the first row to the current.", relatedQuestions: [207,204], xpReward: 45
  },
  {
    id: 207, title: "Moving Average: 3-Sale Rolling Average", slug: "moving-average",
    difficulty: "Hard", category: "Window Functions", tags: ["AVG OVER", "Moving Average", "ROWS BETWEEN"], companies: [],
    problemStatement: "Calculate a 3-sale rolling average of revenue per salesperson.",
    tableStructure: [
      { tableName: "sales", columns: [{name:"sale_id",type:"INTEGER"},{name:"salesperson",type:"TEXT"},{name:"revenue",type:"REAL"},{name:"sale_date",type:"TEXT"}], createSQL: SALES.createSQL, insertSQL: SALES.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{salesperson:"Alice",sale_date:"2024-01-10",revenue:90000,rolling_avg:90000}],
    hint1: "Use AVG as a window function.", hint2: "ROWS BETWEEN 2 PRECEDING AND CURRENT ROW for 3-row window.", hint3: "AVG(revenue) OVER (PARTITION BY salesperson ORDER BY sale_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)",
    solution: "SELECT salesperson, sale_date, revenue, ROUND(AVG(revenue) OVER (PARTITION BY salesperson ORDER BY sale_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 0) AS rolling_avg FROM sales ORDER BY salesperson, sale_date;",
    explanation: "ROWS BETWEEN 2 PRECEDING AND CURRENT ROW creates a 3-row window (2 previous + current). Used for smoothing fluctuations.", relatedQuestions: [206,208], xpReward: 50
  },
  {
    id: 208, title: "NTILE: Divide Employees into Quartiles", slug: "ntile-quartiles",
    difficulty: "Hard", category: "Window Functions", tags: ["NTILE", "Window Functions", "Distribution"], companies: [],
    problemStatement: "Divide employees into 4 salary quartiles (1=bottom 25%, 4=top 25%).",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{emp_name:"David Brown",salary:55000,quartile:1},{emp_name:"Grace Kim",salary:58000,quartile:1}],
    hint1: "NTILE(4) divides into 4 equal buckets.", hint2: "Order by salary ascending.", hint3: "NTILE(4) OVER (ORDER BY salary ASC) AS quartile",
    solution: "SELECT emp_name, salary, NTILE(4) OVER (ORDER BY salary ASC) AS quartile FROM employees ORDER BY salary;",
    explanation: "NTILE(n) divides result set into n roughly equal buckets. Useful for percentile analysis.", relatedQuestions: [201,202], xpReward: 40
  },
  {
    id: 209, title: "FIRST_VALUE and LAST_VALUE", slug: "first-last-value",
    difficulty: "Hard", category: "Window Functions", tags: ["FIRST_VALUE", "LAST_VALUE", "Window Functions"], companies: [],
    problemStatement: "For each employee, show the highest and lowest salary in their department using window functions.",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"dept_id",type:"INTEGER"},{name:"salary",type:"REAL"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{emp_name:"Alice Johnson",salary:85000,dept_max:95000,dept_min:78000}],
    hint1: "FIRST_VALUE picks first in the window order.", hint2: "Use LAST_VALUE with RANGE BETWEEN UNBOUNDED for the last value.", hint3: "MAX(salary) OVER (PARTITION BY dept_id) works too for max/min",
    solution: "SELECT emp_name, dept_id, salary, MAX(salary) OVER (PARTITION BY dept_id) AS dept_max, MIN(salary) OVER (PARTITION BY dept_id) AS dept_min FROM employees ORDER BY dept_id, salary DESC;",
    explanation: "MAX/MIN as window functions give department-level stats alongside each row. FIRST_VALUE/LAST_VALUE give first/last in ordered window.", relatedQuestions: [201,207], xpReward: 40
  },
  {
    id: 210, title: "Pivot: Revenue by Quarter as Columns", slug: "pivot-revenue-by-quarter",
    difficulty: "Hard", category: "Pivoting", tags: ["CASE", "Pivot", "GROUP BY"], companies: [],
    problemStatement: "Pivot quarterly sales so each quarter becomes a column, showing revenue per salesperson.",
    tableStructure: [
      { tableName: "sales", columns: [{name:"sale_id",type:"INTEGER"},{name:"salesperson",type:"TEXT"},{name:"revenue",type:"REAL"},{name:"quarter",type:"TEXT"}], createSQL: SALES.createSQL, insertSQL: SALES.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{salesperson:"Alice",Q1:126000,Q2:50000,Q3:135000}],
    hint1: "Use SUM(CASE WHEN quarter=... THEN revenue END).", hint2: "GROUP BY salesperson.", hint3: "SUM(CASE WHEN quarter='Q1' THEN revenue ELSE 0 END) AS Q1",
    solution: "SELECT salesperson, SUM(CASE WHEN quarter = 'Q1' THEN revenue ELSE 0 END) AS Q1, SUM(CASE WHEN quarter = 'Q2' THEN revenue ELSE 0 END) AS Q2, SUM(CASE WHEN quarter = 'Q3' THEN revenue ELSE 0 END) AS Q3 FROM sales GROUP BY salesperson ORDER BY salesperson;",
    explanation: "Conditional aggregation (SUM of CASE) pivots row values into columns. This is the standard pivot technique in SQL.", relatedQuestions: [122,211], xpReward: 50
  },
  {
    id: 211, title: "Complex Subquery: Department Salary Rank", slug: "dept-salary-rank-subquery",
    difficulty: "Hard", category: "Subqueries", tags: ["Correlated Subquery", "COUNT"], companies: [],
    problemStatement: "For each employee, show their salary rank within their department (without using window functions).",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"dept_id",type:"INTEGER"},{name:"salary",type:"REAL"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{emp_name:"Kiran Sharma",dept_id:1,salary:95000,dept_rank:1}],
    hint1: "Count employees in same dept with higher salary.", hint2: "The count + 1 = rank.", hint3: "SELECT COUNT(*) FROM employees e2 WHERE e2.dept_id = e1.dept_id AND e2.salary > e1.salary",
    solution: "SELECT e1.emp_name, e1.dept_id, e1.salary, (SELECT COUNT(*) FROM employees e2 WHERE e2.dept_id = e1.dept_id AND e2.salary > e1.salary) + 1 AS dept_rank FROM employees e1 ORDER BY e1.dept_id, dept_rank;",
    explanation: "Correlated subquery counts employees with higher salary in same dept. Adding 1 gives the rank.", relatedQuestions: [203,201], xpReward: 50
  },
  {
    id: 212, title: "Gap and Islands: Consecutive Orders", slug: "consecutive-orders",
    difficulty: "Hard", category: "Advanced Patterns", tags: ["ROW_NUMBER", "Gap and Islands"], companies: [],
    problemStatement: "Find customers who placed orders on 3 or more consecutive months in 2024.",
    tableStructure: [
      { tableName: "orders", columns: [{name:"order_id",type:"INTEGER"},{name:"customer_id",type:"INTEGER"},{name:"order_date",type:"TEXT"}], createSQL: ORDERS.createSQL, insertSQL: ORDERS.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{customer_id:101,consecutive_months:3}],
    hint1: "Extract the month from order_date.", hint2: "Group by customer and month to get unique months.", hint3: "Count distinct months per customer, then filter >= 3",
    solution: "WITH monthly AS (\n  SELECT DISTINCT customer_id, SUBSTR(order_date, 1, 7) AS month\n  FROM orders\n),\ncounts AS (\n  SELECT customer_id, COUNT(*) AS month_count\n  FROM monthly\n  GROUP BY customer_id\n)\nSELECT customer_id, month_count AS consecutive_months\nFROM counts\nWHERE month_count >= 3\nORDER BY month_count DESC;",
    explanation: "This simplification counts customers with orders in 3+ distinct months as a proxy for consecutive ordering patterns.", relatedQuestions: [213,206], xpReward: 55
  },
  {
    id: 213, title: "Salary Percentile Classification", slug: "salary-percentile",
    difficulty: "Hard", category: "Window Functions", tags: ["NTILE", "CASE", "Percentile"], companies: [],
    problemStatement: "Classify each employee as 'Top 25%', 'Upper Mid', 'Lower Mid', or 'Bottom 25%' based on salary.",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{emp_name:"David Brown",salary:55000,tier:"Bottom 25%"}],
    hint1: "Use NTILE(4) first in a CTE.", hint2: "Then CASE on the quartile value.", hint3: "CASE WHEN quartile = 4 THEN 'Top 25%' WHEN quartile = 3 THEN 'Upper Mid' ...",
    solution: "WITH quartiles AS (\n  SELECT emp_name, salary, NTILE(4) OVER (ORDER BY salary ASC) AS q\n  FROM employees\n)\nSELECT emp_name, salary,\n  CASE q\n    WHEN 1 THEN 'Bottom 25%'\n    WHEN 2 THEN 'Lower Mid'\n    WHEN 3 THEN 'Upper Mid'\n    WHEN 4 THEN 'Top 25%'\n  END AS tier\nFROM quartiles\nORDER BY salary;",
    explanation: "NTILE in CTE, then CASE on result. This pattern classifies rows into labeled buckets based on distribution.", relatedQuestions: [208,202], xpReward: 50
  },
  {
    id: 214, title: "Multiple Window Functions Together", slug: "multiple-window-functions",
    difficulty: "Hard", category: "Window Functions", tags: ["Multiple Windows", "ROW_NUMBER", "SUM", "AVG"], companies: [],
    problemStatement: "For each sale, show the sale amount, running total, and percentage of total sales for that salesperson.",
    tableStructure: [
      { tableName: "sales", columns: [{name:"sale_id",type:"INTEGER"},{name:"salesperson",type:"TEXT"},{name:"revenue",type:"REAL"},{name:"sale_date",type:"TEXT"}], createSQL: SALES.createSQL, insertSQL: SALES.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{salesperson:"Alice",revenue:90000,running_total:90000,pct_of_total:36.1}],
    hint1: "Use multiple window functions in one SELECT.", hint2: "Each OVER clause can differ.", hint3: "SUM(revenue) OVER (PARTITION BY salesperson ORDER BY sale_date) for running total; SUM(revenue) OVER (PARTITION BY salesperson) for total",
    solution: "SELECT salesperson, sale_date, revenue, SUM(revenue) OVER (PARTITION BY salesperson ORDER BY sale_date) AS running_total, ROUND(revenue * 100.0 / SUM(revenue) OVER (PARTITION BY salesperson), 1) AS pct_of_total FROM sales ORDER BY salesperson, sale_date;",
    explanation: "Multiple window functions with different frames can appear in the same SELECT. Each OVER defines its own window.", relatedQuestions: [206,207], xpReward: 55
  },
  {
    id: 215, title: "Recursive CTE: Fibonacci Sequence", slug: "recursive-fibonacci",
    difficulty: "Hard", category: "Recursive CTEs", tags: ["Recursive CTE", "WITH RECURSIVE"], companies: [],
    problemStatement: "Generate the first 10 Fibonacci numbers using a recursive CTE.",
    tableStructure: [],
    sampleData: {}, expectedOutput: [{n:1,fib:1},{n:2,fib:1},{n:3,fib:2},{n:4,fib:3},{n:5,fib:5}],
    hint1: "Recursive CTEs have an anchor and recursive part.", hint2: "Track current and previous Fibonacci values.", hint3: "WITH RECURSIVE fib(n, a, b) AS (SELECT 1,0,1 UNION ALL SELECT n+1, b, a+b FROM fib WHERE n < 10)",
    solution: "WITH RECURSIVE fib(n, a, b) AS (\n  SELECT 1, 0, 1\n  UNION ALL\n  SELECT n+1, b, a+b FROM fib WHERE n < 10\n)\nSELECT n, b AS fib FROM fib ORDER BY n;",
    explanation: "Recursive CTEs have an anchor (base case) and a recursive term. WITH RECURSIVE enables self-referencing CTEs.", relatedQuestions: [216,217], xpReward: 60
  },
  {
    id: 216, title: "Generate a Date Series", slug: "date-series",
    difficulty: "Hard", category: "Recursive CTEs", tags: ["Recursive CTE", "Date Series"], companies: [],
    problemStatement: "Generate a series of dates for January 2024 (all 31 days) using a recursive CTE.",
    tableStructure: [],
    sampleData: {}, expectedOutput: [{day_number:1,date_str:"2024-01-01"},{day_number:2,date_str:"2024-01-02"}],
    hint1: "Start from 1, increment by 1 up to 31.", hint2: "Format day number as date string.", hint3: "WITH RECURSIVE days(n) AS (SELECT 1 UNION ALL SELECT n+1 FROM days WHERE n < 31)",
    solution: "WITH RECURSIVE days(n) AS (\n  SELECT 1\n  UNION ALL\n  SELECT n + 1 FROM days WHERE n < 31\n)\nSELECT n AS day_number, '2024-01-' || CASE WHEN n < 10 THEN '0' || n ELSE '' || n END AS date_str\nFROM days;",
    explanation: "Recursive CTE generates sequences. String concatenation builds the date. CASE pads single-digit days with 0.", relatedQuestions: [215,217], xpReward: 55
  },
  {
    id: 217, title: "Hierarchy: Employee Tree with CTE", slug: "employee-hierarchy",
    difficulty: "Hard", category: "Recursive CTEs", tags: ["Recursive CTE", "Hierarchy", "Tree"], companies: [],
    problemStatement: "Build the management hierarchy starting from top-level employees (no manager).",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"dept_id",type:"INTEGER"},{name:"salary",type:"REAL"},{name:"hire_date",type:"TEXT"}], createSQL: "CREATE TABLE employees (emp_id INTEGER PRIMARY KEY, emp_name TEXT, dept_id INTEGER, salary REAL, hire_date TEXT, manager_id INTEGER);", insertSQL: "INSERT INTO employees VALUES (1,'Alice Johnson',1,85000,'2020-01-15',NULL),(2,'Bob Smith',2,62000,'2019-06-01',5),(3,'Carol White',1,92000,'2018-03-20',1),(4,'David Brown',3,55000,'2021-09-10',7),(5,'Eva Green',2,67000,'2020-11-05',NULL),(6,'Frank Lee',1,78000,'2017-07-22',1),(7,'Grace Kim',3,58000,'2022-01-30',NULL),(8,'Henry Das',4,72000,'2016-05-14',NULL),(9,'Isla Roy',4,69000,'2019-08-19',8),(10,'Jack Mehta',2,61000,'2021-03-11',5);" }
    ],
    sampleData: {}, expectedOutput: [{emp_name:"Alice Johnson",level:1},{emp_name:"Carol White",level:2},{emp_name:"Frank Lee",level:2}],
    hint1: "Start from employees where manager_id IS NULL.", hint2: "Recursively join child employees.", hint3: "UNION ALL SELECT e.*, h.level + 1 FROM employees e JOIN hierarchy h ON e.manager_id = h.emp_id",
    solution: "WITH RECURSIVE hierarchy AS (\n  SELECT emp_id, emp_name, manager_id, 1 AS level\n  FROM employees WHERE manager_id IS NULL\n  UNION ALL\n  SELECT e.emp_id, e.emp_name, e.manager_id, h.level + 1\n  FROM employees e\n  JOIN hierarchy h ON e.manager_id = h.emp_id\n)\nSELECT emp_name, level FROM hierarchy ORDER BY level, emp_name;",
    explanation: "Recursive CTE is perfect for hierarchical data. Anchor selects roots; recursive term joins children each iteration.", relatedQuestions: [215,216], xpReward: 65
  },
  {
    id: 218, title: "Conditional Aggregation: Product Sales Mix", slug: "product-sales-mix",
    difficulty: "Hard", category: "Advanced Aggregation", tags: ["CASE", "SUM", "Conditional Aggregation"], companies: [],
    problemStatement: "For each salesperson, show how much revenue came from Laptop vs other products.",
    tableStructure: [
      { tableName: "sales", columns: [{name:"sale_id",type:"INTEGER"},{name:"salesperson",type:"TEXT"},{name:"product",type:"TEXT"},{name:"revenue",type:"REAL"}], createSQL: SALES.createSQL, insertSQL: SALES.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{salesperson:"Alice",laptop_revenue:255000,other_revenue:56000}],
    hint1: "Use SUM with CASE for each category.", hint2: "One CASE for Laptop, one for everything else.", hint3: "SUM(CASE WHEN product='Laptop' THEN revenue ELSE 0 END) AS laptop_revenue",
    solution: "SELECT salesperson, SUM(CASE WHEN product = 'Laptop' THEN revenue ELSE 0 END) AS laptop_revenue, SUM(CASE WHEN product != 'Laptop' THEN revenue ELSE 0 END) AS other_revenue FROM sales GROUP BY salesperson ORDER BY laptop_revenue DESC;",
    explanation: "Conditional aggregation using CASE inside SUM/COUNT/AVG enables multi-dimensional analysis in a single query.", relatedQuestions: [210,122], xpReward: 45
  },
  {
    id: 219, title: "Detect Duplicate Records", slug: "detect-duplicates",
    difficulty: "Hard", category: "Advanced Patterns", tags: ["ROW_NUMBER", "Duplicate Detection"], companies: [],
    problemStatement: "Find employees where the same name appears more than once (potential duplicates).",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL: "CREATE TABLE employees (emp_id INTEGER PRIMARY KEY, emp_name TEXT, dept_id INTEGER, salary REAL, hire_date TEXT); INSERT INTO employees VALUES (1,'Alice Johnson',1,85000,'2020-01-15'),(2,'Bob Smith',2,62000,'2019-06-01'),(3,'Carol White',1,92000,'2018-03-20'),(4,'Alice Johnson',2,85000,'2020-01-15'),(5,'Eva Green',2,67000,'2020-11-05');", insertSQL: "" }
    ],
    sampleData: {}, expectedOutput: [{emp_name:"Alice Johnson",duplicate_count:2}],
    hint1: "Use GROUP BY and HAVING COUNT > 1.", hint2: "Filter names that appear multiple times.", hint3: "GROUP BY emp_name HAVING COUNT(*) > 1",
    solution: "SELECT emp_name, COUNT(*) AS duplicate_count FROM employees GROUP BY emp_name HAVING COUNT(*) > 1 ORDER BY duplicate_count DESC;",
    explanation: "GROUP BY + HAVING COUNT > 1 identifies duplicate values. This is a common data quality check.", relatedQuestions: [220,128], xpReward: 40
  },
  {
    id: 220, title: "Delete Duplicate Records (Keep One)", slug: "delete-duplicates",
    difficulty: "Hard", category: "Advanced Patterns", tags: ["ROW_NUMBER", "DELETE", "Deduplication"], companies: [],
    problemStatement: "Using a CTE with ROW_NUMBER, identify which duplicate employee records to remove (keep lowest emp_id).",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL: "CREATE TABLE employees (emp_id INTEGER PRIMARY KEY, emp_name TEXT, dept_id INTEGER, salary REAL, hire_date TEXT); INSERT INTO employees VALUES (1,'Alice Johnson',1,85000,'2020-01-15'),(2,'Bob Smith',2,62000,'2019-06-01'),(3,'Carol White',1,92000,'2018-03-20'),(4,'Alice Johnson',2,85000,'2020-01-15'),(5,'Eva Green',2,67000,'2020-11-05');", insertSQL: "" }
    ],
    sampleData: {}, expectedOutput: [{emp_id:4,emp_name:"Alice Johnson",row_num:2}],
    hint1: "ROW_NUMBER PARTITION BY emp_name ORDER BY emp_id.", hint2: "Row number > 1 = duplicate to remove.", hint3: "WITH dups AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY emp_name ORDER BY emp_id) AS rn FROM employees) SELECT * FROM dups WHERE rn > 1",
    solution: "WITH dups AS (\n  SELECT emp_id, emp_name, ROW_NUMBER() OVER (PARTITION BY emp_name ORDER BY emp_id) AS row_num\n  FROM employees\n)\nSELECT emp_id, emp_name, row_num\nFROM dups\nWHERE row_num > 1;",
    explanation: "ROW_NUMBER resets per name group. Rows with rn > 1 are duplicates — in production, DELETE from CTE where rn > 1.", relatedQuestions: [219,203], xpReward: 55
  },
];
