// import { useParams } from 'react-router-dom';
import { useState } from 'react';
import CourseControlPanel from '@/components/course/CourseControlPanel';
import CourseHierarchyTree from '@/components/course/CourseHierarchyTree';
import CourseRightSidebar from '@/components/course/CourseRightSidebar';
import CourseAssistantPanel from '@/components/course/CourseAssistantPanel';
import { useCourseStore } from '@/store/useCourseStore';

function CourseDetailPage() {
  // const { id } = useParams();
  
  // 3D Control States
  const [viewMode, setViewMode] = useState<'general' | 'wireframe'>('general');
  const [assemblyMode, setAssemblyMode] = useState<'single' | 'assembly'>('assembly');
  
  // Store State
  const { 
    selectedPartId, 
    setSelectedPartId, 
    activeTab,
    isPanelOpen
  } = useCourseStore();

  return (
    <div className="max-w-[1440px] w-full mx-auto px-4 md:px-6">
      <div className="flex flex-col lg:flex-row h-[calc(100dvh-81px)]">
        {/* Left Side: Control Panel */}
        <div className="shrink-0 p-3 w-3xs mr-4">
          <div className="text-black flex flex-col h-full">
            <div className="bg-white border border-gray-200 rounded-md shrink-0 mb-3 shadow-sm">
              <CourseControlPanel 
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                assemblyMode={assemblyMode}
                onAssemblyModeChange={setAssemblyMode}
              />
            </div>
            <div className="bg-gray-50 flex-1 overflow-hidden">
               <CourseHierarchyTree 
                  selectedPartId={selectedPartId}
                  onSelectPart={setSelectedPartId}
               />
            </div>
          </div>
        </div>

        {/* Right Side Wrapper: Viewer + Sidebar */}
        <div className="flex flex-1 overflow-hidden">
          {/* Center: 3D Viewer Placeholder */}
          <div className="flex-1 bg-gray-100 flex items-center justify-center relative overflow-hidden">
              <div className="text-center">
                  <h2 className="text-xl font-bold text-gray-400 mb-4">3D Viewer Area</h2>
                  <div className="text-left text-sm text-gray-500 bg-white p-4 rounded shadow-sm inline-block">
                      <p>Current State:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                          <li>View Mode: {viewMode}</li>
                          <li>Assembly Mode: {assemblyMode}</li>
                          <li>Selected Part: {selectedPartId || 'None'}</li>
                          <li>Active Tab: {activeTab}</li>
                          <li>Panel Open: {isPanelOpen ? 'Yes' : 'No'}</li>
                      </ul>
                  </div>
              </div>

              {/* Assistant Panel Overlay */}
              <CourseAssistantPanel />
          </div>

          {/* Right Side: Sidebar */}
          <div className="shrink-0 h-full bg-white">
              <CourseRightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailPage;
