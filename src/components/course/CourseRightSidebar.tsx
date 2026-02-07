import { cn } from "@/lib/utils";

// Icon imports
import StudyIcon from "@/assets/icons/study.svg";
import MemoIcon from "@/assets/icons/memo.svg";
import AiTutorIcon from "@/assets/icons/ai-tutor.svg";

interface CourseRightSidebarProps {
  className?: string;
  selectedPartId?: string | null;
  activeTab?: 'study' | 'memo' | 'ai-tutor';
  onTabChange?: (tab: 'study' | 'memo' | 'ai-tutor') => void;
}

export default function CourseRightSidebar({ className, selectedPartId: _selectedPartId, activeTab = 'study', onTabChange }: CourseRightSidebarProps) {
  return (
    <aside
      className={cn(
        "w-[68px] flex flex-col items-center bg-white border-l border-gray-200 h-full",
        className
      )}
    >
      <div className="flex flex-col w-full items-center">
        {/* Study Button */}
        <SidebarItem
          icon={StudyIcon}
          label="학습"
          isActive={activeTab === 'study'}
          onClick={() => onTabChange?.('study')}
        />
        
        {/* Memo Button */}
        <SidebarItem
            icon={MemoIcon}
            label="메모"
            isActive={activeTab === 'memo'}
            onClick={() => onTabChange?.('memo')}
        />

        {/* AI Tutor Button */}
        <SidebarItem
          icon={AiTutorIcon}
          label="AI 튜터"
          isActive={activeTab === 'ai-tutor'}
          onClick={() => onTabChange?.('ai-tutor')}
        />
      </div>
    </aside>
  );
}

interface SidebarItemProps {
  icon: string;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}

function SidebarItem({ icon, label, onClick, isActive }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-1 px-2 py-5 transition-colors w-full group",
        isActive ? "text-blue-600" : "text-gray-900 hover:bg-gray-50"
      )}
    >
      <div className="size-6 flex items-center justify-center">
        <img 
            src={icon}
            alt={label}
            className={cn(
                "w-full h-full object-contain transition-all",
                isActive && "filter-active-blue"
            )}
            style={isActive ? {
                filter: "invert(36%) sepia(74%) saturate(4649%) hue-rotate(209deg) brightness(100%) contrast(91%)" // Blue-600 approximation
            } : undefined}
        />
      </div>
      <span className="text-[0.75rem] font-medium">
        {label}
      </span>
    </button>
  );
}
