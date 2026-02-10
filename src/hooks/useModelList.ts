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
    select: (data) => {
      return data.items.map((item) => {
        // 1. API에서 내려준 assetKey가 있으면 우선 사용
        let assetKey = item.assetKey;

        // 2. 만약 assetKey가 없다면, 기존 code 기반 매핑 시도
        if (!assetKey) {
          assetKey = modelCodeMap[item.code.trim().toLowerCase()];
        }

        // 3. 내부 ASSETS에 직접 존재하는지 확인 (fallback)
        if (!assetKey && ASSETS[item.code]) {
          assetKey = item.code;
        }

        // 4. 예외 케이스: 'DRONE' -> 'Quadcopter_DRONE'
        if (
          (assetKey === 'DRONE' || item.code === 'DRONE') &&
          !ASSETS['DRONE'] &&
          ASSETS['Quadcopter_DRONE']
        ) {
          assetKey = 'Quadcopter_DRONE';
        }

        // 최종 매핑된 assetKey로 에셋 정보(이미지, URL) 가져오기
        // API에서 직접 modelUrls를 준 경우 그것을 우선적으로 사용
        const assetData =
          assetKey && ASSETS[assetKey]
            ? ASSETS[assetKey]
            : { image: '', modelUrls: item.modelUrls || [] };

        return {
          ...item,
          code:
            modelMap[assetKey!] ||
            (modelCodeMap[item.code.trim().toLowerCase()] &&
              modelMap[modelCodeMap[item.code.trim().toLowerCase()]]) ||
            item.code,
          tag: item.tag?.map((t: string) => tagMap[t] || t) || [],
          image: assetData.image || item.image || '',
          modelUrls:
            assetData.modelUrls.length > 0
              ? assetData.modelUrls
              : (item.modelUrls || []),
          assetKey,
        } as ExtendedModel;
      });
    },
  });
};
