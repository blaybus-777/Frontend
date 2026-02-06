import { Outlet } from 'react-router-dom';
import Header from './Header';

function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
      <main>
        <div className="mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default RootLayout;
