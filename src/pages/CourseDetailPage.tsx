import { useCourseDetail } from '@/hooks/useCourseDetail';
import CourseDetailLayout from '@/components/course/CourseDetailLayout';

function CourseDetailPage() {
  const {
    viewMode,
    assemblyMode,
    selectedPartId,
    setViewMode,
    setAssemblyMode,
    setSelectedPartId,
    explosionLevel,
    setExplosionLevel,
  } = useCourseDetail();

  return (
    <CourseDetailLayout 
      viewMode={viewMode}
      assemblyMode={assemblyMode}
      selectedPartId={selectedPartId}
      onViewModeChange={setViewMode}
      onAssemblyModeChange={setAssemblyMode}
      onSelectPart={setSelectedPartId}
      explosionLevel={explosionLevel}
      onExplosionLevelChange={setExplosionLevel}
    />
  );
}

export default CourseDetailPage;
