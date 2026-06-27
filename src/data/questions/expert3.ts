import type { Question } from '../../types';

const EMP = {
  ec: "CREATE TABLE employees (emp_id INTEGER PRIMARY KEY, emp_name TEXT, dept TEXT, salary REAL, hire_date TEXT, manager_id INTEGER);",
  ei: "INSERT INTO employees VALUES (1,'Alice Johnson','Engineering',95000,'2018-01-15',NULL),(2,'Bob Smith','Marketing',62000,'2019-06-01',NULL),(3,'Carol White','Engineering',88000,'2020-03-20',1),(4,'David Brown','HR',55000,'2021-09-10',NULL),(5,'Eva Green','Engineering',102000,'2017-07-22',1),(6,'Frank Lee','Marketing',68000,'2020-11-05',2),(7,'Grace Kim','HR',58000,'2022-01-30',4),(8,'Henry Das','Finance',78000,'2016-05-14',NULL),(9,'Isla Roy','Finance',72000,'2019-08-19',8),(10,'Jack Mehta','Engineering',91000,'2021-03-11',1),(11,'Karen Nair','Marketing',65000,'2020-07-08',2),(12,'Leo Patel','Finance',80000,'2018-12-01',8),(13,'Maya Raj','Engineering',85000,'2023-02-14',1),(14,'Nikhil Sen','HR',52000,'2022-06-18',4),(15,'Ola Tiwari','Finance',76000,'2019-10-25',8);"
};
const SALES = {
  sc: "CREATE TABLE sales (sale_id INTEGER PRIMARY KEY, rep_name TEXT, dept TEXT, product TEXT, region TEXT, amount REAL, sale_date TEXT, quarter TEXT);",
  si: "INSERT INTO sales VALUES (1,'Alice Johnson','Engineering','Laptop','North',85000,'2024-01-05','Q1'),(2,'Bob Smith','Marketing','Phone','South',32000,'2024-01-12','Q1'),(3,'Carol White','Engineering','Laptop','East',91000,'2024-01-18','Q1'),(4,'David Brown','HR','Monitor','West',24000,'2024-02-02','Q1'),(5,'Eva Green','Engineering','Laptop','North',110000,'2024-02-14','Q1'),(6,'Frank Lee','Marketing','Phone','South',38000,'2024-03-01','Q1'),(7,'Alice Johnson','Engineering','Monitor','East',42000,'2024-04-08','Q2'),(8,'Bob Smith','Marketing','Laptop','North',55000,'2024-04-22','Q2'),(9,'Carol White','Engineering','Phone','West',28000,'2024-05-10','Q2'),(10,'Eva Green','Engineering','Laptop','South',95000,'2024-05-25','Q2'),(11,'Frank Lee','Marketing','Monitor','East',31000,'2024-06-05','Q2'),(12,'Grace Kim','HR','Phone','North',18000,'2024-06-15','Q2'),(13,'Henry Das','Finance','Laptop','West',72000,'2024-07-03','Q3'),(14,'Alice Johnson','Engineering','Laptop','South',98000,'2024-07-18','Q3'),(15,'Isla Roy','Finance','Monitor','North',27000,'2024-08-01','Q3'),(16,'Leo Patel','Finance','Phone','East',35000,'2024-08-22','Q3'),(17,'Carol White','Engineering','Laptop','West',86000,'2024-09-09','Q3'),(18,'Maya Raj','Engineering','Monitor','North',44000,'2024-09-28','Q3');"
};

export const expert3Questions: Question[] = [
  {
    id: 326, title: "Median Salary Using Window Functions", slug: "median-salary-window",
    difficulty: "Expert", category: "Window Functions", tags: ["Median","ROW_NUMBER","Window"], companies: [],
    problemStatement: "Calculate the median salary across all employees without using MEDIAN() function.",
    tableStructure: [
      { tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL:EMP.ec, insertSQL:EMP.ei }
    ],
    sampleData:{}, expectedOutput:[{median_salary:76000}],
    hint1:"ROW_NUMBER + COUNT to find middle row(s).", hint2:"For odd count: middle row. For even: average of two middle rows.", hint3:"WHERE rn IN (FLOOR((n+1)/2), CEIL((n+1)/2))",
    solution:`WITH ranked AS (
  SELECT salary, ROW_NUMBER() OVER (ORDER BY salary) AS rn, COUNT(*) OVER () AS n
  FROM employees
)
SELECT ROUND(AVG(salary),0) AS median_salary
FROM ranked
WHERE rn IN (FLOOR((n+1.0)/2), CEIL((n+1.0)/2));`,
    explanation:"ROW_NUMBER gives rank. COUNT() OVER() gives total rows. For even n, average two middle rows. FLOOR/CEIL handles both odd and even counts.", relatedQuestions:[213,304], xpReward:60
  },
  {
    id: 327, title: "ROLLUP: Subtotals and Grand Total", slug: "rollup-subtotals",
    difficulty: "Expert", category: "Advanced Aggregation", tags: ["ROLLUP","Subtotals","GROUP BY"], companies: [],
    problemStatement: "Using GROUP BY ROLLUP, show total sales by dept and product with subtotals per dept and a grand total.",
    tableStructure: [
      { tableName:"sales", columns:[{name:"sale_id",type:"INTEGER"},{name:"dept",type:"TEXT"},{name:"product",type:"TEXT"},{name:"amount",type:"REAL"}], createSQL:SALES.sc, insertSQL:SALES.si }
    ],
    sampleData:{}, expectedOutput:[{dept:"Engineering",product:"Laptop",total:470000},{dept:"Engineering",product:null,total:579000},{dept:null,product:null,total:802000}],
    hint1:"GROUP BY ROLLUP(dept, product).", hint2:"NULL in dept column = grand total. NULL in product = dept subtotal.", hint3:"GROUP BY ROLLUP(dept, product)",
    solution:"SELECT dept, product, SUM(amount) AS total FROM sales GROUP BY ROLLUP(dept, product) ORDER BY dept, product;",
    explanation:"ROLLUP generates: (dept,product), (dept,NULL subtotal), (NULL,NULL grand total). NULL in the grouping columns indicates the aggregated level.", relatedQuestions:[213,328], xpReward:55
  },
  {
    id: 328, title: "Recursive CTE: Generate Date Series", slug: "recursive-date-series",
    difficulty: "Expert", category: "Recursive CTEs", tags: ["Recursive CTE","Date Series","Generate"], companies: [],
    problemStatement: "Generate a series of the first 7 days of 2024 using a recursive CTE.",
    tableStructure: [],
    sampleData:{}, expectedOutput:[{day_num:1,date_val:"2024-01-01"},{day_num:2,date_val:"2024-01-02"}],
    hint1:"Anchor: day 1. Recursive: add 1 day until day 7.", hint2:"Use DATEADD or date arithmetic.", hint3:"WITH RECURSIVE dates AS (SELECT 1 AS n, '2024-01-01' AS dt UNION ALL SELECT n+1, DATEADD('day',1,dt) FROM dates WHERE n < 7)",
    solution:`WITH RECURSIVE dates AS (
  SELECT 1 AS day_num, '2024-01-01' AS date_val
  UNION ALL
  SELECT day_num + 1, DATEADD('day', 1, date_val)
  FROM dates
  WHERE day_num < 7
)
SELECT day_num, date_val FROM dates;`,
    explanation:"Recursive CTE generates sequences. Anchor is day 1. Each recursion adds 1 day. Termination: day_num < 7.", relatedQuestions:[215,329], xpReward:55
  },
  {
    id: 329, title: "Cohort Retention: Month 0 vs Month 1", slug: "cohort-retention-m0-m1",
    difficulty: "Expert", category: "Analytics", tags: ["Cohort","Retention","CTE"], companies: [],
    problemStatement: "From the sales data, consider the quarter of a rep's first sale as their cohort. Find how many reps in the Q1 cohort also had sales in Q2 (retention rate).",
    tableStructure: [
      { tableName:"sales", columns:[{name:"sale_id",type:"INTEGER"},{name:"rep_name",type:"TEXT"},{name:"quarter",type:"TEXT"}], createSQL:SALES.sc, insertSQL:SALES.si }
    ],
    sampleData:{}, expectedOutput:[{cohort:"Q1",total_reps:6,retained_in_q2:5,retention_pct:83.3}],
    hint1:"CTE1: find each rep's first quarter.", hint2:"CTE2: count Q1 cohort reps who also appear in Q2.", hint3:"JOIN back on rep_name WHERE quarter='Q2'",
    solution:`WITH first_sale AS (
  SELECT rep_name, MIN(quarter) AS cohort FROM sales GROUP BY rep_name
),
q1_cohort AS (
  SELECT rep_name FROM first_sale WHERE cohort = 'Q1'
),
q2_active AS (
  SELECT DISTINCT rep_name FROM sales WHERE quarter = 'Q2'
)
SELECT 'Q1' AS cohort,
  COUNT(*) AS total_reps,
  SUM(CASE WHEN q2.rep_name IS NOT NULL THEN 1 ELSE 0 END) AS retained_in_q2,
  ROUND(SUM(CASE WHEN q2.rep_name IS NOT NULL THEN 1 ELSE 0 END)*100.0/COUNT(*),1) AS retention_pct
FROM q1_cohort qc
LEFT JOIN q2_active q2 ON qc.rep_name = q2.rep_name;`,
    explanation:"Multi-CTE cohort analysis: identify cohort members, then check which appeared in the next period. LEFT JOIN + CASE counts retained members.", relatedQuestions:[310,330], xpReward:65
  },
  {
    id: 330, title: "Salary Percentile Classification", slug: "salary-percentile-classify",
    difficulty: "Expert", category: "Window Functions", tags: ["NTILE","PERCENT_RANK","Classification"], companies: [],
    problemStatement: "Classify employees into: Top 20% (Elite), Next 30% (Senior), Bottom 50% (Standard) by salary.",
    tableStructure: [
      { tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL:EMP.ec, insertSQL:EMP.ei }
    ],
    sampleData:{}, expectedOutput:[{emp_name:"Eva Green",salary:102000,tier:"Elite"},{emp_name:"Alice Johnson",salary:95000,tier:"Elite"}],
    hint1:"PERCENT_RANK() OVER (ORDER BY salary DESC) gives top-down percentile.", hint2:"CASE on pct_rank: < 0.2 = Elite, < 0.5 = Senior, else Standard.", hint3:"CASE WHEN pct_rank < 0.2 THEN 'Elite' WHEN pct_rank < 0.5 THEN 'Senior' ELSE 'Standard' END",
    solution:`WITH ranked AS (
  SELECT emp_name, salary,
    PERCENT_RANK() OVER (ORDER BY salary DESC) AS pct_rank
  FROM employees
)
SELECT emp_name, salary,
  CASE WHEN pct_rank < 0.2 THEN 'Elite'
       WHEN pct_rank < 0.5 THEN 'Senior'
       ELSE 'Standard' END AS tier
FROM ranked
ORDER BY salary DESC;`,
    explanation:"PERCENT_RANK DESC gives 0 for highest salary. Values < 0.2 are top 20% (Elite), 0.2–0.5 are next 30% (Senior), rest are Standard.", relatedQuestions:[209,253], xpReward:60
  },
  {
    id: 331, title: "Recursive CTE: Sum 1 to N", slug: "recursive-sum-1-to-n",
    difficulty: "Expert", category: "Recursive CTEs", tags: ["Recursive CTE","Running Sum","Math"], companies: [],
    problemStatement: "Using a recursive CTE, generate integers from 1 to 10 and compute the running sum at each step.",
    tableStructure: [],
    sampleData:{}, expectedOutput:[{n:1,running_sum:1},{n:2,running_sum:3},{n:10,running_sum:55}],
    hint1:"Anchor: n=1, sum=1. Recursive: n+1, sum+n+1.", hint2:"Stop at n=10.", hint3:"WITH RECURSIVE nums AS (SELECT 1 AS n, 1 AS running_sum UNION ALL SELECT n+1, running_sum+n+1 FROM nums WHERE n<10)",
    solution:`WITH RECURSIVE nums AS (
  SELECT 1 AS n, 1 AS running_sum
  UNION ALL
  SELECT n+1, running_sum + (n+1)
  FROM nums
  WHERE n < 10
)
SELECT n, running_sum FROM nums;`,
    explanation:"Each recursion increments n and adds the new n to the sum. This demonstrates recursive accumulation.", relatedQuestions:[215,328], xpReward:55
  },
  {
    id: 332, title: "Multi-CTE: Complete Sales Dashboard", slug: "complete-sales-dashboard",
    difficulty: "Expert", category: "Analytics", tags: ["Multi-CTE","Dashboard","Analytics"], companies: [],
    problemStatement: "Build a complete sales dashboard: for each rep show total sales, rank, their best quarter, and whether they are in the top half.",
    tableStructure: [
      { tableName:"sales", columns:[{name:"sale_id",type:"INTEGER"},{name:"rep_name",type:"TEXT"},{name:"amount",type:"REAL"},{name:"quarter",type:"TEXT"}], createSQL:SALES.sc, insertSQL:SALES.si }
    ],
    sampleData:{}, expectedOutput:[{rep_name:"Alice Johnson",total:225000,overall_rank:1,best_quarter:"Q3",top_half:"Yes"}],
    hint1:"CTE1: total per rep. CTE2: rank. CTE3: best quarter per rep.", hint2:"JOIN all together.", hint3:"RANK() OVER (ORDER BY total DESC), NTILE(2) for top half",
    solution:`WITH totals AS (
  SELECT rep_name, SUM(amount) AS total FROM sales GROUP BY rep_name
),
ranked AS (
  SELECT *, RANK() OVER (ORDER BY total DESC) AS overall_rank,
    NTILE(2) OVER (ORDER BY total DESC) AS half
  FROM totals
),
best_q AS (
  SELECT rep_name, quarter AS best_quarter
  FROM (
    SELECT rep_name, quarter, SUM(amount) AS q_total,
      RANK() OVER (PARTITION BY rep_name ORDER BY SUM(amount) DESC) AS qr
    FROM sales GROUP BY rep_name, quarter
  ) qranked WHERE qr = 1
)
SELECT r.rep_name, r.total, r.overall_rank, bq.best_quarter,
  CASE WHEN r.half = 1 THEN 'Yes' ELSE 'No' END AS top_half
FROM ranked r JOIN best_q bq ON r.rep_name = bq.rep_name
ORDER BY r.overall_rank;`,
    explanation:"Layered CTEs build up complexity: totals → ranks → best quarter. Final SELECT combines all three with JOINs for a comprehensive view.", relatedQuestions:[325,329], xpReward:70
  },
  {
    id: 333, title: "FULL OUTER JOIN Simulation", slug: "full-outer-join-sim",
    difficulty: "Expert", category: "Set Operations", tags: ["UNION","LEFT JOIN","FULL OUTER JOIN"], companies: [],
    problemStatement: "Simulate a FULL OUTER JOIN between employees and sales by rep_name — show all employees and all reps, even if one side is missing.",
    tableStructure: [
      { tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"dept",type:"TEXT"}], createSQL:EMP.ec, insertSQL:EMP.ei },
      { tableName:"sales", columns:[{name:"sale_id",type:"INTEGER"},{name:"rep_name",type:"TEXT"},{name:"amount",type:"REAL"}], createSQL:SALES.sc, insertSQL:SALES.si }
    ],
    sampleData:{}, expectedOutput:[{name:"Alice Johnson",emp_dept:"Engineering",total_sales:225000},{name:"David Brown",emp_dept:"HR",total_sales:24000}],
    hint1:"LEFT JOIN employees → sales UNION ALL RIGHT JOIN (or LEFT JOIN from the other side).", hint2:"Use UNION ALL + dedup.", hint3:"SELECT e.emp_name, e.dept, SUM(s.amount) FROM employees e LEFT JOIN sales s ON e.emp_name = s.rep_name GROUP BY e.emp_name UNION ALL ...",
    solution:`SELECT COALESCE(e.emp_name, s.rep_name) AS name, e.dept AS emp_dept, SUM(s.amount) AS total_sales
FROM employees e
LEFT JOIN sales s ON e.emp_name = s.rep_name
GROUP BY e.emp_name, s.rep_name, e.dept
UNION ALL
SELECT s.rep_name, NULL, SUM(s.amount)
FROM sales s
LEFT JOIN employees e ON s.rep_name = e.emp_name
WHERE e.emp_name IS NULL
GROUP BY s.rep_name
ORDER BY name;`,
    explanation:"FULL OUTER JOIN = LEFT JOIN UNION ALL anti-join from right side. This pattern works in any database that lacks FULL OUTER JOIN syntax.", relatedQuestions:[110,315], xpReward:65
  },
  {
    id: 334, title: "Window: Salary Compared to Company and Dept Average", slug: "salary-vs-both-avgs",
    difficulty: "Expert", category: "Window Functions", tags: ["Multiple Windows","Comparison","Analytics"], companies: [],
    problemStatement: "For each employee, show their salary, dept average, company average, and flag if they beat BOTH averages.",
    tableStructure: [
      { tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"dept",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL:EMP.ec, insertSQL:EMP.ei }
    ],
    sampleData:{}, expectedOutput:[{emp_name:"Eva Green",salary:102000,dept_avg:92200,company_avg:75733,beats_both:"Yes"}],
    hint1:"Two window functions: AVG OVER (PARTITION BY dept) and AVG OVER ().", hint2:"CASE to flag.", hint3:"AVG(salary) OVER (PARTITION BY dept) AS dept_avg, AVG(salary) OVER () AS company_avg",
    solution:`SELECT emp_name, dept, salary,
  ROUND(AVG(salary) OVER (PARTITION BY dept), 0) AS dept_avg,
  ROUND(AVG(salary) OVER (), 0) AS company_avg,
  CASE WHEN salary > AVG(salary) OVER (PARTITION BY dept)
            AND salary > AVG(salary) OVER ()
       THEN 'Yes' ELSE 'No' END AS beats_both
FROM employees
ORDER BY salary DESC;`,
    explanation:"Two window functions in one query: partitioned (dept average) and unpartitioned (company average). CASE combines both conditions.", relatedQuestions:[229,245], xpReward:65
  },
  {
    id: 335, title: "Recursive CTE: Org Tree with Depth", slug: "org-tree-depth",
    difficulty: "Expert", category: "Recursive CTEs", tags: ["Recursive CTE","Org Hierarchy","Depth"], companies: [],
    problemStatement: "Build the full org chart starting from CEO (manager_id IS NULL). Show each employee, their depth level, and path from root.",
    tableStructure: [
      { tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"manager_id",type:"INTEGER"}], createSQL:EMP.ec, insertSQL:EMP.ei }
    ],
    sampleData:{}, expectedOutput:[{emp_name:"Alice Johnson",depth:0,path:"Alice Johnson"},{emp_name:"Carol White",depth:1,path:"Alice Johnson > Carol White"}],
    hint1:"Anchor: WHERE manager_id IS NULL, depth=0, path=emp_name.", hint2:"Recursive: JOIN on emp_id = manager_id, depth+1, path || ' > ' || emp_name.", hint3:"WITH RECURSIVE org AS (... UNION ALL SELECT e.emp_id, e.emp_name, e.manager_id, o.depth+1, o.path || ' > ' || e.emp_name FROM employees e JOIN org o ON e.manager_id = o.emp_id)",
    solution:`WITH RECURSIVE org AS (
  SELECT emp_id, emp_name, manager_id, 0 AS depth, emp_name AS path
  FROM employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.emp_id, e.emp_name, e.manager_id, o.depth+1, o.path || ' > ' || e.emp_name
  FROM employees e JOIN org o ON e.manager_id = o.emp_id
)
SELECT emp_name, depth, path FROM org ORDER BY path;`,
    explanation:"Anchor selects roots (no manager). Recursive step follows manager_id → emp_id links. Path string grows at each level. Depth tracks levels from root.", relatedQuestions:[218,248], xpReward:70
  },
];
