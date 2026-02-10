import { useEffect, useMemo, useRef } from 'react';
import { useModelList } from '@/hooks/useModelList';
import { ASSETS } from '@/constants/assets';

export interface CourseModelDetail {
  title: string;
  modelUrls: string[];
  parts: Record<string, string>;
  assetKey: keyof typeof ASSETS;
}

export const useCourseModelDetail = (modelId: string | undefined) => {
  const { data: modelList, isLoading, isError } = useModelList();
  const cacheKey = modelId ? `course-detail:${modelId}` : null;
  const lastDetailRef = useRef<CourseModelDetail | null>(null);
  const cachedDetail = useMemo(() => {
    if (!cacheKey) return null;
    try {
      const raw = localStorage.getItem(cacheKey);
      if (!raw) return null;
      return JSON.parse(raw) as CourseModelDetail;
    } catch {
      return null;
    }
  }, [cacheKey]);

  const computed = useMemo(() => {
    if (!modelId) {
      return {
        isLoading,
        isError,
        detail: null as CourseModelDetail | null,
      };
    }

    const model = modelList?.find((item) => String(item.modelId) === modelId);
    const assetKey = model?.assetKey as keyof typeof ASSETS | undefined;

    // 1. 내부 정의된 ASSETS 데이터 확인
    const assetData = assetKey ? ASSETS[assetKey] : null;

    if (isLoading || isError) {
      return {
        isLoading,
        isError,
        detail: null,
      };
    }

    // 2. 만약 ASSETS에는 없지만, 모델 리스트 API에서 직접 URL을 준 경우 처리
    const assetModelUrls = assetData ? Object.values(assetData.parts) : [];
    const finalModelUrls = assetModelUrls.length > 0 ? assetModelUrls : (model?.modelUrls || []);
    const hasModels = finalModelUrls.length > 0;

    if (!hasModels || !assetData) {
      return {
        isLoading: false,
        isError: true,
        detail: null,
      };
    }

    return {
      isLoading: false,
      isError: false,
      detail: {
        title: model?.title || assetKey || '',
        modelUrls: finalModelUrls,
        parts: assetData.parts,
        assetKey: assetKey!,
      },
    };
  }, [modelId, modelList, isLoading, isError]);

  useEffect(() => {
    if (!cacheKey || !computed.detail) return;
    try {
      localStorage.setItem(cacheKey, JSON.stringify(computed.detail));
    } catch {
      // ignore
    }
  }, [cacheKey, computed.detail]);

  useEffect(() => {
    if (computed.detail) {
      lastDetailRef.current = computed.detail;
    }
  }, [computed.detail]);

  if (!computed.detail && cachedDetail) {
    return {
      isLoading: false,
      isError: false,
      detail: cachedDetail,
    };
  }

  if (!computed.detail && lastDetailRef.current) {
    return {
      isLoading: isLoading,
      isError: isError,
      detail: lastDetailRef.current,
    };
  }

  console.log('useCourseModelDetail - output:', {
    modelId,
    detail: computed.detail,
    isLoading: computed.isLoading,
  });

  return computed;
};
