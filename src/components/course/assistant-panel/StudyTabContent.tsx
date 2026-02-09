import { useParams } from 'react-router-dom';
import { useCourseStore } from '@/stores/useCourseStore';
import { STUDY_CONTENT_BY_ID, PART_STUDY_CONTENT } from './studyContentData';
import { MOCK_LEARNING_CONTENT } from './mockData';
import { usePartDetail } from '@/hooks/usePartDetail';
import { useMemo } from 'react';

/**
 * 학습 탭 콘텐츠 컴포넌트
 * - 직접 전역 상태를 구독하여 선택된 부품 또는 코스에 맞는 콘텐츠를 렌더링합니다.
 */
export default function StudyTabContent() {
  const { id: courseId } = useParams<{ id: string }>();
  const selectedPartId = useCourseStore((state) => state.selectedPartId);
  const modelId = useCourseStore((state) => state.modelId);

  // API를 통해 상세 정보 가져오기
  const { partDetail, isLoading } = usePartDetail(modelId, selectedPartId);

  // 현재 컨텍스트에 맞는 학습 데이터 결정
  const learningContent = useMemo(() => {
    // 1. API에서 가져온 상세 정보가 있으면 우선 사용
    if (selectedPartId && partDetail) {
      return {
        title: `${partDetail.name} (${partDetail.englishName})`,
        description: [partDetail.description],
        materials: partDetail.commonMaterials,
        theory: partDetail.keyEngineeringTheories,
        role: partDetail.functionalRoles,
      };
    }

    if (!courseId) return MOCK_LEARNING_CONTENT;

    // 2. 선택된 부품 데이터가 있는지 목 데이터에서 확인 (API 데이터가 없을 경우를 대비한 폴백)
    if (selectedPartId && !isLoading) {
      const partContent = PART_STUDY_CONTENT[courseId]?.[selectedPartId];
      if (partContent) return partContent;

      // 디버깅을 위한 로그: 부품은 선택되었으나 데이터를 찾지 못한 경우
      console.warn(
        `No data found for partId: "${selectedPartId}" in course: "${courseId}"`
      );
    }

    // 3. 부품이 선택되지 않았거나 데이터가 없으면 코스 전체 데이터 반환
    return STUDY_CONTENT_BY_ID[courseId] || MOCK_LEARNING_CONTENT;
  }, [courseId, selectedPartId, partDetail, isLoading]);

  return (
    <div className="flex h-full flex-col bg-gray-50">
      {/* Header */}
      <h3 className="bg-foundation-white flex-none border-b px-6 py-4 text-sm font-bold text-gray-500">
        학습 포인트
      </h3>

      {/* Scrollable Content Area */}
      <div
        className="custom-scrollbar flex-1 overflow-y-auto p-4"
        style={{
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-y',
        }}
      >
        {isLoading && selectedPartId ? (
          <div className="flex h-32 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : (
          /* White Card */
          <div className="rounded-md border border-gray-200 bg-white p-5 shadow-sm">
            <div className="space-y-6 text-base text-gray-800">
              {/* Main Title Section */}
              <section>
                <h2 className="mb-3 text-base font-bold text-gray-900">
                  {learningContent.title}
                </h2>
                <ContentList items={learningContent.description} />
              </section>

              <hr className="border-gray-100" />

              {/* Materials Section */}
              <ContentSection
                title="주요 재질"
                items={learningContent.materials}
              />

              <hr className="border-gray-100" />

              {/* Theory Section */}
              <ContentSection
                title="핵심 이론"
                items={learningContent.theory}
              />

              <hr className="border-gray-100" />

              {/* Role Section */}
              <ContentSection
                title="부품의 역할"
                items={learningContent.role}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * 콘텐츠 리스트 컴포넌트
 */
interface ContentListProps {
  items: string[];
}

function ContentList({ items }: ContentListProps) {
  return (
    <ul className="list-disc space-y-1.5 pl-5 text-gray-700 marker:text-gray-400">
      {items?.map((item, idx) => (
        <li key={idx} className="leading-relaxed">
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * 콘텐츠 섹션 컴포넌트
 */
interface ContentSectionProps {
  title: string;
  items: string[];
}

function ContentSection({ title, items }: ContentSectionProps) {
  return (
    <section>
      <h3 className="mb-3 font-bold text-gray-900">{title}</h3>
      <ContentList items={items} />
    </section>
  );
}
