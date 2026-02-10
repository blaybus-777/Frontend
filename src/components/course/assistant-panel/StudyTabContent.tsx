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
    // 1. API에서 가져온 상세 정보가 있고, 루트 노드가 아닐 경우 우선 사용
    if (selectedPartId && partDetail && partDetail.parentId !== null) {
      return {
        title: `${partDetail.name} (${partDetail.englishName})`,
        description: [partDetail.description],
        materials: partDetail.commonMaterials,
        theory: partDetail.keyEngineeringTheories,
        role: partDetail.functionalRoles,
      };
    }

    if (!courseId) return MOCK_LEARNING_CONTENT;

    // 2. 루트 노드가 선택되었거나, 아무것도 선택되지 않은 경우 코스 전체 데이터 반환
    return STUDY_CONTENT_BY_ID[courseId] || MOCK_LEARNING_CONTENT;
  }, [courseId, selectedPartId, partDetail, isLoading]);

  return (
    <div className="flex h-full flex-col bg-gray-50">
      {/* Header */}
      <h3 className="flex-none border-b bg-white px-6 py-4 text-sm font-bold text-gray-500">
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
          <div className="flex flex-col gap-4">
            {/* 자식 노드들이 있는 경우 (중간 카테고리 선택 시, 단 루트 노드는 제외) */}
            {partDetail?.children &&
            partDetail.children.length > 0 &&
            partDetail.parentId !== null ? (
              <>
                {partDetail.children.map((child) => (
                  <PartInfoCard
                    key={child.partId}
                    title={`${child.name} (${child.englishName})`}
                    description={[child.description]}
                    materials={child.commonMaterials}
                    theory={child.keyEngineeringTheories}
                    role={child.functionalRoles}
                  />
                ))}
              </>
            ) : (
              /* 자식 노드가 없는 경우(단일 부품) 또는 루트 노드/전체 선택 시 */
              <PartInfoCard
                title={learningContent.title}
                description={learningContent.description}
                materials={learningContent.materials}
                theory={learningContent.theory}
                role={learningContent.role}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * 부품 정보 카드 컴포넌트
 */
interface PartInfoCardProps {
  title: string;
  description: string[];
  materials: string[];
  theory: string[];
  role: string[];
}

function PartInfoCard({
  title,
  description,
  materials,
  theory,
  role,
}: PartInfoCardProps) {
  return (
    <div className="rounded-md border border-gray-200 bg-white p-5 shadow-sm">
      <div className="space-y-6 text-base text-gray-800">
        {/* Main Title Section */}
        <section>
          <h2 className="mb-3 text-base font-bold text-gray-900">{title}</h2>
          <ContentList items={description} />
        </section>

        {(materials.length > 0 || theory.length > 0 || role.length > 0) && (
          <hr className="border-gray-100" />
        )}

        {/* Materials Section */}
        {materials.length > 0 && (
          <>
            <ContentSection title="주요 재질" items={materials} />
            <hr className="border-gray-100" />
          </>
        )}

        {/* Theory Section */}
        {theory.length > 0 && (
          <>
            <ContentSection title="핵심 이론" items={theory} />
            <hr className="border-gray-100" />
          </>
        )}

        {/* Role Section */}
        {role.length > 0 && (
          <ContentSection title="부품의 역할" items={role} />
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
