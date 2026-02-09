import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { DRONE_PARTS, type PartNode } from '@/data/droneParts';
import { cn } from '@/lib/utils';

interface TreeNodeProps {
  node: PartNode;
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
  const isSelected = selectedPartId === node.id;

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectPart?.(node.id);
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
                key={child.id}
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
  selectedPartId?: string | null;
  onSelectPart?: (id: string | null) => void;
}

export default function CourseHierarchyTree({
  selectedPartId,
  onSelectPart,
}: CourseHierarchyTreeProps) {
  return (
    <div className="flex h-full w-full flex-col bg-gray-50 text-black">
      <div className="shrink-0 border-b border-gray-200 p-4">
        <h2 className="text-sm font-bold text-gray-500">
          하이라키 구조 테이블
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {DRONE_PARTS.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            level={0}
            selectedPartId={selectedPartId}
            onSelectPart={(id) => onSelectPart?.(id)}
          />
        ))}
      </div>
    </div>
  );
}
