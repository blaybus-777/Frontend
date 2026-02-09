import { useState } from 'react';
import { SquarePen, Plus, CircleArrowUp, X } from 'lucide-react';
import quickActionIcon from '@/assets/quick-action.png';

import { Input } from '@/components/ui/input';

export default function AiTutorTabContent() {
  const [showSuggestions, setShowSuggestions] = useState(true);
  const suggestions = [
    '가장 많이 쓰이는 재질은 무엇인가요?',
    '핵심 역할은 무엇인가요?',
    '가장 중요한 설계 요소는 무엇인가요?',
  ];

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex-1 text-center">
          <h2 className="text-sm font-semibold text-blue-500">Simvex Tutor</h2>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          <SquarePen className="h-4 w-4" />
        </button>
      </div>

      {/* Main Content (Chat Area) */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex min-h-full flex-col space-y-6 pb-2">
          {/* Spacer to push content down or keep it consistent */}
          <div className="flex-1" />

          <div className="space-y-1 text-center">
            <h3 className="font-medium text-gray-900">안녕하세요.</h3>
            <p className="text-gray-900">현재 화면에서 궁금한 내용이 있나요?</p>
          </div>

          <div className="flex h-[200px] flex-col justify-end">
            {showSuggestions ? (
              <div className="flex flex-col items-end gap-6">
                <div className="flex flex-col items-end gap-2">
                  {suggestions.map((question, index) => (
                    <button
                      key={index}
                      className="rounded-full border border-blue-200 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm hover:bg-blue-50"
                    >
                      {question}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setShowSuggestions(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
                >
                  <X className="h-6 w-6 text-gray-500" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSuggestions(true)}
                className="flex h-10 w-10 items-center justify-center self-end object-fill"
              >
                <img
                  src={quickActionIcon}
                  alt="quick action button"
                  width={32}
                  height={32}
                  className="block h-full w-full"
                />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t p-4">
        <div className="flex flex-col gap-2 rounded-2xl bg-gray-100 p-4">
          <Input
            className="border-0 bg-transparent p-0 text-base shadow-none placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="무엇이든 물어보세요"
          />
          <div className="flex items-center justify-between">
            <button className="text-gray-400 hover:text-gray-600">
              <Plus className="h-6 w-6" />
            </button>
            <button className="text-gray-400 hover:text-gray-600">
              <CircleArrowUp className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
