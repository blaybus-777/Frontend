import { Link, useLocation } from "react-router-dom";

function Header() {
    const location = useLocation();

    const getLinkColor = (path: string) => {
        return location.pathname == path 
            ? "text-foundation-blue-9" 
            : "text-foundation-black-text";
    };

    return (
        <header className="w-full border-b border-foundation-gray-5 bg-white sticky top-0 z-50">
            <nav className="mx-auto flex items-center px-60 h-20 relative">
                <div className="bg-linear-to-r from-[#42C2FF] to-foundation-blue-9 bg-clip-text text-3xl font-extrabold font-pretendard text-transparent">
                    simvex
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 flex gap-10">
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