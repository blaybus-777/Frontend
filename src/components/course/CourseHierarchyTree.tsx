import { useMemo } from 'react';
import { usePartHierarchy } from '@/hooks/usePartList';
import HierarchyTreeView from './HierarchyTreeView';
import type { Part } from '@/apis/part';

interface CourseHierarchyTreeProps {
  modelId?: string;
  selectedPartId?: string | null;
  onSelectPart?: (id: string | null) => void;
}

export default function CourseHierarchyTree({
  modelId,
  selectedPartId,
  onSelectPart,
}: CourseHierarchyTreeProps) {
  const { data, isLoading, error } = usePartHierarchy(modelId);

  // modelId가 6일 때 nit 부품을 필터링하는 함수
  const filterNitParts = (parts: Part[]): Part[] => {
    return parts
      .filter((part) => part.code !== 'nit')
      .map((part) => ({
        ...part,
        children: part.children ? filterNitParts(part.children) : [],
      }));
  };

  // modelId가 6일 때만 nit 부품을 제외하고 보여줍니다.
  const items = useMemo(() => {
    const allItems = data?.items || [];
    
    if (modelId === '6') {
      return filterNitParts(allItems);
    }
    
    return allItems;
  }, [data, modelId]);

  return (
    <HierarchyTreeView
      items={items}
      selectedPartId={selectedPartId}
      onSelectPart={onSelectPart}
      isLoading={isLoading}
      error={error}
    />
  );
}
