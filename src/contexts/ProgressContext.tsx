import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { UserProgress, Submission } from '../types';
import { achievements, getLevelTitle } from '../data/achievements';
import { questions } from '../data/questions';
import { supabase } from '../lib/supabase';

const DEFAULT_PROGRESS: UserProgress = {
  solvedQuestions: [],
  bookmarkedQuestions: [],
  xp: 0,
  level: 1,
  streak: 0,
  longestStreak: 0,
  lastActive: '',
  topicProgress: {},
  companyProgress: {},
  dailySolves: {},
  achievements: [],
  submissions: []
};

interface ProgressContextType {
  progress: UserProgress;
  markSolved: (questionId: number, category: string, xpReward: number, code: string, timeTaken: number) => void;
  toggleBookmark: (questionId: number) => void;
  isSolved: (questionId: number) => boolean;
  isBookmarked: (questionId: number) => boolean;
  getLevelInfo: () => { title: string; level: number; nextXP: number };
  resetProgress: () => void;
  newAchievements: string[];
  clearNewAchievements: () => void;
}

const ProgressContext = createContext<ProgressContextType>({} as ProgressContextType);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem('sqlace_progress');
      return saved ? { ...DEFAULT_PROGRESS, ...JSON.parse(saved) } : DEFAULT_PROGRESS;
    } catch {
      return DEFAULT_PROGRESS;
    }
  });

  const [newAchievements, setNewAchievements] = useState<string[]>([]);

  // Save to localStorage always
  useEffect(() => {
    localStorage.setItem('sqlace_progress', JSON.stringify(progress));
  }, [progress]);

  // Sync profile stats to Supabase when progress changes (if logged in)
  useEffect(() => {
    const syncToCloud = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      await supabase.from('profiles').update({
        xp: progress.xp,
        level: progress.level,
        streak: progress.streak,
        longest_streak: progress.longestStreak,
        questions_solved: progress.solvedQuestions.length,
        last_active: progress.lastActive || new Date().toISOString().split('T')[0],
      }).eq('id', user.id);
    };
    syncToCloud();
  }, [progress.xp, progress.streak, progress.solvedQuestions.length]);

  const updateStreak = useCallback((prog: UserProgress): UserProgress => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    let newStreak = prog.streak;
    if (prog.lastActive === yesterday) {
      newStreak = prog.streak + 1;
    } else if (prog.lastActive !== today) {
      newStreak = 1;
    }

    return {
      ...prog,
      streak: newStreak,
      longestStreak: Math.max(newStreak, prog.longestStreak),
      lastActive: today,
      dailySolves: {
        ...prog.dailySolves,
        [today]: (prog.dailySolves[today] || 0) + 1
      }
    };
  }, []);

  const checkAchievements = useCallback((prog: UserProgress, timeTaken?: number): string[] => {
    const earned: string[] = [];
    achievements.forEach(ach => {
      if (prog.achievements.includes(ach.id)) return;
      const { condition } = ach;
      let unlocked = false;

      if (condition.startsWith('solved_count')) {
        const n = parseInt(condition.split('>=')[1]);
        unlocked = prog.solvedQuestions.length >= n;
      } else if (condition.startsWith('streak')) {
        const n = parseInt(condition.split('>=')[1]);
        unlocked = prog.streak >= n;
      } else if (condition.startsWith('hard_solved')) {
        const n = parseInt(condition.split('>=')[1]);
        const count = prog.solvedQuestions.filter(id =>
          questions.find(q => q.id === id && q.difficulty === 'Hard')
        ).length;
        unlocked = count >= n;
      } else if (condition.startsWith('expert_solved')) {
        const n = parseInt(condition.split('>=')[1]);
        const count = prog.solvedQuestions.filter(id =>
          questions.find(q => q.id === id && q.difficulty === 'Expert')
        ).length;
        unlocked = count >= n;
      } else if (condition.startsWith('joins_solved')) {
        const n = parseInt(condition.split('>=')[1]);
        const count = prog.solvedQuestions.filter(id =>
          questions.find(q => q.id === id && q.tags.includes('JOIN'))
        ).length;
        unlocked = count >= n;
      } else if (condition.startsWith('window_solved')) {
        const n = parseInt(condition.split('>=')[1]);
        const count = prog.solvedQuestions.filter(id =>
          questions.find(q => q.id === id && q.tags.includes('Window Functions'))
        ).length;
        unlocked = count >= n;
      } else if (condition === 'fast_solve') {
        unlocked = timeTaken !== undefined && timeTaken < 120;
      }

      if (unlocked) earned.push(ach.id);
    });
    return earned;
  }, []);

  const markSolved = useCallback((questionId: number, category: string, xpReward: number, code: string, timeTaken: number) => {
    setProgress(prev => {
      if (prev.solvedQuestions.includes(questionId)) return prev;

      const submission: Submission = {
        questionId,
        code,
        status: 'correct',
        timestamp: new Date().toISOString(),
        timeTaken
      };

      let updated: UserProgress = {
        ...prev,
        solvedQuestions: [...prev.solvedQuestions, questionId],
        xp: prev.xp + xpReward,
        topicProgress: {
          ...prev.topicProgress,
          [category]: (prev.topicProgress[category] || 0) + 1
        },
        submissions: [...prev.submissions, submission]
      };

      updated = updateStreak(updated);

      const newEarned = checkAchievements(updated, timeTaken);
      if (newEarned.length > 0) {
        const bonusXp = newEarned.reduce((sum, id) => {
          const ach = achievements.find(a => a.id === id);
          return sum + (ach?.xpReward || 0);
        }, 0);
        updated = {
          ...updated,
          achievements: [...updated.achievements, ...newEarned],
          xp: updated.xp + bonusXp
        };
        setNewAchievements(newEarned);
      }

      const levelInfo = getLevelTitle(updated.xp);
      updated.level = levelInfo.level;

      // Save solved question to Supabase
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (!user) return;
        supabase.from('user_solved_questions').upsert({
          user_id: user.id,
          question_id: questionId,
          xp_earned: xpReward,
        }, { onConflict: 'user_id,question_id' });
      });

      return updated;
    });
  }, [updateStreak, checkAchievements]);

  const toggleBookmark = useCallback((questionId: number) => {
    setProgress(prev => {
      const isCurrentlyBookmarked = prev.bookmarkedQuestions.includes(questionId);
      // Sync bookmark to Supabase
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (!user) return;
        if (isCurrentlyBookmarked) {
          supabase.from('user_bookmarks').delete().match({ user_id: user.id, question_id: questionId });
        } else {
          supabase.from('user_bookmarks').upsert({ user_id: user.id, question_id: questionId }, { onConflict: 'user_id,question_id' });
        }
      });
      return {
        ...prev,
        bookmarkedQuestions: isCurrentlyBookmarked
          ? prev.bookmarkedQuestions.filter(id => id !== questionId)
          : [...prev.bookmarkedQuestions, questionId]
      };
    });
  }, []);

  const isSolved = useCallback((id: number) => progress.solvedQuestions.includes(id), [progress.solvedQuestions]);
  const isBookmarked = useCallback((id: number) => progress.bookmarkedQuestions.includes(id), [progress.bookmarkedQuestions]);
  const getLevelInfo = useCallback(() => getLevelTitle(progress.xp), [progress.xp]);
  const resetProgress = useCallback(() => { setProgress(DEFAULT_PROGRESS); localStorage.removeItem('sqlace_progress'); }, []);
  const clearNewAchievements = useCallback(() => setNewAchievements([]), []);

  return (
    <ProgressContext.Provider value={{ progress, markSolved, toggleBookmark, isSolved, isBookmarked, getLevelInfo, resetProgress, newAchievements, clearNewAchievements }}>
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgress = () => useContext(ProgressContext);
