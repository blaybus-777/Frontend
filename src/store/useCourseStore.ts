import { create } from 'zustand';

interface CourseState {
  // State
  activeTab: 'study' | 'memo' | 'ai-tutor';
  isPanelOpen: boolean;
  selectedPartId: string | null;

  // Actions
  setActiveTab: (tab: 'study' | 'memo' | 'ai-tutor') => void;
  togglePanel: () => void;
  setPanelOpen: (isOpen: boolean) => void;
  setSelectedPartId: (id: string | null) => void;
}

export const useCourseStore = create<CourseState>((set) => ({
  // Initial State
  activeTab: 'study',
  isPanelOpen: true,
  selectedPartId: null,

  // Actions
  setActiveTab: (tab) =>
    set((state) => {
      // If clicking the same tab, toggle the panel
      if (state.activeTab === tab) {
        return { isPanelOpen: !state.isPanelOpen };
      }
      // If clicking a different tab, ensure panel is open
      return { activeTab: tab, isPanelOpen: true };
    }),

  togglePanel: () => set((state) => ({ isPanelOpen: !state.isPanelOpen })),
  
  setPanelOpen: (isOpen) => set({ isPanelOpen: isOpen }),
  
  setSelectedPartId: (id) => set({ selectedPartId: id }),
}));
