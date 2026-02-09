import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { usePartList } from '@/hooks/usePartList';
import { type Part } from '@/apis/part';

interface TreeNodeProps {
  node: Part;
  level: number;
  selectedPartId?: string | null;
  onSelectPart?: (id: string) => void;
}

function TreeNode({
  node,
  level,
  selectedPartId,
  onSelectPart,
}: TreeNodeProps) {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedPartId === node.code;

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectPart?.(node.code);
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div
        className={cn(
          'flex cursor-pointer items-center rounded-sm py-1 text-sm transition-colors select-none hover:bg-gray-100',
          isSelected && 'text-active font-medium',
          level > 0 && 'ml-4'
        )}
        onClick={handleSelect}
      >
        <div className="flex w-full items-center gap-1 px-2">
          {hasChildren ? (
            <span
              className={cn(
                'flex size-4 shrink-0 items-center justify-center text-gray-500 hover:text-gray-700',
                isSelected && 'text-active'
              )}
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
            >
              {isOpen ? (
                <ChevronDown className="size-4" />
              ) : (
                <ChevronRight className="size-4" />
              )}
            </span>
          ) : (
            <span className="size-4" /> // Placeholder for alignment
          )}

          <span
            className={cn(
              'truncate',
              hasChildren ? 'font-medium' : 'text-gray-600',
              isSelected && 'text-active'
            )}
            title={node.name}
          >
            {node.name}
          </span>
        </div>
      </div>

      {hasChildren && (
        <CollapsibleContent>
          <div className="flex flex-col">
            {node.children!.map((child) => (
              <TreeNode
                key={child.partId}
                node={child}
                level={level + 1}
                selectedPartId={selectedPartId}
                onSelectPart={onSelectPart}
              />
            ))}
          </div>
        </CollapsibleContent>
      )}
    </Collapsible>
  );
}

interface CourseHierarchyTreeProps {
  modelId?: string;
  selectedPartId?: string | null;
  onSelectPart?: (id: string | null) => void;
}

export default function CourseHierarchyTree({
  modelId,
  selectedPartId,
  onSelectPart,
}: CourseHierarchyTreeProps) {
  const { data, isLoading, error } = usePartList(modelId);

  return (
    <div className="flex h-full w-full flex-col bg-gray-50 text-black">
      <div className="shrink-0 border-b border-gray-200 p-4 pt-6">
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
          data?.items
            .filter((node) => node.children && node.children.length > 0)
            .map((node) => (
              <TreeNode
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
