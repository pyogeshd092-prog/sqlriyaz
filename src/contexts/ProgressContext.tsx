import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';
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
  progressLoading: boolean;
}

const ProgressContext = createContext<ProgressContextType>({} as ProgressContextType);

export function ProgressProvider({ children }: { children: ReactNode }) {
  // Always start with DEFAULT (empty) — never read from localStorage on init
  // This prevents one user seeing another user's data
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_PROGRESS);
  const [newAchievements, setNewAchievements] = useState<string[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [progressLoading, setProgressLoading] = useState(true);
  // Ref to track current user ID inside closures without stale captures
  const currentUserIdRef = useRef<string | null>(null);

  // Load this user's progress from Supabase
  const loadFromSupabase = useCallback(async (userId: string) => {
    setProgressLoading(true);
    try {
      // Try user-specific localStorage cache first (for fast load)
      const cacheKey = `sqlace_progress_${userId}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        try {
          setProgress({ ...DEFAULT_PROGRESS, ...JSON.parse(cached) });
        } catch { /* ignore bad cache */ }
      }

      // Always fetch fresh from Supabase to get authoritative data
      const [profileRes, solvedRes, bookmarkRes] = await Promise.all([
        supabase.from('profiles').select('xp, level, streak, longest_streak, last_active').eq('id', userId).single(),
        supabase.from('user_solved_questions').select('question_id, xp_earned').eq('user_id', userId),
        supabase.from('user_bookmarks').select('question_id').eq('user_id', userId),
      ]);

      if (profileRes.error) console.error('[ProgressContext] profiles fetch error:', profileRes.error);
      if (solvedRes.error) console.error('[ProgressContext] user_solved_questions fetch error:', solvedRes.error);
      if (bookmarkRes.error) console.error('[ProgressContext] user_bookmarks fetch error:', bookmarkRes.error);

      const profile = profileRes.data;
      const solvedIds = (solvedRes.data || []).map((r: { question_id: number }) => r.question_id);
      const bookmarkIds = (bookmarkRes.data || []).map((r: { question_id: number }) => r.question_id);
      console.log('[ProgressContext] Loaded from Supabase:', { profile, solvedIds, bookmarkIds });

      // Rebuild topic progress from solved questions
      const topicProgress: Record<string, number> = {};
      solvedIds.forEach((id: number) => {
        const q = questions.find(q => q.id === id);
        if (q) topicProgress[q.category] = (topicProgress[q.category] || 0) + 1;
      });

      const userProgress: UserProgress = {
        ...DEFAULT_PROGRESS,
        xp: profile?.xp || 0,
        level: profile?.level || 1,
        streak: profile?.streak || 0,
        longestStreak: profile?.longest_streak || 0,
        lastActive: profile?.last_active || '',
        solvedQuestions: solvedIds,
        bookmarkedQuestions: bookmarkIds,
        topicProgress,
      };

      setProgress(userProgress);
      // Cache per-user
      localStorage.setItem(cacheKey, JSON.stringify(userProgress));
    } catch (err) {
      console.error('Failed to load progress from Supabase:', err);
    } finally {
      setProgressLoading(false);
    }
  }, []);

  // Listen to auth state changes — load/clear progress accordingly
  useEffect(() => {
    // Check current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        currentUserIdRef.current = session.user.id;
        setCurrentUserId(session.user.id);
        loadFromSupabase(session.user.id);
      } else {
        setProgress(DEFAULT_PROGRESS);
        setCurrentUserId(null);
        setProgressLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        // Use ref (not state) to avoid stale closure bug
        if (session.user.id !== currentUserIdRef.current) {
          currentUserIdRef.current = session.user.id;
          setCurrentUserId(session.user.id);
          await loadFromSupabase(session.user.id);
        }
      } else {
        // Logged out — wipe progress immediately
        currentUserIdRef.current = null;
        setProgress(DEFAULT_PROGRESS);
        setCurrentUserId(null);
        setProgressLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Save to user-specific localStorage cache whenever progress changes (only if logged in)
  useEffect(() => {
    if (!currentUserId) return;
    const cacheKey = `sqlace_progress_${currentUserId}`;
    localStorage.setItem(cacheKey, JSON.stringify(progress));
  }, [progress, currentUserId]);

  // Sync profile stats to Supabase when progress changes
  useEffect(() => {
    if (!currentUserId) return;
    const syncToCloud = async () => {
      // Use upsert so it creates the row if it doesn't exist yet
      const { error } = await supabase.from('profiles').upsert({
        id: currentUserId,
        xp: progress.xp,
        level: progress.level,
        streak: progress.streak,
        longest_streak: progress.longestStreak,
        questions_solved: progress.solvedQuestions.length,
        last_active: progress.lastActive || new Date().toISOString().split('T')[0],
      }, { onConflict: 'id' });
      if (error) console.error('[ProgressContext] syncToCloud error:', error);
    };
    syncToCloud();
  }, [progress.xp, progress.streak, progress.solvedQuestions.length, currentUserId]);

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
  const resetProgress = useCallback(() => {
    setProgress(DEFAULT_PROGRESS);
    if (currentUserId) localStorage.removeItem(`sqlace_progress_${currentUserId}`);
  }, [currentUserId]);
  const clearNewAchievements = useCallback(() => setNewAchievements([]), []);

  return (
    <ProgressContext.Provider value={{
      progress, markSolved, toggleBookmark, isSolved, isBookmarked,
      getLevelInfo, resetProgress, newAchievements, clearNewAchievements, progressLoading
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgress = () => useContext(ProgressContext);
