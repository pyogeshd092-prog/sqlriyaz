import type { Question } from '../../types';

const EMP = {
  c: "CREATE TABLE employees (emp_id INTEGER PRIMARY KEY, emp_name TEXT, department TEXT, salary REAL, hire_date TEXT, city TEXT, age INTEGER);",
  i: "INSERT INTO employees VALUES (1,'Alice Johnson','Engineering',85000,'2020-01-15','Mumbai',30),(2,'Bob Smith','Marketing',62000,'2019-06-01','Delhi',35),(3,'Carol White','Engineering',92000,'2018-03-20','Bangalore',28),(4,'David Brown','HR',55000,'2021-09-10','Mumbai',40),(5,'Eva Green','Marketing',67000,'2020-11-05','Pune',32),(6,'Frank Lee','Engineering',78000,'2017-07-22','Delhi',45),(7,'Grace Kim','HR',58000,'2022-01-30','Mumbai',27),(8,'Henry Das','Finance',72000,'2016-05-14','Chennai',50),(9,'Isla Roy','Finance',69000,'2019-08-19','Kolkata',38),(10,'Jack Mehta','Marketing',61000,'2021-03-11','Pune',29);"
};
const SALES = {
  c: "CREATE TABLE sales (sale_id INTEGER PRIMARY KEY, salesperson TEXT, product TEXT, amount REAL, sale_date TEXT, region TEXT);",
  i: "INSERT INTO sales VALUES (1,'Alice','Laptop',45000,'2024-01-10','North'),(2,'Bob','Mouse',800,'2024-01-15','South'),(3,'Alice','Monitor',18000,'2024-02-01','North'),(4,'Carol','Laptop',45000,'2024-02-10','East'),(5,'Bob','Keyboard',1500,'2024-02-20','South'),(6,'Carol','Chair',8000,'2024-03-01','East'),(7,'Alice','Laptop',45000,'2024-04-05','North'),(8,'David','Headphones',7000,'2024-04-10','West'),(9,'Bob','Monitor',18000,'2024-04-15','South'),(10,'David','Laptop',45000,'2024-05-01','West');"
};

export const easy3Questions: Question[] = [
  {
    id: 61, title: "Count Employees per City", slug: "count-per-city",
    difficulty: "Easy", category: "Aggregation", tags: ["COUNT","GROUP BY"], companies: [],
    problemStatement: "Count how many employees are located in each city.",
    tableStructure: [{ tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"city",type:"TEXT"}], createSQL:EMP.c, insertSQL:EMP.i }],
    sampleData:{}, expectedOutput:[{city:"Mumbai",count:3},{city:"Delhi",count:2},{city:"Pune",count:2}],
    hint1:"GROUP BY city.", hint2:"COUNT(*) per city.", hint3:"SELECT city, COUNT(*) AS count FROM employees GROUP BY city",
    solution:"SELECT city, COUNT(*) AS count FROM employees GROUP BY city ORDER BY count DESC;",
    explanation:"GROUP BY city creates one row per unique city; COUNT(*) counts employees in each.", relatedQuestions:[6,10], xpReward:10
  },
  {
    id: 62, title: "Select Employees Without Age Filter", slug: "select-no-age-filter",
    difficulty: "Easy", category: "SQL Basics", tags: ["SELECT","All Columns"], companies: [],
    problemStatement: "Retrieve only the emp_name and city for all employees, sorted by city.",
    tableStructure: [{ tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"city",type:"TEXT"}], createSQL:EMP.c, insertSQL:EMP.i }],
    sampleData:{}, expectedOutput:[{emp_name:"Carol White",city:"Bangalore"},{emp_name:"Henry Das",city:"Chennai"}],
    hint1:"List only the columns you need.", hint2:"Add ORDER BY city.", hint3:"SELECT emp_name, city FROM employees ORDER BY city",
    solution:"SELECT emp_name, city FROM employees ORDER BY city;",
    explanation:"Selecting specific columns (projection) reduces data in result set.", relatedQuestions:[19,20], xpReward:10
  },
  {
    id: 63, title: "Employees with Salary NOT Between 60k-80k", slug: "salary-not-between",
    difficulty: "Easy", category: "SQL Basics", tags: ["NOT BETWEEN","WHERE"], companies: [],
    problemStatement: "Find employees whose salary is NOT between 60000 and 80000.",
    tableStructure: [{ tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL:EMP.c, insertSQL:EMP.i }],
    sampleData:{}, expectedOutput:[{emp_name:"Alice Johnson",salary:85000},{emp_name:"Carol White",salary:92000},{emp_name:"David Brown",salary:55000}],
    hint1:"Use NOT BETWEEN.", hint2:"NOT BETWEEN excludes the range including boundaries.", hint3:"WHERE salary NOT BETWEEN 60000 AND 80000",
    solution:"SELECT emp_name, salary FROM employees WHERE salary NOT BETWEEN 60000 AND 80000 ORDER BY salary DESC;",
    explanation:"NOT BETWEEN excludes values in the range (inclusive of boundaries). Opposite of BETWEEN.", relatedQuestions:[14,3], xpReward:10
  },
  {
    id: 64, title: "Total Sales per Salesperson", slug: "total-sales-per-person",
    difficulty: "Easy", category: "Aggregation", tags: ["SUM","GROUP BY"], companies: [],
    problemStatement: "Calculate total sales amount for each salesperson.",
    tableStructure: [{ tableName:"sales", columns:[{name:"sale_id",type:"INTEGER"},{name:"salesperson",type:"TEXT"},{name:"amount",type:"REAL"}], createSQL:SALES.c, insertSQL:SALES.i }],
    sampleData:{}, expectedOutput:[{salesperson:"Alice",total:108000},{salesperson:"David",total:52000},{salesperson:"Carol",total:53000},{salesperson:"Bob",total:20300}],
    hint1:"GROUP BY salesperson.", hint2:"SUM(amount) totals sales.", hint3:"SELECT salesperson, SUM(amount) AS total FROM sales GROUP BY salesperson",
    solution:"SELECT salesperson, SUM(amount) AS total FROM sales GROUP BY salesperson ORDER BY total DESC;",
    explanation:"SUM with GROUP BY gives total revenue per salesperson.", relatedQuestions:[65,26], xpReward:15
  },
  {
    id: 65, title: "Sales from the North Region", slug: "north-region-sales",
    difficulty: "Easy", category: "SQL Basics", tags: ["WHERE","Filter"], companies: [],
    problemStatement: "List all sales from the North region.",
    tableStructure: [{ tableName:"sales", columns:[{name:"sale_id",type:"INTEGER"},{name:"salesperson",type:"TEXT"},{name:"product",type:"TEXT"},{name:"amount",type:"REAL"},{name:"region",type:"TEXT"}], createSQL:SALES.c, insertSQL:SALES.i }],
    sampleData:{}, expectedOutput:[{salesperson:"Alice",product:"Laptop",amount:45000,region:"North"},{salesperson:"Alice",product:"Monitor",amount:18000,region:"North"}],
    hint1:"WHERE region = 'North'.", hint2:"Region is a string column.", hint3:"SELECT * FROM sales WHERE region = 'North'",
    solution:"SELECT * FROM sales WHERE region = 'North' ORDER BY amount DESC;",
    explanation:"Simple string filter on the region column.", relatedQuestions:[64,66], xpReward:10
  },
  {
    id: 66, title: "Count Sales per Product", slug: "count-sales-per-product",
    difficulty: "Easy", category: "Aggregation", tags: ["COUNT","GROUP BY"], companies: [],
    problemStatement: "Count how many times each product has been sold.",
    tableStructure: [{ tableName:"sales", columns:[{name:"sale_id",type:"INTEGER"},{name:"product",type:"TEXT"}], createSQL:SALES.c, insertSQL:SALES.i }],
    sampleData:{}, expectedOutput:[{product:"Laptop",times_sold:4},{product:"Monitor",times_sold:2},{product:"Mouse",times_sold:1}],
    hint1:"GROUP BY product.", hint2:"COUNT(*) per product.", hint3:"SELECT product, COUNT(*) AS times_sold FROM sales GROUP BY product",
    solution:"SELECT product, COUNT(*) AS times_sold FROM sales GROUP BY product ORDER BY times_sold DESC;",
    explanation:"Each row in sales is one transaction. COUNT(*) per product = times sold.", relatedQuestions:[64,65], xpReward:15
  },
  {
    id: 67, title: "Employees Hired Before 2020", slug: "hired-before-2020",
    difficulty: "Easy", category: "SQL Basics", tags: ["WHERE","Date"], companies: [],
    problemStatement: "Find employees who were hired before 2020.",
    tableStructure: [{ tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"hire_date",type:"TEXT"}], createSQL:EMP.c, insertSQL:EMP.i }],
    sampleData:{}, expectedOutput:[{emp_name:"Bob Smith",hire_date:"2019-06-01"},{emp_name:"Carol White",hire_date:"2018-03-20"},{emp_name:"Frank Lee",hire_date:"2017-07-22"},{emp_name:"Henry Das",hire_date:"2016-05-14"},{emp_name:"Isla Roy",hire_date:"2019-08-19"}],
    hint1:"Use < '2020-01-01' for dates.", hint2:"Dates as strings compare lexicographically in ISO format.", hint3:"WHERE hire_date < '2020-01-01'",
    solution:"SELECT emp_name, hire_date FROM employees WHERE hire_date < '2020-01-01' ORDER BY hire_date;",
    explanation:"ISO date strings sort correctly with standard comparison operators.", relatedQuestions:[13,118], xpReward:10
  },
  {
    id: 68, title: "Find Employees NOT in Finance or HR", slug: "not-finance-hr",
    difficulty: "Easy", category: "SQL Basics", tags: ["NOT IN","WHERE"], companies: [],
    problemStatement: "List employees who are NOT in the Finance or HR departments.",
    tableStructure: [{ tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"department",type:"TEXT"}], createSQL:EMP.c, insertSQL:EMP.i }],
    sampleData:{}, expectedOutput:[{emp_name:"Alice Johnson",department:"Engineering"},{emp_name:"Bob Smith",department:"Marketing"}],
    hint1:"Use NOT IN for exclusion.", hint2:"NOT IN ('Finance','HR').", hint3:"WHERE department NOT IN ('Finance','HR')",
    solution:"SELECT emp_name, department FROM employees WHERE department NOT IN ('Finance','HR') ORDER BY department;",
    explanation:"NOT IN excludes all listed values. Cleaner than multiple != conditions.", relatedQuestions:[12,39], xpReward:10
  },
  {
    id: 69, title: "Salary Multiplied by 12 (Annual)", slug: "annual-salary",
    difficulty: "Easy", category: "SQL Basics", tags: ["Calculation","Arithmetic"], companies: [],
    problemStatement: "Show each employee's monthly salary and calculated annual salary (salary × 12).",
    tableStructure: [{ tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL:EMP.c, insertSQL:EMP.i }],
    sampleData:{}, expectedOutput:[{emp_name:"Alice Johnson",monthly:85000,annual:1020000}],
    hint1:"Multiply salary by 12 in SELECT.", hint2:"Use AS to name the column.", hint3:"SELECT emp_name, salary AS monthly, salary * 12 AS annual",
    solution:"SELECT emp_name, salary AS monthly, salary * 12 AS annual FROM employees ORDER BY annual DESC;",
    explanation:"Arithmetic expressions in SELECT compute derived values. salary * 12 gives the annual compensation.", relatedQuestions:[38,26], xpReward:10
  },
  {
    id: 70, title: "LIMIT 5 with Salary Sort", slug: "limit-5-salary",
    difficulty: "Easy", category: "SQL Basics", tags: ["LIMIT","ORDER BY"], companies: [],
    problemStatement: "Show the 5 lowest-paid employees.",
    tableStructure: [{ tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL:EMP.c, insertSQL:EMP.i }],
    sampleData:{}, expectedOutput:[{emp_name:"David Brown",salary:55000},{emp_name:"Grace Kim",salary:58000},{emp_name:"Frank Lee",salary:78000}],
    hint1:"Sort ASC (ascending).", hint2:"LIMIT 5 gives 5 rows.", hint3:"ORDER BY salary ASC LIMIT 5",
    solution:"SELECT emp_name, salary FROM employees ORDER BY salary ASC LIMIT 5;",
    explanation:"ORDER BY salary ASC + LIMIT 5 returns 5 cheapest salaries (ascending = smallest first).", relatedQuestions:[5,4], xpReward:10
  },
  {
    id: 71, title: "Count Products Sold by Salesperson", slug: "count-products-by-person",
    difficulty: "Easy", category: "Aggregation", tags: ["COUNT","DISTINCT","GROUP BY"], companies: [],
    problemStatement: "Count how many unique products each salesperson has sold.",
    tableStructure: [{ tableName:"sales", columns:[{name:"sale_id",type:"INTEGER"},{name:"salesperson",type:"TEXT"},{name:"product",type:"TEXT"}], createSQL:SALES.c, insertSQL:SALES.i }],
    sampleData:{}, expectedOutput:[{salesperson:"Alice",unique_products:3},{salesperson:"Bob",unique_products:3},{salesperson:"Carol",unique_products:2},{salesperson:"David",unique_products:2}],
    hint1:"COUNT(DISTINCT product) per salesperson.", hint2:"GROUP BY salesperson.", hint3:"SELECT salesperson, COUNT(DISTINCT product) AS unique_products",
    solution:"SELECT salesperson, COUNT(DISTINCT product) AS unique_products FROM sales GROUP BY salesperson ORDER BY unique_products DESC;",
    explanation:"COUNT(DISTINCT column) counts unique values within each group, ignoring duplicates.", relatedQuestions:[66,64], xpReward:15
  },
  {
    id: 72, title: "Highest Sale Amount per Region", slug: "max-sale-per-region",
    difficulty: "Easy", category: "Aggregation", tags: ["MAX","GROUP BY"], companies: [],
    problemStatement: "Find the largest single sale amount in each region.",
    tableStructure: [{ tableName:"sales", columns:[{name:"sale_id",type:"INTEGER"},{name:"region",type:"TEXT"},{name:"amount",type:"REAL"}], createSQL:SALES.c, insertSQL:SALES.i }],
    sampleData:{}, expectedOutput:[{region:"East",max_amount:45000},{region:"North",max_amount:45000},{region:"South",max_amount:18000},{region:"West",max_amount:45000}],
    hint1:"GROUP BY region.", hint2:"MAX(amount) per region.", hint3:"SELECT region, MAX(amount) AS max_amount",
    solution:"SELECT region, MAX(amount) AS max_amount FROM sales GROUP BY region ORDER BY region;",
    explanation:"MAX() finds the single largest value within each group.", relatedQuestions:[8,72], xpReward:15
  },
  {
    id: 73, title: "Find Employees with 'Lee' in Name", slug: "name-contains-lee",
    difficulty: "Easy", category: "SQL Basics", tags: ["LIKE","Pattern"], companies: [],
    problemStatement: "Find all employees whose name contains 'Lee'.",
    tableStructure: [{ tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"}], createSQL:EMP.c, insertSQL:EMP.i }],
    sampleData:{}, expectedOutput:[{emp_id:6,emp_name:"Frank Lee"}],
    hint1:"Use LIKE '%Lee%'.", hint2:"% both before and after means contains.", hint3:"WHERE emp_name LIKE '%Lee%'",
    solution:"SELECT * FROM employees WHERE emp_name LIKE '%Lee%';",
    explanation:"'%Lee%' matches any string with 'Lee' anywhere — beginning, middle, or end.", relatedQuestions:[16,58], xpReward:10
  },
  {
    id: 74, title: "Sales WHERE Amount > 10000 in 2024", slug: "sales-over-10k-2024",
    difficulty: "Easy", category: "SQL Basics", tags: ["WHERE","AND","Date"], companies: [],
    problemStatement: "Find sales where the amount exceeds 10000 AND occurred in 2024.",
    tableStructure: [{ tableName:"sales", columns:[{name:"sale_id",type:"INTEGER"},{name:"salesperson",type:"TEXT"},{name:"amount",type:"REAL"},{name:"sale_date",type:"TEXT"}], createSQL:SALES.c, insertSQL:SALES.i }],
    sampleData:{}, expectedOutput:[{salesperson:"Alice",amount:45000,sale_date:"2024-01-10"},{salesperson:"Alice",amount:18000,sale_date:"2024-02-01"}],
    hint1:"Combine amount and date conditions with AND.", hint2:"Use LIKE '2024%' for date filter.", hint3:"WHERE amount > 10000 AND sale_date LIKE '2024%'",
    solution:"SELECT salesperson, product, amount, sale_date FROM sales WHERE amount > 10000 AND sale_date LIKE '2024%' ORDER BY amount DESC;",
    explanation:"AND combines two conditions: both must be true. Amount > 10000 AND date in 2024.", relatedQuestions:[34,65], xpReward:10
  },
  {
    id: 75, title: "Rename Table with Alias", slug: "table-alias",
    difficulty: "Easy", category: "SQL Basics", tags: ["AS","Alias","Table Alias"], companies: [],
    problemStatement: "Using a table alias, select employee name and salary showing only those in Engineering.",
    tableStructure: [{ tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"department",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL:EMP.c, insertSQL:EMP.i }],
    sampleData:{}, expectedOutput:[{emp_name:"Alice Johnson",salary:85000},{emp_name:"Carol White",salary:92000},{emp_name:"Frank Lee",salary:78000}],
    hint1:"Use e as alias for employees.", hint2:"Reference columns as e.emp_name.", hint3:"FROM employees e WHERE e.department = 'Engineering'",
    solution:"SELECT e.emp_name, e.salary FROM employees e WHERE e.department = 'Engineering' ORDER BY e.salary DESC;",
    explanation:"Table aliases (e) are shorthand and essential for self-joins. Here FROM employees e sets 'e' as alias.", relatedQuestions:[2,20], xpReward:10
  },
  {
    id: 76, title: "Which Salespersons Sold Laptops", slug: "who-sold-laptops",
    difficulty: "Easy", category: "SQL Basics", tags: ["WHERE","DISTINCT"], companies: [],
    problemStatement: "Find the distinct names of salespersons who have sold at least one Laptop.",
    tableStructure: [{ tableName:"sales", columns:[{name:"sale_id",type:"INTEGER"},{name:"salesperson",type:"TEXT"},{name:"product",type:"TEXT"}], createSQL:SALES.c, insertSQL:SALES.i }],
    sampleData:{}, expectedOutput:[{salesperson:"Alice"},{salesperson:"Carol"},{salesperson:"David"}],
    hint1:"Filter WHERE product = 'Laptop'.", hint2:"DISTINCT removes duplicate names.", hint3:"SELECT DISTINCT salesperson WHERE product = 'Laptop'",
    solution:"SELECT DISTINCT salesperson FROM sales WHERE product = 'Laptop' ORDER BY salesperson;",
    explanation:"DISTINCT with a filter gives unique salespeople for that specific product.", relatedQuestions:[10,66], xpReward:10
  },
  {
    id: 77, title: "Conditional Expression: Pass or Fail", slug: "pass-fail-salary",
    difficulty: "Easy", category: "CASE Expressions", tags: ["CASE","Conditional"], companies: [],
    problemStatement: "Label each employee as 'Above Average' or 'Below Average' based on whether their salary exceeds 70000.",
    tableStructure: [{ tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL:EMP.c, insertSQL:EMP.i }],
    sampleData:{}, expectedOutput:[{emp_name:"Alice Johnson",salary:85000,label:"Above Average"},{emp_name:"Bob Smith",salary:62000,label:"Below Average"}],
    hint1:"Use CASE WHEN ... THEN ... ELSE ... END.", hint2:"70000 is the threshold.", hint3:"CASE WHEN salary > 70000 THEN 'Above Average' ELSE 'Below Average' END",
    solution:"SELECT emp_name, salary, CASE WHEN salary > 70000 THEN 'Above Average' ELSE 'Below Average' END AS label FROM employees ORDER BY salary DESC;",
    explanation:"CASE creates a label per row based on condition. No GROUP BY needed since it applies row-by-row.", relatedQuestions:[120,15], xpReward:15
  },
  {
    id: 78, title: "Sales SUM with WHERE Filter", slug: "sales-sum-filtered",
    difficulty: "Easy", category: "Aggregation", tags: ["SUM","WHERE"], companies: [],
    problemStatement: "Calculate total sales revenue from the North and East regions only.",
    tableStructure: [{ tableName:"sales", columns:[{name:"sale_id",type:"INTEGER"},{name:"region",type:"TEXT"},{name:"amount",type:"REAL"}], createSQL:SALES.c, insertSQL:SALES.i }],
    sampleData:{}, expectedOutput:[{total_revenue:161000}],
    hint1:"Filter regions first with WHERE.", hint2:"Then SUM the filtered amounts.", hint3:"WHERE region IN ('North','East')",
    solution:"SELECT SUM(amount) AS total_revenue FROM sales WHERE region IN ('North','East');",
    explanation:"WHERE filters rows before SUM aggregates them. SUM only adds amounts from North and East.", relatedQuestions:[64,15], xpReward:15
  },
  {
    id: 79, title: "COALESCE for Default Value", slug: "coalesce-default",
    difficulty: "Easy", category: "NULL Handling", tags: ["COALESCE","NULL"], companies: [],
    problemStatement: "Show each employee's city, but replace NULL cities with 'Unknown'.",
    tableStructure: [{ tableName:"employees", columns:[{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"city",type:"TEXT"}], createSQL:"CREATE TABLE employees (emp_id INTEGER PRIMARY KEY, emp_name TEXT, city TEXT); INSERT INTO employees VALUES (1,'Alice','Mumbai'),(2,'Bob',NULL),(3,'Carol','Delhi'),(4,'David',NULL);", insertSQL:"" }],
    sampleData:{}, expectedOutput:[{emp_name:"Alice",city:"Mumbai"},{emp_name:"Bob",city:"Unknown"},{emp_name:"Carol",city:"Delhi"},{emp_name:"David",city:"Unknown"}],
    hint1:"COALESCE returns first non-NULL.", hint2:"COALESCE(city,'Unknown') substitutes NULL with 'Unknown'.", hint3:"SELECT emp_name, COALESCE(city,'Unknown') AS city",
    solution:"SELECT emp_name, COALESCE(city, 'Unknown') AS city FROM employees;",
    explanation:"COALESCE(a, b) returns a if not NULL, otherwise b. A clean way to provide defaults for missing data.", relatedQuestions:[129,48], xpReward:15
  },
  {
    id: 80, title: "ORDER BY Multiple Columns", slug: "order-by-multiple",
    difficulty: "Easy", category: "SQL Basics", tags: ["ORDER BY","Multiple Sort"], companies: [],
    problemStatement: "Sort sales by region (A-Z), then by amount (highest first) within each region.",
    tableStructure: [{ tableName:"sales", columns:[{name:"sale_id",type:"INTEGER"},{name:"salesperson",type:"TEXT"},{name:"region",type:"TEXT"},{name:"amount",type:"REAL"}], createSQL:SALES.c, insertSQL:SALES.i }],
    sampleData:{}, expectedOutput:[{salesperson:"Carol",region:"East",amount:45000},{salesperson:"Carol",region:"East",amount:8000},{salesperson:"Alice",region:"North",amount:45000}],
    hint1:"ORDER BY region ASC, amount DESC.", hint2:"First criterion is primary sort.", hint3:"ORDER BY region ASC, amount DESC",
    solution:"SELECT salesperson, region, amount FROM sales ORDER BY region ASC, amount DESC;",
    explanation:"Multiple ORDER BY columns: primary sort by region alphabetically, secondary sort by amount descending within each region.", relatedQuestions:[31,4], xpReward:10
  },
];
