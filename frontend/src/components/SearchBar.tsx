import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContentStore } from '../store/contentStore'

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()
  const { contentType } = useContentStore()

  const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmed = query.trim()
    if (trimmed) {
      navigate(`/search/${contentType}/${encodeURIComponent(trimmed)}`)
      setQuery("")
    }
  }

  return (
    <>
        <form onSubmit={handleSubmit} className="flex-1 mx-8 max-w-md">
        <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar películas o series..."
            className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        </form>
        <button
            type="submit"
            className="px-4 py-2 bg-green-500 hover:bg-green-400 text-white rounded transition duration-200"
        >
            Buscar
        </button>
    </>
  )
}