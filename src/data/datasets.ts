import type { Dataset } from '../types';

export const datasets: Dataset[] = [
  {
    id: "employees",
    name: "Employees Database",
    description: "A classic HR dataset with employees, departments, salaries, and managers.",
    category: "HR",
    rows: 25,
    tables: [
      {
        tableName: "employees",
        columns: [
          { name: "emp_id", type: "INTEGER" },
          { name: "emp_name", type: "TEXT" },
          { name: "department", type: "TEXT" },
          { name: "salary", type: "REAL" },
          { name: "manager_id", type: "INTEGER", nullable: true },
          { name: "hire_date", type: "TEXT" }
        ],
        createSQL: "CREATE TABLE employees (emp_id INTEGER PRIMARY KEY, emp_name TEXT NOT NULL, department TEXT, salary REAL, manager_id INTEGER, hire_date TEXT);",
        insertSQL: "INSERT INTO employees VALUES (1,'Rajan Mehta','Engineering',95000,NULL,'2018-01-15'),(2,'Anjali Rao','Engineering',85000,1,'2019-03-20'),(3,'Suresh Kumar','Marketing',72000,NULL,'2017-06-01'),(4,'Priya Shah','Engineering',78000,1,'2020-07-10'),(5,'Arjun Patel','Marketing',65000,3,'2021-02-14'),(6,'Meera Joshi','HR',58000,NULL,'2018-11-05'),(7,'Vijay Nair','Engineering',88000,1,'2019-08-22'),(8,'Kavitha Reddy','Marketing',70000,3,'2020-01-30'),(9,'Rohit Singh','HR',52000,6,'2022-04-18'),(10,'Sunita Gupta','Finance',82000,NULL,'2018-05-12');"
      },
      {
        tableName: "departments",
        columns: [
          { name: "dept_id", type: "INTEGER" },
          { name: "dept_name", type: "TEXT" },
          { name: "location", type: "TEXT" },
          { name: "budget", type: "REAL" }
        ],
        createSQL: "CREATE TABLE departments (dept_id INTEGER PRIMARY KEY, dept_name TEXT, location TEXT, budget REAL);",
        insertSQL: "INSERT INTO departments VALUES (1,'Engineering','Mumbai',5000000),(2,'Marketing','Delhi',2000000),(3,'HR','Bangalore',1000000),(4,'Finance','Mumbai',3000000);"
      }
    ]
  },
  {
    id: "ecommerce",
    name: "E-Commerce Database",
    description: "Online shopping data with customers, products, orders, and reviews.",
    category: "E-Commerce",
    rows: 50,
    tables: [
      {
        tableName: "customers",
        columns: [
          { name: "customer_id", type: "INTEGER" },
          { name: "customer_name", type: "TEXT" },
          { name: "email", type: "TEXT" },
          { name: "city", type: "TEXT" },
          { name: "signup_date", type: "TEXT" }
        ],
        createSQL: "CREATE TABLE customers (customer_id INTEGER PRIMARY KEY, customer_name TEXT, email TEXT UNIQUE, city TEXT, signup_date TEXT);",
        insertSQL: "INSERT INTO customers VALUES (1,'Raj Sharma','raj@email.com','Mumbai','2023-01-10'),(2,'Priya Patel','priya@email.com','Delhi','2023-02-15'),(3,'Amit Singh','amit@email.com','Bangalore','2023-01-20'),(4,'Sneha Gupta','sneha@email.com','Chennai','2023-03-05'),(5,'Kiran Rao','kiran@email.com','Hyderabad','2023-04-12');"
      },
      {
        tableName: "products",
        columns: [
          { name: "product_id", type: "INTEGER" },
          { name: "product_name", type: "TEXT" },
          { name: "category", type: "TEXT" },
          { name: "price", type: "REAL" },
          { name: "stock", type: "INTEGER" }
        ],
        createSQL: "CREATE TABLE products (product_id INTEGER PRIMARY KEY, product_name TEXT, category TEXT, price REAL, stock INTEGER);",
        insertSQL: "INSERT INTO products VALUES (1,'Laptop Pro 15','Electronics',65000,50),(2,'Wireless Mouse','Electronics',1200,200),(3,'Office Chair','Furniture',8500,30),(4,'Standing Desk','Furniture',15000,20),(5,'Python Book','Books',450,500),(6,'SQL Mastery Guide','Books',350,300);"
      },
      {
        tableName: "orders",
        columns: [
          { name: "order_id", type: "INTEGER" },
          { name: "customer_id", type: "INTEGER" },
          { name: "order_date", type: "TEXT" },
          { name: "total_amount", type: "REAL" },
          { name: "status", type: "TEXT" }
        ],
        createSQL: "CREATE TABLE orders (order_id INTEGER PRIMARY KEY, customer_id INTEGER, order_date TEXT, total_amount REAL, status TEXT);",
        insertSQL: "INSERT INTO orders VALUES (1,1,'2024-01-05',66200,'Delivered'),(2,2,'2024-01-10',1200,'Delivered'),(3,1,'2024-02-15',8500,'Delivered'),(4,3,'2024-02-20',65800,'Shipped'),(5,4,'2024-03-01',450,'Delivered'),(6,5,'2024-03-10',16200,'Processing'),(7,2,'2024-03-15',350,'Delivered'),(8,1,'2024-04-01',1550,'Delivered');"
      }
    ]
  },
  {
    id: "banking",
    name: "Banking Database",
    description: "Bank accounts, transactions, loans, and customer data for financial SQL practice.",
    category: "Finance",
    rows: 40,
    tables: [
      {
        tableName: "accounts",
        columns: [
          { name: "account_id", type: "INTEGER" },
          { name: "customer_name", type: "TEXT" },
          { name: "account_type", type: "TEXT" },
          { name: "balance", type: "REAL" },
          { name: "opened_date", type: "TEXT" }
        ],
        createSQL: "CREATE TABLE accounts (account_id INTEGER PRIMARY KEY, customer_name TEXT, account_type TEXT, balance REAL, opened_date TEXT);",
        insertSQL: "INSERT INTO accounts VALUES (1001,'Rahul Verma','Savings',125000,'2020-01-10'),(1002,'Nisha Sharma','Current',850000,'2019-06-15'),(1003,'Ajay Kumar','Savings',45000,'2021-03-22'),(1004,'Pooja Mehta','Savings',280000,'2018-11-01'),(1005,'Deepak Rao','Current',1200000,'2017-08-20');"
      },
      {
        tableName: "transactions",
        columns: [
          { name: "txn_id", type: "INTEGER" },
          { name: "account_id", type: "INTEGER" },
          { name: "txn_type", type: "TEXT" },
          { name: "amount", type: "REAL" },
          { name: "txn_date", type: "TEXT" },
          { name: "description", type: "TEXT" }
        ],
        createSQL: "CREATE TABLE transactions (txn_id INTEGER PRIMARY KEY, account_id INTEGER, txn_type TEXT, amount REAL, txn_date TEXT, description TEXT);",
        insertSQL: "INSERT INTO transactions VALUES (1,1001,'Credit',50000,'2024-01-05','Salary'),(2,1001,'Debit',12000,'2024-01-10','Rent'),(3,1002,'Credit',200000,'2024-01-08','Client Payment'),(4,1003,'Credit',30000,'2024-01-15','Transfer'),(5,1004,'Debit',5000,'2024-01-20','Utility Bill'),(6,1001,'Debit',3000,'2024-01-25','Grocery'),(7,1005,'Credit',500000,'2024-02-01','Investment');"
      }
    ]
  },
  {
    id: "sales",
    name: "Sales & Revenue Database",
    description: "Sales performance data for analyzing revenue, targets, and regional performance.",
    category: "Sales",
    rows: 35,
    tables: [
      {
        tableName: "sales_reps",
        columns: [
          { name: "rep_id", type: "INTEGER" },
          { name: "rep_name", type: "TEXT" },
          { name: "region", type: "TEXT" },
          { name: "team", type: "TEXT" }
        ],
        createSQL: "CREATE TABLE sales_reps (rep_id INTEGER PRIMARY KEY, rep_name TEXT, region TEXT, team TEXT);",
        insertSQL: "INSERT INTO sales_reps VALUES (1,'Manish Jha','North','Team A'),(2,'Rekha Nair','South','Team B'),(3,'Sanjay Gupta','East','Team A'),(4,'Tanya Khanna','West','Team C'),(5,'Vivek Sharma','North','Team B');"
      },
      {
        tableName: "monthly_sales",
        columns: [
          { name: "id", type: "INTEGER" },
          { name: "rep_id", type: "INTEGER" },
          { name: "month", type: "TEXT" },
          { name: "actual_sales", type: "REAL" },
          { name: "target_sales", type: "REAL" }
        ],
        createSQL: "CREATE TABLE monthly_sales (id INTEGER PRIMARY KEY, rep_id INTEGER, month TEXT, actual_sales REAL, target_sales REAL);",
        insertSQL: "INSERT INTO monthly_sales VALUES (1,1,'2024-01',180000,150000),(2,2,'2024-01',120000,140000),(3,3,'2024-01',165000,150000),(4,4,'2024-01',200000,180000),(5,5,'2024-01',145000,150000),(6,1,'2024-02',195000,160000),(7,2,'2024-02',155000,140000),(8,3,'2024-02',140000,150000);"
      }
    ]
  }
];

export const getDatasetById = (id: string) => datasets.find(d => d.id === id);
