import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { MovieDetailsResponse, Review, Trailer } from '../../../shared/types'
import { MdOutlineInfo } from 'react-icons/md'
import CreateReview from '../components/ReviewsRelated/CreateReview.tsx'
import UserReviews from '../components/ReviewsRelated/UserReviews.tsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import MovieSlider from '../components/MovieSlider.tsx'
import ReactPlayer from 'react-player'
import ApiExternalReview from '../components/ReviewsRelated/ApiExternalReview.tsx'
import Details from '../components/MoviePage/Details.tsx'
import FavButton from '../components/FavButton.tsx'

const MoviePage = () => {
  const [content, setContent] = useState<MovieDetailsResponse['content'] | null>(null)
  const [apiReviews, setApiReviews] = useState<{ results: Review[] } | null>(null)
  const [trailers, setTrailers] = useState<Trailer[]>([])
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0)

  const { id } = useParams()

  const getMovieDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:4001/api/movie/${id}/details`)
      setContent(res.data.content)
    } catch (error) {
      console.log(error)
    }
  }
  const getReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:4001/api/movie/${id}/reviews`)
      setApiReviews(res.data.content)
    } catch (error) {
      console.log(error)
    }
  }
  const getTrailers = async () => {
    try {
      const res = await axios.get(`http://localhost:4001/api/movie/${id}/trailers`)
      setTrailers(res.data.trailers)
    } catch (error) {
      console.log(error)
    }
  }

  const handleNext = () => {
    if (currentTrailerIdx < trailers.length - 1) {
      setCurrentTrailerIdx(currentTrailerIdx + 1)
    }
  }
  const handlePrev = () => {
    if (currentTrailerIdx > 0) {
      setCurrentTrailerIdx(currentTrailerIdx - 1)
    }
  }
  React.useEffect(() => {
    getMovieDetails()
    getReviews()
    getTrailers()
  }, [id])

  if (!content)
    return (
      <div className="h-screen text-white relative">
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer" />
      </div>
    )

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
          <div className=" max-w-xl text-center items-center md:text-left bg-black/10 p-6  rounded-lg shadow-lg hover:scale-[1.02] transition-transform duration-300 hover:shadow-2xl">
            <div className="flex w-full items-center flex-row justify-between  gap-4 mb-4 p-4">
              <h1 className="text-4xl md:text-6xl font-bold">{content?.title}</h1>

              {content && id && (
                <FavButton show_id={id} title={content?.title} contentType="movie" />
              )}
            </div>
            {content?.vote_average && (
              <div className="flex justify-center">
                <div className="aspect-square w-16 h-16 bg-orange-500 text-white font-bold  rounded-full flex items-center justify-center text-3xl shadow-lg">
                  {Math.floor(content.vote_average)}
                </div>
              </div>
            )}
            <h4 className=" font-light mt-4 mb-4 text-gray-300">
              {content?.adult === false ? 'PG-13' : '+18'} {' | '}{' '}
              {content?.release_date.slice(0, 4)}
            </h4>
            <p className="text-lg md:text-xl font-light">{content?.overview}</p>
          </div>
        </div>
      </div>

      {/* Sección de trailers */}
      <h1 className="font-extrabold text-xl md:text-2xl lg:text-4xl text-white justify-center text-center p-12">
        {' '}
        Trailers{' '}
      </h1>
      {trailers.length > 0 ? (
        <div className="relative w-full mb-8 p-2 sm:px-10 md:px-32 lg:max-w-screen-xl items-center justify-center mx-auto">
          <ReactPlayer
            controls={true}
            width={'100%'}
            height={'70vh'}
            className="mx-auto overflow-hidden rounded-lg"
            url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
          />
          <button
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 md:ml-5 bg-green-500/60 hover:bg-green-400 hover:scale-105 transition-transform text-white py-2 px-4 rounded ${
              currentTrailerIdx === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={currentTrailerIdx === 0}
            onClick={handlePrev}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 md:mr-5 bg-green-500/60 hover:bg-green-400 hover:scale-105 transition-transform text-white py-2 px-4 rounded ${
              currentTrailerIdx === trailers.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={currentTrailerIdx === trailers.length - 1}
            onClick={handleNext}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      ) : (
        <div className="mb-8 p-2 sm:px-10 md:px-32">
          <h2 className="text-xl text-center mt-5">
            No hay trailers disponibles para{' '}
            <span className="font-bold text-green-500">{content?.title}</span> 😥
          </h2>
        </div>
      )}

      {content ? <Details content={content}></Details> : <></>}

      {/* Sección de Reseñas */}
      <div className="relative w-full bg text-white px-8 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Mis Reseñas */}
          <h2 className="text-xl md:text-3xl text-center  font-bold mb-6">Haz una Reseña!</h2>
          {/* Formulario para nueva reseña */}
          <p className="text-sm mb-4">Comparte tu opinión sobre esta película.</p>

          {content && id && <CreateReview show_id={id} title={content.title} contentType="movie" />}
          {/* Reseñas propias  */}
          <h1 className="text-xl md:text-3xl text-center m font-bold mt-8 mb-8">Mis Reseñas</h1>
          <UserReviews show_id={id} contentType="movie" />
          {/* Reseñas de usuarios */}
          <h2 className="text-xl md:text-3xl text-center  font-bold mb-8 mt-8">
            Reseñas de Usuarios
          </h2>
          <div className="space-y-6">
            {apiReviews?.results && apiReviews.results.length > 0 ? (
              apiReviews.results
                .slice()
                .reverse()
                .map((review, index) => (
                  <div
                    key={index}
                    className="bg-white/20 backdrop-blur-md p-6 rounded-lg shadow-lg text-white transition duration-300 hover:scale-[1.01]"
                  >
                    <ApiExternalReview review={review} />
                  </div>
                ))
            ) : (
              <div className="text-center bg-white/20 backdrop-blur-md p-6 rounded-lg shadow-lg text-white">
                <h2 className="text-xl font-semibold mb-2">¡Sé el primero en dejar una reseña!</h2>
                <p className="text-sm">
                  Todavía no hay opiniones para este título. ¿Te animás a ser el primero?
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Seccion de MovieSliders "Similares" */}
      <div className="text-white py-16 px-8 lg:px-20 mb-16  mt-4">
        <MovieSlider category={{ id: `${id}/similar`, label: 'Similares' }} contentType="movie" />
      </div>
    </div>
  )
}

export default MoviePage
