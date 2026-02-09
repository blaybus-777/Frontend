import { useQuery } from '@tanstack/react-query';
import { getModelList } from '@/apis/model';
import { useEnums } from './useEnums';
import { ASSETS } from '@/constants/assets';

export interface ExtendedModel {
  modelId: number;
  code: string;
  title: string;
  tag: string[];
  image: string;
  modelUrls: string[];
  assetKey?: string;
}

export const useModelList = () => {
  const {
    tagMap,
    modelMap,
    modelCodeMap,
    isLoading: isEnumsLoading,
  } = useEnums();

  return useQuery({
    queryKey: ['modelList'],
    queryFn: getModelList,
    enabled: !isEnumsLoading,
    select: (data) =>
      data.items.map((item) => {
        const assetKey = modelCodeMap[item.code.toLowerCase()];
        const assetData = assetKey
          ? ASSETS[assetKey]
          : { image: '', parts: {} };

        return {
          ...item,
          code: modelMap[assetKey] || item.code,
          tag: item.tag?.map((t: string) => tagMap[t] || t) || [],
          image: assetData.image,
          modelUrls: Object.values(assetData.parts),
          assetKey,
        } as ExtendedModel;
      }),
  });
};
