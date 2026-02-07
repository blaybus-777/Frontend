// import { useParams } from 'react-router-dom';
import { useState } from 'react';
import CourseControlPanel from '@/components/course/CourseControlPanel';
import CourseHierarchyTree from '@/components/course/CourseHierarchyTree';

function CourseDetailPage() {
  // const { id } = useParams();
  
  // 3D Control States
  const [viewMode, setViewMode] = useState<'general' | 'wireframe'>('general');
  const [assemblyMode, setAssemblyMode] = useState<'single' | 'assembly'>('assembly');

  return (
    <div className="max-w-[1440px] w-full mx-auto px-4 md:px-6">
      <div className="flex flex-col lg:flex-row">
        {/* Left Side: Control Panel */}
        <div className="shrink-0 p-3">
          <div className="w-3xs text-black flex flex-col h-[calc(100vh-120px)]">
            <div className="bg-white border border-gray-200 rounded-md shrink-0">
              <CourseControlPanel 
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                assemblyMode={assemblyMode}
                onAssemblyModeChange={setAssemblyMode}
              />
            </div>
            <div className="bg-gray-50 flex-1 overflow-hidden">
               <CourseHierarchyTree />
            </div>
          </div>
        </div>

        {/* Right Side: 3D Viewer Placeholder */}
        <div className="flex-1 bg-gray-100 rounded-xl min-h-[600px] flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-xl font-bold text-gray-400 mb-4">3D Viewer Area</h2>
                <div className="text-left text-sm text-gray-500 bg-white p-4 rounded shadow-sm inline-block">
                    <p>Current State:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>View Mode: {viewMode}</li>
                        <li>Assembly Mode: {assemblyMode}</li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailPage;
