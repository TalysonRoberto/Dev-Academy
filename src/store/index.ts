import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  // Sidebar
  sidebarOpen: boolean;
  expandedContents: string[];
  expandedTopics: string[];
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleContent: (contentId: string) => void;
  toggleTopic: (topicId: string) => void;

  // Navegação
  currentContent: string | null;
  currentTopic: string | null;
  currentLesson: string | null;
  setCurrentContent: (content: string | null) => void;
  setCurrentTopic: (topic: string | null) => void;
  setCurrentLesson: (lesson: string | null) => void;

  // Progresso
  xpTotal: number;
  nivel: number;
  completedLessons: string[];
  addXp: (xp: number) => void;
  calculateLevel: () => void;
  completeLesson: (lessonId: string) => void;
  isLessonCompleted: (lessonId: string) => boolean;

  // Conquistas
  achievements: string[];
  unlockAchievement: (achievementId: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Sidebar
      sidebarOpen: true,
      expandedContents: [],
      expandedTopics: [],
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleContent: (contentId) => {
        const current = get().expandedContents;
        if (current.includes(contentId)) {
          set({ expandedContents: current.filter((id) => id !== contentId) });
        } else {
          set({ expandedContents: [...current, contentId] });
        }
      },
      toggleTopic: (topicId) => {
        const current = get().expandedTopics;
        if (current.includes(topicId)) {
          set({ expandedTopics: current.filter((id) => id !== topicId) });
        } else {
          set({ expandedTopics: [...current, topicId] });
        }
      },

      // Navegação
      currentContent: null,
      currentTopic: null,
      currentLesson: null,
      setCurrentContent: (content) => set({ currentContent: content }),
      setCurrentTopic: (topic) => set({ currentTopic: topic }),
      setCurrentLesson: (lesson) => set({ currentLesson: lesson }),

      // Progresso
      xpTotal: 0,
      nivel: 1,
      completedLessons: [],
      addXp: (xp) => {
        const newXp = get().xpTotal + xp;
        set({ xpTotal: newXp });
        get().calculateLevel();
      },
      calculateLevel: () => {
        const xp = get().xpTotal;
        const nivel = Math.floor(xp / 100) + 1;
        set({ nivel });
      },
      completeLesson: (lessonId) => {
        const current = get().completedLessons;
        if (!current.includes(lessonId)) {
          set({ completedLessons: [...current, lessonId] });
        }
      },
      isLessonCompleted: (lessonId) => {
        return get().completedLessons.includes(lessonId);
      },

      // Conquistas
      achievements: [],
      unlockAchievement: (achievementId) => {
        const current = get().achievements;
        if (!current.includes(achievementId)) {
          set({ achievements: [...current, achievementId] });
        }
      },
    }),
    {
      name: 'dev-academy-storage',
    }
  )
);
