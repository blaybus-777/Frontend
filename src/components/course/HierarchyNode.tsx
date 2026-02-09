import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { type Part } from '@/apis/part';

interface HierarchyNodeProps {
  node: Part;
  level: number;
  selectedPartId?: string | null;
  onSelectPart?: (id: string) => void;
}

export default function HierarchyNode({
  node,
  level,
  selectedPartId,
  onSelectPart,
}: HierarchyNodeProps) {
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
            <span className="size-4" />
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
