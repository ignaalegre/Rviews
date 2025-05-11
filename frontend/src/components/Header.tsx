import { FaBars } from "react-icons/fa";
import { useSidebarStore } from "../store/sidebarStore";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Selector from "./Selector";

export default function Header() {
  const { toggleSidebar } = useSidebarStore();

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
        <Selector />
      </nav>
    </header>
  );
}


