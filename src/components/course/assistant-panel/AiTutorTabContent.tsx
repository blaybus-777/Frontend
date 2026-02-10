import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { SquarePen, Plus, CircleArrowUp, X } from 'lucide-react';
import quickActionIcon from '@/assets/quick-action.png';

import { Input } from '@/components/ui/input';
import {
  getChatHistory,
  askQuestion,
  resetChat,
  type ChatMessage,
  type AIContentType,
} from '@/apis/ai';
import { useCourseStore } from '@/stores/useCourseStore';

export default function AiTutorTabContent() {
  const { id } = useParams<{ id: string }>();
  const modelId = id ? parseInt(id, 10) : 0;
  const selectedPartId = useCourseStore((state) => state.selectedPartId);

  const [showSuggestions, setShowSuggestions] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    '가장 많이 쓰이는 재질은 무엇인가요?',
    '핵심 역할은 무엇인가요?',
    '가장 중요한 설계 요소는 무엇인가요?',
  ];

  // 채팅 기록 불러오기
  useEffect(() => {
    const loadChatHistory = async () => {
      if (modelId === 0) return;

      try {
        const response = await getChatHistory(modelId);
        setMessages(response.items);
        if (response.items.length > 0) {
          setShowSuggestions(false);
        }
      } catch (error) {
        console.error('채팅 기록 불러오기 실패:', error);
      }
    };

    loadChatHistory();
  }, [modelId]);

  // 메시지 추가 시 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 질문 전송
  const handleSendQuestion = async (
    question: string,
    contentType: AIContentType = 'QUESTION'
  ) => {
    if (!question.trim() || modelId === 0 || isLoading) return;

    // 사용자 질문 즉시 표시 (Optimistic Update)
    const newUserMessage: ChatMessage = {
      question: question,
      role: 'USER',
      promptRes: '',
      message: question,
    } as ChatMessage;

    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);
    setInputValue('');
    setShowSuggestions(false);

    try {
      // partId 변환 (selectedPartId가 문자열이므로 숫자로 변환, 없으면 null)
      const partId = selectedPartId ? parseInt(selectedPartId, 10) : 0;

      const requestData = {
        modelId,
        partId,
        question,
        contentType,
      };
      console.log('🔵 요청 데이터:', requestData);

      const response = await askQuestion(requestData);
      console.log('🟢 응답 데이터:', response);

      // 서버 응답이 전체 히스토리를 포함하는 경우 바로 설정
      // 만약 서버 응답이 마지막 메시지만 포함한다면 아래와 같이 처리 가능:
      // setMessages(prev => [...prev.slice(0, -1), ...response.items]);
      
      setMessages(response.items);
    } catch (error) {
      console.error('질문 전송 실패:', error);
      alert('질문 전송에 실패했습니다.');
      // 에러 발생 시 낙관적으로 추가했던 메시지 제거
      setMessages((prev) => prev.filter((msg) => msg !== newUserMessage));
    } finally {
      setIsLoading(false);
    }
  };

  // 채팅 초기화
  const handleResetChat = async () => {
    if (modelId === 0) return;

    const confirmed = window.confirm('채팅 기록을 모두 삭제하시겠습니까?');
    if (!confirmed) return;

    try {
      await resetChat(modelId);
      setMessages([]);
      setShowSuggestions(true);
    } catch (error) {
      console.error('채팅 초기화 실패:', error);
      alert('채팅 초기화에 실패했습니다.');
    }
  };

  // 추천 질문 클릭
  const handleSuggestionClick = (question: string) => {
    handleSendQuestion(question, 'QUESTION');
  };

  // Enter 키로 전송
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendQuestion(inputValue);
    }
  };

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex-1 text-center">
          <h2 className="text-sm font-semibold text-blue-500">Simvex Tutor</h2>
        </div>
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={handleResetChat}
          title="새 대화 시작"
        >
          <SquarePen className="h-4 w-4" />
        </button>
      </div>

      {/* Main Content (Chat Area) */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex min-h-full flex-col space-y-4 pb-2">
          {/* 로딩 중일 때 */}
          {isLoading && messages.length === 0 ? (
            <>
              <div className="flex-1" />
              <div className="space-y-1 text-center">
                <p className="text-gray-500">답변 생성 중...</p>
              </div>
            </>
          ) : /* 메시지가 없을 때 초기 화면 */
          messages.length === 0 ? (
            <>
              <div className="flex-1" />
              <div className="space-y-1 text-center">
                <h3 className="font-medium text-gray-900">안녕하세요.</h3>
                <p className="text-gray-900">
                  현재 화면에서 궁금한 내용이 있나요?
                </p>
              </div>
            </>
          ) : (
            /* 채팅 메시지 목록 */
            <div className="flex flex-col space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className="flex flex-col space-y-4">
                  {/* 사용자 질문 */}
                  {msg.question && (
                    <div className="flex justify-end">
                      <div className="max-w-[80%] rounded-2xl bg-blue-500 px-4 py-2 text-white">
                        <p className="text-sm whitespace-pre-wrap">
                          {msg.question}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* AI 답변 */}
                  {msg.promptRes && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-2xl bg-gray-100 px-4 py-2 text-gray-900">
                        <p className="text-sm whitespace-pre-wrap">
                          {msg.promptRes}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl bg-gray-100 px-4 py-2">
                    <p className="text-sm text-gray-500">답변 생성 중...</p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Spacer - 아이콘을 아래로 밀기 */}
          <div className="flex-1" />

          {/* 추천 질문 또는 Quick Action 버튼 */}
          <div className="flex flex-col items-end gap-2">
            {showSuggestions && (
              <div className="flex flex-col items-end gap-2">
                {suggestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(question)}
                    className="rounded-full border border-blue-200 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm hover:bg-blue-50"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            {/* Quick Action 토글 버튼 - 항상 표시 */}
            <button
              onClick={() => setShowSuggestions(!showSuggestions)}
              className="flex h-10 w-10 items-center justify-center self-end"
            >
              {showSuggestions ? (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300">
                  <X className="h-6 w-6 text-gray-500" />
                </div>
              ) : (
                <img
                  src={quickActionIcon}
                  alt="quick action button"
                  width={32}
                  height={32}
                  className="block h-full w-full"
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t p-4">
        <div className="flex flex-col gap-2 rounded-2xl bg-gray-100 p-4">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="border-0 bg-transparent p-0 text-base shadow-none placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="무엇이든 물어보세요"
          />
          <div className="flex items-center justify-between">
            <button className="text-gray-400 hover:text-gray-600">
              <Plus className="h-6 w-6" />
            </button>
            <button
              onClick={() => handleSendQuestion(inputValue)}
              disabled={!inputValue.trim() || isLoading}
              className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
            >
              <CircleArrowUp className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
