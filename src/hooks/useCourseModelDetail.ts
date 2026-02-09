import { useMemo } from 'react';
import { useModelList } from '@/hooks/useModelList';
import { ASSETS } from '@/constants/assets';

export interface CourseModelDetail {
  title: string;
  modelUrls: string[];
  assetKey: keyof typeof ASSETS;
}

export const useCourseModelDetail = (modelId: string | undefined) => {
  const { data: modelList, isLoading, isError } = useModelList();

  return useMemo(() => {
    if (!modelId) {
      return {
        isLoading,
        isError,
        detail: null as CourseModelDetail | null,
      };
    }

    const model = modelList?.find((item) => String(item.modelId) === modelId);
    // Cast to keyof ASSETS if it exists, otherwise undefined
    const assetKey = model?.assetKey as keyof typeof ASSETS | undefined;
    const assetData = assetKey ? ASSETS[assetKey] : null;

    if (!assetData) {
      return {
        isLoading,
        isError,
        detail: null as CourseModelDetail | null,
      };
    }

    return {
      isLoading,
      isError,
      detail: {
        title: model?.title || assetKey,
        modelUrls: assetData.modelUrls,
        assetKey,
      },
    };
  }, [modelId, modelList, isLoading, isError]);
};
