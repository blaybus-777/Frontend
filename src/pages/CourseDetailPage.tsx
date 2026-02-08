import { useCourseDetail } from '@/hooks/useCourseDetail';
import CourseDetailLayout from '@/components/course/CourseDetailLayout';

function CourseDetailPage() {
  const { selectedPartId, setSelectedPartId } = useCourseDetail();

  return (
    <CourseDetailLayout
      selectedPartId={selectedPartId}
      onSelectPart={setSelectedPartId}
    />
  );
}

export default CourseDetailPage;
