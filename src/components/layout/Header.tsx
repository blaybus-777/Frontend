import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  const getLinkColor = (path: string) => {
    return location.pathname == path
      ? 'text-foundation-blue-9'
      : 'text-foundation-black-text';
  };

  return (
    <header className="border-foundation-gray-5 sticky top-0 z-50 w-full border-b bg-white">
      <nav className="relative mx-auto flex h-20 items-center px-60">
        <div className="to-foundation-blue-9 font-pretendard bg-linear-to-r from-[#42C2FF] bg-clip-text text-3xl font-extrabold text-transparent">
          SIMVEX
        </div>
        <div className="absolute left-1/2 flex -translate-x-1/2 gap-10">
          <Link to="/" className={`font-bold ${getLinkColor('/')}`}>
            Explore
          </Link>
          <Link to="/topic" className={`font-bold ${getLinkColor('/topic')}`}>
            Study
          </Link>
          <Link to="#" className={`font-bold ${getLinkColor('#')}`}>
            CAD
          </Link>
          <Link to="#" className={`font-bold ${getLinkColor('#')}`}>
            Lab
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
