import { Outlet, Link } from 'react-router-dom';

function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
          <div className="flex gap-x-12">
            <Link to="/" className="text-sm font-semibold leading-6 text-gray-900">
              Explore
            </Link>
            <Link to="/topic" className="text-sm font-semibold leading-6 text-gray-900">
              Topics
            </Link>
          </div>
        </nav>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default RootLayout;
