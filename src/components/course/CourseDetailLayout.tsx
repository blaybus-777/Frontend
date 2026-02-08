import CourseControlPanel from '@/components/course/CourseControlPanel';
import CourseHierarchyTree from '@/components/course/CourseHierarchyTree';
import CourseRightSidebar from '@/components/course/CourseRightSidebar';
import CourseAssistantPanel from '@/components/course/CourseAssistantPanel';

interface CourseDetailLayoutProps {
  selectedPartId: string | null;
  onSelectPart: (id: string | null) => void;
}

export default function CourseDetailLayout({
  selectedPartId,
  onSelectPart,
}: CourseDetailLayoutProps) {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 md:px-6">
      <div className="flex h-[calc(100dvh-81px)] flex-col lg:flex-row">
        {/* Left Side: Control Panel */}
        <div className="mr-4 w-3xs shrink-0 p-3">
          <div className="flex h-full flex-col text-black">
            <div className="mb-3 shrink-0 rounded-md border border-gray-200 bg-white shadow-sm">
              <CourseControlPanel />
            </div>
            <div className="flex-1 overflow-hidden bg-gray-50">
              <CourseHierarchyTree
                selectedPartId={selectedPartId}
                onSelectPart={onSelectPart}
              />
            </div>
          </div>
        </div>

        {/* Right Side Wrapper: Viewer + Sidebar */}
        <div className="flex flex-1 overflow-hidden">
          {/* Center: 3D Viewer Placeholder */}
          <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-gray-100">
            <div className="text-center">
              <h2 className="mb-4 text-xl font-bold text-gray-400">
                3D Viewer Area
              </h2>
            </div>

            {/* Assistant Panel Overlay */}
            <CourseAssistantPanel />
          </div>

          {/* Right Side: Sidebar */}
          <div className="h-full shrink-0 bg-white">
            <CourseRightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
