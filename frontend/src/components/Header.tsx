import { useState } from 'react'

type Option = 'peliculas' | 'series'

export default function Header() {
  const [selected, setSelected] = useState<Option>('peliculas')

  return (
    <header className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <nav className="flex items-center justify-between max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold">Rviews</h1>
        <ul className="flex space-x-6">
          <li>
            <button
              onClick={() => setSelected('peliculas')}
              className={`px-3 py-1 rounded ${
                selected === 'peliculas'
                  ? 'bg-green-400 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Películas
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelected('series')}
              className={`px-3 py-1 rounded ${
                selected === 'series' ? 'bg-green-400 text-white' : 'text-gray-300 hover:text-white'
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
