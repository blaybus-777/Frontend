import { Link, useLocation } from "react-router-dom";

function Header() {
    const location = useLocation();

    const getLinkColor = (path: string) => {
        return location.pathname === path 
            ? "text-foundation-blue-blue-7" 
            : "text-foundation-black-text";
    };

    return (
        <header className="w-full border-b border-gray-200 bg-white">
            <nav className="mx-auto flex items-center px-[360px] h-20 gap-16">
                <Link to="/" className="bg-linear-to-r from-[#42C2FF] to-foundation-blue-blue-9 bg-clip-text text-extrabold-36 text-transparent">
                    simvex
                </Link> 
                <div className="flex gap-x-12">
                    <Link to="/" className={`text-bold-16 ${getLinkColor('/')}`}>
                        Explore
                    </Link>
                    <Link to="/topic" className={`text-bold-16 ${getLinkColor('/topic')}`}>
                        Study
                    </Link>
                    <Link to="#" className={`text-bold-16 ${getLinkColor('#')}`}>
                        CAD
                    </Link>
                    <Link to="#" className={`text-bold-16 ${getLinkColor('#')}`}>
                        Lab
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;