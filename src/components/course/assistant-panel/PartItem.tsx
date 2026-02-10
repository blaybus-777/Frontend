import { cn } from '@/lib/utils';
import type { Part } from './types';
import ModelThumbnail from '@/components/common/ModelThumbnail';

/**
 * 개별 부품 아이템 컴포넌트
 * - 단일 책임: 개별 부품의 표시만 담당
 */
interface PartItemProps {
  part: Part;
  isSelected: boolean;
  onSelect?: (partId: string) => void; // Optional: can be used for explicit click handling if needed
}

export default function PartItem({
  part,
  isSelected,
  onSelect,
}: PartItemProps) {
  const isGlb = part.image.endsWith('.glb');

  return (
    <button
      onClick={() => {
        onSelect?.(part.id);
      }}
      className="group flex w-full shrink-0 flex-col items-center gap-1 focus:outline-none"
    >
      <div
        className={cn(
          'aspect-square w-full overflow-hidden rounded-lg transition-all',
          isSelected
            ? 'bg-blue-50 shadow-sm ring-1 ring-blue-500'
            : 'hover:bg-foundation-blue-1 bg-white'
        )}
      >
        {isGlb ? (
          <ModelThumbnail modelUrl={part.image} />
        ) : (
          <img
            src={part.image}
            alt={part.name}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <span
        className={cn(
          'w-full truncate text-center text-[10px] transition-colors',
          isSelected
            ? 'font-medium text-blue-600'
            : 'group-hover:text-active text-gray-500 group-hover:font-medium'
        )}
      >
        {part.englishName}
      </span>
    </button>
  );
}
