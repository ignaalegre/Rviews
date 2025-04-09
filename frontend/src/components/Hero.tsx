import { useContentType } from '../context/ContentTypeContext.tsx'
import React from 'react'
import axios from 'axios'
import SearchBox from './SearchBox.tsx'

const Hero = () => {
  const [results, setResults] = React.useState()
  const { selected } = useContentType()
  const [content, setContent] = React.useState<any>(null)

  const getTrending = async () => {
    try {
      const res = await axios.get(`http://localhost:4001/${selected}/trending`)
      setContent(res.data.content)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    getTrending()
  }, [selected])

  return (
    <div className="relative w-full h-screen">
      {/* Imagen de fondo */}
      {/* Renderiza cuando ya se obtuvo el contenido en tendencia */}
      {content?.backdrop_path && (
        <img
          src={`https://image.tmdb.org/t/p/original/${content.backdrop_path}`}
          alt="Fondo de película"
          className="object-cover w-full h-full absolute z-0"
        />
      )}

      {/* Gradiente encima de la imagen */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10" />

      {/* Contenido */}
      <div className="relative z-20 flex flex-col items-start justify-center h-full px-8 max-w-3xl text-white">
        {/* Obtener título en el caso de las películas y nombre en el caso de las series */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4"> {selected == 'movie' ? content?.title : content?.name}</h1>
        <p className="text-lg md:text-xl mb-6">{content?.overview}</p>
        <SearchBox></SearchBox>
      </div>
      <div>{results !== '' && <h1 className="text-white ">{results}</h1>}</div>
    </div>
  )
}

export default Hero
