import { useContentStore } from '../store/content'
import { Link } from 'react-router-dom'
export default function Header() {
  const { contentType, setContentType } = useContentStore()

  return (
    <header className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <nav className="flex items-center justify-between max-w-6xl mx-auto">
        <Link to='/' className="text-2xl font-bold">Rviews</Link>
        <ul className="flex space-x-6">
          <li>
            <button
              onClick={() => setContentType('movie')}
              className={`px-3 py-1 rounded ${
                contentType === 'movie'
                  ? 'bg-green-400 text-white'
                  : 'text-gray-300 hover:text-white'
              } transition-100 hover:scale-105 hover:shadow-2xl  `}
            >
              Películas
            </button>
          </li>
          <li>
            <button
              onClick={() => setContentType('tv')}
              className={`px-3 py-1 rounded ${
                contentType === 'tv' ? 'bg-green-400 text-white' : 'text-gray-300 hover:text-white'
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
