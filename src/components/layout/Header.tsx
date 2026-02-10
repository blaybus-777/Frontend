import { Link, useLocation, useNavigate } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

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
    <header className="border-foundation-gray-5 z-50 sticky top-0 w-full border-b bg-white">
      <nav className="mx-auto flex h-20 max-w-360 items-center gap-125">
        <div
          onClick={() => navigate('/')}
          className="to-foundation-blue-9 font-pretendard cursor-pointer bg-linear-to-r from-[#42C2FF] bg-clip-text px-2.5 py-5 pl-15 text-3xl font-extrabold text-transparent"
        >
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
          <Link to="/lab" className={`font-bold ${getLinkColor('/lab')}`}>
            Lab
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
