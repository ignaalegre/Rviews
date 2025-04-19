import { FaBars } from "react-icons/fa";
import { useContentStore } from "../store/contentStore";
import { useSidebarStore } from "../store/sidebarStore";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Header() {
  const { contentType, setContentType } = useContentStore();
  const { toggleSidebar } = useSidebarStore();
  const navigate = useNavigate();

  return (
    <header className="bg-gray-900 text-white px-4 py-3 shadow-md">
      <nav className="flex flex-col sm:flex-row sm:items-center sm:justify-between max-w-screen-2xl mx-auto gap-4 sm:gap-6">

        {/* Top section: sidebar toggle + logo */}
        <div className="flex items-center justify-between sm:justify-start gap-4">
          <button
            className="text-white hover:text-green-400 transition-transform hover:scale-110"
            onClick={toggleSidebar}
          >
            <FaBars />
          </button>
          <Link
            to="/"
            className="text-xl sm:text-2xl font-bold hover:scale-110 transition-transform"
          >
            Rviews
          </Link>
        </div>

        {/* SearchBar visible siempre, pero ocupa todo el ancho en mobile */}
        <div className="w-full">
          <SearchBar />
        </div>

        {/* Películas / Series selector */}
        <ul className="flex flex-col sm:flex-row gap-2 sm:gap-6 w-full sm:w-auto">
          <li>
            <button
              onClick={() => {
                navigate('/');
                setContentType('movie');
              }}
              className={`w-full sm:w-auto px-3 py-1 rounded text-center ${contentType === 'movie'
                ? 'bg-green-500 text-white hover:bg-green-400'
                : 'text-gray-300 hover:text-white'
                } transition-all hover:scale-105 hover:shadow-2xl`}
            >
              Películas
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                navigate('/');
                setContentType('tv');
              }}
              className={`w-full sm:w-auto px-3 py-1 rounded text-center ${contentType === 'tv'
                ? 'bg-green-500 text-white hover:bg-green-400'
                : 'text-gray-300 hover:text-white'
                } transition-all hover:scale-105 hover:shadow-2xl`}
            >
              Series
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}


