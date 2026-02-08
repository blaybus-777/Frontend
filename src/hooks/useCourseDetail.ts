import { useShallow } from 'zustand/react/shallow';
import { useCourseStore } from '@/store/useCourseStore';

export const useCourseDetail = () => {
  // Store State Integration
  const {
    selectedPartId,
    setSelectedPartId,
    activeTab,
    isPanelOpen,
    viewMode,
    setViewMode,
    assemblyMode,
    setAssemblyMode,
    explodeSpace,
    setExplodeSpace,
    explosionLevel,
  } = useCourseStore(
    useShallow((state) => ({
      selectedPartId: state.selectedPartId,
      setSelectedPartId: state.setSelectedPartId,
      activeTab: state.activeTab,
      isPanelOpen: state.isPanelOpen,
      viewMode: state.viewMode,
      setViewMode: state.setViewMode,
      assemblyMode: state.assemblyMode,
      setAssemblyMode: state.setAssemblyMode,
      explodeSpace: state.explodeSpace,
      setExplodeSpace: state.setExplodeSpace,
      explosionLevel: state.explosionLevel,
    }))
  );

  return {
    // State
    viewMode,
    assemblyMode,
    explodeSpace,
    explosionLevel,
    selectedPartId,
    activeTab,
    isPanelOpen,

    // Actions
    setViewMode,
    setAssemblyMode,
    setExplodeSpace,
    setSelectedPartId,
  };
};
