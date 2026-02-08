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
  
  // 3D Control
  explosionLevel: number[];
  setExplosionLevel: (level: number[]) => void;
  
  viewMode: 'general' | 'wireframe';
  setViewMode: (mode: 'general' | 'wireframe') => void;
  
  assemblyMode: 'single' | 'assembly';
  setAssemblyMode: (mode: 'single' | 'assembly') => void;
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

  // 3D Control
  explosionLevel: [0],
  setExplosionLevel: (level) => set({ explosionLevel: level }),

  viewMode: 'general',
  setViewMode: (mode) => set({ viewMode: mode }),

  assemblyMode: 'assembly',
  setAssemblyMode: (mode) => set({ assemblyMode: mode }),
}));
