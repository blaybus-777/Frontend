import { api } from '@/lib/axios';

/**
 * 채팅 메시지 타입
 */
export interface ChatMessage {
  assistantId: number;
  modelId: number;
  partId: number;
  historyId: number;
  role: 'USER' | 'ASSISTANT';
  files: string[];
  question: string;
  promptRes: string;
  message: string;
}

/**
 * 채팅 기록 응답 타입
 */
export interface ChatHistoryResponse {
  items: ChatMessage[];
  page: number;
}

/**
 * AI 질문 콘텐츠 타입
 */
export type AIContentType = 'QUESTION' | 'QUICK' | 'AI_RESPONSE';

/**
 * AI 질문 요청 타입
 */
export interface QuestionRequest {
  modelId: number;
  partId: number;
  question: string;
  contentType: AIContentType;
}

/**
 * 채팅 기록 조회
 * GET /v1/ai/history/list/{modelId}
 */
export const getChatHistory = async (
  modelId: number
): Promise<ChatHistoryResponse> => {
  const response = await api.get(`/v1/ai/history/list/${modelId}`);
  return response.data.data;
};

/**
 * AI 질문
 * POST /v1/ai/question
 */
export const askQuestion = async (
  request: QuestionRequest,
  files?: File[]
): Promise<ChatHistoryResponse> => {
  const formData = new FormData();

  // request 객체를 JSON 문자열로 변환하여 추가
  formData.append(
    'request',
    new Blob([JSON.stringify(request)], { type: 'application/json' })
  );

  // 파일이 있으면 추가
  if (files && files.length > 0) {
    files.forEach((file) => {
      formData.append('file', file);
    });
  }

  const response = await api.post('/v1/ai/question', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.data;
};

/**
 * 채팅 초기화
 * DELETE /v1/ai/reset/{modelId}
 */
export const resetChat = async (modelId: number): Promise<void> => {
  await api.delete(`/v1/ai/reset/${modelId}`);
};
