import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  // Sidebar
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;

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
  addXp: (xp: number) => void;
  calculateLevel: () => void;

  // Conquistas
  achievements: string[];
  unlockAchievement: (achievementId: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Sidebar
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),

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
      addXp: (xp) => {
        const newXp = get().xpTotal + xp;
        set({ xpTotal: newXp });
        get().calculateLevel();
      },
      calculateLevel: () => {
        const xp = get().xpTotal;
        // Fórmula: nível = floor(xp / 100) + 1
        const nivel = Math.floor(xp / 100) + 1;
        set({ nivel });
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
