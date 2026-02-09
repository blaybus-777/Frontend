import CourseControlPanel from '@/components/course/CourseControlPanel';
import CourseHierarchyTree from '@/components/course/CourseHierarchyTree';
import CourseRightSidebar from '@/components/course/CourseRightSidebar';
import CourseAssistantPanel from '@/components/course/assistant-panel';
import ModelViewer from '@/components/course/ModelViewer';
import { useCourseDetail } from '@/hooks/useCourseDetail';
import { useCourseModelDetail } from '@/hooks/useCourseModelDetail';
import { useParams } from 'react-router-dom';

interface CourseDetailLayoutProps {
  selectedPartId: string | null;
  onSelectPart: (id: string | null) => void;
}

export default function CourseDetailLayout({
  selectedPartId,
  onSelectPart,
}: CourseDetailLayoutProps) {
  const { id } = useParams();
  const { viewMode, assemblyMode, explosionLevel, explodeSpace } =
    useCourseDetail();
  const { detail, isLoading, isError } = useCourseModelDetail(id);

  const explodeDistance = ((explosionLevel?.[0] ?? 0) / 100) * 2;

  return (
    <div className="w-full">
      <div className="flex h-[calc(100dvh-81px)] flex-col lg:flex-row">
        {/* Left Side: Control Panel */}
        <div className="w-3xs shrink-0 border-l border-gray-200 p-3">
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
            {isLoading ? (
              <div className="text-center text-sm text-gray-500">
                3D 모델을 불러오는 중입니다.
              </div>
            ) : isError || !detail ? (
              <div className="text-center text-sm text-gray-500">
                3D 모델을 불러올 수 없습니다.
              </div>
            ) : (
              <div className="h-full w-full">
                <ModelViewer
                  urls={detail.modelUrls}
                  selectedPartId={selectedPartId}
                  viewMode={viewMode}
                  assemblyMode={assemblyMode}
                  explodeDistance={explodeDistance}
                  explodeSpace={explodeSpace}
                  assetKey={detail.assetKey}
                />
              </div>
            )}

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
