// Re-exports from the new split question files
// This file is kept for backwards compatibility with existing imports
export { questions, easyQuestions, mediumQuestions, hardQuestions, expertQuestions } from './questions/index';
export type { Question } from './questions/index';

import { questions } from './questions/index';

export const getQuestionById = (id: number) => questions.find(q => q.id === id);
export const getQuestionsByDifficulty = (difficulty: string) => questions.filter(q => q.difficulty === difficulty);
export const getQuestionsByCategory = (category: string) => questions.filter(q => q.category === category);
export const getQuestionsByCompany = (company: string) => questions.filter(q => q.companies.includes(company));

export const categories = [...new Set(questions.map(q => q.category))];
export const difficulties = ['Easy', 'Medium', 'Hard', 'Expert'] as const;
