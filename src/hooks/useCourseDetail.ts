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
    }))
  );

  return {
    // State
    viewMode,
    assemblyMode,
    selectedPartId,
    activeTab,
    isPanelOpen,

    // Actions
    setViewMode,
    setAssemblyMode,
    setSelectedPartId,
  };
};
