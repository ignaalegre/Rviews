import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContentStore } from '../store/contentStore'

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()
  const { contentType } = useContentStore()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmed = query.trim()
    if (trimmed) {
      navigate(`/search/${contentType}/${encodeURIComponent(trimmed)}`)
      setQuery("")
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-4xl mx-auto"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar películas o series..."
        className="flex-1 px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <button
        type="submit"
        className="w-full sm:w-auto px-4 py-2 bg-green-500 hover:bg-green-400 text-white rounded-md transition duration-200"
      >
        Buscar
      </button>
    </form>
  )
}