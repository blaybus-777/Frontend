import { cn } from '@/lib/utils';
import { useCourseStore } from '@/store/useCourseStore';

// Icon imports
import StudyIcon from '@/assets/icons/study.svg';
import MemoIcon from '@/assets/icons/memo.svg';
import AiTutorIcon from '@/assets/icons/ai-tutor.svg';

interface CourseRightSidebarProps {
  className?: string;
}

export default function CourseRightSidebar({
  className,
}: CourseRightSidebarProps) {
  const { activeTab, setActiveTab } = useCourseStore();

  return (
    <aside
      className={cn(
        'flex h-full w-[68px] flex-col items-center border-l border-gray-200 bg-white',
        className
      )}
    >
      <div className="flex w-full flex-col items-center">
        {/* Study Button */}
        <SidebarItem
          icon={StudyIcon}
          label="학습"
          isActive={activeTab === 'study'}
          onClick={() => setActiveTab('study')}
        />

        {/* Memo Button */}
        <SidebarItem
          icon={MemoIcon}
          label="메모"
          isActive={activeTab === 'memo'}
          onClick={() => setActiveTab('memo')}
        />

        {/* AI Tutor Button */}
        <SidebarItem
          icon={AiTutorIcon}
          label="AI 튜터"
          isActive={activeTab === 'ai-tutor'}
          onClick={() => setActiveTab('ai-tutor')}
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
        'group flex w-full flex-col items-center justify-center gap-1 px-2 py-5 transition-colors',
        isActive ? 'text-blue-600' : 'text-gray-900 hover:bg-gray-50'
      )}
    >
      <div className="flex size-6 items-center justify-center">
        <img
          src={icon}
          alt={label}
          className={cn(
            'h-full w-full object-contain transition-all',
            isActive && 'filter-active-blue'
          )}
          style={
            isActive
              ? {
                  filter:
                    'invert(36%) sepia(74%) saturate(4649%) hue-rotate(209deg) brightness(100%) contrast(91%)', // Blue-600 approximation
                }
              : undefined
          }
        />
      </div>
      <span className="text-[0.75rem] font-medium">{label}</span>
    </button>
  );
}
