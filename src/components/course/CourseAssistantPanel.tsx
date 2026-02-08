import { useCourseStore } from '@/store/useCourseStore';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { ChevronsDown, ChevronsUp } from 'lucide-react';
import NoteList from './note/NoteList';
import NoteDetail from './note/NoteDetail';
import NoteEditor from './note/NoteEditor';
import { useShallow } from 'zustand/react/shallow';
import { useNoteStore } from '@/store/useNoteStore';
import { useParams } from 'react-router-dom';


// Mock Data for "Study" Tab
const MOCK_PARTS = [
  {
    id: 'main-frame',
    name: 'Main Frame',
    image: 'https://placehold.co/100x100/blue/white?text=Main+Frame',
  },
  {
    id: 'propeller',
    name: 'Propeller',
    image: 'https://placehold.co/100x100/gray/white?text=Propeller',
  },
  {
    id: 'motor',
    name: 'Motor',
    image: 'https://placehold.co/100x100/gray/white?text=Motor',
  },
  {
    id: 'battery',
    name: 'Battery',
    image: 'https://placehold.co/100x100/gray/white?text=Battery',
  },
  {
    id: 'esc',
    name: 'ESC',
    image: 'https://placehold.co/100x100/gray/white?text=ESC',
  },
  {
    id: 'fc',
    name: 'FC',
    image: 'https://placehold.co/100x100/gray/white?text=FC',
  },
  {
    id: 'gps',
    name: 'GPS',
    image: 'https://placehold.co/100x100/gray/white?text=GPS',
  },
  {
    id: 'receiver',
    name: 'Receiver',
    image: 'https://placehold.co/100x100/gray/white?text=Receiver',
  },
  {
    id: 'camera',
    name: 'Camera',
    image: 'https://placehold.co/100x100/gray/white?text=Camera',
  },
  {
    id: 'vtx',
    name: 'VTX',
    image: 'https://placehold.co/100x100/gray/white?text=VTX',
  },
  {
    id: 'antenna',
    name: 'Antenna',
    image: 'https://placehold.co/100x100/gray/white?text=Antenna',
  },
];

const MOCK_LEARNING_CONTENT = {
  title: '「Main Frame」이란?',
  description: [
    '드론의 모든 부품이 결합되는 중심 구조물',
    '기체의 전체 형상을 결정',
  ],
  materials: [
    'ABS 플라스틱: 강성과 가공성 균형',
    '나일론 강화 소재: 내구성 향상',
    '카본 복합재: 경량·고강성 목적',
  ],
  theory: ['하중을 분산하는 프레임 구조 원리', '대칭 구조에 의한 안정성 확보'],
  role: ['모든 부품의 기준 구조', '하중을 전체로 분산', '드론의 형태를 유지'],
};

export default function CourseAssistantPanel() {
  const { isPanelOpen, activeTab, selectedPartId } = useCourseStore();

  if (!isPanelOpen) return null;

  const renderContent = () => {
    switch (activeTab) {
      case 'study':
        return <StudyTabContent />;
      case 'memo':
        return <NoteTabContent />;
      case 'ai-tutor':
        return <AiTutorTabContent />;
      default:
        return null;
    }
  };

  return (
    <div className="absolute top-0 right-0 bottom-0 flex w-[320px] flex-col bg-white shadow-[-4px_0_15px_-3px_rgba(0,0,0,0.1)]">
      {/* Part List Section - Fixed */}
      <PartListSection selectedPartId={selectedPartId} />

      {/* Content Area - Scrollable */}
      <div className="custom-scrollbar flex-1 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
}

function PartListSection({
  selectedPartId,
}: {
  selectedPartId: string | null;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section>
      <h3 className="border-b px-4 py-2 text-sm font-bold text-neutral-700">
        부품 리스트
      </h3>

      <div className="relative border-b px-4 py-3">
        <div className="rounded-t-lg border border-b-0 p-3 pb-2">
          <div
            className={cn(
              'custom-scrollbar overflow-y-auto transition-all duration-300 ease-in-out',
              isExpanded ? 'max-h-[170px]' : 'max-h-[80px]'
            )}
            style={{ height: 'auto' }}
          >
            <div className="grid grid-cols-4 gap-2 pb-2">
              {MOCK_PARTS.map((part) => (
                <button
                  key={part.id}
                  className="group flex w-full shrink-0 flex-col items-center gap-1 focus:outline-none"
                >
                  <div
                    className={cn(
                      'aspect-square w-full overflow-hidden rounded-lg border transition-all',
                      selectedPartId === part.id
                        ? 'border-blue-500 bg-blue-50 shadow-sm ring-1 ring-blue-500'
                        : 'border-gray-200 bg-gray-50 hover:border-blue-300'
                    )}
                  >
                    <img
                      src={part.image}
                      alt={part.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span
                    className={cn(
                      'w-full truncate text-center text-[10px] transition-colors',
                      selectedPartId === part.id
                        ? 'font-medium text-blue-600'
                        : 'text-gray-500'
                    )}
                  >
                    {part.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex h-6 w-full items-center justify-center rounded-b-lg bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200"
        >
          {isExpanded ? <ChevronsUp size={16} /> : <ChevronsDown size={16} />}
        </button>
      </div>
    </section>
  );
}

function StudyTabContent() {
  return (
    <div className="flex flex-col gap-6">
      {/* Learning Point Section */}
      <section>
        <h3 className="border-b border-gray-200 px-4 py-2 text-sm font-semibold text-gray-500">
          학습 포인트
        </h3>

        <div className="bg-neutral-100 p-4 text-sm">
          <h4 className="mb-4 text-base font-bold">
            {MOCK_LEARNING_CONTENT.title}
          </h4>

          <div className="space-y-4">
            <div>
              <ul className="list-disc space-y-1 pl-5 text-gray-700">
                {MOCK_LEARNING_CONTENT.description.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <hr className="border-gray-100" />

            <div>
              <h5 className="mb-1 font-semibold text-gray-900">주요 재질</h5>
              <ul className="list-disc space-y-1 pl-5 text-gray-700">
                {MOCK_LEARNING_CONTENT.materials.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <hr className="border-gray-100" />

            <div>
              <h5 className="mb-1 font-semibold text-gray-900">핵심 이론</h5>
              <ul className="list-disc space-y-1 pl-5 text-gray-700">
                {MOCK_LEARNING_CONTENT.theory.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <hr className="border-gray-100" />

            <div>
              <h5 className="mb-1 font-semibold text-gray-900">부품의 역할</h5>
              <ul className="list-disc space-y-1 pl-5 text-gray-700">
                {MOCK_LEARNING_CONTENT.role.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function NoteTabContent() {
  const { id } = useParams<{ id: string }>();
  // Assuming id from URL is the modelId
  const modelId = id ? parseInt(id, 10) : 0;

  const { selectedNoteId, isCreating, setIsCreating, createNote } = useNoteStore(
    useShallow((state) => ({
      selectedNoteId: state.selectedNoteId,
      isCreating: state.isCreating,
      setIsCreating: state.setIsCreating,
      createNote: state.createNote,
    }))
  );

  const handleCreateSubmit = async (title: string, content: string) => {
    if (modelId === 0) {
      alert('모델 ID를 찾을 수 없습니다.');
      return;
    }
    await createNote(modelId, title, content);
  };

  if (isCreating) {
    return (
      <NoteEditor
        onSubmit={handleCreateSubmit}
        onCancel={() => setIsCreating(false)}
        submitLabel="새 메모 저장"
      />
    );
  }

  if (selectedNoteId) {
    return <NoteDetail />;
  }

  return (
    <div className="flex h-full flex-col">
      <h3 className="border-b border-gray-200 px-4 py-2 text-sm font-semibold text-gray-500">
        메모
      </h3>
      <div className="flex-1 overflow-y-auto bg-neutral-100">
        <NoteList />
      </div>
      <div className="bg-neutral-100 p-4 pt-2">
        <button
          className="w-full rounded-full bg-gray-200 py-3 text-sm font-bold text-gray-600 transition-colors hover:bg-gray-300"
          onClick={() => setIsCreating(true)}
        >
          메모 추가
        </button>
      </div>
    </div>
  );
}

function AiTutorTabContent() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-4 text-gray-400">
      <p>AI 튜터 기능 준비중...</p>
    </div>
  );
}
