import Hero from '../components/Hero'
import MovieSlider from '../components/MovieSlider'
import { MOVIE_CATEGORIES, TV_CATEGORIES } from '../utils/constants'

const HomePage = ({ contentType }: { contentType: 'movie' | 'tv' }) => {
  return (
    <>
      <div className="flex flex-col w-full overflow-x-hidden">
        <Hero contentType={contentType} />
        <div className="bg-black text-white text-center py-6 px-4">
          <h2 className="text-2xl font-semibold mb-2">
            Mirá las opiniones de los demás y comparte las tuyas
          </h2>
          <p className="text-sm text-gray-300">
            Descubrí lo que otros piensan sobre tus películas y series favoritas, ¡y dejá tu opinión
            también!
          </p>
        </div>
        <div className="flex flex-col gap-10 bg-black py-10">
          {contentType === 'movie'
            ? MOVIE_CATEGORIES.map(category => (
                <MovieSlider key={category.id} category={category} contentType={contentType} />
              ))
            : TV_CATEGORIES.map(category => (
                <MovieSlider key={category.id} category={category} contentType={contentType} />
              ))}
        </div>
      </div>
    </>
  )
}

export default HomePage
