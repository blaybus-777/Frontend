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
}

function TreeNode({ node, level }: TreeNodeProps) {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div
        className={cn(
          "flex items-center py-1 rounded-sm hover:bg-gray-100 cursor-pointer text-sm select-none",
          level > 0 && "ml-4"
        )}
      >
        <CollapsibleTrigger asChild>
          <div className="flex items-center gap-1 w-full px-2">
            {hasChildren ? (
              <span className="flex items-center justify-center size-4 shrink-0 text-gray-500">
                {isOpen ? (
                  <ChevronDown className="size-4" />
                ) : (
                  <ChevronRight className="size-4" />
                )}
              </span>
            ) : (
              <span className="size-4" /> // Placeholder for alignment
            )}
            
            <span className={cn("truncate", hasChildren ? "font-medium" : "text-gray-600")}>
                {node.name}
            </span>
          </div>
        </CollapsibleTrigger>
      </div>

      {hasChildren && (
        <CollapsibleContent>
          <div className="flex flex-col">
            {node.children!.map((child) => (
              <TreeNode key={child.id} node={child} level={level + 1} />
            ))}
          </div>
        </CollapsibleContent>
      )}
    </Collapsible>
  );
}

export default function CourseHierarchyTree() {
  return (
    <div className="w-full text-black flex flex-col h-full bg-gray-50">
      <div className="p-4 pt-6 border-b border-gray-200 shrink-0">
        <h2 className="text-sm font-bold text-gray-500">하이라키 구조 테이블</h2>
      </div>
      <div className="p-2 overflow-y-auto flex-1">
        {DRONE_PARTS.map((node) => (
          <TreeNode key={node.id} node={node} level={0} />
        ))}
      </div>
    </div>
  );
}
