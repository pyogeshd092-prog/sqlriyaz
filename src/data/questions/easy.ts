import type { Question } from '../../types';

const EMP = {
  createSQL: "CREATE TABLE employees (emp_id INTEGER PRIMARY KEY, emp_name TEXT, department TEXT, salary REAL, hire_date TEXT, city TEXT, age INTEGER);",
  insertSQL: "INSERT INTO employees VALUES (1,'Alice Johnson','Engineering',85000,'2020-01-15','Mumbai',30),(2,'Bob Smith','Marketing',62000,'2019-06-01','Delhi',35),(3,'Carol White','Engineering',92000,'2018-03-20','Bangalore',28),(4,'David Brown','HR',55000,'2021-09-10','Mumbai',40),(5,'Eva Green','Marketing',67000,'2020-11-05','Pune',32),(6,'Frank Lee','Engineering',78000,'2017-07-22','Delhi',45),(7,'Grace Kim','HR',58000,'2022-01-30','Mumbai',27),(8,'Henry Das','Finance',72000,'2016-05-14','Chennai',50),(9,'Isla Roy','Finance',69000,'2019-08-19','Kolkata',38),(10,'Jack Mehta','Marketing',61000,'2021-03-11','Pune',29);"
};

const DEPT = {
  createSQL: "CREATE TABLE departments (dept_id INTEGER PRIMARY KEY, dept_name TEXT, budget REAL, location TEXT);",
  insertSQL: "INSERT INTO departments VALUES (1,'Engineering',500000,'Bangalore'),(2,'Marketing',200000,'Mumbai'),(3,'HR',150000,'Delhi'),(4,'Finance',300000,'Chennai'),(5,'Sales',250000,'Pune');"
};

const STUDENTS = {
  createSQL: "CREATE TABLE students (student_id INTEGER PRIMARY KEY, student_name TEXT, subject TEXT, score INTEGER, grade TEXT, exam_date TEXT);",
  insertSQL: "INSERT INTO students VALUES (1,'Aarav Shah','Math',92,'A','2024-03-15'),(2,'Priya Patel','Science',85,'B','2024-03-15'),(3,'Rahul Verma','Math',78,'C','2024-03-15'),(4,'Sneha Iyer','English',95,'A','2024-03-15'),(5,'Amit Kumar','Science',61,'D','2024-03-15'),(6,'Riya Singh','Math',88,'B','2024-03-15'),(7,'Vikram Nair','English',72,'C','2024-03-15'),(8,'Meera Joshi','Science',90,'A','2024-03-15'),(9,'Arjun Reddy','Math',55,'F','2024-03-15'),(10,'Kavita Rao','English',83,'B','2024-03-15');"
};

const PRODUCTS = {
  createSQL: "CREATE TABLE products (product_id INTEGER PRIMARY KEY, product_name TEXT, category TEXT, price REAL, stock INTEGER);",
  insertSQL: "INSERT INTO products VALUES (1,'Laptop','Electronics',45000,50),(2,'Mouse','Electronics',800,200),(3,'Keyboard','Electronics',1500,150),(4,'Desk','Furniture',12000,30),(5,'Chair','Furniture',8000,60),(6,'Notebook','Stationery',50,500),(7,'Pen','Stationery',10,1000),(8,'Monitor','Electronics',18000,40),(9,'Headphones','Electronics',3500,80),(10,'Webcam','Electronics',2500,70);"
};

export const easyQuestions: Question[] = [
  {
    id: 1, title: "Select All Employee Records", slug: "select-all-employees",
    difficulty: "Easy", category: "SQL Basics", tags: ["SELECT", "Basic"], companies: [],
    problemStatement: "Retrieve all records from the employees table.",
    tableStructure: [{ tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"department",type:"TEXT"},{name:"salary",type:"REAL"},{name:"hire_date",type:"TEXT"},{name:"city",type:"TEXT"},{name:"age",type:"INTEGER"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }],
    sampleData: {}, expectedOutput: [{emp_id:1,emp_name:"Alice Johnson",department:"Engineering",salary:85000,hire_date:"2020-01-15",city:"Mumbai",age:30}],
    hint1: "Use SELECT to retrieve data.", hint2: "The * wildcard selects all columns.", hint3: "SELECT * FROM table_name;",
    solution: "SELECT * FROM employees;", explanation: "SELECT * retrieves every column and row from the table.", relatedQuestions: [2,3], xpReward: 10
  },
  {
    id: 2, title: "Filter Employees by Department", slug: "filter-by-department",
    difficulty: "Easy", category: "SQL Basics", tags: ["SELECT", "WHERE"], companies: [],
    problemStatement: "Find all employees who work in the 'Engineering' department.",
    tableStructure: [{ tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"department",type:"TEXT"},{name:"salary",type:"REAL"},{name:"hire_date",type:"TEXT"},{name:"city",type:"TEXT"},{name:"age",type:"INTEGER"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }],
    sampleData: {}, expectedOutput: [{emp_id:1,emp_name:"Alice Johnson",department:"Engineering",salary:85000},{emp_id:3,emp_name:"Carol White",department:"Engineering",salary:92000},{emp_id:6,emp_name:"Frank Lee",department:"Engineering",salary:78000}],
    hint1: "Use WHERE to filter rows.", hint2: "Use = for exact match.", hint3: "WHERE department = 'Engineering'",
    solution: "SELECT * FROM employees WHERE department = 'Engineering';", explanation: "WHERE clause filters rows based on the condition. String values use single quotes.", relatedQuestions: [1,3], xpReward: 10
  },
  {
    id: 3, title: "Employees Earning Above 70000", slug: "salary-above-70000",
    difficulty: "Easy", category: "SQL Basics", tags: ["WHERE", "Comparison"], companies: [],
    problemStatement: "List all employees whose salary is greater than 70000.",
    tableStructure: [{ tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"department",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }],
    sampleData: {}, expectedOutput: [{emp_id:1,emp_name:"Alice Johnson",salary:85000},{emp_id:3,emp_name:"Carol White",salary:92000},{emp_id:6,emp_name:"Frank Lee",salary:78000},{emp_id:8,emp_name:"Henry Das",salary:72000}],
    hint1: "Use WHERE with a numeric comparison.", hint2: "Use > operator for greater than.", hint3: "WHERE salary > 70000",
    solution: "SELECT * FROM employees WHERE salary > 70000;", explanation: "The > operator filters rows where salary exceeds 70000.", relatedQuestions: [2,4], xpReward: 10
  },
  {
    id: 4, title: "Sort Employees by Salary Descending", slug: "sort-salary-desc",
    difficulty: "Easy", category: "SQL Basics", tags: ["ORDER BY", "Sorting"], companies: [],
    problemStatement: "Retrieve all employees sorted by salary from highest to lowest.",
    tableStructure: [{ tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }],
    sampleData: {}, expectedOutput: [{emp_name:"Carol White",salary:92000},{emp_name:"Alice Johnson",salary:85000},{emp_name:"Frank Lee",salary:78000}],
    hint1: "Use ORDER BY to sort results.", hint2: "Add DESC for descending order.", hint3: "ORDER BY salary DESC",
    solution: "SELECT * FROM employees ORDER BY salary DESC;", explanation: "ORDER BY salary DESC sorts from highest to lowest. Default is ASC (ascending).", relatedQuestions: [3,5], xpReward: 10
  },
  {
    id: 5, title: "Top 3 Highest Paid Employees", slug: "top-3-salary",
    difficulty: "Easy", category: "SQL Basics", tags: ["LIMIT", "ORDER BY"], companies: [],
    problemStatement: "Find the top 3 highest-paid employees.",
    tableStructure: [{ tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }],
    sampleData: {}, expectedOutput: [{emp_name:"Carol White",salary:92000},{emp_name:"Alice Johnson",salary:85000},{emp_name:"Frank Lee",salary:78000}],
    hint1: "Sort by salary first.", hint2: "Use LIMIT to restrict rows.", hint3: "ORDER BY salary DESC LIMIT 3",
    solution: "SELECT * FROM employees ORDER BY salary DESC LIMIT 3;", explanation: "Combining ORDER BY with LIMIT retrieves the top N records.", relatedQuestions: [4,6], xpReward: 10
  },
  {
    id: 6, title: "Count Employees per Department", slug: "count-by-department",
    difficulty: "Easy", category: "Aggregation", tags: ["COUNT", "GROUP BY"], companies: [],
    problemStatement: "Count how many employees are in each department.",
    tableStructure: [{ tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"department",type:"TEXT"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }],
    sampleData: {}, expectedOutput: [{department:"Engineering",count:3},{department:"Finance",count:2},{department:"HR",count:2},{department:"Marketing",count:3}],
    hint1: "Use GROUP BY to group rows.", hint2: "Use COUNT(*) to count rows.", hint3: "GROUP BY department",
    solution: "SELECT department, COUNT(*) AS count FROM employees GROUP BY department ORDER BY department;", explanation: "GROUP BY groups rows sharing the same value. COUNT(*) counts rows in each group.", relatedQuestions: [7,8], xpReward: 15
  },
  {
    id: 7, title: "Average Salary by Department", slug: "avg-salary-by-dept",
    difficulty: "Easy", category: "Aggregation", tags: ["AVG", "GROUP BY"], companies: [],
    problemStatement: "Calculate the average salary for each department.",
    tableStructure: [{ tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"department",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }],
    sampleData: {}, expectedOutput: [{department:"Engineering",avg_salary:85000},{department:"Finance",avg_salary:70500},{department:"HR",avg_salary:56500},{department:"Marketing",avg_salary:63333}],
    hint1: "Use AVG() aggregate function.", hint2: "Group by department.", hint3: "SELECT department, AVG(salary)",
    solution: "SELECT department, ROUND(AVG(salary), 0) AS avg_salary FROM employees GROUP BY department ORDER BY avg_salary DESC;", explanation: "AVG() calculates the arithmetic mean. ROUND() removes decimals for cleaner output.", relatedQuestions: [6,8], xpReward: 15
  },
  {
    id: 8, title: "Maximum Salary in Each Department", slug: "max-salary-by-dept",
    difficulty: "Easy", category: "Aggregation", tags: ["MAX", "GROUP BY"], companies: [],
    problemStatement: "Find the highest salary in each department.",
    tableStructure: [{ tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"department",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }],
    sampleData: {}, expectedOutput: [{department:"Engineering",max_salary:92000},{department:"Finance",max_salary:72000},{department:"HR",max_salary:58000},{department:"Marketing",max_salary:67000}],
    hint1: "Use MAX() aggregate function.", hint2: "Combine with GROUP BY.", hint3: "SELECT department, MAX(salary)",
    solution: "SELECT department, MAX(salary) AS max_salary FROM employees GROUP BY department;", explanation: "MAX() returns the largest value within each group defined by GROUP BY.", relatedQuestions: [7,9], xpReward: 15
  },
  {
    id: 9, title: "Departments with Average Salary Above 65000", slug: "having-avg-salary",
    difficulty: "Easy", category: "Aggregation", tags: ["HAVING", "AVG", "GROUP BY"], companies: [],
    problemStatement: "Find departments where the average salary exceeds 65000.",
    tableStructure: [{ tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"department",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }],
    sampleData: {}, expectedOutput: [{department:"Engineering",avg_salary:85000},{department:"Finance",avg_salary:70500}],
    hint1: "Use HAVING to filter groups.", hint2: "HAVING filters after GROUP BY, WHERE filters before.", hint3: "HAVING AVG(salary) > 65000",
    solution: "SELECT department, AVG(salary) AS avg_salary FROM employees GROUP BY department HAVING AVG(salary) > 65000;", explanation: "HAVING filters groups after aggregation. You can't use WHERE with aggregate functions.", relatedQuestions: [7,8], xpReward: 15
  },
  {
    id: 10, title: "Unique Departments", slug: "distinct-departments",
    difficulty: "Easy", category: "SQL Basics", tags: ["DISTINCT"], companies: [],
    problemStatement: "List all unique departments in the company.",
    tableStructure: [{ tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"department",type:"TEXT"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }],
    sampleData: {}, expectedOutput: [{department:"Engineering"},{department:"Finance"},{department:"HR"},{department:"Marketing"}],
    hint1: "Use DISTINCT to remove duplicates.", hint2: "SELECT DISTINCT column_name", hint3: "SELECT DISTINCT department FROM employees",
    solution: "SELECT DISTINCT department FROM employees ORDER BY department;", explanation: "DISTINCT removes duplicate values from the result set.", relatedQuestions: [1,6], xpReward: 10
  },
  {
    id: 11, title: "Employees from Mumbai or Delhi", slug: "employees-mumbai-delhi",
    difficulty: "Easy", category: "SQL Basics", tags: ["WHERE", "IN", "OR"], companies: [],
    problemStatement: "Find all employees based in Mumbai or Delhi.",
    tableStructure: [{ tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"city",type:"TEXT"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }],
    sampleData: {}, expectedOutput: [{emp_id:1,emp_name:"Alice Johnson",city:"Mumbai"},{emp_id:2,emp_name:"Bob Smith",city:"Delhi"},{emp_id:4,emp_name:"David Brown",city:"Mumbai"},{emp_id:6,emp_name:"Frank Lee",city:"Delhi"},{emp_id:7,emp_name:"Grace Kim",city:"Mumbai"}],
    hint1: "Use IN operator for multiple values.", hint2: "IN ('Mumbai','Delhi') is cleaner than OR.", hint3: "WHERE city IN ('Mumbai', 'Delhi')",
    solution: "SELECT * FROM employees WHERE city IN ('Mumbai', 'Delhi');", explanation: "IN operator checks if a value matches any value in a list. It's equivalent to multiple OR conditions.", relatedQuestions: [2,12], xpReward: 10
  },
  {
    id: 12, title: "Employees NOT in Marketing", slug: "not-in-marketing",
    difficulty: "Easy", category: "SQL Basics", tags: ["WHERE", "NOT", "Negation"], companies: [],
    problemStatement: "List all employees who are NOT in the Marketing department.",
    tableStructure: [{ tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"department",type:"TEXT"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }],
    sampleData: {}, expectedOutput: [{emp_name:"Alice Johnson",department:"Engineering"},{emp_name:"Carol White",department:"Engineering"},{emp_name:"David Brown",department:"HR"}],
    hint1: "Use NOT or != to exclude.", hint2: "WHERE department != 'Marketing'", hint3: "Or use WHERE department NOT IN ('Marketing')",
    solution: "SELECT * FROM employees WHERE department != 'Marketing';", explanation: "!= (or <>) excludes rows matching the condition. NOT IN works for multiple exclusions.", relatedQuestions: [11,2], xpReward: 10
  },
  {
    id: 13, title: "Employees Hired in 2020", slug: "hired-in-2020",
    difficulty: "Easy", category: "SQL Basics", tags: ["WHERE", "LIKE", "Date"], companies: [],
    problemStatement: "Find all employees who were hired in the year 2020.",
    tableStructure: [{ tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"hire_date",type:"TEXT"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }],
    sampleData: {}, expectedOutput: [{emp_id:1,emp_name:"Alice Johnson",hire_date:"2020-01-15"},{emp_id:5,emp_name:"Eva Green",hire_date:"2020-11-05"}],
    hint1: "Use LIKE for pattern matching.", hint2: "Dates are stored as text: '2020-...'", hint3: "WHERE hire_date LIKE '2020%'",
    solution: "SELECT * FROM employees WHERE hire_date LIKE '2020%';", explanation: "LIKE with % wildcard matches any string starting with '2020'. Works for text-stored dates.", relatedQuestions: [14,1], xpReward: 10
  },
  {
    id: 14, title: "Salary Between 60000 and 80000", slug: "salary-between",
    difficulty: "Easy", category: "SQL Basics", tags: ["BETWEEN", "WHERE"], companies: [],
    problemStatement: "Find employees whose salary is between 60000 and 80000 (inclusive).",
    tableStructure: [{ tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }],
    sampleData: {}, expectedOutput: [{emp_name:"Bob Smith",salary:62000},{emp_name:"Eva Green",salary:67000},{emp_name:"Frank Lee",salary:78000},{emp_name:"Isla Roy",salary:69000},{emp_name:"Jack Mehta",salary:61000}],
    hint1: "Use BETWEEN for range queries.", hint2: "BETWEEN is inclusive on both ends.", hint3: "WHERE salary BETWEEN 60000 AND 80000",
    solution: "SELECT * FROM employees WHERE salary BETWEEN 60000 AND 80000;", explanation: "BETWEEN is inclusive — it includes both boundary values. Equivalent to salary >= 60000 AND salary <= 80000.", relatedQuestions: [3,13], xpReward: 10
  },
  {
    id: 15, title: "Total Salary Bill", slug: "total-salary",
    difficulty: "Easy", category: "Aggregation", tags: ["SUM", "Aggregation"], companies: [],
    problemStatement: "Calculate the total salary paid to all employees.",
    tableStructure: [{ tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }],
    sampleData: {}, expectedOutput: [{total_salary:699000}],
    hint1: "Use SUM() to add all values.", hint2: "SUM(salary) adds all salary values.", hint3: "SELECT SUM(salary) AS total_salary FROM employees",
    solution: "SELECT SUM(salary) AS total_salary FROM employees;", explanation: "SUM() is an aggregate function that adds all non-NULL values in a column.", relatedQuestions: [7,8], xpReward: 10
  },
  {
    id: 16, title: "Employees with Name Starting with A", slug: "name-starts-with-a",
    difficulty: "Easy", category: "SQL Basics", tags: ["LIKE", "Pattern Matching"], companies: [],
    problemStatement: "Find all employees whose name starts with the letter 'A'.",
    tableStructure: [{ tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }],
    sampleData: {}, expectedOutput: [{emp_id:1,emp_name:"Alice Johnson"}],
    hint1: "Use LIKE for pattern matching.", hint2: "% matches any number of characters.", hint3: "WHERE emp_name LIKE 'A%'",
    solution: "SELECT * FROM employees WHERE emp_name LIKE 'A%';", explanation: "LIKE 'A%' matches any string starting with A. % is a wildcard matching zero or more characters.", relatedQuestions: [13,17], xpReward: 10
  },
  {
    id: 17, title: "Count All Employees", slug: "count-all-employees",
    difficulty: "Easy", category: "Aggregation", tags: ["COUNT", "Aggregation"], companies: [],
    problemStatement: "How many employees are in the company?",
    tableStructure: [{ tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }],
    sampleData: {}, expectedOutput: [{total_employees:10}],
    hint1: "Use COUNT() to count rows.", hint2: "COUNT(*) counts all rows including NULLs.", hint3: "SELECT COUNT(*) AS total_employees",
    solution: "SELECT COUNT(*) AS total_employees FROM employees;", explanation: "COUNT(*) counts all rows. COUNT(column) skips NULL values in that column.", relatedQuestions: [6,15], xpReward: 10
  },
  {
    id: 18, title: "Youngest and Oldest Employee Age", slug: "min-max-age",
    difficulty: "Easy", category: "Aggregation", tags: ["MIN", "MAX", "Aggregation"], companies: [],
    problemStatement: "Find the youngest and oldest employee ages.",
    tableStructure: [{ tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"age",type:"INTEGER"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }],
    sampleData: {}, expectedOutput: [{youngest:27,oldest:50}],
    hint1: "Use MIN() for minimum and MAX() for maximum.", hint2: "Combine both in one query.", hint3: "SELECT MIN(age), MAX(age)",
    solution: "SELECT MIN(age) AS youngest, MAX(age) AS oldest FROM employees;", explanation: "MIN() and MAX() return the smallest and largest values. Multiple aggregates can appear in one SELECT.", relatedQuestions: [8,15], xpReward: 10
  },
  {
    id: 19, title: "Select Specific Columns", slug: "select-specific-columns",
    difficulty: "Easy", category: "SQL Basics", tags: ["SELECT", "Projection"], companies: [],
    problemStatement: "Retrieve only the employee name, department, and salary columns.",
    tableStructure: [{ tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"department",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }],
    sampleData: {}, expectedOutput: [{emp_name:"Alice Johnson",department:"Engineering",salary:85000}],
    hint1: "List specific column names after SELECT.", hint2: "Separate column names with commas.", hint3: "SELECT emp_name, department, salary",
    solution: "SELECT emp_name, department, salary FROM employees;", explanation: "Selecting specific columns (projection) reduces data transferred and improves readability.", relatedQuestions: [1,20], xpReward: 10
  },
  {
    id: 20, title: "Rename Columns with Aliases", slug: "column-aliases",
    difficulty: "Easy", category: "SQL Basics", tags: ["AS", "Alias"], companies: [],
    problemStatement: "Select employee name and salary, renaming them as 'Name' and 'Monthly Pay'.",
    tableStructure: [{ tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }],
    sampleData: {}, expectedOutput: [{Name:"Alice Johnson","Monthly Pay":85000}],
    hint1: "Use AS keyword to rename.", hint2: "Use quotes for aliases with spaces.", hint3: "SELECT emp_name AS \"Name\", salary AS \"Monthly Pay\"",
    solution: "SELECT emp_name AS \"Name\", salary AS \"Monthly Pay\" FROM employees;", explanation: "AS creates an alias — a temporary name for a column. Aliases with spaces need quotes.", relatedQuestions: [19,1], xpReward: 10
  },
  {
    id: 21, title: "Students Who Passed", slug: "students-passed",
    difficulty: "Easy", category: "SQL Basics", tags: ["WHERE", "Comparison"], companies: [],
    problemStatement: "From the students table, find all students who scored 60 or above.",
    tableStructure: [{ tableName: "students", columns: [{name:"student_id",type:"INTEGER"},{name:"student_name",type:"TEXT"},{name:"score",type:"INTEGER"},{name:"grade",type:"TEXT"}], createSQL: STUDENTS.createSQL, insertSQL: STUDENTS.insertSQL }],
    sampleData: {}, expectedOutput: [{student_name:"Aarav Shah",score:92},{student_name:"Priya Patel",score:85},{student_name:"Rahul Verma",score:78}],
    hint1: "Use WHERE with >= operator.", hint2: "Pass mark is 60.", hint3: "WHERE score >= 60",
    solution: "SELECT * FROM students WHERE score >= 60;", explanation: ">= means 'greater than or equal to'. Students with exactly 60 are also included.", relatedQuestions: [22,23], xpReward: 10
  },
  {
    id: 22, title: "Average Score by Subject", slug: "avg-score-by-subject",
    difficulty: "Easy", category: "Aggregation", tags: ["AVG", "GROUP BY"], companies: [],
    problemStatement: "Calculate the average score for each subject.",
    tableStructure: [{ tableName: "students", columns: [{name:"student_id",type:"INTEGER"},{name:"subject",type:"TEXT"},{name:"score",type:"INTEGER"}], createSQL: STUDENTS.createSQL, insertSQL: STUDENTS.insertSQL }],
    sampleData: {}, expectedOutput: [{subject:"English",avg_score:83.33},{subject:"Math",avg_score:78.25},{subject:"Science",avg_score:78.67}],
    hint1: "Group by subject.", hint2: "Use AVG() for average.", hint3: "GROUP BY subject",
    solution: "SELECT subject, ROUND(AVG(score),2) AS avg_score FROM students GROUP BY subject ORDER BY subject;", explanation: "AVG calculates mean score per group. ROUND limits decimal places.", relatedQuestions: [21,23], xpReward: 15
  },
  {
    id: 23, title: "Top Scorer per Subject", slug: "top-scorer-per-subject",
    difficulty: "Easy", category: "Aggregation", tags: ["MAX", "GROUP BY"], companies: [],
    problemStatement: "Find the highest score achieved in each subject.",
    tableStructure: [{ tableName: "students", columns: [{name:"student_id",type:"INTEGER"},{name:"subject",type:"TEXT"},{name:"score",type:"INTEGER"}], createSQL: STUDENTS.createSQL, insertSQL: STUDENTS.insertSQL }],
    sampleData: {}, expectedOutput: [{subject:"English",top_score:95},{subject:"Math",top_score:92},{subject:"Science",top_score:90}],
    hint1: "Use MAX() per group.", hint2: "GROUP BY subject.", hint3: "SELECT subject, MAX(score)",
    solution: "SELECT subject, MAX(score) AS top_score FROM students GROUP BY subject;", explanation: "MAX() finds the largest value in each group defined by GROUP BY.", relatedQuestions: [22,21], xpReward: 15
  },
  {
    id: 24, title: "Count Products by Category", slug: "count-products-by-category",
    difficulty: "Easy", category: "Aggregation", tags: ["COUNT", "GROUP BY"], companies: [],
    problemStatement: "Count how many products exist in each category.",
    tableStructure: [{ tableName: "products", columns: [{name:"product_id",type:"INTEGER"},{name:"product_name",type:"TEXT"},{name:"category",type:"TEXT"}], createSQL: PRODUCTS.createSQL, insertSQL: PRODUCTS.insertSQL }],
    sampleData: {}, expectedOutput: [{category:"Electronics",count:6},{category:"Furniture",count:2},{category:"Stationery",count:2}],
    hint1: "Use COUNT(*) with GROUP BY.", hint2: "Group by category.", hint3: "GROUP BY category",
    solution: "SELECT category, COUNT(*) AS count FROM products GROUP BY category ORDER BY count DESC;", explanation: "COUNT(*) with GROUP BY counts items per category.", relatedQuestions: [25,24], xpReward: 15
  },
  {
    id: 25, title: "Products Priced Below 2000", slug: "products-below-2000",
    difficulty: "Easy", category: "SQL Basics", tags: ["WHERE", "Comparison"], companies: [],
    problemStatement: "List all products that cost less than 2000 rupees.",
    tableStructure: [{ tableName: "products", columns: [{name:"product_id",type:"INTEGER"},{name:"product_name",type:"TEXT"},{name:"price",type:"REAL"}], createSQL: PRODUCTS.createSQL, insertSQL: PRODUCTS.insertSQL }],
    sampleData: {}, expectedOutput: [{product_name:"Mouse",price:800},{product_name:"Keyboard",price:1500},{product_name:"Notebook",price:50},{product_name:"Pen",price:10}],
    hint1: "Use WHERE price < 2000.", hint2: "No need for quotes — price is numeric.", hint3: "WHERE price < 2000",
    solution: "SELECT product_name, price FROM products WHERE price < 2000 ORDER BY price DESC;", explanation: "< operator selects rows where price is strictly less than 2000.", relatedQuestions: [24,26], xpReward: 10
  },
  {
    id: 26, title: "Total Inventory Value", slug: "total-inventory-value",
    difficulty: "Easy", category: "Aggregation", tags: ["SUM", "Calculation"], companies: [],
    problemStatement: "Calculate the total value of all products in stock (price × stock).",
    tableStructure: [{ tableName: "products", columns: [{name:"product_id",type:"INTEGER"},{name:"product_name",type:"TEXT"},{name:"price",type:"REAL"},{name:"stock",type:"INTEGER"}], createSQL: PRODUCTS.createSQL, insertSQL: PRODUCTS.insertSQL }],
    sampleData: {}, expectedOutput: [{total_value:4430000}],
    hint1: "Multiply price by stock for each product.", hint2: "Sum all the values together.", hint3: "SELECT SUM(price * stock)",
    solution: "SELECT SUM(price * stock) AS total_value FROM products;", explanation: "You can do arithmetic inside aggregate functions. price * stock gives value per product, SUM adds them all.", relatedQuestions: [15,25], xpReward: 15
  },
  {
    id: 27, title: "Departments with Budget Over 200000", slug: "dept-budget-over-200k",
    difficulty: "Easy", category: "SQL Basics", tags: ["WHERE", "Comparison"], companies: [],
    problemStatement: "Find all departments with a budget greater than 200000.",
    tableStructure: [{ tableName: "departments", columns: [{name:"dept_id",type:"INTEGER"},{name:"dept_name",type:"TEXT"},{name:"budget",type:"REAL"},{name:"location",type:"TEXT"}], createSQL: DEPT.createSQL, insertSQL: DEPT.insertSQL }],
    sampleData: {}, expectedOutput: [{dept_name:"Engineering",budget:500000},{dept_name:"Finance",budget:300000},{dept_name:"Sales",budget:250000}],
    hint1: "Use WHERE budget > 200000.", hint2: "Filter based on numeric budget.", hint3: "WHERE budget > 200000",
    solution: "SELECT * FROM departments WHERE budget > 200000 ORDER BY budget DESC;", explanation: "Simple numeric comparison using > operator on the budget column.", relatedQuestions: [28,6], xpReward: 10
  },
  {
    id: 28, title: "Total Department Budget", slug: "total-dept-budget",
    difficulty: "Easy", category: "Aggregation", tags: ["SUM", "Aggregation"], companies: [],
    problemStatement: "What is the total budget across all departments?",
    tableStructure: [{ tableName: "departments", columns: [{name:"dept_id",type:"INTEGER"},{name:"dept_name",type:"TEXT"},{name:"budget",type:"REAL"}], createSQL: DEPT.createSQL, insertSQL: DEPT.insertSQL }],
    sampleData: {}, expectedOutput: [{total_budget:1400000}],
    hint1: "Use SUM() on the budget column.", hint2: "No GROUP BY needed for overall total.", hint3: "SELECT SUM(budget)",
    solution: "SELECT SUM(budget) AS total_budget FROM departments;", explanation: "Without GROUP BY, SUM() aggregates across all rows returning a single value.", relatedQuestions: [27,15], xpReward: 10
  },
  {
    id: 29, title: "Order Products by Price", slug: "order-products-by-price",
    difficulty: "Easy", category: "SQL Basics", tags: ["ORDER BY", "Sorting"], companies: [],
    problemStatement: "List all products sorted by price from cheapest to most expensive.",
    tableStructure: [{ tableName: "products", columns: [{name:"product_id",type:"INTEGER"},{name:"product_name",type:"TEXT"},{name:"price",type:"REAL"}], createSQL: PRODUCTS.createSQL, insertSQL: PRODUCTS.insertSQL }],
    sampleData: {}, expectedOutput: [{product_name:"Pen",price:10},{product_name:"Notebook",price:50},{product_name:"Mouse",price:800}],
    hint1: "Use ORDER BY.", hint2: "Default sort is ascending (cheapest first).", hint3: "ORDER BY price ASC",
    solution: "SELECT product_name, price FROM products ORDER BY price ASC;", explanation: "ASC is the default sort order. Use DESC for reverse order.", relatedQuestions: [4,25], xpReward: 10
  },
  {
    id: 30, title: "Employees Older Than 35", slug: "employees-older-35",
    difficulty: "Easy", category: "SQL Basics", tags: ["WHERE", "Comparison"], companies: [],
    problemStatement: "Find all employees who are older than 35 years.",
    tableStructure: [{ tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"age",type:"INTEGER"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }],
    sampleData: {}, expectedOutput: [{emp_name:"Bob Smith",age:35},{emp_name:"David Brown",age:40},{emp_name:"Henry Das",age:50},{emp_name:"Isla Roy",age:38}],
    hint1: "Use WHERE age > 35.", hint2: "35 is numeric — no quotes.", hint3: "WHERE age > 35",
    solution: "SELECT emp_name, age FROM employees WHERE age >= 35 ORDER BY age;", explanation: "Numeric comparisons do not use quotes. >= includes 35 itself.", relatedQuestions: [3,18], xpReward: 10
  },
  {
    id: 31, title: "Multiple Sort: Department then Salary", slug: "multi-sort",
    difficulty: "Easy", category: "SQL Basics", tags: ["ORDER BY", "Multiple Sort"], companies: [],
    problemStatement: "List employees sorted by department (A-Z), then by salary (high to low) within each department.",
    tableStructure: [{ tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"department",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }],
    sampleData: {}, expectedOutput: [{emp_name:"Carol White",department:"Engineering",salary:92000},{emp_name:"Alice Johnson",department:"Engineering",salary:85000},{emp_name:"Frank Lee",department:"Engineering",salary:78000}],
    hint1: "List multiple columns in ORDER BY.", hint2: "Separate with comma.", hint3: "ORDER BY department ASC, salary DESC",
    solution: "SELECT emp_name, department, salary FROM employees ORDER BY department ASC, salary DESC;", explanation: "Multiple ORDER BY columns: first sorts by department alphabetically, then by salary descending within each department.", relatedQuestions: [4,19], xpReward: 10
  },
  {
    id: 32, title: "Grade Distribution", slug: "grade-distribution",
    difficulty: "Easy", category: "Aggregation", tags: ["COUNT", "GROUP BY"], companies: [],
    problemStatement: "Count how many students received each grade.",
    tableStructure: [{ tableName: "students", columns: [{name:"student_id",type:"INTEGER"},{name:"grade",type:"TEXT"}], createSQL: STUDENTS.createSQL, insertSQL: STUDENTS.insertSQL }],
    sampleData: {}, expectedOutput: [{grade:"A",count:3},{grade:"B",count:3},{grade:"C",count:2},{grade:"D",count:1},{grade:"F",count:1}],
    hint1: "Group by grade.", hint2: "Count rows per group.", hint3: "GROUP BY grade ORDER BY grade",
    solution: "SELECT grade, COUNT(*) AS count FROM students GROUP BY grade ORDER BY grade;", explanation: "GROUP BY grade creates groups; COUNT(*) counts students in each grade group.", relatedQuestions: [22,6], xpReward: 15
  },
  {
    id: 33, title: "Products with Low Stock", slug: "low-stock-products",
    difficulty: "Easy", category: "SQL Basics", tags: ["WHERE", "Comparison"], companies: [],
    problemStatement: "Find all products with stock quantity of 60 or less.",
    tableStructure: [{ tableName: "products", columns: [{name:"product_id",type:"INTEGER"},{name:"product_name",type:"TEXT"},{name:"stock",type:"INTEGER"}], createSQL: PRODUCTS.createSQL, insertSQL: PRODUCTS.insertSQL }],
    sampleData: {}, expectedOutput: [{product_name:"Laptop",stock:50},{product_name:"Chair",stock:60},{product_name:"Monitor",stock:40}],
    hint1: "Use WHERE stock <= 60.", hint2: "Filter on the stock column.", hint3: "WHERE stock <= 60",
    solution: "SELECT product_name, stock FROM products WHERE stock <= 60 ORDER BY stock;", explanation: "<= includes the boundary value. This helps identify items needing restock.", relatedQuestions: [25,26], xpReward: 10
  },
  {
    id: 34, title: "Engineering Employees Earning Over 80000", slug: "eng-high-salary",
    difficulty: "Easy", category: "SQL Basics", tags: ["WHERE", "AND"], companies: [],
    problemStatement: "Find Engineering employees with salary above 80000.",
    tableStructure: [{ tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"department",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }],
    sampleData: {}, expectedOutput: [{emp_name:"Alice Johnson",department:"Engineering",salary:85000},{emp_name:"Carol White",department:"Engineering",salary:92000}],
    hint1: "Use AND to combine conditions.", hint2: "Both conditions must be true.", hint3: "WHERE department = 'Engineering' AND salary > 80000",
    solution: "SELECT emp_name, department, salary FROM employees WHERE department = 'Engineering' AND salary > 80000;", explanation: "AND requires all conditions to be true. Both department AND salary must match.", relatedQuestions: [2,3], xpReward: 10
  },
  {
    id: 35, title: "Subjects with More Than 3 Students", slug: "subjects-more-3-students",
    difficulty: "Easy", category: "Aggregation", tags: ["COUNT", "GROUP BY", "HAVING"], companies: [],
    problemStatement: "Find subjects where more than 3 students were tested.",
    tableStructure: [{ tableName: "students", columns: [{name:"student_id",type:"INTEGER"},{name:"subject",type:"TEXT"}], createSQL: STUDENTS.createSQL, insertSQL: STUDENTS.insertSQL }],
    sampleData: {}, expectedOutput: [{subject:"Math",student_count:4},{subject:"English",student_count:3},{subject:"Science",student_count:3}],
    hint1: "Use HAVING after GROUP BY to filter.", hint2: "HAVING COUNT(*) > 3 filters groups.", hint3: "GROUP BY subject HAVING COUNT(*) >= 3",
    solution: "SELECT subject, COUNT(*) AS student_count FROM students GROUP BY subject HAVING COUNT(*) >= 3 ORDER BY student_count DESC;", explanation: "HAVING filters aggregated results. WHERE cannot be used with aggregate functions like COUNT().", relatedQuestions: [9,22], xpReward: 15
  },
  {
    id: 36, title: "Electronics Products Only", slug: "electronics-only",
    difficulty: "Easy", category: "SQL Basics", tags: ["WHERE", "Filter"], companies: [],
    problemStatement: "List all products in the Electronics category with their price.",
    tableStructure: [{ tableName: "products", columns: [{name:"product_id",type:"INTEGER"},{name:"product_name",type:"TEXT"},{name:"category",type:"TEXT"},{name:"price",type:"REAL"}], createSQL: PRODUCTS.createSQL, insertSQL: PRODUCTS.insertSQL }],
    sampleData: {}, expectedOutput: [{product_name:"Laptop",price:45000},{product_name:"Monitor",price:18000},{product_name:"Headphones",price:3500}],
    hint1: "Filter by category = 'Electronics'.", hint2: "Use WHERE clause.", hint3: "WHERE category = 'Electronics'",
    solution: "SELECT product_name, price FROM products WHERE category = 'Electronics' ORDER BY price DESC;", explanation: "Simple filter on category column. String matching is case-sensitive in most databases.", relatedQuestions: [24,25], xpReward: 10
  },
  {
    id: 37, title: "Employees with AND/OR Condition", slug: "and-or-condition",
    difficulty: "Easy", category: "SQL Basics", tags: ["WHERE", "AND", "OR"], companies: [],
    problemStatement: "Find employees in Engineering OR Finance department who earn more than 70000.",
    tableStructure: [{ tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"department",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }],
    sampleData: {}, expectedOutput: [{emp_name:"Alice Johnson",department:"Engineering",salary:85000},{emp_name:"Carol White",department:"Engineering",salary:92000},{emp_name:"Frank Lee",department:"Engineering",salary:78000},{emp_name:"Henry Das",department:"Finance",salary:72000}],
    hint1: "Use parentheses to group OR conditions.", hint2: "AND has higher precedence than OR.", hint3: "WHERE (department IN ('Engineering','Finance')) AND salary > 70000",
    solution: "SELECT emp_name, department, salary FROM employees WHERE department IN ('Engineering','Finance') AND salary > 70000;", explanation: "Using IN with AND combines multiple conditions cleanly. Parentheses control evaluation order.", relatedQuestions: [11,34], xpReward: 15
  },
  {
    id: 38, title: "Calculate Tax for Each Employee", slug: "calculate-tax",
    difficulty: "Easy", category: "SQL Basics", tags: ["Calculation", "Expressions"], companies: [],
    problemStatement: "Show each employee's name, salary, and 10% tax amount.",
    tableStructure: [{ tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }],
    sampleData: {}, expectedOutput: [{emp_name:"Alice Johnson",salary:85000,tax:8500}],
    hint1: "Multiply salary by 0.10 for tax.", hint2: "Use arithmetic in SELECT.", hint3: "SELECT emp_name, salary, salary * 0.10 AS tax",
    solution: "SELECT emp_name, salary, salary * 0.10 AS tax FROM employees;", explanation: "SQL allows arithmetic expressions in SELECT. You can calculate derived values without storing them.", relatedQuestions: [26,20], xpReward: 15
  },
  {
    id: 39, title: "Employees in Specific Cities", slug: "employees-specific-cities",
    difficulty: "Easy", category: "SQL Basics", tags: ["IN", "WHERE"], companies: [],
    problemStatement: "Find employees based in Mumbai, Pune, or Bangalore.",
    tableStructure: [{ tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"city",type:"TEXT"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }],
    sampleData: {}, expectedOutput: [{emp_name:"Alice Johnson",city:"Mumbai"},{emp_name:"Carol White",city:"Bangalore"},{emp_name:"Eva Green",city:"Pune"}],
    hint1: "Use IN for multiple values.", hint2: "IN ('Mumbai','Pune','Bangalore')", hint3: "WHERE city IN ('Mumbai', 'Pune', 'Bangalore')",
    solution: "SELECT emp_name, city FROM employees WHERE city IN ('Mumbai', 'Pune', 'Bangalore') ORDER BY city;", explanation: "IN is shorthand for multiple OR conditions and is more readable.", relatedQuestions: [11,12], xpReward: 10
  },
  {
    id: 40, title: "Minimum Product Price", slug: "min-product-price",
    difficulty: "Easy", category: "Aggregation", tags: ["MIN", "Aggregation"], companies: [],
    problemStatement: "What is the cheapest product price?",
    tableStructure: [{ tableName: "products", columns: [{name:"product_id",type:"INTEGER"},{name:"product_name",type:"TEXT"},{name:"price",type:"REAL"}], createSQL: PRODUCTS.createSQL, insertSQL: PRODUCTS.insertSQL }],
    sampleData: {}, expectedOutput: [{min_price:10}],
    hint1: "Use MIN() aggregate.", hint2: "No GROUP BY needed.", hint3: "SELECT MIN(price) AS min_price",
    solution: "SELECT MIN(price) AS min_price FROM products;", explanation: "MIN() returns the single smallest value across all rows.", relatedQuestions: [8,18], xpReward: 10
  },
];
