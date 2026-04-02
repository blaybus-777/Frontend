import { useCourseStore } from '@/stores/useCourseStore';
import { useParams } from 'react-router-dom';
import type { ComponentType } from 'react';
import PartListSection from './PartListSection';
import StudyTabContent from './StudyTabContent';
import { STUDY_CONTENT_BY_ID } from './studyContentData';
import NoteTabContent from './NoteTabContent';
import AiTutorTabContent from './AiTutorTabContent';
import type { TabType, TabContentProps } from './types';

/**
 * 탭 컴포넌트 매핑
 * - 개방-폐쇄 원칙(OCP): 새로운 탭 추가 시 이 객체에만 항목을 추가하면 됨
 * - 의존성 역전 원칙(DIP): TabContentProps 인터페이스에 의존
 */
const TAB_COMPONENTS: Record<TabType, ComponentType<TabContentProps>> = {
  study: StudyTabContent,
  memo: NoteTabContent,
  'ai-tutor': AiTutorTabContent,
};

/**
 * 코스 어시스턴트 패널 메인 컴포넌트
 * - 단일 책임: 패널 레이아웃 및 탭별 콘텐츠 렌더링 조정만 담당
 * - 개방-폐쇄 원칙: 새로운 탭 추가 시 TAB_COMPONENTS만 수정
 * - 리스코프 치환 원칙: 모든 탭 컴포넌트는 TabContentProps를 구현
 * - 인터페이스 분리 원칙: 각 탭 컴포넌트는 필요한 props만 받음
 * - 의존성 역전 원칙: 구체적인 컴포넌트가 아닌 TabContentProps 인터페이스에 의존
 */
export default function CourseAssistantPanel() {
  const isPanelOpen = useCourseStore((state) => state.isPanelOpen);
  const activeTab = useCourseStore((state) => state.activeTab);
  const selectedPartId = useCourseStore((state) => state.selectedPartId);

  const { id: courseId } = useParams<{ id: string }>();

  if (!isPanelOpen) return null;

  const TabContentComponent = TAB_COMPONENTS[activeTab];

  return (
    <div className="absolute top-0 right-0 bottom-0 flex w-[320px] flex-col bg-white shadow-[-4px_0_15px_-3px_rgba(0,0,0,0.1)]">
      {/* Part List Section - Fixed */}
      <PartListSection selectedPartId={selectedPartId} courseId={courseId} />

      {/* Content Area - Scrollable */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <TabContentComponent
          learningContent={courseId ? STUDY_CONTENT_BY_ID[courseId] : undefined}
        />
      </div>
    </div>
  );
}
