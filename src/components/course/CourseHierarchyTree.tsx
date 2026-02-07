import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { DRONE_PARTS, type PartNode } from "@/data/droneParts";
import { cn } from "@/lib/utils";

interface TreeNodeProps {
  node: PartNode;
  level: number;
  selectedPartId?: string | null;
  onSelectPart?: (id: string) => void;
}

function TreeNode({ node, level, selectedPartId, onSelectPart }: TreeNodeProps) {
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
          "flex items-center py-1 rounded-sm hover:bg-gray-100 cursor-pointer text-sm select-none transition-colors",
          isSelected && "bg-blue-50 text-[#2831ff] font-medium",
          level > 0 && "ml-4"
        )}
        onClick={handleSelect}
      >
        <div className="flex items-center gap-1 w-full px-2">
            {hasChildren ? (
              <span 
                className={cn(
                  "flex items-center justify-center size-4 shrink-0 text-gray-500 hover:text-gray-700",
                  isSelected && "text-[#2831ff]"
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
            
            <span className={cn("truncate", hasChildren ? "font-medium" : "text-gray-600", isSelected && "text-[#2831ff]")}>
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

export default function CourseHierarchyTree({ selectedPartId, onSelectPart }: CourseHierarchyTreeProps) {
  console.log(selectedPartId);
  
  return (
    <div className="w-full text-black flex flex-col h-full bg-gray-50">
      <div className="p-4 pt-6 border-b border-gray-200 shrink-0">
        <h2 className="text-sm font-bold text-gray-500">하이라키 구조 테이블</h2>
      </div>
      <div className="p-2 overflow-y-auto flex-1">
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
