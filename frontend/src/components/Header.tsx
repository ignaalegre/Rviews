import { useContentType } from '../context/ContentTypeContext.tsx'

export default function Header() {
  const { selected, setSelected } = useContentType()

  return (
    <header className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <nav className="flex items-center justify-between max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold">Rviews</h1>
        <ul className="flex space-x-6">
          <li>
            <button
              onClick={() => setSelected('movie')}
              className={`px-3 py-1 rounded ${selected === 'movie'
                ? 'bg-green-400 text-white'
                : 'text-gray-300 hover:text-white'
                }`}
            >
              Películas
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelected('tv')}
              className={`px-3 py-1 rounded ${selected === 'tv' ? 'bg-green-400 text-white' : 'text-gray-300 hover:text-white'}`}
            >
              Series
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}
