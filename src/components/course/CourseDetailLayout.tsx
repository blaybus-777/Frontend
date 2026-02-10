import CourseControlPanel from '@/components/course/CourseControlPanel';
import CourseHierarchyTree from '@/components/course/CourseHierarchyTree';
import CourseRightSidebar from '@/components/course/CourseRightSidebar';
import CourseAssistantPanel from '@/components/course/assistant-panel';
import ModelViewer from '@/components/course/ModelViewer';
import { useCourseDetail } from '@/hooks/useCourseDetail';
import { useEffect, useState } from 'react';
import { useCourseModelDetail } from '@/hooks/useCourseModelDetail';
import { useParams } from 'react-router-dom';
import { PART_ID_MAPPING } from '@/data/partMapping';

interface CourseDetailLayoutProps {
  selectedPartId: string | null;
  onSelectPart: (id: string | null) => void;
  viewerStorageKey?: string;
}

export default function CourseDetailLayout({
  selectedPartId,
  onSelectPart,
  viewerStorageKey,
}: CourseDetailLayoutProps) {
  const { id } = useParams();
  const { viewMode, explosionLevel, explodeSpace, setModelId } =
    useCourseDetail();
  const { detail, isLoading, isError } = useCourseModelDetail(id);
  const [stableDetail, setStableDetail] = useState(detail ?? null);

  // modelId가 변경될 때 store 업데이트
  useEffect(() => {
    if (id) {
      setModelId(id);
    }
  }, [id, setModelId]);

  useEffect(() => {
    if (!id) return;
    try {
      const raw = localStorage.getItem(`course-detail:${id}`);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed && parsed.modelUrls && parsed.assetKey) {
        setStableDetail(parsed);
      }
    } catch {
      // ignore cache errors
    }
  }, [id]);

  useEffect(() => {
    if (detail) {
      setStableDetail(detail);
    }
  }, [detail]);

  const explodeDistance = ((explosionLevel?.[0] ?? 0) / 100) * 0.6;
  const resolvedDetail = detail ?? stableDetail;
  const storageKey = viewerStorageKey ?? (id ? `viewer:${id}` : undefined);

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
                modelId={id}
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
            <div className="h-full w-full">
              <ModelViewer
                urls={resolvedDetail?.modelUrls ?? []}
                selectedPartId={selectedPartId}
                onSelect={(part) => {
                  if (part) {
                    const id = PART_ID_MAPPING[part.name];
                    if (id) onSelectPart(id);
                  } else {
                    onSelectPart(null);
                  }
                }}
                viewMode={viewMode}
                explodeDistance={explodeDistance}
                explodeSpace={explodeSpace}
                assetKey={resolvedDetail?.assetKey}
                storageKey={storageKey}
              />
            </div>

            {isLoading && !resolvedDetail && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100">
                <div className="text-center text-sm text-gray-500">
                  3D 모델을 불러오는 중입니다.
                </div>
              </div>
            )}

            {isError && !resolvedDetail && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100">
                <div className="text-center text-sm text-gray-500">
                  3D 모델을 불러올 수 없습니다.
                </div>
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
