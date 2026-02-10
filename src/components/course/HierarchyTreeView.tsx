import { type Part } from '@/apis/part';
import HierarchyNode from './HierarchyNode';

interface HierarchyTreeViewProps {
  items: Part[];
  selectedPartId?: string | null;
  onSelectPart?: (id: string | null) => void;
  isLoading?: boolean;
  error?: unknown;
}

export default function HierarchyTreeView({
  items,
  selectedPartId,
  onSelectPart,
  isLoading,
  error,
}: HierarchyTreeViewProps) {
  return (
    <div className="flex h-full w-full flex-col bg-gray-50 text-black">
      <div
        className="shrink-0 cursor-pointer border-b border-gray-200 p-4 pt-6 hover:bg-gray-100"
        onClick={() => onSelectPart?.(null)}
      >
        <h2 className="text-sm font-bold text-gray-500">
          하이라키 구조 테이블
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {isLoading ? (
          <div className="p-4 text-center text-sm text-gray-500">
            로딩 중...
          </div>
        ) : error ? (
          <div className="p-4 text-center text-sm text-red-500">
            데이터를 불러올 수 없습니다.
          </div>
        ) : (
          items.map((node) => (
            <HierarchyNode
              key={node.partId}
              node={node}
              level={0}
              selectedPartId={selectedPartId}
              onSelectPart={(id) => onSelectPart?.(id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
