import { api } from '@/lib/axios';

// Assuming the response structure based on checked API response.
export interface Model {
  modelId: number;
  code: string;
  title: string;
  tag: string[];
  assetKey?: string;
  modelUrls?: string[];
  image?: string;
}

export interface ModelListResponse {
  items: Model[];
}

export const getModelList = async (): Promise<ModelListResponse> => {
  const response = await api.get('/v1/study/list');
  return response.data.data;
};

export interface SearchRequest {
  tag: string[];
  search: string;
}

export interface SearchResponse {
  items: Model[];
  page: number;
}

export const searchModels = async (
  request: SearchRequest
): Promise<SearchResponse> => {
  const response = await api.post('/v1/study/search', request);
  return response.data.data;
};
