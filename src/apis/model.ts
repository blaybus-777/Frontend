import { api } from '@/lib/axios';

// Assuming the response structure based on checked API response.
export interface Model {
  modelId: number;
  code: string;
  title: string;
  tag: string[];
}

export interface ModelListResponse {
  items: Model[];
  page: number;
}

export const getModelList = async (): Promise<ModelListResponse> => {
  const response = await api.get('/v1/study/list');
  return response.data.data;
};
