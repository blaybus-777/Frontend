import { useQuery } from '@tanstack/react-query';
import { getPartList, type PartListResponse } from '@/apis/part';

export const usePartList = (modelId: string | undefined) => {
  return useQuery<PartListResponse>({
    queryKey: ['partList', modelId],
    queryFn: () => getPartList(modelId!),
    enabled: !!modelId,
  });
};
