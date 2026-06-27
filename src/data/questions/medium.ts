import type { Question } from '../../types';

const EMP = {
  createSQL: "CREATE TABLE employees (emp_id INTEGER PRIMARY KEY, emp_name TEXT, dept_id INTEGER, salary REAL, hire_date TEXT, manager_id INTEGER);",
  insertSQL: "INSERT INTO employees VALUES (1,'Alice Johnson',1,85000,'2020-01-15',NULL),(2,'Bob Smith',2,62000,'2019-06-01',5),(3,'Carol White',1,92000,'2018-03-20',1),(4,'David Brown',3,55000,'2021-09-10',7),(5,'Eva Green',2,67000,'2020-11-05',NULL),(6,'Frank Lee',1,78000,'2017-07-22',1),(7,'Grace Kim',3,58000,'2022-01-30',NULL),(8,'Henry Das',4,72000,'2016-05-14',NULL),(9,'Isla Roy',4,69000,'2019-08-19',8),(10,'Jack Mehta',2,61000,'2021-03-11',5);"
};

const DEPT = {
  createSQL: "CREATE TABLE departments (dept_id INTEGER PRIMARY KEY, dept_name TEXT, budget REAL, location TEXT);",
  insertSQL: "INSERT INTO departments VALUES (1,'Engineering',500000,'Bangalore'),(2,'Marketing',200000,'Mumbai'),(3,'HR',150000,'Delhi'),(4,'Finance',300000,'Chennai'),(5,'Sales',250000,'Pune');"
};

const ORDERS = {
  createSQL: "CREATE TABLE orders (order_id INTEGER PRIMARY KEY, customer_id INTEGER, product TEXT, amount REAL, order_date TEXT, status TEXT);",
  insertSQL: "INSERT INTO orders VALUES (1,101,'Laptop',45000,'2024-01-10','Completed'),(2,102,'Mouse',800,'2024-01-15','Completed'),(3,101,'Keyboard',1500,'2024-02-01','Pending'),(4,103,'Monitor',18000,'2024-02-10','Completed'),(5,104,'Desk',12000,'2024-02-20','Cancelled'),(6,102,'Chair',8000,'2024-03-01','Completed'),(7,105,'Laptop',45000,'2024-03-05','Pending'),(8,101,'Headphones',3500,'2024-03-10','Completed'),(9,103,'Webcam',2500,'2024-03-15','Completed'),(10,106,'Notebook',50,'2024-03-20','Completed');"
};

const CUSTOMERS = {
  createSQL: "CREATE TABLE customers (customer_id INTEGER PRIMARY KEY, customer_name TEXT, email TEXT, city TEXT, join_date TEXT);",
  insertSQL: "INSERT INTO customers VALUES (101,'Aarav Shah','aarav@email.com','Mumbai','2023-01-10'),(102,'Priya Patel','priya@email.com','Pune','2023-02-15'),(103,'Rahul Verma','rahul@email.com','Delhi','2023-03-20'),(104,'Sneha Iyer','sneha@email.com','Bangalore','2023-04-05'),(105,'Amit Kumar','amit@email.com','Chennai','2023-05-12'),(106,'Riya Singh','riya@email.com','Kolkata','2023-06-18');"
};

const SALES = {
  createSQL: "CREATE TABLE sales (sale_id INTEGER PRIMARY KEY, salesperson TEXT, region TEXT, product TEXT, revenue REAL, sale_date TEXT, quarter TEXT);",
  insertSQL: "INSERT INTO sales VALUES (1,'Alice','North','Laptop',90000,'2024-01-10','Q1'),(2,'Bob','South','Mouse',4000,'2024-01-15','Q1'),(3,'Alice','North','Monitor',36000,'2024-02-01','Q1'),(4,'Carol','East','Laptop',45000,'2024-02-10','Q1'),(5,'Bob','South','Keyboard',3000,'2024-02-20','Q1'),(6,'Carol','East','Chair',8000,'2024-03-01','Q1'),(7,'Alice','North','Laptop',45000,'2024-04-05','Q2'),(8,'David','West','Headphones',7000,'2024-04-10','Q2'),(9,'Bob','South','Monitor',18000,'2024-04-15','Q2'),(10,'David','West','Laptop',45000,'2024-05-01','Q2'),(11,'Carol','East','Keyboard',6000,'2024-05-10','Q2'),(12,'Alice','North','Webcam',5000,'2024-05-15','Q2');"
};

export const mediumQuestions: Question[] = [
  {
    id: 101, title: "Join Employees with Departments", slug: "join-emp-dept",
    difficulty: "Medium", category: "JOINs", tags: ["JOIN", "INNER JOIN", "Multiple Tables"], companies: [],
    problemStatement: "Show each employee's name along with their department name.",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"dept_id",type:"INTEGER"},{name:"salary",type:"REAL"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL },
      { tableName: "departments", columns: [{name:"dept_id",type:"INTEGER"},{name:"dept_name",type:"TEXT"}], createSQL: DEPT.createSQL, insertSQL: DEPT.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{emp_name:"Alice Johnson",dept_name:"Engineering"},{emp_name:"Bob Smith",dept_name:"Marketing"}],
    hint1: "Use JOIN to combine two tables.", hint2: "Match on a common column.", hint3: "JOIN departments ON employees.dept_id = departments.dept_id",
    solution: "SELECT e.emp_name, d.dept_name FROM employees e JOIN departments d ON e.dept_id = d.dept_id ORDER BY d.dept_name, e.emp_name;",
    explanation: "INNER JOIN returns rows where the condition is met in BOTH tables. Aliases (e, d) shorten table references.", relatedQuestions: [102,103], xpReward: 20
  },
  {
    id: 102, title: "Customer Orders with Customer Name", slug: "customer-orders-join",
    difficulty: "Medium", category: "JOINs", tags: ["JOIN", "Multiple Tables"], companies: [],
    problemStatement: "List all orders along with the customer's name and city.",
    tableStructure: [
      { tableName: "orders", columns: [{name:"order_id",type:"INTEGER"},{name:"customer_id",type:"INTEGER"},{name:"product",type:"TEXT"},{name:"amount",type:"REAL"},{name:"status",type:"TEXT"}], createSQL: ORDERS.createSQL, insertSQL: ORDERS.insertSQL },
      { tableName: "customers", columns: [{name:"customer_id",type:"INTEGER"},{name:"customer_name",type:"TEXT"},{name:"city",type:"TEXT"}], createSQL: CUSTOMERS.createSQL, insertSQL: CUSTOMERS.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{customer_name:"Aarav Shah",product:"Laptop",amount:45000}],
    hint1: "Join orders to customers on customer_id.", hint2: "Select columns from both tables.", hint3: "JOIN customers ON orders.customer_id = customers.customer_id",
    solution: "SELECT c.customer_name, c.city, o.product, o.amount, o.status FROM orders o JOIN customers c ON o.customer_id = c.customer_id ORDER BY o.order_id;",
    explanation: "Joining tables lets you combine related data. Always join on the foreign key column.", relatedQuestions: [101,103], xpReward: 20
  },
  {
    id: 103, title: "LEFT JOIN: Customers with No Orders", slug: "left-join-no-orders",
    difficulty: "Medium", category: "JOINs", tags: ["LEFT JOIN", "NULL"], companies: [],
    problemStatement: "Find all customers, including those who have not placed any orders.",
    tableStructure: [
      { tableName: "customers", columns: [{name:"customer_id",type:"INTEGER"},{name:"customer_name",type:"TEXT"},{name:"city",type:"TEXT"}], createSQL: CUSTOMERS.createSQL, insertSQL: CUSTOMERS.insertSQL },
      { tableName: "orders", columns: [{name:"order_id",type:"INTEGER"},{name:"customer_id",type:"INTEGER"},{name:"product",type:"TEXT"}], createSQL: ORDERS.createSQL, insertSQL: ORDERS.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{customer_name:"Sneha Iyer",order_id:null},{customer_name:"Amit Kumar",order_id:null}],
    hint1: "Use LEFT JOIN to include all rows from the left table.", hint2: "Customers with no orders will have NULL in order columns.", hint3: "LEFT JOIN orders ON customers.customer_id = orders.customer_id",
    solution: "SELECT c.customer_name, c.city, o.order_id, o.product FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id ORDER BY c.customer_id;",
    explanation: "LEFT JOIN returns all rows from the left (customers) table, with NULLs for unmatched right (orders) table rows.", relatedQuestions: [102,104], xpReward: 20
  },
  {
    id: 104, title: "Customers Who Never Ordered", slug: "customers-no-orders",
    difficulty: "Medium", category: "JOINs", tags: ["LEFT JOIN", "NULL", "Filter"], companies: [],
    problemStatement: "Find customers who have never placed any order.",
    tableStructure: [
      { tableName: "customers", columns: [{name:"customer_id",type:"INTEGER"},{name:"customer_name",type:"TEXT"}], createSQL: CUSTOMERS.createSQL, insertSQL: CUSTOMERS.insertSQL },
      { tableName: "orders", columns: [{name:"order_id",type:"INTEGER"},{name:"customer_id",type:"INTEGER"}], createSQL: ORDERS.createSQL, insertSQL: ORDERS.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{customer_name:"Sneha Iyer"},{customer_name:"Amit Kumar"}],
    hint1: "Use LEFT JOIN then filter for NULLs.", hint2: "WHERE order column IS NULL identifies non-matching rows.", hint3: "WHERE o.order_id IS NULL",
    solution: "SELECT c.customer_name FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id WHERE o.order_id IS NULL;",
    explanation: "The LEFT JOIN + IS NULL pattern finds rows in the left table with no match in the right table.", relatedQuestions: [103,105], xpReward: 25
  },
  {
    id: 105, title: "Total Revenue per Customer", slug: "total-revenue-per-customer",
    difficulty: "Medium", category: "JOINs", tags: ["JOIN", "SUM", "GROUP BY"], companies: [],
    problemStatement: "Calculate the total amount spent by each customer who has placed orders.",
    tableStructure: [
      { tableName: "orders", columns: [{name:"order_id",type:"INTEGER"},{name:"customer_id",type:"INTEGER"},{name:"amount",type:"REAL"}], createSQL: ORDERS.createSQL, insertSQL: ORDERS.insertSQL },
      { tableName: "customers", columns: [{name:"customer_id",type:"INTEGER"},{name:"customer_name",type:"TEXT"}], createSQL: CUSTOMERS.createSQL, insertSQL: CUSTOMERS.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{customer_name:"Aarav Shah",total_spent:50000},{customer_name:"Priya Patel",total_spent:8800}],
    hint1: "Join customers and orders, then group.", hint2: "SUM(o.amount) after GROUP BY customer.", hint3: "GROUP BY c.customer_id, c.customer_name",
    solution: "SELECT c.customer_name, SUM(o.amount) AS total_spent FROM customers c JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.customer_id, c.customer_name ORDER BY total_spent DESC;",
    explanation: "JOIN followed by GROUP BY aggregates order amounts per customer.", relatedQuestions: [102,106], xpReward: 25
  },
  {
    id: 106, title: "Subquery: Employees Earning Above Average", slug: "above-average-salary",
    difficulty: "Medium", category: "Subqueries", tags: ["Subquery", "AVG"], companies: [],
    problemStatement: "Find employees earning more than the company average salary.",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{emp_name:"Alice Johnson",salary:85000},{emp_name:"Carol White",salary:92000},{emp_name:"Frank Lee",salary:78000}],
    hint1: "Use a subquery to calculate average.", hint2: "SELECT AVG(salary) FROM employees gives the average.", hint3: "WHERE salary > (SELECT AVG(salary) FROM employees)",
    solution: "SELECT emp_name, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees) ORDER BY salary DESC;",
    explanation: "A subquery in WHERE clause computes the average first, then the outer query compares each row against it.", relatedQuestions: [107,108], xpReward: 25
  },
  {
    id: 107, title: "Subquery: Department with Highest Budget", slug: "dept-highest-budget",
    difficulty: "Medium", category: "Subqueries", tags: ["Subquery", "MAX"], companies: [],
    problemStatement: "Find the department(s) with the highest budget.",
    tableStructure: [
      { tableName: "departments", columns: [{name:"dept_id",type:"INTEGER"},{name:"dept_name",type:"TEXT"},{name:"budget",type:"REAL"}], createSQL: DEPT.createSQL, insertSQL: DEPT.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{dept_name:"Engineering",budget:500000}],
    hint1: "Use subquery to find MAX budget.", hint2: "Then find departments matching that max.", hint3: "WHERE budget = (SELECT MAX(budget) FROM departments)",
    solution: "SELECT dept_name, budget FROM departments WHERE budget = (SELECT MAX(budget) FROM departments);",
    explanation: "Subquery finds the maximum, outer query returns all departments that match (handles ties).", relatedQuestions: [106,108], xpReward: 25
  },
  {
    id: 108, title: "Employees in Same Department as Alice", slug: "same-dept-as-alice",
    difficulty: "Medium", category: "Subqueries", tags: ["Subquery", "IN"], companies: [],
    problemStatement: "Find all employees in the same department as 'Alice Johnson'.",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"dept_id",type:"INTEGER"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{emp_name:"Carol White"},{emp_name:"Frank Lee"}],
    hint1: "Use subquery to get Alice's dept_id.", hint2: "Then find others with same dept_id.", hint3: "WHERE dept_id = (SELECT dept_id FROM employees WHERE emp_name = 'Alice Johnson') AND emp_name != 'Alice Johnson'",
    solution: "SELECT emp_name FROM employees WHERE dept_id = (SELECT dept_id FROM employees WHERE emp_name = 'Alice Johnson') AND emp_name != 'Alice Johnson';",
    explanation: "Subqueries can reference the same table. Exclude Alice herself with AND condition.", relatedQuestions: [106,109], xpReward: 25
  },
  {
    id: 109, title: "CTE: Monthly Sales Summary", slug: "cte-monthly-sales",
    difficulty: "Medium", category: "CTEs", tags: ["CTE", "WITH", "Aggregation"], companies: [],
    problemStatement: "Use a CTE to calculate total revenue per salesperson, then rank them.",
    tableStructure: [
      { tableName: "sales", columns: [{name:"sale_id",type:"INTEGER"},{name:"salesperson",type:"TEXT"},{name:"revenue",type:"REAL"}], createSQL: SALES.createSQL, insertSQL: SALES.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{salesperson:"Alice",total_revenue:176000},{salesperson:"Carol",total_revenue:59000},{salesperson:"David",total_revenue:52000},{salesperson:"Bob",total_revenue:25000}],
    hint1: "WITH defines a CTE.", hint2: "SUM revenue GROUP BY salesperson in the CTE.", hint3: "WITH summary AS (SELECT salesperson, SUM(revenue) AS total FROM sales GROUP BY salesperson) SELECT * FROM summary ORDER BY total DESC",
    solution: "WITH summary AS (\n  SELECT salesperson, SUM(revenue) AS total_revenue\n  FROM sales\n  GROUP BY salesperson\n)\nSELECT salesperson, total_revenue\nFROM summary\nORDER BY total_revenue DESC;",
    explanation: "CTEs (Common Table Expressions) defined with WITH make complex queries more readable. Results can be queried like a regular table.", relatedQuestions: [110,111], xpReward: 30
  },
  {
    id: 110, title: "CTE: Filter High Earners by Department", slug: "cte-high-earners",
    difficulty: "Medium", category: "CTEs", tags: ["CTE", "WITH", "Filter"], companies: [],
    problemStatement: "Use a CTE to identify employees earning above 70000, then join with departments to show their department name.",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"dept_id",type:"INTEGER"},{name:"salary",type:"REAL"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL },
      { tableName: "departments", columns: [{name:"dept_id",type:"INTEGER"},{name:"dept_name",type:"TEXT"}], createSQL: DEPT.createSQL, insertSQL: DEPT.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{emp_name:"Alice Johnson",salary:85000,dept_name:"Engineering"},{emp_name:"Carol White",salary:92000,dept_name:"Engineering"}],
    hint1: "Define CTE for high earners first.", hint2: "Then join CTE with departments.", hint3: "WITH high_earners AS (SELECT * FROM employees WHERE salary > 70000) SELECT h.emp_name, h.salary, d.dept_name FROM high_earners h JOIN departments d ON h.dept_id = d.dept_id",
    solution: "WITH high_earners AS (\n  SELECT * FROM employees WHERE salary > 70000\n)\nSELECT h.emp_name, h.salary, d.dept_name\nFROM high_earners h\nJOIN departments d ON h.dept_id = d.dept_id\nORDER BY h.salary DESC;",
    explanation: "CTEs can be joined with other tables. This breaks complex queries into logical named steps.", relatedQuestions: [109,111], xpReward: 30
  },
  {
    id: 111, title: "Self-Join: Find Employee Managers", slug: "self-join-managers",
    difficulty: "Medium", category: "JOINs", tags: ["Self JOIN", "Hierarchy"], companies: [],
    problemStatement: "Show each employee along with their manager's name. Employees with no manager should show NULL.",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"manager_id",type:"INTEGER"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{emp_name:"Alice Johnson",manager_name:null},{emp_name:"Bob Smith",manager_name:"Eva Green"}],
    hint1: "Join the employees table to itself.", hint2: "Use aliases to distinguish employee vs manager.", hint3: "LEFT JOIN employees mgr ON e.manager_id = mgr.emp_id",
    solution: "SELECT e.emp_name, mgr.emp_name AS manager_name FROM employees e LEFT JOIN employees mgr ON e.manager_id = mgr.emp_id ORDER BY e.emp_id;",
    explanation: "A self-join joins a table to itself. Use aliases to create two logical roles: employee and manager.", relatedQuestions: [101,112], xpReward: 30
  },
  {
    id: 112, title: "Revenue by Region and Quarter", slug: "revenue-region-quarter",
    difficulty: "Medium", category: "Aggregation", tags: ["GROUP BY", "Multiple Columns"], companies: [],
    problemStatement: "Show total revenue by region and quarter, ordered by quarter then revenue descending.",
    tableStructure: [
      { tableName: "sales", columns: [{name:"sale_id",type:"INTEGER"},{name:"region",type:"TEXT"},{name:"revenue",type:"REAL"},{name:"quarter",type:"TEXT"}], createSQL: SALES.createSQL, insertSQL: SALES.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{region:"North",quarter:"Q1",total:126000},{region:"East",quarter:"Q1",total:53000}],
    hint1: "GROUP BY two columns.", hint2: "Use region and quarter together.", hint3: "GROUP BY region, quarter",
    solution: "SELECT region, quarter, SUM(revenue) AS total FROM sales GROUP BY region, quarter ORDER BY quarter, total DESC;",
    explanation: "GROUP BY with multiple columns creates groups for each unique combination of those values.", relatedQuestions: [109,113], xpReward: 25
  },
  {
    id: 113, title: "Orders with Running Total", slug: "subquery-running-total",
    difficulty: "Medium", category: "Subqueries", tags: ["Subquery", "Correlated"], companies: [],
    problemStatement: "For each completed order, show the cumulative total amount spent by that customer up to and including that order.",
    tableStructure: [
      { tableName: "orders", columns: [{name:"order_id",type:"INTEGER"},{name:"customer_id",type:"INTEGER"},{name:"amount",type:"REAL"},{name:"order_date",type:"TEXT"},{name:"status",type:"TEXT"}], createSQL: ORDERS.createSQL, insertSQL: ORDERS.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{order_id:1,customer_id:101,amount:45000},{order_id:2,customer_id:102,amount:800}],
    hint1: "Use a correlated subquery.", hint2: "Reference outer query columns inside the subquery.", hint3: "SELECT (SELECT SUM(amount) FROM orders o2 WHERE o2.customer_id = o1.customer_id AND o2.order_id <= o1.order_id)",
    solution: "SELECT o1.order_id, o1.customer_id, o1.amount, (SELECT SUM(o2.amount) FROM orders o2 WHERE o2.customer_id = o1.customer_id AND o2.order_id <= o1.order_id AND o2.status = 'Completed') AS running_total FROM orders o1 WHERE o1.status = 'Completed' ORDER BY o1.customer_id, o1.order_id;",
    explanation: "A correlated subquery references columns from the outer query. It re-executes for each outer row.", relatedQuestions: [106,114], xpReward: 30
  },
  {
    id: 114, title: "Employees in Department with Highest Headcount", slug: "dept-highest-headcount",
    difficulty: "Medium", category: "Subqueries", tags: ["Subquery", "MAX", "GROUP BY"], companies: [],
    problemStatement: "Find all employees who work in the department that has the most employees.",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"dept_id",type:"INTEGER"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL },
      { tableName: "departments", columns: [{name:"dept_id",type:"INTEGER"},{name:"dept_name",type:"TEXT"}], createSQL: DEPT.createSQL, insertSQL: DEPT.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{emp_name:"Alice Johnson",dept_name:"Engineering"},{emp_name:"Carol White",dept_name:"Engineering"},{emp_name:"Frank Lee",dept_name:"Engineering"}],
    hint1: "First find the dept_id with most employees.", hint2: "Use GROUP BY dept_id HAVING count = MAX count.", hint3: "WHERE dept_id = (SELECT dept_id FROM employees GROUP BY dept_id ORDER BY COUNT(*) DESC LIMIT 1)",
    solution: "SELECT e.emp_name, d.dept_name FROM employees e JOIN departments d ON e.dept_id = d.dept_id WHERE e.dept_id = (SELECT dept_id FROM employees GROUP BY dept_id ORDER BY COUNT(*) DESC LIMIT 1);",
    explanation: "Nested subquery first finds the department with most employees, then outer query filters for that department.", relatedQuestions: [108,115], xpReward: 30
  },
  {
    id: 115, title: "String: Extract First Name", slug: "extract-first-name",
    difficulty: "Medium", category: "String Functions", tags: ["String Functions", "SUBSTR"], companies: [],
    problemStatement: "Extract only the first name from the emp_name column (assumes first name is before the space).",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{emp_name:"Alice Johnson",first_name:"Alice"},{emp_name:"Bob Smith",first_name:"Bob"}],
    hint1: "Use SUBSTR and INSTR to locate the space.", hint2: "INSTR finds position of space character.", hint3: "SUBSTR(emp_name, 1, INSTR(emp_name, ' ') - 1)",
    solution: "SELECT emp_name, SUBSTR(emp_name, 1, INSTR(emp_name, ' ') - 1) AS first_name FROM employees;",
    explanation: "INSTR returns the position of a substring. SUBSTR extracts a portion of the string. Combining them extracts the first word.", relatedQuestions: [116,117], xpReward: 20
  },
  {
    id: 116, title: "String: Email Domain Extraction", slug: "email-domain",
    difficulty: "Medium", category: "String Functions", tags: ["String Functions", "SUBSTR"], companies: [],
    problemStatement: "From the customers table, extract the domain part of each email address (the part after @).",
    tableStructure: [
      { tableName: "customers", columns: [{name:"customer_id",type:"INTEGER"},{name:"customer_name",type:"TEXT"},{name:"email",type:"TEXT"}], createSQL: CUSTOMERS.createSQL, insertSQL: CUSTOMERS.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{customer_name:"Aarav Shah",domain:"email.com"},{customer_name:"Priya Patel",domain:"email.com"}],
    hint1: "Find the position of @ character.", hint2: "Extract everything after @.", hint3: "SUBSTR(email, INSTR(email, '@') + 1)",
    solution: "SELECT customer_name, email, SUBSTR(email, INSTR(email, '@') + 1) AS domain FROM customers;",
    explanation: "INSTR finds the @ sign position. Adding 1 starts extraction after @. SUBSTR without end length takes all remaining characters.", relatedQuestions: [115,117], xpReward: 20
  },
  {
    id: 117, title: "String: Upper and Lower Case", slug: "upper-lower-case",
    difficulty: "Medium", category: "String Functions", tags: ["String Functions", "UPPER", "LOWER"], companies: [],
    problemStatement: "Display employee names in uppercase and their department in lowercase.",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"dept_id",type:"INTEGER"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL },
      { tableName: "departments", columns: [{name:"dept_id",type:"INTEGER"},{name:"dept_name",type:"TEXT"}], createSQL: DEPT.createSQL, insertSQL: DEPT.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{name_upper:"ALICE JOHNSON",dept_lower:"engineering"}],
    hint1: "UPPER() converts to uppercase.", hint2: "LOWER() converts to lowercase.", hint3: "SELECT UPPER(emp_name), LOWER(dept_name)",
    solution: "SELECT UPPER(e.emp_name) AS name_upper, LOWER(d.dept_name) AS dept_lower FROM employees e JOIN departments d ON e.dept_id = d.dept_id;",
    explanation: "UPPER() and LOWER() are string functions for case transformation. Useful for standardizing data.", relatedQuestions: [115,116], xpReward: 20
  },
  {
    id: 118, title: "Date: Employees Hired in Last 5 Years", slug: "hired-recent-years",
    difficulty: "Medium", category: "Date Functions", tags: ["Date Functions", "Filter"], companies: [],
    problemStatement: "Find employees hired after 2019 (hire_date starts with '2020' or later).",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"hire_date",type:"TEXT"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{emp_name:"Alice Johnson",hire_date:"2020-01-15"},{emp_name:"David Brown",hire_date:"2021-09-10"},{emp_name:"Eva Green",hire_date:"2020-11-05"},{emp_name:"Grace Kim",hire_date:"2022-01-30"},{emp_name:"Jack Mehta",hire_date:"2021-03-11"}],
    hint1: "Dates are stored as text YYYY-MM-DD.", hint2: "Compare or use SUBSTR to extract year.", hint3: "WHERE hire_date >= '2020-01-01'",
    solution: "SELECT emp_name, hire_date FROM employees WHERE hire_date >= '2020-01-01' ORDER BY hire_date;",
    explanation: "ISO date strings (YYYY-MM-DD) compare lexicographically correctly. >= '2020-01-01' filters post-2019 hires.", relatedQuestions: [119,115], xpReward: 20
  },
  {
    id: 119, title: "Date: Orders by Month", slug: "orders-by-month",
    difficulty: "Medium", category: "Date Functions", tags: ["Date Functions", "SUBSTR", "GROUP BY"], companies: [],
    problemStatement: "Count orders placed each month in 2024.",
    tableStructure: [
      { tableName: "orders", columns: [{name:"order_id",type:"INTEGER"},{name:"order_date",type:"TEXT"}], createSQL: ORDERS.createSQL, insertSQL: ORDERS.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{month:"2024-01",order_count:2},{month:"2024-02",order_count:3},{month:"2024-03",order_count:5}],
    hint1: "Extract year-month using SUBSTR.", hint2: "SUBSTR(order_date, 1, 7) gives 'YYYY-MM'.", hint3: "GROUP BY SUBSTR(order_date, 1, 7)",
    solution: "SELECT SUBSTR(order_date, 1, 7) AS month, COUNT(*) AS order_count FROM orders GROUP BY SUBSTR(order_date, 1, 7) ORDER BY month;",
    explanation: "SUBSTR(date, 1, 7) extracts 'YYYY-MM'. Grouping on this allows monthly aggregation without date functions.", relatedQuestions: [118,120], xpReward: 25
  },
  {
    id: 120, title: "CASE: Salary Bands", slug: "salary-bands-case",
    difficulty: "Medium", category: "CASE Expressions", tags: ["CASE", "Conditional Logic"], companies: [],
    problemStatement: "Categorize each employee's salary into bands: 'Low' (<60000), 'Mid' (60000-79999), 'High' (>=80000).",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{emp_name:"Alice Johnson",salary:85000,salary_band:"High"},{emp_name:"Bob Smith",salary:62000,salary_band:"Mid"}],
    hint1: "Use CASE WHEN ... THEN ... ELSE ... END.", hint2: "Define conditions from lowest to highest.", hint3: "CASE WHEN salary < 60000 THEN 'Low' WHEN salary < 80000 THEN 'Mid' ELSE 'High' END",
    solution: "SELECT emp_name, salary, CASE WHEN salary < 60000 THEN 'Low' WHEN salary < 80000 THEN 'Mid' ELSE 'High' END AS salary_band FROM employees ORDER BY salary;",
    explanation: "CASE evaluates conditions in order, returning the first matching THEN value. ELSE handles remaining cases.", relatedQuestions: [121,122], xpReward: 25
  },
  {
    id: 121, title: "CASE: Order Status Labels", slug: "order-status-labels",
    difficulty: "Medium", category: "CASE Expressions", tags: ["CASE", "Conditional Logic"], companies: [],
    problemStatement: "Add a priority label to orders: Completed=Normal, Pending=High Priority, Cancelled=Review.",
    tableStructure: [
      { tableName: "orders", columns: [{name:"order_id",type:"INTEGER"},{name:"customer_id",type:"INTEGER"},{name:"status",type:"TEXT"},{name:"amount",type:"REAL"}], createSQL: ORDERS.createSQL, insertSQL: ORDERS.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{order_id:1,status:"Completed",priority:"Normal"},{order_id:3,status:"Pending",priority:"High Priority"}],
    hint1: "Use CASE WHEN status = ... THEN ... END.", hint2: "One WHEN per status value.", hint3: "CASE WHEN status = 'Completed' THEN 'Normal' WHEN status = 'Pending' THEN 'High Priority' ELSE 'Review' END",
    solution: "SELECT order_id, status, amount, CASE WHEN status = 'Completed' THEN 'Normal' WHEN status = 'Pending' THEN 'High Priority' ELSE 'Review' END AS priority FROM orders;",
    explanation: "CASE can match exact values (like a switch statement) or use WHEN with conditions.", relatedQuestions: [120,122], xpReward: 25
  },
  {
    id: 122, title: "COUNT with CASE: Status Breakdown", slug: "count-with-case",
    difficulty: "Medium", category: "CASE Expressions", tags: ["CASE", "COUNT", "Pivot"], companies: [],
    problemStatement: "Show count of Completed, Pending, and Cancelled orders in a single row.",
    tableStructure: [
      { tableName: "orders", columns: [{name:"order_id",type:"INTEGER"},{name:"status",type:"TEXT"}], createSQL: ORDERS.createSQL, insertSQL: ORDERS.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{completed:6,pending:2,cancelled:1}],
    hint1: "Use COUNT with CASE to count specific values.", hint2: "COUNT(CASE WHEN status='...' THEN 1 END).", hint3: "COUNT(CASE WHEN status = 'Completed' THEN 1 END) AS completed",
    solution: "SELECT COUNT(CASE WHEN status = 'Completed' THEN 1 END) AS completed, COUNT(CASE WHEN status = 'Pending' THEN 1 END) AS pending, COUNT(CASE WHEN status = 'Cancelled' THEN 1 END) AS cancelled FROM orders;",
    explanation: "CASE inside COUNT creates conditional counts. This technique pivots row values into columns.", relatedQuestions: [120,121], xpReward: 30
  },
  {
    id: 123, title: "EXISTS: Customers with Completed Orders", slug: "exists-completed-orders",
    difficulty: "Medium", category: "Subqueries", tags: ["EXISTS", "Subquery"], companies: [],
    problemStatement: "Find customers who have at least one completed order.",
    tableStructure: [
      { tableName: "customers", columns: [{name:"customer_id",type:"INTEGER"},{name:"customer_name",type:"TEXT"}], createSQL: CUSTOMERS.createSQL, insertSQL: CUSTOMERS.insertSQL },
      { tableName: "orders", columns: [{name:"order_id",type:"INTEGER"},{name:"customer_id",type:"INTEGER"},{name:"status",type:"TEXT"}], createSQL: ORDERS.createSQL, insertSQL: ORDERS.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{customer_name:"Aarav Shah"},{customer_name:"Priya Patel"},{customer_name:"Rahul Verma"}],
    hint1: "Use EXISTS to check for matching rows.", hint2: "EXISTS returns true if the subquery returns any row.", hint3: "WHERE EXISTS (SELECT 1 FROM orders WHERE customer_id = c.customer_id AND status = 'Completed')",
    solution: "SELECT customer_name FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id AND o.status = 'Completed') ORDER BY customer_name;",
    explanation: "EXISTS returns TRUE if the subquery finds at least one matching row. More efficient than IN for large datasets.", relatedQuestions: [104,124], xpReward: 30
  },
  {
    id: 124, title: "Multiple CTEs: Sales Analysis", slug: "multiple-ctes",
    difficulty: "Medium", category: "CTEs", tags: ["CTE", "Multiple CTEs"], companies: [],
    problemStatement: "Use two CTEs: one for Q1 sales total per salesperson, one for Q2. Then compare them side by side.",
    tableStructure: [
      { tableName: "sales", columns: [{name:"sale_id",type:"INTEGER"},{name:"salesperson",type:"TEXT"},{name:"revenue",type:"REAL"},{name:"quarter",type:"TEXT"}], createSQL: SALES.createSQL, insertSQL: SALES.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{salesperson:"Alice",q1_revenue:126000,q2_revenue:50000}],
    hint1: "Define two CTEs with commas between them.", hint2: "Join the two CTEs on salesperson.", hint3: "WITH q1 AS (...), q2 AS (...) SELECT q1.salesperson, q1.total AS q1_revenue, q2.total AS q2_revenue FROM q1 JOIN q2 ...",
    solution: "WITH q1 AS (\n  SELECT salesperson, SUM(revenue) AS total FROM sales WHERE quarter = 'Q1' GROUP BY salesperson\n),\nq2 AS (\n  SELECT salesperson, SUM(revenue) AS total FROM sales WHERE quarter = 'Q2' GROUP BY salesperson\n)\nSELECT q1.salesperson, q1.total AS q1_revenue, q2.total AS q2_revenue\nFROM q1\nJOIN q2 ON q1.salesperson = q2.salesperson\nORDER BY q1_revenue DESC;",
    explanation: "Multiple CTEs are separated by commas. Each builds on previous, making complex analytics readable.", relatedQuestions: [109,110], xpReward: 35
  },
  {
    id: 125, title: "Three-Table JOIN", slug: "three-table-join",
    difficulty: "Medium", category: "JOINs", tags: ["JOIN", "Multiple Tables", "Three Tables"], companies: [],
    problemStatement: "Show each employee's name, their department name, and department location.",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"dept_id",type:"INTEGER"},{name:"salary",type:"REAL"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL },
      { tableName: "departments", columns: [{name:"dept_id",type:"INTEGER"},{name:"dept_name",type:"TEXT"},{name:"location",type:"TEXT"}], createSQL: DEPT.createSQL, insertSQL: DEPT.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{emp_name:"Alice Johnson",dept_name:"Engineering",location:"Bangalore"}],
    hint1: "Chain multiple JOINs together.", hint2: "Each JOIN adds another table.", hint3: "FROM employees e JOIN departments d ON e.dept_id = d.dept_id",
    solution: "SELECT e.emp_name, d.dept_name, d.location FROM employees e JOIN departments d ON e.dept_id = d.dept_id ORDER BY d.dept_name, e.emp_name;",
    explanation: "Multiple JOINs can be chained. Each JOIN condition links the new table to an already-joined table.", relatedQuestions: [101,111], xpReward: 25
  },
  {
    id: 126, title: "IN with Subquery", slug: "in-with-subquery",
    difficulty: "Medium", category: "Subqueries", tags: ["IN", "Subquery"], companies: [],
    problemStatement: "Find employees working in departments located in 'Bangalore' or 'Mumbai'.",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"dept_id",type:"INTEGER"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL },
      { tableName: "departments", columns: [{name:"dept_id",type:"INTEGER"},{name:"dept_name",type:"TEXT"},{name:"location",type:"TEXT"}], createSQL: DEPT.createSQL, insertSQL: DEPT.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{emp_name:"Alice Johnson"},{emp_name:"Bob Smith"},{emp_name:"Carol White"}],
    hint1: "Use IN with a subquery to get dept_ids.", hint2: "Filter departments by location first.", hint3: "WHERE dept_id IN (SELECT dept_id FROM departments WHERE location IN ('Bangalore','Mumbai'))",
    solution: "SELECT emp_name FROM employees WHERE dept_id IN (SELECT dept_id FROM departments WHERE location IN ('Bangalore', 'Mumbai')) ORDER BY emp_name;",
    explanation: "IN with subquery is powerful for filtering based on related table conditions without an explicit JOIN.", relatedQuestions: [106,108], xpReward: 25
  },
  {
    id: 127, title: "Percentage of Total Revenue", slug: "pct-of-total",
    difficulty: "Medium", category: "Aggregation", tags: ["Subquery", "Percentage", "Calculation"], companies: [],
    problemStatement: "Show each salesperson's total revenue and what percentage of the overall total they represent.",
    tableStructure: [
      { tableName: "sales", columns: [{name:"sale_id",type:"INTEGER"},{name:"salesperson",type:"TEXT"},{name:"revenue",type:"REAL"}], createSQL: SALES.createSQL, insertSQL: SALES.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{salesperson:"Alice",total:176000,pct:56.8}],
    hint1: "Use a subquery to get grand total.", hint2: "Divide each person's total by grand total.", hint3: "ROUND(SUM(revenue) * 100.0 / (SELECT SUM(revenue) FROM sales), 1)",
    solution: "SELECT salesperson, SUM(revenue) AS total, ROUND(SUM(revenue) * 100.0 / (SELECT SUM(revenue) FROM sales), 1) AS pct FROM sales GROUP BY salesperson ORDER BY total DESC;",
    explanation: "Scalar subquery in SELECT computes grand total. Multiplying by 100.0 ensures floating point division.", relatedQuestions: [109,112], xpReward: 30
  },
  {
    id: 128, title: "Products Ordered More Than Once", slug: "products-ordered-multiple",
    difficulty: "Medium", category: "Aggregation", tags: ["GROUP BY", "HAVING", "COUNT"], companies: [],
    problemStatement: "Find products that appear in more than one order.",
    tableStructure: [
      { tableName: "orders", columns: [{name:"order_id",type:"INTEGER"},{name:"product",type:"TEXT"},{name:"amount",type:"REAL"}], createSQL: ORDERS.createSQL, insertSQL: ORDERS.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{product:"Laptop",order_count:2},{product:"Keyboard",order_count:1}],
    hint1: "Count orders per product.", hint2: "Use HAVING to filter products with count > 1.", hint3: "GROUP BY product HAVING COUNT(*) > 1",
    solution: "SELECT product, COUNT(*) AS order_count FROM orders GROUP BY product HAVING COUNT(*) > 1 ORDER BY order_count DESC;",
    explanation: "HAVING filters after GROUP BY, letting you filter on aggregated values like COUNT.", relatedQuestions: [122,129], xpReward: 25
  },
  {
    id: 129, title: "NULL Handling: COALESCE", slug: "coalesce-null",
    difficulty: "Medium", category: "NULL Handling", tags: ["COALESCE", "NULL", "Functions"], companies: [],
    problemStatement: "Show employees with their manager. Where manager_id is NULL, display 'No Manager'.",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"manager_id",type:"INTEGER"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{emp_name:"Alice Johnson",manager_display:"No Manager"},{emp_name:"Bob Smith",manager_display:"5"}],
    hint1: "COALESCE returns the first non-NULL value.", hint2: "Cast manager_id to TEXT for COALESCE.", hint3: "COALESCE(CAST(manager_id AS TEXT), 'No Manager')",
    solution: "SELECT emp_name, COALESCE(CAST(manager_id AS TEXT), 'No Manager') AS manager_display FROM employees;",
    explanation: "COALESCE returns the first non-NULL argument. Useful for providing default values when data is missing.", relatedQuestions: [130,111], xpReward: 20
  },
  {
    id: 130, title: "NULLIF: Avoid Division by Zero", slug: "nullif-division",
    difficulty: "Medium", category: "NULL Handling", tags: ["NULLIF", "Division", "NULL"], companies: [],
    problemStatement: "Calculate the revenue per order for each salesperson. If orders is 0, show NULL instead of error.",
    tableStructure: [
      { tableName: "sales", columns: [{name:"sale_id",type:"INTEGER"},{name:"salesperson",type:"TEXT"},{name:"revenue",type:"REAL"},{name:"quarter",type:"TEXT"}], createSQL: SALES.createSQL, insertSQL: SALES.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{salesperson:"Alice",total_revenue:176000,avg_per_sale:29333}],
    hint1: "NULLIF returns NULL if two values are equal.", hint2: "Use NULLIF(count, 0) to prevent division by zero.", hint3: "revenue / NULLIF(count, 0)",
    solution: "SELECT salesperson, SUM(revenue) AS total_revenue, ROUND(SUM(revenue) / NULLIF(COUNT(*), 0), 0) AS avg_per_sale FROM sales GROUP BY salesperson ORDER BY total_revenue DESC;",
    explanation: "NULLIF(x, 0) returns NULL when x is 0, avoiding division by zero errors. Dividing by NULL returns NULL safely.", relatedQuestions: [129,127], xpReward: 25
  },
  {
    id: 131, title: "UNION: Combine Two Result Sets", slug: "union-combine",
    difficulty: "Medium", category: "Set Operations", tags: ["UNION", "Set Operations"], companies: [],
    problemStatement: "Create a unified list of names from both employees and customers tables.",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL },
      { tableName: "customers", columns: [{name:"customer_id",type:"INTEGER"},{name:"customer_name",type:"TEXT"}], createSQL: CUSTOMERS.createSQL, insertSQL: CUSTOMERS.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{name:"Aarav Shah",source:"Customer"},{name:"Alice Johnson",source:"Employee"}],
    hint1: "Use UNION to combine SELECT results.", hint2: "Column count and types must match.", hint3: "SELECT emp_name, 'Employee' AS source FROM employees UNION SELECT customer_name, 'Customer' FROM customers",
    solution: "SELECT emp_name AS name, 'Employee' AS source FROM employees UNION SELECT customer_name, 'Customer' AS source FROM customers ORDER BY name;",
    explanation: "UNION combines rows from multiple SELECT statements, removing duplicates. UNION ALL keeps duplicates.", relatedQuestions: [132,101], xpReward: 25
  },
  {
    id: 132, title: "UNION ALL vs UNION", slug: "union-all",
    difficulty: "Medium", category: "Set Operations", tags: ["UNION ALL", "Set Operations"], companies: [],
    problemStatement: "List all cities from both the employees and departments tables (including duplicates).",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"dept_id",type:"INTEGER"},{name:"salary",type:"REAL"},{name:"hire_date",type:"TEXT"},{name:"manager_id",type:"INTEGER"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL },
      { tableName: "departments", columns: [{name:"dept_id",type:"INTEGER"},{name:"dept_name",type:"TEXT"},{name:"budget",type:"REAL"},{name:"location",type:"TEXT"}], createSQL: DEPT.createSQL, insertSQL: DEPT.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{location:"Bangalore"},{location:"Bangalore"},{location:"Mumbai"}],
    hint1: "UNION ALL keeps all rows including duplicates.", hint2: "Use UNION ALL for better performance when duplicates are expected.", hint3: "SELECT location FROM departments UNION ALL SELECT city FROM employees (note: employees uses city column — here use dept location)",
    solution: "SELECT location AS city FROM departments UNION ALL SELECT location AS city FROM departments ORDER BY city;",
    explanation: "UNION removes duplicates (slower). UNION ALL keeps all rows (faster). Use UNION ALL unless you need deduplication.", relatedQuestions: [131,101], xpReward: 20
  },
  {
    id: 133, title: "Top Customer by Revenue", slug: "top-customer-revenue",
    difficulty: "Medium", category: "Subqueries", tags: ["Subquery", "MAX", "JOIN"], companies: [],
    problemStatement: "Find the customer who has spent the most in total.",
    tableStructure: [
      { tableName: "orders", columns: [{name:"order_id",type:"INTEGER"},{name:"customer_id",type:"INTEGER"},{name:"amount",type:"REAL"},{name:"status",type:"TEXT"}], createSQL: ORDERS.createSQL, insertSQL: ORDERS.insertSQL },
      { tableName: "customers", columns: [{name:"customer_id",type:"INTEGER"},{name:"customer_name",type:"TEXT"}], createSQL: CUSTOMERS.createSQL, insertSQL: CUSTOMERS.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{customer_name:"Aarav Shah",total_spent:50000}],
    hint1: "Aggregate total per customer first.", hint2: "Use ORDER BY ... LIMIT 1 for top customer.", hint3: "ORDER BY SUM(amount) DESC LIMIT 1",
    solution: "SELECT c.customer_name, SUM(o.amount) AS total_spent FROM customers c JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.customer_id, c.customer_name ORDER BY total_spent DESC LIMIT 1;",
    explanation: "JOIN + GROUP BY + ORDER BY + LIMIT is a common pattern to find the top performer.", relatedQuestions: [105,107], xpReward: 25
  },
  {
    id: 134, title: "Second Highest Salary", slug: "second-highest-salary",
    difficulty: "Medium", category: "Subqueries", tags: ["Subquery", "DISTINCT", "LIMIT"], companies: [],
    problemStatement: "Find the second highest salary among all employees.",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"salary",type:"REAL"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{second_highest:85000}],
    hint1: "Use DISTINCT to handle ties.", hint2: "Skip 1 and take the next with OFFSET.", hint3: "SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1",
    solution: "SELECT DISTINCT salary AS second_highest FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1;",
    explanation: "OFFSET skips N rows. LIMIT 1 OFFSET 1 skips the first (highest) and returns the next one.", relatedQuestions: [106,133], xpReward: 30
  },
  {
    id: 135, title: "Department Budget vs Payroll", slug: "budget-vs-payroll",
    difficulty: "Medium", category: "JOINs", tags: ["JOIN", "SUM", "Comparison"], companies: [],
    problemStatement: "Show each department's budget and total employee payroll, and flag if payroll exceeds budget.",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"dept_id",type:"INTEGER"},{name:"salary",type:"REAL"}], createSQL: EMP.createSQL, insertSQL: EMP.insertSQL },
      { tableName: "departments", columns: [{name:"dept_id",type:"INTEGER"},{name:"dept_name",type:"TEXT"},{name:"budget",type:"REAL"}], createSQL: DEPT.createSQL, insertSQL: DEPT.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{dept_name:"Engineering",budget:500000,payroll:255000,over_budget:"No"}],
    hint1: "JOIN and GROUP BY department.", hint2: "Use CASE to flag over-budget.", hint3: "CASE WHEN SUM(salary) > d.budget THEN 'Yes' ELSE 'No' END",
    solution: "SELECT d.dept_name, d.budget, SUM(e.salary) AS payroll, CASE WHEN SUM(e.salary) > d.budget THEN 'Yes' ELSE 'No' END AS over_budget FROM departments d LEFT JOIN employees e ON d.dept_id = e.dept_id GROUP BY d.dept_id, d.dept_name, d.budget ORDER BY payroll DESC;",
    explanation: "Combining JOIN, GROUP BY, and CASE allows complex analysis. LEFT JOIN includes departments with no employees.", relatedQuestions: [120,125], xpReward: 35
  },
];
