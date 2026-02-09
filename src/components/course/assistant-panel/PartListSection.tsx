import { cn } from '@/lib/utils';
import { useState } from 'react';
import { ChevronsDown, ChevronsUp } from 'lucide-react';
import { MOCK_PARTS } from './mockData';
import type { Part } from './types';

interface PartListSectionProps {
  selectedPartId: string | null;
  parts?: Part[];
}

/**
 * 부품 리스트 섹션 컴포넌트
 * - 단일 책임: 부품 목록 표시 및 확장/축소 기능만 담당
 */
export default function PartListSection({
  selectedPartId,
  parts = MOCK_PARTS,
}: PartListSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

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
              {parts.map((part) => (
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

/**
 * 개별 부품 아이템 컴포넌트
 * - 단일 책임: 개별 부품의 표시만 담당
 */
interface PartItemProps {
  part: Part;
  isSelected: boolean;
}

function PartItem({ part, isSelected }: PartItemProps) {
  return (
    <button className="group flex w-full shrink-0 flex-col items-center gap-1 focus:outline-none">
      <div
        className={cn(
          'aspect-square w-full overflow-hidden rounded-lg border transition-all',
          isSelected
            ? 'border-blue-500 bg-blue-50 shadow-sm ring-1 ring-blue-500'
            : 'border-gray-200 bg-gray-50 hover:border-blue-300'
        )}
      >
        <img
          src={part.image}
          alt={part.name}
          className="h-full w-full object-cover"
        />
      </div>
      <span
        className={cn(
          'w-full truncate text-center text-[10px] transition-colors',
          isSelected ? 'font-medium text-blue-600' : 'text-gray-500'
        )}
      >
        {part.name}
      </span>
    </button>
  );
}
