import type { Question } from '../../types';

const HR = {
  ec: "CREATE TABLE employees (emp_id INTEGER PRIMARY KEY, emp_name TEXT, dept_id INTEGER, salary REAL, hire_date TEXT, manager_id INTEGER);",
  ei: "INSERT INTO employees VALUES (1,'Alice Johnson',1,85000,'2020-01-15',NULL),(2,'Bob Smith',2,62000,'2019-06-01',5),(3,'Carol White',1,92000,'2018-03-20',1),(4,'David Brown',3,55000,'2021-09-10',7),(5,'Eva Green',2,67000,'2020-11-05',NULL),(6,'Frank Lee',1,78000,'2017-07-22',1),(7,'Grace Kim',3,58000,'2022-01-30',NULL),(8,'Henry Das',4,72000,'2016-05-14',NULL),(9,'Isla Roy',4,69000,'2019-08-19',8),(10,'Jack Mehta',2,61000,'2021-03-11',5);",
  dc: "CREATE TABLE departments (dept_id INTEGER PRIMARY KEY, dept_name TEXT, budget REAL, location TEXT);",
  di: "INSERT INTO departments VALUES (1,'Engineering',500000,'Bangalore'),(2,'Marketing',200000,'Mumbai'),(3,'HR',150000,'Delhi'),(4,'Finance',300000,'Chennai');"
};
const STORE = {
  oc: "CREATE TABLE orders (order_id INTEGER PRIMARY KEY, customer_id INTEGER, product TEXT, category TEXT, amount REAL, qty INTEGER, order_date TEXT, status TEXT);",
  oi: "INSERT INTO orders VALUES (1,101,'Laptop','Electronics',45000,1,'2024-01-10','Delivered'),(2,102,'Phone','Electronics',15000,2,'2024-01-15','Delivered'),(3,103,'Desk','Furniture',12000,1,'2024-01-20','Cancelled'),(4,101,'Mouse','Electronics',800,3,'2024-02-05','Delivered'),(5,104,'Chair','Furniture',8000,2,'2024-02-10','Delivered'),(6,102,'Laptop','Electronics',45000,1,'2024-02-15','Pending'),(7,105,'Monitor','Electronics',18000,1,'2024-02-20','Delivered'),(8,103,'Keyboard','Electronics',1500,2,'2024-03-01','Delivered'),(9,101,'Webcam','Electronics',2500,1,'2024-03-05','Delivered'),(10,104,'Headphones','Electronics',3500,1,'2024-03-10','Delivered');"
};
const SCORES = {
  c: "CREATE TABLE scores (score_id INTEGER PRIMARY KEY, student TEXT, subject TEXT, score INTEGER, exam_date TEXT, grade TEXT);",
  i: "INSERT INTO scores VALUES (1,'Aarav','Math',92,'2024-01-15','A'),(2,'Priya','Math',85,'2024-01-15','B'),(3,'Rahul','Math',78,'2024-01-15','C'),(4,'Aarav','Science',88,'2024-01-16','B'),(5,'Priya','Science',95,'2024-01-16','A'),(6,'Rahul','Science',70,'2024-01-16','C'),(7,'Aarav','English',80,'2024-01-17','B'),(8,'Priya','English',92,'2024-01-17','A'),(9,'Rahul','English',75,'2024-01-17','C'),(10,'Sneha','Math',98,'2024-01-15','A'),(11,'Sneha','Science',91,'2024-01-16','A'),(12,'Sneha','English',87,'2024-01-17','B');"
};

export const medium3Questions: Question[] = [
  {
    id: 151, title: "JOIN with Aggregate: Avg Salary by Location", slug: "avg-salary-by-location",
    difficulty: "Medium", category: "JOINs", tags: ["JOIN","AVG","GROUP BY"], companies: [],
    problemStatement: "Show the average employee salary for each department location.",
    tableStructure: [
      { tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"dept_id",type:"INTEGER"},{name:"salary",type:"REAL"}], createSQL:HR.ec, insertSQL:HR.ei },
      { tableName:"departments", columns:[{name:"dept_id",type:"INTEGER"},{name:"dept_name",type:"TEXT"},{name:"location",type:"TEXT"}], createSQL:HR.dc, insertSQL:HR.di }
    ],
    sampleData:{}, expectedOutput:[{location:"Bangalore",avg_salary:85000},{location:"Chennai",avg_salary:70500}],
    hint1:"JOIN employees with departments on dept_id.", hint2:"GROUP BY d.location.", hint3:"AVG(e.salary) per location",
    solution:"SELECT d.location, ROUND(AVG(e.salary),0) AS avg_salary FROM employees e JOIN departments d ON e.dept_id = d.dept_id GROUP BY d.location ORDER BY avg_salary DESC;",
    explanation:"JOIN gives access to department location. GROUP BY location aggregates all employees in that city.", relatedQuestions:[101,152], xpReward:20
  },
  {
    id: 152, title: "Subquery: Departments Below Budget Average", slug: "depts-below-budget-avg",
    difficulty: "Medium", category: "Subqueries", tags: ["Subquery","AVG","WHERE"], companies: [],
    problemStatement: "Find departments whose budget is below the average budget.",
    tableStructure: [
      { tableName:"departments", columns:[{name:"dept_id",type:"INTEGER"},{name:"dept_name",type:"TEXT"},{name:"budget",type:"REAL"}], createSQL:HR.dc, insertSQL:HR.di }
    ],
    sampleData:{}, expectedOutput:[{dept_name:"Marketing",budget:200000},{dept_name:"HR",budget:150000}],
    hint1:"Subquery computes AVG budget.", hint2:"WHERE budget < (subquery).", hint3:"WHERE budget < (SELECT AVG(budget) FROM departments)",
    solution:"SELECT dept_name, budget FROM departments WHERE budget < (SELECT AVG(budget) FROM departments) ORDER BY budget DESC;",
    explanation:"Scalar subquery computes the average, outer query compares each department's budget to it.", relatedQuestions:[106,153], xpReward:25
  },
  {
    id: 153, title: "CTE: Salary Above Department Average", slug: "cte-above-dept-avg",
    difficulty: "Medium", category: "CTEs", tags: ["CTE","AVG","Comparison"], companies: [],
    problemStatement: "Using a CTE, find employees earning above their own department's average salary.",
    tableStructure: [
      { tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"dept_id",type:"INTEGER"},{name:"salary",type:"REAL"}], createSQL:HR.ec, insertSQL:HR.ei }
    ],
    sampleData:{}, expectedOutput:[{emp_name:"Alice Johnson",salary:85000,dept_avg:78333},{emp_name:"Carol White",salary:92000,dept_avg:78333}],
    hint1:"CTE computes dept avg.", hint2:"Join employees back to CTE on dept_id.", hint3:"WITH dept_avgs AS (SELECT dept_id, AVG(salary) AS dept_avg FROM employees GROUP BY dept_id) SELECT e.*, d.dept_avg FROM employees e JOIN dept_avgs d ON e.dept_id = d.dept_id WHERE e.salary > d.dept_avg",
    solution:"WITH dept_avgs AS (\n  SELECT dept_id, ROUND(AVG(salary),0) AS dept_avg\n  FROM employees GROUP BY dept_id\n)\nSELECT e.emp_name, e.salary, d.dept_avg\nFROM employees e\nJOIN dept_avgs d ON e.dept_id = d.dept_id\nWHERE e.salary > d.dept_avg\nORDER BY e.dept_id, e.salary DESC;",
    explanation:"CTE creates dept averages; joining back gives each employee their dept's average for comparison.", relatedQuestions:[109,154], xpReward:30
  },
  {
    id: 154, title: "CASE: Categorize Orders by Value", slug: "categorize-orders-value",
    difficulty: "Medium", category: "CASE Expressions", tags: ["CASE","Business Logic"], companies: [],
    problemStatement: "Categorize each order as 'Small' (<5000), 'Medium' (5000-20000), or 'Large' (>20000).",
    tableStructure: [
      { tableName:"orders", columns:[{name:"order_id",type:"INTEGER"},{name:"customer_id",type:"INTEGER"},{name:"product",type:"TEXT"},{name:"amount",type:"REAL"}], createSQL:STORE.oc, insertSQL:STORE.oi }
    ],
    sampleData:{}, expectedOutput:[{order_id:1,product:"Laptop",amount:45000,order_size:"Large"},{order_id:2,product:"Phone",amount:15000,order_size:"Medium"}],
    hint1:"CASE WHEN amount > 20000 THEN 'Large' WHEN amount >= 5000 THEN 'Medium' ELSE 'Small' END.", hint2:"Check conditions from largest to smallest or smallest to largest.", hint3:"CASE WHEN amount < 5000 THEN 'Small' WHEN amount <= 20000 THEN 'Medium' ELSE 'Large' END",
    solution:"SELECT order_id, product, amount, CASE WHEN amount < 5000 THEN 'Small' WHEN amount <= 20000 THEN 'Medium' ELSE 'Large' END AS order_size FROM orders ORDER BY amount;",
    explanation:"CASE evaluates conditions top-down. First match wins. Ordering conditions from smallest value up is easier to reason about.", relatedQuestions:[120,155], xpReward:25
  },
  {
    id: 155, title: "Category Revenue Share", slug: "category-revenue-share",
    difficulty: "Medium", category: "Subqueries", tags: ["Subquery","Percentage","GROUP BY"], companies: [],
    problemStatement: "Show each category's total revenue and its percentage of total store revenue.",
    tableStructure: [
      { tableName:"orders", columns:[{name:"order_id",type:"INTEGER"},{name:"category",type:"TEXT"},{name:"amount",type:"REAL"},{name:"qty",type:"INTEGER"},{name:"status",type:"TEXT"}], createSQL:STORE.oc, insertSQL:STORE.oi }
    ],
    sampleData:{}, expectedOutput:[{category:"Electronics",total_revenue:131800,pct:93.6},{category:"Furniture",pct:6.4}],
    hint1:"SUM per category, divide by grand total.", hint2:"Grand total via scalar subquery.", hint3:"SUM(amount*qty) * 100.0 / (SELECT SUM(amount*qty) FROM orders WHERE status != 'Cancelled')",
    solution:"SELECT category, SUM(amount*qty) AS total_revenue, ROUND(SUM(amount*qty)*100.0 / (SELECT SUM(amount*qty) FROM orders WHERE status != 'Cancelled'), 1) AS pct FROM orders WHERE status != 'Cancelled' GROUP BY category ORDER BY total_revenue DESC;",
    explanation:"Scalar subquery gives grand total. Each group's total divided by grand total = percentage. Exclude cancelled orders from both.", relatedQuestions:[127,156], xpReward:30
  },
  {
    id: 156, title: "Students with Consistent A Grades", slug: "consistent-a-grades",
    difficulty: "Medium", category: "Aggregation", tags: ["GROUP BY","HAVING","ALL"], companies: [],
    problemStatement: "Find students who scored a grade of 'A' in ALL their exams.",
    tableStructure: [
      { tableName:"scores", columns:[{name:"score_id",type:"INTEGER"},{name:"student",type:"TEXT"},{name:"grade",type:"TEXT"}], createSQL:SCORES.c, insertSQL:SCORES.i }
    ],
    sampleData:{}, expectedOutput:[{student:"Sneha",all_a_count:2,total_subjects:3}],
    hint1:"Count total subjects and count of A grades per student.", hint2:"HAVING all_a_count = total_subjects means all are As.", hint3:"HAVING SUM(CASE WHEN grade='A' THEN 1 ELSE 0 END) = COUNT(*)",
    solution:"SELECT student, SUM(CASE WHEN grade='A' THEN 1 ELSE 0 END) AS a_count, COUNT(*) AS total_exams FROM scores GROUP BY student HAVING SUM(CASE WHEN grade='A' THEN 1 ELSE 0 END) = COUNT(*) ORDER BY student;",
    explanation:"HAVING with conditional SUM filters to students where every exam has grade A (a_count = total).", relatedQuestions:[122,157], xpReward:30
  },
  {
    id: 157, title: "Join with NULL: Employees Without Managers", slug: "employees-no-manager-join",
    difficulty: "Medium", category: "JOINs", tags: ["LEFT JOIN","NULL","Self Join"], companies: [],
    problemStatement: "Using a self-join, list all employees and their manager names. Show 'No Manager' for top-level employees.",
    tableStructure: [
      { tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"manager_id",type:"INTEGER"}], createSQL:HR.ec, insertSQL:HR.ei }
    ],
    sampleData:{}, expectedOutput:[{emp_name:"Alice Johnson",manager_name:"No Manager"},{emp_name:"Bob Smith",manager_name:"Eva Green"}],
    hint1:"LEFT JOIN employees on manager_id.", hint2:"COALESCE for NULL manager.", hint3:"COALESCE(mgr.emp_name, 'No Manager') AS manager_name",
    solution:"SELECT e.emp_name, COALESCE(mgr.emp_name, 'No Manager') AS manager_name FROM employees e LEFT JOIN employees mgr ON e.manager_id = mgr.emp_id ORDER BY e.emp_id;",
    explanation:"Self-join with LEFT JOIN includes all employees. COALESCE converts NULL (no manager) to display text.", relatedQuestions:[111,158], xpReward:25
  },
  {
    id: 158, title: "Delivered Orders Revenue by Customer", slug: "delivered-revenue-per-customer",
    difficulty: "Medium", category: "Aggregation", tags: ["SUM","GROUP BY","WHERE"], companies: [],
    problemStatement: "Calculate total revenue from Delivered orders only, per customer.",
    tableStructure: [
      { tableName:"orders", columns:[{name:"order_id",type:"INTEGER"},{name:"customer_id",type:"INTEGER"},{name:"amount",type:"REAL"},{name:"qty",type:"INTEGER"},{name:"status",type:"TEXT"}], createSQL:STORE.oc, insertSQL:STORE.oi }
    ],
    sampleData:{}, expectedOutput:[{customer_id:101,delivered_revenue:48300},{customer_id:104,delivered_revenue:11500}],
    hint1:"WHERE status = 'Delivered'.", hint2:"SUM(amount*qty) per customer.", hint3:"GROUP BY customer_id",
    solution:"SELECT customer_id, SUM(amount*qty) AS delivered_revenue FROM orders WHERE status = 'Delivered' GROUP BY customer_id ORDER BY delivered_revenue DESC;",
    explanation:"WHERE filters first (only Delivered), then GROUP BY aggregates per customer. WHERE fires before aggregation.", relatedQuestions:[155,159], xpReward:20
  },
  {
    id: 159, title: "EXISTS vs IN: Check Customer Presence", slug: "exists-check-customer",
    difficulty: "Medium", category: "Subqueries", tags: ["EXISTS","Subquery","Optimization"], companies: [],
    problemStatement: "Find customers who have placed orders, using EXISTS.",
    tableStructure: [
      { tableName:"orders", columns:[{name:"order_id",type:"INTEGER"},{name:"customer_id",type:"INTEGER"}], createSQL:STORE.oc, insertSQL:STORE.oi }
    ],
    sampleData:{}, expectedOutput:[{customer_id:101},{customer_id:102},{customer_id:103},{customer_id:104},{customer_id:105}],
    hint1:"Use a subquery with EXISTS.", hint2:"EXISTS returns TRUE if subquery finds any row.", hint3:"WHERE EXISTS (SELECT 1 FROM orders o2 WHERE o2.customer_id = orders.customer_id)",
    solution:"SELECT DISTINCT customer_id FROM orders o1 WHERE EXISTS (SELECT 1 FROM orders o2 WHERE o2.customer_id = o1.customer_id) ORDER BY customer_id;",
    explanation:"EXISTS checks for existence. More efficient than IN for large datasets because it stops at first match.", relatedQuestions:[123,160], xpReward:25
  },
  {
    id: 160, title: "Multiple Aggregates: Student Report Card", slug: "student-report-card",
    difficulty: "Medium", category: "Aggregation", tags: ["AVG","MIN","MAX","GROUP BY"], companies: [],
    problemStatement: "Generate a report card for each student: total subjects, average score, best score, worst score.",
    tableStructure: [
      { tableName:"scores", columns:[{name:"score_id",type:"INTEGER"},{name:"student",type:"TEXT"},{name:"score",type:"INTEGER"}], createSQL:SCORES.c, insertSQL:SCORES.i }
    ],
    sampleData:{}, expectedOutput:[{student:"Aarav",subjects:3,avg_score:86.7,best:92,worst:80},{student:"Priya",subjects:3,avg_score:90.7,best:95,worst:85}],
    hint1:"GROUP BY student.", hint2:"COUNT, AVG, MAX, MIN in one query.", hint3:"SELECT student, COUNT(*), ROUND(AVG(score),1), MAX(score), MIN(score)",
    solution:"SELECT student, COUNT(*) AS subjects, ROUND(AVG(score),1) AS avg_score, MAX(score) AS best, MIN(score) AS worst FROM scores GROUP BY student ORDER BY avg_score DESC;",
    explanation:"Multiple aggregate functions in a single GROUP BY give a comprehensive per-student summary.", relatedQuestions:[22,161], xpReward:25
  },
  {
    id: 161, title: "CASE Pivot: Score by Subject per Student", slug: "case-pivot-scores",
    difficulty: "Medium", category: "CASE Expressions", tags: ["CASE","Pivot","GROUP BY"], companies: [],
    problemStatement: "Pivot the scores table: show each student's Math, Science, and English scores in separate columns.",
    tableStructure: [
      { tableName:"scores", columns:[{name:"score_id",type:"INTEGER"},{name:"student",type:"TEXT"},{name:"subject",type:"TEXT"},{name:"score",type:"INTEGER"}], createSQL:SCORES.c, insertSQL:SCORES.i }
    ],
    sampleData:{}, expectedOutput:[{student:"Aarav",math:92,science:88,english:80},{student:"Priya",math:85,science:95,english:92}],
    hint1:"MAX(CASE WHEN subject='Math' THEN score END) per student.", hint2:"GROUP BY student.", hint3:"SELECT student, MAX(CASE WHEN subject='Math' THEN score END) AS math, ...",
    solution:"SELECT student, MAX(CASE WHEN subject='Math' THEN score END) AS math, MAX(CASE WHEN subject='Science' THEN score END) AS science, MAX(CASE WHEN subject='English' THEN score END) AS english FROM scores GROUP BY student ORDER BY student;",
    explanation:"CASE+MAX pivots rows to columns. MAX picks the one score (since only 1 per student+subject). GROUP BY student collapses to one row per student.", relatedQuestions:[122,210], xpReward:30
  },
  {
    id: 162, title: "Monthly Order Count Trend", slug: "monthly-order-trend",
    difficulty: "Medium", category: "Date Functions", tags: ["SUBSTR","GROUP BY","Date"], companies: [],
    problemStatement: "Count orders placed each month in 2024, including only Delivered and Pending orders.",
    tableStructure: [
      { tableName:"orders", columns:[{name:"order_id",type:"INTEGER"},{name:"order_date",type:"TEXT"},{name:"status",type:"TEXT"}], createSQL:STORE.oc, insertSQL:STORE.oi }
    ],
    sampleData:{}, expectedOutput:[{month:"2024-01",order_count:3},{month:"2024-02",order_count:4},{month:"2024-03",order_count:3}],
    hint1:"SUBSTR(order_date, 1, 7) extracts YYYY-MM.", hint2:"Filter status NOT 'Cancelled'.", hint3:"WHERE status IN ('Delivered','Pending') GROUP BY SUBSTR(order_date,1,7)",
    solution:"SELECT SUBSTR(order_date,1,7) AS month, COUNT(*) AS order_count FROM orders WHERE status IN ('Delivered','Pending') GROUP BY SUBSTR(order_date,1,7) ORDER BY month;",
    explanation:"SUBSTR extracts year-month. Combining with GROUP BY creates monthly aggregation. Filter excludes cancelled orders.", relatedQuestions:[119,163], xpReward:25
  },
  {
    id: 163, title: "Rank Students by Average Score", slug: "rank-students-avg",
    difficulty: "Medium", category: "CTEs", tags: ["CTE","AVG","Ranking"], companies: [],
    problemStatement: "Rank students by their average score across all subjects.",
    tableStructure: [
      { tableName:"scores", columns:[{name:"score_id",type:"INTEGER"},{name:"student",type:"TEXT"},{name:"score",type:"INTEGER"}], createSQL:SCORES.c, insertSQL:SCORES.i }
    ],
    sampleData:{}, expectedOutput:[{student:"Sneha",avg_score:92,rank:1},{student:"Priya",avg_score:90.7,rank:2},{student:"Aarav",avg_score:86.7,rank:3}],
    hint1:"CTE computes avg per student.", hint2:"ROW_NUMBER or RANK on avg_score DESC.", hint3:"WITH avgs AS (...) SELECT *, RANK() OVER (ORDER BY avg_score DESC) FROM avgs",
    solution:"WITH avgs AS (\n  SELECT student, ROUND(AVG(score),1) AS avg_score FROM scores GROUP BY student\n)\nSELECT student, avg_score, RANK() OVER (ORDER BY avg_score DESC) AS rank FROM avgs ORDER BY rank;",
    explanation:"CTE computes averages first. RANK() on the CTE ranks students. Two-step makes query clean and readable.", relatedQuestions:[160,164], xpReward:30
  },
  {
    id: 164, title: "STRING_AGG Simulation: List Products per Customer", slug: "list-products-per-customer",
    difficulty: "Medium", category: "Advanced Aggregation", tags: ["GROUP BY","Aggregation","String"], companies: [],
    problemStatement: "Show each customer's list of products ordered (count distinct products per customer).",
    tableStructure: [
      { tableName:"orders", columns:[{name:"order_id",type:"INTEGER"},{name:"customer_id",type:"INTEGER"},{name:"product",type:"TEXT"}], createSQL:STORE.oc, insertSQL:STORE.oi }
    ],
    sampleData:{}, expectedOutput:[{customer_id:101,products_ordered:3},{customer_id:102,products_ordered:2}],
    hint1:"COUNT(DISTINCT product) per customer.", hint2:"GROUP BY customer_id.", hint3:"SELECT customer_id, COUNT(DISTINCT product) AS products_ordered",
    solution:"SELECT customer_id, COUNT(DISTINCT product) AS products_ordered FROM orders GROUP BY customer_id ORDER BY products_ordered DESC;",
    explanation:"COUNT(DISTINCT product) counts unique products. This shows product variety per customer.", relatedQuestions:[158,165], xpReward:20
  },
  {
    id: 165, title: "Employees with Same Salary", slug: "same-salary-employees",
    difficulty: "Medium", category: "Subqueries", tags: ["Subquery","Self-reference","IN"], companies: [],
    problemStatement: "Find pairs of employees who have exactly the same salary.",
    tableStructure: [
      { tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL:HR.ec, insertSQL:HR.ei }
    ],
    sampleData:{}, expectedOutput:[{emp_name:"Alice Johnson",salary:85000},{emp_name:"Bob Smith",salary:62000}],
    hint1:"Find salaries that appear more than once.", hint2:"Use GROUP BY salary HAVING COUNT > 1.", hint3:"WHERE salary IN (SELECT salary FROM employees GROUP BY salary HAVING COUNT(*) > 1)",
    solution:"SELECT emp_name, salary FROM employees WHERE salary IN (SELECT salary FROM employees GROUP BY salary HAVING COUNT(*) > 1) ORDER BY salary;",
    explanation:"Subquery finds duplicate salaries. Outer query gets all employees with those salaries.", relatedQuestions:[219,166], xpReward:25
  },
  {
    id: 166, title: "Department with Most Budget per Employee", slug: "budget-per-employee",
    difficulty: "Medium", category: "JOINs", tags: ["JOIN","Division","GROUP BY"], companies: [],
    problemStatement: "Calculate budget per employee for each department (budget ÷ headcount). Show departments with the best (highest) budget per employee.",
    tableStructure: [
      { tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"dept_id",type:"INTEGER"}], createSQL:HR.ec, insertSQL:HR.ei },
      { tableName:"departments", columns:[{name:"dept_id",type:"INTEGER"},{name:"dept_name",type:"TEXT"},{name:"budget",type:"REAL"}], createSQL:HR.dc, insertSQL:HR.di }
    ],
    sampleData:{}, expectedOutput:[{dept_name:"Finance",budget:300000,headcount:2,budget_per_head:150000},{dept_name:"HR",budget:150000,headcount:2,budget_per_head:75000}],
    hint1:"JOIN employees and departments, GROUP BY dept.", hint2:"Divide d.budget by COUNT(*) for ratio.", hint3:"SELECT d.dept_name, d.budget, COUNT(*), d.budget/COUNT(*) AS budget_per_head",
    solution:"SELECT d.dept_name, d.budget, COUNT(e.emp_id) AS headcount, ROUND(d.budget / COUNT(e.emp_id), 0) AS budget_per_head FROM departments d JOIN employees e ON d.dept_id = e.dept_id GROUP BY d.dept_id, d.dept_name, d.budget ORDER BY budget_per_head DESC;",
    explanation:"JOIN + GROUP BY + arithmetic gives a meaningful ratio. Useful for resource allocation analysis.", relatedQuestions:[135,167], xpReward:30
  },
  {
    id: 167, title: "Find Orders with Multiple Items", slug: "orders-multiple-items",
    difficulty: "Medium", category: "Aggregation", tags: ["HAVING","COUNT","WHERE"], companies: [],
    problemStatement: "Find customers who placed more than 2 orders.",
    tableStructure: [
      { tableName:"orders", columns:[{name:"order_id",type:"INTEGER"},{name:"customer_id",type:"INTEGER"}], createSQL:STORE.oc, insertSQL:STORE.oi }
    ],
    sampleData:{}, expectedOutput:[{customer_id:101,order_count:3},{customer_id:104,order_count:2}],
    hint1:"COUNT(*) per customer.", hint2:"HAVING COUNT > 2.", hint3:"GROUP BY customer_id HAVING COUNT(*) > 2",
    solution:"SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id HAVING COUNT(*) >= 2 ORDER BY order_count DESC;",
    explanation:"HAVING filters groups. HAVING COUNT(*) >= 2 finds customers with 2+ orders.", relatedQuestions:[128,168], xpReward:20
  },
  {
    id: 168, title: "Subjects Where Student Beat Class Average", slug: "beat-class-average",
    difficulty: "Medium", category: "Subqueries", tags: ["Correlated Subquery","AVG"], companies: [],
    problemStatement: "Find (student, subject) combinations where the student scored above the class average for that subject.",
    tableStructure: [
      { tableName:"scores", columns:[{name:"score_id",type:"INTEGER"},{name:"student",type:"TEXT"},{name:"subject",type:"TEXT"},{name:"score",type:"INTEGER"}], createSQL:SCORES.c, insertSQL:SCORES.i }
    ],
    sampleData:{}, expectedOutput:[{student:"Aarav",subject:"Math",score:92},{student:"Sneha",subject:"Math",score:98}],
    hint1:"Correlated subquery computes subject avg.", hint2:"Compare each score to its subject's average.", hint3:"WHERE score > (SELECT AVG(s2.score) FROM scores s2 WHERE s2.subject = s1.subject)",
    solution:"SELECT s1.student, s1.subject, s1.score FROM scores s1 WHERE s1.score > (SELECT AVG(s2.score) FROM scores s2 WHERE s2.subject = s1.subject) ORDER BY s1.subject, s1.score DESC;",
    explanation:"Correlated subquery re-executes per row, computing the average only for that subject. Each row compared to its subject's mean.", relatedQuestions:[106,153], xpReward:30
  },
  {
    id: 169, title: "Order Value Distribution Buckets", slug: "order-value-distribution",
    difficulty: "Medium", category: "CASE Expressions", tags: ["CASE","COUNT","Distribution"], companies: [],
    problemStatement: "Count how many orders fall into each value bucket: Under 5k, 5k-20k, Over 20k.",
    tableStructure: [
      { tableName:"orders", columns:[{name:"order_id",type:"INTEGER"},{name:"amount",type:"REAL"}], createSQL:STORE.oc, insertSQL:STORE.oi }
    ],
    sampleData:{}, expectedOutput:[{bucket:"Under 5k",count:3},{bucket:"5k-20k",count:4},{bucket:"Over 20k",count:3}],
    hint1:"Use CASE to label each order.", hint2:"Then GROUP BY label.", hint3:"SELECT CASE ... END AS bucket, COUNT(*) FROM orders GROUP BY bucket",
    solution:"SELECT CASE WHEN amount < 5000 THEN 'Under 5k' WHEN amount <= 20000 THEN '5k-20k' ELSE 'Over 20k' END AS bucket, COUNT(*) AS count FROM orders GROUP BY bucket ORDER BY MIN(amount);",
    explanation:"CASE in GROUP BY groups by derived labels. ORDER BY MIN(amount) puts buckets in natural order.", relatedQuestions:[154,170], xpReward:25
  },
  {
    id: 170, title: "CTE with Multiple Steps: Top Departments", slug: "cte-top-departments",
    difficulty: "Medium", category: "CTEs", tags: ["CTE","Multiple Steps","Ranking"], companies: [],
    problemStatement: "Using CTEs, find departments where total salary exceeds 50% of the total company payroll.",
    tableStructure: [
      { tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"dept_id",type:"INTEGER"},{name:"salary",type:"REAL"}], createSQL:HR.ec, insertSQL:HR.ei },
      { tableName:"departments", columns:[{name:"dept_id",type:"INTEGER"},{name:"dept_name",type:"TEXT"}], createSQL:HR.dc, insertSQL:HR.di }
    ],
    sampleData:{}, expectedOutput:[{dept_name:"Engineering",dept_payroll:333000,pct_of_total:49.9}],
    hint1:"CTE 1: total company payroll. CTE 2: payroll per dept.", hint2:"Dept payroll / total * 100 = pct.", hint3:"HAVING dept_payroll * 100 / (SELECT total FROM company_total) > 50",
    solution:"WITH company_total AS (\n  SELECT SUM(salary) AS total FROM employees\n),\ndept_payroll AS (\n  SELECT e.dept_id, d.dept_name, SUM(e.salary) AS dept_payroll\n  FROM employees e JOIN departments d ON e.dept_id = d.dept_id\n  GROUP BY e.dept_id, d.dept_name\n)\nSELECT dp.dept_name, dp.dept_payroll, ROUND(dp.dept_payroll * 100.0 / ct.total, 1) AS pct_of_total\nFROM dept_payroll dp\nCROSS JOIN company_total ct\nWHERE dp.dept_payroll * 100.0 / ct.total > 40\nORDER BY pct_of_total DESC;",
    explanation:"Two CTEs: company total and dept totals. CROSS JOIN combines them (single-row CTE). Filter finds dominant departments.", relatedQuestions:[109,124], xpReward:35
  },
];
