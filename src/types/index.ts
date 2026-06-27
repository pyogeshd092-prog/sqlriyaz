export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Expert';
export type Theme = 'blue' | 'purple' | 'orange' | 'green';

export interface Question {
  id: number;
  title: string;
  slug: string;
  difficulty: Difficulty;
  category: string;
  tags: string[];
  companies: string[];
  problemStatement: string;
  tableStructure: TableDefinition[];
  sampleData: Record<string, unknown[][]>;
  expectedOutput: Record<string, unknown>[];
  hint1: string;
  hint2: string;
  hint3: string;
  solution: string;
  explanation: string;
  relatedQuestions: number[];
  xpReward: number;
}

export interface TableDefinition {
  tableName: string;
  columns: ColumnDef[];
  createSQL: string;
  insertSQL: string;
}

export interface ColumnDef {
  name: string;
  type: string;
  nullable?: boolean;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  sector: string;
  difficulty: Difficulty;
  totalQuestions: number;
  mostAskedTopics: string[];
  interviewPattern: string;
  questionIds: number[];
  description: string;
}

export interface JobRole {
  id: string;
  title: string;
  icon: string;
  description: string;
  skills: string[];
  learningPath: string[];
  questionIds: number[];
  avgSalary: string;
}

export interface RoadmapTopic {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  syntax: string;
  example: string;
  output: string;
  tips: string[];
  questionIds: number[];
}

export interface Dataset {
  id: string;
  name: string;
  description: string;
  tables: TableDefinition[];
  category: string;
  rows: number;
}

export interface UserProgress {
  solvedQuestions: number[];
  bookmarkedQuestions: number[];
  xp: number;
  level: number;
  streak: number;
  longestStreak: number;
  lastActive: string;
  topicProgress: Record<string, number>;
  companyProgress: Record<string, number>;
  dailySolves: Record<string, number>;
  achievements: string[];
  submissions: Submission[];
}

export interface Submission {
  questionId: number;
  code: string;
  status: 'correct' | 'wrong' | 'partial';
  timestamp: string;
  timeTaken: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  condition: string;
}

export interface MockTest {
  id: string;
  title: string;
  type: 'topic' | 'company' | 'timed' | 'random';
  questions: number[];
  timeLimit: number;
  difficulty: Difficulty;
}

export interface QueryResult {
  columns: string[];
  rows: unknown[][];
  rowCount: number;
  executionTime: number;
  error?: string;
}

export interface ThemeConfig {
  id: Theme;
  name: string;
  primary: string;
  accent: string;
  bg: string;
  card: string;
  border: string;
  text: string;
  muted: string;
  gradient: string;
  badge: string;
}
