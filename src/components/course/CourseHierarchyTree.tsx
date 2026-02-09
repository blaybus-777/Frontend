import { usePartList } from '@/hooks/usePartList';
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
  const { data, isLoading, error } = usePartList(modelId);

  // Filter root nodes (business logic)
  const items =
    data?.items.filter((node) => node.children && node.children.length > 0) ||
    [];

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
