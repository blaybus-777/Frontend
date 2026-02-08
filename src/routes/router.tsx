import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../components/layout/RootLayout';
import ExplorePage from '../pages/ExplorePage';
import CourseDetailPage from '../pages/CourseDetailPage';
import NotFoundPage from '../pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'topic',
        element: <ExplorePage />,
      },
      {
        path: 'course/:id',
        element: <CourseDetailPage />,
      },
    ],
  },
]);

export default router;
