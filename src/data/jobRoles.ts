import type { JobRole } from '../types';

export const jobRoles: JobRole[] = [
  {
    id: "data-analyst",
    title: "Data Analyst",
    icon: "📊",
    description: "Master SQL for data exploration, reporting, and business insights.",
    skills: ["Aggregations", "Joins", "Subqueries", "Window Functions", "Date Functions"],
    learningPath: ["SQL Basics", "GROUP BY & HAVING", "Multi-table Joins", "Subqueries", "Window Functions", "Date/Time Functions"],
    questionIds: [1, 4, 7, 13, 16, 21, 23, 24, 51, 52],
    avgSalary: "₹4L - ₹12L"
  },
  {
    id: "power-bi-developer",
    title: "Power BI Developer",
    icon: "📈",
    description: "SQL skills essential for data modeling and Power Query in Power BI.",
    skills: ["Aggregations", "Joins", "CTEs", "Date Functions", "CASE WHEN"],
    learningPath: ["SELECT & Filters", "Joins for Data Modeling", "Aggregations", "CASE WHEN", "CTEs for Complex Logic"],
    questionIds: [1, 7, 15, 18, 21, 23, 53, 78],
    avgSalary: "₹5L - ₹15L"
  },
  {
    id: "business-analyst",
    title: "Business Analyst",
    icon: "💼",
    description: "Use SQL to analyze business metrics, KPIs, and performance data.",
    skills: ["Basic SELECT", "Aggregations", "Joins", "Filtering", "Simple Subqueries"],
    learningPath: ["SQL Fundamentals", "Filtering & Sorting", "Aggregations", "Joins", "Reporting Queries"],
    questionIds: [1, 2, 3, 5, 7, 13, 15, 18, 24],
    avgSalary: "₹4L - ₹10L"
  },
  {
    id: "data-engineer",
    title: "Data Engineer",
    icon: "⚙️",
    description: "Advanced SQL for ETL pipelines, data modeling, and warehouse optimization.",
    skills: ["Advanced Joins", "Window Functions", "Recursive CTEs", "Query Optimization", "Indexing"],
    learningPath: ["SQL Fundamentals", "Advanced Joins", "CTEs", "Window Functions", "Recursive CTEs", "Query Optimization"],
    questionIds: [18, 19, 22, 51, 52, 53, 54, 55, 76, 77, 78, 79, 80],
    avgSalary: "₹8L - ₹25L"
  },
  {
    id: "database-developer",
    title: "Database Developer",
    icon: "🗄️",
    description: "Deep SQL expertise for schema design, stored procedures, and performance tuning.",
    skills: ["All SQL", "Stored Procedures", "Indexing", "Query Optimization", "Schema Design"],
    learningPath: ["Complete SQL Mastery", "Indexing & Performance", "Recursive Queries", "Complex Aggregations", "Query Optimization"],
    questionIds: [17, 22, 51, 53, 54, 55, 76, 77, 78, 79, 80],
    avgSalary: "₹6L - ₹20L"
  },
  {
    id: "reporting-analyst",
    title: "Reporting Analyst",
    icon: "📋",
    description: "Create reports and dashboards using SQL and BI tools.",
    skills: ["Aggregations", "Joins", "CASE WHEN", "Date Functions", "Pivot"],
    learningPath: ["SELECT & Filtering", "Aggregations", "Joins", "CASE WHEN", "Date Functions", "Pivoting Data"],
    questionIds: [1, 7, 13, 15, 21, 23, 24, 78],
    avgSalary: "₹3L - ₹8L"
  }
];
