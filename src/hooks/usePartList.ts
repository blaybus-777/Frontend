import { useQuery } from '@tanstack/react-query';
import {
  getPartList,
  getPartHierarchy,
  type PartListResponse,
} from '@/apis/part';

export const usePartList = (modelId: string | undefined) => {
  return useQuery<PartListResponse>({
    queryKey: ['partList', modelId],
    queryFn: () => getPartList(modelId!),
    enabled: !!modelId,
  });
};

export const usePartHierarchy = (modelId: string | undefined) => {
  return useQuery<PartListResponse>({
    queryKey: ['partHierarchy', modelId],
    queryFn: () => getPartHierarchy(modelId!),
    enabled: !!modelId,
  });
};
