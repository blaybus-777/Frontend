import { useCourseStore } from "@/store/useCourseStore";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

// Mock Data for "Study" Tab
const MOCK_PARTS = [
  { id: 'main-frame', name: 'Main Frame', image: 'https://placehold.co/100x100/blue/white?text=Main+Frame' },
  { id: 'propeller', name: 'Propeller', image: 'https://placehold.co/100x100/gray/white?text=Propeller' },
  { id: 'motor', name: 'Motor', image: 'https://placehold.co/100x100/gray/white?text=Motor' },
  { id: 'battery', name: 'Battery', image: 'https://placehold.co/100x100/gray/white?text=Battery' },
  { id: 'esc', name: 'ESC', image: 'https://placehold.co/100x100/gray/white?text=ESC' },
  { id: 'fc', name: 'FC', image: 'https://placehold.co/100x100/gray/white?text=FC' },
  { id: 'gps', name: 'GPS', image: 'https://placehold.co/100x100/gray/white?text=GPS' },
  { id: 'receiver', name: 'Receiver', image: 'https://placehold.co/100x100/gray/white?text=Receiver' },
  { id: 'camera', name: 'Camera', image: 'https://placehold.co/100x100/gray/white?text=Camera' },
  { id: 'vtx', name: 'VTX', image: 'https://placehold.co/100x100/gray/white?text=VTX' },
  { id: 'antenna', name: 'Antenna', image: 'https://placehold.co/100x100/gray/white?text=Antenna' },
];

const MOCK_LEARNING_CONTENT = {
  title: "「Main Frame」이란?",
  description: [
    "드론의 모든 부품이 결합되는 중심 구조물",
    "기체의 전체 형상을 결정"
  ],
  materials: [
    "ABS 플라스틱: 강성과 가공성 균형",
    "나일론 강화 소재: 내구성 향상",
    "카본 복합재: 경량·고강성 목적"
  ],
  theory: [
    "하중을 분산하는 프레임 구조 원리",
    "대칭 구조에 의한 안정성 확보"
  ],
  role: [
    "모든 부품의 기준 구조",
    "하중을 전체로 분산",
    "드론의 형태를 유지"
  ]
};

export default function CourseAssistantPanel() {
  const { isPanelOpen, activeTab, selectedPartId } = useCourseStore();

  if (!isPanelOpen) return null;

  const renderContent = () => {
    switch (activeTab) {
      case 'study':
        return <StudyTabContent />;
      case 'memo':
        return <MemoTabContent />;
      case 'ai-tutor':
        return <AiTutorTabContent />;
      default:
        return null;
    }
  };

  return (
    <div className="absolute top-0 bottom-0 right-0 w-[320px] bg-white border-l border-y border-gray-200 flex flex-col z-20 shadow-[-4px_0_15px_-3px_rgba(0,0,0,0.1)]">
      {/* Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pt-4 px-4 pb-4">
        {/* Common Part List Section */}
        <PartListSection selectedPartId={selectedPartId} />
        
        <div className="mt-4">
             {renderContent()}
        </div>
      </div>
    </div>
  );
}



function PartListSection({ selectedPartId }: { selectedPartId: string | null }) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Determines the visible height based on state
    // grid-cols-4 means 4 items per row.
    // 1 row showing = collapsed, 2 rows showing = expanded (with scroll if more)
    // Adjust max-height logic as needed for precise pixel values of items
    return (
        <section>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">부품 리스트</h3>
            
            <div className="relative">
                <div 
                    className={cn(
                        "transition-all duration-300 ease-in-out overflow-hidden",
                        isExpanded ? "max-h-[180px] overflow-y-auto custom-scrollbar" : "max-h-[72px] overflow-hidden" 
                        // Assuming approx 72px for one row of items (aspect-square + text) + gaps
                        // We might need to adjust these pixel values after seeing the rendering
                    )}
                >
                    <div className="grid grid-cols-4 gap-2 pb-2">
                        {MOCK_PARTS.map((part) => (
                            <button 
                                key={part.id} 
                                className="flex flex-col items-center gap-1 w-full shrink-0 group focus:outline-none"
                            >
                                <div className={cn(
                                    "w-full aspect-square rounded-lg overflow-hidden border transition-all",
                                    selectedPartId === part.id 
                                        ? "border-blue-500 shadow-sm ring-1 ring-blue-500 bg-blue-50" 
                                        : "border-gray-200 hover:border-blue-300 bg-gray-50"
                                )}>
                                    <img src={part.image} alt={part.name} className="w-full h-full object-cover" />
                                </div>
                                <span className={cn(
                                    "text-[10px] truncate w-full text-center transition-colors",
                                    selectedPartId === part.id ? "text-blue-600 font-medium" : "text-gray-500"
                                )}>
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
                className="w-full mt-2 h-6 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded text-gray-500 transition-colors"
            >
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            <div className="my-4 border-b border-gray-100" />
        </section>
    );
}

function StudyTabContent() {
    return (
        <div className="flex flex-col gap-6">
            {/* Learning Point Section */}
            <section>
                <h3 className="text-sm font-semibold text-gray-500 mb-3">학습 포인트</h3>
                
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 text-sm">
                    <h4 className="text-base font-bold mb-4">{MOCK_LEARNING_CONTENT.title}</h4>
                    
                    <div className="space-y-4">
                        <div>
                            <ul className="list-disc pl-5 text-gray-700 space-y-1">
                                {MOCK_LEARNING_CONTENT.description.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <hr className="border-gray-100" />

                        <div>
                            <h5 className="font-semibold text-gray-900 mb-1">주요 재질</h5>
                            <ul className="list-disc pl-5 text-gray-700 space-y-1">
                                {MOCK_LEARNING_CONTENT.materials.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>

                         <hr className="border-gray-100" />

                        <div>
                            <h5 className="font-semibold text-gray-900 mb-1">핵심 이론</h5>
                            <ul className="list-disc pl-5 text-gray-700 space-y-1">
                                {MOCK_LEARNING_CONTENT.theory.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>

                         <hr className="border-gray-100" />

                        <div>
                            <h5 className="font-semibold text-gray-900 mb-1">부품의 역할</h5>
                            <ul className="list-disc pl-5 text-gray-700 space-y-1">
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

function MemoTabContent() {
    return (
        <div className="p-4 flex flex-col items-center justify-center h-full text-gray-400">
            <p>메모 기능 준비중...</p>
        </div>
    );
}

function AiTutorTabContent() {
    return (
        <div className="p-4 flex flex-col items-center justify-center h-full text-gray-400">
            <p>AI 튜터 기능 준비중...</p>
        </div>
    );
}
