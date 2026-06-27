import type { Achievement } from '../types';

export const achievements: Achievement[] = [
  { id: "first_solve", title: "First Blood", description: "Solved your first SQL question!", icon: "⚡", xpReward: 50, condition: "solved_count >= 1" },
  { id: "beginner_10", title: "SQL Rookie", description: "Solved 10 questions.", icon: "🌱", xpReward: 100, condition: "solved_count >= 10" },
  { id: "intermediate_25", title: "Query Builder", description: "Solved 25 questions.", icon: "🔧", xpReward: 200, condition: "solved_count >= 25" },
  { id: "advanced_50", title: "SQL Craftsman", description: "Solved 50 questions.", icon: "⚙️", xpReward: 500, condition: "solved_count >= 50" },
  { id: "expert_75", title: "SQL Architect", description: "Solved 75 questions.", icon: "🏗️", xpReward: 1000, condition: "solved_count >= 75" },
  { id: "master_100", title: "SQL Master", description: "Solved all 100 questions!", icon: "👑", xpReward: 2000, condition: "solved_count >= 100" },
  { id: "streak_3", title: "On Fire", description: "3-day solving streak!", icon: "🔥", xpReward: 75, condition: "streak >= 3" },
  { id: "streak_7", title: "Week Warrior", description: "7-day solving streak!", icon: "⚔️", xpReward: 200, condition: "streak >= 7" },
  { id: "streak_30", title: "Consistency King", description: "30-day solving streak!", icon: "💎", xpReward: 1000, condition: "streak >= 30" },
  { id: "join_master", title: "Join Master", description: "Solved 10 JOIN questions.", icon: "🔗", xpReward: 150, condition: "joins_solved >= 10" },
  { id: "window_ninja", title: "Window Function Ninja", description: "Solved all window function questions.", icon: "🥷", xpReward: 300, condition: "window_solved >= 5" },
  { id: "first_hard", title: "Brave Soul", description: "Solved your first Hard question.", icon: "💪", xpReward: 100, condition: "hard_solved >= 1" },
  { id: "first_expert", title: "Expert Mindset", description: "Solved your first Expert question.", icon: "🎯", xpReward: 200, condition: "expert_solved >= 1" },
  { id: "speed_demon", title: "Speed Demon", description: "Solved a question in under 2 minutes.", icon: "⚡", xpReward: 100, condition: "fast_solve" },
  { id: "interview_ready", title: "Interview Ready", description: "Completed 5 company question tracks.", icon: "🏆", xpReward: 500, condition: "company_tracks >= 5" },
];

export const getLevelTitle = (xp: number): { title: string; level: number; nextXP: number } => {
  if (xp < 100) return { title: "SQL Beginner", level: 1, nextXP: 100 };
  if (xp < 300) return { title: "SQL Learner", level: 2, nextXP: 300 };
  if (xp < 700) return { title: "SQL Practitioner", level: 3, nextXP: 700 };
  if (xp < 1500) return { title: "SQL Developer", level: 4, nextXP: 1500 };
  if (xp < 3000) return { title: "SQL Expert", level: 5, nextXP: 3000 };
  if (xp < 6000) return { title: "SQL Architect", level: 6, nextXP: 6000 };
  return { title: "SQL Master", level: 7, nextXP: Infinity };
};
