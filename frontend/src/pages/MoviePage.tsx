import React from 'react'
import { useState } from 'react'
import axios from 'axios'

import { useParams } from 'react-router-dom'
import { MovieDetailsResponse, Review } from '../../../shared/types'
import { MdOutlineInfo } from 'react-icons/md'

import CreateReview from '../components/MoviePage/CreateReview.tsx'
import UserReviews from '../components/MoviePage/UserReviews.tsx'

const MoviePage = () => {
  const [content, setContent] = useState<MovieDetailsResponse['content'] | null>(null)
  const [apiReviews, setApiReviews] = useState<{ results: Review[] } | null>(null)

  const { id } = useParams()

  const getMovieDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:4001/movie/${id}/details`)
      setContent(res.data.content)
    } catch (error) {
      console.log(error)
    }
  }
  const getReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:4001/movie/${id}/reviews`)
      setApiReviews(res.data.content)
    } catch (error) {
      console.log(error)
    }
  }
  React.useEffect(() => {
    getMovieDetails()
    getReviews()
  }, [])

  return (
    <div className="flex flex-col w-full h-full overflow-x-hidden">
      <div className="relative w-full h-max scrollbar-hide overflow-y-auto bg-black text-white">
        {/* Fondo difuminado con gradiente negro */}
        <div className="absolute inset-0 z-0">
          <img
            src={`https://image.tmdb.org/t/p/original/${content?.backdrop_path}`}
            alt="Fondo de película"
            className="w-full h-[91vh] object-cover blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        </div>
        {/* Contenido principal tipo hero */}

        <div className=" relative z-10 flex flex-col  lg:flex-row md:ml-32 items-center justify-center gap-32 min-h-[91vh] px-4 lg:px-8 max-w-full mx-auto text-white py-8 lg:py-0 space-y-4 lg:space-y-0 scrollbar-hide">
          <div className="flex flex-col items-center justify-center text-center space-y-4 md:space-y-6">
            <img
              src={`https://image.tmdb.org/t/p/w500/${content?.poster_path}`}
              alt="Poster de película"
              className="w-[200px] md:w-[300px] rounded-lg shadow-lg border-gray-900/55 border-r-4 hover:scale-[1.02] transition-transform duration-300 hover:shadow-2xl hover:translate-y-1"
            />
            {content?.homepage && (
              <a
                href={content.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-500 hover:bg-green-400 hover:scale-105 transition-transform text-white px-6 py-2 rounded-md font-semibold"
              >
                <MdOutlineInfo className="size-6" /> Ver ahora
              </a>
            )}
          </div>

          {/* Título y descripción */}
          <div className=" max-w-xl text-center  md:text-left bg-black/10 p-6 rounded-lg shadow-lg hover:scale-[1.02] transition-transform duration-300 hover:shadow-2xl">
            <div className="flex w-full items-center flex-row justify-between md:justify-start gap-4 mb-4">
              <h1 className="text-4xl md:text-6xl font-bold">{content?.title}</h1>
              {content?.vote_average && (
                <div className="aspect-square w-16 h-16 bg-orange-500 text-white font-bold  rounded-full flex items-center justify-center text-3xl shadow-lg">
                  {Math.floor(content.vote_average)}
                </div>
              )}
            </div>
            <h4 className=" font-light mt-4 mb-4 text-gray-300">
              {content?.adult === false ? 'PG-13' : '+18'} {' | '}{' '}
              {content?.release_date.slice(0, 4)}
            </h4>
            <p className="text-lg md:text-xl font-light">{content?.overview}</p>
          </div>
        </div>
      </div>

      {/* Sección de detalles */}
      <div className="max-w-5xl mx-auto text-white mt-16 px-6 md:px-0 ">
        <div className="bg-zinc-800 p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
          {/* Título y descripción general */}
          <div>
            <strong>Título:</strong> {content?.title}
          </div>

          {/* Géneros */}
          <div>
            <strong>Géneros:</strong> {content?.genres?.map(g => g.name).join(', ')}
          </div>

          {/* Votos y Popularidad */}
          <div>
            <strong>Votos:</strong> {content?.vote_count} (Promedio: {content?.vote_average})
          </div>
          <div>
            <strong>Popularidad:</strong> {content?.popularity}
          </div>

          {/* Presupuesto */}
          <div>
            <strong>Presupuesto:</strong> ${content?.budget?.toLocaleString()}
          </div>

          {/* Fecha de lanzamiento y Idioma original */}
          <div>
            <strong>Fecha de lanzamiento:</strong> {content?.release_date.slice(0, 4)}
          </div>
          <div>
            <strong>Idioma original:</strong> {content?.original_language}
          </div>

          {/* País de origen y País de producción */}
          <div>
            <strong>País de origen:</strong> {content?.origin_country?.join(', ')}
          </div>
          <div>
            <strong>País de producción:</strong>{' '}
            {content?.production_countries?.map(c => c.name).join(', ')}
          </div>

          {/* Duración */}
          <div>
            <strong>Duración:</strong> {content?.runtime} min
          </div>

          {/* Recaudación */}
          <div>
            <strong>Recaudación:</strong> ${content?.revenue?.toLocaleString()}
          </div>

          {/* Productoras */}
          <div>
            <strong>Productoras:</strong>{' '}
            {content?.production_companies?.map(c => c.name).join(', ')}
          </div>

          {/* Estado */}
          <div>
            <strong>Estado:</strong> {content?.status}
          </div>

          {/* Título original , IMDB ID y ID */}
          <div>
            <strong>Título original:</strong> {content?.original_title}
          </div>
          <div>
            <strong>IMDB ID:</strong> {content?.imdb_id}
          </div>
          <div>
            <strong>TMDB ID:</strong> {content?.id}
          </div>
        </div>
      </div>
      {/* Sección de Reseñas */}
      <div className="relative w-full bg text-white px-8 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Mis Reseñas */}
          <h2 className="text-3xl font-bold mb-6">Mis Reseñas</h2>
          {/* Formulario para nueva reseña */}
          {content && id && <CreateReview show_id={id} title={content.title} contentType="movie" />}
          {/* Reseñas propias  */}
          <h1 className="font-bold text-2xl p-4"> Mis Reseñas</h1>
          <UserReviews show_id={id} contentType="movie" />
          {/* Reseñas de usuarios */}
          <h2 className="text-3xl font-bold mb-6">Reseñas de Usuarios</h2>
          <div className="space-y-6">
            {apiReviews?.results.reverse().map((review, index) => (
              <div className=" bg-white/20 backdrop-blur-md p-6 rounded-lg shadow-lg text-white transition duration-300 hover:scale-[1.01]  ">
                {apiReviews?.results?.length > 0 ? (
                  <>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-xl font-semibold">
                          {apiReviews.results[index].author}
                        </h2>
                        <h3 className="text-l font-light">
                          @{apiReviews.results[index].author_details.username}
                        </h3>
                        <h4 className="text-sm font-extralight">
                          {apiReviews.results[index].created_at.slice(0, 10)}
                        </h4>
                      </div>
                      <span className="text-2xl font-bold bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center">
                        {apiReviews.results[index].author_details.rating == null
                          ? '-'
                          : apiReviews.results[index].author_details.rating}
                      </span>
                    </div>
                    <p className="text-sm ">
                      {apiReviews.results[index].content.length > 1200
                        ? apiReviews.results[index].content.slice(0, 1200) + '...'
                        : apiReviews.results[index].content}
                    </p>
                  </>
                ) : (
                  <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2">
                      ¡Sé el primero en dejar una reseña!
                    </h2>
                    <p className="text-sm">
                      Todavía no hay opiniones para este título. ¿Te animás a ser el primero?
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoviePage
