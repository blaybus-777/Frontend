import { useMemo } from "react";
import { useModelList } from "@/hooks/useModelList";
import { ASSETS, MODEL_ID_TO_ASSET_KEY } from "@/constants/assets";

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

    const assetKey = MODEL_ID_TO_ASSET_KEY[modelId];
    const assetData = assetKey ? ASSETS[assetKey] : null;
    const model = modelList?.find((item) => String(item.modelId) === modelId);

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
