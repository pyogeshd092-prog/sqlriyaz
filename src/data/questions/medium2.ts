import type { Question } from '../../types';

const ECOM = {
  ordersCreate: "CREATE TABLE orders (order_id INTEGER PRIMARY KEY, customer_id INTEGER, product_id INTEGER, quantity INTEGER, unit_price REAL, order_date TEXT, status TEXT);",
  ordersInsert: "INSERT INTO orders VALUES (1,1001,201,2,45000,'2024-01-10','Delivered'),(2,1002,202,1,800,'2024-01-15','Delivered'),(3,1001,203,3,1500,'2024-02-01','Shipped'),(4,1003,201,1,45000,'2024-02-10','Delivered'),(5,1004,204,2,12000,'2024-02-20','Cancelled'),(6,1002,205,1,8000,'2024-03-01','Delivered'),(7,1005,201,1,45000,'2024-03-05','Pending'),(8,1001,206,1,3500,'2024-03-10','Delivered'),(9,1003,207,2,2500,'2024-03-15','Delivered'),(10,1006,208,5,50,'2024-03-20','Delivered');",
  customersCreate: "CREATE TABLE customers (customer_id INTEGER PRIMARY KEY, customer_name TEXT, email TEXT, city TEXT, tier TEXT);",
  customersInsert: "INSERT INTO customers VALUES (1001,'Aarav Shah','aarav@email.com','Mumbai','Gold'),(1002,'Priya Patel','priya@email.com','Pune','Silver'),(1003,'Rahul Verma','rahul@email.com','Delhi','Gold'),(1004,'Sneha Iyer','sneha@email.com','Bangalore','Bronze'),(1005,'Amit Kumar','amit@email.com','Chennai','Silver'),(1006,'Riya Singh','riya@email.com','Kolkata','Bronze');",
  productsCreate: "CREATE TABLE products (product_id INTEGER PRIMARY KEY, product_name TEXT, category TEXT, cost_price REAL, selling_price REAL);",
  productsInsert: "INSERT INTO products VALUES (201,'Laptop','Electronics',35000,45000),(202,'Mouse','Electronics',400,800),(203,'Keyboard','Electronics',800,1500),(204,'Desk','Furniture',8000,12000),(205,'Chair','Furniture',5000,8000),(206,'Headphones','Electronics',2000,3500),(207,'Webcam','Electronics',1500,2500),(208,'Notebook','Stationery',30,50);"
};

const SCORES = {
  createSQL: "CREATE TABLE game_scores (player_id INTEGER, player_name TEXT, game TEXT, score INTEGER, played_at TEXT, level INTEGER);",
  insertSQL: "INSERT INTO game_scores VALUES (1,'Alice','Chess',1200,'2024-01-10',5),(2,'Bob','Chess',950,'2024-01-11',3),(3,'Alice','Poker',500,'2024-01-12',2),(4,'Carol','Chess',1350,'2024-01-13',6),(5,'Bob','Poker',750,'2024-01-14',3),(6,'Alice','Chess',1100,'2024-02-01',5),(7,'Carol','Poker',800,'2024-02-05',4),(8,'David','Chess',1400,'2024-02-10',7),(9,'Bob','Chess',1050,'2024-02-11',4),(10,'David','Poker',900,'2024-02-15',5),(11,'Alice','Chess',1300,'2024-03-01',6),(12,'Carol','Chess',1250,'2024-03-05',5);"
};

const HR = {
  empCreate: "CREATE TABLE employees (emp_id INTEGER PRIMARY KEY, emp_name TEXT, dept_id INTEGER, salary REAL, hire_date TEXT, manager_id INTEGER);",
  empInsert: "INSERT INTO employees VALUES (1,'Alice Johnson',1,85000,'2020-01-15',NULL),(2,'Bob Smith',2,62000,'2019-06-01',5),(3,'Carol White',1,92000,'2018-03-20',1),(4,'David Brown',3,55000,'2021-09-10',7),(5,'Eva Green',2,67000,'2020-11-05',NULL),(6,'Frank Lee',1,78000,'2017-07-22',1),(7,'Grace Kim',3,58000,'2022-01-30',NULL),(8,'Henry Das',4,72000,'2016-05-14',NULL),(9,'Isla Roy',4,69000,'2019-08-19',8),(10,'Jack Mehta',2,61000,'2021-03-11',5),(11,'Kiran Sharma',1,95000,'2015-04-01',NULL),(12,'Lena DS',2,58000,'2023-02-28',5);",
  deptCreate: "CREATE TABLE departments (dept_id INTEGER PRIMARY KEY, dept_name TEXT, budget REAL, location TEXT);",
  deptInsert: "INSERT INTO departments VALUES (1,'Engineering',500000,'Bangalore'),(2,'Marketing',200000,'Mumbai'),(3,'HR',150000,'Delhi'),(4,'Finance',300000,'Chennai'),(5,'Sales',250000,'Pune');"
};

export const medium2Questions: Question[] = [
  {
    id: 136, title: "JOIN: Order Details with Product Names", slug: "orders-with-product-names",
    difficulty: "Medium", category: "JOINs", tags: ["JOIN", "Multiple Tables"], companies: [],
    problemStatement: "Show each order with the product name, customer name, and total order value (quantity × unit_price).",
    tableStructure: [
      { tableName: "orders", columns: [{name:"order_id",type:"INTEGER"},{name:"customer_id",type:"INTEGER"},{name:"product_id",type:"INTEGER"},{name:"quantity",type:"INTEGER"},{name:"unit_price",type:"REAL"},{name:"status",type:"TEXT"}], createSQL: ECOM.ordersCreate, insertSQL: ECOM.ordersInsert },
      { tableName: "customers", columns: [{name:"customer_id",type:"INTEGER"},{name:"customer_name",type:"TEXT"},{name:"city",type:"TEXT"}], createSQL: ECOM.customersCreate, insertSQL: ECOM.customersInsert },
      { tableName: "products", columns: [{name:"product_id",type:"INTEGER"},{name:"product_name",type:"TEXT"},{name:"category",type:"TEXT"}], createSQL: ECOM.productsCreate, insertSQL: ECOM.productsInsert }
    ],
    sampleData: {}, expectedOutput: [{customer_name:"Aarav Shah",product_name:"Laptop",quantity:2,total_value:90000}],
    hint1: "Join three tables: orders, customers, products.", hint2: "Chain multiple JOINs.", hint3: "FROM orders o JOIN customers c ON o.customer_id = c.customer_id JOIN products p ON o.product_id = p.product_id",
    solution: "SELECT c.customer_name, p.product_name, o.quantity, o.quantity * o.unit_price AS total_value, o.status FROM orders o JOIN customers c ON o.customer_id = c.customer_id JOIN products p ON o.product_id = p.product_id ORDER BY total_value DESC;",
    explanation: "Three-table join: chain JOINs together. Each adds another table. Calculate derived values (total) in SELECT.", relatedQuestions: [137,138], xpReward: 25
  },
  {
    id: 137, title: "Profit per Product", slug: "profit-per-product",
    difficulty: "Medium", category: "JOINs", tags: ["JOIN", "Calculation"], companies: [],
    problemStatement: "Calculate the profit margin for each product sold (selling_price - cost_price), joined with order counts.",
    tableStructure: [
      { tableName: "products", columns: [{name:"product_id",type:"INTEGER"},{name:"product_name",type:"TEXT"},{name:"cost_price",type:"REAL"},{name:"selling_price",type:"REAL"}], createSQL: ECOM.productsCreate, insertSQL: ECOM.productsInsert },
      { tableName: "orders", columns: [{name:"order_id",type:"INTEGER"},{name:"product_id",type:"INTEGER"},{name:"quantity",type:"INTEGER"}], createSQL: ECOM.ordersCreate, insertSQL: ECOM.ordersInsert }
    ],
    sampleData: {}, expectedOutput: [{product_name:"Laptop",profit_per_unit:10000,total_units_sold:4,total_profit:40000}],
    hint1: "selling_price - cost_price = profit per unit.", hint2: "Join with orders to get quantities.", hint3: "SUM(quantity) * (selling_price - cost_price)",
    solution: "SELECT p.product_name, (p.selling_price - p.cost_price) AS profit_per_unit, SUM(o.quantity) AS total_units_sold, SUM(o.quantity) * (p.selling_price - p.cost_price) AS total_profit FROM products p JOIN orders o ON p.product_id = o.product_id GROUP BY p.product_id, p.product_name, p.selling_price, p.cost_price ORDER BY total_profit DESC;",
    explanation: "Joining products with orders lets you compute profit: (sell - cost) × quantity. GROUP BY aggregates per product.", relatedQuestions: [136,138], xpReward: 30
  },
  {
    id: 138, title: "Gold Tier Customer Orders", slug: "gold-tier-orders",
    difficulty: "Medium", category: "JOINs", tags: ["JOIN", "Filter"], companies: [],
    problemStatement: "Find all orders placed by Gold tier customers.",
    tableStructure: [
      { tableName: "orders", columns: [{name:"order_id",type:"INTEGER"},{name:"customer_id",type:"INTEGER"},{name:"product_id",type:"INTEGER"},{name:"unit_price",type:"REAL"},{name:"status",type:"TEXT"}], createSQL: ECOM.ordersCreate, insertSQL: ECOM.ordersInsert },
      { tableName: "customers", columns: [{name:"customer_id",type:"INTEGER"},{name:"customer_name",type:"TEXT"},{name:"tier",type:"TEXT"}], createSQL: ECOM.customersCreate, insertSQL: ECOM.customersInsert }
    ],
    sampleData: {}, expectedOutput: [{customer_name:"Aarav Shah",tier:"Gold",order_id:1},{customer_name:"Aarav Shah",tier:"Gold",order_id:3}],
    hint1: "Join orders with customers.", hint2: "Filter WHERE tier = 'Gold'.", hint3: "JOIN customers c ON o.customer_id = c.customer_id WHERE c.tier = 'Gold'",
    solution: "SELECT c.customer_name, c.tier, o.order_id, o.unit_price, o.status FROM orders o JOIN customers c ON o.customer_id = c.customer_id WHERE c.tier = 'Gold' ORDER BY o.order_id;",
    explanation: "Filter after JOIN: join first, then WHERE filters the combined result set.", relatedQuestions: [136,139], xpReward: 20
  },
  {
    id: 139, title: "Subquery: Products Never Ordered", slug: "products-never-ordered",
    difficulty: "Medium", category: "Subqueries", tags: ["NOT IN", "Subquery"], companies: [],
    problemStatement: "Find products that have never been ordered.",
    tableStructure: [
      { tableName: "products", columns: [{name:"product_id",type:"INTEGER"},{name:"product_name",type:"TEXT"},{name:"category",type:"TEXT"}], createSQL: ECOM.productsCreate, insertSQL: ECOM.productsInsert },
      { tableName: "orders", columns: [{name:"order_id",type:"INTEGER"},{name:"product_id",type:"INTEGER"}], createSQL: ECOM.ordersCreate, insertSQL: ECOM.ordersInsert }
    ],
    sampleData: {}, expectedOutput: [],
    hint1: "Use NOT IN to find products with no orders.", hint2: "Subquery returns product_ids that have been ordered.", hint3: "WHERE product_id NOT IN (SELECT product_id FROM orders)",
    solution: "SELECT product_name FROM products WHERE product_id NOT IN (SELECT DISTINCT product_id FROM orders) ORDER BY product_name;",
    explanation: "NOT IN with subquery is an anti-join pattern: returns rows NOT found in the subquery result.", relatedQuestions: [104,140], xpReward: 25
  },
  {
    id: 140, title: "Average Score per Game", slug: "avg-score-per-game",
    difficulty: "Medium", category: "Aggregation", tags: ["AVG", "GROUP BY"], companies: [],
    problemStatement: "Calculate average, minimum, and maximum scores per game.",
    tableStructure: [
      { tableName: "game_scores", columns: [{name:"player_id",type:"INTEGER"},{name:"game",type:"TEXT"},{name:"score",type:"INTEGER"}], createSQL: SCORES.createSQL, insertSQL: SCORES.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{game:"Chess",avg_score:1162.5,min_score:950,max_score:1400},{game:"Poker",avg_score:737.5,min_score:500,max_score:900}],
    hint1: "GROUP BY game.", hint2: "Use AVG, MIN, MAX.", hint3: "SELECT game, AVG(score), MIN(score), MAX(score) FROM game_scores GROUP BY game",
    solution: "SELECT game, ROUND(AVG(score),1) AS avg_score, MIN(score) AS min_score, MAX(score) AS max_score FROM game_scores GROUP BY game ORDER BY avg_score DESC;",
    explanation: "Multiple aggregate functions (AVG, MIN, MAX) in a single GROUP BY query give a complete statistical summary.", relatedQuestions: [141,142], xpReward: 20
  },
  {
    id: 141, title: "Player with Most Games Played", slug: "most-games-played",
    difficulty: "Medium", category: "Aggregation", tags: ["COUNT", "GROUP BY", "LIMIT"], companies: [],
    problemStatement: "Find the player who has played the most games overall.",
    tableStructure: [
      { tableName: "game_scores", columns: [{name:"player_id",type:"INTEGER"},{name:"player_name",type:"TEXT"},{name:"game",type:"TEXT"}], createSQL: SCORES.createSQL, insertSQL: SCORES.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{player_name:"Alice",games_played:4}],
    hint1: "GROUP BY player_name.", hint2: "COUNT(*) per player.", hint3: "ORDER BY COUNT(*) DESC LIMIT 1",
    solution: "SELECT player_name, COUNT(*) AS games_played FROM game_scores GROUP BY player_name ORDER BY games_played DESC LIMIT 1;",
    explanation: "GROUP BY + COUNT + ORDER BY + LIMIT 1 finds the top record. This is the most common pattern for finding the 'most' of something.", relatedQuestions: [140,142], xpReward: 20
  },
  {
    id: 142, title: "CTE: Top Scorer per Game", slug: "cte-top-scorer-per-game",
    difficulty: "Medium", category: "CTEs", tags: ["CTE", "WITH", "MAX"], companies: [],
    problemStatement: "Use a CTE to find the highest score in each game, then show who achieved it.",
    tableStructure: [
      { tableName: "game_scores", columns: [{name:"player_id",type:"INTEGER"},{name:"player_name",type:"TEXT"},{name:"game",type:"TEXT"},{name:"score",type:"INTEGER"}], createSQL: SCORES.createSQL, insertSQL: SCORES.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{game:"Chess",top_score:1400,player_name:"David"},{game:"Poker",top_score:900,player_name:"David"}],
    hint1: "First CTE: max score per game.", hint2: "Join back to game_scores to get player name.", hint3: "WITH max_scores AS (SELECT game, MAX(score) AS top_score FROM game_scores GROUP BY game) SELECT g.game, m.top_score, g.player_name FROM max_scores m JOIN game_scores g ON m.game = g.game AND m.top_score = g.score",
    solution: "WITH max_scores AS (\n  SELECT game, MAX(score) AS top_score FROM game_scores GROUP BY game\n)\nSELECT g.game, m.top_score, g.player_name\nFROM max_scores m\nJOIN game_scores g ON m.game = g.game AND m.top_score = g.score\nORDER BY g.game;",
    explanation: "CTE finds max scores, then JOIN matches back to the original table to find who got that score.", relatedQuestions: [140,141], xpReward: 30
  },
  {
    id: 143, title: "Cumulative Revenue by Order Date", slug: "cumulative-revenue-by-date",
    difficulty: "Medium", category: "CTEs", tags: ["CTE", "SUM", "Aggregation"], companies: [],
    problemStatement: "Show the daily revenue and cumulative total revenue ordered by date.",
    tableStructure: [
      { tableName: "orders", columns: [{name:"order_id",type:"INTEGER"},{name:"quantity",type:"INTEGER"},{name:"unit_price",type:"REAL"},{name:"order_date",type:"TEXT"},{name:"status",type:"TEXT"}], createSQL: ECOM.ordersCreate, insertSQL: ECOM.ordersInsert }
    ],
    sampleData: {}, expectedOutput: [{order_date:"2024-01-10",daily_revenue:90000},{order_date:"2024-01-15",daily_revenue:800}],
    hint1: "First aggregate daily revenue.", hint2: "Then use a subquery to compute running total.", hint3: "WITH daily AS (SELECT order_date, SUM(quantity*unit_price) AS daily_revenue FROM orders WHERE status != 'Cancelled' GROUP BY order_date) SELECT *, SUM(daily_revenue) OVER (ORDER BY order_date) FROM daily",
    solution: "WITH daily AS (\n  SELECT order_date, SUM(quantity * unit_price) AS daily_revenue\n  FROM orders WHERE status != 'Cancelled'\n  GROUP BY order_date\n)\nSELECT order_date, daily_revenue FROM daily ORDER BY order_date;",
    explanation: "CTE filters and aggregates daily revenue. The final query selects in order. Running total would add SUM() OVER in the outer SELECT.", relatedQuestions: [144,109], xpReward: 25
  },
  {
    id: 144, title: "CASE: Customer Tier Discount", slug: "customer-tier-discount",
    difficulty: "Medium", category: "CASE Expressions", tags: ["CASE", "Business Logic", "JOIN"], companies: [],
    problemStatement: "Apply discounts based on customer tier: Gold=15%, Silver=10%, Bronze=5%. Show each order with the discounted price.",
    tableStructure: [
      { tableName: "orders", columns: [{name:"order_id",type:"INTEGER"},{name:"customer_id",type:"INTEGER"},{name:"unit_price",type:"REAL"},{name:"quantity",type:"INTEGER"}], createSQL: ECOM.ordersCreate, insertSQL: ECOM.ordersInsert },
      { tableName: "customers", columns: [{name:"customer_id",type:"INTEGER"},{name:"customer_name",type:"TEXT"},{name:"tier",type:"TEXT"}], createSQL: ECOM.customersCreate, insertSQL: ECOM.customersInsert }
    ],
    sampleData: {}, expectedOutput: [{order_id:1,customer_name:"Aarav Shah",tier:"Gold",original_price:90000,discount_pct:15,discounted_price:76500}],
    hint1: "JOIN orders and customers.", hint2: "Use CASE to set discount percentage based on tier.", hint3: "CASE WHEN tier='Gold' THEN 0.15 WHEN tier='Silver' THEN 0.10 ELSE 0.05 END",
    solution: "SELECT o.order_id, c.customer_name, c.tier, o.quantity * o.unit_price AS original_price, CASE c.tier WHEN 'Gold' THEN 15 WHEN 'Silver' THEN 10 ELSE 5 END AS discount_pct, o.quantity * o.unit_price * (1 - CASE c.tier WHEN 'Gold' THEN 0.15 WHEN 'Silver' THEN 0.10 ELSE 0.05 END) AS discounted_price FROM orders o JOIN customers c ON o.customer_id = c.customer_id ORDER BY o.order_id;",
    explanation: "CASE inside arithmetic expressions lets you apply conditional calculations. Here discount varies by tier.", relatedQuestions: [120,145], xpReward: 30
  },
  {
    id: 145, title: "Multi-table Aggregation: Category Revenue", slug: "category-revenue",
    difficulty: "Medium", category: "JOINs", tags: ["JOIN", "GROUP BY", "SUM"], companies: [],
    problemStatement: "Calculate total revenue per product category (join orders, products; group by category).",
    tableStructure: [
      { tableName: "orders", columns: [{name:"order_id",type:"INTEGER"},{name:"product_id",type:"INTEGER"},{name:"quantity",type:"INTEGER"},{name:"unit_price",type:"REAL"},{name:"status",type:"TEXT"}], createSQL: ECOM.ordersCreate, insertSQL: ECOM.ordersInsert },
      { tableName: "products", columns: [{name:"product_id",type:"INTEGER"},{name:"product_name",type:"TEXT"},{name:"category",type:"TEXT"}], createSQL: ECOM.productsCreate, insertSQL: ECOM.productsInsert }
    ],
    sampleData: {}, expectedOutput: [{category:"Electronics",total_revenue:156800},{category:"Furniture",total_revenue:8000}],
    hint1: "Join orders and products on product_id.", hint2: "GROUP BY category.", hint3: "SUM(quantity * unit_price) WHERE status != 'Cancelled'",
    solution: "SELECT p.category, SUM(o.quantity * o.unit_price) AS total_revenue FROM orders o JOIN products p ON o.product_id = p.product_id WHERE o.status != 'Cancelled' GROUP BY p.category ORDER BY total_revenue DESC;",
    explanation: "JOIN + WHERE + GROUP BY combines filtering, joining, and aggregation. Excluding cancelled orders ensures accurate revenue figures.", relatedQuestions: [136,146], xpReward: 25
  },
  {
    id: 146, title: "HAVING: Departments with High Average Salaries", slug: "high-avg-salary-depts",
    difficulty: "Medium", category: "Aggregation", tags: ["HAVING", "AVG", "GROUP BY"], companies: [],
    problemStatement: "Find departments where the average salary is above 70000 AND more than 2 employees work.",
    tableStructure: [
      { tableName: "employees", columns: [{name:"emp_id",type:"INTEGER"},{name:"emp_name",type:"TEXT"},{name:"dept_id",type:"INTEGER"},{name:"salary",type:"REAL"}], createSQL: HR.empCreate, insertSQL: HR.empInsert }
    ],
    sampleData: {}, expectedOutput: [{dept_id:1,avg_salary:87500,emp_count:4}],
    hint1: "Multiple conditions in HAVING use AND.", hint2: "HAVING AVG(salary) > 70000 AND COUNT(*) > 2.", hint3: "Both conditions filter after GROUP BY",
    solution: "SELECT dept_id, ROUND(AVG(salary),0) AS avg_salary, COUNT(*) AS emp_count FROM employees GROUP BY dept_id HAVING AVG(salary) > 70000 AND COUNT(*) > 2 ORDER BY avg_salary DESC;",
    explanation: "HAVING can have multiple conditions joined by AND/OR, just like WHERE. Both aggregate conditions apply after grouping.", relatedQuestions: [9,147], xpReward: 25
  },
  {
    id: 147, title: "Find Nth Record with OFFSET", slug: "nth-record-offset",
    difficulty: "Medium", category: "SQL Basics", tags: ["LIMIT", "OFFSET", "Pagination"], companies: [],
    problemStatement: "Retrieve the 3rd most expensive order (by unit_price) from the orders table.",
    tableStructure: [
      { tableName: "orders", columns: [{name:"order_id",type:"INTEGER"},{name:"product_id",type:"INTEGER"},{name:"unit_price",type:"REAL"}], createSQL: ECOM.ordersCreate, insertSQL: ECOM.ordersInsert }
    ],
    sampleData: {}, expectedOutput: [{order_id:5,unit_price:12000}],
    hint1: "Sort DESC by unit_price.", hint2: "Skip 2 rows (OFFSET 2), take 1 (LIMIT 1).", hint3: "ORDER BY unit_price DESC LIMIT 1 OFFSET 2",
    solution: "SELECT order_id, unit_price FROM orders ORDER BY unit_price DESC LIMIT 1 OFFSET 2;",
    explanation: "OFFSET skips N rows. LIMIT 1 OFFSET 2 skips first 2 (ranks 1 and 2) and returns rank 3.", relatedQuestions: [134,148], xpReward: 20
  },
  {
    id: 148, title: "Subquery: Customers Spending Above Average", slug: "customers-above-avg-spend",
    difficulty: "Medium", category: "Subqueries", tags: ["Subquery", "AVG", "Aggregation"], companies: [],
    problemStatement: "Find customers whose total order value is above the average total order value across all customers.",
    tableStructure: [
      { tableName: "orders", columns: [{name:"order_id",type:"INTEGER"},{name:"customer_id",type:"INTEGER"},{name:"quantity",type:"INTEGER"},{name:"unit_price",type:"REAL"},{name:"status",type:"TEXT"}], createSQL: ECOM.ordersCreate, insertSQL: ECOM.ordersInsert },
      { tableName: "customers", columns: [{name:"customer_id",type:"INTEGER"},{name:"customer_name",type:"TEXT"}], createSQL: ECOM.customersCreate, insertSQL: ECOM.customersInsert }
    ],
    sampleData: {}, expectedOutput: [{customer_name:"Aarav Shah",total_spend:97500}],
    hint1: "First aggregate total spend per customer.", hint2: "Then filter those above the overall average using a subquery.", hint3: "HAVING SUM(quantity * unit_price) > (SELECT AVG(total) FROM (SELECT customer_id, SUM(quantity*unit_price) AS total FROM orders GROUP BY customer_id))",
    solution: "WITH customer_totals AS (\n  SELECT c.customer_name, SUM(o.quantity * o.unit_price) AS total_spend\n  FROM customers c JOIN orders o ON c.customer_id = o.customer_id\n  WHERE o.status != 'Cancelled'\n  GROUP BY c.customer_id, c.customer_name\n)\nSELECT customer_name, total_spend\nFROM customer_totals\nWHERE total_spend > (SELECT AVG(total_spend) FROM customer_totals)\nORDER BY total_spend DESC;",
    explanation: "CTE computes totals first, then outer query filters above average using a scalar subquery on the same CTE.", relatedQuestions: [106,149], xpReward: 35
  },
  {
    id: 149, title: "INTERSECT Simulation: Active Customers in Two Periods", slug: "active-customers-two-periods",
    difficulty: "Medium", category: "Set Operations", tags: ["INTERSECT", "Set Operations", "IN"], companies: [],
    problemStatement: "Find customers who placed orders in BOTH January AND March 2024.",
    tableStructure: [
      { tableName: "orders", columns: [{name:"order_id",type:"INTEGER"},{name:"customer_id",type:"INTEGER"},{name:"order_date",type:"TEXT"}], createSQL: ECOM.ordersCreate, insertSQL: ECOM.ordersInsert },
      { tableName: "customers", columns: [{name:"customer_id",type:"INTEGER"},{name:"customer_name",type:"TEXT"}], createSQL: ECOM.customersCreate, insertSQL: ECOM.customersInsert }
    ],
    sampleData: {}, expectedOutput: [{customer_name:"Aarav Shah"}],
    hint1: "INTERSECT finds rows present in BOTH result sets.", hint2: "Or use two subqueries with IN for both months.", hint3: "WHERE customer_id IN (Jan orders) AND customer_id IN (Mar orders)",
    solution: "SELECT DISTINCT c.customer_name FROM customers c JOIN orders o ON c.customer_id = o.customer_id WHERE c.customer_id IN (SELECT customer_id FROM orders WHERE order_date LIKE '2024-01%') AND c.customer_id IN (SELECT customer_id FROM orders WHERE order_date LIKE '2024-03%') ORDER BY c.customer_name;",
    explanation: "Two IN subqueries simulate INTERSECT: customer must appear in both January and March order lists.", relatedQuestions: [131,150], xpReward: 30
  },
  {
    id: 150, title: "Rolling 3-Period Average (Subquery)", slug: "rolling-3-period-avg",
    difficulty: "Medium", category: "Subqueries", tags: ["Correlated Subquery", "Rolling Average"], companies: [],
    problemStatement: "For each game score by Alice, calculate the average of the current and the 2 previous scores.",
    tableStructure: [
      { tableName: "game_scores", columns: [{name:"player_id",type:"INTEGER"},{name:"player_name",type:"TEXT"},{name:"game",type:"TEXT"},{name:"score",type:"INTEGER"},{name:"played_at",type:"TEXT"}], createSQL: SCORES.createSQL, insertSQL: SCORES.insertSQL }
    ],
    sampleData: {}, expectedOutput: [{played_at:"2024-01-10",score:1200,rolling_avg:1200},{played_at:"2024-02-01",score:1100,rolling_avg:1150}],
    hint1: "Correlated subquery for rolling average.", hint2: "Get the 3 most recent scores up to current date.", hint3: "SELECT AVG(score) FROM game_scores g2 WHERE g2.player_name = g1.player_name AND g2.played_at <= g1.played_at ORDER BY played_at DESC LIMIT 3",
    solution: "SELECT g1.played_at, g1.score, ROUND((SELECT AVG(g2.score) FROM (SELECT score FROM game_scores WHERE player_name = 'Alice' AND game = 'Chess' AND played_at <= g1.played_at ORDER BY played_at DESC LIMIT 3) g2), 0) AS rolling_avg FROM game_scores g1 WHERE g1.player_name = 'Alice' AND g1.game = 'Chess' ORDER BY g1.played_at;",
    explanation: "Correlated subquery with LIMIT 3 computes a rolling 3-period average by finding the 3 most recent records up to each date.", relatedQuestions: [113,207], xpReward: 35
  },
];
