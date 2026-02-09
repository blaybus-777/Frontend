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
        acc[item.name.toLowerCase()] = item.name;
        return acc;
      },
      {} as Record<string, string>
    ) || {};

  return {
    tagMap,
    modelMap,
    modelCodeMap,
    isLoading: !tagData || !modelData,
  };
};
