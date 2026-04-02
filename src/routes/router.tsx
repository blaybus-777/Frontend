import { Suspense, lazy, type ReactElement } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../components/layout/RootLayout';
import ExplorePage from '../pages/ExplorePage';
import NotFoundPage from '../pages/NotFoundPage';

const CourseDetailPage = lazy(() => import('../pages/CourseDetailPage'));
const LabPage = lazy(() => import('../pages/LabPage'));
const LandingPage = lazy(() => import('../pages/LandingPage'));

const withSuspense = (element: ReactElement) => (
  <Suspense
    fallback={<div className="p-6 text-sm text-gray-500">Loading...</div>}
  >
    {element}
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: withSuspense(<LandingPage />),
      },
      {
        path: 'topic',
        element: <ExplorePage />,
      },
      {
        path: 'course/:id',
        element: withSuspense(<CourseDetailPage />),
      },
      {
        path: 'lab',
        element: withSuspense(<LabPage />),
      },
    ],
  },
]);

export default router;
