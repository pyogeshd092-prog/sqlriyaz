import type { Question } from '../../types';

const LIBRARY = {
  createSQL: "CREATE TABLE books (book_id INTEGER PRIMARY KEY, title TEXT, author TEXT, genre TEXT, pages INTEGER, year INTEGER, price REAL, copies_available INTEGER);",
  insertSQL: "INSERT INTO books VALUES (1,'The Alchemist','Paulo Coelho','Fiction',208,1988,299,5),(2,'Atomic Habits','James Clear','Self-Help',320,2018,499,3),(3,'Rich Dad Poor Dad','Robert Kiyosaki','Finance',336,1997,349,7),(4,'1984','George Orwell','Fiction',328,1949,199,2),(5,'Sapiens','Yuval Harari','History',512,2011,599,4),(6,'Deep Work','Cal Newport','Self-Help',304,2016,449,6),(7,'The Power of Now','Eckhart Tolle','Spirituality',236,1997,299,3),(8,'Zero to One','Peter Thiel','Business',224,2014,399,5),(9,'Harry Potter','J.K. Rowling','Fiction',309,1997,349,10),(10,'Thinking Fast and Slow','Daniel Kahneman','Psychology',499,2011,549,2);"
};

const HOSPITAL = {
  createSQL: "CREATE TABLE patients (patient_id INTEGER PRIMARY KEY, patient_name TEXT, age INTEGER, gender TEXT, blood_group TEXT, disease TEXT, doctor TEXT, admitted_date TEXT, discharge_date TEXT, bill_amount REAL);",
  insertSQL: "INSERT INTO patients VALUES (1,'Rahul Sharma',35,'M','O+','Diabetes','Dr. Patel','2024-01-05','2024-01-10',15000),(2,'Priya Singh',28,'F','A+','Fever','Dr. Mehta','2024-01-08','2024-01-11',8000),(3,'Amit Verma',52,'M','B+','Heart Disease','Dr. Patel','2024-01-10',NULL,45000),(4,'Sneha Gupta',19,'F','AB+','Fracture','Dr. Joshi','2024-01-12','2024-01-18',22000),(5,'Vikram Rao',65,'M','O-','Diabetes','Dr. Mehta','2024-01-15','2024-01-20',18000),(6,'Kavita Sharma',45,'F','A-','Hypertension','Dr. Patel','2024-01-18','2024-01-22',12000),(7,'Arjun Kumar',30,'M','B-','Appendicitis','Dr. Joshi','2024-01-20','2024-01-24',35000),(8,'Meera Iyer',38,'F','O+','Malaria','Dr. Mehta','2024-02-01','2024-02-05',9000);"
};

const STUDENTS2 = {
  createSQL: "CREATE TABLE student_marks (student_id INTEGER PRIMARY KEY, student_name TEXT, class TEXT, math INTEGER, science INTEGER, english INTEGER, history INTEGER);",
  insertSQL: "INSERT INTO student_marks VALUES (1,'Aarav',10,85,90,78,72),(2,'Priya',10,92,88,95,85),(3,'Rahul',11,70,75,65,80),(4,'Sneha',11,88,82,91,87),(5,'Amit',10,55,60,70,65),(6,'Riya',11,95,92,88,90),(7,'Vikram',10,78,80,72,68),(8,'Meera',11,88,85,90,92),(9,'Arjun',10,62,58,75,70),(10,'Kavita',11,91,88,85,80);"
};

const INVENTORY = {
  createSQL: "CREATE TABLE inventory (item_id INTEGER PRIMARY KEY, item_name TEXT, category TEXT, unit_price REAL, quantity_in_stock INTEGER, reorder_level INTEGER, supplier TEXT, last_restocked TEXT);",
  insertSQL: "INSERT INTO inventory VALUES (1,'Rice','Grains',45,500,100,'FoodCorp','2024-01-01'),(2,'Wheat Flour','Grains',35,300,80,'FoodCorp','2024-01-05'),(3,'Sugar','Sweeteners',50,200,60,'SweetCo','2024-01-10'),(4,'Salt','Condiments',20,400,100,'SpiceCo','2024-01-02'),(5,'Cooking Oil','Oils',120,150,50,'OilMart','2024-01-08'),(6,'Tea','Beverages',180,80,30,'TeaHouse','2024-01-03'),(7,'Coffee','Beverages',320,60,20,'CaféBeans','2024-01-12'),(8,'Milk Powder','Dairy',450,100,40,'DairyCo','2024-01-07'),(9,'Biscuits','Snacks',25,600,200,'SnackBrand','2024-01-04'),(10,'Chocolate','Snacks',85,250,100,'ChocoMart','2024-01-09');"
};

export const easy2Questions: Question[] = [
  {
    id: 41, title: "Find All Fiction Books", slug: "fiction-books",
    difficulty: "Easy", category: "SQL Basics", tags: ["WHERE", "Filter"], companies: [],
    problemStatement: "Find all books in the 'Fiction' genre from the books table.",
    tableStructure: [{ tableName: "books", columns: [{name:"book_id",type:"INTEGER"},{name:"title",type:"TEXT"},{name:"genre",type:"TEXT"},{name:"price",type:"REAL"}], createSQL: LIBRARY.createSQL, insertSQL: LIBRARY.insertSQL }],
    sampleData: {}, expectedOutput: [{title:"The Alchemist",genre:"Fiction"},{title:"1984",genre:"Fiction"},{title:"Harry Potter",genre:"Fiction"}],
    hint1: "Use WHERE genre = 'Fiction'.", hint2: "String values need single quotes.", hint3: "SELECT * FROM books WHERE genre = 'Fiction'",
    solution: "SELECT * FROM books WHERE genre = 'Fiction' ORDER BY title;",
    explanation: "Simple string equality filter. Case-sensitive in most SQL databases.", relatedQuestions: [42,43], xpReward: 10
  },
  {
    id: 42, title: "Books Published After 2000", slug: "books-after-2000",
    difficulty: "Easy", category: "SQL Basics", tags: ["WHERE", "Comparison"], companies: [],
    problemStatement: "List all books published after the year 2000.",
    tableStructure: [{ tableName: "books", columns: [{name:"book_id",type:"INTEGER"},{name:"title",type:"TEXT"},{name:"year",type:"INTEGER"},{name:"author",type:"TEXT"}], createSQL: LIBRARY.createSQL, insertSQL: LIBRARY.insertSQL }],
    sampleData: {}, expectedOutput: [{title:"Atomic Habits",year:2018},{title:"Sapiens",year:2011},{title:"Deep Work",year:2016}],
    hint1: "Year is an integer column.", hint2: "Use > 2000 to filter.", hint3: "WHERE year > 2000",
    solution: "SELECT title, author, year FROM books WHERE year > 2000 ORDER BY year DESC;",
    explanation: "Numeric comparison with >. Year 2000 itself is NOT included (use >= 2000 to include it).", relatedQuestions: [41,43], xpReward: 10
  },
  {
    id: 43, title: "Most Expensive Book", slug: "most-expensive-book",
    difficulty: "Easy", category: "Aggregation", tags: ["MAX"], companies: [],
    problemStatement: "Find the price of the most expensive book.",
    tableStructure: [{ tableName: "books", columns: [{name:"book_id",type:"INTEGER"},{name:"title",type:"TEXT"},{name:"price",type:"REAL"}], createSQL: LIBRARY.createSQL, insertSQL: LIBRARY.insertSQL }],
    sampleData: {}, expectedOutput: [{max_price:599}],
    hint1: "Use MAX() aggregate function.", hint2: "No GROUP BY needed for overall max.", hint3: "SELECT MAX(price) AS max_price FROM books",
    solution: "SELECT MAX(price) AS max_price FROM books;",
    explanation: "MAX() returns the single highest price across all rows.", relatedQuestions: [42,44], xpReward: 10
  },
  {
    id: 44, title: "Average Book Price by Genre", slug: "avg-price-by-genre",
    difficulty: "Easy", category: "Aggregation", tags: ["AVG", "GROUP BY"], companies: [],
    problemStatement: "Calculate the average price for each genre.",
    tableStructure: [{ tableName: "books", columns: [{name:"book_id",type:"INTEGER"},{name:"genre",type:"TEXT"},{name:"price",type:"REAL"}], createSQL: LIBRARY.createSQL, insertSQL: LIBRARY.insertSQL }],
    sampleData: {}, expectedOutput: [{genre:"Business",avg_price:399},{genre:"Finance",avg_price:349},{genre:"Fiction",avg_price:282.33}],
    hint1: "GROUP BY genre.", hint2: "AVG(price) per group.", hint3: "SELECT genre, AVG(price) FROM books GROUP BY genre",
    solution: "SELECT genre, ROUND(AVG(price),2) AS avg_price FROM books GROUP BY genre ORDER BY avg_price DESC;",
    explanation: "GROUP BY genre creates one row per genre. AVG() computes the mean price within each group.", relatedQuestions: [43,45], xpReward: 15
  },
  {
    id: 45, title: "Books with More Than 4 Copies", slug: "books-many-copies",
    difficulty: "Easy", category: "SQL Basics", tags: ["WHERE", "Comparison"], companies: [],
    problemStatement: "List books that have more than 4 copies available.",
    tableStructure: [{ tableName: "books", columns: [{name:"book_id",type:"INTEGER"},{name:"title",type:"TEXT"},{name:"copies_available",type:"INTEGER"}], createSQL: LIBRARY.createSQL, insertSQL: LIBRARY.insertSQL }],
    sampleData: {}, expectedOutput: [{title:"The Alchemist",copies_available:5},{title:"Rich Dad Poor Dad",copies_available:7},{title:"Deep Work",copies_available:6},{title:"Zero to One",copies_available:5},{title:"Harry Potter",copies_available:10}],
    hint1: "Filter on copies_available > 4.", hint2: "copies_available is an integer column.", hint3: "WHERE copies_available > 4",
    solution: "SELECT title, copies_available FROM books WHERE copies_available > 4 ORDER BY copies_available DESC;",
    explanation: "Simple integer comparison. More than 4 means strictly greater than 4.", relatedQuestions: [41,46], xpReward: 10
  },
  {
    id: 46, title: "Count Books by Genre", slug: "count-books-by-genre",
    difficulty: "Easy", category: "Aggregation", tags: ["COUNT", "GROUP BY"], companies: [],
    problemStatement: "Count how many books are in each genre.",
    tableStructure: [{ tableName: "books", columns: [{name:"book_id",type:"INTEGER"},{name:"genre",type:"TEXT"}], createSQL: LIBRARY.createSQL, insertSQL: LIBRARY.insertSQL }],
    sampleData: {}, expectedOutput: [{genre:"Fiction",count:3},{genre:"Self-Help",count:2},{genre:"Psychology",count:1}],
    hint1: "GROUP BY genre.", hint2: "COUNT(*) counts books per group.", hint3: "SELECT genre, COUNT(*) FROM books GROUP BY genre",
    solution: "SELECT genre, COUNT(*) AS count FROM books GROUP BY genre ORDER BY count DESC;",
    explanation: "COUNT(*) with GROUP BY gives the count per category.", relatedQuestions: [44,45], xpReward: 15
  },
  {
    id: 47, title: "Total Hospital Bills by Doctor", slug: "total-bills-by-doctor",
    difficulty: "Easy", category: "Aggregation", tags: ["SUM", "GROUP BY"], companies: [],
    problemStatement: "Calculate the total bill amount generated by each doctor.",
    tableStructure: [{ tableName: "patients", columns: [{name:"patient_id",type:"INTEGER"},{name:"doctor",type:"TEXT"},{name:"bill_amount",type:"REAL"}], createSQL: HOSPITAL.createSQL, insertSQL: HOSPITAL.insertSQL }],
    sampleData: {}, expectedOutput: [{doctor:"Dr. Patel",total_bills:72000},{doctor:"Dr. Joshi",total_bills:57000},{doctor:"Dr. Mehta",total_bills:35000}],
    hint1: "GROUP BY doctor.", hint2: "SUM(bill_amount) totals per doctor.", hint3: "SELECT doctor, SUM(bill_amount) AS total_bills",
    solution: "SELECT doctor, SUM(bill_amount) AS total_bills FROM patients GROUP BY doctor ORDER BY total_bills DESC;",
    explanation: "SUM with GROUP BY aggregates bill amounts for each doctor.", relatedQuestions: [48,49], xpReward: 15
  },
  {
    id: 48, title: "Current Patients (Not Discharged)", slug: "current-patients",
    difficulty: "Easy", category: "NULL Handling", tags: ["IS NULL", "NULL"], companies: [],
    problemStatement: "Find all patients who have not been discharged yet (discharge_date is NULL).",
    tableStructure: [{ tableName: "patients", columns: [{name:"patient_id",type:"INTEGER"},{name:"patient_name",type:"TEXT"},{name:"disease",type:"TEXT"},{name:"discharge_date",type:"TEXT"}], createSQL: HOSPITAL.createSQL, insertSQL: HOSPITAL.insertSQL }],
    sampleData: {}, expectedOutput: [{patient_name:"Amit Verma",disease:"Heart Disease",discharge_date:null}],
    hint1: "NULL means not discharged yet.", hint2: "Use IS NULL to find NULL values.", hint3: "WHERE discharge_date IS NULL",
    solution: "SELECT patient_name, disease, admitted_date FROM patients WHERE discharge_date IS NULL;",
    explanation: "IS NULL is the correct way to check for NULL. = NULL would NOT work in SQL.", relatedQuestions: [47,49], xpReward: 10
  },
  {
    id: 49, title: "Average Patient Age", slug: "average-patient-age",
    difficulty: "Easy", category: "Aggregation", tags: ["AVG", "Aggregation"], companies: [],
    problemStatement: "Calculate the average age of patients in the hospital.",
    tableStructure: [{ tableName: "patients", columns: [{name:"patient_id",type:"INTEGER"},{name:"age",type:"INTEGER"}], createSQL: HOSPITAL.createSQL, insertSQL: HOSPITAL.insertSQL }],
    sampleData: {}, expectedOutput: [{avg_age:39}],
    hint1: "Use AVG() on the age column.", hint2: "ROUND to remove decimals.", hint3: "SELECT ROUND(AVG(age),0) AS avg_age",
    solution: "SELECT ROUND(AVG(age), 0) AS avg_age FROM patients;",
    explanation: "AVG() calculates arithmetic mean. ROUND(x, 0) rounds to nearest integer.", relatedQuestions: [47,50], xpReward: 10
  },
  {
    id: 50, title: "Patients by Blood Group", slug: "patients-by-blood-group",
    difficulty: "Easy", category: "Aggregation", tags: ["COUNT", "GROUP BY"], companies: [],
    problemStatement: "Count patients for each blood group.",
    tableStructure: [{ tableName: "patients", columns: [{name:"patient_id",type:"INTEGER"},{name:"blood_group",type:"TEXT"}], createSQL: HOSPITAL.createSQL, insertSQL: HOSPITAL.insertSQL }],
    sampleData: {}, expectedOutput: [{blood_group:"O+",count:2},{blood_group:"A+",count:1}],
    hint1: "GROUP BY blood_group.", hint2: "COUNT(*) per group.", hint3: "SELECT blood_group, COUNT(*) FROM patients GROUP BY blood_group",
    solution: "SELECT blood_group, COUNT(*) AS count FROM patients GROUP BY blood_group ORDER BY count DESC;",
    explanation: "GROUP BY blood_group creates a group per unique blood type, COUNT(*) counts patients in each.", relatedQuestions: [49,47], xpReward: 15
  },
  {
    id: 51, title: "Total Marks per Student", slug: "total-marks-per-student",
    difficulty: "Easy", category: "SQL Basics", tags: ["Calculation", "Arithmetic"], companies: [],
    problemStatement: "Calculate the total marks for each student (sum of all subjects).",
    tableStructure: [{ tableName: "student_marks", columns: [{name:"student_id",type:"INTEGER"},{name:"student_name",type:"TEXT"},{name:"math",type:"INTEGER"},{name:"science",type:"INTEGER"},{name:"english",type:"INTEGER"},{name:"history",type:"INTEGER"}], createSQL: STUDENTS2.createSQL, insertSQL: STUDENTS2.insertSQL }],
    sampleData: {}, expectedOutput: [{student_name:"Aarav",total:425},{student_name:"Priya",total:460}],
    hint1: "Add all subject columns together.", hint2: "Arithmetic expressions work in SELECT.", hint3: "SELECT student_name, math + science + english + history AS total",
    solution: "SELECT student_name, math + science + english + history AS total FROM student_marks ORDER BY total DESC;",
    explanation: "SQL allows arithmetic (+) directly on columns in SELECT. This computes total marks without GROUP BY.", relatedQuestions: [52,53], xpReward: 10
  },
  {
    id: 52, title: "Students in Class 10", slug: "class-10-students",
    difficulty: "Easy", category: "SQL Basics", tags: ["WHERE", "Filter"], companies: [],
    problemStatement: "List all students in Class 10.",
    tableStructure: [{ tableName: "student_marks", columns: [{name:"student_id",type:"INTEGER"},{name:"student_name",type:"TEXT"},{name:"class",type:"TEXT"}], createSQL: STUDENTS2.createSQL, insertSQL: STUDENTS2.insertSQL }],
    sampleData: {}, expectedOutput: [{student_name:"Aarav",class:"10"},{student_name:"Priya",class:"10"},{student_name:"Amit",class:"10"},{student_name:"Vikram",class:"10"},{student_name:"Arjun",class:"10"}],
    hint1: "Filter WHERE class = '10'.", hint2: "class is stored as TEXT.", hint3: "WHERE class = '10'",
    solution: "SELECT student_name, class FROM student_marks WHERE class = '10' ORDER BY student_name;",
    explanation: "Even numeric-looking values stored as TEXT need string comparison with single quotes.", relatedQuestions: [51,53], xpReward: 10
  },
  {
    id: 53, title: "Highest Math Score", slug: "highest-math-score",
    difficulty: "Easy", category: "Aggregation", tags: ["MAX"], companies: [],
    problemStatement: "Find the highest Math score among all students.",
    tableStructure: [{ tableName: "student_marks", columns: [{name:"student_id",type:"INTEGER"},{name:"student_name",type:"TEXT"},{name:"math",type:"INTEGER"}], createSQL: STUDENTS2.createSQL, insertSQL: STUDENTS2.insertSQL }],
    sampleData: {}, expectedOutput: [{max_math:95}],
    hint1: "Use MAX() on the math column.", hint2: "Simple aggregation, no GROUP BY needed.", hint3: "SELECT MAX(math) AS max_math FROM student_marks",
    solution: "SELECT MAX(math) AS max_math FROM student_marks;",
    explanation: "MAX() on a numeric column returns the largest value.", relatedQuestions: [54,51], xpReward: 10
  },
  {
    id: 54, title: "Items Below Reorder Level", slug: "items-below-reorder",
    difficulty: "Easy", category: "SQL Basics", tags: ["WHERE", "Comparison", "Business Logic"], companies: [],
    problemStatement: "Find all inventory items where quantity_in_stock is less than or equal to reorder_level (need restocking).",
    tableStructure: [{ tableName: "inventory", columns: [{name:"item_id",type:"INTEGER"},{name:"item_name",type:"TEXT"},{name:"quantity_in_stock",type:"INTEGER"},{name:"reorder_level",type:"INTEGER"}], createSQL: INVENTORY.createSQL, insertSQL: INVENTORY.insertSQL }],
    sampleData: {}, expectedOutput: [{item_name:"Tea",quantity_in_stock:80,reorder_level:30},{item_name:"Coffee",quantity_in_stock:60,reorder_level:20}],
    hint1: "Compare quantity_in_stock to reorder_level.", hint2: "Both columns are on the same row — just compare them!", hint3: "WHERE quantity_in_stock <= reorder_level",
    solution: "SELECT item_name, quantity_in_stock, reorder_level FROM inventory WHERE quantity_in_stock <= reorder_level ORDER BY item_name;",
    explanation: "You can compare two columns to each other in WHERE clause — not just a column vs a constant.", relatedQuestions: [55,33], xpReward: 15
  },
  {
    id: 55, title: "Total Inventory Value per Supplier", slug: "inventory-value-by-supplier",
    difficulty: "Easy", category: "Aggregation", tags: ["SUM", "GROUP BY", "Calculation"], companies: [],
    problemStatement: "Calculate the total inventory value (unit_price × quantity_in_stock) per supplier.",
    tableStructure: [{ tableName: "inventory", columns: [{name:"item_id",type:"INTEGER"},{name:"supplier",type:"TEXT"},{name:"unit_price",type:"REAL"},{name:"quantity_in_stock",type:"INTEGER"}], createSQL: INVENTORY.createSQL, insertSQL: INVENTORY.insertSQL }],
    sampleData: {}, expectedOutput: [{supplier:"FoodCorp",total_value:33000},{supplier:"SnackBrand",total_value:15000}],
    hint1: "Multiply unit_price by quantity_in_stock for each item.", hint2: "SUM this product, GROUP BY supplier.", hint3: "SELECT supplier, SUM(unit_price * quantity_in_stock)",
    solution: "SELECT supplier, SUM(unit_price * quantity_in_stock) AS total_value FROM inventory GROUP BY supplier ORDER BY total_value DESC;",
    explanation: "SUM(expr) with GROUP BY computes totals per group where expr is a calculation per row.", relatedQuestions: [54,26], xpReward: 15
  },
  {
    id: 56, title: "Books Sorted by Pages", slug: "books-sorted-by-pages",
    difficulty: "Easy", category: "SQL Basics", tags: ["ORDER BY", "Sorting"], companies: [],
    problemStatement: "List all books sorted by number of pages, shortest first.",
    tableStructure: [{ tableName: "books", columns: [{name:"book_id",type:"INTEGER"},{name:"title",type:"TEXT"},{name:"pages",type:"INTEGER"}], createSQL: LIBRARY.createSQL, insertSQL: LIBRARY.insertSQL }],
    sampleData: {}, expectedOutput: [{title:"The Alchemist",pages:208},{title:"Zero to One",pages:224}],
    hint1: "ORDER BY pages ASC.", hint2: "ASC is default.", hint3: "ORDER BY pages",
    solution: "SELECT title, pages FROM books ORDER BY pages ASC;",
    explanation: "ORDER BY without DESC defaults to ascending order (smallest to largest).", relatedQuestions: [4,29], xpReward: 10
  },
  {
    id: 57, title: "Gender Breakdown of Patients", slug: "gender-breakdown",
    difficulty: "Easy", category: "Aggregation", tags: ["COUNT", "GROUP BY"], companies: [],
    problemStatement: "Count the number of male and female patients.",
    tableStructure: [{ tableName: "patients", columns: [{name:"patient_id",type:"INTEGER"},{name:"gender",type:"TEXT"}], createSQL: HOSPITAL.createSQL, insertSQL: HOSPITAL.insertSQL }],
    sampleData: {}, expectedOutput: [{gender:"F",count:4},{gender:"M",count:4}],
    hint1: "GROUP BY gender.", hint2: "COUNT(*) per gender.", hint3: "SELECT gender, COUNT(*) FROM patients GROUP BY gender",
    solution: "SELECT gender, COUNT(*) AS count FROM patients GROUP BY gender ORDER BY gender;",
    explanation: "Simple GROUP BY counting — a common demographic analysis query.", relatedQuestions: [50,49], xpReward: 10
  },
  {
    id: 58, title: "Books WHERE Author Name Contains 'Coelho'", slug: "author-like-coelho",
    difficulty: "Easy", category: "SQL Basics", tags: ["LIKE", "Pattern Matching"], companies: [],
    problemStatement: "Find all books written by authors whose last name is 'Coelho'.",
    tableStructure: [{ tableName: "books", columns: [{name:"book_id",type:"INTEGER"},{name:"title",type:"TEXT"},{name:"author",type:"TEXT"}], createSQL: LIBRARY.createSQL, insertSQL: LIBRARY.insertSQL }],
    sampleData: {}, expectedOutput: [{title:"The Alchemist",author:"Paulo Coelho"}],
    hint1: "Use LIKE with %Coelho pattern.", hint2: "% matches anything before 'Coelho'.", hint3: "WHERE author LIKE '%Coelho%'",
    solution: "SELECT title, author FROM books WHERE author LIKE '%Coelho%';",
    explanation: "LIKE '%Coelho%' matches any string containing 'Coelho' anywhere. % before and after makes it a contains search.", relatedQuestions: [16,13], xpReward: 10
  },
  {
    id: 59, title: "Patients Older Than 50", slug: "patients-older-50",
    difficulty: "Easy", category: "SQL Basics", tags: ["WHERE", "Comparison"], companies: [],
    problemStatement: "Find all patients who are older than 50 years.",
    tableStructure: [{ tableName: "patients", columns: [{name:"patient_id",type:"INTEGER"},{name:"patient_name",type:"TEXT"},{name:"age",type:"INTEGER"},{name:"disease",type:"TEXT"}], createSQL: HOSPITAL.createSQL, insertSQL: HOSPITAL.insertSQL }],
    sampleData: {}, expectedOutput: [{patient_name:"Amit Verma",age:52},{patient_name:"Vikram Rao",age:65}],
    hint1: "Use WHERE age > 50.", hint2: "age is an integer, no quotes needed.", hint3: "WHERE age > 50",
    solution: "SELECT patient_name, age, disease FROM patients WHERE age > 50 ORDER BY age DESC;",
    explanation: "Numeric comparison with > (greater than). 50-year-olds are NOT included.", relatedQuestions: [49,30], xpReward: 10
  },
  {
    id: 60, title: "Average Marks per Subject", slug: "avg-marks-per-subject",
    difficulty: "Easy", category: "Aggregation", tags: ["AVG", "Multiple Columns"], companies: [],
    problemStatement: "Calculate the class average for each subject (math, science, english, history).",
    tableStructure: [{ tableName: "student_marks", columns: [{name:"student_id",type:"INTEGER"},{name:"math",type:"INTEGER"},{name:"science",type:"INTEGER"},{name:"english",type:"INTEGER"},{name:"history",type:"INTEGER"}], createSQL: STUDENTS2.createSQL, insertSQL: STUDENTS2.insertSQL }],
    sampleData: {}, expectedOutput: [{avg_math:80.4,avg_science:79.8,avg_english:80.9,avg_history:78.9}],
    hint1: "Use AVG() for each subject column.", hint2: "All in one SELECT statement.", hint3: "SELECT AVG(math), AVG(science), AVG(english), AVG(history)",
    solution: "SELECT ROUND(AVG(math),1) AS avg_math, ROUND(AVG(science),1) AS avg_science, ROUND(AVG(english),1) AS avg_english, ROUND(AVG(history),1) AS avg_history FROM student_marks;",
    explanation: "Multiple aggregate functions can appear in a single SELECT. Without GROUP BY, each AVG applies to all rows.", relatedQuestions: [22,7], xpReward: 15
  },
];
