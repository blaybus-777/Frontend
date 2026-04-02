import { useCourseDetail } from '@/hooks/useCourseDetail';
import CourseDetailLayout from '@/components/course/CourseDetailLayout';
import { useParams } from 'react-router-dom';

function CourseDetailPage() {
  const { selectedPartId, setSelectedPartId } = useCourseDetail();
  const { id } = useParams();
  const viewerStorageKey = id ? `viewer:${id}` : undefined;

  return (
    <CourseDetailLayout
      selectedPartId={selectedPartId}
      onSelectPart={setSelectedPartId}
      viewerStorageKey={viewerStorageKey}
    />
  );
}

export default CourseDetailPage;
