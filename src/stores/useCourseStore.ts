import { create } from 'zustand';

interface CourseState {
  // State
  activeTab: 'study' | 'memo' | 'ai-tutor';
  isPanelOpen: boolean;
  selectedPartId: string | null;
  modelId: string | null;

  // Actions
  setActiveTab: (tab: 'study' | 'memo' | 'ai-tutor') => void;
  togglePanel: () => void;
  setPanelOpen: (isOpen: boolean) => void;
  setSelectedPartId: (id: string | null) => void;
  setModelId: (id: string | null) => void;

  // 3D Control
  explosionLevel: number[];
  setExplosionLevel: (level: number[]) => void;

  viewMode: 'general' | 'wireframe';
  setViewMode: (mode: 'general' | 'wireframe') => void;

  explodeSpace: 'local' | 'world';
  setExplodeSpace: (space: 'local' | 'world') => void;

  transformMode: 'translate' | 'rotate';
  setTransformMode: (mode: 'translate' | 'rotate') => void;

  selectedPartTransform: { x: number; y: number; z: number } | null;
  setSelectedPartTransform: (
    value: { x: number; y: number; z: number } | null
  ) => void;
}

export const useCourseStore = create<CourseState>((set) => ({
  // Initial State
  activeTab: 'study',
  isPanelOpen: true,
  selectedPartId: null,
  modelId: null,

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

  setModelId: (id) => set({ modelId: id }),

  // 3D Control
  explosionLevel: [0],
  setExplosionLevel: (level) => set({ explosionLevel: level }),

  viewMode: 'general',
  setViewMode: (mode) => set({ viewMode: mode }),

  explodeSpace: 'local',
  setExplodeSpace: (space) => set({ explodeSpace: space }),

  transformMode: 'translate',
  setTransformMode: (mode) => set({ transformMode: mode }),

  selectedPartTransform: null,
  setSelectedPartTransform: (value) => set({ selectedPartTransform: value }),
}));
