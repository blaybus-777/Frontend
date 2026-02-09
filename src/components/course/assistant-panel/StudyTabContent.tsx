import { MOCK_LEARNING_CONTENT } from './mockData';
import type { LearningContent, TabContentProps } from './types';

interface StudyTabContentProps extends TabContentProps {
  learningContent?: LearningContent;
}

/**
 * 학습 탭 콘텐츠 컴포넌트
 * - 단일 책임: 학습 포인트 콘텐츠 표시만 담당
 */
export default function StudyTabContent({
  learningContent = MOCK_LEARNING_CONTENT,
}: StudyTabContentProps) {
  return (
    <div
      className="custom-scrollbar flex h-full flex-col gap-6 overflow-y-auto"
      style={{
        WebkitOverflowScrolling: 'touch',
        touchAction: 'pan-y',
      }}
    >
      {/* Learning Point Section */}
      <section>
        <h3 className="border-b border-gray-200 px-4 py-2 text-sm font-semibold text-gray-500">
          학습 포인트
        </h3>

        <div className="bg-neutral-100 p-4 text-sm">
          <h4 className="mb-4 text-base font-bold">{learningContent.title}</h4>

          <div className="space-y-4">
            <ContentList items={learningContent.description} />

            <hr className="border-gray-100" />

            <ContentSection
              title="주요 재질"
              items={learningContent.materials}
            />

            <hr className="border-gray-100" />

            <ContentSection title="핵심 이론" items={learningContent.theory} />

            <hr className="border-gray-100" />

            <ContentSection title="부품의 역할" items={learningContent.role} />
          </div>
        </div>
      </section>
    </div>
  );
}

/**
 * 콘텐츠 리스트 컴포넌트
 * - 단일 책임: 항목 리스트만 표시
 */
interface ContentListProps {
  items: string[];
}

function ContentList({ items }: ContentListProps) {
  return (
    <ul className="list-disc space-y-1 pl-5 text-gray-700">
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  );
}

/**
 * 콘텐츠 섹션 컴포넌트
 * - 단일 책임: 제목과 항목 리스트를 함께 표시
 */
interface ContentSectionProps {
  title: string;
  items: string[];
}

function ContentSection({ title, items }: ContentSectionProps) {
  return (
    <div>
      <h5 className="mb-1 font-semibold text-gray-900">{title}</h5>
      <ContentList items={items} />
    </div>
  );
}
