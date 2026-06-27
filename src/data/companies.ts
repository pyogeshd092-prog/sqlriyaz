import type { Company } from '../types';

export const companies: Company[] = [
  {
    id: "amazon",
    name: "Amazon",
    logo: "A",
    sector: "Technology",
    difficulty: "Hard",
    totalQuestions: 12,
    mostAskedTopics: ["Window Functions", "CTE", "Joins", "Subqueries"],
    interviewPattern: "Focus on real-world product analytics scenarios. Expect questions about user funnels, retention rates, and ranking problems. Leadership Principles matter alongside SQL.",
    questionIds: [10, 16, 17, 19, 20, 21, 23, 24, 25, 51, 52, 55],
    description: "Amazon SQL interviews test practical data analysis skills. Questions often involve e-commerce data like orders, customers, and products."
  },
  {
    id: "google",
    name: "Google",
    logo: "G",
    sector: "Technology",
    difficulty: "Expert",
    totalQuestions: 8,
    mostAskedTopics: ["Window Functions", "Recursive CTE", "Complex Joins", "Performance"],
    interviewPattern: "Google focuses on algorithmic thinking in SQL. Expect complex window functions, recursive queries, and multi-step data transformations.",
    questionIds: [17, 22, 51, 53, 55, 76, 77, 80],
    description: "Google SQL interviews emphasize efficiency and elegant solutions. Questions test deep understanding of query optimization and advanced SQL features."
  },
  {
    id: "microsoft",
    name: "Microsoft",
    logo: "M",
    sector: "Technology",
    difficulty: "Hard",
    totalQuestions: 8,
    mostAskedTopics: ["CTEs", "Window Functions", "Joins", "Aggregations"],
    interviewPattern: "Microsoft asks SQL questions in the context of Azure and Power BI workflows. Expect pivot tables, date functions, and reporting-style queries.",
    questionIds: [15, 18, 22, 51, 53, 55, 76, 78],
    description: "Microsoft SQL tests knowledge relevant to business intelligence and cloud data platforms."
  },
  {
    id: "goldman-sachs",
    name: "Goldman Sachs",
    logo: "GS",
    sector: "Banking & Finance",
    difficulty: "Expert",
    totalQuestions: 8,
    mostAskedTopics: ["Window Functions", "Financial Calculations", "Pivot", "Running Totals"],
    interviewPattern: "Goldman Sachs focuses heavily on financial data scenarios: P&L calculations, portfolio analysis, transaction monitoring, and time-series data.",
    questionIds: [3, 14, 21, 23, 52, 54, 78, 80],
    description: "Goldman Sachs SQL interviews require strong financial domain knowledge combined with advanced SQL skills."
  },
  {
    id: "jp-morgan",
    name: "JP Morgan",
    logo: "JPM",
    sector: "Banking & Finance",
    difficulty: "Hard",
    totalQuestions: 6,
    mostAskedTopics: ["Aggregations", "Window Functions", "Date Functions", "Subqueries"],
    interviewPattern: "JP Morgan tests SQL in the context of risk management and trading data. Window functions and time-based aggregations are heavily featured.",
    questionIds: [3, 14, 23, 51, 54, 80],
    description: "JP Morgan emphasizes financial calculations and regulatory reporting scenarios in SQL interviews."
  },
  {
    id: "barclays",
    name: "Barclays",
    logo: "B",
    sector: "Banking & Finance",
    difficulty: "Medium",
    totalQuestions: 5,
    mostAskedTopics: ["Joins", "Aggregations", "Subqueries", "Date Functions"],
    interviewPattern: "Barclays tests SQL fundamentals strongly. Focus on data quality, customer segmentation, and transaction analysis.",
    questionIds: [2, 9, 18, 52, 80],
    description: "Barclays SQL interviews cover retail and investment banking data scenarios."
  },
  {
    id: "hsbc",
    name: "HSBC",
    logo: "H",
    sector: "Banking & Finance",
    difficulty: "Medium",
    totalQuestions: 4,
    mostAskedTopics: ["Joins", "WHERE", "Aggregations", "NULLs"],
    interviewPattern: "HSBC focuses on practical SQL for reporting. Strong emphasis on data accuracy and NULL handling.",
    questionIds: [2, 9, 12, 80],
    description: "HSBC SQL interviews center around customer data analysis and regulatory reporting."
  },
  {
    id: "deutsche-bank",
    name: "Deutsche Bank",
    logo: "DB",
    sector: "Banking & Finance",
    difficulty: "Hard",
    totalQuestions: 4,
    mostAskedTopics: ["Window Functions", "Aggregations", "Joins", "Pivoting"],
    interviewPattern: "Deutsche Bank tests SQL for trade and risk reporting. Expect complex aggregations and time-series analysis.",
    questionIds: [3, 9, 52, 78],
    description: "Deutsche Bank SQL focuses on quantitative finance and risk data scenarios."
  },
  {
    id: "deloitte",
    name: "Deloitte",
    logo: "D",
    sector: "Consulting",
    difficulty: "Medium",
    totalQuestions: 6,
    mostAskedTopics: ["Joins", "GROUP BY", "Subqueries", "CASE WHEN"],
    interviewPattern: "Deloitte tests practical SQL for client data analysis. Questions are business-focused with less algorithm complexity.",
    questionIds: [4, 7, 13, 15, 18, 24],
    description: "Deloitte SQL interviews simulate real consulting scenarios with client business data."
  },
  {
    id: "accenture",
    name: "Accenture",
    logo: "AC",
    sector: "Consulting",
    difficulty: "Easy",
    totalQuestions: 5,
    mostAskedTopics: ["SELECT", "WHERE", "Joins", "GROUP BY"],
    interviewPattern: "Accenture SQL tests are more foundational. Focus on clean queries, correct joins, and proper aggregations.",
    questionIds: [1, 2, 5, 8, 18],
    description: "Accenture SQL interviews are ideal for freshers and mid-level professionals."
  },
  {
    id: "netflix",
    name: "Netflix",
    logo: "N",
    sector: "Technology",
    difficulty: "Hard",
    totalQuestions: 6,
    mostAskedTopics: ["Window Functions", "Retention Analysis", "Funnel", "Cohort"],
    interviewPattern: "Netflix focuses on user behavior analytics: content engagement, retention funnels, and recommendation data.",
    questionIds: [15, 52, 53, 54, 55, 79],
    description: "Netflix SQL interviews test product analytics skills with streaming and user engagement data."
  },
  {
    id: "uber",
    name: "Uber",
    logo: "U",
    sector: "Technology",
    difficulty: "Hard",
    totalQuestions: 5,
    mostAskedTopics: ["Aggregations", "Window Functions", "Geospatial Concepts", "Time-series"],
    interviewPattern: "Uber tests SQL with ride-sharing data: driver performance, trip analysis, and surge pricing scenarios.",
    questionIds: [13, 19, 23, 54, 79],
    description: "Uber SQL interviews cover marketplace analytics and operational data analysis."
  },
  {
    id: "meta",
    name: "Meta",
    logo: "F",
    sector: "Technology",
    difficulty: "Expert",
    totalQuestions: 6,
    mostAskedTopics: ["Window Functions", "Funnel Analysis", "A/B Testing", "User Growth"],
    interviewPattern: "Meta asks product analytics questions: DAU/MAU, funnel analysis, feature adoption, and social graph queries.",
    questionIds: [12, 22, 24, 53, 55, 79],
    description: "Meta SQL interviews simulate Facebook/Instagram product analytics with social network data."
  }
];

export const getCompanyById = (id: string) => companies.find(c => c.id === id);
export const getSectors = () => [...new Set(companies.map(c => c.sector))];
