import type { Question } from '../../types';

const EMP = {
  ec: "CREATE TABLE employees (emp_id INTEGER PRIMARY KEY, emp_name TEXT, dept TEXT, salary REAL, hire_date TEXT, manager_id INTEGER);",
  ei: "INSERT INTO employees VALUES (1,'Alice Johnson','Engineering',95000,'2018-01-15',NULL),(2,'Bob Smith','Marketing',62000,'2019-06-01',NULL),(3,'Carol White','Engineering',88000,'2020-03-20',1),(4,'David Brown','HR',55000,'2021-09-10',NULL),(5,'Eva Green','Engineering',102000,'2017-07-22',1),(6,'Frank Lee','Marketing',68000,'2020-11-05',2),(7,'Grace Kim','HR',58000,'2022-01-30',4),(8,'Henry Das','Finance',78000,'2016-05-14',NULL),(9,'Isla Roy','Finance',72000,'2019-08-19',8),(10,'Jack Mehta','Engineering',91000,'2021-03-11',1),(11,'Karen Nair','Marketing',65000,'2020-07-08',2),(12,'Leo Patel','Finance',80000,'2018-12-01',8),(13,'Maya Raj','Engineering',85000,'2023-02-14',1),(14,'Nikhil Sen','HR',52000,'2022-06-18',4),(15,'Ola Tiwari','Finance',76000,'2019-10-25',8);",
};
const SALES = {
  sc: "CREATE TABLE sales (sale_id INTEGER PRIMARY KEY, rep_name TEXT, dept TEXT, product TEXT, region TEXT, amount REAL, sale_date TEXT, quarter TEXT);",
  si: "INSERT INTO sales VALUES (1,'Alice Johnson','Engineering','Laptop','North',85000,'2024-01-05','Q1'),(2,'Bob Smith','Marketing','Phone','South',32000,'2024-01-12','Q1'),(3,'Carol White','Engineering','Laptop','East',91000,'2024-01-18','Q1'),(4,'David Brown','HR','Monitor','West',24000,'2024-02-02','Q1'),(5,'Eva Green','Engineering','Laptop','North',110000,'2024-02-14','Q1'),(6,'Frank Lee','Marketing','Phone','South',38000,'2024-03-01','Q1'),(7,'Alice Johnson','Engineering','Monitor','East',42000,'2024-04-08','Q2'),(8,'Bob Smith','Marketing','Laptop','North',55000,'2024-04-22','Q2'),(9,'Carol White','Engineering','Phone','West',28000,'2024-05-10','Q2'),(10,'Eva Green','Engineering','Laptop','South',95000,'2024-05-25','Q2'),(11,'Frank Lee','Marketing','Monitor','East',31000,'2024-06-05','Q2'),(12,'Grace Kim','HR','Phone','North',18000,'2024-06-15','Q2'),(13,'Henry Das','Finance','Laptop','West',72000,'2024-07-03','Q3'),(14,'Alice Johnson','Engineering','Laptop','South',98000,'2024-07-18','Q3'),(15,'Isla Roy','Finance','Monitor','North',27000,'2024-08-01','Q3'),(16,'Leo Patel','Finance','Phone','East',35000,'2024-08-22','Q3'),(17,'Carol White','Engineering','Laptop','West',86000,'2024-09-09','Q3'),(18,'Maya Raj','Engineering','Monitor','North',44000,'2024-09-28','Q3');",
};
const TXN = {
  tc: "CREATE TABLE transactions (txn_id INTEGER PRIMARY KEY, account TEXT, txn_type TEXT, amount REAL, txn_date TEXT, category TEXT);",
  ti: "INSERT INTO transactions VALUES (1,'ACC001','CREDIT',50000,'2024-01-05','Salary'),(2,'ACC001','DEBIT',12000,'2024-01-10','Rent'),(3,'ACC001','DEBIT',3500,'2024-01-15','Grocery'),(4,'ACC002','CREDIT',80000,'2024-01-05','Salary'),(5,'ACC002','DEBIT',25000,'2024-01-08','Rent'),(6,'ACC002','DEBIT',8000,'2024-01-20','Shopping'),(7,'ACC001','CREDIT',50000,'2024-02-05','Salary'),(8,'ACC001','DEBIT',12000,'2024-02-10','Rent'),(9,'ACC001','DEBIT',5000,'2024-02-22','Restaurant'),(10,'ACC002','CREDIT',80000,'2024-02-05','Salary'),(11,'ACC002','DEBIT',25000,'2024-02-08','Rent'),(12,'ACC002','DEBIT',3000,'2024-02-18','Grocery'),(13,'ACC001','DEBIT',6000,'2024-03-01','Utility'),(14,'ACC002','CREDIT',5000,'2024-03-10','Bonus'),(15,'ACC002','DEBIT',15000,'2024-03-15','Shopping');",
};

export const hard3Questions: Question[] = [
  {
    id: 231, title: "Window: Running Total with PARTITION BY", slug: "running-total-partition",
    difficulty: "Hard", category: "Window Functions", tags: ["SUM OVER","PARTITION BY","Running Total"], companies: [],
    problemStatement: "Calculate the running total of sales for each rep, ordered by sale_date. Show rep_name, sale_date, amount, and cumulative total per rep.",
    tableStructure: [
      { tableName:"sales", columns:[{name:"sale_id",type:"INTEGER"},{name:"rep_name",type:"TEXT"},{name:"amount",type:"REAL"},{name:"sale_date",type:"TEXT"}], createSQL:SALES.sc, insertSQL:SALES.si }
    ],
    sampleData:{}, expectedOutput:[{rep_name:"Alice Johnson",sale_date:"2024-01-05",amount:85000,running_total:85000},{rep_name:"Alice Johnson",sale_date:"2024-04-08",amount:42000,running_total:127000}],
    hint1:"SUM(amount) OVER (PARTITION BY rep_name ORDER BY sale_date).", hint2:"PARTITION resets per rep.", hint3:"SUM(amount) OVER (PARTITION BY rep_name ORDER BY sale_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)",
    solution:"SELECT rep_name, sale_date, amount, SUM(amount) OVER (PARTITION BY rep_name ORDER BY sale_date) AS running_total FROM sales ORDER BY rep_name, sale_date;",
    explanation:"PARTITION BY rep_name creates independent windows per rep. ORDER BY inside OVER causes SUM to accumulate in date order within each partition.", relatedQuestions:[206,232], xpReward:35
  },
  {
    id: 232, title: "LAG: Compare Each Sale to Previous", slug: "lag-compare-prev-sale",
    difficulty: "Hard", category: "Window Functions", tags: ["LAG","Comparison","Running Diff"], companies: [],
    problemStatement: "For each sale by each rep, show the current amount, previous amount, and the difference. Show only rows where there is a previous sale.",
    tableStructure: [
      { tableName:"sales", columns:[{name:"sale_id",type:"INTEGER"},{name:"rep_name",type:"TEXT"},{name:"amount",type:"REAL"},{name:"sale_date",type:"TEXT"}], createSQL:SALES.sc, insertSQL:SALES.si }
    ],
    sampleData:{}, expectedOutput:[{rep_name:"Alice Johnson",sale_date:"2024-04-08",amount:42000,prev_amount:85000,diff:-43000}],
    hint1:"LAG(amount) OVER (PARTITION BY rep_name ORDER BY sale_date).", hint2:"WHERE prev_amount IS NOT NULL filters out first rows.", hint3:"SELECT *, LAG(amount) OVER (PARTITION BY rep_name ORDER BY sale_date) AS prev_amount FROM sales",
    solution:"WITH sale_lag AS (\n  SELECT rep_name, sale_date, amount, LAG(amount) OVER (PARTITION BY rep_name ORDER BY sale_date) AS prev_amount\n  FROM sales\n)\nSELECT rep_name, sale_date, amount, prev_amount, (amount - prev_amount) AS diff\nFROM sale_lag\nWHERE prev_amount IS NOT NULL\nORDER BY rep_name, sale_date;",
    explanation:"LAG accesses the previous row in the partition. WHERE IS NOT NULL excludes first rows (no prior sale). Subtraction shows the change.", relatedQuestions:[205,231], xpReward:35
  },
  {
    id: 233, title: "Dense Rank: Salary Rank Per Department", slug: "dense-rank-salary-dept",
    difficulty: "Hard", category: "Window Functions", tags: ["DENSE_RANK","PARTITION BY","Ranking"], companies: [],
    problemStatement: "Rank employees by salary within their department using DENSE_RANK. Show emp_name, dept, salary, and salary_rank.",
    tableStructure: [
      { tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"dept",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL:EMP.ec, insertSQL:EMP.ei }
    ],
    sampleData:{}, expectedOutput:[{emp_name:"Eva Green",dept:"Engineering",salary:102000,salary_rank:1},{emp_name:"Jack Mehta",dept:"Engineering",salary:91000,salary_rank:2}],
    hint1:"DENSE_RANK() OVER (PARTITION BY dept ORDER BY salary DESC).", hint2:"No gap in ranks even with ties.", hint3:"SELECT emp_name, dept, salary, DENSE_RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS salary_rank",
    solution:"SELECT emp_name, dept, salary, DENSE_RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS salary_rank FROM employees ORDER BY dept, salary_rank;",
    explanation:"DENSE_RANK partitioned by dept ranks within each department independently. DENSE_RANK never skips numbers after ties (unlike RANK).", relatedQuestions:[203,234], xpReward:35
  },
  {
    id: 234, title: "Top 2 Earners Per Department", slug: "top-2-per-department",
    difficulty: "Hard", category: "Window Functions", tags: ["ROW_NUMBER","PARTITION BY","Top-N"], companies: [],
    problemStatement: "Find the top 2 highest-paid employees in each department.",
    tableStructure: [
      { tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"dept",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL:EMP.ec, insertSQL:EMP.ei }
    ],
    sampleData:{}, expectedOutput:[{emp_name:"Eva Green",dept:"Engineering",salary:102000,rn:1},{emp_name:"Alice Johnson",dept:"Engineering",salary:95000,rn:2}],
    hint1:"ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC).", hint2:"CTE then filter rn <= 2.", hint3:"WITH ranked AS (...) SELECT * FROM ranked WHERE rn <= 2",
    solution:"WITH ranked AS (\n  SELECT emp_name, dept, salary, ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) AS rn\n  FROM employees\n)\nSELECT emp_name, dept, salary, rn\nFROM ranked\nWHERE rn <= 2\nORDER BY dept, rn;",
    explanation:"ROW_NUMBER assigns unique ranks per dept. CTE then filters to top-2. This is the classic Top-N-per-group pattern.", relatedQuestions:[202,233], xpReward:40
  },
  {
    id: 235, title: "Quarterly Sales Growth", slug: "quarterly-sales-growth",
    difficulty: "Hard", category: "Window Functions", tags: ["LAG","Growth Rate","GROUP BY"], companies: [],
    problemStatement: "Calculate QoQ (quarter-over-quarter) revenue growth % for all sales combined.",
    tableStructure: [
      { tableName:"sales", columns:[{name:"sale_id",type:"INTEGER"},{name:"amount",type:"REAL"},{name:"quarter",type:"TEXT"}], createSQL:SALES.sc, insertSQL:SALES.si }
    ],
    sampleData:{}, expectedOutput:[{quarter:"Q1",total:340000,prev_quarter:null,growth_pct:null},{quarter:"Q2",total:269000,prev_quarter:340000,growth_pct:-20.9}],
    hint1:"GROUP BY quarter to get total.", hint2:"LAG on total to get prev quarter.", hint3:"ROUND((total - prev) * 100.0 / prev, 1) AS growth_pct",
    solution:"WITH quarterly AS (\n  SELECT quarter, SUM(amount) AS total FROM sales GROUP BY quarter\n),\nwith_lag AS (\n  SELECT quarter, total, LAG(total) OVER (ORDER BY quarter) AS prev_quarter FROM quarterly\n)\nSELECT quarter, total, prev_quarter, ROUND((total - prev_quarter)*100.0/prev_quarter, 1) AS growth_pct FROM with_lag ORDER BY quarter;",
    explanation:"Two CTEs: first aggregates by quarter, second adds LAG. Growth = (current - previous) / previous * 100.", relatedQuestions:[211,232], xpReward:40
  },
  {
    id: 236, title: "LEAD: Days Until Next Sale (per Rep)", slug: "lead-days-next-sale",
    difficulty: "Hard", category: "Window Functions", tags: ["LEAD","Date Diff","PARTITION BY"], companies: [],
    problemStatement: "For each sale, show how many days until the same rep's next sale. Show NULL for their last sale.",
    tableStructure: [
      { tableName:"sales", columns:[{name:"sale_id",type:"INTEGER"},{name:"rep_name",type:"TEXT"},{name:"sale_date",type:"TEXT"}], createSQL:SALES.sc, insertSQL:SALES.si }
    ],
    sampleData:{}, expectedOutput:[{rep_name:"Alice Johnson",sale_date:"2024-01-05",next_sale_date:"2024-04-08",days_until_next:88}],
    hint1:"LEAD(sale_date) OVER (PARTITION BY rep_name ORDER BY sale_date).", hint2:"Date diff in AlaSQL using string comparison or DATEDIFF.", hint3:"LEAD(sale_date) OVER (PARTITION BY rep_name ORDER BY sale_date) AS next_sale_date",
    solution:"SELECT rep_name, sale_date, LEAD(sale_date) OVER (PARTITION BY rep_name ORDER BY sale_date) AS next_sale_date, DATEDIFF(LEAD(sale_date) OVER (PARTITION BY rep_name ORDER BY sale_date), sale_date) AS days_until_next FROM sales ORDER BY rep_name, sale_date;",
    explanation:"LEAD peeks at the next row in the partition. DATEDIFF computes the gap. NULL for the last row per rep (no next row).", relatedQuestions:[207,235], xpReward:40
  },
  {
    id: 237, title: "NTILE Salary Quartiles", slug: "ntile-salary-quartiles",
    difficulty: "Hard", category: "Window Functions", tags: ["NTILE","Quartile","Distribution"], companies: [],
    problemStatement: "Divide employees into 4 salary quartiles. Show each employee, their salary, and their quartile number.",
    tableStructure: [
      { tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL:EMP.ec, insertSQL:EMP.ei }
    ],
    sampleData:{}, expectedOutput:[{emp_name:"Nikhil Sen",salary:52000,quartile:1},{emp_name:"Eva Green",salary:102000,quartile:4}],
    hint1:"NTILE(4) OVER (ORDER BY salary).", hint2:"Quartile 1 = lowest 25%, 4 = highest 25%.", hint3:"NTILE(4) OVER (ORDER BY salary) AS quartile",
    solution:"SELECT emp_name, salary, NTILE(4) OVER (ORDER BY salary) AS quartile FROM employees ORDER BY salary;",
    explanation:"NTILE(4) divides rows into 4 equal-sized buckets. Rows with the lowest salaries are in quartile 1, highest in quartile 4.", relatedQuestions:[209,238], xpReward:35
  },
  {
    id: 238, title: "Account Balance Over Time", slug: "account-balance-over-time",
    difficulty: "Hard", category: "Window Functions", tags: ["Running Total","CASE","Balance"], companies: [],
    problemStatement: "Calculate the running account balance for each account, treating CREDIT as + and DEBIT as - amounts.",
    tableStructure: [
      { tableName:"transactions", columns:[{name:"txn_id",type:"INTEGER"},{name:"account",type:"TEXT"},{name:"txn_type",type:"TEXT"},{name:"amount",type:"REAL"},{name:"txn_date",type:"TEXT"}], createSQL:TXN.tc, insertSQL:TXN.ti }
    ],
    sampleData:{}, expectedOutput:[{account:"ACC001",txn_date:"2024-01-05",signed_amount:50000,balance:50000},{account:"ACC001",txn_date:"2024-01-10",signed_amount:-12000,balance:38000}],
    hint1:"CASE txn_type WHEN 'CREDIT' THEN amount ELSE -amount END.", hint2:"SUM(signed_amount) OVER (PARTITION BY account ORDER BY txn_date).", hint3:"SUM(CASE WHEN txn_type='CREDIT' THEN amount ELSE -amount END) OVER (PARTITION BY account ORDER BY txn_date)",
    solution:"SELECT account, txn_date, txn_type, amount, CASE WHEN txn_type='CREDIT' THEN amount ELSE -amount END AS signed_amount, SUM(CASE WHEN txn_type='CREDIT' THEN amount ELSE -amount END) OVER (PARTITION BY account ORDER BY txn_date) AS balance FROM transactions ORDER BY account, txn_date;",
    explanation:"CASE converts DEBIT to negative. Running SUM over that signed amount gives the balance at each point in time per account.", relatedQuestions:[231,239], xpReward:40
  },
  {
    id: 239, title: "Category Spending Analysis per Account", slug: "category-spending-per-account",
    difficulty: "Hard", category: "Aggregation", tags: ["PIVOT","CASE","Spending"], companies: [],
    problemStatement: "Pivot spending by category for each account: columns for Salary (credits), Rent, Grocery, Shopping (debits).",
    tableStructure: [
      { tableName:"transactions", columns:[{name:"txn_id",type:"INTEGER"},{name:"account",type:"TEXT"},{name:"txn_type",type:"TEXT"},{name:"amount",type:"REAL"},{name:"category",type:"TEXT"}], createSQL:TXN.tc, insertSQL:TXN.ti }
    ],
    sampleData:{}, expectedOutput:[{account:"ACC001",salary:100000,rent:24000,grocery:3500},{account:"ACC002",salary:165000,rent:50000,shopping:23000}],
    hint1:"SUM(CASE WHEN category='Rent' THEN amount ELSE 0 END) per account.", hint2:"GROUP BY account.", hint3:"SELECT account, SUM(CASE WHEN category='Salary' THEN amount END) AS salary, ...",
    solution:"SELECT account, SUM(CASE WHEN category='Salary' THEN amount ELSE 0 END) AS salary, SUM(CASE WHEN category='Rent' THEN amount ELSE 0 END) AS rent, SUM(CASE WHEN category='Grocery' THEN amount ELSE 0 END) AS grocery, SUM(CASE WHEN category='Shopping' THEN amount ELSE 0 END) AS shopping FROM transactions GROUP BY account ORDER BY account;",
    explanation:"Conditional SUM with CASE creates pivot columns. One column per category. GROUP BY account collapses to one row per account.", relatedQuestions:[161,238], xpReward:40
  },
  {
    id: 240, title: "Highest Revenue Product Per Region", slug: "highest-rev-product-region",
    difficulty: "Hard", category: "Window Functions", tags: ["RANK","PARTITION BY","Top-N"], companies: [],
    problemStatement: "Find the product with the highest total revenue in each sales region.",
    tableStructure: [
      { tableName:"sales", columns:[{name:"sale_id",type:"INTEGER"},{name:"product",type:"TEXT"},{name:"region",type:"TEXT"},{name:"amount",type:"REAL"}], createSQL:SALES.sc, insertSQL:SALES.si }
    ],
    sampleData:{}, expectedOutput:[{region:"East",product:"Laptop",total:91000},{region:"North",product:"Laptop",total:265000}],
    hint1:"Aggregate SUM per (region, product).", hint2:"RANK() OVER (PARTITION BY region ORDER BY total DESC).", hint3:"WHERE rn = 1",
    solution:"WITH agg AS (\n  SELECT region, product, SUM(amount) AS total FROM sales GROUP BY region, product\n),\nranked AS (\n  SELECT *, RANK() OVER (PARTITION BY region ORDER BY total DESC) AS rn FROM agg\n)\nSELECT region, product, total FROM ranked WHERE rn = 1 ORDER BY region;",
    explanation:"Aggregate first, then rank within each region. Filter rn=1 to get the top product per region.", relatedQuestions:[202,234], xpReward:40
  },
  {
    id: 241, title: "Detect Month-over-Month Sales Decline", slug: "mom-sales-decline",
    difficulty: "Hard", category: "Window Functions", tags: ["LAG","Decline","MoM"], companies: [],
    problemStatement: "Find months where total sales declined compared to the previous month. Use SUBSTR(sale_date,1,7) as the month.",
    tableStructure: [
      { tableName:"sales", columns:[{name:"sale_id",type:"INTEGER"},{name:"amount",type:"REAL"},{name:"sale_date",type:"TEXT"}], createSQL:SALES.sc, insertSQL:SALES.si }
    ],
    sampleData:{}, expectedOutput:[{month:"2024-04",total:97000,prev_month_total:155000,change:-58000}],
    hint1:"GROUP BY month (SUBSTR of date).", hint2:"LAG to get previous month total.", hint3:"WHERE total < prev_total",
    solution:"WITH monthly AS (\n  SELECT SUBSTR(sale_date,1,7) AS month, SUM(amount) AS total FROM sales GROUP BY SUBSTR(sale_date,1,7)\n),\nwith_lag AS (\n  SELECT month, total, LAG(total) OVER (ORDER BY month) AS prev_total FROM monthly\n)\nSELECT month, total, prev_total AS prev_month_total, (total - prev_total) AS change\nFROM with_lag\nWHERE total < prev_total\nORDER BY month;",
    explanation:"Three steps: extract month, compute monthly total, LAG to compare. Filter WHERE total < prev_total finds decline months.", relatedQuestions:[235,242], xpReward:40
  },
  {
    id: 242, title: "Three-Month Moving Average Sales", slug: "three-month-moving-avg",
    difficulty: "Hard", category: "Window Functions", tags: ["AVG OVER","Moving Average","ROWS"], companies: [],
    problemStatement: "Compute the 3-month moving average of total sales (current + 2 preceding months).",
    tableStructure: [
      { tableName:"sales", columns:[{name:"sale_id",type:"INTEGER"},{name:"amount",type:"REAL"},{name:"sale_date",type:"TEXT"}], createSQL:SALES.sc, insertSQL:SALES.si }
    ],
    sampleData:{}, expectedOutput:[{month:"2024-01",monthly_total:340000,moving_avg_3:340000},{month:"2024-02",monthly_total:149000,moving_avg_3:244500}],
    hint1:"GROUP BY month to get monthly totals.", hint2:"AVG(total) OVER (ORDER BY month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW).", hint3:"ROWS BETWEEN 2 PRECEDING AND CURRENT ROW creates 3-row window",
    solution:"WITH monthly AS (\n  SELECT SUBSTR(sale_date,1,7) AS month, SUM(amount) AS monthly_total FROM sales GROUP BY SUBSTR(sale_date,1,7)\n)\nSELECT month, monthly_total, ROUND(AVG(monthly_total) OVER (ORDER BY month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 0) AS moving_avg_3\nFROM monthly\nORDER BY month;",
    explanation:"ROWS BETWEEN 2 PRECEDING AND CURRENT ROW creates a sliding 3-row window. AVG over that window smooths out month-to-month volatility.", relatedQuestions:[208,241], xpReward:40
  },
  {
    id: 243, title: "Correlated Subquery: Employees Earning More Than Dept Average", slug: "corr-above-dept-avg",
    difficulty: "Hard", category: "Subqueries", tags: ["Correlated Subquery","AVG","Filter"], companies: [],
    problemStatement: "Find employees who earn more than the average salary in their department. Show the employee, their salary, and the dept average.",
    tableStructure: [
      { tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"dept",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL:EMP.ec, insertSQL:EMP.ei }
    ],
    sampleData:{}, expectedOutput:[{emp_name:"Eva Green",dept:"Engineering",salary:102000,dept_avg:92200},{emp_name:"Alice Johnson",salary:95000,dept_avg:92200}],
    hint1:"Correlated subquery: SELECT AVG(salary) FROM employees WHERE dept = outer.dept.", hint2:"WHERE e.salary > (SELECT AVG...).", hint3:"WHERE salary > (SELECT AVG(e2.salary) FROM employees e2 WHERE e2.dept = e1.dept)",
    solution:"SELECT e1.emp_name, e1.dept, e1.salary, ROUND((SELECT AVG(e2.salary) FROM employees e2 WHERE e2.dept = e1.dept),0) AS dept_avg FROM employees e1 WHERE e1.salary > (SELECT AVG(e2.salary) FROM employees e2 WHERE e2.dept = e1.dept) ORDER BY e1.dept, e1.salary DESC;",
    explanation:"Correlated subquery runs once per row, computing AVG salary for that employee's department. Outer WHERE compares the employee's salary to it.", relatedQuestions:[106,153], xpReward:40
  },
  {
    id: 244, title: "FIRST_VALUE and LAST_VALUE per Rep", slug: "first-last-sale-per-rep",
    difficulty: "Hard", category: "Window Functions", tags: ["FIRST_VALUE","LAST_VALUE","Frame"], companies: [],
    problemStatement: "For each sale, show the rep's first and last (by date) sale amounts.",
    tableStructure: [
      { tableName:"sales", columns:[{name:"sale_id",type:"INTEGER"},{name:"rep_name",type:"TEXT"},{name:"amount",type:"REAL"},{name:"sale_date",type:"TEXT"}], createSQL:SALES.sc, insertSQL:SALES.si }
    ],
    sampleData:{}, expectedOutput:[{rep_name:"Alice Johnson",sale_date:"2024-01-05",amount:85000,first_sale:85000,last_sale:98000}],
    hint1:"FIRST_VALUE(amount) OVER (PARTITION BY rep_name ORDER BY sale_date).", hint2:"LAST_VALUE needs RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING.", hint3:"LAST_VALUE(amount) OVER (PARTITION BY rep_name ORDER BY sale_date ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING)",
    solution:"SELECT rep_name, sale_date, amount, FIRST_VALUE(amount) OVER (PARTITION BY rep_name ORDER BY sale_date) AS first_sale, LAST_VALUE(amount) OVER (PARTITION BY rep_name ORDER BY sale_date ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS last_sale FROM sales ORDER BY rep_name, sale_date;",
    explanation:"FIRST_VALUE defaults are fine. LAST_VALUE requires explicit unbounded frame — by default the frame ends at current row, not partition end.", relatedQuestions:[216,245], xpReward:45
  },
  {
    id: 245, title: "Rep Performance vs Team Average", slug: "rep-vs-team-avg",
    difficulty: "Hard", category: "Window Functions", tags: ["AVG OVER","PARTITION","Comparison"], companies: [],
    problemStatement: "Show each rep's total sales versus their department's average total. Flag whether they are 'Above' or 'Below' team average.",
    tableStructure: [
      { tableName:"sales", columns:[{name:"sale_id",type:"INTEGER"},{name:"rep_name",type:"TEXT"},{name:"dept",type:"TEXT"},{name:"amount",type:"REAL"}], createSQL:SALES.sc, insertSQL:SALES.si }
    ],
    sampleData:{}, expectedOutput:[{rep_name:"Alice Johnson",dept:"Engineering",rep_total:225000,dept_avg_total:102000,vs_avg:"Above"}],
    hint1:"CTE1: SUM per rep. CTE2: AVG of rep totals per dept using AVG OVER.", hint2:"CASE WHEN rep_total > dept_avg THEN 'Above'.", hint3:"AVG(rep_total) OVER (PARTITION BY dept) AS dept_avg_total",
    solution:"WITH rep_totals AS (\n  SELECT rep_name, dept, SUM(amount) AS rep_total FROM sales GROUP BY rep_name, dept\n),\nwith_avg AS (\n  SELECT *, AVG(rep_total) OVER (PARTITION BY dept) AS dept_avg_total FROM rep_totals\n)\nSELECT rep_name, dept, rep_total, ROUND(dept_avg_total,0) AS dept_avg_total, CASE WHEN rep_total > dept_avg_total THEN 'Above' ELSE 'Below' END AS vs_avg FROM with_avg ORDER BY dept, rep_total DESC;",
    explanation:"Two CTEs: first per-rep totals, second adds PARTITION-based department average. The flag comes from comparing individual to dept average.", relatedQuestions:[243,234], xpReward:45
  },
  {
    id: 246, title: "CTE Chain: Net Income Per Account", slug: "cte-net-income",
    difficulty: "Hard", category: "CTEs", tags: ["CTE","CASE","Finance"], companies: [],
    problemStatement: "Using CTEs, compute each account's total credits, total debits, and net income (credits - debits).",
    tableStructure: [
      { tableName:"transactions", columns:[{name:"txn_id",type:"INTEGER"},{name:"account",type:"TEXT"},{name:"txn_type",type:"TEXT"},{name:"amount",type:"REAL"}], createSQL:TXN.tc, insertSQL:TXN.ti }
    ],
    sampleData:{}, expectedOutput:[{account:"ACC001",total_credits:100000,total_debits:38500,net_income:61500},{account:"ACC002",total_credits:165000,total_debits:76000,net_income:89000}],
    hint1:"CTE with SUM and CASE for credits and debits.", hint2:"Or two CTEs: one credits, one debits, then JOIN.", hint3:"SUM(CASE WHEN txn_type='CREDIT' THEN amount ELSE 0 END) AS total_credits",
    solution:"WITH income_summary AS (\n  SELECT account, SUM(CASE WHEN txn_type='CREDIT' THEN amount ELSE 0 END) AS total_credits, SUM(CASE WHEN txn_type='DEBIT' THEN amount ELSE 0 END) AS total_debits FROM transactions GROUP BY account\n)\nSELECT account, total_credits, total_debits, (total_credits - total_debits) AS net_income FROM income_summary ORDER BY net_income DESC;",
    explanation:"Conditional aggregation in a CTE separates credit and debit totals. Net income is simple subtraction.", relatedQuestions:[238,247], xpReward:35
  },
  {
    id: 247, title: "Detect Salary Anomalies (> 2 StdDev)", slug: "salary-anomalies-stddev",
    difficulty: "Hard", category: "Analytics", tags: ["AVG","Anomaly","Subquery"], companies: [],
    problemStatement: "Find employees whose salary is more than 20000 above the company-wide average salary.",
    tableStructure: [
      { tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL:EMP.ec, insertSQL:EMP.ei }
    ],
    sampleData:{}, expectedOutput:[{emp_name:"Eva Green",salary:102000,company_avg:76200,diff:25800},{emp_name:"Alice Johnson",salary:95000,diff:18800}],
    hint1:"Scalar subquery gives company avg.", hint2:"WHERE salary > avg + 20000.", hint3:"WHERE salary > (SELECT AVG(salary) FROM employees) + 20000",
    solution:"SELECT emp_name, salary, ROUND((SELECT AVG(salary) FROM employees),0) AS company_avg, ROUND(salary - (SELECT AVG(salary) FROM employees),0) AS diff FROM employees WHERE salary > (SELECT AVG(salary) FROM employees) + 20000 ORDER BY salary DESC;",
    explanation:"Scalar subquery used twice: once in SELECT (display) and once in WHERE (filter). Employees significantly above average are outliers.", relatedQuestions:[201,248], xpReward:40
  },
  {
    id: 248, title: "Recursive CTE: Employee Reporting Chain", slug: "recursive-reporting-chain",
    difficulty: "Hard", category: "Recursive CTEs", tags: ["Recursive CTE","Hierarchy","Path"], companies: [],
    problemStatement: "Build the reporting chain for employee ID 3 (Carol White): show the path from Carol up to the CEO.",
    tableStructure: [
      { tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"manager_id",type:"INTEGER"}], createSQL:EMP.ec, insertSQL:EMP.ei }
    ],
    sampleData:{}, expectedOutput:[{emp_id:3,emp_name:"Carol White",level:0},{emp_id:1,emp_name:"Alice Johnson",level:1}],
    hint1:"Start from emp_id=3, recursively join to manager.", hint2:"Stop when manager_id is NULL.", hint3:"WITH RECURSIVE chain AS (SELECT emp_id, emp_name, manager_id, 0 AS level FROM employees WHERE emp_id=3 UNION ALL SELECT e.emp_id, e.emp_name, e.manager_id, c.level+1 FROM employees e JOIN chain c ON e.emp_id = c.manager_id)",
    solution:"WITH RECURSIVE chain AS (\n  SELECT emp_id, emp_name, manager_id, 0 AS level FROM employees WHERE emp_id = 3\n  UNION ALL\n  SELECT e.emp_id, e.emp_name, e.manager_id, c.level+1 FROM employees e JOIN chain c ON e.emp_id = c.manager_id WHERE e.manager_id IS NOT NULL\n)\nSELECT emp_id, emp_name, level FROM chain ORDER BY level;",
    explanation:"Anchor: start with Carol. Recursive: keep joining to the manager until no more managers. Level tracks depth in hierarchy.", relatedQuestions:[218,249], xpReward:50
  },
  {
    id: 249, title: "RANK vs ROW_NUMBER on Tied Salaries", slug: "rank-vs-row-number-ties",
    difficulty: "Hard", category: "Window Functions", tags: ["RANK","ROW_NUMBER","Ties"], companies: [],
    problemStatement: "Demonstrate the difference between ROW_NUMBER and RANK for employees — particularly if any have the same salary. Show both ranks.",
    tableStructure: [
      { tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL:EMP.ec, insertSQL:EMP.ei }
    ],
    sampleData:{}, expectedOutput:[{emp_name:"Eva Green",salary:102000,row_num:1,rank_num:1},{emp_name:"Jack Mehta",salary:91000,row_num:2,rank_num:2}],
    hint1:"RANK() and ROW_NUMBER() both in SELECT.", hint2:"ROW_NUMBER is always unique; RANK shares number for ties.", hint3:"SELECT emp_name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC), RANK() OVER (ORDER BY salary DESC)",
    solution:"SELECT emp_name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num, RANK() OVER (ORDER BY salary DESC) AS rank_num FROM employees ORDER BY salary DESC;",
    explanation:"ROW_NUMBER always gives unique sequential numbers. RANK gives the same number to ties and skips the next number. This query shows the difference.", relatedQuestions:[203,233], xpReward:35
  },
  {
    id: 250, title: "Full Analytics Pipeline: Sales Scorecard", slug: "full-sales-scorecard",
    difficulty: "Hard", category: "Analytics", tags: ["CTE","Window","Aggregation","Scorecard"], companies: [],
    problemStatement: "Build a complete sales scorecard per rep: total sales, rank within their dept, and whether they are a top performer (rank 1 in dept).",
    tableStructure: [
      { tableName:"sales", columns:[{name:"sale_id",type:"INTEGER"},{name:"rep_name",type:"TEXT"},{name:"dept",type:"TEXT"},{name:"amount",type:"REAL"}], createSQL:SALES.sc, insertSQL:SALES.si }
    ],
    sampleData:{}, expectedOutput:[{rep_name:"Eva Green",dept:"Engineering",total:205000,dept_rank:1,is_top:"Yes"},{rep_name:"Alice Johnson",dept:"Engineering",total:225000,dept_rank:1,is_top:"Yes"}],
    hint1:"CTE1: total per rep+dept. CTE2: RANK within dept. CTE3: filter or flag.", hint2:"CASE WHEN dept_rank = 1 THEN 'Yes' ELSE 'No'.", hint3:"RANK() OVER (PARTITION BY dept ORDER BY total DESC) AS dept_rank",
    solution:"WITH rep_totals AS (\n  SELECT rep_name, dept, SUM(amount) AS total FROM sales GROUP BY rep_name, dept\n),\nwith_rank AS (\n  SELECT *, RANK() OVER (PARTITION BY dept ORDER BY total DESC) AS dept_rank FROM rep_totals\n)\nSELECT rep_name, dept, total, dept_rank, CASE WHEN dept_rank = 1 THEN 'Yes' ELSE 'No' END AS is_top FROM with_rank ORDER BY dept, dept_rank;",
    explanation:"Pattern: aggregate → rank → flag. Three conceptual steps cleanly separated in CTEs. RANK allows ties (multiple reps can both be rank 1).", relatedQuestions:[234,245], xpReward:50
  },
  {
    id: 251, title: "UNION ALL: Combine Debit and Credit Ledger", slug: "union-all-ledger",
    difficulty: "Hard", category: "Set Operations", tags: ["UNION ALL","CASE","Signed Amounts"], companies: [],
    problemStatement: "Create a unified ledger view by combining all credits (as positive) and debits (as negative) sorted by date.",
    tableStructure: [
      { tableName:"transactions", columns:[{name:"txn_id",type:"INTEGER"},{name:"account",type:"TEXT"},{name:"txn_type",type:"TEXT"},{name:"amount",type:"REAL"},{name:"txn_date",type:"TEXT"},{name:"category",type:"TEXT"}], createSQL:TXN.tc, insertSQL:TXN.ti }
    ],
    sampleData:{}, expectedOutput:[{account:"ACC001",txn_date:"2024-01-05",category:"Salary",signed_amount:50000},{account:"ACC001",txn_date:"2024-01-10",category:"Rent",signed_amount:-12000}],
    hint1:"SELECT credits as positive UNION ALL SELECT debits as negative.", hint2:"Or use CASE in a single query.", hint3:"CASE WHEN txn_type='CREDIT' THEN amount ELSE -amount END AS signed_amount",
    solution:"SELECT account, txn_date, category, txn_type, CASE WHEN txn_type='CREDIT' THEN amount ELSE -amount END AS signed_amount FROM transactions ORDER BY account, txn_date;",
    explanation:"CASE converts transaction type to sign. Simple, elegant alternative to UNION. ORDER BY provides chronological ledger view.", relatedQuestions:[238,246], xpReward:35
  },
  {
    id: 252, title: "Gap and Islands: Consecutive Sale Streaks", slug: "gap-islands-sale-streaks",
    difficulty: "Hard", category: "Gap and Islands", tags: ["ROW_NUMBER","Gap-and-Islands","Streak"], companies: [],
    problemStatement: "Find each rep's consecutive months they had sales (identify islands of activity). For simplicity, show each rep and how many distinct months they sold.",
    tableStructure: [
      { tableName:"sales", columns:[{name:"sale_id",type:"INTEGER"},{name:"rep_name",type:"TEXT"},{name:"sale_date",type:"TEXT"}], createSQL:SALES.sc, insertSQL:SALES.si }
    ],
    sampleData:{}, expectedOutput:[{rep_name:"Alice Johnson",active_months:3},{rep_name:"Carol White",active_months:3}],
    hint1:"COUNT DISTINCT months per rep.", hint2:"SUBSTR(sale_date,1,7) as month.", hint3:"COUNT(DISTINCT SUBSTR(sale_date,1,7)) AS active_months",
    solution:"SELECT rep_name, COUNT(DISTINCT SUBSTR(sale_date,1,7)) AS active_months FROM sales GROUP BY rep_name ORDER BY active_months DESC;",
    explanation:"Counting distinct months per rep measures spread of activity. For true gap-and-islands, you'd use ROW_NUMBER tricks to find consecutive month groups.", relatedQuestions:[219,253], xpReward:40
  },
  {
    id: 253, title: "PERCENT_RANK on Employee Salaries", slug: "percent-rank-salary",
    difficulty: "Hard", category: "Window Functions", tags: ["PERCENT_RANK","Percentile","Ranking"], companies: [],
    problemStatement: "For each employee, compute their salary percent rank within the company (0 = lowest, 1 = highest).",
    tableStructure: [
      { tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL:EMP.ec, insertSQL:EMP.ei }
    ],
    sampleData:{}, expectedOutput:[{emp_name:"Nikhil Sen",salary:52000,pct_rank:0},{emp_name:"Eva Green",salary:102000,pct_rank:1}],
    hint1:"PERCENT_RANK() OVER (ORDER BY salary).", hint2:"Range is 0 to 1.", hint3:"ROUND(PERCENT_RANK() OVER (ORDER BY salary),2) AS pct_rank",
    solution:"SELECT emp_name, salary, ROUND(PERCENT_RANK() OVER (ORDER BY salary), 2) AS pct_rank FROM employees ORDER BY salary;",
    explanation:"PERCENT_RANK = (rank - 1) / (total_rows - 1). First row = 0, last = 1. Shows relative position in the salary distribution.", relatedQuestions:[209,237], xpReward:40
  },
  {
    id: 254, title: "Double Aggregation: Avg of Dept Averages", slug: "avg-of-dept-avgs",
    difficulty: "Hard", category: "Subqueries", tags: ["Subquery","AVG of AVG","GROUP BY"], companies: [],
    problemStatement: "Find the average of all department average salaries (not the overall company average).",
    tableStructure: [
      { tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"dept",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL:EMP.ec, insertSQL:EMP.ei }
    ],
    sampleData:{}, expectedOutput:[{avg_of_dept_avgs:74950}],
    hint1:"Inner query: avg per dept. Outer: avg of those.", hint2:"SELECT AVG(dept_avg) FROM (SELECT AVG(salary) AS dept_avg FROM employees GROUP BY dept).", hint3:"SELECT ROUND(AVG(dept_avg),0) FROM (subquery) AS dept_avgs",
    solution:"SELECT ROUND(AVG(dept_avg),0) AS avg_of_dept_avgs FROM (SELECT dept, AVG(salary) AS dept_avg FROM employees GROUP BY dept) AS dept_avgs;",
    explanation:"AVG of AVG differs from overall AVG when departments have different sizes. Subquery computes per-dept avg; outer query averages those values.", relatedQuestions:[254,255], xpReward:40
  },
  {
    id: 255, title: "Employees in All Departments (Simulated INTERSECT)", slug: "simulated-intersect",
    difficulty: "Hard", category: "Set Operations", tags: ["INTERSECT","IN","Subquery"], companies: [],
    problemStatement: "Find reps who made sales in BOTH Q1 and Q2.",
    tableStructure: [
      { tableName:"sales", columns:[{name:"sale_id",type:"INTEGER"},{name:"rep_name",type:"TEXT"},{name:"quarter",type:"TEXT"}], createSQL:SALES.sc, insertSQL:SALES.si }
    ],
    sampleData:{}, expectedOutput:[{rep_name:"Alice Johnson"},{rep_name:"Bob Smith"},{rep_name:"Carol White"},{rep_name:"Eva Green"},{rep_name:"Frank Lee"}],
    hint1:"One approach: IN with subquery for Q1, AND IN with subquery for Q2.", hint2:"Another: INTERSECT two SELECT queries.", hint3:"WHERE rep_name IN (SELECT rep_name FROM sales WHERE quarter='Q1') AND rep_name IN (SELECT rep_name FROM sales WHERE quarter='Q2')",
    solution:"SELECT DISTINCT rep_name FROM sales WHERE quarter = 'Q1' AND rep_name IN (SELECT rep_name FROM sales WHERE quarter = 'Q2') ORDER BY rep_name;",
    explanation:"Subquery finds Q2 reps. Outer query's WHERE + IN ensures reps are in BOTH Q1 and Q2. Equivalent to INTERSECT but works in all SQL dialects.", relatedQuestions:[127,252], xpReward:40
  },
  {
    id: 256, title: "Spending Velocity: Avg Days Between Transactions", slug: "spending-velocity",
    difficulty: "Hard", category: "Analytics", tags: ["LAG","DATEDIFF","Velocity"], companies: [],
    problemStatement: "For each account, find the average number of days between transactions (spending velocity).",
    tableStructure: [
      { tableName:"transactions", columns:[{name:"txn_id",type:"INTEGER"},{name:"account",type:"TEXT"},{name:"txn_date",type:"TEXT"}], createSQL:TXN.tc, insertSQL:TXN.ti }
    ],
    sampleData:{}, expectedOutput:[{account:"ACC001",avg_days_between:7.1},{account:"ACC002",avg_days_between:8.6}],
    hint1:"LAG(txn_date) per account ordered by txn_date.", hint2:"DATEDIFF for each gap. AVG those.", hint3:"AVG(DATEDIFF(txn_date, prev_date)) per account",
    solution:"WITH gaps AS (\n  SELECT account, txn_date, LAG(txn_date) OVER (PARTITION BY account ORDER BY txn_date) AS prev_date FROM transactions\n)\nSELECT account, ROUND(AVG(DATEDIFF(txn_date, prev_date)),1) AS avg_days_between FROM gaps WHERE prev_date IS NOT NULL GROUP BY account ORDER BY account;",
    explanation:"LAG gives the previous transaction date per account. DATEDIFF calculates gap. AVG per account gives velocity. Filter out NULLs (first rows).", relatedQuestions:[236,257], xpReward:45
  },
  {
    id: 257, title: "Revenue Contribution Above Median", slug: "revenue-above-median",
    difficulty: "Hard", category: "Analytics", tags: ["Median","Subquery","NTILE"], companies: [],
    problemStatement: "Find reps whose total sales are at or above the median rep sales. Use NTILE to approximate median.",
    tableStructure: [
      { tableName:"sales", columns:[{name:"sale_id",type:"INTEGER"},{name:"rep_name",type:"TEXT"},{name:"amount",type:"REAL"}], createSQL:SALES.sc, insertSQL:SALES.si }
    ],
    sampleData:{}, expectedOutput:[{rep_name:"Eva Green",total:205000},{rep_name:"Alice Johnson",total:225000}],
    hint1:"CTE: total per rep. Second CTE: NTILE(2) on total.", hint2:"ntile=2 means top half.", hint3:"WHERE ntile_bucket = 2",
    solution:"WITH rep_totals AS (\n  SELECT rep_name, SUM(amount) AS total FROM sales GROUP BY rep_name\n),\nntiled AS (\n  SELECT rep_name, total, NTILE(2) OVER (ORDER BY total) AS ntile_bucket FROM rep_totals\n)\nSELECT rep_name, total FROM ntiled WHERE ntile_bucket = 2 ORDER BY total DESC;",
    explanation:"NTILE(2) splits reps into two halves. Bucket 2 = top half (at or above median). Alternative to complex median calculation.", relatedQuestions:[237,253], xpReward:45
  },
  {
    id: 258, title: "HAVING with Window Function Alternative", slug: "having-window-alternative",
    difficulty: "Hard", category: "Aggregation", tags: ["HAVING","COUNT","Filter Groups"], companies: [],
    problemStatement: "Find departments with more than 3 employees AND average salary above 70000.",
    tableStructure: [
      { tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"dept",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL:EMP.ec, insertSQL:EMP.ei }
    ],
    sampleData:{}, expectedOutput:[{dept:"Engineering",headcount:5,avg_salary:92200},{dept:"Finance",headcount:4,avg_salary:76500}],
    hint1:"GROUP BY dept.", hint2:"HAVING COUNT(*) > 3 AND AVG(salary) > 70000.", hint3:"SELECT dept, COUNT(*), AVG(salary) ... HAVING COUNT(*) > 3 AND AVG(salary) > 70000",
    solution:"SELECT dept, COUNT(*) AS headcount, ROUND(AVG(salary),0) AS avg_salary FROM employees GROUP BY dept HAVING COUNT(*) > 3 AND AVG(salary) > 70000 ORDER BY headcount DESC;",
    explanation:"HAVING can combine multiple aggregate conditions with AND/OR. Both conditions must be true for a department to appear.", relatedQuestions:[122,259], xpReward:35
  },
  {
    id: 259, title: "Flagging Inactive Accounts", slug: "flagging-inactive-accounts",
    difficulty: "Hard", category: "Analytics", tags: ["MAX","CASE","Date Logic"], companies: [],
    problemStatement: "Flag accounts as 'Active' (last transaction in 2024-03) or 'Inactive' (last transaction before 2024-03).",
    tableStructure: [
      { tableName:"transactions", columns:[{name:"txn_id",type:"INTEGER"},{name:"account",type:"TEXT"},{name:"txn_date",type:"TEXT"}], createSQL:TXN.tc, insertSQL:TXN.ti }
    ],
    sampleData:{}, expectedOutput:[{account:"ACC001",last_txn:"2024-03-01",status:"Active"},{account:"ACC002",last_txn:"2024-03-15",status:"Active"}],
    hint1:"MAX(txn_date) per account.", hint2:"CASE based on whether month is 2024-03.", hint3:"CASE WHEN SUBSTR(MAX(txn_date),1,7) = '2024-03' THEN 'Active' ELSE 'Inactive' END",
    solution:"SELECT account, MAX(txn_date) AS last_txn, CASE WHEN SUBSTR(MAX(txn_date),1,7) >= '2024-03' THEN 'Active' ELSE 'Inactive' END AS status FROM transactions GROUP BY account ORDER BY account;",
    explanation:"MAX(txn_date) per account gives the most recent activity. CASE on the date string determines active/inactive status.", relatedQuestions:[119,260], xpReward:35
  },
  {
    id: 260, title: "Three-Table Analytical Join", slug: "three-table-analytical-join",
    difficulty: "Hard", category: "JOINs", tags: ["Multi-table JOIN","Analytics","CTE"], companies: [],
    problemStatement: "Join employees with their sales. Show employees who have never made a sale.",
    tableStructure: [
      { tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"dept",type:"TEXT"}], createSQL:EMP.ec, insertSQL:EMP.ei },
      { tableName:"sales", columns:[{name:"sale_id",type:"INTEGER"},{name:"rep_name",type:"TEXT"},{name:"amount",type:"REAL"}], createSQL:SALES.sc, insertSQL:SALES.si }
    ],
    sampleData:{}, expectedOutput:[{emp_name:"David Brown",dept:"HR"},{emp_name:"Grace Kim",dept:"HR"},{emp_name:"Nikhil Sen",dept:"HR"}],
    hint1:"LEFT JOIN sales on emp_name.", hint2:"WHERE sale_id IS NULL — no matching sale.", hint3:"LEFT JOIN sales s ON e.emp_name = s.rep_name WHERE s.rep_name IS NULL",
    solution:"SELECT e.emp_name, e.dept FROM employees e LEFT JOIN sales s ON e.emp_name = s.rep_name WHERE s.rep_name IS NULL ORDER BY e.dept, e.emp_name;",
    explanation:"LEFT JOIN keeps all employees. NULL on the sales side means no matching sale. This is the anti-join pattern.", relatedQuestions:[110,112], xpReward:35
  },
  {
    id: 261, title: "Salary Band Headcount", slug: "salary-band-headcount",
    difficulty: "Hard", category: "Aggregation", tags: ["CASE","Bands","COUNT"], companies: [],
    problemStatement: "Count employees in salary bands: Under 60k, 60k-80k, 80k-100k, Over 100k.",
    tableStructure: [
      { tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL:EMP.ec, insertSQL:EMP.ei }
    ],
    sampleData:{}, expectedOutput:[{band:"Under 60k",count:3},{band:"60k-80k",count:5},{band:"80k-100k",count:5},{band:"Over 100k",count:2}],
    hint1:"CASE to derive band, then GROUP BY band.", hint2:"COUNT(*) per band.", hint3:"CASE WHEN salary < 60000 THEN 'Under 60k' WHEN salary <= 80000 THEN '60k-80k' ... END AS band",
    solution:"SELECT CASE WHEN salary < 60000 THEN 'Under 60k' WHEN salary <= 80000 THEN '60k-80k' WHEN salary <= 100000 THEN '80k-100k' ELSE 'Over 100k' END AS band, COUNT(*) AS count FROM employees GROUP BY band ORDER BY MIN(salary);",
    explanation:"CASE in GROUP BY allows grouping by derived labels. ORDER BY MIN(salary) puts bands in ascending order.", relatedQuestions:[169,262], xpReward:35
  },
  {
    id: 262, title: "Year-to-Date Sales per Rep", slug: "ytd-sales-per-rep",
    difficulty: "Hard", category: "Window Functions", tags: ["SUM OVER","YTD","Running Total"], companies: [],
    problemStatement: "Compute a year-to-date (YTD) running total for each rep across all of 2024.",
    tableStructure: [
      { tableName:"sales", columns:[{name:"sale_id",type:"INTEGER"},{name:"rep_name",type:"TEXT"},{name:"amount",type:"REAL"},{name:"sale_date",type:"TEXT"}], createSQL:SALES.sc, insertSQL:SALES.si }
    ],
    sampleData:{}, expectedOutput:[{rep_name:"Alice Johnson",sale_date:"2024-01-05",amount:85000,ytd:85000},{rep_name:"Alice Johnson",sale_date:"2024-04-08",amount:42000,ytd:127000}],
    hint1:"SUM OVER PARTITION BY rep, ordered by date.", hint2:"ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW.", hint3:"SUM(amount) OVER (PARTITION BY rep_name ORDER BY sale_date)",
    solution:"SELECT rep_name, sale_date, amount, SUM(amount) OVER (PARTITION BY rep_name ORDER BY sale_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS ytd FROM sales ORDER BY rep_name, sale_date;",
    explanation:"YTD is a running total from the beginning of time to now. ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW is the explicit frame for cumulative sum.", relatedQuestions:[231,235], xpReward:40
  },
  {
    id: 263, title: "Department with Highest Salary Spread", slug: "highest-salary-spread",
    difficulty: "Hard", category: "Aggregation", tags: ["MAX-MIN","Spread","GROUP BY"], companies: [],
    problemStatement: "Find the department with the largest salary spread (MAX - MIN salary).",
    tableStructure: [
      { tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"dept",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL:EMP.ec, insertSQL:EMP.ei }
    ],
    sampleData:{}, expectedOutput:[{dept:"Engineering",max_salary:102000,min_salary:85000,spread:17000}],
    hint1:"GROUP BY dept, compute (MAX-MIN).", hint2:"ORDER BY spread DESC LIMIT 1.", hint3:"SELECT dept, MAX(salary), MIN(salary), MAX(salary)-MIN(salary) AS spread FROM employees GROUP BY dept ORDER BY spread DESC LIMIT 1",
    solution:"SELECT dept, MAX(salary) AS max_salary, MIN(salary) AS min_salary, (MAX(salary) - MIN(salary)) AS spread FROM employees GROUP BY dept ORDER BY spread DESC LIMIT 1;",
    explanation:"Salary spread = MAX - MIN per department. ORDER BY spread DESC LIMIT 1 gets the most spread-out department.", relatedQuestions:[258,264], xpReward:35
  },
  {
    id: 264, title: "Self Join: Employees Earning More Than Their Manager", slug: "earn-more-than-manager",
    difficulty: "Hard", category: "Self Joins", tags: ["Self Join","Comparison","Manager"], companies: [],
    problemStatement: "Find employees who earn more than their direct manager.",
    tableStructure: [
      { tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"salary",type:"REAL"},{name:"manager_id",type:"INTEGER"}], createSQL:EMP.ec, insertSQL:EMP.ei }
    ],
    sampleData:{}, expectedOutput:[{emp_name:"Eva Green",emp_salary:102000,manager_name:"Alice Johnson",manager_salary:95000}],
    hint1:"Self-join employees with managers.", hint2:"WHERE emp.salary > manager.salary.", hint3:"JOIN employees mgr ON e.manager_id = mgr.emp_id WHERE e.salary > mgr.salary",
    solution:"SELECT e.emp_name, e.salary AS emp_salary, mgr.emp_name AS manager_name, mgr.salary AS manager_salary FROM employees e JOIN employees mgr ON e.manager_id = mgr.emp_id WHERE e.salary > mgr.salary ORDER BY e.salary DESC;",
    explanation:"Self-join creates employee+manager pairs. WHERE e.salary > mgr.salary filters to employees who out-earn their boss.", relatedQuestions:[111,265], xpReward:40
  },
  {
    id: 265, title: "Pivot Sales by Quarter Using CASE", slug: "pivot-sales-by-quarter",
    difficulty: "Hard", category: "CASE Expressions", tags: ["Pivot","CASE","Quarter"], companies: [],
    problemStatement: "Pivot sales by quarter: show each rep's total sales for Q1, Q2, and Q3 in separate columns.",
    tableStructure: [
      { tableName:"sales", columns:[{name:"sale_id",type:"INTEGER"},{name:"rep_name",type:"TEXT"},{name:"amount",type:"REAL"},{name:"quarter",type:"TEXT"}], createSQL:SALES.sc, insertSQL:SALES.si }
    ],
    sampleData:{}, expectedOutput:[{rep_name:"Alice Johnson",q1:85000,q2:42000,q3:98000},{rep_name:"Carol White",q1:91000,q2:28000,q3:86000}],
    hint1:"SUM(CASE WHEN quarter='Q1' THEN amount ELSE 0 END) AS q1.", hint2:"GROUP BY rep_name.", hint3:"SELECT rep_name, SUM(CASE WHEN quarter='Q1' THEN amount END) AS q1, ...",
    solution:"SELECT rep_name, SUM(CASE WHEN quarter='Q1' THEN amount ELSE 0 END) AS q1, SUM(CASE WHEN quarter='Q2' THEN amount ELSE 0 END) AS q2, SUM(CASE WHEN quarter='Q3' THEN amount ELSE 0 END) AS q3 FROM sales GROUP BY rep_name ORDER BY rep_name;",
    explanation:"Classic pivot with CASE+SUM. One column per quarter. GROUP BY rep_name gives one row per rep. 0 default for missing quarters.", relatedQuestions:[161,210], xpReward:40
  },
];
