import { cn } from '@/lib/utils';
import { useState } from 'react';
import { ChevronsDown, ChevronsUp } from 'lucide-react';
import type { Part } from './types';
import { useCourseParts } from '@/hooks/useCourseParts';
import PartItem from './PartItem';

interface PartListSectionProps {
  selectedPartId: string | null;
  parts?: Part[];
  courseId?: string;
}

/**
 * 부품 리스트 섹션 컴포넌트
 * - 단일 책임: 부품 목록 표시 및 확장/축소 기능만 담당
 * - 비즈니스 로직 분리: 부품 데이터 로딩 로직을 useCourseParts 훅으로 분리
 */
export default function PartListSection({
  selectedPartId,
  parts: passedParts,
  courseId,
}: PartListSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { parts: hookParts } = useCourseParts(courseId);
  
  // 외부에서 주입된 parts가 있으면 사용, 없으면 hook에서 가져온 parts 사용
  const displayParts = passedParts ?? hookParts;

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
