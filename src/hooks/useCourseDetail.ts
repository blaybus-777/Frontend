import { useShallow } from 'zustand/react/shallow';
import { useCourseStore } from '@/stores/useCourseStore';

export const useCourseDetail = () => {
  // Store State Integration
  const {
    selectedPartId,
    setSelectedPartId,
    modelId,
    setModelId,
    activeTab,
    isPanelOpen,
    viewMode,
    setViewMode,
    explodeSpace,
    setExplodeSpace,
    explosionLevel,
    transformMode,
    setTransformMode,
    selectedPartTransform,
    setSelectedPartTransform,
  } = useCourseStore(
    useShallow((state) => ({
      selectedPartId: state.selectedPartId,
      setSelectedPartId: state.setSelectedPartId,
      modelId: state.modelId,
      setModelId: state.setModelId,
      activeTab: state.activeTab,
      isPanelOpen: state.isPanelOpen,
      viewMode: state.viewMode,
      setViewMode: state.setViewMode,
      explodeSpace: state.explodeSpace,
      setExplodeSpace: state.setExplodeSpace,
      explosionLevel: state.explosionLevel,
      transformMode: state.transformMode,
      setTransformMode: state.setTransformMode,
      selectedPartTransform: state.selectedPartTransform,
      setSelectedPartTransform: state.setSelectedPartTransform,
    }))
  );

  return {
    // State
    viewMode,
    explodeSpace,
    explosionLevel,
    transformMode,
    selectedPartTransform,
    selectedPartId,
    modelId,
    activeTab,
    isPanelOpen,

    // Actions
    setViewMode,
    setExplodeSpace,
    setTransformMode,
    setSelectedPartTransform,
    setSelectedPartId,
    setModelId,
  };
};
