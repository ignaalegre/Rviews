import React, { useEffect } from 'react'
import axios from 'axios'
import useGetTrendingContent from '../hooks/useGetTrending'

const Hero = ({ contentType }: { contentType: 'movie' | 'tv' }) => {
  const { trendingContent } = useGetTrendingContent(contentType)
  const [contentReview, setContentReview] = React.useState<any>(null)

  const getReviews = async () => {
    try {
      const res = await axios.get(`/api/${contentType}/${trendingContent?.id}/reviews`)
      setContentReview(res.data.content)
    } catch (error) {
      console.log(error)
    }
  }
  //Carga el contenido y luego carga el contenido de las reseñas

  useEffect(() => {
    if (trendingContent?.id) {
      getReviews()
    }
  }, [trendingContent])

  if (!trendingContent)
    return (
      <div className="h-screen text-white relative">
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer" />
      </div>
    )

  return (
    <div className="relative w-full min-h-screen ">
      {/* Imagen de fondo */}
      <img
        src={`https://image.tmdb.org/t/p/original/${trendingContent?.backdrop_path}`}
        alt="Fondo de película"
        className="object-cover w-full h-full absolute z-0"
      />

      {/* Gradiente encima de la imagen */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10" />
      {/* Contenido */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative z-40 flex flex-col md:flex-row items-center justify-center h-full px-8 text-white w-full gap-12 text-center md:text-left">
          {/* Caja de búsqueda dentro del flujo normal */}
          {/*  
          <div className="w-full max-w-xl mb-8">
            <SearchBox />
          </div>
          */}
          {/* Título y descripción */}
          <div className="md:w-1/2 mb-8 md:mb-0 ">
            <h1 className="text-4xl md:text-6xl font-bold mb-8 p-4 hover:font-extrabold transition duration-300 hover:scale-[1.02]  ">
              {trendingContent?.title}{' '}
            </h1>

            <p className="text-lg md:text-xl bg-black/10 p-4 rounded-md transition duration-300 hover:scale-[1.02] hover:bg-white/20 hover:-translate-y-1 hover:shadow-2xl  ">
              {trendingContent?.overview && trendingContent.overview.trim() !== ''
                ? trendingContent?.overview
                : 'No hay descripción disponible para este título.'}
            </p>

            <a
              href={`/${contentType}/${trendingContent?.id}`}
              className="inline-block mt-4 ml-2 px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-400 transition-transform hover:scale-105"
            >
              Más información
            </a>
          </div>

          {/* Card de reseña */}
          <div className="md:w-1/2 bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg text-white transition duration-300 hover:scale-[1.02] hover:bg-white/10 hover:-translate-y-1 hover:shadow-2xl ">
            {contentReview?.results?.length > 0 ? (
              <>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">{contentReview?.results[0]?.author}</h2>
                    <h3 className="text-l font-light">
                      @{contentReview?.results[0]?.author_details.username}
                    </h3>
                    <h4 className="text-sm font-extralight">
                      {contentReview?.results[0]?.created_at.slice(0, 10)}
                    </h4>
                  </div>
                  <span className="text-4xl font-bold bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center">
                    {contentReview?.results[0]?.author_details.rating}
                  </span>
                </div>
                <p className="text-sm ">
                  {contentReview?.results[0]?.content?.length > 1200
                    ? contentReview?.results[0]?.content?.slice(0, 1200) + '...'
                    : contentReview?.results[0]?.content}
                </p>
              </>
            ) : (
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">¡Sé el primero en dejar una reseña!</h2>
                <p className="text-sm">
                  Todavía no hay opiniones para este título. ¿Te animás a ser el primero?
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
