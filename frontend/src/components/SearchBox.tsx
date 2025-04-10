import { useContentStore } from '../store/content'
import React from "react"
import { useNavigate } from "react-router-dom"

const SearchBox = () => {
    const [searchTerm, setSearchTerm] = React.useState('')
    const { contentType } = useContentStore()
    const navigate = useNavigate()

    const handleSubmit = () => {
        navigate(`/search/${contentType}/${searchTerm}`)
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Buscar una película o serie..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
                onClick={handleSubmit}
                className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md"
            >
                Buscar
            </button>
        </div>
    )
}

export default SearchBox
