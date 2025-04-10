import { useContentStore } from '../store/content'
import React from "react"
import { useNavigate } from "react-router-dom"
import { Search } from 'lucide-react'

const SearchBox = () => {
    const [searchTerm, setSearchTerm] = React.useState('')
    const { contentType } = useContentStore()
    const navigate = useNavigate()

    const handleSubmit = () => {
        navigate(`/search/${contentType}/${searchTerm}`)
    }

    return (
        <div className="w-full max-w-xl mx-auto mt-10">
            <div className="flex items-center bg-white/10 backdrop-blur-md shadow-md rounded-2xl px-4 py-3 ring-1 ring-white/20 focus-within:ring-2 focus-within:ring-green-400">
                <Search className="text-white opacity-70 mr-2" />
                <input
                    type="text"
                    placeholder="Buscá una peli o serie..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                    className="flex-1 bg-transparent text-white placeholder-white/50 focus:outline-none"
                />
            </div>
            <button
                onClick={handleSubmit}
                className="mt-4 w-full py-2.5 bg-gradient-to-r from-green-500 to-lime-400 text-white font-semibold rounded-xl shadow-lg hover:brightness-110 transition-all duration-200"
            >
                Buscar
            </button>
        </div>
    )
}

export default SearchBox
