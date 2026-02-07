
import { useState } from 'react';
import { useCourseStore } from '@/store/useCourseStore';

export const useCourseDetail = () => {
  // 3D Control States
  // 'general' means standard rendering, 'wireframe' shows the mesh structure
  const [viewMode, setViewMode] = useState<'general' | 'wireframe'>('general');
  
  // 'single' focuses on one part, 'assembly' shows the whole model
  const [assemblyMode, setAssemblyMode] = useState<'single' | 'assembly'>('assembly');

  // Store State Integration
  const { 
    selectedPartId, 
    setSelectedPartId, 
    activeTab,
    isPanelOpen
  } = useCourseStore();

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
