import { useContentStore } from '../store/content'

export default function Header() {
  const { contentType, setContentType } = useContentStore()

  return (
    <header className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <nav className="flex items-center justify-between max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold">Rviews</h1>
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
