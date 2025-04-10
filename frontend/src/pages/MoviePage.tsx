import React from 'react'
import { useState } from 'react'
import axios from 'axios'

import { useParams } from 'react-router-dom'

const MoviePage = () => {
  const [content, setContent] = useState<any>(null)
  const [reviews, setReviews] = useState<any>(null)

  const { id } = useParams()

  const getContent = async () => {
    try {
      const res = await axios.get(`http://localhost:4001/movie/${id}/details`)
      setContent(res.data.content)
      console.log(res.data.content)
    } catch (error) {
      console.log(error)
    }
  }
  const getReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:4001/movie/${id}/reviews`)
      setReviews(res.data.content)
      console.log(res.data.content)
    } catch (error) {
      console.log(error)
    }
  }
  React.useEffect(() => {
    getContent()
    getReviews()
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
      <div className=" bg-black opacity-30 relative z-20 flex flex-col items-start justify-center h-full px-8 max-w-3xl text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 "> {content?.title}</h1>
        <p className="text-lg md:text-xl mb-6 ">{content?.overview}</p>
      </div>

      <div className=" bg-black  relative  flex flex-col items-start justify-center h-full px-8 max-w-3xl text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 "> Reseñas </h1>
        <p className="text-lg md:text-xl mb-6 ">{reviews?.results[0]?.author}</p>
        <p className="text-lg md:text-xl mb-6 ">{reviews?.results[0]?.content}</p>
      </div>
    </div>
  )
}

export default MoviePage
