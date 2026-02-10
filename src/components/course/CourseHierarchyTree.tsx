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

  // 모든 노드를 보여줍니다.
  const items = useMemo(() => {
    return data?.items || [];
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
