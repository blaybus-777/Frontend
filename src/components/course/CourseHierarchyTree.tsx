import { useMemo } from 'react';
import { usePartHierarchy } from '@/hooks/usePartList';
import HierarchyTreeView from './HierarchyTreeView';

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

  // 최상위 노드들 중에서 자식이 있는 노드만 필터링하여 유효한 트리 구조만 보여줍니다.
  const items = useMemo(() => {
    return data?.items.filter((node) => node.children && node.children.length > 0) || [];
  }, [data]);

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
