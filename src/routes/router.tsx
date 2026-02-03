import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../components/layout/RootLayout';
import ExplorePage from '../pages/ExplorePage';
import TopicListPage from '../pages/TopicListPage';
import CourseDetailPage from '../pages/CourseDetailPage';
import NotFoundPage from '../pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <ExplorePage />,
      },
      {
        path: 'topic',
        element: <TopicListPage />,
      },
      {
        path: 'course/:id',
        element: <CourseDetailPage />,
      },
    ],
  },
]);

export default router;
