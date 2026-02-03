import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mb-4 text-xl">페이지를 찾을 수 없습니다.</p>
      <Link to="/" className="text-blue-500 hover:underline">
        홈으로 돌아가기
      </Link>
    </div>
  );
}

export default NotFoundPage;
