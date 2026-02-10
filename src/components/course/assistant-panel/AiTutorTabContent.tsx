import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  SquarePen,
  Plus,
  CircleArrowUp,
  X,
  FileText,
  File as FileIcon,
} from 'lucide-react';
import quickActionIcon from '@/assets/quick-action.png';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  getChatHistory,
  askQuestion,
  resetChat,
  type ChatMessage,
  type AIContentType,
} from '@/apis/ai';
import { useCourseStore } from '@/stores/useCourseStore';
import ResetChatConfirmModal from './ResetChatConfirmModal';

const MAX_FILE_COUNT = 3;
const ACCEPTED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/pdf',
  'text/plain',
];

const chatFormSchema = z.object({
  question: z.string(),
  files: z
    .array(z.instanceof(File))
    .max(
      MAX_FILE_COUNT,
      `최대 ${MAX_FILE_COUNT}개의 파일까지 업로드 가능합니다.`
    )
    .refine(
      (files) => files.every((file) => ACCEPTED_FILE_TYPES.includes(file.type)),
      '지원하지 않는 파일 형식입니다. 이미지, PDF, 텍스트 파일만 가능합니다.'
    ),
});

type ChatFormValues = z.infer<typeof chatFormSchema>;

export default function AiTutorTabContent() {
  const { id } = useParams<{ id: string }>();
  const modelId = id ? parseInt(id, 10) : 0;
  const selectedPartId = useCourseStore((state) => state.selectedPartId);

  const [showSuggestions, setShowSuggestions] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ChatFormValues>({
    resolver: zodResolver(chatFormSchema),
    defaultValues: {
      question: '',
      files: [],
    },
  });

  const selectedFiles = watch('files');
  const questionValue = watch('question');

  // 이미지 파일의 프리뷰 URL 생성 및 관리
  const [filePreviews, setFilePreviews] = useState<string[]>([]);

  useEffect(() => {
    const newPreviews = selectedFiles.map((file) => {
      if (file.type.startsWith('image/')) {
        return URL.createObjectURL(file);
      }
      return '';
    });

    setFilePreviews(newPreviews);

    return () => {
      newPreviews.forEach((url) => {
        if (url.startsWith('blob:')) URL.revokeObjectURL(url);
      });
    };
  }, [selectedFiles]);

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

  // 질문 전송 (Form Submit)
  const onSubmit = async (data: ChatFormValues) => {
    const question = data.question.trim();

    if ((!question && data.files.length === 0) || modelId === 0 || isLoading)
      return;

    const displayQuestion =
      question ||
      (data.files.length > 0 ? `${data.files.length}개의 파일 첨부` : '');

    // 사용자 질문 즉시 표시 (Optimistic Update)
    const newUserMessage: ChatMessage = {
      question: displayQuestion,
      role: 'USER',
      promptRes: '',
      message: displayQuestion,
    } as ChatMessage;

    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);
    setShowSuggestions(false);
    reset({ question: '', files: [] }); // 폼 초기화

    try {
      const partId = selectedPartId ? parseInt(selectedPartId, 10) : 0;
      const requestData = {
        modelId,
        partId,
        question: question,
        contentType: 'QUESTION' as AIContentType,
      };

      const response = await askQuestion(requestData, data.files);
      setMessages(response.items);
    } catch (error) {
      console.error('질문 전송 실패:', error);
      alert('질문 전송에 실패했습니다.');
      setMessages((prev) => prev.filter((msg) => msg !== newUserMessage));
    } finally {
      setIsLoading(false);
    }
  };

  // 채팅 초기화
  const handleResetChat = async () => {
    if (modelId === 0) return;

    try {
      await resetChat(modelId);
      setMessages([]);
      setShowSuggestions(true);
      setIsResetModalOpen(false);
      reset(); // 폼 초기화
    } catch (error) {
      console.error('채팅 초기화 실패:', error);
      alert('채팅 초기화에 실패했습니다.');
    }
  };

  // 추천 질문 클릭
  const handleSuggestionClick = (question: string) => {
    setValue('question', question);
    handleSubmit(onSubmit)();
  };

  // 파일 첨부 클릭
  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  // 파일 선택 처리
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      const currentFiles = selectedFiles || [];
      const updatedFiles = [...currentFiles, ...newFiles].slice(
        0,
        MAX_FILE_COUNT
      );

      if (currentFiles.length + newFiles.length > MAX_FILE_COUNT) {
        alert(`최대 ${MAX_FILE_COUNT}개까지만 업로드 가능합니다.`);
      }

      setValue('files', updatedFiles, { shouldValidate: true });
      e.target.value = ''; // input 초기화 (같은 파일 다시 선택 가능하도록)
    }
  };

  // 파일 삭제
  const removeFile = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setValue('files', updatedFiles, { shouldValidate: true });
  };

  // Enter 키로 전송 (KeyDown)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <TooltipProvider>
      <div className="flex h-full flex-col bg-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex-1 text-center">
            <h2 className="text-sm font-semibold text-blue-500">
              Simvex Tutor
            </h2>
          </div>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setIsResetModalOpen(true)}
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
          <div className="flex grid-cols-2 flex-col gap-2 rounded-2xl bg-gray-100 p-4">
            {/* Selected Files Preview */}
            {selectedFiles.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-2">
                {selectedFiles.map((file, index) => {
                  const isImage = file.type.startsWith('image/');
                  const previewUrl = filePreviews[index];

                  if (isImage && previewUrl) {
                    return (
                      <div key={index} className="group relative h-13.5 w-13.5">
                        <div
                          className="h-full w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm cursor-pointer"
                          onClick={() => setPreviewImageUrl(previewUrl)}
                        >
                          <img
                            src={previewUrl}
                            alt={file.name}
                            className="h-full w-full object-cover"
                          />
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center text-white opacity-0 transition-opacity group-hover:opacity-100"
                          title="삭제"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={index}
                      className="group relative flex h-13.5 min-w-0 flex-1 items-center gap-2 rounded-lg border border-gray-200 bg-white px-2 shadow-sm"
                    >
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gray-50 transition-colors group-hover:bg-gray-200"
                      >
                        <div className="group-hover:hidden">
                          {file.type === 'application/pdf' ? (
                            <FileText className="h-6 w-6 text-red-500" />
                          ) : (
                            <FileIcon className="h-6 w-6 text-gray-500" />
                          )}
                        </div>
                        <X className="hidden h-6 w-6 text-gray-600 group-hover:block" />
                      </button>
                      <span className="truncate text-sm font-medium text-gray-700">
                        {file.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            <Input
              {...register('question')}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="border-0 bg-transparent p-0 text-base shadow-none placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="무엇이든 물어보세요"
            />

            {errors.files && (
              <p className="mt-1 text-xs text-red-500">
                {errors.files.message}
              </p>
            )}

            <div className="mt-1 flex items-center justify-between">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".jpg,.jpeg,.png,.gif,.pdf,.txt"
                multiple
                className="hidden"
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-30"
                    onClick={handleAttachClick}
                    disabled={selectedFiles.length >= MAX_FILE_COUNT}
                  >
                    <Plus className="h-6 w-6" />
                  </button>
                </TooltipTrigger>
                {selectedFiles.length >= MAX_FILE_COUNT && (
                  <TooltipContent>
                    <p>파일은 3개까지 업로드됩니다.</p>
                  </TooltipContent>
                )}
              </Tooltip>
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={
                  (!questionValue?.trim() && selectedFiles.length === 0) ||
                  isLoading
                }
                className="text-gray-400 hover:text-[#2831ff] disabled:opacity-50"
              >
                <CircleArrowUp className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Image Lightbox (Full Screen Preview) */}
        {previewImageUrl && (
          <div
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 p-4"
            onClick={() => setPreviewImageUrl(null)}
          >
            <div className="relative max-h-full max-w-full">
              <img
                src={previewImageUrl}
                alt="Full screen preview"
                className="max-h-[90vh] max-w-full rounded-lg object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                className="absolute -top-10 right-0 text-white hover:text-gray-300"
                onClick={() => setPreviewImageUrl(null)}
              >
                <X className="h-8 w-8" />
              </button>
            </div>
          </div>
        )}

        <ResetChatConfirmModal
          isOpen={isResetModalOpen}
          onClose={() => setIsResetModalOpen(false)}
          onConfirm={handleResetChat}
        />
      </div>
    </TooltipProvider>
  );
}
