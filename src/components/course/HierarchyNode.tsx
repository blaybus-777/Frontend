import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { type Part } from '@/apis/part';

interface HierarchyNodeProps {
  node: Part;
  level: number;
  selectedPartId?: string | null;
  onSelectPart?: (id: string | null) => void;
}

export default function HierarchyNode({
  node,
  level,
  selectedPartId,
  onSelectPart,
}: HierarchyNodeProps) {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  // level이 0이고 selectedPartId가 null이면 완제품 선택 상태로 간주
  const isSelected =
    level === 0 && selectedPartId === null
      ? true
      : selectedPartId === String(node.partId);

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    // level이 0인 최상위 노드를 클릭하면 완제품(null)을 선택한 것으로 처리
    if (level === 0) {
      onSelectPart?.(null);
    } else {
      onSelectPart?.(String(node.partId));
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div
        className={cn(
          'flex cursor-pointer items-center rounded-sm py-1 text-sm transition-colors select-none hover:bg-gray-100',
          isSelected && 'text-active font-medium'
        )}
        style={{ paddingLeft: `${level * 16}px` }}
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
            <span className="flex size-4 shrink-0 items-center justify-center text-gray-500">
              <ChevronRight className="size-4" />
            </span>
          )}

          <span
            className={cn(
              'truncate',
              hasChildren ? 'font-medium' : 'text-gray-600',
              isSelected && 'text-active'
            )}
            title={node.englishName}
          >
            {node.englishName}
          </span>
        </div>
      </div>

      {hasChildren && (
        <CollapsibleContent>
          <div className="flex flex-col">
            {node.children!.map((child) => (
              <HierarchyNode
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
