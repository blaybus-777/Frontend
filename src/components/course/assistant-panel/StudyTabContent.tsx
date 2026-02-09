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
    <div className="flex h-full flex-col bg-gray-50">
      {/* Header */}
      <h3 className="bg-white flex-none px-6 py-4 text-sm font-bold text-gray-500 border-b">
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
        {/* White Card */}
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
            <ContentSection title="주요 재질" items={learningContent.materials} />

            <hr className="border-gray-100" />

            {/* Theory Section */}
            <ContentSection title="핵심 이론" items={learningContent.theory} />

            <hr className="border-gray-100" />

            {/* Role Section */}
            <ContentSection title="부품의 역할" items={learningContent.role} />
          </div>
        </div>
      </div>
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
    <ul className="list-disc space-y-1.5 pl-5 text-gray-700 marker:text-gray-400">
      {items.map((item, idx) => (
        <li key={idx} className="leading-relaxed">
          {item}
        </li>
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
    <section>
      <h3 className="mb-3 font-bold text-gray-900">{title}</h3>
      <ContentList items={items} />
    </section>
  );
}
