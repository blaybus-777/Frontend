import { useParams } from 'react-router-dom';

function CourseDetailPage() {
  const { id } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Course Detail Page</h1>
      <p>학습 상세 페이지 (ID: {id})</p>
    </div>
  );
}

export default CourseDetailPage;
