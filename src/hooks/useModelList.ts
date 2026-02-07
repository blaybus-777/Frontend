import { useQuery } from '@tanstack/react-query';
import { getModelList } from '@/apis/model';
import { useEnums } from './useEnums';
import { ASSETS } from '@/constants/assets';

export interface ExtendedModel {
  modelId: number;
  code: string;
  title: string;
  tags: string[];
  image: string;
  modelUrls: string[];
}

export const useModelList = () => {
  const { tagMap, modelMap, isLoading: isEnumsLoading } = useEnums();

  return useQuery({
    queryKey: ['modelList'],
    queryFn: getModelList,
    enabled: !isEnumsLoading,
    select: (data) => data.items.map((item) => {
      const assetData = ASSETS[item.code] || { image: '', modelUrls: [] };
      return {
        ...item,
        code: modelMap[item.code] || item.code,
        tags: item.tags?.map((t: string) => tagMap[t] || t) || [],
        image: assetData.image,
        modelUrls: assetData.modelUrls,
      } as ExtendedModel;
    })
  });
};
