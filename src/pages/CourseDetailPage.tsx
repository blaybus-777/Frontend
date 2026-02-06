import { useParams } from 'react-router-dom';
import { useState } from 'react';
import CourseControlPanel from '@/components/course/CourseControlPanel';

function CourseDetailPage() {
  const { id } = useParams();
  
  // 3D Control States
  const [viewMode, setViewMode] = useState<'general' | 'wireframe'>('general');
  const [assemblyMode, setAssemblyMode] = useState<'single' | 'assembly'>('assembly');
  const [explosionLevel, setExplosionLevel] = useState(0);

  return (
    <div className="max-w-[1440px] w-full mx-auto px-4 md:px-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: Control Panel */}
        <div className="shrink-0 p-3">
          <CourseControlPanel 
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            assemblyMode={assemblyMode}
            onAssemblyModeChange={setAssemblyMode}
            explosionLevel={explosionLevel}
            onExplosionLevelChange={setExplosionLevel}
          />
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
                        <li>Explosion: {explosionLevel}%</li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailPage;
