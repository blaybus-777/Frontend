import { api } from '@/lib/axios';

export interface EnumItem {
  name: string; // The key/code from the perspective of the Model API (e.g., 'DRONE', 'ADVANCED')
  code: string; // The display name/label (e.g., '드론', '고급 과정')
}

export interface EnumResponse {
  items: EnumItem[];
}

export const getEnumTags = async (): Promise<EnumResponse> => {
  const response = await api.get('/v1/enum/tag');
  return response.data.data;
};

export const getEnumModels = async (): Promise<EnumResponse> => {
  const response = await api.get('/v1/enum/model');
  return response.data.data;
};
