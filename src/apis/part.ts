import { api } from '@/lib/axios';

export interface Part {
  partId: number;
  code: string;
  name: string;
  englishName: string;
  category: string;
  description: string;
  functionalRoles: string[];
  keyEngineeringTheories: string[];
  commonMaterials: string[];
  learningTopics: string[];
  hoverDescription: string | null;
  parentId: number | null;
  hierarchyLevel: number;
  orderIndex: number;
  children: Part[];
}

export interface PartListResponse {
  items: Part[];
  page: number;
}

export const getPartHierarchy = async (
  modelId: string
): Promise<PartListResponse> => {
  const response = await api.get(`/v1/part/list/${modelId}`, {
    params: { flat: false },
  });
  return response.data.data;
};

export const getPartList = async (
  modelId: string
): Promise<PartListResponse> => {
  const response = await api.get(`/v1/part/list/${modelId}`, {
    params: { flat: true },
  });
  return response.data.data;
};
