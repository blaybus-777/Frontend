import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  const getLinkColor = (path: string) => {
    if (location.pathname === path) {
      return 'text-foundation-blue-9';
    }
    // /course/:id 경로일 때 Study 메뉴 활성화
    if (path === 'study' && location.pathname.startsWith('/course/')) {
      return 'text-foundation-blue-9';
    }
    return 'text-foundation-black-text';
  };

  return (
    <header className="border-foundation-gray-5 sticky top-0 z-50 w-full border-b bg-white">
      <nav className="flex h-20 items-center gap-[500px]">
        <div className="py-5 px-2.5 to-foundation-blue-9 font-pretendard bg-linear-to-r from-[#42C2FF] bg-clip-text text-3xl font-extrabold text-transparent">
          SIMVEX
        </div>
        <div className="flex gap-10">
          <Link to="/topic" className={`font-bold ${getLinkColor('/topic')}`}>
            Explore
          </Link>
          <div className={`cursor-default font-bold ${getLinkColor('study')}`}>
            Study
          </div>
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
