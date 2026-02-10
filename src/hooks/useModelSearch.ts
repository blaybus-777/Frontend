import { useQuery } from '@tanstack/react-query';
import { searchModels } from '@/apis/model';
import { useEnums } from './useEnums';
import { ASSETS } from '@/constants/assets';
import type { ExtendedModel } from './useModelList';

export const useModelSearch = (tag: string[], search: string) => {
  const {
    tagMap,
    modelMap,
    modelCodeMap,
    isLoading: isEnumsLoading,
  } = useEnums();

  return useQuery({
    queryKey: ['modelSearch', tag, search],
    queryFn: () => searchModels({ tag, search }),
    enabled: !isEnumsLoading && tag.length > 0,
    select: (data) =>
      data.items.map((item) => {
        const assetKey = modelCodeMap[item.code.toLowerCase()];
        const assetData = assetKey
          ? ASSETS[assetKey]
          : { image: '', parts: {} };

        return {
          ...item,
          code:
            modelMap[assetKey!] ||
            (modelCodeMap[item.code.trim().toLowerCase()] &&
              modelMap[modelCodeMap[item.code.trim().toLowerCase()]]) ||
            item.code,
          tag: item.tag?.map((t: string) => tagMap[t] || t) || [],
          image: assetData.image,
          modelUrls: Object.values(assetData.parts),
          assetKey,
        } as ExtendedModel;
      }),
  });
};
