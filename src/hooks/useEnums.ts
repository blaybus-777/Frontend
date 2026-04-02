import { useQuery } from '@tanstack/react-query';
import { getEnumModels, getEnumTags } from '@/apis/enums';

export const useEnums = () => {
  const { data: tagData } = useQuery({
    queryKey: ['enumTags'],
    queryFn: getEnumTags,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: modelData } = useQuery({
    queryKey: ['enumModels'],
    queryFn: getEnumModels,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const tagMap =
    tagData?.items.reduce(
      (acc, item) => {
        acc[item.name] = item.code;
        return acc;
      },
      {} as Record<string, string>
    ) || {};

  const modelMap =
    modelData?.items.reduce(
      (acc, item) => {
        acc[item.name] = item.code;
        return acc;
      },
      {} as Record<string, string>
    ) || {};

  const modelCodeMap =
    modelData?.items.reduce(
      (acc, item) => {
        acc[item.name.trim().toLowerCase()] = item.name;
        return acc;
      },
      {} as Record<string, string>
    ) || {};

  // 난이도 태그 추출 및 순서 정렬 (BEGINNER, INTERMEDIATE, ADVANCED)
  const levelOrder = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];
  const levelTags = (
    tagData?.items.filter((item) => levelOrder.includes(item.name)) || []
  ).sort((a, b) => levelOrder.indexOf(a.name) - levelOrder.indexOf(b.name));

  // 난이도 태그를 API name -> UI code 매핑으로 변환
  const levelTagMap = levelTags.reduce(
    (acc, item) => {
      acc[item.code] = item.name;
      return acc;
    },
    {} as Record<string, string>
  );

  // 난이도 표시명 매핑 (초급 과정 -> 초급)
  const levelDisplayMap: Record<string, string> = {
    '초급 과정': '초급',
    '중급 과정': '중급',
    '고급 과정': '고급',
  };

  return {
    tagMap,
    modelMap,
    modelCodeMap,
    levelTags,
    levelTagMap,
    levelDisplayMap,
    isLoading: !tagData || !modelData,
  };
};
