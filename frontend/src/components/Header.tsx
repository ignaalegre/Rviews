import { useContentStore } from '../store/contentStore'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { useSidebarStore } from '../store/sidebarStore'
import { useEffect } from 'react'
import SearchBar from './SearchBar'

export default function Header() {
  const { contentType, setContentType } = useContentStore()
  const { toggleSidebar } = useSidebarStore()
  const navigate = useNavigate();

  return (
    <header className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <nav className="flex items-center justify-center max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-4 mr-auto">
          <button
            className="text-white hover:text-green-400 transition-transform hover:scale-110"
            onClick={toggleSidebar}
          >
            <FaBars />
          </button>
          <Link to="/" className="text-2xl font-bold hover:scale-110 transition-transform">
            Rviews
          </Link>
          {/* Barra de búsqueda importada como componente */}
          <SearchBar />
        </div>

        
        <ul className="flex space-x-6">
          <li>
            <button
              onClick={() => {
                navigate('/') 
                setContentType('movie')}}
              className={`px-3 py-1 rounded ${
                contentType === 'movie'
                  ? 'bg-green-500 text-white hover:bg-green-400'
                  : 'text-gray-300 hover:text-white'
              } transition-100 hover:scale-105 hover:shadow-2xl  `}
            >
              Películas
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                navigate('/') 
                setContentType('tv')}}
              className={`px-3 py-1 rounded ${
                contentType === 'tv'
                  ? 'bg-green-500 text-white hover:bg-green-400'
                  : 'text-gray-300 hover:text-white transition-100 hover:scale-105 hover:shadow-2xl '
              }`}
            >
              Series
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}
