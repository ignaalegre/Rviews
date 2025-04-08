import React from 'react'
import axios from 'axios'
import { useMutation } from 'react-query'

const Hero = () => {
  const [results, setResults] = React.useState()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [contentType, setContentType] = React.useState('movie')
  const [content, setContent] = React.useState<any>(null)

  const getTrending = async () => {
    try {
      const res = await axios.get(`http://localhost:4001/${contentType}/trending`)
      setContent(res.data.content)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async () => {
    try {
      const res = await axios.get(`http://localhost:4001/search/movie/${searchTerm}`)
      setResults(res.data.content.results[0].title)
      console.log(res.data.content.results[0])
    } catch (e: any) {
      console.log(e.message)
    }
  }

  React.useEffect(() => {
    getTrending()
  }, [])

  return (
    <div className="relative w-full h-screen">
      {/* Imagen de fondo */}
      <img
        src={`https://image.tmdb.org/t/p/original/${content?.backdrop_path}`}
        alt="Fondo de película"
        className="object-cover w-full h-full absolute z-0"
      />

      {/* Gradiente encima de la imagen */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10" />

      {/* Contenido */}
      <div className="relative z-20 flex flex-col items-start justify-center h-full px-8 max-w-3xl text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4"> {content?.title}</h1>
        <p className="text-lg md:text-xl mb-6">{content?.overview}</p>
        <input
          type="text"
          placeholder="Buscar una película..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-md bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
        />
        <button
          onClick={() => handleSubmit()}
          className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md"
        >
          Buscar
        </button>
      </div>
      <div>{results !== '' && <h1 className="text-white ">{results}</h1>}</div>
    </div>
  )
}

export default Hero
