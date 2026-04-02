import { cn } from '@/lib/utils';
import { useState, useMemo } from 'react';
import { ChevronsDown, ChevronsUp } from 'lucide-react';
import type { Part } from './types';
import PartItem from './PartItem';
import { useCourseStore } from '@/stores/useCourseStore';
import { usePartList } from '@/hooks/usePartList';
import { useCourseModelDetail } from '@/hooks/useCourseModelDetail';

interface PartListSectionProps {
  selectedPartId: string | null;
  parts?: Part[];
  courseId?: string; // modelId와 동일하게 쓰임
}

/**
 * 부품 리스트 섹션 컴포넌트
 * - 단일 책임: 부품 목록 표시 및 확장/축소 기능만 담당
 */
export default function PartListSection({
  selectedPartId,
  parts: passedParts,
}: PartListSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const setSelectedPartId = useCourseStore((state) => state.setSelectedPartId);
  const modelId = useCourseStore((state) => state.modelId);

  const { data: apiPartData } = usePartList(modelId ?? undefined);
  const { detail } = useCourseModelDetail(modelId ?? undefined);

  const hookParts = useMemo(() => {
    if (!apiPartData || !detail) return [];

    return apiPartData.items
      .filter((apiPart) => apiPart.code !== 'nit') // nit 부품 제외
      .map((apiPart): Part => {
        const matchingUrl = detail.parts[apiPart.code] || '';

        return {
          id: String(apiPart.partId),
          name: apiPart.name,
          image: matchingUrl, // GLB URL을 이미지로 사용
          englishName: apiPart.englishName,
        };
      });
  }, [apiPartData, detail]);

  // 외부에서 주입된 parts가 있으면 사용, 없으면 hook에서 가져온 parts 사용
  const displayParts = passedParts ?? hookParts;

  const handlePartSelect = (id: string) => {
    const nextId = selectedPartId === id ? null : id;
    setSelectedPartId(nextId);
  };

  return (
    <section>
      <h3 className="border-b px-4 py-2 text-sm font-bold text-neutral-700">
        부품 리스트
      </h3>

      <div className="relative border-b px-4 py-3">
        <div className="rounded-t-lg border border-b-0 p-3 pb-2">
          <div
            className={cn(
              'custom-scrollbar overflow-y-auto transition-all duration-300 ease-in-out',
              isExpanded ? 'max-h-[170px]' : 'max-h-[80px]'
            )}
            style={{
              height: 'auto',
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-y',
            }}
          >
            <div className="grid grid-cols-4 gap-2 pb-2">
              {displayParts.map((part) => (
                <PartItem
                  key={part.id}
                  part={part}
                  isSelected={selectedPartId === part.id}
                  onSelect={handlePartSelect}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex h-6 w-full items-center justify-center rounded-b-lg bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200"
        >
          {isExpanded ? <ChevronsUp size={16} /> : <ChevronsDown size={16} />}
        </button>
      </div>
    </section>
  );
}
